import { Injectable } from "@angular/core";
import { configurations } from "../configs/config";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { BasicTrackerError } from "../models/basicTrackError";
import { IBestOffer } from "../models/IBestOffer";

@Injectable({
  providedIn: "root"
})
export class BestOfferService {
  private baseAPIUrl = configurations.baseApiUrl;
  private getBestOfferUrl = `${this.baseAPIUrl}?country=${configurations.countryOrigin}`;

  constructor(private http: HttpClient, private dataError: BasicTrackerError) {}

  getBestOffers(origins: string, destinations: string, date: string): Observable<IBestOffer[] | BasicTrackerError> {
    let urlModified = this.getBestOfferUrl;
    if (origins.length > 0) {
      urlModified += `&origin=${origins}`;
    }

    if (destinations.length > 0) {
      urlModified += `&destination=${destinations}`;
    }

    if (date.length > 0){
      urlModified += `&departureDateMin=${date}`;
    }

    return this.http
      .get<IBestOffer[]>(urlModified)
      .pipe(catchError(err => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse): Observable<BasicTrackerError> {
    this.dataError.errorNumber = 100;
    this.dataError.message = error.statusText;
    this.dataError.friendlyMessage = "An error ocurred retrieving data.";
    console.log (error.error);
    return throwError(this.dataError);
  }
}
