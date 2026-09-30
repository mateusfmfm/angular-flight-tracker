import { Component, signal } from '@angular/core';
import { Aircraft } from '../../data/models/aircraft.model';
import { AircraftInfoDrawer } from '../../components/aircraft-info-drawer/aircraft-info-drawer';
import { Scaffold } from '../../components/scaffold/scaffold';
import { FlightMap } from '../../components/map/map';

@Component({
  imports: [Scaffold, FlightMap, AircraftInfoDrawer],
  selector: 'app-home-page',
  styleUrl: './home-page.scss',
  templateUrl: './home-page.html',
})
export class HomePage {
  readonly selectedAircraft = signal<Aircraft | null>(null);

  openAircraft(aircraft: Aircraft): void {
    this.selectedAircraft.set(aircraft);
  }

  closeAircraft(): void {
    this.selectedAircraft.set(null);
  }
}
