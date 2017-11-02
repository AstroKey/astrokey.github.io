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
    overlay: '[app-region=overlay]',
    flash: '[app-region=flash]',
    modal: '[app-region=modal]',
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



},{"./keyboardControls":4,"./selectableChild":5,"./sortableChild":6,"./sortableList":7,"hn_behaviors/lib/bindInputs":63,"hn_behaviors/lib/flashes":64,"hn_behaviors/lib/modelEvents":65,"hn_behaviors/lib/submitButton":66,"hn_behaviors/lib/tooltips":67}],4:[function(require,module,exports){
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
var AboutComponent, AboutView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AboutView = require('./views/layout');

AboutComponent = (function(superClass) {
  extend(AboutComponent, superClass);

  function AboutComponent() {
    return AboutComponent.__super__.constructor.apply(this, arguments);
  }

  AboutComponent.prototype.radioEvents = {
    'about show': 'showAbout'
  };

  AboutComponent.prototype.showAbout = function() {
    var aboutView;
    aboutView = new AboutView();
    return this.showModal(aboutView, {
      size: 'large'
    });
  };

  return AboutComponent;

})(require('hn_modal/lib/abstract'));

module.exports = AboutComponent;



},{"./views/layout":9,"hn_modal/lib/abstract":76}],9:[function(require,module,exports){
var AboutView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AboutView = (function(superClass) {
  extend(AboutView, superClass);

  function AboutView() {
    return AboutView.__super__.constructor.apply(this, arguments);
  }

  AboutView.prototype.template = require('./templates/about');

  AboutView.prototype.className = 'modal-content';

  return AboutView;

})(Mn.LayoutView);

module.exports = AboutView;



},{"./templates/about":10}],10:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"modal-body\"><div class=\"row\"><div class=\"col-lg-12 text-center\"><h5 class=\"modal-title\">ABOUT</h5></div><div class=\"col-lg-12 text-center\"><hr/></div><div class=\"col-lg-12 text-center\"><p class=\"lead\"><a href=\"https://github.com/AstroKey\" target=\"_blank\"> AstroKey</a> is an open-source platform for re-programmable USB keyboards.</p><p>AstroKey provides an intuitive interface anybody can use to automate basic keyboard actions.</p><p>Simply drag and drop keyboard keys to construct your desired sequence - AstroKey does the rest.</p><p>It's that easy.</p></div><div class=\"col-lg-12 text-center\"><hr/><p>Built by&nbsp;<a href=\"https://github.com/AaronPerl\" target=\"_blank\">Aaron Perl</a>&nbsp;and&nbsp;<a href=\"http://aeks.co\" target=\"_blank\">Alexander Schwartzberg</a>&nbsp;for&nbsp;<a href=\"https://rcos.io/\" target=\"_blank\">RCOS.</a></p></div></div></div>");;return buf.join("");
};
},{"jade/runtime":82}],11:[function(require,module,exports){
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



},{"./views/layout":12}],12:[function(require,module,exports){
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



},{"./templates/header":13}],13:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"navbar-brand title\">ASTROKEY</div><ul class=\"navbar-nav ml-auto\"><li class=\"nav-item\"><a style=\"cursor:pointer\" onClick=\"Radio.channel('about').trigger('show');\" class=\"nav-link\"><i class=\"fa fa-fw fa-lg fa-question-circle-o\"></i></a></li></ul>");;return buf.join("");
};
},{"jade/runtime":82}],14:[function(require,module,exports){
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



},{}],15:[function(require,module,exports){
require('./window');

require('./jwt');

require('./cors');

require('./marionette');



},{"./cors":14,"./jwt":16,"./marionette":17,"./window":18}],16:[function(require,module,exports){
$.ajaxSetup({
  beforeSend: function(xhr) {
    var token;
    token = localStorage.getItem('token');
    if (token) {
      xhr.setRequestHeader('Authorization', 'JWT ' + token);
    }
  }
});



},{}],17:[function(require,module,exports){
Marionette.Behaviors.behaviorsLookup = function() {
  return require('../behaviors');
};



},{"../behaviors":3}],18:[function(require,module,exports){
window.Radio = Backbone.Radio;



},{}],19:[function(require,module,exports){
var AboutComponent, App, AppLayout, FlashComponent, HeaderComponent, MainModule, OverlayComponent;

require('./config');

App = require('./app');

AppLayout = require('./application/views/layout');

require('hn_entities/lib/config');

HeaderComponent = require('./components/header/component');

AboutComponent = require('./components/about/component');

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

new AboutComponent({
  container: AppLayout.modal
});

require('./modules/usb/service');

require('./modules/key/factory');

MainModule = require('./modules/main/router');

new MainModule({
  container: AppLayout.main
});

$(document).on('ready', (function(_this) {
  return function() {
    return new App();
  };
})(this));



},{"./app":1,"./application/views/layout":2,"./components/about/component":8,"./components/header/component":11,"./config":15,"./modules/key/factory":21,"./modules/main/router":59,"./modules/usb/service":60,"hn_entities/lib/config":68,"hn_flash/lib/component":71,"hn_overlay/lib/component":79}],20:[function(require,module,exports){
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



},{}],21:[function(require,module,exports){
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



},{"./entities":20,"./keys":22}],22:[function(require,module,exports){
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
    keycode: 46
  }
];



},{}],23:[function(require,module,exports){
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
},{"jade/runtime":82}],24:[function(require,module,exports){
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
},{"jade/runtime":82}],25:[function(require,module,exports){
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
},{"jade/runtime":82}],26:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (navItems, undefined) {
buf.push("<div class=\"col-lg-12\"><div class=\"row justify-content-center\"><div class=\"col-lg-8 d-flex justify-content-center\">");
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
},{"jade/runtime":82}],27:[function(require,module,exports){
var MacroCollection, MacroExamples, MacroModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MacroExamples = require('./examples');

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

  MacroCollection.prototype.loadExample = function(example_id) {
    return this.reset(MacroExamples[example_id]);
  };

  return MacroCollection;

})(Backbone.Collection);

module.exports = {
  Model: MacroModel,
  Collection: MacroCollection
};



},{"./examples":32}],28:[function(require,module,exports){
module.exports = [
  {
    "key": "SHIFT",
    "keycode": 16,
    "position": -1,
    "order": 1
  }, {
    "key": "H",
    "keycode": 72,
    "order": 2,
    "position": 0
  }, {
    "key": "SHIFT",
    "keycode": 16,
    "position": 1,
    "order": 3
  }, {
    "key": "E",
    "keycode": 69,
    "order": 4,
    "position": 0
  }, {
    "key": "L",
    "keycode": 76,
    "order": 5,
    "position": 0
  }, {
    "key": "L",
    "keycode": 76,
    "order": 6,
    "position": 0
  }, {
    "key": "O",
    "keycode": 79,
    "order": 7,
    "position": 0
  }, {
    "key": "SHIFT",
    "keycode": 16,
    "position": -1,
    "order": 8
  }, {
    "key": "1",
    "shift": "!",
    "keycode": 49,
    "order": 9,
    "position": 0
  }, {
    "key": "SHIFT",
    "keycode": 16,
    "position": 1,
    "order": 10
  }
];



},{}],29:[function(require,module,exports){
module.exports = [
  {
    "key": "R",
    "keycode": 82,
    "order": 1,
    "position": 0
  }, {
    "key": "E",
    "keycode": 69,
    "order": 2,
    "position": 0
  }, {
    "key": "S",
    "keycode": 83,
    "order": 3,
    "position": 0
  }, {
    "key": "U",
    "keycode": 85,
    "order": 4,
    "position": 0
  }, {
    "key": "M",
    "keycode": 77,
    "order": 5,
    "position": 0
  }, {
    "key": "ALT",
    "keycode": 18,
    "position": -1,
    "order": 6
  }, {
    "key": "`",
    "shift": "~",
    "keycode": 192,
    "order": 7,
    "position": 0
  }, {
    "key": "ALT",
    "keycode": 18,
    "position": 1,
    "order": 8
  }, {
    "key": "E",
    "keycode": 69,
    "order": 9,
    "position": 0
  }
];



},{}],30:[function(require,module,exports){
module.exports = [
  {
    "key": "ALT",
    "keycode": 18,
    "position": -1,
    "order": 1
  }, {
    "key": "SHIFT",
    "keycode": 16,
    "position": -1,
    "order": 2
  }, {
    "key": "-",
    "shift": "_",
    "keycode": 189,
    "order": 3,
    "position": 0
  }, {
    "key": "SHIFT",
    "keycode": 16,
    "position": 1,
    "order": 4
  }, {
    "key": "ALT",
    "keycode": 18,
    "position": 1,
    "order": 5
  }
];



},{}],31:[function(require,module,exports){
module.exports = [
  {
    "key": "CTRL",
    "keycode": 17,
    "position": -1,
    "order": 1
  }, {
    "key": "ALT",
    "keycode": 18,
    "position": -1,
    "order": 2
  }, {
    "row": "nav_r0",
    "key": "DEL",
    "keycode": 46,
    "order": 3,
    "position": 0
  }, {
    "key": "ALT",
    "keycode": 18,
    "position": 1,
    "order": 4
  }, {
    "key": "CTRL",
    "keycode": 17,
    "position": 1,
    "order": 5
  }
];



},{}],32:[function(require,module,exports){
module.exports = {
  ex_01: require('./example_1'),
  ex_02: require('./example_2'),
  ex_03: require('./example_3'),
  ex_04: require('./example_4')
};



},{"./example_1":28,"./example_2":29,"./example_3":30,"./example_4":31}],33:[function(require,module,exports){
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
    return this.device = Radio.channel('device').request('model', 'device_1');
  };

  DashboardRoute.prototype.render = function() {
    return this.container.show(new LayoutView({
      model: this.device
    }));
  };

  return DashboardRoute;

})(require('hn_routing/lib/route'));

module.exports = DashboardRoute;



},{"./views/layout":38,"hn_routing/lib/route":80}],34:[function(require,module,exports){
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



},{"./keySelector":37,"./templates/device_layout":41,"./templates/device_status":42}],35:[function(require,module,exports){
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



},{"./templates/editor_selector":43,"lib/views/simple_nav":90}],36:[function(require,module,exports){
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

  EditorWrapper.prototype.ui = {
    recordBtn: '[data-click=record]'
  };

  EditorWrapper.prototype.events = {
    'click [data-click=save]': 'onSave',
    'click [data-click=clear]': 'onClear',
    'click [data-click=cancel]': 'onCancel',
    'click [data-example]': 'loadExample',
    'click @ui.recordBtn': 'toggleRecord'
  };

  EditorWrapper.prototype.editors = {
    macro: MacroEditor,
    text: TextEditor,
    key: MacroEditor
  };

  EditorWrapper.prototype.onRender = function() {
    var EditorView, config, keys;
    EditorView = this.editors[this.options.editor];
    config = this.model.get('config');
    this.cachedConfig = config.toJSON();
    this.macros = config.get('macros');
    window.macros = this.macros;
    keys = Radio.channel('key').request('collection');
    this.editorView = new EditorView({
      model: config,
      keys: keys,
      macros: this.macros
    });
    this.editorView.on('stop:recording', (function(_this) {
      return function() {
        return _this.toggleRecord();
      };
    })(this));
    return this.contentRegion.show(this.editorView);
  };

  EditorWrapper.prototype.onClear = function() {
    this.stopRecording();
    this.macros.reset();
  };

  EditorWrapper.prototype.onSave = function() {
    var data;
    this.stopRecording();
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
    this.stopRecording();
    this.model.get('config').set(this.cachedConfig);
    return this.trigger('cancel');
  };

  EditorWrapper.prototype.loadExample = function(e) {
    var el, example_id;
    el = $(e.currentTarget);
    example_id = el.data('example');
    return this.macros.loadExample(example_id);
  };

  EditorWrapper.prototype.toggleRecord = function(e) {
    if (this.isRecording) {
      return this.stopRecording();
    }
    return this.startRecording();
  };

  EditorWrapper.prototype.stopRecording = function() {
    var ref;
    this.isRecording = false;
    if ((ref = this.editorView.keyboardSelector) != null) {
      ref.current.stopRecording();
    }
    return this.ui.recordBtn.removeClass('active').find('i').removeClass('fa-spin fa-circle-o-notch').addClass('fa-circle');
  };

  EditorWrapper.prototype.startRecording = function() {
    var ref;
    this.isRecording = true;
    if ((ref = this.editorView.keyboardSelector) != null) {
      ref.current.startRecording();
    }
    return this.ui.recordBtn.addClass('active').find('i').addClass('fa-spin fa-circle-o-notch').removeClass('fa-circle');
  };

  return EditorWrapper;

})(Marionette.LayoutView);

module.exports = EditorWrapper;



},{"./macroEditor":39,"./templates/editor_wrapper":44,"./textEditor":52}],37:[function(require,module,exports){
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



},{"./templates/key_child":46}],38:[function(require,module,exports){
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



},{"./deviceLayout":34,"./editorSelector":35,"./editorWrapper":36,"./templates/help_view":45,"./templates/layout":47}],39:[function(require,module,exports){
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
    this.macroRegion.show(new MacroList({
      collection: this.options.macros
    }));
    this.keyboardSelector = new KeyboardSelector({
      model: this.model,
      keys: this.options.keys
    });
    this.keyboardSelector.on('stop:recording', (function(_this) {
      return function() {
        return _this.trigger('stop:recording');
      };
    })(this));
    this.keyboardSelector.on('key:selected', (function(_this) {
      return function(key) {
        key = _.clone(key);
        key.order = _this.options.macros.length + 1;
        return _this.options.macros.add(key);
      };
    })(this));
    return this.controlsRegion.show(this.keyboardSelector);
  };

  MacroEditor.prototype.startRecording = function() {
    return this.keyboardView.startRecording();
  };

  MacroEditor.prototype.stopRecording = function() {
    return this.keyboardView.stopRecording();
  };

  return MacroEditor;

})(Marionette.LayoutView);

module.exports = MacroEditor;



},{"./macroList":40,"./templates/macro_editor":49,"lib/views/keyboard_selector":89}],40:[function(require,module,exports){
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



},{"./templates/macro_child":48,"./templates/macro_empty":50}],41:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div data-region=\"keys\" class=\"col-lg-12 d-flex justify-content-center align-items-center\"></div>");;return buf.join("");
};
},{"jade/runtime":82}],42:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (label) {
buf.push("<div class=\"col-lg-12\"><div class=\"row d-flex align-items-center\"><div class=\"col-lg-10\"><p class=\"lead mb-0\">" + (jade.escape(null == (jade_interp = label) ? "" : jade_interp)) + "</p></div><div class=\"col-lg-2 text-right text-muted\"><i class=\"fa fa-fw fa-pencil\"></i></div></div></div>");}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return buf.join("");
};
},{"jade/runtime":82}],43:[function(require,module,exports){
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
},{"jade/runtime":82}],44:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"col-lg-12\"><div class=\"row justify-content-center\"><div class=\"col-lg-12 d-flex justify-content-center\"><button data-click=\"cancel\" class=\"btn btn-sm btn-outline-secondary mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-angle-left\"></i></button><button data-click=\"save\" class=\"btn btn-sm btn-outline-success mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-check-circle-o\"></i></button><button data-click=\"clear\" class=\"btn btn-sm btn-outline-warning mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-times\"></i></button><button data-click=\"record\" class=\"btn btn-sm btn-outline-danger mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-circle\"></i></button><div class=\"btn-group\"><button type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"btn btn-sm btn-outline-primary dropdown-toggle mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-folder-open-o\"></i></button><div class=\"dropdown-menu dropdown-menu-right\"><button type=\"button\" data-example=\"ex_01\" class=\"dropdown-item\">Ex. 1: \"Hello!\"</button><button type=\"button\" data-example=\"ex_02\" class=\"dropdown-item\">Ex. 2: \"Resumè\"</button><button type=\"button\" data-example=\"ex_03\" class=\"dropdown-item\">Ex. 3: Em Dash (—)</button><button type=\"button\" data-example=\"ex_04\" class=\"dropdown-item\">Ex. 4: CTRL + ALT + DELETE</button></div></div></div></div></div><div class=\"col-lg-12\"><hr/></div><div data-region=\"content\" class=\"col-lg-12\"></div>");;return buf.join("");
};
},{"jade/runtime":82}],45:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"col-lg-12 d-flex flex-row align-items-center justify-content-center\"><i class=\"d-flex fa fa-fw fa-2x fa-question-circle-o mr-1\"></i><p style=\"letter-spacing: 0.25rem; font-weight: 200;\" class=\"d-flex lead m-0\">Click a key to edit</p></div>");;return buf.join("");
};
},{"jade/runtime":82}],46:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (label) {
buf.push("<span>" + (jade.escape(null == (jade_interp = label) ? "" : jade_interp)) + "</span>");}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return buf.join("");
};
},{"jade/runtime":82}],47:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row h-100 w-100 editor--overlay\"><div data-region=\"editor\" class=\"col-lg-12 pt-2\"></div></div><div class=\"row device--overlay\"><div data-region=\"device\" class=\"col-lg-12\"></div><div data-region=\"selector\" class=\"col-lg-12 pt-5\"></div></div>");;return buf.join("");
};
},{"jade/runtime":82}],48:[function(require,module,exports){
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
},{"jade/runtime":82}],49:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<input type=\"hidden\" name=\"type\" value=\"macro\" readonly=\"readonly\"/><div data-region=\"macro\" class=\"col-lg-12\"></div><div class=\"col-lg-12\"><hr/></div><div data-region=\"controls\" class=\"col-lg-12\"></div>");;return buf.join("");
};
},{"jade/runtime":82}],50:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<p class=\"lead text-center\">Macros<br/><small>Execute keystrokes in a specific sequence</small></p><small style=\"font-size: 1rem;\" class=\"text-muted d-flex flex-row justify-content-center align-items-center\"><div class=\"fa fa-fw fa-question-circle-o mr-1 d-flex flex-column\"></div><div class=\"d-flex flex-row\"><span>Use the keys below, or click&nbsp;</span><span class=\"text-danger\"><i class=\"fa fa-fw fa-circle text-danger\"></i> record&nbsp;</span>&nbsp;to start typing</div></small>");;return buf.join("");
};
},{"jade/runtime":82}],51:[function(require,module,exports){
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
},{"jade/runtime":82}],52:[function(require,module,exports){
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



},{"./templates/text_editor":51}],53:[function(require,module,exports){
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
          macros: []
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



},{}],54:[function(require,module,exports){
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



},{"../macro/entities":27}],55:[function(require,module,exports){
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



},{"./data":53,"./entities":54}],56:[function(require,module,exports){
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



},{"./views/layout":57,"hn_routing/lib/route":80}],57:[function(require,module,exports){
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



},{"./templates/layout":58}],58:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row h-100\"><div class=\"col-lg-12 text-center\"><p class=\"lead\">AstroKey</p><hr/><p class=\"lead\">Connect an AstroKey device to get started</p><hr/><a href=\"#device\" class=\"btn btn-outline-primary\">DEVICE</a></div></div>");;return buf.join("");
};
},{"jade/runtime":82}],59:[function(require,module,exports){
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



},{"./dashboard/route":33,"./factory":55,"./home/route":56,"hn_routing/lib/router":81}],60:[function(require,module,exports){
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

  UsbService.prototype.send = function() {
    return window.d.controlTransferOut({
      requestType: 'vendor',
      recipient: 'device',
      request: 0x03,
      value: 0x0013,
      index: 0x0001
    }, data);
  };

  return UsbService;

})(Marionette.Service);

module.exports = new UsbService();



},{}],61:[function(require,module,exports){

},{}],62:[function(require,module,exports){
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



},{}],63:[function(require,module,exports){
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



},{"./bindBase":62}],64:[function(require,module,exports){
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



},{}],65:[function(require,module,exports){
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



},{}],66:[function(require,module,exports){
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



},{}],67:[function(require,module,exports){
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



},{}],68:[function(require,module,exports){
Marionette.Decorator = require('./decorator');

Marionette.View.prototype.serializeModel = function() {
  if (!this.model) {
    return {};
  } else if (this.model.decorator) {
    return this.model.decorator.decorate(this.model);
  }
  return _.clone(this.model.attributes);
};



},{"./decorator":69}],69:[function(require,module,exports){
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



},{}],70:[function(require,module,exports){
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



},{"./model":72}],71:[function(require,module,exports){
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



},{"./service":73,"./views/flashList":74}],72:[function(require,module,exports){
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



},{}],73:[function(require,module,exports){
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



},{"./collection":70}],74:[function(require,module,exports){
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



},{"./templates/flash_child":75}],75:[function(require,module,exports){
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
},{"jade/runtime":82}],76:[function(require,module,exports){
var AbstractModalComponent, ModalView, hideModalOnHashChange,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('./view');

hideModalOnHashChange = function() {
  return window.modalWindow.hideModal();
};

AbstractModalComponent = (function(superClass) {
  extend(AbstractModalComponent, superClass);

  function AbstractModalComponent() {
    return AbstractModalComponent.__super__.constructor.apply(this, arguments);
  }

  AbstractModalComponent.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    return this.container = options.container;
  };

  AbstractModalComponent.prototype.hideModal = function() {
    return this.modalView.hideModal();
  };

  AbstractModalComponent.prototype.showModal = function(contentView, modalViewOptions) {
    if (modalViewOptions == null) {
      modalViewOptions = {};
    }
    this.modalView = new ModalView(modalViewOptions);
    this.modalView.on('show', (function(_this) {
      return function() {
        _this.modalView.contentRegion.show(contentView);
        window.addEventListener('hashchange', hideModalOnHashChange);
        return window.modalWindow = _this.modalView;
      };
    })(this));
    this.modalView.on('destroy', function() {
      window.removeEventListener('hashchange', hideModalOnHashChange);
      return delete window.modalWindow;
    });
    this.modalView.on('hidden:modal', (function(_this) {
      return function() {
        return typeof _this.onModalHidden === "function" ? _this.onModalHidden() : void 0;
      };
    })(this));
    return this.container.show(this.modalView);
  };

  return AbstractModalComponent;

})(Marionette.Service);

module.exports = AbstractModalComponent;



},{"./view":78}],77:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (modalCss) {
buf.push("<div role=\"document\" data-region=\"modal-content\"" + (jade.cls([modalCss], [true])) + "></div>");}.call(this,"modalCss" in locals_for_with?locals_for_with.modalCss:typeof modalCss!=="undefined"?modalCss:undefined));;return buf.join("");
};
},{"jade/runtime":82}],78:[function(require,module,exports){
var ModalView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = (function(superClass) {
  extend(ModalView, superClass);

  function ModalView() {
    return ModalView.__super__.constructor.apply(this, arguments);
  }

  ModalView.prototype.template = require('./modal_template');

  ModalView.prototype.attributes = {
    role: 'dialog',
    tabindex: '-1'
  };

  ModalView.prototype.className = 'modal fade';

  ModalView.prototype.templateHelpers = function() {
    var css, size;
    size = this.options.size || '';
    css = 'modal-dialog';
    if (size === 'small') {
      css += ' modal-sm';
    }
    if (size === 'large') {
      css += ' modal-lg';
    }
    return {
      modalCss: css
    };
  };

  ModalView.prototype.regions = {
    contentRegion: '[data-region=modal-content]'
  };

  ModalView.prototype.events = {
    'show.bs.modal': function() {
      return this.triggerMethod('show:modal');
    },
    'shown.bs.modal': function() {
      return this.triggerMethod('shown:modal');
    },
    'hide.bs.modal': function() {
      return this.triggerMethod('hide:modal');
    },
    'hidden.bs.modal': function() {
      return this.triggerMethod('hidden:modal');
    },
    'loaded.bs.modal': function() {
      return this.triggerMethod('loaded:modal');
    }
  };

  ModalView.prototype.onShow = function() {
    return this.$el.modal(this.options.modalOptions || {});
  };

  ModalView.prototype.hideModal = function() {
    return this.$el.modal('hide');
  };

  return ModalView;

})(Marionette.LayoutView);

module.exports = ModalView;



},{"./modal_template":77}],79:[function(require,module,exports){
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



},{}],80:[function(require,module,exports){
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



},{}],81:[function(require,module,exports){
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



},{}],82:[function(require,module,exports){
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
},{"fs":61}],83:[function(require,module,exports){
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

  AbstractKeyboardView.prototype.isRecording = false;

  AbstractKeyboardView.prototype.initialize = function() {
    return this.debounceStopRecording = _.debounce((function(_this) {
      return function() {
        return _this.trigger('stop:recording');
      };
    })(this), 1500);
  };

  AbstractKeyboardView.prototype.startRecording = function() {
    return this.isRecording = true;
  };

  AbstractKeyboardView.prototype.stopRecording = function() {
    return this.isRecording = false;
  };

  AbstractKeyboardView.prototype.onKeyAction = function(e) {
    var json, key, ref, ref1;
    if (!this.isRecording) {
      return;
    }
    e.preventDefault();
    key = this.options.keys.findWhere({
      keycode: e.keyCode
    });
    if (e.type === 'keydown') {
      if ((ref = e.key) === "Control" || ref === "Meta" || ref === "Alt" || ref === "Shift") {
        json = key.toJSON();
        json.position = -1;
        this.trigger('key:selected', json);
      } else {
        this.trigger('key:selected', key.toJSON());
      }
    }
    if (e.type === 'keyup') {
      if ((ref1 = e.key) === "Control" || ref1 === "Meta" || ref1 === "Alt" || ref1 === "Shift") {
        json = key.toJSON();
        json.position = 1;
        this.trigger('key:selected', json);
      }
    }
    if (e.type === 'keyup') {
      this.$("[data-keycode=" + e.keyCode + "]").removeClass('active');
    } else {
      this.$("[data-keycode=" + e.keyCode + "]").addClass('active');
    }
    setTimeout((function(_this) {
      return function() {
        return _this.$("[data-keycode=" + e.keyCode + "]").removeClass('active');
      };
    })(this), 1000);
    return this.debounceStopRecording();
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



},{"./templates/keyboard_abstract":23}],84:[function(require,module,exports){
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

  KeyboardView.prototype.behaviors = {
    KeyboardControls: {}
  };

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



},{"./templates/keyboard_full":24,"lib/views/keyboard_abstract":83}],85:[function(require,module,exports){
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



},{"lib/views/keyboard_abstract":83}],86:[function(require,module,exports){
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



},{"lib/views/keyboard_abstract":83}],87:[function(require,module,exports){
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



},{"lib/views/keyboard_abstract":83}],88:[function(require,module,exports){
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



},{"./templates/keyboard_numpad":25,"lib/views/keyboard_abstract":83}],89:[function(require,module,exports){
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
    this.current = keyboardView;
    this.current.on('stop:recording', (function(_this) {
      return function() {
        return _this.trigger('stop:recording');
      };
    })(this));
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



},{"./templates/keyboard_selector":26,"lib/views/keyboard_full":84,"lib/views/keyboard_function":85,"lib/views/keyboard_media":86,"lib/views/keyboard_nav":87,"lib/views/keyboard_numpad":88,"lib/views/simple_nav":90}],90:[function(require,module,exports){
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
    this.triggerMethod("navigate:" + def.trigger);
    return this.$("[data-trigger=" + def.trigger + "]").addClass('active');
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
    this.triggerMethod("navigate:" + (el.data('trigger')));
    return el.blur();
  };

  return SimpleNav;

})(Mn.LayoutView);

module.exports = SimpleNav;



},{}]},{},[19])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9hcHAuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvYXBwbGljYXRpb24vdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2JlaGF2aW9ycy9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9iZWhhdmlvcnMva2V5Ym9hcmRDb250cm9scy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc2VsZWN0YWJsZUNoaWxkLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2JlaGF2aW9ycy9zb3J0YWJsZUNoaWxkLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2JlaGF2aW9ycy9zb3J0YWJsZUxpc3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC92aWV3cy9sYXlvdXQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC92aWV3cy90ZW1wbGF0ZXMvYWJvdXQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9jb21wb25lbnRzL2hlYWRlci92aWV3cy9sYXlvdXQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9oZWFkZXIvdmlld3MvdGVtcGxhdGVzL2hlYWRlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29uZmlnL2NvcnMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29uZmlnL2luZGV4LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2NvbmZpZy9qd3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29uZmlnL21hcmlvbmV0dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29uZmlnL3dpbmRvdy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tYW5pZmVzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2tleS9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2tleS9mYWN0b3J5LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMva2V5L2tleXMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QvdGVtcGxhdGVzL2tleWJvYXJkX2Fic3RyYWN0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9mdWxsL3RlbXBsYXRlcy9rZXlib2FyZF9mdWxsLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQvdGVtcGxhdGVzL2tleWJvYXJkX251bXBhZC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3IvdGVtcGxhdGVzL2tleWJvYXJkX3NlbGVjdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21hY3JvL2VudGl0aWVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvZXhhbXBsZV8xLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvZXhhbXBsZV8yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvZXhhbXBsZV8zLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvZXhhbXBsZV80LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC9yb3V0ZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2RldmljZUxheW91dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvclNlbGVjdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvZWRpdG9yV3JhcHBlci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2tleVNlbGVjdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvbWFjcm9FZGl0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy9tYWNyb0xpc3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZGV2aWNlX2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZGV2aWNlX3N0YXR1cy5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZWRpdG9yX3NlbGVjdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfd3JhcHBlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvaGVscF92aWV3LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9rZXlfY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL21hY3JvX2VkaXRvci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZW1wdHkuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL3RleHRfZWRpdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RleHRFZGl0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2RhdGEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2VudGl0aWVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9mYWN0b3J5LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3JvdXRlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3ZpZXdzL2xheW91dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vaG9tZS92aWV3cy90ZW1wbGF0ZXMvbGF5b3V0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvdXNiL3NlcnZpY2UuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcmVzb2x2ZS9lbXB0eS5qcyIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9iaW5kQmFzZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvYmluZElucHV0cy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvZmxhc2hlcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9obl9iZWhhdmlvcnMvbGliL3N1Ym1pdEJ1dHRvbi5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvdG9vbHRpcHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9obl9lbnRpdGllcy9saWIvY29uZmlnLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fZW50aXRpZXMvbGliL2RlY29yYXRvci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9jb2xsZWN0aW9uLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9tb2RlbC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9zZXJ2aWNlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3ZpZXdzL2ZsYXNoTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi92aWV3cy90ZW1wbGF0ZXMvZmxhc2hfY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fbW9kYWwvbGliL2Fic3RyYWN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fbW9kYWwvbGliL21vZGFsX3RlbXBsYXRlLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX21vZGFsL2xpYi92aWV3LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fb3ZlcmxheS9saWIvY29tcG9uZW50LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9obl9yb3V0aW5nL2xpYi9yb3V0ZXIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0L2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVsbC9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Z1bmN0aW9uL2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfbWVkaWEvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9uYXYvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9zZWxlY3Rvci9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL3NpbXBsZV9uYXYvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDR0EsSUFBQSxXQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3dCQUVKLFdBQUEsR0FDRTtJQUFBLGNBQUEsRUFBZ0IsWUFBaEI7Ozt3QkFHRixVQUFBLEdBQVksU0FBQTtJQUdWLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFnQyxDQUFDLE9BQWpDLENBQXlDLE9BQXpDO0lBR0EsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQW9DLENBQUMsT0FBckMsQ0FBNkMsT0FBN0M7SUFDQSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxPQUExQztJQUNBLElBQUMsQ0FBQSxPQUFELENBQUE7QUFDQSxXQUFPO0VBVEc7O3dCQWNaLE9BQUEs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LENBQUE7RUFKYzs7OztHQXJCTSxFQUFFLENBQUM7O0FBNkIzQixNQUFNLENBQUMsT0FBUCxHQUFpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbiMgQXBwbGljYXRpb24gY2xhc3MgZGVmaW5pdGlvblxuIyBNYW5hZ2VzIGxpZmVjeWNsZSBhbmQgYm9vdHN0cmFwcyBhcHBsaWNhdGlvblxuY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb0V2ZW50czpcbiAgICAnYXBwIHJlZGlyZWN0JzogJ3JlZGlyZWN0VG8nXG5cbiAgIyBJbnZva2VkIGFmdGVyIGNvbnN0cnVjdG9yXG4gIGluaXRpYWxpemU6IC0+XG5cbiAgICAjIFN0YXJ0cyBIZWFkZXIgQ29tcG9uZW50XG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnaGVhZGVyJykudHJpZ2dlcigncmVzZXQnKVxuXG4gICAgIyBTdGFydHMgSGVuc29uLmpzIENvbXBvbmVudHNcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdicmVhZGNydW1iJykudHJpZ2dlcigncmVhZHknKVxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ292ZXJsYXknKS50cmlnZ2VyKCdyZWFkeScpXG4gICAgQG9uUmVhZHkoKVxuICAgIHJldHVybiB0cnVlXG5cbiAgIyBTdGFydHMgdGhlIGFwcGxpY2F0aW9uXG4gICMgU3RhcnRzIEJhY2tib25lLmhpc3RvcnkgKGVuYWJsZXMgcm91dGluZylcbiAgIyBBbmQgaW5pdGlhbGl6ZXMgc2lkZWJhciBtb2R1bGVcbiAgb25SZWFkeTogLT5cbiAgICBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KClcblxuICAjIFJlZGlyZWN0aW9uIGludGVyZmFjZVxuICAjIFVzZWQgYWNjcm9zcyB0aGUgYXBwbGljYXRpb24gdG8gcmVkaXJlY3RcbiAgIyB0byBzcGVjaWZpYyB2aWV3cyBhZnRlciBzcGVjaWZpYyBhY3Rpb25zXG4gIHJlZGlyZWN0VG86IChyb3V0ZSkgLT5cbiAgICB3aW5kb3cubG9jYXRpb24gPSByb3V0ZVxuICAgIHJldHVybiB0cnVlXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uXG4iLCJcbiMgQXBwbGljYXRpb25MYXlvdXQgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3IHRvIG1hbmFnZVxuIyB0b3AtbGV2ZWwgYXBwbGljYXRpb24gcmVnaW9uc1xuY2xhc3MgQXBwbGljYXRpb25MYXlvdXQgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgZWw6ICdib2R5J1xuXG4gIHRlbXBsYXRlOiBmYWxzZVxuXG4gIHJlZ2lvbnM6XG4gICAgaGVhZGVyOiAgICAgJ1thcHAtcmVnaW9uPWhlYWRlcl0nXG4gICAgb3ZlcmxheTogICAgJ1thcHAtcmVnaW9uPW92ZXJsYXldJ1xuICAgIGZsYXNoOiAgICAgICdbYXBwLXJlZ2lvbj1mbGFzaF0nXG4gICAgbW9kYWw6ICAgICAgJ1thcHAtcmVnaW9uPW1vZGFsXSdcbiAgICBtYWluOiAgICAgICAnW2FwcC1yZWdpb249bWFpbl0nXG5cbiMgIyAjICMgI1xuXG4jIEV4cG9ydHMgaW5zdGFuY2Vcbm1vZHVsZS5leHBvcnRzID0gbmV3IEFwcGxpY2F0aW9uTGF5b3V0KCkucmVuZGVyKClcbiIsIlxuIyBNYXJpb25ldHRlIEJlaGF2aW9yIE1hbmlmZXN0XG5tb2R1bGUuZXhwb3J0cyA9XG4gIFN1Ym1pdEJ1dHRvbjogICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvc3VibWl0QnV0dG9uJ1xuICBGbGFzaGVzOiAgICAgICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL2ZsYXNoZXMnXG4gIE1vZGVsRXZlbnRzOiAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMnXG4gIEJpbmRJbnB1dHM6ICAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvYmluZElucHV0cydcbiAgVG9vbHRpcHM6ICAgICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi90b29sdGlwcydcbiAgU2VsZWN0YWJsZUNoaWxkOiAgcmVxdWlyZSAnLi9zZWxlY3RhYmxlQ2hpbGQnXG4gIEtleWJvYXJkQ29udHJvbHM6ICByZXF1aXJlICcuL2tleWJvYXJkQ29udHJvbHMnXG4gIFNvcnRhYmxlQ2hpbGQ6ICAgIHJlcXVpcmUgJy4vc29ydGFibGVDaGlsZCdcbiAgU29ydGFibGVMaXN0OiAgICAgcmVxdWlyZSAnLi9zb3J0YWJsZUxpc3QnXG4iLCIjIE5PVEUgLSB0aGlzIGJlaGF2aW9yIGhhcyBub3QgYmVlbiB0ZXN0ZWQgd2l0aCBtdWx0aXBsZSB2aWV3cyBzaW11bHRhbmVvdXNseVxuXG4jIEVuYWJsZXMgdmlldyBjYWxsYmFja3MgdG8gYmUgdHJpZ2dlcmVkIGJ5IGtleWJvYXJkIGlucHV0XG5jbGFzcyBLZXlib2FyZENvbnRyb2xzIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGtleUV2ZW50cyA9IEBvcHRpb25zLmtleUV2ZW50c1xuXG4gIG9uUmVuZGVyOiAtPlxuICAgIEBhZGRFdmVudExpc3RlbmVyKClcblxuICBvbkJlZm9yZURlc3Ryb3k6IC0+XG4gICAgQHJlbW92ZUV2ZW50TGlzdGVuZXIoKVxuXG4gIGtleUFjdGlvbjogKGUpID0+XG5cbiAgICAjIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgIyBJc29sYXRlcyB0aGUga2V5c3Ryb2tlXG4gICAgIyBrZXlDb2RlID0gZS5rZXlDb2RlXG5cbiAgICByZXR1cm4gQHZpZXcudHJpZ2dlck1ldGhvZCgna2V5OmFjdGlvbicsIGUpXG5cbiAgICAjIERvIG5vdGhpbmcgaWYgdGhlcmUgaXNuJ3QgYW5cbiAgICAjIGV2ZW50IGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5c3Ryb2tlXG4gICAgIyByZXR1cm4gdW5sZXNzIEBrZXlFdmVudHNba2V5Q29kZV1cblxuICAgICMgUHJldmVudHMgYW55IGRlZmF1bHQgYWN0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5Y29kZVxuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgIyBUcmlnZ2VycyB0aGUgZXZlbnQgYXNzb2NpYXRlZCB3aXRoXG4gICAgIyB0aGUga2V5c3Ryb2tlIG9uIHRoZSB2aWV3IGluc3RhbmNlXG4gICAgIyByZXR1cm4gQHZpZXcudHJpZ2dlck1ldGhvZChAa2V5RXZlbnRzW2tleUNvZGVdKVxuXG4gIGFkZEV2ZW50TGlzdGVuZXI6IC0+XG4gICAgJChkb2N1bWVudCkub24gJ2tleWRvd24nLCBAa2V5QWN0aW9uXG4gICAgJChkb2N1bWVudCkub24gJ2tleXVwJywgQGtleUFjdGlvblxuICAgICMgJChkb2N1bWVudCkub24gJ2tleXByZXNzJywgQGtleUFjdGlvblxuICAgICMgUmFkaW8uY2hhbm5lbCgnZmxhc2gnKS50cmlnZ2VyKCdhZGQnLCB7IGNvbnRleHQ6ICdpbmZvJywgdGltZW91dDogMTUwMCwgbWVzc2FnZTogJ0tleWJvYXJkIGNvbnRyb2xzIGVuYWJsZWQnfSlcblxuICByZW1vdmVFdmVudExpc3RlbmVyOiAtPlxuICAgICQoZG9jdW1lbnQpLm9mZiAna2V5ZG93bicsIEBrZXlBY3Rpb25cbiAgICAkKGRvY3VtZW50KS5vZmYgJ2tleXVwJywgQGtleUFjdGlvblxuICAgICMgJChkb2N1bWVudCkub2ZmICdrZXlwcmVzcycsIEBrZXlBY3Rpb25cbiAgICAjIFJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykudHJpZ2dlcignYWRkJywgeyBjb250ZXh0OiAnaW5mbycsIHRpbWVvdXQ6IDE1MDAsIG1lc3NhZ2U6ICdLZXlib2FyZCBjb250cm9scyBkaXNhYmxlZCd9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZENvbnRyb2xzXG4iLCJcbmNsYXNzIFNlbGVjdGFibGVDaGlsZCBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICBjc3M6XG4gICAgYWN0aXZlOiAnYWN0aXZlJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2snOiAgJ29uQ2xpY2snXG5cbiAgbW9kZWxFdmVudHM6XG4gICAgJ3NlbGVjdGVkJzogJ29uQ2xpY2snXG5cbiAgIyBTZWxlY3RzIGFjdGl2ZU1vZGVsIG9uIHJlbmRlclxuICBvblJlbmRlcjogLT5cbiAgICByZXR1cm4gdW5sZXNzIEBvcHRpb25zLnNldEFjdGl2ZVxuXG4gICMgSW52b2tlZCB3aGVuIGNsaWNrZWRcbiAgb25DbGljazogKGUpIC0+XG4gICAgIyBCeXBhc3MgYmVoYXZpb3Igd2l0aCBjdXN0b20gb25DbGljayBjYWxsYmFja1xuICAgIHJldHVybiBAdmlldy5vbkNsaWNrKGUpIGlmIEB2aWV3Lm9uQ2xpY2tcblxuICAgICMgUHJldmVudCBkb3VibGUtY2xpY2sgdW5sZXNzIHNwZWNpZmljZWRcbiAgICBlPy5wcmV2ZW50RGVmYXVsdCgpIHVubGVzcyBAb3B0aW9ucy5kb3VibGVDbGlja1xuXG4gICAgIyBIYW5kbGVzIGRlLXNlbGVjdGlvblxuICAgIGlmIEBvcHRpb25zLmRlc2VsZWN0ICYmIEAkZWwuaGFzQ2xhc3MoQGNzcy5hY3RpdmUpXG4gICAgICBAJGVsLnJlbW92ZUNsYXNzKEBjc3MuYWN0aXZlKVxuICAgICAgcmV0dXJuIEB2aWV3LnRyaWdnZXJNZXRob2QgJ2Rlc2VsZWN0ZWQnXG5cbiAgICAjIFJldHVybiBpZiBlbGVtZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZFxuICAgIHJldHVybiBpZiBAJGVsLmhhc0NsYXNzKEBjc3MuYWN0aXZlKVxuXG4gICAgIyBQcmV2ZW50IGRlYWZ1bHQgYW5kIHRyaWdnZXIgc2VsZWN0ZWRcbiAgICBlPy5wcmV2ZW50RGVmYXVsdCgpXG4gICAgQHZpZXcudHJpZ2dlck1ldGhvZCAnc2VsZWN0ZWQnXG4gICAgQCRlbC5hZGRDbGFzcyhAY3NzLmFjdGl2ZSkuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhAY3NzLmFjdGl2ZSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0YWJsZUNoaWxkXG4iLCJcbiMgU29ydGFibGVDaGlsZCBCZWhhdmlvciBkZWZpbml0aW9uXG4jIFdvcmtzIHdpdGggU29ydGFibGVMaXN0IEJlaGF2aW9yXG5jbGFzcyBTb3J0YWJsZUNoaWxkIGV4dGVuZHMgTW4uQmVoYXZpb3JcblxuICBldmVudHM6XG4gICAgJ3NvcnRlZCc6ICdvblNvcnRlZCdcblxuICBvblNvcnRlZDogKGUsIG9yZGVyKSAtPlxuICAgIEB2aWV3Lm1vZGVsLnNldCgnb3JkZXInLCBvcmRlcilcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU29ydGFibGVDaGlsZFxuIiwiXG4jIFNvcnRhYmxlTGlzdCBCZWhhdmlvciBkZWZpbml0aW9uXG4jIFdvcmtzIHdpdGggU29ydGFibGVDaGlsZCBCZWhhdmlvclxuY2xhc3MgU29ydGFibGVMaXN0IGV4dGVuZHMgTW4uQmVoYXZpb3JcblxuICAjIERlZmluZXMgdGhlIHJlb3JkZXJDb2xsZWN0aW9uIG1ldGhvZCBvbiB0aGUgdmlld1xuICAjIHRvIHdoaWNoIHRoZSBiZWhhdmlvciBpcyBhc3NpZ25lZFxuICBpbml0aWFsaXplOiAtPlxuICAgIEB2aWV3LnJlb3JkZXJDb2xsZWN0aW9uID0gPT4gQHJlb3JkZXJDb2xsZWN0aW9uKClcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgSW5pdGlhbGl6ZXMgU29ydGFibGUgY29udGFpbmVyXG4gICAgU29ydGFibGUuY3JlYXRlIEB2aWV3LmVsLFxuICAgICAgaGFuZGxlOiAgICAgICBAb3B0aW9ucy5oYW5kbGUgfHwgJy5zb3J0YWJsZSdcbiAgICAgIGFuaW1hdGlvbjogICAgQG9wdGlvbnMuYW5pbWF0aW9uIHx8IDI1MFxuICAgICAgb25FbmQ6IChlKSA9PiBAcmVvcmRlckNvbGxlY3Rpb24oKVxuXG4gICMgcmVvcmRlckNvbGxlY3Rpb25cbiAgIyBJbnZva2VkIGFmdGVyIHNvcnRpbmcgaGFzIGNvbXBsZXRlZFxuICByZW9yZGVyQ29sbGVjdGlvbjogPT5cblxuICAgICMgVHJpZ2dlcnMgb3JkZXIgZXZlbnRzIG9uIENvbGxlY3Rpb25WaWV3IGNoaWxkVmlldyAkZWxzXG4gICAgb3JkZXIgPSAxXG4gICAgZm9yIGVsIGluIEB2aWV3LiRlbFswXS5jaGlsZHJlblxuICAgICAgJChlbCkudHJpZ2dlcignc29ydGVkJyxvcmRlcilcbiAgICAgIG9yZGVyKytcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU29ydGFibGVMaXN0XG4iLCJBYm91dFZpZXcgID0gcmVxdWlyZSAnLi92aWV3cy9sYXlvdXQnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBBYm91dENvbXBvbmVudCBleHRlbmRzIHJlcXVpcmUgJ2huX21vZGFsL2xpYi9hYnN0cmFjdCdcblxuICByYWRpb0V2ZW50czpcbiAgICAnYWJvdXQgc2hvdyc6ICdzaG93QWJvdXQnXG5cbiAgc2hvd0Fib3V0OiAtPlxuICAgIGFib3V0VmlldyA9IG5ldyBBYm91dFZpZXcoKVxuICAgIEBzaG93TW9kYWwoYWJvdXRWaWV3LCB7IHNpemU6ICdsYXJnZScgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQWJvdXRDb21wb25lbnRcbiIsIlxuIyBBYm91dFZpZXcgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgQWJvdXRWaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvYWJvdXQnXG4gIGNsYXNzTmFtZTogJ21vZGFsLWNvbnRlbnQnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFib3V0Vmlld1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgdGV4dC1jZW50ZXJcXFwiPjxoNSBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPkFCT1VUPC9oNT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgdGV4dC1jZW50ZXJcXFwiPjxoci8+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48cCBjbGFzcz1cXFwibGVhZFxcXCI+PGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL0FzdHJvS2V5XFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+IEFzdHJvS2V5PC9hPiBpcyBhbiBvcGVuLXNvdXJjZSBwbGF0Zm9ybSBmb3IgcmUtcHJvZ3JhbW1hYmxlIFVTQiBrZXlib2FyZHMuPC9wPjxwPkFzdHJvS2V5IHByb3ZpZGVzIGFuIGludHVpdGl2ZSBpbnRlcmZhY2UgYW55Ym9keSBjYW4gdXNlIHRvIGF1dG9tYXRlIGJhc2ljIGtleWJvYXJkIGFjdGlvbnMuPC9wPjxwPlNpbXBseSBkcmFnIGFuZCBkcm9wIGtleWJvYXJkIGtleXMgdG8gY29uc3RydWN0IHlvdXIgZGVzaXJlZCBzZXF1ZW5jZSAtIEFzdHJvS2V5IGRvZXMgdGhlIHJlc3QuPC9wPjxwPkl0J3MgdGhhdCBlYXN5LjwvcD48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgdGV4dC1jZW50ZXJcXFwiPjxoci8+PHA+QnVpbHQgYnkmbmJzcDs8YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vQWFyb25QZXJsXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+QWFyb24gUGVybDwvYT4mbmJzcDthbmQmbmJzcDs8YSBocmVmPVxcXCJodHRwOi8vYWVrcy5jb1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPkFsZXhhbmRlciBTY2h3YXJ0emJlcmc8L2E+Jm5ic3A7Zm9yJm5ic3A7PGEgaHJlZj1cXFwiaHR0cHM6Ly9yY29zLmlvL1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPlJDT1MuPC9hPjwvcD48L2Rpdj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiTGF5b3V0VmlldyA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jIEhlYWRlclNlcnZpY2UgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgYmFzaWMgc2VydmljZSBmb3IgbWFuYWdpbmcgYXBwbGljYXRpb25cbiMgaGVhZGVyIHN0YXRlLiBEaXNwbGF5cyB0aGUgYXV0aGVudGljYXRlZCB1c2VyLFxuIyBvciB0aGUgJ3VuYXV0aGVudGljYXRlZCcgbWVzc2FnZSBpZiBub25lIGlzIGRlZmluZWRcbmNsYXNzIEhlYWRlclNlcnZpY2UgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjb250YWluZXIgPSBAb3B0aW9ucy5jb250YWluZXJcblxuICByYWRpb0V2ZW50czpcbiAgICAnaGVhZGVyIHJlc2V0JzogJ3Jlc2V0J1xuXG4gIHJlc2V0OiAtPlxuICAgIEBjb250YWluZXIuc2hvdyBuZXcgTGF5b3V0VmlldygpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclNlcnZpY2VcbiIsIlxuIyBIZWFkZXJWaWV3IGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIHNpbWJwbGUgdmlldyBmb3IgZGlzcGxheWluZyB0aGVcbiMgaGVhZGVyIG9mIHRoZSBhcHBsaWNhdGlvbi4gVGhlIGhlYWRlciBkaXNwbGF5c1xuIyB0aGUgYXV0aGVudGljYXRlZCB1c2VyIGFuZFxuIyBtYW5hZ2VzIHRvZ2dsaW5nIHRoZSBTaWRlYmFyQ29tcG9uZW50J3Mgdmlld1xuY2xhc3MgSGVhZGVyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvaGVhZGVyJ1xuICBjbGFzc05hbWU6ICduYXZiYXIgZml4ZWQtdG9wIG5hdmJhci1kYXJrIGJnLWRhcmsnXG4gIHRhZ05hbWU6ICduYXYnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclZpZXdcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcIm5hdmJhci1icmFuZCB0aXRsZVxcXCI+QVNUUk9LRVk8L2Rpdj48dWwgY2xhc3M9XFxcIm5hdmJhci1uYXYgbWwtYXV0b1xcXCI+PGxpIGNsYXNzPVxcXCJuYXYtaXRlbVxcXCI+PGEgc3R5bGU9XFxcImN1cnNvcjpwb2ludGVyXFxcIiBvbkNsaWNrPVxcXCJSYWRpby5jaGFubmVsKCdhYm91dCcpLnRyaWdnZXIoJ3Nob3cnKTtcXFwiIGNsYXNzPVxcXCJuYXYtbGlua1xcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLWxnIGZhLXF1ZXN0aW9uLWNpcmNsZS1vXFxcIj48L2k+PC9hPjwvbGk+PC91bD5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiIyBTdXBwb3J0IGZvciBjcm9zcy1kb21haW4gcmVxdWVzdHMgaW4gQmFja2JvbmUuanMgLSB1c3VhbGx5IHZlcmJvdGVuLlxuIyBUaGlzIGFsbG93cyB0aGUgZGV2IHNlcnZlciBhdCBsb2NhbC5jb3J0aWNhbG1ldHJpY3MuY29tOjgwODAgdG8gY29tbXVuaWNhdGUgd2l0aCBkZXYuY29ydGljYWxtZXRyaWNzLmNvbTozMDAwIChjbS1ub2RlLWFwcClcblxuY3Jvc3NEb21haW5Sb290ID0gJ2h0dHA6Ly8xOTIuMTY4LjMzLjMzOjMwMDAnICMgREVWIE9OTFlcblxucHJveGllZFN5bmMgPSBCYWNrYm9uZS5zeW5jXG5cbkJhY2tib25lLnN5bmMgPSAobWV0aG9kLCBtb2RlbCwgb3B0aW9ucyA9IHt9KSA9PlxuXG4gIGlmICFvcHRpb25zLnVybFxuICAgIG9wdGlvbnMudXJsID0gY3Jvc3NEb21haW5Sb290ICsgXy5yZXN1bHQobW9kZWwsICd1cmwnKSB8fCB1cmxFcnJvcigpXG5cbiAgZWxzZSBpZiBvcHRpb25zLnVybC5zdWJzdHJpbmcoMCwgNikgIT0gY3Jvc3NEb21haW5Sb290LnN1YnN0cmluZygwLCA2KVxuICAgIG9wdGlvbnMudXJsID0gY3Jvc3NEb21haW5Sb290ICsgb3B0aW9ucy51cmxcblxuICBpZiAhb3B0aW9ucy5jcm9zc0RvbWFpblxuICAgIG9wdGlvbnMuY3Jvc3NEb21haW4gPSB0cnVlXG5cbiAgaWYgIW9wdGlvbnMueGhyRmllbGRzXG4gICAgb3B0aW9ucy54aHJGaWVsZHMgPSB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9XG5cbiAgcmV0dXJuIHByb3hpZWRTeW5jKG1ldGhvZCwgbW9kZWwsIG9wdGlvbnMpXG4iLCIjIEFwcCBjb25maWd1cmF0aW9uIG1hbmlmZXN0XG5yZXF1aXJlICcuL3dpbmRvdydcbnJlcXVpcmUgJy4vand0J1xucmVxdWlyZSAnLi9jb3JzJ1xucmVxdWlyZSAnLi9tYXJpb25ldHRlJ1xuIiwiIyBBamF4IEpXVCBTaGltXG4kLmFqYXhTZXR1cFxuICBiZWZvcmVTZW5kOiAoeGhyKSAtPlxuICAgIHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJylcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsICdKV1QgJyArIHRva2VuKSBpZiB0b2tlblxuICAgIHJldHVyblxuIiwiIyBNYXJpb25ldHRlLkJlaGF2aW9ycyBjb25maWd1cmF0aW9uXG5NYXJpb25ldHRlLkJlaGF2aW9ycy5iZWhhdmlvcnNMb29rdXAgPSAtPiByZXF1aXJlICcuLi9iZWhhdmlvcnMnXG4iLCIjIEFsaWFzZXMgQmFja2JvbmUuUmFkaW8gdG8gd2luZG93LlJhZGlvXG53aW5kb3cuUmFkaW8gPSBCYWNrYm9uZS5SYWRpb1xuIiwiIyBUaGlzIGZpbGUgZGVmaW5lcyBhIG1hbmlmZXN0IGZvciB0aGUgY2xpZW50IGFwcGxpY2F0aW9uLlxuIyBUaGlzIGluY2x1ZGVzIGNvbmZpZ3VyYXRpb24sIFNlcnZpY2VzLCBDb21wb25lbnRzLCBNb2R1bGVzXG4jIGFuZCB0aGUgQXBwbGljYXRpb24gc2luZ2xldG9uIGluc3RhbmNlLlxuXG4jICMgIyAjICNcblxuIyBBcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uIG1hbmlmZXN0XG5yZXF1aXJlICcuL2NvbmZpZydcblxuIyBBcHBsaWNhdGlvbiBjbGFzcyBkZWZpbml0aW9uICYgQXBwIExheW91dFxuQXBwICAgICAgID0gcmVxdWlyZSAnLi9hcHAnXG5BcHBMYXlvdXQgPSByZXF1aXJlICcuL2FwcGxpY2F0aW9uL3ZpZXdzL2xheW91dCdcblxuIyBIZW5zb24gRW50aXRpZXNcbnJlcXVpcmUgJ2huX2VudGl0aWVzL2xpYi9jb25maWcnXG5cbiMgIyAjICMgI1xuXG4jIENvbXBvbmVudHMgYXJlIHJvdXRlbGVzcyBzZXJ2aWNlcyB3aXRoIHZpZXdzIHRoYXQgYXJlXG4jIGFjY2Vzc2libGUgYW55d2hlcmUgaW4gdGhlIGFwcGxpY2F0aW9uXG4jIFVzZWQgdG8gbWFuYWdlIHRoZSBoZWFkZXIsIHNpZGViYXIsIGZsYXNoLCBhbmQgY29uZmlybSBVSSBlbGVtZW50c1xuXG4jIEhlbnNvbi5qcyBDb21wb25lbnRzXG5IZWFkZXJDb21wb25lbnQgICAgID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL2hlYWRlci9jb21wb25lbnQnXG5BYm91dENvbXBvbmVudCAgICAgID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL2Fib3V0L2NvbXBvbmVudCdcbk92ZXJsYXlDb21wb25lbnQgICAgPSByZXF1aXJlICdobl9vdmVybGF5L2xpYi9jb21wb25lbnQnXG5GbGFzaENvbXBvbmVudCAgICAgID0gcmVxdWlyZSAnaG5fZmxhc2gvbGliL2NvbXBvbmVudCdcbm5ldyBIZWFkZXJDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5oZWFkZXIgfSlcbm5ldyBPdmVybGF5Q29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQub3ZlcmxheSB9KVxubmV3IEZsYXNoQ29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQuZmxhc2ggfSlcbm5ldyBBYm91dENvbXBvbmVudCh7IGNvbnRhaW5lcjogQXBwTGF5b3V0Lm1vZGFsIH0pXG5cbiMgIyAjICMgI1xuXG4jIFNlcnZpY2VzXG5yZXF1aXJlKCcuL21vZHVsZXMvdXNiL3NlcnZpY2UnKVxuXG4jIEZhY3Rvcmllc1xucmVxdWlyZSgnLi9tb2R1bGVzL2tleS9mYWN0b3J5JylcblxuIyAjICMgIyAjXG5cbiMgTW9kdWxlc1xuIyBNb2R1bGVzIHJlcHJlc2VudCBjb2xsZWN0aW9ucyBvZiBlbmRwb2ludHMgaW4gdGhlIGFwcGxpY2F0aW9uLlxuIyBUaGV5IGhhdmUgcm91dGVzIGFuZCBlbnRpdGllcyAobW9kZWxzIGFuZCBjb2xsZWN0aW9ucylcbiMgRWFjaCByb3V0ZSByZXByZXNlbnRzIGFuIGVuZHBvaW50LCBvciAncGFnZScgaW4gdGhlIGFwcC5cbk1haW5Nb2R1bGUgPSByZXF1aXJlICcuL21vZHVsZXMvbWFpbi9yb3V0ZXInXG5uZXcgTWFpbk1vZHVsZSh7IGNvbnRhaW5lcjogQXBwTGF5b3V0Lm1haW4gfSlcblxuIyAjICMgIyAjICNcblxuIyBQYWdlIGhhcyBsb2FkZWQsIGRvY3VtZW50IGlzIHJlYWR5XG4kKGRvY3VtZW50KS5vbiAncmVhZHknLCA9PiBuZXcgQXBwKCkgIyBJbnN0YW50aWF0ZXMgbmV3IEFwcFxuIiwiXG4jIEtleU1vZGVsIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEtleU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6IHt9XG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogS2V5TW9kZWxcbiAgY29tcGFyYXRvcjogJ29yZGVyJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPVxuICBNb2RlbDogICAgICBLZXlNb2RlbFxuICBDb2xsZWN0aW9uOiBLZXlDb2xsZWN0aW9uXG4iLCJFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKVxuS2V5RGF0YSA9IHJlcXVpcmUoJy4va2V5cycpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlGYWN0b3J5IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAna2V5IG1vZGVsJzogICAgICAgJ2dldE1vZGVsJ1xuICAgICdrZXkgY29sbGVjdGlvbic6ICAnZ2V0Q29sbGVjdGlvbidcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjYWNoZWRDb2xsZWN0aW9uID0gbmV3IEVudGl0aWVzLkNvbGxlY3Rpb24oS2V5RGF0YSwgeyBwYXJzZTogdHJ1ZSB9KVxuXG4gIGdldE1vZGVsOiAoaWQpIC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uLmdldChpZClcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBAY2FjaGVkQ29sbGVjdGlvblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgS2V5RmFjdG9yeSgpXG4iLCJcbiMgS2V5IEpTT04gZGVmaW5pdGlvbnNcbm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHsgcm93OiAncjQnLCBrZXk6ICdgJywgc2hpZnQ6ICd+Jywga2V5Y29kZTogMTkyIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMScsIHNoaWZ0OiAnIScsIGtleWNvZGU6IDQ5IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMicsIHNoaWZ0OiAnQCcsIGtleWNvZGU6IDUwIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMycsIHNoaWZ0OiAnIycsIGtleWNvZGU6IDUxIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNCcsIHNoaWZ0OiAnJCcsIGtleWNvZGU6IDUyIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNScsIHNoaWZ0OiAnJScsIGtleWNvZGU6IDUzIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNicsIHNoaWZ0OiAnXicsIGtleWNvZGU6IDU0IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNycsIHNoaWZ0OiAnJicsIGtleWNvZGU6IDU1IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnOCcsIHNoaWZ0OiAnKicsIGtleWNvZGU6IDU2IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnOScsIHNoaWZ0OiAnKCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMCcsIHNoaWZ0OiAnKScsIGtleWNvZGU6IDQ4IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnLScsIHNoaWZ0OiAnXycsIGtleWNvZGU6IDE4OSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJz0nLCBzaGlmdDogJysnLCBrZXljb2RlOiAxODcgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICdCQUNLU1BBQ0UnLCBrZXljb2RlOiA4LCBjc3M6ICd3Ml8wJyB9XG5cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnVEFCJywga2V5Y29kZTogOSwgY3NzOiAndzFfNScsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdRJywga2V5Y29kZTogODEgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdXJywga2V5Y29kZTogODcgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdFJywga2V5Y29kZTogNjkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdSJywga2V5Y29kZTogODIgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdUJywga2V5Y29kZTogODQgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdZJywga2V5Y29kZTogODkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdVJywga2V5Y29kZTogODUgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdJJywga2V5Y29kZTogNzMgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdPJywga2V5Y29kZTogNzkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdQJywga2V5Y29kZTogODAgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdbJywgc2hpZnQ6ICd7Jywga2V5Y29kZTogMjE5IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnXScsIHNoaWZ0OiAnfScsIGtleWNvZGU6IDIyMSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ1xcXFwnLCBzaGlmdDogJ3wnLCBrZXljb2RlOiAyMjAsIGNzczogJ3cxXzUnIH1cblxuICAgIHsgcm93OiAncjInLCBrZXk6ICdDQVBTJywgY3NzOiAndzFfNzUnLCBrZXljb2RlOiAyMCwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0EnLCBrZXljb2RlOiA2NSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ1MnLCBrZXljb2RlOiA4MyB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0QnLCBrZXljb2RlOiA2OCB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0YnLCBrZXljb2RlOiA3MCB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0cnLCBrZXljb2RlOiA3MSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0gnLCBrZXljb2RlOiA3MiB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0onLCBrZXljb2RlOiA3NCB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0snLCBrZXljb2RlOiA3NSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0wnLCBrZXljb2RlOiA3NiB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJzsnLCBzaGlmdDogJzonLCBrZXljb2RlOiAxODYgfVxuICAgIHsgcm93OiAncjInLCBrZXk6IFwiJ1wiLCBzaGlmdDogJ1wiJywga2V5Y29kZTogMjIyIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnUkVUVVJOJywgY3NzOiAndzJfMjUnLCBrZXljb2RlOiAxMywgc3BlY2lhbDogdHJ1ZSB9XG5cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnU0hJRlQnLCBjc3M6ICd3Ml8yNScsIGtleWNvZGU6IDE2LCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnWicsIGtleWNvZGU6IDkwIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnWCcsIGtleWNvZGU6IDg4IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnQycsIGtleWNvZGU6IDY3IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnVicsIGtleWNvZGU6IDg2IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnQicsIGtleWNvZGU6IDY2IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnTicsIGtleWNvZGU6IDc4IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnTScsIGtleWNvZGU6IDc3IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnLCcsIHNoaWZ0OiAnPCcsIGtleWNvZGU6IDE4OCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJy4nLCBzaGlmdDogJz4nLCBrZXljb2RlOiAxOTAgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICcvJywgc2hpZnQ6ICc/Jywga2V5Y29kZTogMTkxIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnU0hJRlQnLCBjc3M6ICd3Ml83NScsIGtleWNvZGU6IDE2LCBzcGVjaWFsOiB0cnVlIH1cblxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdDVFJMJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxNywgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ00nLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDkxLCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnQUxUJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxOCwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ1NQQUNFJywgY3NzOiAnc3BhY2UnLCBrZXljb2RlOiAzMiwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0NUUkwnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE3LCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnTScsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTgsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdQJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiA5Mywgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0FMVCcsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTgsIHNwZWNpYWw6IHRydWUgfVxuXG4gICAgIyBOVU1QQUQgS0VZU1xuICAgIHsgcm93OiAnbnVtX3IwJywga2V5OiAnMCcsIGtleWNvZGU6IDQ5LCBjc3M6ICd3Ml8yNScgfVxuICAgIHsgcm93OiAnbnVtX3IwJywga2V5OiAnLicsIGtleWNvZGU6IDQ5IH1cblxuICAgIHsgcm93OiAnbnVtX3IxJywga2V5OiAnMScsIGtleWNvZGU6IDQ5IH1cbiAgICB7IHJvdzogJ251bV9yMScsIGtleTogJzInLCBrZXljb2RlOiA1MCB9XG4gICAgeyByb3c6ICdudW1fcjEnLCBrZXk6ICczJywga2V5Y29kZTogNTEgfVxuXG4gICAgeyByb3c6ICdudW1fcjInLCBrZXk6ICc0Jywga2V5Y29kZTogNTIgfVxuICAgIHsgcm93OiAnbnVtX3IyJywga2V5OiAnNScsIGtleWNvZGU6IDUzIH1cbiAgICB7IHJvdzogJ251bV9yMicsIGtleTogJzYnLCBrZXljb2RlOiA1NCB9XG5cbiAgICB7IHJvdzogJ251bV9yMycsIGtleTogJzcnLCBrZXljb2RlOiA1NSB9XG4gICAgeyByb3c6ICdudW1fcjMnLCBrZXk6ICc4Jywga2V5Y29kZTogNTYgfVxuICAgIHsgcm93OiAnbnVtX3IzJywga2V5OiAnOScsIGtleWNvZGU6IDU3IH1cblxuICAgIHsgcm93OiAnbnVtX3I0Jywga2V5OiAnQ0xFQVInLCBrZXljb2RlOiA0OCB9XG4gICAgeyByb3c6ICdudW1fcjQnLCBrZXk6ICcvJywga2V5Y29kZTogMTg5IH1cbiAgICB7IHJvdzogJ251bV9yNCcsIGtleTogJyonLCBrZXljb2RlOiAxODcgfVxuXG4gICAgeyByb3c6ICdudW1fY29sJywga2V5OiAnLScsIGtleWNvZGU6IDQ4IH1cbiAgICB7IHJvdzogJ251bV9jb2wnLCBrZXk6ICcrJywga2V5Y29kZTogMTg5LCBjc3M6ICdoMl8wJyB9XG4gICAgeyByb3c6ICdudW1fY29sJywga2V5OiAnRU5URVInLCBrZXljb2RlOiAxODcsIGNzczogJ2gyXzAnIH1cblxuICAgICMgRnVuY3Rpb24gS2V5c1xuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxJywga2V5Y29kZTogNDkgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YyJywga2V5Y29kZTogNTAgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YzJywga2V5Y29kZTogNTEgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y0Jywga2V5Y29kZTogNTIgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y1Jywga2V5Y29kZTogNTMgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y2Jywga2V5Y29kZTogNTQgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y3Jywga2V5Y29kZTogNTUgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y4Jywga2V5Y29kZTogNTYgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y5Jywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxMCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTEnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEyJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3IH1cblxuICAgICMgTWVkaWEgS2V5c1xuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXN0ZXAtYmFja3dhcmQnIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS1wbGF5JyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtc3RlcC1mb3J3YXJkJyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtdm9sdW1lLW9mZicgfVxuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXZvbHVtZS1kb3duJyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtdm9sdW1lLXVwJyB9XG5cbiAgICAjIE5hdmlnYXRpb24gS2V5c1xuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnUEdVUCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ1BHRE4nLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdFTkQnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdIT01FJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnTEVGVC1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi1sZWZ0JyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdVUC1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi11cCcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnRE9XTi1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi1kb3duJyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdSSUdIVC1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi1yaWdodCcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnSU5TJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnREVMJywga2V5Y29kZTogNDYgfVxuXG5dXG5cbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHIwKSB7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbigpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tcm93IHctMTAwXFxcIj5cIik7XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7XG59O1xuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxidXR0b25cIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleWNvZGVcIiwgb3B0cy5rZXljb2RlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1jbGljaz1cXFwia2V5XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEta2V5XCIsIG9wdHMua2V5LCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnYnRuJywnYnRuLW91dGxpbmUtbGlnaHQnLCdrZXlib2FyZC0ta2V5JyxvcHRzLmNzc10sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxvcHRzLmljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBvcHRzLmtleSAmJiBvcHRzLnNoaWZ0KVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJzaGlmdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLnNoaWZ0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxufVxuYnVmLnB1c2goXCI8L2J1dHRvbj5cIik7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tYm9keVxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJyMFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjA6dHlwZW9mIHIwIT09XCJ1bmRlZmluZWRcIj9yMDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChyMCwgcjEsIHIyLCByMywgcjQpIHtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKCl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImtleWJvYXJkLS1yb3cgdy0xMDBcXFwiPlwiKTtcbmJsb2NrICYmIGJsb2NrKCk7XG5idWYucHVzaChcIjwvZGl2PlwiKTtcbn07XG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGJ1dHRvblwiICsgKGphZGUuYXR0cihcImRhdGEta2V5Y29kZVwiLCBvcHRzLmtleWNvZGUsIHRydWUsIGZhbHNlKSkgKyBcIiBkYXRhLWNsaWNrPVxcXCJrZXlcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXlcIiwgb3B0cy5rZXksIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydidG4nLCdidG4tb3V0bGluZS1saWdodCcsJ2tleWJvYXJkLS1rZXknLG9wdHMuY3NzXSwgW251bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIG9wdHMuaWNvbilcbntcbmJ1Zi5wdXNoKFwiPGlcIiArIChqYWRlLmNscyhbJ2ZhJywnZmEtZncnLG9wdHMuaWNvbl0sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT5cIik7XG59XG5lbHNlXG57XG5pZiAoIG9wdHMua2V5ICYmIG9wdHMuc2hpZnQpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInNoaWZ0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG59XG5idWYucHVzaChcIjwvYnV0dG9uPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImtleWJvYXJkLS1ib2R5XFxcIj5cIik7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHI0XG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHI0O1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIyXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIyO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIxXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIxO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIwXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIwO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5idWYucHVzaChcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcInIwXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMDp0eXBlb2YgcjAhPT1cInVuZGVmaW5lZFwiP3IwOnVuZGVmaW5lZCxcInIxXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMTp0eXBlb2YgcjEhPT1cInVuZGVmaW5lZFwiP3IxOnVuZGVmaW5lZCxcInIyXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMjp0eXBlb2YgcjIhPT1cInVuZGVmaW5lZFwiP3IyOnVuZGVmaW5lZCxcInIzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMzp0eXBlb2YgcjMhPT1cInVuZGVmaW5lZFwiP3IzOnVuZGVmaW5lZCxcInI0XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yNDp0eXBlb2YgcjQhPT1cInVuZGVmaW5lZFwiP3I0OnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGNvbCwgcjAsIHIxLCByMiwgcjMsIHI0LCB1bmRlZmluZWQpIHtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKCl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImtleWJvYXJkLS1yb3cgdy0xMDBcXFwiPlwiKTtcbmJsb2NrICYmIGJsb2NrKCk7XG5idWYucHVzaChcIjwvZGl2PlwiKTtcbn07XG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGJ1dHRvblwiICsgKGphZGUuYXR0cihcImRhdGEta2V5Y29kZVwiLCBvcHRzLmtleWNvZGUsIHRydWUsIGZhbHNlKSkgKyBcIiBkYXRhLWNsaWNrPVxcXCJrZXlcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXlcIiwgb3B0cy5rZXksIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydidG4nLCdidG4tb3V0bGluZS1saWdodCcsJ2tleWJvYXJkLS1rZXknLG9wdHMuY3NzXSwgW251bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIG9wdHMuaWNvbilcbntcbmJ1Zi5wdXNoKFwiPGlcIiArIChqYWRlLmNscyhbJ2ZhJywnZmEtZncnLG9wdHMuaWNvbl0sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT5cIik7XG59XG5lbHNlXG57XG5pZiAoIG9wdHMua2V5ICYmIG9wdHMuc2hpZnQpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInNoaWZ0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG59XG5idWYucHVzaChcIjwvYnV0dG9uPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImtleWJvYXJkLS1ib2R5XFxcIj48ZGl2IGNsYXNzPVxcXCJkLWZsZXggZmxleC1yb3dcXFwiPjxkaXYgY2xhc3M9XFxcImQtZmxleCBmbGV4LWNvbHVtblxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByNFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByNDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByM1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMlxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMjtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuYnVmLnB1c2goXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJkLWZsZXggZmxleC1jb2x1bW5cXFwiPlwiKTtcbi8vIGl0ZXJhdGUgY29sXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGNvbDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiY29sXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jb2w6dHlwZW9mIGNvbCE9PVwidW5kZWZpbmVkXCI/Y29sOnVuZGVmaW5lZCxcInIwXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMDp0eXBlb2YgcjAhPT1cInVuZGVmaW5lZFwiP3IwOnVuZGVmaW5lZCxcInIxXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMTp0eXBlb2YgcjEhPT1cInVuZGVmaW5lZFwiP3IxOnVuZGVmaW5lZCxcInIyXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMjp0eXBlb2YgcjIhPT1cInVuZGVmaW5lZFwiP3IyOnVuZGVmaW5lZCxcInIzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMzp0eXBlb2YgcjMhPT1cInVuZGVmaW5lZFwiP3IzOnVuZGVmaW5lZCxcInI0XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yNDp0eXBlb2YgcjQhPT1cInVuZGVmaW5lZFwiP3I0OnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChuYXZJdGVtcywgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy04IGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj5cIik7XG4vLyBpdGVyYXRlIG5hdkl0ZW1zXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IG5hdkl0ZW1zO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBzdHlsZT1cXFwiZmxleC1ncm93OjE7XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEtdHJpZ2dlclwiLCBuYXZJdGVtLnRyaWdnZXIsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwiZC1mbGV4IGJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkgYnRuLXNtIGp1c3RpZnktY29udGVudC1jZW50ZXIgbXgtM1xcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBuYXZJdGVtLnRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYnV0dG9uPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIG5hdkl0ZW0udHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBidG4tc20ganVzdGlmeS1jb250ZW50LWNlbnRlciBteC0zXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48aHIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiY29udGVudFxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibmF2SXRlbXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm5hdkl0ZW1zOnR5cGVvZiBuYXZJdGVtcyE9PVwidW5kZWZpbmVkXCI/bmF2SXRlbXM6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIk1hY3JvRXhhbXBsZXMgPSByZXF1aXJlKCcuL2V4YW1wbGVzJylcblxuIyAjICMgIyAjXG5cbiMgTWFjcm9Nb2RlbCBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBNYWNyb01vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6XG4gICAgb3JkZXI6IDBcbiAgICBwb3NpdGlvbjogMFxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9Db2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogTWFjcm9Nb2RlbFxuICBjb21wYXJhdG9yOiAnb3JkZXInXG5cbiAgIyBsb2FkRXhhbXBsZVxuICAjIFJlc2V0cyB0aGUgY29sbGVjdGlvbiB0byBvbmUgb2YgdGhlIGV4YW1wbGVzXG4gIGxvYWRFeGFtcGxlOiAoZXhhbXBsZV9pZCkgLT5cblxuICAgICMgUmVzZXRzIHRoZSBjb2xsZWN0aW9uIHdpdGggdGhlIGRhdGEgZGVmaW5lZCBpbiB0aGUgRXhhbXBsZXMgb2JqZWN0XG4gICAgQHJlc2V0KE1hY3JvRXhhbXBsZXNbZXhhbXBsZV9pZF0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1vZGVsOiAgICAgIE1hY3JvTW9kZWxcbiAgQ29sbGVjdGlvbjogTWFjcm9Db2xsZWN0aW9uXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiSFwiLFxuICAgIFwia2V5Y29kZVwiOiA3MixcbiAgICBcIm9yZGVyXCI6IDIsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDNcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDQsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkxcIixcbiAgICBcImtleWNvZGVcIjogNzYsXG4gICAgXCJvcmRlclwiOiA1LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJMXCIsXG4gICAgXCJrZXljb2RlXCI6IDc2LFxuICAgIFwib3JkZXJcIjogNixcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiT1wiLFxuICAgIFwia2V5Y29kZVwiOiA3OSxcbiAgICBcIm9yZGVyXCI6IDcsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiA4XG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIjFcIixcbiAgICBcInNoaWZ0XCI6IFwiIVwiLFxuICAgIFwia2V5Y29kZVwiOiA0OSxcbiAgICBcIm9yZGVyXCI6IDksXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDEwXG4gIH1cbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJrZXlcIjogXCJSXCIsXG4gICAgXCJrZXljb2RlXCI6IDgyLFxuICAgIFwib3JkZXJcIjogMSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDIsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNcIixcbiAgICBcImtleWNvZGVcIjogODMsXG4gICAgXCJvcmRlclwiOiAzLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJVXCIsXG4gICAgXCJrZXljb2RlXCI6IDg1LFxuICAgIFwib3JkZXJcIjogNCxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiTVwiLFxuICAgIFwia2V5Y29kZVwiOiA3NyxcbiAgICBcIm9yZGVyXCI6IDUsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkFMVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxOCxcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogNlxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJgXCIsXG4gICAgXCJzaGlmdFwiOiBcIn5cIixcbiAgICBcImtleWNvZGVcIjogMTkyLFxuICAgIFwib3JkZXJcIjogNyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDhcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDksXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH1cbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDJcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiLVwiLFxuICAgIFwic2hpZnRcIjogXCJfXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4OSxcbiAgICBcIm9yZGVyXCI6IDMsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDRcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDVcbiAgfVxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBcImtleVwiOiBcIkNUUkxcIixcbiAgICBcImtleWNvZGVcIjogMTcsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiAyXG4gIH0sXG4gIHtcbiAgICBcInJvd1wiOiBcIm5hdl9yMFwiLFxuICAgIFwia2V5XCI6IFwiREVMXCIsXG4gICAgXCJrZXljb2RlXCI6IDQ2LFxuICAgIFwib3JkZXJcIjogMyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDRcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQ1RSTFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNyxcbiAgICBcInBvc2l0aW9uXCI6IDEsXG4gICAgXCJvcmRlclwiOiA1XG4gIH1cbl1cbiIsIlxuIyBFeHBvcnRzIGFuIG9iamVjdCBkZWZpbmluZyB0aGUgZXhhbXBsZSBtYWNyb3Ncbm1vZHVsZS5leHBvcnRzID0ge1xuICBleF8wMTogcmVxdWlyZSgnLi9leGFtcGxlXzEnKVxuICBleF8wMjogcmVxdWlyZSgnLi9leGFtcGxlXzInKVxuICBleF8wMzogcmVxdWlyZSgnLi9leGFtcGxlXzMnKVxuICBleF8wNDogcmVxdWlyZSgnLi9leGFtcGxlXzQnKVxufVxuIiwiTGF5b3V0VmlldyAgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyAjICMgIyAjXG5cbmNsYXNzIERhc2hib2FyZFJvdXRlIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGUnXG5cbiAgdGl0bGU6ICdBc3Ryb0tleSBXZWInXG5cbiAgYnJlYWRjcnVtYnM6IFt7IHRleHQ6ICdEZXZpY2UnIH1dXG5cbiAgZmV0Y2g6IC0+XG4gICAgQGRldmljZSA9IFJhZGlvLmNoYW5uZWwoJ2RldmljZScpLnJlcXVlc3QoJ21vZGVsJywgJ2RldmljZV8xJylcblxuICByZW5kZXI6IC0+XG4gICAgQGNvbnRhaW5lci5zaG93IG5ldyBMYXlvdXRWaWV3KHsgbW9kZWw6IEBkZXZpY2UgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRGFzaGJvYXJkUm91dGVcbiIsIktleVNlbGVjdG9yID0gcmVxdWlyZSgnLi9rZXlTZWxlY3RvcicpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VTdGF0dXNWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9kZXZpY2Vfc3RhdHVzJ1xuICBjbGFzc05hbWU6ICdyb3cnXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuXG4gICAgc3RhdHVzID0ge1xuICAgICAgdGV4dDogJ05vdCBDb25uZWN0ZWQnXG4gICAgICBjc3M6ICAnYmFkZ2UtZGVmYXVsdCdcbiAgICB9XG5cbiAgICAjIENvbm5lY3RlZFxuICAgIGlmIEBtb2RlbC5nZXQoJ3N0YXR1c19jb2RlJykgPT0gMVxuXG4gICAgICBzdGF0dXMgPSB7XG4gICAgICAgIHRleHQ6ICdDb25uZWN0ZWQnXG4gICAgICAgIGNzczogJ2JhZGdlLXN1Y2Nlc3MnXG4gICAgICB9XG5cbiAgICByZXR1cm4geyBzdGF0dXM6IHN0YXR1cyB9XG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VMYXlvdXQgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdydcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2RldmljZV9sYXlvdXQnKVxuXG4gIHJlZ2lvbnM6XG4gICAgIyBzdGF0dXNSZWdpb246ICdbZGF0YS1yZWdpb249c3RhdHVzXSdcbiAgICBrZXlzUmVnaW9uOiAgICdbZGF0YS1yZWdpb249a2V5c10nXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEluc3RhbnRpYXRlcyBuZXcgS2V5U2VsZWN0b3IgVmlld1xuICAgIGtleVNlbGVjdG9yID0gbmV3IEtleVNlbGVjdG9yKHsgY29sbGVjdGlvbjogQG1vZGVsLmdldCgna2V5cycpIH0pXG4gICAga2V5U2VsZWN0b3Iub24gJ2NoaWxkdmlldzpzZWxlY3RlZCcsICh2aWV3KSA9PiBAdHJpZ2dlcigna2V5OnNlbGVjdGVkJywgdmlldy5tb2RlbClcbiAgICBrZXlTZWxlY3Rvci5vbiAnY2hpbGR2aWV3OmRlc2VsZWN0ZWQnLCAodmlldykgPT4gQHRyaWdnZXIoJ2tleTpkZXNlbGVjdGVkJylcbiAgICBAa2V5c1JlZ2lvbi5zaG93KGtleVNlbGVjdG9yKVxuXG4gICAgIyBTdGF0dXMgVmlld1xuICAgICMgVE9ETyAtIHN0YXR1cyAmIGNvbm5lY3Rpb24gdmlld1xuICAgICMgQHN0YXR1c1JlZ2lvbi5zaG93IG5ldyBEZXZpY2VTdGF0dXNWaWV3KHsgbW9kZWw6IEBtb2RlbCB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBEZXZpY2VMYXlvdXRcblxuXG4iLCJTaW1wbGVOYXYgPSByZXF1aXJlICdsaWIvdmlld3Mvc2ltcGxlX25hdidcblxuIyAjICMgIyAjXG5cbmNsYXNzIEVkaXRvclNlbGVjdG9yIGV4dGVuZHMgU2ltcGxlTmF2XG4gIGNsYXNzTmFtZTogJ3JvdyBoLTEwMCdcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2VkaXRvcl9zZWxlY3RvcicpXG5cbiAgbmF2SXRlbXM6IFtcbiAgICB7IGljb246ICdmYS1rZXlib2FyZC1vJywgIHRleHQ6ICdNYWNybycsICB0cmlnZ2VyOiAnbWFjcm8nIH1cbiAgICB7IGljb246ICdmYS1maWxlLXRleHQtbycsIHRleHQ6ICdUZXh0JywgICB0cmlnZ2VyOiAndGV4dCcgfVxuICAgICMgeyBpY29uOiAnZmEtYXN0ZXJpc2snLCAgICB0ZXh0OiAnS2V5JywgICAgdHJpZ2dlcjogJ2tleScgfVxuICBdXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgY29uZmlnTW9kZWwgPSBAbW9kZWwuZ2V0KCdjb25maWcnKVxuICAgIHRyaWdnZXIgPSBjb25maWdNb2RlbC5nZXQoJ3R5cGUnKVxuICAgIHJldHVybiBAJChcIltkYXRhLXRyaWdnZXI9I3t0cmlnZ2VyfV1cIikuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgb25OYXZpZ2F0ZU1hY3JvOiAtPlxuICAgIEB0cmlnZ2VyICdzaG93Om1hY3JvOmVkaXRvcidcblxuICBvbk5hdmlnYXRlVGV4dDogLT5cbiAgICBAdHJpZ2dlciAnc2hvdzp0ZXh0OmVkaXRvcidcblxuICBvbk5hdmlnYXRlS2V5OiAtPlxuICAgIEB0cmlnZ2VyICdzaG93OmtleTplZGl0b3InXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvclNlbGVjdG9yXG4iLCJUZXh0RWRpdG9yID0gcmVxdWlyZSgnLi90ZXh0RWRpdG9yJylcbk1hY3JvRWRpdG9yID0gcmVxdWlyZSgnLi9tYWNyb0VkaXRvcicpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBFZGl0b3JXcmFwcGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9lZGl0b3Jfd3JhcHBlcidcbiAgY2xhc3NOYW1lOiAncm93J1xuXG4gIHJlZ2lvbnM6XG4gICAgY29udGVudFJlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1jb250ZW50XSdcblxuICB1aTpcbiAgICByZWNvcmRCdG46ICdbZGF0YS1jbGljaz1yZWNvcmRdJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgW2RhdGEtY2xpY2s9c2F2ZV0nOiAgICAnb25TYXZlJ1xuICAgICdjbGljayBbZGF0YS1jbGljaz1jbGVhcl0nOiAgICdvbkNsZWFyJ1xuICAgICdjbGljayBbZGF0YS1jbGljaz1jYW5jZWxdJzogICdvbkNhbmNlbCdcbiAgICAnY2xpY2sgW2RhdGEtZXhhbXBsZV0nOiAgICAgICAnbG9hZEV4YW1wbGUnXG4gICAgJ2NsaWNrIEB1aS5yZWNvcmRCdG4nOiAgICAgICAgJ3RvZ2dsZVJlY29yZCdcblxuICBlZGl0b3JzOlxuICAgIG1hY3JvOiAgTWFjcm9FZGl0b3JcbiAgICB0ZXh0OiAgIFRleHRFZGl0b3JcbiAgICBrZXk6ICAgIE1hY3JvRWRpdG9yXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEZldGNoZXMgdGhlIEVkaXRvclZpZXcgcHJvdG90eXBlXG4gICAgRWRpdG9yVmlldyA9IEBlZGl0b3JzW0BvcHRpb25zLmVkaXRvcl1cblxuICAgICMgSXNvbGF0ZXMgQ29uZmlnXG4gICAgY29uZmlnID0gQG1vZGVsLmdldCgnY29uZmlnJylcblxuICAgICMgQ2FjaGVzIHRoZSBjdXJyZW50IGNvbmZpZ3VyYXRpb24gdG8gYmUgcmVzdG9yZWQgd2hlbiB0aGlzIHZpZXcgaXMgY2FuY2VsbGVkIG91dFxuICAgIEBjYWNoZWRDb25maWcgPSBjb25maWcudG9KU09OKClcblxuICAgICMgSXNvbGF0ZXMgTWFjcm9Db2xsZWN0aW9uXG4gICAgQG1hY3JvcyA9IGNvbmZpZy5nZXQoJ21hY3JvcycpXG5cbiAgICB3aW5kb3cubWFjcm9zID0gQG1hY3JvcyAjIFRPRE8gLSByZW1vdmVcblxuICAgICMgUmVxdWVzdHMgS2V5Q29sbGVjdGlvbiBmcm9tIHRoZSBLZXlGYWN0b3J5XG4gICAga2V5cyA9IFJhZGlvLmNoYW5uZWwoJ2tleScpLnJlcXVlc3QoJ2NvbGxlY3Rpb24nKVxuXG4gICAgIyBJbnN0YW50aWF0ZXMgbmV3IEVkaXRvclZpZXcgaW5zdGFuY2VcbiAgICBAZWRpdG9yVmlldyA9IG5ldyBFZGl0b3JWaWV3KHsgbW9kZWw6IGNvbmZpZywga2V5czoga2V5cywgbWFjcm9zOiBAbWFjcm9zIH0pXG5cbiAgICAjIExpc3RlbnMgZm9yICdzdG9wOnJlY29yZGluZycgZXZlbnRcbiAgICBAZWRpdG9yVmlldy5vbiAnc3RvcDpyZWNvcmRpbmcnLCA9PiBAdG9nZ2xlUmVjb3JkKClcblxuICAgICMgU2hvd3MgdGhlIHZpZXcgaW4gQGNvbnRlbnRSZWdpb25cbiAgICBAY29udGVudFJlZ2lvbi5zaG93IEBlZGl0b3JWaWV3XG5cbiAgIyBvbkNsZWFyXG4gICMgRW1wdGllcyB0aGUgTWFjcm9Db2xsZWN0aW9uXG4gICMgVE9ETyAtIHVuZG8gYnV0dG9uP1xuICBvbkNsZWFyOiAtPlxuXG4gICAgIyBTdG9wcyBSZWNvcmRpbmdcbiAgICBAc3RvcFJlY29yZGluZygpXG5cbiAgICAjIEVtcHRpZXMgdGhlIE1hY3JvQ29sbGVjdGlvblxuICAgIEBtYWNyb3MucmVzZXQoKVxuICAgIHJldHVyblxuXG4gICMgb25TYXZlXG4gIG9uU2F2ZTogLT5cblxuICAgICMgU3RvcHMgUmVjb3JkaW5nXG4gICAgQHN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyBTZXJpYWxpemVzIGRhdGEgZnJvbSBhbnkgZm9ybSBlbGVtZW50cyBpbiB0aGlzIHZpZXdcbiAgICBkYXRhID0gQmFja2JvbmUuU3lwaG9uLnNlcmlhbGl6ZShAKVxuXG4gICAgIyBDbGVhciB1bnVzZWQgdHlwZS1zcGVjaWZpYyBhdHRyaWJ1dGVzXG4gICAgZGF0YS5tYWNyb3MgPSBbXSBpZiBkYXRhLnR5cGUgIT0gJ21hY3JvJ1xuICAgIGRhdGEudGV4dF92YWx1ZSA9ICcnIGlmIGRhdGEudHlwZSAhPSAndGV4dCdcblxuICAgICMgQXBwbGllcyB0aGUgYXR0cmlidXRlcyB0byB0aGUgY29uZmlnIG1vZGVsXG4gICAgQG1vZGVsLmdldCgnY29uZmlnJykuc2V0KGRhdGEpXG5cbiAgICAjIFRyaWdnZXJzIGNoYW5nZSBldmVudCBvbiBAbW9kZWwgdG8gcmUtcmVuZGVyIHRoZSBjdXJyZW50bHkgaGlkZGVuIEFzdHJvS2V5IGVsZW1lbnRcbiAgICBAbW9kZWwudHJpZ2dlcignY29uZmlnOnVwZGF0ZWQnKVxuXG4gICAgIyBUcmlnZ2VycyAnc2F2ZScgZXZlbnQsIGNsb3NpbmcgdGhpcyB2aWV3XG4gICAgcmV0dXJuIEB0cmlnZ2VyICdzYXZlJ1xuXG4gICMgb25DYW5jZWxcbiAgb25DYW5jZWw6IC0+XG5cbiAgICAjIFN0b3BzIFJlY29yZGluZ1xuICAgIEBzdG9wUmVjb3JkaW5nKClcblxuICAgICMgUmVzZXRzIGNvbmZpZyBhdHRyaWJ1dGVzXG4gICAgQG1vZGVsLmdldCgnY29uZmlnJykuc2V0KEBjYWNoZWRDb25maWcpXG5cbiAgICAjIFRyaWdnZXJzICdjYW5jZWwnIGV2ZW50LCBjbG9zaW5nIHRoaXMgdmlld1xuICAgIHJldHVybiBAdHJpZ2dlciAnY2FuY2VsJ1xuXG4gICMgbG9hZEV4YW1wbGVcbiAgIyBFbXB0aWVzIG91dCB0aGUgTWFjcm9Db2xsZWNpb24gYW5kIGxvYWRzIGFuIGV4YW1wbGUgbWFjcm9cbiAgbG9hZEV4YW1wbGU6IChlKSAtPlxuXG4gICAgIyBDYWNoZXMgY2xpY2tlZCBlbFxuICAgIGVsID0gJChlLmN1cnJlbnRUYXJnZXQpXG5cbiAgICAjIEdldHMgdGhlIElEIG9mIHRoZSBleGFtcGxlIHRvIGxvYWRcbiAgICBleGFtcGxlX2lkID0gZWwuZGF0YSgnZXhhbXBsZScpXG5cbiAgICAjIEludm9rZXMgdGhlIGxvYWRFeGFtcGxlIG1ldGhvZCBvbiB0aGUgTWFjcm9Db2xsZWN0aW9uXG4gICAgcmV0dXJuIEBtYWNyb3MubG9hZEV4YW1wbGUoZXhhbXBsZV9pZClcblxuICAjIHRvZ2dsZVJlY29yZFxuICAjIFRvZ2dsZXMgd2V0aGVyIG9yIG5vdCB0aGUgdXNlcidzIGtleWJvYXJkIGlzIHJlY29yZGluZyBrZXlzdHJva2VzXG4gIHRvZ2dsZVJlY29yZDogKGUpIC0+XG4gICAgcmV0dXJuIEBzdG9wUmVjb3JkaW5nKCkgaWYgQGlzUmVjb3JkaW5nXG4gICAgQHN0YXJ0UmVjb3JkaW5nKClcblxuICAjIHN0b3BSZWNvcmRpbmdcbiAgc3RvcFJlY29yZGluZzogLT5cblxuICAgICMgU2V0cyBAaXNSZWNvcmRpbmcgZmxhZ1xuICAgIEBpc1JlY29yZGluZyA9IGZhbHNlXG5cbiAgICAjIFVwZGF0ZXMgdGhlIEVkaXRvclZpZXcgaW5zdGFuY2UgdG8gaWdub3JlIGtleWJvYXJkIGlucHV0XG4gICAgQGVkaXRvclZpZXcua2V5Ym9hcmRTZWxlY3Rvcj8uY3VycmVudC5zdG9wUmVjb3JkaW5nKClcblxuICAgICMgVXBkYXRlcyB0aGUgQHVpLnJlY29yZEJ0biBlbGVtZW50XG4gICAgQHVpLnJlY29yZEJ0bi5yZW1vdmVDbGFzcygnYWN0aXZlJykuZmluZCgnaScpLnJlbW92ZUNsYXNzKCdmYS1zcGluIGZhLWNpcmNsZS1vLW5vdGNoJykuYWRkQ2xhc3MoJ2ZhLWNpcmNsZScpXG5cbiAgIyBzdGFydFJlY29yZGluZ1xuICBzdGFydFJlY29yZGluZzogLT5cblxuICAgICMgU2V0cyBAaXNSZWNvcmRpbmcgZmxhZ1xuICAgIEBpc1JlY29yZGluZyA9IHRydWVcblxuICAgICMgVXBkYXRlcyB0aGUgRWRpdG9yVmlldyBpbnN0YW5jZSB0byBhbGxvdyBrZXlib2FyZCBpbnB1dFxuICAgIEBlZGl0b3JWaWV3LmtleWJvYXJkU2VsZWN0b3I/LmN1cnJlbnQuc3RhcnRSZWNvcmRpbmcoKVxuXG4gICAgIyBVcGRhdGVzIHRoZSBAdWkucmVjb3JkQnRuIGVsZW1lbnRcbiAgICBAdWkucmVjb3JkQnRuLmFkZENsYXNzKCdhY3RpdmUnKS5maW5kKCdpJykuYWRkQ2xhc3MoJ2ZhLXNwaW4gZmEtY2lyY2xlLW8tbm90Y2gnKS5yZW1vdmVDbGFzcygnZmEtY2lyY2xlJylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yV3JhcHBlclxuXG5cblxuIiwiXG5jbGFzcyBLZXlDaGlsZCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGFnTmFtZTogJ2xpJ1xuICBjbGFzc05hbWU6ICdidG4gYnRuLW91dGxpbmUtbGlnaHQga2V5LS1jaGlsZCBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgbXgtMidcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2tleV9jaGlsZCcpXG5cbiAgYmVoYXZpb3JzOlxuICAgIFNlbGVjdGFibGVDaGlsZDogeyBkZXNlbGVjdDogdHJ1ZSB9XG5cbiAgbW9kZWxFdmVudHM6XG4gICAgJ2NvbmZpZzp1cGRhdGVkJzogJ29uTW9kZWxDaGFuZ2UnXG5cbiAgb25Nb2RlbENoYW5nZTogLT5cbiAgICByZXR1cm4gQHJlbmRlcigpXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuXG4gICAgIyBJc29sYXRlcyBBc3Ryb0tleUNvbmZpZyBtb2RlbFxuICAgIGNvbmZpZyA9IEBtb2RlbC5nZXQoJ2NvbmZpZycpXG5cbiAgICAjIE1hY3JvXG4gICAgaWYgY29uZmlnLmdldCgndHlwZScpID09ICdtYWNybydcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnTWFjcm8nIH1cblxuICAgICMgVGV4dFxuICAgIGlmIGNvbmZpZy5nZXQoJ3R5cGUnKSA9PSAndGV4dCdcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnVGV4dCcgfVxuXG4gICAgIyBLZXlcbiAgICAjIFRPRE8gLSBESVNQTEFZIEtFWSBJTiBWSUVXXG4gICAgaWYgY29uZmlnLmdldCgndHlwZScpID09ICdrZXknXG4gICAgICByZXR1cm4geyBsYWJlbDogJ0tleScgfVxuXG4jICMgIyAjICNcblxuY2xhc3MgS2V5U2VsZWN0b3IgZXh0ZW5kcyBNbi5Db2xsZWN0aW9uVmlld1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ2xpc3QtdW5zdHlsZWQga2V5LS1saXN0IHB4LTQgcHktMyBteS0yIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXIgZmxleC1yb3cnXG4gIGNoaWxkVmlldzogS2V5Q2hpbGRcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gS2V5U2VsZWN0b3JcblxuXG4iLCJEZXZpY2VMYXlvdXQgPSByZXF1aXJlKCcuL2RldmljZUxheW91dCcpXG5FZGl0b3JTZWxlY3RvciA9IHJlcXVpcmUoJy4vZWRpdG9yU2VsZWN0b3InKVxuRWRpdG9yV3JhcHBlciA9IHJlcXVpcmUoJy4vZWRpdG9yV3JhcHBlcicpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBIZWxwVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvaGVscF92aWV3J1xuICBjbGFzc05hbWU6ICdyb3cnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBMYXlvdXRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9sYXlvdXQnXG4gIGNsYXNzTmFtZTogJ2NvbnRhaW5lci1mbHVpZCBkLWZsZXggZmxleC1jb2x1bW4gdy0xMDAgaC0xMDAganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgZGV2aWNlLS1sYXlvdXQnXG5cbiAgcmVnaW9uczpcbiAgICBkZXZpY2VSZWdpb246ICAgJ1tkYXRhLXJlZ2lvbj1kZXZpY2VdJ1xuICAgIHNlbGVjdG9yUmVnaW9uOiAnW2RhdGEtcmVnaW9uPXNlbGVjdG9yXSdcbiAgICBlZGl0b3JSZWdpb246ICAgJ1tkYXRhLXJlZ2lvbj1lZGl0b3JdJ1xuXG4gIG9uUmVuZGVyOiAtPlxuXG4gICAgIyBEaXNwbGF5cyBkZWZhdWx0IGhlbHAgdGV4dFxuICAgIEBzaG93SGVscFZpZXcoKVxuXG4gICAgIyBJbnN0YW50aWF0ZXMgYSBuZXcgRGV2aWNlTGF5b3V0IGZvciBjb25uZWN0aW5nIHRvIGFuIEFzdHJvS2V5XG4gICAgIyBhbmQgc2VsZWN0aW5nIHdoaWNoIGtleSB0aGUgdXNlciB3b3VsZCBsaWtlIHRvIGVkaXRcbiAgICBkZXZpY2VWaWV3ID0gbmV3IERldmljZUxheW91dCh7IG1vZGVsOiBAbW9kZWwgfSlcbiAgICBkZXZpY2VWaWV3Lm9uICdrZXk6c2VsZWN0ZWQnLCAoa2V5TW9kZWwpID0+IEBzaG93RWRpdG9yU2VsZWN0b3Ioa2V5TW9kZWwpXG4gICAgZGV2aWNlVmlldy5vbiAna2V5OmRlc2VsZWN0ZWQnLCAoKSA9PiBAc2hvd0hlbHBWaWV3KClcbiAgICBAZGV2aWNlUmVnaW9uLnNob3coZGV2aWNlVmlldylcblxuICBzaG93SGVscFZpZXc6IC0+XG5cbiAgICAjIEluc3RhbnRpYXRlcyBhIG5ldyBIZWxwVmlldyBhbmQgc2hvd3MgaXQgaW4gQHNlbGVjdG9yUmVnaW9uXG4gICAgQHNlbGVjdG9yUmVnaW9uLnNob3cgbmV3IEhlbHBWaWV3KClcblxuICBzaG93RWRpdG9yU2VsZWN0b3I6IChrZXlNb2RlbCkgLT5cblxuICAgICMgSW5zdGFudGFpYXRlcyBuZXcgRWRpdG9yU2VsZWN0b3Igdmlld1xuICAgIGVkaXRvclNlbGVjdG9yID0gbmV3IEVkaXRvclNlbGVjdG9yKHsgbW9kZWw6IGtleU1vZGVsIH0pXG5cbiAgICAjIFNob3dzIE1hY3JvIEVkaXRvclxuICAgIGVkaXRvclNlbGVjdG9yLm9uICdzaG93Om1hY3JvOmVkaXRvcicsID0+IEBzaG93RWRpdG9yVmlldyhrZXlNb2RlbCwgJ21hY3JvJylcblxuICAgICMgU2hvd3MgVGV4dCBFZGl0b3JcbiAgICBlZGl0b3JTZWxlY3Rvci5vbiAnc2hvdzp0ZXh0OmVkaXRvcicsID0+IEBzaG93RWRpdG9yVmlldyhrZXlNb2RlbCwgJ3RleHQnKVxuXG4gICAgIyBTaG93cyBLZXkgRWRpdG9yXG4gICAgZWRpdG9yU2VsZWN0b3Iub24gJ3Nob3c6a2V5OmVkaXRvcicsID0+IEBzaG93RWRpdG9yVmlldyhrZXlNb2RlbCwgJ2tleScpXG5cbiAgICAjIFNob3dzIHRoZSBFZGl0b3JTZWxlY3RvciB2aWV3XG4gICAgQHNlbGVjdG9yUmVnaW9uLnNob3coZWRpdG9yU2VsZWN0b3IpXG5cbiAgc2hvd0VkaXRvclZpZXc6IChrZXlNb2RlbCwgZWRpdG9yKSAtPlxuICAgIEAkZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAjIEluc3RhbnRpYXRlcyBuZXcgRWRpdG9yV3JhcHBlciB2aWV3XG4gICAgZWRpdG9yV3JhcHBlciA9IG5ldyBFZGl0b3JXcmFwcGVyKHsgbW9kZWw6IGtleU1vZGVsLCBlZGl0b3I6IGVkaXRvciB9KVxuXG4gICAgIyBIYW5kbGVzICdjYW5jZWwnIGV2ZW50XG4gICAgZWRpdG9yV3JhcHBlci5vbiAnY2FuY2VsJywgPT5cbiAgICAgIEAkZWwucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAjIEhhbmRsZXMgJ3NhdmUnIGV2ZW50XG4gICAgZWRpdG9yV3JhcHBlci5vbiAnc2F2ZScsID0+XG4gICAgICAjIFRPRE8gLSBoaXQgdGhlIEtleU1vZGVsIC8gRGV2aWNlTW9kZWwgdG8gZG8gdGhlIHJlc3QgZnJvbSBoZXJlXG4gICAgICBjb25zb2xlLmxvZyAnU0FWRSBLRVkgTU9ERUwgU0VUVElOR1MgSEVSRSdcbiAgICAgIEAkZWwucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAjIFNob3dzIHRoZSBFZGl0b3JXcmFwcGVyIHZpZXcgaW4gQGVkaXRvclJlZ2lvblxuICAgIEBlZGl0b3JSZWdpb24uc2hvdyhlZGl0b3JXcmFwcGVyKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXRWaWV3XG5cblxuXG4iLCJLZXlib2FyZFNlbGVjdG9yID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX3NlbGVjdG9yJylcbk1hY3JvTGlzdCA9IHJlcXVpcmUoJy4vbWFjcm9MaXN0JylcblxuIyAjICMgIyAjXG5cbmNsYXNzIE1hY3JvRWRpdG9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9tYWNyb19lZGl0b3InXG4gIGNsYXNzTmFtZTogJ3JvdyBoLTEwMCdcblxuICByZWdpb25zOlxuICAgIG1hY3JvUmVnaW9uOiAgICAnW2RhdGEtcmVnaW9uPW1hY3JvXSdcbiAgICBjb250cm9sc1JlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1jb250cm9sc10nXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEdldHMgdGhlIGN1cnJlbnQgbWFjcm8gYXNzaWduZWQgdG8gdGhlIGtleU1vZGVsXG4gICAgIyBtYWNyb0NvbGxlY3Rpb24gPSBrZXlNb2RlbC5nZXRNYWNyb0NvbGxlY3Rpb24oKVxuICAgIEBtYWNyb1JlZ2lvbi5zaG93IG5ldyBNYWNyb0xpc3QoeyBjb2xsZWN0aW9uOiBAb3B0aW9ucy5tYWNyb3MgfSlcblxuICAgICMgSW5zdGFudGFpYXRlcyBuZXcgS2V5Ym9hcmRTZWxlY3RvclxuICAgICMgVE9ETyAtIHRoaXMgd2lsbCAqZXZlbnR1YWxseSogZGlzcGxheSBhIHNlbGVjdG9yIGJldHdlZW4gZGlmZmVyZW50IHR5cGVzIG9mIGtleWJvYXJkcyAvIHNldHMgb2Yga2V5c1xuICAgIEBrZXlib2FyZFNlbGVjdG9yID0gbmV3IEtleWJvYXJkU2VsZWN0b3IoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pXG5cbiAgICAjIEJ1YmJsZXMgdXAgc3RvcDpyZWNvcmRpbmcgZXZlbnRcbiAgICBAa2V5Ym9hcmRTZWxlY3Rvci5vbiAnc3RvcDpyZWNvcmRpbmcnLCA9PiBAdHJpZ2dlciAnc3RvcDpyZWNvcmRpbmcnXG5cbiAgICAjIEhhbmRsZXMgS2V5U2VsZWN0aW9uIGV2ZW50XG4gICAgQGtleWJvYXJkU2VsZWN0b3Iub24gJ2tleTpzZWxlY3RlZCcsIChrZXkpID0+XG5cbiAgICAgICMgQ2xvbmVzIHRoZSBvcmlnaW5hbCBvYmplY3RcbiAgICAgIGtleSA9IF8uY2xvbmUoa2V5KVxuXG4gICAgICAjIEFkZHMgdGhlIGNvcnJlY3QgYG9yZGVyYCBhdHRyaWJ1dGVcbiAgICAgIGtleS5vcmRlciA9IEBvcHRpb25zLm1hY3Jvcy5sZW5ndGggKyAxXG5cbiAgICAgICMgQWRkcyB0aGUga2V5IHRvIHRoZSBNYWNyb0NvbGxlY3Rpb25cbiAgICAgIEBvcHRpb25zLm1hY3Jvcy5hZGQoa2V5KVxuXG4gICAgIyBTaG93cyB0aGUga2V5Ym9hcmRWaWV3XG4gICAgQGNvbnRyb2xzUmVnaW9uLnNob3cgQGtleWJvYXJkU2VsZWN0b3JcblxuICAjIHN0YXJ0UmVjb3JkaW5nXG4gIHN0YXJ0UmVjb3JkaW5nOiAtPlxuICAgIEBrZXlib2FyZFZpZXcuc3RhcnRSZWNvcmRpbmcoKVxuXG4gICMgc3RvcFJlY29yZGluZ1xuICBzdG9wUmVjb3JkaW5nOiAtPlxuICAgIEBrZXlib2FyZFZpZXcuc3RvcFJlY29yZGluZygpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hY3JvRWRpdG9yXG5cblxuXG4iLCJcbmNsYXNzIE1hY3JvQ2hpbGQgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnbWFjcm8tLWNoaWxkIGZsZXgtY29sdW1uIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIG15LTInXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9tYWNyb19jaGlsZCcpXG5cbiAgYmVoYXZpb3JzOlxuICAgIFNvcnRhYmxlQ2hpbGQ6IHt9XG5cbiAgbW9kZWxFdmVudHM6XG4gICAgJ2NoYW5nZTpwb3NpdGlvbic6ICdyZW5kZXInXG5cbiAgZXZlbnRzOlxuICAgICdkcmFnJzogJ29uRHJhZydcbiAgICAnZHJhZ3N0YXJ0JzogJ29uRHJhZ1N0YXJ0J1xuICAgICdtb3VzZW92ZXIgLmtleSc6ICdvbk1vdXNlT3ZlcidcbiAgICAnbW91c2VvdXQgLmtleSc6ICdvbk1vdXNlT3V0J1xuICAgICdjbGljayAua2V5JzogJ3JlbW92ZU1hY3JvJ1xuICAgICdjbGljayBbZGF0YS1wb3NpdGlvbl06bm90KC5hY3RpdmUpJzogJ29uUG9zaXRpb25DbGljaydcblxuICBvbk1vdXNlT3ZlcjogLT5cbiAgICBAJGVsLmFkZENsYXNzKCdob3ZlcmVkJylcblxuICBvbk1vdXNlT3V0OiAtPlxuICAgIEAkZWwucmVtb3ZlQ2xhc3MoJ2hvdmVyZWQnKVxuXG4gIG9uRHJhZ1N0YXJ0OiAtPlxuICAgIEAkZWwuYWRkQ2xhc3MoJ2RyYWctc3RhcnQnKVxuXG4gIG9uRHJhZzogLT5cbiAgICBAJGVsLnJlbW92ZUNsYXNzKCdkcmFnLXN0YXJ0IGhvdmVyZWQnKVxuICAgIEAkZWwuc2libGluZ3MoJy5tYWNyby0tY2hpbGQnKS5yZW1vdmVDbGFzcygnZHJhZy1zdGFydCBob3ZlcmVkJylcblxuICByZW1vdmVNYWNybzogLT5cbiAgICBAbW9kZWwuY29sbGVjdGlvbi5yZW1vdmUoQG1vZGVsKVxuXG4gIG9uUG9zaXRpb25DbGljazogKGUpIC0+XG5cbiAgICAjIENhY2hlcyBjbGlja2VkIGVsXG4gICAgZWwgPSAkKGUuY3VycmVudFRhcmdldClcblxuICAgICMgSXNvbGF0ZXMgcG9zaXRpb24gZGF0YSBmcm9tIGVsZW1lbnRcbiAgICBwb3NpdGlvbiA9IGVsLmRhdGEoJ3Bvc2l0aW9uJylcblxuICAgICMgRGV0ZXJtaW5lcyBuZXh0IHBvc2l0aW9uXG4gICAgaWYgcG9zaXRpb24gPT0gLTFcbiAgICAgIG5ld19wb3NpdGlvbiA9IDFcbiAgICBpZiBwb3NpdGlvbiA9PSAwXG4gICAgICBuZXdfcG9zaXRpb24gPSAtMVxuICAgIGlmIHBvc2l0aW9uID09IDFcbiAgICAgIG5ld19wb3NpdGlvbiA9IDBcblxuICAgICMgU2V0cyB0aGUgcG9zaXRpb24gYXR0cmlidXRlIG9uIHRoZSBtb2RlbFxuICAgIEBtb2RlbC5zZXQoJ3Bvc2l0aW9uJywgbmV3X3Bvc2l0aW9uKVxuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBwb3NpdGlvbnMgPSBbXG4gICAgICB7IHBvc2l0aW9uOiAtMSwgY3NzOiAnZmEtbG9uZy1hcnJvdy1kb3duJyB9XG4gICAgICB7IHBvc2l0aW9uOiAwLCBjc3M6ICdmYS1hcnJvd3MtdicgfVxuICAgICAgeyBwb3NpdGlvbjogMSwgY3NzOiAnZmEtbG9uZy1hcnJvdy11cCcgfVxuICAgIF1cblxuICAgIHBvc2l0aW9uID0gQG1vZGVsLmdldCgncG9zaXRpb24nKVxuICAgIGFjdGl2ZV9wb3NpdGlvbiA9IF8uZmluZFdoZXJlKHBvc2l0aW9ucywgeyBwb3NpdGlvbjogcG9zaXRpb24gfSlcbiAgICByZXR1cm4geyBhY3RpdmVfcG9zaXRpb24gfVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9FbXB0eSBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGFnTmFtZTogJ2xpJ1xuICBjbGFzc05hbWU6ICdtYWNyby0tY2hpbGQgZW1wdHkgZmxleC1jb2x1bW4ganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgbXktMidcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL21hY3JvX2VtcHR5JylcblxuIyAjICMgIyAjXG5cbmNsYXNzIE1hY3JvTGlzdCBleHRlbmRzIE1uLkNvbGxlY3Rpb25WaWV3XG4gIHRhZ05hbWU6ICd1bCdcbiAgY2xhc3NOYW1lOiAnbGlzdC11bnN0eWxlZCBtYWNyby0tbGlzdCBweC00IG15LTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIGZsZXgtcm93IGZsZXgtd3JhcCdcbiAgY2hpbGRWaWV3OiBNYWNyb0NoaWxkXG4gIGVtcHR5VmlldzogTWFjcm9FbXB0eVxuXG4gIG9uUmVuZGVyOiAtPlxuXG4gICAgIyBTb3J0cyB0aGUgY29sbGVjdGlvblxuICAgIEBjb2xsZWN0aW9uLnNvcnQoKVxuXG4gICAgIyBJbml0aWFsaXplcyBTb3J0YWJsZSBjb250YWluZXJcbiAgICBTb3J0YWJsZS5jcmVhdGUgQGVsLFxuICAgICAgYW5pbWF0aW9uOiAgICAwXG4gICAgICBoYW5kbGU6ICAgICAgICcua2V5J1xuICAgICAgZ2hvc3RDbGFzczogICAnZ2hvc3QnICAjIENsYXNzIG5hbWUgZm9yIHRoZSBkcm9wIHBsYWNlaG9sZGVyXG4gICAgICBjaG9zZW5DbGFzczogICdjaG9zZW4nICAjIENsYXNzIG5hbWUgZm9yIHRoZSBjaG9zZW4gaXRlbVxuICAgICAgZHJhZ0NsYXNzOiAgICAnZHJhZycgICMgQ2xhc3MgbmFtZSBmb3IgdGhlIGRyYWdnaW5nIGl0ZW1cbiAgICAgIGZhbGxiYWNrVG9sZXJhbmNlOiAxMDBcbiAgICAgIG9uRW5kOiAoZSkgPT4gQHJlb3JkZXJDb2xsZWN0aW9uKClcblxuICAjIHJlb3JkZXJDb2xsZWN0aW9uXG4gICMgSW52b2tlZCBhZnRlciBzb3J0aW5nIGhhcyBjb21wbGV0ZWRcbiAgcmVvcmRlckNvbGxlY3Rpb246ID0+XG5cbiAgICAjIFRyaWdnZXJzIG9yZGVyIGV2ZW50cyBvbiBDb2xsZWN0aW9uVmlldyBjaGlsZFZpZXcgJGVsc1xuICAgIG9yZGVyID0gMVxuICAgIGZvciBlbCBpbiBAZWwuY2hpbGRyZW5cbiAgICAgICQoZWwpLnRyaWdnZXIoJ3NvcnRlZCcsb3JkZXIpXG4gICAgICBvcmRlcisrXG5cbiAgICAjIEBjb2xsZWN0aW9uLnNvcnQoKVxuICAgIEByZW5kZXIoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNYWNyb0xpc3RcblxuXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGRhdGEtcmVnaW9uPVxcXCJrZXlzXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclxcXCI+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGxhYmVsKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwicm93IGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMFxcXCI+PHAgY2xhc3M9XFxcImxlYWQgbWItMFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBsYWJlbCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9wPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0yIHRleHQtcmlnaHQgdGV4dC1tdXRlZFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLXBlbmNpbFxcXCI+PC9pPjwvZGl2PjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImxhYmVsXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5sYWJlbDp0eXBlb2YgbGFiZWwhPT1cInVuZGVmaW5lZFwiP2xhYmVsOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG5hdkl0ZW1zLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+XCIpO1xuLy8gaXRlcmF0ZSBuYXZJdGVtc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBuYXZJdGVtcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIG5hdkl0ZW0gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxidXR0b24gc3R5bGU9XFxcImZsZXgtZ3JvdzoxO1xcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLXRyaWdnZXJcIiwgbmF2SXRlbS50cmlnZ2VyLCB0cnVlLCBmYWxzZSkpICsgXCIgY2xhc3M9XFxcImQtZmxleCBidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IGp1c3RpZnktY29udGVudC1jZW50ZXIgbXgtM1xcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBuYXZJdGVtLnRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYnV0dG9uPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIG5hdkl0ZW0udHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG14LTNcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbmF2SXRlbS50ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2J1dHRvbj5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibmF2SXRlbXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm5hdkl0ZW1zOnR5cGVvZiBuYXZJdGVtcyE9PVwidW5kZWZpbmVkXCI/bmF2SXRlbXM6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJjYW5jZWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBteC0yIHB4LTRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS0yeCBteC00IGZhLWFuZ2xlLWxlZnRcXFwiPjwvaT48L2J1dHRvbj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcInNhdmVcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXN1Y2Nlc3MgbXgtMiBweC00XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtMnggbXgtNCBmYS1jaGVjay1jaXJjbGUtb1xcXCI+PC9pPjwvYnV0dG9uPjxidXR0b24gZGF0YS1jbGljaz1cXFwiY2xlYXJcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXdhcm5pbmcgbXgtMiBweC00XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtMnggbXgtNCBmYS10aW1lc1xcXCI+PC9pPjwvYnV0dG9uPjxidXR0b24gZGF0YS1jbGljaz1cXFwicmVjb3JkXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1kYW5nZXIgbXgtMiBweC00XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtMnggbXgtNCBmYS1jaXJjbGVcXFwiPjwvaT48L2J1dHRvbj48ZGl2IGNsYXNzPVxcXCJidG4tZ3JvdXBcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLXRvZ2dsZT1cXFwiZHJvcGRvd25cXFwiIGFyaWEtaGFzcG9wdXA9XFxcInRydWVcXFwiIGFyaWEtZXhwYW5kZWQ9XFxcImZhbHNlXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1wcmltYXJ5IGRyb3Bkb3duLXRvZ2dsZSBteC0yIHB4LTRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS0yeCBteC00IGZhLWZvbGRlci1vcGVuLW9cXFwiPjwvaT48L2J1dHRvbj48ZGl2IGNsYXNzPVxcXCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHRcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWV4YW1wbGU9XFxcImV4XzAxXFxcIiBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+RXguIDE6IFxcXCJIZWxsbyFcXFwiPC9idXR0b24+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZXhhbXBsZT1cXFwiZXhfMDJcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1pdGVtXFxcIj5FeC4gMjogXFxcIlJlc3Vtw6hcXFwiPC9idXR0b24+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZXhhbXBsZT1cXFwiZXhfMDNcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1pdGVtXFxcIj5FeC4gMzogRW0gRGFzaCAo4oCUKTwvYnV0dG9uPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWV4YW1wbGU9XFxcImV4XzA0XFxcIiBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+RXguIDQ6IENUUkwgKyBBTFQgKyBERUxFVEU8L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxoci8+PC9kaXY+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiY29udGVudFxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXggZmxleC1yb3cgYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxpIGNsYXNzPVxcXCJkLWZsZXggZmEgZmEtZncgZmEtMnggZmEtcXVlc3Rpb24tY2lyY2xlLW8gbXItMVxcXCI+PC9pPjxwIHN0eWxlPVxcXCJsZXR0ZXItc3BhY2luZzogMC4yNXJlbTsgZm9udC13ZWlnaHQ6IDIwMDtcXFwiIGNsYXNzPVxcXCJkLWZsZXggbGVhZCBtLTBcXFwiPkNsaWNrIGEga2V5IHRvIGVkaXQ8L3A+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGxhYmVsKSB7XG5idWYucHVzaChcIjxzcGFuPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGFiZWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Bhbj5cIik7fS5jYWxsKHRoaXMsXCJsYWJlbFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubGFiZWw6dHlwZW9mIGxhYmVsIT09XCJ1bmRlZmluZWRcIj9sYWJlbDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3cgaC0xMDAgdy0xMDAgZWRpdG9yLS1vdmVybGF5XFxcIj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJlZGl0b3JcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTIgcHQtMlxcXCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93IGRldmljZS0tb3ZlcmxheVxcXCI+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiZGV2aWNlXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJzZWxlY3RvclxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBwdC01XFxcIj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoYWN0aXZlX3Bvc2l0aW9uLCBrZXksIHNoaWZ0LCBzcGVjaWFsKSB7XG5qYWRlX21peGluc1tcInBvc2l0aW9uU2VsZWN0XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPHNwYW4gZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiXCIgKyAoamFkZS5hdHRyKFwidGl0bGVcIiwgb3B0cy50b29sdGlwLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1wbGFjZW1lbnQ9XFxcImJvdHRvbVxcXCJcIiArIChqYWRlLmNscyhbJ2ZhLXN0YWNrJywnZmEtbGcnLCdwb3NpdGlvbi0tc2VsZWN0JyxgcG9zaXRpb25fJHtvcHRzLnBvc2l0aW9ufWBdLCBbbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1jaXJjbGUtdGhpbiBmYS1zdGFjay0yeFxcXCI+PC9pPjxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1wb3NpdGlvblwiLCBvcHRzLnBvc2l0aW9uLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnZmEnLCdmYS1zdGFjay0xeCcsb3B0cy5jc3NdLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+PC9zcGFuPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXZcIiArIChqYWRlLmNscyhbJ2tleScsJ2QtZmxleCcsdHlwZW9mIHNwZWNpYWwgPT09IFwidW5kZWZpbmVkXCIgPyBcIlwiIDogXCJzcGVjaWFsXCJdLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48ZGl2IGNsYXNzPVxcXCJpbm5lciBjb250ZW50XFxcIj5cIik7XG5pZiAoIGtleSAmJiBzaGlmdClcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc2hpZnQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0ga2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0ga2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5idWYucHVzaChcIjwvZGl2PjxkaXYgY2xhc3M9XFxcImlubmVyIGhvdmVyXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtbGcgZmEtdGltZXNcXFwiPjwvaT48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJwb3NpdGlvbiBtdC0yXFxcIj5cIik7XG5qYWRlX21peGluc1tcInBvc2l0aW9uU2VsZWN0XCJdKGFjdGl2ZV9wb3NpdGlvbik7XG5idWYucHVzaChcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImFjdGl2ZV9wb3NpdGlvblwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguYWN0aXZlX3Bvc2l0aW9uOnR5cGVvZiBhY3RpdmVfcG9zaXRpb24hPT1cInVuZGVmaW5lZFwiP2FjdGl2ZV9wb3NpdGlvbjp1bmRlZmluZWQsXCJrZXlcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmtleTp0eXBlb2Yga2V5IT09XCJ1bmRlZmluZWRcIj9rZXk6dW5kZWZpbmVkLFwic2hpZnRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnNoaWZ0OnR5cGVvZiBzaGlmdCE9PVwidW5kZWZpbmVkXCI/c2hpZnQ6dW5kZWZpbmVkLFwic3BlY2lhbFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc3BlY2lhbDp0eXBlb2Ygc3BlY2lhbCE9PVwidW5kZWZpbmVkXCI/c3BlY2lhbDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJ0eXBlXFxcIiB2YWx1ZT1cXFwibWFjcm9cXFwiIHJlYWRvbmx5PVxcXCJyZWFkb25seVxcXCIvPjxkaXYgZGF0YS1yZWdpb249XFxcIm1hY3JvXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxoci8+PC9kaXY+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiY29udHJvbHNcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8cCBjbGFzcz1cXFwibGVhZCB0ZXh0LWNlbnRlclxcXCI+TWFjcm9zPGJyLz48c21hbGw+RXhlY3V0ZSBrZXlzdHJva2VzIGluIGEgc3BlY2lmaWMgc2VxdWVuY2U8L3NtYWxsPjwvcD48c21hbGwgc3R5bGU9XFxcImZvbnQtc2l6ZTogMXJlbTtcXFwiIGNsYXNzPVxcXCJ0ZXh0LW11dGVkIGQtZmxleCBmbGV4LXJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclxcXCI+PGRpdiBjbGFzcz1cXFwiZmEgZmEtZncgZmEtcXVlc3Rpb24tY2lyY2xlLW8gbXItMSBkLWZsZXggZmxleC1jb2x1bW5cXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImQtZmxleCBmbGV4LXJvd1xcXCI+PHNwYW4+VXNlIHRoZSBrZXlzIGJlbG93LCBvciBjbGljayZuYnNwOzwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidGV4dC1kYW5nZXJcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1jaXJjbGUgdGV4dC1kYW5nZXJcXFwiPjwvaT4gcmVjb3JkJm5ic3A7PC9zcGFuPiZuYnNwO3RvIHN0YXJ0IHR5cGluZzwvZGl2Pjwvc21hbGw+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5qYWRlX21peGluc1tcImZvcm1Hcm91cFwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxmaWVsZHNldFwiICsgKGphZGUuY2xzKFsnZm9ybS1ncm91cCcsb3B0cy5mb3JtR3JvdXBDc3NdLCBbbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmxhYmVsKVxue1xuYnVmLnB1c2goXCI8bGFiZWwgY2xhc3M9XFxcImZvcm0tY29udHJvbC1sYWJlbFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmxhYmVsKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2xhYmVsPlwiKTtcbn1cbmJsb2NrICYmIGJsb2NrKCk7XG5idWYucHVzaChcIjwvZmllbGRzZXQ+XCIpO1xufTtcbmJ1Zi5wdXNoKFwiXCIpO1xuamFkZV9taXhpbnNbXCJmb3JtSW5wdXRcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuamFkZV9taXhpbnNbXCJmb3JtR3JvdXBcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwiPGlucHV0XCIgKyAoamFkZS5hdHRycyhqYWRlLm1lcmdlKFt7XCJwbGFjZWhvbGRlclwiOiBqYWRlLmVzY2FwZShvcHRzLnBsYWNlaG9sZGVyKSxcIm5hbWVcIjogamFkZS5lc2NhcGUob3B0cy5uYW1lKSxcInR5cGVcIjogamFkZS5lc2NhcGUob3B0cy50eXBlKSxcImNsYXNzXCI6IFwiZm9ybS1jb250cm9sXCJ9LGF0dHJpYnV0ZXNdKSwgZmFsc2UpKSArIFwiLz5cIik7XG59XG59LCBvcHRzKTtcbn07XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwidHlwZVxcXCIgdmFsdWU9XFxcInRleHRcXFwiIHJlYWRvbmx5PVxcXCJyZWFkb25seVxcXCIvPlwiKTtcbmphZGVfbWl4aW5zW1wiZm9ybUlucHV0XCJdLmNhbGwoe1xuYXR0cmlidXRlczogamFkZS5tZXJnZShbeyBjbGFzczogJ2Zvcm0tY29udHJvbC1sZycgfV0pXG59LCB7IG5hbWU6ICd0ZXh0X3ZhbHVlJywgdHlwZTogJ3RleHQnLCBwbGFjZWhvbGRlcjogJ0VudGVyIHNvbWUgdGV4dCBoZXJlLi4uJyB9KTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxuY2xhc3MgVGV4dEVkaXRvciBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICBjbGFzc05hbWU6ICdyb3cnXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy90ZXh0X2VkaXRvcicpXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgQmFja2JvbmUuU3lwaG9uLmRlc2VyaWFsaXplKEAsIHsgdHlwZTogJ3RleHQnLCB0ZXh0X3ZhbHVlOiBAbW9kZWwuZ2V0KCd0ZXh0X3ZhbHVlJykgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dEVkaXRvclxuIiwiXG4jIER1bW15IERldmljZSBEYXRhIGZvciBVSSBkZXZlbG9wbWVudFxuIyBUT0RPIC0gcHVsbCBmcm9tIFdlYlVTQj9cbm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgaWQ6ICdkZXZpY2VfMScsXG4gICAgbGFiZWw6ICdBbGV4XFwncyBBc3Ryb0tleScsXG4gICAgc3RhdHVzX2NvZGU6IDEsXG4gICAga2V5czogW1xuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV8xJywgY29uZmlnOiB7IHR5cGU6ICdtYWNybycsIG1hY3JvczogW10gfSB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzInLCBjb25maWc6IHsgdHlwZTogJ3RleHQnLCB0ZXh0X3ZhbHVlOiAnSGVsbG8gd29ybGQhJyB9IH1cbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfMycsIGNvbmZpZzogeyB0eXBlOiAnbWFjcm8nLCBtYWNyb3M6IFtdIH0gfVxuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV80JywgY29uZmlnOiB7IHR5cGU6ICd0ZXh0JywgdGV4dF92YWx1ZTogJ0hlbGxvLCBhZ2FpbicgfSB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzUnLCBjb25maWc6IHsgdHlwZTogJ21hY3JvJywgbWFjcm9zOiBbXSB9IH1cbiAgICBdXG4gIH1cbl1cbiIsIk1hY3JvRW50aXRpZXMgPSByZXF1aXJlKCcuLi9tYWNyby9lbnRpdGllcycpXG5cbiMgIyAjICMgI1xuXG4jIEFzdHJvS2V5Q29uZmlnIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEFzdHJva2V5Q29uZmlnIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6IHtcbiAgICB0eXBlOiAnbWFjcm8nXG4gICAgbWFjcm9zOiBbXVxuICAgIHRleHRfdmFsdWU6ICcnXG4gICAga2V5X3ZhbHVlOiAnJ1xuICB9XG5cbiAgIyBCYWNrYm9uZS5SZWxhdGlvbmFsIC0gQHJlbGF0aW9ucyBkZWZpbml0aW9uXG4gIHJlbGF0aW9uczogW1xuICAgICAgdHlwZTogICAgICAgICAgIEJhY2tib25lLkhhc01hbnlcbiAgICAgIGtleTogICAgICAgICAgICAnbWFjcm9zJ1xuICAgICAgcmVsYXRlZE1vZGVsOiAgIE1hY3JvRW50aXRpZXMuTW9kZWxcbiAgICAgIGNvbGxlY3Rpb25UeXBlOiBNYWNyb0VudGl0aWVzLkNvbGxlY3Rpb25cbiAgXVxuXG4jICMgIyAjICNcblxuIyBBc3Ryb2tleU1vZGVsIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEFzdHJva2V5TW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIERlZmF1bHQgYXR0cmlidXRlc1xuICBkZWZhdWx0czpcbiAgICBvcmRlcjogbnVsbFxuICAgIGNvbmZpZzoge31cblxuICAjIEJhY2tib25lLlJlbGF0aW9uYWwgLSBAcmVsYXRpb25zIGRlZmluaXRpb25cbiAgcmVsYXRpb25zOiBbXG4gICAgICB0eXBlOiAgICAgICAgICAgQmFja2JvbmUuSGFzT25lXG4gICAgICBrZXk6ICAgICAgICAgICAgJ2NvbmZpZydcbiAgICAgIHJlbGF0ZWRNb2RlbDogICBBc3Ryb2tleUNvbmZpZ1xuICBdXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBBc3Ryb2tleUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBBc3Ryb2tleU1vZGVsXG4gIGNvbXBhcmF0b3I6ICdvcmRlcidcblxuIyAjICMgIyAjXG5cbiMgRGV2aWNlTW9kZWwgZGVmaW5pdGlvblxuY2xhc3MgRGV2aWNlTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIEJhY2tib25lLlJlbGF0aW9uYWwgLSBAcmVsYXRpb25zIGRlZmluaXRpb25cbiAgcmVsYXRpb25zOiBbXG4gICAgICB0eXBlOiAgICAgICAgICAgQmFja2JvbmUuSGFzTWFueVxuICAgICAga2V5OiAgICAgICAgICAgICdrZXlzJ1xuICAgICAgcmVsYXRlZE1vZGVsOiAgIEFzdHJva2V5TW9kZWxcbiAgICAgIGNvbGxlY3Rpb25UeXBlOiBBc3Ryb2tleUNvbGxlY3Rpb25cbiAgXVxuXG4jICMgIyAjICNcblxuIyBEZXZpY2VDb2xsZWN0aW9uIGRlZmluaXRpb25cbmNsYXNzIERldmljZUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBEZXZpY2VNb2RlbFxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPVxuICBNb2RlbDogICAgICBEZXZpY2VNb2RlbFxuICBDb2xsZWN0aW9uOiBEZXZpY2VDb2xsZWN0aW9uXG4iLCJFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKVxuRGV2aWNlRGF0YSA9IHJlcXVpcmUoJy4vZGF0YScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VGYWN0b3J5IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAnZGV2aWNlIG1vZGVsJzogICAgICAgJ2dldE1vZGVsJ1xuICAgICdkZXZpY2UgY29sbGVjdGlvbic6ICAnZ2V0Q29sbGVjdGlvbidcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjYWNoZWRDb2xsZWN0aW9uID0gbmV3IEVudGl0aWVzLkNvbGxlY3Rpb24oRGV2aWNlRGF0YSwgeyBwYXJzZTogdHJ1ZSB9KVxuXG4gIGdldE1vZGVsOiAoaWQpIC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uLmdldChpZClcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBAY2FjaGVkQ29sbGVjdGlvblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRGV2aWNlRmFjdG9yeSgpXG4iLCJMYXlvdXRWaWV3ICA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jICMgIyAjICNcblxuY2xhc3MgSG9tZVJvdXRlIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGUnXG5cbiAgdGl0bGU6ICdBc3Ryb0tleSBIb21lJ1xuXG4gIGJyZWFkY3J1bWJzOiBbeyB0ZXh0OiAnRGV2aWNlJyB9XVxuXG4gIGZldGNoOiAtPlxuICAgIEBkZXZpY2VNb2RlbCA9IFJhZGlvLmNoYW5uZWwoJ2RldmljZScpLnJlcXVlc3QoJ21vZGVsJywgJ2RldmljZV8xJylcblxuICByZW5kZXI6IC0+XG4gICAgY29uc29sZS5sb2coQGRldmljZU1vZGVsKTsgIyBEZWJ1Z1xuICAgIEBjb250YWluZXIuc2hvdyBuZXcgTGF5b3V0Vmlldyh7IG1vZGVsOiBAZGV2aWNlTW9kZWwgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSG9tZVJvdXRlXG4iLCJcbmNsYXNzIEhvbWVMYXlvdXRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9sYXlvdXQnXG4gIGNsYXNzTmFtZTogJ2NvbnRhaW5lci1mbHVpZCBoLTEwMCdcblxuIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWVMYXlvdXRWaWV3XG5cblxuXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3cgaC0xMDBcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PHAgY2xhc3M9XFxcImxlYWRcXFwiPkFzdHJvS2V5PC9wPjxoci8+PHAgY2xhc3M9XFxcImxlYWRcXFwiPkNvbm5lY3QgYW4gQXN0cm9LZXkgZGV2aWNlIHRvIGdldCBzdGFydGVkPC9wPjxoci8+PGEgaHJlZj1cXFwiI2RldmljZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tb3V0bGluZS1wcmltYXJ5XFxcIj5ERVZJQ0U8L2E+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInJlcXVpcmUgJy4vZmFjdG9yeSdcbkhvbWVSb3V0ZSA9IHJlcXVpcmUgJy4vaG9tZS9yb3V0ZSdcbkRhc2hib2FyZFJvdXRlID0gcmVxdWlyZSAnLi9kYXNoYm9hcmQvcm91dGUnXG5cbiMgIyAjICMgI1xuXG4jIE1haW5Sb3V0ZXIgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgTWFpblJvdXRlciBleHRlbmRzIHJlcXVpcmUgJ2huX3JvdXRpbmcvbGliL3JvdXRlcidcblxuICByb3V0ZXM6XG4gICAgJygvKSc6ICdob21lJ1xuXG4gIGhvbWU6IC0+XG4gICAgbmV3IERhc2hib2FyZFJvdXRlKHsgY29udGFpbmVyOiBAY29udGFpbmVyIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1haW5Sb3V0ZXJcbiIsIlxuIyBGaWx0ZXJzIHVzZWQgdG8gcXVlcnkgV2ViVVNCIGRldmljZXNcbiMgVE9ETyAtIHVwZGF0ZSBmaWx0ZXJzIHRvIHF1ZXJ5IGRldmljZXMgYnkgQXN0cm9LZXkgVmVuZG9ySURcbnJlcXVlc3REZXZpY2VGaWx0ZXJzID0gW1xuICB7IHZlbmRvcklkOiAweDEwYzQgfVxuXVxuXG4jICMgIyAjXG5cbiMgVXNiU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIFJlc3BvbnNpYmxlIGZvciBtYW5hZ2luZyBVU0IgZGV2aWNlc1xuIyAtIGZldGNoIGFsbCBkZXZpY2VzXG5jbGFzcyBVc2JTZXJ2aWNlIGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAndXNiIGRldmljZXMnOiAnZ2V0RGV2aWNlcydcblxuICAjIGdldERldmljZXNcbiAgZ2V0RGV2aWNlczogLT5cblxuICAgICMgUmV0dXJucyBhIFByb21pc2UgdG8gbWFuYWdlIGFzeW5jaG9ub3VzIGJlaGF2aW9yXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG5cbiAgICAgICMgU3RlcCAxIC0gUmVxdWVzdCBkZXZpY2VcbiAgICAgIG5hdmlnYXRvci51c2IucmVxdWVzdERldmljZSh7IGZpbHRlcnM6IHJlcXVlc3REZXZpY2VGaWx0ZXJzIH0pXG4gICAgICAudGhlbiggKGRldmljZSkgPT5cblxuICAgICAgICAjIFRPRE8gLSByZW1vdmVcbiAgICAgICAgIyBjb25zb2xlLmxvZyBkZXZpY2VcblxuICAgICAgICAjIFN0ZXAgMiAtIEdldCBEZXZpY2VzXG4gICAgICAgICMgVE9ETyAtIHZlcmlmeSB0aGlzIHdvcmtmbG93XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNiLmdldERldmljZXMoKS50aGVuKChkKSA9PlxuXG4gICAgICAgICAgY29uc29sZS5sb2coZClcblxuICAgICAgICAgIGQgPSBkWzBdXG5cbiAgICAgICAgICAjIFNURVAgMyAtIG9wZW4gZGV2aWNlXG4gICAgICAgICAgZC5vcGVuKCkudGhlbiA9PlxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnb3BlbidcblxuICAgICAgICAgICAgIyBTdGVwIDQgLSBzZWxlY3QgY29uZmlndXJhdGlvblxuICAgICAgICAgICAgZC5zZWxlY3RDb25maWd1cmF0aW9uKDEpLnRoZW4gPT5cblxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnc2VsZWN0Q29uZmlndXJhdGlvbidcblxuICAgICAgICAgICAgICB3aW5kb3cuZCA9IGRcblxuICAgICAgICAgICAgICAjIFNURVAgNSAtIGNvbnRyb2xUcmFuc2ZlckluXG4gICAgICAgICAgICAgICMgd2luZG93LmQuY29udHJvbFRyYW5zZmVySW4oeydyZXF1ZXN0VHlwZSc6ICdzdGFuZGFyZCcsICdyZWNpcGllbnQnOiAnZGV2aWNlJywgJ3JlcXVlc3QnOiAweDA2LCAndmFsdWUnOiAweDBGMDAsICdpbmRleCc6IDB4MDB9LCA1KS50aGVuKCAocikgPT4geyBjb25zb2xlLmxvZyhyKSB9KVxuXG5cbiAgICAgICAgKVxuXG4gICAgICApXG5cbiAgIyBzZW5kXG4gIHNlbmQ6IC0+XG5cbiAgICB3aW5kb3cuZC5jb250cm9sVHJhbnNmZXJPdXQoe1xuICAgICAgICByZXF1ZXN0VHlwZTogICd2ZW5kb3InLFxuICAgICAgICByZWNpcGllbnQ6ICAgICdkZXZpY2UnLFxuICAgICAgICByZXF1ZXN0OiAgICAgIDB4MDMsXG4gICAgICAgIHZhbHVlOiAgICAgICAgMHgwMDEzLCAjIFdoYXRldmVyIHdlIHdhbnQgKHRvIHNvbWUgZXh0ZW50KVxuICAgICAgICBpbmRleDogICAgICAgIDB4MDAwMSAgIyBUT0RPIC0gV2UgY2FuIHVzZSBpbmRleCBmb3IgdGhlIGtleSB0aGUgbWFjcm8gY29ycmVzcG9uZHMgdG8gKGxvdy1ieXRlID0ga2V5LCBoaWdoLWJ5dGUgPSBudW1iZXIgb2YgYWN0aW9ucyBpbiB0aGUgbWFjcm8pXG4gICAgfSwgZGF0YSk7XG5cblxuIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBVc2JTZXJ2aWNlKClcbiIsbnVsbCwiXG4jIFByb3ZpZGVzIHVwZGF0ZUF0dHJzIG1ldGhvZCB1c2VkIGJ5IGJpbmRDaGVja2JveGVzLCBiaW5kSW5wdXRzLCBiaW5kUmFkaW9zLCBiaW5kU2VsZWN0c1xuY2xhc3MgQmluZEJhc2UgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgdXBkYXRlQXR0cnM6IChlKSAtPlxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBAdmlldy5tb2RlbC5zZXQoQmFja2JvbmUuU3lwaG9uLnNlcmlhbGl6ZShAKSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQmluZEJhc2VcbiIsIlxuIyBEYXRhYmluZGluZyBmb3IgZm9ybSBpbnB1dHNcbmNsYXNzIEJpbmRJbnB1dHMgZXh0ZW5kcyByZXF1aXJlICcuL2JpbmRCYXNlJ1xuXG4gIGV2ZW50czpcbiAgICAnaW5wdXQgaW5wdXQnOiAgJ3VwZGF0ZUF0dHJzJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5kSW5wdXRzXG4iLCJcbl9zZW5kRmxhc2ggPSAodHlwZSwgb2JqKSAtPlxuICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdmbGFzaCcpLnRyaWdnZXIodHlwZSwgb2JqKVxuXG4jICMgIyAjICNcblxuY2xhc3MgRmxhc2hlc0JlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zPXt9KSAtPlxuICAgIEB2aWV3Ll9mbGFzaGVzICAgICAgPSBAb3B0aW9uc1xuICAgIEB2aWV3LmZsYXNoRXJyb3IgICAgPSBAZmxhc2hFcnJvclxuICAgIEB2aWV3LmZsYXNoU3VjY2VzcyAgPSBAZmxhc2hTdWNjZXNzXG5cbiAgZmxhc2hFcnJvcjogKG9iaj17fSkgLT5cbiAgICBfc2VuZEZsYXNoKCdlcnJvcicsIEBfZmxhc2hlc1snZXJyb3InXSB8fCBvYmopXG5cbiAgZmxhc2hTdWNjZXNzOiAob2JqPXt9KSAtPlxuICAgIF9zZW5kRmxhc2goJ3N1Y2Nlc3MnLCBAX2ZsYXNoZXNbJ3N1Y2Nlc3MnXSB8fCBvYmopXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoZXNCZWhhdmlvclxuIiwiXG5jbGFzcyBNb2RlbEV2ZW50c0JlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdyZXF1ZXN0JzogICdvbk1vZGVsUmVxdWVzdCdcbiAgICAnc3luYyc6ICAgICAnb25Nb2RlbFN5bmMnXG4gICAgJ2Vycm9yJzogICAgJ29uTW9kZWxFcnJvcidcblxuICBvbk1vZGVsUmVxdWVzdDogKG1vZGVsLCBzdGF0dXMsIG9wdGlvbnMpIC0+XG4gICAgQHZpZXcub25SZXF1ZXN0Pyhtb2RlbCwgc3RhdHVzLCBvcHRpb25zKVxuXG4gIG9uTW9kZWxTeW5jOiAobW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKSAtPlxuICAgIEB2aWV3Lm9uU3luYz8obW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKVxuXG4gIG9uTW9kZWxFcnJvcjogKG1vZGVsLCByZXNwb25zZSwgb3B0aW9ucykgLT5cbiAgICBAdmlldy5vbkVycm9yPyhtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVsRXZlbnRzQmVoYXZpb3JcbiIsIlxuIyBTdWJtaXRCdXR0b25CZWhhdmlvciBjbGFzcyBkZWZpbml0aW9uXG4jIFByb3ZpZGVzIGFuIGV2ZW50IGxpc3RlbmVyIGFuZCBoYW5kbGVyLCBhbmQgZGVmaW5lc1xuIyBhc3NvY2lhdGVkIGNhbGxiYWNrcyBvbiB0aGUgdmlldyB0byB3aGljaCB0aGUgYmVoYXZpb3JcbiMgaXMgYXR0YWNoZWQuIFRoaXMgaXMgdXNlZCBpbiB0aGUgUGFzc3dvcmQgYW5kIFNuaXBwZXQgZm9ybXMuXG5jbGFzcyBTdWJtaXRCdXR0b25CZWhhdmlvciBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1aTpcbiAgICBzdWJtaXQ6ICdbZGF0YS1jbGljaz1zdWJtaXRdJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLnN1Ym1pdDpub3QoLmRpc2FibGVkKSc6ICdvblN1Ym1pdENsaWNrJ1xuXG4gIGluaXRpYWxpemU6IChvcHRpb25zPXt9KSAtPlxuICAgIEB2aWV3LmRpc2FibGVTdWJtaXQgPSA9PiBAZGlzYWJsZVN1Ym1pdCgpXG4gICAgQHZpZXcuZW5hYmxlU3VibWl0ICA9ID0+IEBlbmFibGVTdWJtaXQoKVxuXG4gIG9uU3VibWl0Q2xpY2s6IChlKSAtPiBAdmlldy5vblN1Ym1pdD8oZSlcbiAgZGlzYWJsZVN1Ym1pdDogLT4gQHVpLnN1Ym1pdC5hZGRDbGFzcygnZGlzYWJsZWQnKVxuICBlbmFibGVTdWJtaXQ6IC0+ICBAdWkuc3VibWl0LnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN1Ym1pdEJ1dHRvbkJlaGF2aW9yXG4iLCJcbmNsYXNzIFRvb2x0aXBCZWhhdmlvciBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1aTpcbiAgICB0b29sdGlwczogJ1tkYXRhLXRvZ2dsZT10b29sdGlwXSdcblxuICBpbml0aWFsaXplOiAtPlxuICAgICMgUHJveGllcyBjbGVhciBtZXRob2QgdG8gYmUgYWNjZXNzaWJsZSBpbnNpZGUgdGhlIHZpZXdcbiAgICBAdmlldy5jbGVhclRvb2x0aXBzID0gPT4gQGNsZWFyKClcblxuICBjbGVhcjogLT5cbiAgICBAdWkudG9vbHRpcHMudG9vbHRpcCgnaGlkZScpXG4gICAgQHVpLnRvb2x0aXBzLnRvb2x0aXAoJ2Rpc3Bvc2UnKVxuXG4gIG9uUmVuZGVyOiAtPiBAdWkudG9vbHRpcHM/LnRvb2x0aXAoKVxuICBvbkJlZm9yZURlc3Ryb3k6IC0+IEBjbGVhcigpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRvb2x0aXBCZWhhdmlvclxuIiwiXG4jIEFzc2lnbnMgTWFyaW9uZXR0ZS5EZWNvcmF0b3Jcbk1hcmlvbmV0dGUuRGVjb3JhdG9yID0gcmVxdWlyZSAnLi9kZWNvcmF0b3InXG5cbiMgT3ZlcnJpZGVzIGRlZmF1bHQgc2VyaWFsaXplTW9kZWwoKSBtZXRob2QgZGVmaW5pdGlvblxuIyBJbiB0aGUgY29udGV4dCB0aGUgc2VyaWFsaXplTW9kZWwgbWV0aG9kLCAndGhpcydcbiMgcmVmZXJzIHRvIHRoZSB2aWV3IGluc3RhbmNlIGluc2lkZSB3aGljaCB0aGVcbiMgc2VyaWFsaXplTW9kZWwgbWV0aG9kIHdhcyBpbnZva2VkXG5NYXJpb25ldHRlLlZpZXcucHJvdG90eXBlLnNlcmlhbGl6ZU1vZGVsID0gLT5cblxuICAjIElmIHRoaXMubW9kZWwgaXMgbm90IGRlZmluZWQsIHJldHVybiBhbiBlbXB0eSBvYmplY3RcbiAgaWYgIXRoaXMubW9kZWxcbiAgICByZXR1cm4ge31cblxuICAjIElmIHRoaXMubW9kZWwgZXhpc3RzLCBhbmQgaGFzIGEgZGVjb3JhdG9yIGRlZmluZWQsXG4gICMgcmV0dXJuIHRoZSB0aGlzLm1vZGVsJ3MgYXR0cmlidXRlcyBhbmQgZGVjb3JhdGlvbnNcbiAgZWxzZSBpZiB0aGlzLm1vZGVsLmRlY29yYXRvclxuICAgIHJldHVybiB0aGlzLm1vZGVsLmRlY29yYXRvci5kZWNvcmF0ZSh0aGlzLm1vZGVsKVxuXG4gICMgT3RoZXJ3aXNlLCByZXR1cm4gdGhlIGNsb25lZCBhdHRyaWJ1dGVzIG9mIHRoaXMubW9kZWxcbiAgcmV0dXJuIF8uY2xvbmUgdGhpcy5tb2RlbC5hdHRyaWJ1dGVzXG4iLCJcbiMgQmFzZURlY29yYXRvciBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBzaW1wbGUgY2xhc3MgdG8gZGVjb3JhdGUgbW9kZWxzIHdoZW5cbiMgdGhleSBhcmUgc2VyaWFsaXplZCBpbnRvIGEgdmlldydzIHRlbXBsYXRlXG5jbGFzcyBCYXNlRGVjb3JhdG9yXG5cbiAgIyBEZWNvcmF0aW9uIG1ldGhvZFxuICAjIEludm9rZWQgaW4gTWFyaW9uZXR0ZS5WaWV3LnByb3RvdHlwZS5zZXJpYWxpemVNb2RlbFxuICBAZGVjb3JhdGU6IChtb2RlbCkgLT5cblxuICAgICMgQ2xvbmVzIG1vZGVsJ3MgYXR0cmlidXRlc1xuICAgICMgQ2xvbmluZyBwcmV2ZW50cyBjb250YW1pbmF0aW9uIG9mXG4gICAgZGF0YSA9IF8uY2xvbmUobW9kZWwuYXR0cmlidXRlcylcblxuICAgICMgSXRlcmF0ZXMgb3ZlciBlYWNoIGZ1bmN0aW9uIGluIHByb3RvdHlwZVxuICAgICMgTGV2ZXJhZ2VzIFVuZGVyc2NvcmUuanMgXy5mdW5jdGlvbnMoKVxuICAgIGZvciBmdW5jIGluIF8uZnVuY3Rpb25zKEBwcm90b3R5cGUpXG5cbiAgICAgICMgU2tpcCBjb25zdHJ1Y3RvclxuICAgICAgY29udGludWUgaWYgZnVuYyA9PSAnY29uc3RydWN0b3InXG5cbiAgICAgICMgQXNzaWducyB2YWx1ZSBvZiBmdW5jdGlvbiB0byBoYXNoXG4gICAgICBkYXRhW2Z1bmNdID0gQHByb3RvdHlwZVtmdW5jXS5hcHBseShtb2RlbClcblxuICAgICMgUmV0dXJucyB0aGUgbW9kZWwncyBhdHRyaWJ1dGVzICYgZGVjb3JhdGlvbnNcbiAgICByZXR1cm4gZGF0YVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlRGVjb3JhdG9yXG4iLCJcbiMgRmxhc2hDb2xsZWN0aW9uIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIEJhY2tib25lLkNvbGxlY3Rpb24gdG8gYmUgdXNlZCBieSB0aGVcbiMgRmxhc2hDb21wb25lbnQgZm9yIHN0b3JpbmcgbXVsdGlwbGUgZmxhc2ggbW9kZWxzXG5jbGFzcyBGbGFzaENvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiByZXF1aXJlICcuL21vZGVsJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaENvbGxlY3Rpb25cbiIsInJlcXVpcmUgJy4vc2VydmljZSdcbkZsYXNoTGlzdCA9IHJlcXVpcmUgJy4vdmlld3MvZmxhc2hMaXN0J1xuXG4jICMgIyAjICNcblxuIyBGbGFzaFNlcnZpY2UgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgY29tcG9uZW50IHRvIGNyZWF0ZSBhbmQgZGlzcGxheSBmbGFzaGVzXG4jIGluIHRoZSBhcHAuIFByb3ZpZGVzIG11bHRpcGxlIGludGVyZmFjZXMgaW4gcmFkaW9FdmVudHNcbiMgdG8gaGFuZGxlIGNvbW1vbiB0eXBlcyBvZiBmbGFzaGVzIChlcnJvciwgd2FybmluZywgc3VjY2VzcylcbmNsYXNzIEZsYXNoQ29tcG9uZW50IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdmbGFzaCcpLnJlcXVlc3QoJ2NvbGxlY3Rpb24nKS50aGVuIChjb2xsZWN0aW9uKSA9PlxuICAgICAgQGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uXG4gICAgICBAY29sbGVjdGlvbi5vbiAndXBkYXRlJywgQHNob3dMaXN0VmlldywgQFxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdmbGFzaCBhZGQnOiAgICAgICdhZGQnXG4gICAgJ2ZsYXNoIHJlc2V0JzogICAgJ3Jlc2V0J1xuICAgICdmbGFzaCBlcnJvcic6ICAgICdlcnJvcidcbiAgICAnZmxhc2ggd2FybmluZyc6ICAnd2FybmluZydcbiAgICAnZmxhc2ggc3VjY2Vzcyc6ICAnc3VjY2VzcydcblxuICBhZGQ6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbGxlY3Rpb24uYWRkKG9wdGlvbnMpXG5cbiAgcmVzZXQ6IC0+XG4gICAgQGNvbGxlY3Rpb24ucmVzZXQoKVxuXG4gIGVycm9yOiAob3B0aW9ucz17fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQgXy5leHRlbmQoIG9wdGlvbnMsIHsgY29udGV4dDogICdkYW5nZXInIH0pXG5cbiAgd2FybmluZzogKG9wdGlvbnM9e30pIC0+XG4gICAgQGNvbGxlY3Rpb24uYWRkIF8uZXh0ZW5kKCBvcHRpb25zLCB7IGNvbnRleHQ6ICAnd2FybmluZycgfSlcblxuICBzdWNjZXNzOiAob3B0aW9ucz17fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQgXy5leHRlbmQoIG9wdGlvbnMsIHsgY29udGV4dDogICdzdWNjZXNzJyB9KVxuXG4gIHNob3dMaXN0VmlldzogPT5cbiAgICB1bmxlc3MgQHJlbmRlcmVkXG4gICAgICBAY29udGFpbmVyLnNob3cgbmV3IEZsYXNoTGlzdCh7IGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uIH0pXG4gICAgICBAcmVuZGVyZWQgPSB0cnVlXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoQ29tcG9uZW50XG4iLCJcbiMgRmxhc2hNb2RlbCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBiYXNpYyBCYWNrYm9uZS5Nb2RlbCB0byBtYW5hZ2Ugdmlld3NcbiMgZGlzcGxheWVkIGluIHRoZSBGbGFzaENvbXBvbmVudFxuY2xhc3MgRmxhc2hNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cbiAgZGVmYXVsdHM6XG4gICAgdGltZW91dDogNTAwMFxuICAgIGRpc21pc3NpYmxlOiB0cnVlXG4gICAgY29udGV4dDogJ2luZm8nXG5cbiAgIyBBbGVydCBNb2RlbCBBdHRyaWJ1dGVzIC8gT3B0aW9uc1xuICAjIC0gbWVzc2FnZVxuICAjIC0gc3Ryb25nVGV4dCAocGxlYXNlIHJlbmFtZSB0byAnc3Ryb25nJyAmIGFkZCBhcHByb3ByaWF0ZSBzcGFjaW5nIHRvIHRlbXBsYXRlKVxuICAjIC0gY29udGV4dENsYXNzIChwbGVhc2UgcmVuYW1lIHRvICdjb250ZXh0JylcbiAgIyAtIHRpbWVvdXQgKGRlZmF1bHQgaXMgNSBzZWNvbmRzKVxuICAjIC0gZGlzbWlzc2libGUgKGRlZmF1bHQgaXMgdHJ1ZSlcblxuICBkaXNtaXNzOiAtPlxuICAgIEBjb2xsZWN0aW9uLnJlbW92ZShAKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaE1vZGVsXG4iLCJGbGFzaENvbGxlY3Rpb24gPSByZXF1aXJlICcuL2NvbGxlY3Rpb24nXG5cbiMgIyAjICMgI1xuXG4jIEZsYXNoU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZWQgYSBiYXNpYyBzZXJ2aWNlIHRvIHJldHVybiB0aGUgRmxhc2hlc0NvbGxlY3Rpb25cbiMgd2hlbiByZXF1ZXN0ZWQuIFRoaXMgaXMgdXNlZCBieSB0aGUgRmxhc2hDb21wb25lbnQgdG8gcmV0cmlldmVcbiMgdGhlIEZsYXNoQ29sbGVjdGlvbiBpdCBpcyByZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nXG5jbGFzcyBGbGFzaFNlcnZpY2UgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb1JlcXVlc3RzOlxuICAgICdmbGFzaCBjb2xsZWN0aW9uJzogJ2dldENvbGxlY3Rpb24nXG5cbiAgYWxlcnRzOiBudWxsXG5cbiAgZ2V0Q29sbGVjdGlvbjogLT5cbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUscmVqZWN0KSA9PlxuICAgICAgQGFsZXJ0cyB8fD0gbmV3IEZsYXNoQ29sbGVjdGlvbigpXG4gICAgICByZXNvbHZlKEBhbGVydHMpXG4gICAgICByZXR1cm5cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEZsYXNoU2VydmljZSgpXG4iLCIjIEZsYXNoQ2hpbGQgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3IHRvIGRpc3BsYXkgYSBGbGFzaE1vZGVsIGluc3RhbmNlXG4jIFRoaXMgdmlldyBhdXRvLWRpc21pc3NlcyBhZnRlciB0aGUgdGltZW91dCBkZWZpbmVkIGluIHRoZSBGbGFzaE1vZGVsIGluc3RhbmNlXG5jbGFzcyBGbGFzaENoaWxkIGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdydcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2ZsYXNoX2NoaWxkJ1xuXG4gIGF0dHJpYnV0ZXM6XG4gICAgc3R5bGU6ICdkaXNwbGF5Om5vbmU7J1xuXG4gIHVpOlxuICAgIGNsb3NlOiAnW2RhdGEtY2xpY2s9ZGlzbWlzc10nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuY2xvc2UnOiAnZGlzbWlzcydcblxuICBvblNob3c6IC0+XG4gICAgdGltZW91dCA9IEBtb2RlbC5nZXQoJ3RpbWVvdXQnKVxuICAgIHNldFRpbWVvdXQoIEBkaXNtaXNzLCB0aW1lb3V0IClcblxuICBvbkF0dGFjaDogLT5cbiAgICBAJGVsLmZhZGVJbigpXG5cbiAgcmVtb3ZlOiAtPlxuICAgIEAkZWwuc2xpZGVUb2dnbGUoID0+XG4gICAgICBNYXJpb25ldHRlLkxheW91dFZpZXcucHJvdG90eXBlLnJlbW92ZS5jYWxsKEApXG4gICAgKVxuXG4gIGRpc21pc3M6ID0+XG4gICAgQG1vZGVsLmNvbGxlY3Rpb24/LnJlbW92ZSggQG1vZGVsIClcblxuIyBGbGFzaExpc3QgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlldyB0byB0aGUgbGlzdCBvZiBGbGFzaGVzXG5jbGFzcyBGbGFzaExpc3QgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIGNsYXNzTmFtZTogJ2NvbnRhaW5lci1mbHVpZCdcbiAgY2hpbGRWaWV3OiBGbGFzaENoaWxkXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoTGlzdFxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoY29udGV4dCwgZGlzbWlzc2libGUsIG1lc3NhZ2UsIHN0cm9uZykge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTIgdGV4dC1jZW50ZXJcXFwiPjxkaXYgcm9sZT1cXFwiYWxlcnRcXFwiXCIgKyAoamFkZS5jbHMoWydhbGVydCcsJ2FsZXJ0LWRpc21pc3NpYmxlJywnZmFkZScsJ2luJyxcImFsZXJ0LVwiICsgY29udGV4dF0sIFtudWxsLG51bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIGRpc21pc3NpYmxlKVxue1xuYnVmLnB1c2goXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1jbGljaz1cXFwiZGlzbWlzc1xcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJzci1vbmx5XFxcIj5DbG9zZTwvc3Bhbj48L2J1dHRvbj5cIik7XG59XG5pZiAoIHN0cm9uZylcbntcbmJ1Zi5wdXNoKFwiPHN0cm9uZz5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHN0cm9uZyArIFwiIFwiKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3N0cm9uZz5cIik7XG59XG5pZiAoIG1lc3NhZ2UpXG57XG5idWYucHVzaChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG1lc3NhZ2UpID8gXCJcIiA6IGphZGVfaW50ZXJwKSk7XG59XG5idWYucHVzaChcIjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImNvbnRleHRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNvbnRleHQ6dHlwZW9mIGNvbnRleHQhPT1cInVuZGVmaW5lZFwiP2NvbnRleHQ6dW5kZWZpbmVkLFwiZGlzbWlzc2libGVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRpc21pc3NpYmxlOnR5cGVvZiBkaXNtaXNzaWJsZSE9PVwidW5kZWZpbmVkXCI/ZGlzbWlzc2libGU6dW5kZWZpbmVkLFwibWVzc2FnZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubWVzc2FnZTp0eXBlb2YgbWVzc2FnZSE9PVwidW5kZWZpbmVkXCI/bWVzc2FnZTp1bmRlZmluZWQsXCJzdHJvbmdcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnN0cm9uZzp0eXBlb2Ygc3Ryb25nIT09XCJ1bmRlZmluZWRcIj9zdHJvbmc6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiTW9kYWxWaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuXG4jICMgIyAjICNcblxuIyBXaW5kb3cgZXZlbnQgbGlzdGVuZXIgdG8gaGlkZSB0aGUgbW9kYWwgd2hlbiBuYXZpZ2F0aW9uIG9jY3Vycy5cbmhpZGVNb2RhbE9uSGFzaENoYW5nZSA9IC0+IHdpbmRvdy5tb2RhbFdpbmRvdy5oaWRlTW9kYWwoKVxuXG4jIEFic3RyYWN0IGNsYXNzIGZvciBtb2RhbC1iYXNlZCBjb21wb25lbnRzLlxuY2xhc3MgQWJzdHJhY3RNb2RhbENvbXBvbmVudCBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiAgaGlkZU1vZGFsOiAtPlxuICAgIEBtb2RhbFZpZXcuaGlkZU1vZGFsKClcblxuICBzaG93TW9kYWw6IChjb250ZW50VmlldywgbW9kYWxWaWV3T3B0aW9ucz17fSkgLT5cblxuICAgICAgIyBOZXcgTW9kYWwgVmlldyAob3VyIHZpZXcgaXMgc2hvd24gaW5zaWRlIHRoaXMgb25lKVxuICAgICAgQG1vZGFsVmlldyA9IG5ldyBNb2RhbFZpZXcobW9kYWxWaWV3T3B0aW9ucylcblxuICAgICAgIyBTaG93IHRoZSB2aWV3IGluc2lkZSB0aGUgbW9kYWwgd3JhcHBlciwgYWRkcyBoaWRlTW9kYWxPbkhhc2hDaGFuZ2UgZXZlbnQgbGlzdGVuZXJcbiAgICAgIEBtb2RhbFZpZXcub24gJ3Nob3cnLCA9PlxuICAgICAgICBAbW9kYWxWaWV3LmNvbnRlbnRSZWdpb24uc2hvdyggY29udGVudFZpZXcgKVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGhpZGVNb2RhbE9uSGFzaENoYW5nZSlcbiAgICAgICAgd2luZG93Lm1vZGFsV2luZG93ID0gQG1vZGFsVmlld1xuXG4gICAgICAjIFJlbW92ZXMgaGlkZU1vZGFsT25IYXNoQ2hhbmdlIGV2ZW50IGxpc3RlbmVyXG4gICAgICBAbW9kYWxWaWV3Lm9uICdkZXN0cm95JywgLT5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBoaWRlTW9kYWxPbkhhc2hDaGFuZ2UpXG4gICAgICAgIGRlbGV0ZSB3aW5kb3cubW9kYWxXaW5kb3dcblxuICAgICAgIyBvbk1vZGFsSGlkZGVuIGNhbGxiYWNrXG4gICAgICBAbW9kYWxWaWV3Lm9uICdoaWRkZW46bW9kYWwnLCA9PiBAb25Nb2RhbEhpZGRlbj8oKVxuXG4gICAgICAjIFNob3cgdmlldyBpbiB0aGUgbW9kYWxcbiAgICAgIEBjb250YWluZXIuc2hvdyBAbW9kYWxWaWV3XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0TW9kYWxDb21wb25lbnRcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG1vZGFsQ3NzKSB7XG5idWYucHVzaChcIjxkaXYgcm9sZT1cXFwiZG9jdW1lbnRcXFwiIGRhdGEtcmVnaW9uPVxcXCJtb2RhbC1jb250ZW50XFxcIlwiICsgKGphZGUuY2xzKFttb2RhbENzc10sIFt0cnVlXSkpICsgXCI+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibW9kYWxDc3NcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm1vZGFsQ3NzOnR5cGVvZiBtb2RhbENzcyE9PVwidW5kZWZpbmVkXCI/bW9kYWxDc3M6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG4jIE1vZGFsVmlldyBjbGFzcyBkZWZpbml0aW9uXG4jIFByb3ZpZGVzIGEgZ2VuZXJpYyB2aWV3IGFuZCByZWdpb24gaW50byB3aGljaFxuIyBvdGhlciB2aWV3cyBjYW4gY29udmVuaWVudGx5IGJlIGRpc3BsYXllZCBpbiBhIG1vZGFsXG5jbGFzcyBNb2RhbFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vbW9kYWxfdGVtcGxhdGUnXG5cbiAgYXR0cmlidXRlczpcbiAgICByb2xlOiAgICAgJ2RpYWxvZydcbiAgICB0YWJpbmRleDogJy0xJ1xuXG4gIGNsYXNzTmFtZTogJ21vZGFsIGZhZGUnXG5cbiAgIyBTZXRzIG1vZGFsIHNpemUgLSBub3JtYWwgLyBzbWFsbCAvIGxhcmdlXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBzaXplID0gQG9wdGlvbnMuc2l6ZSB8fCAnJ1xuICAgIGNzcyA9ICdtb2RhbC1kaWFsb2cnXG4gICAgY3NzICs9ICcgbW9kYWwtc20nIGlmIHNpemUgPT0gJ3NtYWxsJ1xuICAgIGNzcyArPSAnIG1vZGFsLWxnJyBpZiBzaXplID09ICdsYXJnZSdcbiAgICByZXR1cm4geyBtb2RhbENzczogY3NzIH1cblxuICByZWdpb25zOlxuICAgIGNvbnRlbnRSZWdpb246ICdbZGF0YS1yZWdpb249bW9kYWwtY29udGVudF0nXG5cbiAgZXZlbnRzOlxuICAgICdzaG93LmJzLm1vZGFsJyAgIDogLT4gQHRyaWdnZXJNZXRob2QgJ3Nob3c6bW9kYWwnXG4gICAgJ3Nob3duLmJzLm1vZGFsJyAgOiAtPiBAdHJpZ2dlck1ldGhvZCAnc2hvd246bW9kYWwnXG4gICAgJ2hpZGUuYnMubW9kYWwnICAgOiAtPiBAdHJpZ2dlck1ldGhvZCAnaGlkZTptb2RhbCdcbiAgICAnaGlkZGVuLmJzLm1vZGFsJyA6IC0+IEB0cmlnZ2VyTWV0aG9kICdoaWRkZW46bW9kYWwnXG4gICAgJ2xvYWRlZC5icy5tb2RhbCcgOiAtPiBAdHJpZ2dlck1ldGhvZCAnbG9hZGVkOm1vZGFsJ1xuXG4gIG9uU2hvdzogLT5cbiAgICBAJGVsLm1vZGFsKCBAb3B0aW9ucy5tb2RhbE9wdGlvbnMgfHwge30gKVxuXG4gIGhpZGVNb2RhbDogLT5cbiAgICBAJGVsLm1vZGFsKCdoaWRlJylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxWaWV3XG4iLCJcbmNsYXNzIE92ZXJsYXlWaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogZmFsc2VcbiAgY2xhc3NOYW1lOiAnb3ZlcmxheSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrJzogJ29uQ2xpY2snXG5cbiAgb25DbGljazogLT5cbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdzaWRlYmFyJykudHJpZ2dlcignaGlkZScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBPdmVybGF5Q29tcG9uZW50IGV4dGVuZHMgTW4uU2VydmljZVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbnRhaW5lciAgPSBvcHRpb25zLmNvbnRhaW5lclxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdvdmVybGF5IHJlYWR5JzogICdvblJlYWR5J1xuICAgICdvdmVybGF5IHNob3cnOiAgICdzaG93T3ZlcmxheSdcbiAgICAnb3ZlcmxheSBoaWRlJzogICAnaGlkZU92ZXJsYXknXG5cbiAgc2hvd092ZXJsYXk6IC0+XG4gICAgJCgnLm92ZXJsYXktcmVnaW9uJykuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgaGlkZU92ZXJsYXk6IC0+XG4gICAgJCgnLm92ZXJsYXktcmVnaW9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgb25SZWFkeTogLT5cbiAgICB1bmxlc3MgQHZpZXdcbiAgICAgIEB2aWV3ID0gbmV3IE92ZXJsYXlWaWV3KClcbiAgICAgIEBjb250YWluZXIuc2hvdyhAdmlldylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gT3ZlcmxheUNvbXBvbmVudFxuIiwiXG4jIEJhc2VSb3V0ZSBjbGFzcyBkZWZpbml0aW9uXG4jIFRoZSBiYXNlIHJvdXRlIHJlZHVjZXMgcmVwZWF0ZWQgY29kZSBieVxuIyBhdHRhY2hpbmcgdGhlIEBjb250YWluZXIgcHJvcGVydHkgcGFzc2VkIGluIGZyb21cbiMgdGhlIHJvdXRlci4gVGhpcyBwcm9wZXJ0eSBpcyB1c2VkIHRvIGRpc3BsYXkgdmlld3MgaW4gdGhlIGFwcFxuY2xhc3MgQmFzZVJvdXRlIGV4dGVuZHMgQmFja2JvbmUuUm91dGluZy5Sb3V0ZVxuXG4gIGJyZWFkY3J1bWJzOiBbXVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zKSAtPlxuXG4gICAgIyBBdHRhY2hlcyBvcHRpb25zXG4gICAgQG9wdGlvbnMgPSBvcHRpb25zXG5cbiAgICAjIEF0dGFjaGVzIGNvbnRhaW5lclxuICAgIEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuXG4gICAgIyBFdmVudCBoYW5kbGVyc1xuICAgIEBvbiAnYmVmb3JlOmVudGVyJywgPT4gQG9uQmVmb3JlRW50ZXI/KGFyZ3VtZW50cylcbiAgICBAb24gJ2JlZm9yZTpmZXRjaCcsID0+IEBvbkJlZm9yZUZldGNoPyhhcmd1bWVudHMpXG4gICAgQG9uICdiZWZvcmU6cmVuZGVyJywgPT4gQG9uQmVmb3JlUmVuZGVyPyhhcmd1bWVudHMpXG4gICAgQG9uICdmZXRjaCcsID0+IEBvbkZldGNoPyhhcmd1bWVudHMpXG4gICAgQG9uICdyZW5kZXInLCA9PiBAb25SZW5kZXI/KGFyZ3VtZW50cylcbiAgICBAb24gJ2VudGVyJywgPT4gQG9uRW50ZXI/KGFyZ3VtZW50cylcblxuICAgICMgSGlkZXMgc2lkZWJhciBjb21wb25lbnRcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdzaWRlYmFyJykudHJpZ2dlcignaGlkZScpXG5cbiAgX3NldFBhZ2VUaXRsZTogLT5cbiAgICBkb2N1bWVudC50aXRsZSA9IF8ucmVzdWx0IEAsICd0aXRsZSdcblxuICBfdXBkYXRlQnJlYWRjcnVtYnM6IC0+XG4gICAgYnJlYWRjcnVtYnMgPSBfLnJlc3VsdCBALCAnYnJlYWRjcnVtYnMnXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnYnJlYWRjcnVtYicpLnRyaWdnZXIoJ3NldCcsIGJyZWFkY3J1bWJzKSBpZiBicmVhZGNydW1ic1xuXG4gIG9uRmV0Y2g6IC0+XG4gICAgQF9zZXRQYWdlVGl0bGUoKVxuICAgIEBfdXBkYXRlQnJlYWRjcnVtYnMoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlUm91dGVcbiIsIlxuIyBCYXNlUm91dGVyIGNsYXNzIGRlZmluaXRpb25cbiMgVGhlIGJhc2Ugcm91dGVyIHJlZHVjZXMgcmVwZWF0ZWQgY29kZSBieVxuIyBhdHRhY2hpbmcgdGhlIEBjb250YWluZXIgcHJvcGVydHkgcGFzc2VkIGluIGZyb20gd2hlbiBpbnN0YW50aWF0ZWQuXG4jIFRoaXMgcHJvcGVydHkgaXMgc3Vic2VxdWVudGx5IHBhc3NlZCB0byBhbGwgcm91dGVzIGNyZWF0ZWQgaW5zaWRlXG4jIHJvdXRlcnMgc3ViY2xhc3NlZCBmcm9tIHRoaXMgZGVmaW5pdGlvblxuY2xhc3MgQmFzZVJvdXRlciBleHRlbmRzIEJhY2tib25lLlJvdXRpbmcuUm91dGVyXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+IEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlUm91dGVyXG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4oZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5qYWRlID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKSA6XG4gICAgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxba2V5XTsgfSkgOlxuICAgIFt2YWxdKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0eWxlID0gZnVuY3Rpb24gKHZhbCkge1xuICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubWFwKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXTtcbiAgICB9KS5qb2luKCc7Jyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICB2YWwgPSBleHBvcnRzLnN0eWxlKHZhbCk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsKS5pbmRleE9mKCcmJykgIT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NpbmNlIEphZGUgMi4wLjAsIGFtcGVyc2FuZHMgKGAmYCkgaW4gZGF0YSBhdHRyaWJ1dGVzICcgK1xuICAgICAgICAgICAgICAgICAgICd3aWxsIGJlIGVzY2FwZWQgdG8gYCZhbXA7YCcpO1xuICAgIH07XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBlbGltaW5hdGUgdGhlIGRvdWJsZSBxdW90ZXMgYXJvdW5kIGRhdGVzIGluICcgK1xuICAgICAgICAgICAgICAgICAgICdJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBqYWRlX2VuY29kZV9odG1sX3J1bGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90Oydcbn07XG52YXIgamFkZV9tYXRjaF9odG1sID0gL1smPD5cIl0vZztcblxuZnVuY3Rpb24gamFkZV9lbmNvZGVfY2hhcihjKSB7XG4gIHJldHVybiBqYWRlX2VuY29kZV9odG1sX3J1bGVzW2NdIHx8IGM7XG59XG5cbmV4cG9ydHMuZXNjYXBlID0gamFkZV9lc2NhcGU7XG5mdW5jdGlvbiBqYWRlX2VzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKS5yZXBsYWNlKGphZGVfbWF0Y2hfaHRtbCwgamFkZV9lbmNvZGVfY2hhcik7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuZXhwb3J0cy5EZWJ1Z0l0ZW0gPSBmdW5jdGlvbiBEZWJ1Z0l0ZW0obGluZW5vLCBmaWxlbmFtZSkge1xuICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xufVxuXG59LHtcImZzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XX0se30sWzFdKSgxKVxufSk7XG59KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIlxuY2xhc3MgQWJzdHJhY3RLZXlib2FyZFZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdyBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlcidcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2tleWJvYXJkX2Fic3RyYWN0J1xuXG4gICMgVE9ETyAtIGFjdGl2YXRlIHRoaXMgYmVoYXZpb3IgY29uZGl0aW9uYWxseVxuICAjIGJlaGF2aW9yczpcbiAgIyAgIEtleWJvYXJkQ29udHJvbHM6IHt9XG5cbiAgdWk6XG4gICAga2V5OiAnW2RhdGEtY2xpY2s9a2V5XSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5rZXknOiAnb25LZXlDbGljaydcblxuICBpc1JlY29yZGluZzogZmFsc2VcblxuICAjIGluaXRpYWxpemVcbiAgaW5pdGlhbGl6ZTogLT5cblxuICAgICMgRGVmaW5lcyBAZGVib3VuY2VTdG9wUmVjb3JkaW5nXG4gICAgQGRlYm91bmNlU3RvcFJlY29yZGluZyA9IF8uZGVib3VuY2UoICgpID0+XG4gICAgICBAdHJpZ2dlciAnc3RvcDpyZWNvcmRpbmcnXG4gICAgLCAxNTAwKTtcblxuICAjIHN0YXJ0UmVjb3JkaW5nXG4gIHN0YXJ0UmVjb3JkaW5nOiAtPlxuICAgIEBpc1JlY29yZGluZyA9IHRydWVcblxuICAjIHN0b3BSZWNvcmRpbmdcbiAgc3RvcFJlY29yZGluZzogLT5cbiAgICBAaXNSZWNvcmRpbmcgPSBmYWxzZVxuXG4gICMgS2V5Ym9hcmRDb250cm9scyBiZWhhdmlvciBjYWxsYmFja1xuICAjIFRPRE8gLSBhbm5vYXRlIGFuZCBjbGVhbiB1cCB0aGlzIG1ldGhvZFxuICBvbktleUFjdGlvbjogKGUpIC0+XG5cbiAgICAjIFNob3J0LWNpcmN1aXRzIHVubGVzc1xuICAgIHJldHVybiB1bmxlc3MgQGlzUmVjb3JkaW5nXG5cbiAgICAjIFByZXZlbnRzIGRlZmF1bHQgaG90a2V5cyB3aGlsZSByZWNvcmRpbmdcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICMgVE9ETyAtIGlnbm9yZSBrZXl1cCBvbiBhbHBoYW51bWVyaWMsIGxpc3RlbiBmb3Igc3BlY2lhbCBrZXlzP1xuICAgICMgcmV0dXJuIGlmIGUua2V5IGluIFtcIkNvbnRyb2xcIiwgXCJNZXRhXCIsIFwiQWx0XCJdXG4gICAga2V5ID0gQG9wdGlvbnMua2V5cy5maW5kV2hlcmUoeyBrZXljb2RlOiBlLmtleUNvZGUgfSlcblxuICAgICMgIyAjICNcblxuICAgICMgVE9ETyAtIGRvY3VtZW50IHRoaXMgYmxvY2sgb2YgY29kZVxuXG4gICAgaWYgZS50eXBlID09ICdrZXlkb3duJ1xuXG4gICAgICBpZiBlLmtleSBpbiBbXCJDb250cm9sXCIsIFwiTWV0YVwiLCBcIkFsdFwiLCBcIlNoaWZ0XCJdXG4gICAgICAgIGpzb24gPSBrZXkudG9KU09OKClcbiAgICAgICAganNvbi5wb3NpdGlvbiA9IC0xXG4gICAgICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBqc29uXG4gICAgICBlbHNlXG4gICAgICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBrZXkudG9KU09OKClcblxuICAgIGlmIGUudHlwZSA9PSAna2V5dXAnXG5cbiAgICAgIGlmIGUua2V5IGluIFtcIkNvbnRyb2xcIiwgXCJNZXRhXCIsIFwiQWx0XCIsIFwiU2hpZnRcIl1cbiAgICAgICAganNvbiA9IGtleS50b0pTT04oKVxuICAgICAgICBqc29uLnBvc2l0aW9uID0gMVxuICAgICAgICBAdHJpZ2dlciAna2V5OnNlbGVjdGVkJywganNvblxuXG5cbiAgICAjICMgIyAjXG5cbiAgICBpZiBlLnR5cGUgPT0gJ2tleXVwJ1xuICAgICAgQCQoXCJbZGF0YS1rZXljb2RlPSN7ZS5rZXlDb2RlfV1cIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgZWxzZVxuICAgICAgQCQoXCJbZGF0YS1rZXljb2RlPSN7ZS5rZXlDb2RlfV1cIikuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAjIFRPRE8gLSBhbm5vdGFlXG4gICAgc2V0VGltZW91dCggPT5cbiAgICAgIEAkKFwiW2RhdGEta2V5Y29kZT0je2Uua2V5Q29kZX1dXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICwgMTAwMClcblxuICAgICMgU3RvcHMgcmVjb3JkaW5nIDIgc2Vjb25kcyBhZnRlciBsYXN0IGtleXN0cm9rZVxuICAgIEBkZWJvdW5jZVN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyAjICMgI1xuXG5cbiAgIyBLZXlDbGljayBjYWxsYmFja1xuICBvbktleUNsaWNrOiAoZSkgLT5cblxuICAgICMgQ2FjaGVzIGVsIGFuZCBrZXljb2RlXG4gICAgZWwgID0gJChlLmN1cnJlbnRUYXJnZXQpXG4gICAga2V5Y29kZSA9IGVsLmRhdGEoJ2tleWNvZGUnKVxuXG4gICAgIyBGaW5kcyB0aGUgbW9kZWwgb2YgdGhlIGtleSB0aGF0IHdhcyBzZWxlY3RlZFxuICAgIGtleSA9IEBvcHRpb25zLmtleXMuZmluZFdoZXJlKHsga2V5Y29kZToga2V5Y29kZSB9KVxuXG4gICAgIyBUcmlnZ2VycyAna2V5OnNlbGVjdGVkJyBldmVudFxuICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBrZXkudG9KU09OKClcblxuICAgICMgQmx1cnMgZm9jdXMgZnJvbSBjbGlja2VkIGtleVxuICAgIGVsLmJsdXIoKVxuXG4gICAgcmV0dXJuXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0S2V5Ym9hcmRWaWV3XG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlib2FyZFZpZXcgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMva2V5Ym9hcmRfZnVsbCdcblxuICBiZWhhdmlvcnM6XG4gICAgS2V5Ym9hcmRDb250cm9sczoge31cblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IwJ30pXG4gICAgICByMTogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IxJ30pXG4gICAgICByMjogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IyJ30pXG4gICAgICByMzogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IzJ30pXG4gICAgICByNDogXy53aGVyZShrZXlzLCB7IHJvdzogJ3I0J30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZFZpZXdcbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgI1xuXG5jbGFzcyBGdW5jdGlvbktleWJvYXJkIGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ2Z1bmNfcjAnfSlcbiAgICB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uS2V5Ym9hcmRcblxuXG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICNcblxuY2xhc3MgTWVkaWFLZXlib2FyZCBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdtZWRpYV9yMCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWVkaWFLZXlib2FyZFxuXG5cbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgI1xuXG5jbGFzcyBOYXZLZXlib2FyZCBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICduYXZfcjAnfSlcbiAgICB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdktleWJvYXJkXG5cblxuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjXG5cbmNsYXNzIE51bXBhZFZpZXcgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMva2V5Ym9hcmRfbnVtcGFkJ1xuXG4gICMgUGFzc2VzIGtleSBvYmplY3RzIHRvIFVJXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBrZXlzID0gQG9wdGlvbnMua2V5cy50b0pTT04oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3IwJ30pXG4gICAgICByMTogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yMSd9KVxuICAgICAgcjI6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjInfSlcbiAgICAgIHIzOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3IzJ30pXG4gICAgICByNDogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yNCd9KVxuICAgICAgY29sOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX2NvbCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTnVtcGFkVmlld1xuXG5cbiIsIlNpbXBsZU5hdiA9IHJlcXVpcmUoJ2xpYi92aWV3cy9zaW1wbGVfbmF2JylcbkZ1bGxLZXlib2FyZCA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9mdWxsJylcbk51bXBhZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfbnVtcGFkJylcbkZ1bmN0aW9uS2V5Ym9hcmQgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfZnVuY3Rpb24nKVxuTWVkaWFLZXlib2FyZCA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9tZWRpYScpXG5OYXZLZXlib2FyZCA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9uYXYnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgS2V5Ym9hcmRTZWxlY3RvciBleHRlbmRzIFNpbXBsZU5hdlxuICBjbGFzc05hbWU6ICdyb3cgaC0xMDAnXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9rZXlib2FyZF9zZWxlY3RvcicpXG5cbiAgbmF2SXRlbXM6IFtcbiAgICB7IGljb246ICdmYS1rZXlib2FyZC1vJywgIHRleHQ6ICdLZXlib2FyZCcsICB0cmlnZ2VyOiAna2V5Ym9hcmQnLCBkZWZhdWx0OiB0cnVlIH1cbiAgICB7IGljb246ICdmYS1maWxlLXRleHQtbycsIHRleHQ6ICdOdW1wYWQnLCAgIHRyaWdnZXI6ICdudW1wYWQnIH1cbiAgICB7IGljb246ICdmYS1jYXJldC1zcXVhcmUtby11cCcsICAgIHRleHQ6ICdGdW5jdGlvbicsICAgIHRyaWdnZXI6ICdmdW5jdGlvbicgfVxuICAgIHsgaWNvbjogJ2ZhLWFzdGVyaXNrJywgICAgdGV4dDogJ01lZGlhJywgICAgdHJpZ2dlcjogJ21lZGlhJyB9XG4gICAgeyBpY29uOiAnZmEtYXN0ZXJpc2snLCAgICB0ZXh0OiAnTmF2aWdhdGlvbicsICAgIHRyaWdnZXI6ICduYXYnIH1cbiAgXVxuXG4gIHNob3dLZXlib2FyZFZpZXc6IChrZXlib2FyZFZpZXcpIC0+XG5cbiAgICAjIENhY2hlcyBjdXJyZW50IGtleWJvYXJkIHZpZXdcbiAgICBAY3VycmVudCA9IGtleWJvYXJkVmlld1xuXG4gICAgIyBIYW5kbGVzICdzdG9wOnJlY29yZGluZycgZXZlbnRcbiAgICBAY3VycmVudC5vbiAnc3RvcDpyZWNvcmRpbmcnLCA9PiBAdHJpZ2dlciAnc3RvcDpyZWNvcmRpbmcnXG5cbiAgICAjIEhhbmRsZXMgS2V5U2VsZWN0aW9uIGV2ZW50XG4gICAga2V5Ym9hcmRWaWV3Lm9uICdrZXk6c2VsZWN0ZWQnLCAoa2V5KSA9PiBAdHJpZ2dlcigna2V5OnNlbGVjdGVkJywga2V5KVxuXG4gICAgIyBTaG93cyB0aGUga2V5Ym9hcmRWaWV3XG4gICAgQGNvbnRlbnRSZWdpb24uc2hvdyBrZXlib2FyZFZpZXdcblxuICBvbk5hdmlnYXRlS2V5Ym9hcmQ6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IEZ1bGxLZXlib2FyZCh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZU51bXBhZDogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgTnVtcGFkVmlldyh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZUZ1bmN0aW9uOiAtPlxuICAgIEBzaG93S2V5Ym9hcmRWaWV3KG5ldyBGdW5jdGlvbktleWJvYXJkKHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuICBvbk5hdmlnYXRlTWVkaWE6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IE1lZGlhS2V5Ym9hcmQoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4gIG9uTmF2aWdhdGVOYXY6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IE5hdktleWJvYXJkKHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRTZWxlY3RvclxuIiwiY2xhc3MgU2ltcGxlTmF2IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgW2RhdGEtdHJpZ2dlcl0nOiAnb25OYXZJdGVtQ2xpY2snXG5cbiAgbmF2SXRlbXM6IFtdXG5cbiAgcmVnaW9uczpcbiAgICBjb250ZW50UmVnaW9uOiAnW2RhdGEtcmVnaW9uPWNvbnRlbnRdJ1xuXG4gIG9uUmVuZGVyOiAtPlxuICAgIGRlZiA9IF8ud2hlcmUoXy5yZXN1bHQoQCwgJ25hdkl0ZW1zJyksIHsgZGVmYXVsdDogdHJ1ZSB9KVswXVxuICAgIHJldHVybiB1bmxlc3MgZGVmXG4gICAgQHRyaWdnZXJNZXRob2QoXCJuYXZpZ2F0ZToje2RlZi50cmlnZ2VyfVwiKVxuICAgIEAkKFwiW2RhdGEtdHJpZ2dlcj0je2RlZi50cmlnZ2VyfV1cIikuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgc2VyaWFsaXplRGF0YTogLT5cbiAgICBkYXRhID0gc3VwZXJcbiAgICBfLmV4dGVuZChkYXRhLCB7IG5hdkl0ZW1zOiBfLnJlc3VsdChALCAnbmF2SXRlbXMnKSB9KVxuICAgIHJldHVybiBkYXRhXG5cbiAgb25OYXZJdGVtQ2xpY2s6IChlKSA9PlxuICAgIGVsID0gJChlLmN1cnJlbnRUYXJnZXQpXG4gICAgZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgQHRyaWdnZXJNZXRob2QoXCJuYXZpZ2F0ZToje2VsLmRhdGEoJ3RyaWdnZXInKX1cIilcbiAgICBlbC5ibHVyKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU2ltcGxlTmF2XG4iXX0=
