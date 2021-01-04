import { TestBed } from '@angular/core/testing';

import { VisualizarActividadesService } from './visualizar-actividades.service';

describe('VisualizarActividadesService', () => {
  let service: VisualizarActividadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualizarActividadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
