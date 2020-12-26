import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../services/language.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageGuard implements CanActivate {
  constructor(private router: Router, private languageService: LanguageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (next.paramMap.has('lang')) {
      const routeLang = next.paramMap.get('lang');

      if (environment.languages.map((language) => language.value).includes(routeLang)) {
        this.languageService.setLanguage(routeLang);
        return true;
      } else {
        this.languageService.setLanguage(environment.defaultLanguage);
        this.router.navigate(['/' + environment.defaultLanguage]);
        return false;
      }
    } else {
      this.languageService.setLanguage(environment.defaultLanguage);
      this.router.navigate(['/' + environment.defaultLanguage]);
      return false;
    }
  }
}
