import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numberRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = Number(control.value);

    if (
      isNaN(value) ||
      (min !== null && value < min) ||
      (max !== null && value > max)
    ) {
      return { numberRange: true };
    }

    return null;
  };
}
