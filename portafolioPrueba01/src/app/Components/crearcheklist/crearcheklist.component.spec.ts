import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearcheklistComponent } from './crearcheklist.component';

describe('CrearcheklistComponent', () => {
  let component: CrearcheklistComponent;
  let fixture: ComponentFixture<CrearcheklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearcheklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearcheklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
