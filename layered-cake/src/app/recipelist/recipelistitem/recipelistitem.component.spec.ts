import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipelistitemComponent } from './recipelistitem.component';

describe('RecipelistitemComponent', () => {
  let component: RecipelistitemComponent;
  let fixture: ComponentFixture<RecipelistitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipelistitemComponent]
    });
    fixture = TestBed.createComponent(RecipelistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
