import { Component, OnInit } from '@angular/core';
import { HoloService } from '../holo.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  sellingEntries = [];

  constructor(private _holoService: HoloService) { }

  ngOnInit() {
    this._holoService.getMarket().subscribe(entries => {
      this.sellingEntries = entries;
    });
  }

}
