import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { DataService } from '../../app.service';
import { IconSelectorComponent } from '../../components/icon-selector/icon-selector.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
	selector: 'app-define-events-page',
	templateUrl: './define-events-page.component.html',
	styleUrls: ['./define-events-page.component.css']
})
export class DefineEventsPageComponent implements OnInit {
	allEventDefs;
	
	name: string;
  	duplicateEventName: boolean = false;
  	selectedEvent;

  	

	eventTypes = [{name:'Daily',value:'Daily'}, {name:'Monthly',value:'Monthly'}] ;
	eventName = '' ;

	constructor(public snackBar: MatSnackBar, public dialog: MatDialog, public dataService:DataService) {
 		this.allEventDefs = dataService.getEvents();
	}

	ngOnInit() {
	}

	deleteEvent(event) {
		let conf = window.confirm(' Sure you want to delete event : ' + event.name );
	    if(conf) {
	    	this.dataService.deleteEvent(event).then(
		    	(message) => {
		        				console.log(message);
		        				this.snackBar.open('' + message, 'Success', {duration: 2000});
		        				this.allEventDefs = this.dataService.getEvents();
		        				this.selectedEvent = null;
		                     },
		        (error) =>   {  console.log(error);
		        		   	    this.snackBar.open(error, 'Error', {duration: 2000});
		        		   	    this.allEventDefs = this.dataService.getEvents();
		        		   	    this.selectedEvent = null;
		        	         }
        	);	
	    }
		//
	}

	openDialog(): void {
	    
	}

	inputChanged():void {
		if(this.duplicateEventName == true){
			this.duplicateEventName = false;
		}
	}

	onCreateEventBtnClick() {
		this.dataService.createEvent(this.eventName).then(
	        (message) => {
	        				console.log(message);
	        				this.snackBar.open('' + message, 'Success', {duration: 2000});
	        				this.allEventDefs = this.dataService.getEvents();
	        				this.eventName = '' ;
	                   },
	        (error) => {  console.log(error);
	        			  this.duplicateEventName = true;
	        	          this.snackBar.open(error, 'Error', {duration: 2000});
	        	          this.allEventDefs = this.dataService.getEvents();
	        	          this.eventName = '' ;
	        	       }
        );
	}
}







@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h1 mat-dialog-title>Hi {{data.name}}</h1>
<div mat-dialog-content>
  <p>What's your favorite animal?</p>
  <mat-form-field>
    <input matInput [(ngModel)]="data.animal">
  </mat-form-field>
</div>
<div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No Thanks</button>
  <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
</div>`,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

