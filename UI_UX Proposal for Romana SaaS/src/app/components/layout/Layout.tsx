import React from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  role: "gerente" | "recepcionista" | "medico" | "nutriologo";
  currentView: string;
  onNavigate: (view: string) => void;
  children: React.ReactNode;
}

export function Layout({
  role,
  currentView,
  onNavigate,
  children,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} currentView={currentView} onNavigate={onNavigate} />
      <div className="ml-64">{children}</div>
    </div>
  );
}
