// src/modules/conditions/routes/condition.routes.js

import express from 'express';

import {
  getConditions,
  getConditionById,
} from './../controllers/conditions.controller';

const router = express.Router();

// ==============================
// GET ALL
// ==============================
router.get('/', getConditions);

// ==============================
// GET BY ID
// ==============================
router.get('/:id', getConditionById);

// ==============================
// CREATE
// ==============================
// router.post('/', createCondition);

// ==============================
// UPDATE
// ==============================
// router.patch('/:id', updateCondition);

// ==============================
// DELETE (SOFT DELETE)
// ==============================
// router.delete('/:id', deleteCondition);

export default router;
