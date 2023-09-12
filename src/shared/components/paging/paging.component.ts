import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-paging',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() clicked = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  nextPage = () => this.clicked.emit(++this.currentPage);

  previousPage = () => this.clicked.emit(--this.currentPage);
}
