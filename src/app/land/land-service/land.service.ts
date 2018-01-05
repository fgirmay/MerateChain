import { Injectable, Component, HostListener, NgZone } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';
const Web3 = require('web3');
const contract = require('truffle-contract');
const metaincoinArtifacts = require('../../../../build/contracts/MetaCoin.json');
import { canBeNumber } from '../../../util/validation';
import { Land } from '../land.model';

declare var window: any;

@Injectable()
export class LandService {
  landTitleChanged = new Subject<Land[]>();
  landList: Land[] ;
  MetaCoin = contract(metaincoinArtifacts);
  balanceChanged = new Subject<number>();

  account: any;
  accounts: any;
  web3: any;

  balance: number;
  sendingAmount: number;
  recipientAddress: string;
  status: string;
  canBeNumber = canBeNumber;

  constructor(private _ngZone: NgZone) {

  }

  checkAndInstantiateWeb3() {
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


  refreshBalance() {
    let meta;
    this.MetaCoin
      .deployed()
      .then(instance => {
        meta = instance;
        return meta.getBalance.call(this.account, {
          from: this.account
        });
      })
      .then(value => {
        this.balance = value;
        this.balanceChanged.next(this.balance);
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error getting balance; see log.');
      });
  }

  setStatus(message: string) {
    this.status = message;
  }

  sendCoin() {
    const amount = this.sendingAmount;
    const receiver = this.recipientAddress;
    let meta;

    this.setStatus('Initiating transaction... (please wait)');

    this.MetaCoin
      .deployed()
      .then(instance => {
        meta = instance;
        return meta.sendCoin(receiver, amount, {
          from: this.account
        });
      })
      .then(() => {
        this.setStatus('Transaction complete!');
        this.refreshBalance();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
  }

  initialize() {
    // Bootstrap the MetaCoin abstraction for Use.
    this.checkAndInstantiateWeb3();
    this.MetaCoin.setProvider(this.web3.currentProvider);

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

      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      this._ngZone.run(() =>
        this.refreshBalance()
      );
    });

    console.log('The value of the balance is ' + this.balance);
  }

  getLandTitles() {
    this.landList =  [];
    return this.landList;
  }

}
