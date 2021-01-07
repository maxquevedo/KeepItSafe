import { TestBed } from '@angular/core/testing';

import { VercapacitacionesService } from './vercapacitaciones.service';

describe('VercapacitacionesService', () => {
  let service: VercapacitacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VercapacitacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
