export enum TypeHousing {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel'
}

export const TypeComfort = {
  Breakfast: 'Breakfast',
  'Air conditioning': 'Air conditioning',
  'Laptop friendly workspace': 'Laptop friendly workspace',
  'Baby seat': 'Baby seat',
  Washer: 'Washer',
  Towels: 'Towels',
  Fridge: 'Fridge'
} as const

export const RentKey = {
  name: 'name',
  description:'description',
  city: 'city',
  preverteringImage: 'prevertering_image',
  photosHousing: 'photos_housing',
  premium: 'premium',
  favorites: 'favorites',
  typeHousing: 'type_housing',
  numberRoom: 'number_room',
  numberGuest: 'number_guest',
  priceRent: 'price_rent',
  comfort: 'comfort',
  coordinates: 'coordinates',
} as const;
