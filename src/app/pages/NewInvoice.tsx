import React, { useState } from 'react';
import { Calendar, Save, Trash2, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { useAuth } from '../context/AuthContext';

interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export const NewInvoice: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', name: '', description: '', quantity: 1, price: 0 }
  ]);
  const [issueDate, setIssueDate] = useState('2026-02-19');
  const [dueDate, setDueDate] = useState('2026-02-26');
  const [notes, setNotes] = useState('');

  const addLineItem = () => {
    setItems([...items, { 
      id: Date.now().toString(), 
      name: '', 
      description: '', 
      quantity: 1, 
      price: 0 
    }]);
  };

  const removeLineItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-2">New Invoice</h1>
          <p className="text-gray-600">Create and send a new invoice</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="px-6">
            Cancel
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save & Send
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bill To & Invoice Number */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Bill To</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select Client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Client 1</SelectItem>
                    <SelectItem value="2">Client 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Invoice Number</Label>
                <Input 
                  value="INV-0001" 
                  readOnly 
                  className="mt-1 bg-gray-50"
                />
              </div>
            </div>
          </Card>

          {/* Dates */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Issue Date</Label>
                <div className="relative mt-1">
                  <Input 
                    type="date" 
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                  />
                  <Calendar className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <Label>Due Date</Label>
                <div className="relative mt-1">
                  <Input 
                    type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                  <Calendar className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </Card>

          {/* Items */}
          <Card className="p-6">
            <div className="mb-4">
              <div className="grid grid-cols-12 gap-4 text-sm text-gray-600 mb-2">
                <div className="col-span-4">Item</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Total</div>
                <div className="col-span-1"></div>
              </div>
            </div>

            {items.map((item) => (
              <div key={item.id} className="mb-4">
                <div className="grid grid-cols-12 gap-4 mb-2">
                  <div className="col-span-4">
                    <Select 
                      value={item.name}
                      onValueChange={(value) => updateItem(item.id, 'name', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select or type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="service1">Service 1</SelectItem>
                        <SelectItem value="service2">Service 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Input 
                      type="number" 
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="text-center"
                      min="1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input 
                      type="number" 
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                      className="text-center"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="col-span-3 flex items-center justify-center">
                    <span className="font-medium">${(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <button 
                      onClick={() => removeLineItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="col-span-12">
                  <Input 
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            ))}

            <Button 
              onClick={addLineItem}
              variant="outline" 
              className="mt-2 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Line Item
            </Button>
          </Card>

          {/* Notes */}
          <Card className="p-6">
            <Label>Notes</Label>
            <Textarea 
              placeholder="Payment terms, thank you note, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 min-h-24"
            />
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-orange-500">${total.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4">
              <h4 className="font-medium mb-2">From:</h4>
              <p className="text-gray-600">{user?.organization?.name || 'Your Company'}</p>
            </div>
            <Button variant="outline" className="w-full">
              Edit Organization Details
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
