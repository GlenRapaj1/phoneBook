
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PhoneBook } from '../interfaces/phoneBook.interface';


const url : string = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class ComunicateBackEndService {

  constructor( private http : HttpClient) { }

  async searchPhoneBook( page : number, size : number ) : Promise<any>  { // Observable<any> 
    const res : any = await this.http.get<any>( `${url}get-all-phone-entry/${page}/${size}` ).toPromise();
    return res;
  }

  async getPhoneBookEntrById( id : string ) : Promise<any>  { // Observable<any> 
    const res : any = await this.http.get<any>( `${url}get-phone-entry/${id}` ).toPromise();
    return res;
  }

  async deletePhoneBookEntrById( id : string ) : Promise<any>  { // Observable<any> 
    const res : any = await this.http.delete<any>( `${url}delete-phone-book-entry-id/${id}` ).toPromise();
  }

  async updatePhoneBookEntrById( id : string, phoneBookEntr : PhoneBook ) : Promise<any>  { // Observable<any> 
    const res : any = await this.http.put<any>( `${url}modify-phone-book-entry/${id}`, phoneBookEntr).toPromise();
    return res;
  }

  async postPhoneBookEntry( phoneBookEntr : PhoneBook ) : Promise<any>  { // Observable<any> 
    const res : any = await this.http.post<any>( `${url}add-phone-book-entry`, phoneBookEntr).toPromise();
    return res;
  }

  async getPagePhoneBookEntryByType( page : number, size : number, type : string ) : Promise<any>  { // Observable<any> 
    const res : any = await this.http.get<any>( `${url}get-all-phone-entry-by-type/${page}/${size}/${type}` ).toPromise();
    return res;
  }
  
//    deletePhoneBookEntrById( id : string ) : Observable<any> {  
//     return this.http.delete<any>( `${url}delete-phone-book-entry-id/${id}` )
//       .pipe( catchError(this.handleError) );
//   }
  
//   handleError(error : any) {
//         // console.log( 'error : ', error );
//   }
}
