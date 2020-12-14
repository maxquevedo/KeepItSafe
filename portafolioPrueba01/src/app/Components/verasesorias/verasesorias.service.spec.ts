import { TestBed } from '@angular/core/testing';

import { VerasesoriasService } from './verasesorias.service';

describe('VerasesoriasService', () => {
  let service: VerasesoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerasesoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
