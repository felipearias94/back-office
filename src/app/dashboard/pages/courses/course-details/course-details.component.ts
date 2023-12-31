import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/interfaces/Courses';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent {
  courseId: number;
  selectedCourse: Course | undefined;

  constructor(
    private courseService: CoursesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.courseId = Number(this.activatedRoute.snapshot.params['courseId']);
    this.loadCourseById(this.courseId);
  }
  loadCourseById(courseId: number): void {
    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.selectedCourse = course;
      },
    });
  }
}
