import { FormControl } from '@angular/forms';

export interface Class {
  id: number;
  courseId: number;
  className: string;
  durationInMin: number;
}

export interface ClassForm {
  courseId: FormControl<number | null>;
  className: FormControl<string | null>;
  durationInMin: FormControl<number | null>;
}
