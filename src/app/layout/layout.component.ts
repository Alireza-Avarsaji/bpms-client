import { Component } from '@angular/core';
import { MenuService } from '../core/service/menu.service';
import { Router } from '@angular/router';
import { IMenu } from '../core/interface/menu.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  menuItems = this.menuService.getAllMenuItems();

  constructor(private menuService: MenuService, private router: Router) {}

  navigate(item: IMenu, childItem: IMenu) {
    this.router?.navigate([item.route, childItem.route] , {queryParams: childItem.qparam} );
  }



}
