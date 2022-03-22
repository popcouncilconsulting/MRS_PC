import { db } from '../config/constants';

export function GetPeople(uid) {
  return db.collection('people').where('ownerId','==',uid).get();
}

export function UpdatePeople(id) {
  return db.collection('people').doc(id)
}

export function GetEventsSaptagiri(uid, company) {
  return db.collection('events_Saptagiri').where('company','==', '@pc').get();
}

export function GetEquipmentsSaptagiri(uid) {
  return db.collection('equipments_Saptagiri').where('ownerId','==',uid).get();
}

export function UpdateEventsSaptagiri(company) {
  return db.collection('events_Saptagiri').doc(company)
}

export function UpdateEquipmentsSaptagiri(id) {
  return db.collection('equipments_Saptagiri').doc(id)
}
