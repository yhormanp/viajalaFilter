# ViajalaWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.


This project shows a filter to select different origins, destinations and a unique month to travel . the best offer API will receive the request to return 10 best offers that match with the information selected.

one or several origins can be selected.
one or several destinations can be selected.
only a month can be selected.


the result list will show only ten records (top 10 best offers)

if  you click any of the prices shown in the result set, it will take you to the viajala page to obtain more details about that offer and others.

the main components in this project are.
*Container: to host the filter.
*filter: it's responsability is to show the origins, destinations and months, validate the selections   and call the service with the information selected.
*results: it will show a record per row of the best offers returned by the service.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
