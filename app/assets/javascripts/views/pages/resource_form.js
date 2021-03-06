"use strict";

var CategorySelector = require('../categories/category_selector'),
    CompoundView = require('../../support/compound_view'),
    ControlBar = require('../control_bars/control_bar'),
    ErrorDisplay = require('../../mixins/error_display'),
    Resource = require('../../models/resource'),
    ResourceTypes = require('../../collections/resource_types');

var ResourceForm = module.exports = CompoundView.extend({
  bindings: {
    '#js-resource-form-title': 'title',
    '#js-resource-form-url': 'url',
    '#js-resource-form-desc': 'description',
    'select#js-resource-form-type': {
      observe: 'resource_type_id',
      selectOptions: {
        collection: 'this.resourceTypes',
        labelPath: 'name',
        valuePath: 'id'
      }
    }
  },
  className: 'row',
  errorsElement: '#js-resource-form-errors',
  events: {
    'submit form': 'submit'
  },
  template: HandlebarsTemplates['pages/resource_form'],

  initialize: function(options) {
    this.model = new Resource();
    this.addSubview('#js-control-bar', new ControlBar({hideShareLink: true}));
    this.categorySelector = new CategorySelector();
    this.addSubview('#js-category-selector', this.categorySelector);
    this.resourceTypes = new ResourceTypes();
    this.resourceTypes.fetch({success: this.render.bind(this)});
  },

  render: function() {
    CompoundView.prototype.render.apply(this);
    this.stickit();
    return this;
  },

  submit: function(event) {
    this.hideErrors();
    event.preventDefault();
    var categoryId = this.categorySelector.currentCategory;
    this.model.save(
      {category_id: categoryId},
      {
        success: handleSuccess.bind(this),
        error: this.showResponseErrors.bind(this)
      }
    );
  }
});

_.extend(ResourceForm.prototype, ErrorDisplay);

var handleSuccess = function(model) {
  Backbone.history.navigate(
    'resources/' + model.get('slug'), {trigger: true}
  );
};
