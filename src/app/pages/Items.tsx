import React, { useEffect, useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";

interface Item {
  id: string;
  name: string;
  quantity: number;
  description: string;
  price: number;
  cgst: number;
  sgst: number;
  igst: number;
  cess: number;
}

export const Items: React.FC = () => {

  const [items, setItems] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Item>({
    id: "",
    name: "",
    quantity: 1,
    description: "",
    price: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
    cess: 0
  });

  useEffect(() => {
    const stored = localStorage.getItem("items");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const saveItems = (data: Item[]) => {
    setItems(data);
    localStorage.setItem("items", JSON.stringify(data));
  };

  const addItem = () => {
    if (!form.name || !form.price) return;
    const updated = [...items, { ...form, id: Date.now().toString() }];
    saveItems(updated);
    setShowModal(false);
  };

  const deleteItem = (id: string) => {
    saveItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="p-8">

      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Products</h1>
          <p className="text-gray-600">GST enabled items</p>
        </div>

        <Button onClick={() => setShowModal(true)} className="bg-orange-500 text-white">
          <Plus /> Add Item
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {items.map(item => {
          const totalTax = item.cgst + item.sgst + item.igst + item.cess;
          const totalPrice = item.price + (item.price * totalTax / 100);

          return (
            <Card key={item.id} className="p-6 hover:shadow-xl transition">

              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <Trash2 className="text-red-500 cursor-pointer" onClick={() => deleteItem(item.id)} />
              </div>

              <p className="text-gray-500 text-sm mb-4">{item.description}</p>

              <div className="text-sm space-y-1">
                <p>Qty: {item.quantity}</p>
                <p>Base Price: ₹{item.price}</p>
                <p>GST: {totalTax}%</p>
                <p className="font-semibold text-orange-600">Final Price: ₹{totalPrice.toFixed(2)}</p>
              </div>

            </Card>
          );
        })}

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Card className="p-8 w-[450px] space-y-3">

            <h2 className="text-xl font-semibold mb-2">Add Product</h2>

            <Input placeholder="Product Name" onChange={e => setForm({ ...form, name: e.target.value })}/>
            <Input placeholder="Quantity" type="number" onChange={e => setForm({ ...form, quantity: Number(e.target.value) })}/>
            <Input placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })}/>
            <Input placeholder="Price ₹" type="number" onChange={e => setForm({ ...form, price: Number(e.target.value) })}/>

            <h3 className="font-medium mt-3">GST Details</h3>
            <Input placeholder="CGST %" type="number" onChange={e => setForm({ ...form, cgst: Number(e.target.value) })}/>
            <Input placeholder="SGST %" type="number" onChange={e => setForm({ ...form, sgst: Number(e.target.value) })}/>
            <Input placeholder="IGST %" type="number" onChange={e => setForm({ ...form, igst: Number(e.target.value) })}/>
            <Input placeholder="CESS %" type="number" onChange={e => setForm({ ...form, cess: Number(e.target.value) })}/>

            <div className="flex justify-end gap-3 pt-3">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button className="bg-orange-500 text-white" onClick={addItem}>Save</Button>
            </div>

          </Card>
        </div>
      )}

    </div>
  );
};
