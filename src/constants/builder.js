
export default function(store, constants, setDefaults){

  if (setDefaults) {
    constants = constants.concat([
      "FIND",
      "FINDONE",
      "RECEIVE",
      "CREATE",
      "UPDATE",
      "DESTROY",
      "REMOVE",
      "ERROR"
    ]);
  }

  return constants.reduce((m, v) => { m[v] = store + "_" + v; return m; }, {});
};
