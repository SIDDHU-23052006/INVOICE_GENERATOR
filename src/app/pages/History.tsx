import React, { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export const History:React.FC=()=>{

const [invoices,setInvoices]=useState<any[]>([]);

useEffect(()=>{
 const stored=localStorage.getItem("invoices");
 if(stored) setInvoices(JSON.parse(stored));
},[]);

return(
<div className="space-y-6">

<h1 className="text-3xl font-semibold mb-6">Invoice History</h1>

<Card className="overflow-hidden">

<table className="w-full">
<thead className="bg-gray-50">
<tr>
<th className="p-4 text-left">Invoice</th>
<th className="p-4 text-left">Client</th>
<th className="p-4 text-left">Date</th>
<th className="p-4 text-left">Amount</th>
<th className="p-4 text-left">Status</th>
</tr>
</thead>

<tbody>
{invoices.map(inv=>(
<tr key={inv.id} className="border-t">
<td className="p-4 font-medium">{inv.number}</td>
<td className="p-4">{inv.client}</td>
<td className="p-4">{inv.date}</td>
<td className="p-4 font-semibold text-orange-600">₹{inv.total.toFixed(2)}</td>
<td className="p-4 capitalize">{inv.status}</td>
</tr>
))}
</tbody>

</table>

</Card>

</div>
);
};
