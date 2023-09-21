import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/shared/shared.module';
import { HomeComponent } from './home.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormEffects } from '../form/state/form.effects';
import { formReducer } from '../form/state/form.reducer';



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
        StoreModule.forFeature('form', formReducer),
        EffectsModule.forFeature([FormEffects])
    ],
    providers: [],
})
export class HomeModule { }
