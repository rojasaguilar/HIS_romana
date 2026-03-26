import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { DataTable, Column } from '../tables/DataTable';
import { Modal } from '../modals/Modal';
import { Plus, Edit2, Trash2, Mail, Phone } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  subscription: string;
  status: 'activo' | 'inactivo';
}

const mockClients: Client[] = [
  { id: '1', name: 'María González', email: 'maria.g@email.com', phone: '555-0101', memberSince: '12 Ene 2024', subscription: 'Paquete Premium', status: 'activo' },
  { id: '2', name: 'Juan Pérez', email: 'juan.p@email.com', phone: '555-0102', memberSince: '15 Feb 2024', subscription: 'Paquete Básico', status: 'activo' },
  { id: '3', name: 'Sofia Martínez', email: 'sofia.m@email.com', phone: '555-0103', memberSince: '20 Mar 2024', subscription: 'Sin paquete', status: 'activo' },
  { id: '4', name: 'Pedro Sánchez', email: 'pedro.s@email.com', phone: '555-0104', memberSince: '05 Abr 2024', subscription: 'Paquete Familiar', status: 'activo' },
  { id: '5', name: 'Laura Jiménez', email: 'laura.j@email.com', phone: '555-0105', memberSince: '10 May 2024', subscription: 'Paquete Premium', status: 'activo' },
  { id: '6', name: 'Carlos Rivera', email: 'carlos.r@email.com', phone: '555-0106', memberSince: '22 Jun 2024', subscription: 'Paquete Básico', status: 'inactivo' },
];

interface ClientsViewProps {
  onViewDetail?: (clientId: string) => void;
}

export function ClientsView({ onViewDetail }: ClientsViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subscription: ''
  });

  const handleOpenModal = (client?: Client) => {
    if (client) {
      setSelectedClient(client);
      setFormData({
        name: client.name,
        email: client.email,
        phone: client.phone,
        subscription: client.subscription
      });
    } else {
      setSelectedClient(null);
      setFormData({ name: '', email: '', phone: '', subscription: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submit:', formData);
    handleCloseModal();
  };

  const handleRowClick = (client: Client) => {
    if (onViewDetail) {
      onViewDetail(client.id);
    }
  };

  const columns: Column<Client>[] = [
    {
      key: 'name',
      label: 'Nombre',
      render: (client) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {client.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-medium text-foreground">{client.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Mail className="w-3 h-3" />
              {client.email}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Teléfono',
      render: (client) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Phone className="w-4 h-4" />
          <span>{client.phone}</span>
        </div>
      )
    },
    {
      key: 'subscription',
      label: 'Suscripción',
      render: (client) => (
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
          client.subscription === 'Sin paquete'
            ? 'bg-gray-100 text-gray-700'
            : 'bg-primary/10 text-primary'
        }`}>
          {client.subscription}
        </span>
      )
    },
    {
      key: 'memberSince',
      label: 'Miembro desde'
    },
    {
      key: 'status',
      label: 'Estado',
      render: (client) => (
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
          client.status === 'activo'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {client.status}
        </span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Clientes" 
        subtitle="Gestiona tu base de clientes"
        actions={
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Paciente</span>
          </button>
        }
      />

      <div className="p-8">
        <DataTable
          data={mockClients}
          columns={columns}
          searchPlaceholder="Buscar por nombre, email o teléfono..."
          emptyMessage="No se encontraron clientes"
          onRowClick={handleRowClick}
          actions={(client) => (
            <>
              <button 
                onClick={() => handleOpenModal(client)}
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
        title={selectedClient ? 'Editar Paciente' : 'Nuevo Paciente'}
        subtitle={selectedClient ? 'Actualiza los datos del paciente' : 'Agrega un nuevo paciente al sistema'}
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
              {selectedClient ? 'Guardar Cambios' : 'Crear Paciente'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="Ej: María González"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="maria.g@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="555-0000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Suscripción
              </label>
              <select
                value={formData.subscription}
                onChange={(e) => setFormData({ ...formData, subscription: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Sin paquete</option>
                <option value="Paquete Básico">Paquete Básico</option>
                <option value="Paquete Premium">Paquete Premium</option>
                <option value="Paquete Familiar">Paquete Familiar</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notas Adicionales
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Información adicional sobre el paciente..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}