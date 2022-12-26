import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllquantityProductsComponent } from './allquantity-products.component';

describe('AllquantityProductsComponent', () => {
  let component: AllquantityProductsComponent;
  let fixture: ComponentFixture<AllquantityProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllquantityProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllquantityProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
