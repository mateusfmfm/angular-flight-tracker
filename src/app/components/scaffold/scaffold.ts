import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  imports: [Header, Footer],
  selector: 'app-scaffold',
  styleUrl: './scaffold.scss',
  template: `
    <app-header />
    <main class="scaffold__content">
      <ng-content />
    </main>
    <app-footer />
  `,
})
export class Scaffold {}
