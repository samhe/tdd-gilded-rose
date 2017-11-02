'use strict';
import {Item, BaseCal} from './item';
import _ from 'lodash';

let i1 = new Item('Normal', 'n1', 10, 50);

let c = new BaseCal();
c.getQuality(i1, 9);
