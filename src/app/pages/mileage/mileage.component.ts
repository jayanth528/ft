import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { DataService } from '../../app.service';

@Component({
  selector: 'app-mileage',
  templateUrl: './mileage.component.html',
  styleUrls: ['./mileage.component.css']
})
export class MileageComponent implements OnInit {
  
  fuelValue = 0 ;
  selectedPeriod = 'today';
  selectedDate;
  allFuelEvents = [];

  isMileageView = false;
  selectedFuelEvent;
  mileageValue =  0;

  constructor(public dataService:DataService, public snackBar: MatSnackBar) {}

  ngOnInit() {
	 this.refreshFuelHistory();	  	 
  }

  refreshFuelHistory() {
	 this.allFuelEvents = this.dataService.getAllFuelEvents();
	 this.allFuelEvents.forEach((feObj)=>{
        feObj.selected = false;
     });
     this.selectedFuelEvent = null;
	 this.fuelValue = 0;
	 this.selectedDate = null;
	 this.selectedPeriod = 'today';
	 if(this.allFuelEvents.length==0) {
	 	this.isMileageView = false;
	 }
  }

  setMileage() {
       this.dataService.setMileage(this.selectedFuelEvent, this.mileageValue ).then(
	        (obj) => {
	        	    this.allFuelEvents = this.dataService.getAllFuelEvents();
	        	    this.snackBar.open(''+obj, 'Success', {duration: 4000});
	                   },
	        (error) => {  console.log(error);
	                    this.snackBar.open(error, 'Error', {duration: 4000});
	                 }
	    );
  }

  deleteSelectedFuelEvent() {
  	 const confirmDelelete = confirm('Sure you want to Delete this event ? '); 
     if(confirmDelelete) {
     	 this.dataService.deleteSelectedFuelEvent(this.selectedFuelEvent).then(
	        (obj) => {
	        	    this.isMileageView = false; 
	        	    this.refreshFuelHistory();	  	 
	                this.snackBar.open(''+obj, 'Success', {duration: 4000});
	                   },
	        (error) => {  console.log(error);
	                    this.snackBar.open(error, 'Error', {duration: 4000});
	                 }
	      );
     }
  }

  openMileageView(fuelEvent) {
  	 this.isMileageView = true;
  	 this.selectedFuelEvent = fuelEvent
  }

  isCurrentFESelected(fe) {
  	 return fe.id == (this.selectedFuelEvent ? this.selectedFuelEvent.id : 0);
  }

  saveNewFuelEvent() {
  	  this.dataService.saveNewFuelEvent(this.fuelValue, this.selectedDate?this.selectedDate:(new Date())).then(
        (obj) => {
        	    this.refreshFuelHistory();	  	 
                this.snackBar.open(''+obj, 'Success', {duration: 4000});
                   },
        (error) => {  console.log(error);
                    this.snackBar.open(error, 'Error', {duration: 4000});
                 }
      );
  }

}
