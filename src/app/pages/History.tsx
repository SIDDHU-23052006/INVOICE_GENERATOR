import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface Invoice {
  id: string;
  number: string;
  client: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

export const History: React.FC = () => {
  // Mock invoice history - empty initially
  const invoices: Invoice[] = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Invoice History</h1>
        <p className="text-gray-600">View and manage past invoices</p>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Number</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Client</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Date</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{invoice.number}</td>
                  <td className="px-6 py-4">{invoice.client}</td>
                  <td className="px-6 py-4 text-gray-600">{invoice.date}</td>
                  <td className="px-6 py-4 font-medium">${invoice.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
