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



},{"./keyboardControls":4,"./selectableChild":5,"./sortableChild":6,"./sortableList":7,"hn_behaviors/lib/bindInputs":65,"hn_behaviors/lib/flashes":66,"hn_behaviors/lib/modelEvents":67,"hn_behaviors/lib/submitButton":68,"hn_behaviors/lib/tooltips":69}],4:[function(require,module,exports){
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



},{"./views/layout":9,"hn_modal/lib/abstract":78}],9:[function(require,module,exports){
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
},{"jade/runtime":84}],11:[function(require,module,exports){
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
},{"jade/runtime":84}],14:[function(require,module,exports){
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



},{"./app":1,"./application/views/layout":2,"./components/about/component":8,"./components/header/component":11,"./config":15,"./modules/key/factory":21,"./modules/macro/factory":34,"./modules/main/router":61,"./modules/usb/service":62,"hn_entities/lib/config":70,"hn_flash/lib/component":73,"hn_overlay/lib/component":81}],20:[function(require,module,exports){
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
},{"jade/runtime":84}],24:[function(require,module,exports){
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
},{"jade/runtime":84}],25:[function(require,module,exports){
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
},{"jade/runtime":84}],26:[function(require,module,exports){
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
},{"jade/runtime":84}],27:[function(require,module,exports){
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



},{}],28:[function(require,module,exports){
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



},{"./examples":33}],29:[function(require,module,exports){
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



},{}],30:[function(require,module,exports){
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



},{}],31:[function(require,module,exports){
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



},{}],32:[function(require,module,exports){
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



},{}],33:[function(require,module,exports){
module.exports = {
  ex_01: require('./example_1'),
  ex_02: require('./example_2'),
  ex_03: require('./example_3'),
  ex_04: require('./example_4')
};



},{"./example_1":29,"./example_2":30,"./example_3":31,"./example_4":32}],34:[function(require,module,exports){
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



},{"./default_macros":27,"./entities":28}],35:[function(require,module,exports){
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



},{"./views/layout":40,"hn_routing/lib/route":82}],36:[function(require,module,exports){
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



},{"./keySelector":39,"./templates/device_layout":43,"./templates/device_status":44}],37:[function(require,module,exports){
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



},{"./templates/editor_selector":45,"lib/views/simple_nav":92}],38:[function(require,module,exports){
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



},{"./macroEditor":41,"./templates/editor_wrapper":46,"./textEditor":54}],39:[function(require,module,exports){
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



},{"./templates/key_child":48}],40:[function(require,module,exports){
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



},{"./deviceLayout":36,"./editorSelector":37,"./editorWrapper":38,"./templates/help_view":47,"./templates/layout":49}],41:[function(require,module,exports){
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



},{"./macroList":42,"./templates/macro_editor":51,"lib/views/keyboard_selector":91}],42:[function(require,module,exports){
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



},{"./templates/macro_child":50,"./templates/macro_empty":52}],43:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div data-region=\"keys\" class=\"col-lg-12 d-flex justify-content-center align-items-center\"></div>");;return buf.join("");
};
},{"jade/runtime":84}],44:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (label) {
buf.push("<div class=\"col-lg-12\"><div class=\"row d-flex align-items-center\"><div class=\"col-lg-10\"><p class=\"lead mb-0\">" + (jade.escape(null == (jade_interp = label) ? "" : jade_interp)) + "</p></div><div class=\"col-lg-2 text-right text-muted\"><i class=\"fa fa-fw fa-pencil\"></i></div></div></div>");}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return buf.join("");
};
},{"jade/runtime":84}],45:[function(require,module,exports){
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
},{"jade/runtime":84}],46:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"col-lg-12\"><div class=\"row justify-content-center\"><div class=\"col-lg-12 d-flex justify-content-center\"><button data-click=\"cancel\" class=\"btn btn-sm btn-outline-secondary mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-angle-left\"></i></button><button data-click=\"save\" class=\"btn btn-sm btn-outline-success mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-check-circle-o\"></i></button><button data-click=\"clear\" class=\"btn btn-sm btn-outline-warning mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-times\"></i></button><button data-click=\"record\" class=\"btn btn-sm btn-outline-danger mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-circle\"></i></button><div class=\"btn-group\"><button type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"btn btn-sm btn-outline-primary dropdown-toggle mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-folder-open-o\"></i></button><div class=\"dropdown-menu dropdown-menu-right\"><button type=\"button\" data-example=\"ex_01\" class=\"dropdown-item\">Ex. 1: \"Hello!\"</button><button type=\"button\" data-example=\"ex_02\" class=\"dropdown-item\">Ex. 2: \"Resumè\"</button><button type=\"button\" data-example=\"ex_03\" class=\"dropdown-item\">Ex. 3: Em Dash (—)</button><button type=\"button\" data-example=\"ex_04\" class=\"dropdown-item\">Ex. 4: CTRL + ALT + DELETE</button></div></div></div></div></div><div class=\"col-lg-12\"><hr/></div><div data-region=\"content\" class=\"col-lg-12\"></div>");;return buf.join("");
};
},{"jade/runtime":84}],47:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"col-lg-12 d-flex flex-row align-items-center justify-content-center\"><i class=\"d-flex fa fa-fw fa-2x fa-question-circle-o mr-1\"></i><p style=\"letter-spacing: 0.25rem; font-weight: 200;\" class=\"d-flex lead m-0\">Click a key to edit</p></div>");;return buf.join("");
};
},{"jade/runtime":84}],48:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (label) {
buf.push("<span>" + (jade.escape(null == (jade_interp = label) ? "" : jade_interp)) + "</span>");}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return buf.join("");
};
},{"jade/runtime":84}],49:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row h-100 w-100 editor--overlay\"><div data-region=\"editor\" class=\"col-lg-12 pt-2\"></div></div><div class=\"row device--overlay\"><div data-region=\"device\" class=\"col-lg-12\"></div><div data-region=\"selector\" class=\"col-lg-12 pt-5\"></div></div>");;return buf.join("");
};
},{"jade/runtime":84}],50:[function(require,module,exports){
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
},{"jade/runtime":84}],51:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<input type=\"hidden\" name=\"type\" value=\"macro\" readonly=\"readonly\"/><div data-region=\"macro\" class=\"col-lg-12\"></div><div class=\"col-lg-12\"><hr/></div><div data-region=\"controls\" class=\"col-lg-12\"></div>");;return buf.join("");
};
},{"jade/runtime":84}],52:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<p class=\"lead text-center\">Macros<br/><small>Execute keystrokes in a specific sequence</small></p><small style=\"font-size: 1rem;\" class=\"text-muted d-flex flex-row justify-content-center align-items-center\"><div class=\"fa fa-fw fa-question-circle-o mr-1 d-flex flex-column\"></div><div class=\"d-flex flex-row\"><span>Use the keys below, or click&nbsp;</span><span class=\"text-danger\"><i class=\"fa fa-fw fa-circle text-danger\"></i> record&nbsp;</span>&nbsp;to start typing</div></small>");;return buf.join("");
};
},{"jade/runtime":84}],53:[function(require,module,exports){
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
},{"jade/runtime":84}],54:[function(require,module,exports){
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



},{"./templates/text_editor":53}],55:[function(require,module,exports){
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



},{}],56:[function(require,module,exports){
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



},{"../macro/entities":28}],57:[function(require,module,exports){
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



},{"./data":55,"./entities":56}],58:[function(require,module,exports){
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



},{"./views/layout":59,"hn_routing/lib/route":82}],59:[function(require,module,exports){
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



},{"./templates/layout":60}],60:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row h-100\"><div class=\"col-lg-12 text-center\"><p class=\"lead\">AstroKey</p><hr/><p class=\"lead\">Connect an AstroKey device to get started</p><hr/><a href=\"#device\" class=\"btn btn-outline-primary\">DEVICE</a></div></div>");;return buf.join("");
};
},{"jade/runtime":84}],61:[function(require,module,exports){
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



},{"./dashboard/route":35,"./factory":57,"./home/route":58,"hn_routing/lib/router":83}],62:[function(require,module,exports){
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



},{}],63:[function(require,module,exports){

},{}],64:[function(require,module,exports){
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



},{}],65:[function(require,module,exports){
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



},{"./bindBase":64}],66:[function(require,module,exports){
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



},{}],67:[function(require,module,exports){
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



},{}],68:[function(require,module,exports){
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



},{}],69:[function(require,module,exports){
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



},{}],70:[function(require,module,exports){
Marionette.Decorator = require('./decorator');

Marionette.View.prototype.serializeModel = function() {
  if (!this.model) {
    return {};
  } else if (this.model.decorator) {
    return this.model.decorator.decorate(this.model);
  }
  return _.clone(this.model.attributes);
};



},{"./decorator":71}],71:[function(require,module,exports){
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



},{}],72:[function(require,module,exports){
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



},{"./model":74}],73:[function(require,module,exports){
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



},{"./service":75,"./views/flashList":76}],74:[function(require,module,exports){
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



},{}],75:[function(require,module,exports){
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



},{"./collection":72}],76:[function(require,module,exports){
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



},{"./templates/flash_child":77}],77:[function(require,module,exports){
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
},{"jade/runtime":84}],78:[function(require,module,exports){
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



},{"./view":80}],79:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (modalCss) {
buf.push("<div role=\"document\" data-region=\"modal-content\"" + (jade.cls([modalCss], [true])) + "></div>");}.call(this,"modalCss" in locals_for_with?locals_for_with.modalCss:typeof modalCss!=="undefined"?modalCss:undefined));;return buf.join("");
};
},{"jade/runtime":84}],80:[function(require,module,exports){
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



},{"./modal_template":79}],81:[function(require,module,exports){
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



},{}],82:[function(require,module,exports){
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



},{}],83:[function(require,module,exports){
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



},{}],84:[function(require,module,exports){
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
},{"fs":63}],85:[function(require,module,exports){
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



},{"./templates/keyboard_abstract":23}],86:[function(require,module,exports){
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



},{"./templates/keyboard_full":24,"lib/views/keyboard_abstract":85}],87:[function(require,module,exports){
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



},{"lib/views/keyboard_abstract":85}],88:[function(require,module,exports){
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



},{"lib/views/keyboard_abstract":85}],89:[function(require,module,exports){
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



},{"lib/views/keyboard_abstract":85}],90:[function(require,module,exports){
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



},{"./templates/keyboard_numpad":25,"lib/views/keyboard_abstract":85}],91:[function(require,module,exports){
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



},{"./templates/keyboard_selector":26,"lib/views/keyboard_full":86,"lib/views/keyboard_function":87,"lib/views/keyboard_media":88,"lib/views/keyboard_nav":89,"lib/views/keyboard_numpad":90,"lib/views/simple_nav":92}],92:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9hcHAuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvYXBwbGljYXRpb24vdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2JlaGF2aW9ycy9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9iZWhhdmlvcnMva2V5Ym9hcmRDb250cm9scy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc2VsZWN0YWJsZUNoaWxkLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2JlaGF2aW9ycy9zb3J0YWJsZUNoaWxkLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2JlaGF2aW9ycy9zb3J0YWJsZUxpc3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC92aWV3cy9sYXlvdXQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC92aWV3cy90ZW1wbGF0ZXMvYWJvdXQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9jb21wb25lbnRzL2hlYWRlci92aWV3cy9sYXlvdXQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9oZWFkZXIvdmlld3MvdGVtcGxhdGVzL2hlYWRlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29uZmlnL2NvcnMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29uZmlnL2luZGV4LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2NvbmZpZy9qd3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29uZmlnL21hcmlvbmV0dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29uZmlnL3dpbmRvdy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tYW5pZmVzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2tleS9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2tleS9mYWN0b3J5LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMva2V5L2tleXMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QvdGVtcGxhdGVzL2tleWJvYXJkX2Fic3RyYWN0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9mdWxsL3RlbXBsYXRlcy9rZXlib2FyZF9mdWxsLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQvdGVtcGxhdGVzL2tleWJvYXJkX251bXBhZC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3IvdGVtcGxhdGVzL2tleWJvYXJkX3NlbGVjdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21hY3JvL2RlZmF1bHRfbWFjcm9zLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZW50aXRpZXMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21hY3JvL2ZhY3RvcnkuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC9yb3V0ZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2RldmljZUxheW91dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvclNlbGVjdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvZWRpdG9yV3JhcHBlci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2tleVNlbGVjdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvbWFjcm9FZGl0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy9tYWNyb0xpc3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZGV2aWNlX2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZGV2aWNlX3N0YXR1cy5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZWRpdG9yX3NlbGVjdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfd3JhcHBlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvaGVscF92aWV3LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9rZXlfY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL21hY3JvX2VkaXRvci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZW1wdHkuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL3RleHRfZWRpdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RleHRFZGl0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2RhdGEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2VudGl0aWVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9mYWN0b3J5LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3JvdXRlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3ZpZXdzL2xheW91dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vaG9tZS92aWV3cy90ZW1wbGF0ZXMvbGF5b3V0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvdXNiL3NlcnZpY2UuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcmVzb2x2ZS9lbXB0eS5qcyIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9iaW5kQmFzZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvYmluZElucHV0cy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvZmxhc2hlcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9obl9iZWhhdmlvcnMvbGliL3N1Ym1pdEJ1dHRvbi5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvdG9vbHRpcHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9obl9lbnRpdGllcy9saWIvY29uZmlnLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fZW50aXRpZXMvbGliL2RlY29yYXRvci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9jb2xsZWN0aW9uLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9tb2RlbC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9zZXJ2aWNlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3ZpZXdzL2ZsYXNoTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi92aWV3cy90ZW1wbGF0ZXMvZmxhc2hfY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fbW9kYWwvbGliL2Fic3RyYWN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fbW9kYWwvbGliL21vZGFsX3RlbXBsYXRlLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX21vZGFsL2xpYi92aWV3LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fb3ZlcmxheS9saWIvY29tcG9uZW50LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9obl9yb3V0aW5nL2xpYi9yb3V0ZXIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0L2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVsbC9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Z1bmN0aW9uL2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfbWVkaWEvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9uYXYvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9zZWxlY3Rvci9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL3NpbXBsZV9uYXYvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDR0EsSUFBQSxXQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3dCQUVKLFdBQUEsR0FDRTtJQUFBLGNBQUEsRUFBZ0IsWUFBaEI7Ozt3QkFHRixVQUFBLEdBQVksU0FBQTtJQUdWLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFnQyxDQUFDLE9BQWpDLENBQXlDLE9BQXpDO0lBR0EsUUFBUSxD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkEsTUFBTSxDQUFDLE9BQVAsR0FBaUI7RUFDZjtJQUNFLEtBQUEsRUFBTyxJQURUO0lBRUUsS0FBQSxFQUFP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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFRLFNBQVIsQ0FBRCxDQUExQjtXQUNBLEVBQUUsQ0FBQyxJQUFILENBQUE7RUFKYzs7OztHQXJCTSxFQUFFLENBQUM7O0FBNkIzQixNQUFNLENBQUMsT0FBUCxHQUFpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbiMgQXBwbGljYXRpb24gY2xhc3MgZGVmaW5pdGlvblxuIyBNYW5hZ2VzIGxpZmVjeWNsZSBhbmQgYm9vdHN0cmFwcyBhcHBsaWNhdGlvblxuY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb0V2ZW50czpcbiAgICAnYXBwIHJlZGlyZWN0JzogJ3JlZGlyZWN0VG8nXG5cbiAgIyBJbnZva2VkIGFmdGVyIGNvbnN0cnVjdG9yXG4gIGluaXRpYWxpemU6IC0+XG5cbiAgICAjIFN0YXJ0cyBIZWFkZXIgQ29tcG9uZW50XG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnaGVhZGVyJykudHJpZ2dlcigncmVzZXQnKVxuXG4gICAgIyBTdGFydHMgSGVuc29uLmpzIENvbXBvbmVudHNcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdicmVhZGNydW1iJykudHJpZ2dlcigncmVhZHknKVxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ292ZXJsYXknKS50cmlnZ2VyKCdyZWFkeScpXG4gICAgQG9uUmVhZHkoKVxuICAgIHJldHVybiB0cnVlXG5cbiAgIyBTdGFydHMgdGhlIGFwcGxpY2F0aW9uXG4gICMgU3RhcnRzIEJhY2tib25lLmhpc3RvcnkgKGVuYWJsZXMgcm91dGluZylcbiAgIyBBbmQgaW5pdGlhbGl6ZXMgc2lkZWJhciBtb2R1bGVcbiAgb25SZWFkeTogLT5cbiAgICBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KClcblxuICAjIFJlZGlyZWN0aW9uIGludGVyZmFjZVxuICAjIFVzZWQgYWNjcm9zcyB0aGUgYXBwbGljYXRpb24gdG8gcmVkaXJlY3RcbiAgIyB0byBzcGVjaWZpYyB2aWV3cyBhZnRlciBzcGVjaWZpYyBhY3Rpb25zXG4gIHJlZGlyZWN0VG86IChyb3V0ZSkgLT5cbiAgICB3aW5kb3cubG9jYXRpb24gPSByb3V0ZVxuICAgIHJldHVybiB0cnVlXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uXG4iLCJcbiMgQXBwbGljYXRpb25MYXlvdXQgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3IHRvIG1hbmFnZVxuIyB0b3AtbGV2ZWwgYXBwbGljYXRpb24gcmVnaW9uc1xuY2xhc3MgQXBwbGljYXRpb25MYXlvdXQgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgZWw6ICdib2R5J1xuXG4gIHRlbXBsYXRlOiBmYWxzZVxuXG4gIHJlZ2lvbnM6XG4gICAgaGVhZGVyOiAgICAgJ1thcHAtcmVnaW9uPWhlYWRlcl0nXG4gICAgb3ZlcmxheTogICAgJ1thcHAtcmVnaW9uPW92ZXJsYXldJ1xuICAgIGZsYXNoOiAgICAgICdbYXBwLXJlZ2lvbj1mbGFzaF0nXG4gICAgbW9kYWw6ICAgICAgJ1thcHAtcmVnaW9uPW1vZGFsXSdcbiAgICBtYWluOiAgICAgICAnW2FwcC1yZWdpb249bWFpbl0nXG5cbiMgIyAjICMgI1xuXG4jIEV4cG9ydHMgaW5zdGFuY2Vcbm1vZHVsZS5leHBvcnRzID0gbmV3IEFwcGxpY2F0aW9uTGF5b3V0KCkucmVuZGVyKClcbiIsIlxuIyBNYXJpb25ldHRlIEJlaGF2aW9yIE1hbmlmZXN0XG5tb2R1bGUuZXhwb3J0cyA9XG4gIFN1Ym1pdEJ1dHRvbjogICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvc3VibWl0QnV0dG9uJ1xuICBGbGFzaGVzOiAgICAgICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL2ZsYXNoZXMnXG4gIE1vZGVsRXZlbnRzOiAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMnXG4gIEJpbmRJbnB1dHM6ICAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvYmluZElucHV0cydcbiAgVG9vbHRpcHM6ICAgICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi90b29sdGlwcydcbiAgU2VsZWN0YWJsZUNoaWxkOiAgcmVxdWlyZSAnLi9zZWxlY3RhYmxlQ2hpbGQnXG4gIEtleWJvYXJkQ29udHJvbHM6ICByZXF1aXJlICcuL2tleWJvYXJkQ29udHJvbHMnXG4gIFNvcnRhYmxlQ2hpbGQ6ICAgIHJlcXVpcmUgJy4vc29ydGFibGVDaGlsZCdcbiAgU29ydGFibGVMaXN0OiAgICAgcmVxdWlyZSAnLi9zb3J0YWJsZUxpc3QnXG4iLCIjIE5PVEUgLSB0aGlzIGJlaGF2aW9yIGhhcyBub3QgYmVlbiB0ZXN0ZWQgd2l0aCBtdWx0aXBsZSB2aWV3cyBzaW11bHRhbmVvdXNseVxuXG4jIEVuYWJsZXMgdmlldyBjYWxsYmFja3MgdG8gYmUgdHJpZ2dlcmVkIGJ5IGtleWJvYXJkIGlucHV0XG5jbGFzcyBLZXlib2FyZENvbnRyb2xzIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGtleUV2ZW50cyA9IEBvcHRpb25zLmtleUV2ZW50c1xuXG4gIG9uUmVuZGVyOiAtPlxuICAgIEBhZGRFdmVudExpc3RlbmVyKClcblxuICBvbkJlZm9yZURlc3Ryb3k6IC0+XG4gICAgQHJlbW92ZUV2ZW50TGlzdGVuZXIoKVxuXG4gIGtleUFjdGlvbjogKGUpID0+XG5cbiAgICAjIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgIyBJc29sYXRlcyB0aGUga2V5c3Ryb2tlXG4gICAgIyBrZXlDb2RlID0gZS5rZXlDb2RlXG5cbiAgICByZXR1cm4gQHZpZXcudHJpZ2dlck1ldGhvZCgna2V5OmFjdGlvbicsIGUpXG5cbiAgICAjIERvIG5vdGhpbmcgaWYgdGhlcmUgaXNuJ3QgYW5cbiAgICAjIGV2ZW50IGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5c3Ryb2tlXG4gICAgIyByZXR1cm4gdW5sZXNzIEBrZXlFdmVudHNba2V5Q29kZV1cblxuICAgICMgUHJldmVudHMgYW55IGRlZmF1bHQgYWN0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5Y29kZVxuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgIyBUcmlnZ2VycyB0aGUgZXZlbnQgYXNzb2NpYXRlZCB3aXRoXG4gICAgIyB0aGUga2V5c3Ryb2tlIG9uIHRoZSB2aWV3IGluc3RhbmNlXG4gICAgIyByZXR1cm4gQHZpZXcudHJpZ2dlck1ldGhvZChAa2V5RXZlbnRzW2tleUNvZGVdKVxuXG4gIGFkZEV2ZW50TGlzdGVuZXI6IC0+XG4gICAgJChkb2N1bWVudCkub24gJ2tleWRvd24nLCBAa2V5QWN0aW9uXG4gICAgJChkb2N1bWVudCkub24gJ2tleXVwJywgQGtleUFjdGlvblxuICAgICMgJChkb2N1bWVudCkub24gJ2tleXByZXNzJywgQGtleUFjdGlvblxuICAgICMgUmFkaW8uY2hhbm5lbCgnZmxhc2gnKS50cmlnZ2VyKCdhZGQnLCB7IGNvbnRleHQ6ICdpbmZvJywgdGltZW91dDogMTUwMCwgbWVzc2FnZTogJ0tleWJvYXJkIGNvbnRyb2xzIGVuYWJsZWQnfSlcblxuICByZW1vdmVFdmVudExpc3RlbmVyOiAtPlxuICAgICQoZG9jdW1lbnQpLm9mZiAna2V5ZG93bicsIEBrZXlBY3Rpb25cbiAgICAkKGRvY3VtZW50KS5vZmYgJ2tleXVwJywgQGtleUFjdGlvblxuICAgICMgJChkb2N1bWVudCkub2ZmICdrZXlwcmVzcycsIEBrZXlBY3Rpb25cbiAgICAjIFJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykudHJpZ2dlcignYWRkJywgeyBjb250ZXh0OiAnaW5mbycsIHRpbWVvdXQ6IDE1MDAsIG1lc3NhZ2U6ICdLZXlib2FyZCBjb250cm9scyBkaXNhYmxlZCd9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZENvbnRyb2xzXG4iLCJcbmNsYXNzIFNlbGVjdGFibGVDaGlsZCBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICBjc3M6XG4gICAgYWN0aXZlOiAnYWN0aXZlJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2snOiAgJ29uQ2xpY2snXG5cbiAgbW9kZWxFdmVudHM6XG4gICAgJ3NlbGVjdGVkJzogJ29uQ2xpY2snXG5cbiAgIyBTZWxlY3RzIGFjdGl2ZU1vZGVsIG9uIHJlbmRlclxuICBvblJlbmRlcjogLT5cbiAgICByZXR1cm4gdW5sZXNzIEBvcHRpb25zLnNldEFjdGl2ZVxuXG4gICMgSW52b2tlZCB3aGVuIGNsaWNrZWRcbiAgb25DbGljazogKGUpIC0+XG4gICAgIyBCeXBhc3MgYmVoYXZpb3Igd2l0aCBjdXN0b20gb25DbGljayBjYWxsYmFja1xuICAgIHJldHVybiBAdmlldy5vbkNsaWNrKGUpIGlmIEB2aWV3Lm9uQ2xpY2tcblxuICAgICMgUHJldmVudCBkb3VibGUtY2xpY2sgdW5sZXNzIHNwZWNpZmljZWRcbiAgICBlPy5wcmV2ZW50RGVmYXVsdCgpIHVubGVzcyBAb3B0aW9ucy5kb3VibGVDbGlja1xuXG4gICAgIyBIYW5kbGVzIGRlLXNlbGVjdGlvblxuICAgIGlmIEBvcHRpb25zLmRlc2VsZWN0ICYmIEAkZWwuaGFzQ2xhc3MoQGNzcy5hY3RpdmUpXG4gICAgICBAJGVsLnJlbW92ZUNsYXNzKEBjc3MuYWN0aXZlKVxuICAgICAgcmV0dXJuIEB2aWV3LnRyaWdnZXJNZXRob2QgJ2Rlc2VsZWN0ZWQnXG5cbiAgICAjIFJldHVybiBpZiBlbGVtZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZFxuICAgIHJldHVybiBpZiBAJGVsLmhhc0NsYXNzKEBjc3MuYWN0aXZlKVxuXG4gICAgIyBQcmV2ZW50IGRlYWZ1bHQgYW5kIHRyaWdnZXIgc2VsZWN0ZWRcbiAgICBlPy5wcmV2ZW50RGVmYXVsdCgpXG4gICAgQHZpZXcudHJpZ2dlck1ldGhvZCAnc2VsZWN0ZWQnXG4gICAgQCRlbC5hZGRDbGFzcyhAY3NzLmFjdGl2ZSkuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhAY3NzLmFjdGl2ZSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0YWJsZUNoaWxkXG4iLCJcbiMgU29ydGFibGVDaGlsZCBCZWhhdmlvciBkZWZpbml0aW9uXG4jIFdvcmtzIHdpdGggU29ydGFibGVMaXN0IEJlaGF2aW9yXG5jbGFzcyBTb3J0YWJsZUNoaWxkIGV4dGVuZHMgTW4uQmVoYXZpb3JcblxuICBldmVudHM6XG4gICAgJ3NvcnRlZCc6ICdvblNvcnRlZCdcblxuICBvblNvcnRlZDogKGUsIG9yZGVyKSAtPlxuICAgIEB2aWV3Lm1vZGVsLnNldCgnb3JkZXInLCBvcmRlcilcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU29ydGFibGVDaGlsZFxuIiwiXG4jIFNvcnRhYmxlTGlzdCBCZWhhdmlvciBkZWZpbml0aW9uXG4jIFdvcmtzIHdpdGggU29ydGFibGVDaGlsZCBCZWhhdmlvclxuY2xhc3MgU29ydGFibGVMaXN0IGV4dGVuZHMgTW4uQmVoYXZpb3JcblxuICAjIERlZmluZXMgdGhlIHJlb3JkZXJDb2xsZWN0aW9uIG1ldGhvZCBvbiB0aGUgdmlld1xuICAjIHRvIHdoaWNoIHRoZSBiZWhhdmlvciBpcyBhc3NpZ25lZFxuICBpbml0aWFsaXplOiAtPlxuICAgIEB2aWV3LnJlb3JkZXJDb2xsZWN0aW9uID0gPT4gQHJlb3JkZXJDb2xsZWN0aW9uKClcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgSW5pdGlhbGl6ZXMgU29ydGFibGUgY29udGFpbmVyXG4gICAgU29ydGFibGUuY3JlYXRlIEB2aWV3LmVsLFxuICAgICAgaGFuZGxlOiAgICAgICBAb3B0aW9ucy5oYW5kbGUgfHwgJy5zb3J0YWJsZSdcbiAgICAgIGFuaW1hdGlvbjogICAgQG9wdGlvbnMuYW5pbWF0aW9uIHx8IDI1MFxuICAgICAgb25FbmQ6IChlKSA9PiBAcmVvcmRlckNvbGxlY3Rpb24oKVxuXG4gICMgcmVvcmRlckNvbGxlY3Rpb25cbiAgIyBJbnZva2VkIGFmdGVyIHNvcnRpbmcgaGFzIGNvbXBsZXRlZFxuICByZW9yZGVyQ29sbGVjdGlvbjogPT5cblxuICAgICMgVHJpZ2dlcnMgb3JkZXIgZXZlbnRzIG9uIENvbGxlY3Rpb25WaWV3IGNoaWxkVmlldyAkZWxzXG4gICAgb3JkZXIgPSAxXG4gICAgZm9yIGVsIGluIEB2aWV3LiRlbFswXS5jaGlsZHJlblxuICAgICAgJChlbCkudHJpZ2dlcignc29ydGVkJyxvcmRlcilcbiAgICAgIG9yZGVyKytcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU29ydGFibGVMaXN0XG4iLCJBYm91dFZpZXcgID0gcmVxdWlyZSAnLi92aWV3cy9sYXlvdXQnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBBYm91dENvbXBvbmVudCBleHRlbmRzIHJlcXVpcmUgJ2huX21vZGFsL2xpYi9hYnN0cmFjdCdcblxuICByYWRpb0V2ZW50czpcbiAgICAnYWJvdXQgc2hvdyc6ICdzaG93QWJvdXQnXG5cbiAgc2hvd0Fib3V0OiAtPlxuICAgIGFib3V0VmlldyA9IG5ldyBBYm91dFZpZXcoKVxuICAgIEBzaG93TW9kYWwoYWJvdXRWaWV3LCB7IHNpemU6ICdsYXJnZScgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQWJvdXRDb21wb25lbnRcbiIsIlxuIyBBYm91dFZpZXcgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgQWJvdXRWaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvYWJvdXQnXG4gIGNsYXNzTmFtZTogJ21vZGFsLWNvbnRlbnQnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFib3V0Vmlld1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgdGV4dC1jZW50ZXJcXFwiPjxoNSBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPkFCT1VUPC9oNT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgdGV4dC1jZW50ZXJcXFwiPjxoci8+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48cCBjbGFzcz1cXFwibGVhZFxcXCI+PGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL0FzdHJvS2V5XFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+IEFzdHJvS2V5PC9hPiBpcyBhbiBvcGVuLXNvdXJjZSBwbGF0Zm9ybSBmb3IgcmUtcHJvZ3JhbW1hYmxlIFVTQiBrZXlib2FyZHMuPC9wPjxwPkFzdHJvS2V5IHByb3ZpZGVzIGFuIGludHVpdGl2ZSBpbnRlcmZhY2UgYW55Ym9keSBjYW4gdXNlIHRvIGF1dG9tYXRlIGJhc2ljIGtleWJvYXJkIGFjdGlvbnMuPC9wPjxwPlNpbXBseSBkcmFnIGFuZCBkcm9wIGtleWJvYXJkIGtleXMgdG8gY29uc3RydWN0IHlvdXIgZGVzaXJlZCBzZXF1ZW5jZSAtIEFzdHJvS2V5IGRvZXMgdGhlIHJlc3QuPC9wPjxwPkl0J3MgdGhhdCBlYXN5LjwvcD48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgdGV4dC1jZW50ZXJcXFwiPjxoci8+PHA+QnVpbHQgYnkmbmJzcDs8YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vQWFyb25QZXJsXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+QWFyb24gUGVybDwvYT4mbmJzcDthbmQmbmJzcDs8YSBocmVmPVxcXCJodHRwOi8vYWVrcy5jb1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPkFsZXhhbmRlciBTY2h3YXJ0emJlcmc8L2E+Jm5ic3A7Zm9yJm5ic3A7PGEgaHJlZj1cXFwiaHR0cHM6Ly9yY29zLmlvL1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPlJDT1MuPC9hPjwvcD48L2Rpdj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiTGF5b3V0VmlldyA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jIEhlYWRlclNlcnZpY2UgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgYmFzaWMgc2VydmljZSBmb3IgbWFuYWdpbmcgYXBwbGljYXRpb25cbiMgaGVhZGVyIHN0YXRlLiBEaXNwbGF5cyB0aGUgYXV0aGVudGljYXRlZCB1c2VyLFxuIyBvciB0aGUgJ3VuYXV0aGVudGljYXRlZCcgbWVzc2FnZSBpZiBub25lIGlzIGRlZmluZWRcbmNsYXNzIEhlYWRlclNlcnZpY2UgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjb250YWluZXIgPSBAb3B0aW9ucy5jb250YWluZXJcblxuICByYWRpb0V2ZW50czpcbiAgICAnaGVhZGVyIHJlc2V0JzogJ3Jlc2V0J1xuXG4gIHJlc2V0OiAtPlxuICAgIEBjb250YWluZXIuc2hvdyBuZXcgTGF5b3V0VmlldygpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclNlcnZpY2VcbiIsIlxuIyBIZWFkZXJWaWV3IGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIHNpbWJwbGUgdmlldyBmb3IgZGlzcGxheWluZyB0aGVcbiMgaGVhZGVyIG9mIHRoZSBhcHBsaWNhdGlvbi4gVGhlIGhlYWRlciBkaXNwbGF5c1xuIyB0aGUgYXV0aGVudGljYXRlZCB1c2VyIGFuZFxuIyBtYW5hZ2VzIHRvZ2dsaW5nIHRoZSBTaWRlYmFyQ29tcG9uZW50J3Mgdmlld1xuY2xhc3MgSGVhZGVyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvaGVhZGVyJ1xuICBjbGFzc05hbWU6ICduYXZiYXIgZml4ZWQtdG9wIG5hdmJhci1kYXJrIGJnLWRhcmsnXG4gIHRhZ05hbWU6ICduYXYnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclZpZXdcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcIm5hdmJhci1icmFuZCB0aXRsZVxcXCI+QVNUUk9LRVk8L2Rpdj48dWwgY2xhc3M9XFxcIm5hdmJhci1uYXYgbWwtYXV0b1xcXCI+PGxpIGNsYXNzPVxcXCJuYXYtaXRlbVxcXCI+PGEgc3R5bGU9XFxcImN1cnNvcjpwb2ludGVyXFxcIiBvbkNsaWNrPVxcXCJSYWRpby5jaGFubmVsKCdhYm91dCcpLnRyaWdnZXIoJ3Nob3cnKTtcXFwiIGNsYXNzPVxcXCJuYXYtbGlua1xcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLWxnIGZhLXF1ZXN0aW9uLWNpcmNsZS1vXFxcIj48L2k+PC9hPjwvbGk+PC91bD5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiIyBTdXBwb3J0IGZvciBjcm9zcy1kb21haW4gcmVxdWVzdHMgaW4gQmFja2JvbmUuanMgLSB1c3VhbGx5IHZlcmJvdGVuLlxuIyBUaGlzIGFsbG93cyB0aGUgZGV2IHNlcnZlciBhdCBsb2NhbC5jb3J0aWNhbG1ldHJpY3MuY29tOjgwODAgdG8gY29tbXVuaWNhdGUgd2l0aCBkZXYuY29ydGljYWxtZXRyaWNzLmNvbTozMDAwIChjbS1ub2RlLWFwcClcblxuY3Jvc3NEb21haW5Sb290ID0gJ2h0dHA6Ly8xOTIuMTY4LjMzLjMzOjMwMDAnICMgREVWIE9OTFlcblxucHJveGllZFN5bmMgPSBCYWNrYm9uZS5zeW5jXG5cbkJhY2tib25lLnN5bmMgPSAobWV0aG9kLCBtb2RlbCwgb3B0aW9ucyA9IHt9KSA9PlxuXG4gIGlmICFvcHRpb25zLnVybFxuICAgIG9wdGlvbnMudXJsID0gY3Jvc3NEb21haW5Sb290ICsgXy5yZXN1bHQobW9kZWwsICd1cmwnKSB8fCB1cmxFcnJvcigpXG5cbiAgZWxzZSBpZiBvcHRpb25zLnVybC5zdWJzdHJpbmcoMCwgNikgIT0gY3Jvc3NEb21haW5Sb290LnN1YnN0cmluZygwLCA2KVxuICAgIG9wdGlvbnMudXJsID0gY3Jvc3NEb21haW5Sb290ICsgb3B0aW9ucy51cmxcblxuICBpZiAhb3B0aW9ucy5jcm9zc0RvbWFpblxuICAgIG9wdGlvbnMuY3Jvc3NEb21haW4gPSB0cnVlXG5cbiAgaWYgIW9wdGlvbnMueGhyRmllbGRzXG4gICAgb3B0aW9ucy54aHJGaWVsZHMgPSB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9XG5cbiAgcmV0dXJuIHByb3hpZWRTeW5jKG1ldGhvZCwgbW9kZWwsIG9wdGlvbnMpXG4iLCIjIEFwcCBjb25maWd1cmF0aW9uIG1hbmlmZXN0XG5yZXF1aXJlICcuL3dpbmRvdydcbnJlcXVpcmUgJy4vand0J1xucmVxdWlyZSAnLi9jb3JzJ1xucmVxdWlyZSAnLi9tYXJpb25ldHRlJ1xuIiwiIyBBamF4IEpXVCBTaGltXG4kLmFqYXhTZXR1cFxuICBiZWZvcmVTZW5kOiAoeGhyKSAtPlxuICAgIHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJylcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsICdKV1QgJyArIHRva2VuKSBpZiB0b2tlblxuICAgIHJldHVyblxuIiwiIyBNYXJpb25ldHRlLkJlaGF2aW9ycyBjb25maWd1cmF0aW9uXG5NYXJpb25ldHRlLkJlaGF2aW9ycy5iZWhhdmlvcnNMb29rdXAgPSAtPiByZXF1aXJlICcuLi9iZWhhdmlvcnMnXG4iLCIjIEFsaWFzZXMgQmFja2JvbmUuUmFkaW8gdG8gd2luZG93LlJhZGlvXG53aW5kb3cuUmFkaW8gPSBCYWNrYm9uZS5SYWRpb1xuIiwiIyBUaGlzIGZpbGUgZGVmaW5lcyBhIG1hbmlmZXN0IGZvciB0aGUgY2xpZW50IGFwcGxpY2F0aW9uLlxuIyBUaGlzIGluY2x1ZGVzIGNvbmZpZ3VyYXRpb24sIFNlcnZpY2VzLCBDb21wb25lbnRzLCBNb2R1bGVzXG4jIGFuZCB0aGUgQXBwbGljYXRpb24gc2luZ2xldG9uIGluc3RhbmNlLlxuXG4jICMgIyAjICNcblxuIyBBcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uIG1hbmlmZXN0XG5yZXF1aXJlICcuL2NvbmZpZydcblxuIyBBcHBsaWNhdGlvbiBjbGFzcyBkZWZpbml0aW9uICYgQXBwIExheW91dFxuQXBwICAgICAgID0gcmVxdWlyZSAnLi9hcHAnXG5BcHBMYXlvdXQgPSByZXF1aXJlICcuL2FwcGxpY2F0aW9uL3ZpZXdzL2xheW91dCdcblxuIyBIZW5zb24gRW50aXRpZXNcbnJlcXVpcmUgJ2huX2VudGl0aWVzL2xpYi9jb25maWcnXG5cbiMgIyAjICMgI1xuXG4jIENvbXBvbmVudHMgYXJlIHJvdXRlbGVzcyBzZXJ2aWNlcyB3aXRoIHZpZXdzIHRoYXQgYXJlXG4jIGFjY2Vzc2libGUgYW55d2hlcmUgaW4gdGhlIGFwcGxpY2F0aW9uXG4jIFVzZWQgdG8gbWFuYWdlIHRoZSBoZWFkZXIsIHNpZGViYXIsIGZsYXNoLCBhbmQgY29uZmlybSBVSSBlbGVtZW50c1xuXG4jIEhlbnNvbi5qcyBDb21wb25lbnRzXG5IZWFkZXJDb21wb25lbnQgICAgID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL2hlYWRlci9jb21wb25lbnQnXG5BYm91dENvbXBvbmVudCAgICAgID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL2Fib3V0L2NvbXBvbmVudCdcbk92ZXJsYXlDb21wb25lbnQgICAgPSByZXF1aXJlICdobl9vdmVybGF5L2xpYi9jb21wb25lbnQnXG5GbGFzaENvbXBvbmVudCAgICAgID0gcmVxdWlyZSAnaG5fZmxhc2gvbGliL2NvbXBvbmVudCdcbm5ldyBIZWFkZXJDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5oZWFkZXIgfSlcbm5ldyBPdmVybGF5Q29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQub3ZlcmxheSB9KVxubmV3IEZsYXNoQ29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQuZmxhc2ggfSlcbm5ldyBBYm91dENvbXBvbmVudCh7IGNvbnRhaW5lcjogQXBwTGF5b3V0Lm1vZGFsIH0pXG5cbiMgIyAjICMgI1xuXG4jIFNlcnZpY2VzXG5yZXF1aXJlKCcuL21vZHVsZXMvdXNiL3NlcnZpY2UnKVxuXG4jIEZhY3Rvcmllc1xucmVxdWlyZSgnLi9tb2R1bGVzL2tleS9mYWN0b3J5JylcbnJlcXVpcmUoJy4vbW9kdWxlcy9tYWNyby9mYWN0b3J5JylcblxuIyAjICMgIyAjXG5cbiMgTW9kdWxlc1xuIyBNb2R1bGVzIHJlcHJlc2VudCBjb2xsZWN0aW9ucyBvZiBlbmRwb2ludHMgaW4gdGhlIGFwcGxpY2F0aW9uLlxuIyBUaGV5IGhhdmUgcm91dGVzIGFuZCBlbnRpdGllcyAobW9kZWxzIGFuZCBjb2xsZWN0aW9ucylcbiMgRWFjaCByb3V0ZSByZXByZXNlbnRzIGFuIGVuZHBvaW50LCBvciAncGFnZScgaW4gdGhlIGFwcC5cbk1haW5Nb2R1bGUgPSByZXF1aXJlICcuL21vZHVsZXMvbWFpbi9yb3V0ZXInXG5uZXcgTWFpbk1vZHVsZSh7IGNvbnRhaW5lcjogQXBwTGF5b3V0Lm1haW4gfSlcblxuIyAjICMgIyAjICNcblxuIyBQYWdlIGhhcyBsb2FkZWQsIGRvY3VtZW50IGlzIHJlYWR5XG4kKGRvY3VtZW50KS5vbiAncmVhZHknLCA9PiBuZXcgQXBwKCkgIyBJbnN0YW50aWF0ZXMgbmV3IEFwcFxuIiwiXG4jIEtleU1vZGVsIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEtleU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6IHt9XG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogS2V5TW9kZWxcbiAgY29tcGFyYXRvcjogJ29yZGVyJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPVxuICBNb2RlbDogICAgICBLZXlNb2RlbFxuICBDb2xsZWN0aW9uOiBLZXlDb2xsZWN0aW9uXG4iLCJFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKVxuS2V5RGF0YSA9IHJlcXVpcmUoJy4va2V5cycpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlGYWN0b3J5IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAna2V5IG1vZGVsJzogICAgICAgJ2dldE1vZGVsJ1xuICAgICdrZXkgY29sbGVjdGlvbic6ICAnZ2V0Q29sbGVjdGlvbidcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjYWNoZWRDb2xsZWN0aW9uID0gbmV3IEVudGl0aWVzLkNvbGxlY3Rpb24oS2V5RGF0YSwgeyBwYXJzZTogdHJ1ZSB9KVxuXG4gIGdldE1vZGVsOiAoaWQpIC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uLmdldChpZClcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBAY2FjaGVkQ29sbGVjdGlvblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgS2V5RmFjdG9yeSgpXG4iLCJcbiMgS2V5IEpTT04gZGVmaW5pdGlvbnNcbm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHsgcm93OiAncjQnLCBrZXk6ICdgJywgc2hpZnQ6ICd+Jywga2V5Y29kZTogMTkyIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMScsIHNoaWZ0OiAnIScsIGtleWNvZGU6IDQ5IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMicsIHNoaWZ0OiAnQCcsIGtleWNvZGU6IDUwIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMycsIHNoaWZ0OiAnIycsIGtleWNvZGU6IDUxIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNCcsIHNoaWZ0OiAnJCcsIGtleWNvZGU6IDUyIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNScsIHNoaWZ0OiAnJScsIGtleWNvZGU6IDUzIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNicsIHNoaWZ0OiAnXicsIGtleWNvZGU6IDU0IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNycsIHNoaWZ0OiAnJicsIGtleWNvZGU6IDU1IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnOCcsIHNoaWZ0OiAnKicsIGtleWNvZGU6IDU2IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnOScsIHNoaWZ0OiAnKCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMCcsIHNoaWZ0OiAnKScsIGtleWNvZGU6IDQ4IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnLScsIHNoaWZ0OiAnXycsIGtleWNvZGU6IDE4OSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJz0nLCBzaGlmdDogJysnLCBrZXljb2RlOiAxODcgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICdCQUNLU1BBQ0UnLCBrZXljb2RlOiA4LCBjc3M6ICd3Ml8wJyB9XG5cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnVEFCJywga2V5Y29kZTogOSwgY3NzOiAndzFfNScsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdRJywga2V5Y29kZTogODEgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdXJywga2V5Y29kZTogODcgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdFJywga2V5Y29kZTogNjkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdSJywga2V5Y29kZTogODIgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdUJywga2V5Y29kZTogODQgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdZJywga2V5Y29kZTogODkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdVJywga2V5Y29kZTogODUgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdJJywga2V5Y29kZTogNzMgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdPJywga2V5Y29kZTogNzkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdQJywga2V5Y29kZTogODAgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdbJywgc2hpZnQ6ICd7Jywga2V5Y29kZTogMjE5IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnXScsIHNoaWZ0OiAnfScsIGtleWNvZGU6IDIyMSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ1xcXFwnLCBzaGlmdDogJ3wnLCBrZXljb2RlOiAyMjAsIGNzczogJ3cxXzUnIH1cblxuICAgIHsgcm93OiAncjInLCBrZXk6ICdDQVBTJywgY3NzOiAndzFfNzUnLCBrZXljb2RlOiAyMCwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0EnLCBrZXljb2RlOiA2NSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ1MnLCBrZXljb2RlOiA4MyB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0QnLCBrZXljb2RlOiA2OCB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0YnLCBrZXljb2RlOiA3MCB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0cnLCBrZXljb2RlOiA3MSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0gnLCBrZXljb2RlOiA3MiB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0onLCBrZXljb2RlOiA3NCB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0snLCBrZXljb2RlOiA3NSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ0wnLCBrZXljb2RlOiA3NiB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJzsnLCBzaGlmdDogJzonLCBrZXljb2RlOiAxODYgfVxuICAgIHsgcm93OiAncjInLCBrZXk6IFwiJ1wiLCBzaGlmdDogJ1wiJywga2V5Y29kZTogMjIyIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnUkVUVVJOJywgY3NzOiAndzJfMjUnLCBrZXljb2RlOiAxMywgc3BlY2lhbDogdHJ1ZSB9XG5cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnU0hJRlQnLCBjc3M6ICd3Ml8yNScsIGtleWNvZGU6IDE2LCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnWicsIGtleWNvZGU6IDkwIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnWCcsIGtleWNvZGU6IDg4IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnQycsIGtleWNvZGU6IDY3IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnVicsIGtleWNvZGU6IDg2IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnQicsIGtleWNvZGU6IDY2IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnTicsIGtleWNvZGU6IDc4IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnTScsIGtleWNvZGU6IDc3IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnLCcsIHNoaWZ0OiAnPCcsIGtleWNvZGU6IDE4OCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJy4nLCBzaGlmdDogJz4nLCBrZXljb2RlOiAxOTAgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICcvJywgc2hpZnQ6ICc/Jywga2V5Y29kZTogMTkxIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnU0hJRlQnLCBjc3M6ICd3Ml83NScsIGtleWNvZGU6IDE2LCBzcGVjaWFsOiB0cnVlIH1cblxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdDVFJMJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxNywgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ00nLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDkxLCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnQUxUJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxOCwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ1NQQUNFJywgY3NzOiAnc3BhY2UnLCBrZXljb2RlOiAzMiwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0NUUkwnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE3LCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnTScsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTgsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdQJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiA5Mywgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0FMVCcsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTgsIHNwZWNpYWw6IHRydWUgfVxuXG4gICAgIyBOVU1QQUQgS0VZU1xuICAgIHsgcm93OiAnbnVtX3IwJywga2V5OiAnMCcsIGtleWNvZGU6IDQ5LCBjc3M6ICd3Ml8yNScgfVxuICAgIHsgcm93OiAnbnVtX3IwJywga2V5OiAnLicsIGtleWNvZGU6IDQ5IH1cblxuICAgIHsgcm93OiAnbnVtX3IxJywga2V5OiAnMScsIGtleWNvZGU6IDQ5IH1cbiAgICB7IHJvdzogJ251bV9yMScsIGtleTogJzInLCBrZXljb2RlOiA1MCB9XG4gICAgeyByb3c6ICdudW1fcjEnLCBrZXk6ICczJywga2V5Y29kZTogNTEgfVxuXG4gICAgeyByb3c6ICdudW1fcjInLCBrZXk6ICc0Jywga2V5Y29kZTogNTIgfVxuICAgIHsgcm93OiAnbnVtX3IyJywga2V5OiAnNScsIGtleWNvZGU6IDUzIH1cbiAgICB7IHJvdzogJ251bV9yMicsIGtleTogJzYnLCBrZXljb2RlOiA1NCB9XG5cbiAgICB7IHJvdzogJ251bV9yMycsIGtleTogJzcnLCBrZXljb2RlOiA1NSB9XG4gICAgeyByb3c6ICdudW1fcjMnLCBrZXk6ICc4Jywga2V5Y29kZTogNTYgfVxuICAgIHsgcm93OiAnbnVtX3IzJywga2V5OiAnOScsIGtleWNvZGU6IDU3IH1cblxuICAgIHsgcm93OiAnbnVtX3I0Jywga2V5OiAnQ0xFQVInLCBrZXljb2RlOiA0OCB9XG4gICAgeyByb3c6ICdudW1fcjQnLCBrZXk6ICcvJywga2V5Y29kZTogMTg5IH1cbiAgICB7IHJvdzogJ251bV9yNCcsIGtleTogJyonLCBrZXljb2RlOiAxODcgfVxuXG4gICAgeyByb3c6ICdudW1fY29sJywga2V5OiAnLScsIGtleWNvZGU6IDQ4IH1cbiAgICB7IHJvdzogJ251bV9jb2wnLCBrZXk6ICcrJywga2V5Y29kZTogMTg5LCBjc3M6ICdoMl8wJyB9XG4gICAgeyByb3c6ICdudW1fY29sJywga2V5OiAnRU5URVInLCBrZXljb2RlOiAxODcsIGNzczogJ2gyXzAnIH1cblxuICAgICMgRnVuY3Rpb24gS2V5c1xuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxJywga2V5Y29kZTogNDkgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YyJywga2V5Y29kZTogNTAgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YzJywga2V5Y29kZTogNTEgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y0Jywga2V5Y29kZTogNTIgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y1Jywga2V5Y29kZTogNTMgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y2Jywga2V5Y29kZTogNTQgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y3Jywga2V5Y29kZTogNTUgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y4Jywga2V5Y29kZTogNTYgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y5Jywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxMCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTEnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEyJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3IH1cblxuICAgICMgTWVkaWEgS2V5c1xuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXN0ZXAtYmFja3dhcmQnIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS1wbGF5JyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtc3RlcC1mb3J3YXJkJyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtdm9sdW1lLW9mZicgfVxuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXZvbHVtZS1kb3duJyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtdm9sdW1lLXVwJyB9XG5cbiAgICAjIE5hdmlnYXRpb24gS2V5c1xuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnUEdVUCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ1BHRE4nLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdFTkQnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdIT01FJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnTEVGVC1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi1sZWZ0JyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdVUC1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi11cCcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnRE9XTi1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi1kb3duJyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdSSUdIVC1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi1yaWdodCcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnSU5TJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnREVMJywga2V5Y29kZTogNDYgfVxuXG5dXG5cbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHIwKSB7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbigpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tcm93IHctMTAwXFxcIj5cIik7XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7XG59O1xuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxidXR0b25cIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleWNvZGVcIiwgb3B0cy5rZXljb2RlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1jbGljaz1cXFwia2V5XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEta2V5XCIsIG9wdHMua2V5LCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnYnRuJywnYnRuLW91dGxpbmUtbGlnaHQnLCdrZXlib2FyZC0ta2V5JyxvcHRzLmNzc10sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxvcHRzLmljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBvcHRzLmtleSAmJiBvcHRzLnNoaWZ0KVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJzaGlmdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLnNoaWZ0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxufVxuYnVmLnB1c2goXCI8L2J1dHRvbj5cIik7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tYm9keVxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJyMFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjA6dHlwZW9mIHIwIT09XCJ1bmRlZmluZWRcIj9yMDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChyMCwgcjEsIHIyLCByMywgcjQpIHtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKCl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImtleWJvYXJkLS1yb3cgdy0xMDBcXFwiPlwiKTtcbmJsb2NrICYmIGJsb2NrKCk7XG5idWYucHVzaChcIjwvZGl2PlwiKTtcbn07XG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGJ1dHRvblwiICsgKGphZGUuYXR0cihcImRhdGEta2V5Y29kZVwiLCBvcHRzLmtleWNvZGUsIHRydWUsIGZhbHNlKSkgKyBcIiBkYXRhLWNsaWNrPVxcXCJrZXlcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXlcIiwgb3B0cy5rZXksIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydidG4nLCdidG4tb3V0bGluZS1saWdodCcsJ2tleWJvYXJkLS1rZXknLG9wdHMuY3NzXSwgW251bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIG9wdHMuaWNvbilcbntcbmJ1Zi5wdXNoKFwiPGlcIiArIChqYWRlLmNscyhbJ2ZhJywnZmEtZncnLG9wdHMuaWNvbl0sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT5cIik7XG59XG5lbHNlXG57XG5pZiAoIG9wdHMua2V5ICYmIG9wdHMuc2hpZnQpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInNoaWZ0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG59XG5idWYucHVzaChcIjwvYnV0dG9uPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImtleWJvYXJkLS1ib2R5XFxcIj5cIik7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHI0XG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHI0O1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIyXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIyO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIxXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIxO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIwXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIwO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5idWYucHVzaChcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcInIwXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMDp0eXBlb2YgcjAhPT1cInVuZGVmaW5lZFwiP3IwOnVuZGVmaW5lZCxcInIxXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMTp0eXBlb2YgcjEhPT1cInVuZGVmaW5lZFwiP3IxOnVuZGVmaW5lZCxcInIyXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMjp0eXBlb2YgcjIhPT1cInVuZGVmaW5lZFwiP3IyOnVuZGVmaW5lZCxcInIzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMzp0eXBlb2YgcjMhPT1cInVuZGVmaW5lZFwiP3IzOnVuZGVmaW5lZCxcInI0XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yNDp0eXBlb2YgcjQhPT1cInVuZGVmaW5lZFwiP3I0OnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGNvbCwgcjAsIHIxLCByMiwgcjMsIHI0LCB1bmRlZmluZWQpIHtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKCl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImtleWJvYXJkLS1yb3cgdy0xMDBcXFwiPlwiKTtcbmJsb2NrICYmIGJsb2NrKCk7XG5idWYucHVzaChcIjwvZGl2PlwiKTtcbn07XG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGJ1dHRvblwiICsgKGphZGUuYXR0cihcImRhdGEta2V5Y29kZVwiLCBvcHRzLmtleWNvZGUsIHRydWUsIGZhbHNlKSkgKyBcIiBkYXRhLWNsaWNrPVxcXCJrZXlcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXlcIiwgb3B0cy5rZXksIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydidG4nLCdidG4tb3V0bGluZS1saWdodCcsJ2tleWJvYXJkLS1rZXknLG9wdHMuY3NzXSwgW251bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIG9wdHMuaWNvbilcbntcbmJ1Zi5wdXNoKFwiPGlcIiArIChqYWRlLmNscyhbJ2ZhJywnZmEtZncnLG9wdHMuaWNvbl0sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT5cIik7XG59XG5lbHNlXG57XG5pZiAoIG9wdHMua2V5ICYmIG9wdHMuc2hpZnQpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInNoaWZ0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG59XG5idWYucHVzaChcIjwvYnV0dG9uPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImtleWJvYXJkLS1ib2R5XFxcIj48ZGl2IGNsYXNzPVxcXCJkLWZsZXggZmxleC1yb3dcXFwiPjxkaXYgY2xhc3M9XFxcImQtZmxleCBmbGV4LWNvbHVtblxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByNFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByNDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByM1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMlxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMjtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuYnVmLnB1c2goXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJkLWZsZXggZmxleC1jb2x1bW5cXFwiPlwiKTtcbi8vIGl0ZXJhdGUgY29sXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGNvbDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiY29sXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jb2w6dHlwZW9mIGNvbCE9PVwidW5kZWZpbmVkXCI/Y29sOnVuZGVmaW5lZCxcInIwXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMDp0eXBlb2YgcjAhPT1cInVuZGVmaW5lZFwiP3IwOnVuZGVmaW5lZCxcInIxXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMTp0eXBlb2YgcjEhPT1cInVuZGVmaW5lZFwiP3IxOnVuZGVmaW5lZCxcInIyXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMjp0eXBlb2YgcjIhPT1cInVuZGVmaW5lZFwiP3IyOnVuZGVmaW5lZCxcInIzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMzp0eXBlb2YgcjMhPT1cInVuZGVmaW5lZFwiP3IzOnVuZGVmaW5lZCxcInI0XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yNDp0eXBlb2YgcjQhPT1cInVuZGVmaW5lZFwiP3I0OnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChuYXZJdGVtcywgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy04IGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj5cIik7XG4vLyBpdGVyYXRlIG5hdkl0ZW1zXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IG5hdkl0ZW1zO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBzdHlsZT1cXFwiZmxleC1ncm93OjE7XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEtdHJpZ2dlclwiLCBuYXZJdGVtLnRyaWdnZXIsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwiZC1mbGV4IGJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkgYnRuLXNtIGp1c3RpZnktY29udGVudC1jZW50ZXIgbXgtM1xcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBuYXZJdGVtLnRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYnV0dG9uPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIG5hdkl0ZW0udHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBidG4tc20ganVzdGlmeS1jb250ZW50LWNlbnRlciBteC0zXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48aHIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiY29udGVudFxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibmF2SXRlbXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm5hdkl0ZW1zOnR5cGVvZiBuYXZJdGVtcyE9PVwidW5kZWZpbmVkXCI/bmF2SXRlbXM6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJyb3dcIjogXCJyMlwiLFxuICAgIFwia2V5XCI6IFwiQVwiLFxuICAgIFwia2V5Y29kZVwiOiA2NSxcbiAgICBcIm9yZGVyXCI6IDEsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcInJvd1wiOiBcInIyXCIsXG4gICAgXCJrZXlcIjogXCJTXCIsXG4gICAgXCJrZXljb2RlXCI6IDgzLFxuICAgIFwib3JkZXJcIjogMixcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwicm93XCI6IFwicjNcIixcbiAgICBcImtleVwiOiBcIlRcIixcbiAgICBcImtleWNvZGVcIjogODQsXG4gICAgXCJvcmRlclwiOiAzLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJyb3dcIjogXCJyM1wiLFxuICAgIFwia2V5XCI6IFwiUlwiLFxuICAgIFwia2V5Y29kZVwiOiA4MixcbiAgICBcIm9yZGVyXCI6IDQsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgXCJrZXlcIjogXCJPXCIsXG4gICAgXCJrZXljb2RlXCI6IDc5LFxuICAgIFwib3JkZXJcIjogNSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwicm93XCI6IFwicjJcIixcbiAgICBcImtleVwiOiBcIktcIixcbiAgICBcImtleWNvZGVcIjogNzUsXG4gICAgXCJvcmRlclwiOiA2LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJyb3dcIjogXCJyM1wiLFxuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDcsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgXCJrZXlcIjogXCJZXCIsXG4gICAgXCJrZXljb2RlXCI6IDg5LFxuICAgIFwib3JkZXJcIjogOCxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfVxuXVxuIiwiTWFjcm9FeGFtcGxlcyA9IHJlcXVpcmUoJy4vZXhhbXBsZXMnKVxuXG4jICMgIyAjICNcblxuIyBNYWNyb01vZGVsIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIE1hY3JvTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIERlZmF1bHQgYXR0cmlidXRlc1xuICBkZWZhdWx0czpcbiAgICBvcmRlcjogMFxuICAgIHBvc2l0aW9uOiAwXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBNYWNyb0NvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBNYWNyb01vZGVsXG4gIGNvbXBhcmF0b3I6ICdvcmRlcidcblxuICAjIGxvYWRFeGFtcGxlXG4gICMgUmVzZXRzIHRoZSBjb2xsZWN0aW9uIHRvIG9uZSBvZiB0aGUgZXhhbXBsZXNcbiAgbG9hZEV4YW1wbGU6IChleGFtcGxlX2lkKSAtPlxuXG4gICAgIyBSZXNldHMgdGhlIGNvbGxlY3Rpb24gd2l0aCB0aGUgZGF0YSBkZWZpbmVkIGluIHRoZSBFeGFtcGxlcyBvYmplY3RcbiAgICBAcmVzZXQoTWFjcm9FeGFtcGxlc1tleGFtcGxlX2lkXSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgTW9kZWw6ICAgICAgTWFjcm9Nb2RlbFxuICBDb2xsZWN0aW9uOiBNYWNyb0NvbGxlY3Rpb25cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJrZXlcIjogXCJTSElGVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNixcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogMVxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJIXCIsXG4gICAgXCJrZXljb2RlXCI6IDcyLFxuICAgIFwib3JkZXJcIjogMixcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAxLFxuICAgIFwib3JkZXJcIjogM1xuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJFXCIsXG4gICAgXCJrZXljb2RlXCI6IDY5LFxuICAgIFwib3JkZXJcIjogNCxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiTFwiLFxuICAgIFwia2V5Y29kZVwiOiA3NixcbiAgICBcIm9yZGVyXCI6IDUsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkxcIixcbiAgICBcImtleWNvZGVcIjogNzYsXG4gICAgXCJvcmRlclwiOiA2LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJPXCIsXG4gICAgXCJrZXljb2RlXCI6IDc5LFxuICAgIFwib3JkZXJcIjogNyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDhcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiMVwiLFxuICAgIFwic2hpZnRcIjogXCIhXCIsXG4gICAgXCJrZXljb2RlXCI6IDQ5LFxuICAgIFwib3JkZXJcIjogOSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAxLFxuICAgIFwib3JkZXJcIjogMTBcbiAgfVxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBcImtleVwiOiBcIlJcIixcbiAgICBcImtleWNvZGVcIjogODIsXG4gICAgXCJvcmRlclwiOiAxLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJFXCIsXG4gICAgXCJrZXljb2RlXCI6IDY5LFxuICAgIFwib3JkZXJcIjogMixcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU1wiLFxuICAgIFwia2V5Y29kZVwiOiA4MyxcbiAgICBcIm9yZGVyXCI6IDMsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlVcIixcbiAgICBcImtleWNvZGVcIjogODUsXG4gICAgXCJvcmRlclwiOiA0LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJNXCIsXG4gICAgXCJrZXljb2RlXCI6IDc3LFxuICAgIFwib3JkZXJcIjogNSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiA2XG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcImBcIixcbiAgICBcInNoaWZ0XCI6IFwiflwiLFxuICAgIFwia2V5Y29kZVwiOiAxOTIsXG4gICAgXCJvcmRlclwiOiA3LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAxLFxuICAgIFwib3JkZXJcIjogOFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJFXCIsXG4gICAgXCJrZXljb2RlXCI6IDY5LFxuICAgIFwib3JkZXJcIjogOSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfVxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBcImtleVwiOiBcIkFMVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxOCxcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogMVxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJTSElGVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNixcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogMlxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCItXCIsXG4gICAgXCJzaGlmdFwiOiBcIl9cIixcbiAgICBcImtleWNvZGVcIjogMTg5LFxuICAgIFwib3JkZXJcIjogMyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAxLFxuICAgIFwib3JkZXJcIjogNFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAxLFxuICAgIFwib3JkZXJcIjogNVxuICB9XG5dXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAge1xuICAgIFwia2V5XCI6IFwiQ1RSTFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNyxcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogMVxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDJcbiAgfSxcbiAge1xuICAgIFwicm93XCI6IFwibmF2X3IwXCIsXG4gICAgXCJrZXlcIjogXCJERUxcIixcbiAgICBcImtleWNvZGVcIjogNDYsXG4gICAgXCJvcmRlclwiOiAzLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAxLFxuICAgIFwib3JkZXJcIjogNFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJDVFJMXCIsXG4gICAgXCJrZXljb2RlXCI6IDE3LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDVcbiAgfVxuXVxuIiwiXG4jIEV4cG9ydHMgYW4gb2JqZWN0IGRlZmluaW5nIHRoZSBleGFtcGxlIG1hY3Jvc1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGV4XzAxOiByZXF1aXJlKCcuL2V4YW1wbGVfMScpXG4gIGV4XzAyOiByZXF1aXJlKCcuL2V4YW1wbGVfMicpXG4gIGV4XzAzOiByZXF1aXJlKCcuL2V4YW1wbGVfMycpXG4gIGV4XzA0OiByZXF1aXJlKCcuL2V4YW1wbGVfNCcpXG59XG4iLCJFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKVxuRGVmYXVsdE1hY3JvcyA9IHJlcXVpcmUoJy4vZGVmYXVsdF9tYWNyb3MnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9GYWN0b3J5IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAnbWFjcm8gY29sbGVjdGlvbic6ICAnZ2V0Q29sbGVjdGlvbidcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjYWNoZWRDb2xsZWN0aW9uID0gbmV3IEVudGl0aWVzLkNvbGxlY3Rpb24oRGVmYXVsdE1hY3JvcywgeyBwYXJzZTogdHJ1ZSB9KVxuXG4gIGdldENvbGxlY3Rpb246IC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBNYWNyb0ZhY3RvcnkoKVxuIiwiTGF5b3V0VmlldyAgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyAjICMgIyAjXG5cbmNsYXNzIERhc2hib2FyZFJvdXRlIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGUnXG5cbiAgdGl0bGU6ICdBc3Ryb0tleSBXZWInXG5cbiAgYnJlYWRjcnVtYnM6IFt7IHRleHQ6ICdEZXZpY2UnIH1dXG5cbiAgZmV0Y2g6IC0+XG4gICAgQGtleXMgPSBSYWRpby5jaGFubmVsKCdrZXknKS5yZXF1ZXN0KCdjb2xsZWN0aW9uJylcbiAgICBAbWFjcm9zID0gUmFkaW8uY2hhbm5lbCgnbWFjcm8nKS5yZXF1ZXN0KCdjb2xsZWN0aW9uJylcbiAgICBAZGV2aWNlTW9kZWwgPSBSYWRpby5jaGFubmVsKCdkZXZpY2UnKS5yZXF1ZXN0KCdtb2RlbCcsICdkZXZpY2VfMScpXG5cbiAgcmVuZGVyOiAtPlxuICAgIGNvbnNvbGUubG9nKEBkZXZpY2VNb2RlbCk7ICMgRGVidWdcbiAgICBAY29udGFpbmVyLnNob3cgbmV3IExheW91dFZpZXcoeyBtb2RlbDogQGRldmljZU1vZGVsLCBrZXlzOiBAa2V5cywgbWFjcm9zOiBAbWFjcm9zIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhc2hib2FyZFJvdXRlXG4iLCJLZXlTZWxlY3RvciA9IHJlcXVpcmUoJy4va2V5U2VsZWN0b3InKVxuXG4jICMgIyAjICNcblxuY2xhc3MgRGV2aWNlU3RhdHVzVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvZGV2aWNlX3N0YXR1cydcbiAgY2xhc3NOYW1lOiAncm93J1xuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cblxuICAgIHN0YXR1cyA9IHtcbiAgICAgIHRleHQ6ICdOb3QgQ29ubmVjdGVkJ1xuICAgICAgY3NzOiAgJ2JhZGdlLWRlZmF1bHQnXG4gICAgfVxuXG4gICAgIyBDb25uZWN0ZWRcbiAgICBpZiBAbW9kZWwuZ2V0KCdzdGF0dXNfY29kZScpID09IDFcblxuICAgICAgc3RhdHVzID0ge1xuICAgICAgICB0ZXh0OiAnQ29ubmVjdGVkJ1xuICAgICAgICBjc3M6ICdiYWRnZS1zdWNjZXNzJ1xuICAgICAgfVxuXG4gICAgcmV0dXJuIHsgc3RhdHVzOiBzdGF0dXMgfVxuXG4jICMgIyAjICNcblxuY2xhc3MgRGV2aWNlTGF5b3V0IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICBjbGFzc05hbWU6ICdyb3cnXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9kZXZpY2VfbGF5b3V0JylcblxuICByZWdpb25zOlxuICAgICMgc3RhdHVzUmVnaW9uOiAnW2RhdGEtcmVnaW9uPXN0YXR1c10nXG4gICAga2V5c1JlZ2lvbjogICAnW2RhdGEtcmVnaW9uPWtleXNdJ1xuXG4gIG9uUmVuZGVyOiAtPlxuXG4gICAgIyBJbnN0YW50aWF0ZXMgbmV3IEtleVNlbGVjdG9yIFZpZXdcbiAgICBrZXlTZWxlY3RvciA9IG5ldyBLZXlTZWxlY3Rvcih7IGNvbGxlY3Rpb246IEBtb2RlbC5nZXQoJ2tleXMnKSB9KVxuICAgIGtleVNlbGVjdG9yLm9uICdjaGlsZHZpZXc6c2VsZWN0ZWQnLCAodmlldykgPT4gQHRyaWdnZXIoJ2tleTpzZWxlY3RlZCcsIHZpZXcubW9kZWwpXG4gICAga2V5U2VsZWN0b3Iub24gJ2NoaWxkdmlldzpkZXNlbGVjdGVkJywgKHZpZXcpID0+IEB0cmlnZ2VyKCdrZXk6ZGVzZWxlY3RlZCcpXG4gICAgQGtleXNSZWdpb24uc2hvdyhrZXlTZWxlY3RvcilcblxuICAgICMgU3RhdHVzIFZpZXdcbiAgICAjIFRPRE8gLSBzdGF0dXMgJiBjb25uZWN0aW9uIHZpZXdcbiAgICAjIEBzdGF0dXNSZWdpb24uc2hvdyBuZXcgRGV2aWNlU3RhdHVzVmlldyh7IG1vZGVsOiBAbW9kZWwgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRGV2aWNlTGF5b3V0XG5cblxuIiwiU2ltcGxlTmF2ID0gcmVxdWlyZSAnbGliL3ZpZXdzL3NpbXBsZV9uYXYnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBFZGl0b3JTZWxlY3RvciBleHRlbmRzIFNpbXBsZU5hdlxuICBjbGFzc05hbWU6ICdyb3cgaC0xMDAnXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9lZGl0b3Jfc2VsZWN0b3InKVxuXG4gIG5hdkl0ZW1zOiBbXG4gICAgeyBpY29uOiAnZmEta2V5Ym9hcmQtbycsICB0ZXh0OiAnTWFjcm8nLCAgdHJpZ2dlcjogJ21hY3JvJyB9XG4gICAgeyBpY29uOiAnZmEtZmlsZS10ZXh0LW8nLCB0ZXh0OiAnVGV4dCcsICAgdHJpZ2dlcjogJ3RleHQnIH1cbiAgICAjIHsgaWNvbjogJ2ZhLWFzdGVyaXNrJywgICAgdGV4dDogJ0tleScsICAgIHRyaWdnZXI6ICdrZXknIH1cbiAgXVxuXG4gIG9uUmVuZGVyOiAtPlxuICAgIGNvbmZpZ01vZGVsID0gQG1vZGVsLmdldCgnY29uZmlnJylcbiAgICB0cmlnZ2VyID0gY29uZmlnTW9kZWwuZ2V0KCd0eXBlJylcbiAgICByZXR1cm4gQCQoXCJbZGF0YS10cmlnZ2VyPSN7dHJpZ2dlcn1dXCIpLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gIG9uTmF2aWdhdGVNYWNybzogLT5cbiAgICBAdHJpZ2dlciAnc2hvdzptYWNybzplZGl0b3InXG5cbiAgb25OYXZpZ2F0ZVRleHQ6IC0+XG4gICAgQHRyaWdnZXIgJ3Nob3c6dGV4dDplZGl0b3InXG5cbiAgb25OYXZpZ2F0ZUtleTogLT5cbiAgICBAdHJpZ2dlciAnc2hvdzprZXk6ZWRpdG9yJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JTZWxlY3RvclxuIiwiVGV4dEVkaXRvciA9IHJlcXVpcmUoJy4vdGV4dEVkaXRvcicpXG5NYWNyb0VkaXRvciA9IHJlcXVpcmUoJy4vbWFjcm9FZGl0b3InKVxuXG4jICMgIyAjICNcblxuY2xhc3MgRWRpdG9yV3JhcHBlciBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvZWRpdG9yX3dyYXBwZXInXG4gIGNsYXNzTmFtZTogJ3JvdydcblxuICByZWdpb25zOlxuICAgIGNvbnRlbnRSZWdpb246ICdbZGF0YS1yZWdpb249Y29udGVudF0nXG5cbiAgdWk6XG4gICAgcmVjb3JkQnRuOiAnW2RhdGEtY2xpY2s9cmVjb3JkXSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIFtkYXRhLWNsaWNrPXNhdmVdJzogICAgJ29uU2F2ZSdcbiAgICAnY2xpY2sgW2RhdGEtY2xpY2s9Y2xlYXJdJzogICAnb25DbGVhcidcbiAgICAnY2xpY2sgW2RhdGEtY2xpY2s9Y2FuY2VsXSc6ICAnb25DYW5jZWwnXG4gICAgJ2NsaWNrIFtkYXRhLWV4YW1wbGVdJzogICAgICAgJ2xvYWRFeGFtcGxlJ1xuICAgICdjbGljayBAdWkucmVjb3JkQnRuJzogICAgICAgICd0b2dnbGVSZWNvcmQnXG5cbiAgZWRpdG9yczpcbiAgICBtYWNybzogIE1hY3JvRWRpdG9yXG4gICAgdGV4dDogICBUZXh0RWRpdG9yXG4gICAga2V5OiAgICBNYWNyb0VkaXRvclxuXG4gIG9uUmVuZGVyOiAtPlxuXG4gICAgIyBGZXRjaGVzIHRoZSBFZGl0b3JWaWV3IHByb3RvdHlwZVxuICAgIEVkaXRvclZpZXcgPSBAZWRpdG9yc1tAb3B0aW9ucy5lZGl0b3JdXG5cbiAgICAjIElzb2xhdGVzIENvbmZpZ1xuICAgIGNvbmZpZyA9IEBtb2RlbC5nZXQoJ2NvbmZpZycpXG5cbiAgICAjIENhY2hlcyB0aGUgY3VycmVudCBjb25maWd1cmF0aW9uIHRvIGJlIHJlc3RvcmVkIHdoZW4gdGhpcyB2aWV3IGlzIGNhbmNlbGxlZCBvdXRcbiAgICBAY2FjaGVkQ29uZmlnID0gY29uZmlnLnRvSlNPTigpXG5cbiAgICAjIElzb2xhdGVzIE1hY3JvQ29sbGVjdGlvblxuICAgIEBtYWNyb3MgPSBjb25maWcuZ2V0KCdtYWNyb3MnKVxuXG4gICAgd2luZG93Lm1hY3JvcyA9IEBtYWNyb3MgIyBUT0RPIC0gcmVtb3ZlXG5cbiAgICAjIFJlcXVlc3RzIEtleUNvbGxlY3Rpb24gZnJvbSB0aGUgS2V5RmFjdG9yeVxuICAgIGtleXMgPSBSYWRpby5jaGFubmVsKCdrZXknKS5yZXF1ZXN0KCdjb2xsZWN0aW9uJylcblxuICAgICMgSW5zdGFudGlhdGVzIG5ldyBFZGl0b3JWaWV3IGluc3RhbmNlXG4gICAgQGVkaXRvclZpZXcgPSBuZXcgRWRpdG9yVmlldyh7IG1vZGVsOiBjb25maWcsIGtleXM6IGtleXMsIG1hY3JvczogQG1hY3JvcyB9KVxuXG4gICAgIyBMaXN0ZW5zIGZvciAnc3RvcDpyZWNvcmRpbmcnIGV2ZW50XG4gICAgQGVkaXRvclZpZXcub24gJ3N0b3A6cmVjb3JkaW5nJywgPT4gQHRvZ2dsZVJlY29yZCgpXG5cbiAgICAjIFNob3dzIHRoZSB2aWV3IGluIEBjb250ZW50UmVnaW9uXG4gICAgQGNvbnRlbnRSZWdpb24uc2hvdyBAZWRpdG9yVmlld1xuXG4gICMgb25DbGVhclxuICAjIEVtcHRpZXMgdGhlIE1hY3JvQ29sbGVjdGlvblxuICAjIFRPRE8gLSB1bmRvIGJ1dHRvbj9cbiAgb25DbGVhcjogLT5cblxuICAgICMgU3RvcHMgUmVjb3JkaW5nXG4gICAgQHN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyBFbXB0aWVzIHRoZSBNYWNyb0NvbGxlY3Rpb25cbiAgICBAbWFjcm9zLnJlc2V0KClcbiAgICByZXR1cm5cblxuICAjIG9uU2F2ZVxuICBvblNhdmU6IC0+XG5cbiAgICAjIFN0b3BzIFJlY29yZGluZ1xuICAgIEBzdG9wUmVjb3JkaW5nKClcblxuICAgICMgU2VyaWFsaXplcyBkYXRhIGZyb20gYW55IGZvcm0gZWxlbWVudHMgaW4gdGhpcyB2aWV3XG4gICAgZGF0YSA9IEJhY2tib25lLlN5cGhvbi5zZXJpYWxpemUoQClcblxuICAgICMgQ2xlYXIgdW51c2VkIHR5cGUtc3BlY2lmaWMgYXR0cmlidXRlc1xuICAgIGRhdGEubWFjcm9zID0gW10gaWYgZGF0YS50eXBlICE9ICdtYWNybydcbiAgICBkYXRhLnRleHRfdmFsdWUgPSAnJyBpZiBkYXRhLnR5cGUgIT0gJ3RleHQnXG5cbiAgICAjIEFwcGxpZXMgdGhlIGF0dHJpYnV0ZXMgdG8gdGhlIGNvbmZpZyBtb2RlbFxuICAgIEBtb2RlbC5nZXQoJ2NvbmZpZycpLnNldChkYXRhKVxuXG4gICAgIyBUcmlnZ2VycyBjaGFuZ2UgZXZlbnQgb24gQG1vZGVsIHRvIHJlLXJlbmRlciB0aGUgY3VycmVudGx5IGhpZGRlbiBBc3Ryb0tleSBlbGVtZW50XG4gICAgQG1vZGVsLnRyaWdnZXIoJ2NvbmZpZzp1cGRhdGVkJylcblxuICAgICMgVHJpZ2dlcnMgJ3NhdmUnIGV2ZW50LCBjbG9zaW5nIHRoaXMgdmlld1xuICAgIHJldHVybiBAdHJpZ2dlciAnc2F2ZSdcblxuICAjIG9uQ2FuY2VsXG4gIG9uQ2FuY2VsOiAtPlxuXG4gICAgIyBTdG9wcyBSZWNvcmRpbmdcbiAgICBAc3RvcFJlY29yZGluZygpXG5cbiAgICAjIFJlc2V0cyBjb25maWcgYXR0cmlidXRlc1xuICAgIEBtb2RlbC5nZXQoJ2NvbmZpZycpLnNldChAY2FjaGVkQ29uZmlnKVxuXG4gICAgIyBUcmlnZ2VycyAnY2FuY2VsJyBldmVudCwgY2xvc2luZyB0aGlzIHZpZXdcbiAgICByZXR1cm4gQHRyaWdnZXIgJ2NhbmNlbCdcblxuICAjIGxvYWRFeGFtcGxlXG4gICMgRW1wdGllcyBvdXQgdGhlIE1hY3JvQ29sbGVjaW9uIGFuZCBsb2FkcyBhbiBleGFtcGxlIG1hY3JvXG4gIGxvYWRFeGFtcGxlOiAoZSkgLT5cblxuICAgICMgQ2FjaGVzIGNsaWNrZWQgZWxcbiAgICBlbCA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuXG4gICAgIyBHZXRzIHRoZSBJRCBvZiB0aGUgZXhhbXBsZSB0byBsb2FkXG4gICAgZXhhbXBsZV9pZCA9IGVsLmRhdGEoJ2V4YW1wbGUnKVxuXG4gICAgIyBJbnZva2VzIHRoZSBsb2FkRXhhbXBsZSBtZXRob2Qgb24gdGhlIE1hY3JvQ29sbGVjdGlvblxuICAgIHJldHVybiBAbWFjcm9zLmxvYWRFeGFtcGxlKGV4YW1wbGVfaWQpXG5cbiAgIyB0b2dnbGVSZWNvcmRcbiAgIyBUb2dnbGVzIHdldGhlciBvciBub3QgdGhlIHVzZXIncyBrZXlib2FyZCBpcyByZWNvcmRpbmcga2V5c3Ryb2tlc1xuICB0b2dnbGVSZWNvcmQ6IChlKSAtPlxuICAgIHJldHVybiBAc3RvcFJlY29yZGluZygpIGlmIEBpc1JlY29yZGluZ1xuICAgIEBzdGFydFJlY29yZGluZygpXG5cbiAgIyBzdG9wUmVjb3JkaW5nXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG5cbiAgICAjIFNldHMgQGlzUmVjb3JkaW5nIGZsYWdcbiAgICBAaXNSZWNvcmRpbmcgPSBmYWxzZVxuXG4gICAgIyBVcGRhdGVzIHRoZSBFZGl0b3JWaWV3IGluc3RhbmNlIHRvIGlnbm9yZSBrZXlib2FyZCBpbnB1dFxuICAgIEBlZGl0b3JWaWV3LmtleWJvYXJkU2VsZWN0b3I/LmN1cnJlbnQuc3RvcFJlY29yZGluZygpXG5cbiAgICAjIFVwZGF0ZXMgdGhlIEB1aS5yZWNvcmRCdG4gZWxlbWVudFxuICAgIEB1aS5yZWNvcmRCdG4ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoJ2knKS5yZW1vdmVDbGFzcygnZmEtc3BpbiBmYS1jaXJjbGUtby1ub3RjaCcpLmFkZENsYXNzKCdmYS1jaXJjbGUnKVxuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG5cbiAgICAjIFNldHMgQGlzUmVjb3JkaW5nIGZsYWdcbiAgICBAaXNSZWNvcmRpbmcgPSB0cnVlXG5cbiAgICAjIFVwZGF0ZXMgdGhlIEVkaXRvclZpZXcgaW5zdGFuY2UgdG8gYWxsb3cga2V5Ym9hcmQgaW5wdXRcbiAgICBAZWRpdG9yVmlldy5rZXlib2FyZFNlbGVjdG9yPy5jdXJyZW50LnN0YXJ0UmVjb3JkaW5nKClcblxuICAgICMgVXBkYXRlcyB0aGUgQHVpLnJlY29yZEJ0biBlbGVtZW50XG4gICAgQHVpLnJlY29yZEJ0bi5hZGRDbGFzcygnYWN0aXZlJykuZmluZCgnaScpLmFkZENsYXNzKCdmYS1zcGluIGZhLWNpcmNsZS1vLW5vdGNoJykucmVtb3ZlQ2xhc3MoJ2ZhLWNpcmNsZScpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvcldyYXBwZXJcblxuXG5cbiIsIlxuY2xhc3MgS2V5Q2hpbGQgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnYnRuIGJ0bi1vdXRsaW5lLWxpZ2h0IGtleS0tY2hpbGQgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIG14LTInXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9rZXlfY2hpbGQnKVxuXG4gIGJlaGF2aW9yczpcbiAgICBTZWxlY3RhYmxlQ2hpbGQ6IHsgZGVzZWxlY3Q6IHRydWUgfVxuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdjb25maWc6dXBkYXRlZCc6ICdvbk1vZGVsQ2hhbmdlJ1xuXG4gIG9uTW9kZWxDaGFuZ2U6IC0+XG4gICAgcmV0dXJuIEByZW5kZXIoKVxuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cblxuICAgICMgSXNvbGF0ZXMgQXN0cm9LZXlDb25maWcgbW9kZWxcbiAgICBjb25maWcgPSBAbW9kZWwuZ2V0KCdjb25maWcnKVxuXG4gICAgIyBNYWNyb1xuICAgIGlmIGNvbmZpZy5nZXQoJ3R5cGUnKSA9PSAnbWFjcm8nXG4gICAgICByZXR1cm4geyBsYWJlbDogJ01hY3JvJyB9XG5cbiAgICAjIFRleHRcbiAgICBpZiBjb25maWcuZ2V0KCd0eXBlJykgPT0gJ3RleHQnXG4gICAgICByZXR1cm4geyBsYWJlbDogJ1RleHQnIH1cblxuICAgICMgS2V5XG4gICAgIyBUT0RPIC0gRElTUExBWSBLRVkgSU4gVklFV1xuICAgIGlmIGNvbmZpZy5nZXQoJ3R5cGUnKSA9PSAna2V5J1xuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdLZXknIH1cblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleVNlbGVjdG9yIGV4dGVuZHMgTW4uQ29sbGVjdGlvblZpZXdcbiAgdGFnTmFtZTogJ3VsJ1xuICBjbGFzc05hbWU6ICdsaXN0LXVuc3R5bGVkIGtleS0tbGlzdCBweC00IHB5LTMgbXktMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gYWxpZ24taXRlbXMtY2VudGVyIGZsZXgtcm93J1xuICBjaGlsZFZpZXc6IEtleUNoaWxkXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleVNlbGVjdG9yXG5cblxuIiwiRGV2aWNlTGF5b3V0ID0gcmVxdWlyZSgnLi9kZXZpY2VMYXlvdXQnKVxuRWRpdG9yU2VsZWN0b3IgPSByZXF1aXJlKCcuL2VkaXRvclNlbGVjdG9yJylcbkVkaXRvcldyYXBwZXIgPSByZXF1aXJlKCcuL2VkaXRvcldyYXBwZXInKVxuXG4jICMgIyAjICNcblxuY2xhc3MgSGVscFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2hlbHBfdmlldydcbiAgY2xhc3NOYW1lOiAncm93J1xuXG4jICMgIyAjICNcblxuY2xhc3MgTGF5b3V0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvbGF5b3V0J1xuICBjbGFzc05hbWU6ICdjb250YWluZXItZmx1aWQgZC1mbGV4IGZsZXgtY29sdW1uIHctMTAwIGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIGRldmljZS0tbGF5b3V0J1xuXG4gIHJlZ2lvbnM6XG4gICAgZGV2aWNlUmVnaW9uOiAgICdbZGF0YS1yZWdpb249ZGV2aWNlXSdcbiAgICBzZWxlY3RvclJlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1zZWxlY3Rvcl0nXG4gICAgZWRpdG9yUmVnaW9uOiAgICdbZGF0YS1yZWdpb249ZWRpdG9yXSdcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgRGlzcGxheXMgZGVmYXVsdCBoZWxwIHRleHRcbiAgICBAc2hvd0hlbHBWaWV3KClcblxuICAgICMgSW5zdGFudGlhdGVzIGEgbmV3IERldmljZUxheW91dCBmb3IgY29ubmVjdGluZyB0byBhbiBBc3Ryb0tleVxuICAgICMgYW5kIHNlbGVjdGluZyB3aGljaCBrZXkgdGhlIHVzZXIgd291bGQgbGlrZSB0byBlZGl0XG4gICAgZGV2aWNlVmlldyA9IG5ldyBEZXZpY2VMYXlvdXQoeyBtb2RlbDogQG1vZGVsIH0pXG4gICAgZGV2aWNlVmlldy5vbiAna2V5OnNlbGVjdGVkJywgKGtleU1vZGVsKSA9PiBAc2hvd0VkaXRvclNlbGVjdG9yKGtleU1vZGVsKVxuICAgIGRldmljZVZpZXcub24gJ2tleTpkZXNlbGVjdGVkJywgKCkgPT4gQHNob3dIZWxwVmlldygpXG4gICAgQGRldmljZVJlZ2lvbi5zaG93KGRldmljZVZpZXcpXG5cbiAgc2hvd0hlbHBWaWV3OiAtPlxuXG4gICAgIyBJbnN0YW50aWF0ZXMgYSBuZXcgSGVscFZpZXcgYW5kIHNob3dzIGl0IGluIEBzZWxlY3RvclJlZ2lvblxuICAgIEBzZWxlY3RvclJlZ2lvbi5zaG93IG5ldyBIZWxwVmlldygpXG5cbiAgc2hvd0VkaXRvclNlbGVjdG9yOiAoa2V5TW9kZWwpIC0+XG5cbiAgICAjIEluc3RhbnRhaWF0ZXMgbmV3IEVkaXRvclNlbGVjdG9yIHZpZXdcbiAgICBlZGl0b3JTZWxlY3RvciA9IG5ldyBFZGl0b3JTZWxlY3Rvcih7IG1vZGVsOiBrZXlNb2RlbCB9KVxuXG4gICAgIyBTaG93cyBNYWNybyBFZGl0b3JcbiAgICBlZGl0b3JTZWxlY3Rvci5vbiAnc2hvdzptYWNybzplZGl0b3InLCA9PiBAc2hvd0VkaXRvclZpZXcoa2V5TW9kZWwsICdtYWNybycpXG5cbiAgICAjIFNob3dzIFRleHQgRWRpdG9yXG4gICAgZWRpdG9yU2VsZWN0b3Iub24gJ3Nob3c6dGV4dDplZGl0b3InLCA9PiBAc2hvd0VkaXRvclZpZXcoa2V5TW9kZWwsICd0ZXh0JylcblxuICAgICMgU2hvd3MgS2V5IEVkaXRvclxuICAgIGVkaXRvclNlbGVjdG9yLm9uICdzaG93OmtleTplZGl0b3InLCA9PiBAc2hvd0VkaXRvclZpZXcoa2V5TW9kZWwsICdrZXknKVxuXG4gICAgIyBTaG93cyB0aGUgRWRpdG9yU2VsZWN0b3Igdmlld1xuICAgIEBzZWxlY3RvclJlZ2lvbi5zaG93KGVkaXRvclNlbGVjdG9yKVxuXG4gIHNob3dFZGl0b3JWaWV3OiAoa2V5TW9kZWwsIGVkaXRvcikgLT5cbiAgICBAJGVsLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gICAgIyBJbnN0YW50aWF0ZXMgbmV3IEVkaXRvcldyYXBwZXIgdmlld1xuICAgIGVkaXRvcldyYXBwZXIgPSBuZXcgRWRpdG9yV3JhcHBlcih7IG1vZGVsOiBrZXlNb2RlbCwga2V5czogQG9wdGlvbnMua2V5cywgbWFjcm9zOiBAb3B0aW9ucy5tYWNyb3MsIGVkaXRvcjogZWRpdG9yIH0pXG5cbiAgICAjIEhhbmRsZXMgJ2NhbmNlbCcgZXZlbnRcbiAgICBlZGl0b3JXcmFwcGVyLm9uICdjYW5jZWwnLCA9PlxuICAgICAgQCRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICMgSGFuZGxlcyAnc2F2ZScgZXZlbnRcbiAgICBlZGl0b3JXcmFwcGVyLm9uICdzYXZlJywgPT5cbiAgICAgICMgVE9ETyAtIGhpdCB0aGUgS2V5TW9kZWwgLyBEZXZpY2VNb2RlbCB0byBkbyB0aGUgcmVzdCBmcm9tIGhlcmVcbiAgICAgIGNvbnNvbGUubG9nICdTQVZFIEtFWSBNT0RFTCBTRVRUSU5HUyBIRVJFJ1xuICAgICAgQCRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICMgU2hvd3MgdGhlIEVkaXRvcldyYXBwZXIgdmlldyBpbiBAZWRpdG9yUmVnaW9uXG4gICAgQGVkaXRvclJlZ2lvbi5zaG93KGVkaXRvcldyYXBwZXIpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IExheW91dFZpZXdcblxuXG5cbiIsIktleWJvYXJkU2VsZWN0b3IgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3InKVxuTWFjcm9MaXN0ID0gcmVxdWlyZSgnLi9tYWNyb0xpc3QnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9FZGl0b3IgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL21hY3JvX2VkaXRvcidcbiAgY2xhc3NOYW1lOiAncm93IGgtMTAwJ1xuXG4gIHJlZ2lvbnM6XG4gICAgbWFjcm9SZWdpb246ICAgICdbZGF0YS1yZWdpb249bWFjcm9dJ1xuICAgIGNvbnRyb2xzUmVnaW9uOiAnW2RhdGEtcmVnaW9uPWNvbnRyb2xzXSdcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgR2V0cyB0aGUgY3VycmVudCBtYWNybyBhc3NpZ25lZCB0byB0aGUga2V5TW9kZWxcbiAgICAjIG1hY3JvQ29sbGVjdGlvbiA9IGtleU1vZGVsLmdldE1hY3JvQ29sbGVjdGlvbigpXG4gICAgQG1hY3JvUmVnaW9uLnNob3cgbmV3IE1hY3JvTGlzdCh7IGNvbGxlY3Rpb246IEBvcHRpb25zLm1hY3JvcyB9KVxuXG4gICAgIyBJbnN0YW50YWlhdGVzIG5ldyBLZXlib2FyZFNlbGVjdG9yXG4gICAgIyBUT0RPIC0gdGhpcyB3aWxsICpldmVudHVhbGx5KiBkaXNwbGF5IGEgc2VsZWN0b3IgYmV0d2VlbiBkaWZmZXJlbnQgdHlwZXMgb2Yga2V5Ym9hcmRzIC8gc2V0cyBvZiBrZXlzXG4gICAgQGtleWJvYXJkU2VsZWN0b3IgPSBuZXcgS2V5Ym9hcmRTZWxlY3Rvcih7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSlcblxuICAgICMgQnViYmxlcyB1cCBzdG9wOnJlY29yZGluZyBldmVudFxuICAgIEBrZXlib2FyZFNlbGVjdG9yLm9uICdzdG9wOnJlY29yZGluZycsID0+IEB0cmlnZ2VyICdzdG9wOnJlY29yZGluZydcblxuICAgICMgSGFuZGxlcyBLZXlTZWxlY3Rpb24gZXZlbnRcbiAgICBAa2V5Ym9hcmRTZWxlY3Rvci5vbiAna2V5OnNlbGVjdGVkJywgKGtleSkgPT5cblxuICAgICAgIyBDbG9uZXMgdGhlIG9yaWdpbmFsIG9iamVjdFxuICAgICAga2V5ID0gXy5jbG9uZShrZXkpXG5cbiAgICAgICMgQWRkcyB0aGUgY29ycmVjdCBgb3JkZXJgIGF0dHJpYnV0ZVxuICAgICAga2V5Lm9yZGVyID0gQG9wdGlvbnMubWFjcm9zLmxlbmd0aCArIDFcblxuICAgICAgIyBBZGRzIHRoZSBrZXkgdG8gdGhlIE1hY3JvQ29sbGVjdGlvblxuICAgICAgQG9wdGlvbnMubWFjcm9zLmFkZChrZXkpXG5cbiAgICAjIFNob3dzIHRoZSBrZXlib2FyZFZpZXdcbiAgICBAY29udHJvbHNSZWdpb24uc2hvdyBAa2V5Ym9hcmRTZWxlY3RvclxuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG4gICAgQGtleWJvYXJkVmlldy5zdGFydFJlY29yZGluZygpXG5cbiAgIyBzdG9wUmVjb3JkaW5nXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG4gICAgQGtleWJvYXJkVmlldy5zdG9wUmVjb3JkaW5nKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWFjcm9FZGl0b3JcblxuXG5cbiIsIlxuY2xhc3MgTWFjcm9DaGlsZCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGFnTmFtZTogJ2xpJ1xuICBjbGFzc05hbWU6ICdtYWNyby0tY2hpbGQgZmxleC1jb2x1bW4ganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgbXktMidcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL21hY3JvX2NoaWxkJylcblxuICBiZWhhdmlvcnM6XG4gICAgU29ydGFibGVDaGlsZDoge31cblxuICBtb2RlbEV2ZW50czpcbiAgICAnY2hhbmdlOnBvc2l0aW9uJzogJ3JlbmRlcidcblxuICBldmVudHM6XG4gICAgJ2RyYWcnOiAnb25EcmFnJ1xuICAgICdkcmFnc3RhcnQnOiAnb25EcmFnU3RhcnQnXG4gICAgJ21vdXNlb3ZlciAua2V5JzogJ29uTW91c2VPdmVyJ1xuICAgICdtb3VzZW91dCAua2V5JzogJ29uTW91c2VPdXQnXG4gICAgJ2NsaWNrIC5rZXknOiAncmVtb3ZlTWFjcm8nXG4gICAgJ2NsaWNrIFtkYXRhLXBvc2l0aW9uXTpub3QoLmFjdGl2ZSknOiAnb25Qb3NpdGlvbkNsaWNrJ1xuXG4gIG9uTW91c2VPdmVyOiAtPlxuICAgIEAkZWwuYWRkQ2xhc3MoJ2hvdmVyZWQnKVxuXG4gIG9uTW91c2VPdXQ6IC0+XG4gICAgQCRlbC5yZW1vdmVDbGFzcygnaG92ZXJlZCcpXG5cbiAgb25EcmFnU3RhcnQ6IC0+XG4gICAgQCRlbC5hZGRDbGFzcygnZHJhZy1zdGFydCcpXG5cbiAgb25EcmFnOiAtPlxuICAgIEAkZWwucmVtb3ZlQ2xhc3MoJ2RyYWctc3RhcnQgaG92ZXJlZCcpXG4gICAgQCRlbC5zaWJsaW5ncygnLm1hY3JvLS1jaGlsZCcpLnJlbW92ZUNsYXNzKCdkcmFnLXN0YXJ0IGhvdmVyZWQnKVxuXG4gIHJlbW92ZU1hY3JvOiAtPlxuICAgIEBtb2RlbC5jb2xsZWN0aW9uLnJlbW92ZShAbW9kZWwpXG5cbiAgb25Qb3NpdGlvbkNsaWNrOiAoZSkgLT5cblxuICAgICMgQ2FjaGVzIGNsaWNrZWQgZWxcbiAgICBlbCA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuXG4gICAgIyBJc29sYXRlcyBwb3NpdGlvbiBkYXRhIGZyb20gZWxlbWVudFxuICAgIHBvc2l0aW9uID0gZWwuZGF0YSgncG9zaXRpb24nKVxuXG4gICAgIyBEZXRlcm1pbmVzIG5leHQgcG9zaXRpb25cbiAgICBpZiBwb3NpdGlvbiA9PSAtMVxuICAgICAgbmV3X3Bvc2l0aW9uID0gMVxuICAgIGlmIHBvc2l0aW9uID09IDBcbiAgICAgIG5ld19wb3NpdGlvbiA9IC0xXG4gICAgaWYgcG9zaXRpb24gPT0gMVxuICAgICAgbmV3X3Bvc2l0aW9uID0gMFxuXG4gICAgIyBTZXRzIHRoZSBwb3NpdGlvbiBhdHRyaWJ1dGUgb24gdGhlIG1vZGVsXG4gICAgQG1vZGVsLnNldCgncG9zaXRpb24nLCBuZXdfcG9zaXRpb24pXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIHBvc2l0aW9ucyA9IFtcbiAgICAgIHsgcG9zaXRpb246IC0xLCBjc3M6ICdmYS1sb25nLWFycm93LWRvd24nIH1cbiAgICAgIHsgcG9zaXRpb246IDAsIGNzczogJ2ZhLWFycm93cy12JyB9XG4gICAgICB7IHBvc2l0aW9uOiAxLCBjc3M6ICdmYS1sb25nLWFycm93LXVwJyB9XG4gICAgXVxuXG4gICAgcG9zaXRpb24gPSBAbW9kZWwuZ2V0KCdwb3NpdGlvbicpXG4gICAgYWN0aXZlX3Bvc2l0aW9uID0gXy5maW5kV2hlcmUocG9zaXRpb25zLCB7IHBvc2l0aW9uOiBwb3NpdGlvbiB9KVxuICAgIHJldHVybiB7IGFjdGl2ZV9wb3NpdGlvbiB9XG5cbiMgIyAjICMgI1xuXG5jbGFzcyBNYWNyb0VtcHR5IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0YWdOYW1lOiAnbGknXG4gIGNsYXNzTmFtZTogJ21hY3JvLS1jaGlsZCBlbXB0eSBmbGV4LWNvbHVtbiBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBteS0yJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvbWFjcm9fZW1wdHknKVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9MaXN0IGV4dGVuZHMgTW4uQ29sbGVjdGlvblZpZXdcbiAgdGFnTmFtZTogJ3VsJ1xuICBjbGFzc05hbWU6ICdsaXN0LXVuc3R5bGVkIG1hY3JvLS1saXN0IHB4LTQgbXktMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgZmxleC1yb3cgZmxleC13cmFwJ1xuICBjaGlsZFZpZXc6IE1hY3JvQ2hpbGRcbiAgZW1wdHlWaWV3OiBNYWNyb0VtcHR5XG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIFNvcnRzIHRoZSBjb2xsZWN0aW9uXG4gICAgQGNvbGxlY3Rpb24uc29ydCgpXG5cbiAgICAjIEluaXRpYWxpemVzIFNvcnRhYmxlIGNvbnRhaW5lclxuICAgIFNvcnRhYmxlLmNyZWF0ZSBAZWwsXG4gICAgICBhbmltYXRpb246ICAgIDBcbiAgICAgIGhhbmRsZTogICAgICAgJy5rZXknXG4gICAgICBnaG9zdENsYXNzOiAgICdnaG9zdCcgICMgQ2xhc3MgbmFtZSBmb3IgdGhlIGRyb3AgcGxhY2Vob2xkZXJcbiAgICAgIGNob3NlbkNsYXNzOiAgJ2Nob3NlbicgICMgQ2xhc3MgbmFtZSBmb3IgdGhlIGNob3NlbiBpdGVtXG4gICAgICBkcmFnQ2xhc3M6ICAgICdkcmFnJyAgIyBDbGFzcyBuYW1lIGZvciB0aGUgZHJhZ2dpbmcgaXRlbVxuICAgICAgZmFsbGJhY2tUb2xlcmFuY2U6IDEwMFxuICAgICAgb25FbmQ6IChlKSA9PiBAcmVvcmRlckNvbGxlY3Rpb24oKVxuXG4gICMgcmVvcmRlckNvbGxlY3Rpb25cbiAgIyBJbnZva2VkIGFmdGVyIHNvcnRpbmcgaGFzIGNvbXBsZXRlZFxuICByZW9yZGVyQ29sbGVjdGlvbjogPT5cblxuICAgICMgVHJpZ2dlcnMgb3JkZXIgZXZlbnRzIG9uIENvbGxlY3Rpb25WaWV3IGNoaWxkVmlldyAkZWxzXG4gICAgb3JkZXIgPSAxXG4gICAgZm9yIGVsIGluIEBlbC5jaGlsZHJlblxuICAgICAgJChlbCkudHJpZ2dlcignc29ydGVkJyxvcmRlcilcbiAgICAgIG9yZGVyKytcblxuICAgICMgQGNvbGxlY3Rpb24uc29ydCgpXG4gICAgQHJlbmRlcigpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hY3JvTGlzdFxuXG5cbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgZGF0YS1yZWdpb249XFxcImtleXNcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyXFxcIj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobGFiZWwpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3cgZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlclxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEwXFxcIj48cCBjbGFzcz1cXFwibGVhZCBtYi0wXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGxhYmVsKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3A+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTIgdGV4dC1yaWdodCB0ZXh0LW11dGVkXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtcGVuY2lsXFxcIj48L2k+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibGFiZWxcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmxhYmVsOnR5cGVvZiBsYWJlbCE9PVwidW5kZWZpbmVkXCI/bGFiZWw6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobmF2SXRlbXMsIHVuZGVmaW5lZCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj5cIik7XG4vLyBpdGVyYXRlIG5hdkl0ZW1zXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IG5hdkl0ZW1zO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBzdHlsZT1cXFwiZmxleC1ncm93OjE7XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEtdHJpZ2dlclwiLCBuYXZJdGVtLnRyaWdnZXIsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwiZC1mbGV4IGJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkganVzdGlmeS1jb250ZW50LWNlbnRlciBteC0zXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIG5hdkl0ZW0gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxidXR0b24gc3R5bGU9XFxcImZsZXgtZ3JvdzoxO1xcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLXRyaWdnZXJcIiwgbmF2SXRlbS50cmlnZ2VyLCB0cnVlLCBmYWxzZSkpICsgXCIgY2xhc3M9XFxcImQtZmxleCBidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IGp1c3RpZnktY29udGVudC1jZW50ZXIgbXgtM1xcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBuYXZJdGVtLnRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYnV0dG9uPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJuYXZJdGVtc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubmF2SXRlbXM6dHlwZW9mIG5hdkl0ZW1zIT09XCJ1bmRlZmluZWRcIj9uYXZJdGVtczp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcImNhbmNlbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IG14LTIgcHgtNFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IG14LTQgZmEtYW5nbGUtbGVmdFxcXCI+PC9pPjwvYnV0dG9uPjxidXR0b24gZGF0YS1jbGljaz1cXFwic2F2ZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtc3VjY2VzcyBteC0yIHB4LTRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS0yeCBteC00IGZhLWNoZWNrLWNpcmNsZS1vXFxcIj48L2k+PC9idXR0b24+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJjbGVhclxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtd2FybmluZyBteC0yIHB4LTRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS0yeCBteC00IGZhLXRpbWVzXFxcIj48L2k+PC9idXR0b24+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJyZWNvcmRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLWRhbmdlciBteC0yIHB4LTRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS0yeCBteC00IGZhLWNpcmNsZVxcXCI+PC9pPjwvYnV0dG9uPjxkaXYgY2xhc3M9XFxcImJ0bi1ncm91cFxcXCI+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtdG9nZ2xlPVxcXCJkcm9wZG93blxcXCIgYXJpYS1oYXNwb3B1cD1cXFwidHJ1ZVxcXCIgYXJpYS1leHBhbmRlZD1cXFwiZmFsc2VcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXByaW1hcnkgZHJvcGRvd24tdG9nZ2xlIG14LTIgcHgtNFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IG14LTQgZmEtZm9sZGVyLW9wZW4tb1xcXCI+PC9pPjwvYnV0dG9uPjxkaXYgY2xhc3M9XFxcImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1yaWdodFxcXCI+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZXhhbXBsZT1cXFwiZXhfMDFcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1pdGVtXFxcIj5FeC4gMTogXFxcIkhlbGxvIVxcXCI8L2J1dHRvbj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1leGFtcGxlPVxcXCJleF8wMlxcXCIgY2xhc3M9XFxcImRyb3Bkb3duLWl0ZW1cXFwiPkV4LiAyOiBcXFwiUmVzdW3DqFxcXCI8L2J1dHRvbj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1leGFtcGxlPVxcXCJleF8wM1xcXCIgY2xhc3M9XFxcImRyb3Bkb3duLWl0ZW1cXFwiPkV4LiAzOiBFbSBEYXNoICjigJQpPC9idXR0b24+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZXhhbXBsZT1cXFwiZXhfMDRcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1pdGVtXFxcIj5FeC4gNDogQ1RSTCArIEFMVCArIERFTEVURTwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGhyLz48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJjb250ZW50XFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBmbGV4LXJvdyBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGkgY2xhc3M9XFxcImQtZmxleCBmYSBmYS1mdyBmYS0yeCBmYS1xdWVzdGlvbi1jaXJjbGUtbyBtci0xXFxcIj48L2k+PHAgc3R5bGU9XFxcImxldHRlci1zcGFjaW5nOiAwLjI1cmVtOyBmb250LXdlaWdodDogMjAwO1xcXCIgY2xhc3M9XFxcImQtZmxleCBsZWFkIG0tMFxcXCI+Q2xpY2sgYSBrZXkgdG8gZWRpdDwvcD48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobGFiZWwpIHtcbmJ1Zi5wdXNoKFwiPHNwYW4+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBsYWJlbCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zcGFuPlwiKTt9LmNhbGwodGhpcyxcImxhYmVsXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5sYWJlbDp0eXBlb2YgbGFiZWwhPT1cInVuZGVmaW5lZFwiP2xhYmVsOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvdyBoLTEwMCB3LTEwMCBlZGl0b3ItLW92ZXJsYXlcXFwiPjxkaXYgZGF0YS1yZWdpb249XFxcImVkaXRvclxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBwdC0yXFxcIj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3cgZGV2aWNlLS1vdmVybGF5XFxcIj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJkZXZpY2VcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcInNlbGVjdG9yXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyIHB0LTVcXFwiPjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChhY3RpdmVfcG9zaXRpb24sIGtleSwgc2hpZnQsIHNwZWNpYWwpIHtcbmphZGVfbWl4aW5zW1wicG9zaXRpb25TZWxlY3RcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8c3BhbiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCJcIiArIChqYWRlLmF0dHIoXCJ0aXRsZVwiLCBvcHRzLnRvb2x0aXAsIHRydWUsIGZhbHNlKSkgKyBcIiBkYXRhLXBsYWNlbWVudD1cXFwiYm90dG9tXFxcIlwiICsgKGphZGUuY2xzKFsnZmEtc3RhY2snLCdmYS1sZycsJ3Bvc2l0aW9uLS1zZWxlY3QnLGBwb3NpdGlvbl8ke29wdHMucG9zaXRpb259YF0sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+PGkgY2xhc3M9XFxcImZhIGZhLWNpcmNsZS10aGluIGZhLXN0YWNrLTJ4XFxcIj48L2k+PGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLXBvc2l0aW9uXCIsIG9wdHMucG9zaXRpb24sIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydmYScsJ2ZhLXN0YWNrLTF4JyxvcHRzLmNzc10sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT48L3NwYW4+XCIpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdlwiICsgKGphZGUuY2xzKFsna2V5JywnZC1mbGV4Jyx0eXBlb2Ygc3BlY2lhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwiXCIgOiBcInNwZWNpYWxcIl0sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjxkaXYgY2xhc3M9XFxcImlubmVyIGNvbnRlbnRcXFwiPlwiKTtcbmlmICgga2V5ICYmIHNoaWZ0KVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJzaGlmdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBzaGlmdCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBrZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBrZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmJ1Zi5wdXNoKFwiPC9kaXY+PGRpdiBjbGFzcz1cXFwiaW5uZXIgaG92ZXJcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1sZyBmYS10aW1lc1xcXCI+PC9pPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInBvc2l0aW9uIG10LTJcXFwiPlwiKTtcbmphZGVfbWl4aW5zW1wicG9zaXRpb25TZWxlY3RcIl0oYWN0aXZlX3Bvc2l0aW9uKTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiYWN0aXZlX3Bvc2l0aW9uXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5hY3RpdmVfcG9zaXRpb246dHlwZW9mIGFjdGl2ZV9wb3NpdGlvbiE9PVwidW5kZWZpbmVkXCI/YWN0aXZlX3Bvc2l0aW9uOnVuZGVmaW5lZCxcImtleVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgua2V5OnR5cGVvZiBrZXkhPT1cInVuZGVmaW5lZFwiP2tleTp1bmRlZmluZWQsXCJzaGlmdFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc2hpZnQ6dHlwZW9mIHNoaWZ0IT09XCJ1bmRlZmluZWRcIj9zaGlmdDp1bmRlZmluZWQsXCJzcGVjaWFsXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5zcGVjaWFsOnR5cGVvZiBzcGVjaWFsIT09XCJ1bmRlZmluZWRcIj9zcGVjaWFsOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInR5cGVcXFwiIHZhbHVlPVxcXCJtYWNyb1xcXCIgcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIi8+PGRpdiBkYXRhLXJlZ2lvbj1cXFwibWFjcm9cXFwiIGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGhyLz48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJjb250cm9sc1xcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxwIGNsYXNzPVxcXCJsZWFkIHRleHQtY2VudGVyXFxcIj5NYWNyb3M8YnIvPjxzbWFsbD5FeGVjdXRlIGtleXN0cm9rZXMgaW4gYSBzcGVjaWZpYyBzZXF1ZW5jZTwvc21hbGw+PC9wPjxzbWFsbCBzdHlsZT1cXFwiZm9udC1zaXplOiAxcmVtO1xcXCIgY2xhc3M9XFxcInRleHQtbXV0ZWQgZC1mbGV4IGZsZXgtcm93IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyXFxcIj48ZGl2IGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1xdWVzdGlvbi1jaXJjbGUtbyBtci0xIGQtZmxleCBmbGV4LWNvbHVtblxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZC1mbGV4IGZsZXgtcm93XFxcIj48c3Bhbj5Vc2UgdGhlIGtleXMgYmVsb3csIG9yIGNsaWNrJm5ic3A7PC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0ZXh0LWRhbmdlclxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLWNpcmNsZSB0ZXh0LWRhbmdlclxcXCI+PC9pPiByZWNvcmQmbmJzcDs8L3NwYW4+Jm5ic3A7dG8gc3RhcnQgdHlwaW5nPC9kaXY+PC9zbWFsbD5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmphZGVfbWl4aW5zW1wiZm9ybUdyb3VwXCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGZpZWxkc2V0XCIgKyAoamFkZS5jbHMoWydmb3JtLWdyb3VwJyxvcHRzLmZvcm1Hcm91cENzc10sIFtudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIG9wdHMubGFiZWwpXG57XG5idWYucHVzaChcIjxsYWJlbCBjbGFzcz1cXFwiZm9ybS1jb250cm9sLWxhYmVsXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMubGFiZWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGFiZWw+XCIpO1xufVxuYmxvY2sgJiYgYmxvY2soKTtcbmJ1Zi5wdXNoKFwiPC9maWVsZHNldD5cIik7XG59O1xuYnVmLnB1c2goXCJcIik7XG5qYWRlX21peGluc1tcImZvcm1JbnB1dFwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5qYWRlX21peGluc1tcImZvcm1Hcm91cFwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCI8aW5wdXRcIiArIChqYWRlLmF0dHJzKGphZGUubWVyZ2UoW3tcInBsYWNlaG9sZGVyXCI6IGphZGUuZXNjYXBlKG9wdHMucGxhY2Vob2xkZXIpLFwibmFtZVwiOiBqYWRlLmVzY2FwZShvcHRzLm5hbWUpLFwidHlwZVwiOiBqYWRlLmVzY2FwZShvcHRzLnR5cGUpLFwiY2xhc3NcIjogXCJmb3JtLWNvbnRyb2xcIn0sYXR0cmlidXRlc10pLCBmYWxzZSkpICsgXCIvPlwiKTtcbn1cbn0sIG9wdHMpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJ0eXBlXFxcIiB2YWx1ZT1cXFwidGV4dFxcXCIgcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIi8+XCIpO1xuamFkZV9taXhpbnNbXCJmb3JtSW5wdXRcIl0uY2FsbCh7XG5hdHRyaWJ1dGVzOiBqYWRlLm1lcmdlKFt7IGNsYXNzOiAnZm9ybS1jb250cm9sLWxnJyB9XSlcbn0sIHsgbmFtZTogJ3RleHRfdmFsdWUnLCB0eXBlOiAndGV4dCcsIHBsYWNlaG9sZGVyOiAnRW50ZXIgc29tZSB0ZXh0IGhlcmUuLi4nIH0pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5jbGFzcyBUZXh0RWRpdG9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdydcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RleHRfZWRpdG9yJylcblxuICBvblJlbmRlcjogLT5cbiAgICBCYWNrYm9uZS5TeXBob24uZGVzZXJpYWxpemUoQCwgeyB0eXBlOiAndGV4dCcsIHRleHRfdmFsdWU6IEBtb2RlbC5nZXQoJ3RleHRfdmFsdWUnKSB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0RWRpdG9yXG4iLCJcbiMgRHVtbXkgRGV2aWNlIERhdGEgZm9yIFVJIGRldmVsb3BtZW50XG4jIFRPRE8gLSBwdWxsIGZyb20gV2ViVVNCP1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBpZDogJ2RldmljZV8xJyxcbiAgICBsYWJlbDogJ0FsZXhcXCdzIEFzdHJvS2V5JyxcbiAgICBzdGF0dXNfY29kZTogMSxcbiAgICBrZXlzOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnZGV2aWNlXzFfa2V5XzEnLFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICB0eXBlOiAnbWFjcm8nLFxuICAgICAgICAgIG1hY3JvczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIyXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiQVwiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogNjUsXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogMSxcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIyXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiU1wiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogODMsXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogMixcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiVFwiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogODQsXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogMyxcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiUlwiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogODIsXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogNCxcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiT1wiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogNzksXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogNSxcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIyXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiS1wiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogNzUsXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogNixcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiRVwiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogNjksXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogNyxcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInJvd1wiOiBcInIzXCIsXG4gICAgICAgICAgICAgIFwia2V5XCI6IFwiWVwiLFxuICAgICAgICAgICAgICBcImtleWNvZGVcIjogODksXG4gICAgICAgICAgICAgIFwib3JkZXJcIjogOCxcbiAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzInLCBjb25maWc6IHsgdHlwZTogJ3RleHQnLCB0ZXh0X3ZhbHVlOiAnSGVsbG8gd29ybGQhJyB9IH1cbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfMycsIGNvbmZpZzogeyB0eXBlOiAnbWFjcm8nLCBtYWNyb3M6IFtdIH0gfVxuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV80JywgY29uZmlnOiB7IHR5cGU6ICd0ZXh0JywgdGV4dF92YWx1ZTogJ0hlbGxvLCBhZ2FpbicgfSB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzUnLCBjb25maWc6IHsgdHlwZTogJ21hY3JvJywgbWFjcm9zOiBbXSB9IH1cbiAgICBdXG4gIH1cbl1cbiIsIk1hY3JvRW50aXRpZXMgPSByZXF1aXJlKCcuLi9tYWNyby9lbnRpdGllcycpXG5cbiMgIyAjICMgI1xuXG4jIEFzdHJvS2V5Q29uZmlnIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEFzdHJva2V5Q29uZmlnIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6IHtcbiAgICB0eXBlOiAnbWFjcm8nXG4gICAgbWFjcm9zOiBbXVxuICAgIHRleHRfdmFsdWU6ICcnXG4gICAga2V5X3ZhbHVlOiAnJ1xuICB9XG5cbiAgIyBCYWNrYm9uZS5SZWxhdGlvbmFsIC0gQHJlbGF0aW9ucyBkZWZpbml0aW9uXG4gIHJlbGF0aW9uczogW1xuICAgICAgdHlwZTogICAgICAgICAgIEJhY2tib25lLkhhc01hbnlcbiAgICAgIGtleTogICAgICAgICAgICAnbWFjcm9zJ1xuICAgICAgcmVsYXRlZE1vZGVsOiAgIE1hY3JvRW50aXRpZXMuTW9kZWxcbiAgICAgIGNvbGxlY3Rpb25UeXBlOiBNYWNyb0VudGl0aWVzLkNvbGxlY3Rpb25cbiAgXVxuXG4jICMgIyAjICNcblxuIyBBc3Ryb2tleU1vZGVsIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEFzdHJva2V5TW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIERlZmF1bHQgYXR0cmlidXRlc1xuICBkZWZhdWx0czpcbiAgICBvcmRlcjogbnVsbFxuICAgIGNvbmZpZzoge31cblxuICAjIEJhY2tib25lLlJlbGF0aW9uYWwgLSBAcmVsYXRpb25zIGRlZmluaXRpb25cbiAgcmVsYXRpb25zOiBbXG4gICAgICB0eXBlOiAgICAgICAgICAgQmFja2JvbmUuSGFzT25lXG4gICAgICBrZXk6ICAgICAgICAgICAgJ2NvbmZpZydcbiAgICAgIHJlbGF0ZWRNb2RlbDogICBBc3Ryb2tleUNvbmZpZ1xuICBdXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBBc3Ryb2tleUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBBc3Ryb2tleU1vZGVsXG4gIGNvbXBhcmF0b3I6ICdvcmRlcidcblxuIyAjICMgIyAjXG5cbiMgRGV2aWNlTW9kZWwgZGVmaW5pdGlvblxuY2xhc3MgRGV2aWNlTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIEJhY2tib25lLlJlbGF0aW9uYWwgLSBAcmVsYXRpb25zIGRlZmluaXRpb25cbiAgcmVsYXRpb25zOiBbXG4gICAgICB0eXBlOiAgICAgICAgICAgQmFja2JvbmUuSGFzTWFueVxuICAgICAga2V5OiAgICAgICAgICAgICdrZXlzJ1xuICAgICAgcmVsYXRlZE1vZGVsOiAgIEFzdHJva2V5TW9kZWxcbiAgICAgIGNvbGxlY3Rpb25UeXBlOiBBc3Ryb2tleUNvbGxlY3Rpb25cbiAgXVxuXG4jICMgIyAjICNcblxuIyBEZXZpY2VDb2xsZWN0aW9uIGRlZmluaXRpb25cbmNsYXNzIERldmljZUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBEZXZpY2VNb2RlbFxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPVxuICBNb2RlbDogICAgICBEZXZpY2VNb2RlbFxuICBDb2xsZWN0aW9uOiBEZXZpY2VDb2xsZWN0aW9uXG4iLCJFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKVxuRGV2aWNlRGF0YSA9IHJlcXVpcmUoJy4vZGF0YScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VGYWN0b3J5IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAnZGV2aWNlIG1vZGVsJzogICAgICAgJ2dldE1vZGVsJ1xuICAgICdkZXZpY2UgY29sbGVjdGlvbic6ICAnZ2V0Q29sbGVjdGlvbidcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjYWNoZWRDb2xsZWN0aW9uID0gbmV3IEVudGl0aWVzLkNvbGxlY3Rpb24oRGV2aWNlRGF0YSwgeyBwYXJzZTogdHJ1ZSB9KVxuXG4gIGdldE1vZGVsOiAoaWQpIC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uLmdldChpZClcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBAY2FjaGVkQ29sbGVjdGlvblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRGV2aWNlRmFjdG9yeSgpXG4iLCJMYXlvdXRWaWV3ICA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jICMgIyAjICNcblxuY2xhc3MgSG9tZVJvdXRlIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGUnXG5cbiAgdGl0bGU6ICdBc3Ryb0tleSBIb21lJ1xuXG4gIGJyZWFkY3J1bWJzOiBbeyB0ZXh0OiAnRGV2aWNlJyB9XVxuXG4gIGZldGNoOiAtPlxuICAgIEBkZXZpY2VNb2RlbCA9IFJhZGlvLmNoYW5uZWwoJ2RldmljZScpLnJlcXVlc3QoJ21vZGVsJywgJ2RldmljZV8xJylcblxuICByZW5kZXI6IC0+XG4gICAgY29uc29sZS5sb2coQGRldmljZU1vZGVsKTsgIyBEZWJ1Z1xuICAgIEBjb250YWluZXIuc2hvdyBuZXcgTGF5b3V0Vmlldyh7IG1vZGVsOiBAZGV2aWNlTW9kZWwgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSG9tZVJvdXRlXG4iLCJcbmNsYXNzIEhvbWVMYXlvdXRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9sYXlvdXQnXG4gIGNsYXNzTmFtZTogJ2NvbnRhaW5lci1mbHVpZCBoLTEwMCdcblxuIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWVMYXlvdXRWaWV3XG5cblxuXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3cgaC0xMDBcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PHAgY2xhc3M9XFxcImxlYWRcXFwiPkFzdHJvS2V5PC9wPjxoci8+PHAgY2xhc3M9XFxcImxlYWRcXFwiPkNvbm5lY3QgYW4gQXN0cm9LZXkgZGV2aWNlIHRvIGdldCBzdGFydGVkPC9wPjxoci8+PGEgaHJlZj1cXFwiI2RldmljZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tb3V0bGluZS1wcmltYXJ5XFxcIj5ERVZJQ0U8L2E+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInJlcXVpcmUgJy4vZmFjdG9yeSdcbkhvbWVSb3V0ZSA9IHJlcXVpcmUgJy4vaG9tZS9yb3V0ZSdcbkRhc2hib2FyZFJvdXRlID0gcmVxdWlyZSAnLi9kYXNoYm9hcmQvcm91dGUnXG5cbiMgIyAjICMgI1xuXG4jIE1haW5Sb3V0ZXIgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgTWFpblJvdXRlciBleHRlbmRzIHJlcXVpcmUgJ2huX3JvdXRpbmcvbGliL3JvdXRlcidcblxuICByb3V0ZXM6XG4gICAgJygvKSc6ICAgICAgICAnaG9tZSdcbiAgICAjICdkZXZpY2UoLyknOiAnZGFzaGJvYXJkJ1xuXG4gIGhvbWU6IC0+XG4gICAgbmV3IERhc2hib2FyZFJvdXRlKHsgY29udGFpbmVyOiBAY29udGFpbmVyIH0pXG4gICAgIyBuZXcgSG9tZVJvdXRlKHsgY29udGFpbmVyOiBAY29udGFpbmVyIH0pXG5cbiAgIyBkYXNoYm9hcmQ6IC0+XG4gICMgICBuZXcgRGFzaGJvYXJkUm91dGUoeyBjb250YWluZXI6IEBjb250YWluZXIgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWFpblJvdXRlclxuIiwiXG4jIEZpbHRlcnMgdXNlZCB0byBxdWVyeSBXZWJVU0IgZGV2aWNlc1xuIyBUT0RPIC0gdXBkYXRlIGZpbHRlcnMgdG8gcXVlcnkgZGV2aWNlcyBieSBBc3Ryb0tleSBWZW5kb3JJRFxucmVxdWVzdERldmljZUZpbHRlcnMgPSBbXG4gIHsgdmVuZG9ySWQ6IDB4MTBjNCB9XG5dXG5cbiMgIyAjICNcblxuIyBVc2JTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgUmVzcG9uc2libGUgZm9yIG1hbmFnaW5nIFVTQiBkZXZpY2VzXG4jIC0gZmV0Y2ggYWxsIGRldmljZXNcbmNsYXNzIFVzYlNlcnZpY2UgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb1JlcXVlc3RzOlxuICAgICd1c2IgZGV2aWNlcyc6ICdnZXREZXZpY2VzJ1xuXG4gICMgZ2V0RGV2aWNlc1xuICBnZXREZXZpY2VzOiAtPlxuXG4gICAgIyBSZXR1cm5zIGEgUHJvbWlzZSB0byBtYW5hZ2UgYXN5bmNob25vdXMgYmVoYXZpb3JcbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgIyBTdGVwIDEgLSBSZXF1ZXN0IGRldmljZVxuICAgICAgbmF2aWdhdG9yLnVzYi5yZXF1ZXN0RGV2aWNlKHsgZmlsdGVyczogcmVxdWVzdERldmljZUZpbHRlcnMgfSlcbiAgICAgIC50aGVuKCAoZGV2aWNlKSA9PlxuXG4gICAgICAgICMgVE9ETyAtIHJlbW92ZVxuICAgICAgICAjIGNvbnNvbGUubG9nIGRldmljZVxuXG4gICAgICAgICMgU3RlcCAyIC0gR2V0IERldmljZXNcbiAgICAgICAgIyBUT0RPIC0gdmVyaWZ5IHRoaXMgd29ya2Zsb3dcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2IuZ2V0RGV2aWNlcygpLnRoZW4oKGQpID0+XG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhkKVxuXG4gICAgICAgICAgZCA9IGRbMF1cblxuICAgICAgICAgICMgU1RFUCAzIC0gb3BlbiBkZXZpY2VcbiAgICAgICAgICBkLm9wZW4oKS50aGVuID0+XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdvcGVuJ1xuXG4gICAgICAgICAgICAjIFN0ZXAgNCAtIHNlbGVjdCBjb25maWd1cmF0aW9uXG4gICAgICAgICAgICBkLnNlbGVjdENvbmZpZ3VyYXRpb24oMSkudGhlbiA9PlxuXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nICdzZWxlY3RDb25maWd1cmF0aW9uJ1xuXG4gICAgICAgICAgICAgIHdpbmRvdy5kID0gZFxuXG4gICAgICAgICAgICAgICMgU1RFUCA1IC0gY29udHJvbFRyYW5zZmVySW5cbiAgICAgICAgICAgICAgIyB3aW5kb3cuZC5jb250cm9sVHJhbnNmZXJJbih7J3JlcXVlc3RUeXBlJzogJ3N0YW5kYXJkJywgJ3JlY2lwaWVudCc6ICdkZXZpY2UnLCAncmVxdWVzdCc6IDB4MDYsICd2YWx1ZSc6IDB4MEYwMCwgJ2luZGV4JzogMHgwMH0sIDUpLnRoZW4oIChyKSA9PiB7IGNvbnNvbGUubG9nKHIpIH0pXG5cblxuICAgICAgICApXG5cbiAgICAgIClcblxuICAjIHNlbmRcbiAgc2VuZDogLT5cblxuICAgIHdpbmRvdy5kLmNvbnRyb2xUcmFuc2Zlck91dCh7XG4gICAgICAgIHJlcXVlc3RUeXBlOiAgJ3ZlbmRvcicsXG4gICAgICAgIHJlY2lwaWVudDogICAgJ2RldmljZScsXG4gICAgICAgIHJlcXVlc3Q6ICAgICAgMHgwMyxcbiAgICAgICAgdmFsdWU6ICAgICAgICAweDAwMTMsICMgV2hhdGV2ZXIgd2Ugd2FudCAodG8gc29tZSBleHRlbnQpXG4gICAgICAgIGluZGV4OiAgICAgICAgMHgwMDAxICAjIFRPRE8gLSBXZSBjYW4gdXNlIGluZGV4IGZvciB0aGUga2V5IHRoZSBtYWNybyBjb3JyZXNwb25kcyB0byAobG93LWJ5dGUgPSBrZXksIGhpZ2gtYnl0ZSA9IG51bWJlciBvZiBhY3Rpb25zIGluIHRoZSBtYWNybylcbiAgICB9LCBkYXRhKTtcblxuXG4jICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFVzYlNlcnZpY2UoKVxuIixudWxsLCJcbiMgUHJvdmlkZXMgdXBkYXRlQXR0cnMgbWV0aG9kIHVzZWQgYnkgYmluZENoZWNrYm94ZXMsIGJpbmRJbnB1dHMsIGJpbmRSYWRpb3MsIGJpbmRTZWxlY3RzXG5jbGFzcyBCaW5kQmFzZSBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1cGRhdGVBdHRyczogKGUpIC0+XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIEB2aWV3Lm1vZGVsLnNldChCYWNrYm9uZS5TeXBob24uc2VyaWFsaXplKEApKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5kQmFzZVxuIiwiXG4jIERhdGFiaW5kaW5nIGZvciBmb3JtIGlucHV0c1xuY2xhc3MgQmluZElucHV0cyBleHRlbmRzIHJlcXVpcmUgJy4vYmluZEJhc2UnXG5cbiAgZXZlbnRzOlxuICAgICdpbnB1dCBpbnB1dCc6ICAndXBkYXRlQXR0cnMnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbmRJbnB1dHNcbiIsIlxuX3NlbmRGbGFzaCA9ICh0eXBlLCBvYmopIC0+XG4gIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykudHJpZ2dlcih0eXBlLCBvYmopXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBGbGFzaGVzQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnM9e30pIC0+XG4gICAgQHZpZXcuX2ZsYXNoZXMgICAgICA9IEBvcHRpb25zXG4gICAgQHZpZXcuZmxhc2hFcnJvciAgICA9IEBmbGFzaEVycm9yXG4gICAgQHZpZXcuZmxhc2hTdWNjZXNzICA9IEBmbGFzaFN1Y2Nlc3NcblxuICBmbGFzaEVycm9yOiAob2JqPXt9KSAtPlxuICAgIF9zZW5kRmxhc2goJ2Vycm9yJywgQF9mbGFzaGVzWydlcnJvciddIHx8IG9iailcblxuICBmbGFzaFN1Y2Nlc3M6IChvYmo9e30pIC0+XG4gICAgX3NlbmRGbGFzaCgnc3VjY2VzcycsIEBfZmxhc2hlc1snc3VjY2VzcyddIHx8IG9iailcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hlc0JlaGF2aW9yXG4iLCJcbmNsYXNzIE1vZGVsRXZlbnRzQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgbW9kZWxFdmVudHM6XG4gICAgJ3JlcXVlc3QnOiAgJ29uTW9kZWxSZXF1ZXN0J1xuICAgICdzeW5jJzogICAgICdvbk1vZGVsU3luYydcbiAgICAnZXJyb3InOiAgICAnb25Nb2RlbEVycm9yJ1xuXG4gIG9uTW9kZWxSZXF1ZXN0OiAobW9kZWwsIHN0YXR1cywgb3B0aW9ucykgLT5cbiAgICBAdmlldy5vblJlcXVlc3Q/KG1vZGVsLCBzdGF0dXMsIG9wdGlvbnMpXG5cbiAgb25Nb2RlbFN5bmM6IChtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpIC0+XG4gICAgQHZpZXcub25TeW5jPyhtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpXG5cbiAgb25Nb2RlbEVycm9yOiAobW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKSAtPlxuICAgIEB2aWV3Lm9uRXJyb3I/KG1vZGVsLCByZXNwb25zZSwgb3B0aW9ucylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kZWxFdmVudHNCZWhhdmlvclxuIiwiXG4jIFN1Ym1pdEJ1dHRvbkJlaGF2aW9yIGNsYXNzIGRlZmluaXRpb25cbiMgUHJvdmlkZXMgYW4gZXZlbnQgbGlzdGVuZXIgYW5kIGhhbmRsZXIsIGFuZCBkZWZpbmVzXG4jIGFzc29jaWF0ZWQgY2FsbGJhY2tzIG9uIHRoZSB2aWV3IHRvIHdoaWNoIHRoZSBiZWhhdmlvclxuIyBpcyBhdHRhY2hlZC4gVGhpcyBpcyB1c2VkIGluIHRoZSBQYXNzd29yZCBhbmQgU25pcHBldCBmb3Jtcy5cbmNsYXNzIFN1Ym1pdEJ1dHRvbkJlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIHVpOlxuICAgIHN1Ym1pdDogJ1tkYXRhLWNsaWNrPXN1Ym1pdF0nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuc3VibWl0Om5vdCguZGlzYWJsZWQpJzogJ29uU3VibWl0Q2xpY2snXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnM9e30pIC0+XG4gICAgQHZpZXcuZGlzYWJsZVN1Ym1pdCA9ID0+IEBkaXNhYmxlU3VibWl0KClcbiAgICBAdmlldy5lbmFibGVTdWJtaXQgID0gPT4gQGVuYWJsZVN1Ym1pdCgpXG5cbiAgb25TdWJtaXRDbGljazogKGUpIC0+IEB2aWV3Lm9uU3VibWl0PyhlKVxuICBkaXNhYmxlU3VibWl0OiAtPiBAdWkuc3VibWl0LmFkZENsYXNzKCdkaXNhYmxlZCcpXG4gIGVuYWJsZVN1Ym1pdDogLT4gIEB1aS5zdWJtaXQucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU3VibWl0QnV0dG9uQmVoYXZpb3JcbiIsIlxuY2xhc3MgVG9vbHRpcEJlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIHVpOlxuICAgIHRvb2x0aXBzOiAnW2RhdGEtdG9nZ2xlPXRvb2x0aXBdJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgIyBQcm94aWVzIGNsZWFyIG1ldGhvZCB0byBiZSBhY2Nlc3NpYmxlIGluc2lkZSB0aGUgdmlld1xuICAgIEB2aWV3LmNsZWFyVG9vbHRpcHMgPSA9PiBAY2xlYXIoKVxuXG4gIGNsZWFyOiAtPlxuICAgIEB1aS50b29sdGlwcy50b29sdGlwKCdoaWRlJylcbiAgICBAdWkudG9vbHRpcHMudG9vbHRpcCgnZGlzcG9zZScpXG5cbiAgb25SZW5kZXI6IC0+IEB1aS50b29sdGlwcz8udG9vbHRpcCgpXG4gIG9uQmVmb3JlRGVzdHJveTogLT4gQGNsZWFyKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gVG9vbHRpcEJlaGF2aW9yXG4iLCJcbiMgQXNzaWducyBNYXJpb25ldHRlLkRlY29yYXRvclxuTWFyaW9uZXR0ZS5EZWNvcmF0b3IgPSByZXF1aXJlICcuL2RlY29yYXRvcidcblxuIyBPdmVycmlkZXMgZGVmYXVsdCBzZXJpYWxpemVNb2RlbCgpIG1ldGhvZCBkZWZpbml0aW9uXG4jIEluIHRoZSBjb250ZXh0IHRoZSBzZXJpYWxpemVNb2RlbCBtZXRob2QsICd0aGlzJ1xuIyByZWZlcnMgdG8gdGhlIHZpZXcgaW5zdGFuY2UgaW5zaWRlIHdoaWNoIHRoZVxuIyBzZXJpYWxpemVNb2RlbCBtZXRob2Qgd2FzIGludm9rZWRcbk1hcmlvbmV0dGUuVmlldy5wcm90b3R5cGUuc2VyaWFsaXplTW9kZWwgPSAtPlxuXG4gICMgSWYgdGhpcy5tb2RlbCBpcyBub3QgZGVmaW5lZCwgcmV0dXJuIGFuIGVtcHR5IG9iamVjdFxuICBpZiAhdGhpcy5tb2RlbFxuICAgIHJldHVybiB7fVxuXG4gICMgSWYgdGhpcy5tb2RlbCBleGlzdHMsIGFuZCBoYXMgYSBkZWNvcmF0b3IgZGVmaW5lZCxcbiAgIyByZXR1cm4gdGhlIHRoaXMubW9kZWwncyBhdHRyaWJ1dGVzIGFuZCBkZWNvcmF0aW9uc1xuICBlbHNlIGlmIHRoaXMubW9kZWwuZGVjb3JhdG9yXG4gICAgcmV0dXJuIHRoaXMubW9kZWwuZGVjb3JhdG9yLmRlY29yYXRlKHRoaXMubW9kZWwpXG5cbiAgIyBPdGhlcndpc2UsIHJldHVybiB0aGUgY2xvbmVkIGF0dHJpYnV0ZXMgb2YgdGhpcy5tb2RlbFxuICByZXR1cm4gXy5jbG9uZSB0aGlzLm1vZGVsLmF0dHJpYnV0ZXNcbiIsIlxuIyBCYXNlRGVjb3JhdG9yIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIHNpbXBsZSBjbGFzcyB0byBkZWNvcmF0ZSBtb2RlbHMgd2hlblxuIyB0aGV5IGFyZSBzZXJpYWxpemVkIGludG8gYSB2aWV3J3MgdGVtcGxhdGVcbmNsYXNzIEJhc2VEZWNvcmF0b3JcblxuICAjIERlY29yYXRpb24gbWV0aG9kXG4gICMgSW52b2tlZCBpbiBNYXJpb25ldHRlLlZpZXcucHJvdG90eXBlLnNlcmlhbGl6ZU1vZGVsXG4gIEBkZWNvcmF0ZTogKG1vZGVsKSAtPlxuXG4gICAgIyBDbG9uZXMgbW9kZWwncyBhdHRyaWJ1dGVzXG4gICAgIyBDbG9uaW5nIHByZXZlbnRzIGNvbnRhbWluYXRpb24gb2ZcbiAgICBkYXRhID0gXy5jbG9uZShtb2RlbC5hdHRyaWJ1dGVzKVxuXG4gICAgIyBJdGVyYXRlcyBvdmVyIGVhY2ggZnVuY3Rpb24gaW4gcHJvdG90eXBlXG4gICAgIyBMZXZlcmFnZXMgVW5kZXJzY29yZS5qcyBfLmZ1bmN0aW9ucygpXG4gICAgZm9yIGZ1bmMgaW4gXy5mdW5jdGlvbnMoQHByb3RvdHlwZSlcblxuICAgICAgIyBTa2lwIGNvbnN0cnVjdG9yXG4gICAgICBjb250aW51ZSBpZiBmdW5jID09ICdjb25zdHJ1Y3RvcidcblxuICAgICAgIyBBc3NpZ25zIHZhbHVlIG9mIGZ1bmN0aW9uIHRvIGhhc2hcbiAgICAgIGRhdGFbZnVuY10gPSBAcHJvdG90eXBlW2Z1bmNdLmFwcGx5KG1vZGVsKVxuXG4gICAgIyBSZXR1cm5zIHRoZSBtb2RlbCdzIGF0dHJpYnV0ZXMgJiBkZWNvcmF0aW9uc1xuICAgIHJldHVybiBkYXRhXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VEZWNvcmF0b3JcbiIsIlxuIyBGbGFzaENvbGxlY3Rpb24gY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgYmFzaWMgQmFja2JvbmUuQ29sbGVjdGlvbiB0byBiZSB1c2VkIGJ5IHRoZVxuIyBGbGFzaENvbXBvbmVudCBmb3Igc3RvcmluZyBtdWx0aXBsZSBmbGFzaCBtb2RlbHNcbmNsYXNzIEZsYXNoQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IHJlcXVpcmUgJy4vbW9kZWwnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoQ29sbGVjdGlvblxuIiwicmVxdWlyZSAnLi9zZXJ2aWNlJ1xuRmxhc2hMaXN0ID0gcmVxdWlyZSAnLi92aWV3cy9mbGFzaExpc3QnXG5cbiMgIyAjICMgI1xuXG4jIEZsYXNoU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBjb21wb25lbnQgdG8gY3JlYXRlIGFuZCBkaXNwbGF5IGZsYXNoZXNcbiMgaW4gdGhlIGFwcC4gUHJvdmlkZXMgbXVsdGlwbGUgaW50ZXJmYWNlcyBpbiByYWRpb0V2ZW50c1xuIyB0byBoYW5kbGUgY29tbW9uIHR5cGVzIG9mIGZsYXNoZXMgKGVycm9yLCB3YXJuaW5nLCBzdWNjZXNzKVxuY2xhc3MgRmxhc2hDb21wb25lbnQgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlNlcnZpY2VcblxuICBpbml0aWFsaXplOiAob3B0aW9ucyA9IHt9KSAtPlxuICAgIEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykucmVxdWVzdCgnY29sbGVjdGlvbicpLnRoZW4gKGNvbGxlY3Rpb24pID0+XG4gICAgICBAY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25cbiAgICAgIEBjb2xsZWN0aW9uLm9uICd1cGRhdGUnLCBAc2hvd0xpc3RWaWV3LCBAXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2ZsYXNoIGFkZCc6ICAgICAgJ2FkZCdcbiAgICAnZmxhc2ggcmVzZXQnOiAgICAncmVzZXQnXG4gICAgJ2ZsYXNoIGVycm9yJzogICAgJ2Vycm9yJ1xuICAgICdmbGFzaCB3YXJuaW5nJzogICd3YXJuaW5nJ1xuICAgICdmbGFzaCBzdWNjZXNzJzogICdzdWNjZXNzJ1xuXG4gIGFkZDogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQob3B0aW9ucylcblxuICByZXNldDogLT5cbiAgICBAY29sbGVjdGlvbi5yZXNldCgpXG5cbiAgZXJyb3I6IChvcHRpb25zPXt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZCBfLmV4dGVuZCggb3B0aW9ucywgeyBjb250ZXh0OiAgJ2RhbmdlcicgfSlcblxuICB3YXJuaW5nOiAob3B0aW9ucz17fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQgXy5leHRlbmQoIG9wdGlvbnMsIHsgY29udGV4dDogICd3YXJuaW5nJyB9KVxuXG4gIHN1Y2Nlc3M6IChvcHRpb25zPXt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZCBfLmV4dGVuZCggb3B0aW9ucywgeyBjb250ZXh0OiAgJ3N1Y2Nlc3MnIH0pXG5cbiAgc2hvd0xpc3RWaWV3OiA9PlxuICAgIHVubGVzcyBAcmVuZGVyZWRcbiAgICAgIEBjb250YWluZXIuc2hvdyBuZXcgRmxhc2hMaXN0KHsgY29sbGVjdGlvbjogQGNvbGxlY3Rpb24gfSlcbiAgICAgIEByZW5kZXJlZCA9IHRydWVcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hDb21wb25lbnRcbiIsIlxuIyBGbGFzaE1vZGVsIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIEJhY2tib25lLk1vZGVsIHRvIG1hbmFnZSB2aWV3c1xuIyBkaXNwbGF5ZWQgaW4gdGhlIEZsYXNoQ29tcG9uZW50XG5jbGFzcyBGbGFzaE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblxuICBkZWZhdWx0czpcbiAgICB0aW1lb3V0OiA1MDAwXG4gICAgZGlzbWlzc2libGU6IHRydWVcbiAgICBjb250ZXh0OiAnaW5mbydcblxuICAjIEFsZXJ0IE1vZGVsIEF0dHJpYnV0ZXMgLyBPcHRpb25zXG4gICMgLSBtZXNzYWdlXG4gICMgLSBzdHJvbmdUZXh0IChwbGVhc2UgcmVuYW1lIHRvICdzdHJvbmcnICYgYWRkIGFwcHJvcHJpYXRlIHNwYWNpbmcgdG8gdGVtcGxhdGUpXG4gICMgLSBjb250ZXh0Q2xhc3MgKHBsZWFzZSByZW5hbWUgdG8gJ2NvbnRleHQnKVxuICAjIC0gdGltZW91dCAoZGVmYXVsdCBpcyA1IHNlY29uZHMpXG4gICMgLSBkaXNtaXNzaWJsZSAoZGVmYXVsdCBpcyB0cnVlKVxuXG4gIGRpc21pc3M6IC0+XG4gICAgQGNvbGxlY3Rpb24ucmVtb3ZlKEApXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoTW9kZWxcbiIsIkZsYXNoQ29sbGVjdGlvbiA9IHJlcXVpcmUgJy4vY29sbGVjdGlvbidcblxuIyAjICMgIyAjXG5cbiMgRmxhc2hTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lZCBhIGJhc2ljIHNlcnZpY2UgdG8gcmV0dXJuIHRoZSBGbGFzaGVzQ29sbGVjdGlvblxuIyB3aGVuIHJlcXVlc3RlZC4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBGbGFzaENvbXBvbmVudCB0byByZXRyaWV2ZVxuIyB0aGUgRmxhc2hDb2xsZWN0aW9uIGl0IGlzIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmdcbmNsYXNzIEZsYXNoU2VydmljZSBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ2ZsYXNoIGNvbGxlY3Rpb24nOiAnZ2V0Q29sbGVjdGlvbidcblxuICBhbGVydHM6IG51bGxcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBuZXcgUHJvbWlzZSAocmVzb2x2ZSxyZWplY3QpID0+XG4gICAgICBAYWxlcnRzIHx8PSBuZXcgRmxhc2hDb2xsZWN0aW9uKClcbiAgICAgIHJlc29sdmUoQGFsZXJ0cylcbiAgICAgIHJldHVyblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRmxhc2hTZXJ2aWNlKClcbiIsIiMgRmxhc2hDaGlsZCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBNYXJpb25ldHRlLkxheW91dFZpZXcgdG8gZGlzcGxheSBhIEZsYXNoTW9kZWwgaW5zdGFuY2VcbiMgVGhpcyB2aWV3IGF1dG8tZGlzbWlzc2VzIGFmdGVyIHRoZSB0aW1lb3V0IGRlZmluZWQgaW4gdGhlIEZsYXNoTW9kZWwgaW5zdGFuY2VcbmNsYXNzIEZsYXNoQ2hpbGQgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93J1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvZmxhc2hfY2hpbGQnXG5cbiAgYXR0cmlidXRlczpcbiAgICBzdHlsZTogJ2Rpc3BsYXk6bm9uZTsnXG5cbiAgdWk6XG4gICAgY2xvc2U6ICdbZGF0YS1jbGljaz1kaXNtaXNzXSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5jbG9zZSc6ICdkaXNtaXNzJ1xuXG4gIG9uU2hvdzogLT5cbiAgICB0aW1lb3V0ID0gQG1vZGVsLmdldCgndGltZW91dCcpXG4gICAgc2V0VGltZW91dCggQGRpc21pc3MsIHRpbWVvdXQgKVxuXG4gIG9uQXR0YWNoOiAtPlxuICAgIEAkZWwuZmFkZUluKClcblxuICByZW1vdmU6IC0+XG4gICAgQCRlbC5zbGlkZVRvZ2dsZSggPT5cbiAgICAgIE1hcmlvbmV0dGUuTGF5b3V0Vmlldy5wcm90b3R5cGUucmVtb3ZlLmNhbGwoQClcbiAgICApXG5cbiAgZGlzbWlzczogPT5cbiAgICBAbW9kZWwuY29sbGVjdGlvbj8ucmVtb3ZlKCBAbW9kZWwgKVxuXG4jIEZsYXNoTGlzdCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3IHRvIHRoZSBsaXN0IG9mIEZsYXNoZXNcbmNsYXNzIEZsYXNoTGlzdCBleHRlbmRzIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXdcbiAgY2xhc3NOYW1lOiAnY29udGFpbmVyLWZsdWlkJ1xuICBjaGlsZFZpZXc6IEZsYXNoQ2hpbGRcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hMaXN0XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChjb250ZXh0LCBkaXNtaXNzaWJsZSwgbWVzc2FnZSwgc3Ryb25nKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMiB0ZXh0LWNlbnRlclxcXCI+PGRpdiByb2xlPVxcXCJhbGVydFxcXCJcIiArIChqYWRlLmNscyhbJ2FsZXJ0JywnYWxlcnQtZGlzbWlzc2libGUnLCdmYWRlJywnaW4nLFwiYWxlcnQtXCIgKyBjb250ZXh0XSwgW251bGwsbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggZGlzbWlzc2libGUpXG57XG5idWYucHVzaChcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWNsaWNrPVxcXCJkaXNtaXNzXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInNyLW9ubHlcXFwiPkNsb3NlPC9zcGFuPjwvYnV0dG9uPlwiKTtcbn1cbmlmICggc3Ryb25nKVxue1xuYnVmLnB1c2goXCI8c3Ryb25nPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc3Ryb25nICsgXCIgXCIpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Ryb25nPlwiKTtcbn1cbmlmICggbWVzc2FnZSlcbntcbmJ1Zi5wdXNoKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbWVzc2FnZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKTtcbn1cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiY29udGV4dFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguY29udGV4dDp0eXBlb2YgY29udGV4dCE9PVwidW5kZWZpbmVkXCI/Y29udGV4dDp1bmRlZmluZWQsXCJkaXNtaXNzaWJsZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGlzbWlzc2libGU6dHlwZW9mIGRpc21pc3NpYmxlIT09XCJ1bmRlZmluZWRcIj9kaXNtaXNzaWJsZTp1bmRlZmluZWQsXCJtZXNzYWdlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5tZXNzYWdlOnR5cGVvZiBtZXNzYWdlIT09XCJ1bmRlZmluZWRcIj9tZXNzYWdlOnVuZGVmaW5lZCxcInN0cm9uZ1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc3Ryb25nOnR5cGVvZiBzdHJvbmchPT1cInVuZGVmaW5lZFwiP3N0cm9uZzp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJNb2RhbFZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5cbiMgIyAjICMgI1xuXG4jIFdpbmRvdyBldmVudCBsaXN0ZW5lciB0byBoaWRlIHRoZSBtb2RhbCB3aGVuIG5hdmlnYXRpb24gb2NjdXJzLlxuaGlkZU1vZGFsT25IYXNoQ2hhbmdlID0gLT4gd2luZG93Lm1vZGFsV2luZG93LmhpZGVNb2RhbCgpXG5cbiMgQWJzdHJhY3QgY2xhc3MgZm9yIG1vZGFsLWJhc2VkIGNvbXBvbmVudHMuXG5jbGFzcyBBYnN0cmFjdE1vZGFsQ29tcG9uZW50IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcblxuICBoaWRlTW9kYWw6IC0+XG4gICAgQG1vZGFsVmlldy5oaWRlTW9kYWwoKVxuXG4gIHNob3dNb2RhbDogKGNvbnRlbnRWaWV3LCBtb2RhbFZpZXdPcHRpb25zPXt9KSAtPlxuXG4gICAgICAjIE5ldyBNb2RhbCBWaWV3IChvdXIgdmlldyBpcyBzaG93biBpbnNpZGUgdGhpcyBvbmUpXG4gICAgICBAbW9kYWxWaWV3ID0gbmV3IE1vZGFsVmlldyhtb2RhbFZpZXdPcHRpb25zKVxuXG4gICAgICAjIFNob3cgdGhlIHZpZXcgaW5zaWRlIHRoZSBtb2RhbCB3cmFwcGVyLCBhZGRzIGhpZGVNb2RhbE9uSGFzaENoYW5nZSBldmVudCBsaXN0ZW5lclxuICAgICAgQG1vZGFsVmlldy5vbiAnc2hvdycsID0+XG4gICAgICAgIEBtb2RhbFZpZXcuY29udGVudFJlZ2lvbi5zaG93KCBjb250ZW50VmlldyApXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgaGlkZU1vZGFsT25IYXNoQ2hhbmdlKVxuICAgICAgICB3aW5kb3cubW9kYWxXaW5kb3cgPSBAbW9kYWxWaWV3XG5cbiAgICAgICMgUmVtb3ZlcyBoaWRlTW9kYWxPbkhhc2hDaGFuZ2UgZXZlbnQgbGlzdGVuZXJcbiAgICAgIEBtb2RhbFZpZXcub24gJ2Rlc3Ryb3knLCAtPlxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGhpZGVNb2RhbE9uSGFzaENoYW5nZSlcbiAgICAgICAgZGVsZXRlIHdpbmRvdy5tb2RhbFdpbmRvd1xuXG4gICAgICAjIG9uTW9kYWxIaWRkZW4gY2FsbGJhY2tcbiAgICAgIEBtb2RhbFZpZXcub24gJ2hpZGRlbjptb2RhbCcsID0+IEBvbk1vZGFsSGlkZGVuPygpXG5cbiAgICAgICMgU2hvdyB2aWV3IGluIHRoZSBtb2RhbFxuICAgICAgQGNvbnRhaW5lci5zaG93IEBtb2RhbFZpZXdcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RNb2RhbENvbXBvbmVudFxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobW9kYWxDc3MpIHtcbmJ1Zi5wdXNoKFwiPGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgZGF0YS1yZWdpb249XFxcIm1vZGFsLWNvbnRlbnRcXFwiXCIgKyAoamFkZS5jbHMoW21vZGFsQ3NzXSwgW3RydWVdKSkgKyBcIj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJtb2RhbENzc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubW9kYWxDc3M6dHlwZW9mIG1vZGFsQ3NzIT09XCJ1bmRlZmluZWRcIj9tb2RhbENzczp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbiMgTW9kYWxWaWV3IGNsYXNzIGRlZmluaXRpb25cbiMgUHJvdmlkZXMgYSBnZW5lcmljIHZpZXcgYW5kIHJlZ2lvbiBpbnRvIHdoaWNoXG4jIG90aGVyIHZpZXdzIGNhbiBjb252ZW5pZW50bHkgYmUgZGlzcGxheWVkIGluIGEgbW9kYWxcbmNsYXNzIE1vZGFsVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi9tb2RhbF90ZW1wbGF0ZSdcblxuICBhdHRyaWJ1dGVzOlxuICAgIHJvbGU6ICAgICAnZGlhbG9nJ1xuICAgIHRhYmluZGV4OiAnLTEnXG5cbiAgY2xhc3NOYW1lOiAnbW9kYWwgZmFkZSdcblxuICAjIFNldHMgbW9kYWwgc2l6ZSAtIG5vcm1hbCAvIHNtYWxsIC8gbGFyZ2VcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIHNpemUgPSBAb3B0aW9ucy5zaXplIHx8ICcnXG4gICAgY3NzID0gJ21vZGFsLWRpYWxvZydcbiAgICBjc3MgKz0gJyBtb2RhbC1zbScgaWYgc2l6ZSA9PSAnc21hbGwnXG4gICAgY3NzICs9ICcgbW9kYWwtbGcnIGlmIHNpemUgPT0gJ2xhcmdlJ1xuICAgIHJldHVybiB7IG1vZGFsQ3NzOiBjc3MgfVxuXG4gIHJlZ2lvbnM6XG4gICAgY29udGVudFJlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1tb2RhbC1jb250ZW50XSdcblxuICBldmVudHM6XG4gICAgJ3Nob3cuYnMubW9kYWwnICAgOiAtPiBAdHJpZ2dlck1ldGhvZCAnc2hvdzptb2RhbCdcbiAgICAnc2hvd24uYnMubW9kYWwnICA6IC0+IEB0cmlnZ2VyTWV0aG9kICdzaG93bjptb2RhbCdcbiAgICAnaGlkZS5icy5tb2RhbCcgICA6IC0+IEB0cmlnZ2VyTWV0aG9kICdoaWRlOm1vZGFsJ1xuICAgICdoaWRkZW4uYnMubW9kYWwnIDogLT4gQHRyaWdnZXJNZXRob2QgJ2hpZGRlbjptb2RhbCdcbiAgICAnbG9hZGVkLmJzLm1vZGFsJyA6IC0+IEB0cmlnZ2VyTWV0aG9kICdsb2FkZWQ6bW9kYWwnXG5cbiAgb25TaG93OiAtPlxuICAgIEAkZWwubW9kYWwoIEBvcHRpb25zLm1vZGFsT3B0aW9ucyB8fCB7fSApXG5cbiAgaGlkZU1vZGFsOiAtPlxuICAgIEAkZWwubW9kYWwoJ2hpZGUnKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFZpZXdcbiIsIlxuY2xhc3MgT3ZlcmxheVZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiBmYWxzZVxuICBjbGFzc05hbWU6ICdvdmVybGF5J1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2snOiAnb25DbGljaydcblxuICBvbkNsaWNrOiAtPlxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3NpZGViYXInKS50cmlnZ2VyKCdoaWRlJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIE92ZXJsYXlDb21wb25lbnQgZXh0ZW5kcyBNbi5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29udGFpbmVyICA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ292ZXJsYXkgcmVhZHknOiAgJ29uUmVhZHknXG4gICAgJ292ZXJsYXkgc2hvdyc6ICAgJ3Nob3dPdmVybGF5J1xuICAgICdvdmVybGF5IGhpZGUnOiAgICdoaWRlT3ZlcmxheSdcblxuICBzaG93T3ZlcmxheTogLT5cbiAgICAkKCcub3ZlcmxheS1yZWdpb24nKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICBoaWRlT3ZlcmxheTogLT5cbiAgICAkKCcub3ZlcmxheS1yZWdpb24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICBvblJlYWR5OiAtPlxuICAgIHVubGVzcyBAdmlld1xuICAgICAgQHZpZXcgPSBuZXcgT3ZlcmxheVZpZXcoKVxuICAgICAgQGNvbnRhaW5lci5zaG93KEB2aWV3KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBPdmVybGF5Q29tcG9uZW50XG4iLCJcbiMgQmFzZVJvdXRlIGNsYXNzIGRlZmluaXRpb25cbiMgVGhlIGJhc2Ugcm91dGUgcmVkdWNlcyByZXBlYXRlZCBjb2RlIGJ5XG4jIGF0dGFjaGluZyB0aGUgQGNvbnRhaW5lciBwcm9wZXJ0eSBwYXNzZWQgaW4gZnJvbVxuIyB0aGUgcm91dGVyLiBUaGlzIHByb3BlcnR5IGlzIHVzZWQgdG8gZGlzcGxheSB2aWV3cyBpbiB0aGUgYXBwXG5jbGFzcyBCYXNlUm91dGUgZXh0ZW5kcyBCYWNrYm9uZS5Sb3V0aW5nLlJvdXRlXG5cbiAgYnJlYWRjcnVtYnM6IFtdXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+XG5cbiAgICAjIEF0dGFjaGVzIG9wdGlvbnNcbiAgICBAb3B0aW9ucyA9IG9wdGlvbnNcblxuICAgICMgQXR0YWNoZXMgY29udGFpbmVyXG4gICAgQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiAgICAjIEV2ZW50IGhhbmRsZXJzXG4gICAgQG9uICdiZWZvcmU6ZW50ZXInLCA9PiBAb25CZWZvcmVFbnRlcj8oYXJndW1lbnRzKVxuICAgIEBvbiAnYmVmb3JlOmZldGNoJywgPT4gQG9uQmVmb3JlRmV0Y2g/KGFyZ3VtZW50cylcbiAgICBAb24gJ2JlZm9yZTpyZW5kZXInLCA9PiBAb25CZWZvcmVSZW5kZXI/KGFyZ3VtZW50cylcbiAgICBAb24gJ2ZldGNoJywgPT4gQG9uRmV0Y2g/KGFyZ3VtZW50cylcbiAgICBAb24gJ3JlbmRlcicsID0+IEBvblJlbmRlcj8oYXJndW1lbnRzKVxuICAgIEBvbiAnZW50ZXInLCA9PiBAb25FbnRlcj8oYXJndW1lbnRzKVxuXG4gICAgIyBIaWRlcyBzaWRlYmFyIGNvbXBvbmVudFxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3NpZGViYXInKS50cmlnZ2VyKCdoaWRlJylcblxuICBfc2V0UGFnZVRpdGxlOiAtPlxuICAgIGRvY3VtZW50LnRpdGxlID0gXy5yZXN1bHQgQCwgJ3RpdGxlJ1xuXG4gIF91cGRhdGVCcmVhZGNydW1iczogLT5cbiAgICBicmVhZGNydW1icyA9IF8ucmVzdWx0IEAsICdicmVhZGNydW1icydcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdicmVhZGNydW1iJykudHJpZ2dlcignc2V0JywgYnJlYWRjcnVtYnMpIGlmIGJyZWFkY3J1bWJzXG5cbiAgb25GZXRjaDogLT5cbiAgICBAX3NldFBhZ2VUaXRsZSgpXG4gICAgQF91cGRhdGVCcmVhZGNydW1icygpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VSb3V0ZVxuIiwiXG4jIEJhc2VSb3V0ZXIgY2xhc3MgZGVmaW5pdGlvblxuIyBUaGUgYmFzZSByb3V0ZXIgcmVkdWNlcyByZXBlYXRlZCBjb2RlIGJ5XG4jIGF0dGFjaGluZyB0aGUgQGNvbnRhaW5lciBwcm9wZXJ0eSBwYXNzZWQgaW4gZnJvbSB3aGVuIGluc3RhbnRpYXRlZC5cbiMgVGhpcyBwcm9wZXJ0eSBpcyBzdWJzZXF1ZW50bHkgcGFzc2VkIHRvIGFsbCByb3V0ZXMgY3JlYXRlZCBpbnNpZGVcbiMgcm91dGVycyBzdWJjbGFzc2VkIGZyb20gdGhpcyBkZWZpbml0aW9uXG5jbGFzcyBCYXNlUm91dGVyIGV4dGVuZHMgQmFja2JvbmUuUm91dGluZy5Sb3V0ZXJcblxuICBpbml0aWFsaXplOiAob3B0aW9ucykgLT4gQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VSb3V0ZXJcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmphZGUgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGphZGVfZW5jb2RlX2h0bWxfcnVsZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbnZhciBqYWRlX21hdGNoX2h0bWwgPSAvWyY8PlwiXS9nO1xuXG5mdW5jdGlvbiBqYWRlX2VuY29kZV9jaGFyKGMpIHtcbiAgcmV0dXJuIGphZGVfZW5jb2RlX2h0bWxfcnVsZXNbY10gfHwgYztcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBqYWRlX2VzY2FwZTtcbmZ1bmN0aW9uIGphZGVfZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpLnJlcGxhY2UoamFkZV9tYXRjaF9odG1sLCBqYWRlX2VuY29kZV9jaGFyKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTtcbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiXG5jbGFzcyBBYnN0cmFjdEtleWJvYXJkVmlldyBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93IGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMva2V5Ym9hcmRfYWJzdHJhY3QnXG5cbiAgIyBUT0RPIC0gYWN0aXZhdGUgdGhpcyBiZWhhdmlvciBjb25kaXRpb25hbGx5XG4gICMgYmVoYXZpb3JzOlxuICAjICAgS2V5Ym9hcmRDb250cm9sczoge31cblxuICB1aTpcbiAgICBrZXk6ICdbZGF0YS1jbGljaz1rZXldJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLmtleSc6ICdvbktleUNsaWNrJ1xuXG4gIGlzUmVjb3JkaW5nOiBmYWxzZVxuXG4gICMgaW5pdGlhbGl6ZVxuICBpbml0aWFsaXplOiAtPlxuXG4gICAgIyBEZWZpbmVzIEBkZWJvdW5jZVN0b3BSZWNvcmRpbmdcbiAgICBAZGVib3VuY2VTdG9wUmVjb3JkaW5nID0gXy5kZWJvdW5jZSggKCkgPT5cbiAgICAgIEB0cmlnZ2VyICdzdG9wOnJlY29yZGluZydcbiAgICAsIDE1MDApO1xuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG4gICAgQGlzUmVjb3JkaW5nID0gdHJ1ZVxuXG4gICMgc3RvcFJlY29yZGluZ1xuICBzdG9wUmVjb3JkaW5nOiAtPlxuICAgIEBpc1JlY29yZGluZyA9IGZhbHNlXG5cbiAgIyBLZXlib2FyZENvbnRyb2xzIGJlaGF2aW9yIGNhbGxiYWNrXG4gICMgVE9ETyAtIGFubm9hdGUgYW5kIGNsZWFuIHVwIHRoaXMgbWV0aG9kXG4gIG9uS2V5QWN0aW9uOiAoZSkgLT5cblxuICAgICMgU2hvcnQtY2lyY3VpdHMgdW5sZXNzXG4gICAgcmV0dXJuIHVubGVzcyBAaXNSZWNvcmRpbmdcblxuICAgICMgUHJldmVudHMgZGVmYXVsdCBob3RrZXlzIHdoaWxlIHJlY29yZGluZ1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgIyBUT0RPIC0gaWdub3JlIGtleXVwIG9uIGFscGhhbnVtZXJpYywgbGlzdGVuIGZvciBzcGVjaWFsIGtleXM/XG4gICAgIyByZXR1cm4gaWYgZS5rZXkgaW4gW1wiQ29udHJvbFwiLCBcIk1ldGFcIiwgXCJBbHRcIl1cbiAgICBrZXkgPSBAb3B0aW9ucy5rZXlzLmZpbmRXaGVyZSh7IGtleWNvZGU6IGUua2V5Q29kZSB9KVxuXG4gICAgIyAjICMgI1xuXG4gICAgIyBUT0RPIC0gZG9jdW1lbnQgdGhpcyBibG9jayBvZiBjb2RlXG5cbiAgICBpZiBlLnR5cGUgPT0gJ2tleWRvd24nXG5cbiAgICAgIGlmIGUua2V5IGluIFtcIkNvbnRyb2xcIiwgXCJNZXRhXCIsIFwiQWx0XCIsIFwiU2hpZnRcIl1cbiAgICAgICAganNvbiA9IGtleS50b0pTT04oKVxuICAgICAgICBqc29uLnBvc2l0aW9uID0gLTFcbiAgICAgICAgQHRyaWdnZXIgJ2tleTpzZWxlY3RlZCcsIGpzb25cbiAgICAgIGVsc2VcbiAgICAgICAgQHRyaWdnZXIgJ2tleTpzZWxlY3RlZCcsIGtleS50b0pTT04oKVxuXG4gICAgaWYgZS50eXBlID09ICdrZXl1cCdcblxuICAgICAgaWYgZS5rZXkgaW4gW1wiQ29udHJvbFwiLCBcIk1ldGFcIiwgXCJBbHRcIiwgXCJTaGlmdFwiXVxuICAgICAgICBqc29uID0ga2V5LnRvSlNPTigpXG4gICAgICAgIGpzb24ucG9zaXRpb24gPSAxXG4gICAgICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBqc29uXG5cblxuICAgICMgIyAjICNcblxuICAgIGlmIGUudHlwZSA9PSAna2V5dXAnXG4gICAgICBAJChcIltkYXRhLWtleWNvZGU9I3tlLmtleUNvZGV9XVwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICBlbHNlXG4gICAgICBAJChcIltkYXRhLWtleWNvZGU9I3tlLmtleUNvZGV9XVwiKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICAgICMgVE9ETyAtIGFubm90YWVcbiAgICBzZXRUaW1lb3V0KCA9PlxuICAgICAgQCQoXCJbZGF0YS1rZXljb2RlPSN7ZS5rZXlDb2RlfV1cIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgLCAxMDAwKVxuXG4gICAgIyBTdG9wcyByZWNvcmRpbmcgMiBzZWNvbmRzIGFmdGVyIGxhc3Qga2V5c3Ryb2tlXG4gICAgQGRlYm91bmNlU3RvcFJlY29yZGluZygpXG5cbiAgICAjICMgIyAjXG5cblxuICAjIEtleUNsaWNrIGNhbGxiYWNrXG4gIG9uS2V5Q2xpY2s6IChlKSAtPlxuXG4gICAgIyBDYWNoZXMgZWwgYW5kIGtleWNvZGVcbiAgICBlbCAgPSAkKGUuY3VycmVudFRhcmdldClcbiAgICBrZXljb2RlID0gZWwuZGF0YSgna2V5Y29kZScpXG5cbiAgICAjIEZpbmRzIHRoZSBtb2RlbCBvZiB0aGUga2V5IHRoYXQgd2FzIHNlbGVjdGVkXG4gICAga2V5ID0gQG9wdGlvbnMua2V5cy5maW5kV2hlcmUoeyBrZXljb2RlOiBrZXljb2RlIH0pXG5cbiAgICAjIFRyaWdnZXJzICdrZXk6c2VsZWN0ZWQnIGV2ZW50XG4gICAgQHRyaWdnZXIgJ2tleTpzZWxlY3RlZCcsIGtleS50b0pTT04oKVxuXG4gICAgIyBCbHVycyBmb2N1cyBmcm9tIGNsaWNrZWQga2V5XG4gICAgZWwuYmx1cigpXG5cbiAgICByZXR1cm5cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RLZXlib2FyZFZpZXdcbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleWJvYXJkVmlldyBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9rZXlib2FyZF9mdWxsJ1xuXG4gIGJlaGF2aW9yczpcbiAgICBLZXlib2FyZENvbnRyb2xzOiB7fVxuXG4gICMgUGFzc2VzIGtleSBvYmplY3RzIHRvIFVJXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBrZXlzID0gQG9wdGlvbnMua2V5cy50b0pTT04oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAncjAnfSlcbiAgICAgIHIxOiBfLndoZXJlKGtleXMsIHsgcm93OiAncjEnfSlcbiAgICAgIHIyOiBfLndoZXJlKGtleXMsIHsgcm93OiAncjInfSlcbiAgICAgIHIzOiBfLndoZXJlKGtleXMsIHsgcm93OiAncjMnfSlcbiAgICAgIHI0OiBfLndoZXJlKGtleXMsIHsgcm93OiAncjQnfSlcbiAgICB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkVmlld1xuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjXG5cbmNsYXNzIEZ1bmN0aW9uS2V5Ym9hcmQgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuXG4gICMgUGFzc2VzIGtleSBvYmplY3RzIHRvIFVJXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBrZXlzID0gQG9wdGlvbnMua2V5cy50b0pTT04oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAnZnVuY19yMCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb25LZXlib2FyZFxuXG5cbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgI1xuXG5jbGFzcyBNZWRpYUtleWJvYXJkIGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ21lZGlhX3IwJ30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNZWRpYUtleWJvYXJkXG5cblxuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjXG5cbmNsYXNzIE5hdktleWJvYXJkIGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ25hdl9yMCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTmF2S2V5Ym9hcmRcblxuXG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICNcblxuY2xhc3MgTnVtcGFkVmlldyBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9rZXlib2FyZF9udW1wYWQnXG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjAnfSlcbiAgICAgIHIxOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3IxJ30pXG4gICAgICByMjogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yMid9KVxuICAgICAgcjM6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjMnfSlcbiAgICAgIHI0OiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3I0J30pXG4gICAgICBjb2w6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fY29sJ30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBOdW1wYWRWaWV3XG5cblxuIiwiU2ltcGxlTmF2ID0gcmVxdWlyZSgnbGliL3ZpZXdzL3NpbXBsZV9uYXYnKVxuRnVsbEtleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Z1bGwnKVxuTnVtcGFkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQnKVxuRnVuY3Rpb25LZXlib2FyZCA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9mdW5jdGlvbicpXG5NZWRpYUtleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX21lZGlhJylcbk5hdktleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX25hdicpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlib2FyZFNlbGVjdG9yIGV4dGVuZHMgU2ltcGxlTmF2XG4gIGNsYXNzTmFtZTogJ3JvdyBoLTEwMCdcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2tleWJvYXJkX3NlbGVjdG9yJylcblxuICBuYXZJdGVtczogW1xuICAgIHsgaWNvbjogJ2ZhLWtleWJvYXJkLW8nLCAgdGV4dDogJ0tleWJvYXJkJywgIHRyaWdnZXI6ICdrZXlib2FyZCcsIGRlZmF1bHQ6IHRydWUgfVxuICAgIHsgaWNvbjogJ2ZhLWZpbGUtdGV4dC1vJywgdGV4dDogJ051bXBhZCcsICAgdHJpZ2dlcjogJ251bXBhZCcgfVxuICAgIHsgaWNvbjogJ2ZhLWNhcmV0LXNxdWFyZS1vLXVwJywgICAgdGV4dDogJ0Z1bmN0aW9uJywgICAgdHJpZ2dlcjogJ2Z1bmN0aW9uJyB9XG4gICAgeyBpY29uOiAnZmEtYXN0ZXJpc2snLCAgICB0ZXh0OiAnTWVkaWEnLCAgICB0cmlnZ2VyOiAnbWVkaWEnIH1cbiAgICB7IGljb246ICdmYS1hc3RlcmlzaycsICAgIHRleHQ6ICdOYXZpZ2F0aW9uJywgICAgdHJpZ2dlcjogJ25hdicgfVxuICBdXG5cbiAgc2hvd0tleWJvYXJkVmlldzogKGtleWJvYXJkVmlldykgLT5cblxuICAgICMgQ2FjaGVzIGN1cnJlbnQga2V5Ym9hcmQgdmlld1xuICAgIEBjdXJyZW50ID0ga2V5Ym9hcmRWaWV3XG5cbiAgICAjIEhhbmRsZXMgJ3N0b3A6cmVjb3JkaW5nJyBldmVudFxuICAgIEBjdXJyZW50Lm9uICdzdG9wOnJlY29yZGluZycsID0+IEB0cmlnZ2VyICdzdG9wOnJlY29yZGluZydcblxuICAgICMgSGFuZGxlcyBLZXlTZWxlY3Rpb24gZXZlbnRcbiAgICBrZXlib2FyZFZpZXcub24gJ2tleTpzZWxlY3RlZCcsIChrZXkpID0+IEB0cmlnZ2VyKCdrZXk6c2VsZWN0ZWQnLCBrZXkpXG5cbiAgICAjIFNob3dzIHRoZSBrZXlib2FyZFZpZXdcbiAgICBAY29udGVudFJlZ2lvbi5zaG93IGtleWJvYXJkVmlld1xuXG4gIG9uTmF2aWdhdGVLZXlib2FyZDogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgRnVsbEtleWJvYXJkKHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuICBvbk5hdmlnYXRlTnVtcGFkOiAtPlxuICAgIEBzaG93S2V5Ym9hcmRWaWV3KG5ldyBOdW1wYWRWaWV3KHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuICBvbk5hdmlnYXRlRnVuY3Rpb246IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IEZ1bmN0aW9uS2V5Ym9hcmQoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4gIG9uTmF2aWdhdGVNZWRpYTogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgTWVkaWFLZXlib2FyZCh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZU5hdjogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgTmF2S2V5Ym9hcmQoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZFNlbGVjdG9yXG4iLCJjbGFzcyBTaW1wbGVOYXYgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBbZGF0YS10cmlnZ2VyXSc6ICdvbk5hdkl0ZW1DbGljaydcblxuICBuYXZJdGVtczogW11cblxuICByZWdpb25zOlxuICAgIGNvbnRlbnRSZWdpb246ICdbZGF0YS1yZWdpb249Y29udGVudF0nXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgZGVmID0gXy53aGVyZShfLnJlc3VsdChALCAnbmF2SXRlbXMnKSwgeyBkZWZhdWx0OiB0cnVlIH0pWzBdXG4gICAgcmV0dXJuIHVubGVzcyBkZWZcbiAgICBAdHJpZ2dlck1ldGhvZChcIm5hdmlnYXRlOiN7ZGVmLnRyaWdnZXJ9XCIpXG4gICAgQCQoXCJbZGF0YS10cmlnZ2VyPSN7ZGVmLnRyaWdnZXJ9XVwiKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICBzZXJpYWxpemVEYXRhOiAtPlxuICAgIGRhdGEgPSBzdXBlclxuICAgIF8uZXh0ZW5kKGRhdGEsIHsgbmF2SXRlbXM6IF8ucmVzdWx0KEAsICduYXZJdGVtcycpIH0pXG4gICAgcmV0dXJuIGRhdGFcblxuICBvbk5hdkl0ZW1DbGljazogKGUpID0+XG4gICAgZWwgPSAkKGUuY3VycmVudFRhcmdldClcbiAgICBlbC5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICBAdHJpZ2dlck1ldGhvZChcIm5hdmlnYXRlOiN7ZWwuZGF0YSgndHJpZ2dlcicpfVwiKVxuICAgIGVsLmJsdXIoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVOYXZcbiJdfQ==
