import { 
  Edit, 
  AlertTriangle, 
  Ruler, 
  Scale, 
  HeartPulse, 
  Pill, 
  Scissors, 
  FileText,
  Users,
  Activity,
  Droplet,
  Bone,
  ShieldAlert,
  Building2
} from "lucide-react";

interface Props {
  medicalRecord: any;
  onEdit: () => void;
  getConditionName: (id: string) => string | undefined;
}

export const MedicalRecordDisplay = ({ medicalRecord, onEdit, getConditionName }: Props) => {
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Extraemos los Antecedentes Personales Patológicos (APP) para código más limpio
  const app = medicalRecord.antecedentesPersonalesPatologicos?.props;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* ======================================= */}
      {/* HEADER Y BOTÓN DE EDICIÓN               */}
      {/* ======================================= */}
      <div className="flex justify-end">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-indigo-200 text-indigo-700 text-sm font-semibold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
        >
          <Edit className="w-4 h-4" />
          Actualizar Expediente
        </button>
      </div>

      {/* ======================================= */}
      {/* FILA 1: BIOMETRÍA Y ALERTAS             */}
      {/* ======================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-red-50/50 border border-red-100 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <h4 className="font-bold">Alertas y Factores de Riesgo</h4>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <p className="text-xs text-slate-500 font-bold uppercase mb-2">
                Alergias Clínicas
              </p>
              <div className="flex flex-wrap gap-2">
                {medicalRecord.allergies?.length > 0 ? (
                  medicalRecord.allergies.map((a: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded"
                    >
                      {a}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">Ninguna reportada</span>
                )}
              </div>
            </div>

            <div className="flex-1">
              <p className="text-xs text-slate-500 font-bold uppercase mb-2">
                Factores de Riesgo
              </p>
              <div className="flex flex-wrap gap-2">
                {medicalRecord.riskFactors?.length > 0 ? (
                  medicalRecord.riskFactors.map((r: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded"
                    >
                      {r}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">Ninguno reportado</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-5 flex flex-col justify-center gap-4">
          <div className="flex justify-between items-center pb-2 border-b border-sky-100">
            <div className="flex items-center gap-2 text-sky-700">
              <Ruler className="w-4 h-4" />
              <span className="font-semibold text-sm">Estatura</span>
            </div>
            <span className="font-bold text-lg text-sky-900">
              {medicalRecord.height}
              <span className="text-sm font-normal text-sky-600"> cm</span>
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sky-700">
              <Scale className="w-4 h-4" />
              <span className="font-semibold text-sm">Peso</span>
            </div>
            <span className="font-bold text-lg text-sky-900">
              {medicalRecord.weight}
              <span className="text-sm font-normal text-sky-600"> kg</span>
            </span>
          </div>
        </div>
      </div>

      {/* ======================================= */}
      {/* FILA 2: CONDICIONES Y MEDICAMENTOS      */}
      {/* ======================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 text-indigo-600">
            <HeartPulse className="w-5 h-5" />
            <h4 className="font-bold text-slate-900">Condiciones Actuales</h4>
          </div>

          <div className="flex flex-col gap-3">
            {medicalRecord.currentConditions?.length > 0 ? (
              medicalRecord.currentConditions.map((cond: any, i: number) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg">
                  <p className="font-bold text-slate-900 text-sm capitalize">
                    {getConditionName(cond.conditionId) || cond.conditionId}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Diagnosticado por {cond.diagnosedBy || "N/A"} el{" "}
                    {formatDate(cond.since)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">Sin condiciones actuales registradas.</p>
            )}
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 text-indigo-600">
            <Pill className="w-5 h-5" />
            <h4 className="font-bold text-slate-900">Medicación Crónica</h4>
          </div>

          <div className="flex flex-col gap-3">
            {medicalRecord.chronicMedications?.length > 0 ? (
              medicalRecord.chronicMedications.map((med: any, i: number) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900 text-sm capitalize">
                      {med.medicationName} ({med.routeAdministration})
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Dosis: {med.dosage?.amount} {med.dosage?.unit} • {med.frequency?.timesPerDay} vez/veces al día
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                      Desde: {formatDate(med.startedAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">Sin medicación crónica.</p>
            )}
          </div>
        </div>
      </div>

      {/* ======================================= */}
      {/* FILA 3: ANTECEDENTES FAMILIARES & QUIR. */}
      {/* ======================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 text-indigo-600">
            <Users className="w-5 h-5" />
            <h4 className="font-bold text-slate-900">Antecedentes Familiares (AHF)</h4>
          </div>

          <div className="flex flex-col gap-3">
            {medicalRecord.familyHistory?.length > 0 ? (
              medicalRecord.familyHistory.map((fam: any, i: number) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-900 text-sm capitalize">
                    {getConditionName(fam.diseaseId) || fam.diseaseId}
                  </span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded capitalize">
                    {fam.relationship?.value || "Familiar"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">Sin antecedentes familiares registrados.</p>
            )}
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 text-indigo-600">
            <Scissors className="w-5 h-5" />
            <h4 className="font-bold text-slate-900">Antecedentes Quirúrgicos</h4>
          </div>

          <ul className="flex flex-col gap-3">
            {medicalRecord.surgicalHistory?.length > 0 ? (
              medicalRecord.surgicalHistory.map((surg: any, i: number) => (
                <li key={i} className="p-3 bg-slate-50 rounded-lg">
                  <p className="font-bold text-slate-900 text-sm capitalize">
                    {surg.surgeryName}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Fecha: {formatDate(surg.surgeryDate)}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-sm text-slate-500">Sin antecedentes quirúrgicos.</p>
            )}
          </ul>
        </div>
      </div>

      {/* ======================================= */}
      {/* FILA 4: ANTECEDENTES PATOLÓGICOS (APP)  */}
      {/* ======================================= */}
      {app && (
        <div className="border border-slate-200 rounded-xl p-5 bg-white">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 text-indigo-600">
            <Activity className="w-5 h-5" />
            <h4 className="font-bold text-slate-900">Antecedentes Personales Patológicos (APP)</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Hábitos de consumo */}
            <div className="flex flex-col gap-4">
              <h5 className="font-semibold text-sm text-slate-700 bg-slate-50 p-2 rounded">Hábitos de Consumo</h5>
              
              <div className="text-sm">
                <span className="font-semibold text-slate-800">Tabaquismo: </span>
                {app.tabaquismo?.consume ? (
                  <span className="text-slate-600">
                    Sí ({app.tabaquismo.frecuencia}, {app.tabaquismo.cantidad}) por {app.tabaquismo.tiempoConsumo}. Último: {formatDate(app.tabaquismo.fechaUltimoConsumo)}
                  </span>
                ) : <span className="text-slate-500 italic">Niega</span>}
              </div>

              <div className="text-sm">
                <span className="font-semibold text-slate-800">Alcoholismo: </span>
                {app.alcoholismo?.consume ? (
                  <span className="text-slate-600">
                    Sí ({app.alcoholismo.frecuencia}, {app.alcoholismo.cantidad}) por {app.alcoholismo.tiempoConsumo}. Último: {formatDate(app.alcoholismo.fechaUltimoConsumo)}
                  </span>
                ) : <span className="text-slate-500 italic">Niega</span>}
              </div>

              <div className="text-sm">
                <span className="font-semibold text-slate-800">Toxicomanías: </span>
                {app.toxicomanias?.consume ? (
                  <span className="text-slate-600">
                    Sí ({app.toxicomanias.sustancias?.join(", ") || "No especificado"}) {app.toxicomanias.frecuencia}. Último: {formatDate(app.toxicomanias.fechaUltimoConsumo)}
                  </span>
                ) : <span className="text-slate-500 italic">Niega</span>}
              </div>
            </div>

            {/* Eventos Médicos Especiales */}
            <div className="flex flex-col gap-4">
              <h5 className="font-semibold text-sm text-slate-700 bg-slate-50 p-2 rounded">Eventos Clínicos</h5>

              <div className="text-sm">
                <div className="flex items-center gap-1 font-semibold text-slate-800 mb-1">
                  <Droplet className="w-3.5 h-3.5" /> Hemotransfusiones:
                </div>
                {app.hemotransfusiones?.haRecibido ? (
                  <p className="text-slate-600">
                    {app.hemotransfusiones.cantidad} unidad(es) el {formatDate(app.hemotransfusiones.fechaUltima)}. 
                    Motivo: {app.hemotransfusiones.motivo}. 
                    {app.hemotransfusiones.reaccionesAdversas ? " (Tuvo reacciones)" : ""}
                  </p>
                ) : <p className="text-slate-500 italic">Niega</p>}
              </div>

              <div className="text-sm">
                <div className="flex items-center gap-1 font-semibold text-slate-800 mb-1">
                  <Bone className="w-3.5 h-3.5" /> Fracturas:
                </div>
                {app.fracturas?.length > 0 ? (
                  <ul className="list-disc pl-4 text-slate-600">
                    {app.fracturas.map((frac: any, i: number) => (
                      <li key={i}>{frac.hueso} ({formatDate(frac.fecha)}) - {frac.causa}</li>
                    ))}
                  </ul>
                ) : <p className="text-slate-500 italic">Ninguna</p>}
              </div>
            </div>

            {/* Enfermedades y Hospitalizaciones */}
            <div className="flex flex-col gap-4">
              <h5 className="font-semibold text-sm text-slate-700 bg-slate-50 p-2 rounded">Enfermedades y Estadías</h5>

              <div className="text-sm">
                <div className="flex items-center gap-1 font-semibold text-slate-800 mb-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> Infectocontagiosas:
                </div>
                {app.infectocontagiosas?.length > 0 ? (
                  <ul className="list-disc pl-4 text-slate-600">
                    {app.infectocontagiosas.map((inf: any, i: number) => (
                      <li key={i}>{inf.enfermedad} ({formatDate(inf.fechaDiagnostico)})</li>
                    ))}
                  </ul>
                ) : <p className="text-slate-500 italic">Ninguna</p>}
              </div>

              <div className="text-sm">
                <div className="flex items-center gap-1 font-semibold text-slate-800 mb-1">
                  <Building2 className="w-3.5 h-3.5" /> Hospitalizaciones:
                </div>
                {app.hospitalizacionesPrevias?.length > 0 ? (
                  <ul className="list-disc pl-4 text-slate-600">
                    {app.hospitalizacionesPrevias.map((hosp: any, i: number) => (
                      <li key={i}>{hosp.motivo} en {hosp.hospital} ({formatDate(hosp.fechaIngreso)})</li>
                    ))}
                  </ul>
                ) : <p className="text-slate-500 italic">Ninguna</p>}
              </div>

              <div className="text-sm">
                <div className="flex items-center gap-1 font-semibold text-slate-800 mb-1">
                  <HeartPulse className="w-3.5 h-3.5" /> Crónico Degenerativas:
                </div>
                {app.cronicoDegenerativo?.length > 0 ? (
                  <ul className="list-disc pl-4 text-slate-600">
                    {app.cronicoDegenerativo.map((c: any, i: number) => (
                      <li key={i}>
                        {c.enfermedad} - {c.controlada ? "Controlada" : "No controlada"} 
                        <br/>
                        <span className="text-xs text-slate-400">Tx: {c.tratamientoActual || 'Ninguno'}</span>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-slate-500 italic">Ninguna reportada en APP</p>}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* FILA 5: RESUMEN CLINICO                 */}
      {/* ======================================= */}
      <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
        <div className="flex items-center gap-2 mb-3 text-indigo-600">
          <FileText className="w-5 h-5" />
          <h4 className="font-bold text-slate-900">Resumen Clínico</h4>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed font-medium bg-white p-4 rounded-lg border border-slate-100">
          {medicalRecord.summary || "No hay resumen clínico disponible."}
        </p>
      </div>

    </div>
  );
};