import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistmodifierComponent } from './shoppinglistmodifier.component';

describe('ShoppinglistmodifierComponent', () => {
  let component: ShoppinglistmodifierComponent;
  let fixture: ComponentFixture<ShoppinglistmodifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppinglistmodifierComponent]
    });
    fixture = TestBed.createComponent(ShoppinglistmodifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
