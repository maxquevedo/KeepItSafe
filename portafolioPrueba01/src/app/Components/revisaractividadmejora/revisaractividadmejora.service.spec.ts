import { TestBed } from '@angular/core/testing';

import { RevisaractividadmejoraService } from './revisaractividadmejora.service';

describe('RevisaractividadmejoraService', () => {
  let service: RevisaractividadmejoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisaractividadmejoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
