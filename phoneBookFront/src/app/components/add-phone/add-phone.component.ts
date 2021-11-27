import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { kontrolloEmail } from 'src/app/custom-vlidators/stringinput.validator';
import { PhoneBook } from 'src/app/interfaces/phoneBook.interface';
import { ComunicateBackEndService } from 'src/app/services/comunicate-back-end.service';

@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.component.html',
  styleUrls: ['./add-phone.component.scss']
})
export class AddPhoneComponent implements OnInit {
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
  }

  async onSubmit(myForm : FormGroup ){
    if(!myForm.valid){
      this.openSnackBar('E gjithe forma duhet plotesuar.');
      return;
    }
    const phoneBookEntr : PhoneBook = {...myForm.value, id : null};
    await this.http.postPhoneBookEntry(phoneBookEntr);
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
