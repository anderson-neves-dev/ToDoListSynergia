type SituacaoType = "Cadastrada" | "Em Andamento" | "Finalizada";

export interface TaskInterface {
  _id?: string;
  nome: string;
  descricao: string;
  criadaEm: Date;
  agendadaPara: Date;
  situacao: SituacaoType;
  byUserId: string | undefined;
  privada: boolean;
  usuarioNome: string | undefined;
}
