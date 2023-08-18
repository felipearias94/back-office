import { Course } from './Courses';
import { Student } from './Students';

export interface Inscription {
  id: number;
  courseId: number;
  studentsId: number[];
}

export interface InscriptionWithStudent extends Inscription {
  //students: Student[];
  course: Course;
}

export interface InscriptionPayload {
  courseId: number | null;
  //studentsId: number[] | null;
}
