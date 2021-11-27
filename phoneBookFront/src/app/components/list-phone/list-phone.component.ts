import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PhoneBook } from 'src/app/interfaces/phoneBook.interface';
import { ComunicateBackEndService } from 'src/app/services/comunicate-back-end.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';



@Component({
  selector: 'app-list-phone',
  templateUrl: './list-phone.component.html',
  styleUrls: ['./list-phone.component.scss']
})
export class ListPhoneComponent implements OnInit {
  phooneBookList : PhoneBook[] = [];
  res : any;
  myForm !: FormGroup;
  page : number = 0;
  size : number = 5;
  totalElements !: number;

  @ViewChild(MatPaginator)
  paginator !: MatPaginator;

  constructor(
    private http : ComunicateBackEndService,
    private fb: FormBuilder,
    public dialog: MatDialog
    ) { }

    async ngAfterViewInit() {
      this.paginator.pageIndex = this.page;
      this.paginator.pageSize = this.size;
      this.res = await this.http.searchPhoneBook(this.paginator.pageIndex, this.paginator.pageSize );
      this.totalElements = this.res.totalElements;
      this.phooneBookList = this.res.content;
    }
  
    async onPaginationChange(event: any) {
      this.page = this.paginator.pageIndex;
      this.size = this.paginator.pageSize;
      if(this.myForm.value.type == ''){
        this.res = await this.http.searchPhoneBook(this.paginator.pageIndex, this.paginator.pageSize );
        this.totalElements = this.res.totalElements;
        this.phooneBookList = this.res.content;
      }else{
        this.phooneBookList.length = 0;
        this.res = await this.http.getPagePhoneBookEntryByType(this.page, this.size, this.myForm.value.type);
        this.totalElements = this.res.totalElements;
        this.phooneBookList = this.res.content;
      }
    }

  async ngOnInit() {
    this.myForm = this.fb.group({
      type : [''],
    });

    // this.http.searchPhoneBook(0, 5).subscribe( res =>{
    //   console.log('res : ', res );
    //   this.phooneBookList = res.content;
    // })
  }

  async onSubmit(myForm : FormGroup ){
    if(!myForm.valid){
      return;
    }
    this.page = 0;
    this.phooneBookList.length = 0;
    this.res = await this.http.getPagePhoneBookEntryByType(this.page, this.size, myForm.value.type);
    this.phooneBookList = this.res.content;
    this.totalElements = this.res.totalElements;
  }

  async deletePhoneBookEntry( id : string ){
    await this.http.deletePhoneBookEntrById(id);
    this.phooneBookList.length = 0;
    this.getAllResults();
  }

  async getAllResults(){
    this.res = await this.http.searchPhoneBook(this.page, this.size);
    this.phooneBookList = this.res.content;
  }

  openDialog(id : string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deletePhoneBookEntry(id);
      }
    });
  }

}
