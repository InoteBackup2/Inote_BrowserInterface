import { TestBed } from '@angular/core/testing';

import { ProtectedUserService } from './protected-user.service';

describe('UserService', () => {
  let service: ProtectedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
