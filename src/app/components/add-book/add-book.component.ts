import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {ThemePalette} from '@angular/material/core';
import {BookService} from '../../services/book.service';
import {UploadImagesService} from "../../services/upload-images.service";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  public newBook: Book = new Book();

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  constructor(public bookService: BookService, public uploadImageService: UploadImagesService) {
  }


  ngOnInit(): void {
    this.bookService.bookAdded = false;
    this.newBook.active = false;
    this.newBook.category = 'Management';
    this.newBook.language = 'english';
    this.newBook.format = 'paperback';
    this.newBook.title = 'new book test';
    this.newBook.author = 'mohamed';
    this.newBook.publisher = 'publisher';
    this.newBook.numberOfPages = 150;
    this.newBook.isbn='isbn';
    this.newBook.shippingWeight = 10;
    this.newBook.listPrice=15;
    this.newBook.ourPrice=18;
    this.newBook.active= true;
    this.newBook.description= 'test';
    this.newBook.inStockNumber=15;
  }

  onSubmit() {
    this.bookService.addBook(this.newBook).subscribe(
      (res: Book) => {
        this.uploadImageService.upload(res.id);
        this.bookService.bookAdded= true;
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
