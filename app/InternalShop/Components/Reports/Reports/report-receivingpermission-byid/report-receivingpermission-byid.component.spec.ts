import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReceivingpermissionByidComponent } from './report-receivingpermission-byid.component';

describe('ReportReceivingpermissionByidComponent', () => {
  let component: ReportReceivingpermissionByidComponent;
  let fixture: ComponentFixture<ReportReceivingpermissionByidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportReceivingpermissionByidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportReceivingpermissionByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
