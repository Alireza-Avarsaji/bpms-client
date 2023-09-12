import { Component, EventEmitter, Input, NgModule, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatOptionModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})

export class TableHeaderComponent {

  @Input() config!: configHeaderModel;

  @Output() addItem = new EventEmitter<void>();
  @Output() SearchEmiter = new EventEmitter<void>();
  @Output() EmmitFilter = new EventEmitter<any>();
  @Output() createExcel = new EventEmitter<any>();

  showButton!: boolean;

  // @ViewChild('SelectedGroup') private SelectedGroup: MatOption;
  // @ViewChild('mySel') skillSel: MatSelect;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.btnVisibility()
  }

  add = () => this.addItem.emit();

  excel = () => this.createExcel.emit();

  openSearch = () => this.SearchEmiter.emit();

  // valueChange(item, event) {
  //   item.visible = event.checked;
  //   this.EmmitFilter.emit(item);
  // };

  // selectAllCol() {
  //   for (const col of this.columnList) {
  //     col.visible = true;
  //     this.EmmitFilter.emit(col);
  //   }
  // }

  // ? Remove Filter
  removeFilter() {
    this.router.navigate([], { queryParams: { page: 1 } });
  }

  // ? Button Visibility
  btnVisibility() {
    this.activatedRoute.queryParams.subscribe(param => {
      let keys = [...new Set([...Object.keys(param)])]
      keys.forEach(key => {
        this.showButton = true && key != 'page'
      })
    })
  }
}

// ? Header Model
export class configHeaderModel {
  searchBtn?: boolean;
  addBtn?: boolean;
  filterBtn?: boolean;
  permissions?: any;
  excelBtn?: boolean;
  title?: string;
}