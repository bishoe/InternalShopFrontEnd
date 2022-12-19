import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionToEntertheStoreProductComponent } from './permission-to-enterthe-store-product.component';

describe('PermissionToEntertheStoreProductComponent', () => {
  let component: PermissionToEntertheStoreProductComponent;
  let fixture: ComponentFixture<PermissionToEntertheStoreProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionToEntertheStoreProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionToEntertheStoreProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
