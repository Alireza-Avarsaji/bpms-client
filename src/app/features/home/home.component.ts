import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../form/state/form.state.model';
import { Observable } from 'rxjs';
import { FormModel } from '../form/models/form.model';
import { getAllForms } from '../form/state/form.selectors';
import { loadForms } from '../form/state/form.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  forms$!: Observable<FormModel[]>;

  constructor(private store: Store<State>) {}


  ngOnInit(): void {
    this.store.dispatch(loadForms());
    this.forms$ = this.store.select(getAllForms);
  }

}
