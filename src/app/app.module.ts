import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { ResultsComponent } from './components/results/results.component';
import { FilterComponent } from './components/filter/filter.component';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations'


import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { BasicTrackerError } from './models/basicTrackError';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    ResultsComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: 'viajala', component: ContainerComponent },
      { path: '', redirectTo: 'viajala', pathMatch: 'full' },
      { path: '**', redirectTo: 'viajala', pathMatch: 'full' }
    ]),
  ],
  providers: [ BasicTrackerError ],
  bootstrap: [AppComponent]
})
export class AppModule { }
