import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsComponent } from './inscriptions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionEffects } from './store/inscription.effects';
import { inscriptionFeature } from './store/inscription.reducer';
import { InscriptionRoutingModule } from './inscription-routing.module';
import { InscriptionsDialogComponent } from './inscriptions-dialog/inscriptions-dialog.component';

@NgModule({
  declarations: [InscriptionsComponent, InscriptionsDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    InscriptionRoutingModule,
    StoreModule.forFeature(inscriptionFeature),
    EffectsModule.forFeature([InscriptionEffects]),
  ],
})
export class InscriptionsModule {}
