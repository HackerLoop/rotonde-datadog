'use strict';

let StatsD = require('node-dogstatsd').StatsD;
let newClient = require('rotonde-client/src/Client');

let client = newClient('ws://rotonde:4224/');
let datadog = new StatsD();

client.addLocalDefinition('action', 'DATADOG_TIMING', [
  {
    name: 'stat',
    type: 'string',
  },
  {
    name: 'time',
    type: 'number',
    unit: 'ms',
  },
  {
    name: 'sample_rate',
    type: 'number',
  },
  {
    name: 'tags',
    type: 'array of strings',
  },
]);

client.addLocalDefinition('action', 'DATADOG_INCREMENT', [
  {
    name: 'stats',
    type: 'object',
  },
  {
    name: 'sample_rate',
    type: 'number',
  },
  {
    name: 'tags',
    type: 'array of strings',
  },
]);

client.addLocalDefinition('action', 'DATADOG_INCREMENTBY', [
  {
    name: 'stats',
    type: 'object',
  },
  {
    name: 'value',
    type: 'number',
  },
  {
    name: 'tags',
    type: 'array of strings',
  },
]);

client.addLocalDefinition('action', 'DATADOG_DECREMENT', [
  {
    name: 'stats',
    type: 'object',
  },
  {
    name: 'sample_rate',
    type: 'number',
  },
  {
    name: 'tags',
    type: 'array of strings',
  },
]);

client.addLocalDefinition('action', 'DATADOG_DECREMENTBY', [
  {
    name: 'stats',
    type: 'object',
  },
  {
    name: 'value',
    type: 'number',
  },
  {
    name: 'tags',
    type: 'array of strings',
  },
]);

client.addLocalDefinition('action', 'DATADOG_GAUGE', [
  {
    name: 'stat',
    type: 'string',
  },
  {
    name: 'value',
    type: 'number',
  },
  {
    name: 'sample_rate',
    type: 'number',
  },
  {
    name: 'tags',
    type: 'array of strings',
  },
]);

client.addLocalDefinition('action', 'DATADOG_HISTOGRAM', [
  {
    name: 'stat',
    type: 'string',
  },
  {
    name: 'value',
    type: 'number',
  },
  {
    name: 'sample_rate',
    type: 'number',
  },
  {
    name: 'tags',
    type: 'array of strings',
  },
]);

client.addLocalDefinition('action', 'DATADOG_SET', [
  {
    name: 'stat',
    type: 'string',
  },
  {
    name: 'value',
    type: 'number',
  },
  {
    name: 'sample_rate',
    type: 'number',
  },
  {
    name: 'tags',
    type: 'array of strings',
  },
]);

client.actionHandlers.attach('DATADOG_TIMING', (action) => {
  let { stat, time, sample_rate, tags } = action.data;
  datadog.timing(stat, time, sample_rate, tags);
});

client.actionHandlers.attach('DATADOG_INCREMENT', (action) => {
  let { stats, sample_rate, tags } = action.data;
  datadog.increment(stats, sample_rate, tags);
});

client.actionHandlers.attach('DATADOG_INCREMENTBY', (action) => {
  let { stats, value, tags } = action.data;
  datadog.incrementBy(stats, value, tags);
});

client.actionHandlers.attach('DATADOG_DECREMENT', (action) => {
  let { stats, sample_rate, tags } = action.data;
  datadog.decrement(stats, sample_rate, tags);
});

client.actionHandlers.attach('DATADOG_DECREMENTBY', (action) => {
  let { stats, value, tags } = action.data;
  datadog.decrementBy(stats, sample_rate, tags);
});

client.actionHandlers.attach('DATADOG_GAUGE', (action) => {
  let { stat, value, sample_rate, tags } = action.data;
  datadog.gauge(stat, value, sample_rate, tags);
});

client.actionHandlers.attach('DATADOG_HISTOGRAM', (action) => {
  let { stat, value, sample_rate, tags } = action.data;
  datadog.histogram(stat, value, sample_rate, tags);
});

client.actionHandlers.attach('DATADOG_SET', (action) => {
  let { stat, value, sample_rate, tags } = action.data;
  datadog.histogram(stat, value, sample_rate, tags);
});

client.onReady(() => {
    console.log('connected to rotonde !!!');
});

client.connect();
