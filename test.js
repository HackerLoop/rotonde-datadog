'use strict';

let StatsD = require('@grove/dogstatsd');

let datadog = new StatsD();

datadog.sendEvent('Test', 'Test text', {type: 'error'});
