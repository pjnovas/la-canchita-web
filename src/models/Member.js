
import Backbone from 'backbone';

var roleNames = {
  'owner': 'Propietario',
  'admin': 'Administrador',
  'moderator': 'Moderador',
  'member': 'Jugador'
};

var Member = Backbone.Model.extend({

  parse: function(body){
    body.roleName = roleNames[body.role];
    return body;
  },

});

export default Member;