import { db } from '../config/constants';

export function GetPeople(uid) {
  return db.collection('people').where('ownerId','==',uid).get();
}

export function UpdatePeople(id) {
  return db.collection('people').doc(id)
}

export function GetEventsVindhyanchal(uid, company) {
  return db.collection('events_Vindhyanchal').where('company','==', '@pc').get();
}

export function GetEquipmentsVindhyanchal(uid) {
  return db.collection('equipments_Vindhyanchal').where('ownerId','==',uid).get();
}

export function UpdateEventsVindhyanchal(company) {
  return db.collection('events_Vindhyanchal').doc(company)
}

export function UpdateEquipmentsVindhyanchal(id) {
  return db.collection('equipments_Vindhyanchal').doc(id)
}
