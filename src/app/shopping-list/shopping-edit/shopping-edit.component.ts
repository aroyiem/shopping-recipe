import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  private destroyed$ = new Subject<void>();
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private service: ShoppingListService) {
  }

  ngOnInit(): void {
    this.service.startedEditing.pipe(takeUntil(this.destroyed$))
      .subscribe((index: number)=> {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.service.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.number
        })
      });
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;

    if(this.editMode) {
      this.service.updateIngredient(this.editedItemIndex, {name: value.name, number: value.amount});
    } else {
      this.service.addIngredient({name: value.name, number: value.amount});
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.service.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
