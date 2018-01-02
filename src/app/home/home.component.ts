import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LandService } from '../land/land-service/land.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    balance: number;
    subscription: Subscription;

    constructor(private landService: LandService) { }

    ngOnInit() {
      this.landService.initialize();
      this.getBalance();
    }

    getBalance(){

      this.subscription = this.landService.balanceChanged.subscribe(
        (balance: number) => {
          this.balance = balance;
        }
      );
     }
}
