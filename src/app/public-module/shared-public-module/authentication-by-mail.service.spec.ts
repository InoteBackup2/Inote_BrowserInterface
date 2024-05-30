import { TestBed } from '@angular/core/testing';

import { EngineStepService } from './authentication-by-mail.service.spec.';

describe('EngineStepServiceService', () => {
  let service: EngineStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineStepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
