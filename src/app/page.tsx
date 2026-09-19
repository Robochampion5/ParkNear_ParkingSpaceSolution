"use client";

import Link from 'next/link';
import { useState } from 'react';
import RenterDashboard from '@/components/renter-dashboard';
import HostDashboard from '@/components/host-dashboard';
import AdminDashboard from '@/components/admin-dashboard';
import HandoffDemo from '@/components/handoff-demo';
import { Layers, Sparkles } from 'lucide-react';

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<'Renter' | 'Host' | 'Admin' | null>(null);
  const [showHandoffDemo, setShowHandoffDemo] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-background text-foreground px-4 sm:px-6 lg:px-8">
      {/* Splash/Landing Section */}
      {!selectedRole && !showHandoffDemo && (
        <div className="text-center my-auto max-w-3xl">
          <h1 className="text-5xl font-bold text-action-blue mb-6">
            ParkNear
          </h1>
          <p className="text-2xl font-medium text-muted-foreground mb-4">
            Book with certainty. Park without circling.
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-foreground/80">
            Discover and book organized parking spaces in advance. Find verified spots with real-time availability, transparent pricing, and seamless booking—all powered by smart city technology.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setSelectedRole('Renter');
                setShowHandoffDemo(false);
              }}
              className="flex items-center justify-center px-6 py-3 bg-action-blue text-white font-medium rounded-xl hover:bg-action-blue/90 shadow-md shadow-action-blue/20 transition-all"
            >
              Continue as Renter
            </button>

            <button
              onClick={() => {
                setSelectedRole('Host');
                setShowHandoffDemo(false);
              }}
              className="flex items-center justify-center px-6 py-3 border border-border bg-card hover:bg-muted font-medium rounded-xl transition-all shadow-sm"
            >
              Continue as Host
            </button>

            <button
              onClick={() => {
                setSelectedRole('Admin');
                setShowHandoffDemo(false);
              }}
              className="flex items-center justify-center px-6 py-3 border border-border bg-card hover:bg-muted font-medium rounded-xl transition-all shadow-sm"
            >
              Continue as Admin
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50">
            <button
              onClick={() => setShowHandoffDemo(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deep-navy/[0.06] text-deep-navy hover:bg-deep-navy/10 font-medium text-sm transition-colors border border-border/40"
            >
              <Sparkles className="w-4 h-4 text-warm-amber" />
              Interactive Demo: How Handoffs Work
            </button>
          </div>
        </div>
      )}

      {/* Interactive Handoff Demo View */}
      {showHandoffDemo && (
        <div className="w-full max-w-4xl space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowHandoffDemo(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              ← Back to Overview
            </button>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-warm-amber/15 text-warm-amber text-xs font-semibold rounded-full">
                Interactive Simulation
              </span>
            </div>
          </div>

          <HandoffDemo />
        </div>
      )}

      {/* Dashboard Content based on role */}
      {selectedRole && !showHandoffDemo && (
        <div className="w-full max-w-6xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedRole(null)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back
              </button>
              <div className="flex items-center bg-muted/60 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedRole('Renter')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    selectedRole === 'Renter' ? 'bg-card text-deep-navy shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Renter
                </button>
                <button
                  onClick={() => setSelectedRole('Host')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    selectedRole === 'Host' ? 'bg-card text-deep-navy shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Host
                </button>
                <button
                  onClick={() => setSelectedRole('Admin')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    selectedRole === 'Admin' ? 'bg-card text-deep-navy shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowHandoffDemo(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-deep-navy/80 hover:text-deep-navy bg-card border border-border/60 px-3 py-1.5 rounded-lg shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-warm-amber" />
              Demo Handoffs
            </button>
          </div>

          <div>
            {selectedRole === 'Renter' && <RenterDashboard />}
            {selectedRole === 'Host' && <HostDashboard />}
            {selectedRole === 'Admin' && <AdminDashboard />}
          </div>
        </div>
      )}
    </div>
  );
}
