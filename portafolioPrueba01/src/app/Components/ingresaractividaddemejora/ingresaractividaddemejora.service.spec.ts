import { TestBed } from '@angular/core/testing';

import { IngresaractividaddemejoraService } from './ingresaractividaddemejora.service';

describe('IngresaractividaddemejoraService', () => {
  let service: IngresaractividaddemejoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresaractividaddemejoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
