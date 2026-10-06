import { Component, input, output, signal } from '@angular/core';
import {
  ControlComponent,
  MapComponent,
  NavigationControlDirective,
} from '@maplibre/ngx-maplibre-gl';
import type { LngLatLike, Map as MapLibreMap } from 'maplibre-gl';
import { mockAircraft } from '../../data/models/aircraft.mock';
import { Aircraft } from '../../data/models/aircraft.model';
import { FlightFilter } from '../../data/models/flight-filter.model';
import { AircraftComponent } from '../aircraft-component/aircraft-component';
import { FlightService } from '../../data/services/flight.service';

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
  readonly mapStyle = 'https://tiles.openfreemap.org/styles/bright';
  readonly center: LngLatLike = [-46.6333, -23.5505];
  readonly zoom = 10;
  readonly previewAircraft = mockAircraft;
  readonly aircraftSelected = input(false);
  readonly aircraftClick = output<Aircraft>();
  readonly backgroundClick = output<void>();
  readonly aircraftPoint = signal<{ x: number; y: number } | null>(null);

  private map?: MapLibreMap;

  flightService: FlightService;
  viewportBounds: FlightFilter;
  readonly flights = signal<Aircraft[]>([]);

  constructor(flightService: FlightService) {
    this.flightService = flightService;
  }

  onMapLoad(map: MapLibreMap): void {
    this.map = map;
    this.projectAircraft();
    this.getViewportBounds();
  }

  onMove(): void {
    this.projectAircraft();
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
    this.getViewportBounds();
  }

  private projectAircraft(): void {
    const { latitude, longitude } = this.previewAircraft;
    if (!this.map || latitude == null || longitude == null) {
      this.aircraftPoint.set(null);
      return;
    }

    const point = this.map.project([longitude, latitude]);
    this.aircraftPoint.set({ x: point.x, y: point.y });
  }

  getViewportBounds(): void {
    if (!this.map) {
      return;
    }

    const bounds = this.map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    this.viewportBounds = {
      lamin: sw.lat,
      lomin: sw.lng,
      lamax: ne.lat,
      lomax: ne.lng,
    };
  }
}
