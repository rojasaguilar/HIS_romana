import React from "react";
import { 
  ClipboardList, 
  Plus, 
  Trash2, 
  Activity, 
  Scissors, 
  Droplet, 
  Bone, 
  ShieldAlert, 
  Building2, 
  HeartPulse 
} from "lucide-react";

export interface AntecedentesPersonalesPatologicosProps {
  tabaquismo: {
    consume: boolean;
    frecuencia: string;
    cantidad: string;
    tiempoConsumo: string;
    fechaUltimoConsumo: string;
    observaciones: string;
  };
  alcoholismo: {
    consume: boolean;
    frecuencia: string;
    cantidad: string;
    tiempoConsumo: string;
    fechaUltimoConsumo: string;
    observaciones: string;
  };
  toxicomanias: {
    consume: boolean;
    sustancias: string[];
    frecuencia: string;
    tiempoConsumo: string;
    fechaUltimoConsumo: string;
    observaciones: string;
  };
  quirurgicos: {
    procedimiento: string;
    fecha: string;
    hospital: string;
    complicaciones: string;
    observaciones: string;
  }[];
  hemotransfusiones: {
    haRecibido: boolean;
    cantidad: number;
    fechaUltima: string;
    motivo: string;
    reaccionesAdversas: boolean;
    observaciones: string;
  };
  fracturas: {
    hueso: string;
    fecha: string;
    causa: string;
    tratamiento: string;
    secuelas: string;
    observaciones: string;
  }[];
  infectocontagiosas: {
    enfermedad: string;
    fechaDiagnostico: string;
    tratamiento: string;
    secuelas: string;
    observaciones: string;
  }[];
  hospitalizacionesPrevias: {
    motivo: string;
    hospital: string;
    fechaIngreso: string;
    fechaEgreso: string;
    tratamiento: string;
    observaciones: string;
  }[];
  cronicoDegenerativo: {
    enfermedad: string;
    fechaDiagnostico: string;
    tratamientoActual: string;
    controlada: boolean;
    observaciones: string;
  }[];
}

interface Props {
  data: AntecedentesPersonalesPatologicosProps;
  setData: React.Dispatch<React.SetStateAction<AntecedentesPersonalesPatologicosProps>>;
}

export const PersonalHistorySection = ({ data, setData }: Props) => {
  const {
    tabaquismo,
    alcoholismo,
    toxicomanias,
    // quirurgicos,
    hemotransfusiones,
    fracturas,
    infectocontagiosas,
    hospitalizacionesPrevias,
    cronicoDegenerativo,
  } = data;

  // Clases CSS compartidas para mantener el estilo original
  const inputClassName = "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-400";
  const textareaClassName = "w-full h-24 resize-none px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-400";
  const sectionCardClass = "border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 bg-slate-50/50";
  const arrayItemClass = "p-4 border border-slate-100 rounded-xl bg-white flex flex-col gap-3 relative pt-8";

  // Manejadores genéricos para campos de objetos anidados (tabaquismo, alcoholismo, etc.)
  const handleNestedChange = (section: keyof AntecedentesPersonalesPatologicosProps, field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Manejadores para secciones de Tipo Arreglo (Listas dinámicas)
  const addArrayItem = (section: keyof AntecedentesPersonalesPatologicosProps, defaultObj: any) => {
    setData((prev) => ({
      ...prev,
      [section]: [...(prev[section] as any[]), defaultObj],
    }));
  };

  const removeArrayItem = (section: keyof AntecedentesPersonalesPatologicosProps, index: number) => {
    setData((prev) => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((_, i) => i !== index),
    }));
  };

  const updateArrayItem = (section: keyof AntecedentesPersonalesPatologicosProps, index: number, field: string, value: any) => {
    setData((prev) => {
      const updatedArray = [...(prev[section] as any[])];
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      return { ...prev, [section]: updatedArray };
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Título Principal */}
      <div className="flex items-center gap-2 mb-2">
        <ClipboardList className="w-6 h-6 text-slate-700" />
        <h3 className="font-bold text-xl text-slate-900">
          Antecedentes Personales Patológicos
        </h3>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* =============================== */}
        {/* TABAQUISMO */}
        {/* =============================== */}
        <div className={sectionCardClass}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-500" /> Tabaquismo
            </h4>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={tabaquismo.consume}
                onChange={(e) => handleNestedChange("tabaquismo", "consume", e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              Consume
            </label>
          </div>

          {tabaquismo.consume && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
              <input
                type="text"
                placeholder="Frecuencia (ej. Diario)"
                value={tabaquismo.frecuencia}
                onChange={(e) => handleNestedChange("tabaquismo", "frecuencia", e.target.value)}
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="Cantidad (ej. 5 cigarrillos)"
                value={tabaquismo.cantidad}
                onChange={(e) => handleNestedChange("tabaquismo", "cantidad", e.target.value)}
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="Tiempo de consumo (ej. 3 años)"
                value={tabaquismo.tiempoConsumo}
                onChange={(e) => handleNestedChange("tabaquismo", "tiempoConsumo", e.target.value)}
                className={inputClassName}
              />
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-500 px-1">Fecha de último consumo</span>
                <input
                  type="date"
                  value={tabaquismo.fechaUltimoConsumo}
                  onChange={(e) => handleNestedChange("tabaquismo", "fechaUltimoConsumo", e.target.value)}
                  className={inputClassName}
                />
              </div>
              <div className="md:col-span-2">
                <textarea
                  placeholder="Observaciones de tabaquismo..."
                  value={tabaquismo.observaciones}
                  onChange={(e) => handleNestedChange("tabaquismo", "observaciones", e.target.value)}
                  className={textareaClassName}
                />
              </div>
            </div>
          )}
        </div>

        {/* =============================== */}
        {/* ALCOHOLISMO */}
        {/* =============================== */}
        <div className={sectionCardClass}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-500" /> Alcoholismo
            </h4>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={alcoholismo.consume}
                onChange={(e) => handleNestedChange("alcoholismo", "consume", e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              Consume
            </label>
          </div>

          {alcoholismo.consume && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Frecuencia"
                value={alcoholismo.frecuencia}
                onChange={(e) => handleNestedChange("alcoholismo", "frecuencia", e.target.value)}
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="Cantidad"
                value={alcoholismo.cantidad}
                onChange={(e) => handleNestedChange("alcoholismo", "cantidad", e.target.value)}
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="Tiempo de consumo"
                value={alcoholismo.tiempoConsumo}
                onChange={(e) => handleNestedChange("alcoholismo", "tiempoConsumo", e.target.value)}
                className={inputClassName}
              />
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-500 px-1">Fecha de último consumo</span>
                <input
                  type="date"
                  value={alcoholismo.fechaUltimoConsumo}
                  onChange={(e) => handleNestedChange("alcoholismo", "fechaUltimoConsumo", e.target.value)}
                  className={inputClassName}
                />
              </div>
              <div className="md:col-span-2">
                <textarea
                  placeholder="Observaciones de alcoholismo..."
                  value={alcoholismo.observaciones}
                  onChange={(e) => handleNestedChange("alcoholismo", "observaciones", e.target.value)}
                  className={textareaClassName}
                />
              </div>
            </div>
          )}
        </div>

        {/* =============================== */}
        {/* TOXICOMANÍAS */}
        {/* =============================== */}
        <div className={sectionCardClass}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-slate-500" /> Toxicomanías
            </h4>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={toxicomanias.consume}
                onChange={(e) => handleNestedChange("toxicomanias", "consume", e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              Consume
            </label>
          </div>

          {toxicomanias.consume && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Sustancias (separadas por coma)"
                  value={toxicomanias.sustancias.join(", ")}
                  onChange={(e) => 
                    handleNestedChange(
                      "toxicomanias", 
                      "sustancias", 
                      e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                    )
                  }
                  className={inputClassName}
                />
                <span className="text-xs text-slate-400 px-1">Ejemplo: Cannabis, Cocaína</span>
              </div>
              <input
                type="text"
                placeholder="Frecuencia"
                value={toxicomanias.frecuencia}
                onChange={(e) => handleNestedChange("toxicomanias", "frecuencia", e.target.value)}
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="Tiempo de consumo"
                value={toxicomanias.tiempoConsumo}
                onChange={(e) => handleNestedChange("toxicomanias", "tiempoConsumo", e.target.value)}
                className={inputClassName}
              />
              <div className="flex flex-col gap-1 md:col-span-2">
                <span className="text-xs text-slate-500 px-1">Fecha de último consumo</span>
                <input
                  type="date"
                  value={toxicomanias.fechaUltimoConsumo}
                  onChange={(e) => handleNestedChange("toxicomanias", "fechaUltimoConsumo", e.target.value)}
                  className={inputClassName}
                />
              </div>
              <div className="md:col-span-2">
                <textarea
                  placeholder="Observaciones de toxicomanías..."
                  value={toxicomanias.observaciones}
                  onChange={(e) => handleNestedChange("toxicomanias", "observaciones", e.target.value)}
                  className={textareaClassName}
                />
              </div>
            </div>
          )}
        </div>

        {/* =============================== */}
        {/* CRÓNICO DEGENERATIVO (Arreglo) */}
        {/* =============================== */}
        <div className={sectionCardClass}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-slate-500" /> Enfermedades Crónico-Degenerativas
            </h4>
            <button
              type="button"
              onClick={() => addArrayItem("cronicoDegenerativo", { enfermedad: "", fechaDiagnostico: "", tratamientoActual: "", controlada: false, observaciones: "" })}
              className="flex items-center gap-1 text-xs bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Añadir
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {cronicoDegenerativo.map((item, index) => (
              <div key={index} className={arrayItemClass}>
                <button
                  type="button"
                  onClick={() => removeArrayItem("cronicoDegenerativo", index)}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Enfermedad (Requerido)"
                    value={item.enfermedad}
                    onChange={(e) => updateArrayItem("cronicoDegenerativo", index, "enfermedad", e.target.value)}
                    className={inputClassName}
                  />
                  <input
                    type="date"
                    value={item.fechaDiagnostico}
                    onChange={(e) => updateArrayItem("cronicoDegenerativo", index, "fechaDiagnostico", e.target.value)}
                    className={inputClassName}
                  />
                  <input
                    type="text"
                    placeholder="Tratamiento Actual"
                    value={item.tratamientoActual}
                    onChange={(e) => updateArrayItem("cronicoDegenerativo", index, "tratamientoActual", e.target.value)}
                    className={inputClassName}
                  />
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer px-1">
                    <input
                      type="checkbox"
                      checked={item.controlada}
                      onChange={(e) => updateArrayItem("cronicoDegenerativo", index, "controlada", e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    Enfermedad Controlada
                  </label>
                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Observaciones..."
                      value={item.observaciones}
                      onChange={(e) => updateArrayItem("cronicoDegenerativo", index, "observaciones", e.target.value)}
                      className={textareaClassName}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =============================== */}
        {/* ANTECEDENTES QUIRÚRGICOS (Arreglo) */}
        {/* =============================== */}
        {/* <div className={sectionCardClass}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <Scissors className="w-4 h-4 text-slate-500" /> Quirúrgicos
            </h4>
            <button
              type="button"
              onClick={() => addArrayItem("quirurgicos", { procedimiento: "", fecha: "", hospital: "", complicaciones: "", observaciones: "" })}
              className="flex items-center gap-1 text-xs bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Añadir
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {quirurgicos.map((item, index) => (
              <div key={index} className={arrayItemClass}>
                <button
                  type="button"
                  onClick={() => removeArrayItem("quirurgicos", index)}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Procedimiento (Requerido)"
                    value={item.procedimiento}
                    onChange={(e) => updateArrayItem("quirurgicos", index, "procedimiento", e.target.value)}
                    className={inputClassName}
                  />
                  <input
                    type="date"
                    value={item.fecha}
                    onChange={(e) => updateArrayItem("quirurgicos", index, "fecha", e.target.value)}
                    className={inputClassName}
                  />
                  <input
                    type="text"
                    placeholder="Hospital / Clínica"
                    value={item.hospital}
                    onChange={(e) => updateArrayItem("quirurgicos", index, "hospital", e.target.value)}
                    className={inputClassName}
                  />
                  <input
                    type="text"
                    placeholder="Complicaciones"
                    value={item.complicaciones}
                    onChange={(e) => updateArrayItem("quirurgicos", index, "complicaciones", e.target.value)}
                    className={inputClassName}
                  />
                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Observaciones del procedimiento..."
                      value={item.observaciones}
                      onChange={(e) => updateArrayItem("quirurgicos", index, "observaciones", e.target.value)}
                      className={textareaClassName}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* =============================== */}
        {/* HEMOTRANSFUSIONES */}
        {/* =============================== */}
        <div className={sectionCardClass}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-slate-500" /> Hemotransfusiones
            </h4>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={hemotransfusiones.haRecibido}
                onChange={(e) => handleNestedChange("hemotransfusiones", "haRecibido", e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              Ha recibido transfusiones
            </label>
          </div>

          {hemotransfusiones.haRecibido && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-500 px-1">Cantidad (Unidades)</span>
                <input
                  type="number"
                  min="0"
                  placeholder="Cantidad"
                  value={hemotransfusiones.cantidad}
                  onChange={(e) => handleNestedChange("hemotransfusiones", "cantidad", Math.max(0, parseInt(e.target.value) || 0))}
                  className={inputClassName}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-500 px-1">Fecha de última transfusión</span>
                <input
                  type="date"
                  value={hemotransfusiones.fechaUltima}
                  onChange={(e) => handleNestedChange("hemotransfusiones", "fechaUltima", e.target.value)}
                  className={inputClassName}
                />
              </div>
              <input
                type="text"
                placeholder="Motivo de la transfusión"
                value={hemotransfusiones.motivo}
                onChange={(e) => handleNestedChange("hemotransfusiones", "motivo", e.target.value)}
                className={inputClassName}
              />
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer p-4 border border-slate-200 rounded-xl">
                <input
                  type="checkbox"
                  checked={hemotransfusiones.reaccionesAdversas}
                  onChange={(e) => handleNestedChange("hemotransfusiones", "reaccionesAdversas", e.target.checked)}
                  className="rounded text-blue-600"
                />
                Presentó reacciones adversas
              </label>
              <div className="md:col-span-2">
                <textarea
                  placeholder="Observaciones de la transfusión..."
                  value={hemotransfusiones.observaciones}
                  onChange={(e) => handleNestedChange("hemotransfusiones", "observaciones", e.target.value)}
                  className={textareaClassName}
                />
              </div>
            </div>
          )}
        </div>

        {/* =============================== */}
        {/* FRACTURAS (Arreglo) */}
        {/* =============================== */}
        <div className={sectionCardClass}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <Bone className="w-4 h-4 text-slate-500" /> Fracturas
            </h4>
            <button
              type="button"
              onClick={() => addArrayItem("fracturas", { hueso: "", fecha: "", causa: "", tratamiento: "", secuelas: "", observaciones: "" })}
              className="flex items-center gap-1 text-xs bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Añadir
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {fracturas.map((item, index) => (
              <div key={index} className={arrayItemClass}>
                <button
                  type="button"
                  onClick={() => removeArrayItem("fracturas", index)}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Hueso afectado (Requerido)"
                    value={item.hueso}
                    onChange={(e) => updateArrayItem("fracturas", index, "hueso", e.target.value)}
                    className={inputClassName}
                  />
                  <input
                    type="date"
                    value={item.fecha}
                    onChange={(e) => updateArrayItem("fracturas", index, "fecha", e.target.value)}
                    className={inputClassName}
                  />
                  <input
                    type="text"
                    placeholder="Causa de la fractura"
                    value={item.causa}
                    onChange={(e) => updateArrayItem("fracturas", index, "causa", e.target.value)}
                    className={inputClassName}
                  />
                  <input
                    type="text"
                    placeholder="Tratamiento recibido"
                    value={item.tratamiento}
                    onChange={(e) => updateArrayItem("fracturas", index, "tratamiento", e.target.value)}
                    className={inputClassName}
                  />
                  <input
                    type="text"
                    placeholder="Secuelas"
                    value={item.secuelas}
                    onChange={(e) => updateArrayItem("fracturas", index, "secuelas", e.target.value)}
                    className={inputClassName}
                    className={`${inputClassName} md:col-span-2`}
                  />
                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Observaciones de la fractura..."
                      value={item.observaciones}
                      onChange={(e) => updateArrayItem("fracturas", index, "observaciones", e.target.value)}
                      className={textareaClassName}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =============================== */}
        {/* INFECTOCONTAGIOSAS (Arreglo) */}
        {/* =============================== */}
        <div className={sectionCardClass}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-slate-500" /> Enfermedades Infectocontagiosas
            </h4>
            <button
              type="button"
              onClick={() => addArrayItem("infectocontagiosas", { enfermedad: "", fechaDiagnostico: "", tratamiento: "", secuelas: "", observaciones: "" })}
              className="flex items-center gap-1 text-xs bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Añadir
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {infectocontagiosas.map((item, index) => (
              <div key={index} className={arrayItemClass}>
                <button
                  type="button"
                  onClick={() => removeArrayItem("infectocontagiosas", index)}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Enfermedad (Requerido)"
                    value={item.enfermedad}
                    onChange={(e) => updateArrayItem("infectocontagiosas", index, "enfermedad", e.target.value)}
                    className={inputClassName}
                  />
                  <input
                    type="date"
                    value={item.fechaDiagnostico}
                    onChange={(e) => updateArrayItem("infectocontagiosas", index, "fechaDiagnostico", e.target.value)}
                    className={inputClassName}
                  />
                  <input
                    type="text"
                    placeholder="Tratamiento"
                    value={item.tratamiento}
                    onChange={(e) => updateArrayItem("infectocontagiosas", index, "tratamiento", e.target.value)}
                    className={inputClassName}
                  />
                  <input
                    type="text"
                    placeholder="Secuelas"
                    value={item.secuelas}
                    onChange={(e) => updateArrayItem("infectocontagiosas", index, "secuelas", e.target.value)}
                    className={inputClassName}
                  />
                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Observaciones..."
                      value={item.observaciones}
                      onChange={(e) => updateArrayItem("infectocontagiosas", index, "observaciones", e.target.value)}
                      className={textareaClassName}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =============================== */}
        {/* HOSPITALIZACIONES PREVIAS (Arreglo) */}
        {/* =============================== */}
        <div className={sectionCardClass}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-500" /> Hospitalizaciones Previas
            </h4>
            <button
              type="button"
              onClick={() => addArrayItem("hospitalizacionesPrevias", { motivo: "", hospital: "", fechaIngreso: "", fechaEgreso: "", tratamiento: "", observaciones: "" })}
              className="flex items-center gap-1 text-xs bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Añadir
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {hospitalizacionesPrevias.map((item, index) => (
              <div key={index} className={arrayItemClass}>
                <button
                  type="button"
                  onClick={() => removeArrayItem("hospitalizacionesPrevias", index)}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Motivo de Hospitalización (Requerido)"
                    value={item.motivo}
                    onChange={(e) => updateArrayItem("hospitalizacionesPrevias", index, "motivo", e.target.value)}
                    className={inputClassName}
                  />
                  <input
                    type="text"
                    placeholder="Hospital / Institución"
                    value={item.hospital}
                    onChange={(e) => updateArrayItem("hospitalizacionesPrevias", index, "hospital", e.target.value)}
                    className={inputClassName}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500 px-1">Fecha de Ingreso</span>
                    <input
                      type="date"
                      value={item.fechaIngreso}
                      onChange={(e) => updateArrayItem("hospitalizacionesPrevias", index, "fechaIngreso", e.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500 px-1">Fecha de Egreso</span>
                    <input
                      type="date"
                      value={item.fechaEgreso}
                      onChange={(e) => updateArrayItem("hospitalizacionesPrevias", index, "fechaEgreso", e.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Tratamiento durante hospitalización"
                    value={item.tratamiento}
                    onChange={(e) => updateArrayItem("hospitalizacionesPrevias", index, "tratamiento", e.target.value)}
                    className={`${inputClassName} md:col-span-2`}
                  />
                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Observaciones de la estadía..."
                      value={item.observaciones}
                      onChange={(e) => updateArrayItem("hospitalizacionesPrevias", index, "observaciones", e.target.value)}
                      className={textareaClassName}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};