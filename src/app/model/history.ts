export interface ServiceOrderHistory {
  osStatusId: number;
  data: string;
  statusOS: {
    codigo: string;
    descricao: string;
  };
  comentario: string;
}
