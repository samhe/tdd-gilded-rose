'use strict';
import _ from 'lodash';

export class Item {
  constructor(category, name, sellIn, quality) {
    this.category = category; //normal, age, sulfuras, backstage
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class BaseCal {
  calc(item, delta) {
    return item.quality + delta;
  }
  postCalc(result) {
    return (_.isNumber(result) && result > 0) ? result : 0;
  }
  getResult(item, delta) {
    let quality = this.calc(item, delta);
    return this.postCalc(quality);
  }
  updateItem(item, delta) {
    item.sellIn -= delta;
    item.quality = this.getResult(item, delta);
  }
}

export class NormalCal extends BaseCal {
  calc(item, delta) {
    return item.quality + delta;
  }
}
