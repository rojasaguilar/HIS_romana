import express from 'express';

import {
  searchCie10,
} from './../controllers/cie10.controller';

const router = express.Router();

// ==============================
// GET SEARCH (Autocomplete)
// ==============================
router.get('/', searchCie10);

export default router;