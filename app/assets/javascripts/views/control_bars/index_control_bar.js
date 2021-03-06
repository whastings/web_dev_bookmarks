"use strict";

var CategorySubscription = require('../../models/category_subscription'),
    CompoundView = require('../../support/compound_view'),
    ControlBar = require('./control_bar'),
    Favorite = require('../../models/favorite'),
    notice = require('../../support/notice'),
    utils = require('../../support/utils');

var IndexControlBar = module.exports = CompoundView.extend({
  className: 'index-control-bar',
  events: {
    'drop #js-category-drop': 'subscribeToCategory'
  },
  template: HandlebarsTemplates['control_bars/index_control_bar'],

  initialize: function() {
    this.addSubview(
      '#js-basic-control-bar',
      new ControlBar({hideBackLink: true})
    );
  },

  onShow: function() {
    this.$('.drop-region').droppable({tolerance: 'touch', hoverClass: 'hover'});
    var $categoryDrop = this.$('#js-category-drop');
    fixDropLeft($categoryDrop);
  },

  subscribeToCategory: function(event, ui) {
    if (!utils.isSignedIn()) {
      return notice.requestSignIn('subscribe to categories');
    }
    var categoryId = ui.draggable.data('id');
    var subscription = new CategorySubscription({category_id: categoryId});
    subscription.save(
      {},
      {success: notice.display.bind(null, 'Subscription saved!')}
    );
  }
});

var fixDropLeft = function($categoryDrop) {
  var $container = $categoryDrop.parent(),
      containerWidth = $container.width(),
      dropWidth = Math.ceil(containerWidth * 0.9),
      leftOffset = Math.floor((containerWidth - dropWidth) / 2) + 15;
  $categoryDrop.css('width', dropWidth);
  $categoryDrop.css('left', leftOffset);
};
