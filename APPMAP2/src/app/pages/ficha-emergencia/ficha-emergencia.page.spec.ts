import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEmergenciaPage } from './ficha-emergencia.page';

describe('FichaEmergenciaPage', () => {
  let component: FichaEmergenciaPage;
  let fixture: ComponentFixture<FichaEmergenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaEmergenciaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaEmergenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
