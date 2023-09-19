import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }
];
@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  providers: [],
})
export class FeaturesModule { }
