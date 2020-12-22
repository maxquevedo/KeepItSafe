import { TestBed } from '@angular/core/testing';

import { ResponderchecklistService } from './responderchecklist.service';

describe('ResponderchecklistService', () => {
  let service: ResponderchecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponderchecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
