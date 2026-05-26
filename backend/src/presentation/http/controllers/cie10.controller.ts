import { Cie10Catalog } from '../../../infraestructure/dataproviders/mongodb-dataprovider/models/cie10.model';
import { asyncHandler } from '../middlewares/asyncHandler';

// GET search (Para el autocomplete del front)
export const searchCie10 = asyncHandler(async (req, res) => {
  const { search } = req.query;

  // Si no hay término de búsqueda, devolvemos un arreglo vacío para no saturar la red
  if (!search) {
    return res.status(200).json([]);
  }

  const searchTerm = search.toString();

  const results = await Cie10Catalog.find({
    $or: [
      // Busca coincidencias parciales en el código (ej. "J0", "00")
      { code: { $regex: searchTerm, $options: 'i' } },
      
      // Busca coincidencias parciales en la descripción (ej. "trans", "aguda")
      { description: { $regex: searchTerm, $options: 'i' } }
    ],
  })
    .limit(20) // Límite para mantener la respuesta rápida en el autocomplete
    .select('code description level -_id'); // Excluimos el _id de Mongo si no es necesario en el front
  
  res.status(200).json(results);
});