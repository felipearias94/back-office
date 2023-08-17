import { FormControl } from '@angular/forms';

export interface UserForm {
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  role: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface User {
  id: number;
  role: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
}

export enum Role {
  admin = 'ADMIN',
  user = 'USER',
  guest = 'GUEST'
}
