import { TestBed } from '@angular/core/testing';

import { AsignacionEmergenciaService } from './asignacion-emergencia.service';

describe('AsignacionEmergenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsignacionEmergenciaService = TestBed.get(AsignacionEmergenciaService);
    expect(service).toBeTruthy();
  });
});
