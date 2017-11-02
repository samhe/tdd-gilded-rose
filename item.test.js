'use strict';
import {Item, BaseCal, NormalCal} from './item';
import _ from 'lodash';
import should from 'should';

let i1 = new Item('Normal', 'n1', 10, 50);
let c = new BaseCal();
should.equal(c.getResult(i1, -1), 49);
should.equal(c.getResult(i1, -2), 48);
should.equal(c.getResult(i1, -10), 40);
should.equal(c.getResult(i1, -50), 0);
should.equal(c.getResult(i1, -60), 0);

let c1 = new NormalCal();
should.equal(c1.getResult(i1, 8), 58);
should.equal(c1.getResult(i1, 10), 60);
should.equal(c1.getResult(i1, 20), 70);
