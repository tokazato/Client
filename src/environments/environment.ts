// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { LanguageType } from 'src/app/enums/language-type.enum';

export const environment = {
  production: false,
  defaultLanguage: LanguageType.Georgian.toString(),
  languages: [
    { text: 'geo', value: LanguageType.Georgian.toString() },
    { text: 'eng', value: LanguageType.English.toString() },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
