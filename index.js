'use strict';

let StatsD = require('@grove/dogstatsd');
let newClient = require('rotonde-client/node/rotonde-client');

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
    name: 'stat',
    type: 'string',
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
    name: 'stat',
    type: 'string',
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
    name: 'stat',
    type: 'string',
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
    name: 'stat',
    type: 'string',
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

client.addLocalDefinition('action', 'DATADOG_EVENT', [
  {
    name: 'title',
    type: 'string',
  },
  {
    name: 'text',
    type: 'string',
  },
  {
    name: 'options',
    type: 'object',
    units: 'https://github.com/grovelabs/node-dogstatsd#sendeventtitle-text-options',
  },
]);

client.actionHandlers.attach('DATADOG_TIMING', (action) => {
  let { stat, time, sample_rate, tags } = action.data;
  datadog.timing(stat, time, {sampleRate: sample_rate, tags,});
});

client.actionHandlers.attach('DATADOG_INCREMENT', (action) => {
  let { stat, value, tags } = action.data;
  datadog.increment(stat, value, {tags,});
});

client.actionHandlers.attach('DATADOG_DECREMENT', (action) => {
  let { stat, value, tags } = action.data;
  datadog.decrement(stat, value, {tags,});
});

client.actionHandlers.attach('DATADOG_GAUGE', (action) => {
  let { stat, value, sample_rate, tags } = action.data;
  datadog.gauge(stat, value, {sampleRate: sample_rate, tags,});
});

client.actionHandlers.attach('DATADOG_HISTOGRAM', (action) => {
  let { stat, value, sample_rate, tags } = action.data;
  datadog.histogram(stat, value, {sampleRate: sample_rate, tags,});
});

client.actionHandlers.attach('DATADOG_SET', (action) => {
  let { stat, value, sample_rate, tags } = action.data;
  datadog.histogram(stat, value, {sampleRate: sample_rate, tags,});
});

client.actionHandlers.attach('DATADOG_EVENT', (action) => {
  let { title, text, options } = action.data;
  datadog.sendEvent(title, text, options);
});

client.onReady(() => {
    console.log('connected to rotonde !!!');
});

client.connect();
