import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/interfaces/Courses';
import { Student } from 'src/app/interfaces/Students';
import { CoursesFeatureStoreActions } from 'src/app/store/courses/courses-feature-store.actions';
import { selectCourseById } from 'src/app/store/courses/courses-feature-store.selectors';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  courseId: number;
  selectedCourse: Course | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {
    this.courseId = Number(this.activatedRoute.snapshot.params['courseId']);
  }

  ngOnInit(): void {
    this.store.dispatch(
      CoursesFeatureStoreActions.loadCourseDetails({
        courseId: this.courseId,
      })
    );
    this.loadCourseById();
  }

  loadCourseById(): void {
    this.store
      .select(selectCourseById)
      .subscribe({ next: (course) => (this.selectedCourse = course) });
  }
}
