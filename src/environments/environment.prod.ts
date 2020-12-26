import { LanguageType } from 'src/app/enums/language-type.enum';

export const environment = {
  production: true,
  defaultLanguage: LanguageType.Georgian.toString(),
  languages: [
    { text: 'geo', value: LanguageType.Georgian.toString() },
    { text: 'eng', value: LanguageType.English.toString() },
  ],
};
