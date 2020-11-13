import { TestBed } from '@angular/core/testing';

import { PreloginService } from './prelogin.service';

describe('PreloginService', () => {
  let service: PreloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
