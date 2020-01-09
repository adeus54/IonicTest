import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroalimentacionPage } from './retroalimentacion.page';

describe('RetroalimentacionPage', () => {
  let component: RetroalimentacionPage;
  let fixture: ComponentFixture<RetroalimentacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetroalimentacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroalimentacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
