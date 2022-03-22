import { db } from '../config/constants';

export function GetPeople(uid) {
  return db.collection('people').where('ownerId','==',uid).get();
}

export function UpdatePeople(id) {
  return db.collection('people').doc(id)
}

export function GetEventsHuddleRoom(uid, company) {
  return db.collection('events_HuddleRoom').where('company','==', '@pc').get();
}

export function GetEquipmentsHuddleRoom(uid) {
  return db.collection('equipments_HuddleRoom').where('ownerId','==',uid).get();
}

export function UpdateEventsHuddleRoom(company) {
  return db.collection('events_HuddleRoom').doc(company)
}

export function UpdateEquipmentsHuddleRoom(uid) {
  return db.collection('equipments_HuddleRoom').doc(uid)
}
