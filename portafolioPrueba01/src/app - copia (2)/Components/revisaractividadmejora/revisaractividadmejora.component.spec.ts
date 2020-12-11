import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisaractividadmejoraComponent } from './revisaractividadmejora.component';

describe('RevisaractividadmejoraComponent', () => {
  let component: RevisaractividadmejoraComponent;
  let fixture: ComponentFixture<RevisaractividadmejoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisaractividadmejoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisaractividadmejoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
