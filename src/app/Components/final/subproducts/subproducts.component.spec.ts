import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubproductsComponent } from './subproducts.component';

describe('SubproductsComponent', () => {
  let component: SubproductsComponent;
  let fixture: ComponentFixture<SubproductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubproductsComponent]
    });
    fixture = TestBed.createComponent(SubproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
