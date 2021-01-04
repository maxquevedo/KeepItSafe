import { TestBed } from '@angular/core/testing';

import { SolicitarasesoriaService } from './solicitarasesoria.service';

describe('SolicitarasesoriaService', () => {
  let service: SolicitarasesoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitarasesoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
