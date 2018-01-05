import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Land } from '../land/land.model';

@Component({
  selector: 'app-land-detail',
  templateUrl: './land-detail.component.html',
  styleUrls: ['./land-detail.component.css']
})
export class LandDetailComponent implements OnInit {

  land: Land;
  id: number;
  landList: Land[];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.landList =  [];
    console.log('This is running!!!')
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log(params['id']);
          this.id = params['id'];
          console.log('The id is ' + this.id);
          this.land = this.landList[this.id];
        }
      );
  }

}
