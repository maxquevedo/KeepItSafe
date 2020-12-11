import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarclienteComponent } from './revisarcliente.component';

describe('RevisarclienteComponent', () => {
  let component: RevisarclienteComponent;
  let fixture: ComponentFixture<RevisarclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
