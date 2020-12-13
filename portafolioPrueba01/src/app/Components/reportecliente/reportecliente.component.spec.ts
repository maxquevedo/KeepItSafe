import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteclienteComponent } from './reportecliente.component';

describe('ReporteclienteComponent', () => {
  let component: ReporteclienteComponent;
  let fixture: ComponentFixture<ReporteclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
