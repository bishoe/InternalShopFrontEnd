import { TestBed } from '@angular/core/testing';

import { ReceivingpermissionService } from './receivingpermission.service';

describe('ReceivingpermissionService', () => {
  let service: ReceivingpermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceivingpermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
