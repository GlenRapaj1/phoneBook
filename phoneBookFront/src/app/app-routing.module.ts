import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPhoneComponent } from './components/add-phone/add-phone.component';
import { HomeComponent } from './components/home/home.component';
import { ListPhoneComponent } from './components/list-phone/list-phone.component';
import { UpdatePhoneBookEntryComponent } from './components/update-phone-book-entry/update-phone-book-entry.component';

const routes: Routes = [
  {path:"",  pathMatch:"full", component: HomeComponent }, // redirectTo:"/home",
  {path:"add-phone-book", component: AddPhoneComponent },
  {path:"list", component: ListPhoneComponent },
  {path:"update/:id", component: UpdatePhoneBookEntryComponent },
  // {path:"**", component:   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
