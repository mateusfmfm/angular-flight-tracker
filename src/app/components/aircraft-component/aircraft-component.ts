import { Component, input, output } from '@angular/core';
import { Aircraft } from '../../data/models/aircraft.model';

@Component({
  selector: 'app-aircraft-component',
  styleUrl: './aircraft-component.scss',
  templateUrl: './aircraft-component.html',
  host: {
    '[class.aircraft--selected]': 'selected()',
  },
})
export class AircraftComponent {
  readonly aircraft = input.required<Aircraft>();
  readonly selected = input(false);
  readonly aircraftClick = output<Aircraft>();

  onAircraftClick(event: MouseEvent): void {
    event.stopPropagation();
    this.aircraftClick.emit(this.aircraft());
  }
}
