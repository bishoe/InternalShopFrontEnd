import { TestBed } from '@angular/core/testing';

import { AddnewSalesinvoiceService } from './addnew-salesinvoice.service';

describe('AddnewSalesinvoiceService', () => {
  let service: AddnewSalesinvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddnewSalesinvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
