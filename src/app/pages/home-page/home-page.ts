import { Component } from '@angular/core';
import { Scaffold } from '../../components/scaffold/scaffold';
import { FlightMap } from '../../components/map/map';

@Component({
  imports: [Scaffold, FlightMap],
  selector: 'app-home-page',
  styleUrl: './home-page.scss',
  templateUrl: './home-page.html',
})
export class HomePage {}
