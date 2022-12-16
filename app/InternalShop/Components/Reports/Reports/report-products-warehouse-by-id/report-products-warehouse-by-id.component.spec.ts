import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProductsWarehouseByIdComponent } from './report-products-warehouse-by-id.component';

describe('ReportProductsWarehouseByIdComponent', () => {
  let component: ReportProductsWarehouseByIdComponent;
  let fixture: ComponentFixture<ReportProductsWarehouseByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportProductsWarehouseByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportProductsWarehouseByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
