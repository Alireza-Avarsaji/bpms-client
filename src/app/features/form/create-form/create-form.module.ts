import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CreateFormComponent } from './create-form.component';
import {MatMenuModule} from '@angular/material/menu';
import { SharedModule } from 'src/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { formReducer } from './state/form.reducer';
import { EffectsModule } from '@ngrx/effects';
import { QuestionEffects } from './state/form.effects';
import { QDateComponent } from 'src/shared/components/Question-templates/q-date/q-date.component';
import { QFileComponent } from 'src/shared/components/Question-templates/q-file/q-file.component';
import { QMultiSelectComponent } from 'src/shared/components/Question-templates/q-multi-select/q-multi-select.component';
import { QRadioComponent } from 'src/shared/components/Question-templates/q-radio/q-radio.component';
import { QRangeComponent } from 'src/shared/components/Question-templates/q-range/q-range.component';
import { QSingleSelectComponent } from 'src/shared/components/Question-templates/q-single-select/q-single-select.component';
import { QTextComponent } from 'src/shared/components/Question-templates/q-text/q-text.component';
import { QTimeComponent } from 'src/shared/components/Question-templates/q-time/q-time.component';



const routes: Routes = [
  {
    path: '',
    component: CreateFormComponent,
  },
  {
    path: ':id',
    component: CreateFormComponent,
  }
];

@NgModule({
  declarations: [
    CreateFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxSkeletonLoaderModule,
    MatMenuModule,
    QTextComponent,
    QSingleSelectComponent,
    QMultiSelectComponent,
    QRangeComponent,
    QDateComponent,
    QTimeComponent,
    QFileComponent,
    QRadioComponent,
    StoreModule.forFeature('forms', formReducer),
    EffectsModule.forFeature([QuestionEffects])
  ],
  providers: [],
})
export class CreateFormModule { }
