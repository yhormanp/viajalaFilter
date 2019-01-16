import { Component, OnInit } from '@angular/core';
import { configurations } from '../../configs/config';
import { BestOfferService } from '..//../services/best-offer.service';
import { BasicTrackerError } from 'src/app/models/basicTrackError';
import { IBestOffer } from 'src/app/models/IBestOffer';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  errorMessage: string;
  hideOrigin = true;
  hideDestination = true;
  hideDates = true;
  hideLoading = true;

  originContent = configurations.defaultOrigins;
  destinationContent = configurations.defaultDestination;
  monthContent = configurations.availableMonths;

  selectedOrigins = new Map();
  selectedDestinations = new Map();
  selectedMonth: string;
  timeTrigger: any;

  bestOffersReturned: IBestOffer[];
  constructor(private bOService: BestOfferService) {}
  ngOnInit() {}

  toggleOrigin() {
    this.hideOrigin = !this.hideOrigin;
    this.hideDestination = true;
    this.hideDates = true;
  }

  toggleDestination() {
    this.hideDestination = !this.hideDestination;
    this.hideOrigin = true;
    this.hideDates = true;
  }

  toggleDates() {
    this.hideDates = !this.hideDates;
    this.hideDestination = true;
    this.hideOrigin = true;
  }

  onMonthChange( element ) {
    this.restartTimeout();
    this.selectedMonth = element.srcElement.value;
  }

  elementUpdated(bestOffers: IBestOffer[], filterBy: string) {
    if (filterBy === 'origin') {
      this.updateList(bestOffers, this.selectedOrigins);
    }
    if (filterBy === 'destination') {
      this.updateList(bestOffers, this.selectedDestinations);
    }
  }

  updateList(element, listToUpdate) {
    const shortName = element.srcElement.value;

    if (element.target.checked) {
      // add element
      listToUpdate.set(shortName, shortName);
    } else {
      // remove element
      listToUpdate.delete(shortName);
    }
    // just to wait 1.8 second to call the service
    this.restartTimeout();
    return listToUpdate;
  }

  updateCompleteList(element: object, filterBy: string) {
    if (filterBy === 'origin') {
      this.updateAllElements(element, this.selectedOrigins, this.originContent);
    }
    if (filterBy === 'destination') {
      this.updateAllElements(element, this.selectedDestinations, this.destinationContent);
    }
  }

  updateAllElements(element, listToUpdate, source) {
    if (element.checked) {
      listToUpdate.clear();
      source.forEach(bestOffer => {
        listToUpdate.set(bestOffer.iata, bestOffer.iata);
      });
    } else {
      listToUpdate.clear();
    }
    // just to wait 1.8 second to call the service
    this.restartTimeout();
  }

  restartTimeout() {
    // just to wait 1.8 second to call the service
    if (this.timeTrigger) {
      clearTimeout(this.timeTrigger);
    }
    this.timeTrigger = setTimeout(() => {
      this.processRequest();
    }, 1800);
  }

  optionSelected(shortName: string, filterBy: string) {
    let existElement = false;

    if (filterBy === 'origin') {
      if (this.selectedOrigins.get(shortName) ) {
        existElement = true;
      }
    } else if (filterBy === 'destination') {
      if (this.selectedDestinations.get(shortName) ) {
        existElement = true;
      }
    }
    return existElement;
  }

  processRequest() {
    this.errorMessage = '';
    this.hideLoading = false;
    let [originsFiltered, destinationsFiltered, monthProccessed] = ['', '', ''];

    if (this.selectedOrigins) {
      originsFiltered = Array.from(this.selectedOrigins.keys()).join(',');
    }
    if (this.selectedDestinations) {
      destinationsFiltered = Array.from(this.selectedDestinations.keys()).join(',');
    }

    if (this.selectedMonth) {
      const date = new Date(),
            year = date.getFullYear(),
            month = this.selectedMonth,
            day = date.getDate();
      monthProccessed = `${year}-${month}-${day}`;
    }

    this.bOService
      .getBestOffers(originsFiltered, destinationsFiltered, monthProccessed)
      .subscribe(
        (data: IBestOffer[]) => {
          this.bestOffersReturned = null;
          this.bestOffersReturned = data;
          this.hideLoading = true;
        },
        (error: BasicTrackerError) => {
          this.errorMessage = error.friendlyMessage;
          this.hideLoading = true;
        },
        () => console.log(' All done getting best Offers')
      );
  }
}
