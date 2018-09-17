import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { DataService } from '../../app.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  allEventDefs;
  todayEvents;
  selectedEvent;
  selectedPeriod = 'today';
  selectedDate;
  eventValue =0;
  selectedMonth = 'currentMon';
  newEventName='';
  currentMonthExpenses=[];

  newEventSavingInProgress =  false; 

  constructor(public dataService:DataService, public snackBar: MatSnackBar) {
  	this.allEventDefs = dataService.getExpenseEvents();
    this.dataService.getCurrentExpenseMonth();
    this.refreshCurrentMonthExpensesData();
  }

  getTotalOfCurrentMonthExpenses() {
      let total:number = 0;
      this.currentMonthExpenses.forEach((obj) => {
          total += obj.eventValue;
      });
      return total;
  }

  inputChanged() {
    if(this.selectedEvent.id == '101') {
      this.newEventSavingInProgress = true;
    }
  }

  refreshCurrentMonthExpensesData() {
    this.eventValue =0;
    if(this.dataService.currentExpenseMonth){
        this.currentMonthExpenses = this.dataService.getAllExpensesForMonth(this.dataService.currentExpenseMonth.id);
    }
    this.currentMonthExpenses.forEach((expenseObj)=>{
        const expEvt = this.dataService.getExpenseEventById(expenseObj.eventid);
        expenseObj.name = expEvt?expEvt.name:'No Name';
    });
  }


  saveNewEvent() {
    this.dataService.createExpenseEvent(this.newEventName).then(
        (obj) => {
                this.selectedEvent.id = obj['id'];
                this.newEventName = '';
                this.newEventSavingInProgress = false;
                this.allEventDefs = this.dataService.getExpenseEvents();
                this.snackBar.open(obj['message'], 'Success', {duration: 4000});
                   },
        (error) => {  console.log(error);
                    this.newEventSavingInProgress = false;
                    this.snackBar.open(error, 'Error', {duration: 4000});
                 }
      );
  }



  markExpenseEvent() {
      this.dataService.markExpenseEvent(this.selectedEvent, this.selectedDate, this.eventValue).then(
        (message) => {
                console.log(message);
                this.snackBar.open('' + message, 'Success', {duration: 2000});
                this.refreshCurrentMonthExpensesData();
                   },
        (error) => {  console.log(error);
                    this.snackBar.open(error, 'Error', {duration: 2000});
                 }
      );
  }

  deleteExpenseEvent(expenseEvent) {
      const confirmDelelete = confirm('Sure you want to Delete this event ? '); 
      if(confirmDelelete) {
          this.dataService.deleteExpenseEvent(expenseEvent).then(
            (message) => {
                    this.snackBar.open('' + message, 'Success', {duration: 2000});
                    this.refreshCurrentMonthExpensesData();
                       },
            (error) => {  console.log(error);
                        this.snackBar.open(error, 'Error', {duration: 2000});
                     }
          ); 
      }
  }
}
