const config: { [s: string]: string | RegExp } = {
  living: /(LA SPEZIA|VMVOKAVAENDMORE|LVOVKRUASSAN|BARMUMUBAR|NOVUS1057|KARPACHCHO|OLIVKA|ITUNES|EPITSENTR|UBER|AROMA|KINOMARKET|SPDMARCHENKO0000002778|EGERSUND|ROOSTER|MAGAZIN1036 KIYEV|SIRNEKOROL|PATISON|ALIEXPRESS)/i,
  present: /(APPLE ONLINE STORE)/i,
  vacation: /(HOTEL|ST JULIAN|VALLETTA|BIRGU|SLIEMA|MARSAXLOKK|MELLIEHA|SHOREDITCH|MALTA|BUDAPEST|COSTA CAFE|CAR RENTAL)/i,
  investing: /(Coinmama)/i,
  crypto: /(Coinmama)/i,
  cafe: /(LA SPEZIA|VMVOKAVAENDMORE|LVOVKRUASSAN|BARMUMUBAR|KARPACHCHO|OLIVKA|AROMA|SPDMARCHENKO0000002778|ROOSTER|PATISON)/i,
  'carpaccio-cafe': /(KARPACHCHO)/i,
  iTunes: /ITUNES/i,
  epicentre: /EPITSENTR/i,
  taxi: /UBER TRIP/i,
  transport: /(UBER TRIP|WWW\.UZ\.GOV\.UA|WOG)/i,
  train: /(WWW\.UZ\.GOV\.UA)/i,
  'aroma-cafe': /AROMA ESPRESSO BAR/i,
  bank: /RAIFFEISEN ONLINE/i,
  blockbuster: /(SHOP KINOMARKET KYIV|PLANETAKINO)/i,
  cinema: /(SHOP KINOMARKET KYIV|PLANETAKINO)/i,
  coffee: /SPDMARCHENKO0000002778/i,
  portmone: /PORTMONE/i,
  'portmone-c2c': /PORTMONE C2C/i,
  grocery: /(NOVUS1057|EGERSUND|MAGAZIN1036 KIYEV|SIRNEKOROL)/i,
  novus: /(NOVUS1057|MAGAZIN1036 KIYEV)/i,
  'syrne-korolivstvo': /(SIRNEKOROL)/i,
  egersund: /EGERSUND/i,
  wog: /WOG/i,
  fuel: /WOG/i,
  car: /WOG/i,
  patison: /PATISON/i,
  aliexpress: /ALIEXPRESS/i,
  gadgets: /ALIEXPRESS/i,
  'pe-income': /з розрахункового рахунку СПД №26005144572 на СКР.ФОП Молокостов В.С./i,
};

export default config;
