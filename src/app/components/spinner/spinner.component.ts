import { Component, OnInit } from '@angular/core';

import { DataService } from '../../app.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(public dataService:DataService) { }

  ngOnInit() {
  }

}
