import { TestBed } from '@angular/core/testing';

import { PublicUserServiceService } from './public-user-service.service';

describe('PublicUserServiceService', () => {
  let service: PublicUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
