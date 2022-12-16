import { TestBed } from '@angular/core/testing';

import { QuantityProductService } from './quantity-product.service';

describe('QuantityProductService', () => {
  let service: QuantityProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantityProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
