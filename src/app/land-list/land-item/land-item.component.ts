import { Component, OnInit, Input } from '@angular/core';

import { Land } from '../../land/land.model';

@Component({
  selector: 'app-land-item',
  templateUrl: './land-item.component.html',
  styleUrls: ['./land-item.component.css']
})
export class LandItemComponent implements OnInit {

  @Input() land: Land;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
