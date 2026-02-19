import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export const Settings: React.FC = () => {
  const { user, updateOrganization } = useAuth();
  
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [taxId, setTaxId] = useState('');
  const [invoiceSequence, setInvoiceSequence] = useState('1');

  useEffect(() => {
    if (user?.organization) {
      setCompanyName(user.organization.name || '');
      setEmail(user.organization.email || '');
      setPhone(user.organization.phone || '');
      setAddress(user.organization.address || '');
      setTaxId(user.organization.taxId || '');
    }
  }, [user]);

  const handleSave = () => {
    updateOrganization({
      name: companyName,
      email,
      phone,
      address,
      taxId,
    });
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Settings</h1>
        <p className="text-gray-600">Manage your organization details</p>
      </div>

      {/* Settings Form */}
      <Card className="p-8 max-w-3xl">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Organization Profile</h2>
          <p className="text-gray-600">These details will appear on your invoices.</p>
        </div>

        <div className="space-y-6">
          {/* Company Name */}
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Your Company LLC"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="billing@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="+1 234..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="123 Business Rd, City, Country"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Tax ID and Invoice Sequence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="taxId">Tax ID / VAT Number</Label>
              <Input
                id="taxId"
                placeholder="TAX-123456"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="invoiceSequence">Next Invoice Sequence #</Label>
              <Input
                id="invoiceSequence"
                type="number"
                value={invoiceSequence}
                onChange={(e) => setInvoiceSequence(e.target.value)}
                className="mt-1"
                min="1"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button 
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
