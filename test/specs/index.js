import "babel/register";

// mock for socketio
window.io = {
  connect: function(){
    return {
      on: function() {}
    };
  }
};

require("./stores");
