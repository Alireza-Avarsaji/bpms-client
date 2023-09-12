import { Injectable } from '@angular/core';
import { IMenu } from '../interface/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  menuItems: IMenu[] = [
    {
      name: 'لیست فرم ها',
      icon: 'lists',
      route: 'forms',
      type: 'parent',
      qparam: {
        page: 1
      }
    },
    {
      name: 'فرم جدید',
      icon: 'post_add',
      route: 'forms/create',
      type: 'parent'
    }
  ];


  getAllMenuItems() {
    return this.menuItems;
  }

}
