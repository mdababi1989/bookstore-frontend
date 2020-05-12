import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import {Router} from "@angular/router";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

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
  faTimes = faTimes;

  constructor(private bookService: BookService, private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getBookList();
  }

  getBookList() {
    this.bookService.getBookList().subscribe(
      (res: Book[]) => {
        this.bookList = res;
      },
      error => console.log(error)
    );
  }

  updateRemoveBookList(checked: boolean, book: Book) {
    if (checked) this.removeBookList.push(book);
    else this.removeBookList.splice(this.removeBookList.indexOf(book), 1);
  }

  updateSelected(checked: boolean) {
    if (checked) {
      this.allChecked = true;
      this.removeBookList = this.bookList.slice();
    } else {
      this.allChecked = false;
      this.removeBookList = [];
    }
  }

  removeSelectedBooks() {
    let dialogRef = this.dialog.open(DialogResultExampleDialog);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == 'yes') {
          for (let book of this.removeBookList) {
            this.bookService.removeBook(book.id).subscribe(
              (res: any) => {
                console.log(res);
                this.getBookList();
              },
              error => console.log(error)
            );
          }
        }
      }
    );
  }

  openDialog(book: Book) {
    let dialogRef = this.dialog.open(DialogResultExampleDialog);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == 'yes') {
          console.log(result);
          this.bookService.removeBook(book.id).subscribe(
            (res: any) => {
              console.log(res);
              this.getBookList();
            },
            error => console.log(error)
          );
        }
      }
    );
  }

  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['/viewBook', this.selectedBook.id]);
  }


}


@Component({
  selector: 'app-dialog-result-example-dialog',
  templateUrl: './dialog-result-example-dialog.html'
})
export class DialogResultExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogResultExampleDialog>) {
  }
}
