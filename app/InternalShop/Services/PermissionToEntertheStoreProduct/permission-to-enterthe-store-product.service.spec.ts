import { TestBed } from '@angular/core/testing';

import { PermissionToEntertheStoreProductService } from './permission-to-enterthe-store-product.service';

describe('PermissionToEntertheStoreProductService', () => {
  let service: PermissionToEntertheStoreProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionToEntertheStoreProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
