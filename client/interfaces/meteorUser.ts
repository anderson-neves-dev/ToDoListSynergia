export interface UserEdit {
  nome?: string;
  email?: string;
  aniversario?: string;
  empresa?: string;
  sexo?: string;
  profileImage?: string;
}

export interface MeteorUser {
  _id: string;
  username?: string;
  emails?: { address: string; verified: boolean }[];
  profile?: UserEdit;
}
