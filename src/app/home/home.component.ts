import { Component, OnInit } from '@angular/core';
import { HoloService } from '../holo.service';
import { Pusher } from '../models/pusher';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loaded = false;

  stash = [];

  personalHash: string;
  hash: string;

  name: string;
  pusher: Pusher;

  pushers: Array<Pusher> = [];

  foundPusher: Pusher;

  constructor(private _holoService: HoloService) { }

  ngOnInit() {
    this._holoService.pusher$.subscribe(pusher => {
      this.pusher = pusher;
      this.loaded = true;
    });
    this._holoService.getPusherByAgent().subscribe();
    this._holoService.getpushers().subscribe(pushers => {
      console.log(pushers);
      this.pushers = pushers;
    });
    this._holoService.getStash().subscribe(hash => {
      this.stash = hash;
      console.log(this.stash);
    });
  }

  testTT(ss) {
    return `${Math.log(ss.charCodeAt(16) + ss.charCodeAt(22)) }% THC`;
  }

  load() {
    this._holoService.getPusher(this.personalHash).subscribe(res => {
      this.pusher = res;
      if (!this.pusher) { return; }

      this.pusher.hash = this.personalHash;
      this.personalHash = '';
    });
  }

  find() {
    console.log(this.hash);
    this._holoService.getPusher(this.hash).subscribe(res => {
      this.foundPusher = res;
      console.log(this.foundPusher);
    });
  }

  mine() {
    const seed = HoloService.seed();
    console.log('mine');
    console.log(seed);
    this._holoService.mine(seed).subscribe(hash => {
      this._holoService.getStash().subscribe(h => {
        this.stash = h;
      });
    });
  }

  sell(hash, price) {
    this._holoService.sellHash({
      hash: hash.Hash,
      price: price
    }).subscribe(marketEntry => {
      this._holoService.getStash().subscribe(s => this.stash = s );
    });
  }

}
