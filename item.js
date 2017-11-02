'use strict';

export class Item {
  constructor(category, name, sellIn, quality) {
    this.category = category; //normal, age, sulfuras, backstage
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class BaseCal {
  getQuality(item, s1) {
    return 10;
  }
}