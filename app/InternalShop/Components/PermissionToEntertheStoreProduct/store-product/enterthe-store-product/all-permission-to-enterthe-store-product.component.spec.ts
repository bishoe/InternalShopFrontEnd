import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPermissionToEntertheStoreProductComponent } from './all-permission-to-enterthe-store-product.component';

describe('AllPermissionToEntertheStoreProductComponent', () => {
  let component: AllPermissionToEntertheStoreProductComponent;
  let fixture: ComponentFixture<AllPermissionToEntertheStoreProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPermissionToEntertheStoreProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPermissionToEntertheStoreProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
