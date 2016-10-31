import Ember from 'ember';
import ApplicationAdapter from './application';

/* Иммитация взаимодействия с реальным backend сервером */

export default ApplicationAdapter.extend({
  createRecord (store, type, snapshot) {
    var json = snapshot.serialize();

    json['id'] = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    var jsonStorage = [];
    try {
      jsonStorage = JSON.parse(window.localStorage.getItem('todos')) || [];
    } catch (e) {
    }

    jsonStorage.push(json);

    window.localStorage.setItem('todos', JSON.stringify(jsonStorage));

    return new Ember.RSVP.Promise((resolve) => {
      Ember.run(null, resolve, json);
    });
  },
  deleteRecord (store, type, snapshot) {
    var json = snapshot.serialize();
    var id = snapshot.id;
    json.id = id;

    var jsonStorage = JSON.parse(window.localStorage.getItem('todos')) || [];

    var i = 0;

    while (jsonStorage.length > i) {

      if (jsonStorage[i].id === id) {
        jsonStorage.splice(i, 1);
        break;
      }
      i++;
    }

    window.localStorage.setItem('todos', JSON.stringify(jsonStorage));

    return new Ember.RSVP.Promise(function (resolve) {
      Ember.run(null, resolve, json);
    });
  },
  findAll () {
    var emptyArray = [];

    var todos;
    try {
      todos = JSON.parse(window.localStorage.getItem('todos'));
    } catch (e) {
    }

    return new Ember.RSVP.Promise((resolve) => {
      Ember.run(null, resolve, (todos || emptyArray));
    });
  }
});
