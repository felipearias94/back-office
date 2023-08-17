import { FormControl } from '@angular/forms';

export interface Student {
  id: number;
  name: string;
  coursesId: number[];
  lastName: string;
  registrationDate: Date;
}

export interface StudentForm {
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  registrationDate: FormControl<Date | null>;
}
