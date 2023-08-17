import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionActions } from './store/inscription.actions';
import { InscriptionWithStudent } from 'src/app/interfaces/Inscriptions';
import { Observable } from 'rxjs';
import { selectInscriptions } from './store/inscription.selectors';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionsDialogComponent } from './inscriptions-dialog/inscriptions-dialog.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss'],
})
export class InscriptionsComponent implements OnInit {
  displayedColumns = ['id', 'course', 'students'];
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
}
