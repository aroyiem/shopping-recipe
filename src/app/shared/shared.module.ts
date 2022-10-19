import {NgModule} from '@angular/core';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {AlertComponent} from './alert/alert.component';
import {PlaceholderDirective} from './placeholder/placeholder.directive';
import {DropdownDirective} from './dropdown.directive';
import {ShortenPipe} from './shorten.pipe';
import {FilterPipe} from './filter.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    ShortenPipe,
    FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    ShortenPipe,
    FilterPipe,
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {

}
