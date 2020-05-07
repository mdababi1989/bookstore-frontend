import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {ThemePalette} from '@angular/material/core';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  public newBook: Book = new Book();
  public bookAdded: boolean;

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.bookAdded = false;
    this.newBook.active = false;
    this.newBook.category = 'Management';
    this.newBook.language = 'english';
    this.newBook.format = 'paperback';

  }

  onSubmit() {
    this.bookService.addBook(this.newBook).subscribe(
      () => {
        this.bookAdded = true;
        this.newBook = new Book();
        this.newBook.active = false;
        this.newBook.category = 'Management';
        this.newBook.language = 'english';
        this.newBook.format = 'paperback';
      },
      error => {
        console.log(error);
      }
    );
  }
}
