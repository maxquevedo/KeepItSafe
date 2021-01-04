import { TestBed } from '@angular/core/testing';

import { CalcularAccidentabilidadService } from './calcular-accidentabilidad.service';

describe('CalcularAccidentabilidadService', () => {
  let service: CalcularAccidentabilidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcularAccidentabilidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
