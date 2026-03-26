import React from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 w-64 bg-secondary border border-transparent rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
          </button>

          {/* User Menu */}
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">AD</span>
            </div>
            <span className="text-sm font-medium text-foreground hidden md:block">Admin</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
          </button>

          {/* Actions */}
          {actions}
        </div>
      </div>
    </header>
  );
}
