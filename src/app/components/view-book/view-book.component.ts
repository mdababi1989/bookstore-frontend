import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {UploadImagesService} from "../../services/upload-images.service";

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
  book: Book = new Book();
  bookId: number;
  imgUrl: SafeStyle = '';
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  constructor(private router: Router, private route: ActivatedRoute, private bookService: BookService,
              private domSanitizer: DomSanitizer, private uploadImagesService: UploadImagesService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.bookId = params.id);
    this.bookService.getBook(this.bookId).subscribe(
      (res: Book) => {
        this.book = res;
      },
      error => console.log(error)
    );

    this.uploadImagesService.getImage(this.bookId).subscribe(
      (res) => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );
  }

  onSelect(book: Book) {

  }
}
