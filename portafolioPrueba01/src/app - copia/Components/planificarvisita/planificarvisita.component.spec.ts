import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificarvisitaComponent } from './planificarvisita.component';

describe('PlanificarvisitaComponent', () => {
  let component: PlanificarvisitaComponent;
  let fixture: ComponentFixture<PlanificarvisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificarvisitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificarvisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
