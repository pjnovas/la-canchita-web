
import Backbone from 'backbone';
import Members from '../stores/Members';

var Group = Backbone.Model.extend({

  urlRoot: '/api/groups',

  parse: function(request){

    request.members = new Members(request.members, { groupId: request.id });

    var pic = request.picture;
    request.picture = (pic ? '/images/groups/' + pic : '');

    return request;
  },

});

export default Group;