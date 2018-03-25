import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Pusher } from './models/pusher';

import 'rxjs/add/operator/map';


@Injectable()
export class HoloService {

  private _pusher: Pusher;
  private _pusher$: BehaviorSubject<Pusher> = new BehaviorSubject<Pusher>(this._pusher);

  get pusher$() {
    return this._pusher$.asObservable();
  }

  set pusher(pusher: Pusher) {
    this._pusher = pusher;
    this._pusher$.next(this._pusher);
  }

  constructor(private _http: Http) { }


  createPusher(pusher: Pusher) {
    return this._http.post('/fn/pusherZome/pusherEntryCreate', pusher).map(res => res.json());
  }

  getPusher(hash: string) {
    return this._http.post('/fn/pusherZome/pusherGetEntry', JSON.stringify(hash)).map(res => res.json());
  }

  getPusherByAgent() {
    return this._http.post('/fn/pusherZome/pusherGetFromAgent', JSON.stringify({})).map(res => {
      const pusher = res.json();
      if (!pusher) { return; }
      this.pusher = pusher[0];
      // return pusher[0];
    });
  }

  getpushers() {
    return this._http.post('/fn/pusherZome/pushersGetAll', JSON.stringify({})).map((res => res.json()));
  }

  mine(seed) {
    return this._http.post('/fn/hashZome/mine', JSON.stringify(seed)).map(res => res.json());
  }

  getHash() {
    return this._http.post('/fn/hashZome/getAll', JSON.stringify({})).map(res => res.json());
  }

  getStash() {
    return this._http.post('/fn/hashZome/getStash', JSON.stringify({})).map(res => res.json());
  }

  sellHash(sellOrder) {
    return this._http.post('/fn/sellingZome/sell', sellOrder).map(res => res.json());
  }

  getMarket() {
    return this._http.post('/fn/sellingZome/getMarket', JSON.stringify({})).map(res => res.json());
  }

  // tslint:disable-next-line:member-ordering
  public static seed() {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

}
