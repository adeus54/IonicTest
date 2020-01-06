import { TestBed } from '@angular/core/testing';

import { RetroalimentacionService } from './retroalimentacion.service';

describe('RetroalimentacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetroalimentacionService = TestBed.get(RetroalimentacionService);
    expect(service).toBeTruthy();
  });
});
