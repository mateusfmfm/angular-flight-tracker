import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AircraftInfoDrawer } from './aircraft-info-drawer';

describe('AircraftInfoDrawer', () => {
  let component: AircraftInfoDrawer;
  let fixture: ComponentFixture<AircraftInfoDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AircraftInfoDrawer],
    }).compileComponents();

    fixture = TestBed.createComponent(AircraftInfoDrawer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
