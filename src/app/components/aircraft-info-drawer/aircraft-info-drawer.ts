import { Component, ElementRef, computed, inject, input, output } from '@angular/core';
import { Aircraft } from '../../data/models/aircraft.model';

@Component({
  selector: 'app-aircraft-info-drawer',
  styleUrl: './aircraft-info-drawer.scss',
  templateUrl: './aircraft-info-drawer.html',
  host: {
    '[class.is-open]': 'open()',
    '[attr.inert]': 'open() ? null : ""',
    '[attr.aria-hidden]': 'open() ? null : true',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class AircraftInfoDrawer {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly aircraft = input<Aircraft | null>(null);
  readonly closed = output<void>();

  readonly open = computed(() => this.aircraft() !== null);

  readonly rows = computed(() => {
    const aircraft = this.aircraft();
    if (!aircraft) {
      return [];
    }

    return [
      { label: 'ICAO24', value: aircraft.icao24 },
      { label: 'Callsign', value: aircraft.callsign },
      { label: 'País de origem', value: aircraft.originCountry },
      { label: 'Latitude', value: this.formatNumber(aircraft.latitude, '°', 4) },
      { label: 'Longitude', value: this.formatNumber(aircraft.longitude, '°', 4) },
      { label: 'Altitude barométrica', value: this.formatNumber(aircraft.baroAltitude, 'm') },
      { label: 'No solo', value: this.formatBoolean(aircraft.onGround) },
      { label: 'Velocidade', value: this.formatNumber(aircraft.velocity, 'm/s') },
      { label: 'Rumo', value: this.formatNumber(aircraft.trueTrack, '°') },
      { label: 'Razão vertical', value: this.formatNumber(aircraft.verticalRate, 'm/s') },
      { label: 'Squawk', value: aircraft.squawk || '—' },
      { label: 'SPI', value: this.formatBoolean(aircraft.spi) },
      { label: 'Fonte da posição', value: String(aircraft.positionSource) },
      { label: 'Categoria', value: String(aircraft.category) },
      { label: 'Última posição', value: this.formatTimestamp(aircraft.lastPositionUpdate) },
      { label: 'Último contato', value: this.formatTimestamp(aircraft.lastContact) },
    ];
  });

  close(): void {
    this.closed.emit();
  }

  onDocumentClick(event: Event): void {
    if (!this.open()) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }

    if (this.host.nativeElement.contains(target)) {
      return;
    }

    if (target instanceof Element && target.closest('app-aircraft-component')) {
      return;
    }

    this.close();
  }

  private formatBoolean(value: boolean): string {
    return value ? 'Sim' : 'Não';
  }

  private formatNumber(value: number | null | undefined, unit: string, digits = 1): string {
    if (value == null) {
      return '—';
    }

    const formatted = new Intl.NumberFormat('pt-BR', {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    }).format(value);

    return `${formatted} ${unit}`;
  }

  private formatTimestamp(seconds: number | null | undefined): string {
    if (seconds == null || seconds === 0) {
      return '—';
    }

    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(new Date(seconds * 1000));
  }
}
