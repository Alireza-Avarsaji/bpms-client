import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../state/form.state.model';
import { getCurrentForm } from '../../state/form.selectors';
import { FormModel, QuestionModel } from '../../models/form.model';
import { Observable } from 'rxjs';
import * as FormActions from '../../state/form.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-loader',
  templateUrl: './form-loader.component.html',
  styleUrls: ['./form-loader.component.scss']
})
export class FormLoaderComponent implements OnInit {

  form$!: Observable<FormModel>;

  constructor(private store: Store<State>, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      param => this.store.dispatch(FormActions.loadFormById({ id: param['id']}))
    );
    this.form$ = this.store.select(getCurrentForm);
  }

  trackById(index: number, item: QuestionModel) {
    return item.id;
  }



}
