import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../../app.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() toolbarLabel: string;

  constructor(public dataService:DataService) { }

  ngOnInit() {
  }

}
