import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormsComponent } from './forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TableHeaderComponent } from 'src/shared/components/table-header/table-header.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PagingComponent } from 'src/shared/components/paging/paging.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/shared/shared.module';



const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
  },
  {
    path: 'create',
    loadChildren: () => import('./create-form/create-form.module').then(m => m.CreateFormModule)
  }
];

@NgModule({
  declarations: [
    FormsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MatSidenavModule,
    SharedModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    TableHeaderComponent,
    NgxSkeletonLoaderModule,
    PagingComponent,
    MatTableModule,
  ],
  providers: [],
})
export class FormsModule { }
