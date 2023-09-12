import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { configHeaderModel } from 'src/shared/components/table-header/table-header.component';
import { PageFilterModel } from 'src/shared/models/filter-models/pageFilter.model';
import { QuestionModel } from 'src/shared/models/question.model';
import { PageList } from 'src/shared/models/result-model/pageList.model';
import { FormService } from './service/form.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  //? Config Table Header
  configTableHeader: configHeaderModel = {
    addBtn: true,
    searchBtn: true,
    excelBtn: false,
    title: 'سوالات'
  };

  displayedColumns: string[] = ['نام', 'عنوان'];
  filterForm!: FormGroup;


  questions: PageList<QuestionModel> = new PageList<QuestionModel>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private service: FormService) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.queryParams.pipe(
      switchMap(qparam => {
        this.filterForm.get('searchTerm')?.setValue(qparam['searchTerm']);
        return this.getQuestions((qparam['page'] - 1) | 0);
      })
    ).subscribe();

  }

  initForm() {
    this.filterForm = this.fb.group({
      searchTerm: new FormControl(null)
    });
  }

  getQuestions(page: number) {
    const filter = new PageFilterModel();
    filter.pgNumber = page;
    const searchTerm = this.filterForm.get('searchTerm')?.value;
    return this.service.getformsByFilter(filter, searchTerm).pipe(
      tap(res => {
        if(!res.hasError) {
          this.questions = res.result;
        }
      })
    )
  }

  createQuestion() {
    this.router.navigate(['/layout/forms/create']);
  }

  search(page?: number) {
    const qparam = {
      page: page !== undefined ? page + 1 : 1,
      searchTerm: this.filterForm.get('searchTerm')?.value
    }
    for (const key in qparam) {
      if (Object.prototype.hasOwnProperty.call(qparam, key)) {
        if (qparam[key as keyof typeof qparam] === null)
          delete qparam[key as keyof typeof qparam];
      }
    }
    this.router.navigate(['/layout/forms'], { queryParams: qparam });
  }



}
