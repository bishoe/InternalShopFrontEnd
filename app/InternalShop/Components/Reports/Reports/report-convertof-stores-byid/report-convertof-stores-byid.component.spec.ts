import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConvertofStoresByidComponent } from './report-convertof-stores-byid.component';

describe('ReportConvertofStoresByidComponent', () => {
  let component: ReportConvertofStoresByidComponent;
  let fixture: ComponentFixture<ReportConvertofStoresByidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportConvertofStoresByidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportConvertofStoresByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
