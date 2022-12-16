import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrancheByidComponent } from './branche-byid.component';

describe('BrancheByidComponent', () => {
  let component: BrancheByidComponent;
  let fixture: ComponentFixture<BrancheByidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrancheByidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrancheByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
