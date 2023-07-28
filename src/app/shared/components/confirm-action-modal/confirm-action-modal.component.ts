import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export enum ConfirmationType {
  DELETE = 'delete',
}

export interface ConfirmationData {
  title: string;
  message: string;
  type: ConfirmationType;
}

@Component({
  selector: 'app-confirm-action-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.scss'],
})
export class ConfirmActionModalComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData
  ) {}

  isDelete = this.data.type === ConfirmationType.DELETE;

  onAcceptAction(): void {
    this.dialogRef.close(true);
  }

  onRejectAction(): void {
    this.dialogRef.close(false);
  }
}
