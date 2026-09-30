import { Injectable, signal } from '@angular/core';

export type AppLanguage = 'pt-BR' | 'en';

const STORAGE_KEY = 'flight-tracker-language';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly current = signal<AppLanguage>(this.readStored());

  select(language: AppLanguage): void {
    this.current.set(language);
    localStorage.setItem(STORAGE_KEY, language);
  }

  private readStored(): AppLanguage {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'pt-BR' ? stored : 'pt-BR';
  }
}
