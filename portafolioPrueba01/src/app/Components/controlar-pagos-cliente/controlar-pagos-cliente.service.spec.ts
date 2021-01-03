import { TestBed } from '@angular/core/testing';

import { ControlarPagosClienteService } from './controlar-pagos-cliente.service';

describe('ControlarPagosClienteService', () => {
  let service: ControlarPagosClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlarPagosClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
