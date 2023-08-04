import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDuration',
})
export class DateDurationPipe implements PipeTransform {
  transform(value: any): string {
    if (!value || !value.startDate || !value.endDate) {
      return 'N/A';
    }

    const startDate = new Date(value.startDate);
    const endDate = new Date(value.endDate);

    const durationInMs = endDate.getTime() - startDate.getTime();

    const days = Math.floor(durationInMs / (1000 * 60 * 60 * 24));

    const months = this.calculateMonths(startDate, endDate);
    const remainingDays = days - months * 31; 
    let result = '';
    if (months > 0) {
      result += `${months} mes(es) `;
    }
    if (remainingDays > 0) {
      result += `${remainingDays} día(s)`;
    }

    return result.trim();
  }

  private calculateMonths(startDate: Date, endDate: Date): number {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth);
  }
}
