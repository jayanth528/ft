import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../../app.service';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent {
  allEventDefs;
  months = [31,28,31,30,31,30,31,31,30,31,30,31];
  days=['SUN','MON','TUE','WED','THU','FRI','SAT'];
  monthsLabel = ['JAN','FEB','MARCH','APRIL','MAY','JUNE','JULY','AUG','SEP','OCT','NOV','DEC'];

  selectedEventId;
  data = [];
  markedData;
  currentMonth;

  constructor(public dataService:DataService, public snackBar: MatSnackBar) {
    this.currentMonth = (new Date()).getMonth();
    this.allEventDefs = dataService.getEvents();
    this.computeDaysData();
  }


  computeDaysData() {
    this.data = [];
    const getFirstDayOfMonth = (new Date((this.currentMonth+1) + '//1//' + (new Date()).getFullYear())).getDay();

    for(let i=0 ; i<getFirstDayOfMonth ; i++){
        this.data.push('');
    }

    for(let i=0 ; i<this.months[this.currentMonth] ; i++){
        if(this.markedData){
          const isCurrentDayMarked =   this.markedData.find((day)=>{return day==(i+1);})
          if(isCurrentDayMarked){
             this.data.push({isActiveDay:true ,isMarkedDay:true, day:i+1});  
          }else{
             this.data.push({isActiveDay:true , day:i+1});
          }
        }else{
          this.data.push({isActiveDay:true , day:i+1});
        }  
    }
   
    return this.data;
  }


  onShowReportBtnClick() {
     this.dataService.getEventDataForMonth(this.selectedEventId, this.currentMonth).then(
        (data) => {
                this.data = [];
                this.markedData = data['data']['monthData'];
                this.computeDaysData();
                console.log(data['message']);
                //this.snackBar.open(data['message'], 'Success', {duration: 2000});
                   },
        (error) => {
                    this.snackBar.open(error, 'Error', {duration: 2000});
                    this.markedData = null;
                    this.computeDaysData();
                 }
      );
  }

  deleteDayEvent(dayItem) {
      console.log('dayItem '+dayItem);
      let conf = window.confirm(' Do you want to delete the event on the day : ' + dayItem.day );
      if(conf) {
        this.dataService.deleteEventForADay(this.selectedEventId, this.currentMonth+1, dayItem.day).then(
          (message) => {
                    console.log(message);
                    this.snackBar.open('' + message, 'Success', {duration: 2000});
                    this.onShowReportBtnClick();
                         },
            (error) =>   {  console.log(error);
                         this.snackBar.open(error, 'Error', {duration: 2000});
                       }
          );  
      }
  }

}
