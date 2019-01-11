import { Component, OnInit, Input } from '@angular/core';
import { IBestOffer } from 'src/app/models/IBestOffer';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input()
  bestoffers: IBestOffer[];
  constructor() {
   }

  ngOnInit() {
  }

  convertUnixStamp(timeStamp:string){
    var date = new Date( Number(timeStamp));
      
    // Year
    var year = date.getFullYear();

    // Month
    var month = date.getMonth() + 1;

    // Day
    var day = date.getDate();

    // Display date time in dd-MM-yyyy format
    var convdataTime = day+'/'+month;
    return convdataTime;
  }



  createDeepLink(UrlDeepLink){
    return "https://" + UrlDeepLink;
  }
}
