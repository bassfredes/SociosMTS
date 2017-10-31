import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BookEditPage} from './book-edit-page';

@NgModule({
  declarations: [
    BookEditPage,
  ],
  imports: [
    IonicPageModule.forChild(BookEditPage),
  ],
  exports: [
    BookEditPage
  ]
})
export class BookEditPageModule {}
