import { UpperCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/interfaces/Students';
import { User } from 'src/app/interfaces/User';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(value: User | Student | undefined, ...args: unknown[]): unknown {
    return `${value?.name} ${value?.lastName.toUpperCase()}`;
  }
}
