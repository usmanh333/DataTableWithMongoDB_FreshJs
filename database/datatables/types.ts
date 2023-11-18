interface User {
  email: string;
  name: string;
  address: string;
}
export interface DataTableSchema {
  _id: string;
  productName: string;
  description: string;
  status: string;
  user: User;
  createdAt: number;
  updatedAt: number;
}
