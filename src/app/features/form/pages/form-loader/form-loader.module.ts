import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/shared/shared.module';
import { FormLoaderComponent } from './form-loader.component';



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
    ],
    providers: [],
})
export class FormLoaderModule { }
