import React from 'react';
import { AlertTriangle, TrendingDown } from 'lucide-react';

interface Subscription {
  id: string;
  clientName: string;
  packageName: string;
  expiryDate: string;
  daysLeft: number;
}

interface ExpiringSubscriptionsProps {
  subscriptions: Subscription[];
}

export function ExpiringSubscriptions({ subscriptions }: ExpiringSubscriptionsProps) {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Suscripciones por Vencer</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {subscriptions.length} clientes requieren atención
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
        </div>
      </div>

      <div className="space-y-3">
        {subscriptions.length === 0 ? (
          <div className="text-center py-8">
            <TrendingDown className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">
              No hay suscripciones próximas a vencer
            </p>
          </div>
        ) : (
          subscriptions.map(subscription => {
            const isUrgent = subscription.daysLeft <= 7;
            
            return (
              <div 
                key={subscription.id}
                className={`p-4 rounded-lg border transition-colors ${
                  isUrgent 
                    ? 'border-orange-200 bg-orange-50' 
                    : 'border-border hover:border-primary'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">
                      {subscription.clientName}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {subscription.packageName}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isUrgent 
                      ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                      : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}>
                    {subscription.daysLeft} días
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Vence: {subscription.expiryDate}
                </div>
              </div>
            );
          })
        )}
      </div>

      {subscriptions.length > 0 && (
        <button className="w-full mt-4 py-2 text-sm text-primary hover:text-primary/80 font-medium">
          Contactar clientes
        </button>
      )}
    </div>
  );
}
