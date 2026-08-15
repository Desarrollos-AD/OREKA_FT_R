// Copy real tomado tal cual del archivo de Figma, sección "Servicios —
// Prácticas Principales" de la subpágina de Servicios (7 áreas, en el mismo
// orden en que aparecen ahí: Fiscal, Administrativo, Corporativo, Laboral,
// Mercantil, Civil, Familiar). `resumen` es una síntesis propia de una
// oración para las vistas previas (grilla de Inicio, pie de página);
// `parrafos` es el texto completo y real usado en la página de Servicios.
export const areasDePractica = [
  {
    id: 'fiscal',
    numero: '01',
    icono: 'grafico',
    titulo: 'Derecho Fiscal',
    resumen: 'Defensa fiscal, auditorías y planeación y estrategia tributaria.',
    parrafos: [
      'Ofrecemos asesoría y defensa legal en materia fiscal a personas físicas y morales en contra de todo tipo de controversias que estén relacionadas a contribuciones federales, locales y aportaciones de seguridad social.',
      'Asesoría legal durante el ejercicio de facultades de comprobación (visita domiciliaria, revisión de gabinete, revisión electrónica, visitas de inspección, órdenes de verificación, etc.) y durante los procedimientos de ejecución de las autoridades.',
      'Brindamos defensa legal en sede administrativa a través del recurso de revocación, juicio contencioso administrativo (juicio de nulidad) y juicio de amparo en contra de las determinaciones de créditos fiscales.',
    ],
  },
  {
    id: 'administrativo',
    numero: '02',
    icono: 'escudo',
    titulo: 'Derecho Administrativo',
    resumen: 'Procedimientos y litigios ante autoridades municipales, estatales y federales.',
    parrafos: [
      'Ofrecemos asesoría y defensa legal en materia administrativa a personas físicas y morales en contra de todo tipo de procedimientos administrativos realizados por autoridades municipales, estatales y federales.',
      'Brindamos defensa legal en sede administrativa, interposición de recursos en sede administrativa, juicio contencioso administrativo (juicio de nulidad) y juicio de amparo.',
    ],
  },
  {
    id: 'corporativo',
    numero: '03',
    icono: 'edificio',
    titulo: 'Derecho Corporativo',
    resumen: 'Creación y estructura de sociedades, y operación societaria del día a día.',
    parrafos: [
      'Ofrecemos asesoría en materia corporativa, gestionamos la creación y estructura de sociedades, hasta sus operaciones del día a día, incluyendo la relación entre socios y accionistas con las sociedades y organismos afiliados, sus órganos administrativos, proveedores y clientes.',
    ],
  },
  {
    id: 'laboral',
    numero: '04',
    icono: 'maletin',
    titulo: 'Derecho Laboral',
    resumen: 'Despidos, prestaciones, sindicatos y representación patronal en juicios laborales.',
    parrafos: [
      'Ofrecemos asesoría y defensa legal a personas físicas y morales en contra de todo tipo de controversias en materia laboral ante los Tribunales del fuero común o fuero federal.',
      'Brindamos asesoría en caso de despidos, pensiones por incapacidad total o parcial permanente por accidentes de trabajo, pagos de utilidades, conformación de sindicatos, procedimientos de huelga, representación patronal en juicios laborales, entre otros.',
    ],
  },
  {
    id: 'mercantil',
    numero: '05',
    icono: 'balanza',
    titulo: 'Derecho Mercantil',
    resumen: 'Contratos y convenios mercantiles, y litigio ejecutivo y ordinario.',
    parrafos: [
      'Ofrecemos asesoría y defensa legal a personas físicas y morales, en contra de todo tipo de controversias en materia mercantil ante los Tribunales del fuero común o fuero federal.',
      'Asesoría y defensa legal en elaboración de contratos y convenios (compraventa, suministro, distribución, consignación, cuenta corriente, prenda, depósito, comisión mercantil, sociedad mercantil, asociación en participación, tiempo compartido, autofinanciamiento, transporte, franquicia, edición, apertura de crédito, fideicomiso, descuento, reporto, arrendamiento financiero, etc.)',
      'Brindamos asesoría legal en materia mercantil a través de la interposición de demanda, contestación a la demanda, reconvención, trámite de incidentes, recurso de apelación, juicio de amparo directo e indirecto; en juicios ejecutivos y ordinarios.',
    ],
  },
  {
    id: 'civil',
    numero: '06',
    icono: 'documento',
    titulo: 'Derecho Civil',
    resumen: 'Contratos civiles y litigio ante los Tribunales del fuero común o federal.',
    parrafos: [
      'Ofrecemos asesoría y defensa legal en materia civil a personas físicas y morales para todo tipo de controversias ante los Tribunales del fuero común o fuero federal.',
      'Asesoría en elaboración de contratos y convenios (compraventa, donación, permuta, arrendamiento, mutuo, comodato, prestación de servicios, mandato, obra a precio alzado, transporte, hospedaje, aparcería rural, renta vitalicia, compra de esperanza, prenda, hipoteca, cesión de derechos, etc.)',
      'Brindamos asesoría y defensa legal en materia civil a través de la interposición de demanda, contestación a las demandas, reconvención, trámite de incidentes, recurso de apelación, juicio de amparo directo e indirecto, etc.; en juicios como: cumplimiento forzoso de contrato, rescisión de contrato, terminación anticipada de contrato, entre otros.',
    ],
  },
  {
    id: 'familiar',
    numero: '07',
    icono: 'familia',
    titulo: 'Derecho Familiar',
    resumen: 'Divorcios, pensión alimenticia, custodia y régimen de visitas.',
    parrafos: [
      'Ofrecemos asesoría y defensa legal en contra de todo tipo de juicios ordinarios civiles o controversias relacionados al orden familiar.',
      'Brindamos asesoría y defensa legal en materia familiar a través de la interposición de demanda, contestación a las demandas, reconvención, trámite de incidentes, recurso de apelación, juicio de amparo directo e indirecto, etc; en juicios como: divorcio, pensión alimenticia, patria potestad, guarda y custodia, régimen de visitas, reconocimiento de paternidad, sucesiones, rectificación de actas, entre otros.',
    ],
  },
]

export function obtenerAreaPorId(id) {
  return areasDePractica.find((area) => area.id === id)
}
