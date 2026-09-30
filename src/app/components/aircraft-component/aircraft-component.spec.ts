import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockAircraft } from '../../data/models/aircraft.mock';
import { AircraftComponent } from './aircraft-component';

describe('AircraftComponent', () => {
  let component: AircraftComponent;
  let fixture: ComponentFixture<AircraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AircraftComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AircraftComponent);
    fixture.componentRef.setInput('aircraft', mockAircraft);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
