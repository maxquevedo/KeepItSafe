import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondermejoraComponent } from './respondermejora.component';

describe('RespondermejoraComponent', () => {
  let component: RespondermejoraComponent;
  let fixture: ComponentFixture<RespondermejoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespondermejoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondermejoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
