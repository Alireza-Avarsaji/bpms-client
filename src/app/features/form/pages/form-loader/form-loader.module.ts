import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/shared/shared.module';
import { FormLoaderComponent } from './form-loader.component';
import {MatStepperModule} from '@angular/material/stepper';
import { QTextComponent } from 'src/shared/components/Question-templates/q-text/q-text.component';
import { QSingleSelectComponent } from 'src/shared/components/Question-templates/q-single-select/q-single-select.component';
import { QMultiSelectComponent } from 'src/shared/components/Question-templates/q-multi-select/q-multi-select.component';
import { QRangeComponent } from 'src/shared/components/Question-templates/q-range/q-range.component';
import { QDateComponent } from 'src/shared/components/Question-templates/q-date/q-date.component';
import { QTimeComponent } from 'src/shared/components/Question-templates/q-time/q-time.component';
import { QFileComponent } from 'src/shared/components/Question-templates/q-file/q-file.component';
import { QRadioComponent } from 'src/shared/components/Question-templates/q-radio/q-radio.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const routes: Routes = [
    {
        path: '',
        component: FormLoaderComponent,
    }
];

@NgModule({
    declarations: [
        FormLoaderComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        MatButtonModule,
        ReactiveFormsModule,
        NgxSkeletonLoaderModule,
        MatStepperModule,
        MatSnackBarModule,
        QTextComponent,
        QSingleSelectComponent,
        QMultiSelectComponent,
        QRangeComponent,
        QDateComponent,
        QFileComponent,
        QRadioComponent,
        QTimeComponent,
        
    ],
    providers: [],
})
export class FormLoaderModule { }
