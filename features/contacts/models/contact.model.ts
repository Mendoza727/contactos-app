export interface Phone {
  id: string;
  number: string;
  label?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phones: Phone[];
  createdAt: string;
  updatedAt: string;
}