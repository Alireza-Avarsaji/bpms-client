import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { formReducer } from './state/form.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FormEffects } from './state/form.effects';



const routes: Routes = [
  {
    path: ':id',
    loadChildren: () => import('./pages/form-loader/form-loader.module').then(m => m.FormLoaderModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxSkeletonLoaderModule,
    StoreModule.forFeature('form', formReducer),
    EffectsModule.forFeature([FormEffects])
  ],
  providers: [],
})
export class FormsModule { }
