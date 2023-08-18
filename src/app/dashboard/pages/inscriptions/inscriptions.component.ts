import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionActions } from './store/inscription.actions';
import { InscriptionWithStudent } from 'src/app/interfaces/Inscriptions';
import { Observable } from 'rxjs';
import { selectInscriptions } from './store/inscription.selectors';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionsDialogComponent } from './inscriptions-dialog/inscriptions-dialog.component';
import {
  ConfirmActionModalComponent,
  ConfirmationType,
} from 'src/app/shared/components/confirm-action-modal/confirm-action-modal.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss'],
})
export class InscriptionsComponent implements OnInit {
  displayedColumns = ['id', 'course', 'students', 'actions'];
  inscriptions$: Observable<InscriptionWithStudent[]>;

  constructor(private store: Store, private matDialog: MatDialog) {
    this.inscriptions$ = this.store.select(selectInscriptions);
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadInscriptions());
  }

  onAdd(): void {
    this.matDialog.open(InscriptionsDialogComponent);
  }

  onDeleteInscription(inscriptionToDelete: InscriptionWithStudent): void {
    this.matDialog
      .open(ConfirmActionModalComponent, {
        data: {
          title: 'Borrar la inscripción?',
          message: `Estás seguro de borrar la inscripción del alumno ${inscriptionToDelete.student.name} ${inscriptionToDelete.student.lastName} al curso ${inscriptionToDelete.course.courseName}?`,
          type: ConfirmationType.DELETE,
        },
      })
      .afterClosed()
      .subscribe((confirmation) => {
        if (confirmation) {
          this.store.dispatch(
            InscriptionActions.deleteInscription({
              inscriptionId: inscriptionToDelete.id,
            })
          );
        }
      });
  }
}
