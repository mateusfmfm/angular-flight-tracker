import { Aircraft } from './aircraft.model';

/** Dados fixos para testar o drawer antes da query GraphQL. */
export const mockAircraft: Aircraft = {
  icao24: 'e4945a',
  callsign: 'GLO1842',
  originCountry: 'Brazil',
  latitude: -23.5505,
  longitude: -46.6333,
  baroAltitude: 3500.2,
  onGround: false,
  velocity: 89.4,
  trueTrack: 47,
  verticalRate: 1.5,
  squawk: '2000',
  spi: false,
  positionSource: 0,
  category: 1,
  lastPositionUpdate: 1_750_000_000,
  lastContact: 1_750_000_120,
};
