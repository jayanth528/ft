import { Component, OnInit } from '@angular/core';


import { DataService } from '../../app.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public dataService:DataService) { }

  ngOnInit() {
  }

  getPages() {
     return this.dataService.selectedCat==1 ? this.dataService.eventsNavData : this.dataService.expensesNavData ;
  }

}
