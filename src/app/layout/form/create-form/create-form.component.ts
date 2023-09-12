import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionTypeList } from 'src/shared/constants/q-types';
import { INameValue, QuestionModel, QuestionTypesEnum } from 'src/shared/models/question.model';
import { FormBasedQuestion, State } from './state/form.state.model';
import * as FormActions from './state/form.actions';
import { v4 as uuidv4 } from 'uuid';
import { Observable, distinctUntilChanged, map, tap } from 'rxjs';
import { getFormIsValid, getFormState } from './state/form.selectors';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {

  question!: QuestionModel;
  QuestionMenuItems: INameValue[] = QuestionTypeList;
  questionTypeEnum = QuestionTypesEnum;
  subQuestions$!: Observable<FormBasedQuestion<any>[]>;
  isQuestionValid$!: Observable<boolean>;
  title$!: Observable<string>;
  form!: FormGroup;


  constructor(private store: Store<State>, private fb: FormBuilder, private activeRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.checkRoute().pipe(
      tap(() => this.initForm())
    ).subscribe();
    this.subQuestions$ = this.store.select(getFormState).pipe(map(s => s.formBasedQuestions));
    this.isQuestionValid$ = this.store.select(getFormIsValid);
    this.store.select(getFormState).pipe(tap(s => this.form.get('title')?.setValue(s.title))).subscribe();
    this.handleFormValueChange();
  }

  checkRoute() {
    return this.activeRoute.params.pipe(
      tap(param => {    
        if(param['id']) {
          this.store.dispatch(FormActions.loadForm({id: param['id']}));
        }
      })
    );
  }

  initForm() {
    this.form = this.fb.group({
      title: new FormControl(null, [Validators.required])
    });
  }

  handleFormValueChange() {
    this.form.get('title')?.valueChanges.pipe(
      distinctUntilChanged()
    )
    .subscribe(value => {
      this.store.dispatch(FormActions.UpdateFormTitle({title: value}));
    });
  }

  // ? add a subQuestion to the store
  public addSubQuestion(qType: INameValue) {
    const id = uuidv4();
    this.store.dispatch(
      FormActions.AddQuestion({ formValue: { id: id, type: qType.value, key: '', isValid: false } })
    );
  }

  public removeSubQuestion(sub: FormBasedQuestion<any>) {
    this.store.dispatch(FormActions.RemoveQuestion({id: sub.id}));
  }

  trackById(index: number, item: FormBasedQuestion<any>) {
    return item.id;
  }


  // ? whenEver a subQuestion value is changed
  onSubValueChanged(value: FormBasedQuestion<any>) {
    this.store.dispatch(
      FormActions.UpdateQuestion(
        {
          formValue: value
        }
      )
    );
  }


  public submitQuestion() {
    this.store.dispatch(FormActions.postForm());
  }
}
