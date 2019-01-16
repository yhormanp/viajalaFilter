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
    const date = new Date(Number(timeStamp));
    // Year
    const year = date.getFullYear();
    // Month
    const month = date.getMonth() + 1;
    // Day
    const day = date.getDate();
    // Display date time in dd-MM-yyyy format
    const convdataTime = day + '/' + month;
    return convdataTime;
  }

  createDeepLink(UrlDeepLink) {
    return 'https://' + UrlDeepLink;
  }
}
