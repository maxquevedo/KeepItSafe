import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarasesoriaComponent } from './solicitarasesoria.component';

describe('SolicitarasesoriaComponent', () => {
  let component: SolicitarasesoriaComponent;
  let fixture: ComponentFixture<SolicitarasesoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarasesoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarasesoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
