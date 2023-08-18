import { AbstractControl } from '@angular/forms';

export function dateRangeValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const startDate = control.get('startDateControl')?.value;
  const endDate = control.get('endDateControl')?.value;

  if (startDate && endDate && startDate > endDate) {
    return { dateRangeInvalid: true };
  }

  return null;
}
