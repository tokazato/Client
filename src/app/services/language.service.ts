import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  languages = environment.languages;
  selected = new BehaviorSubject(null);

  constructor(private translateService: TranslateService) {}

  setLanguage(languageValue) {
    const language = this.getLanguage(languageValue);

    this.translateService.use(language.value);
    this.selected.next(language);
  }

  getLanguage(languageValue: string) {
    return this.languages.find((option) => option.value === languageValue);
  }
}
