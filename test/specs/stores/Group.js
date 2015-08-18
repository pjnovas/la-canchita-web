
import { expect } from "chai";

import GroupStore from "../../../src/stores/GroupStore";
import GroupConstants from "../../../src/constants/GroupConstants";
import GroupActions from "../../../src/actions/GroupActions";

describe("GroupStore", function(){

  describe('RECIEVE', function(){

    it("must add groups and fire change event", function(done){

      let event = GroupStore.addListener(() => {

        let groups = GroupStore.getState();
        expect(groups).to.be.an("array");
        expect(groups.length).to.be.equal(2);

        event.remove();
        done();
      });

      GroupActions.receive([{
        id: "1",
        title: "group 1"
      },{
        id: "2",
        title: "group 2"
      }]);

    });

    it("must fire change only if state changed", function(){
      let fires = 0;

      let event = GroupStore.addListener(() => {
        fires++;
      });

      let gs = [{
        id: "3",
        title: "group 3"
      }];

      GroupActions.receive(gs);
      expect(fires).to.be.equal(1);
      GroupActions.receive(gs);
      expect(fires).to.be.equal(1);

      gs[0].title = "group changed";
      GroupActions.receive(gs);
      var groups = GroupStore.getState();
      expect(groups.length).to.be.equal(3);

      expect(groups[2].title).to.be.equal("group changed");
      expect(fires).to.be.equal(2);

      event.remove();
    });
  });

});
