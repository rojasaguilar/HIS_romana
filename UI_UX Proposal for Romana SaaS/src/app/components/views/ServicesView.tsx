import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { DataTable, Column } from '../tables/DataTable';
import { Modal } from '../modals/Modal';
import { Plus, Edit2, Trash2, DollarSign, Clock } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: number;
  status: 'activo' | 'inactivo';
}

const mockServices: Service[] = [
  { id: '1', name: 'Consulta General', category: 'Medicina General', duration: '30 min', price: 50, status: 'activo' },
  { id: '2', name: 'Consulta Dermatológica', category: 'Dermatología', duration: '45 min', price: 75, status: 'activo' },
  { id: '3', name: 'Consulta Cardiológica', category: 'Cardiología', duration: '60 min', price: 100, status: 'activo' },
  { id: '4', name: 'Consulta Pediátrica', category: 'Pediatría', duration: '30 min', price: 60, status: 'activo' },
  { id: '5', name: 'Examen de Laboratorio', category: 'Laboratorio', duration: '15 min', price: 35, status: 'activo' },
  { id: '6', name: 'Radiografía', category: 'Imagenología', duration: '20 min', price: 80, status: 'activo' },
];

export function ServicesView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    duration: '',
    price: ''
  });

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setSelectedService(service);
      setFormData({
        name: service.name,
        category: service.category,
        duration: service.duration,
        price: service.price.toString()
      });
    } else {
      setSelectedService(null);
      setFormData({ name: '', category: '', duration: '', price: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit:', formData);
    handleCloseModal();
  };

  const columns: Column<Service>[] = [
    {
      key: 'name',
      label: 'Servicio',
      render: (service) => (
        <div>
          <div className="font-medium text-foreground">{service.name}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{service.category}</div>
        </div>
      )
    },
    {
      key: 'duration',
      label: 'Duración',
      render: (service) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{service.duration}</span>
        </div>
      )
    },
    {
      key: 'price',
      label: 'Precio',
      render: (service) => (
        <div className="flex items-center gap-1 font-medium text-foreground">
          <DollarSign className="w-4 h-4" />
          <span>{service.price}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Estado',
      render: (service) => (
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
          service.status === 'activo'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {service.status}
        </span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Servicios" 
        subtitle="Gestiona los servicios médicos"
        actions={
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Servicio</span>
          </button>
        }
      />

      <div className="p-8">
        <DataTable
          data={mockServices}
          columns={columns}
          searchPlaceholder="Buscar por nombre o categoría..."
          emptyMessage="No se encontraron servicios"
          actions={(service) => (
            <>
              <button 
                onClick={() => handleOpenModal(service)}
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
        title={selectedService ? 'Editar Servicio' : 'Nuevo Servicio'}
        subtitle={selectedService ? 'Actualiza los datos del servicio' : 'Agrega un nuevo servicio médico'}
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
              {selectedService ? 'Guardar Cambios' : 'Crear Servicio'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nombre del Servicio *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="Ej: Consulta General"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Categoría *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              >
                <option value="">Seleccionar categoría</option>
                <option value="Medicina General">Medicina General</option>
                <option value="Dermatología">Dermatología</option>
                <option value="Cardiología">Cardiología</option>
                <option value="Pediatría">Pediatría</option>
                <option value="Laboratorio">Laboratorio</option>
                <option value="Imagenología">Imagenología</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Duración *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="Ej: 30 min"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Precio ($) *
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="50"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Descripción
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Descripción del servicio..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
