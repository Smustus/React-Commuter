export interface FormState {
  searchFrom: string;
  searchTo: string;
}

export interface StopLocation {
  dist: number;
  extId: string;
  id: string;
  lat: number;
  lon: number;
  name: string;
  productAtStop: [{}];
  products: number;
  timezoneOffset: number;
  weight: number;
}