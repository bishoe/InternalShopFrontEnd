import { TestBed } from '@angular/core/testing';

import { ConvertofStoresService } from './convertof-stores.service';

describe('ConvertofStoresService', () => {
  let service: ConvertofStoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertofStoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
