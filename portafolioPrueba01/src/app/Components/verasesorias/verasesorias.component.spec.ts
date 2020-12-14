import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerasesoriasComponent } from './verasesorias.component';

describe('VerasesoriasComponent', () => {
  let component: VerasesoriasComponent;
  let fixture: ComponentFixture<VerasesoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerasesoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerasesoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
