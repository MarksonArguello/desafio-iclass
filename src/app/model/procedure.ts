export interface Procedure {
  procedimentoId: number;
  descricao: string;
  resposta: string;
  codigo: string;
  data: string;
  tipo: string;
  obrigatorio: boolean;
  editavel: boolean;
  criadoPor: {
    nome: string;
    login: string;
    data: string;
  };
}
