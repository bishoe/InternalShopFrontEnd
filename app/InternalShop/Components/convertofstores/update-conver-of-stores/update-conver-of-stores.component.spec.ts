import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConverOfStoresComponent } from './update-conver-of-stores.component';

describe('UpdateConverOfStoresComponent', () => {
  let component: UpdateConverOfStoresComponent;
  let fixture: ComponentFixture<UpdateConverOfStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateConverOfStoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateConverOfStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
