(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Application,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Application = (function(superClass) {
  extend(Application, superClass);

  function Application() {
    return Application.__super__.constructor.apply(this, arguments);
  }

  Application.prototype.radioEvents = {
    'app redirect': 'redirectTo'
  };

  Application.prototype.initialize = function() {
    Backbone.Radio.channel('header').trigger('reset');
    Backbone.Radio.channel('breadcrumb').trigger('ready');
    Backbone.Radio.channel('overlay').trigger('ready');
    this.onReady();
    return true;
  };

  Application.prototype.onReady = function() {
    return Backbone.history.start();
  };

  Application.prototype.redirectTo = function(route) {
    window.location = route;
    return true;
  };

  return Application;

})(Marionette.Service);

module.exports = Application;



},{}],2:[function(require,module,exports){
var ApplicationLayout,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApplicationLayout = (function(superClass) {
  extend(ApplicationLayout, superClass);

  function ApplicationLayout() {
    return ApplicationLayout.__super__.constructor.apply(this, arguments);
  }

  ApplicationLayout.prototype.el = 'body';

  ApplicationLayout.prototype.template = false;

  ApplicationLayout.prototype.regions = {
    header: '[app-region=header]',
    sidebar: '[app-region=sidebar]',
    breadcrumb: '[app-region=breadcrumb]',
    overlay: '[app-region=overlay]',
    flash: '[app-region=flash]',
    main: '[app-region=main]'
  };

  return ApplicationLayout;

})(Marionette.LayoutView);

module.exports = new ApplicationLayout().render();



},{}],3:[function(require,module,exports){
module.exports = {
  SubmitButton: require('hn_behaviors/lib/submitButton'),
  Flashes: require('hn_behaviors/lib/flashes'),
  ModelEvents: require('hn_behaviors/lib/modelEvents'),
  BindInputs: require('hn_behaviors/lib/bindInputs'),
  Tooltips: require('hn_behaviors/lib/tooltips'),
  SelectableChild: require('./selectableChild'),
  KeyboardControls: require('./keyboardControls'),
  SortableChild: require('./sortableChild'),
  SortableList: require('./sortableList')
};



},{"./keyboardControls":4,"./selectableChild":5,"./sortableChild":6,"./sortableList":7,"hn_behaviors/lib/bindInputs":57,"hn_behaviors/lib/flashes":58,"hn_behaviors/lib/modelEvents":59,"hn_behaviors/lib/submitButton":60,"hn_behaviors/lib/tooltips":61}],4:[function(require,module,exports){
var KeyboardControls,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

KeyboardControls = (function(superClass) {
  extend(KeyboardControls, superClass);

  function KeyboardControls() {
    this.keyAction = bind(this.keyAction, this);
    return KeyboardControls.__super__.constructor.apply(this, arguments);
  }

  KeyboardControls.prototype.initialize = function() {
    return this.keyEvents = this.options.keyEvents;
  };

  KeyboardControls.prototype.onRender = function() {
    return this.addEventListener();
  };

  KeyboardControls.prototype.onBeforeDestroy = function() {
    return this.removeEventListener();
  };

  KeyboardControls.prototype.keyAction = function(e) {
    return this.view.triggerMethod('key:action', e);
    return e.preventDefault();
  };

  KeyboardControls.prototype.addEventListener = function() {
    $(document).on('keydown', this.keyAction);
    return $(document).on('keyup', this.keyAction);
  };

  KeyboardControls.prototype.removeEventListener = function() {
    $(document).off('keydown', this.keyAction);
    return $(document).off('keyup', this.keyAction);
  };

  return KeyboardControls;

})(Marionette.Behavior);

module.exports = KeyboardControls;



},{}],5:[function(require,module,exports){
var SelectableChild,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SelectableChild = (function(superClass) {
  extend(SelectableChild, superClass);

  function SelectableChild() {
    return SelectableChild.__super__.constructor.apply(this, arguments);
  }

  SelectableChild.prototype.css = {
    active: 'active'
  };

  SelectableChild.prototype.events = {
    'click': 'onClick'
  };

  SelectableChild.prototype.modelEvents = {
    'selected': 'onClick'
  };

  SelectableChild.prototype.onRender = function() {
    if (!this.options.setActive) {

    }
  };

  SelectableChild.prototype.onClick = function(e) {
    if (this.view.onClick) {
      return this.view.onClick(e);
    }
    if (!this.options.doubleClick) {
      if (e != null) {
        e.preventDefault();
      }
    }
    if (this.options.deselect && this.$el.hasClass(this.css.active)) {
      this.$el.removeClass(this.css.active);
      return this.view.triggerMethod('deselected');
    }
    if (this.$el.hasClass(this.css.active)) {
      return;
    }
    if (e != null) {
      e.preventDefault();
    }
    this.view.triggerMethod('selected');
    return this.$el.addClass(this.css.active).siblings().removeClass(this.css.active);
  };

  return SelectableChild;

})(Marionette.Behavior);

module.exports = SelectableChild;



},{}],6:[function(require,module,exports){
var SortableChild,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SortableChild = (function(superClass) {
  extend(SortableChild, superClass);

  function SortableChild() {
    return SortableChild.__super__.constructor.apply(this, arguments);
  }

  SortableChild.prototype.events = {
    'sorted': 'onSorted'
  };

  SortableChild.prototype.onSorted = function(e, order) {
    return this.view.model.set('order', order);
  };

  return SortableChild;

})(Mn.Behavior);

module.exports = SortableChild;



},{}],7:[function(require,module,exports){
var SortableList,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SortableList = (function(superClass) {
  extend(SortableList, superClass);

  function SortableList() {
    this.reorderCollection = bind(this.reorderCollection, this);
    return SortableList.__super__.constructor.apply(this, arguments);
  }

  SortableList.prototype.initialize = function() {
    return this.view.reorderCollection = (function(_this) {
      return function() {
        return _this.reorderCollection();
      };
    })(this);
  };

  SortableList.prototype.onRender = function() {
    return Sortable.create(this.view.el, {
      handle: this.options.handle || '.sortable',
      animation: this.options.animation || 250,
      onEnd: (function(_this) {
        return function(e) {
          return _this.reorderCollection();
        };
      })(this)
    });
  };

  SortableList.prototype.reorderCollection = function() {
    var el, i, len, order, ref, results;
    order = 1;
    ref = this.view.$el[0].children;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      el = ref[i];
      $(el).trigger('sorted', order);
      results.push(order++);
    }
    return results;
  };

  return SortableList;

})(Mn.Behavior);

module.exports = SortableList;



},{}],8:[function(require,module,exports){
var HeaderService, LayoutView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LayoutView = require('./views/layout');

HeaderService = (function(superClass) {
  extend(HeaderService, superClass);

  function HeaderService() {
    return HeaderService.__super__.constructor.apply(this, arguments);
  }

  HeaderService.prototype.initialize = function() {
    return this.container = this.options.container;
  };

  HeaderService.prototype.radioEvents = {
    'header reset': 'reset'
  };

  HeaderService.prototype.reset = function() {
    return this.container.show(new LayoutView());
  };

  return HeaderService;

})(Marionette.Service);

module.exports = HeaderService;



},{"./views/layout":9}],9:[function(require,module,exports){
var HeaderView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

HeaderView = (function(superClass) {
  extend(HeaderView, superClass);

  function HeaderView() {
    return HeaderView.__super__.constructor.apply(this, arguments);
  }

  HeaderView.prototype.template = require('./templates/header');

  HeaderView.prototype.className = 'navbar fixed-top navbar-dark bg-dark';

  HeaderView.prototype.tagName = 'nav';

  return HeaderView;

})(Marionette.LayoutView);

module.exports = HeaderView;



},{"./templates/header":10}],10:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"navbar-brand title\">ASTROKEY</div>");;return buf.join("");
};
},{"jade/runtime":73}],11:[function(require,module,exports){
var crossDomainRoot, proxiedSync;

crossDomainRoot = 'http://192.168.33.33:3000';

proxiedSync = Backbone.sync;

Backbone.sync = (function(_this) {
  return function(method, model, options) {
    if (options == null) {
      options = {};
    }
    if (!options.url) {
      options.url = crossDomainRoot + _.result(model, 'url') || urlError();
    } else if (options.url.substring(0, 6) !== crossDomainRoot.substring(0, 6)) {
      options.url = crossDomainRoot + options.url;
    }
    if (!options.crossDomain) {
      options.crossDomain = true;
    }
    if (!options.xhrFields) {
      options.xhrFields = {
        withCredentials: true
      };
    }
    return proxiedSync(method, model, options);
  };
})(this);



},{}],12:[function(require,module,exports){
require('./window');

require('./jwt');

require('./cors');

require('./marionette');



},{"./cors":11,"./jwt":13,"./marionette":14,"./window":15}],13:[function(require,module,exports){
$.ajaxSetup({
  beforeSend: function(xhr) {
    var token;
    token = localStorage.getItem('token');
    if (token) {
      xhr.setRequestHeader('Authorization', 'JWT ' + token);
    }
  }
});



},{}],14:[function(require,module,exports){
Marionette.Behaviors.behaviorsLookup = function() {
  return require('../behaviors');
};



},{"../behaviors":3}],15:[function(require,module,exports){
window.Radio = Backbone.Radio;



},{}],16:[function(require,module,exports){
var App, AppLayout, FlashComponent, HeaderComponent, MainModule, OverlayComponent;

require('./config');

App = require('./app');

AppLayout = require('./application/views/layout');

require('hn_entities/lib/config');

HeaderComponent = require('./components/header/component');

OverlayComponent = require('hn_overlay/lib/component');

FlashComponent = require('hn_flash/lib/component');

new HeaderComponent({
  container: AppLayout.header
});

new OverlayComponent({
  container: AppLayout.overlay
});

new FlashComponent({
  container: AppLayout.flash
});

require('./modules/usb/service');

require('./modules/key/factory');

require('./modules/macro/factory');

MainModule = require('./modules/main/router');

new MainModule({
  container: AppLayout.main
});

$(document).on('ready', (function(_this) {
  return function() {
    return new App();
  };
})(this));



},{"./app":1,"./application/views/layout":2,"./components/header/component":8,"./config":12,"./modules/key/factory":18,"./modules/macro/factory":26,"./modules/main/router":53,"./modules/usb/service":54,"hn_entities/lib/config":62,"hn_flash/lib/component":65,"hn_overlay/lib/component":70}],17:[function(require,module,exports){
var KeyCollection, KeyModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

KeyModel = (function(superClass) {
  extend(KeyModel, superClass);

  function KeyModel() {
    return KeyModel.__super__.constructor.apply(this, arguments);
  }

  KeyModel.prototype.defaults = {};

  return KeyModel;

})(Backbone.RelationalModel);

KeyCollection = (function(superClass) {
  extend(KeyCollection, superClass);

  function KeyCollection() {
    return KeyCollection.__super__.constructor.apply(this, arguments);
  }

  KeyCollection.prototype.model = KeyModel;

  KeyCollection.prototype.comparator = 'order';

  return KeyCollection;

})(Backbone.Collection);

module.exports = {
  Model: KeyModel,
  Collection: KeyCollection
};



},{}],18:[function(require,module,exports){
var Entities, KeyData, KeyFactory,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Entities = require('./entities');

KeyData = require('./keys');

KeyFactory = (function(superClass) {
  extend(KeyFactory, superClass);

  function KeyFactory() {
    return KeyFactory.__super__.constructor.apply(this, arguments);
  }

  KeyFactory.prototype.radioRequests = {
    'key model': 'getModel',
    'key collection': 'getCollection'
  };

  KeyFactory.prototype.initialize = function() {
    return this.cachedCollection = new Entities.Collection(KeyData, {
      parse: true
    });
  };

  KeyFactory.prototype.getModel = function(id) {
    return this.cachedCollection.get(id);
  };

  KeyFactory.prototype.getCollection = function() {
    return this.cachedCollection;
  };

  return KeyFactory;

})(Marionette.Service);

module.exports = new KeyFactory();



},{"./entities":17,"./keys":19}],19:[function(require,module,exports){
module.exports = [
  {
    row: 'r4',
    key: '`',
    shift: '~',
    keycode: 192
  }, {
    row: 'r4',
    key: '1',
    shift: '!',
    keycode: 49
  }, {
    row: 'r4',
    key: '2',
    shift: '@',
    keycode: 50
  }, {
    row: 'r4',
    key: '3',
    shift: '#',
    keycode: 51
  }, {
    row: 'r4',
    key: '4',
    shift: '$',
    keycode: 52
  }, {
    row: 'r4',
    key: '5',
    shift: '%',
    keycode: 53
  }, {
    row: 'r4',
    key: '6',
    shift: '^',
    keycode: 54
  }, {
    row: 'r4',
    key: '7',
    shift: '&',
    keycode: 55
  }, {
    row: 'r4',
    key: '8',
    shift: '*',
    keycode: 56
  }, {
    row: 'r4',
    key: '9',
    shift: '(',
    keycode: 57
  }, {
    row: 'r4',
    key: '0',
    shift: ')',
    keycode: 48
  }, {
    row: 'r4',
    key: '-',
    shift: '_',
    keycode: 189
  }, {
    row: 'r4',
    key: '=',
    shift: '+',
    keycode: 187
  }, {
    row: 'r4',
    key: 'BACKSPACE',
    keycode: 8,
    css: 'w2_0'
  }, {
    row: 'r3',
    key: 'TAB',
    keycode: 9,
    css: 'w1_5',
    special: true
  }, {
    row: 'r3',
    key: 'Q',
    keycode: 81
  }, {
    row: 'r3',
    key: 'W',
    keycode: 87
  }, {
    row: 'r3',
    key: 'E',
    keycode: 69
  }, {
    row: 'r3',
    key: 'R',
    keycode: 82
  }, {
    row: 'r3',
    key: 'T',
    keycode: 84
  }, {
    row: 'r3',
    key: 'Y',
    keycode: 89
  }, {
    row: 'r3',
    key: 'U',
    keycode: 85
  }, {
    row: 'r3',
    key: 'I',
    keycode: 73
  }, {
    row: 'r3',
    key: 'O',
    keycode: 79
  }, {
    row: 'r3',
    key: 'P',
    keycode: 80
  }, {
    row: 'r3',
    key: '[',
    shift: '{',
    keycode: 219
  }, {
    row: 'r3',
    key: ']',
    shift: '}',
    keycode: 221
  }, {
    row: 'r3',
    key: '\\',
    shift: '|',
    keycode: 220,
    css: 'w1_5'
  }, {
    row: 'r2',
    key: 'CAPS',
    css: 'w1_75',
    keycode: 20,
    special: true
  }, {
    row: 'r2',
    key: 'A',
    keycode: 65
  }, {
    row: 'r2',
    key: 'S',
    keycode: 83
  }, {
    row: 'r2',
    key: 'D',
    keycode: 68
  }, {
    row: 'r2',
    key: 'F',
    keycode: 70
  }, {
    row: 'r2',
    key: 'G',
    keycode: 71
  }, {
    row: 'r2',
    key: 'H',
    keycode: 72
  }, {
    row: 'r2',
    key: 'J',
    keycode: 74
  }, {
    row: 'r2',
    key: 'K',
    keycode: 75
  }, {
    row: 'r2',
    key: 'L',
    keycode: 76
  }, {
    row: 'r2',
    key: ';',
    shift: ':',
    keycode: 186
  }, {
    row: 'r2',
    key: "'",
    shift: '"',
    keycode: 222
  }, {
    row: 'r2',
    key: 'RETURN',
    css: 'w2_25',
    keycode: 13,
    special: true
  }, {
    row: 'r1',
    key: 'SHIFT',
    css: 'w2_25',
    keycode: 16,
    special: true
  }, {
    row: 'r1',
    key: 'Z',
    keycode: 90
  }, {
    row: 'r1',
    key: 'X',
    keycode: 88
  }, {
    row: 'r1',
    key: 'C',
    keycode: 67
  }, {
    row: 'r1',
    key: 'V',
    keycode: 86
  }, {
    row: 'r1',
    key: 'B',
    keycode: 66
  }, {
    row: 'r1',
    key: 'N',
    keycode: 78
  }, {
    row: 'r1',
    key: 'M',
    keycode: 77
  }, {
    row: 'r1',
    key: ',',
    shift: '<',
    keycode: 188
  }, {
    row: 'r1',
    key: '.',
    shift: '>',
    keycode: 190
  }, {
    row: 'r1',
    key: '/',
    shift: '?',
    keycode: 191
  }, {
    row: 'r1',
    key: 'SHIFT',
    css: 'w2_75',
    keycode: 16,
    special: true
  }, {
    row: 'r0',
    key: 'CTRL',
    css: 'w1_25',
    keycode: 17,
    special: true
  }, {
    row: 'r0',
    key: 'M',
    css: 'w1_25',
    keycode: 91,
    special: true
  }, {
    row: 'r0',
    key: 'ALT',
    css: 'w1_25',
    keycode: 18,
    special: true
  }, {
    row: 'r0',
    key: 'SPACE',
    css: 'space',
    keycode: 32,
    special: true
  }, {
    row: 'r0',
    key: 'CTRL',
    css: 'w1_25',
    keycode: 17,
    special: true
  }, {
    row: 'r0',
    key: 'M',
    css: 'w1_25',
    keycode: 18,
    special: true
  }, {
    row: 'r0',
    key: 'P',
    css: 'w1_25',
    keycode: 93,
    special: true
  }, {
    row: 'r0',
    key: 'ALT',
    css: 'w1_25',
    keycode: 18,
    special: true
  }, {
    row: 'num_r0',
    key: '0',
    keycode: 49,
    css: 'w2_25'
  }, {
    row: 'num_r0',
    key: '.',
    keycode: 49
  }, {
    row: 'num_r1',
    key: '1',
    keycode: 49
  }, {
    row: 'num_r1',
    key: '2',
    keycode: 50
  }, {
    row: 'num_r1',
    key: '3',
    keycode: 51
  }, {
    row: 'num_r2',
    key: '4',
    keycode: 52
  }, {
    row: 'num_r2',
    key: '5',
    keycode: 53
  }, {
    row: 'num_r2',
    key: '6',
    keycode: 54
  }, {
    row: 'num_r3',
    key: '7',
    keycode: 55
  }, {
    row: 'num_r3',
    key: '8',
    keycode: 56
  }, {
    row: 'num_r3',
    key: '9',
    keycode: 57
  }, {
    row: 'num_r4',
    key: 'CLEAR',
    keycode: 48
  }, {
    row: 'num_r4',
    key: '/',
    keycode: 189
  }, {
    row: 'num_r4',
    key: '*',
    keycode: 187
  }, {
    row: 'num_col',
    key: '-',
    keycode: 48
  }, {
    row: 'num_col',
    key: '+',
    keycode: 189,
    css: 'h2_0'
  }, {
    row: 'num_col',
    key: 'ENTER',
    keycode: 187,
    css: 'h2_0'
  }, {
    row: 'func_r0',
    key: 'F1',
    keycode: 49
  }, {
    row: 'func_r0',
    key: 'F2',
    keycode: 50
  }, {
    row: 'func_r0',
    key: 'F3',
    keycode: 51
  }, {
    row: 'func_r0',
    key: 'F4',
    keycode: 52
  }, {
    row: 'func_r0',
    key: 'F5',
    keycode: 53
  }, {
    row: 'func_r0',
    key: 'F6',
    keycode: 54
  }, {
    row: 'func_r0',
    key: 'F7',
    keycode: 55
  }, {
    row: 'func_r0',
    key: 'F8',
    keycode: 56
  }, {
    row: 'func_r0',
    key: 'F9',
    keycode: 57
  }, {
    row: 'func_r0',
    key: 'F10',
    keycode: 57
  }, {
    row: 'func_r0',
    key: 'F11',
    keycode: 57
  }, {
    row: 'func_r0',
    key: 'F12',
    keycode: 57
  }, {
    row: 'func_r0',
    key: 'F13',
    keycode: 57
  }, {
    row: 'media_r0',
    key: 'F13',
    keycode: 57,
    icon: 'fa-step-backward'
  }, {
    row: 'media_r0',
    key: 'F13',
    keycode: 57,
    icon: 'fa-play'
  }, {
    row: 'media_r0',
    key: 'F13',
    keycode: 57,
    icon: 'fa-step-forward'
  }, {
    row: 'media_r0',
    key: 'F13',
    keycode: 57,
    icon: 'fa-volume-off'
  }, {
    row: 'media_r0',
    key: 'F13',
    keycode: 57,
    icon: 'fa-volume-down'
  }, {
    row: 'media_r0',
    key: 'F13',
    keycode: 57,
    icon: 'fa-volume-up'
  }, {
    row: 'nav_r0',
    key: 'PGUP',
    keycode: 57
  }, {
    row: 'nav_r0',
    key: 'PGDN',
    keycode: 57
  }, {
    row: 'nav_r0',
    key: 'END',
    keycode: 57
  }, {
    row: 'nav_r0',
    key: 'HOME',
    keycode: 57
  }, {
    row: 'nav_r0',
    key: 'LEFT-ARROW',
    keycode: 57,
    icon: 'fa-chevron-left'
  }, {
    row: 'nav_r0',
    key: 'UP-ARROW',
    keycode: 57,
    icon: 'fa-chevron-up'
  }, {
    row: 'nav_r0',
    key: 'DOWN-ARROW',
    keycode: 57,
    icon: 'fa-chevron-down'
  }, {
    row: 'nav_r0',
    key: 'RIGHT-ARROW',
    keycode: 57,
    icon: 'fa-chevron-right'
  }, {
    row: 'nav_r0',
    key: 'INS',
    keycode: 57
  }, {
    row: 'nav_r0',
    key: 'DEL',
    keycode: 57
  }
];



},{}],20:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (r0) {
jade_mixins["keyboardRow"] = jade_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"keyboard--row w-100\">");
block && block();
buf.push("</div>");
};
jade_mixins["keyboardKey"] = jade_interp = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<button" + (jade.attr("data-keycode", opts.keycode, true, false)) + " data-click=\"key\"" + (jade.attr("data-key", opts.key, true, false)) + (jade.cls(['btn','btn-outline-light','keyboard--key',opts.css], [null,null,null,true])) + ">");
if ( opts.icon)
{
buf.push("<i" + (jade.cls(['fa','fa-fw',opts.icon], [null,null,true])) + "></i>");
}
else
{
if ( opts.key && opts.shift)
{
buf.push("<div class=\"shift\">" + (jade.escape(null == (jade_interp = opts.shift) ? "" : jade_interp)) + "</div><div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.key) ? "" : jade_interp)) + "</div>");
}
else
{
buf.push("<div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.key) ? "" : jade_interp)) + "</div>");
}
}
buf.push("</button>");
};
buf.push("<div class=\"keyboard--body\">");
jade_mixins["keyboardRow"].call({
block: function(){
// iterate r0
;(function(){
  var $$obj = r0;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  }
}).call(this);

}
});
buf.push("</div>");}.call(this,"r0" in locals_for_with?locals_for_with.r0:typeof r0!=="undefined"?r0:undefined));;return buf.join("");
};
},{"jade/runtime":73}],21:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (r0, r1, r2, r3, r4) {
jade_mixins["keyboardRow"] = jade_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"keyboard--row w-100\">");
block && block();
buf.push("</div>");
};
jade_mixins["keyboardKey"] = jade_interp = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<button" + (jade.attr("data-keycode", opts.keycode, true, false)) + " data-click=\"key\"" + (jade.attr("data-key", opts.key, true, false)) + (jade.cls(['btn','btn-outline-light','keyboard--key',opts.css], [null,null,null,true])) + ">");
if ( opts.icon)
{
buf.push("<i" + (jade.cls(['fa','fa-fw',opts.icon], [null,null,true])) + "></i>");
}
else
{
if ( opts.key && opts.shift)
{
buf.push("<div class=\"shift\">" + (jade.escape(null == (jade_interp = opts.shift) ? "" : jade_interp)) + "</div><div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.key) ? "" : jade_interp)) + "</div>");
}
else
{
buf.push("<div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.key) ? "" : jade_interp)) + "</div>");
}
}
buf.push("</button>");
};
buf.push("<div class=\"keyboard--body\">");
jade_mixins["keyboardRow"].call({
block: function(){
// iterate r4
;(function(){
  var $$obj = r4;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  }
}).call(this);

}
});
jade_mixins["keyboardRow"].call({
block: function(){
// iterate r3
;(function(){
  var $$obj = r3;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  }
}).call(this);

}
});
jade_mixins["keyboardRow"].call({
block: function(){
// iterate r2
;(function(){
  var $$obj = r2;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  }
}).call(this);

}
});
jade_mixins["keyboardRow"].call({
block: function(){
// iterate r1
;(function(){
  var $$obj = r1;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  }
}).call(this);

}
});
jade_mixins["keyboardRow"].call({
block: function(){
// iterate r0
;(function(){
  var $$obj = r0;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  }
}).call(this);

}
});
buf.push("</div>");}.call(this,"r0" in locals_for_with?locals_for_with.r0:typeof r0!=="undefined"?r0:undefined,"r1" in locals_for_with?locals_for_with.r1:typeof r1!=="undefined"?r1:undefined,"r2" in locals_for_with?locals_for_with.r2:typeof r2!=="undefined"?r2:undefined,"r3" in locals_for_with?locals_for_with.r3:typeof r3!=="undefined"?r3:undefined,"r4" in locals_for_with?locals_for_with.r4:typeof r4!=="undefined"?r4:undefined));;return buf.join("");
};
},{"jade/runtime":73}],22:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (col, r0, r1, r2, r3, r4, undefined) {
jade_mixins["keyboardRow"] = jade_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"keyboard--row w-100\">");
block && block();
buf.push("</div>");
};
jade_mixins["keyboardKey"] = jade_interp = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<button" + (jade.attr("data-keycode", opts.keycode, true, false)) + " data-click=\"key\"" + (jade.attr("data-key", opts.key, true, false)) + (jade.cls(['btn','btn-outline-light','keyboard--key',opts.css], [null,null,null,true])) + ">");
if ( opts.icon)
{
buf.push("<i" + (jade.cls(['fa','fa-fw',opts.icon], [null,null,true])) + "></i>");
}
else
{
if ( opts.key && opts.shift)
{
buf.push("<div class=\"shift\">" + (jade.escape(null == (jade_interp = opts.shift) ? "" : jade_interp)) + "</div><div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.key) ? "" : jade_interp)) + "</div>");
}
else
{
buf.push("<div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.key) ? "" : jade_interp)) + "</div>");
}
}
buf.push("</button>");
};
buf.push("<div class=\"keyboard--body\"><div class=\"d-flex flex-row\"><div class=\"d-flex flex-column\">");
jade_mixins["keyboardRow"].call({
block: function(){
// iterate r4
;(function(){
  var $$obj = r4;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  }
}).call(this);

}
});
jade_mixins["keyboardRow"].call({
block: function(){
// iterate r3
;(function(){
  var $$obj = r3;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  }
}).call(this);

}
});
jade_mixins["keyboardRow"].call({
block: function(){
// iterate r2
;(function(){
  var $$obj = r2;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  }
}).call(this);

}
});
jade_mixins["keyboardRow"].call({
block: function(){
// iterate r1
;(function(){
  var $$obj = r1;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  }
}).call(this);

}
});
jade_mixins["keyboardRow"].call({
block: function(){
// iterate r0
;(function(){
  var $$obj = r0;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  }
}).call(this);

}
});
buf.push("</div><div class=\"d-flex flex-column\">");
// iterate col
;(function(){
  var $$obj = col;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

jade_mixins["keyboardKey"](key);
    }

  }
}).call(this);

buf.push("</div></div></div>");}.call(this,"col" in locals_for_with?locals_for_with.col:typeof col!=="undefined"?col:undefined,"r0" in locals_for_with?locals_for_with.r0:typeof r0!=="undefined"?r0:undefined,"r1" in locals_for_with?locals_for_with.r1:typeof r1!=="undefined"?r1:undefined,"r2" in locals_for_with?locals_for_with.r2:typeof r2!=="undefined"?r2:undefined,"r3" in locals_for_with?locals_for_with.r3:typeof r3!=="undefined"?r3:undefined,"r4" in locals_for_with?locals_for_with.r4:typeof r4!=="undefined"?r4:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":73}],23:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (navItems, undefined) {
buf.push("<div class=\"col-lg-12\"><div class=\"row\"><div class=\"col-lg-12 d-flex justify-content-center\">");
// iterate navItems
;(function(){
  var $$obj = navItems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var navItem = $$obj[$index];

buf.push("<button style=\"flex-grow:1;\"" + (jade.attr("data-trigger", navItem.trigger, true, false)) + " class=\"d-flex btn btn-outline-secondary btn-sm justify-content-center mx-3\">" + (jade.escape(null == (jade_interp = navItem.text) ? "" : jade_interp)) + "</button>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var navItem = $$obj[$index];

buf.push("<button style=\"flex-grow:1;\"" + (jade.attr("data-trigger", navItem.trigger, true, false)) + " class=\"d-flex btn btn-outline-secondary btn-sm justify-content-center mx-3\">" + (jade.escape(null == (jade_interp = navItem.text) ? "" : jade_interp)) + "</button>");
    }

  }
}).call(this);

buf.push("</div></div><div class=\"row\"><div class=\"col-lg-12\"><hr/></div></div><div class=\"row\"><div data-region=\"content\" class=\"col-lg-12\"></div></div></div>");}.call(this,"navItems" in locals_for_with?locals_for_with.navItems:typeof navItems!=="undefined"?navItems:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":73}],24:[function(require,module,exports){
module.exports = [
  {
    "row": "r2",
    "key": "A",
    "keycode": 65,
    "order": 1,
    "position": 0
  }, {
    "row": "r2",
    "key": "S",
    "keycode": 83,
    "order": 2,
    "position": 0
  }, {
    "row": "r3",
    "key": "T",
    "keycode": 84,
    "order": 3,
    "position": 0
  }, {
    "row": "r3",
    "key": "R",
    "keycode": 82,
    "order": 4,
    "position": 0
  }, {
    "row": "r3",
    "key": "O",
    "keycode": 79,
    "order": 5,
    "position": 0
  }, {
    "row": "r2",
    "key": "K",
    "keycode": 75,
    "order": 6,
    "position": 0
  }, {
    "row": "r3",
    "key": "E",
    "keycode": 69,
    "order": 7,
    "position": 0
  }, {
    "row": "r3",
    "key": "Y",
    "keycode": 89,
    "order": 8,
    "position": 0
  }
];



},{}],25:[function(require,module,exports){
var MacroCollection, MacroModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MacroModel = (function(superClass) {
  extend(MacroModel, superClass);

  function MacroModel() {
    return MacroModel.__super__.constructor.apply(this, arguments);
  }

  MacroModel.prototype.defaults = {
    order: 0,
    position: 0
  };

  return MacroModel;

})(Backbone.RelationalModel);

MacroCollection = (function(superClass) {
  extend(MacroCollection, superClass);

  function MacroCollection() {
    return MacroCollection.__super__.constructor.apply(this, arguments);
  }

  MacroCollection.prototype.model = MacroModel;

  MacroCollection.prototype.comparator = 'order';

  return MacroCollection;

})(Backbone.Collection);

module.exports = {
  Model: MacroModel,
  Collection: MacroCollection
};



},{}],26:[function(require,module,exports){
var DefaultMacros, Entities, MacroFactory,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Entities = require('./entities');

DefaultMacros = require('./default_macros');

MacroFactory = (function(superClass) {
  extend(MacroFactory, superClass);

  function MacroFactory() {
    return MacroFactory.__super__.constructor.apply(this, arguments);
  }

  MacroFactory.prototype.radioRequests = {
    'macro collection': 'getCollection'
  };

  MacroFactory.prototype.initialize = function() {
    return this.cachedCollection = new Entities.Collection(DefaultMacros, {
      parse: true
    });
  };

  MacroFactory.prototype.getCollection = function() {
    return this.cachedCollection;
  };

  return MacroFactory;

})(Marionette.Service);

module.exports = new MacroFactory();



},{"./default_macros":24,"./entities":25}],27:[function(require,module,exports){
var DashboardRoute, LayoutView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LayoutView = require('./views/layout');

DashboardRoute = (function(superClass) {
  extend(DashboardRoute, superClass);

  function DashboardRoute() {
    return DashboardRoute.__super__.constructor.apply(this, arguments);
  }

  DashboardRoute.prototype.title = 'AstroKey Web';

  DashboardRoute.prototype.breadcrumbs = [
    {
      text: 'Device'
    }
  ];

  DashboardRoute.prototype.fetch = function() {
    this.keys = Radio.channel('key').request('collection');
    this.macros = Radio.channel('macro').request('collection');
    return this.deviceModel = Radio.channel('device').request('model', 'device_1');
  };

  DashboardRoute.prototype.render = function() {
    console.log(this.deviceModel);
    return this.container.show(new LayoutView({
      model: this.deviceModel,
      keys: this.keys,
      macros: this.macros
    }));
  };

  return DashboardRoute;

})(require('hn_routing/lib/route'));

module.exports = DashboardRoute;



},{"./views/layout":32,"hn_routing/lib/route":71}],28:[function(require,module,exports){
var DeviceLayout, DeviceStatusView, KeySelector,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

KeySelector = require('./keySelector');

DeviceStatusView = (function(superClass) {
  extend(DeviceStatusView, superClass);

  function DeviceStatusView() {
    return DeviceStatusView.__super__.constructor.apply(this, arguments);
  }

  DeviceStatusView.prototype.template = require('./templates/device_status');

  DeviceStatusView.prototype.className = 'row';

  DeviceStatusView.prototype.templateHelpers = function() {
    var status;
    status = {
      text: 'Not Connected',
      css: 'badge-default'
    };
    if (this.model.get('status_code') === 1) {
      status = {
        text: 'Connected',
        css: 'badge-success'
      };
    }
    return {
      status: status
    };
  };

  return DeviceStatusView;

})(Marionette.LayoutView);

DeviceLayout = (function(superClass) {
  extend(DeviceLayout, superClass);

  function DeviceLayout() {
    return DeviceLayout.__super__.constructor.apply(this, arguments);
  }

  DeviceLayout.prototype.className = 'row';

  DeviceLayout.prototype.template = require('./templates/device_layout');

  DeviceLayout.prototype.regions = {
    keysRegion: '[data-region=keys]'
  };

  DeviceLayout.prototype.onRender = function() {
    var keySelector;
    keySelector = new KeySelector({
      collection: this.model.get('keys')
    });
    keySelector.on('childview:selected', (function(_this) {
      return function(view) {
        return _this.trigger('key:selected', view.model);
      };
    })(this));
    keySelector.on('childview:deselected', (function(_this) {
      return function(view) {
        return _this.trigger('key:deselected');
      };
    })(this));
    return this.keysRegion.show(keySelector);
  };

  return DeviceLayout;

})(Mn.LayoutView);

module.exports = DeviceLayout;



},{"./keySelector":31,"./templates/device_layout":35,"./templates/device_status":36}],29:[function(require,module,exports){
var EditorSelector, SimpleNav,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SimpleNav = require('lib/views/simple_nav');

EditorSelector = (function(superClass) {
  extend(EditorSelector, superClass);

  function EditorSelector() {
    return EditorSelector.__super__.constructor.apply(this, arguments);
  }

  EditorSelector.prototype.className = 'row h-100';

  EditorSelector.prototype.template = require('./templates/editor_selector');

  EditorSelector.prototype.navItems = [
    {
      icon: 'fa-keyboard-o',
      text: 'Macro',
      trigger: 'macro'
    }, {
      icon: 'fa-file-text-o',
      text: 'Text',
      trigger: 'text'
    }
  ];

  EditorSelector.prototype.onRender = function() {
    var configModel, trigger;
    configModel = this.model.get('config');
    trigger = configModel.get('type');
    return this.$("[data-trigger=" + trigger + "]").addClass('active');
  };

  EditorSelector.prototype.onNavigateMacro = function() {
    return this.trigger('show:macro:editor');
  };

  EditorSelector.prototype.onNavigateText = function() {
    return this.trigger('show:text:editor');
  };

  EditorSelector.prototype.onNavigateKey = function() {
    return this.trigger('show:key:editor');
  };

  return EditorSelector;

})(SimpleNav);

module.exports = EditorSelector;



},{"./templates/editor_selector":37,"lib/views/simple_nav":81}],30:[function(require,module,exports){
var EditorWrapper, MacroEditor, TextEditor,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextEditor = require('./textEditor');

MacroEditor = require('./macroEditor');

EditorWrapper = (function(superClass) {
  extend(EditorWrapper, superClass);

  function EditorWrapper() {
    return EditorWrapper.__super__.constructor.apply(this, arguments);
  }

  EditorWrapper.prototype.template = require('./templates/editor_wrapper');

  EditorWrapper.prototype.className = 'row';

  EditorWrapper.prototype.regions = {
    contentRegion: '[data-region=content]'
  };

  EditorWrapper.prototype.events = {
    'click [data-click=save]': 'onSave',
    'click [data-click=cancel]': 'onCancel'
  };

  EditorWrapper.prototype.editors = {
    macro: MacroEditor,
    text: TextEditor,
    key: MacroEditor
  };

  EditorWrapper.prototype.onRender = function() {
    var EditorView, config, keys, macros;
    EditorView = this.editors[this.options.editor];
    config = this.model.get('config');
    this.cachedConfig = config.toJSON();
    macros = config.get('macros');
    keys = Radio.channel('key').request('collection');
    return this.contentRegion.show(new EditorView({
      model: config,
      keys: keys,
      macros: macros
    }));
  };

  EditorWrapper.prototype.onSave = function() {
    var data;
    data = Backbone.Syphon.serialize(this);
    if (data.type !== 'macro') {
      data.macros = [];
    }
    if (data.type !== 'text') {
      data.text_value = '';
    }
    this.model.get('config').set(data);
    this.model.trigger('config:updated');
    return this.trigger('save');
  };

  EditorWrapper.prototype.onCancel = function() {
    this.model.get('config').set(this.cachedConfig);
    return this.trigger('cancel');
  };

  return EditorWrapper;

})(Marionette.LayoutView);

module.exports = EditorWrapper;



},{"./macroEditor":33,"./templates/editor_wrapper":38,"./textEditor":46}],31:[function(require,module,exports){
var KeyChild, KeySelector,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

KeyChild = (function(superClass) {
  extend(KeyChild, superClass);

  function KeyChild() {
    return KeyChild.__super__.constructor.apply(this, arguments);
  }

  KeyChild.prototype.tagName = 'li';

  KeyChild.prototype.className = 'btn btn-outline-light key--child d-flex justify-content-center align-items-center mx-2';

  KeyChild.prototype.template = require('./templates/key_child');

  KeyChild.prototype.behaviors = {
    SelectableChild: {
      deselect: true
    }
  };

  KeyChild.prototype.modelEvents = {
    'config:updated': 'onModelChange'
  };

  KeyChild.prototype.onModelChange = function() {
    return this.render();
  };

  KeyChild.prototype.templateHelpers = function() {
    var config;
    config = this.model.get('config');
    if (config.get('type') === 'macro') {
      return {
        label: 'Macro'
      };
    }
    if (config.get('type') === 'text') {
      return {
        label: 'Text'
      };
    }
    if (config.get('type') === 'key') {
      return {
        label: 'Key'
      };
    }
  };

  return KeyChild;

})(Mn.LayoutView);

KeySelector = (function(superClass) {
  extend(KeySelector, superClass);

  function KeySelector() {
    return KeySelector.__super__.constructor.apply(this, arguments);
  }

  KeySelector.prototype.tagName = 'ul';

  KeySelector.prototype.className = 'list-unstyled key--list px-4 py-3 my-2 d-flex justify-content-between align-items-center flex-row';

  KeySelector.prototype.childView = KeyChild;

  return KeySelector;

})(Mn.CollectionView);

module.exports = KeySelector;



},{"./templates/key_child":40}],32:[function(require,module,exports){
var DeviceLayout, EditorSelector, EditorWrapper, HelpView, LayoutView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

DeviceLayout = require('./deviceLayout');

EditorSelector = require('./editorSelector');

EditorWrapper = require('./editorWrapper');

HelpView = (function(superClass) {
  extend(HelpView, superClass);

  function HelpView() {
    return HelpView.__super__.constructor.apply(this, arguments);
  }

  HelpView.prototype.template = require('./templates/help_view');

  HelpView.prototype.className = 'row';

  return HelpView;

})(Marionette.LayoutView);

LayoutView = (function(superClass) {
  extend(LayoutView, superClass);

  function LayoutView() {
    return LayoutView.__super__.constructor.apply(this, arguments);
  }

  LayoutView.prototype.template = require('./templates/layout');

  LayoutView.prototype.className = 'container-fluid d-flex flex-column w-100 h-100 justify-content-center align-items-center device--layout';

  LayoutView.prototype.regions = {
    deviceRegion: '[data-region=device]',
    selectorRegion: '[data-region=selector]',
    editorRegion: '[data-region=editor]'
  };

  LayoutView.prototype.onRender = function() {
    var deviceView;
    this.showHelpView();
    deviceView = new DeviceLayout({
      model: this.model
    });
    deviceView.on('key:selected', (function(_this) {
      return function(keyModel) {
        return _this.showEditorSelector(keyModel);
      };
    })(this));
    deviceView.on('key:deselected', (function(_this) {
      return function() {
        return _this.showHelpView();
      };
    })(this));
    return this.deviceRegion.show(deviceView);
  };

  LayoutView.prototype.showHelpView = function() {
    return this.selectorRegion.show(new HelpView());
  };

  LayoutView.prototype.showEditorSelector = function(keyModel) {
    var editorSelector;
    editorSelector = new EditorSelector({
      model: keyModel
    });
    editorSelector.on('show:macro:editor', (function(_this) {
      return function() {
        return _this.showEditorView(keyModel, 'macro');
      };
    })(this));
    editorSelector.on('show:text:editor', (function(_this) {
      return function() {
        return _this.showEditorView(keyModel, 'text');
      };
    })(this));
    editorSelector.on('show:key:editor', (function(_this) {
      return function() {
        return _this.showEditorView(keyModel, 'key');
      };
    })(this));
    return this.selectorRegion.show(editorSelector);
  };

  LayoutView.prototype.showEditorView = function(keyModel, editor) {
    var editorWrapper;
    this.$el.addClass('active');
    editorWrapper = new EditorWrapper({
      model: keyModel,
      keys: this.options.keys,
      macros: this.options.macros,
      editor: editor
    });
    editorWrapper.on('cancel', (function(_this) {
      return function() {
        return _this.$el.removeClass('active');
      };
    })(this));
    editorWrapper.on('save', (function(_this) {
      return function() {
        console.log('SAVE KEY MODEL SETTINGS HERE');
        return _this.$el.removeClass('active');
      };
    })(this));
    return this.editorRegion.show(editorWrapper);
  };

  return LayoutView;

})(Marionette.LayoutView);

module.exports = LayoutView;



},{"./deviceLayout":28,"./editorSelector":29,"./editorWrapper":30,"./templates/help_view":39,"./templates/layout":41}],33:[function(require,module,exports){
var KeyboardSelector, MacroEditor, MacroList,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

KeyboardSelector = require('lib/views/keyboard_selector');

MacroList = require('./macroList');

MacroEditor = (function(superClass) {
  extend(MacroEditor, superClass);

  function MacroEditor() {
    return MacroEditor.__super__.constructor.apply(this, arguments);
  }

  MacroEditor.prototype.template = require('./templates/macro_editor');

  MacroEditor.prototype.className = 'row h-100';

  MacroEditor.prototype.regions = {
    macroRegion: '[data-region=macro]',
    controlsRegion: '[data-region=controls]'
  };

  MacroEditor.prototype.onRender = function() {
    var keyboardView;
    this.macroRegion.show(new MacroList({
      collection: this.options.macros
    }));
    keyboardView = new KeyboardSelector({
      model: this.model,
      keys: this.options.keys
    });
    keyboardView.on('key:selected', (function(_this) {
      return function(key) {
        key = _.clone(key);
        key.order = _this.options.macros.length + 1;
        return _this.options.macros.add(key);
      };
    })(this));
    return this.controlsRegion.show(keyboardView);
  };

  return MacroEditor;

})(Marionette.LayoutView);

module.exports = MacroEditor;



},{"./macroList":34,"./templates/macro_editor":43,"lib/views/keyboard_selector":80}],34:[function(require,module,exports){
var MacroChild, MacroEmpty, MacroList,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

MacroChild = (function(superClass) {
  extend(MacroChild, superClass);

  function MacroChild() {
    return MacroChild.__super__.constructor.apply(this, arguments);
  }

  MacroChild.prototype.tagName = 'li';

  MacroChild.prototype.className = 'macro--child flex-column justify-content-center align-items-center my-2';

  MacroChild.prototype.template = require('./templates/macro_child');

  MacroChild.prototype.behaviors = {
    SortableChild: {}
  };

  MacroChild.prototype.modelEvents = {
    'change:position': 'render'
  };

  MacroChild.prototype.events = {
    'drag': 'onDrag',
    'dragstart': 'onDragStart',
    'mouseover .key': 'onMouseOver',
    'mouseout .key': 'onMouseOut',
    'click .key': 'removeMacro',
    'click [data-position]:not(.active)': 'onPositionClick'
  };

  MacroChild.prototype.onMouseOver = function() {
    return this.$el.addClass('hovered');
  };

  MacroChild.prototype.onMouseOut = function() {
    return this.$el.removeClass('hovered');
  };

  MacroChild.prototype.onDragStart = function() {
    return this.$el.addClass('drag-start');
  };

  MacroChild.prototype.onDrag = function() {
    this.$el.removeClass('drag-start hovered');
    return this.$el.siblings('.macro--child').removeClass('drag-start hovered');
  };

  MacroChild.prototype.removeMacro = function() {
    return this.model.collection.remove(this.model);
  };

  MacroChild.prototype.onPositionClick = function(e) {
    var el, new_position, position;
    el = $(e.currentTarget);
    position = el.data('position');
    if (position === -1) {
      new_position = 1;
    }
    if (position === 0) {
      new_position = -1;
    }
    if (position === 1) {
      new_position = 0;
    }
    return this.model.set('position', new_position);
  };

  MacroChild.prototype.templateHelpers = function() {
    var active_position, position, positions;
    positions = [
      {
        position: -1,
        css: 'fa-long-arrow-down'
      }, {
        position: 0,
        css: 'fa-arrows-v'
      }, {
        position: 1,
        css: 'fa-long-arrow-up'
      }
    ];
    position = this.model.get('position');
    active_position = _.findWhere(positions, {
      position: position
    });
    return {
      active_position: active_position
    };
  };

  return MacroChild;

})(Mn.LayoutView);

MacroEmpty = (function(superClass) {
  extend(MacroEmpty, superClass);

  function MacroEmpty() {
    return MacroEmpty.__super__.constructor.apply(this, arguments);
  }

  MacroEmpty.prototype.tagName = 'li';

  MacroEmpty.prototype.className = 'macro--child empty flex-column justify-content-center align-items-center my-2';

  MacroEmpty.prototype.template = require('./templates/macro_empty');

  return MacroEmpty;

})(Mn.LayoutView);

MacroList = (function(superClass) {
  extend(MacroList, superClass);

  function MacroList() {
    this.reorderCollection = bind(this.reorderCollection, this);
    return MacroList.__super__.constructor.apply(this, arguments);
  }

  MacroList.prototype.tagName = 'ul';

  MacroList.prototype.className = 'list-unstyled macro--list px-4 my-2 d-flex justify-content-center align-items-center flex-row flex-wrap';

  MacroList.prototype.childView = MacroChild;

  MacroList.prototype.emptyView = MacroEmpty;

  MacroList.prototype.onRender = function() {
    this.collection.sort();
    return Sortable.create(this.el, {
      animation: 0,
      handle: '.key',
      ghostClass: 'ghost',
      chosenClass: 'chosen',
      dragClass: 'drag',
      fallbackTolerance: 100,
      onEnd: (function(_this) {
        return function(e) {
          return _this.reorderCollection();
        };
      })(this)
    });
  };

  MacroList.prototype.reorderCollection = function() {
    var el, i, len, order, ref;
    order = 1;
    ref = this.el.children;
    for (i = 0, len = ref.length; i < len; i++) {
      el = ref[i];
      $(el).trigger('sorted', order);
      order++;
    }
    return this.render();
  };

  return MacroList;

})(Mn.CollectionView);

module.exports = MacroList;



},{"./templates/macro_child":42,"./templates/macro_empty":44}],35:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div data-region=\"keys\" class=\"col-lg-12 d-flex justify-content-center align-items-center\"></div>");;return buf.join("");
};
},{"jade/runtime":73}],36:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (label) {
buf.push("<div class=\"col-lg-12\"><div class=\"row d-flex align-items-center\"><div class=\"col-lg-10\"><p class=\"lead mb-0\">" + (jade.escape(null == (jade_interp = label) ? "" : jade_interp)) + "</p></div><div class=\"col-lg-2 text-right text-muted\"><i class=\"fa fa-fw fa-pencil\"></i></div></div></div>");}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return buf.join("");
};
},{"jade/runtime":73}],37:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (navItems, undefined) {
buf.push("<div class=\"col-lg-12\"><div class=\"row\"><div class=\"col-lg-12 d-flex justify-content-center\">");
// iterate navItems
;(function(){
  var $$obj = navItems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var navItem = $$obj[$index];

buf.push("<button style=\"flex-grow:1;\"" + (jade.attr("data-trigger", navItem.trigger, true, false)) + " class=\"d-flex btn btn-outline-secondary justify-content-center mx-3\">" + (jade.escape(null == (jade_interp = navItem.text) ? "" : jade_interp)) + "</button>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var navItem = $$obj[$index];

buf.push("<button style=\"flex-grow:1;\"" + (jade.attr("data-trigger", navItem.trigger, true, false)) + " class=\"d-flex btn btn-outline-secondary justify-content-center mx-3\">" + (jade.escape(null == (jade_interp = navItem.text) ? "" : jade_interp)) + "</button>");
    }

  }
}).call(this);

buf.push("</div></div></div>");}.call(this,"navItems" in locals_for_with?locals_for_with.navItems:typeof navItems!=="undefined"?navItems:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":73}],38:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"col-lg-12\"><button data-click=\"save\" class=\"btn btn-sm btn-outline-success mx-2\"><i class=\"fa fa-fw fa-2x mx-4 fa-save\"></i></button><button data-click=\"cancel\" class=\"btn btn-sm btn-outline-secondary mx-2\"><i class=\"fa fa-fw fa-2x mx-4 fa-times-circle\"></i></button></div><div class=\"col-lg-12\"><hr/></div><div data-region=\"content\" class=\"col-lg-12\"></div>");;return buf.join("");
};
},{"jade/runtime":73}],39:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"col-lg-12 d-flex flex-row align-items-center justify-content-center\"><i class=\"d-flex fa fa-fw fa-2x fa-question-circle-o mr-1\"></i><p style=\"letter-spacing: 0.25rem; font-weight: 200;\" class=\"d-flex lead m-0\">Click a key to edit</p></div>");;return buf.join("");
};
},{"jade/runtime":73}],40:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (label) {
buf.push("<span>" + (jade.escape(null == (jade_interp = label) ? "" : jade_interp)) + "</span>");}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return buf.join("");
};
},{"jade/runtime":73}],41:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row h-100 w-100 editor--overlay\"><div data-region=\"editor\" class=\"col-lg-12 pt-2\"></div></div><div class=\"row device--overlay\"><div data-region=\"device\" class=\"col-lg-12\"></div><div data-region=\"selector\" class=\"col-lg-12 pt-5\"></div></div>");;return buf.join("");
};
},{"jade/runtime":73}],42:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (active_position, key, shift, special) {
jade_mixins["positionSelect"] = jade_interp = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<span data-toggle=\"tooltip\"" + (jade.attr("title", opts.tooltip, true, false)) + " data-placement=\"bottom\"" + (jade.cls(['fa-stack','fa-lg','position--select',`position_${opts.position}`], [null,null,null,true])) + "><i class=\"fa fa-circle-thin fa-stack-2x\"></i><i" + (jade.attr("data-position", opts.position, true, false)) + (jade.cls(['fa','fa-stack-1x',opts.css], [null,null,true])) + "></i></span>");
};
buf.push("<div" + (jade.cls(['key','d-flex',typeof special === "undefined" ? "" : "special"], [null,null,true])) + "><div class=\"inner content\">");
if ( key && shift)
{
buf.push("<div class=\"shift\">" + (jade.escape(null == (jade_interp = shift) ? "" : jade_interp)) + "</div>" + (jade.escape(null == (jade_interp = key) ? "" : jade_interp)));
}
else
{
buf.push("<div class=\"plain\">" + (jade.escape(null == (jade_interp = key) ? "" : jade_interp)) + "</div>");
}
buf.push("</div><div class=\"inner hover\"><i class=\"fa fa-fw fa-lg fa-times\"></i></div></div><div class=\"position mt-2\">");
jade_mixins["positionSelect"](active_position);
buf.push("</div>");}.call(this,"active_position" in locals_for_with?locals_for_with.active_position:typeof active_position!=="undefined"?active_position:undefined,"key" in locals_for_with?locals_for_with.key:typeof key!=="undefined"?key:undefined,"shift" in locals_for_with?locals_for_with.shift:typeof shift!=="undefined"?shift:undefined,"special" in locals_for_with?locals_for_with.special:typeof special!=="undefined"?special:undefined));;return buf.join("");
};
},{"jade/runtime":73}],43:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<input type=\"hidden\" name=\"type\" value=\"macro\" readonly=\"readonly\"/><div data-region=\"macro\" class=\"col-lg-12\"></div><div class=\"col-lg-12\"><hr/></div><div data-region=\"controls\" class=\"col-lg-12\"></div>");;return buf.join("");
};
},{"jade/runtime":73}],44:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<p class=\"lead\"><div class=\"fa fa-2x fa-inverse fa-question-circle-o\"></div>Click the keys below to start building a macro</p>");;return buf.join("");
};
},{"jade/runtime":73}],45:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

jade_mixins["formGroup"] = jade_interp = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<fieldset" + (jade.cls(['form-group',opts.formGroupCss], [null,true])) + ">");
if ( opts.label)
{
buf.push("<label class=\"form-control-label\">" + (jade.escape(null == (jade_interp = opts.label) ? "" : jade_interp)) + "</label>");
}
block && block();
buf.push("</fieldset>");
};
buf.push("");
jade_mixins["formInput"] = jade_interp = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
jade_mixins["formGroup"].call({
block: function(){
buf.push("<input" + (jade.attrs(jade.merge([{"placeholder": jade.escape(opts.placeholder),"name": jade.escape(opts.name),"type": jade.escape(opts.type),"class": "form-control"},attributes]), false)) + "/>");
}
}, opts);
};
buf.push("<div class=\"col-lg-12\"><input type=\"hidden\" name=\"type\" value=\"text\" readonly=\"readonly\"/>");
jade_mixins["formInput"].call({
attributes: jade.merge([{ class: 'form-control-lg' }])
}, { name: 'text_value', type: 'text', placeholder: 'Enter some text here...' });
buf.push("</div>");;return buf.join("");
};
},{"jade/runtime":73}],46:[function(require,module,exports){
var TextEditor,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextEditor = (function(superClass) {
  extend(TextEditor, superClass);

  function TextEditor() {
    return TextEditor.__super__.constructor.apply(this, arguments);
  }

  TextEditor.prototype.className = 'row';

  TextEditor.prototype.template = require('./templates/text_editor');

  TextEditor.prototype.onRender = function() {
    return Backbone.Syphon.deserialize(this, {
      type: 'text',
      text_value: this.model.get('text_value')
    });
  };

  return TextEditor;

})(Marionette.LayoutView);

module.exports = TextEditor;



},{"./templates/text_editor":45}],47:[function(require,module,exports){
module.exports = [
  {
    id: 'device_1',
    label: 'Alex\'s AstroKey',
    status_code: 1,
    keys: [
      {
        id: 'device_1_key_1',
        config: {
          type: 'macro',
          macros: [
            {
              "row": "r2",
              "key": "A",
              "keycode": 65,
              "order": 1,
              "position": 0
            }, {
              "row": "r2",
              "key": "S",
              "keycode": 83,
              "order": 2,
              "position": 0
            }, {
              "row": "r3",
              "key": "T",
              "keycode": 84,
              "order": 3,
              "position": 0
            }, {
              "row": "r3",
              "key": "R",
              "keycode": 82,
              "order": 4,
              "position": 0
            }, {
              "row": "r3",
              "key": "O",
              "keycode": 79,
              "order": 5,
              "position": 0
            }, {
              "row": "r2",
              "key": "K",
              "keycode": 75,
              "order": 6,
              "position": 0
            }, {
              "row": "r3",
              "key": "E",
              "keycode": 69,
              "order": 7,
              "position": 0
            }, {
              "row": "r3",
              "key": "Y",
              "keycode": 89,
              "order": 8,
              "position": 0
            }
          ]
        }
      }, {
        id: 'device_1_key_2',
        config: {
          type: 'text',
          text_value: 'Hello world!'
        }
      }, {
        id: 'device_1_key_3',
        config: {
          type: 'macro',
          macros: []
        }
      }, {
        id: 'device_1_key_4',
        config: {
          type: 'text',
          text_value: 'Hello, again'
        }
      }, {
        id: 'device_1_key_5',
        config: {
          type: 'macro',
          macros: []
        }
      }
    ]
  }
];



},{}],48:[function(require,module,exports){
var AstrokeyCollection, AstrokeyConfig, AstrokeyModel, DeviceCollection, DeviceModel, MacroEntities,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MacroEntities = require('../macro/entities');

AstrokeyConfig = (function(superClass) {
  extend(AstrokeyConfig, superClass);

  function AstrokeyConfig() {
    return AstrokeyConfig.__super__.constructor.apply(this, arguments);
  }

  AstrokeyConfig.prototype.defaults = {
    type: 'macro',
    macros: [],
    text_value: '',
    key_value: ''
  };

  AstrokeyConfig.prototype.relations = [
    {
      type: Backbone.HasMany,
      key: 'macros',
      relatedModel: MacroEntities.Model,
      collectionType: MacroEntities.Collection
    }
  ];

  return AstrokeyConfig;

})(Backbone.RelationalModel);

AstrokeyModel = (function(superClass) {
  extend(AstrokeyModel, superClass);

  function AstrokeyModel() {
    return AstrokeyModel.__super__.constructor.apply(this, arguments);
  }

  AstrokeyModel.prototype.defaults = {
    order: null,
    config: {}
  };

  AstrokeyModel.prototype.relations = [
    {
      type: Backbone.HasOne,
      key: 'config',
      relatedModel: AstrokeyConfig
    }
  ];

  return AstrokeyModel;

})(Backbone.RelationalModel);

AstrokeyCollection = (function(superClass) {
  extend(AstrokeyCollection, superClass);

  function AstrokeyCollection() {
    return AstrokeyCollection.__super__.constructor.apply(this, arguments);
  }

  AstrokeyCollection.prototype.model = AstrokeyModel;

  AstrokeyCollection.prototype.comparator = 'order';

  return AstrokeyCollection;

})(Backbone.Collection);

DeviceModel = (function(superClass) {
  extend(DeviceModel, superClass);

  function DeviceModel() {
    return DeviceModel.__super__.constructor.apply(this, arguments);
  }

  DeviceModel.prototype.relations = [
    {
      type: Backbone.HasMany,
      key: 'keys',
      relatedModel: AstrokeyModel,
      collectionType: AstrokeyCollection
    }
  ];

  return DeviceModel;

})(Backbone.RelationalModel);

DeviceCollection = (function(superClass) {
  extend(DeviceCollection, superClass);

  function DeviceCollection() {
    return DeviceCollection.__super__.constructor.apply(this, arguments);
  }

  DeviceCollection.prototype.model = DeviceModel;

  return DeviceCollection;

})(Backbone.Collection);

module.exports = {
  Model: DeviceModel,
  Collection: DeviceCollection
};



},{"../macro/entities":25}],49:[function(require,module,exports){
var DeviceData, DeviceFactory, Entities,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Entities = require('./entities');

DeviceData = require('./data');

DeviceFactory = (function(superClass) {
  extend(DeviceFactory, superClass);

  function DeviceFactory() {
    return DeviceFactory.__super__.constructor.apply(this, arguments);
  }

  DeviceFactory.prototype.radioRequests = {
    'device model': 'getModel',
    'device collection': 'getCollection'
  };

  DeviceFactory.prototype.initialize = function() {
    return this.cachedCollection = new Entities.Collection(DeviceData, {
      parse: true
    });
  };

  DeviceFactory.prototype.getModel = function(id) {
    return this.cachedCollection.get(id);
  };

  DeviceFactory.prototype.getCollection = function() {
    return this.cachedCollection;
  };

  return DeviceFactory;

})(Marionette.Service);

module.exports = new DeviceFactory();



},{"./data":47,"./entities":48}],50:[function(require,module,exports){
var HomeRoute, LayoutView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LayoutView = require('./views/layout');

HomeRoute = (function(superClass) {
  extend(HomeRoute, superClass);

  function HomeRoute() {
    return HomeRoute.__super__.constructor.apply(this, arguments);
  }

  HomeRoute.prototype.title = 'AstroKey Home';

  HomeRoute.prototype.breadcrumbs = [
    {
      text: 'Device'
    }
  ];

  HomeRoute.prototype.fetch = function() {
    return this.deviceModel = Radio.channel('device').request('model', 'device_1');
  };

  HomeRoute.prototype.render = function() {
    console.log(this.deviceModel);
    return this.container.show(new LayoutView({
      model: this.deviceModel
    }));
  };

  return HomeRoute;

})(require('hn_routing/lib/route'));

module.exports = HomeRoute;



},{"./views/layout":51,"hn_routing/lib/route":71}],51:[function(require,module,exports){
var HomeLayoutView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

HomeLayoutView = (function(superClass) {
  extend(HomeLayoutView, superClass);

  function HomeLayoutView() {
    return HomeLayoutView.__super__.constructor.apply(this, arguments);
  }

  HomeLayoutView.prototype.template = require('./templates/layout');

  HomeLayoutView.prototype.className = 'container-fluid h-100';

  return HomeLayoutView;

})(Marionette.LayoutView);

module.exports = HomeLayoutView;



},{"./templates/layout":52}],52:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row h-100\"><div class=\"col-lg-12 text-center\"><p class=\"lead\">AstroKey</p><hr/><p class=\"lead\">Connect an AstroKey device to get started</p><hr/><a href=\"#device\" class=\"btn btn-outline-primary\">DEVICE</a></div></div>");;return buf.join("");
};
},{"jade/runtime":73}],53:[function(require,module,exports){
var DashboardRoute, HomeRoute, MainRouter,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

require('./factory');

HomeRoute = require('./home/route');

DashboardRoute = require('./dashboard/route');

MainRouter = (function(superClass) {
  extend(MainRouter, superClass);

  function MainRouter() {
    return MainRouter.__super__.constructor.apply(this, arguments);
  }

  MainRouter.prototype.routes = {
    '(/)': 'home'
  };

  MainRouter.prototype.home = function() {
    return new DashboardRoute({
      container: this.container
    });
  };

  return MainRouter;

})(require('hn_routing/lib/router'));

module.exports = MainRouter;



},{"./dashboard/route":27,"./factory":49,"./home/route":50,"hn_routing/lib/router":72}],54:[function(require,module,exports){
var UsbService, requestDeviceFilters,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

requestDeviceFilters = [
  {
    vendorId: 0x10c4
  }
];

UsbService = (function(superClass) {
  extend(UsbService, superClass);

  function UsbService() {
    return UsbService.__super__.constructor.apply(this, arguments);
  }

  UsbService.prototype.radioRequests = {
    'usb devices': 'getDevices'
  };

  UsbService.prototype.getDevices = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return navigator.usb.requestDevice({
          filters: requestDeviceFilters
        }).then(function(device) {
          return navigator.usb.getDevices().then(function(d) {
            console.log(d);
            d = d[0];
            return d.open().then(function() {
              console.log('open');
              return d.selectConfiguration(1).then(function() {
                console.log('selectConfiguration');
                return window.d = d;
              });
            });
          });
        });
      };
    })(this));
  };

  return UsbService;

})(Marionette.Service);

module.exports = new UsbService();



},{}],55:[function(require,module,exports){

},{}],56:[function(require,module,exports){
var BindBase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BindBase = (function(superClass) {
  extend(BindBase, superClass);

  function BindBase() {
    return BindBase.__super__.constructor.apply(this, arguments);
  }

  BindBase.prototype.updateAttrs = function(e) {
    e.stopPropagation();
    return this.view.model.set(Backbone.Syphon.serialize(this));
  };

  return BindBase;

})(Marionette.Behavior);

module.exports = BindBase;



},{}],57:[function(require,module,exports){
var BindInputs,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BindInputs = (function(superClass) {
  extend(BindInputs, superClass);

  function BindInputs() {
    return BindInputs.__super__.constructor.apply(this, arguments);
  }

  BindInputs.prototype.events = {
    'input input': 'updateAttrs'
  };

  return BindInputs;

})(require('./bindBase'));

module.exports = BindInputs;



},{"./bindBase":56}],58:[function(require,module,exports){
var FlashesBehavior, _sendFlash,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_sendFlash = function(type, obj) {
  return Backbone.Radio.channel('flash').trigger(type, obj);
};

FlashesBehavior = (function(superClass) {
  extend(FlashesBehavior, superClass);

  function FlashesBehavior() {
    return FlashesBehavior.__super__.constructor.apply(this, arguments);
  }

  FlashesBehavior.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    this.view._flashes = this.options;
    this.view.flashError = this.flashError;
    return this.view.flashSuccess = this.flashSuccess;
  };

  FlashesBehavior.prototype.flashError = function(obj) {
    if (obj == null) {
      obj = {};
    }
    return _sendFlash('error', this._flashes['error'] || obj);
  };

  FlashesBehavior.prototype.flashSuccess = function(obj) {
    if (obj == null) {
      obj = {};
    }
    return _sendFlash('success', this._flashes['success'] || obj);
  };

  return FlashesBehavior;

})(Marionette.Behavior);

module.exports = FlashesBehavior;



},{}],59:[function(require,module,exports){
var ModelEventsBehavior,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModelEventsBehavior = (function(superClass) {
  extend(ModelEventsBehavior, superClass);

  function ModelEventsBehavior() {
    return ModelEventsBehavior.__super__.constructor.apply(this, arguments);
  }

  ModelEventsBehavior.prototype.modelEvents = {
    'request': 'onModelRequest',
    'sync': 'onModelSync',
    'error': 'onModelError'
  };

  ModelEventsBehavior.prototype.onModelRequest = function(model, status, options) {
    var base;
    return typeof (base = this.view).onRequest === "function" ? base.onRequest(model, status, options) : void 0;
  };

  ModelEventsBehavior.prototype.onModelSync = function(model, response, options) {
    var base;
    return typeof (base = this.view).onSync === "function" ? base.onSync(model, response, options) : void 0;
  };

  ModelEventsBehavior.prototype.onModelError = function(model, response, options) {
    var base;
    return typeof (base = this.view).onError === "function" ? base.onError(model, response, options) : void 0;
  };

  return ModelEventsBehavior;

})(Marionette.Behavior);

module.exports = ModelEventsBehavior;



},{}],60:[function(require,module,exports){
var SubmitButtonBehavior,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SubmitButtonBehavior = (function(superClass) {
  extend(SubmitButtonBehavior, superClass);

  function SubmitButtonBehavior() {
    return SubmitButtonBehavior.__super__.constructor.apply(this, arguments);
  }

  SubmitButtonBehavior.prototype.ui = {
    submit: '[data-click=submit]'
  };

  SubmitButtonBehavior.prototype.events = {
    'click @ui.submit:not(.disabled)': 'onSubmitClick'
  };

  SubmitButtonBehavior.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    this.view.disableSubmit = (function(_this) {
      return function() {
        return _this.disableSubmit();
      };
    })(this);
    return this.view.enableSubmit = (function(_this) {
      return function() {
        return _this.enableSubmit();
      };
    })(this);
  };

  SubmitButtonBehavior.prototype.onSubmitClick = function(e) {
    var base;
    return typeof (base = this.view).onSubmit === "function" ? base.onSubmit(e) : void 0;
  };

  SubmitButtonBehavior.prototype.disableSubmit = function() {
    return this.ui.submit.addClass('disabled');
  };

  SubmitButtonBehavior.prototype.enableSubmit = function() {
    return this.ui.submit.removeClass('disabled');
  };

  return SubmitButtonBehavior;

})(Marionette.Behavior);

module.exports = SubmitButtonBehavior;



},{}],61:[function(require,module,exports){
var TooltipBehavior,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TooltipBehavior = (function(superClass) {
  extend(TooltipBehavior, superClass);

  function TooltipBehavior() {
    return TooltipBehavior.__super__.constructor.apply(this, arguments);
  }

  TooltipBehavior.prototype.ui = {
    tooltips: '[data-toggle=tooltip]'
  };

  TooltipBehavior.prototype.initialize = function() {
    return this.view.clearTooltips = (function(_this) {
      return function() {
        return _this.clear();
      };
    })(this);
  };

  TooltipBehavior.prototype.clear = function() {
    this.ui.tooltips.tooltip('hide');
    return this.ui.tooltips.tooltip('dispose');
  };

  TooltipBehavior.prototype.onRender = function() {
    var ref;
    return (ref = this.ui.tooltips) != null ? ref.tooltip() : void 0;
  };

  TooltipBehavior.prototype.onBeforeDestroy = function() {
    return this.clear();
  };

  return TooltipBehavior;

})(Marionette.Behavior);

module.exports = TooltipBehavior;



},{}],62:[function(require,module,exports){
Marionette.Decorator = require('./decorator');

Marionette.View.prototype.serializeModel = function() {
  if (!this.model) {
    return {};
  } else if (this.model.decorator) {
    return this.model.decorator.decorate(this.model);
  }
  return _.clone(this.model.attributes);
};



},{"./decorator":63}],63:[function(require,module,exports){
var BaseDecorator;

BaseDecorator = (function() {
  function BaseDecorator() {}

  BaseDecorator.decorate = function(model) {
    var data, func, i, len, ref;
    data = _.clone(model.attributes);
    ref = _.functions(this.prototype);
    for (i = 0, len = ref.length; i < len; i++) {
      func = ref[i];
      if (func === 'constructor') {
        continue;
      }
      data[func] = this.prototype[func].apply(model);
    }
    return data;
  };

  return BaseDecorator;

})();

module.exports = BaseDecorator;



},{}],64:[function(require,module,exports){
var FlashCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FlashCollection = (function(superClass) {
  extend(FlashCollection, superClass);

  function FlashCollection() {
    return FlashCollection.__super__.constructor.apply(this, arguments);
  }

  FlashCollection.prototype.model = require('./model');

  return FlashCollection;

})(Backbone.Collection);

module.exports = FlashCollection;



},{"./model":66}],65:[function(require,module,exports){
var FlashComponent, FlashList,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

require('./service');

FlashList = require('./views/flashList');

FlashComponent = (function(superClass) {
  extend(FlashComponent, superClass);

  function FlashComponent() {
    this.showListView = bind(this.showListView, this);
    return FlashComponent.__super__.constructor.apply(this, arguments);
  }

  FlashComponent.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    this.container = options.container;
    return Backbone.Radio.channel('flash').request('collection').then((function(_this) {
      return function(collection) {
        _this.collection = collection;
        return _this.collection.on('update', _this.showListView, _this);
      };
    })(this));
  };

  FlashComponent.prototype.radioEvents = {
    'flash add': 'add',
    'flash reset': 'reset',
    'flash error': 'error',
    'flash warning': 'warning',
    'flash success': 'success'
  };

  FlashComponent.prototype.add = function(options) {
    if (options == null) {
      options = {};
    }
    return this.collection.add(options);
  };

  FlashComponent.prototype.reset = function() {
    return this.collection.reset();
  };

  FlashComponent.prototype.error = function(options) {
    if (options == null) {
      options = {};
    }
    return this.collection.add(_.extend(options, {
      context: 'danger'
    }));
  };

  FlashComponent.prototype.warning = function(options) {
    if (options == null) {
      options = {};
    }
    return this.collection.add(_.extend(options, {
      context: 'warning'
    }));
  };

  FlashComponent.prototype.success = function(options) {
    if (options == null) {
      options = {};
    }
    return this.collection.add(_.extend(options, {
      context: 'success'
    }));
  };

  FlashComponent.prototype.showListView = function() {
    if (!this.rendered) {
      this.container.show(new FlashList({
        collection: this.collection
      }));
      return this.rendered = true;
    }
  };

  return FlashComponent;

})(Backbone.Marionette.Service);

module.exports = FlashComponent;



},{"./service":67,"./views/flashList":68}],66:[function(require,module,exports){
var FlashModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FlashModel = (function(superClass) {
  extend(FlashModel, superClass);

  function FlashModel() {
    return FlashModel.__super__.constructor.apply(this, arguments);
  }

  FlashModel.prototype.defaults = {
    timeout: 5000,
    dismissible: true,
    context: 'info'
  };

  FlashModel.prototype.dismiss = function() {
    return this.collection.remove(this);
  };

  return FlashModel;

})(Backbone.Model);

module.exports = FlashModel;



},{}],67:[function(require,module,exports){
var FlashCollection, FlashService,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FlashCollection = require('./collection');

FlashService = (function(superClass) {
  extend(FlashService, superClass);

  function FlashService() {
    return FlashService.__super__.constructor.apply(this, arguments);
  }

  FlashService.prototype.radioRequests = {
    'flash collection': 'getCollection'
  };

  FlashService.prototype.alerts = null;

  FlashService.prototype.getCollection = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        _this.alerts || (_this.alerts = new FlashCollection());
        resolve(_this.alerts);
      };
    })(this));
  };

  return FlashService;

})(Backbone.Marionette.Service);

module.exports = new FlashService();



},{"./collection":64}],68:[function(require,module,exports){
var FlashChild, FlashList,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FlashChild = (function(superClass) {
  extend(FlashChild, superClass);

  function FlashChild() {
    this.dismiss = bind(this.dismiss, this);
    return FlashChild.__super__.constructor.apply(this, arguments);
  }

  FlashChild.prototype.className = 'row';

  FlashChild.prototype.template = require('./templates/flash_child');

  FlashChild.prototype.attributes = {
    style: 'display:none;'
  };

  FlashChild.prototype.ui = {
    close: '[data-click=dismiss]'
  };

  FlashChild.prototype.events = {
    'click @ui.close': 'dismiss'
  };

  FlashChild.prototype.onShow = function() {
    var timeout;
    timeout = this.model.get('timeout');
    return setTimeout(this.dismiss, timeout);
  };

  FlashChild.prototype.onAttach = function() {
    return this.$el.fadeIn();
  };

  FlashChild.prototype.remove = function() {
    return this.$el.slideToggle((function(_this) {
      return function() {
        return Marionette.LayoutView.prototype.remove.call(_this);
      };
    })(this));
  };

  FlashChild.prototype.dismiss = function() {
    var ref;
    return (ref = this.model.collection) != null ? ref.remove(this.model) : void 0;
  };

  return FlashChild;

})(Marionette.LayoutView);

FlashList = (function(superClass) {
  extend(FlashList, superClass);

  function FlashList() {
    return FlashList.__super__.constructor.apply(this, arguments);
  }

  FlashList.prototype.className = 'container-fluid';

  FlashList.prototype.childView = FlashChild;

  return FlashList;

})(Marionette.CollectionView);

module.exports = FlashList;



},{"./templates/flash_child":69}],69:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (context, dismissible, message, strong) {
buf.push("<div class=\"col-xs-12 text-center\"><div role=\"alert\"" + (jade.cls(['alert','alert-dismissible','fade','in',"alert-" + context], [null,null,null,null,true])) + ">");
if ( dismissible)
{
buf.push("<button type=\"button\" data-click=\"dismiss\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span><span class=\"sr-only\">Close</span></button>");
}
if ( strong)
{
buf.push("<strong>" + (jade.escape(null == (jade_interp = strong + " ") ? "" : jade_interp)) + "</strong>");
}
if ( message)
{
buf.push(jade.escape(null == (jade_interp = message) ? "" : jade_interp));
}
buf.push("</div></div>");}.call(this,"context" in locals_for_with?locals_for_with.context:typeof context!=="undefined"?context:undefined,"dismissible" in locals_for_with?locals_for_with.dismissible:typeof dismissible!=="undefined"?dismissible:undefined,"message" in locals_for_with?locals_for_with.message:typeof message!=="undefined"?message:undefined,"strong" in locals_for_with?locals_for_with.strong:typeof strong!=="undefined"?strong:undefined));;return buf.join("");
};
},{"jade/runtime":73}],70:[function(require,module,exports){
var OverlayComponent, OverlayView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

OverlayView = (function(superClass) {
  extend(OverlayView, superClass);

  function OverlayView() {
    return OverlayView.__super__.constructor.apply(this, arguments);
  }

  OverlayView.prototype.template = false;

  OverlayView.prototype.className = 'overlay';

  OverlayView.prototype.events = {
    'click': 'onClick'
  };

  OverlayView.prototype.onClick = function() {
    return Backbone.Radio.channel('sidebar').trigger('hide');
  };

  return OverlayView;

})(Mn.LayoutView);

OverlayComponent = (function(superClass) {
  extend(OverlayComponent, superClass);

  function OverlayComponent() {
    return OverlayComponent.__super__.constructor.apply(this, arguments);
  }

  OverlayComponent.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    return this.container = options.container;
  };

  OverlayComponent.prototype.radioEvents = {
    'overlay ready': 'onReady',
    'overlay show': 'showOverlay',
    'overlay hide': 'hideOverlay'
  };

  OverlayComponent.prototype.showOverlay = function() {
    return $('.overlay-region').addClass('active');
  };

  OverlayComponent.prototype.hideOverlay = function() {
    return $('.overlay-region').removeClass('active');
  };

  OverlayComponent.prototype.onReady = function() {
    if (!this.view) {
      this.view = new OverlayView();
      return this.container.show(this.view);
    }
  };

  return OverlayComponent;

})(Mn.Service);

module.exports = OverlayComponent;



},{}],71:[function(require,module,exports){
var BaseRoute,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BaseRoute = (function(superClass) {
  extend(BaseRoute, superClass);

  function BaseRoute() {
    return BaseRoute.__super__.constructor.apply(this, arguments);
  }

  BaseRoute.prototype.breadcrumbs = [];

  BaseRoute.prototype.initialize = function(options) {
    this.options = options;
    this.container = options.container;
    this.on('before:enter', (function(_this) {
      return function() {
        return typeof _this.onBeforeEnter === "function" ? _this.onBeforeEnter(arguments) : void 0;
      };
    })(this));
    this.on('before:fetch', (function(_this) {
      return function() {
        return typeof _this.onBeforeFetch === "function" ? _this.onBeforeFetch(arguments) : void 0;
      };
    })(this));
    this.on('before:render', (function(_this) {
      return function() {
        return typeof _this.onBeforeRender === "function" ? _this.onBeforeRender(arguments) : void 0;
      };
    })(this));
    this.on('fetch', (function(_this) {
      return function() {
        return typeof _this.onFetch === "function" ? _this.onFetch(arguments) : void 0;
      };
    })(this));
    this.on('render', (function(_this) {
      return function() {
        return typeof _this.onRender === "function" ? _this.onRender(arguments) : void 0;
      };
    })(this));
    this.on('enter', (function(_this) {
      return function() {
        return typeof _this.onEnter === "function" ? _this.onEnter(arguments) : void 0;
      };
    })(this));
    return Backbone.Radio.channel('sidebar').trigger('hide');
  };

  BaseRoute.prototype._setPageTitle = function() {
    return document.title = _.result(this, 'title');
  };

  BaseRoute.prototype._updateBreadcrumbs = function() {
    var breadcrumbs;
    breadcrumbs = _.result(this, 'breadcrumbs');
    if (breadcrumbs) {
      return Backbone.Radio.channel('breadcrumb').trigger('set', breadcrumbs);
    }
  };

  BaseRoute.prototype.onFetch = function() {
    this._setPageTitle();
    return this._updateBreadcrumbs();
  };

  return BaseRoute;

})(Backbone.Routing.Route);

module.exports = BaseRoute;



},{}],72:[function(require,module,exports){
var BaseRouter,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BaseRouter = (function(superClass) {
  extend(BaseRouter, superClass);

  function BaseRouter() {
    return BaseRouter.__super__.constructor.apply(this, arguments);
  }

  BaseRouter.prototype.initialize = function(options) {
    return this.container = options.container;
  };

  return BaseRouter;

})(Backbone.Routing.Router);

module.exports = BaseRouter;



},{}],73:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jade = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return (Array.isArray(val) ? val.map(joinClasses) :
    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
    [val]).filter(nulls).join(' ');
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};


exports.style = function (val) {
  if (val && typeof val === 'object') {
    return Object.keys(val).map(function (style) {
      return style + ':' + val[style];
    }).join(';');
  } else {
    return val;
  }
};
/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if (key === 'style') {
    val = exports.style(val);
  }
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    if (JSON.stringify(val).indexOf('&') !== -1) {
      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                   'will be escaped to `&amp;`');
    };
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will eliminate the double quotes around dates in ' +
                   'ISO form after 2.0.0');
    }
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var jade_encode_html_rules = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};
var jade_match_html = /[&<>"]/g;

function jade_encode_char(c) {
  return jade_encode_html_rules[c] || c;
}

exports.escape = jade_escape;
function jade_escape(html){
  var result = String(html).replace(jade_match_html, jade_encode_char);
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

exports.DebugItem = function DebugItem(lineno, filename) {
  this.lineno = lineno;
  this.filename = filename;
}

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])(1)
});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"fs":55}],74:[function(require,module,exports){
var AbstractKeyboardView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AbstractKeyboardView = (function(superClass) {
  extend(AbstractKeyboardView, superClass);

  function AbstractKeyboardView() {
    return AbstractKeyboardView.__super__.constructor.apply(this, arguments);
  }

  AbstractKeyboardView.prototype.className = 'row d-flex justify-content-center';

  AbstractKeyboardView.prototype.template = require('./templates/keyboard_abstract');

  AbstractKeyboardView.prototype.ui = {
    key: '[data-click=key]'
  };

  AbstractKeyboardView.prototype.events = {
    'click @ui.key': 'onKeyClick'
  };

  AbstractKeyboardView.prototype.onKeyAction = function(e) {
    var key;
    e.preventDefault();
    key = this.options.keys.findWhere({
      keycode: e.keyCode
    });
    if (e.type === 'keydown') {
      this.trigger('key:selected', key.toJSON());
    }
    if (e.type === 'keyup') {
      return this.$("[data-keycode=" + e.keyCode + "]").removeClass('active');
    } else {
      return this.$("[data-keycode=" + e.keyCode + "]").addClass('active');
    }
  };

  AbstractKeyboardView.prototype.onKeyClick = function(e) {
    var el, key, keycode;
    el = $(e.currentTarget);
    keycode = el.data('keycode');
    key = this.options.keys.findWhere({
      keycode: keycode
    });
    this.trigger('key:selected', key.toJSON());
    el.blur();
  };

  return AbstractKeyboardView;

})(Mn.LayoutView);

module.exports = AbstractKeyboardView;



},{"./templates/keyboard_abstract":20}],75:[function(require,module,exports){
var AbstractKeyboardView, KeyboardView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AbstractKeyboardView = require('lib/views/keyboard_abstract');

KeyboardView = (function(superClass) {
  extend(KeyboardView, superClass);

  function KeyboardView() {
    return KeyboardView.__super__.constructor.apply(this, arguments);
  }

  KeyboardView.prototype.template = require('./templates/keyboard_full');

  KeyboardView.prototype.templateHelpers = function() {
    var keys;
    keys = this.options.keys.toJSON();
    return {
      r0: _.where(keys, {
        row: 'r0'
      }),
      r1: _.where(keys, {
        row: 'r1'
      }),
      r2: _.where(keys, {
        row: 'r2'
      }),
      r3: _.where(keys, {
        row: 'r3'
      }),
      r4: _.where(keys, {
        row: 'r4'
      })
    };
  };

  return KeyboardView;

})(AbstractKeyboardView);

module.exports = KeyboardView;



},{"./templates/keyboard_full":21,"lib/views/keyboard_abstract":74}],76:[function(require,module,exports){
var AbstractKeyboardView, FunctionKeyboard,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AbstractKeyboardView = require('lib/views/keyboard_abstract');

FunctionKeyboard = (function(superClass) {
  extend(FunctionKeyboard, superClass);

  function FunctionKeyboard() {
    return FunctionKeyboard.__super__.constructor.apply(this, arguments);
  }

  FunctionKeyboard.prototype.templateHelpers = function() {
    var keys;
    keys = this.options.keys.toJSON();
    return {
      r0: _.where(keys, {
        row: 'func_r0'
      })
    };
  };

  return FunctionKeyboard;

})(AbstractKeyboardView);

module.exports = FunctionKeyboard;



},{"lib/views/keyboard_abstract":74}],77:[function(require,module,exports){
var AbstractKeyboardView, MediaKeyboard,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AbstractKeyboardView = require('lib/views/keyboard_abstract');

MediaKeyboard = (function(superClass) {
  extend(MediaKeyboard, superClass);

  function MediaKeyboard() {
    return MediaKeyboard.__super__.constructor.apply(this, arguments);
  }

  MediaKeyboard.prototype.templateHelpers = function() {
    var keys;
    keys = this.options.keys.toJSON();
    return {
      r0: _.where(keys, {
        row: 'media_r0'
      })
    };
  };

  return MediaKeyboard;

})(AbstractKeyboardView);

module.exports = MediaKeyboard;



},{"lib/views/keyboard_abstract":74}],78:[function(require,module,exports){
var AbstractKeyboardView, NavKeyboard,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AbstractKeyboardView = require('lib/views/keyboard_abstract');

NavKeyboard = (function(superClass) {
  extend(NavKeyboard, superClass);

  function NavKeyboard() {
    return NavKeyboard.__super__.constructor.apply(this, arguments);
  }

  NavKeyboard.prototype.templateHelpers = function() {
    var keys;
    keys = this.options.keys.toJSON();
    return {
      r0: _.where(keys, {
        row: 'nav_r0'
      })
    };
  };

  return NavKeyboard;

})(AbstractKeyboardView);

module.exports = NavKeyboard;



},{"lib/views/keyboard_abstract":74}],79:[function(require,module,exports){
var AbstractKeyboardView, NumpadView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AbstractKeyboardView = require('lib/views/keyboard_abstract');

NumpadView = (function(superClass) {
  extend(NumpadView, superClass);

  function NumpadView() {
    return NumpadView.__super__.constructor.apply(this, arguments);
  }

  NumpadView.prototype.template = require('./templates/keyboard_numpad');

  NumpadView.prototype.templateHelpers = function() {
    var keys;
    keys = this.options.keys.toJSON();
    return {
      r0: _.where(keys, {
        row: 'num_r0'
      }),
      r1: _.where(keys, {
        row: 'num_r1'
      }),
      r2: _.where(keys, {
        row: 'num_r2'
      }),
      r3: _.where(keys, {
        row: 'num_r3'
      }),
      r4: _.where(keys, {
        row: 'num_r4'
      }),
      col: _.where(keys, {
        row: 'num_col'
      })
    };
  };

  return NumpadView;

})(AbstractKeyboardView);

module.exports = NumpadView;



},{"./templates/keyboard_numpad":22,"lib/views/keyboard_abstract":74}],80:[function(require,module,exports){
var FullKeyboard, FunctionKeyboard, KeyboardSelector, MediaKeyboard, NavKeyboard, NumpadView, SimpleNav,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SimpleNav = require('lib/views/simple_nav');

FullKeyboard = require('lib/views/keyboard_full');

NumpadView = require('lib/views/keyboard_numpad');

FunctionKeyboard = require('lib/views/keyboard_function');

MediaKeyboard = require('lib/views/keyboard_media');

NavKeyboard = require('lib/views/keyboard_nav');

KeyboardSelector = (function(superClass) {
  extend(KeyboardSelector, superClass);

  function KeyboardSelector() {
    return KeyboardSelector.__super__.constructor.apply(this, arguments);
  }

  KeyboardSelector.prototype.className = 'row h-100';

  KeyboardSelector.prototype.template = require('./templates/keyboard_selector');

  KeyboardSelector.prototype.navItems = [
    {
      icon: 'fa-keyboard-o',
      text: 'Keyboard',
      trigger: 'keyboard',
      "default": true
    }, {
      icon: 'fa-file-text-o',
      text: 'Numpad',
      trigger: 'numpad'
    }, {
      icon: 'fa-caret-square-o-up',
      text: 'Function',
      trigger: 'function'
    }, {
      icon: 'fa-asterisk',
      text: 'Media',
      trigger: 'media'
    }, {
      icon: 'fa-asterisk',
      text: 'Navigation',
      trigger: 'nav'
    }
  ];

  KeyboardSelector.prototype.showKeyboardView = function(keyboardView) {
    keyboardView.on('key:selected', (function(_this) {
      return function(key) {
        return _this.trigger('key:selected', key);
      };
    })(this));
    return this.contentRegion.show(keyboardView);
  };

  KeyboardSelector.prototype.onNavigateKeyboard = function() {
    return this.showKeyboardView(new FullKeyboard({
      model: this.model,
      keys: this.options.keys
    }));
  };

  KeyboardSelector.prototype.onNavigateNumpad = function() {
    return this.showKeyboardView(new NumpadView({
      model: this.model,
      keys: this.options.keys
    }));
  };

  KeyboardSelector.prototype.onNavigateFunction = function() {
    return this.showKeyboardView(new FunctionKeyboard({
      model: this.model,
      keys: this.options.keys
    }));
  };

  KeyboardSelector.prototype.onNavigateMedia = function() {
    return this.showKeyboardView(new MediaKeyboard({
      model: this.model,
      keys: this.options.keys
    }));
  };

  KeyboardSelector.prototype.onNavigateNav = function() {
    return this.showKeyboardView(new NavKeyboard({
      model: this.model,
      keys: this.options.keys
    }));
  };

  return KeyboardSelector;

})(SimpleNav);

module.exports = KeyboardSelector;



},{"./templates/keyboard_selector":23,"lib/views/keyboard_full":75,"lib/views/keyboard_function":76,"lib/views/keyboard_media":77,"lib/views/keyboard_nav":78,"lib/views/keyboard_numpad":79,"lib/views/simple_nav":81}],81:[function(require,module,exports){
var SimpleNav,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SimpleNav = (function(superClass) {
  extend(SimpleNav, superClass);

  function SimpleNav() {
    this.onNavItemClick = bind(this.onNavItemClick, this);
    return SimpleNav.__super__.constructor.apply(this, arguments);
  }

  SimpleNav.prototype.events = {
    'click [data-trigger]': 'onNavItemClick'
  };

  SimpleNav.prototype.navItems = [];

  SimpleNav.prototype.regions = {
    contentRegion: '[data-region=content]'
  };

  SimpleNav.prototype.onRender = function() {
    var def;
    def = _.where(_.result(this, 'navItems'), {
      "default": true
    })[0];
    if (!def) {
      return;
    }
    return this.triggerMethod("navigate:" + def.trigger);
  };

  SimpleNav.prototype.serializeData = function() {
    var data;
    data = SimpleNav.__super__.serializeData.apply(this, arguments);
    _.extend(data, {
      navItems: _.result(this, 'navItems')
    });
    return data;
  };

  SimpleNav.prototype.onNavItemClick = function(e) {
    var el;
    el = $(e.currentTarget);
    el.addClass('active').siblings().removeClass('active');
    return this.triggerMethod("navigate:" + (el.data('trigger')));
  };

  return SimpleNav;

})(Mn.LayoutView);

module.exports = SimpleNav;



},{}]},{},[16])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9hcHAuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvYXBwbGljYXRpb24vdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2JlaGF2aW9ycy9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9iZWhhdmlvcnMva2V5Ym9hcmRDb250cm9scy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc2VsZWN0YWJsZUNoaWxkLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2JlaGF2aW9ycy9zb3J0YWJsZUNoaWxkLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2JlaGF2aW9ycy9zb3J0YWJsZUxpc3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9oZWFkZXIvY29tcG9uZW50LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2NvbXBvbmVudHMvaGVhZGVyL3ZpZXdzL2xheW91dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9jb21wb25lbnRzL2hlYWRlci92aWV3cy90ZW1wbGF0ZXMvaGVhZGVyLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9jb25maWcvY29ycy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9jb25maWcvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29uZmlnL2p3dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9jb25maWcvbWFyaW9uZXR0ZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9jb25maWcvd2luZG93LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21hbmlmZXN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMva2V5L2VudGl0aWVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMva2V5L2ZhY3RvcnkuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9rZXkva2V5cy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdC90ZW1wbGF0ZXMva2V5Ym9hcmRfYWJzdHJhY3QuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Z1bGwvdGVtcGxhdGVzL2tleWJvYXJkX2Z1bGwuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX251bXBhZC90ZW1wbGF0ZXMva2V5Ym9hcmRfbnVtcGFkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9zZWxlY3Rvci90ZW1wbGF0ZXMva2V5Ym9hcmRfc2VsZWN0b3IuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZGVmYXVsdF9tYWNyb3MuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21hY3JvL2ZhY3RvcnkuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC9yb3V0ZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2RldmljZUxheW91dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvclNlbGVjdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvZWRpdG9yV3JhcHBlci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2tleVNlbGVjdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvbWFjcm9FZGl0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy9tYWNyb0xpc3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZGV2aWNlX2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZGV2aWNlX3N0YXR1cy5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZWRpdG9yX3NlbGVjdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfd3JhcHBlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvaGVscF92aWV3LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9rZXlfY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL21hY3JvX2VkaXRvci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZW1wdHkuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL3RleHRfZWRpdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RleHRFZGl0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2RhdGEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2VudGl0aWVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9mYWN0b3J5LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3JvdXRlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3ZpZXdzL2xheW91dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vaG9tZS92aWV3cy90ZW1wbGF0ZXMvbGF5b3V0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvdXNiL3NlcnZpY2UuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcmVzb2x2ZS9lbXB0eS5qcyIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9iaW5kQmFzZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvYmluZElucHV0cy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvZmxhc2hlcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9obl9iZWhhdmlvcnMvbGliL3N1Ym1pdEJ1dHRvbi5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvdG9vbHRpcHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9obl9lbnRpdGllcy9saWIvY29uZmlnLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fZW50aXRpZXMvbGliL2RlY29yYXRvci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9jb2xsZWN0aW9uLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9tb2RlbC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9zZXJ2aWNlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3ZpZXdzL2ZsYXNoTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi92aWV3cy90ZW1wbGF0ZXMvZmxhc2hfY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fb3ZlcmxheS9saWIvY29tcG9uZW50LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9obl9yb3V0aW5nL2xpYi9yb3V0ZXIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0L2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVsbC9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Z1bmN0aW9uL2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfbWVkaWEvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9uYXYvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9zZWxlY3Rvci9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL3NpbXBsZV9uYXYvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDR0EsSUFBQSxXQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3dCQUVKLFdBQUEsR0FDRTtJQUFBLGNBQUEsRUFBZ0IsWUFBaEI7Ozt3QkFHRixVQUFBLEdBQVksU0FBQTtJQUdWLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFnQyxDQUFDLE9BQWpDLENBQXlDLE9BQXpDO0lBR0EsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQW9DLENBQUMsT0FBckMsQ0FBNkMsT0FBN0M7SUFDQSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxPQUExQztJQUNBLElBQUMsQ0FBQSxPQUFELENB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QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkEsTUFBTSxDQUFDLE9BQVAsR0FBaUI7RUFDZjtJQUNFLEtBQUEsRUFBTyxJQURUO0lBRUUsS0FBQSxFQUFPLEdBRlQ7SUFHRSxTQUFBLEVBQVcsRUFIYjtJQUlFLE9BQUEsRUFBUyxDQUpYO0lBS0UsVUFBQSxFQUFZLENBTGQ7R0FEZSxFQVFmO0lBQ0UsS0FBQSxFQUFPLElBRFQ7SUFFRSxLQUFBLEVBQU8sR0FGVDtJQUdFLFNBQUEsRUFBVyxFQUhiO0lBSUUsT0FBQSxFQUFTLENBSlg7SUFLRSxVQUFBLEVBQVksQ0FMZDtHQVJlLEVBZWY7SUFDRSxLQUFBLEVBQU8sSUFEVDtJQUVFLEtBQUEsRUFBTyxHQUZUO0lBR0UsU0FBQSxFQUFXLEVBSGI7SUFJRSxPQUFBLEVBQVMsQ0FKWDtJQUtFLFVBQUEsRUFBWSxDQUxkO0dBZmUsRUFzQmY7SUFDRSxLQUFBLEVBQU8sSUFEVDtJQUVFLEtBQUEsRUFBTyxHQUZUO0lBR0UsU0FBQSxFQUFXLEVBSGI7SUFJRSxPQUFBLEVBQVMsQ0FKWDtJQUtFLFVBQUEsRUFBWSxDQUxkO0dBdEJlLEVBNkJmO0lBQ0UsS0FBQSxFQUFPLElBRFQ7SUFFRSxLQUFBLEVBQU8sR0FGVDtJQUdFLFNBQUEsRUFBVyxFQUhiO0lBSUUsT0FBQSxFQUFTLENBSlg7SUFLRSxVQUFBLEVBQVksQ0FMZDtHQTdCZSxFQW9DZjtJQUNFLEtBQUEsRUFBTyxJQURUO0lBRUUsS0FBQSxFQUFPLEdBRlQ7SUFHRSxTQUFBLEVBQVcsRUFIYjtJQUlFLE9BQUEsRUFBUyxDQUpYO0lBS0UsVUFBQSxFQUFZLENBTGQ7R0FwQ2UsRUEyQ2Y7SUFDRSxLQUFBLEVBQU8sSUFEVDtJQUVFLEtBQUEsRUFBTyxHQUZUO0lBR0UsU0FBQSxFQUFXLEVBSGI7SUFJRSxPQUFBLEVBQVMsQ0FKWDtJQUtFLFVBQUEsRUFBWSxDQUxkO0dBM0NlLEVBa0RmO0lBQ0UsS0FBQSxFQUFPLElBRFQ7SUFFRSxLQUFBLEVBQU8sR0FGVDtJQUdFLFNBQUEsRUFBVyxFQUhiO0lBSUUsT0FBQSxFQUFTLENBSlg7SUFLRSxVQUFBLEVBQVksQ0FMZDtHQWxEZTs7Ozs7O0FDRWpCLElBQUEsMkJBQUE7RUFBQTs7O0FBQU07Ozs7Ozs7dUJBR0osUUFBQSxHQUNFO0lBQUEsS0FBQSxFQUFPLENBQVA7SUFDQSxRQUFBLEVBQVUsQ0FEVjs7Ozs7R0FKcUIsUUFBUSxDQUFDOztBQVM1Qjs7Ozs7Ozs0QkFDSixLQUFBLEdBQU87OzRCQUNQLFVBQUEsR0FBWTs7OztHQUZnQixRQUFRLENBQUM7O0FBTXZDLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxLQUFBLEVBQVksVUFBWjtFQUNBLFVBQUEsRUFBWSxlQURaOzs7Ozs7QUNsQkYsSUFBQSxxQ0FBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFlBQVI7O0FBQ1gsYUFBQSxHQUFnQixPQUFBLENBQVEsa0JBQVI7O0FBSVY7Ozs7Ozs7eUJBRUosYUFBQSxHQUNFO0lBQUEsa0JBQUEsRUFBcUIsZUFBckI7Ozt5QkFFRixVQUFBLEdBQVksU0FBQTtXQUNWLElBQUMsQ0FBQSxnQkFBRCxHQUF3QixJQUFBLFFBQVEsQ0FBQyxVQUFULENBQW9CLGFBQXBCLEVBQW1DO01BQUUsS0FBQSxFQUFPLElBQVQ7S0FBbkM7RUFEZDs7eUJBR1osYUFBQSxHQUFlLFNBQUE7QUFDYixXQUFPLElBQUMsQ0FBQTtFQURLOzs7O0dBUlUsVUFBVSxDQUFDOztBQWF0QyxNQUFNLENBQUMsT0FBUCxHQUFxQixJQUFBLFlBQUEsQ0FBQTs7Ozs7QUNsQnJCLElBQUEsMEJBQUE7RUFBQTs7O0FBQUEsVUFBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUjs7QUFJUjs7Ozs7OzsyQkFFSixLQUFBLEdBQU87OzJCQUVQLFdBQUEsR0FBYTtJQUFDO01BQUUsSUFBQSxFQUFNLFFBQVI7S0FBRDs7OzJCQUViLEtBQUEsR0FBTyxTQUFBO0lBQ0wsSUFBQyxDQUFBLElBQUQsR0FBUSxLQUFLLENBQUMsT0FBTixDQUFjLEtBQWQsQ0FBb0IsQ0FBQyxPQUFyQixDQUE2QixZQUE3QjtJQUNSLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FBSyxDQUFDLE9BQU4sQ0FBYyxPQUFkLENBQXNCLENBQUMsT0FBdkIsQ0FBK0IsWUFBL0I7V0FDVixJQUFDLENBQUEsV0FBRCxHQUFlLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZCxDQUF1QixDQUFDLE9BQXhCLENBQWdDLE9BQWhDLEVBQXlDLFVBQXpDO0VBSFY7OzJCQUtQLE1BQUEsR0FBUSxTQUFBO0lBQ04sT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsV0FBYjtXQUNBLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxDQUFvQixJQUFBLFVBQUEsQ0FBVztNQUFFLEtBQUEsRUFBTyxJQUFDLENBQUEsV0FBVjtNQUF1QixJQUFBLEVBQU0sSUFBQyxDQUFBLElBQTlCO01BQW9DLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFBN0M7S0FBWCxDQUFwQjtFQUZNOzs7O0dBWG1CLE9BQUEsQ0FBUSxzQkFBUjs7QUFpQjdCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7OztBQ3JCakIsSUFBQSwyQ0FBQTtFQUFBOzs7QUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGVBQVI7O0FBSVI7Ozs7Ozs7NkJBQ0osUUFBQSxHQUFVLE9BQUEsQ0FBUSwyQkFBUjs7NkJBQ1YsU0FBQSxHQUFXOzs2QkFFWCxlQUFBLEdBQWlCLFNBQUE7QUFFZixRQUFBO0lBQUEsTUFBQSxHQUFTO01BQ1AsSUFBQSxFQUFNLGVBREM7TUFFUCxHQUFBLEVBQU0sZUFGQzs7SUFNVCxJQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLGFBQVgsQ0FBQSxLQUE2QixDQUFoQztNQUVFLE1BQUEsR0FBUztRQUNQLElBQUEsRUFBTSxXQURDO1FBRVAsR0FBQSxFQUFLLGVBRkU7UUFGWDs7QUFPQSxXQUFPO01BQUUsTUFBQSxFQUFRLE1BQVY7O0VBZlE7Ozs7R0FKWSxVQUFVLENBQUM7O0FBdUJwQzs7Ozs7Ozt5QkFDSixTQUFBLEdBQVc7O3lCQUNYLFFBQUEsR0FBVSxPQUFBLENBQVEsMkJBQVI7O3lCQUVWLE9BQUEsR0FFRTtJQUFBLFVBQUEsRUFBYyxvQkFBZDs7O3lCQUVGLFFBQUEsR0FBVSxTQUFBO0FBR1IsUUFBQTtJQUFBLFdBQUEsR0FBa0IsSUFBQSxXQUFBLENBQVk7TUFBRSxVQUFBLEVBQVksSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsTUFBWCxDQUFkO0tBQVo7SUFDbEIsV0FBVyxDQUFDLEVBQVosQ0FBZSxvQkFBZixFQUFxQyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsSUFBRDtlQUFVLEtBQUMsQ0FBQSxPQUFELENBQVMsY0FBVCxFQUF5QixJQUFJLENBQUMsS0FBOUI7TUFBVjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckM7SUFDQSxXQUFXLENBQUMsRUFBWixDQUFlLHNCQUFmLEVBQXVDLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxJQUFEO2VBQVUsS0FBQyxDQUFBLE9BQUQsQ0FBUyxnQkFBVDtNQUFWO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2QztXQUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFpQixXQUFqQjtFQU5ROzs7O0dBUmUsRUFBRSxDQUFDOztBQXNCOUIsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7O0FDakRqQixJQUFBLHlCQUFBO0VBQUE7OztBQUFBLFNBQUEsR0FBWSxPQUFBLENBQVEsc0JBQVI7O0FBSU47Ozs7Ozs7MkJBQ0osU0FBQSxHQUFXOzsyQkFDWCxRQUFBLEdBQVUsT0FBQSxDQUFRLDZCQUFSOzsyQkFFVixRQUFBLEdBQVU7SUFDUjtNQUFFLElBQUEsRUFBTSxlQUFSO01BQTBCLElBQUEsRUFBTSxPQUFoQztNQUEwQyxPQUFBLEVBQVMsT0FBbkQ7S0FEUSxFQUVSO01BQUUsSUFBQSxFQUFNLGdCQUFSO01BQTBCLElBQUEsRUFBTSxNQUFoQztNQUEwQyxPQUFBLEVBQVMsTUFBbkQ7S0FGUTs7OzJCQU1WLFFBQUEsR0FBVSxTQUFBO0FBQ1IsUUFBQTtJQUFBLFdBQUEsR0FBYyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxRQUFYO0lBQ2QsT0FBQSxHQUFVLFdBQVcsQ0FBQyxHQUFaLENBQWdCLE1BQWhCO0FBQ1YsV0FBTyxJQUFDLENBQUEsQ0FBRCxDQUFHLGdCQUFBLEdBQWlCLE9BQWpCLEdBQXlCLEdBQTVCLENBQStCLENBQUMsUUFBaEMsQ0FBeUMsUUFBekM7RUFIQzs7MkJBS1YsZUFBQSxHQUFpQixTQUFBO1dBQ2YsSUFBQyxDQUFBLE9BQUQsQ0FBUyxtQkFBVDtFQURlOzsyQkFHakIsY0FBQSxHQUFnQixTQUFBO1dBQ2QsSUFBQyxDQUFBLE9BQUQsQ0FBUyxrQkFBVDtFQURjOzsyQkFHaEIsYUFBQSxHQUFlLFNBQUE7V0FDYixJQUFDLENBQUEsT0FBRCxDQUFTLGlCQUFUO0VBRGE7Ozs7R0FyQlk7O0FBMEI3QixNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUM5QmpCLElBQUEsc0NBQUE7RUFBQTs7O0FBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxjQUFSOztBQUNiLFdBQUEsR0FBYyxPQUFBLENBQVEsZUFBUjs7QUFJUjs7Ozs7OzswQkFDSixRQUFBLEdBQVUsT0FBQSxDQUFRLDRCQUFSOzswQkFDVixTQUFBLEdBQVc7OzBCQUVYLE9BQUEsR0FDRTtJQUFBLGFBQUEsRUFBZSx1QkFBZjs7OzBCQUVGLE1BQUEsR0FDRTtJQUFBLHlCQUFBLEVBQThCLFFBQTlCO0lBQ0EsMkJBQUEsRUFBOEIsVUFEOUI7OzswQkFHRixPQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQVEsV0FBUjtJQUNBLElBQUEsRUFBUSxVQURSO0lBRUEsR0FBQSxFQUFRLFdBRlI7OzswQkFJRixRQUFBLEdBQVUsU0FBQTtBQUdSLFFBQUE7SUFBQSxVQUFBLEdBQWEsSUFBQyxDQUFBLE9BQVEsQ0FBQSxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQ7SUFHdEIsTUFBQSxHQUFTLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFFBQVg7SUFHVCxJQUFDLENBQUEsWUFBRCxHQUFnQixNQUFNLENBQUMsTUFBUCxDQUFBO0lBR2hCLE1BQUEsR0FBUyxNQUFNLENBQUMsR0FBUCxDQUFXLFFBQVg7SUFHVCxJQUFBLEdBQU8sS0FBSyxDQUFDLE9BQU4sQ0FBYyxLQUFkLENBQW9CLENBQUMsT0FBckIsQ0FBNkIsWUFBN0I7V0FHUCxJQUFDLENBQUEsYUFBYSxDQUFDLElBQWYsQ0FBd0IsSUFBQSxVQUFBLENBQVc7TUFBRSxLQUFBLEVBQU8sTUFBVDtNQUFpQixJQUFBLEVBQU0sSUFBdkI7TUFBNkIsTUFBQSxFQUFRLE1BQXJDO0tBQVgsQ0FBeEI7RUFsQlE7OzBCQXFCVixNQUFBLEdBQVEsU0FBQTtBQUdOLFFBQUE7SUFBQSxJQUFBLEdBQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFoQixDQUEwQixJQUExQjtJQUdQLElBQW9CLElBQUksQ0FBQyxJQUFMLEtBQWEsT0FBakM7TUFBQSxJQUFJLENBQUMsTUFBTCxHQUFjLEdBQWQ7O0lBQ0EsSUFBd0IsSUFBSSxDQUFDLElBQUwsS0FBYSxNQUFyQztNQUFBLElBQUksQ0FBQyxVQUFMLEdBQWtCLEdBQWxCOztJQUdBLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFFBQVgsQ0FBb0IsQ0FBQyxHQUFyQixDQUF5QixJQUF6QjtJQUdBLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUFlLGdCQUFmO0FBR0EsV0FBTyxJQUFDLENBQUEsT0FBRCxDQUFTLE1BQVQ7RUFoQkQ7OzBCQW1CUixRQUFBLEdBQVUsU0FBQTtJQUdSLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFFBQVgsQ0FBb0IsQ0FBQyxHQUFyQixDQUF5QixJQUFDLENBQUEsWUFBMUI7QUFHQSxXQUFPLElBQUMsQ0FBQSxPQUFELENBQVMsUUFBVDtFQU5DOzs7O0dBeERnQixVQUFVLENBQUM7O0FBa0V2QyxNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUN0RWpCLElBQUEscUJBQUE7RUFBQTs7O0FBQU07Ozs7Ozs7cUJBQ0osT0FBQSxHQUFTOztxQkFDVCxTQUFBLEdBQVc7O3FCQUNYLFFBQUEsR0FBVSxPQUFBLENBQVEsdUJBQVI7O3FCQUVWLFNBQUEsR0FDRTtJQUFBLGVBQUEsRUFBaUI7TUFBRSxRQUFBLEVBQVUsSUFBWjtLQUFqQjs7O3FCQUVGLFdBQUEsR0FDRTtJQUFBLGdCQUFBLEVBQWtCLGVBQWxCOzs7cUJBRUYsYUFBQSxHQUFlLFNBQUE7QUFDYixXQUFPLElBQUMsQ0FBQSxNQUFELENBQUE7RUFETTs7cUJBR2YsZUFBQSxHQUFpQixTQUFBO0FBR2YsUUFBQTtJQUFBLE1BQUEsR0FBUyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxRQUFYO0lBR1QsSUFBRyxNQUFNLENBQUMsR0FBUCxDQUFXLE1BQVgsQ0FBQSxLQUFzQixPQUF6QjtBQUNFLGFBQU87UUFBRSxLQUFBLEVBQU8sT0FBVDtRQURUOztJQUlBLElBQUcsTUFBTSxDQUFDLEdBQVAsQ0FBVyxNQUFYLENBQUEsS0FBc0IsTUFBekI7QUFDRSxhQUFPO1FBQUUsS0FBQSxFQUFPLE1BQVQ7UUFEVDs7SUFLQSxJQUFHLE1BQU0sQ0FBQyxHQUFQLENBQVcsTUFBWCxDQUFBLEtBQXNCLEtBQXpCO0FBQ0UsYUFBTztRQUFFLEtBQUEsRUFBTyxLQUFUO1FBRFQ7O0VBZmU7Ozs7R0FkSSxFQUFFLENBQUM7O0FBa0NwQjs7Ozs7Ozt3QkFDSixPQUFBLEdBQVM7O3dCQUNULFNBQUEsR0FBVzs7d0JBQ1gsU0FBQSxHQUFXOzs7O0dBSGEsRUFBRSxDQUFDOztBQU83QixNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUMxQ2pCLElBQUEsaUVBQUE7RUFBQTs7O0FBQUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxnQkFBUjs7QUFDZixjQUFBLEdBQWlCLE9BQUEsQ0FBUSxrQkFBUjs7QUFDakIsYUFBQSxHQUFnQixPQUFBLENBQVEsaUJBQVI7O0FBSVY7Ozs7Ozs7cUJBQ0osUUFBQSxHQUFVLE9BQUEsQ0FBUSx1QkFBUjs7cUJBQ1YsU0FBQSxHQUFXOzs7O0dBRlUsVUFBVSxDQUFDOztBQU01Qjs7Ozs7Ozt1QkFDSixRQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOzt1QkFDVixTQUFBLEdBQVc7O3VCQUVYLE9BQUEsR0FDRTtJQUFBLFlBQUEsRUFBZ0Isc0JBQWhCO0lBQ0EsY0FBQSxFQUFnQix3QkFEaEI7SUFFQSxZQUFBLEVBQWdCLHNCQUZoQjs7O3VCQUlGLFFBQUEsR0FBVSxTQUFBO0FBR1IsUUFBQTtJQUFBLElBQUMsQ0FBQSxZQUFELENBQUE7SUFJQSxVQUFBLEdBQWlCLElBQUEsWUFBQSxDQUFhO01BQUUsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFWO0tBQWI7SUFDakIsVUFBVSxDQUFDLEVBQVgsQ0FBYyxjQUFkLEVBQThCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxRQUFEO2VBQWMsS0FBQyxDQUFBLGtCQUFELENBQW9CLFFBQXBCO01BQWQ7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTlCO0lBQ0EsVUFBVSxDQUFDLEVBQVgsQ0FBYyxnQkFBZCxFQUFnQyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFBTSxLQUFDLENBQUEsWUFBRCxDQUFBO01BQU47SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWhDO1dBQ0EsSUFBQyxDQUFBLFlBQVksQ0FBQyxJQUFkLENBQW1CLFVBQW5CO0VBVlE7O3VCQVlWLFlBQUEsR0FBYyxTQUFBO1dBR1osSUFBQyxDQUFBLGNBQWMsQ0FBQyxJQUFoQixDQUF5QixJQUFBLFFBQUEsQ0FBQSxDQUF6QjtFQUhZOzt1QkFLZCxrQkFBQSxHQUFvQixTQUFDLFFBQUQ7QUFHbEIsUUFBQTtJQUFBLGNBQUEsR0FBcUIsSUFBQSxjQUFBLENBQWU7TUFBRSxLQUFBLEVBQU8sUUFBVDtLQUFmO0lBR3JCLGNBQWMsQ0FBQyxFQUFmLENBQWtCLG1CQUFsQixFQUF1QyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFBRyxLQUFDLENBQUEsY0FBRCxDQUFnQixRQUFoQixFQUEwQixPQUExQjtNQUFIO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2QztJQUdBLGNBQWMsQ0FBQyxFQUFmLENBQWtCLGtCQUFsQixFQUFzQyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFBRyxLQUFDLENBQUEsY0FBRCxDQUFnQixRQUFoQixFQUEwQixNQUExQjtNQUFIO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0QztJQUdBLGNBQWMsQ0FBQyxFQUFmLENBQWtCLGlCQUFsQixFQUFxQyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFBRyxLQUFDLENBQUEsY0FBRCxDQUFnQixRQUFoQixFQUEwQixLQUExQjtNQUFIO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFyQztXQUdBLElBQUMsQ0FBQSxjQUFjLENBQUMsSUFBaEIsQ0FBcUIsY0FBckI7RUFma0I7O3VCQWlCcEIsY0FBQSxHQUFnQixTQUFDLFFBQUQsRUFBVyxNQUFYO0FBQ2QsUUFBQTtJQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxDQUFjLFFBQWQ7SUFHQSxhQUFBLEdBQW9CLElBQUEsYUFBQSxDQUFjO01BQUUsS0FBQSxFQUFPLFFBQVQ7TUFBbUIsSUFBQSxFQUFNLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBbEM7TUFBd0MsTUFBQSxFQUFRLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBekQ7TUFBaUUsTUFBQSxFQUFRLE1BQXpFO0tBQWQ7SUFHcEIsYUFBYSxDQUFDLEVBQWQsQ0FBaUIsUUFBakIsRUFBMkIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQ3pCLEtBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixRQUFqQjtNQUR5QjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBM0I7SUFJQSxhQUFhLENBQUMsRUFBZCxDQUFpQixNQUFqQixFQUF5QixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFFdkIsT0FBTyxDQUFDLEdBQVIsQ0FBWSw4QkFBWjtlQUNBLEtBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixRQUFqQjtNQUh1QjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBekI7V0FNQSxJQUFDLENBQUEsWUFBWSxDQUFDLElBQWQsQ0FBbUIsYUFBbkI7RUFqQmM7Ozs7R0EzQ08sVUFBVSxDQUFDOztBQWdFcEMsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7O0FDNUVqQixJQUFBLHdDQUFBO0VBQUE7OztBQUFBLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUSw2QkFBUjs7QUFDbkIsU0FBQSxHQUFZLE9BQUEsQ0FBUSxhQUFSOztBQUlOOzs7Ozs7O3dCQUNKLFFBQUEsR0FBVSxPQUFBLENBQVEsMEJBQVI7O3dCQUNWLFNBQUEsR0FBVzs7d0JBRVgsT0FBQSxHQUNFO0lBQUEsV0FBQSxFQUFnQixxQkFBaEI7SUFDQSxjQUFBLEVBQWdCLHdCQURoQjs7O3dCQUdGLFFBQUEsR0FBVSxTQUFBO0FBSVIsUUFBQTtJQUFBLElBQUMsQ0FBQSxXQUFXLENBQUMsSUFBYixDQUFzQixJQUFBLFNBQUEsQ0FBVTtNQUFFLFVBQUEsRUFBWSxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQXZCO0tBQVYsQ0FBdEI7SUFJQSxZQUFBLEdBQW1CLElBQUEsZ0JBQUEsQ0FBaUI7TUFBRSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQVY7TUFBaUIsSUFBQSxFQUFNLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBaEM7S0FBakI7SUFHbkIsWUFBWSxDQUFDLEVBQWIsQ0FBZ0IsY0FBaEIsRUFBZ0MsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLEdBQUQ7UUFHOUIsR0FBQSxHQUFNLENBQUMsQ0FBQyxLQUFGLENBQVEsR0FBUjtRQUdOLEdBQUcsQ0FBQyxLQUFKLEdBQVksS0FBQyxDQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBaEIsR0FBeUI7ZUFHckMsS0FBQyxDQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBaEIsQ0FBb0IsR0FBcEI7TUFUOEI7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWhDO1dBWUEsSUFBQyxDQUFBLGNBQWMsQ0FBQyxJQUFoQixDQUFxQixZQUFyQjtFQXZCUTs7OztHQVJjLFVBQVUsQ0FBQzs7QUFtQ3JDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7OztBQ3ZDakIsSUFBQSxpQ0FBQTtFQUFBOzs7O0FBQU07Ozs7Ozs7dUJBQ0osT0FBQSxHQUFTOzt1QkFDVCxTQUFBLEdBQVc7O3VCQUNYLFFBQUEsR0FBVSxPQUFBLENBQVEseUJBQVI7O3VCQUVWLFNBQUEsR0FDRTtJQUFBLGFBQUEsRUFBZSxFQUFmOzs7dUJBRUYsV0FBQSxHQUNFO0lBQUEsaUJBQUEsRUFBbUIsUUFBbkI7Ozt1QkFFRixNQUFBLEdBQ0U7SUFBQSxNQUFBLEVBQVEsUUFBUjtJQUNBLFdBQUEsRUFBYSxhQURiO0lBRUEsZ0JBQUEsRUFBa0IsYUFGbEI7SUFHQSxlQUFBLEVBQWlCLFlBSGpCO0lBSUEsWUFBQSxFQUFjLGFBSmQ7SUFLQSxvQ0FBQSxFQUFzQyxpQkFMdEM7Ozt1QkFPRixXQUFBLEdBQWEsU0FBQTtXQUNYLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxDQUFjLFNBQWQ7RUFEVzs7dUJBR2IsVUFBQSxHQUFZLFNBQUE7V0FDVixJQUFDLENBQUEsR0FBRyxDQUFDLFdBQUwsQ0FBaUIsU0FBakI7RUFEVTs7dUJBR1osV0FBQSxHQUFhLFNBQUE7V0FDWCxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsQ0FBYyxZQUFkO0VBRFc7O3VCQUdiLE1BQUEsR0FBUSxTQUFBO0lBQ04sSUFBQyxDQUFBLEdBQUcsQ0FBQyxXQUFMLENBQWlCLG9CQUFqQjtXQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxDQUFjLGVBQWQsQ0FBOEIsQ0FBQyxXQUEvQixDQUEyQyxvQkFBM0M7RUFGTTs7dUJBSVIsV0FBQSxHQUFhLFNBQUE7V0FDWCxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFsQixDQUF5QixJQUFDLENBQUEsS0FBMUI7RUFEVzs7dUJBR2IsZUFBQSxHQUFpQixTQUFDLENBQUQ7QUFHZixRQUFBO0lBQUEsRUFBQSxHQUFLLENBQUEsQ0FBRSxDQUFDLENBQUMsYUFBSjtJQUdMLFFBQUEsR0FBVyxFQUFFLENBQUMsSUFBSCxDQUFRLFVBQVI7SUFHWCxJQUFHLFFBQUEsS0FBWSxDQUFDLENBQWhCO01BQ0UsWUFBQSxHQUFlLEVBRGpCOztJQUVBLElBQUcsUUFBQSxLQUFZLENBQWY7TUFDRSxZQUFBLEdBQWUsQ0FBQyxFQURsQjs7SUFFQSxJQUFHLFFBQUEsS0FBWSxDQUFmO01BQ0UsWUFBQSxHQUFlLEVBRGpCOztXQUlBLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFVBQVgsRUFBdUIsWUFBdkI7RUFqQmU7O3VCQW1CakIsZUFBQSxHQUFpQixTQUFBO0FBQ2YsUUFBQTtJQUFBLFNBQUEsR0FBWTtNQUNWO1FBQUUsUUFBQSxFQUFVLENBQUMsQ0FBYjtRQUFnQixHQUFBLEVBQUssb0JBQXJCO09BRFUsRUFFVjtRQUFFLFFBQUEsRUFBVSxDQUFaO1FBQWUsR0FBQSxFQUFLLGFBQXBCO09BRlUsRUFHVjtRQUFFLFFBQUEsRUFBVSxDQUFaO1FBQWUsR0FBQSxFQUFLLGtCQUFwQjtPQUhVOztJQU1aLFFBQUEsR0FBVyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxVQUFYO0lBQ1gsZUFBQSxHQUFrQixDQUFDLENBQUMsU0FBRixDQUFZLFNBQVosRUFBdUI7TUFBRSxRQUFBLEVBQVUsUUFBWjtLQUF2QjtBQUNsQixXQUFPO01BQUUsaUJBQUEsZUFBRjs7RUFUUTs7OztHQXRETSxFQUFFLENBQUM7O0FBbUV0Qjs7Ozs7Ozt1QkFDSixPQUFBLEdBQVM7O3VCQUNULFNBQUEsR0FBVzs7dUJBQ1gsUUFBQSxHQUFVLE9BQUEsQ0FBUSx5QkFBUjs7OztHQUhhLEVBQUUsQ0FBQzs7QUFPdEI7Ozs7Ozs7O3NCQUNKLE9BQUEsR0FBUzs7c0JBQ1QsU0FBQSxHQUFXOztzQkFDWCxTQUFBLEdBQVc7O3NCQUNYLFNBQUEsR0FBVzs7c0JBRVgsUUFBQSxHQUFVLFNBQUE7SUFHUixJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosQ0FBQTtXQUdBLFFBQVEsQ0FBQyxNQUFULENBQWdCLElBQUMsQ0FBQSxFQUFqQixFQUNFO01BQUEsU0FBQSxFQUFjLENBQWQ7TUFDQSxNQUFBLEVBQWMsTUFEZDtNQUVBLFVBQUEsRUFBYyxPQUZkO01BR0EsV0FBQSxFQUFjLFFBSGQ7TUFJQSxTQUFBLEVBQWMsTUFKZDtNQUtBLGlCQUFBLEVBQW1CLEdBTG5CO01BTUEsS0FBQSxFQUFPLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxDQUFEO2lCQUFPLEtBQUMsQ0FBQSxpQkFBRCxDQUFBO1FBQVA7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBTlA7S0FERjtFQU5ROztzQkFpQlYsaUJBQUEsR0FBbUIsU0FBQTtBQUdqQixRQUFBO0lBQUEsS0FBQSxHQUFRO0FBQ1I7QUFBQSxTQUFBLHFDQUFBOztNQUNFLENBQUEsQ0FBRSxFQUFGLENBQUssQ0FBQyxPQUFOLENBQWMsUUFBZCxFQUF1QixLQUF2QjtNQUNBLEtBQUE7QUFGRjtXQUtBLElBQUMsQ0FBQSxNQUFELENBQUE7RUFUaUI7Ozs7R0F2QkcsRUFBRSxDQUFDOztBQW9DM0IsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7O0FDL0dqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkEsSUFBQSxVQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3VCQUNKLFNBQUEsR0FBVzs7dUJBQ1gsUUFBQSxHQUFVLE9BQUEsQ0FBUSx5QkFBUjs7dUJBRVYsUUFBQSxHQUFVLFNBQUE7V0FDUixRQUFRLENBQUMsTUFBTSxDQUFDLFdBQWhCLENBQTRCLElBQTVCLEVBQStCO01BQUUsSUFBQSxFQUFNLE1BQVI7TUFBZ0IsVUFBQSxFQUFZLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFlBQVgsQ0FBNUI7S0FBL0I7RUFEUTs7OztHQUphLFVBQVUsQ0FBQzs7QUFTcEMsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7O0FDUGpCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0VBQ2Y7SUFDRSxFQUFBLEVBQUksVUFETjtJQUVFLEtBQUEsRUFBTyxrQkFGVDtJQUdFLFdBQUEsRUFBYSxDQUhmO0lBSUUsSUFBQSxFQUFNO01BQ0o7UUFDRSxFQUFBLEVBQUksZ0JBRE47UUFFRSxNQUFBLEVBQVE7VUFDTixJQUFBLEVBQU0sT0FEQTtVQUVOLE1BQUEsRUFBUTtZQUNOO2NBQ0UsS0FBQSxFQUFPLElBRFQ7Y0FFRSxLQUFBLEVBQU8sR0FGVDtjQUdFLFNBQUEsRUFBVyxFQUhiO2NBSUUsT0FBQSxFQUFTLENBSlg7Y0FLRSxVQUFBLEVBQVksQ0FMZDthQURNLEVBUU47Y0FDRSxLQUFBLEVBQU8sSUFEVDtjQUVFLEtBQUEsRUFBTyxHQUZUO2NBR0UsU0FBQSxFQUFXLEVBSGI7Y0FJRSxPQUFBLEVBQVMsQ0FKWDtjQUtFLFVBQUEsRUFBWSxDQUxkO2FBUk0sRUFlTjtjQUNFLEtBQUEsRUFBTyxJQURUO2NBRUUsS0FBQSxFQUFPLEdBRlQ7Y0FHRSxTQUFBLEVBQVcsRUFIYjtjQUlFLE9BQUEsRUFBUyxDQUpYO2NBS0UsVUFBQSxFQUFZLENBTGQ7YUFmTSxFQXNCTjtjQUNFLEtBQUEsRUFBTyxJQURUO2NBRUUsS0FBQSxFQUFPLEdBRlQ7Y0FHRSxTQUFBLEVBQVcsRUFIYjtjQUlFLE9BQUEsRUFBUyxDQUpYO2NBS0UsVUFBQSxFQUFZLENBTGQ7YUF0Qk0sRUE2Qk47Y0FDRSxLQUFBLEVBQU8sSUFEVDtjQUVFLEtBQUEsRUFBTyxHQUZUO2NBR0UsU0FBQSxFQUFXLEVBSGI7Y0FJRSxPQUFBLEVBQVMsQ0FKWDtjQUtFLFVBQUEsRUFBWSxDQUxkO2FBN0JNLEVBb0NOO2NBQ0UsS0FBQSxFQUFPLElBRFQ7Y0FFRSxLQUFBLEVBQU8sR0FGVDtjQUdFLFNBQUEsRUFBVyxFQUhiO2NBSUUsT0FBQSxFQUFTLENBSlg7Y0FLRSxVQUFBLEVBQVksQ0FMZDthQXBDTSxFQTJDTjtjQUNFLEtBQUEsRUFBTyxJQURUO2NBRUUsS0FBQSxFQUFPLEdBRlQ7Y0FHRSxTQUFBLEVBQVcsRUFIYjtjQUlFLE9BQUEsRUFBUyxDQUpYO2NBS0UsVUFBQSxFQUFZLENBTGQ7YUEzQ00sRUFrRE47Y0FDRSxLQUFBLEVBQU8sSUFEVDtjQUVFLEtBQUEsRUFBTyxHQUZUO2NBR0UsU0FBQSxFQUFXLEVBSGI7Y0FJRSxPQUFBLEVBQVMsQ0FKWDtjQUtFLFVBQUEsRUFBWSxDQUxkO2FBbERNO1dBRkY7U0FGVjtPQURJLEVBaUVKO1FBQUUsRUFBQSxFQUFJLGdCQUFOO1FBQXdCLE1BQUEsRUFBUTtVQUFFLElBQUEsRUFBTSxNQUFSO1VBQWdCLFVBQUEsRUFBWSxjQUE1QjtTQUFoQztPQWpFSSxFQWtFSjtRQUFFLEVBQUEsRUFBSSxnQkFBTjtRQUF3QixNQUFBLEVBQVE7VUFBRSxJQUFBLEVBQU0sT0FBUjtVQUFpQixNQUFBLEVBQVEsRUFBekI7U0FBaEM7T0FsRUksRUFtRUo7UUFBRSxFQUFBLEVBQUksZ0JBQU47UUFBd0IsTUFBQSxFQUFRO1VBQUUsSUFBQSxFQUFNLE1BQVI7VUFBZ0IsVUFBQSxFQUFZLGNBQTVCO1NBQWhDO09BbkVJLEVBb0VKO1FBQUUsRUFBQSxFQUFJLGdCQUFOO1FBQXdCLE1BQUEsRUFBUTtVQUFFLElBQUEsRUFBTSxPQUFSO1VBQWlCLE1BQUEsRUFBUSxFQUF6QjtTQUFoQztPQXBFSTtLQUpSO0dBRGU7Ozs7OztBQ0hqQixJQUFBLCtGQUFBO0VBQUE7OztBQUFBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLG1CQUFSOztBQUtWOzs7Ozs7OzJCQUdKLFFBQUEsR0FBVTtJQUNSLElBQUEsRUFBTSxPQURFO0lBRVIsTUFBQSxFQUFRLEVBRkE7SUFHUixVQUFBLEVBQVksRUFISjtJQUlSLFNBQUEsRUFBVyxFQUpIOzs7MkJBUVYsU0FBQSxHQUFXO0lBQ1A7TUFBQSxJQUFBLEVBQWdCLFFBQVEsQ0FBQyxPQUF6QjtNQUNBLEdBQUEsRUFBZ0IsUUFEaEI7TUFFQSxZQUFBLEVBQWdCLGFBQWEsQ0FBQyxLQUY5QjtNQUdBLGNBQUEsRUFBZ0IsYUFBYSxDQUFDLFVBSDlCO0tBRE87Ozs7O0dBWGdCLFFBQVEsQ0FBQzs7QUFxQmhDOzs7Ozs7OzBCQUdKLFFBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTyxJQUFQO0lBQ0EsTUFBQSxFQUFRLEVBRFI7OzswQkFJRixTQUFBLEdBQVc7SUFDUDtNQUFBLElBQUEsRUFBZ0IsUUFBUSxDQUFDLE1BQXpCO01BQ0EsR0FBQSxFQUFnQixRQURoQjtNQUVBLFlBQUEsRUFBZ0IsY0FGaEI7S0FETzs7Ozs7R0FSZSxRQUFRLENBQUM7O0FBZ0IvQjs7Ozs7OzsrQkFDSixLQUFBLEdBQU87OytCQUNQLFVBQUEsR0FBWTs7OztHQUZtQixRQUFRLENBQUM7O0FBT3BDOzs7Ozs7O3dCQUdKLFNBQUEsR0FBVztJQUNQO01BQUEsSUFBQSxFQUFnQixRQUFRLENBQUMsT0FBekI7TUFDQSxHQUFBLEVBQWdCLE1BRGhCO01BRUEsWUFBQSxFQUFnQixhQUZoQjtNQUdBLGNBQUEsRUFBZ0Isa0JBSGhCO0tBRE87Ozs7O0dBSGEsUUFBUSxDQUFDOztBQWE3Qjs7Ozs7Ozs2QkFDSixLQUFBLEdBQU87Ozs7R0FEc0IsUUFBUSxDQUFDOztBQUt4QyxNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsS0FBQSxFQUFZLFdBQVo7RUFDQSxVQUFBLEVBQVksZ0JBRFo7Ozs7OztBQ3BFRixJQUFBLG1DQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsWUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLFFBQVI7O0FBSVA7Ozs7Ozs7MEJBRUosYUFBQSxHQUNFO0lBQUEsY0FBQSxFQUFzQixVQUF0QjtJQUNBLG1CQUFBLEVBQXNCLGVBRHRCOzs7MEJBR0YsVUFBQSxHQUFZLFNBQUE7V0FDVixJQUFDLENBQUEsZ0JBQUQsR0FBd0IsSUFBQSxRQUFRLENBQUMsVUFBVCxDQUFvQixVQUFwQixFQUFnQztNQUFFLEtBQUEsRUFBTyxJQUFUO0tBQWhDO0VBRGQ7OzBCQUdaLFFBQUEsR0FBVSxTQUFDLEVBQUQ7QUFDUixXQUFPLElBQUMsQ0FBQSxnQkFBZ0IsQ0FBQyxHQUFsQixDQUFzQixFQUF0QjtFQURDOzswQkFHVixhQUFBLEdBQWUsU0FBQTtBQUNiLFdBQU8sSUFBQyxDQUFBO0VBREs7Ozs7R0FaVyxVQUFVLENBQUM7O0FBaUJ2QyxNQUFNLENBQUMsT0FBUCxHQUFxQixJQUFBLGFBQUEsQ0FBQTs7Ozs7QUN0QnJCLElBQUEscUJBQUE7RUFBQTs7O0FBQUEsVUFBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUjs7QUFJUjs7Ozs7OztzQkFFSixLQUFBLEdBQU87O3NCQUVQLFdBQUEsR0FBYTtJQUFDO01BQUUsSUFBQSxFQUFNLFFBQVI7S0FBRDs7O3NCQUViLEtBQUEsR0FBTyxTQUFBO1dBQ0wsSUFBQyxDQUFBLFdBQUQsR0FBZSxLQUFLLENBQUMsT0FBTixDQUFjLFFBQWQsQ0FBdUIsQ0FBQyxPQUF4QixDQUFnQyxPQUFoQyxFQUF5QyxVQUF6QztFQURWOztzQkFHUCxNQUFBLEdBQVEsU0FBQTtJQUNOLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBQyxDQUFBLFdBQWI7V0FDQSxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsQ0FBb0IsSUFBQSxVQUFBLENBQVc7TUFBRSxLQUFBLEVBQU8sSUFBQyxDQUFBLFdBQVY7S0FBWCxDQUFwQjtFQUZNOzs7O0dBVGMsT0FBQSxDQUFRLHNCQUFSOztBQWV4QixNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUNsQmpCLElBQUEsY0FBQTtFQUFBOzs7QUFBTTs7Ozs7OzsyQkFDSixRQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOzsyQkFDVixTQUFBLEdBQVc7Ozs7R0FGZ0IsVUFBVSxDQUFDOztBQU14QyxNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUNQakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBLElBQUEscUNBQUE7RUFBQTs7O0FBQUEsT0FBQSxDQUFRLFdBQVI7O0FBQ0EsU0FBQSxHQUFZLE9BQUEsQ0FBUSxjQUFSOztBQUNaLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG1CQUFSOztBQUtYOzs7Ozs7O3VCQUVKLE1BQUEsR0FDRTtJQUFBLEtBQUEsRUFBYyxNQUFkOzs7dUJBR0YsSUFBQSxHQUFNLFNBQUE7V0FDQSxJQUFBLGNBQUEsQ0FBZTtNQUFFLFNBQUEsRUFBVyxJQUFDLENBQUEsU0FBZDtLQUFmO0VBREE7Ozs7R0FOaUIsT0FBQSxDQUFRLHVCQUFSOztBQWV6QixNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUNuQmpCLElBQUEsZ0NBQUE7RUFBQTs7O0FBQUEsb0JBQUEsR0FBdUI7RUFDckI7SUFBRSxRQUFBLEVBQVUsTUFBWjtHQURxQjs7O0FBU2pCOzs7Ozs7O3VCQUVKLGFBQUEsR0FDRTtJQUFBLGFBQUEsRUFBZSxZQUFmOzs7dUJBR0YsVUFBQSxHQUFZLFNBQUE7QUFHVixXQUFXLElBQUEsT0FBQSxDQUFRLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxPQUFELEVBQVUsTUFBVjtlQUdqQixTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWQsQ0FBNEI7VUFBRSxPQUFBLEVBQVMsb0JBQVg7U0FBNUIsQ0FDQSxDQUFDLElBREQsQ0FDTyxTQUFDLE1BQUQ7QUFPTCxpQkFBTyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQWQsQ0FBQSxDQUEwQixDQUFDLElBQTNCLENBQWdDLFNBQUMsQ0FBRDtZQUVyQyxPQUFPLENBQUMsR0FBUixDQUFZLENBQVo7WUFFQSxDQUFBLEdBQUksQ0FBRSxDQUFBLENBQUE7bUJBR04sQ0FBQyxDQUFDLElBQUYsQ0FBQSxDQUFRLENBQUMsSUFBVCxDQUFjLFNBQUE7Y0FFWixPQUFPLENBQUMsR0FBUixDQUFZLE1BQVo7cUJBR0EsQ0FBQyxDQUFDLG1CQUFGLENBQXNCLENBQXRCLENBQXdCLENBQUMsSUFBekIsQ0FBOEIsU0FBQTtnQkFFNUIsT0FBTyxDQUFDLEdBQVIsQ0FBWSxxQkFBWjt1QkFFQSxNQUFNLENBQUMsQ0FBUCxHQUFXO2NBSmlCLENBQTlCO1lBTFksQ0FBZDtVQVBxQyxDQUFoQztRQVBGLENBRFA7TUFIaUI7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVI7RUFIRDs7OztHQU5XLFVBQVUsQ0FBQzs7QUFpRHBDLE1BQU0sQ0FBQyxPQUFQLEdBQXFCLElBQUEsVUFBQSxDQUFBOzs7OztBQzdEckI7O0FDRUEsSUFBQSxRQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3FCQUVKLFdBQUEsR0FBYSxTQUFDLENBQUQ7SUFDWCxDQUFDLENBQUMsZUFBRixDQUFBO1dBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBWixDQUFnQixRQUFRLENBQUMsTUFBTSxDQUFDLFNBQWhCLENBQTBCLElBQTFCLENBQWhCO0VBRlc7Ozs7R0FGUSxVQUFVLENBQUM7O0FBUWxDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7OztBQ1JqQixJQUFBLFVBQUE7RUFBQTs7O0FBQU07Ozs7Ozs7dUJBRUosTUFBQSxHQUNFO0lBQUEsYUFBQSxFQUFnQixhQUFoQjs7Ozs7R0FIcUIsT0FBQSxDQUFRLFlBQVI7O0FBT3pCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7OztBQ1JqQixJQUFBLDJCQUFBO0VBQUE7OztBQUFBLFVBQUEsR0FBYSxTQUFDLElBQUQsRUFBTyxHQUFQO1NBQ1gsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLE9BQXZCLENBQStCLENBQUMsT0FBaEMsQ0FBd0MsSUFBeEMsRUFBOEMsR0FBOUM7QUFEVzs7QUFLUDs7Ozs7Ozs0QkFFSixVQUFBLEdBQVksU0FBQyxPQUFEOztNQUFDLFVBQVE7O0lBQ25CLElBQUMsQ0FBQSxJQUFJLENBQUMsUUFBTixHQUFzQixJQUFDLENBQUE7SUFDdkIsSUFBQyxDQUFBLElBQUksQ0FBQyxVQUFOLEdBQXNCLElBQUMsQ0FBQTtXQUN2QixJQUFDLENBQUEsSUFBSSxDQUFDLFlBQU4sR0FBc0IsSUFBQyxDQUFBO0VBSGI7OzRCQUtaLFVBQUEsR0FBWSxTQUFDLEdBQUQ7O01BQUMsTUFBSTs7V0FDZixVQUFBLENBQVcsT0FBWCxFQUFvQixJQUFDLENBQUEsUUFBUyxDQUFBLE9BQUEsQ0FBVixJQUFzQixHQUExQztFQURVOzs0QkFHWixZQUFBLEdBQWMsU0FBQyxHQUFEOztNQUFDLE1BQUk7O1dBQ2pCLFVBQUEsQ0FBVyxTQUFYLEVBQXNCLElBQUMsQ0FBQSxRQUFTLENBQUEsU0FBQSxDQUFWLElBQXdCLEdBQTlDO0VBRFk7Ozs7R0FWYyxVQUFVLENBQUM7O0FBZXpDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7OztBQ3BCakIsSUFBQSxtQkFBQTtFQUFBOzs7QUFBTTs7Ozs7OztnQ0FFSixXQUFBLEdBQ0U7SUFBQSxTQUFBLEVBQVksZ0JBQVo7SUFDQSxNQUFBLEVBQVksYUFEWjtJQUVBLE9BQUEsRUFBWSxjQUZaOzs7Z0NBSUYsY0FBQSxHQUFnQixTQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLE9BQWhCO0FBQ2QsUUFBQTtvRUFBSyxDQUFDLFVBQVcsT0FBTyxRQUFRO0VBRGxCOztnQ0FHaEIsV0FBQSxHQUFhLFNBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0IsT0FBbEI7QUFDWCxRQUFBO2lFQUFLLENBQUMsT0FBUSxPQUFPLFVBQVU7RUFEcEI7O2dDQUdiLFlBQUEsR0FBYyxTQUFDLEtBQUQsRUFBUSxRQUFSLEVBQWtCLE9BQWxCO0FBQ1osUUFBQTtrRUFBSyxDQUFDLFFBQVMsT0FBTyxVQUFVO0VBRHBCOzs7O0dBYmtCLFVBQVUsQ0FBQzs7QUFrQjdDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7OztBQ2RqQixJQUFBLG9CQUFBO0VBQUE7OztBQUFNOzs7Ozs7O2lDQUVKLEVBQUEsR0FDRTtJQUFBLE1BQUEsRUFBUSxxQkFBUjs7O2lDQUVGLE1BQUEsR0FDRTtJQUFBLGlDQUFBLEVBQW1DLGVBQW5DOzs7aUNBRUYsVUFBQSxHQUFZLFNBQUMsT0FBRDs7TUFBQyxVQUFROztJQUNuQixJQUFDLENBQUEsSUFBSSxDQUFDLGFBQU4sR0FBc0IsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQUcsS0FBQyxDQUFBLGFBQUQsQ0FBQTtNQUFIO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtXQUN0QixJQUFDLENBQUEsSUFBSSxDQUFDLFlBQU4sR0FBc0IsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQUcsS0FBQyxDQUFBLFlBQUQsQ0FBQTtNQUFIO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtFQUZaOztpQ0FJWixhQUFBLEdBQWUsU0FBQyxDQUFEO0FBQU8sUUFBQTttRUFBSyxDQUFDLFNBQVU7RUFBdkI7O2lDQUNmLGFBQUEsR0FBZSxTQUFBO1dBQUcsSUFBQyxDQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBWCxDQUFvQixVQUFwQjtFQUFIOztpQ0FDZixZQUFBLEdBQWMsU0FBQTtXQUFJLElBQUMsQ0FBQSxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVgsQ0FBdUIsVUFBdkI7RUFBSjs7OztHQWRtQixVQUFVLENBQUM7O0FBa0I5QyxNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUN0QmpCLElBQUEsZUFBQTtFQUFBOzs7QUFBTTs7Ozs7Ozs0QkFFSixFQUFBLEdBQ0U7SUFBQSxRQUFBLEVBQVUsdUJBQVY7Ozs0QkFFRixVQUFBLEdBQVksU0FBQTtXQUVWLElBQUMsQ0FBQSxJQUFJLENBQUMsYUFBTixHQUFzQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFBRyxLQUFDLENBQUEsS0FBRCxDQUFBO01BQUg7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBO0VBRlo7OzRCQUlaLEtBQUEsR0FBTyxTQUFBO0lBQ0wsSUFBQyxDQUFBLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBYixDQUFxQixNQUFyQjtXQUNBLElBQUMsQ0FBQSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQWIsQ0FBcUIsU0FBckI7RUFGSzs7NEJBSVAsUUFBQSxHQUFVLFNBQUE7QUFBRyxRQUFBO2lEQUFZLENBQUUsT0FBZCxDQUFBO0VBQUg7OzRCQUNWLGVBQUEsR0FBaUIsU0FBQTtXQUFHLElBQUMsQ0FBQSxLQUFELENBQUE7RUFBSDs7OztHQWRXLFVBQVUsQ0FBQzs7QUFrQnpDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7OztBQ2pCakIsVUFBVSxDQUFDLFNBQVgsR0FBdUIsT0FBQSxDQUFRLGFBQVI7O0FBTXZCLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQTFCLEdBQTJDLFNBQUE7RUFHekMsSUFBRyxDQUFDLElBQUksQ0FBQyxLQUFUO0FBQ0UsV0FBTyxHQURUO0dBQUEsTUFLSyxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBZDtBQUNILFdBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBckIsQ0FBOEIsSUFBSSxDQUFDLEtBQW5DLEVBREo7O0FBSUwsU0FBTyxDQUFDLENBQUMsS0FBRixDQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBbkI7QUFaa0M7Ozs7O0FDSjNDLElBQUE7O0FBQU07OztFQUlKLGFBQUMsQ0FBQSxRQUFELEdBQVcsU0FBQyxLQUFEO0FBSVQsUUFBQTtJQUFBLElBQUEsR0FBTyxDQUFDLENBQUMsS0FBRixDQUFRLEtBQUssQ0FBQyxVQUFkO0FBSVA7QUFBQSxTQUFBLHFDQUFBOztNQUdFLElBQVksSUFBQSxLQUFRLGFBQXBCO0FBQUEsaUJBQUE7O01BR0EsSUFBSyxDQUFBLElBQUEsQ0FBTCxHQUFhLElBQUMsQ0FBQSxTQUFVLENBQUEsSUFBQSxDQUFLLENBQUMsS0FBakIsQ0FBdUIsS0FBdkI7QUFOZjtBQVNBLFdBQU87RUFqQkU7Ozs7OztBQXFCYixNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUN6QmpCLElBQUEsZUFBQTtFQUFBOzs7QUFBTTs7Ozs7Ozs0QkFDSixLQUFBLEdBQU8sT0FBQSxDQUFRLFNBQVI7Ozs7R0FEcUIsUUFBUSxDQUFDOztBQUt2QyxNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUNUakIsSUFBQSx5QkFBQTtFQUFBOzs7O0FBQUEsT0FBQSxDQUFRLFdBQVI7O0FBQ0EsU0FBQSxHQUFZLE9BQUEsQ0FBUSxtQkFBUjs7QUFRTjs7Ozs7Ozs7MkJBRUosVUFBQSxHQUFZLFNBQUMsT0FBRDs7TUFBQyxVQUFVOztJQUNyQixJQUFDLENBQUEsU0FBRCxHQUFhLE9BQU8sQ0FBQztXQUNyQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsT0FBdkIsQ0FBK0IsQ0FBQyxPQUFoQyxDQUF3QyxZQUF4QyxDQUFxRCxDQUFDLElBQXRELENBQTJELENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxVQUFEO1FBQ3pELEtBQUMsQ0FBQSxVQUFELEdBQWM7ZUFDZCxLQUFDLENBQUEsVUFBVSxDQUFDLEVBQVosQ0FBZSxRQUFmLEVBQXlCLEtBQUMsQ0FBQSxZQUExQixFQUF3QyxLQUF4QztNQUZ5RDtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBM0Q7RUFGVTs7MkJBTVosV0FBQSxHQUNFO0lBQUEsV0FBQSxFQUFrQixLQUFsQjtJQUNBLGFBQUEsRUFBa0IsT0FEbEI7SUFFQSxhQUFBLEVBQWtCLE9BRmxCO0lBR0EsZUFBQSxFQUFrQixTQUhsQjtJQUlBLGVBQUEsRUFBa0IsU0FKbEI7OzsyQkFNRixHQUFBLEdBQUssU0FBQyxPQUFEOztNQUFDLFVBQVU7O1dBQ2QsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQWdCLE9BQWhCO0VBREc7OzJCQUdMLEtBQUEsR0FBTyxTQUFBO1dBQ0wsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLENBQUE7RUFESzs7MkJBR1AsS0FBQSxHQUFPLFNBQUMsT0FBRDs7TUFBQyxVQUFROztXQUNkLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFnQixDQUFDLENBQUMsTUFBRixDQUFVLE9BQVYsRUFBbUI7TUFBRSxPQUFBLEVBQVUsUUFBWjtLQUFuQixDQUFoQjtFQURLOzsyQkFHUCxPQUFBLEdBQVMsU0FBQyxPQUFEOztNQUFDLFVBQVE7O1dBQ2hCLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFnQixDQUFDLENBQUMsTUFBRixDQUFVLE9BQVYsRUFBbUI7TUFBRSxPQUFBLEVBQVUsU0FBWjtLQUFuQixDQUFoQjtFQURPOzsyQkFHVCxPQUFBLEdBQVMsU0FBQyxPQUFEOztNQUFDLFVBQVE7O1dBQ2hCLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFnQixDQUFDLENBQUMsTUFBRixDQUFVLE9BQVYsRUFBbUI7TUFBRSxPQUFBLEVBQVUsU0FBWjtLQUFuQixDQUFoQjtFQURPOzsyQkFHVCxZQUFBLEdBQWMsU0FBQTtJQUNaLElBQUEsQ0FBTyxJQUFDLENBQUEsUUFBUjtNQUNFLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxDQUFvQixJQUFBLFNBQUEsQ0FBVTtRQUFFLFVBQUEsRUFBWSxJQUFDLENBQUEsVUFBZjtPQUFWLENBQXBCO2FBQ0EsSUFBQyxDQUFBLFFBQUQsR0FBWSxLQUZkOztFQURZOzs7O0dBOUJhLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBcUNqRCxNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUMxQ2pCLElBQUEsVUFBQTtFQUFBOzs7QUFBTTs7Ozs7Ozt1QkFFSixRQUFBLEdBQ0U7SUFBQSxPQUFBLEVBQVMsSUFBVDtJQUNBLFdBQUEsRUFBYSxJQURiO0lBRUEsT0FBQSxFQUFTLE1BRlQ7Ozt1QkFXRixPQUFBLEdBQVMsU0FBQTtXQUNQLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixDQUFtQixJQUFuQjtFQURPOzs7O0dBZGMsUUFBUSxDQUFDOztBQW1CbEMsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7O0FDdkJqQixJQUFBLDZCQUFBO0VBQUE7OztBQUFBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLGNBQVI7O0FBUVo7Ozs7Ozs7eUJBRUosYUFBQSxHQUNFO0lBQUEsa0JBQUEsRUFBb0IsZUFBcEI7Ozt5QkFFRixNQUFBLEdBQVE7O3lCQUVSLGFBQUEsR0FBZSxTQUFBO0FBQ2IsV0FBVyxJQUFBLE9BQUEsQ0FBUSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsT0FBRCxFQUFTLE1BQVQ7UUFDakIsS0FBQyxDQUFBLFdBQUQsS0FBQyxDQUFBLFNBQWUsSUFBQSxlQUFBLENBQUE7UUFDaEIsT0FBQSxDQUFRLEtBQUMsQ0FBQSxNQUFUO01BRmlCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFSO0VBREU7Ozs7R0FQVSxRQUFRLENBQUMsVUFBVSxDQUFDOztBQWUvQyxNQUFNLENBQUMsT0FBUCxHQUFxQixJQUFBLFlBQUEsQ0FBQTs7Ozs7QUNwQnJCLElBQUEscUJBQUE7RUFBQTs7OztBQUFNOzs7Ozs7Ozt1QkFDSixTQUFBLEdBQVc7O3VCQUNYLFFBQUEsR0FBVSxPQUFBLENBQVEseUJBQVI7O3VCQUVWLFVBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTyxlQUFQOzs7dUJBRUYsRUFBQSxHQUNFO0lBQUEsS0FBQSxFQUFPLHNCQUFQOzs7dUJBRUYsTUFBQSxHQUNFO0lBQUEsaUJBQUEsRUFBbUIsU0FBbkI7Ozt1QkFFRixNQUFBLEdBQVEsU0FBQTtBQUNOLFFBQUE7SUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsU0FBWDtXQUNWLFVBQUEsQ0FBWSxJQUFDLENBQUEsT0FBYixFQUFzQixPQUF0QjtFQUZNOzt1QkFJUixRQUFBLEdBQVUsU0FBQTtXQUNSLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFBO0VBRFE7O3VCQUdWLE1BQUEsR0FBUSxTQUFBO1dBQ04sSUFBQyxDQUFBLEdBQUcsQ0FBQyxXQUFMLENBQWtCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUNoQixVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBdkMsQ0FBNEMsS0FBNUM7TUFEZ0I7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxCO0VBRE07O3VCQUtSLE9BQUEsR0FBUyxTQUFBO0FBQ1AsUUFBQTtzREFBaUIsQ0FBRSxNQUFuQixDQUEyQixJQUFDLENBQUEsS0FBNUI7RUFETzs7OztHQXpCYyxVQUFVLENBQUM7O0FBOEI5Qjs7Ozs7OztzQkFDSixTQUFBLEdBQVc7O3NCQUNYLFNBQUEsR0FBVzs7OztHQUZXLFVBQVUsQ0FBQzs7QUFNbkMsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7O0FDdkNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkEsSUFBQSw2QkFBQTtFQUFBOzs7QUFBTTs7Ozs7Ozt3QkFDSixRQUFBLEdBQVU7O3dCQUNWLFNBQUEsR0FBVzs7d0JBRVgsTUFBQSxHQUNFO0lBQUEsT0FBQSxFQUFTLFNBQVQ7Ozt3QkFFRixPQUFBLEdBQVMsU0FBQTtXQUNQLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixTQUF2QixDQUFpQyxDQUFDLE9BQWxDLENBQTBDLE1BQTFDO0VBRE87Ozs7R0FQZSxFQUFFLENBQUM7O0FBWXZCOzs7Ozs7OzZCQUVKLFVBQUEsR0FBWSxTQUFDLE9BQUQ7O01BQUMsVUFBVTs7V0FDckIsSUFBQyxDQUFBLFNBQUQsR0FBYyxPQUFPLENBQUM7RUFEWjs7NkJBR1osV0FBQSxHQUNFO0lBQUEsZUFBQSxFQUFrQixTQUFsQjtJQUNBLGNBQUEsRUFBa0IsYUFEbEI7SUFFQSxjQUFBLEVBQWtCLGFBRmxCOzs7NkJBSUYsV0FBQSxHQUFhLFNBQUE7V0FDWCxDQUFBLENBQUUsaUJBQUYsQ0FBb0IsQ0FBQyxRQUFyQixDQUE4QixRQUE5QjtFQURXOzs2QkFHYixXQUFBLEdBQWEsU0FBQTtXQUNYLENBQUEsQ0FBRSxpQkFBRixDQUFvQixDQUFDLFdBQXJCLENBQWlDLFFBQWpDO0VBRFc7OzZCQUdiLE9BQUEsR0FBUyxTQUFBO0lBQ1AsSUFBQSxDQUFPLElBQUMsQ0FBQSxJQUFSO01BQ0UsSUFBQyxDQUFBLElBQUQsR0FBWSxJQUFBLFdBQUEsQ0FBQTthQUNaLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxDQUFnQixJQUFDLENBQUEsSUFBakIsRUFGRjs7RUFETzs7OztHQWhCb0IsRUFBRSxDQUFDOztBQXVCbEMsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7O0FDL0JqQixJQUFBLFNBQUE7RUFBQTs7O0FBQU07Ozs7Ozs7c0JBRUosV0FBQSxHQUFhOztzQkFFYixVQUFBLEdBQVksU0FBQyxPQUFEO0lBR1YsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUdYLElBQUMsQ0FBQSxTQUFELEdBQWEsT0FBTyxDQUFDO0lBR3JCLElBQUMsQ0FBQSxFQUFELENBQUksY0FBSixFQUFvQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7MkRBQUcsS0FBQyxDQUFBLGNBQWU7TUFBbkI7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXBCO0lBQ0EsSUFBQyxDQUFBLEVBQUQsQ0FBSSxjQUFKLEVBQW9CLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTsyREFBRyxLQUFDLENBQUEsY0FBZTtNQUFuQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBcEI7SUFDQSxJQUFDLENBQUEsRUFBRCxDQUFJLGVBQUosRUFBcUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBOzREQUFHLEtBQUMsQ0FBQSxlQUFnQjtNQUFwQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckI7SUFDQSxJQUFDLENBQUEsRUFBRCxDQUFJLE9BQUosRUFBYSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7cURBQUcsS0FBQyxDQUFBLFFBQVM7TUFBYjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBYjtJQUNBLElBQUMsQ0FBQSxFQUFELENBQUksUUFBSixFQUFjLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtzREFBRyxLQUFDLENBQUEsU0FBVTtNQUFkO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFkO0lBQ0EsSUFBQyxDQUFBLEVBQUQsQ0FBSSxPQUFKLEVBQWEsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO3FEQUFHLEtBQUMsQ0FBQSxRQUFTO01BQWI7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWI7V0FHQSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxNQUExQztFQWpCVTs7c0JBbUJaLGFBQUEsR0FBZSxTQUFBO1dBQ2IsUUFBUSxDQUFDLEtBQVQsR0FBaUIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFULEVBQVksT0FBWjtFQURKOztzQkFHZixrQkFBQSxHQUFvQixTQUFBO0FBQ2xCLFFBQUE7SUFBQSxXQUFBLEdBQWMsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFULEVBQVksYUFBWjtJQUNkLElBQW9FLFdBQXBFO2FBQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQW9DLENBQUMsT0FBckMsQ0FBNkMsS0FBN0MsRUFBb0QsV0FBcEQsRUFBQTs7RUFGa0I7O3NCQUlwQixPQUFBLEdBQVMsU0FBQTtJQUNQLElBQUMsQ0FBQSxhQUFELENBQUE7V0FDQSxJQUFDLENBQUEsa0JBQUQsQ0FBQTtFQUZPOzs7O0dBOUJhLFFBQVEsQ0FBQyxPQUFPLENBQUM7O0FBb0N6QyxNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUNuQ2pCLElBQUEsVUFBQTtFQUFBOzs7QUFBTTs7Ozs7Ozt1QkFFSixVQUFBLEdBQVksU0FBQyxPQUFEO1dBQWEsSUFBQyxDQUFBLFNBQUQsR0FBYSxPQUFPLENBQUM7RUFBbEM7Ozs7R0FGVyxRQUFRLENBQUMsT0FBTyxDQUFDOztBQU0xQyxNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUNaakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1UEEsSUFBQSxvQkFBQTtFQUFBOzs7QUFBTTs7Ozs7OztpQ0FDSixTQUFBLEdBQVc7O2lDQUNYLFFBQUEsR0FBVSxPQUFBLENBQVEsK0JBQVI7O2lDQU1WLEVBQUEsR0FDRTtJQUFBLEdBQUEsRUFBSyxrQkFBTDs7O2lDQUVGLE1BQUEsR0FDRTtJQUFBLGVBQUEsRUFBaUIsWUFBakI7OztpQ0FHRixXQUFBLEdBQWEsU0FBQyxDQUFEO0FBR1gsUUFBQTtJQUFBLENBQUMsQ0FBQyxjQUFGLENBQUE7SUFFQSxHQUFBLEdBQU0sSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBZCxDQUF3QjtNQUFFLE9BQUEsRUFBUyxDQUFDLENBQUMsT0FBYjtLQUF4QjtJQUlOLElBQUcsQ0FBQyxDQUFDLElBQUYsS0FBVSxTQUFiO01BQ0UsSUFBQyxDQUFBLE9BQUQsQ0FBUyxjQUFULEVBQXlCLEdBQUcsQ0FBQyxNQUFKLENBQUEsQ0FBekIsRUFERjs7SUFHQSxJQUFHLENBQUMsQ0FBQyxJQUFGLEtBQVUsT0FBYjthQUNFLElBQUMsQ0FBQSxDQUFELENBQUcsZ0JBQUEsR0FBaUIsQ0FBQyxDQUFDLE9BQW5CLEdBQTJCLEdBQTlCLENBQWlDLENBQUMsV0FBbEMsQ0FBOEMsUUFBOUMsRUFERjtLQUFBLE1BQUE7YUFHRSxJQUFDLENBQUEsQ0FBRCxDQUFHLGdCQUFBLEdBQWlCLENBQUMsQ0FBQyxPQUFuQixHQUEyQixHQUE5QixDQUFpQyxDQUFDLFFBQWxDLENBQTJDLFFBQTNDLEVBSEY7O0VBWlc7O2lDQWtCYixVQUFBLEdBQVksU0FBQyxDQUFEO0FBR1YsUUFBQTtJQUFBLEVBQUEsR0FBTSxDQUFBLENBQUUsQ0FBQyxDQUFDLGFBQUo7SUFDTixPQUFBLEdBQVUsRUFBRSxDQUFDLElBQUgsQ0FBUSxTQUFSO0lBR1YsR0FBQSxHQUFNLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQWQsQ0FBd0I7TUFBRSxPQUFBLEVBQVMsT0FBWDtLQUF4QjtJQUdOLElBQUMsQ0FBQSxPQUFELENBQVMsY0FBVCxFQUF5QixHQUFHLENBQUMsTUFBSixDQUFBLENBQXpCO0lBR0EsRUFBRSxDQUFDLElBQUgsQ0FBQTtFQWJVOzs7O0dBakNxQixFQUFFLENBQUM7O0FBb0R0QyxNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUNyRGpCLElBQUEsa0NBQUE7RUFBQTs7O0FBQUEsb0JBQUEsR0FBdUIsT0FBQSxDQUFRLDZCQUFSOztBQUlqQjs7Ozs7Ozt5QkFDSixRQUFBLEdBQVUsT0FBQSxDQUFRLDJCQUFSOzt5QkFHVixlQUFBLEdBQWlCLFNBQUE7QUFDZixRQUFBO0lBQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQWQsQ0FBQTtBQUVQLFdBQU87TUFDTCxFQUFBLEVBQUksQ0FBQyxDQUFDLEtBQUYsQ0FBUSxJQUFSLEVBQWM7UUFBRSxHQUFBLEVBQUssSUFBUDtPQUFkLENBREM7TUFFTCxFQUFBLEVBQUksQ0FBQyxDQUFDLEtBQUYsQ0FBUSxJQUFSLEVBQWM7UUFBRSxHQUFBLEVBQUssSUFBUDtPQUFkLENBRkM7TUFHTCxFQUFBLEVBQUksQ0FBQyxDQUFDLEtBQUYsQ0FBUSxJQUFSLEVBQWM7UUFBRSxHQUFBLEVBQUssSUFBUDtPQUFkLENBSEM7TUFJTCxFQUFBLEVBQUksQ0FBQyxDQUFDLEtBQUYsQ0FBUSxJQUFSLEVBQWM7UUFBRSxHQUFBLEVBQUssSUFBUDtPQUFkLENBSkM7TUFLTCxFQUFBLEVBQUksQ0FBQyxDQUFDLEtBQUYsQ0FBUSxJQUFSLEVBQWM7UUFBRSxHQUFBLEVBQUssSUFBUDtPQUFkLENBTEM7O0VBSFE7Ozs7R0FKUTs7QUFpQjNCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7OztBQ3JCakIsSUFBQSxzQ0FBQTtFQUFBOzs7QUFBQSxvQkFBQSxHQUF1QixPQUFBLENBQVEsNkJBQVI7O0FBSWpCOzs7Ozs7OzZCQUdKLGVBQUEsR0FBaUIsU0FBQTtBQUNmLFFBQUE7SUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBZCxDQUFBO0FBRVAsV0FBTztNQUNMLEVBQUEsRUFBSSxDQUFDLENBQUMsS0FBRixDQUFRLElBQVIsRUFBYztRQUFFLEdBQUEsRUFBSyxTQUFQO09BQWQsQ0FEQzs7RUFIUTs7OztHQUhZOztBQVkvQixNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUNoQmpCLElBQUEsbUNBQUE7RUFBQTs7O0FBQUEsb0JBQUEsR0FBdUIsT0FBQSxDQUFRLDZCQUFSOztBQUlqQjs7Ozs7OzswQkFHSixlQUFBLEdBQWlCLFNBQUE7QUFDZixRQUFBO0lBQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQWQsQ0FBQTtBQUVQLFdBQU87TUFDTCxFQUFBLEVBQUksQ0FBQyxDQUFDLEtBQUYsQ0FBUSxJQUFSLEVBQWM7UUFBRSxHQUFBLEVBQUssVUFBUDtPQUFkLENBREM7O0VBSFE7Ozs7R0FIUzs7QUFZNUIsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7O0FDaEJqQixJQUFBLGlDQUFBO0VBQUE7OztBQUFBLG9CQUFBLEdBQXVCLE9BQUEsQ0FBUSw2QkFBUjs7QUFJakI7Ozs7Ozs7d0JBR0osZUFBQSxHQUFpQixTQUFBO0FBQ2YsUUFBQTtJQUFBLElBQUEsR0FBTyxJQUFDLENBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFkLENBQUE7QUFFUCxXQUFPO01BQ0wsRUFBQSxFQUFJLENBQUMsQ0FBQyxLQUFGLENBQVEsSUFBUixFQUFjO1FBQUUsR0FBQSxFQUFLLFFBQVA7T0FBZCxDQURDOztFQUhROzs7O0dBSE87O0FBWTFCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7OztBQ2hCakIsSUFBQSxnQ0FBQTtFQUFBOzs7QUFBQSxvQkFBQSxHQUF1QixPQUFBLENBQVEsNkJBQVI7O0FBSWpCOzs7Ozs7O3VCQUNKLFFBQUEsR0FBVSxPQUFBLENBQVEsNkJBQVI7O3VCQUdWLGVBQUEsR0FBaUIsU0FBQTtBQUNmLFFBQUE7SUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBZCxDQUFBO0FBRVAsV0FBTztNQUNMLEVBQUEsRUFBSSxDQUFDLENBQUMsS0FBRixDQUFRLElBQVIsRUFBYztRQUFFLEdBQUEsRUFBSyxRQUFQO09BQWQsQ0FEQztNQUVMLEVBQUEsRUFBSSxDQUFDLENBQUMsS0FBRixDQUFRLElBQVIsRUFBYztRQUFFLEdBQUEsRUFBSyxRQUFQO09BQWQsQ0FGQztNQUdMLEVBQUEsRUFBSSxDQUFDLENBQUMsS0FBRixDQUFRLElBQVIsRUFBYztRQUFFLEdBQUEsRUFBSyxRQUFQO09BQWQsQ0FIQztNQUlMLEVBQUEsRUFBSSxDQUFDLENBQUMsS0FBRixDQUFRLElBQVIsRUFBYztRQUFFLEdBQUEsRUFBSyxRQUFQO09BQWQsQ0FKQztNQUtMLEVBQUEsRUFBSSxDQUFDLENBQUMsS0FBRixDQUFRLElBQVIsRUFBYztRQUFFLEdBQUEsRUFBSyxRQUFQO09BQWQsQ0FMQztNQU1MLEdBQUEsRUFBSyxDQUFDLENBQUMsS0FBRixDQUFRLElBQVIsRUFBYztRQUFFLEdBQUEsRUFBSyxTQUFQO09BQWQsQ0FOQTs7RUFIUTs7OztHQUpNOztBQWtCekIsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7O0FDdEJqQixJQUFBLG1HQUFBO0VBQUE7OztBQUFBLFNBQUEsR0FBWSxPQUFBLENBQVEsc0JBQVI7O0FBQ1osWUFBQSxHQUFlLE9BQUEsQ0FBUSx5QkFBUjs7QUFDZixVQUFBLEdBQWEsT0FBQSxDQUFRLDJCQUFSOztBQUNiLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUSw2QkFBUjs7QUFDbkIsYUFBQSxHQUFnQixPQUFBLENBQVEsMEJBQVI7O0FBQ2hCLFdBQUEsR0FBYyxPQUFBLENBQVEsd0JBQVI7O0FBSVI7Ozs7Ozs7NkJBQ0osU0FBQSxHQUFXOzs2QkFDWCxRQUFBLEdBQVUsT0FBQSxDQUFRLCtCQUFSOzs2QkFFVixRQUFBLEdBQVU7SUFDUjtNQUFFLElBQUEsRUFBTSxlQUFSO01BQTBCLElBQUEsRUFBTSxVQUFoQztNQUE2QyxPQUFBLEVBQVMsVUFBdEQ7TUFBa0UsU0FBQSxFQUFTLElBQTNFO0tBRFEsRUFFUjtNQUFFLElBQUEsRUFBTSxnQkFBUjtNQUEwQixJQUFBLEVBQU0sUUFBaEM7TUFBNEMsT0FBQSxFQUFTLFFBQXJEO0tBRlEsRUFHUjtNQUFFLElBQUEsRUFBTSxzQkFBUjtNQUFtQyxJQUFBLEVBQU0sVUFBekM7TUFBd0QsT0FBQSxFQUFTLFVBQWpFO0tBSFEsRUFJUjtNQUFFLElBQUEsRUFBTSxhQUFSO01BQTBCLElBQUEsRUFBTSxPQUFoQztNQUE0QyxPQUFBLEVBQVMsT0FBckQ7S0FKUSxFQUtSO01BQUUsSUFBQSxFQUFNLGFBQVI7TUFBMEIsSUFBQSxFQUFNLFlBQWhDO01BQWlELE9BQUEsRUFBUyxLQUExRDtLQUxROzs7NkJBUVYsZ0JBQUEsR0FBa0IsU0FBQyxZQUFEO0lBR2hCLFlBQVksQ0FBQyxFQUFiLENBQWdCLGNBQWhCLEVBQWdDLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxHQUFEO2VBQVMsS0FBQyxDQUFBLE9BQUQsQ0FBUyxjQUFULEVBQXlCLEdBQXpCO01BQVQ7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWhDO1dBR0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxJQUFmLENBQW9CLFlBQXBCO0VBTmdCOzs2QkFRbEIsa0JBQUEsR0FBb0IsU0FBQTtXQUNsQixJQUFDLENBQUEsZ0JBQUQsQ0FBc0IsSUFBQSxZQUFBLENBQWE7TUFBRSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQVY7TUFBaUIsSUFBQSxFQUFNLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBaEM7S0FBYixDQUF0QjtFQURrQjs7NkJBR3BCLGdCQUFBLEdBQWtCLFNBQUE7V0FDaEIsSUFBQyxDQUFBLGdCQUFELENBQXNCLElBQUEsVUFBQSxDQUFXO01BQUUsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFWO01BQWlCLElBQUEsRUFBTSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQWhDO0tBQVgsQ0FBdEI7RUFEZ0I7OzZCQUdsQixrQkFBQSxHQUFvQixTQUFBO1dBQ2xCLElBQUMsQ0FBQSxnQkFBRCxDQUFzQixJQUFBLGdCQUFBLENBQWlCO01BQUUsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFWO01BQWlCLElBQUEsRUFBTSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQWhDO0tBQWpCLENBQXRCO0VBRGtCOzs2QkFHcEIsZUFBQSxHQUFpQixTQUFBO1dBQ2YsSUFBQyxDQUFBLGdCQUFELENBQXNCLElBQUEsYUFBQSxDQUFjO01BQUUsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFWO01BQWlCLElBQUEsRUFBTSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQWhDO0tBQWQsQ0FBdEI7RUFEZTs7NkJBR2pCLGFBQUEsR0FBZSxTQUFBO1dBQ2IsSUFBQyxDQUFBLGdCQUFELENBQXNCLElBQUEsV0FBQSxDQUFZO01BQUUsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFWO01BQWlCLElBQUEsRUFBTSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQWhDO0tBQVosQ0FBdEI7RUFEYTs7OztHQWhDYzs7QUFxQy9CLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7OztBQzlDakIsSUFBQSxTQUFBO0VBQUE7Ozs7QUFBTTs7Ozs7Ozs7c0JBRUosTUFBQSxHQUNFO0lBQUEsc0JBQUEsRUFBd0IsZ0JBQXhCOzs7c0JBRUYsUUFBQSxHQUFVOztzQkFFVixPQUFBLEdBQ0U7SUFBQSxhQUFBLEVBQWUsdUJBQWY7OztzQkFFRixRQUFBLEdBQVUsU0FBQTtBQUNSLFFBQUE7SUFBQSxHQUFBLEdBQU0sQ0FBQyxDQUFDLEtBQUYsQ0FBUSxDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsRUFBWSxVQUFaLENBQVIsRUFBaUM7TUFBRSxTQUFBLEVBQVMsSUFBWDtLQUFqQyxDQUFvRCxDQUFBLENBQUE7SUFDMUQsSUFBQSxDQUFjLEdBQWQ7QUFBQSxhQUFBOztXQUNBLElBQUMsQ0FBQSxhQUFELENBQWUsV0FBQSxHQUFZLEdBQUcsQ0FBQyxPQUEvQjtFQUhROztzQkFLVixhQUFBLEdBQWUsU0FBQTtBQUNiLFFBQUE7SUFBQSxJQUFBLEdBQU8sOENBQUEsU0FBQTtJQUNQLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBVCxFQUFlO01BQUUsUUFBQSxFQUFVLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBVCxFQUFZLFVBQVosQ0FBWjtLQUFmO0FBQ0EsV0FBTztFQUhNOztzQkFLZixjQUFBLEdBQWdCLFNBQUMsQ0FBRDtBQUNkLFFBQUE7SUFBQSxFQUFBLEdBQUssQ0FBQSxDQUFFLENBQUMsQ0FBQyxhQUFKO0lBQ0wsRUFBRSxDQUFDLFFBQUgsQ0FBWSxRQUFaLENBQXFCLENBQUMsUUFBdEIsQ0FBQSxDQUFnQyxDQUFDLFdBQWpDLENBQTZDLFFBQTdDO1dBQ0EsSUFBQyxDQUFBLGFBQUQsQ0FBZSxXQUFBLEdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSCxDQUFRLFNBQVIsQ0FBRCxDQUExQjtFQUhjOzs7O0dBcEJNLEVBQUUsQ0FBQzs7QUEyQjNCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuIyBBcHBsaWNhdGlvbiBjbGFzcyBkZWZpbml0aW9uXG4jIE1hbmFnZXMgbGlmZWN5Y2xlIGFuZCBib290c3RyYXBzIGFwcGxpY2F0aW9uXG5jbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdhcHAgcmVkaXJlY3QnOiAncmVkaXJlY3RUbydcblxuICAjIEludm9rZWQgYWZ0ZXIgY29uc3RydWN0b3JcbiAgaW5pdGlhbGl6ZTogLT5cblxuICAgICMgU3RhcnRzIEhlYWRlciBDb21wb25lbnRcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdoZWFkZXInKS50cmlnZ2VyKCdyZXNldCcpXG5cbiAgICAjIFN0YXJ0cyBIZW5zb24uanMgQ29tcG9uZW50c1xuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2JyZWFkY3J1bWInKS50cmlnZ2VyKCdyZWFkeScpXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnb3ZlcmxheScpLnRyaWdnZXIoJ3JlYWR5JylcbiAgICBAb25SZWFkeSgpXG4gICAgcmV0dXJuIHRydWVcblxuICAjIFN0YXJ0cyB0aGUgYXBwbGljYXRpb25cbiAgIyBTdGFydHMgQmFja2JvbmUuaGlzdG9yeSAoZW5hYmxlcyByb3V0aW5nKVxuICAjIEFuZCBpbml0aWFsaXplcyBzaWRlYmFyIG1vZHVsZVxuICBvblJlYWR5OiAtPlxuICAgIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKVxuXG4gICMgUmVkaXJlY3Rpb24gaW50ZXJmYWNlXG4gICMgVXNlZCBhY2Nyb3NzIHRoZSBhcHBsaWNhdGlvbiB0byByZWRpcmVjdFxuICAjIHRvIHNwZWNpZmljIHZpZXdzIGFmdGVyIHNwZWNpZmljIGFjdGlvbnNcbiAgcmVkaXJlY3RUbzogKHJvdXRlKSAtPlxuICAgIHdpbmRvdy5sb2NhdGlvbiA9IHJvdXRlXG4gICAgcmV0dXJuIHRydWVcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb25cbiIsIlxuIyBBcHBsaWNhdGlvbkxheW91dCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBNYXJpb25ldHRlLkxheW91dFZpZXcgdG8gbWFuYWdlXG4jIHRvcC1sZXZlbCBhcHBsaWNhdGlvbiByZWdpb25zXG5jbGFzcyBBcHBsaWNhdGlvbkxheW91dCBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICBlbDogJ2JvZHknXG5cbiAgdGVtcGxhdGU6IGZhbHNlXG5cbiAgcmVnaW9uczpcbiAgICBoZWFkZXI6ICAgICAnW2FwcC1yZWdpb249aGVhZGVyXSdcbiAgICBzaWRlYmFyOiAgICAnW2FwcC1yZWdpb249c2lkZWJhcl0nXG4gICAgYnJlYWRjcnVtYjogJ1thcHAtcmVnaW9uPWJyZWFkY3J1bWJdJ1xuICAgIG92ZXJsYXk6ICAgICdbYXBwLXJlZ2lvbj1vdmVybGF5XSdcbiAgICBmbGFzaDogICAgICAnW2FwcC1yZWdpb249Zmxhc2hdJ1xuICAgIG1haW46ICAgICAgICdbYXBwLXJlZ2lvbj1tYWluXSdcblxuIyAjICMgIyAjXG5cbiMgRXhwb3J0cyBpbnN0YW5jZVxubW9kdWxlLmV4cG9ydHMgPSBuZXcgQXBwbGljYXRpb25MYXlvdXQoKS5yZW5kZXIoKVxuIiwiXG4jIE1hcmlvbmV0dGUgQmVoYXZpb3IgTWFuaWZlc3Rcbm1vZHVsZS5leHBvcnRzID1cbiAgU3VibWl0QnV0dG9uOiAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi9zdWJtaXRCdXR0b24nXG4gIEZsYXNoZXM6ICAgICAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvZmxhc2hlcydcbiAgTW9kZWxFdmVudHM6ICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi9tb2RlbEV2ZW50cydcbiAgQmluZElucHV0czogICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi9iaW5kSW5wdXRzJ1xuICBUb29sdGlwczogICAgICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL3Rvb2x0aXBzJ1xuICBTZWxlY3RhYmxlQ2hpbGQ6ICByZXF1aXJlICcuL3NlbGVjdGFibGVDaGlsZCdcbiAgS2V5Ym9hcmRDb250cm9sczogIHJlcXVpcmUgJy4va2V5Ym9hcmRDb250cm9scydcbiAgU29ydGFibGVDaGlsZDogICAgcmVxdWlyZSAnLi9zb3J0YWJsZUNoaWxkJ1xuICBTb3J0YWJsZUxpc3Q6ICAgICByZXF1aXJlICcuL3NvcnRhYmxlTGlzdCdcbiIsIiMgTk9URSAtIHRoaXMgYmVoYXZpb3IgaGFzIG5vdCBiZWVuIHRlc3RlZCB3aXRoIG11bHRpcGxlIHZpZXdzIHNpbXVsdGFuZW91c2x5XG5cbiMgRW5hYmxlcyB2aWV3IGNhbGxiYWNrcyB0byBiZSB0cmlnZ2VyZWQgYnkga2V5Ym9hcmQgaW5wdXRcbmNsYXNzIEtleWJvYXJkQ29udHJvbHMgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAa2V5RXZlbnRzID0gQG9wdGlvbnMua2V5RXZlbnRzXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgQGFkZEV2ZW50TGlzdGVuZXIoKVxuXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBAcmVtb3ZlRXZlbnRMaXN0ZW5lcigpXG5cbiAga2V5QWN0aW9uOiAoZSkgPT5cblxuICAgICMgY29uc29sZS5sb2coZSk7XG5cbiAgICAjIElzb2xhdGVzIHRoZSBrZXlzdHJva2VcbiAgICAjIGtleUNvZGUgPSBlLmtleUNvZGVcblxuICAgIHJldHVybiBAdmlldy50cmlnZ2VyTWV0aG9kKCdrZXk6YWN0aW9uJywgZSlcblxuICAgICMgRG8gbm90aGluZyBpZiB0aGVyZSBpc24ndCBhblxuICAgICMgZXZlbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXlzdHJva2VcbiAgICAjIHJldHVybiB1bmxlc3MgQGtleUV2ZW50c1trZXlDb2RlXVxuXG4gICAgIyBQcmV2ZW50cyBhbnkgZGVmYXVsdCBhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXljb2RlXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAjIFRyaWdnZXJzIHRoZSBldmVudCBhc3NvY2lhdGVkIHdpdGhcbiAgICAjIHRoZSBrZXlzdHJva2Ugb24gdGhlIHZpZXcgaW5zdGFuY2VcbiAgICAjIHJldHVybiBAdmlldy50cmlnZ2VyTWV0aG9kKEBrZXlFdmVudHNba2V5Q29kZV0pXG5cbiAgYWRkRXZlbnRMaXN0ZW5lcjogLT5cbiAgICAkKGRvY3VtZW50KS5vbiAna2V5ZG93bicsIEBrZXlBY3Rpb25cbiAgICAkKGRvY3VtZW50KS5vbiAna2V5dXAnLCBAa2V5QWN0aW9uXG4gICAgIyAkKGRvY3VtZW50KS5vbiAna2V5cHJlc3MnLCBAa2V5QWN0aW9uXG4gICAgIyBSYWRpby5jaGFubmVsKCdmbGFzaCcpLnRyaWdnZXIoJ2FkZCcsIHsgY29udGV4dDogJ2luZm8nLCB0aW1lb3V0OiAxNTAwLCBtZXNzYWdlOiAnS2V5Ym9hcmQgY29udHJvbHMgZW5hYmxlZCd9KVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6IC0+XG4gICAgJChkb2N1bWVudCkub2ZmICdrZXlkb3duJywgQGtleUFjdGlvblxuICAgICQoZG9jdW1lbnQpLm9mZiAna2V5dXAnLCBAa2V5QWN0aW9uXG4gICAgIyAkKGRvY3VtZW50KS5vZmYgJ2tleXByZXNzJywgQGtleUFjdGlvblxuICAgICMgUmFkaW8uY2hhbm5lbCgnZmxhc2gnKS50cmlnZ2VyKCdhZGQnLCB7IGNvbnRleHQ6ICdpbmZvJywgdGltZW91dDogMTUwMCwgbWVzc2FnZTogJ0tleWJvYXJkIGNvbnRyb2xzIGRpc2FibGVkJ30pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkQ29udHJvbHNcbiIsIlxuY2xhc3MgU2VsZWN0YWJsZUNoaWxkIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIGNzczpcbiAgICBhY3RpdmU6ICdhY3RpdmUnXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayc6ICAnb25DbGljaydcblxuICBtb2RlbEV2ZW50czpcbiAgICAnc2VsZWN0ZWQnOiAnb25DbGljaydcblxuICAjIFNlbGVjdHMgYWN0aXZlTW9kZWwgb24gcmVuZGVyXG4gIG9uUmVuZGVyOiAtPlxuICAgIHJldHVybiB1bmxlc3MgQG9wdGlvbnMuc2V0QWN0aXZlXG5cbiAgIyBJbnZva2VkIHdoZW4gY2xpY2tlZFxuICBvbkNsaWNrOiAoZSkgLT5cbiAgICAjIEJ5cGFzcyBiZWhhdmlvciB3aXRoIGN1c3RvbSBvbkNsaWNrIGNhbGxiYWNrXG4gICAgcmV0dXJuIEB2aWV3Lm9uQ2xpY2soZSkgaWYgQHZpZXcub25DbGlja1xuXG4gICAgIyBQcmV2ZW50IGRvdWJsZS1jbGljayB1bmxlc3Mgc3BlY2lmaWNlZFxuICAgIGU/LnByZXZlbnREZWZhdWx0KCkgdW5sZXNzIEBvcHRpb25zLmRvdWJsZUNsaWNrXG5cbiAgICAjIEhhbmRsZXMgZGUtc2VsZWN0aW9uXG4gICAgaWYgQG9wdGlvbnMuZGVzZWxlY3QgJiYgQCRlbC5oYXNDbGFzcyhAY3NzLmFjdGl2ZSlcbiAgICAgIEAkZWwucmVtb3ZlQ2xhc3MoQGNzcy5hY3RpdmUpXG4gICAgICByZXR1cm4gQHZpZXcudHJpZ2dlck1ldGhvZCAnZGVzZWxlY3RlZCdcblxuICAgICMgUmV0dXJuIGlmIGVsZW1lbnQgaXMgY3VycmVudGx5IHNlbGVjdGVkXG4gICAgcmV0dXJuIGlmIEAkZWwuaGFzQ2xhc3MoQGNzcy5hY3RpdmUpXG5cbiAgICAjIFByZXZlbnQgZGVhZnVsdCBhbmQgdHJpZ2dlciBzZWxlY3RlZFxuICAgIGU/LnByZXZlbnREZWZhdWx0KClcbiAgICBAdmlldy50cmlnZ2VyTWV0aG9kICdzZWxlY3RlZCdcbiAgICBAJGVsLmFkZENsYXNzKEBjc3MuYWN0aXZlKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKEBjc3MuYWN0aXZlKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RhYmxlQ2hpbGRcbiIsIlxuIyBTb3J0YWJsZUNoaWxkIEJlaGF2aW9yIGRlZmluaXRpb25cbiMgV29ya3Mgd2l0aCBTb3J0YWJsZUxpc3QgQmVoYXZpb3JcbmNsYXNzIFNvcnRhYmxlQ2hpbGQgZXh0ZW5kcyBNbi5CZWhhdmlvclxuXG4gIGV2ZW50czpcbiAgICAnc29ydGVkJzogJ29uU29ydGVkJ1xuXG4gIG9uU29ydGVkOiAoZSwgb3JkZXIpIC0+XG4gICAgQHZpZXcubW9kZWwuc2V0KCdvcmRlcicsIG9yZGVyKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTb3J0YWJsZUNoaWxkXG4iLCJcbiMgU29ydGFibGVMaXN0IEJlaGF2aW9yIGRlZmluaXRpb25cbiMgV29ya3Mgd2l0aCBTb3J0YWJsZUNoaWxkIEJlaGF2aW9yXG5jbGFzcyBTb3J0YWJsZUxpc3QgZXh0ZW5kcyBNbi5CZWhhdmlvclxuXG4gICMgRGVmaW5lcyB0aGUgcmVvcmRlckNvbGxlY3Rpb24gbWV0aG9kIG9uIHRoZSB2aWV3XG4gICMgdG8gd2hpY2ggdGhlIGJlaGF2aW9yIGlzIGFzc2lnbmVkXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQHZpZXcucmVvcmRlckNvbGxlY3Rpb24gPSA9PiBAcmVvcmRlckNvbGxlY3Rpb24oKVxuXG4gIG9uUmVuZGVyOiAtPlxuXG4gICAgIyBJbml0aWFsaXplcyBTb3J0YWJsZSBjb250YWluZXJcbiAgICBTb3J0YWJsZS5jcmVhdGUgQHZpZXcuZWwsXG4gICAgICBoYW5kbGU6ICAgICAgIEBvcHRpb25zLmhhbmRsZSB8fCAnLnNvcnRhYmxlJ1xuICAgICAgYW5pbWF0aW9uOiAgICBAb3B0aW9ucy5hbmltYXRpb24gfHwgMjUwXG4gICAgICBvbkVuZDogKGUpID0+IEByZW9yZGVyQ29sbGVjdGlvbigpXG5cbiAgIyByZW9yZGVyQ29sbGVjdGlvblxuICAjIEludm9rZWQgYWZ0ZXIgc29ydGluZyBoYXMgY29tcGxldGVkXG4gIHJlb3JkZXJDb2xsZWN0aW9uOiA9PlxuXG4gICAgIyBUcmlnZ2VycyBvcmRlciBldmVudHMgb24gQ29sbGVjdGlvblZpZXcgY2hpbGRWaWV3ICRlbHNcbiAgICBvcmRlciA9IDFcbiAgICBmb3IgZWwgaW4gQHZpZXcuJGVsWzBdLmNoaWxkcmVuXG4gICAgICAkKGVsKS50cmlnZ2VyKCdzb3J0ZWQnLG9yZGVyKVxuICAgICAgb3JkZXIrK1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTb3J0YWJsZUxpc3RcbiIsIkxheW91dFZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyBIZWFkZXJTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIHNlcnZpY2UgZm9yIG1hbmFnaW5nIGFwcGxpY2F0aW9uXG4jIGhlYWRlciBzdGF0ZS4gRGlzcGxheXMgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcixcbiMgb3IgdGhlICd1bmF1dGhlbnRpY2F0ZWQnIG1lc3NhZ2UgaWYgbm9uZSBpcyBkZWZpbmVkXG5jbGFzcyBIZWFkZXJTZXJ2aWNlIGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAY29udGFpbmVyID0gQG9wdGlvbnMuY29udGFpbmVyXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2hlYWRlciByZXNldCc6ICdyZXNldCdcblxuICByZXNldDogLT5cbiAgICBAY29udGFpbmVyLnNob3cgbmV3IExheW91dFZpZXcoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJTZXJ2aWNlXG4iLCJcbiMgSGVhZGVyVmlldyBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBzaW1icGxlIHZpZXcgZm9yIGRpc3BsYXlpbmcgdGhlXG4jIGhlYWRlciBvZiB0aGUgYXBwbGljYXRpb24uIFRoZSBoZWFkZXIgZGlzcGxheXNcbiMgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBhbmRcbiMgbWFuYWdlcyB0b2dnbGluZyB0aGUgU2lkZWJhckNvbXBvbmVudCdzIHZpZXdcbmNsYXNzIEhlYWRlclZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2hlYWRlcidcbiAgY2xhc3NOYW1lOiAnbmF2YmFyIGZpeGVkLXRvcCBuYXZiYXItZGFyayBiZy1kYXJrJ1xuICB0YWdOYW1lOiAnbmF2J1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJWaWV3XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJuYXZiYXItYnJhbmQgdGl0bGVcXFwiPkFTVFJPS0VZPC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIiMgU3VwcG9ydCBmb3IgY3Jvc3MtZG9tYWluIHJlcXVlc3RzIGluIEJhY2tib25lLmpzIC0gdXN1YWxseSB2ZXJib3Rlbi5cbiMgVGhpcyBhbGxvd3MgdGhlIGRldiBzZXJ2ZXIgYXQgbG9jYWwuY29ydGljYWxtZXRyaWNzLmNvbTo4MDgwIHRvIGNvbW11bmljYXRlIHdpdGggZGV2LmNvcnRpY2FsbWV0cmljcy5jb206MzAwMCAoY20tbm9kZS1hcHApXG5cbmNyb3NzRG9tYWluUm9vdCA9ICdodHRwOi8vMTkyLjE2OC4zMy4zMzozMDAwJyAjIERFViBPTkxZXG5cbnByb3hpZWRTeW5jID0gQmFja2JvbmUuc3luY1xuXG5CYWNrYm9uZS5zeW5jID0gKG1ldGhvZCwgbW9kZWwsIG9wdGlvbnMgPSB7fSkgPT5cblxuICBpZiAhb3B0aW9ucy51cmxcbiAgICBvcHRpb25zLnVybCA9IGNyb3NzRG9tYWluUm9vdCArIF8ucmVzdWx0KG1vZGVsLCAndXJsJykgfHwgdXJsRXJyb3IoKVxuXG4gIGVsc2UgaWYgb3B0aW9ucy51cmwuc3Vic3RyaW5nKDAsIDYpICE9IGNyb3NzRG9tYWluUm9vdC5zdWJzdHJpbmcoMCwgNilcbiAgICBvcHRpb25zLnVybCA9IGNyb3NzRG9tYWluUm9vdCArIG9wdGlvbnMudXJsXG5cbiAgaWYgIW9wdGlvbnMuY3Jvc3NEb21haW5cbiAgICBvcHRpb25zLmNyb3NzRG9tYWluID0gdHJ1ZVxuXG4gIGlmICFvcHRpb25zLnhockZpZWxkc1xuICAgIG9wdGlvbnMueGhyRmllbGRzID0geyB3aXRoQ3JlZGVudGlhbHM6IHRydWUgfVxuXG4gIHJldHVybiBwcm94aWVkU3luYyhtZXRob2QsIG1vZGVsLCBvcHRpb25zKVxuIiwiIyBBcHAgY29uZmlndXJhdGlvbiBtYW5pZmVzdFxucmVxdWlyZSAnLi93aW5kb3cnXG5yZXF1aXJlICcuL2p3dCdcbnJlcXVpcmUgJy4vY29ycydcbnJlcXVpcmUgJy4vbWFyaW9uZXR0ZSdcbiIsIiMgQWpheCBKV1QgU2hpbVxuJC5hamF4U2V0dXBcbiAgYmVmb3JlU2VuZDogKHhocikgLT5cbiAgICB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCAnSldUICcgKyB0b2tlbikgaWYgdG9rZW5cbiAgICByZXR1cm5cbiIsIiMgTWFyaW9uZXR0ZS5CZWhhdmlvcnMgY29uZmlndXJhdGlvblxuTWFyaW9uZXR0ZS5CZWhhdmlvcnMuYmVoYXZpb3JzTG9va3VwID0gLT4gcmVxdWlyZSAnLi4vYmVoYXZpb3JzJ1xuIiwiIyBBbGlhc2VzIEJhY2tib25lLlJhZGlvIHRvIHdpbmRvdy5SYWRpb1xud2luZG93LlJhZGlvID0gQmFja2JvbmUuUmFkaW9cbiIsIiMgVGhpcyBmaWxlIGRlZmluZXMgYSBtYW5pZmVzdCBmb3IgdGhlIGNsaWVudCBhcHBsaWNhdGlvbi5cbiMgVGhpcyBpbmNsdWRlcyBjb25maWd1cmF0aW9uLCBTZXJ2aWNlcywgQ29tcG9uZW50cywgTW9kdWxlc1xuIyBhbmQgdGhlIEFwcGxpY2F0aW9uIHNpbmdsZXRvbiBpbnN0YW5jZS5cblxuIyAjICMgIyAjXG5cbiMgQXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBtYW5pZmVzdFxucmVxdWlyZSAnLi9jb25maWcnXG5cbiMgQXBwbGljYXRpb24gY2xhc3MgZGVmaW5pdGlvbiAmIEFwcCBMYXlvdXRcbkFwcCAgICAgICA9IHJlcXVpcmUgJy4vYXBwJ1xuQXBwTGF5b3V0ID0gcmVxdWlyZSAnLi9hcHBsaWNhdGlvbi92aWV3cy9sYXlvdXQnXG5cbiMgSGVuc29uIEVudGl0aWVzXG5yZXF1aXJlICdobl9lbnRpdGllcy9saWIvY29uZmlnJ1xuXG4jICMgIyAjICNcblxuIyBDb21wb25lbnRzIGFyZSByb3V0ZWxlc3Mgc2VydmljZXMgd2l0aCB2aWV3cyB0aGF0IGFyZVxuIyBhY2Nlc3NpYmxlIGFueXdoZXJlIGluIHRoZSBhcHBsaWNhdGlvblxuIyBVc2VkIHRvIG1hbmFnZSB0aGUgaGVhZGVyLCBzaWRlYmFyLCBmbGFzaCwgYW5kIGNvbmZpcm0gVUkgZWxlbWVudHNcblxuIyBIZW5zb24uanMgQ29tcG9uZW50c1xuSGVhZGVyQ29tcG9uZW50ICAgICA9IHJlcXVpcmUgJy4vY29tcG9uZW50cy9oZWFkZXIvY29tcG9uZW50J1xuT3ZlcmxheUNvbXBvbmVudCAgICA9IHJlcXVpcmUgJ2huX292ZXJsYXkvbGliL2NvbXBvbmVudCdcbkZsYXNoQ29tcG9uZW50ICAgICAgPSByZXF1aXJlICdobl9mbGFzaC9saWIvY29tcG9uZW50J1xubmV3IEhlYWRlckNvbXBvbmVudCh7IGNvbnRhaW5lcjogQXBwTGF5b3V0LmhlYWRlciB9KVxubmV3IE92ZXJsYXlDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5vdmVybGF5IH0pXG5uZXcgRmxhc2hDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5mbGFzaCB9KVxuXG4jICMgIyAjICNcblxuIyBTZXJ2aWNlc1xucmVxdWlyZSgnLi9tb2R1bGVzL3VzYi9zZXJ2aWNlJylcblxuIyBGYWN0b3JpZXNcbnJlcXVpcmUoJy4vbW9kdWxlcy9rZXkvZmFjdG9yeScpXG5yZXF1aXJlKCcuL21vZHVsZXMvbWFjcm8vZmFjdG9yeScpXG5cbiMgIyAjICMgI1xuXG4jIE1vZHVsZXNcbiMgTW9kdWxlcyByZXByZXNlbnQgY29sbGVjdGlvbnMgb2YgZW5kcG9pbnRzIGluIHRoZSBhcHBsaWNhdGlvbi5cbiMgVGhleSBoYXZlIHJvdXRlcyBhbmQgZW50aXRpZXMgKG1vZGVscyBhbmQgY29sbGVjdGlvbnMpXG4jIEVhY2ggcm91dGUgcmVwcmVzZW50cyBhbiBlbmRwb2ludCwgb3IgJ3BhZ2UnIGluIHRoZSBhcHAuXG5NYWluTW9kdWxlID0gcmVxdWlyZSAnLi9tb2R1bGVzL21haW4vcm91dGVyJ1xubmV3IE1haW5Nb2R1bGUoeyBjb250YWluZXI6IEFwcExheW91dC5tYWluIH0pXG5cbiMgIyAjICMgIyAjXG5cbiMgUGFnZSBoYXMgbG9hZGVkLCBkb2N1bWVudCBpcyByZWFkeVxuJChkb2N1bWVudCkub24gJ3JlYWR5JywgPT4gbmV3IEFwcCgpICMgSW5zdGFudGlhdGVzIG5ldyBBcHBcbiIsIlxuIyBLZXlNb2RlbCBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBLZXlNb2RlbCBleHRlbmRzIEJhY2tib25lLlJlbGF0aW9uYWxNb2RlbFxuXG4gICMgRGVmYXVsdCBhdHRyaWJ1dGVzXG4gIGRlZmF1bHRzOiB7fVxuXG4jICMgIyAjICNcblxuY2xhc3MgS2V5Q29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IEtleU1vZGVsXG4gIGNvbXBhcmF0b3I6ICdvcmRlcidcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgTW9kZWw6ICAgICAgS2V5TW9kZWxcbiAgQ29sbGVjdGlvbjogS2V5Q29sbGVjdGlvblxuIiwiRW50aXRpZXMgPSByZXF1aXJlKCcuL2VudGl0aWVzJylcbktleURhdGEgPSByZXF1aXJlKCcuL2tleXMnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgS2V5RmFjdG9yeSBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ2tleSBtb2RlbCc6ICAgICAgICdnZXRNb2RlbCdcbiAgICAna2V5IGNvbGxlY3Rpb24nOiAgJ2dldENvbGxlY3Rpb24nXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAY2FjaGVkQ29sbGVjdGlvbiA9IG5ldyBFbnRpdGllcy5Db2xsZWN0aW9uKEtleURhdGEsIHsgcGFyc2U6IHRydWUgfSlcblxuICBnZXRNb2RlbDogKGlkKSAtPlxuICAgIHJldHVybiBAY2FjaGVkQ29sbGVjdGlvbi5nZXQoaWQpXG5cbiAgZ2V0Q29sbGVjdGlvbjogLT5cbiAgICByZXR1cm4gQGNhY2hlZENvbGxlY3Rpb25cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEtleUZhY3RvcnkoKVxuIiwiXG4jIEtleSBKU09OIGRlZmluaXRpb25zXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnYCcsIHNoaWZ0OiAnficsIGtleWNvZGU6IDE5MiB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzEnLCBzaGlmdDogJyEnLCBrZXljb2RlOiA0OSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzInLCBzaGlmdDogJ0AnLCBrZXljb2RlOiA1MCB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzMnLCBzaGlmdDogJyMnLCBrZXljb2RlOiA1MSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzQnLCBzaGlmdDogJyQnLCBrZXljb2RlOiA1MiB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzUnLCBzaGlmdDogJyUnLCBrZXljb2RlOiA1MyB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzYnLCBzaGlmdDogJ14nLCBrZXljb2RlOiA1NCB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzcnLCBzaGlmdDogJyYnLCBrZXljb2RlOiA1NSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzgnLCBzaGlmdDogJyonLCBrZXljb2RlOiA1NiB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzknLCBzaGlmdDogJygnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzAnLCBzaGlmdDogJyknLCBrZXljb2RlOiA0OCB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJy0nLCBzaGlmdDogJ18nLCBrZXljb2RlOiAxODkgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc9Jywgc2hpZnQ6ICcrJywga2V5Y29kZTogMTg3IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnQkFDS1NQQUNFJywga2V5Y29kZTogOCwgY3NzOiAndzJfMCcgfVxuXG4gICAgeyByb3c6ICdyMycsIGtleTogJ1RBQicsIGtleWNvZGU6IDksIGNzczogJ3cxXzUnLCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnUScsIGtleWNvZGU6IDgxIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnVycsIGtleWNvZGU6IDg3IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnRScsIGtleWNvZGU6IDY5IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnUicsIGtleWNvZGU6IDgyIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnVCcsIGtleWNvZGU6IDg0IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnWScsIGtleWNvZGU6IDg5IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnVScsIGtleWNvZGU6IDg1IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnSScsIGtleWNvZGU6IDczIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnTycsIGtleWNvZGU6IDc5IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnUCcsIGtleWNvZGU6IDgwIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnWycsIHNoaWZ0OiAneycsIGtleWNvZGU6IDIxOSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ10nLCBzaGlmdDogJ30nLCBrZXljb2RlOiAyMjEgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdcXFxcJywgc2hpZnQ6ICd8Jywga2V5Y29kZTogMjIwLCBjc3M6ICd3MV81JyB9XG5cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnQ0FQUycsIGNzczogJ3cxXzc1Jywga2V5Y29kZTogMjAsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdBJywga2V5Y29kZTogNjUgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdTJywga2V5Y29kZTogODMgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdEJywga2V5Y29kZTogNjggfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdGJywga2V5Y29kZTogNzAgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdHJywga2V5Y29kZTogNzEgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdIJywga2V5Y29kZTogNzIgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdKJywga2V5Y29kZTogNzQgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdLJywga2V5Y29kZTogNzUgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdMJywga2V5Y29kZTogNzYgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICc7Jywgc2hpZnQ6ICc6Jywga2V5Y29kZTogMTg2IH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiBcIidcIiwgc2hpZnQ6ICdcIicsIGtleWNvZGU6IDIyMiB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ1JFVFVSTicsIGNzczogJ3cyXzI1Jywga2V5Y29kZTogMTMsIHNwZWNpYWw6IHRydWUgfVxuXG4gICAgeyByb3c6ICdyMScsIGtleTogJ1NISUZUJywgY3NzOiAndzJfMjUnLCBrZXljb2RlOiAxNiwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ1onLCBrZXljb2RlOiA5MCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ1gnLCBrZXljb2RlOiA4OCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ0MnLCBrZXljb2RlOiA2NyB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ1YnLCBrZXljb2RlOiA4NiB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ0InLCBrZXljb2RlOiA2NiB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ04nLCBrZXljb2RlOiA3OCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ00nLCBrZXljb2RlOiA3NyB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJywnLCBzaGlmdDogJzwnLCBrZXljb2RlOiAxODggfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICcuJywgc2hpZnQ6ICc+Jywga2V5Y29kZTogMTkwIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnLycsIHNoaWZ0OiAnPycsIGtleWNvZGU6IDE5MSB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ1NISUZUJywgY3NzOiAndzJfNzUnLCBrZXljb2RlOiAxNiwgc3BlY2lhbDogdHJ1ZSB9XG5cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnQ1RSTCcsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTcsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdNJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiA5MSwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0FMVCcsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTgsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdTUEFDRScsIGNzczogJ3NwYWNlJywga2V5Y29kZTogMzIsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdDVFJMJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxNywgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ00nLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE4LCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnUCcsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogOTMsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdBTFQnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE4LCBzcGVjaWFsOiB0cnVlIH1cblxuICAgICMgTlVNUEFEIEtFWVNcbiAgICB7IHJvdzogJ251bV9yMCcsIGtleTogJzAnLCBrZXljb2RlOiA0OSwgY3NzOiAndzJfMjUnIH1cbiAgICB7IHJvdzogJ251bV9yMCcsIGtleTogJy4nLCBrZXljb2RlOiA0OSB9XG5cbiAgICB7IHJvdzogJ251bV9yMScsIGtleTogJzEnLCBrZXljb2RlOiA0OSB9XG4gICAgeyByb3c6ICdudW1fcjEnLCBrZXk6ICcyJywga2V5Y29kZTogNTAgfVxuICAgIHsgcm93OiAnbnVtX3IxJywga2V5OiAnMycsIGtleWNvZGU6IDUxIH1cblxuICAgIHsgcm93OiAnbnVtX3IyJywga2V5OiAnNCcsIGtleWNvZGU6IDUyIH1cbiAgICB7IHJvdzogJ251bV9yMicsIGtleTogJzUnLCBrZXljb2RlOiA1MyB9XG4gICAgeyByb3c6ICdudW1fcjInLCBrZXk6ICc2Jywga2V5Y29kZTogNTQgfVxuXG4gICAgeyByb3c6ICdudW1fcjMnLCBrZXk6ICc3Jywga2V5Y29kZTogNTUgfVxuICAgIHsgcm93OiAnbnVtX3IzJywga2V5OiAnOCcsIGtleWNvZGU6IDU2IH1cbiAgICB7IHJvdzogJ251bV9yMycsIGtleTogJzknLCBrZXljb2RlOiA1NyB9XG5cbiAgICB7IHJvdzogJ251bV9yNCcsIGtleTogJ0NMRUFSJywga2V5Y29kZTogNDggfVxuICAgIHsgcm93OiAnbnVtX3I0Jywga2V5OiAnLycsIGtleWNvZGU6IDE4OSB9XG4gICAgeyByb3c6ICdudW1fcjQnLCBrZXk6ICcqJywga2V5Y29kZTogMTg3IH1cblxuICAgIHsgcm93OiAnbnVtX2NvbCcsIGtleTogJy0nLCBrZXljb2RlOiA0OCB9XG4gICAgeyByb3c6ICdudW1fY29sJywga2V5OiAnKycsIGtleWNvZGU6IDE4OSwgY3NzOiAnaDJfMCcgfVxuICAgIHsgcm93OiAnbnVtX2NvbCcsIGtleTogJ0VOVEVSJywga2V5Y29kZTogMTg3LCBjc3M6ICdoMl8wJyB9XG5cbiAgICAjIEZ1bmN0aW9uIEtleXNcbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMScsIGtleWNvZGU6IDQ5IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMicsIGtleWNvZGU6IDUwIH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMycsIGtleWNvZGU6IDUxIH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGNCcsIGtleWNvZGU6IDUyIH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGNScsIGtleWNvZGU6IDUzIH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGNicsIGtleWNvZGU6IDU0IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGNycsIGtleWNvZGU6IDU1IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGOCcsIGtleWNvZGU6IDU2IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGOScsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTAnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjExJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxMicsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NyB9XG5cbiAgICAjIE1lZGlhIEtleXNcbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS1zdGVwLWJhY2t3YXJkJyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtcGxheScgfVxuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXN0ZXAtZm9yd2FyZCcgfVxuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXZvbHVtZS1vZmYnIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS12b2x1bWUtZG93bicgfVxuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXZvbHVtZS11cCcgfVxuXG4gICAgIyBOYXZpZ2F0aW9uIEtleXNcbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ1BHVVAnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdQR0ROJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnRU5EJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnSE9NRScsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0xFRlQtQVJST1cnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLWNoZXZyb24tbGVmdCcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnVVAtQVJST1cnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLWNoZXZyb24tdXAnIH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0RPV04tQVJST1cnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLWNoZXZyb24tZG93bicgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnUklHSFQtQVJST1cnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLWNoZXZyb24tcmlnaHQnIH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0lOUycsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0RFTCcsIGtleWNvZGU6IDU3IH1cblxuXVxuXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChyMCkge1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24oKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwia2V5Ym9hcmQtLXJvdyB3LTEwMFxcXCI+XCIpO1xuYmxvY2sgJiYgYmxvY2soKTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpO1xufTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8YnV0dG9uXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXljb2RlXCIsIG9wdHMua2V5Y29kZSwgdHJ1ZSwgZmFsc2UpKSArIFwiIGRhdGEtY2xpY2s9XFxcImtleVxcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleVwiLCBvcHRzLmtleSwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmNscyhbJ2J0bicsJ2J0bi1vdXRsaW5lLWxpZ2h0Jywna2V5Ym9hcmQtLWtleScsb3B0cy5jc3NdLCBbbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggb3B0cy5pY29uKVxue1xuYnVmLnB1c2goXCI8aVwiICsgKGphZGUuY2xzKFsnZmEnLCdmYS1mdycsb3B0cy5pY29uXSwgW251bGwsbnVsbCx0cnVlXSkpICsgXCI+PC9pPlwiKTtcbn1cbmVsc2VcbntcbmlmICggb3B0cy5rZXkgJiYgb3B0cy5zaGlmdClcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+PGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbn1cbmJ1Zi5wdXNoKFwiPC9idXR0b24+XCIpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwia2V5Ym9hcmQtLWJvZHlcXFwiPlwiKTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjBcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjA7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpO30uY2FsbCh0aGlzLFwicjBcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIwOnR5cGVvZiByMCE9PVwidW5kZWZpbmVkXCI/cjA6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAocjAsIHIxLCByMiwgcjMsIHI0KSB7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbigpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tcm93IHctMTAwXFxcIj5cIik7XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7XG59O1xuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxidXR0b25cIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleWNvZGVcIiwgb3B0cy5rZXljb2RlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1jbGljaz1cXFwia2V5XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEta2V5XCIsIG9wdHMua2V5LCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnYnRuJywnYnRuLW91dGxpbmUtbGlnaHQnLCdrZXlib2FyZC0ta2V5JyxvcHRzLmNzc10sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxvcHRzLmljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBvcHRzLmtleSAmJiBvcHRzLnNoaWZ0KVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJzaGlmdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLnNoaWZ0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxufVxuYnVmLnB1c2goXCI8L2J1dHRvbj5cIik7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tYm9keVxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByNFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByNDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByM1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMlxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMjtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJyMFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjA6dHlwZW9mIHIwIT09XCJ1bmRlZmluZWRcIj9yMDp1bmRlZmluZWQsXCJyMVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjE6dHlwZW9mIHIxIT09XCJ1bmRlZmluZWRcIj9yMTp1bmRlZmluZWQsXCJyMlwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjI6dHlwZW9mIHIyIT09XCJ1bmRlZmluZWRcIj9yMjp1bmRlZmluZWQsXCJyM1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjM6dHlwZW9mIHIzIT09XCJ1bmRlZmluZWRcIj9yMzp1bmRlZmluZWQsXCJyNFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjQ6dHlwZW9mIHI0IT09XCJ1bmRlZmluZWRcIj9yNDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChjb2wsIHIwLCByMSwgcjIsIHIzLCByNCwgdW5kZWZpbmVkKSB7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbigpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tcm93IHctMTAwXFxcIj5cIik7XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7XG59O1xuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxidXR0b25cIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleWNvZGVcIiwgb3B0cy5rZXljb2RlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1jbGljaz1cXFwia2V5XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEta2V5XCIsIG9wdHMua2V5LCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnYnRuJywnYnRuLW91dGxpbmUtbGlnaHQnLCdrZXlib2FyZC0ta2V5JyxvcHRzLmNzc10sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxvcHRzLmljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBvcHRzLmtleSAmJiBvcHRzLnNoaWZ0KVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJzaGlmdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLnNoaWZ0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxufVxuYnVmLnB1c2goXCI8L2J1dHRvbj5cIik7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tYm9keVxcXCI+PGRpdiBjbGFzcz1cXFwiZC1mbGV4IGZsZXgtcm93XFxcIj48ZGl2IGNsYXNzPVxcXCJkLWZsZXggZmxleC1jb2x1bW5cXFwiPlwiKTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjRcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjQ7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjJcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjI7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjFcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjE7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjBcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjA7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmJ1Zi5wdXNoKFwiPC9kaXY+PGRpdiBjbGFzcz1cXFwiZC1mbGV4IGZsZXgtY29sdW1uXFxcIj5cIik7XG4vLyBpdGVyYXRlIGNvbFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBjb2w7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImNvbFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguY29sOnR5cGVvZiBjb2whPT1cInVuZGVmaW5lZFwiP2NvbDp1bmRlZmluZWQsXCJyMFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjA6dHlwZW9mIHIwIT09XCJ1bmRlZmluZWRcIj9yMDp1bmRlZmluZWQsXCJyMVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjE6dHlwZW9mIHIxIT09XCJ1bmRlZmluZWRcIj9yMTp1bmRlZmluZWQsXCJyMlwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjI6dHlwZW9mIHIyIT09XCJ1bmRlZmluZWRcIj9yMjp1bmRlZmluZWQsXCJyM1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjM6dHlwZW9mIHIzIT09XCJ1bmRlZmluZWRcIj9yMzp1bmRlZmluZWQsXCJyNFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjQ6dHlwZW9mIHI0IT09XCJ1bmRlZmluZWRcIj9yNDp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobmF2SXRlbXMsIHVuZGVmaW5lZCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj5cIik7XG4vLyBpdGVyYXRlIG5hdkl0ZW1zXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IG5hdkl0ZW1zO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBzdHlsZT1cXFwiZmxleC1ncm93OjE7XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEtdHJpZ2dlclwiLCBuYXZJdGVtLnRyaWdnZXIsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwiZC1mbGV4IGJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkgYnRuLXNtIGp1c3RpZnktY29udGVudC1jZW50ZXIgbXgtM1xcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBuYXZJdGVtLnRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYnV0dG9uPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIG5hdkl0ZW0udHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBidG4tc20ganVzdGlmeS1jb250ZW50LWNlbnRlciBteC0zXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48aHIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiY29udGVudFxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibmF2SXRlbXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm5hdkl0ZW1zOnR5cGVvZiBuYXZJdGVtcyE9PVwidW5kZWZpbmVkXCI/bmF2SXRlbXM6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJyb3dcIjogXCJyMlwiLFxuICAgIFwia2V5XCI6IFwiQVwiLFxuICAgIFwia2V5Y29kZVwiOiA2NSxcbiAgICBcIm9yZGVyXCI6IDEsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcInJvd1wiOiBcInIyXCIsXG4gICAgXCJrZXlcIjogXCJTXCIsXG4gICAgXCJrZXljb2RlXCI6IDgzLFxuICAgIFwib3JkZXJcIjogMixcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwicm93XCI6IFwicjNcIixcbiAgICBcImtleVwiOiBcIlRcIixcbiAgICBcImtleWNvZGVcIjogODQsXG4gICAgXCJvcmRlclwiOiAzLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJyb3dcIjogXCJyM1wiLFxuICAgIFwia2V5XCI6IFwiUlwiLFxuICAgIFwia2V5Y29kZVwiOiA4MixcbiAgICBcIm9yZGVyXCI6IDQsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgXCJrZXlcIjogXCJPXCIsXG4gICAgXCJrZXljb2RlXCI6IDc5LFxuICAgIFwib3JkZXJcIjogNSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwicm93XCI6IFwicjJcIixcbiAgICBcImtleVwiOiBcIktcIixcbiAgICBcImtleWNvZGVcIjogNzUsXG4gICAgXCJvcmRlclwiOiA2LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJyb3dcIjogXCJyM1wiLFxuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDcsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgXCJrZXlcIjogXCJZXCIsXG4gICAgXCJrZXljb2RlXCI6IDg5LFxuICAgIFwib3JkZXJcIjogOCxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfVxuXVxuIiwiXG4jIE1hY3JvTW9kZWwgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgTWFjcm9Nb2RlbCBleHRlbmRzIEJhY2tib25lLlJlbGF0aW9uYWxNb2RlbFxuXG4gICMgRGVmYXVsdCBhdHRyaWJ1dGVzXG4gIGRlZmF1bHRzOlxuICAgIG9yZGVyOiAwXG4gICAgcG9zaXRpb246IDBcblxuIyAjICMgIyAjXG5cbmNsYXNzIE1hY3JvQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IE1hY3JvTW9kZWxcbiAgY29tcGFyYXRvcjogJ29yZGVyJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPVxuICBNb2RlbDogICAgICBNYWNyb01vZGVsXG4gIENvbGxlY3Rpb246IE1hY3JvQ29sbGVjdGlvblxuIiwiRW50aXRpZXMgPSByZXF1aXJlKCcuL2VudGl0aWVzJylcbkRlZmF1bHRNYWNyb3MgPSByZXF1aXJlKCcuL2RlZmF1bHRfbWFjcm9zJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIE1hY3JvRmFjdG9yeSBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ21hY3JvIGNvbGxlY3Rpb24nOiAgJ2dldENvbGxlY3Rpb24nXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAY2FjaGVkQ29sbGVjdGlvbiA9IG5ldyBFbnRpdGllcy5Db2xsZWN0aW9uKERlZmF1bHRNYWNyb3MsIHsgcGFyc2U6IHRydWUgfSlcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBAY2FjaGVkQ29sbGVjdGlvblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTWFjcm9GYWN0b3J5KClcbiIsIkxheW91dFZpZXcgID0gcmVxdWlyZSAnLi92aWV3cy9sYXlvdXQnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEYXNoYm9hcmRSb3V0ZSBleHRlbmRzIHJlcXVpcmUgJ2huX3JvdXRpbmcvbGliL3JvdXRlJ1xuXG4gIHRpdGxlOiAnQXN0cm9LZXkgV2ViJ1xuXG4gIGJyZWFkY3J1bWJzOiBbeyB0ZXh0OiAnRGV2aWNlJyB9XVxuXG4gIGZldGNoOiAtPlxuICAgIEBrZXlzID0gUmFkaW8uY2hhbm5lbCgna2V5JykucmVxdWVzdCgnY29sbGVjdGlvbicpXG4gICAgQG1hY3JvcyA9IFJhZGlvLmNoYW5uZWwoJ21hY3JvJykucmVxdWVzdCgnY29sbGVjdGlvbicpXG4gICAgQGRldmljZU1vZGVsID0gUmFkaW8uY2hhbm5lbCgnZGV2aWNlJykucmVxdWVzdCgnbW9kZWwnLCAnZGV2aWNlXzEnKVxuXG4gIHJlbmRlcjogLT5cbiAgICBjb25zb2xlLmxvZyhAZGV2aWNlTW9kZWwpOyAjIERlYnVnXG4gICAgQGNvbnRhaW5lci5zaG93IG5ldyBMYXlvdXRWaWV3KHsgbW9kZWw6IEBkZXZpY2VNb2RlbCwga2V5czogQGtleXMsIG1hY3JvczogQG1hY3JvcyB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBEYXNoYm9hcmRSb3V0ZVxuIiwiS2V5U2VsZWN0b3IgPSByZXF1aXJlKCcuL2tleVNlbGVjdG9yJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIERldmljZVN0YXR1c1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2RldmljZV9zdGF0dXMnXG4gIGNsYXNzTmFtZTogJ3JvdydcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG5cbiAgICBzdGF0dXMgPSB7XG4gICAgICB0ZXh0OiAnTm90IENvbm5lY3RlZCdcbiAgICAgIGNzczogICdiYWRnZS1kZWZhdWx0J1xuICAgIH1cblxuICAgICMgQ29ubmVjdGVkXG4gICAgaWYgQG1vZGVsLmdldCgnc3RhdHVzX2NvZGUnKSA9PSAxXG5cbiAgICAgIHN0YXR1cyA9IHtcbiAgICAgICAgdGV4dDogJ0Nvbm5lY3RlZCdcbiAgICAgICAgY3NzOiAnYmFkZ2Utc3VjY2VzcydcbiAgICAgIH1cblxuICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzIH1cblxuIyAjICMgIyAjXG5cbmNsYXNzIERldmljZUxheW91dCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93J1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZGV2aWNlX2xheW91dCcpXG5cbiAgcmVnaW9uczpcbiAgICAjIHN0YXR1c1JlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1zdGF0dXNdJ1xuICAgIGtleXNSZWdpb246ICAgJ1tkYXRhLXJlZ2lvbj1rZXlzXSdcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgSW5zdGFudGlhdGVzIG5ldyBLZXlTZWxlY3RvciBWaWV3XG4gICAga2V5U2VsZWN0b3IgPSBuZXcgS2V5U2VsZWN0b3IoeyBjb2xsZWN0aW9uOiBAbW9kZWwuZ2V0KCdrZXlzJykgfSlcbiAgICBrZXlTZWxlY3Rvci5vbiAnY2hpbGR2aWV3OnNlbGVjdGVkJywgKHZpZXcpID0+IEB0cmlnZ2VyKCdrZXk6c2VsZWN0ZWQnLCB2aWV3Lm1vZGVsKVxuICAgIGtleVNlbGVjdG9yLm9uICdjaGlsZHZpZXc6ZGVzZWxlY3RlZCcsICh2aWV3KSA9PiBAdHJpZ2dlcigna2V5OmRlc2VsZWN0ZWQnKVxuICAgIEBrZXlzUmVnaW9uLnNob3coa2V5U2VsZWN0b3IpXG5cbiAgICAjIFN0YXR1cyBWaWV3XG4gICAgIyBUT0RPIC0gc3RhdHVzICYgY29ubmVjdGlvbiB2aWV3XG4gICAgIyBAc3RhdHVzUmVnaW9uLnNob3cgbmV3IERldmljZVN0YXR1c1ZpZXcoeyBtb2RlbDogQG1vZGVsIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IERldmljZUxheW91dFxuXG5cbiIsIlNpbXBsZU5hdiA9IHJlcXVpcmUgJ2xpYi92aWV3cy9zaW1wbGVfbmF2J1xuXG4jICMgIyAjICNcblxuY2xhc3MgRWRpdG9yU2VsZWN0b3IgZXh0ZW5kcyBTaW1wbGVOYXZcbiAgY2xhc3NOYW1lOiAncm93IGgtMTAwJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZWRpdG9yX3NlbGVjdG9yJylcblxuICBuYXZJdGVtczogW1xuICAgIHsgaWNvbjogJ2ZhLWtleWJvYXJkLW8nLCAgdGV4dDogJ01hY3JvJywgIHRyaWdnZXI6ICdtYWNybycgfVxuICAgIHsgaWNvbjogJ2ZhLWZpbGUtdGV4dC1vJywgdGV4dDogJ1RleHQnLCAgIHRyaWdnZXI6ICd0ZXh0JyB9XG4gICAgIyB7IGljb246ICdmYS1hc3RlcmlzaycsICAgIHRleHQ6ICdLZXknLCAgICB0cmlnZ2VyOiAna2V5JyB9XG4gIF1cblxuICBvblJlbmRlcjogLT5cbiAgICBjb25maWdNb2RlbCA9IEBtb2RlbC5nZXQoJ2NvbmZpZycpXG4gICAgdHJpZ2dlciA9IGNvbmZpZ01vZGVsLmdldCgndHlwZScpXG4gICAgcmV0dXJuIEAkKFwiW2RhdGEtdHJpZ2dlcj0je3RyaWdnZXJ9XVwiKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICBvbk5hdmlnYXRlTWFjcm86IC0+XG4gICAgQHRyaWdnZXIgJ3Nob3c6bWFjcm86ZWRpdG9yJ1xuXG4gIG9uTmF2aWdhdGVUZXh0OiAtPlxuICAgIEB0cmlnZ2VyICdzaG93OnRleHQ6ZWRpdG9yJ1xuXG4gIG9uTmF2aWdhdGVLZXk6IC0+XG4gICAgQHRyaWdnZXIgJ3Nob3c6a2V5OmVkaXRvcidcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yU2VsZWN0b3JcbiIsIlRleHRFZGl0b3IgPSByZXF1aXJlKCcuL3RleHRFZGl0b3InKVxuTWFjcm9FZGl0b3IgPSByZXF1aXJlKCcuL21hY3JvRWRpdG9yJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEVkaXRvcldyYXBwZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2VkaXRvcl93cmFwcGVyJ1xuICBjbGFzc05hbWU6ICdyb3cnXG5cbiAgcmVnaW9uczpcbiAgICBjb250ZW50UmVnaW9uOiAnW2RhdGEtcmVnaW9uPWNvbnRlbnRdJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgW2RhdGEtY2xpY2s9c2F2ZV0nOiAgICAnb25TYXZlJ1xuICAgICdjbGljayBbZGF0YS1jbGljaz1jYW5jZWxdJzogICdvbkNhbmNlbCdcblxuICBlZGl0b3JzOlxuICAgIG1hY3JvOiAgTWFjcm9FZGl0b3JcbiAgICB0ZXh0OiAgIFRleHRFZGl0b3JcbiAgICBrZXk6ICAgIE1hY3JvRWRpdG9yXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEZldGNoZXMgdGhlIEVkaXRvclZpZXcgcHJvdG90eXBlXG4gICAgRWRpdG9yVmlldyA9IEBlZGl0b3JzW0BvcHRpb25zLmVkaXRvcl1cblxuICAgICMgSXNvbGF0ZXMgQ29uZmlnXG4gICAgY29uZmlnID0gQG1vZGVsLmdldCgnY29uZmlnJylcblxuICAgICMgQ2FjaGVzIHRoZSBjdXJyZW50IGNvbmZpZ3VyYXRpb24gdG8gYmUgcmVzdG9yZWQgd2hlbiB0aGlzIHZpZXcgaXMgY2FuY2VsbGVkIG91dFxuICAgIEBjYWNoZWRDb25maWcgPSBjb25maWcudG9KU09OKClcblxuICAgICMgSXNvbGF0ZXMgTWFjcm9Db2xsZWN0aW9uXG4gICAgbWFjcm9zID0gY29uZmlnLmdldCgnbWFjcm9zJylcblxuICAgICMgUmVxdWVzdHMgS2V5Q29sbGVjdGlvbiBmcm9tIHRoZSBLZXlGYWN0b3J5XG4gICAga2V5cyA9IFJhZGlvLmNoYW5uZWwoJ2tleScpLnJlcXVlc3QoJ2NvbGxlY3Rpb24nKVxuXG4gICAgIyBTaG93cyB0aGUgdmlldyBpbiBAY29udGVudFJlZ2lvblxuICAgIEBjb250ZW50UmVnaW9uLnNob3cgbmV3IEVkaXRvclZpZXcoeyBtb2RlbDogY29uZmlnLCBrZXlzOiBrZXlzLCBtYWNyb3M6IG1hY3JvcyB9KVxuXG4gICMgb25TYXZlXG4gIG9uU2F2ZTogLT5cblxuICAgICMgU2VyaWFsaXplcyBkYXRhIGZyb20gYW55IGZvcm0gZWxlbWVudHMgaW4gdGhpcyB2aWV3XG4gICAgZGF0YSA9IEJhY2tib25lLlN5cGhvbi5zZXJpYWxpemUoQClcblxuICAgICMgQ2xlYXIgdW51c2VkIHR5cGUtc3BlY2lmaWMgYXR0cmlidXRlc1xuICAgIGRhdGEubWFjcm9zID0gW10gaWYgZGF0YS50eXBlICE9ICdtYWNybydcbiAgICBkYXRhLnRleHRfdmFsdWUgPSAnJyBpZiBkYXRhLnR5cGUgIT0gJ3RleHQnXG5cbiAgICAjIEFwcGxpZXMgdGhlIGF0dHJpYnV0ZXMgdG8gdGhlIGNvbmZpZyBtb2RlbFxuICAgIEBtb2RlbC5nZXQoJ2NvbmZpZycpLnNldChkYXRhKVxuXG4gICAgIyBUcmlnZ2VycyBjaGFuZ2UgZXZlbnQgb24gQG1vZGVsIHRvIHJlLXJlbmRlciB0aGUgY3VycmVudGx5IGhpZGRlbiBBc3Ryb0tleSBlbGVtZW50XG4gICAgQG1vZGVsLnRyaWdnZXIoJ2NvbmZpZzp1cGRhdGVkJylcblxuICAgICMgVHJpZ2dlcnMgJ3NhdmUnIGV2ZW50LCBjbG9zaW5nIHRoaXMgdmlld1xuICAgIHJldHVybiBAdHJpZ2dlciAnc2F2ZSdcblxuICAjIG9uQ2FuY2VsXG4gIG9uQ2FuY2VsOiAtPlxuXG4gICAgIyBSZXNldHMgY29uZmlnIGF0dHJpYnV0ZXNcbiAgICBAbW9kZWwuZ2V0KCdjb25maWcnKS5zZXQoQGNhY2hlZENvbmZpZylcblxuICAgICMgVHJpZ2dlcnMgJ2NhbmNlbCcgZXZlbnQsIGNsb3NpbmcgdGhpcyB2aWV3XG4gICAgcmV0dXJuIEB0cmlnZ2VyICdjYW5jZWwnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvcldyYXBwZXJcblxuXG5cbiIsIlxuY2xhc3MgS2V5Q2hpbGQgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnYnRuIGJ0bi1vdXRsaW5lLWxpZ2h0IGtleS0tY2hpbGQgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIG14LTInXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9rZXlfY2hpbGQnKVxuXG4gIGJlaGF2aW9yczpcbiAgICBTZWxlY3RhYmxlQ2hpbGQ6IHsgZGVzZWxlY3Q6IHRydWUgfVxuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdjb25maWc6dXBkYXRlZCc6ICdvbk1vZGVsQ2hhbmdlJ1xuXG4gIG9uTW9kZWxDaGFuZ2U6IC0+XG4gICAgcmV0dXJuIEByZW5kZXIoKVxuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cblxuICAgICMgSXNvbGF0ZXMgQXN0cm9LZXlDb25maWcgbW9kZWxcbiAgICBjb25maWcgPSBAbW9kZWwuZ2V0KCdjb25maWcnKVxuXG4gICAgIyBNYWNyb1xuICAgIGlmIGNvbmZpZy5nZXQoJ3R5cGUnKSA9PSAnbWFjcm8nXG4gICAgICByZXR1cm4geyBsYWJlbDogJ01hY3JvJyB9XG5cbiAgICAjIFRleHRcbiAgICBpZiBjb25maWcuZ2V0KCd0eXBlJykgPT0gJ3RleHQnXG4gICAgICByZXR1cm4geyBsYWJlbDogJ1RleHQnIH1cblxuICAgICMgS2V5XG4gICAgIyBUT0RPIC0gRElTUExBWSBLRVkgSU4gVklFV1xuICAgIGlmIGNvbmZpZy5nZXQoJ3R5cGUnKSA9PSAna2V5J1xuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdLZXknIH1cblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleVNlbGVjdG9yIGV4dGVuZHMgTW4uQ29sbGVjdGlvblZpZXdcbiAgdGFnTmFtZTogJ3VsJ1xuICBjbGFzc05hbWU6ICdsaXN0LXVuc3R5bGVkIGtleS0tbGlzdCBweC00IHB5LTMgbXktMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gYWxpZ24taXRlbXMtY2VudGVyIGZsZXgtcm93J1xuICBjaGlsZFZpZXc6IEtleUNoaWxkXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleVNlbGVjdG9yXG5cblxuIiwiRGV2aWNlTGF5b3V0ID0gcmVxdWlyZSgnLi9kZXZpY2VMYXlvdXQnKVxuRWRpdG9yU2VsZWN0b3IgPSByZXF1aXJlKCcuL2VkaXRvclNlbGVjdG9yJylcbkVkaXRvcldyYXBwZXIgPSByZXF1aXJlKCcuL2VkaXRvcldyYXBwZXInKVxuXG4jICMgIyAjICNcblxuY2xhc3MgSGVscFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2hlbHBfdmlldydcbiAgY2xhc3NOYW1lOiAncm93J1xuXG4jICMgIyAjICNcblxuY2xhc3MgTGF5b3V0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvbGF5b3V0J1xuICBjbGFzc05hbWU6ICdjb250YWluZXItZmx1aWQgZC1mbGV4IGZsZXgtY29sdW1uIHctMTAwIGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIGRldmljZS0tbGF5b3V0J1xuXG4gIHJlZ2lvbnM6XG4gICAgZGV2aWNlUmVnaW9uOiAgICdbZGF0YS1yZWdpb249ZGV2aWNlXSdcbiAgICBzZWxlY3RvclJlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1zZWxlY3Rvcl0nXG4gICAgZWRpdG9yUmVnaW9uOiAgICdbZGF0YS1yZWdpb249ZWRpdG9yXSdcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgRGlzcGxheXMgZGVmYXVsdCBoZWxwIHRleHRcbiAgICBAc2hvd0hlbHBWaWV3KClcblxuICAgICMgSW5zdGFudGlhdGVzIGEgbmV3IERldmljZUxheW91dCBmb3IgY29ubmVjdGluZyB0byBhbiBBc3Ryb0tleVxuICAgICMgYW5kIHNlbGVjdGluZyB3aGljaCBrZXkgdGhlIHVzZXIgd291bGQgbGlrZSB0byBlZGl0XG4gICAgZGV2aWNlVmlldyA9IG5ldyBEZXZpY2VMYXlvdXQoeyBtb2RlbDogQG1vZGVsIH0pXG4gICAgZGV2aWNlVmlldy5vbiAna2V5OnNlbGVjdGVkJywgKGtleU1vZGVsKSA9PiBAc2hvd0VkaXRvclNlbGVjdG9yKGtleU1vZGVsKVxuICAgIGRldmljZVZpZXcub24gJ2tleTpkZXNlbGVjdGVkJywgKCkgPT4gQHNob3dIZWxwVmlldygpXG4gICAgQGRldmljZVJlZ2lvbi5zaG93KGRldmljZVZpZXcpXG5cbiAgc2hvd0hlbHBWaWV3OiAtPlxuXG4gICAgIyBJbnN0YW50aWF0ZXMgYSBuZXcgSGVscFZpZXcgYW5kIHNob3dzIGl0IGluIEBzZWxlY3RvclJlZ2lvblxuICAgIEBzZWxlY3RvclJlZ2lvbi5zaG93IG5ldyBIZWxwVmlldygpXG5cbiAgc2hvd0VkaXRvclNlbGVjdG9yOiAoa2V5TW9kZWwpIC0+XG5cbiAgICAjIEluc3RhbnRhaWF0ZXMgbmV3IEVkaXRvclNlbGVjdG9yIHZpZXdcbiAgICBlZGl0b3JTZWxlY3RvciA9IG5ldyBFZGl0b3JTZWxlY3Rvcih7IG1vZGVsOiBrZXlNb2RlbCB9KVxuXG4gICAgIyBTaG93cyBNYWNybyBFZGl0b3JcbiAgICBlZGl0b3JTZWxlY3Rvci5vbiAnc2hvdzptYWNybzplZGl0b3InLCA9PiBAc2hvd0VkaXRvclZpZXcoa2V5TW9kZWwsICdtYWNybycpXG5cbiAgICAjIFNob3dzIFRleHQgRWRpdG9yXG4gICAgZWRpdG9yU2VsZWN0b3Iub24gJ3Nob3c6dGV4dDplZGl0b3InLCA9PiBAc2hvd0VkaXRvclZpZXcoa2V5TW9kZWwsICd0ZXh0JylcblxuICAgICMgU2hvd3MgS2V5IEVkaXRvclxuICAgIGVkaXRvclNlbGVjdG9yLm9uICdzaG93OmtleTplZGl0b3InLCA9PiBAc2hvd0VkaXRvclZpZXcoa2V5TW9kZWwsICdrZXknKVxuXG4gICAgIyBTaG93cyB0aGUgRWRpdG9yU2VsZWN0b3Igdmlld1xuICAgIEBzZWxlY3RvclJlZ2lvbi5zaG93KGVkaXRvclNlbGVjdG9yKVxuXG4gIHNob3dFZGl0b3JWaWV3OiAoa2V5TW9kZWwsIGVkaXRvcikgLT5cbiAgICBAJGVsLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gICAgIyBJbnN0YW50aWF0ZXMgbmV3IEVkaXRvcldyYXBwZXIgdmlld1xuICAgIGVkaXRvcldyYXBwZXIgPSBuZXcgRWRpdG9yV3JhcHBlcih7IG1vZGVsOiBrZXlNb2RlbCwga2V5czogQG9wdGlvbnMua2V5cywgbWFjcm9zOiBAb3B0aW9ucy5tYWNyb3MsIGVkaXRvcjogZWRpdG9yIH0pXG5cbiAgICAjIEhhbmRsZXMgJ2NhbmNlbCcgZXZlbnRcbiAgICBlZGl0b3JXcmFwcGVyLm9uICdjYW5jZWwnLCA9PlxuICAgICAgQCRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICMgSGFuZGxlcyAnc2F2ZScgZXZlbnRcbiAgICBlZGl0b3JXcmFwcGVyLm9uICdzYXZlJywgPT5cbiAgICAgICMgVE9ETyAtIGhpdCB0aGUgS2V5TW9kZWwgLyBEZXZpY2VNb2RlbCB0byBkbyB0aGUgcmVzdCBmcm9tIGhlcmVcbiAgICAgIGNvbnNvbGUubG9nICdTQVZFIEtFWSBNT0RFTCBTRVRUSU5HUyBIRVJFJ1xuICAgICAgQCRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICMgU2hvd3MgdGhlIEVkaXRvcldyYXBwZXIgdmlldyBpbiBAZWRpdG9yUmVnaW9uXG4gICAgQGVkaXRvclJlZ2lvbi5zaG93KGVkaXRvcldyYXBwZXIpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IExheW91dFZpZXdcblxuXG5cbiIsIktleWJvYXJkU2VsZWN0b3IgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3InKVxuTWFjcm9MaXN0ID0gcmVxdWlyZSgnLi9tYWNyb0xpc3QnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9FZGl0b3IgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL21hY3JvX2VkaXRvcidcbiAgY2xhc3NOYW1lOiAncm93IGgtMTAwJ1xuXG4gIHJlZ2lvbnM6XG4gICAgbWFjcm9SZWdpb246ICAgICdbZGF0YS1yZWdpb249bWFjcm9dJ1xuICAgIGNvbnRyb2xzUmVnaW9uOiAnW2RhdGEtcmVnaW9uPWNvbnRyb2xzXSdcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgR2V0cyB0aGUgY3VycmVudCBtYWNybyBhc3NpZ25lZCB0byB0aGUga2V5TW9kZWxcbiAgICAjIG1hY3JvQ29sbGVjdGlvbiA9IGtleU1vZGVsLmdldE1hY3JvQ29sbGVjdGlvbigpXG4gICAgQG1hY3JvUmVnaW9uLnNob3cgbmV3IE1hY3JvTGlzdCh7IGNvbGxlY3Rpb246IEBvcHRpb25zLm1hY3JvcyB9KVxuXG4gICAgIyBJbnN0YW50YWlhdGVzIG5ldyBLZXlib2FyZFNlbGVjdG9yXG4gICAgIyBUT0RPIC0gdGhpcyB3aWxsICpldmVudHVhbGx5KiBkaXNwbGF5IGEgc2VsZWN0b3IgYmV0d2VlbiBkaWZmZXJlbnQgdHlwZXMgb2Yga2V5Ym9hcmRzIC8gc2V0cyBvZiBrZXlzXG4gICAga2V5Ym9hcmRWaWV3ID0gbmV3IEtleWJvYXJkU2VsZWN0b3IoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pXG5cbiAgICAjIEhhbmRsZXMgS2V5U2VsZWN0aW9uIGV2ZW50XG4gICAga2V5Ym9hcmRWaWV3Lm9uICdrZXk6c2VsZWN0ZWQnLCAoa2V5KSA9PlxuXG4gICAgICAjIENsb25lcyB0aGUgb3JpZ2luYWwgb2JqZWN0XG4gICAgICBrZXkgPSBfLmNsb25lKGtleSlcblxuICAgICAgIyBBZGRzIHRoZSBjb3JyZWN0IGBvcmRlcmAgYXR0cmlidXRlXG4gICAgICBrZXkub3JkZXIgPSBAb3B0aW9ucy5tYWNyb3MubGVuZ3RoICsgMVxuXG4gICAgICAjIEFkZHMgdGhlIGtleSB0byB0aGUgTWFjcm9Db2xsZWN0aW9uXG4gICAgICBAb3B0aW9ucy5tYWNyb3MuYWRkKGtleSlcblxuICAgICMgU2hvd3MgdGhlIGtleWJvYXJkVmlld1xuICAgIEBjb250cm9sc1JlZ2lvbi5zaG93IGtleWJvYXJkVmlld1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNYWNyb0VkaXRvclxuXG5cblxuIiwiXG5jbGFzcyBNYWNyb0NoaWxkIGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0YWdOYW1lOiAnbGknXG4gIGNsYXNzTmFtZTogJ21hY3JvLS1jaGlsZCBmbGV4LWNvbHVtbiBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBteS0yJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvbWFjcm9fY2hpbGQnKVxuXG4gIGJlaGF2aW9yczpcbiAgICBTb3J0YWJsZUNoaWxkOiB7fVxuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdjaGFuZ2U6cG9zaXRpb24nOiAncmVuZGVyJ1xuXG4gIGV2ZW50czpcbiAgICAnZHJhZyc6ICdvbkRyYWcnXG4gICAgJ2RyYWdzdGFydCc6ICdvbkRyYWdTdGFydCdcbiAgICAnbW91c2VvdmVyIC5rZXknOiAnb25Nb3VzZU92ZXInXG4gICAgJ21vdXNlb3V0IC5rZXknOiAnb25Nb3VzZU91dCdcbiAgICAnY2xpY2sgLmtleSc6ICdyZW1vdmVNYWNybydcbiAgICAnY2xpY2sgW2RhdGEtcG9zaXRpb25dOm5vdCguYWN0aXZlKSc6ICdvblBvc2l0aW9uQ2xpY2snXG5cbiAgb25Nb3VzZU92ZXI6IC0+XG4gICAgQCRlbC5hZGRDbGFzcygnaG92ZXJlZCcpXG5cbiAgb25Nb3VzZU91dDogLT5cbiAgICBAJGVsLnJlbW92ZUNsYXNzKCdob3ZlcmVkJylcblxuICBvbkRyYWdTdGFydDogLT5cbiAgICBAJGVsLmFkZENsYXNzKCdkcmFnLXN0YXJ0JylcblxuICBvbkRyYWc6IC0+XG4gICAgQCRlbC5yZW1vdmVDbGFzcygnZHJhZy1zdGFydCBob3ZlcmVkJylcbiAgICBAJGVsLnNpYmxpbmdzKCcubWFjcm8tLWNoaWxkJykucmVtb3ZlQ2xhc3MoJ2RyYWctc3RhcnQgaG92ZXJlZCcpXG5cbiAgcmVtb3ZlTWFjcm86IC0+XG4gICAgQG1vZGVsLmNvbGxlY3Rpb24ucmVtb3ZlKEBtb2RlbClcblxuICBvblBvc2l0aW9uQ2xpY2s6IChlKSAtPlxuXG4gICAgIyBDYWNoZXMgY2xpY2tlZCBlbFxuICAgIGVsID0gJChlLmN1cnJlbnRUYXJnZXQpXG5cbiAgICAjIElzb2xhdGVzIHBvc2l0aW9uIGRhdGEgZnJvbSBlbGVtZW50XG4gICAgcG9zaXRpb24gPSBlbC5kYXRhKCdwb3NpdGlvbicpXG5cbiAgICAjIERldGVybWluZXMgbmV4dCBwb3NpdGlvblxuICAgIGlmIHBvc2l0aW9uID09IC0xXG4gICAgICBuZXdfcG9zaXRpb24gPSAxXG4gICAgaWYgcG9zaXRpb24gPT0gMFxuICAgICAgbmV3X3Bvc2l0aW9uID0gLTFcbiAgICBpZiBwb3NpdGlvbiA9PSAxXG4gICAgICBuZXdfcG9zaXRpb24gPSAwXG5cbiAgICAjIFNldHMgdGhlIHBvc2l0aW9uIGF0dHJpYnV0ZSBvbiB0aGUgbW9kZWxcbiAgICBAbW9kZWwuc2V0KCdwb3NpdGlvbicsIG5ld19wb3NpdGlvbilcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAgcG9zaXRpb25zID0gW1xuICAgICAgeyBwb3NpdGlvbjogLTEsIGNzczogJ2ZhLWxvbmctYXJyb3ctZG93bicgfVxuICAgICAgeyBwb3NpdGlvbjogMCwgY3NzOiAnZmEtYXJyb3dzLXYnIH1cbiAgICAgIHsgcG9zaXRpb246IDEsIGNzczogJ2ZhLWxvbmctYXJyb3ctdXAnIH1cbiAgICBdXG5cbiAgICBwb3NpdGlvbiA9IEBtb2RlbC5nZXQoJ3Bvc2l0aW9uJylcbiAgICBhY3RpdmVfcG9zaXRpb24gPSBfLmZpbmRXaGVyZShwb3NpdGlvbnMsIHsgcG9zaXRpb246IHBvc2l0aW9uIH0pXG4gICAgcmV0dXJuIHsgYWN0aXZlX3Bvc2l0aW9uIH1cblxuIyAjICMgIyAjXG5cbmNsYXNzIE1hY3JvRW1wdHkgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnbWFjcm8tLWNoaWxkIGVtcHR5IGZsZXgtY29sdW1uIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIG15LTInXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9tYWNyb19lbXB0eScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBNYWNyb0xpc3QgZXh0ZW5kcyBNbi5Db2xsZWN0aW9uVmlld1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ2xpc3QtdW5zdHlsZWQgbWFjcm8tLWxpc3QgcHgtNCBteS0yIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBmbGV4LXJvdyBmbGV4LXdyYXAnXG4gIGNoaWxkVmlldzogTWFjcm9DaGlsZFxuICBlbXB0eVZpZXc6IE1hY3JvRW1wdHlcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgU29ydHMgdGhlIGNvbGxlY3Rpb25cbiAgICBAY29sbGVjdGlvbi5zb3J0KClcblxuICAgICMgSW5pdGlhbGl6ZXMgU29ydGFibGUgY29udGFpbmVyXG4gICAgU29ydGFibGUuY3JlYXRlIEBlbCxcbiAgICAgIGFuaW1hdGlvbjogICAgMFxuICAgICAgaGFuZGxlOiAgICAgICAnLmtleSdcbiAgICAgIGdob3N0Q2xhc3M6ICAgJ2dob3N0JyAgIyBDbGFzcyBuYW1lIGZvciB0aGUgZHJvcCBwbGFjZWhvbGRlclxuICAgICAgY2hvc2VuQ2xhc3M6ICAnY2hvc2VuJyAgIyBDbGFzcyBuYW1lIGZvciB0aGUgY2hvc2VuIGl0ZW1cbiAgICAgIGRyYWdDbGFzczogICAgJ2RyYWcnICAjIENsYXNzIG5hbWUgZm9yIHRoZSBkcmFnZ2luZyBpdGVtXG4gICAgICBmYWxsYmFja1RvbGVyYW5jZTogMTAwXG4gICAgICBvbkVuZDogKGUpID0+IEByZW9yZGVyQ29sbGVjdGlvbigpXG5cbiAgIyByZW9yZGVyQ29sbGVjdGlvblxuICAjIEludm9rZWQgYWZ0ZXIgc29ydGluZyBoYXMgY29tcGxldGVkXG4gIHJlb3JkZXJDb2xsZWN0aW9uOiA9PlxuXG4gICAgIyBUcmlnZ2VycyBvcmRlciBldmVudHMgb24gQ29sbGVjdGlvblZpZXcgY2hpbGRWaWV3ICRlbHNcbiAgICBvcmRlciA9IDFcbiAgICBmb3IgZWwgaW4gQGVsLmNoaWxkcmVuXG4gICAgICAkKGVsKS50cmlnZ2VyKCdzb3J0ZWQnLG9yZGVyKVxuICAgICAgb3JkZXIrK1xuXG4gICAgIyBAY29sbGVjdGlvbi5zb3J0KClcbiAgICBAcmVuZGVyKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWFjcm9MaXN0XG5cblxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBkYXRhLXJlZ2lvbj1cXFwia2V5c1xcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXJcXFwiPjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChsYWJlbCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxkaXYgY2xhc3M9XFxcInJvdyBkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTBcXFwiPjxwIGNsYXNzPVxcXCJsZWFkIG1iLTBcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGFiZWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvcD48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMiB0ZXh0LXJpZ2h0IHRleHQtbXV0ZWRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1wZW5jaWxcXFwiPjwvaT48L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJsYWJlbFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubGFiZWw6dHlwZW9mIGxhYmVsIT09XCJ1bmRlZmluZWRcIj9sYWJlbDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChuYXZJdGVtcywgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlwiKTtcbi8vIGl0ZXJhdGUgbmF2SXRlbXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbmF2SXRlbXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIG5hdkl0ZW0udHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG14LTNcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbmF2SXRlbS50ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2J1dHRvbj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBzdHlsZT1cXFwiZmxleC1ncm93OjE7XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEtdHJpZ2dlclwiLCBuYXZJdGVtLnRyaWdnZXIsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwiZC1mbGV4IGJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkganVzdGlmeS1jb250ZW50LWNlbnRlciBteC0zXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcIm5hdkl0ZW1zXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5uYXZJdGVtczp0eXBlb2YgbmF2SXRlbXMhPT1cInVuZGVmaW5lZFwiP25hdkl0ZW1zOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxidXR0b24gZGF0YS1jbGljaz1cXFwic2F2ZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtc3VjY2VzcyBteC0yXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtMnggbXgtNCBmYS1zYXZlXFxcIj48L2k+PC9idXR0b24+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJjYW5jZWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBteC0yXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtMnggbXgtNCBmYS10aW1lcy1jaXJjbGVcXFwiPjwvaT48L2J1dHRvbj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxoci8+PC9kaXY+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiY29udGVudFxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXggZmxleC1yb3cgYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxpIGNsYXNzPVxcXCJkLWZsZXggZmEgZmEtZncgZmEtMnggZmEtcXVlc3Rpb24tY2lyY2xlLW8gbXItMVxcXCI+PC9pPjxwIHN0eWxlPVxcXCJsZXR0ZXItc3BhY2luZzogMC4yNXJlbTsgZm9udC13ZWlnaHQ6IDIwMDtcXFwiIGNsYXNzPVxcXCJkLWZsZXggbGVhZCBtLTBcXFwiPkNsaWNrIGEga2V5IHRvIGVkaXQ8L3A+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGxhYmVsKSB7XG5idWYucHVzaChcIjxzcGFuPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGFiZWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Bhbj5cIik7fS5jYWxsKHRoaXMsXCJsYWJlbFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubGFiZWw6dHlwZW9mIGxhYmVsIT09XCJ1bmRlZmluZWRcIj9sYWJlbDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3cgaC0xMDAgdy0xMDAgZWRpdG9yLS1vdmVybGF5XFxcIj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJlZGl0b3JcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTIgcHQtMlxcXCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93IGRldmljZS0tb3ZlcmxheVxcXCI+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiZGV2aWNlXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJzZWxlY3RvclxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBwdC01XFxcIj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoYWN0aXZlX3Bvc2l0aW9uLCBrZXksIHNoaWZ0LCBzcGVjaWFsKSB7XG5qYWRlX21peGluc1tcInBvc2l0aW9uU2VsZWN0XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPHNwYW4gZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiXCIgKyAoamFkZS5hdHRyKFwidGl0bGVcIiwgb3B0cy50b29sdGlwLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1wbGFjZW1lbnQ9XFxcImJvdHRvbVxcXCJcIiArIChqYWRlLmNscyhbJ2ZhLXN0YWNrJywnZmEtbGcnLCdwb3NpdGlvbi0tc2VsZWN0JyxgcG9zaXRpb25fJHtvcHRzLnBvc2l0aW9ufWBdLCBbbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1jaXJjbGUtdGhpbiBmYS1zdGFjay0yeFxcXCI+PC9pPjxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1wb3NpdGlvblwiLCBvcHRzLnBvc2l0aW9uLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnZmEnLCdmYS1zdGFjay0xeCcsb3B0cy5jc3NdLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+PC9zcGFuPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXZcIiArIChqYWRlLmNscyhbJ2tleScsJ2QtZmxleCcsdHlwZW9mIHNwZWNpYWwgPT09IFwidW5kZWZpbmVkXCIgPyBcIlwiIDogXCJzcGVjaWFsXCJdLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48ZGl2IGNsYXNzPVxcXCJpbm5lciBjb250ZW50XFxcIj5cIik7XG5pZiAoIGtleSAmJiBzaGlmdClcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc2hpZnQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0ga2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0ga2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5idWYucHVzaChcIjwvZGl2PjxkaXYgY2xhc3M9XFxcImlubmVyIGhvdmVyXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtbGcgZmEtdGltZXNcXFwiPjwvaT48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJwb3NpdGlvbiBtdC0yXFxcIj5cIik7XG5qYWRlX21peGluc1tcInBvc2l0aW9uU2VsZWN0XCJdKGFjdGl2ZV9wb3NpdGlvbik7XG5idWYucHVzaChcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImFjdGl2ZV9wb3NpdGlvblwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguYWN0aXZlX3Bvc2l0aW9uOnR5cGVvZiBhY3RpdmVfcG9zaXRpb24hPT1cInVuZGVmaW5lZFwiP2FjdGl2ZV9wb3NpdGlvbjp1bmRlZmluZWQsXCJrZXlcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmtleTp0eXBlb2Yga2V5IT09XCJ1bmRlZmluZWRcIj9rZXk6dW5kZWZpbmVkLFwic2hpZnRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnNoaWZ0OnR5cGVvZiBzaGlmdCE9PVwidW5kZWZpbmVkXCI/c2hpZnQ6dW5kZWZpbmVkLFwic3BlY2lhbFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc3BlY2lhbDp0eXBlb2Ygc3BlY2lhbCE9PVwidW5kZWZpbmVkXCI/c3BlY2lhbDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJ0eXBlXFxcIiB2YWx1ZT1cXFwibWFjcm9cXFwiIHJlYWRvbmx5PVxcXCJyZWFkb25seVxcXCIvPjxkaXYgZGF0YS1yZWdpb249XFxcIm1hY3JvXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxoci8+PC9kaXY+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiY29udHJvbHNcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8cCBjbGFzcz1cXFwibGVhZFxcXCI+PGRpdiBjbGFzcz1cXFwiZmEgZmEtMnggZmEtaW52ZXJzZSBmYS1xdWVzdGlvbi1jaXJjbGUtb1xcXCI+PC9kaXY+Q2xpY2sgdGhlIGtleXMgYmVsb3cgdG8gc3RhcnQgYnVpbGRpbmcgYSBtYWNybzwvcD5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmphZGVfbWl4aW5zW1wiZm9ybUdyb3VwXCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGZpZWxkc2V0XCIgKyAoamFkZS5jbHMoWydmb3JtLWdyb3VwJyxvcHRzLmZvcm1Hcm91cENzc10sIFtudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIG9wdHMubGFiZWwpXG57XG5idWYucHVzaChcIjxsYWJlbCBjbGFzcz1cXFwiZm9ybS1jb250cm9sLWxhYmVsXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMubGFiZWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGFiZWw+XCIpO1xufVxuYmxvY2sgJiYgYmxvY2soKTtcbmJ1Zi5wdXNoKFwiPC9maWVsZHNldD5cIik7XG59O1xuYnVmLnB1c2goXCJcIik7XG5qYWRlX21peGluc1tcImZvcm1JbnB1dFwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5qYWRlX21peGluc1tcImZvcm1Hcm91cFwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCI8aW5wdXRcIiArIChqYWRlLmF0dHJzKGphZGUubWVyZ2UoW3tcInBsYWNlaG9sZGVyXCI6IGphZGUuZXNjYXBlKG9wdHMucGxhY2Vob2xkZXIpLFwibmFtZVwiOiBqYWRlLmVzY2FwZShvcHRzLm5hbWUpLFwidHlwZVwiOiBqYWRlLmVzY2FwZShvcHRzLnR5cGUpLFwiY2xhc3NcIjogXCJmb3JtLWNvbnRyb2xcIn0sYXR0cmlidXRlc10pLCBmYWxzZSkpICsgXCIvPlwiKTtcbn1cbn0sIG9wdHMpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJ0eXBlXFxcIiB2YWx1ZT1cXFwidGV4dFxcXCIgcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIi8+XCIpO1xuamFkZV9taXhpbnNbXCJmb3JtSW5wdXRcIl0uY2FsbCh7XG5hdHRyaWJ1dGVzOiBqYWRlLm1lcmdlKFt7IGNsYXNzOiAnZm9ybS1jb250cm9sLWxnJyB9XSlcbn0sIHsgbmFtZTogJ3RleHRfdmFsdWUnLCB0eXBlOiAndGV4dCcsIHBsYWNlaG9sZGVyOiAnRW50ZXIgc29tZSB0ZXh0IGhlcmUuLi4nIH0pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5jbGFzcyBUZXh0RWRpdG9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdydcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RleHRfZWRpdG9yJylcblxuICBvblJlbmRlcjogLT5cbiAgICBCYWNrYm9uZS5TeXBob24uZGVzZXJpYWxpemUoQCwgeyB0eXBlOiAndGV4dCcsIHRleHRfdmFsdWU6IEBtb2RlbC5nZXQoJ3RleHRfdmFsdWUnKSB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0RWRpdG9yXG4iLCJcbiMgRHVtbXkgRGV2aWNlIERhdGEgZm9yIFVJIGRldmVsb3BtZW50XG4jIFRPRE8gLSBwdWxsIGZyb20gV2ViVVNCP1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBpZDogJ2RldmljZV8xJyxcbiAgICBsYWJlbDogJ0FsZXhcXCdzIEFzdHJvS2V5JyxcbiAgICBzdGF0dXNfY29kZTogMSxcbiAgICBrZXlzOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnZGV2aWNlXzFfa2V5XzEnLFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICB0eXBlOiAnbWFjcm8nLFxuICAgICAgICAgIG1hY3JvczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIyXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiQVwiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogNjUsXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogMSxcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIyXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiU1wiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogODMsXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogMixcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiVFwiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogODQsXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogMyxcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiUlwiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogODIsXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogNCxcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiT1wiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogNzksXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogNSxcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIyXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiS1wiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogNzUsXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogNixcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiRVwiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogNjksXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogNyxcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiWVwiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogODksXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogOCxcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzInLCBjb25maWc6IHsgdHlwZTogJ3RleHQnLCB0ZXh0X3ZhbHVlOiAnSGVsbG8gd29ybGQhJyB9IH1cbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfMycsIGNvbmZpZzogeyB0eXBlOiAnbWFjcm8nLCBtYWNyb3M6IFtdIH0gfVxuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV80JywgY29uZmlnOiB7IHR5cGU6ICd0ZXh0JywgdGV4dF92YWx1ZTogJ0hlbGxvLCBhZ2FpbicgfSB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzUnLCBjb25maWc6IHsgdHlwZTogJ21hY3JvJywgbWFjcm9zOiBbXSB9IH1cbiAgICBdXG4gIH1cbl1cbiIsIk1hY3JvRW50aXRpZXMgPSByZXF1aXJlKCcuLi9tYWNyby9lbnRpdGllcycpXG5cbiMgIyAjICMgI1xuXG4jIEFzdHJvS2V5Q29uZmlnIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEFzdHJva2V5Q29uZmlnIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6IHtcbiAgICB0eXBlOiAnbWFjcm8nXG4gICAgbWFjcm9zOiBbXVxuICAgIHRleHRfdmFsdWU6ICcnXG4gICAga2V5X3ZhbHVlOiAnJ1xuICB9XG5cbiAgIyBCYWNrYm9uZS5SZWxhdGlvbmFsIC0gQHJlbGF0aW9ucyBkZWZpbml0aW9uXG4gIHJlbGF0aW9uczogW1xuICAgICAgdHlwZTogICAgICAgICAgIEJhY2tib25lLkhhc01hbnlcbiAgICAgIGtleTogICAgICAgICAgICAnbWFjcm9zJ1xuICAgICAgcmVsYXRlZE1vZGVsOiAgIE1hY3JvRW50aXRpZXMuTW9kZWxcbiAgICAgIGNvbGxlY3Rpb25UeXBlOiBNYWNyb0VudGl0aWVzLkNvbGxlY3Rpb25cbiAgXVxuXG4jICMgIyAjICNcblxuIyBBc3Ryb2tleU1vZGVsIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEFzdHJva2V5TW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIERlZmF1bHQgYXR0cmlidXRlc1xuICBkZWZhdWx0czpcbiAgICBvcmRlcjogbnVsbFxuICAgIGNvbmZpZzoge31cblxuICAjIEJhY2tib25lLlJlbGF0aW9uYWwgLSBAcmVsYXRpb25zIGRlZmluaXRpb25cbiAgcmVsYXRpb25zOiBbXG4gICAgICB0eXBlOiAgICAgICAgICAgQmFja2JvbmUuSGFzT25lXG4gICAgICBrZXk6ICAgICAgICAgICAgJ2NvbmZpZydcbiAgICAgIHJlbGF0ZWRNb2RlbDogICBBc3Ryb2tleUNvbmZpZ1xuICBdXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBBc3Ryb2tleUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBBc3Ryb2tleU1vZGVsXG4gIGNvbXBhcmF0b3I6ICdvcmRlcidcblxuIyAjICMgIyAjXG5cbiMgRGV2aWNlTW9kZWwgZGVmaW5pdGlvblxuY2xhc3MgRGV2aWNlTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIEJhY2tib25lLlJlbGF0aW9uYWwgLSBAcmVsYXRpb25zIGRlZmluaXRpb25cbiAgcmVsYXRpb25zOiBbXG4gICAgICB0eXBlOiAgICAgICAgICAgQmFja2JvbmUuSGFzTWFueVxuICAgICAga2V5OiAgICAgICAgICAgICdrZXlzJ1xuICAgICAgcmVsYXRlZE1vZGVsOiAgIEFzdHJva2V5TW9kZWxcbiAgICAgIGNvbGxlY3Rpb25UeXBlOiBBc3Ryb2tleUNvbGxlY3Rpb25cbiAgXVxuXG4jICMgIyAjICNcblxuIyBEZXZpY2VDb2xsZWN0aW9uIGRlZmluaXRpb25cbmNsYXNzIERldmljZUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBEZXZpY2VNb2RlbFxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPVxuICBNb2RlbDogICAgICBEZXZpY2VNb2RlbFxuICBDb2xsZWN0aW9uOiBEZXZpY2VDb2xsZWN0aW9uXG4iLCJFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKVxuRGV2aWNlRGF0YSA9IHJlcXVpcmUoJy4vZGF0YScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VGYWN0b3J5IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAnZGV2aWNlIG1vZGVsJzogICAgICAgJ2dldE1vZGVsJ1xuICAgICdkZXZpY2UgY29sbGVjdGlvbic6ICAnZ2V0Q29sbGVjdGlvbidcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjYWNoZWRDb2xsZWN0aW9uID0gbmV3IEVudGl0aWVzLkNvbGxlY3Rpb24oRGV2aWNlRGF0YSwgeyBwYXJzZTogdHJ1ZSB9KVxuXG4gIGdldE1vZGVsOiAoaWQpIC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uLmdldChpZClcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBAY2FjaGVkQ29sbGVjdGlvblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRGV2aWNlRmFjdG9yeSgpXG4iLCJMYXlvdXRWaWV3ICA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jICMgIyAjICNcblxuY2xhc3MgSG9tZVJvdXRlIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGUnXG5cbiAgdGl0bGU6ICdBc3Ryb0tleSBIb21lJ1xuXG4gIGJyZWFkY3J1bWJzOiBbeyB0ZXh0OiAnRGV2aWNlJyB9XVxuXG4gIGZldGNoOiAtPlxuICAgIEBkZXZpY2VNb2RlbCA9IFJhZGlvLmNoYW5uZWwoJ2RldmljZScpLnJlcXVlc3QoJ21vZGVsJywgJ2RldmljZV8xJylcblxuICByZW5kZXI6IC0+XG4gICAgY29uc29sZS5sb2coQGRldmljZU1vZGVsKTsgIyBEZWJ1Z1xuICAgIEBjb250YWluZXIuc2hvdyBuZXcgTGF5b3V0Vmlldyh7IG1vZGVsOiBAZGV2aWNlTW9kZWwgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSG9tZVJvdXRlXG4iLCJcbmNsYXNzIEhvbWVMYXlvdXRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9sYXlvdXQnXG4gIGNsYXNzTmFtZTogJ2NvbnRhaW5lci1mbHVpZCBoLTEwMCdcblxuIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWVMYXlvdXRWaWV3XG5cblxuXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3cgaC0xMDBcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PHAgY2xhc3M9XFxcImxlYWRcXFwiPkFzdHJvS2V5PC9wPjxoci8+PHAgY2xhc3M9XFxcImxlYWRcXFwiPkNvbm5lY3QgYW4gQXN0cm9LZXkgZGV2aWNlIHRvIGdldCBzdGFydGVkPC9wPjxoci8+PGEgaHJlZj1cXFwiI2RldmljZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tb3V0bGluZS1wcmltYXJ5XFxcIj5ERVZJQ0U8L2E+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInJlcXVpcmUgJy4vZmFjdG9yeSdcbkhvbWVSb3V0ZSA9IHJlcXVpcmUgJy4vaG9tZS9yb3V0ZSdcbkRhc2hib2FyZFJvdXRlID0gcmVxdWlyZSAnLi9kYXNoYm9hcmQvcm91dGUnXG5cbiMgIyAjICMgI1xuXG4jIE1haW5Sb3V0ZXIgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgTWFpblJvdXRlciBleHRlbmRzIHJlcXVpcmUgJ2huX3JvdXRpbmcvbGliL3JvdXRlcidcblxuICByb3V0ZXM6XG4gICAgJygvKSc6ICAgICAgICAnaG9tZSdcbiAgICAjICdkZXZpY2UoLyknOiAnZGFzaGJvYXJkJ1xuXG4gIGhvbWU6IC0+XG4gICAgbmV3IERhc2hib2FyZFJvdXRlKHsgY29udGFpbmVyOiBAY29udGFpbmVyIH0pXG4gICAgIyBuZXcgSG9tZVJvdXRlKHsgY29udGFpbmVyOiBAY29udGFpbmVyIH0pXG5cbiAgIyBkYXNoYm9hcmQ6IC0+XG4gICMgICBuZXcgRGFzaGJvYXJkUm91dGUoeyBjb250YWluZXI6IEBjb250YWluZXIgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWFpblJvdXRlclxuIiwiXG4jIEZpbHRlcnMgdXNlZCB0byBxdWVyeSBXZWJVU0IgZGV2aWNlc1xuIyBUT0RPIC0gdXBkYXRlIGZpbHRlcnMgdG8gcXVlcnkgZGV2aWNlcyBieSBBc3Ryb0tleSBWZW5kb3JJRFxucmVxdWVzdERldmljZUZpbHRlcnMgPSBbXG4gIHsgdmVuZG9ySWQ6IDB4MTBjNCB9XG5dXG5cbiMgIyAjICNcblxuIyBVc2JTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgUmVzcG9uc2libGUgZm9yIG1hbmFnaW5nIFVTQiBkZXZpY2VzXG4jIC0gZmV0Y2ggYWxsIGRldmljZXNcbmNsYXNzIFVzYlNlcnZpY2UgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb1JlcXVlc3RzOlxuICAgICd1c2IgZGV2aWNlcyc6ICdnZXREZXZpY2VzJ1xuXG4gICMgZ2V0RGV2aWNlc1xuICBnZXREZXZpY2VzOiAtPlxuXG4gICAgIyBSZXR1cm5zIGEgUHJvbWlzZSB0byBtYW5hZ2UgYXN5bmNob25vdXMgYmVoYXZpb3JcbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgIyBTdGVwIDEgLSBSZXF1ZXN0IGRldmljZVxuICAgICAgbmF2aWdhdG9yLnVzYi5yZXF1ZXN0RGV2aWNlKHsgZmlsdGVyczogcmVxdWVzdERldmljZUZpbHRlcnMgfSlcbiAgICAgIC50aGVuKCAoZGV2aWNlKSA9PlxuXG4gICAgICAgICMgVE9ETyAtIHJlbW92ZVxuICAgICAgICAjIGNvbnNvbGUubG9nIGRldmljZVxuXG4gICAgICAgICMgU3RlcCAyIC0gR2V0IERldmljZXNcbiAgICAgICAgIyBUT0RPIC0gdmVyaWZ5IHRoaXMgd29ya2Zsb3dcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2IuZ2V0RGV2aWNlcygpLnRoZW4oKGQpID0+XG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhkKVxuXG4gICAgICAgICAgZCA9IGRbMF1cblxuICAgICAgICAgICMgU1RFUCAzIC0gb3BlbiBkZXZpY2VcbiAgICAgICAgICBkLm9wZW4oKS50aGVuID0+XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdvcGVuJ1xuXG4gICAgICAgICAgICAjIFN0ZXAgNCAtIHNlbGVjdCBjb25maWd1cmF0aW9uXG4gICAgICAgICAgICBkLnNlbGVjdENvbmZpZ3VyYXRpb24oMSkudGhlbiA9PlxuXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nICdzZWxlY3RDb25maWd1cmF0aW9uJ1xuXG4gICAgICAgICAgICAgIHdpbmRvdy5kID0gZFxuXG4gICAgICAgICAgICAgICMgU1RFUCA1IC0gY29udHJvbFRyYW5zZmVySW5cbiAgICAgICAgICAgICAgIyB3aW5kb3cuZC5jb250cm9sVHJhbnNmZXJJbih7J3JlcXVlc3RUeXBlJzogJ3N0YW5kYXJkJywgJ3JlY2lwaWVudCc6ICdkZXZpY2UnLCAncmVxdWVzdCc6IDB4MDYsICd2YWx1ZSc6IDB4MEYwMCwgJ2luZGV4JzogMHgwMH0sIDUpLnRoZW4oIChyKSA9PiB7IGNvbnNvbGUubG9nKHIpIH0pXG5cblxuICAgICAgICApXG5cbiAgICAgIClcblxuXG4jICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFVzYlNlcnZpY2UoKVxuIixudWxsLCJcbiMgUHJvdmlkZXMgdXBkYXRlQXR0cnMgbWV0aG9kIHVzZWQgYnkgYmluZENoZWNrYm94ZXMsIGJpbmRJbnB1dHMsIGJpbmRSYWRpb3MsIGJpbmRTZWxlY3RzXG5jbGFzcyBCaW5kQmFzZSBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1cGRhdGVBdHRyczogKGUpIC0+XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIEB2aWV3Lm1vZGVsLnNldChCYWNrYm9uZS5TeXBob24uc2VyaWFsaXplKEApKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5kQmFzZVxuIiwiXG4jIERhdGFiaW5kaW5nIGZvciBmb3JtIGlucHV0c1xuY2xhc3MgQmluZElucHV0cyBleHRlbmRzIHJlcXVpcmUgJy4vYmluZEJhc2UnXG5cbiAgZXZlbnRzOlxuICAgICdpbnB1dCBpbnB1dCc6ICAndXBkYXRlQXR0cnMnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbmRJbnB1dHNcbiIsIlxuX3NlbmRGbGFzaCA9ICh0eXBlLCBvYmopIC0+XG4gIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykudHJpZ2dlcih0eXBlLCBvYmopXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBGbGFzaGVzQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnM9e30pIC0+XG4gICAgQHZpZXcuX2ZsYXNoZXMgICAgICA9IEBvcHRpb25zXG4gICAgQHZpZXcuZmxhc2hFcnJvciAgICA9IEBmbGFzaEVycm9yXG4gICAgQHZpZXcuZmxhc2hTdWNjZXNzICA9IEBmbGFzaFN1Y2Nlc3NcblxuICBmbGFzaEVycm9yOiAob2JqPXt9KSAtPlxuICAgIF9zZW5kRmxhc2goJ2Vycm9yJywgQF9mbGFzaGVzWydlcnJvciddIHx8IG9iailcblxuICBmbGFzaFN1Y2Nlc3M6IChvYmo9e30pIC0+XG4gICAgX3NlbmRGbGFzaCgnc3VjY2VzcycsIEBfZmxhc2hlc1snc3VjY2VzcyddIHx8IG9iailcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hlc0JlaGF2aW9yXG4iLCJcbmNsYXNzIE1vZGVsRXZlbnRzQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgbW9kZWxFdmVudHM6XG4gICAgJ3JlcXVlc3QnOiAgJ29uTW9kZWxSZXF1ZXN0J1xuICAgICdzeW5jJzogICAgICdvbk1vZGVsU3luYydcbiAgICAnZXJyb3InOiAgICAnb25Nb2RlbEVycm9yJ1xuXG4gIG9uTW9kZWxSZXF1ZXN0OiAobW9kZWwsIHN0YXR1cywgb3B0aW9ucykgLT5cbiAgICBAdmlldy5vblJlcXVlc3Q/KG1vZGVsLCBzdGF0dXMsIG9wdGlvbnMpXG5cbiAgb25Nb2RlbFN5bmM6IChtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpIC0+XG4gICAgQHZpZXcub25TeW5jPyhtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpXG5cbiAgb25Nb2RlbEVycm9yOiAobW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKSAtPlxuICAgIEB2aWV3Lm9uRXJyb3I/KG1vZGVsLCByZXNwb25zZSwgb3B0aW9ucylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kZWxFdmVudHNCZWhhdmlvclxuIiwiXG4jIFN1Ym1pdEJ1dHRvbkJlaGF2aW9yIGNsYXNzIGRlZmluaXRpb25cbiMgUHJvdmlkZXMgYW4gZXZlbnQgbGlzdGVuZXIgYW5kIGhhbmRsZXIsIGFuZCBkZWZpbmVzXG4jIGFzc29jaWF0ZWQgY2FsbGJhY2tzIG9uIHRoZSB2aWV3IHRvIHdoaWNoIHRoZSBiZWhhdmlvclxuIyBpcyBhdHRhY2hlZC4gVGhpcyBpcyB1c2VkIGluIHRoZSBQYXNzd29yZCBhbmQgU25pcHBldCBmb3Jtcy5cbmNsYXNzIFN1Ym1pdEJ1dHRvbkJlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIHVpOlxuICAgIHN1Ym1pdDogJ1tkYXRhLWNsaWNrPXN1Ym1pdF0nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuc3VibWl0Om5vdCguZGlzYWJsZWQpJzogJ29uU3VibWl0Q2xpY2snXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnM9e30pIC0+XG4gICAgQHZpZXcuZGlzYWJsZVN1Ym1pdCA9ID0+IEBkaXNhYmxlU3VibWl0KClcbiAgICBAdmlldy5lbmFibGVTdWJtaXQgID0gPT4gQGVuYWJsZVN1Ym1pdCgpXG5cbiAgb25TdWJtaXRDbGljazogKGUpIC0+IEB2aWV3Lm9uU3VibWl0PyhlKVxuICBkaXNhYmxlU3VibWl0OiAtPiBAdWkuc3VibWl0LmFkZENsYXNzKCdkaXNhYmxlZCcpXG4gIGVuYWJsZVN1Ym1pdDogLT4gIEB1aS5zdWJtaXQucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU3VibWl0QnV0dG9uQmVoYXZpb3JcbiIsIlxuY2xhc3MgVG9vbHRpcEJlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIHVpOlxuICAgIHRvb2x0aXBzOiAnW2RhdGEtdG9nZ2xlPXRvb2x0aXBdJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgIyBQcm94aWVzIGNsZWFyIG1ldGhvZCB0byBiZSBhY2Nlc3NpYmxlIGluc2lkZSB0aGUgdmlld1xuICAgIEB2aWV3LmNsZWFyVG9vbHRpcHMgPSA9PiBAY2xlYXIoKVxuXG4gIGNsZWFyOiAtPlxuICAgIEB1aS50b29sdGlwcy50b29sdGlwKCdoaWRlJylcbiAgICBAdWkudG9vbHRpcHMudG9vbHRpcCgnZGlzcG9zZScpXG5cbiAgb25SZW5kZXI6IC0+IEB1aS50b29sdGlwcz8udG9vbHRpcCgpXG4gIG9uQmVmb3JlRGVzdHJveTogLT4gQGNsZWFyKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gVG9vbHRpcEJlaGF2aW9yXG4iLCJcbiMgQXNzaWducyBNYXJpb25ldHRlLkRlY29yYXRvclxuTWFyaW9uZXR0ZS5EZWNvcmF0b3IgPSByZXF1aXJlICcuL2RlY29yYXRvcidcblxuIyBPdmVycmlkZXMgZGVmYXVsdCBzZXJpYWxpemVNb2RlbCgpIG1ldGhvZCBkZWZpbml0aW9uXG4jIEluIHRoZSBjb250ZXh0IHRoZSBzZXJpYWxpemVNb2RlbCBtZXRob2QsICd0aGlzJ1xuIyByZWZlcnMgdG8gdGhlIHZpZXcgaW5zdGFuY2UgaW5zaWRlIHdoaWNoIHRoZVxuIyBzZXJpYWxpemVNb2RlbCBtZXRob2Qgd2FzIGludm9rZWRcbk1hcmlvbmV0dGUuVmlldy5wcm90b3R5cGUuc2VyaWFsaXplTW9kZWwgPSAtPlxuXG4gICMgSWYgdGhpcy5tb2RlbCBpcyBub3QgZGVmaW5lZCwgcmV0dXJuIGFuIGVtcHR5IG9iamVjdFxuICBpZiAhdGhpcy5tb2RlbFxuICAgIHJldHVybiB7fVxuXG4gICMgSWYgdGhpcy5tb2RlbCBleGlzdHMsIGFuZCBoYXMgYSBkZWNvcmF0b3IgZGVmaW5lZCxcbiAgIyByZXR1cm4gdGhlIHRoaXMubW9kZWwncyBhdHRyaWJ1dGVzIGFuZCBkZWNvcmF0aW9uc1xuICBlbHNlIGlmIHRoaXMubW9kZWwuZGVjb3JhdG9yXG4gICAgcmV0dXJuIHRoaXMubW9kZWwuZGVjb3JhdG9yLmRlY29yYXRlKHRoaXMubW9kZWwpXG5cbiAgIyBPdGhlcndpc2UsIHJldHVybiB0aGUgY2xvbmVkIGF0dHJpYnV0ZXMgb2YgdGhpcy5tb2RlbFxuICByZXR1cm4gXy5jbG9uZSB0aGlzLm1vZGVsLmF0dHJpYnV0ZXNcbiIsIlxuIyBCYXNlRGVjb3JhdG9yIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIHNpbXBsZSBjbGFzcyB0byBkZWNvcmF0ZSBtb2RlbHMgd2hlblxuIyB0aGV5IGFyZSBzZXJpYWxpemVkIGludG8gYSB2aWV3J3MgdGVtcGxhdGVcbmNsYXNzIEJhc2VEZWNvcmF0b3JcblxuICAjIERlY29yYXRpb24gbWV0aG9kXG4gICMgSW52b2tlZCBpbiBNYXJpb25ldHRlLlZpZXcucHJvdG90eXBlLnNlcmlhbGl6ZU1vZGVsXG4gIEBkZWNvcmF0ZTogKG1vZGVsKSAtPlxuXG4gICAgIyBDbG9uZXMgbW9kZWwncyBhdHRyaWJ1dGVzXG4gICAgIyBDbG9uaW5nIHByZXZlbnRzIGNvbnRhbWluYXRpb24gb2ZcbiAgICBkYXRhID0gXy5jbG9uZShtb2RlbC5hdHRyaWJ1dGVzKVxuXG4gICAgIyBJdGVyYXRlcyBvdmVyIGVhY2ggZnVuY3Rpb24gaW4gcHJvdG90eXBlXG4gICAgIyBMZXZlcmFnZXMgVW5kZXJzY29yZS5qcyBfLmZ1bmN0aW9ucygpXG4gICAgZm9yIGZ1bmMgaW4gXy5mdW5jdGlvbnMoQHByb3RvdHlwZSlcblxuICAgICAgIyBTa2lwIGNvbnN0cnVjdG9yXG4gICAgICBjb250aW51ZSBpZiBmdW5jID09ICdjb25zdHJ1Y3RvcidcblxuICAgICAgIyBBc3NpZ25zIHZhbHVlIG9mIGZ1bmN0aW9uIHRvIGhhc2hcbiAgICAgIGRhdGFbZnVuY10gPSBAcHJvdG90eXBlW2Z1bmNdLmFwcGx5KG1vZGVsKVxuXG4gICAgIyBSZXR1cm5zIHRoZSBtb2RlbCdzIGF0dHJpYnV0ZXMgJiBkZWNvcmF0aW9uc1xuICAgIHJldHVybiBkYXRhXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VEZWNvcmF0b3JcbiIsIlxuIyBGbGFzaENvbGxlY3Rpb24gY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgYmFzaWMgQmFja2JvbmUuQ29sbGVjdGlvbiB0byBiZSB1c2VkIGJ5IHRoZVxuIyBGbGFzaENvbXBvbmVudCBmb3Igc3RvcmluZyBtdWx0aXBsZSBmbGFzaCBtb2RlbHNcbmNsYXNzIEZsYXNoQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IHJlcXVpcmUgJy4vbW9kZWwnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoQ29sbGVjdGlvblxuIiwicmVxdWlyZSAnLi9zZXJ2aWNlJ1xuRmxhc2hMaXN0ID0gcmVxdWlyZSAnLi92aWV3cy9mbGFzaExpc3QnXG5cbiMgIyAjICMgI1xuXG4jIEZsYXNoU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBjb21wb25lbnQgdG8gY3JlYXRlIGFuZCBkaXNwbGF5IGZsYXNoZXNcbiMgaW4gdGhlIGFwcC4gUHJvdmlkZXMgbXVsdGlwbGUgaW50ZXJmYWNlcyBpbiByYWRpb0V2ZW50c1xuIyB0byBoYW5kbGUgY29tbW9uIHR5cGVzIG9mIGZsYXNoZXMgKGVycm9yLCB3YXJuaW5nLCBzdWNjZXNzKVxuY2xhc3MgRmxhc2hDb21wb25lbnQgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlNlcnZpY2VcblxuICBpbml0aWFsaXplOiAob3B0aW9ucyA9IHt9KSAtPlxuICAgIEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykucmVxdWVzdCgnY29sbGVjdGlvbicpLnRoZW4gKGNvbGxlY3Rpb24pID0+XG4gICAgICBAY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25cbiAgICAgIEBjb2xsZWN0aW9uLm9uICd1cGRhdGUnLCBAc2hvd0xpc3RWaWV3LCBAXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2ZsYXNoIGFkZCc6ICAgICAgJ2FkZCdcbiAgICAnZmxhc2ggcmVzZXQnOiAgICAncmVzZXQnXG4gICAgJ2ZsYXNoIGVycm9yJzogICAgJ2Vycm9yJ1xuICAgICdmbGFzaCB3YXJuaW5nJzogICd3YXJuaW5nJ1xuICAgICdmbGFzaCBzdWNjZXNzJzogICdzdWNjZXNzJ1xuXG4gIGFkZDogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQob3B0aW9ucylcblxuICByZXNldDogLT5cbiAgICBAY29sbGVjdGlvbi5yZXNldCgpXG5cbiAgZXJyb3I6IChvcHRpb25zPXt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZCBfLmV4dGVuZCggb3B0aW9ucywgeyBjb250ZXh0OiAgJ2RhbmdlcicgfSlcblxuICB3YXJuaW5nOiAob3B0aW9ucz17fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQgXy5leHRlbmQoIG9wdGlvbnMsIHsgY29udGV4dDogICd3YXJuaW5nJyB9KVxuXG4gIHN1Y2Nlc3M6IChvcHRpb25zPXt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZCBfLmV4dGVuZCggb3B0aW9ucywgeyBjb250ZXh0OiAgJ3N1Y2Nlc3MnIH0pXG5cbiAgc2hvd0xpc3RWaWV3OiA9PlxuICAgIHVubGVzcyBAcmVuZGVyZWRcbiAgICAgIEBjb250YWluZXIuc2hvdyBuZXcgRmxhc2hMaXN0KHsgY29sbGVjdGlvbjogQGNvbGxlY3Rpb24gfSlcbiAgICAgIEByZW5kZXJlZCA9IHRydWVcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hDb21wb25lbnRcbiIsIlxuIyBGbGFzaE1vZGVsIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIEJhY2tib25lLk1vZGVsIHRvIG1hbmFnZSB2aWV3c1xuIyBkaXNwbGF5ZWQgaW4gdGhlIEZsYXNoQ29tcG9uZW50XG5jbGFzcyBGbGFzaE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblxuICBkZWZhdWx0czpcbiAgICB0aW1lb3V0OiA1MDAwXG4gICAgZGlzbWlzc2libGU6IHRydWVcbiAgICBjb250ZXh0OiAnaW5mbydcblxuICAjIEFsZXJ0IE1vZGVsIEF0dHJpYnV0ZXMgLyBPcHRpb25zXG4gICMgLSBtZXNzYWdlXG4gICMgLSBzdHJvbmdUZXh0IChwbGVhc2UgcmVuYW1lIHRvICdzdHJvbmcnICYgYWRkIGFwcHJvcHJpYXRlIHNwYWNpbmcgdG8gdGVtcGxhdGUpXG4gICMgLSBjb250ZXh0Q2xhc3MgKHBsZWFzZSByZW5hbWUgdG8gJ2NvbnRleHQnKVxuICAjIC0gdGltZW91dCAoZGVmYXVsdCBpcyA1IHNlY29uZHMpXG4gICMgLSBkaXNtaXNzaWJsZSAoZGVmYXVsdCBpcyB0cnVlKVxuXG4gIGRpc21pc3M6IC0+XG4gICAgQGNvbGxlY3Rpb24ucmVtb3ZlKEApXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoTW9kZWxcbiIsIkZsYXNoQ29sbGVjdGlvbiA9IHJlcXVpcmUgJy4vY29sbGVjdGlvbidcblxuIyAjICMgIyAjXG5cbiMgRmxhc2hTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lZCBhIGJhc2ljIHNlcnZpY2UgdG8gcmV0dXJuIHRoZSBGbGFzaGVzQ29sbGVjdGlvblxuIyB3aGVuIHJlcXVlc3RlZC4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBGbGFzaENvbXBvbmVudCB0byByZXRyaWV2ZVxuIyB0aGUgRmxhc2hDb2xsZWN0aW9uIGl0IGlzIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmdcbmNsYXNzIEZsYXNoU2VydmljZSBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ2ZsYXNoIGNvbGxlY3Rpb24nOiAnZ2V0Q29sbGVjdGlvbidcblxuICBhbGVydHM6IG51bGxcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBuZXcgUHJvbWlzZSAocmVzb2x2ZSxyZWplY3QpID0+XG4gICAgICBAYWxlcnRzIHx8PSBuZXcgRmxhc2hDb2xsZWN0aW9uKClcbiAgICAgIHJlc29sdmUoQGFsZXJ0cylcbiAgICAgIHJldHVyblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRmxhc2hTZXJ2aWNlKClcbiIsIiMgRmxhc2hDaGlsZCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBNYXJpb25ldHRlLkxheW91dFZpZXcgdG8gZGlzcGxheSBhIEZsYXNoTW9kZWwgaW5zdGFuY2VcbiMgVGhpcyB2aWV3IGF1dG8tZGlzbWlzc2VzIGFmdGVyIHRoZSB0aW1lb3V0IGRlZmluZWQgaW4gdGhlIEZsYXNoTW9kZWwgaW5zdGFuY2VcbmNsYXNzIEZsYXNoQ2hpbGQgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93J1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvZmxhc2hfY2hpbGQnXG5cbiAgYXR0cmlidXRlczpcbiAgICBzdHlsZTogJ2Rpc3BsYXk6bm9uZTsnXG5cbiAgdWk6XG4gICAgY2xvc2U6ICdbZGF0YS1jbGljaz1kaXNtaXNzXSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5jbG9zZSc6ICdkaXNtaXNzJ1xuXG4gIG9uU2hvdzogLT5cbiAgICB0aW1lb3V0ID0gQG1vZGVsLmdldCgndGltZW91dCcpXG4gICAgc2V0VGltZW91dCggQGRpc21pc3MsIHRpbWVvdXQgKVxuXG4gIG9uQXR0YWNoOiAtPlxuICAgIEAkZWwuZmFkZUluKClcblxuICByZW1vdmU6IC0+XG4gICAgQCRlbC5zbGlkZVRvZ2dsZSggPT5cbiAgICAgIE1hcmlvbmV0dGUuTGF5b3V0Vmlldy5wcm90b3R5cGUucmVtb3ZlLmNhbGwoQClcbiAgICApXG5cbiAgZGlzbWlzczogPT5cbiAgICBAbW9kZWwuY29sbGVjdGlvbj8ucmVtb3ZlKCBAbW9kZWwgKVxuXG4jIEZsYXNoTGlzdCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3IHRvIHRoZSBsaXN0IG9mIEZsYXNoZXNcbmNsYXNzIEZsYXNoTGlzdCBleHRlbmRzIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXdcbiAgY2xhc3NOYW1lOiAnY29udGFpbmVyLWZsdWlkJ1xuICBjaGlsZFZpZXc6IEZsYXNoQ2hpbGRcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hMaXN0XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChjb250ZXh0LCBkaXNtaXNzaWJsZSwgbWVzc2FnZSwgc3Ryb25nKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMiB0ZXh0LWNlbnRlclxcXCI+PGRpdiByb2xlPVxcXCJhbGVydFxcXCJcIiArIChqYWRlLmNscyhbJ2FsZXJ0JywnYWxlcnQtZGlzbWlzc2libGUnLCdmYWRlJywnaW4nLFwiYWxlcnQtXCIgKyBjb250ZXh0XSwgW251bGwsbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggZGlzbWlzc2libGUpXG57XG5idWYucHVzaChcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWNsaWNrPVxcXCJkaXNtaXNzXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInNyLW9ubHlcXFwiPkNsb3NlPC9zcGFuPjwvYnV0dG9uPlwiKTtcbn1cbmlmICggc3Ryb25nKVxue1xuYnVmLnB1c2goXCI8c3Ryb25nPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc3Ryb25nICsgXCIgXCIpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Ryb25nPlwiKTtcbn1cbmlmICggbWVzc2FnZSlcbntcbmJ1Zi5wdXNoKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbWVzc2FnZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKTtcbn1cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiY29udGV4dFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguY29udGV4dDp0eXBlb2YgY29udGV4dCE9PVwidW5kZWZpbmVkXCI/Y29udGV4dDp1bmRlZmluZWQsXCJkaXNtaXNzaWJsZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGlzbWlzc2libGU6dHlwZW9mIGRpc21pc3NpYmxlIT09XCJ1bmRlZmluZWRcIj9kaXNtaXNzaWJsZTp1bmRlZmluZWQsXCJtZXNzYWdlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5tZXNzYWdlOnR5cGVvZiBtZXNzYWdlIT09XCJ1bmRlZmluZWRcIj9tZXNzYWdlOnVuZGVmaW5lZCxcInN0cm9uZ1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc3Ryb25nOnR5cGVvZiBzdHJvbmchPT1cInVuZGVmaW5lZFwiP3N0cm9uZzp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbmNsYXNzIE92ZXJsYXlWaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogZmFsc2VcbiAgY2xhc3NOYW1lOiAnb3ZlcmxheSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrJzogJ29uQ2xpY2snXG5cbiAgb25DbGljazogLT5cbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdzaWRlYmFyJykudHJpZ2dlcignaGlkZScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBPdmVybGF5Q29tcG9uZW50IGV4dGVuZHMgTW4uU2VydmljZVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbnRhaW5lciAgPSBvcHRpb25zLmNvbnRhaW5lclxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdvdmVybGF5IHJlYWR5JzogICdvblJlYWR5J1xuICAgICdvdmVybGF5IHNob3cnOiAgICdzaG93T3ZlcmxheSdcbiAgICAnb3ZlcmxheSBoaWRlJzogICAnaGlkZU92ZXJsYXknXG5cbiAgc2hvd092ZXJsYXk6IC0+XG4gICAgJCgnLm92ZXJsYXktcmVnaW9uJykuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgaGlkZU92ZXJsYXk6IC0+XG4gICAgJCgnLm92ZXJsYXktcmVnaW9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgb25SZWFkeTogLT5cbiAgICB1bmxlc3MgQHZpZXdcbiAgICAgIEB2aWV3ID0gbmV3IE92ZXJsYXlWaWV3KClcbiAgICAgIEBjb250YWluZXIuc2hvdyhAdmlldylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gT3ZlcmxheUNvbXBvbmVudFxuIiwiXG4jIEJhc2VSb3V0ZSBjbGFzcyBkZWZpbml0aW9uXG4jIFRoZSBiYXNlIHJvdXRlIHJlZHVjZXMgcmVwZWF0ZWQgY29kZSBieVxuIyBhdHRhY2hpbmcgdGhlIEBjb250YWluZXIgcHJvcGVydHkgcGFzc2VkIGluIGZyb21cbiMgdGhlIHJvdXRlci4gVGhpcyBwcm9wZXJ0eSBpcyB1c2VkIHRvIGRpc3BsYXkgdmlld3MgaW4gdGhlIGFwcFxuY2xhc3MgQmFzZVJvdXRlIGV4dGVuZHMgQmFja2JvbmUuUm91dGluZy5Sb3V0ZVxuXG4gIGJyZWFkY3J1bWJzOiBbXVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zKSAtPlxuXG4gICAgIyBBdHRhY2hlcyBvcHRpb25zXG4gICAgQG9wdGlvbnMgPSBvcHRpb25zXG5cbiAgICAjIEF0dGFjaGVzIGNvbnRhaW5lclxuICAgIEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuXG4gICAgIyBFdmVudCBoYW5kbGVyc1xuICAgIEBvbiAnYmVmb3JlOmVudGVyJywgPT4gQG9uQmVmb3JlRW50ZXI/KGFyZ3VtZW50cylcbiAgICBAb24gJ2JlZm9yZTpmZXRjaCcsID0+IEBvbkJlZm9yZUZldGNoPyhhcmd1bWVudHMpXG4gICAgQG9uICdiZWZvcmU6cmVuZGVyJywgPT4gQG9uQmVmb3JlUmVuZGVyPyhhcmd1bWVudHMpXG4gICAgQG9uICdmZXRjaCcsID0+IEBvbkZldGNoPyhhcmd1bWVudHMpXG4gICAgQG9uICdyZW5kZXInLCA9PiBAb25SZW5kZXI/KGFyZ3VtZW50cylcbiAgICBAb24gJ2VudGVyJywgPT4gQG9uRW50ZXI/KGFyZ3VtZW50cylcblxuICAgICMgSGlkZXMgc2lkZWJhciBjb21wb25lbnRcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdzaWRlYmFyJykudHJpZ2dlcignaGlkZScpXG5cbiAgX3NldFBhZ2VUaXRsZTogLT5cbiAgICBkb2N1bWVudC50aXRsZSA9IF8ucmVzdWx0IEAsICd0aXRsZSdcblxuICBfdXBkYXRlQnJlYWRjcnVtYnM6IC0+XG4gICAgYnJlYWRjcnVtYnMgPSBfLnJlc3VsdCBALCAnYnJlYWRjcnVtYnMnXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnYnJlYWRjcnVtYicpLnRyaWdnZXIoJ3NldCcsIGJyZWFkY3J1bWJzKSBpZiBicmVhZGNydW1ic1xuXG4gIG9uRmV0Y2g6IC0+XG4gICAgQF9zZXRQYWdlVGl0bGUoKVxuICAgIEBfdXBkYXRlQnJlYWRjcnVtYnMoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlUm91dGVcbiIsIlxuIyBCYXNlUm91dGVyIGNsYXNzIGRlZmluaXRpb25cbiMgVGhlIGJhc2Ugcm91dGVyIHJlZHVjZXMgcmVwZWF0ZWQgY29kZSBieVxuIyBhdHRhY2hpbmcgdGhlIEBjb250YWluZXIgcHJvcGVydHkgcGFzc2VkIGluIGZyb20gd2hlbiBpbnN0YW50aWF0ZWQuXG4jIFRoaXMgcHJvcGVydHkgaXMgc3Vic2VxdWVudGx5IHBhc3NlZCB0byBhbGwgcm91dGVzIGNyZWF0ZWQgaW5zaWRlXG4jIHJvdXRlcnMgc3ViY2xhc3NlZCBmcm9tIHRoaXMgZGVmaW5pdGlvblxuY2xhc3MgQmFzZVJvdXRlciBleHRlbmRzIEJhY2tib25lLlJvdXRpbmcuUm91dGVyXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+IEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlUm91dGVyXG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4oZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5qYWRlID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKSA6XG4gICAgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxba2V5XTsgfSkgOlxuICAgIFt2YWxdKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0eWxlID0gZnVuY3Rpb24gKHZhbCkge1xuICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubWFwKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXTtcbiAgICB9KS5qb2luKCc7Jyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICB2YWwgPSBleHBvcnRzLnN0eWxlKHZhbCk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsKS5pbmRleE9mKCcmJykgIT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NpbmNlIEphZGUgMi4wLjAsIGFtcGVyc2FuZHMgKGAmYCkgaW4gZGF0YSBhdHRyaWJ1dGVzICcgK1xuICAgICAgICAgICAgICAgICAgICd3aWxsIGJlIGVzY2FwZWQgdG8gYCZhbXA7YCcpO1xuICAgIH07XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBlbGltaW5hdGUgdGhlIGRvdWJsZSBxdW90ZXMgYXJvdW5kIGRhdGVzIGluICcgK1xuICAgICAgICAgICAgICAgICAgICdJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBqYWRlX2VuY29kZV9odG1sX3J1bGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90Oydcbn07XG52YXIgamFkZV9tYXRjaF9odG1sID0gL1smPD5cIl0vZztcblxuZnVuY3Rpb24gamFkZV9lbmNvZGVfY2hhcihjKSB7XG4gIHJldHVybiBqYWRlX2VuY29kZV9odG1sX3J1bGVzW2NdIHx8IGM7XG59XG5cbmV4cG9ydHMuZXNjYXBlID0gamFkZV9lc2NhcGU7XG5mdW5jdGlvbiBqYWRlX2VzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKS5yZXBsYWNlKGphZGVfbWF0Y2hfaHRtbCwgamFkZV9lbmNvZGVfY2hhcik7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuZXhwb3J0cy5EZWJ1Z0l0ZW0gPSBmdW5jdGlvbiBEZWJ1Z0l0ZW0obGluZW5vLCBmaWxlbmFtZSkge1xuICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xufVxuXG59LHtcImZzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XX0se30sWzFdKSgxKVxufSk7XG59KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIlxuY2xhc3MgQWJzdHJhY3RLZXlib2FyZFZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdyBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlcidcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2tleWJvYXJkX2Fic3RyYWN0J1xuXG4gICMgVE9ETyAtIGFjdGl2YXRlIHRoaXMgYmVoYXZpb3IgY29uZGl0aW9uYWxseVxuICAjIGJlaGF2aW9yczpcbiAgIyAgIEtleWJvYXJkQ29udHJvbHM6IHt9XG5cbiAgdWk6XG4gICAga2V5OiAnW2RhdGEtY2xpY2s9a2V5XSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5rZXknOiAnb25LZXlDbGljaydcblxuICAjIEtleWJvYXJkQ29udHJvbHMgYmVoYXZpb3IgY2FsbGJhY2tcbiAgb25LZXlBY3Rpb246IChlKSAtPlxuICAgICMgY29uc29sZS5sb2cgZVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBrZXkgPSBAb3B0aW9ucy5rZXlzLmZpbmRXaGVyZSh7IGtleWNvZGU6IGUua2V5Q29kZSB9KVxuXG4gICAgIyBjb25zb2xlLmxvZyBrZXlcblxuICAgIGlmIGUudHlwZSA9PSAna2V5ZG93bidcbiAgICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBrZXkudG9KU09OKClcblxuICAgIGlmIGUudHlwZSA9PSAna2V5dXAnXG4gICAgICBAJChcIltkYXRhLWtleWNvZGU9I3tlLmtleUNvZGV9XVwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICBlbHNlXG4gICAgICBAJChcIltkYXRhLWtleWNvZGU9I3tlLmtleUNvZGV9XVwiKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICAjIEtleUNsaWNrIGNhbGxiYWNrXG4gIG9uS2V5Q2xpY2s6IChlKSAtPlxuXG4gICAgIyBDYWNoZXMgZWwgYW5kIGtleWNvZGVcbiAgICBlbCAgPSAkKGUuY3VycmVudFRhcmdldClcbiAgICBrZXljb2RlID0gZWwuZGF0YSgna2V5Y29kZScpXG5cbiAgICAjIEZpbmRzIHRoZSBtb2RlbCBvZiB0aGUga2V5IHRoYXQgd2FzIHNlbGVjdGVkXG4gICAga2V5ID0gQG9wdGlvbnMua2V5cy5maW5kV2hlcmUoeyBrZXljb2RlOiBrZXljb2RlIH0pXG5cbiAgICAjIFRyaWdnZXJzICdrZXk6c2VsZWN0ZWQnIGV2ZW50XG4gICAgQHRyaWdnZXIgJ2tleTpzZWxlY3RlZCcsIGtleS50b0pTT04oKVxuXG4gICAgIyBCbHVycyBmb2N1cyBmcm9tIGNsaWNrZWQga2V5XG4gICAgZWwuYmx1cigpXG5cbiAgICByZXR1cm5cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RLZXlib2FyZFZpZXdcbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleWJvYXJkVmlldyBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9rZXlib2FyZF9mdWxsJ1xuXG4gICMgUGFzc2VzIGtleSBvYmplY3RzIHRvIFVJXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBrZXlzID0gQG9wdGlvbnMua2V5cy50b0pTT04oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAncjAnfSlcbiAgICAgIHIxOiBfLndoZXJlKGtleXMsIHsgcm93OiAncjEnfSlcbiAgICAgIHIyOiBfLndoZXJlKGtleXMsIHsgcm93OiAncjInfSlcbiAgICAgIHIzOiBfLndoZXJlKGtleXMsIHsgcm93OiAncjMnfSlcbiAgICAgIHI0OiBfLndoZXJlKGtleXMsIHsgcm93OiAncjQnfSlcbiAgICB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkVmlld1xuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjXG5cbmNsYXNzIEZ1bmN0aW9uS2V5Ym9hcmQgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuXG4gICMgUGFzc2VzIGtleSBvYmplY3RzIHRvIFVJXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBrZXlzID0gQG9wdGlvbnMua2V5cy50b0pTT04oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAnZnVuY19yMCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb25LZXlib2FyZFxuXG5cbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgI1xuXG5jbGFzcyBNZWRpYUtleWJvYXJkIGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ21lZGlhX3IwJ30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNZWRpYUtleWJvYXJkXG5cblxuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjXG5cbmNsYXNzIE5hdktleWJvYXJkIGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ25hdl9yMCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTmF2S2V5Ym9hcmRcblxuXG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICNcblxuY2xhc3MgTnVtcGFkVmlldyBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9rZXlib2FyZF9udW1wYWQnXG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjAnfSlcbiAgICAgIHIxOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3IxJ30pXG4gICAgICByMjogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yMid9KVxuICAgICAgcjM6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjMnfSlcbiAgICAgIHI0OiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3I0J30pXG4gICAgICBjb2w6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fY29sJ30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBOdW1wYWRWaWV3XG5cblxuIiwiU2ltcGxlTmF2ID0gcmVxdWlyZSgnbGliL3ZpZXdzL3NpbXBsZV9uYXYnKVxuRnVsbEtleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Z1bGwnKVxuTnVtcGFkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQnKVxuRnVuY3Rpb25LZXlib2FyZCA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9mdW5jdGlvbicpXG5NZWRpYUtleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX21lZGlhJylcbk5hdktleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX25hdicpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlib2FyZFNlbGVjdG9yIGV4dGVuZHMgU2ltcGxlTmF2XG4gIGNsYXNzTmFtZTogJ3JvdyBoLTEwMCdcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2tleWJvYXJkX3NlbGVjdG9yJylcblxuICBuYXZJdGVtczogW1xuICAgIHsgaWNvbjogJ2ZhLWtleWJvYXJkLW8nLCAgdGV4dDogJ0tleWJvYXJkJywgIHRyaWdnZXI6ICdrZXlib2FyZCcsIGRlZmF1bHQ6IHRydWUgfVxuICAgIHsgaWNvbjogJ2ZhLWZpbGUtdGV4dC1vJywgdGV4dDogJ051bXBhZCcsICAgdHJpZ2dlcjogJ251bXBhZCcgfVxuICAgIHsgaWNvbjogJ2ZhLWNhcmV0LXNxdWFyZS1vLXVwJywgICAgdGV4dDogJ0Z1bmN0aW9uJywgICAgdHJpZ2dlcjogJ2Z1bmN0aW9uJyB9XG4gICAgeyBpY29uOiAnZmEtYXN0ZXJpc2snLCAgICB0ZXh0OiAnTWVkaWEnLCAgICB0cmlnZ2VyOiAnbWVkaWEnIH1cbiAgICB7IGljb246ICdmYS1hc3RlcmlzaycsICAgIHRleHQ6ICdOYXZpZ2F0aW9uJywgICAgdHJpZ2dlcjogJ25hdicgfVxuICBdXG5cbiAgc2hvd0tleWJvYXJkVmlldzogKGtleWJvYXJkVmlldykgLT5cblxuICAgICMgSGFuZGxlcyBLZXlTZWxlY3Rpb24gZXZlbnRcbiAgICBrZXlib2FyZFZpZXcub24gJ2tleTpzZWxlY3RlZCcsIChrZXkpID0+IEB0cmlnZ2VyKCdrZXk6c2VsZWN0ZWQnLCBrZXkpXG5cbiAgICAjIFNob3dzIHRoZSBrZXlib2FyZFZpZXdcbiAgICBAY29udGVudFJlZ2lvbi5zaG93IGtleWJvYXJkVmlld1xuXG4gIG9uTmF2aWdhdGVLZXlib2FyZDogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgRnVsbEtleWJvYXJkKHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuICBvbk5hdmlnYXRlTnVtcGFkOiAtPlxuICAgIEBzaG93S2V5Ym9hcmRWaWV3KG5ldyBOdW1wYWRWaWV3KHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuICBvbk5hdmlnYXRlRnVuY3Rpb246IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IEZ1bmN0aW9uS2V5Ym9hcmQoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4gIG9uTmF2aWdhdGVNZWRpYTogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgTWVkaWFLZXlib2FyZCh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZU5hdjogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgTmF2S2V5Ym9hcmQoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZFNlbGVjdG9yXG4iLCJjbGFzcyBTaW1wbGVOYXYgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBbZGF0YS10cmlnZ2VyXSc6ICdvbk5hdkl0ZW1DbGljaydcblxuICBuYXZJdGVtczogW11cblxuICByZWdpb25zOlxuICAgIGNvbnRlbnRSZWdpb246ICdbZGF0YS1yZWdpb249Y29udGVudF0nXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgZGVmID0gXy53aGVyZShfLnJlc3VsdChALCAnbmF2SXRlbXMnKSwgeyBkZWZhdWx0OiB0cnVlIH0pWzBdXG4gICAgcmV0dXJuIHVubGVzcyBkZWZcbiAgICBAdHJpZ2dlck1ldGhvZChcIm5hdmlnYXRlOiN7ZGVmLnRyaWdnZXJ9XCIpXG5cbiAgc2VyaWFsaXplRGF0YTogLT5cbiAgICBkYXRhID0gc3VwZXJcbiAgICBfLmV4dGVuZChkYXRhLCB7IG5hdkl0ZW1zOiBfLnJlc3VsdChALCAnbmF2SXRlbXMnKSB9KVxuICAgIHJldHVybiBkYXRhXG5cbiAgb25OYXZJdGVtQ2xpY2s6IChlKSA9PlxuICAgIGVsID0gJChlLmN1cnJlbnRUYXJnZXQpXG4gICAgZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgQHRyaWdnZXJNZXRob2QoXCJuYXZpZ2F0ZToje2VsLmRhdGEoJ3RyaWdnZXInKX1cIilcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU2ltcGxlTmF2XG4iXX0=
