import { TestBed } from '@angular/core/testing';

import { DismissalnoticeService } from './dismissalnotice.service';

describe('DismissalnoticeService', () => {
  let service: DismissalnoticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DismissalnoticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
