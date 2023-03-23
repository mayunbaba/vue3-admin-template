interface User {
  username: string;
  email: string;
  blocked?: boolean;
  confirmed?: boolean;
  createdAt?: Date;
  id?: number;
  provider?: string;
  updatedAt?: Date;
}
