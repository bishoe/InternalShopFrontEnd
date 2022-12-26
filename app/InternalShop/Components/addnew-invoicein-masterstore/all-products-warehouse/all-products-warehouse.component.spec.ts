import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsWarehouseComponent } from './all-products-warehouse.component';

describe('AllProductsWarehouseComponent', () => {
  let component: AllProductsWarehouseComponent;
  let fixture: ComponentFixture<AllProductsWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProductsWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProductsWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
