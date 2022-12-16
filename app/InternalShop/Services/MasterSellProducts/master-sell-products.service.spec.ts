import { TestBed } from '@angular/core/testing';

import { MasterSellProductsService } from './master-sell-products.service';

describe('MasterSellProductsService', () => {
  let service: MasterSellProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterSellProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
