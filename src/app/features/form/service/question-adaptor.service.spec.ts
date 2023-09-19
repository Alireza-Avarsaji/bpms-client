import { TestBed } from '@angular/core/testing';

import { QuestionAdaptorService } from './question-adaptor.service';

describe('QuestionAdaptorService', () => {
  let service: QuestionAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
