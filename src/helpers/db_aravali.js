import { db } from '../config/constants';

export function GetPeople(uid) {
  return db.collection('people').where('ownerId','==',uid).get();
}

export function UpdatePeople(id) {
  return db.collection('people').doc(id)
}

export function GetEventsAravali(uid, company) {
  return db.collection('events_Aravali').where('company','==', '@pc').get();
}

export function GetEquipmentsAravali(uid) {
  return db.collection('equipments_Aravali').where('ownerId','==',uid).get();
}

export function UpdateEventsAravali(company) {
  return db.collection('events_Aravali').doc(company)
}

export function UpdateEquipmentsAravali(uid) {
  return db.collection('equipments_Aravali').doc(uid)
}
