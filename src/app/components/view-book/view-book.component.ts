import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {UploadImagesService} from "../../services/upload-images.service";
import {faLongArrowAltLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
  book: Book = new Book();
  bookId: number;
  imgUrl: SafeStyle = '';
  //fa-long-arrow-left
  faLongArrowLeft = faLongArrowAltLeft;
  constructor(private router: Router, private route: ActivatedRoute, private bookService: BookService,
              private domSanitizer: DomSanitizer, private uploadImagesService: UploadImagesService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.bookId = params.id);
    this.imgUrl = 'http://localhost:8181/book/get/image?id=' + this.bookId;
    this.bookService.getBook(this.bookId).subscribe(
      (res: Book) => {
        this.book = res;
      },
      error => console.log(error)
    );
  }

  onSelect(book: Book) {
    console.log("clicked");
    this.router.navigate(['editBook', this.bookId]);
  }
}
