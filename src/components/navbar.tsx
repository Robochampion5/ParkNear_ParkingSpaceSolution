"use client";

import { useState } from 'react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<'Renter' | 'Host' | 'Admin'>('Renter');

  return (
    <nav className="border-b border-border/50 bg-background/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-action-blue">
              ParkNear
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('Renter')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'Renter'
                  ? 'bg-action-blue/10 text-action-blue'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              Renter
            </button>
            <button
              onClick={() => setActiveTab('Host')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'Host'
                  ? 'bg-action-blue/10 text-action-blue'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              Host
            </button>
            <button
              onClick={() => setActiveTab('Admin')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'Admin'
                  ? 'bg-action-blue/10 text-action-blue'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              Admin
            </button>
          </div>

          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as 'Renter' | 'Host' | 'Admin')}
              className="border border-input bg-background px-3 py-1.5 rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="Renter">Renter</option>
              <option value="Host">Host</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}