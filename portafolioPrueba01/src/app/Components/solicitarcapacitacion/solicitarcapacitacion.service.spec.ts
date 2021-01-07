import { TestBed } from '@angular/core/testing';

import { SolicitarcapacitacionService } from './solicitarcapacitacion.service';

describe('SolicitarcapacitacionService', () => {
  let service: SolicitarcapacitacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitarcapacitacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
