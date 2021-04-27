import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles.js';
import { Companies } from '../../api/company/Companies';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addProfiles(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Profiles.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default data.');
    Meteor.settings.defaultProfiles.map(data => addProfiles(data));
  }
}

// Initialize the database with a default data document.
function addCompanies(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Companies.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Companies.collection.find().count() === 0) {
  if (Meteor.settings.defaultCompanies) {
    console.log('Creating default data.');
    Meteor.settings.defaultCompanies.map(data => addCompanies(data));
  }
}
