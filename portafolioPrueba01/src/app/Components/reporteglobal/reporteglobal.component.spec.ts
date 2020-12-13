import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteglobalComponent } from './reporteglobal.component';

describe('ReporteglobalComponent', () => {
  let component: ReporteglobalComponent;
  let fixture: ComponentFixture<ReporteglobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteglobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteglobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
