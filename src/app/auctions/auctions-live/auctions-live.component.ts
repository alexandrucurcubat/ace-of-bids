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

  ngOnInit(): void { }
}
