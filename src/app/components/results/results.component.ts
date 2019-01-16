import { Component, OnInit, Input } from '@angular/core';
import { IBestOffer } from 'src/app/models/IBestOffer';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input() bestoffers: IBestOffer[];
  constructor() {}

  ngOnInit() {}

  convertUnixStamp(timeStamp: string) {
    const date = new Date(Number(timeStamp)),
          year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate();
    return  `${day}/${month}`;
  }

  createDeepLink(UrlDeepLink) {
    return 'https://' + UrlDeepLink;
  }
}
