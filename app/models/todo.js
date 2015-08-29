import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  done: DS.attr('boolean')
});
