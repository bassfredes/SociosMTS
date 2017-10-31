import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BookAddPage} from './book-add-page';

@NgModule({
  declarations: [
    BookAddPage,
  ],
  imports: [
    IonicPageModule.forChild(BookAddPage),
  ],
  exports: [
    BookAddPage
  ]
})
export class BookAddPageModule {}
