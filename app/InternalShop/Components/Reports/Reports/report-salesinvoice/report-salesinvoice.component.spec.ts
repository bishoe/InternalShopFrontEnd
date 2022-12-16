import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSalesinvoiceComponent } from './report-salesinvoice.component';

describe('ReportSalesinvoiceComponent', () => {
  let component: ReportSalesinvoiceComponent;
  let fixture: ComponentFixture<ReportSalesinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSalesinvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSalesinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
