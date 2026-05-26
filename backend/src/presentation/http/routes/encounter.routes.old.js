import express from 'express';

import {
  createEncounter,
  updateEncounter,
  getPatientEncounters,
  getEncounterByAppointment,
  deleteEncounter,
} from '../controllers/encounter.controller.new';

const router = express.Router();

// ==============================
// CREATE
// ==============================
router.post('/', createEncounter);

// ==============================
// UPDATE
// ==============================
router.patch('/:encounterId', updateEncounter);

// ==============================
// GET BY PATIENT
// ==============================
router.get('/patient/:patientId', getPatientEncounters);

// ==============================
// GET BY APPOINTMENT
// ==============================
router.get('/appointment/:appointmentId', getEncounterByAppointment);

// ==============================
// DELETE
// ==============================
router.delete('/:encounterId', deleteEncounter);

export default router;
