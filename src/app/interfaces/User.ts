import { FormControl } from '@angular/forms';

export interface UserForm {
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
}
