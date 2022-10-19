import { Component, OnInit } from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import {Ingredient} from '../shared/ingredient.model';
import {LoggingService} from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];

  constructor(private service: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.loggingService.printLog('Hello from shopping list');
    this.ingredients = this.service.getIngredients();
    this.service.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) =>
          this.ingredients = ingredients
      );
  }

  onIngredientsAdded() {
    this.ingredients = this.service.getIngredients();
  }

  onEditItem(index: number) {
    this.service.startedEditing.next(index);
  }

}
