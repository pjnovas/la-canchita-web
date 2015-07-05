
import AppDispatcher from '../dispatcher/AppDispatcher';
import Backbone from 'backbone';

var Member = Backbone.Model.extend({

  role: function(){
    var roleNames = {
      'owner': 'Propietario',
      'admin': 'Administrador',
      'moderator': 'Moderador',
      'member': 'Jugador'
    };

    return roleNames[this.get('role')];
  }

});

export default Member;