import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSalesinvoiceComponent } from './all-salesinvoice.component';

describe('AllSalesinvoiceComponent', () => {
  let component: AllSalesinvoiceComponent;
  let fixture: ComponentFixture<AllSalesinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSalesinvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSalesinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
