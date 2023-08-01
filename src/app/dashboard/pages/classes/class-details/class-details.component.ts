import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from 'src/app/interfaces/Classes';
import { ClassesService } from 'src/app/services/classes.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
})
export class ClassDetailsComponent {
  classId: number;
  selectedClass: Class | undefined;

  constructor(
    private courseService: CoursesService,
    private classService: ClassesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.classId = Number(this.activatedRoute.snapshot.params['classId']);
    this.loadClassById(this.classId);
  }

  getCourseName(): string | undefined {
    return this.courseService.getCourseNameById(this.selectedClass?.courseId);
  }

  loadClassById(classId: number) {
    this.classService.getLectureById(classId).subscribe({
      next: (leture) => {
        this.selectedClass = leture;
      },
    });
  }
}
