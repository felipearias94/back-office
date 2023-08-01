// duration.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(durationInMin: number | undefined): string {
    if (!durationInMin) {
      return 'Sin duración';
    }
    const hours = Math.floor(durationInMin / 60);
    const minutes = durationInMin % 60;

    const hoursText =
      hours > 0 ? `${hours} ${hours === 1 ? 'hora' : 'horas'}` : '';
    const minutesText =
      minutes > 0 ? `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}` : '';

    return `${hoursText} ${minutesText}`;
  }
}
