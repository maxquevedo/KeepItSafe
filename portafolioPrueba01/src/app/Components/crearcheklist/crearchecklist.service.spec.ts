import { TestBed } from '@angular/core/testing';

import { CrearchecklistService } from './crearchecklist.service';

describe('CrearchecklistService', () => {
  let service: CrearchecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearchecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
