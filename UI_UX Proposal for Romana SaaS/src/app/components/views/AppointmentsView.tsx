import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { DataTable, Column } from '../tables/DataTable';
import { Modal } from '../modals/Modal';
import { Plus, Edit2, Trash2, Calendar as CalendarIcon, Clock, User } from 'lucide-react';

interface Appointment {
  id: string;
  clientName: string;
  doctorName: string;
  service: string;
  date: string;
  time: string;
  status: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
}

const mockAppointments: Appointment[] = [
  { id: '1', clientName: 'María González', doctorName: 'Dr. Carlos Ruiz', service: 'Consulta General', date: '10 Feb 2026', time: '09:00 AM', status: 'confirmada' },
  { id: '2', clientName: 'Juan Pérez', doctorName: 'Dra. Ana López', service: 'Dermatología', date: '10 Feb 2026', time: '10:30 AM', status: 'pendiente' },
  { id: '3', clientName: 'Sofia Martínez', doctorName: 'Dr. Carlos Ruiz', service: 'Pediatría', date: '10 Feb 2026', time: '11:00 AM', status: 'confirmada' },
  { id: '4', clientName: 'Pedro Sánchez', doctorName: 'Dr. Luis Torres', service: 'Cardiología', date: '11 Feb 2026', time: '02:00 PM', status: 'confirmada' },
  { id: '5', clientName: 'Laura Jiménez', doctorName: 'Dra. Ana López', service: 'Consulta General', date: '11 Feb 2026', time: '03:30 PM', status: 'pendiente' },
  { id: '6', clientName: 'Carlos Rivera', doctorName: 'Dr. Roberto Díaz', service: 'Traumatología', date: '12 Feb 2026', time: '09:00 AM', status: 'confirmada' },
];

const statusConfig = {
  pendiente: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Pendiente' },
  confirmada: { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Confirmada' },
  completada: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Completada' },
  cancelada: { color: 'bg-red-100 text-red-700 border-red-200', label: 'Cancelada' }
};

export function AppointmentsView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    doctorName: '',
    service: '',
    date: '',
    time: ''
  });

  const handleOpenModal = (appointment?: Appointment) => {
    if (appointment) {
      setSelectedAppointment(appointment);
      setFormData({
        clientName: appointment.clientName,
        doctorName: appointment.doctorName,
        service: appointment.service,
        date: appointment.date,
        time: appointment.time
      });
    } else {
      setSelectedAppointment(null);
      setFormData({ clientName: '', doctorName: '', service: '', date: '', time: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit:', formData);
    handleCloseModal();
  };

  const columns: Column<Appointment>[] = [
    {
      key: 'clientName',
      label: 'Cliente',
      render: (appointment) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{appointment.clientName}</span>
        </div>
      )
    },
    {
      key: 'doctorName',
      label: 'Médico',
      render: (appointment) => (
        <div>
          <div className="text-foreground">{appointment.doctorName}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{appointment.service}</div>
        </div>
      )
    },
    {
      key: 'date',
      label: 'Fecha y Hora',
      render: (appointment) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-foreground">
            <CalendarIcon className="w-3 h-3" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{appointment.time}</span>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Estado',
      render: (appointment) => (
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[appointment.status].color}`}>
          {statusConfig[appointment.status].label}
        </span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Citas" 
        subtitle="Gestiona las citas médicas"
        actions={
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Cita</span>
          </button>
        }
      />

      <div className="p-8">
        <DataTable
          data={mockAppointments}
          columns={columns}
          searchPlaceholder="Buscar por cliente, médico o servicio..."
          emptyMessage="No se encontraron citas"
          actions={(appointment) => (
            <>
              <button 
                onClick={() => handleOpenModal(appointment)}
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
        title={selectedAppointment ? 'Editar Cita' : 'Nueva Cita'}
        subtitle={selectedAppointment ? 'Actualiza los datos de la cita' : 'Programa una nueva cita médica'}
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
              {selectedAppointment ? 'Guardar Cambios' : 'Crear Cita'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Médico *
              </label>
              <select
                value={formData.doctorName}
                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              >
                <option value="">Seleccionar médico</option>
                <option value="Dr. Carlos Ruiz">Dr. Carlos Ruiz</option>
                <option value="Dra. Ana López">Dra. Ana López</option>
                <option value="Dr. Luis Torres">Dr. Luis Torres</option>
                <option value="Dra. Patricia Vega">Dra. Patricia Vega</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Servicio *
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            >
              <option value="">Seleccionar servicio</option>
              <option value="Consulta General">Consulta General</option>
              <option value="Dermatología">Dermatología</option>
              <option value="Cardiología">Cardiología</option>
              <option value="Pediatría">Pediatría</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Fecha *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Hora *
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notas
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Notas adicionales sobre la cita..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
