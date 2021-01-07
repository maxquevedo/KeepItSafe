import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarcapacitacionesComponent } from './listarcapacitaciones.component';

describe('ListarcapacitacionesComponent', () => {
  let component: ListarcapacitacionesComponent;
  let fixture: ComponentFixture<ListarcapacitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarcapacitacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarcapacitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
