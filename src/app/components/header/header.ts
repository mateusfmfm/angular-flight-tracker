import { Component } from '@angular/core';
import { LanguageSelector } from '../language-selector/language-selector';

@Component({
  imports: [LanguageSelector],
  selector: 'app-header',
  styleUrl: './header.scss',
  template: `
    <header class="header">
      <h1 class="header__brand">Flight Tracker</h1>
      <span class="header__badge">Live</span>
      <app-language-selector class="header__lang" />
    </header>
  `,
})
export class Header {}
