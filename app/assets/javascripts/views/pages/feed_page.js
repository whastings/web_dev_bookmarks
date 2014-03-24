"use strict";

var CompoundView = require('../../support/compound_view'),
    ControlBar = require('../control_bars/control_bar'),
    FeedItems = require('../../collections/feed_items'),
    ResourcesList = require('../resources/resources_list');

var FeedPage = module.exports = CompoundView.extend({
  className: 'row',
  template: HandlebarsTemplates['pages/feed_page'],

  initialize: function() {
    this.addSubview('#js-control-bar', new ControlBar());
    this.collection = new FeedItems();
    this.collection.fetch();
    this.resourcesList = new ResourcesList({collection: this.collection});
    this.addSubview('#js-resource-feed', this.resourcesList);
  }
});
