import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AIRCRAFTS_QUERY } from '../graphql/aircrafts.query';
import { FlightFilter } from '../models/flight-filter.model';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  apollo: Apollo;

  constructor(apollo: Apollo) {
    this.apollo = apollo;
  }

  getFlights(filter: FlightFilter) {
    return this.apollo.watchQuery({
      query: AIRCRAFTS_QUERY,
      variables: {
        filter,
      },
    });
  }
}
