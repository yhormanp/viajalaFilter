import { Component, OnInit } from "@angular/core";
import { configurations } from "../../configs/config";
import { BestOfferService } from "..//../services/best-offer.service";
import { BasicTrackerError } from "src/app/models/basicTrackError";
import { IBestOffer } from "src/app/models/IBestOffer";
@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent implements OnInit {
  error: string;
  hideOrigin: boolean = true;
  hideDestination: boolean = true;
  hideDates: boolean = true;
  hideLoading: boolean= true;

  originContent = configurations.defaultOrigins;
  destinationContent = configurations.defaultDestination;
  monthContent = configurations.availableMonths;

  selectedOrigins = new Map();
  selectedDestinations = new Map();
  selectedMonth: string;
  sTimeout: any;

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

  onMonthChange( element ){
    var selectedOption = element.srcElement.value;
    this.restartTimeout();
    this.selectedMonth = selectedOption; 
  }

  elementUpdated(data, filterby) {
    if (filterby === "origin") {
      this.updateList(data, this.selectedOrigins);
    }
    if (filterby === "destination") {
      this.updateList(data, this.selectedDestinations);
    }
  }

  updateList(data, listToUpdate) {
    var shortName = data.srcElement.value;

    if (data.target.checked === true) {
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

  updateAllElements(data, listToUpdate, source) {
    if (data.checked) {
      listToUpdate.clear();
      source.forEach(element => {
        listToUpdate.set(element.iata, element.iata);
      });
    } else {
      listToUpdate.clear();
    }
    // just to wait 1.8 second to call the service
    this.restartTimeout();
  }

  updateCompleteList(data, filterby) {
    if (filterby === "origin") {
      this.updateAllElements(data, this.selectedOrigins, this.originContent);
    }
    if (filterby === "destination") {
      this.updateAllElements(
        data,
        this.selectedDestinations,
        this.destinationContent
      );
    }
  }

  restartTimeout() {
    // just to wait 1.8 second to call the service
    if (this.sTimeout) {
      clearTimeout(this.sTimeout);
    }
    this.sTimeout = setTimeout(() => {
      this.processRequest();
    }, 1800);
  }

  isSelected(shortName, filterby) {
    let valueToReturn = false;

    if (filterby === "origin") {
      let result = this.selectedOrigins.get(shortName);
      if (result != undefined) {
        valueToReturn = true;
      }
    } else if (filterby === "destination") {
      let result = this.selectedDestinations.get(shortName);
      if (result != undefined) {
        valueToReturn = true;
      }
    }
    return valueToReturn;
  }

  processRequest() {
    this.error="";
    
    this.hideLoading = false;
    let originsFiltered = "";
    let destinationsFiltered = "";
    let monthProccessed="";

    if (this.selectedOrigins) {
      originsFiltered = Array.from(this.selectedOrigins.keys()).join(",");
    }
    if (this.selectedDestinations) {
      destinationsFiltered = Array.from(this.selectedDestinations.keys()).join(",");
    }

    if (this.selectedMonth){
      var date= new Date();
      var year = date.getFullYear();
      var month = this.selectedMonth;
      var day = date.getDate();
      monthProccessed = year+'-'+month+'-'+ day;
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
          this.error = error.friendlyMessage;
          this.hideLoading = true;
        },
        () => console.log(" All done getting best Offers")
      );
  }
}
