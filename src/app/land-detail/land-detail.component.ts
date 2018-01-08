import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Land } from '../land/land.model';

const Web3 = require('web3');
const contract = require('truffle-contract');
const landTitleArtifacts = require('../../../build/contracts/LandTitle.json');
import { canBeNumber } from '../../util/validation';

declare var window: any;

@Component({
  selector: 'app-land-detail',
  templateUrl: './land-detail.component.html',
  styleUrls: ['./land-detail.component.css']
})
export class LandDetailComponent implements OnInit {
  LandTitle = contract(landTitleArtifacts);
  web3: any;

  land: Land;
  id: number;
  landList: Land[];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.landList =  [];

    this.checkAndInstantiateWeb3();
    this.onReady();

    console.log('This is running!!!')
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log(params['id']);
          this.id = params['id'];
          console.log('The id is ' + this.id);
          this.reloadLandElement();
        }
      );
  }

  reloadLandElement() {
    console.log('The value of the parameter landId is ' + this.id);
    let landInstance;
    this.LandTitle
      .deployed()
      .then(instance => {
        landInstance = instance;
        return landInstance.landList(this.id);
      }).then(land => {
        if (land === null) {
          return;
        }
        this.land = new Land(land[2], land[3], land[4], land[5], land[6]);
      })
      .catch(e => {
        console.log('Error getting land info: ' + e);
        // this.loading = false;
      });
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


  onReady(){
    // Bootstrap the MetaCoin abstraction for Use.
    this.LandTitle.setProvider(this.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }
      if (accs.length === 0) {
        alert(
          'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
        );
        return;
      }
    });
  }

}
