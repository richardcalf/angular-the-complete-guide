import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipelistdetailComponent } from './recipelistdetail.component';

describe('RecipelistdetailComponent', () => {
  let component: RecipelistdetailComponent;
  let fixture: ComponentFixture<RecipelistdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipelistdetailComponent]
    });
    fixture = TestBed.createComponent(RecipelistdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
