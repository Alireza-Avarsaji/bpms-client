import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from 'src/shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path: 'forms',
        loadChildren: () => import('./form/forms.module').then(m => m.FormsModule)
      }
    ]
  }
]

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatButtonModule,
    SharedModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [],
})
export class LayoutModule { }
