import { Component, input, output } from '@angular/core';
import {
  ControlComponent,
  MapComponent,
  NavigationControlDirective,
} from '@maplibre/ngx-maplibre-gl';
import type { LngLatLike, Map as MapLibreMap } from 'maplibre-gl';
import { mockAircraft } from '../../data/models/aircraft.mock';
import { Aircraft } from '../../data/models/aircraft.model';
import { AircraftComponent } from '../aircraft-component/aircraft-component';

export interface MapViewportBounds {
  lamin: number; // latitude mínima (sul)
  lomin: number; // longitude mínima (oeste)
  lamax: number; // latitude máxima (norte)
  lomax: number; // longitude máxima (leste)
}

@Component({
  selector: 'app-map',
  imports: [MapComponent, ControlComponent, NavigationControlDirective, AircraftComponent],
  templateUrl: './map.html',
  styleUrl: './map.scss',
  host: {
    '[class.map--shifted]': 'aircraftSelected()',
  },
})
export class FlightMap {

  /** OpenFreeMap Bright — sem API key (tema claro) */
  readonly mapStyle = 'https://tiles.openfreemap.org/styles/bright';
  readonly center: LngLatLike = [-46.6333, -23.5505];
  readonly zoom = 10;
  readonly previewAircraft = mockAircraft;
  readonly aircraftSelected = input(false);
  readonly aircraftClick = output<Aircraft>();
  readonly backgroundClick = output<void>();

  private map?: MapLibreMap;

  onMapLoad(map: MapLibreMap): void {
    this.map = map;
    this.logViewportBounds();
  }

  onAircraftClick(aircraft: Aircraft): void {
    this.aircraftClick.emit(aircraft);
  }

  onBackgroundClick(event: MouseEvent): void {
    const target = event.target;
    if (target instanceof Element && target.closest('app-aircraft-component')) {
      return;
    }

    this.backgroundClick.emit();
  }

  onMoveEnd(): void {
    this.logViewportBounds();
  }

  /** Lê getBounds() da viewport e imprime no formato da API. */
  logViewportBounds(): void {
    if (!this.map) {
      return;
    }

    const bounds = this.map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const viewport: MapViewportBounds = {
      lamin: sw.lat,
      lomin: sw.lng,
      lamax: ne.lat,
      lomax: ne.lng,
    };

    console.log('[FlightMap] viewport bounds (FlightFilter)', viewport);
    console.log('[FlightMap] raw LngLatBounds', {
      southWest: { lat: sw.lat, lng: sw.lng },
      northEast: { lat: ne.lat, lng: ne.lng },
    });
  }
}
