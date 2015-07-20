
import Backbone from 'backbone';
import Member from './Member';

var Members = Backbone.Collection.extend({

  model: Member,

  initialize: function(models, options){
    if (!options || !options.groupId){
      throw new Error('Stores/Members > Cannot create without a GroupID');
    }

    this.groupId = options.groupId;
  },

});

export default Members;
