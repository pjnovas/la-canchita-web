
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { UserStore } from "../../../../src/stores";
import { UserAPI } from "../../../../src/api";
import { UserActions } from "../../../../src/actions";

describe('RECIEVE', function(){

  after(() => { UserStore.clear(); });

  it("must add users and fire change event", function(done){

    let event = UserStore.addListener(() => {

      let users = UserStore.getState();
      expect(users).to.be.an("array");
      expect(users.length).to.be.equal(2);

      event.remove();
      done();
    });

    UserActions.receive([{
      id: "1",
      name: "user name 1"
    },{
      id: "2",
      name: "user name 2"
    }]);

  });

});
