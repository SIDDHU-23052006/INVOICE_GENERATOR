import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '../components/ui/button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-semibold">Invoicer</span>
        </div>
        <nav className="flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
          <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
          <Button 
            onClick={() => navigate('/login')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-lg"
          >
            Sign in
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-8 py-20 text-center">
        <div className="inline-block mb-6">
          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm">
            New Version 2.0 Live
          </span>
        </div>

        <h1 className="text-6xl max-w-4xl mb-6">
          Invoicing for the <span className="text-orange-500">Modern Pro.</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mb-12">
          Create beautiful invoices, track payments, and manage clients with an
          intuitive dashboard designed for freelancers and agencies.
        </p>

        <div className="flex gap-4">
          <Button
            onClick={() => navigate('/signup')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-lg flex items-center gap-2"
          >
            Get Started Free
            <span>→</span>
          </Button>
          <Button
            onClick={() => navigate('/login')}
            variant="outline"
            className="px-8 py-6 text-lg rounded-lg border-gray-300"
          >
            View Demo
          </Button>
        </div>
      </main>
    </div>
  );
};