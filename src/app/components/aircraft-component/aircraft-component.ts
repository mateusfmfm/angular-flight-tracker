import { Component } from '@angular/core';
import { Aircraft } from '../../data/models/aircraft-model';

@Component({
  imports: [],
  selector: 'app-aircraft-component',
  styleUrl: './aircraft-component.scss',
  templateUrl: './aircraft-component.html',
})
export class AircraftComponent {
  aircraft: Aircraft;
}
