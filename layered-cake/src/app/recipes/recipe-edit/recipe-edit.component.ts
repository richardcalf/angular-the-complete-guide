import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css','../../app.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  htmlForm: FormGroup;
  
  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (p: Params) => {
        this.id = +p['id'];
        this.editMode = p['id'] != null;
        this.formInit();
      }
    );
  }

  onSubmit() {
    // const recipe = new Recipe(
    //   this.htmlForm.value['name'],
    //   this.htmlForm.value['description'],
    //   this.htmlForm.value['imagePath'],
    //   this.htmlForm.value['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.htmlForm.value)
    } else {
      this.recipeService.addRecipe(this.htmlForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.htmlForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[
          Validators.required, 
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  private formInit() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required, 
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }      
    }

    this.htmlForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  getIngredientControls() {
    return (<FormArray>this.htmlForm.get('ingredients')).controls;
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.htmlForm.get('ingredients')).removeAt(index);
  }  
}
