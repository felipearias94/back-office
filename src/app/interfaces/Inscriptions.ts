import { Course } from './Courses';
import { Student } from './Students';

export interface Inscription {
  id: number;
  courseId: number;
  studentId: number;
}

export interface InscriptionWithStudent extends Inscription {
  student: Student;
  course: Course;
}

export interface InscriptionPayload {
  courseId: number | null;
  studentId: number | null;
}
