import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(
      'https://ng-course-recipe-book-27fd4-default-rtdb.firebaseio.com/recipes.json',
      recipes
    ).subscribe(data => console.log(data));
  }

  fetchRecipes(): Observable<Recipe[]> {

    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-27fd4-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map((recipes: Recipe[]) =>
          recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: !!recipe.ingredients ? recipe.ingredients : []
            };
          })),
        tap((recipes: Recipe[]) =>
          this.recipeService.setRecipes(recipes))
      );
  }
}
