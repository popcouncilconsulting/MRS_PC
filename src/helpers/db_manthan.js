import { db } from '../config/constants';

export function GetPeople(uid) {
  return db.collection('people').where('ownerId','==',uid).get();
}

export function UpdatePeople(id) {
  return db.collection('people').doc(id)
}

export function GetEventsManthan(uid, company) {
  return db.collection('events_Manthan').where('company','==', '@pc').get();
}

export function GetEquipmentsManthan(uid) {
  return db.collection('equipments_Manthan').where('ownerId','==',uid).get();
}

export function UpdateEventsManthan(company) {
  return db.collection('events_Manthan').doc(company)
}

export function UpdateEquipmentsManthan(id) {
  return db.collection('equipments_Manthan').doc(id)
}
