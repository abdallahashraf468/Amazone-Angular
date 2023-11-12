import { TestBed } from '@angular/core/testing';

import { KakService } from './kak.service';

describe('KakService', () => {
  let service: KakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
