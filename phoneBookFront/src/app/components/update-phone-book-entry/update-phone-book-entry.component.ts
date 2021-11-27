import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { kontrolloEmail } from 'src/app/custom-vlidators/stringinput.validator';
import { PhoneBook } from 'src/app/interfaces/phoneBook.interface';
import { ComunicateBackEndService } from 'src/app/services/comunicate-back-end.service';

@Component({
  selector: 'app-update-phone-book-entry',
  templateUrl: './update-phone-book-entry.component.html',
  styleUrls: ['./update-phone-book-entry.component.scss']
})
export class UpdatePhoneBookEntryComponent implements OnInit {
  id !: string;
  phoneBookEntr !: PhoneBook;
  myForm !: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private http : ComunicateBackEndService, 
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  async ngOnInit() {
      this.myForm = this.fb.group({
        first: new FormControl('', [Validators.required, kontrolloEmail]),
        last: new FormControl('', [Validators.required, kontrolloEmail]),
        number: new FormControl('', [Validators.required]),
        type : ['', Validators.required ],
      });

    this.id = this.route.snapshot.paramMap.get('id') as string;
    console.log( 'id: ', this.id );
    this.phoneBookEntr = await this.http.getPhoneBookEntrById(this.id);
    console.log( 'phoneBookEntr: ', this.phoneBookEntr );
    this.myForm.setValue({
      first : this.phoneBookEntr.first,
      last : this.phoneBookEntr.last,
      number: this.phoneBookEntr.number,
      type: this.phoneBookEntr.type
    });

  }

  async onSubmit(myForm : FormGroup ){
    console.log( myForm );
    console.log( myForm.valid );
    if(!myForm.valid){
      this.openSnackBar('E gjithe forma duhet plotesuar.');
      return;
    }
    console.log( 'first: ', myForm.value.first );
    console.log( 'last: ', myForm.value.last );
    console.log( 'number: ', myForm.value.number );
    console.log( 'type: ', myForm.value.type );
    const phoneBookEntr : PhoneBook = {...myForm.value, id : this.id };
    await this.http.updatePhoneBookEntrById(this.id, phoneBookEntr)
    this.router.navigate(['/list']);

  }

  openSnackBar(message : string) {
    this._snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

}
