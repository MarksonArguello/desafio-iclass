export interface OsMaterial {
  osMaterialId: number;
  qtd: number;
  valorMaterial: number;
  valorTotal: number;
  material: {
    materialId: number;
    codigo: string;
    descricao: string;
    unidadeMedida: string;
    valor: number;
    estoques: string;
  };
}
