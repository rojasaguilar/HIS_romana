// src/modules/conditions/controllers/condition.controller.js

import { ConditionModel } from '../../../infraestructure/dataproviders/mongodb-dataprovider/models/conditions.model';

// ==============================
// CREATE CONDITION
// ==============================
const createCondition = async (req, res) => {
  try {
    const condition = await ConditionModel.create(req.body);

    return res.status(201).json(condition);
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating condition',
      error: error.message,
    });
  }
};

// ==============================
// GET ALL CONDITIONS
// ==============================
export const getConditions = async (req, res) => {
  try {
    const conditions = await ConditionModel
      .find
      //     {
      //   isActive: true,
      // }
      ();

    const mappedConditions = conditions?.map((c) => ({
      id: c._id,
      code: c.code,
      name: c.name,
    }));

    return res.json(mappedConditions);
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching conditions',
      error: error.message,
    });
  }
};

// ==============================
// GET CONDITION BY ID
// ==============================
export const getConditionById = async (req, res) => {
  try {
    const { id } = req.params;

    const condition = await ConditionModel.findById(id);

    if (!condition) {
      return res.status(404).json({
        message: 'Condition not found',
      });
    }

    return res.json(condition);
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching condition',
      error: error.message,
    });
  }
};

// ==============================
// UPDATE CONDITION
// ==============================
const updateCondition = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCondition = await ConditionModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      },
    );

    if (!updatedCondition) {
      return res.status(404).json({
        message: 'Condition not found',
      });
    }

    return res.json(updatedCondition);
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating condition',
      error: error.message,
    });
  }
};

// ==============================
// DELETE CONDITION (SOFT DELETE)
// ==============================
const deleteCondition = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCondition = await ConditionModel.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      {
        new: true,
      },
    );

    if (!deletedCondition) {
      return res.status(404).json({
        message: 'Condition not found',
      });
    }

    return res.json({
      message: 'Condition deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting condition',
      error: error.message,
    });
  }
};
