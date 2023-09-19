import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/shared/shared.module';
import { HomeComponent } from './home.component';



const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    }
];

@NgModule({
    declarations: [
        HomeComponent
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
export class HomeModule { }
