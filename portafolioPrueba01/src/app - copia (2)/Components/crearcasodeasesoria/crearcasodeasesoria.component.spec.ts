import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearcasodeasesoriaComponent } from './crearcasodeasesoria.component';

describe('CrearcasodeasesoriaComponent', () => {
  let component: CrearcasodeasesoriaComponent;
  let fixture: ComponentFixture<CrearcasodeasesoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearcasodeasesoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearcasodeasesoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
