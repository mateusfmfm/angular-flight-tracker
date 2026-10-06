import gql from 'graphql-tag';

export const AIRCRAFTS_QUERY = gql`
  query Aircrafts($filter: FlightFilter) {
    aircrafts(filter: $filter) {
      icao24
      callsign
      originCountry
      longitude
      latitude
      baroAltitude
      onGround
      velocity
      trueTrack
      verticalRate
      squawk
      spi
      positionSource
      category
      lastPositionUpdate
      lastContact
    }
  }
`;