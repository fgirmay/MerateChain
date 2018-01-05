import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';

const Web3 = require('web3');
const contract = require('truffle-contract');
const metaincoinArtifacts = require('../../../build/contracts/MetaCoin.json');
const chainListArtifacts = require('../../../build/contracts/ChainList.json');
const landTitleArtifacts = require('../../../build/contracts/LandTitle.json');
import { canBeNumber } from '../../util/validation';

declare var window: any;

@Component({
  selector: 'app-land-ownership',
  templateUrl: './land-ownership.component.html',
  styleUrls: ['./land-ownership.component.css']
})
export class LandOwnershipComponent implements OnInit {
  @ViewChild('f') registerLandForm: NgForm;

  MetaCoin = contract(metaincoinArtifacts);
  ChainList = contract(chainListArtifacts);
  LandTitle = contract(landTitleArtifacts);

  account: any;
  accounts: any;
  web3: any;

  test : Date = new Date();
  name: string;
  description: string;
  price: number;

  constructor(private _ngZone: NgZone) { }

  ngOnInit() {
    this.checkAndInstantiateWeb3();
    this.onReady();
  }

  onSubmit() {
    this.name = this.registerLandForm.value.name;
    this.description = this.registerLandForm.value.description;
    this.price = this.registerLandForm.value.price;

    this.registerLandTitle();
    this.registerLandForm.reset();
  }

  registerLandTitle() {
    const name = this.name;
    const description = this.description;
    const price = this.price;
    let land;

    this.LandTitle
      .deployed()
      .then(instance => {
        land = instance;
        return land.registerLand(name, description, price , {
          from: this.account
        });
      })
      .then(() => {
        console.log('Transaction completed!');
      })
      .catch(e => {
        console.log(e);
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
    this.MetaCoin.setProvider(this.web3.currentProvider);
    this.ChainList.setProvider(this.web3.currentProvider);
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
      console.log('There are ' + accs.length + ' accounts in the application');
      this.accounts = accs;
      this.account = this.accounts[0];

      console.log('The account is ' + this.account);
    });
  }

}
