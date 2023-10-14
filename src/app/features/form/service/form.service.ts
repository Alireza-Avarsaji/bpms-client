import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageFilterModel } from 'src/shared/models/filter-models/pageFilter.model';
import { TSResult } from 'src/shared/models/result-model/TServiceResult';
import { PageList } from 'src/shared/models/result-model/pageList.model';
import { FormModel } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  apiUrl = 'https://bpms2.darkube.app/api/Form';

  constructor(private httpclient: HttpClient) { }

  postForm(body: FormModel): Observable<TSResult<string>> {
    return this.httpclient.post<TSResult<string>>(`${this.apiUrl}/CreateForm`, body);
  }

  getFormById(id: string): Observable<TSResult<FormModel>> {
    return this.httpclient.get<TSResult<FormModel>>(`${this.apiUrl}/GetForm/${id}`);
  }

  getformsByFilter(body: PageFilterModel, searchTerm: string): Observable<TSResult<PageList<FormModel>>> {
    const query = searchTerm ? `?title=${searchTerm}` : '';
    return this.httpclient.post<TSResult<PageList<FormModel>>>(`${this.apiUrl}/GetFormByFilter${query}`, body);
  }


}
