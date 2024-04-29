export interface PaginatedResponse<T> {
  objects: T[];
  totalpages: number;
  currentpage: number;
}
