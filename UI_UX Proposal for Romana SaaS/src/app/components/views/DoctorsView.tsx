import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { DataTable, Column } from '../tables/DataTable';
import { Modal } from '../modals/Modal';
import { Plus, Edit2, Trash2, Mail, Phone, Award } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  patients: number;
  status: 'activo' | 'inactivo';
}

const mockDoctors: Doctor[] = [
  { id: '1', name: 'Dr. Carlos Ruiz', specialty: 'Medicina General', email: 'carlos.r@romana.com', phone: '555-0201', patients: 45, status: 'activo' },
  { id: '2', name: 'Dra. Ana López', specialty: 'Dermatología', email: 'ana.l@romana.com', phone: '555-0202', patients: 38, status: 'activo' },
  { id: '3', name: 'Dr. Luis Torres', specialty: 'Cardiología', email: 'luis.t@romana.com', phone: '555-0203', patients: 52, status: 'activo' },
  { id: '4', name: 'Dra. Patricia Vega', specialty: 'Pediatría', email: 'patricia.v@romana.com', phone: '555-0204', patients: 67, status: 'activo' },
  { id: '5', name: 'Dr. Roberto Díaz', specialty: 'Traumatología', email: 'roberto.d@romana.com', phone: '555-0205', patients: 41, status: 'activo' },
];

interface DoctorsViewProps {
  onViewDetail?: (doctorId: string) => void;
}

export function DoctorsView({ onViewDetail }: DoctorsViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    email: '',
    phone: ''
  });

  const handleOpenModal = (doctor?: Doctor) => {
    if (doctor) {
      setSelectedDoctor(doctor);
      setFormData({
        name: doctor.name,
        specialty: doctor.specialty,
        email: doctor.email,
        phone: doctor.phone
      });
    } else {
      setSelectedDoctor(null);
      setFormData({ name: '', specialty: '', email: '', phone: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit:', formData);
    handleCloseModal();
  };

  const handleRowClick = (doctor: Doctor) => {
    if (onViewDetail) {
      onViewDetail(doctor.id);
    }
  };

  const columns: Column<Doctor>[] = [
    {
      key: 'name',
      label: 'Médico',
      render: (doctor) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Award className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <div className="font-medium text-foreground">{doctor.name}</div>
            <div className="text-xs text-muted-foreground">{doctor.specialty}</div>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Contacto',
      render: (doctor) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Mail className="w-3 h-3" />
            <span>{doctor.email}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Phone className="w-3 h-3" />
            <span>{doctor.phone}</span>
          </div>
        </div>
      )
    },
    {
      key: 'patients',
      label: 'Pacientes',
      render: (doctor) => (
        <span className="text-foreground font-medium">{doctor.patients}</span>
      )
    },
    {
      key: 'status',
      label: 'Estado',
      render: (doctor) => (
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
          doctor.status === 'activo'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {doctor.status}
        </span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Médicos" 
        subtitle="Gestiona el equipo médico"
        actions={
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Médico</span>
          </button>
        }
      />

      <div className="p-8">
        <DataTable
          data={mockDoctors}
          columns={columns}
          searchPlaceholder="Buscar por nombre o especialidad..."
          emptyMessage="No se encontraron médicos"
          onRowClick={handleRowClick}
          actions={(doctor) => (
            <>
              <button 
                onClick={() => handleOpenModal(doctor)}
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
        title={selectedDoctor ? 'Editar Médico' : 'Nuevo Médico'}
        subtitle={selectedDoctor ? 'Actualiza los datos del médico' : 'Agrega un nuevo médico al equipo'}
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
              {selectedDoctor ? 'Guardar Cambios' : 'Crear Médico'}
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
                placeholder="Ej: Dr. Carlos Ruiz"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Especialidad *
              </label>
              <input
                type="text"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="Ej: Medicina General"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="doctor@romana.com"
                required
              />
            </div>

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
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Horario de Atención
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Lunes a Viernes: 9:00 AM - 5:00 PM"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}