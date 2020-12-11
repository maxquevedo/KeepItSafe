import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderchecklistComponent } from './responderchecklist.component';

describe('ResponderchecklistComponent', () => {
  let component: ResponderchecklistComponent;
  let fixture: ComponentFixture<ResponderchecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderchecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
