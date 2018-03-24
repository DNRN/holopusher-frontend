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

  personalHash: string;
  hash: string;

  name: string;
  pusher: Pusher;

  pushers: Array<Pusher> = [];

  foundPusher: Pusher;

  constructor(private _holoService: HoloService) { }

  ngOnInit() {
    this._holoService.getPusherByAgent().subscribe(pusher => {
      this.pusher = pusher;
      this.loaded = true;
      console.log(this.pusher);
    });
    this._holoService.getpushers().subscribe(pushers => {
      console.log(pushers);
      this.pushers = pushers;
    });
  }

  createPusher() {
    this.pusher = {
      name: this.name,
      timestamp: 1234
    };
    this.name = '';
    this._holoService.createPusher(this.pusher).subscribe(res => {
      this.pusher.hash = res;
    }, err => console.log(err));
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

}
