import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDismissalnoticeByIdComponent } from './report-dismissalnotice-by-id.component';

describe('ReportDismissalnoticeByIdComponent', () => {
  let component: ReportDismissalnoticeByIdComponent;
  let fixture: ComponentFixture<ReportDismissalnoticeByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDismissalnoticeByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDismissalnoticeByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
