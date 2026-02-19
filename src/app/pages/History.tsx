import React, { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { CheckCircle2, Trash2 } from "lucide-react";

export const History: React.FC = () => {

  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    const stored = localStorage.getItem("invoices");
    if (stored) setInvoices(JSON.parse(stored));
  };

  const save = (data:any[]) => {
    localStorage.setItem("invoices", JSON.stringify(data));
    setInvoices(data);
  };

  /* -------- MARK AS PAID -------- */
  const markPaid = (id:string) => {
    const updated = invoices.map(inv =>
      inv.id === id ? { ...inv, status: "paid", paidAt: new Date().toISOString() } : inv
    );
    save(updated);
  };

  /* -------- DELETE -------- */
  const deleteInvoice = (id:string) => {
    const updated = invoices.filter(inv => inv.id !== id);
    save(updated);
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-semibold mb-6">Invoice History</h1>

      <Card className="overflow-hidden">

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Invoice</th>
              <th className="p-4 text-left">Client</th>
              <th className="p-4 text-left">Issue Date</th>
              <th className="p-4 text-left">Due Date</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} className="border-t">

                <td className="p-4 font-medium">{inv.number}</td>
                <td className="p-4">{inv.clientName}</td>
                <td className="p-4">{inv.issueDate}</td>
                <td className="p-4">{inv.dueDate || "-"}</td>

                <td className="p-4 font-semibold text-orange-600">
                  ₹{inv.total.toFixed(2)}
                </td>

                <td className="p-4 capitalize">
                  <span className={`px-3 py-1 rounded-full text-xs
                    ${inv.status === "paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-700"}`}>
                    {inv.status}
                  </span>
                </td>

                <td className="p-4 flex gap-3">

                  {inv.status === "pending" && (
                    <button
                      onClick={() => markPaid(inv.id)}
                      className="text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      <CheckCircle2 size={18}/> Mark Paid
                    </button>
                  )}

                  <button
                    onClick={() => deleteInvoice(inv.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 size={18}/> Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </Card>
    </div>
  );
};
