import { useState, useEffect } from "react";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useSearchCie10 } from "../hooks/useEncounter";

interface Cie10AutocompleteProps {
  index: number;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  inputClass: string;
  labelClass: string;
}

export const Cie10Autocomplete = ({
  index,
  setValue,
  watch,
  inputClass,
  labelClass,
}: Cie10AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Observamos el valor actual del form por si se cargó en modo "edición"
  const currentCode = watch(`integracionDiagnostica.${index}.cie10`);

  // Debounce: Espera 400ms después de que el usuario deja de escribir para buscar
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Llamada al API
  const { data: results = [], isLoading } = useSearchCie10(debouncedTerm);

  const handleSelect = (code: string, description: string) => {
    // 1. Asignamos el código CIE-10
    setValue(`integracionDiagnostica.${index}.cie10`, code, {
      shouldValidate: true,
    });
    
    // Opcional: Autocompletar la descripción del diagnóstico también
    // setValue(`integracionDiagnostica.${index}.diagnostico`, description);

    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="md:col-span-3 flex flex-col gap-1 relative">
      <label className={labelClass}>CIE-10</label>
      <input
        type="text"
        placeholder="Ej. J00 o Resfriado"
        className={inputClass}
        value={isOpen ? searchTerm : currentCode || ""}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          // Pequeño timeout para permitir que el click en la lista se registre antes de cerrar
          setTimeout(() => setIsOpen(false), 200);
        }}
      />

      {/* Dropdown de resultados */}
      {isOpen && searchTerm.length >= 2 && (
        <div className="absolute top-[100%] left-0 w-[250%] md:w-[150%] bg-white border border-slate-200 rounded-lg shadow-xl mt-1 z-50 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-sm text-slate-500 text-center">Buscando...</div>
          ) : results.length > 0 ? (
            <ul className="flex flex-col">
              {results.map((item) => (
                <li
                  key={item.code}
                  onClick={() => handleSelect(item.code, item.description)}
                  className="px-3 py-2 hover:bg-indigo-50 cursor-pointer border-b border-slate-100 last:border-none flex flex-col"
                >
                  <span className="text-sm font-bold text-slate-800">{item.code}</span>
                  <span className="text-xs text-slate-600 truncate">{item.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-sm text-slate-500 text-center">Sin resultados</div>
          )}
        </div>
      )}
    </div>
  );
};