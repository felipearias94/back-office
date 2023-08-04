import { FormControl } from '@angular/forms';

export interface Course {
  id: number;
  courseName: string;
  teacher: string;
  startDate: Date;
  endDate: Date;
}

export interface CourseForm {
  courseName: FormControl<string | null>;
  teacher: FormControl<string | null>;
  startDate: FormControl<Date | null>;
  endDate: FormControl<Date | null>;
}
