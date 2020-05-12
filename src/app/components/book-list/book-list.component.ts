import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookList: Book[] = [];
  private selectedBook: Book;
  private checked: boolean;
  public allChecked: boolean;
  private removeBookList: Book[] = new Array();

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getBookList().subscribe(
      (res: Book[]) => {
        this.bookList = res;
      },
      error => console.log(error)
    );
  }

  updateSelected(checked: boolean) {

  }

  updateRemoveBookList(checked: boolean, book: Book) {

  }

  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['/viewBook', this.selectedBook.id]);
  }

  openDialog(book: Book) {

  }

  removeSelectedBooks() {

  }
}
