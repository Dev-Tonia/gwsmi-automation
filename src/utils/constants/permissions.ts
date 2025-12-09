export const PERMISSIONS = [
  "ADD_USERS",
  "CREATE_TICKETS",
  "SCAN_TICKETS",
  "EXPORT_REPORTS",
] as const;

export type Permission = (typeof PERMISSIONS)[number];
