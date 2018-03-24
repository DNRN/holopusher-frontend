import { Component, OnInit } from '@angular/core';
import { HoloService } from '../holo.service';
import { Pusher } from '../models/pusher';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hash: string;

  name: string;
  pusher: Pusher;


  foundPusher: Pusher;

  constructor(private _holoService: HoloService) { }

  ngOnInit() {

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

  find() {
    console.log(this.hash);
    this._holoService.getPusher(this.hash).subscribe(res => {
      this.foundPusher = res;
      console.log(this.foundPusher);
    });
  }

}
