import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresaractividaddemejoraComponent } from './ingresaractividaddemejora.component';

describe('IngresaractividaddemejoraComponent', () => {
  let component: IngresaractividaddemejoraComponent;
  let fixture: ComponentFixture<IngresaractividaddemejoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresaractividaddemejoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresaractividaddemejoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
