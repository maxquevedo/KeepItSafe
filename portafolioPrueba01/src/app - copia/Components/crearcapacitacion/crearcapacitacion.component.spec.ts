import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearcapacitacionComponent } from './crearcapacitacion.component';

describe('CrearcapacitacionComponent', () => {
  let component: CrearcapacitacionComponent;
  let fixture: ComponentFixture<CrearcapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearcapacitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearcapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
