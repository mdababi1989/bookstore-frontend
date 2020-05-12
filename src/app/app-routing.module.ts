import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AddBookComponent} from './components/add-book/add-book.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {ViewBookComponent} from './components/view-book/view-book.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'addBook', component: AddBookComponent},
  {path: 'bookList', component: BookListComponent},
  {path: 'viewBook/:id', component: ViewBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
