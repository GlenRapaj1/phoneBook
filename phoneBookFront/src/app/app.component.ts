import { Component } from '@angular/core';
import { Section } from './interfaces/section.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'phoneBookFront';
  showFiller = false;
  folders: Section[] = [
    {
      name: 'phone-book',
      icon: 'add',
      path: '/add-phone-book'
    },
    {
      name: 'Home',
      icon: 'home',
      path: '/'
    },
    {
      name: 'Show All',
      icon: 'content_copy',
      path: '/list'
    }
  ];

}
