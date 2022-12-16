import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProductByIdComponent } from './report-product-by-id.component';

describe('ReportProductByIdComponent', () => {
  let component: ReportProductByIdComponent;
  let fixture: ComponentFixture<ReportProductByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportProductByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportProductByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
