export interface ServiceOrder {
  id: number;
  codigo: string;
  contrato: {
    observacao: string;
    codigo: string;
    nomeTitular: string;
    segmentacaoClienteId: number;
    cpf: string;
    email: string;
    tipoIdentificacao: number;
  };
  operadora: {
    nome: string;
  };
  credenciada: {
    codigo: string;
    nome: string;
  };
  node: {
    codigo: string;
    descricao: string;
  };
  tipoOs: {
    descricao: string;
    resumoTipoOs: string;
  };
  endereco: {
    codigo: string;
    numero: string;
    logradouro: string;
    cidade: string;
    estado: string;
    pais: string;
    latitude: number;
    longitude: number;
  };
  status: {
    id: number;
    descricao: string;
  };
  criadoPor: {
    nome: string;
    login: string;
    data: string;
  };
  alteradoPor: {
    nome: string;
    login: string;
    data: string;
  };
  valorCobranca: number;
  equipe: {
    login: string;
    tecnico: string;
    fone1: string;
    status: string;
    tipoEquipe: string;
    email: string;
    ativo: string;
  };
  motivoFechamento: string;
  responsavel: string;
  dataAgendamento: string;
  dataSolicitacao: string;
  dataSla: string;
  historicoStatus: string;
  procedimentos: string;
  pesquisas: string;
  materiais: string;
  ativos: string;
  historicoAtivos: string;
  despesas: string;
}
