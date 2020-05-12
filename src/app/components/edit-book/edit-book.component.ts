import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../models/book";
import {BookService} from "../../services/book.service";
import {ThemePalette} from "@angular/material/core";
import {UploadImagesService} from "../../services/upload-images.service";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId: number;
  editBook: Book = new Book();
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  constructor(private route: ActivatedRoute, private bookService: BookService,
              public uploadImageService: UploadImagesService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.bookId = params.id);
    this.bookService.getBook(this.bookId).subscribe(
      (res: Book) => this.editBook = res
    )
  }


  onSubmit() {
    this.bookService.updateBook(this.editBook).subscribe(
      (res: Book) => {
        this.uploadImageService.upload(this.bookId);
        this.editBook = new Book();
      },
      error => {
        console.log(error);
      }
    );
    this.router.navigate(['viewBook', this.bookId]);
  }

  cancel() {
    this.router.navigate(['viewBook', this.bookId]);
  }
}
