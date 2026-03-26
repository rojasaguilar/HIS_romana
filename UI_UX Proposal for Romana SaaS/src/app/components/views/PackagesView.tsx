import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { DataTable, Column } from '../tables/DataTable';
import { Modal } from '../modals/Modal';
import { Plus, Edit2, Trash2, Package as PackageIcon, DollarSign } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  description: string;
  services: string[];
  price: number;
  duration: string;
  subscribers: number;
  status: 'activo' | 'inactivo';
}

const mockPackages: Package[] = [
  { id: '1', name: 'Paquete Básico', description: 'Servicios esenciales', services: ['Consulta General', 'Examen de Lab'], price: 150, duration: '3 meses', subscribers: 156, status: 'activo' },
  { id: '2', name: 'Paquete Premium', description: 'Servicios completos', services: ['Consulta General', 'Especialidades', 'Laboratorio', 'Descuentos'], price: 350, duration: '6 meses', subscribers: 243, status: 'activo' },
  { id: '3', name: 'Paquete Familiar', description: 'Para toda la familia', services: ['Consultas ilimitadas', 'Laboratorio', 'Emergencias'], price: 500, duration: '12 meses', subscribers: 89, status: 'activo' },
  { id: '4', name: 'Paquete Senior', description: 'Atención especializada', services: ['Cardiología', 'Geriatría', 'Laboratorio'], price: 280, duration: '6 meses', subscribers: 67, status: 'activo' },
];

export function PackagesView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: ''
  });

  const handleOpenModal = (pkg?: Package) => {
    if (pkg) {
      setSelectedPackage(pkg);
      setFormData({
        name: pkg.name,
        description: pkg.description,
        price: pkg.price.toString(),
        duration: pkg.duration
      });
    } else {
      setSelectedPackage(null);
      setFormData({ name: '', description: '', price: '', duration: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit:', formData);
    handleCloseModal();
  };

  const columns: Column<Package>[] = [
    {
      key: 'name',
      label: 'Paquete',
      render: (pkg) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <PackageIcon className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <div className="font-medium text-foreground">{pkg.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{pkg.description}</div>
          </div>
        </div>
      )
    },
    {
      key: 'services',
      label: 'Servicios Incluidos',
      render: (pkg) => (
        <div className="text-sm text-muted-foreground">
          {pkg.services.length} servicios
        </div>
      )
    },
    {
      key: 'duration',
      label: 'Duración',
      render: (pkg) => (
        <span className="text-foreground">{pkg.duration}</span>
      )
    },
    {
      key: 'price',
      label: 'Precio',
      render: (pkg) => (
        <div className="flex items-center gap-1 font-medium text-foreground">
          <DollarSign className="w-4 h-4" />
          <span>{pkg.price}</span>
        </div>
      )
    },
    {
      key: 'subscribers',
      label: 'Suscriptores',
      render: (pkg) => (
        <span className="text-foreground font-medium">{pkg.subscribers}</span>
      )
    },
    {
      key: 'status',
      label: 'Estado',
      render: (pkg) => (
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
          pkg.status === 'activo'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {pkg.status}
        </span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Paquetes" 
        subtitle="Gestiona los paquetes de servicios"
        actions={
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Paquete</span>
          </button>
        }
      />

      <div className="p-8">
        <DataTable
          data={mockPackages}
          columns={columns}
          searchPlaceholder="Buscar por nombre o descripción..."
          emptyMessage="No se encontraron paquetes"
          actions={(pkg) => (
            <>
              <button 
                onClick={() => handleOpenModal(pkg)}
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
        title={selectedPackage ? 'Editar Paquete' : 'Nuevo Paquete'}
        subtitle={selectedPackage ? 'Actualiza los datos del paquete' : 'Crea un nuevo paquete de servicios'}
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
              {selectedPackage ? 'Guardar Cambios' : 'Crear Paquete'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nombre del Paquete *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="Ej: Paquete Premium"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Descripción *
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="Ej: Servicios completos de salud"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Precio ($) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="350"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Duración *
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              >
                <option value="">Seleccionar duración</option>
                <option value="1 mes">1 mes</option>
                <option value="3 meses">3 meses</option>
                <option value="6 meses">6 meses</option>
                <option value="12 meses">12 meses</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Servicios Incluidos *
            </label>
            <div className="space-y-2 p-4 border border-border rounded-lg">
              {['Consulta General', 'Especialidades', 'Laboratorio', 'Radiografías', 'Descuentos especiales'].map((service) => (
                <label key={service} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Detalles Adicionales
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Beneficios adicionales, términos y condiciones..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
