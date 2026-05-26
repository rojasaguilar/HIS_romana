export const ROUTE_ADMINISTRATION_VALUES = {
  ORAL: 'oral',
  INTRAVENOSA: 'intravenosa',
  INTRAMUSCULAR: 'intramuscular',
  SUBCUTANEA: 'subcutanea',
  TOPICA: 'topica',
  INHALADA: 'inhalada',
  RECTAL: 'rectal',
  SUBLINGUAL: 'sublingual',
  OFTALMICA: 'oftalmica',
  OTICA: 'otica',
  OTRA: 'otra',
} as const;

export type RouteAdministration =
  (typeof ROUTE_ADMINISTRATION_VALUES)[keyof typeof ROUTE_ADMINISTRATION_VALUES];

export const parseRouteAdministration = (routeAdministration: string) => {
  const values = Object.values(ROUTE_ADMINISTRATION_VALUES);

  if (!values.includes(routeAdministration as RouteAdministration)) {
    throw new Error(`Route administration: ${routeAdministration} not valid`);
  }

  return routeAdministration as RouteAdministration;
};
