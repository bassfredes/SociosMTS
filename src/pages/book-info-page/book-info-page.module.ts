import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookInfoPage } from './book-info-page';

@NgModule({
  declarations: [
    BookInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BookInfoPage),
  ],
  exports: [
    BookInfoPage
  ]
})
export class BookInfoPageModule {}
