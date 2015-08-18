
import { expect } from "chai";
import GroupStore from "../../../src/stores/Group";

describe("GroupStore", function(){

  it("must be a SingleTone with valid values", function(){
    expect(GroupStore.uri).to.be.equal("/api/groups/");
    expect(GroupStore.type).to.be.equal("GROUP");
  });

});
