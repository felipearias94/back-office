import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrorMessage',
})
export class ControlErrorMessagePipe implements PipeTransform {
  transform(error: { key: string; value: any }, ...args: unknown[]): unknown {
    const errorMessages: Record<string, string> = {
      required: 'Este campo es requerido.',
      email: 'Debe ser un formato válido de email.',
      minlength: `Debe tener al menos ${error.value.requiredLength} caracteres de largo.`,
      dateRangeInvalid: 'Las fechas no son correctas',
    };
    return errorMessages[error.key] || 'Campo inválido';
  }
}
