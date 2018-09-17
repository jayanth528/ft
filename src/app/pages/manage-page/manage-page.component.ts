import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';


import { DataService } from '../../app.service';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.css']
})
export class ManagePageComponent implements OnInit{

  newMonthName = '';
  expenseMonthsData = [];
  selectedMonthAction = 'createMon';
  selectedMonth;
  

  constructor(public dataService: DataService, public snackBar: MatSnackBar) {
 	this.refreshMonths();
  }

  ngOnInit() {}

  refreshMonths() {
  	this.expenseMonthsData = this.dataService.getExpenseMonths();
  }

  setAsCurrentMonth(month) {
    this.dataService.saveCurrentExpenseMonth(month).then(
        (message) => {
		                console.log(message);
		                this.snackBar.open('' + message, 'Success', {duration: 2000});
                   },
        (error) => {  console.log(error);
                    this.snackBar.open(error, 'Error', {duration: 2000});
                 }
    );
  }

  checkIfCurMonthIsSelected(month) {
  	if(this.dataService.currentExpenseMonth && month.id == this.dataService.currentExpenseMonth.id){
  		return true;
  	}
  	return false;
  }

  createNewMonth() {
 	this.dataService.createExpenseMonth(this.newMonthName).then(
        (message) => {
		                console.log(message);
		                this.snackBar.open('' + message, 'Success', {duration: 3000});
		                this.refreshMonths();
		                this.newMonthName='';
                   },
        (error) => {  console.log(error);
                    this.snackBar.open(error, 'Error', {duration: 3000});
                 }
    );
  }

  deleteMonth() {
  	this.dataService.deleteExpenseMonth(this.selectedMonth).then(
        (message) => {
                console.log(message);
                this.snackBar.open('' + message, 'Success', {duration: 3000});
                this.refreshMonths();
                   },
        (error) => {  console.log(error);
                    this.snackBar.open(error, 'Error', {duration: 3000});
                 }
    );	
  }

}
