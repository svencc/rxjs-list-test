export class Person {
  name: string;
  surname: string;
  gender: string;
  region: string;
  age: number;
  title: string;
  phone: string;
  birthday: Birthday;
  email: string;
  password: string;
  credit_card: CreditCard;
  photo: string;
}

export class Birthday {
  dmy: string;
  mdy: string;
  raw: number;
}

export class CreditCard {
  expiration: string;
  number: string;
  pin: number;
  security: number;
}
