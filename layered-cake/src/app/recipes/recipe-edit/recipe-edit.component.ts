import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css','../../app.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (p: Params) => {
        this.id = +p['id'];
        this.editMode = p['id'] != null;
        console.log(this.editMode);
      }
    );
  }
  
}
