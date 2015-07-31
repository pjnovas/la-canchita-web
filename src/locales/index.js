
let locales = {
  esAR: require("./es-AR")
};

export default class Locale {

  constructor(lan) {
    lan = lan || "es-AR";
    let l = lan.replace("-", "");
    this.strings = locales[l];
  }

};