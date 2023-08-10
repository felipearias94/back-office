import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor(private notificationService: NotificationService) {}

  public handleErrorResponse(error: any): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.notificationService.showNotification(
          'Ocurrió un problema. Servidor no responde.'
        );
      }
      if (error.status >= 500) {
        this.notificationService.showNotification(
          'Ocurrió un problema con el servidor. Intentelo nuevamente más tarde.'
        );
      }
    }
  }
}
