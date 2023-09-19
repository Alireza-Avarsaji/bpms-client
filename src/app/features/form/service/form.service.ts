import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageFilterModel } from 'src/shared/models/filter-models/pageFilter.model';
import { QuestionModel } from 'src/shared/models/question.model';
import { TSResult } from 'src/shared/models/result-model/TServiceResult';
import { PageList } from 'src/shared/models/result-model/pageList.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  apiUrl = 'https://192.168.5.12:5001/Form';

  constructor(private httpclient: HttpClient) { }

  postForm(body: QuestionModel): Observable<TSResult<string>> {
    return this.httpclient.post<TSResult<string>>(`${this.apiUrl}/CreateForm`, body);
  }

  getFormById(id: string): Observable<TSResult<QuestionModel>> {
    return this.httpclient.get<TSResult<QuestionModel>>(`${this.apiUrl}/GetForm/${id}`);
  }

  getformsByFilter(body: PageFilterModel, searchTerm: string): Observable<TSResult<PageList<QuestionModel>>> {
    const query = searchTerm ? `?title=${searchTerm}` : '';
    return this.httpclient.post<TSResult<PageList<QuestionModel>>>(`${this.apiUrl}/GetFormByFilter${query}`, body);
  }


}
