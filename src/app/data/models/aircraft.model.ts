export interface Aircraft {
  icao24: string;
  callsign: string;
  originCountry: string;
  longitude?: number | null;
  latitude?: number | null;
  baroAltitude?: number | null;
  onGround: boolean;
  velocity?: number | null;
  trueTrack?: number | null;
  verticalRate?: number | null;
  squawk?: string | null;
  spi: boolean;
  positionSource: number;
  category: number;
  lastPositionUpdate?: number | null;
  lastContact?: number | null;
}
