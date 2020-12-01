export const Patterns = {
  number: '^[0-9]*$',
  mobile: '(^5[0-9]{8}$)',
  personalNumber: '^[0-9_-]{11}$',
  geo: /^[wა-ჰ]{2,50}$/i,
  Eng: /^[a-zA-Z]{2,50}$/i,
  geoAndEng: '([wა-ჰ]+)|([a-zA-Z]+)',
};
