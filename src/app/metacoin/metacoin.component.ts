import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';

const Web3 = require('web3');
const contract = require('truffle-contract');
const metaincoinArtifacts = require('../../../build/contracts/MetaCoin.json');
const chainListArtifacts = require('../../../build/contracts/ChainList.json');
import { canBeNumber } from '../../util/validation';

declare var window: any;

@Component({
  selector: 'app-metacoin',
  templateUrl: './metacoin.component.html',
  styleUrls: ['./metacoin.component.css']
})
export class MetacoinComponent implements OnInit {
  @ViewChild('f') sendCoinForm: NgForm;

  MetaCoin = contract(metaincoinArtifacts);
  ChainList = contract(chainListArtifacts);

  account: any;
  accounts: any;
  web3: any;

  test : Date = new Date();
  amount: number;
  address: string;
  balance: number;

  constructor(private _ngZone: NgZone) { }

  ngOnInit() {
    this.checkAndInstantiateWeb3();
    this.onReady();
  }

  onSubmit() {
    this.amount = this.sendCoinForm.value.amount;
    this.address = this.sendCoinForm.value.address;
    console.log('The amount is ' + this.amount + ' and the address is ' + this.address);
    this.sendCoin();
    this.sendCoinForm.reset();
  }

  sendCoin() {
    const amount = this.amount;
    const receiver = this.address;
    let meta;

    this.MetaCoin
      .deployed()
      .then(instance => {
        meta = instance;
        return meta.sendCoin(receiver, amount, {
          from: this.account
        });
      })
      .then(() => {
        console.log('Transaction completed!');
        this.reloadArticles();
      })
      .catch(e => {
        console.log(e);
      });
  }

  checkAndInstantiateWeb3 ()  {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // console.warn(
      //   'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      // );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      // console.warn(
      //   'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      // );
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
      })
      .catch(e => {
        console.log(e);
      });
  }

  reloadArticles() {
    let chain;
    this.ChainList
      .deployed()
      .then(instance => {
        chain = instance;
        return chain.getArticle();
      })
      .then(value => {
        if (value === null) {
          return;
        }
        console.log('The location of the land is ' + value[1]);
        console.log('The reason to sell the land is' + value[2]);

      })
      .catch(e => {
        console.log('Error getting article: ' + e);
      });
  }

}
