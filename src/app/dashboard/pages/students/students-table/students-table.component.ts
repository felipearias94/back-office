import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from 'src/app/interfaces/Students';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent {
  @Input() dataSource: Student[] = [];
  @Output() deleteStudent = new EventEmitter<Student>();
  @Output() editStudent = new EventEmitter<Student>();
}
