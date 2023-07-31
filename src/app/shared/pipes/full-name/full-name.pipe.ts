import { UpperCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/interfaces/User';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(value: User | undefined, ...args: unknown[]): unknown {
    return `${value?.name} ${value?.lastName.toUpperCase()}`;
  }
}
