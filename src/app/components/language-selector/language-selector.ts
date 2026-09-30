import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppLanguage, LanguageService } from '../../services/language.service';

interface LanguageOption {
  id: AppLanguage;
  src: string;
  label: string;
}

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-language-selector',
  styleUrl: './language-selector.scss',
  templateUrl: './language-selector.html',
})
export class LanguageSelector {
  private readonly language = inject(LanguageService);

  readonly current = this.language.current;
  readonly languages: LanguageOption[] = [
    { id: 'pt-BR', src: 'images/br.svg', label: 'Português' },
    { id: 'en', src: 'images/uk.svg', label: 'English' },
  ];

  select(language: AppLanguage): void {
    this.language.select(language);
  }
}
