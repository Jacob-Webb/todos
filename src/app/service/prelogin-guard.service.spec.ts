import { TestBed } from '@angular/core/testing';

import { PreloginGuardService } from './prelogin-guard.service';

describe('PreloginGuardService', () => {
  let service: PreloginGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreloginGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
