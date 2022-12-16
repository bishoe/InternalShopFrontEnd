import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportManageStoreByidComponent } from './report-manage-store-byid.component';

describe('ReportManageStoreByidComponent', () => {
  let component: ReportManageStoreByidComponent;
  let fixture: ComponentFixture<ReportManageStoreByidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportManageStoreByidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportManageStoreByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
