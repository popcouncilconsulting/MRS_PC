import { db } from '../config/constants';

// export function GetEvents(uid) {
//   return db.collection('events').where('ownerId','==',uid).get();
// }

// Collection of events to the 
export function GetEvents(uid, company) {
  return db.collection('events').where('company','==', '@pc').get();
}

export function GetEquipments(uid, room) {
  return db.collection('equipments').where('ownerId','==',uid).get();
}

export function GetPeople(uid) {
  return db.collection('people').where('ownerId','==', uid).get();
} 

export function UpdateEvents(company, ) {
  return db.collection('events').doc(company)
}

export function UpdateEquipments(id) {
  return db.collection('equipments').doc(id)
}

export function UpdatePeople(id) {
  return db.collection('people').doc(id)
}

// ###############################################################################################
// manthan  ######################################################################################
