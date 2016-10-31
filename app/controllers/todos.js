import Ember from 'ember';

export default Ember.Controller.extend({
  taskName: null,
  newTasksNumber: null,
  finishedTasksNumber: null,
  actions: {
    create () {
      //var todo = this.store.createRecord();
      //todo.save();
    },
    delete (/*todo*/) {}
  }
});
