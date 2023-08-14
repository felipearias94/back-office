import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CoursesService } from 'src/app/core/services/courses.service';
import { StudentsService } from 'src/app/core/services/students.service';
import { Course } from 'src/app/interfaces/Courses';
import { Student } from 'src/app/interfaces/Students';
import { CoursesFeatureStoreActions } from 'src/app/store/courses/courses-feature-store.actions';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  courseId: number;
  selectedCourse: Course | undefined;
  studentsInCourse: Student[] | null;

  constructor(
    private courseService: CoursesService,
    private studentsService: StudentsService,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {
    this.courseId = Number(this.activatedRoute.snapshot.params['courseId']);
  }

  ngOnInit(): void {
    this.loadCourseById();
    this.loadStudentsInCourse();
    this.store.dispatch(
      CoursesFeatureStoreActions.loadCategoryDetails({
        courseId: this.courseId,
      })
    );
  }

  loadCourseById(): void {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.selectedCourse = course;
      },
    });
  }

  loadStudentsInCourse(): void {
    this.studentsService.loadStudents();
    this.studentsService.getStudentsByCourseId(this.courseId).subscribe({
      next: (students) => {
        this.studentsInCourse = students;
      },
    });
  }
}
