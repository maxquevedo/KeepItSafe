import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarcapacitacionComponent } from './solicitarcapacitacion.component';

describe('SolicitarcapacitacionComponent', () => {
  let component: SolicitarcapacitacionComponent;
  let fixture: ComponentFixture<SolicitarcapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarcapacitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarcapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
