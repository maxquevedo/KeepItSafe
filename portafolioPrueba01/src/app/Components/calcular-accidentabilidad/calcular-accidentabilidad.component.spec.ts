import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularAccidentabilidadComponent } from './calcular-accidentabilidad.component';

describe('CalcularAccidentabilidadComponent', () => {
  let component: CalcularAccidentabilidadComponent;
  let fixture: ComponentFixture<CalcularAccidentabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcularAccidentabilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcularAccidentabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
