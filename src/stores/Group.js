
import Backbone from 'backbone';

var Group = Backbone.Model.extend({

  urlRoot: '/api/groups',

});

Group.instance = new Group();
export default Group;