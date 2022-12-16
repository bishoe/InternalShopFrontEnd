import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertofstoresComponent } from './convertofstores.component';

describe('ConvertofstoresComponent', () => {
  let component: ConvertofstoresComponent;
  let fixture: ComponentFixture<ConvertofstoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertofstoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertofstoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
