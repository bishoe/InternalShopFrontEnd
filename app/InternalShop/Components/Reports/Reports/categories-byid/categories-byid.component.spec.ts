import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesByidComponent } from './categories-byid.component';

describe('CategoriesByidComponent', () => {
  let component: CategoriesByidComponent;
  let fixture: ComponentFixture<CategoriesByidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesByidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
