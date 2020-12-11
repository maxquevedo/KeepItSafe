import { TestBed } from '@angular/core/testing';

import { PlanificarvisitaService } from './planificarvisita.service';

describe('PlanificarvisitaService', () => {
  let service: PlanificarvisitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanificarvisitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
