export interface PaginatedResponse<T> {
  objects: T[];
  hasMoreElements: boolean;
}
