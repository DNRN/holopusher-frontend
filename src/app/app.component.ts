import { Component, OnInit } from '@angular/core';
import { HoloService } from './holo.service';
import { Pusher } from './models/pusher';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  pusher: Pusher;
  name = '';

  title = 'Holo Pusher';

  constructor(private _holoService: HoloService) {}

  ngOnInit() {
    this._holoService.pusher$.subscribe(pusher => {
      this.pusher = pusher;
    });
    this._holoService.getPusherByAgent().subscribe();
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
}
