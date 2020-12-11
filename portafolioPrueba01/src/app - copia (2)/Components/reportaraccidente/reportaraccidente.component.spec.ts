import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportaraccidenteComponent } from './reportaraccidente.component';

describe('ReportaraccidenteComponent', () => {
  let component: ReportaraccidenteComponent;
  let fixture: ComponentFixture<ReportaraccidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportaraccidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportaraccidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
