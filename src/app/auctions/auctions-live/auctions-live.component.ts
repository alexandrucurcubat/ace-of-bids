import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ace-auctions-live',
  templateUrl: './auctions-live.component.html',
  styleUrls: ['./auctions-live.component.scss'],
})
export class AuctionsLiveComponent implements OnInit {
  orderByOptions = [
    { value: 'newest', option: 'Cele mai noi' },
    { value: 'oldest', option: 'Cele mai vechi' },
  ];
  selectedOrderByOption = 'newest';
  gridView = true;
  gridCols!: number;

  auctions = [
    {
      title: 'Licitația 1',
      description: 'Descriere 1',
      imageUrl: 'favicon.ico',
      noReserve: false,
      currency: 'EUR',
      lastBid: 1.0,
      timeBeforeClose: '5h 42m 33s',
      closesSoon: false,
    },
    {
      title: 'Licitația 2',
      description: 'Descriere 2',
      imageUrl: 'favicon.ico',
      noReserve: true,
      currency: 'USD',
      lastBid: 0.0,
      timeBeforeClose: '1z',
      closesSoon: false,
    },
    {
      title: 'Licitația 3',
      description: 'Descriere 3',
      imageUrl: 'favicon.ico',
      noReserve: true,
      currency: 'EUR',
      lastBid: 3.0,
      timeBeforeClose: '1h 42m 33s',
      closesSoon: true,
    },
    {
      title: 'Licitația 4',
      description: 'Descriere 4',
      imageUrl: 'favicon.ico',
      noReserve: false,
      currency: 'EUR',
      lastBid: 4.0,
      timeBeforeClose: '42m 33s',
      closesSoon: true,
    },
    {
      title: 'Licitația 5',
      description: 'Descriere 5',
      imageUrl: 'favicon.ico',
      noReserve: true,
      currency: 'RON',
      lastBid: 5.0,
      timeBeforeClose: '3z',
      closesSoon: false,
    },
  ];

  constructor() { }

  ngOnInit(): void {
    if (window.innerWidth < 460) {
      this.gridCols = 1;
    } else if (window.innerWidth >= 460 && window.innerWidth < 700) {
      this.gridCols = 2;
    } else if (window.innerWidth >= 700 && window.innerWidth < 1200) {
      this.gridCols = 3;
    } else {
      this.gridCols = 4;
    }
  }

  onResize(event: any): void {
    if (event.target.innerWidth < 460) {
      this.gridCols = 1;
    } else if (event.target.innerWidth >= 460 && event.target.innerWidth < 700) {
      this.gridCols = 2;
    } else if (event.target.innerWidth >= 700 && event.target.innerWidth < 1200) {
      this.gridCols = 3;
    } else {
      this.gridCols = 4;
    }
  }
}
