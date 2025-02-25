type SituacaoType = "Cadastrada" | "Em Andamento" | "Concluída";

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
