import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarActividadesComponent } from './visualizar-actividades.component';

describe('VisualizarActividadesComponent', () => {
  let component: VisualizarActividadesComponent;
  let fixture: ComponentFixture<VisualizarActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
