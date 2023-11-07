import { TestBed } from '@angular/core/testing';

import { FireBasePrdService } from './fire-base-prd.service';

describe('FireBasePrdService', () => {
  let service: FireBasePrdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireBasePrdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
