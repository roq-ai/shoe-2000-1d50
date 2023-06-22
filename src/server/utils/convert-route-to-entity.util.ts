const mapping: Record<string, string> = {
  businesses: 'business',
  orders: 'order',
  services: 'service',
  technicians: 'technician',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
