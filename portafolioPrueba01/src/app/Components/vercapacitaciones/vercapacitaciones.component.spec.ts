import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VercapacitacionesComponent } from './vercapacitaciones.component';

describe('VercapacitacionesComponent', () => {
  let component: VercapacitacionesComponent;
  let fixture: ComponentFixture<VercapacitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VercapacitacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VercapacitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
