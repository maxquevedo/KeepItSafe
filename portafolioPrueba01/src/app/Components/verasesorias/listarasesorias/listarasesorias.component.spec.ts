import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarasesoriasComponent } from './listarasesorias.component';

describe('ListarasesoriasComponent', () => {
  let component: ListarasesoriasComponent;
  let fixture: ComponentFixture<ListarasesoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarasesoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarasesoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
