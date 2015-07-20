
class Events {

  constructor() {
    this.components = new Map();
  }

  attach(cid, component, store) {
    if (this.components.has(cid)){
      detach(cid);
    }

    var events = new Map();

    store.events.forEach(name => {

      var parts = name.split(':');
      var fName = 'on';

      parts.forEach(n => {
       fName += n.charAt(0).toUpperCase() + n.slice(1);
      });

      if (component[fName]){
        var event = component[fName].bind(component);

        events.set(name, event);
        store.on(name, event);
      }
    });

    this.components.set(cid, { events, store });
  }

  detach(cid){
    var comp = this.components.get(cid);

    if (!comp){
      return;
    }

    comp.store.events.forEach(name => {
      if (comp.events.has(name)){
        comp.store.removeListener(name, comp.events.get(name));
        comp.events.delete(name);
      }
    });

    this.components.delete(cid);
  }

}

export default new Events();