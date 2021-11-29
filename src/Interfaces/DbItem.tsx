export interface DbItem {
  status: string;
  data: { notes: Notes[] };
}

export interface Notes {
  id: number;
  note: string;
  type: string;
  created: string;
  due: string;
  completed: boolean;
}
