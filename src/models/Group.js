
import Backbone from 'backbone';
import Members from './Members';

var Group = Backbone.Model.extend({

  parse: function(body){
    body.members = new Members(body.members, { groupId: body.id });

    var pic = body.picture;
    body.picture = (pic ? '/images/groups/' + pic : '');

    return body;
  },

});

export default Group;