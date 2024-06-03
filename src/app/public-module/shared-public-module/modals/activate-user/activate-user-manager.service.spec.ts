import { TestBed } from '@angular/core/testing';

import { ActivateUserManagerService } from './activate-user-manager.service';

describe('ActivateUserManagerService', () => {
  let service: ActivateUserManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivateUserManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
