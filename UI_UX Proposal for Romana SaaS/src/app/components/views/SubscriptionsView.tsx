import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { DataTable, Column } from '../tables/DataTable';
import { Modal } from '../modals/Modal';
import { Plus, Edit2, Trash2, CreditCard, Calendar, AlertTriangle } from 'lucide-react';

interface Subscription {
  id: string;
  clientName: string;
  packageName: string;
  startDate: string;
  endDate: string;
  status: 'activa' | 'por vencer' | 'vencida';
  autoRenew: boolean;
}

const mockSubscriptions: Subscription[] = [
  { id: '1', clientName: 'María González', packageName: 'Paquete Premium', startDate: '15 Nov 2025', endDate: '15 Feb 2026', status: 'por vencer', autoRenew: true },
  { id: '2', clientName: 'Juan Pérez', packageName: 'Paquete Básico', startDate: '20 Dic 2025', endDate: '20 Mar 2026', status: 'activa', autoRenew: false },
  { id: '3', clientName: 'Sofia Martínez', packageName: 'Paquete Familiar', startDate: '01 Ago 2025', endDate: '01 Ago 2026', status: 'activa', autoRenew: true },
  { id: '4', clientName: 'Pedro Sánchez', packageName: 'Paquete Senior', startDate: '10 Sep 2025', endDate: '10 Mar 2026', status: 'activa', autoRenew: true },
  { id: '5', clientName: 'Laura Jiménez', packageName: 'Paquete Premium', startDate: '05 Jul 2025', endDate: '05 Ene 2026', status: 'vencida', autoRenew: false },
];

const statusConfig = {
  activa: { color: 'bg-green-100 text-green-700', label: 'Activa' },
  'por vencer': { color: 'bg-orange-100 text-orange-700', label: 'Por Vencer' },
  vencida: { color: 'bg-red-100 text-red-700', label: 'Vencida' }
};

export function SubscriptionsView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    packageName: '',
    startDate: '',
    endDate: '',
    autoRenew: false
  });

  const handleOpenModal = (subscription?: Subscription) => {
    if (subscription) {
      setSelectedSubscription(subscription);
      setFormData({
        clientName: subscription.clientName,
        packageName: subscription.packageName,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        autoRenew: subscription.autoRenew
      });
    } else {
      setSelectedSubscription(null);
      setFormData({ clientName: '', packageName: '', startDate: '', endDate: '', autoRenew: false });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubscription(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit:', formData);
    handleCloseModal();
  };

  const columns: Column<Subscription>[] = [
    {
      key: 'clientName',
      label: 'Cliente',
      render: (subscription) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {subscription.clientName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-medium text-foreground">{subscription.clientName}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{subscription.packageName}</div>
          </div>
        </div>
      )
    },
    {
      key: 'startDate',
      label: 'Periodo',
      render: (subscription) => (
        <div className="space-y-1 text-sm">
          <div className="text-muted-foreground">
            Inicio: <span className="text-foreground">{subscription.startDate}</span>
          </div>
          <div className="text-muted-foreground">
            Fin: <span className="text-foreground">{subscription.endDate}</span>
          </div>
        </div>
      )
    },
    {
      key: 'autoRenew',
      label: 'Renovación',
      render: (subscription) => (
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
          subscription.autoRenew
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {subscription.autoRenew ? 'Automática' : 'Manual'}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Estado',
      render: (subscription) => (
        <div className="flex items-center gap-2">
          {subscription.status === 'por vencer' && (
            <AlertTriangle className="w-4 h-4 text-orange-600" />
          )}
          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[subscription.status].color}`}>
            {statusConfig[subscription.status].label}
          </span>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Suscripciones" 
        subtitle="Gestiona las suscripciones de clientes"
        actions={
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Suscripción</span>
          </button>
        }
      />

      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Suscripciones Activas</p>
                <h3 className="text-3xl font-semibold text-foreground">3</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Por Vencer</p>
                <h3 className="text-3xl font-semibold text-orange-600">1</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Vencidas</p>
                <h3 className="text-3xl font-semibold text-red-600">1</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <DataTable
          data={mockSubscriptions}
          columns={columns}
          searchPlaceholder="Buscar por cliente o paquete..."
          emptyMessage="No se encontraron suscripciones"
          actions={(subscription) => (
            <>
              <button 
                onClick={() => handleOpenModal(subscription)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </button>
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </button>
            </>
          )}
        />
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedSubscription ? 'Editar Suscripción' : 'Nueva Suscripción'}
        subtitle={selectedSubscription ? 'Actualiza los datos de la suscripción' : 'Suscribe un cliente a un paquete'}
        size="lg"
        footer={
          <>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {selectedSubscription ? 'Guardar Cambios' : 'Crear Suscripción'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Cliente *
            </label>
            <select
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            >
              <option value="">Seleccionar cliente</option>
              <option value="María González">María González</option>
              <option value="Juan Pérez">Juan Pérez</option>
              <option value="Sofia Martínez">Sofia Martínez</option>
              <option value="Pedro Sánchez">Pedro Sánchez</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Paquete *
            </label>
            <select
              value={formData.packageName}
              onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            >
              <option value="">Seleccionar paquete</option>
              <option value="Paquete Básico">Paquete Básico - $150 (3 meses)</option>
              <option value="Paquete Premium">Paquete Premium - $350 (6 meses)</option>
              <option value="Paquete Familiar">Paquete Familiar - $500 (12 meses)</option>
              <option value="Paquete Senior">Paquete Senior - $280 (6 meses)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Fecha de Inicio *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Fecha de Fin *
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-4 bg-secondary rounded-lg">
            <input
              type="checkbox"
              id="autoRenew"
              checked={formData.autoRenew}
              onChange={(e) => setFormData({ ...formData, autoRenew: e.target.checked })}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="autoRenew" className="text-sm text-foreground cursor-pointer">
              Activar renovación automática al finalizar el periodo
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notas
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Información adicional sobre la suscripción..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
