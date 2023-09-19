import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/shared/shared.module';



const routes: Routes = [

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
  ],
  providers: [],
})
export class FormsModule { }
