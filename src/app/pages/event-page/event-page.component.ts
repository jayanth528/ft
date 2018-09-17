import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { DataService } from '../../app.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  allEventDefs;
  todayEvents;
  selectedEvent;
  selectedPeriod = 'today';
  selectedDate;

  constructor(public dataService:DataService, public snackBar: MatSnackBar) {
  	this.allEventDefs = dataService.getEvents();
  	this.todayEvents = dataService.getTodayEvents();

  }

  ngOnInit() {
  }

  dateChanged(event) {
     console.log(event);
  }

  addEvtBtnClicked() {
      this.dataService.markEvent(this.selectedEvent, this.selectedDate).then(
        (message) => {
                console.log(message);
                this.snackBar.open('' + message, 'Success', {duration: 2000});
                //this.selectedEvent = null;
                   },
        (error) => {  console.log(error);
                    this.snackBar.open(error, 'Error', {duration: 2000});
                    //this.selectedEvent = null;
                 }
      );
  }

}
