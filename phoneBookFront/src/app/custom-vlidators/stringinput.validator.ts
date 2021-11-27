import { AbstractControl } from "@angular/forms";

export function kontrolloEmail(control: AbstractControl): { [key: string]: any } | null {
    // keyeshte i tipit string vlera eshte any { key : value }
    let forbidden = false;
    if (control.value == null ||  control.value == '' ) {
        forbidden = true;
    }
    return forbidden ? { invalidemail: { value: control.value } } : null;
}

//   export  function kontrolloEmail( str : string) : ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//       let forbidden = false;
//       if( !control.value.includes('@') ){
//         forbidden = true ;
//       }
//       return forbidden ? {invalidemail: {value: control.value}} : null;
//     }
//   }