import { TestBed } from '@angular/core/testing';

import { ReporteglobalService } from './reporteglobal.service';

describe('ReporteglobalService', () => {
  let service: ReporteglobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteglobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
