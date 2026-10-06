export interface FlightFilter {
  originCountry?: string | null;
  minAltitude?: number | null;
  maxAltitude?: number | null;
  callsignPrefix?: string | null;
  lamin?: number | null;
  lomin?: number | null;
  lamax?: number | null;
  lomax?: number | null;
}
