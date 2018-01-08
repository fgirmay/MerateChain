import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

import { Land } from '../land/land.model';
import { LandService } from '../land/land-service/land.service';

const Web3 = require('web3');
const contract = require('truffle-contract');
const landTitleArtifacts = require('../../../build/contracts/LandTitle.json');
import { canBeNumber } from '../../util/validation';

declare var window: any;

@Component({
  selector: 'app-land-list',
  templateUrl: './land-list.component.html',
  styleUrls: ['./land-list.component.css']
})
export class LandListComponent implements OnInit {
  LandTitle = contract(landTitleArtifacts);
  web3: any;
  loading = false;
  numberOfRegistered: number;
  counter: number;

  landList: Land[] = [];
  subscription: Subscription;

  constructor(private landService: LandService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.checkAndInstantiateWeb3();
    this.onReady();
    this.getNumberOfLandRegistered();
  }

  onRegisterLand(){

  }

  // reloadLandLists() {
  //   let land;
  //   this.LandTitle
  //     .deployed()
  //     .then(instance => {
  //       land = instance;
  //       return land.getLand();
  //     })
  //     .then(value => {
  //       if (value === null) {
  //         return;
  //       }
  //       const name = value[1];
  //       const city = value[2];
  //       console.log('Loading land from Ethereum Blockchain and name is ' + name + ' and city is ' + city);
  //       this.landList.push(new Land(name, city));
  //     })
  //     .catch(e => {
  //       console.log('Error getting article: ' + e);
  //     });
  // }

  getNumberOfLandRegistered() {
    let landInstance;
    this.LandTitle
      .deployed()
      .then(instance => {
        landInstance = instance;
        return landInstance.getRegisteredLandList();
      })
      .then(landIds => {
        if (landIds === null) {
          return;
        }
        this.numberOfRegistered = landIds.length;
        this.reloadAllRegisteredLand(this.numberOfRegistered);
        //console.log('Is this being called!!! value of numberOfLandRegistered is ' + this.numberOfRegistered);
        // this.loading = false;
      })
      .catch(e => {
        console.log('Error getting number of registered land info: ' + e);
        // this.loading = false;
      });
  }

  reloadLandElement(landId: number) {
    console.log('The value of the parameter landId is ' + landId);
    let landInstance;
    this.LandTitle
      .deployed()
      .then(instance => {
        landInstance = instance;
        return landInstance.landList(landId);
      }).then(land => {
        if (land === null) {
          return;
        }
        this.landList.push(new Land(land[2], land[3], land[4], land[5], land[6]));
      })
      .catch(e => {
        console.log('Error getting land info: ' + e);
        // this.loading = false;
      });
  }

  reloadAllRegisteredLand(counter: number) {
    for (var i = 0; i < counter; i++) {
      this.reloadLandElement(i);
    }
  }

  onReady(){
    this.LandTitle.setProvider(this.web3.currentProvider);
  }

  checkAndInstantiateWeb3 ()  {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }
  }

}
