import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityProducComponent } from './quantity-produc.component';

describe('QuantityProducComponent', () => {
  let component: QuantityProducComponent;
  let fixture: ComponentFixture<QuantityProducComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityProducComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityProducComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
