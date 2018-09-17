import { Component } from '@angular/core';
import 'hammerjs';

import { DataService } from './app.service';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  toolbarLabel = ' FT ';
  events: string[] = [];
  opened: boolean = true;

  constructor(public dataService : DataService, router:Router) {
    router.events.forEach((event) => {
	    if(event instanceof NavigationEnd) {
	    	const label = event.url.substring(1,event.url.length).replace(/^\w/, c => c.toUpperCase());
	    	if(label == ''){
	       	   this.toolbarLabel = ' FT ';
	    	}
            else {
               this.toolbarLabel = ' FT > ' + label;
            }
	    }
	  });
  }
}
