import {
  Meteor
} from 'meteor/meteor';
import './global.js';

Meteor.startup(() => {
  phantomCreate();
});
