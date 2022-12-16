import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConverOfStoresComponent } from './list-conver-of-stores.component';

describe('ListConverOfStoresComponent', () => {
  let component: ListConverOfStoresComponent;
  let fixture: ComponentFixture<ListConverOfStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListConverOfStoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConverOfStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
