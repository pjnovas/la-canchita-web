
export default function(store, constants, setDefaults){

  if (setDefaults) {
    constants = constants.concat([
      'RECIEVE',
      'CREATE',
      'UPDATE',
      'DESTROY',
    ]);
  }

  return constants.reduce((m, v) => { m[v] = store + '_' + v; return m; }, {});
};
