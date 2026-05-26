import { encounterModel } from '../../../infraestructure/dataproviders/mongodb-dataprovider/models/encounter.model';
import { asyncHandler } from '../middlewares/asyncHandler';

// CREATE
export const createEncounter = asyncHandler(async (req, res) => {
  const data = req.body;

  const encounter = await encounterModel.create(data);

  res.status(201).json(encounter);
});

// GET by patient
export const getPatientEncounters = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const encounters = await encounterModel.find({ patientId });

  res.status(200).json(encounters);
});

// GET by appointment
export const getEncounterByAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;

  const encounter = await encounterModel.findOne({ appointmentId });

  if (!encounter) {
    return res.status(404).json({
      message: 'Nota clínica no encontrada para esta cita',
    });
  }

  res.status(200).json(encounter);
});

// UPDATE
export const updateEncounter = asyncHandler(async (req, res) => {
  const { encounterId } = req.params;
  const data = req.body;

  const encounter = await encounterModel.findByIdAndUpdate(
    encounterId,
    data,
    { new: true, runValidators: true },
  );

  if (!encounter) {
    return res.status(404).json({
      message: 'Nota clínica no encontrada',
    });
  }

  res.status(200).json(encounter);
});

// DELETE
export const deleteEncounter = asyncHandler(async (req, res) => {
  const { encounterId } = req.params;

  const encounter = await encounterModel.findByIdAndDelete(encounterId);

  if (!encounter) {
    return res.status(404).json({
      message: 'Nota clínica no encontrada',
    });
  }

  res.status(200).json({
    message: 'Encounter eliminado correctamente',
  });
});