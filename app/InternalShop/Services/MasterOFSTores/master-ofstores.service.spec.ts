import { TestBed } from '@angular/core/testing';

import { MasterOFSToresService } from './master-ofstores.service';

describe('MasterOFSToresService', () => {
  let service: MasterOFSToresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterOFSToresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
