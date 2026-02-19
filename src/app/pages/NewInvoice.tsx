import React, { useEffect, useState } from "react";
import { Trash2, Plus, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { generateInvoiceNumber } from "../../utils/invoiceNumber";

/* ---------------- TYPES ---------------- */

interface Client {
  id: string;
  companyName: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  cgst: number;
  sgst: number;
  igst: number;
  cess: number;
}

interface LineItem {
  id: string;
  productId: string;
  name: string;
  qty: number;
  price: number;
  tax: number;
  total: number;
}

/* ---------------- PAGE ---------------- */

export const NewInvoice: React.FC = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [invoiceNumber] = useState(generateInvoiceNumber());

  const [items, setItems] = useState<LineItem[]>([
    { id: Date.now().toString(), productId: "", name: "", qty: 1, price: 0, tax: 0, total: 0 },
  ]);

  const [notes, setNotes] = useState("");

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {
    const c = localStorage.getItem("clients");
    const p = localStorage.getItem("items");
    if (c) setClients(JSON.parse(c));
    if (p) setProducts(JSON.parse(p));
  }, []);

  /* ---------------- CALCULATIONS ---------------- */

  const calculate = (item: LineItem) => {
    const subtotal = item.qty * item.price;
    const taxAmount = subtotal * (item.tax / 100);
    return subtotal + taxAmount;
  };

  const selectProduct = (lineId: string, productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    const tax = prod.cgst + prod.sgst + prod.igst + prod.cess;

    setItems((prev) =>
      prev.map((l) => {
        if (l.id === lineId) {
          const updated = { ...l, productId, name: prod.name, price: prod.price, tax };
          return { ...updated, total: calculate(updated) };
        }
        return l;
      })
    );
  };

  const updateQty = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const updated = { ...l, qty };
          return { ...updated, total: calculate(updated) };
        }
        return l;
      })
    );
  };

  const addLine = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), productId: "", name: "", qty: 1, price: 0, tax: 0, total: 0 },
    ]);
  };

  const removeLine = (id: string) => {
    if (items.length > 1) setItems(items.filter((i) => i.id !== id));
  };

  /* ---------------- TOTALS ---------------- */

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const taxTotal = items.reduce((s, i) => s + (i.total - i.qty * i.price), 0);
  const grandTotal = subtotal + taxTotal;

  /* ---------------- SAVE ---------------- */

  const saveInvoice = () => {
    if (!selectedClient) return alert("Please select a client");

    const invoice = {
      id: Date.now().toString(),
      number: invoiceNumber,
      client: clients.find((c) => c.id === selectedClient)?.companyName,
      items,
      subtotal,
      tax: taxTotal,
      total: grandTotal,
      date: new Date().toLocaleDateString(),
      status: "pending",
    };

    const stored = localStorage.getItem("invoices");
    const invoices = stored ? JSON.parse(stored) : [];
    invoices.push(invoice);
    localStorage.setItem("invoices", JSON.stringify(invoices));

    navigate("/history");
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">New Invoice</h1>
            <p className="text-gray-500">Create GST Invoice</p>
          </div>

          <Button onClick={saveInvoice} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Invoice
          </Button>
        </div>

        {/* CLIENT + NUMBER */}
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <Label>Client</Label>
              <Select onValueChange={setSelectedClient}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Invoice Number</Label>
              <Input className="mt-2 bg-gray-100" value={invoiceNumber} readOnly />
            </div>

          </div>
        </Card>

        {/* ITEMS TABLE */}
        <Card className="p-6">
          <div className="grid grid-cols-12 text-sm font-medium text-gray-500 mb-3">
            <div className="col-span-5">Product</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Total</div>
            <div className="col-span-1"></div>
          </div>

          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-3 mb-3 items-center">

              <div className="col-span-5">
                <Select onValueChange={(v) => selectProduct(item.id, v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Input
                  type="number"
                  value={item.qty}
                  onChange={(e) => updateQty(item.id, Number(e.target.value))}
                  className="text-center"
                />
              </div>

              <div className="col-span-2 text-center font-medium">
                ₹{item.price}
              </div>

              <div className="col-span-2 text-center font-semibold text-orange-600">
                ₹{item.total.toFixed(2)}
              </div>

              <div className="col-span-1 text-center">
                <Trash2 className="text-red-500 cursor-pointer" onClick={() => removeLine(item.id)} />
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addLine} className="mt-4 w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </Card>

        {/* NOTES */}
        <Card className="p-6">
          <Label>Notes</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Payment terms..."
            className="mt-2"
          />
        </Card>
      </div>

      {/* RIGHT SUMMARY */}
      <div className="sticky top-24 h-fit">
        <Card className="p-6 shadow-lg border-orange-100">

          <h3 className="text-xl font-semibold mb-4">Summary</h3>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">GST</span>
            <span>₹{taxTotal.toFixed(2)}</span>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold text-orange-600">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>

        </Card>
      </div>
    </div>
  );
};
