export interface Learned {
  what: string;
  date: string;
}

export interface LearnedWithID extends Learned {
  id: string;
}
