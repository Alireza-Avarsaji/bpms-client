import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TSResult } from 'src/shared/models/result-model/TServiceResult';
import { SubmissionModel } from '../models/submission.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  apiUrl = 'https://bpms.darkube.app/submission';

  constructor(private httpclient: HttpClient) { }


  createSubmission(sub: SubmissionModel): Observable<TSResult<string>> {
    console.log(sub);
    
    return this.httpclient.post<TSResult<string>>(`${this.apiUrl}/createSubmission`, sub);
  }




}
