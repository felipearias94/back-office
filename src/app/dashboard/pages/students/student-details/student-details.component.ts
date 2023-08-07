import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/core/services/students.service';
import { Student } from 'src/app/interfaces/Students';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent {
  studentId: number;
  selectedStudent: Student | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentsService
  ) {
    this.studentId = Number(this.activatedRoute.snapshot.params['studentId']);
    this.loadUserById();
  }

  loadUserById(): void {
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (user) => {
        this.selectedStudent = user;
      },
    });
  }
}
