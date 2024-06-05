import { TestBed } from '@angular/core/testing';

import { AuthenticationByMailService } from './authentication-by-mail.service';

describe('EngineStepServiceService', () => {
  let service: AuthenticationByMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationByMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
