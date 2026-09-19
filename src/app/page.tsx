"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<'Renter' | 'Host' | 'Admin' | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 sm:px-6 lg:px-8">
      {/* Splash/Landing Section */}
      {!selectedRole && (
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-action-blue mb-6">
            ParkNear
          </h1>
          <p className="text-2xl font-medium text-muted-foreground mb-4">
            Book with certainty. Park without circling.
          </p>
          <p className="text-lg max-w-2xl">
            Discover and book organized parking spaces in advance. Find verified spots with real-time availability, transparent pricing, and seamless booking—all powered by smart city technology.
          </p>

          <div className="mt-10 space-x-4">
            <Link
              href="/dashboard?role=renter"
              onClick={(e) => {
                e.preventDefault();
                setSelectedRole('Renter');
              }}
              className="flex items-center justify-center px-6 py-3 bg-action-blue/10 text-action-blue font-medium rounded-xl hover:bg-action-blue/20 transition-colors"
            >
              Continue as Renter
            </Link>

            <Link
              href="/dashboard?role=host"
              onClick={(e) => {
                e.preventDefault();
                setSelectedRole('Host');
              }}
              className="flex items-center justify-center px-6 py-3 border border-input/50 bg-background/50 hover:bg-muted/50 rounded-xl font-medium transition-colors"
            >
              Continue as Host
            </Link>

            <Link
              href="/dashboard?role=admin"
              onClick={(e) => {
                e.preventDefault();
                setSelectedRole('Admin');
              }}
              className="flex items-center justify-center px-6 py-3 border border-input/50 bg-background/50 hover:bg-muted/50 rounded-xl font-medium transition-colors"
            >
              Continue as Admin
            </Link>
          </div>
        </div>
      )}

      {/* Dashboard Content based on role */}
      {selectedRole && (
        <div className="w-full max-w-4xl">
          <div className="mb-6 flex items-center space-x-3">
            <button
              onClick={() => setSelectedRole(null)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Switch Role
            </button>
            <span className="px-3 py-1 bg-muted/50 text-xs rounded-full">
              {selectedRole} Dashboard
            </span>
          </div>

          <div className="space-y-8">
            {/* Role-specific content will go here */}
            <div className="bg-card/50 rounded-xl p-6 border border-border/50">
              <h2 className="text-xl font-semibold mb-4">{selectedRole} Dashboard</h2>
              <p className="text-muted-foreground">
                This is where the {selectedRole.toLowerCase()}-specific interface will be implemented.
                Features will be built out in subsequent phases according to the implementation plan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}