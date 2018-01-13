const l0 = {
  aliexpress: /ALIEXPRESS/i,
  aromaCafe: /AROMA ESPRESSO BAR/i,
  avalBank: /RAIFFEISEN ONLINE/i,
  bank: /RAIFFEISEN ONLINE/i,
  blockbuster: /(SHOP KINOMARKET KYIV|PLANETAKINO)/i,
  carpaccioCafe: /(KARPACHCHO)/i,
  coffeeF30: /SPDMARCHENKO0000002778/i,
  coinMama: /(Coinmama)/i,
  egersund: /EGERSUND/i,
  epicentre: /EPITSENTR/i,
  hedonistCafe: /BARMUMUBAR/i,
  iTunes: /ITUNES/i,
  kavaAndMore: /VMVOKAVAENDMORE/i,
  laSpeziaCafe: /LA SPEZIA/i,
  lvivCruasan: /LVOVKRUASSAN/i,
  novus: /(NOVUS1057|MAGAZIN1036 KIYEV)/i,
  olivkaCafe: /OLIVKA/i,
  patisonCafe: /PATISON/i,
  peIncome: /з розрахункового рахунку СПД №26005144572 на СКР.ФОП Молокостов В.С./i,
  portmone: /PORTMONE/i,
  portmoneC2C: /PORTMONE C2C/i,
  present: /(APPLE ONLINE STORE)/i,
  roosterCafe: /ROOSTER/i,
  syrneKorolivstvo: /(SIRNEKOROL)/i,
  trainTicket: /(WWW\.UZ\.GOV\.UA)/i,
  uber: /UBER TRIP/i,
  wog: /WOG/i,
};

const l1 = {
  ...l0,
  bank: [l0.avalBank],
  cafe: [
    ...[l0.laSpeziaCafe, l0.kavaAndMore, l0.lvivCruasan, l0.hedonistCafe, l0.carpaccioCafe, l0.olivkaCafe],
    ...[l0.aromaCafe, l0.roosterCafe, l0.patisonCafe],
  ],
  cinema: [l0.blockbuster],
  coffee: [l0.coffeeF30],
  crypto: [l0.coinMama],
  fuel: [l0.wog],
  gadgets: [l0.aliexpress],
  grocery: [l0.novus, l0.egersund, l0.syrneKorolivstvo],
  taxi: [l0.uber],
  train: [l0.trainTicket],
  vacation: /(HOTEL|ST JULIAN|VALLETTA|BIRGU|SLIEMA|MARSAXLOKK|MELLIEHA|SHOREDITCH|MALTA|BUDAPEST|COSTA CAFE|CAR RENTAL)/i,
};

const config = {
  ...l1,
  car: [...l1.fuel],
  living: [
    ...l1.cafe,
    ...[l0.novus, l0.iTunes, l0.epicentre, l0.uber, l0.blockbuster, l0.egersund, l0.syrneKorolivstvo, l0.aliexpress],
  ],
  investing: [...l1.crypto],
  transport: [...l1.taxi, ...l1.train],
};

export default config;
