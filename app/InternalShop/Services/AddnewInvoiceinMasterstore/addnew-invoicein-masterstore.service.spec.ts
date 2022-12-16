import { TestBed } from '@angular/core/testing';

import { AddnewInvoiceinMasterstoreService } from './addnew-invoicein-masterstore.service';

describe('AddnewInvoiceinMasterstoreService', () => {
  let service: AddnewInvoiceinMasterstoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddnewInvoiceinMasterstoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
