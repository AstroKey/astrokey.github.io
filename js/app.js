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
    Backbone.history.start();
    return navigator.usb.getDevices().then((function(_this) {
      return function(d) {
        if (!d[0]) {
          return;
        }
        d[0].open();
        return window.d = d[0];
      };
    })(this));
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



},{"./keyboardControls":4,"./selectableChild":5,"./sortableChild":6,"./sortableList":7,"hn_behaviors/lib/bindInputs":64,"hn_behaviors/lib/flashes":65,"hn_behaviors/lib/modelEvents":66,"hn_behaviors/lib/submitButton":67,"hn_behaviors/lib/tooltips":68}],4:[function(require,module,exports){
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



},{"./views/layout":9,"hn_modal/lib/abstract":77}],9:[function(require,module,exports){
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
},{"jade/runtime":83}],11:[function(require,module,exports){
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

  HeaderView.prototype.className = 'navbar navbar-expand-lg fixed-top navbar-dark bg-dark';

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

buf.push("<div class=\"navbar-brand title\"><img src=\"./img/icon_white.svg\" class=\"logo\"/>strokey</div><ul class=\"navbar-nav mr-auto\"><li class=\"nav-item\"><a style=\"cursor:pointer\" onClick=\"Radio.channel('usb').request('devices');\" class=\"nav-link\"><i class=\"fa fa-fw fa-lg fa-usb\"></i></a></li><li class=\"nav-item\"><a style=\"cursor:pointer\" onClick=\"Radio.channel('about').trigger('show');\" class=\"nav-link\"><i class=\"fa fa-fw fa-lg fa-question-circle-o\"></i></a></li></ul>");;return buf.join("");
};
},{"jade/runtime":83}],14:[function(require,module,exports){
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

require('./modules/usb/chrome_web_usb_service');

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



},{"./app":1,"./application/views/layout":2,"./components/about/component":8,"./components/header/component":11,"./config":15,"./modules/key/factory":21,"./modules/main/router":60,"./modules/usb/chrome_web_usb_service":61,"hn_entities/lib/config":69,"hn_flash/lib/component":72,"hn_overlay/lib/component":80}],20:[function(require,module,exports){
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
    shift_key: '~',
    keycode: 192,
    dec: 53
  }, {
    row: 'r4',
    key: '1',
    shift_key: '!',
    keycode: 49,
    dec: 30
  }, {
    row: 'r4',
    key: '2',
    shift_key: '@',
    keycode: 50,
    dec: 31
  }, {
    row: 'r4',
    key: '3',
    shift_key: '#',
    keycode: 51,
    dec: 32
  }, {
    row: 'r4',
    key: '4',
    shift_key: '$',
    keycode: 52,
    dec: 33
  }, {
    row: 'r4',
    key: '5',
    shift_key: '%',
    keycode: 53,
    dec: 34
  }, {
    row: 'r4',
    key: '6',
    shift_key: '^',
    keycode: 54,
    dec: 35
  }, {
    row: 'r4',
    key: '7',
    shift_key: '&',
    keycode: 55,
    dec: 36
  }, {
    row: 'r4',
    key: '8',
    shift_key: '*',
    keycode: 56,
    dec: 37
  }, {
    row: 'r4',
    key: '9',
    shift_key: '(',
    keycode: 57,
    dec: 38
  }, {
    row: 'r4',
    key: '0',
    shift_key: ')',
    keycode: 48,
    dec: 39
  }, {
    row: 'r4',
    key: '-',
    shift_key: '_',
    keycode: 189,
    dec: 45
  }, {
    row: 'r4',
    key: '=',
    shift_key: '+',
    keycode: 187,
    dec: 46
  }, {
    row: 'r4',
    key: 'BACKSPACE',
    keycode: 8,
    css: 'w2_0',
    dec: 42
  }, {
    row: 'r3',
    key: 'TAB',
    keycode: 9,
    css: 'w1_5',
    special: true,
    dec: 43
  }, {
    row: 'r3',
    key: 'q',
    shift_key: 'Q',
    alpha: true,
    keycode: 81,
    dec: 20
  }, {
    row: 'r3',
    key: 'w',
    shift_key: 'W',
    alpha: true,
    keycode: 87,
    dec: 26
  }, {
    row: 'r3',
    key: 'e',
    shift_key: 'E',
    alpha: true,
    keycode: 69,
    dec: 8
  }, {
    row: 'r3',
    key: 'r',
    shift_key: 'R',
    alpha: true,
    keycode: 82,
    dec: 21
  }, {
    row: 'r3',
    key: 't',
    shift_key: 'T',
    alpha: true,
    keycode: 84,
    dec: 23
  }, {
    row: 'r3',
    key: 'y',
    shift_key: 'Y',
    alpha: true,
    keycode: 89,
    dec: 28
  }, {
    row: 'r3',
    key: 'u',
    shift_key: 'U',
    alpha: true,
    keycode: 85,
    dec: 24
  }, {
    row: 'r3',
    key: 'i',
    shift_key: 'I',
    alpha: true,
    keycode: 73,
    dec: 12
  }, {
    row: 'r3',
    key: 'o',
    shift_key: 'O',
    alpha: true,
    keycode: 79,
    dec: 18
  }, {
    row: 'r3',
    key: 'p',
    shift_key: 'P',
    alpha: true,
    keycode: 80,
    dec: 19
  }, {
    row: 'r3',
    key: '[',
    shift_key: '{',
    keycode: 219,
    dec: 47
  }, {
    row: 'r3',
    key: ']',
    shift_key: '}',
    keycode: 221,
    dec: 48
  }, {
    row: 'r3',
    key: '\\',
    shift_key: '|',
    keycode: 220,
    css: 'w1_5',
    dec: 49
  }, {
    row: 'r2',
    key: 'CAPS',
    css: 'w1_75',
    keycode: 20,
    special: true,
    dec: 57
  }, {
    row: 'r2',
    key: 'a',
    shift_key: 'A',
    alpha: true,
    keycode: 65,
    dec: 4
  }, {
    row: 'r2',
    key: 's',
    shift_key: 'S',
    alpha: true,
    keycode: 83,
    dec: 22
  }, {
    row: 'r2',
    key: 'd',
    shift_key: 'D',
    alpha: true,
    keycode: 68,
    dec: 7
  }, {
    row: 'r2',
    key: 'f',
    shift_key: 'F',
    alpha: true,
    keycode: 70,
    dec: 9
  }, {
    row: 'r2',
    key: 'g',
    shift_key: 'G',
    alpha: true,
    keycode: 71,
    dec: 10
  }, {
    row: 'r2',
    key: 'h',
    shift_key: 'H',
    alpha: true,
    keycode: 72,
    dec: 11
  }, {
    row: 'r2',
    key: 'j',
    shift_key: 'J',
    alpha: true,
    keycode: 74,
    dec: 13
  }, {
    row: 'r2',
    key: 'k',
    shift_key: 'K',
    alpha: true,
    keycode: 75,
    dec: 14
  }, {
    row: 'r2',
    key: 'l',
    shift_key: 'L',
    alpha: true,
    keycode: 76,
    dec: 15
  }, {
    row: 'r2',
    key: ';',
    shift_key: ':',
    keycode: 186,
    dec: 51
  }, {
    row: 'r2',
    key: "'",
    shift_key: '"',
    keycode: 222,
    dec: 52
  }, {
    row: 'r2',
    key: 'RETURN',
    css: 'w2_25',
    keycode: 13,
    special: true,
    dec: 88
  }, {
    row: 'r1',
    key: 'SHIFT',
    css: 'w2_25',
    keycode: 16,
    special: true,
    dec: 225
  }, {
    row: 'r1',
    key: 'z',
    shift_key: 'Z',
    alpha: true,
    keycode: 90,
    dec: 29
  }, {
    row: 'r1',
    key: 'x',
    shift_key: 'X',
    alpha: true,
    keycode: 88,
    dec: 27
  }, {
    row: 'r1',
    key: 'c',
    shift_key: 'C',
    alpha: true,
    keycode: 67,
    dec: 6
  }, {
    row: 'r1',
    key: 'v',
    shift_key: 'V',
    alpha: true,
    keycode: 86,
    dec: 25
  }, {
    row: 'r1',
    key: 'b',
    shift_key: 'B',
    alpha: true,
    keycode: 66,
    dec: 5
  }, {
    row: 'r1',
    key: 'n',
    shift_key: 'N',
    alpha: true,
    keycode: 78,
    dec: 17
  }, {
    row: 'r1',
    key: 'm',
    shift_key: 'M',
    alpha: true,
    keycode: 77,
    dec: 16
  }, {
    row: 'r1',
    key: ',',
    shift_key: '<',
    keycode: 188,
    dec: 54
  }, {
    row: 'r1',
    key: '.',
    shift_key: '>',
    keycode: 190,
    dec: 55
  }, {
    row: 'r1',
    key: '/',
    shift_key: '?',
    keycode: 191,
    dec: 56
  }, {
    row: 'r1',
    key: 'SHIFT',
    css: 'w2_75',
    keycode: 16,
    special: true,
    dec: 225
  }, {
    row: 'r0',
    key: 'CTRL',
    css: 'w1_25',
    keycode: 17,
    special: true,
    dec: 224
  }, {
    row: 'r0',
    key: 'META',
    css: 'w1_25',
    keycode: 91,
    special: true,
    dec: 227
  }, {
    row: 'r0',
    key: 'ALT',
    css: 'w1_25',
    keycode: 18,
    special: true,
    dec: 226
  }, {
    row: 'r0',
    key: 'SPACE',
    css: 'space',
    keycode: 32,
    special: true,
    dec: 44
  }, {
    row: 'r0',
    key: 'CTRL',
    css: 'w1_25',
    keycode: 17,
    special: true,
    dec: 224
  }, {
    row: 'r0',
    key: 'M',
    css: 'w1_25',
    keycode: 18,
    special: true,
    dec: 227
  }, {
    row: 'r0',
    key: 'P',
    css: 'w1_25',
    keycode: 93,
    special: true,
    dec: 70
  }, {
    row: 'r0',
    key: 'ALT',
    css: 'w1_25',
    keycode: 18,
    special: true,
    dec: 226
  }, {
    row: 'num_r4',
    key: 'n_CLEAR',
    keycode: 6083,
    dec: 83
  }, {
    row: 'num_r4',
    key: 'n_/',
    keycode: 6084,
    dec: 84
  }, {
    row: 'num_r4',
    key: 'n_*',
    keycode: 6085,
    dec: 85
  }, {
    row: 'num_col',
    key: 'n_-',
    keycode: 6086,
    dec: 86
  }, {
    row: 'num_col',
    key: 'n_+',
    keycode: 6087,
    css: 'h2_0',
    dec: 87
  }, {
    row: 'num_col',
    key: 'n_ENTER',
    keycode: 6088,
    css: 'h2_0',
    dec: 88
  }, {
    row: 'num_r1',
    key: 'n_1',
    keycode: 6089,
    dec: 89
  }, {
    row: 'num_r1',
    key: 'n_2',
    keycode: 6090,
    dec: 90
  }, {
    row: 'num_r1',
    key: 'n_3',
    keycode: 6091,
    dec: 91
  }, {
    row: 'num_r2',
    key: 'n_4',
    keycode: 6092,
    dec: 92
  }, {
    row: 'num_r2',
    key: 'n_5',
    keycode: 6093,
    dec: 93
  }, {
    row: 'num_r2',
    key: 'n_6',
    keycode: 6094,
    dec: 94
  }, {
    row: 'num_r3',
    key: 'n_7',
    keycode: 6095,
    dec: 95
  }, {
    row: 'num_r3',
    key: 'n_8',
    keycode: 6096,
    dec: 96
  }, {
    row: 'num_r3',
    key: 'n_9',
    keycode: 6097,
    dec: 97
  }, {
    row: 'num_r0',
    key: 'n_0',
    keycode: 6098,
    dec: 98
  }, {
    row: 'num_r0',
    key: 'n_.',
    keycode: 6099,
    dec: 99
  }, {
    row: 'func_r0',
    key: 'F1',
    keycode: 2000,
    dec: 58
  }, {
    row: 'func_r0',
    key: 'F2',
    keycode: 2001,
    dec: 59
  }, {
    row: 'func_r0',
    key: 'F3',
    keycode: 2002,
    dec: 60
  }, {
    row: 'func_r0',
    key: 'F4',
    keycode: 2003,
    dec: 61
  }, {
    row: 'func_r0',
    key: 'F5',
    keycode: 2004,
    dec: 62
  }, {
    row: 'func_r0',
    key: 'F6',
    keycode: 2005,
    dec: 63
  }, {
    row: 'func_r0',
    key: 'F7',
    keycode: 2006,
    dec: 64
  }, {
    row: 'func_r0',
    key: 'F8',
    keycode: 2007,
    dec: 65
  }, {
    row: 'func_r0',
    key: 'F9',
    keycode: 2008,
    dec: 66
  }, {
    row: 'func_r0',
    key: 'F10',
    keycode: 2009,
    dec: 67
  }, {
    row: 'func_r0',
    key: 'F11',
    keycode: 2010,
    dec: 68
  }, {
    row: 'func_r0',
    key: 'F12',
    keycode: 2011,
    dec: 69
  }, {
    row: 'media_r0',
    key: 'MUTE',
    keycode: 5127,
    icon: 'fa-volume-off',
    dec: 127
  }, {
    row: 'media_r0',
    key: 'VOLUME_UP',
    keycode: 5129,
    icon: 'fa-volume-up',
    dec: 128
  }, {
    row: 'media_r0',
    key: 'VOLUME_DN',
    keycode: 5128,
    icon: 'fa-volume-down',
    dec: 129
  }, {
    row: 'nav_r0',
    key: 'PGUP',
    keycode: 4075,
    dec: 75
  }, {
    row: 'nav_r0',
    key: 'PGDN',
    keycode: 4078,
    dec: 78
  }, {
    row: 'nav_r0',
    key: 'END',
    keycode: 4077,
    dec: 77
  }, {
    row: 'nav_r0',
    key: 'HOME',
    keycode: 4074,
    dec: 74
  }, {
    row: 'nav_r0',
    key: 'LEFT-ARROW',
    keycode: 4080,
    icon: 'fa-chevron-left',
    dec: 80
  }, {
    row: 'nav_r0',
    key: 'UP-ARROW',
    keycode: 4082,
    icon: 'fa-chevron-up',
    dec: 82
  }, {
    row: 'nav_r0',
    key: 'DOWN-ARROW',
    keycode: 4081,
    icon: 'fa-chevron-down',
    dec: 81
  }, {
    row: 'nav_r0',
    key: 'RIGHT-ARROW',
    keycode: 4079,
    icon: 'fa-chevron-right',
    dec: 79
  }, {
    row: 'nav_r0',
    key: 'INS',
    keycode: 4073,
    dec: 73
  }, {
    row: 'nav_r0',
    key: 'DEL',
    keycode: 4076,
    dec: 76
  }, {
    row: 'special_r0',
    key: 'DELAY',
    keycode: 1008,
    delay: true,
    position: 3
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
buf.push("<ul class=\"list-unstyled mb-0 keyboard--row w-100\">");
block && block();
buf.push("</ul>");
};
jade_mixins["keyboardKey"] = jade_interp = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<li" + (jade.attr("data-keycode", opts.keycode, true, false)) + " data-click=\"key\"" + (jade.attr("data-key", opts.key, true, false)) + (jade.cls(['btn','btn-outline-light','keyboard--key',opts.css], [null,null,null,true])) + ">");
if ( opts.icon)
{
buf.push("<i" + (jade.cls(['fa','fa-fw',opts.icon], [null,null,true])) + "></i>");
}
else
{
if ( opts.key && opts.shift_key && !opts.alpha)
{
buf.push("<div class=\"shift\">" + (jade.escape(null == (jade_interp = opts.shift_key) ? "" : jade_interp)) + "</div><div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.key) ? "" : jade_interp)) + "</div>");
}
else if ( opts.alpha)
{
buf.push("<div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.shift_key) ? "" : jade_interp)) + "</div>");
}
else
{
buf.push("<div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.key) ? "" : jade_interp)) + "</div>");
}
}
buf.push("</li>");
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
},{"jade/runtime":83}],24:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (r0, r1, r2, r3, r4) {
jade_mixins["keyboardRow"] = jade_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<ul class=\"list-unstyled mb-0 keyboard--row w-100\">");
block && block();
buf.push("</ul>");
};
jade_mixins["keyboardKey"] = jade_interp = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<li" + (jade.attr("data-keycode", opts.keycode, true, false)) + " data-click=\"key\"" + (jade.attr("data-key", opts.key, true, false)) + (jade.cls(['btn','btn-outline-light','keyboard--key',opts.css], [null,null,null,true])) + ">");
if ( opts.icon)
{
buf.push("<i" + (jade.cls(['fa','fa-fw',opts.icon], [null,null,true])) + "></i>");
}
else
{
if ( opts.key && opts.shift_key && !opts.alpha)
{
buf.push("<div class=\"shift\">" + (jade.escape(null == (jade_interp = opts.shift_key) ? "" : jade_interp)) + "</div><div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.key) ? "" : jade_interp)) + "</div>");
}
else if ( opts.alpha)
{
buf.push("<div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.shift_key) ? "" : jade_interp)) + "</div>");
}
else
{
buf.push("<div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.key) ? "" : jade_interp)) + "</div>");
}
}
buf.push("</li>");
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
},{"jade/runtime":83}],25:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (col, r0, r1, r2, r3, r4, undefined) {
jade_mixins["keyboardRow"] = jade_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<ul class=\"list-unstyled mb-0 keyboard--row w-100\">");
block && block();
buf.push("</ul>");
};
jade_mixins["keyboardKey"] = jade_interp = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<li" + (jade.attr("data-keycode", opts.keycode, true, false)) + " data-click=\"key\"" + (jade.attr("data-key", opts.key, true, false)) + (jade.cls(['btn','btn-outline-light','keyboard--key',opts.css], [null,null,null,true])) + ">");
if ( opts.icon)
{
buf.push("<i" + (jade.cls(['fa','fa-fw',opts.icon], [null,null,true])) + "></i>");
}
else
{
if ( opts.key && opts.shift_key && !opts.alpha)
{
buf.push("<div class=\"shift\">" + (jade.escape(null == (jade_interp = opts.shift_key) ? "" : jade_interp)) + "</div><div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.key) ? "" : jade_interp)) + "</div>");
}
else if ( opts.alpha)
{
buf.push("<div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.shift_key) ? "" : jade_interp)) + "</div>");
}
else
{
buf.push("<div class=\"plain\">" + (jade.escape(null == (jade_interp = opts.key) ? "" : jade_interp)) + "</div>");
}
}
buf.push("</li>");
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
},{"jade/runtime":83}],26:[function(require,module,exports){
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
},{"jade/runtime":83}],27:[function(require,module,exports){
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
    position: 3,
    shifted: false
  };

  MacroModel.prototype.getKeyData = function() {
    var attrs, data;
    data = [];
    attrs = _.clone(this.attributes);
    if (attrs.delay) {
      data.push(16);
      data.push(1);
      return data;
    }
    if (attrs.position === 1) {
      data.push(1);
      data.push(attrs.dec || 4);
      return data;
    }
    if (attrs.position === 2) {
      data.push(2);
      data.push(attrs.dec || 4);
      return data;
    }
    if (attrs.position === 3) {
      data.push(3);
      data.push(attrs.dec || 4);
      return data;
    }
    return data;
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

  MacroCollection.prototype.build = function() {
    var data;
    data = [];
    _.each(this.models, (function(_this) {
      return function(macro) {
        return data = data.concat(macro.getKeyData());
      };
    })(this));
    return data;
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

  DashboardRoute.prototype.title = 'AstroKey';

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



},{"./views/layout":38,"hn_routing/lib/route":81}],34:[function(require,module,exports){
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

  DeviceLayout.prototype.events = {
    'click [data-click=connect]': 'connectToDevice'
  };

  DeviceLayout.prototype.connectToDevice = function() {
    return Radio.channel('usb').request('devices').then((function(_this) {
      return function(d) {
        return _this.render();
      };
    })(this));
  };

  DeviceLayout.prototype.templateHelpers = function() {
    if (window.d) {
      return {
        connected: true
      };
    } else {
      return {
        connected: false
      };
    }
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

  EditorSelector.prototype.behaviors = {
    Tooltips: {}
  };

  EditorSelector.prototype.navItems = [
    {
      icon: 'fa-keyboard-o',
      text: 'Macro',
      trigger: 'macro'
    }, {
      icon: 'fa-file-text-o',
      text: 'Snippet',
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



},{"./templates/editor_selector":43,"lib/views/simple_nav":92}],36:[function(require,module,exports){
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

  EditorWrapper.prototype.templateHelpers = function() {
    if (this.options.editor === 'macro') {
      return {
        macro_editor: true
      };
    }
    return {
      macro_editor: false
    };
  };

  EditorWrapper.prototype.onRender = function() {
    var EditorView, config, keys;
    EditorView = this.editors[this.options.editor];
    config = this.model.get('config');
    this.cachedConfig = config.toJSON();
    this.macros = config.get('macros');
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
    var data, macroIndex;
    this.stopRecording();
    data = Backbone.Syphon.serialize(this);
    if (data.type === 'macro') {
      data.text_value = '';
      this.model.get('config').set(data);
      this.model.trigger('config:updated');
      macroIndex = this.model.get('order');
      data = this.macros.build();
      console.log('WRITING');
      console.log(data);
      if (!window.d) {
        return this.trigger('save');
      }
      return Radio.channel('usb').request('write:macro', macroIndex, data).then((function(_this) {
        return function(response) {
          return _this.trigger('save');
        };
      })(this));
    } else if (data.type === 'text') {
      data.macros = [];
      this.model.get('config').set(data);
      this.model.trigger('config:updated');
      macroIndex = this.model.get('order');
      data = this.model.buildSnippet(data.text_value);
      this.macros.reset(data);
      data = this.macros.build();
      if (!window.d) {
        return this.trigger('save');
      }
      return Radio.channel('usb').request('write:macro', macroIndex, data).then((function(_this) {
        return function(response) {
          return _this.trigger('save');
        };
      })(this));
    }
  };

  EditorWrapper.prototype.onCancel = function() {
    this.stopRecording();
    this.model.get('config').set(this.cachedConfig);
    return this.trigger('cancel');
  };

  EditorWrapper.prototype.loadExample = function(e) {
    var el, example_id;
    this.stopRecording();
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
    this.macros.reset();
    this.isRecording = true;
    if ((ref = this.editorView.keyboardSelector) != null) {
      ref.current.startRecording();
    }
    return this.ui.recordBtn.addClass('active').find('i').addClass('fa-spin fa-circle-o-notch').removeClass('fa-circle');
  };

  return EditorWrapper;

})(Marionette.LayoutView);

module.exports = EditorWrapper;



},{"./macroEditor":39,"./templates/editor_wrapper":44,"./textEditor":53}],37:[function(require,module,exports){
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
        label: 'M'
      };
    }
    if (config.get('type') === 'text') {
      return {
        label: 'T'
      };
    }
    if (config.get('type') === 'key') {
      return {
        label: 'K'
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

  KeySelector.prototype.className = 'key--list--wrapper px-3 py-3 d-flex align-items-center my-4';

  KeySelector.prototype.childView = KeyChild;

  KeySelector.prototype.template = require('./templates/key_selector');

  KeySelector.prototype.childViewContainer = 'ul';

  return KeySelector;

})(Mn.CompositeView);

module.exports = KeySelector;



},{"./templates/key_child":46,"./templates/key_selector":47}],38:[function(require,module,exports){
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
    keyModel.readMacro();
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
        return _this.$el.removeClass('active');
      };
    })(this));
    return this.editorRegion.show(editorWrapper);
  };

  return LayoutView;

})(Marionette.LayoutView);

module.exports = LayoutView;



},{"./deviceLayout":34,"./editorSelector":35,"./editorWrapper":36,"./templates/help_view":45,"./templates/layout":48}],39:[function(require,module,exports){
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
        key.order = _this.options.macros.length;
        _this.options.macros.add(key);
        return _this.options.macros.sort();
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



},{"./macroList":40,"./templates/macro_editor":50,"lib/views/keyboard_selector":90}],40:[function(require,module,exports){
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
    SortableChild: {},
    Tooltips: {}
  };

  MacroChild.prototype.modelEvents = {
    'change:position': 'render',
    'change:shifted': 'render'
  };

  MacroChild.prototype.ui = {
    tooltip: '[data-toggle=tooltip]'
  };

  MacroChild.prototype.events = {
    'drag': 'onDrag',
    'dragstart': 'onDragStart',
    'mouseover .key': 'onMouseOver',
    'mouseout .key': 'onMouseOut',
    'click .key': 'removeMacro',
    'click [data-position]:not(.active)': 'onPositionClick'
  };

  MacroChild.prototype.state = {
    tooltipOnRender: false
  };

  MacroChild.prototype.onRender = function() {
    if (!this.state.tooltipOnRender) {
      return;
    }
    this.state.tooltipOnRender = false;
    return this.ui.tooltip.tooltip('show');
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
    this.state.tooltipOnRender = true;
    this.clearTooltips();
    el = $(e.currentTarget);
    position = el.data('position');
    if (position === 1) {
      new_position = 2;
    }
    if (position === 2) {
      new_position = 3;
    }
    if (position === 3) {
      new_position = 1;
    }
    return this.model.set('position', new_position);
  };

  MacroChild.prototype.templateHelpers = function() {
    var active_position, position, positions;
    positions = [
      {
        position: 3,
        css: 'fa-arrows-v',
        tooltip: 'Key Press'
      }, {
        position: 1,
        css: 'fa-long-arrow-down',
        tooltip: 'Key Down'
      }, {
        position: 2,
        css: 'fa-long-arrow-up',
        tooltip: 'Key Up'
      }
    ];
    if (this.model.get('delay')) {
      active_position = {
        position: 16,
        css: 'fa-clock-o',
        tooltip: '100ms Delay'
      };
      return {
        active_position: active_position
      };
    } else {
      position = this.model.get('position');
      active_position = _.findWhere(positions, {
        position: position
      });
      return {
        active_position: active_position
      };
    }
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
      animation: 150,
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



},{"./templates/macro_child":49,"./templates/macro_empty":51}],41:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (connected) {
buf.push("<div class=\"col-lg-12 d-flex justify-content-center align-items-center mb-4\">");
if ( connected)
{
buf.push("<button data-click=\"disconnect\" class=\"btn btn-outline-secondary\"><i class=\"fa fa-fw fa-times mr-1\"></i>DISCONNECT</button>");
}
else
{
buf.push("<button data-click=\"connect\" class=\"btn btn-outline-secondary\"><i class=\"fa fa-fw fa-usb mr-1\"></i>CONNECT</button>");
}
buf.push("</div><div data-region=\"keys\" class=\"col-lg-12 d-flex justify-content-center align-items-center\"></div>");}.call(this,"connected" in locals_for_with?locals_for_with.connected:typeof connected!=="undefined"?connected:undefined));;return buf.join("");
};
},{"jade/runtime":83}],42:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (label) {
buf.push("<div class=\"col-lg-12\"><div class=\"row d-flex align-items-center\"><div class=\"col-lg-10\"><p class=\"lead mb-0\">" + (jade.escape(null == (jade_interp = label) ? "" : jade_interp)) + "</p></div><div class=\"col-lg-2 text-right text-muted\"><i class=\"fa fa-fw fa-pencil\"></i></div></div></div>");}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return buf.join("");
};
},{"jade/runtime":83}],43:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (navItems, undefined) {
buf.push("<div class=\"col-lg-12\"><div class=\"row\"><div class=\"col-lg-12 d-flex flex-row align-items-center justify-content-center\"><i class=\"d-flex fa fa-fw fa-2x fa-arrow-circle-o-down mr-1\"></i><p style=\"letter-spacing: 0.25rem; font-weight: 200;\" class=\"d-flex lead m-0\">Select an editor</p></div></div><div class=\"row mt-5\"><div class=\"col-lg-12 d-flex justify-content-center\">");
// iterate navItems
;(function(){
  var $$obj = navItems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var navItem = $$obj[$index];

buf.push("<button data-toggle=\"tooltip\"" + (jade.attr("title", navItem.title, true, false)) + " data-placement=\"bottom\" style=\"flex-grow:1;\"" + (jade.attr("data-trigger", navItem.trigger, true, false)) + (jade.attr("disabled", navItem.disabled, true, false)) + (jade.cls(['d-flex','btn','btn-outline-secondary','justify-content-center','mx-3',navItem.css], [null,null,null,null,null,true])) + ">" + (jade.escape(null == (jade_interp = navItem.text) ? "" : jade_interp)) + "</button>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var navItem = $$obj[$index];

buf.push("<button data-toggle=\"tooltip\"" + (jade.attr("title", navItem.title, true, false)) + " data-placement=\"bottom\" style=\"flex-grow:1;\"" + (jade.attr("data-trigger", navItem.trigger, true, false)) + (jade.attr("disabled", navItem.disabled, true, false)) + (jade.cls(['d-flex','btn','btn-outline-secondary','justify-content-center','mx-3',navItem.css], [null,null,null,null,null,true])) + ">" + (jade.escape(null == (jade_interp = navItem.text) ? "" : jade_interp)) + "</button>");
    }

  }
}).call(this);

buf.push("</div></div></div>");}.call(this,"navItems" in locals_for_with?locals_for_with.navItems:typeof navItems!=="undefined"?navItems:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":83}],44:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (macro_editor) {
buf.push("<div class=\"col-lg-12\"><div class=\"row justify-content-center\"><div class=\"col-lg-12 d-flex justify-content-center\"><button data-click=\"cancel\" class=\"btn btn-sm btn-outline-secondary mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-angle-left\"></i></button><button data-click=\"save\" class=\"btn btn-sm btn-outline-success mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-check-circle-o\"></i></button>");
if ( macro_editor)
{
buf.push("<button data-click=\"clear\" class=\"btn btn-sm btn-outline-warning mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-times\"></i></button><button data-click=\"record\" class=\"btn btn-sm btn-outline-danger mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-circle\"></i></button><div class=\"btn-group\"><button type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"btn btn-sm btn-outline-primary dropdown-toggle mx-2 px-4\">Examples</button><div class=\"dropdown-menu dropdown-menu-right mt-3\"><button type=\"button\" data-example=\"ex_01\" class=\"dropdown-item\">Ex. 1: \"Hello!\"</button><button type=\"button\" data-example=\"ex_02\" class=\"dropdown-item\">Ex. 2: \"Resumè\"</button><button type=\"button\" data-example=\"ex_03\" class=\"dropdown-item\">Ex. 3: Em Dash (—)</button><button type=\"button\" data-example=\"ex_04\" class=\"dropdown-item\">Ex. 4: CTRL + ALT + DELETE</button></div></div>");
}
buf.push("</div></div></div><div class=\"col-lg-12\"><hr/></div><div data-region=\"content\" class=\"col-lg-12\"></div>");}.call(this,"macro_editor" in locals_for_with?locals_for_with.macro_editor:typeof macro_editor!=="undefined"?macro_editor:undefined));;return buf.join("");
};
},{"jade/runtime":83}],45:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"col-lg-12\"><div class=\"row\"><div class=\"col-lg-12 d-flex flex-row align-items-center justify-content-center\"><i class=\"d-flex fa fa-fw fa-2x fa-question-circle-o mr-1\"></i><p style=\"letter-spacing: 0.25rem; font-weight: 200;\" class=\"d-flex lead m-0\">Click a key to edit</p></div></div><div class=\"row mt-5\"><div style=\"opacity:0\" class=\"col-lg-12 d-flex justify-content-center\"><button disabled=\"disabled\" style=\"flex-grow:1;\" class=\"d-flex btn btn-outline-secondary justify-content-center mx-3\">BLANK</button></div></div></div>");;return buf.join("");
};
},{"jade/runtime":83}],46:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (label) {
buf.push("<span>" + (jade.escape(null == (jade_interp = label) ? "" : jade_interp)) + "</span>");}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return buf.join("");
};
},{"jade/runtime":83}],47:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<ul class=\"list-unstyled key--list d-flex justify-content-between align-items-center flex-row my-2\"></ul><img src=\"./img/icon_white.svg\" class=\"logo\"/>");;return buf.join("");
};
},{"jade/runtime":83}],48:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row h-100 w-100 editor--overlay\"><div data-region=\"editor\" class=\"col-lg-12 pt-2\"></div></div><div class=\"row device--overlay\"><div data-region=\"device\" class=\"col-lg-12\"></div><div data-region=\"selector\" class=\"col-lg-12 pt-5\"></div></div>");;return buf.join("");
};
},{"jade/runtime":83}],49:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (active_position, alpha, css, key, shift_key, shifted, special) {
jade_mixins["positionSelect"] = jade_interp = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<span data-toggle=\"tooltip\"" + (jade.attr("title", opts.tooltip, true, false)) + " data-placement=\"bottom\"" + (jade.cls(['fa-stack','fa-lg','position--select',`position_${opts.position}`], [null,null,null,true])) + "><i class=\"fa fa-circle-thin fa-stack-2x\"></i><i class=\"fa fa-stack-1x fa-stack\"><i class=\"fa fa-circle-thin fa-stack-2x fa-2x\"></i><i" + (jade.attr("data-position", opts.position, true, false)) + (jade.cls(['fa','fa-stack-1x',opts.css], [null,null,true])) + "></i></i></span>");
};
buf.push("<div" + (jade.cls(['key','d-flex',typeof special === "undefined" ? "" : "special"], [null,null,true])) + "><div" + (jade.cls(['inner','content',css], [null,null,true])) + ">");
if ( shifted || shift_key && !alpha)
{
buf.push("<div class=\"shift\">" + (jade.escape(null == (jade_interp = shift_key) ? "" : jade_interp)) + "</div>" + (jade.escape(null == (jade_interp = key) ? "" : jade_interp)));
}
else
{
buf.push("<div class=\"plain\">" + (jade.escape(null == (jade_interp = key) ? "" : jade_interp)) + "</div>");
}
buf.push("</div><div class=\"inner hover\"><i class=\"fa fa-fw fa-lg fa-times\"></i></div></div><div class=\"position mt-2\">");
jade_mixins["positionSelect"](active_position);
buf.push("</div>");}.call(this,"active_position" in locals_for_with?locals_for_with.active_position:typeof active_position!=="undefined"?active_position:undefined,"alpha" in locals_for_with?locals_for_with.alpha:typeof alpha!=="undefined"?alpha:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"key" in locals_for_with?locals_for_with.key:typeof key!=="undefined"?key:undefined,"shift_key" in locals_for_with?locals_for_with.shift_key:typeof shift_key!=="undefined"?shift_key:undefined,"shifted" in locals_for_with?locals_for_with.shifted:typeof shifted!=="undefined"?shifted:undefined,"special" in locals_for_with?locals_for_with.special:typeof special!=="undefined"?special:undefined));;return buf.join("");
};
},{"jade/runtime":83}],50:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<input type=\"hidden\" name=\"type\" value=\"macro\" readonly=\"readonly\"/><div data-region=\"macro\" class=\"col-lg-12\"></div><div class=\"col-lg-12\"><hr/></div><div data-region=\"controls\" class=\"col-lg-12\"></div>");;return buf.join("");
};
},{"jade/runtime":83}],51:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<p class=\"lead text-center\">Macros<br/><small>Execute keystrokes in a specific sequence</small></p><small style=\"font-size: 1rem;\" class=\"text-muted d-flex flex-row justify-content-center align-items-center\"><div class=\"fa fa-fw fa-question-circle-o mr-1 d-flex flex-column\"></div><div class=\"d-flex flex-row\"><span>Use the keys below, or click&nbsp;</span><span class=\"text-danger\"><i class=\"fa fa-fw fa-circle text-danger\"></i> record&nbsp;</span>&nbsp;to start typing</div></small>");;return buf.join("");
};
},{"jade/runtime":83}],52:[function(require,module,exports){
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
buf.push("<div class=\"col-lg-8\"><input type=\"hidden\" name=\"type\" value=\"text\" readonly=\"readonly\"/>");
jade_mixins["formInput"].call({
attributes: jade.merge([{ class: 'form-control-lg' }])
}, { name: 'text_value', type: 'text', placeholder: 'Enter some text here...' });
buf.push("</div>");;return buf.join("");
};
},{"jade/runtime":83}],53:[function(require,module,exports){
var TextEditor,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextEditor = (function(superClass) {
  extend(TextEditor, superClass);

  function TextEditor() {
    return TextEditor.__super__.constructor.apply(this, arguments);
  }

  TextEditor.prototype.className = 'row d-flex justify-content-center';

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



},{"./templates/text_editor":52}],54:[function(require,module,exports){
module.exports = [
  {
    id: 'device_1',
    label: 'Alex\'s AstroKey',
    status_code: 1,
    keys: [
      {
        id: 'device_1_key_1',
        order: '0x0000',
        config: {
          type: 'macro',
          macros: []
        }
      }, {
        id: 'device_1_key_2',
        order: '0x0001',
        config: {
          type: 'macro',
          macros: []
        }
      }, {
        id: 'device_1_key_3',
        order: '0x0002',
        config: {
          type: 'macro',
          macros: []
        }
      }, {
        id: 'device_1_key_4',
        order: '0x0003',
        config: {
          type: 'macro',
          macros: []
        }
      }, {
        id: 'device_1_key_5',
        order: '0x0004',
        config: {
          type: 'macro',
          macros: []
        }
      }
    ]
  }
];



},{}],55:[function(require,module,exports){
var AstrokeyCollection, AstrokeyConfig, AstrokeyModel, DeviceCollection, DeviceModel, MacroEntities, MacroKeys, pairArray,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MacroEntities = require('../macro/entities');

MacroKeys = require('../key/keys');

pairArray = (function(_this) {
  return function(a) {
    var arr, temp;
    temp = a.slice();
    arr = [];
    while (temp.length) {
      arr.push(temp.splice(0, 2));
    }
    return arr;
  };
})(this);

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

  AstrokeyModel.prototype.buildSnippet = function(snippet) {
    var char, data, i, index, macro, ref;
    data = [];
    for (index = i = 0, ref = snippet.length - 1; 0 <= ref ? i <= ref : i >= ref; index = 0 <= ref ? ++i : --i) {
      char = snippet[index];
      macro = _.findWhere(MacroKeys, {
        key: char
      });
      macro || (macro = _.findWhere(MacroKeys, {
        key: 'SPACE'
      }));
      macro = _.clone(macro);
      macro.order = index;
      macro.position = 0;
      data.push(macro);
    }
    return data;
  };

  AstrokeyModel.prototype.readMacro = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return Radio.channel('usb').request('read:macro', _this.get('order')).then(function(macroArray) {
          var config, i, index, iterateIndex, len, macro, macros, nextMacro, pair, pairs, parsedIndex, parsedMacros, position;
          macros = [];
          parsedMacros = [];
          console.log('Parsed Macro from key: ', _this.get('order'));
          console.log(macroArray);
          macroArray = _.compact(macroArray);
          pairs = pairArray(macroArray);
          for (index = i = 0, len = pairs.length; i < len; index = ++i) {
            pair = pairs[index];
            position = pair[0];
            if (pair[0] === 16) {
              macro = _.findWhere(MacroKeys, {
                delay: true
              });
              macro = _.clone(macro);
              macro.position = 3;
            } else {
              macro = _.findWhere(MacroKeys, {
                dec: pair[1]
              });
              macro = _.clone(macro);
              macro.position = position;
            }
            macros.push(macro);
          }
          parsedIndex = 0;
          iterateIndex = 0;
          while (iterateIndex < macros.length) {
            macro = macros[iterateIndex];
            nextMacro = macros[iterateIndex + 1];
            if (!nextMacro) {
              macro.order = parsedIndex;
              parsedIndex++;
              parsedMacros.push(macro);
              iterateIndex++;
              continue;
            }
            macro.order = parsedIndex;
            parsedIndex++;
            parsedMacros.push(macro);
            iterateIndex++;
            continue;
          }
          config = _this.get('config');
          config.get('macros').reset(parsedMacros);
          return resolve(macros);
        });
      };
    })(this));
  };

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



},{"../key/keys":22,"../macro/entities":27}],56:[function(require,module,exports){
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



},{"./data":54,"./entities":55}],57:[function(require,module,exports){
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



},{"./views/layout":58,"hn_routing/lib/route":81}],58:[function(require,module,exports){
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



},{"./templates/layout":59}],59:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row h-100\"><div class=\"col-lg-12 text-center\"><p class=\"lead\">AstroKey</p><hr/><p class=\"lead\">Connect an AstroKey device to get started</p><hr/><a href=\"#device\" class=\"btn btn-outline-primary\">DEVICE</a></div></div>");;return buf.join("");
};
},{"jade/runtime":83}],60:[function(require,module,exports){
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



},{"./dashboard/route":33,"./factory":56,"./home/route":57,"hn_routing/lib/router":82}],61:[function(require,module,exports){
var ChromeWebUsbService, requestDeviceFilters,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

requestDeviceFilters = [
  {
    vendorId: 0x10c4
  }
];

ChromeWebUsbService = (function(superClass) {
  extend(ChromeWebUsbService, superClass);

  function ChromeWebUsbService() {
    return ChromeWebUsbService.__super__.constructor.apply(this, arguments);
  }

  ChromeWebUsbService.prototype.radioRequests = {
    'usb devices': 'getDevices',
    'usb read:macro': 'readMacro',
    'usb write:macro': 'writeMacro'
  };

  ChromeWebUsbService.prototype.getDevices = function() {
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
                window.d = d;
                return resolve(d);
              });
            });
          })["catch"](function(err) {
            return console.log('ERR - navigator.usb.getDevices()');
          });
        });
      };
    })(this));
  };

  ChromeWebUsbService.prototype.readMacro = function(macroIndex) {
    if (macroIndex == null) {
      macroIndex = 0x0000;
    }
    return new Promise((function(_this) {
      return function(resolve, reject) {
        var transferOptions;
        transferOptions = {
          'requestType': 'vendor',
          'recipient': 'device',
          'request': 0x03,
          'value': macroIndex,
          'index': 0x02
        };
        return d.controlTransferIn(transferOptions, 256).then(function(response) {
          console.log('readMacro response:');
          console.log(response);
          return resolve(new Uint8Array(response.data.buffer));
        })["catch"](function(err) {
          console.log('readMacro error:');
          console.log(err);
          return reject(err);
        });
      };
    })(this));
  };

  ChromeWebUsbService.prototype.writeMacro = function(macroIndex, data) {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        var requestObj;
        requestObj = {
          'requestType': 'vendor',
          'recipient': 'device',
          'request': 0x03,
          'value': macroIndex,
          'index': 0x01
        };
        console.log(requestObj);
        return d.controlTransferOut(requestObj, new Uint8Array(data).buffer).then(function(response) {
          console.log(response);
          return resolve(response);
        })["catch"](function(err) {
          console.log('ERROR SENDING MACRO');
          return reject(err);
        });
      };
    })(this));
  };

  return ChromeWebUsbService;

})(Marionette.Service);

module.exports = new ChromeWebUsbService();



},{}],62:[function(require,module,exports){

},{}],63:[function(require,module,exports){
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



},{}],64:[function(require,module,exports){
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



},{"./bindBase":63}],65:[function(require,module,exports){
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



},{}],66:[function(require,module,exports){
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



},{}],67:[function(require,module,exports){
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



},{}],68:[function(require,module,exports){
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



},{}],69:[function(require,module,exports){
Marionette.Decorator = require('./decorator');

Marionette.View.prototype.serializeModel = function() {
  if (!this.model) {
    return {};
  } else if (this.model.decorator) {
    return this.model.decorator.decorate(this.model);
  }
  return _.clone(this.model.attributes);
};



},{"./decorator":70}],70:[function(require,module,exports){
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



},{}],71:[function(require,module,exports){
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



},{"./model":73}],72:[function(require,module,exports){
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



},{"./service":74,"./views/flashList":75}],73:[function(require,module,exports){
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



},{}],74:[function(require,module,exports){
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



},{"./collection":71}],75:[function(require,module,exports){
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



},{"./templates/flash_child":76}],76:[function(require,module,exports){
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
},{"jade/runtime":83}],77:[function(require,module,exports){
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



},{"./view":79}],78:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (modalCss) {
buf.push("<div role=\"document\" data-region=\"modal-content\"" + (jade.cls([modalCss], [true])) + "></div>");}.call(this,"modalCss" in locals_for_with?locals_for_with.modalCss:typeof modalCss!=="undefined"?modalCss:undefined));;return buf.join("");
};
},{"jade/runtime":83}],79:[function(require,module,exports){
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



},{"./modal_template":78}],80:[function(require,module,exports){
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



},{}],81:[function(require,module,exports){
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



},{}],82:[function(require,module,exports){
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



},{}],83:[function(require,module,exports){
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
},{"fs":62}],84:[function(require,module,exports){
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
        json.position = 1;
        this.trigger('key:selected', json);
      } else {
        this.trigger('key:selected', key.toJSON());
      }
    }
    if (e.type === 'keyup') {
      if ((ref1 = e.key) === "Control" || ref1 === "Meta" || ref1 === "Alt" || ref1 === "Shift") {
        json = key.toJSON();
        json.position = 2;
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



},{"./templates/keyboard_abstract":23}],85:[function(require,module,exports){
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



},{"./templates/keyboard_full":24,"lib/views/keyboard_abstract":84}],86:[function(require,module,exports){
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



},{"lib/views/keyboard_abstract":84}],87:[function(require,module,exports){
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



},{"lib/views/keyboard_abstract":84}],88:[function(require,module,exports){
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



},{"lib/views/keyboard_abstract":84}],89:[function(require,module,exports){
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



},{"./templates/keyboard_numpad":25,"lib/views/keyboard_abstract":84}],90:[function(require,module,exports){
var FullKeyboard, FunctionKeyboard, KeyboardSelector, MediaKeyboard, NavKeyboard, NumpadView, SimpleNav, SpecialKeyboard,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SimpleNav = require('lib/views/simple_nav');

FullKeyboard = require('lib/views/keyboard_full');

NumpadView = require('lib/views/keyboard_numpad');

FunctionKeyboard = require('lib/views/keyboard_function');

MediaKeyboard = require('lib/views/keyboard_media');

SpecialKeyboard = require('lib/views/keyboard_special');

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
      icon: 'fa-file-text-o',
      text: 'Special',
      trigger: 'special'
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

  KeyboardSelector.prototype.onNavigateSpecial = function() {
    return this.showKeyboardView(new SpecialKeyboard({
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



},{"./templates/keyboard_selector":26,"lib/views/keyboard_full":85,"lib/views/keyboard_function":86,"lib/views/keyboard_media":87,"lib/views/keyboard_nav":88,"lib/views/keyboard_numpad":89,"lib/views/keyboard_special":91,"lib/views/simple_nav":92}],91:[function(require,module,exports){
var AbstractKeyboardView, SpecialKeyboard,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AbstractKeyboardView = require('lib/views/keyboard_abstract');

SpecialKeyboard = (function(superClass) {
  extend(SpecialKeyboard, superClass);

  function SpecialKeyboard() {
    return SpecialKeyboard.__super__.constructor.apply(this, arguments);
  }

  SpecialKeyboard.prototype.templateHelpers = function() {
    var keys;
    keys = this.options.keys.toJSON();
    return {
      r0: _.where(keys, {
        row: 'special_r0'
      })
    };
  };

  return SpecialKeyboard;

})(AbstractKeyboardView);

module.exports = SpecialKeyboard;



},{"lib/views/keyboard_abstract":84}],92:[function(require,module,exports){
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
    'click [data-trigger]:not(.disabled)': 'onNavItemClick'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2FwcC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvYXBwbGljYXRpb24vdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2JlaGF2aW9ycy9rZXlib2FyZENvbnRyb2xzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc2VsZWN0YWJsZUNoaWxkLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc29ydGFibGVDaGlsZC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvYmVoYXZpb3JzL3NvcnRhYmxlTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbXBvbmVudHMvYWJvdXQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9jb21wb25lbnRzL2Fib3V0L3ZpZXdzL3RlbXBsYXRlcy9hYm91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29tcG9uZW50cy9oZWFkZXIvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9jb21wb25lbnRzL2hlYWRlci92aWV3cy90ZW1wbGF0ZXMvaGVhZGVyLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL2NvcnMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbmZpZy9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL2p3dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL21hcmlvbmV0dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbmZpZy93aW5kb3cuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21hbmlmZXN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL2tleS9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9rZXkvZmFjdG9yeS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9rZXkva2V5cy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QvdGVtcGxhdGVzL2tleWJvYXJkX2Fic3RyYWN0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVsbC90ZW1wbGF0ZXMva2V5Ym9hcmRfZnVsbC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX251bXBhZC90ZW1wbGF0ZXMva2V5Ym9hcmRfbnVtcGFkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3IvdGVtcGxhdGVzL2tleWJvYXJkX3NlbGVjdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvZXhhbXBsZV8yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21hY3JvL2V4YW1wbGVzL2V4YW1wbGVfMy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvZGV2aWNlTGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvclNlbGVjdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvcldyYXBwZXIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3Mva2V5U2VsZWN0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL21hY3JvRWRpdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL21hY3JvTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZGV2aWNlX2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2RldmljZV9zdGF0dXMuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfc2VsZWN0b3IuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfd3JhcHBlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2hlbHBfdmlldy5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2tleV9jaGlsZC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2tleV9zZWxlY3Rvci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL21hY3JvX2NoaWxkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZWRpdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZW1wdHkuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy90ZXh0X2VkaXRvci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGV4dEVkaXRvci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2RhdGEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2ZhY3RvcnkuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3JvdXRlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vaG9tZS92aWV3cy9sYXlvdXQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3ZpZXdzL3RlbXBsYXRlcy9sYXlvdXQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL3VzYi9jaHJvbWVfd2ViX3VzYl9zZXJ2aWNlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9iaW5kQmFzZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9iZWhhdmlvcnMvbGliL2JpbmRJbnB1dHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9mbGFzaGVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9zdWJtaXRCdXR0b24uY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi90b29sdGlwcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9lbnRpdGllcy9saWIvY29uZmlnLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2huX2VudGl0aWVzL2xpYi9kZWNvcmF0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbGxlY3Rpb24uY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvbW9kZWwuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3NlcnZpY2UuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3ZpZXdzL2ZsYXNoTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvdmlld3MvdGVtcGxhdGVzL2ZsYXNoX2NoaWxkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9tb2RhbC9saWIvYWJzdHJhY3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fbW9kYWwvbGliL21vZGFsX3RlbXBsYXRlLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9tb2RhbC9saWIvdmlldy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9vdmVybGF5L2xpYi9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2phZGUvcnVudGltZS5qcyIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9mdWxsL2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVuY3Rpb24vaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9tZWRpYS9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX25hdi9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX251bXBhZC9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX3NlbGVjdG9yL2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfc3BlY2lhbC9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL3NpbXBsZV9uYXYvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDR0EsSUFBQSxXQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3dCQUVKLFdBQUEsR0FDRTtJQUFBLGNBQUEsRUFBZ0IsWUFBaEI7Ozt3QkFHRixVQUFBLEdBQVksU0FBQTtJQUdWLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFnQyxDQUFDLE9BQWpDLENBQXlDLE9BQXpDO0lBR0EsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQW9DLENBQUMsT0FBckMsQ0FBNkMsT0FBN0M7SUFDQSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxPQUExQztJQUNBLElBQUMsQ0FBQSxPQUFELENBQUE7QUFDQSxXQUFPO0VBVEc7O3dCQWNaLE9BQUEsR0FBUyxTQUFBO0lBQ1AsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFqQixDQUFBO1dBR0EsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFkLENBQUEsQ0FDQSxDQUFDLElBREQsQ0FDTyxDQUFBLFNBQUEsS0FBQTthQUFB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RGEsRUFFYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxPQUFBLEVBQVMsRUFBaEQ7SUFBb0QsR0FBQSxFQUFLLEVBQXpEO0dBRmEsRUFHYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxPQUFBLEVBQVMsRUFBaEQ7SUFBb0QsR0FBQSxFQUFLLEVBQXpEO0dBSGEsRUFJYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxPQUFBLEVBQVMsRUFBaEQ7SUFBb0QsR0FBQSxFQUFLLEVBQXpEO0dBSmEsRUFLYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxPQUFBLEVBQVMsRUFBaEQ7SUFBb0QsR0FBQSxFQUFLLEVBQXpEO0dBTGEsRUFNYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxPQUFBLEVBQVMsRUFBaEQ7SUFBb0QsR0FBQSxFQUFLLEVBQXpEO0dBTmEsRUFPYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxPQUFBLEVBQVMsRUFBaEQ7SUFBb0QsR0FBQSxFQUFLLEVBQXpEO0dBUGEsRUFRYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxPQUFBLEVBQVMsRUFBaEQ7SUFBb0QsR0FBQSxFQUFLLEVBQXpEO0dBUmEsRUFTYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxPQUFB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RUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxLQUFBLEVBQU8sSUFBOUM7SUFBb0QsT0FBQSxFQUFTLEVBQTdEO0lBQWlFLEdBQUEsRUFBSyxFQUF0RTtHQTlDYSxFQStDYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxLQUFBLEVBQU8sSUFBOUM7SUFBb0QsT0FBQSxFQUFTLEVBQTdEO0lBQWlFLEdBQUEsRUFBSyxFQUF0RTtHQS9DYSxFQWdEYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxLQUFBLEVBQU8sSUFBOUM7SUFBb0QsT0FBQSxFQUFTLEVBQTdEO0lBQWlFLEdBQUEsRUFBSyxDQUF0RTtHQWhEYSxFQWlEYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxLQUFBLEVBQU8sSUFBOUM7SUFBb0QsT0FBQSxFQUFTLEVBQTdEO0lBQWlFLEdBQUEsRUFBSyxFQUF0RTtHQWpEYSxFQWtEYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxLQUFBLEVBQU8sSUFBOUM7SUFBb0QsT0FBQSxFQUFTLEVBQTdEO0lBQWlFLEdBQUEsRUFBSyxDQUF0RTtHQWxEYSxFQW1EYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJQUF1QyxLQUFBLEVBQU8sSUFBOUM7SUFBb0QsT0FBQSxFQUFTLEVBQTdEO0lBQWlFLEdBQUEsRUFBSyxFQUF0RTtHQW5EYSxFQW9EYjtJQUFFLEdBQUEsRUFBSyxJQUFQO0lBQWEsR0FBQSxFQUFLLEdBQWxCO0lBQXVCLFNBQUEsRUFBVyxHQUFsQztJ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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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aUIsR0FBRyxDQUFDLE9BQXJCLEdBQTZCLEdBQWhDLENBQW1DLENBQUMsUUFBcEMsQ0FBNkMsUUFBN0M7RUFKUTs7c0JBTVYsYUFBQSxHQUFlLFNBQUE7QUFDYixRQUFBO0lBQUEsSUFBQSxHQUFPLDhDQUFBLFNBQUE7SUFDUCxDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsRUFBZTtNQUFFLFFBQUEsRUFBVSxDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsRUFBWSxVQUFaLENBQVo7S0FBZjtBQUNBLFdBQU87RUFITTs7c0JBS2YsY0FBQSxHQUFnQixTQUFDLENBQUQ7QUFDZCxRQUFBO0lBQUEsRUFBQSxHQUFLLENBQUEsQ0FBRSxDQUFDLENBQUMsYUFBSjtJQUNMLEVBQUUsQ0FBQyxRQUFILENBQVksUUFBWixDQUFxQixDQUFDLFFBQXRCLENBQUEsQ0FBZ0MsQ0FBQyxXQUFqQyxDQUE2QyxRQUE3QztJQUNBLElBQUMsQ0FBQSxhQUFELENBQWUsV0FBQSxHQUFXLENBQUMsRUFBRSxDQUFDLElBQUgsQ0FBUSxTQUFSLENBQUQsQ0FBMUI7V0FDQSxFQUFFLENBQUMsSUFBSCxDQUFBO0VBSmM7Ozs7R0FyQk0sRUFBRSxDQUFDOztBQTZCM0IsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4jIEFwcGxpY2F0aW9uIGNsYXNzIGRlZmluaXRpb25cbiMgTWFuYWdlcyBsaWZlY3ljbGUgYW5kIGJvb3RzdHJhcHMgYXBwbGljYXRpb25cbmNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2FwcCByZWRpcmVjdCc6ICdyZWRpcmVjdFRvJ1xuXG4gICMgSW52b2tlZCBhZnRlciBjb25zdHJ1Y3RvclxuICBpbml0aWFsaXplOiAtPlxuXG4gICAgIyBTdGFydHMgSGVhZGVyIENvbXBvbmVudFxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2hlYWRlcicpLnRyaWdnZXIoJ3Jlc2V0JylcblxuICAgICMgU3RhcnRzIEhlbnNvbi5qcyBDb21wb25lbnRzXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnYnJlYWRjcnVtYicpLnRyaWdnZXIoJ3JlYWR5JylcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdvdmVybGF5JykudHJpZ2dlcigncmVhZHknKVxuICAgIEBvblJlYWR5KClcbiAgICByZXR1cm4gdHJ1ZVxuXG4gICMgU3RhcnRzIHRoZSBhcHBsaWNhdGlvblxuICAjIFN0YXJ0cyBCYWNrYm9uZS5oaXN0b3J5IChlbmFibGVzIHJvdXRpbmcpXG4gICMgQW5kIGluaXRpYWxpemVzIHNpZGViYXIgbW9kdWxlXG4gIG9uUmVhZHk6IC0+XG4gICAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCgpXG5cbiAgICAjIFRPRE8gLSB0aGlzIGlzIGEgaGFjayB0byBhdXRvLWNvbm5lY3QgdG8gYSBkZXZpY2UgSUYgaXQncyBhbHJlYWR5IGJlZW4gY29ubmVjdGVkIHRvXG4gICAgbmF2aWdhdG9yLnVzYi5nZXREZXZpY2VzKClcbiAgICAudGhlbiggKGQpID0+XG4gICAgICByZXR1cm4gdW5sZXNzIGRbMF1cbiAgICAgIGRbMF0ub3BlbigpXG4gICAgICB3aW5kb3cuZCA9IGRbMF1cbiAgICApXG5cbiAgIyBSZWRpcmVjdGlvbiBpbnRlcmZhY2VcbiAgIyBVc2VkIGFjY3Jvc3MgdGhlIGFwcGxpY2F0aW9uIHRvIHJlZGlyZWN0XG4gICMgdG8gc3BlY2lmaWMgdmlld3MgYWZ0ZXIgc3BlY2lmaWMgYWN0aW9uc1xuICByZWRpcmVjdFRvOiAocm91dGUpIC0+XG4gICAgd2luZG93LmxvY2F0aW9uID0gcm91dGVcbiAgICByZXR1cm4gdHJ1ZVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBsaWNhdGlvblxuIiwiXG4jIEFwcGxpY2F0aW9uTGF5b3V0IGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIE1hcmlvbmV0dGUuTGF5b3V0VmlldyB0byBtYW5hZ2VcbiMgdG9wLWxldmVsIGFwcGxpY2F0aW9uIHJlZ2lvbnNcbmNsYXNzIEFwcGxpY2F0aW9uTGF5b3V0IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIGVsOiAnYm9keSdcblxuICB0ZW1wbGF0ZTogZmFsc2VcblxuICByZWdpb25zOlxuICAgIGhlYWRlcjogICAgICdbYXBwLXJlZ2lvbj1oZWFkZXJdJ1xuICAgIG92ZXJsYXk6ICAgICdbYXBwLXJlZ2lvbj1vdmVybGF5XSdcbiAgICBmbGFzaDogICAgICAnW2FwcC1yZWdpb249Zmxhc2hdJ1xuICAgIG1vZGFsOiAgICAgICdbYXBwLXJlZ2lvbj1tb2RhbF0nXG4gICAgbWFpbjogICAgICAgJ1thcHAtcmVnaW9uPW1haW5dJ1xuXG4jICMgIyAjICNcblxuIyBFeHBvcnRzIGluc3RhbmNlXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBBcHBsaWNhdGlvbkxheW91dCgpLnJlbmRlcigpXG4iLCJcbiMgTWFyaW9uZXR0ZSBCZWhhdmlvciBNYW5pZmVzdFxubW9kdWxlLmV4cG9ydHMgPVxuICBTdWJtaXRCdXR0b246ICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL3N1Ym1pdEJ1dHRvbidcbiAgRmxhc2hlczogICAgICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi9mbGFzaGVzJ1xuICBNb2RlbEV2ZW50czogICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL21vZGVsRXZlbnRzJ1xuICBCaW5kSW5wdXRzOiAgICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL2JpbmRJbnB1dHMnXG4gIFRvb2x0aXBzOiAgICAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvdG9vbHRpcHMnXG4gIFNlbGVjdGFibGVDaGlsZDogIHJlcXVpcmUgJy4vc2VsZWN0YWJsZUNoaWxkJ1xuICBLZXlib2FyZENvbnRyb2xzOiAgcmVxdWlyZSAnLi9rZXlib2FyZENvbnRyb2xzJ1xuICBTb3J0YWJsZUNoaWxkOiAgICByZXF1aXJlICcuL3NvcnRhYmxlQ2hpbGQnXG4gIFNvcnRhYmxlTGlzdDogICAgIHJlcXVpcmUgJy4vc29ydGFibGVMaXN0J1xuIiwiIyBOT1RFIC0gdGhpcyBiZWhhdmlvciBoYXMgbm90IGJlZW4gdGVzdGVkIHdpdGggbXVsdGlwbGUgdmlld3Mgc2ltdWx0YW5lb3VzbHlcblxuIyBFbmFibGVzIHZpZXcgY2FsbGJhY2tzIHRvIGJlIHRyaWdnZXJlZCBieSBrZXlib2FyZCBpbnB1dFxuY2xhc3MgS2V5Ym9hcmRDb250cm9scyBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBrZXlFdmVudHMgPSBAb3B0aW9ucy5rZXlFdmVudHNcblxuICBvblJlbmRlcjogLT5cbiAgICBAYWRkRXZlbnRMaXN0ZW5lcigpXG5cbiAgb25CZWZvcmVEZXN0cm95OiAtPlxuICAgIEByZW1vdmVFdmVudExpc3RlbmVyKClcblxuICBrZXlBY3Rpb246IChlKSA9PlxuXG4gICAgIyBjb25zb2xlLmxvZyhlKTtcblxuICAgICMgSXNvbGF0ZXMgdGhlIGtleXN0cm9rZVxuICAgICMga2V5Q29kZSA9IGUua2V5Q29kZVxuXG4gICAgcmV0dXJuIEB2aWV3LnRyaWdnZXJNZXRob2QoJ2tleTphY3Rpb24nLCBlKVxuXG4gICAgIyBEbyBub3RoaW5nIGlmIHRoZXJlIGlzbid0IGFuXG4gICAgIyBldmVudCBhc3NvY2lhdGVkIHdpdGggdGhlIGtleXN0cm9rZVxuICAgICMgcmV0dXJuIHVubGVzcyBAa2V5RXZlbnRzW2tleUNvZGVdXG5cbiAgICAjIFByZXZlbnRzIGFueSBkZWZhdWx0IGFjdGlvbiBhc3NvY2lhdGVkIHdpdGggdGhlIGtleWNvZGVcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICMgVHJpZ2dlcnMgdGhlIGV2ZW50IGFzc29jaWF0ZWQgd2l0aFxuICAgICMgdGhlIGtleXN0cm9rZSBvbiB0aGUgdmlldyBpbnN0YW5jZVxuICAgICMgcmV0dXJuIEB2aWV3LnRyaWdnZXJNZXRob2QoQGtleUV2ZW50c1trZXlDb2RlXSlcblxuICBhZGRFdmVudExpc3RlbmVyOiAtPlxuICAgICQoZG9jdW1lbnQpLm9uICdrZXlkb3duJywgQGtleUFjdGlvblxuICAgICQoZG9jdW1lbnQpLm9uICdrZXl1cCcsIEBrZXlBY3Rpb25cbiAgICAjICQoZG9jdW1lbnQpLm9uICdrZXlwcmVzcycsIEBrZXlBY3Rpb25cbiAgICAjIFJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykudHJpZ2dlcignYWRkJywgeyBjb250ZXh0OiAnaW5mbycsIHRpbWVvdXQ6IDE1MDAsIG1lc3NhZ2U6ICdLZXlib2FyZCBjb250cm9scyBlbmFibGVkJ30pXG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogLT5cbiAgICAkKGRvY3VtZW50KS5vZmYgJ2tleWRvd24nLCBAa2V5QWN0aW9uXG4gICAgJChkb2N1bWVudCkub2ZmICdrZXl1cCcsIEBrZXlBY3Rpb25cbiAgICAjICQoZG9jdW1lbnQpLm9mZiAna2V5cHJlc3MnLCBAa2V5QWN0aW9uXG4gICAgIyBSYWRpby5jaGFubmVsKCdmbGFzaCcpLnRyaWdnZXIoJ2FkZCcsIHsgY29udGV4dDogJ2luZm8nLCB0aW1lb3V0OiAxNTAwLCBtZXNzYWdlOiAnS2V5Ym9hcmQgY29udHJvbHMgZGlzYWJsZWQnfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRDb250cm9sc1xuIiwiXG5jbGFzcyBTZWxlY3RhYmxlQ2hpbGQgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgY3NzOlxuICAgIGFjdGl2ZTogJ2FjdGl2ZSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrJzogICdvbkNsaWNrJ1xuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdzZWxlY3RlZCc6ICdvbkNsaWNrJ1xuXG4gICMgU2VsZWN0cyBhY3RpdmVNb2RlbCBvbiByZW5kZXJcbiAgb25SZW5kZXI6IC0+XG4gICAgcmV0dXJuIHVubGVzcyBAb3B0aW9ucy5zZXRBY3RpdmVcblxuICAjIEludm9rZWQgd2hlbiBjbGlja2VkXG4gIG9uQ2xpY2s6IChlKSAtPlxuICAgICMgQnlwYXNzIGJlaGF2aW9yIHdpdGggY3VzdG9tIG9uQ2xpY2sgY2FsbGJhY2tcbiAgICByZXR1cm4gQHZpZXcub25DbGljayhlKSBpZiBAdmlldy5vbkNsaWNrXG5cbiAgICAjIFByZXZlbnQgZG91YmxlLWNsaWNrIHVubGVzcyBzcGVjaWZpY2VkXG4gICAgZT8ucHJldmVudERlZmF1bHQoKSB1bmxlc3MgQG9wdGlvbnMuZG91YmxlQ2xpY2tcblxuICAgICMgSGFuZGxlcyBkZS1zZWxlY3Rpb25cbiAgICBpZiBAb3B0aW9ucy5kZXNlbGVjdCAmJiBAJGVsLmhhc0NsYXNzKEBjc3MuYWN0aXZlKVxuICAgICAgQCRlbC5yZW1vdmVDbGFzcyhAY3NzLmFjdGl2ZSlcbiAgICAgIHJldHVybiBAdmlldy50cmlnZ2VyTWV0aG9kICdkZXNlbGVjdGVkJ1xuXG4gICAgIyBSZXR1cm4gaWYgZWxlbWVudCBpcyBjdXJyZW50bHkgc2VsZWN0ZWRcbiAgICByZXR1cm4gaWYgQCRlbC5oYXNDbGFzcyhAY3NzLmFjdGl2ZSlcblxuICAgICMgUHJldmVudCBkZWFmdWx0IGFuZCB0cmlnZ2VyIHNlbGVjdGVkXG4gICAgZT8ucHJldmVudERlZmF1bHQoKVxuICAgIEB2aWV3LnRyaWdnZXJNZXRob2QgJ3NlbGVjdGVkJ1xuICAgIEAkZWwuYWRkQ2xhc3MoQGNzcy5hY3RpdmUpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoQGNzcy5hY3RpdmUpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdGFibGVDaGlsZFxuIiwiXG4jIFNvcnRhYmxlQ2hpbGQgQmVoYXZpb3IgZGVmaW5pdGlvblxuIyBXb3JrcyB3aXRoIFNvcnRhYmxlTGlzdCBCZWhhdmlvclxuY2xhc3MgU29ydGFibGVDaGlsZCBleHRlbmRzIE1uLkJlaGF2aW9yXG5cbiAgZXZlbnRzOlxuICAgICdzb3J0ZWQnOiAnb25Tb3J0ZWQnXG5cbiAgb25Tb3J0ZWQ6IChlLCBvcmRlcikgLT5cbiAgICBAdmlldy5tb2RlbC5zZXQoJ29yZGVyJywgb3JkZXIpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvcnRhYmxlQ2hpbGRcbiIsIlxuIyBTb3J0YWJsZUxpc3QgQmVoYXZpb3IgZGVmaW5pdGlvblxuIyBXb3JrcyB3aXRoIFNvcnRhYmxlQ2hpbGQgQmVoYXZpb3JcbmNsYXNzIFNvcnRhYmxlTGlzdCBleHRlbmRzIE1uLkJlaGF2aW9yXG5cbiAgIyBEZWZpbmVzIHRoZSByZW9yZGVyQ29sbGVjdGlvbiBtZXRob2Qgb24gdGhlIHZpZXdcbiAgIyB0byB3aGljaCB0aGUgYmVoYXZpb3IgaXMgYXNzaWduZWRcbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAdmlldy5yZW9yZGVyQ29sbGVjdGlvbiA9ID0+IEByZW9yZGVyQ29sbGVjdGlvbigpXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEluaXRpYWxpemVzIFNvcnRhYmxlIGNvbnRhaW5lclxuICAgIFNvcnRhYmxlLmNyZWF0ZSBAdmlldy5lbCxcbiAgICAgIGhhbmRsZTogICAgICAgQG9wdGlvbnMuaGFuZGxlIHx8ICcuc29ydGFibGUnXG4gICAgICBhbmltYXRpb246ICAgIEBvcHRpb25zLmFuaW1hdGlvbiB8fCAyNTBcbiAgICAgIG9uRW5kOiAoZSkgPT4gQHJlb3JkZXJDb2xsZWN0aW9uKClcblxuICAjIHJlb3JkZXJDb2xsZWN0aW9uXG4gICMgSW52b2tlZCBhZnRlciBzb3J0aW5nIGhhcyBjb21wbGV0ZWRcbiAgcmVvcmRlckNvbGxlY3Rpb246ID0+XG5cbiAgICAjIFRyaWdnZXJzIG9yZGVyIGV2ZW50cyBvbiBDb2xsZWN0aW9uVmlldyBjaGlsZFZpZXcgJGVsc1xuICAgIG9yZGVyID0gMVxuICAgIGZvciBlbCBpbiBAdmlldy4kZWxbMF0uY2hpbGRyZW5cbiAgICAgICQoZWwpLnRyaWdnZXIoJ3NvcnRlZCcsb3JkZXIpXG4gICAgICBvcmRlcisrXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvcnRhYmxlTGlzdFxuIiwiQWJvdXRWaWV3ICA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jICMgIyAjICNcblxuY2xhc3MgQWJvdXRDb21wb25lbnQgZXh0ZW5kcyByZXF1aXJlICdobl9tb2RhbC9saWIvYWJzdHJhY3QnXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2Fib3V0IHNob3cnOiAnc2hvd0Fib3V0J1xuXG4gIHNob3dBYm91dDogLT5cbiAgICBhYm91dFZpZXcgPSBuZXcgQWJvdXRWaWV3KClcbiAgICBAc2hvd01vZGFsKGFib3V0VmlldywgeyBzaXplOiAnbGFyZ2UnIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFib3V0Q29tcG9uZW50XG4iLCJcbiMgQWJvdXRWaWV3IGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEFib3V0VmlldyBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2Fib3V0J1xuICBjbGFzc05hbWU6ICdtb2RhbC1jb250ZW50J1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBBYm91dFZpZXdcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48aDUgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIj5BQk9VVDwvaDU+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48aHIvPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PHAgY2xhc3M9XFxcImxlYWRcXFwiPjxhIGhyZWY9XFxcImh0dHBzOi8vZ2l0aHViLmNvbS9Bc3Ryb0tleVxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPiBBc3Ryb0tleTwvYT4gaXMgYW4gb3Blbi1zb3VyY2UgcGxhdGZvcm0gZm9yIHJlLXByb2dyYW1tYWJsZSBVU0Iga2V5Ym9hcmRzLjwvcD48cD5Bc3Ryb0tleSBwcm92aWRlcyBhbiBpbnR1aXRpdmUgaW50ZXJmYWNlIGFueWJvZHkgY2FuIHVzZSB0byBhdXRvbWF0ZSBiYXNpYyBrZXlib2FyZCBhY3Rpb25zLjwvcD48cD5TaW1wbHkgZHJhZyBhbmQgZHJvcCBrZXlib2FyZCBrZXlzIHRvIGNvbnN0cnVjdCB5b3VyIGRlc2lyZWQgc2VxdWVuY2UgLSBBc3Ryb0tleSBkb2VzIHRoZSByZXN0LjwvcD48cD5JdCdzIHRoYXQgZWFzeS48L3A+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48aHIvPjxwPkJ1aWx0IGJ5Jm5ic3A7PGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL0Fhcm9uUGVybFxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPkFhcm9uIFBlcmw8L2E+Jm5ic3A7YW5kJm5ic3A7PGEgaHJlZj1cXFwiaHR0cDovL2Fla3MuY29cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5BbGV4YW5kZXIgU2Nod2FydHpiZXJnPC9hPiZuYnNwO2ZvciZuYnNwOzxhIGhyZWY9XFxcImh0dHBzOi8vcmNvcy5pby9cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5SQ09TLjwvYT48L3A+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIkxheW91dFZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyBIZWFkZXJTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIHNlcnZpY2UgZm9yIG1hbmFnaW5nIGFwcGxpY2F0aW9uXG4jIGhlYWRlciBzdGF0ZS4gRGlzcGxheXMgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcixcbiMgb3IgdGhlICd1bmF1dGhlbnRpY2F0ZWQnIG1lc3NhZ2UgaWYgbm9uZSBpcyBkZWZpbmVkXG5jbGFzcyBIZWFkZXJTZXJ2aWNlIGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAY29udGFpbmVyID0gQG9wdGlvbnMuY29udGFpbmVyXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2hlYWRlciByZXNldCc6ICdyZXNldCdcblxuICByZXNldDogLT5cbiAgICBAY29udGFpbmVyLnNob3cgbmV3IExheW91dFZpZXcoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJTZXJ2aWNlXG4iLCJcbiMgSGVhZGVyVmlldyBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBzaW1icGxlIHZpZXcgZm9yIGRpc3BsYXlpbmcgdGhlXG4jIGhlYWRlciBvZiB0aGUgYXBwbGljYXRpb24uIFRoZSBoZWFkZXIgZGlzcGxheXNcbiMgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBhbmRcbiMgbWFuYWdlcyB0b2dnbGluZyB0aGUgU2lkZWJhckNvbXBvbmVudCdzIHZpZXdcbmNsYXNzIEhlYWRlclZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2hlYWRlcidcbiAgY2xhc3NOYW1lOiAnbmF2YmFyIG5hdmJhci1leHBhbmQtbGcgZml4ZWQtdG9wIG5hdmJhci1kYXJrIGJnLWRhcmsnXG4gIHRhZ05hbWU6ICduYXYnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclZpZXdcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcIm5hdmJhci1icmFuZCB0aXRsZVxcXCI+PGltZyBzcmM9XFxcIi4vaW1nL2ljb25fd2hpdGUuc3ZnXFxcIiBjbGFzcz1cXFwibG9nb1xcXCIvPnN0cm9rZXk8L2Rpdj48dWwgY2xhc3M9XFxcIm5hdmJhci1uYXYgbXItYXV0b1xcXCI+PGxpIGNsYXNzPVxcXCJuYXYtaXRlbVxcXCI+PGEgc3R5bGU9XFxcImN1cnNvcjpwb2ludGVyXFxcIiBvbkNsaWNrPVxcXCJSYWRpby5jaGFubmVsKCd1c2InKS5yZXF1ZXN0KCdkZXZpY2VzJyk7XFxcIiBjbGFzcz1cXFwibmF2LWxpbmtcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1sZyBmYS11c2JcXFwiPjwvaT48L2E+PC9saT48bGkgY2xhc3M9XFxcIm5hdi1pdGVtXFxcIj48YSBzdHlsZT1cXFwiY3Vyc29yOnBvaW50ZXJcXFwiIG9uQ2xpY2s9XFxcIlJhZGlvLmNoYW5uZWwoJ2Fib3V0JykudHJpZ2dlcignc2hvdycpO1xcXCIgY2xhc3M9XFxcIm5hdi1saW5rXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtbGcgZmEtcXVlc3Rpb24tY2lyY2xlLW9cXFwiPjwvaT48L2E+PC9saT48L3VsPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCIjIFN1cHBvcnQgZm9yIGNyb3NzLWRvbWFpbiByZXF1ZXN0cyBpbiBCYWNrYm9uZS5qcyAtIHVzdWFsbHkgdmVyYm90ZW4uXG4jIFRoaXMgYWxsb3dzIHRoZSBkZXYgc2VydmVyIGF0IGxvY2FsLmNvcnRpY2FsbWV0cmljcy5jb206ODA4MCB0byBjb21tdW5pY2F0ZSB3aXRoIGRldi5jb3J0aWNhbG1ldHJpY3MuY29tOjMwMDAgKGNtLW5vZGUtYXBwKVxuXG5jcm9zc0RvbWFpblJvb3QgPSAnaHR0cDovLzE5Mi4xNjguMzMuMzM6MzAwMCcgIyBERVYgT05MWVxuXG5wcm94aWVkU3luYyA9IEJhY2tib25lLnN5bmNcblxuQmFja2JvbmUuc3luYyA9IChtZXRob2QsIG1vZGVsLCBvcHRpb25zID0ge30pID0+XG5cbiAgaWYgIW9wdGlvbnMudXJsXG4gICAgb3B0aW9ucy51cmwgPSBjcm9zc0RvbWFpblJvb3QgKyBfLnJlc3VsdChtb2RlbCwgJ3VybCcpIHx8IHVybEVycm9yKClcblxuICBlbHNlIGlmIG9wdGlvbnMudXJsLnN1YnN0cmluZygwLCA2KSAhPSBjcm9zc0RvbWFpblJvb3Quc3Vic3RyaW5nKDAsIDYpXG4gICAgb3B0aW9ucy51cmwgPSBjcm9zc0RvbWFpblJvb3QgKyBvcHRpb25zLnVybFxuXG4gIGlmICFvcHRpb25zLmNyb3NzRG9tYWluXG4gICAgb3B0aW9ucy5jcm9zc0RvbWFpbiA9IHRydWVcblxuICBpZiAhb3B0aW9ucy54aHJGaWVsZHNcbiAgICBvcHRpb25zLnhockZpZWxkcyA9IHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH1cblxuICByZXR1cm4gcHJveGllZFN5bmMobWV0aG9kLCBtb2RlbCwgb3B0aW9ucylcbiIsIiMgQXBwIGNvbmZpZ3VyYXRpb24gbWFuaWZlc3RcbnJlcXVpcmUgJy4vd2luZG93J1xucmVxdWlyZSAnLi9qd3QnXG5yZXF1aXJlICcuL2NvcnMnXG5yZXF1aXJlICcuL21hcmlvbmV0dGUnXG4iLCIjIEFqYXggSldUIFNoaW1cbiQuYWpheFNldHVwXG4gIGJlZm9yZVNlbmQ6ICh4aHIpIC0+XG4gICAgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKVxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgJ0pXVCAnICsgdG9rZW4pIGlmIHRva2VuXG4gICAgcmV0dXJuXG4iLCIjIE1hcmlvbmV0dGUuQmVoYXZpb3JzIGNvbmZpZ3VyYXRpb25cbk1hcmlvbmV0dGUuQmVoYXZpb3JzLmJlaGF2aW9yc0xvb2t1cCA9IC0+IHJlcXVpcmUgJy4uL2JlaGF2aW9ycydcbiIsIiMgQWxpYXNlcyBCYWNrYm9uZS5SYWRpbyB0byB3aW5kb3cuUmFkaW9cbndpbmRvdy5SYWRpbyA9IEJhY2tib25lLlJhZGlvXG4iLCIjIFRoaXMgZmlsZSBkZWZpbmVzIGEgbWFuaWZlc3QgZm9yIHRoZSBjbGllbnQgYXBwbGljYXRpb24uXG4jIFRoaXMgaW5jbHVkZXMgY29uZmlndXJhdGlvbiwgU2VydmljZXMsIENvbXBvbmVudHMsIE1vZHVsZXNcbiMgYW5kIHRoZSBBcHBsaWNhdGlvbiBzaW5nbGV0b24gaW5zdGFuY2UuXG5cbiMgIyAjICMgI1xuXG4jIEFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24gbWFuaWZlc3RcbnJlcXVpcmUgJy4vY29uZmlnJ1xuXG4jIEFwcGxpY2F0aW9uIGNsYXNzIGRlZmluaXRpb24gJiBBcHAgTGF5b3V0XG5BcHAgICAgICAgPSByZXF1aXJlICcuL2FwcCdcbkFwcExheW91dCA9IHJlcXVpcmUgJy4vYXBwbGljYXRpb24vdmlld3MvbGF5b3V0J1xuXG4jIEhlbnNvbiBFbnRpdGllc1xucmVxdWlyZSAnaG5fZW50aXRpZXMvbGliL2NvbmZpZydcblxuIyAjICMgIyAjXG5cbiMgQ29tcG9uZW50cyBhcmUgcm91dGVsZXNzIHNlcnZpY2VzIHdpdGggdmlld3MgdGhhdCBhcmVcbiMgYWNjZXNzaWJsZSBhbnl3aGVyZSBpbiB0aGUgYXBwbGljYXRpb25cbiMgVXNlZCB0byBtYW5hZ2UgdGhlIGhlYWRlciwgc2lkZWJhciwgZmxhc2gsIGFuZCBjb25maXJtIFVJIGVsZW1lbnRzXG5cbiMgSGVuc29uLmpzIENvbXBvbmVudHNcbkhlYWRlckNvbXBvbmVudCAgICAgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudCdcbkFib3V0Q29tcG9uZW50ICAgICAgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvYWJvdXQvY29tcG9uZW50J1xuT3ZlcmxheUNvbXBvbmVudCAgICA9IHJlcXVpcmUgJ2huX292ZXJsYXkvbGliL2NvbXBvbmVudCdcbkZsYXNoQ29tcG9uZW50ICAgICAgPSByZXF1aXJlICdobl9mbGFzaC9saWIvY29tcG9uZW50J1xubmV3IEhlYWRlckNvbXBvbmVudCh7IGNvbnRhaW5lcjogQXBwTGF5b3V0LmhlYWRlciB9KVxubmV3IE92ZXJsYXlDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5vdmVybGF5IH0pXG5uZXcgRmxhc2hDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5mbGFzaCB9KVxubmV3IEFib3V0Q29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQubW9kYWwgfSlcblxuIyAjICMgIyAjXG5cbiMgU2VydmljZXNcbnJlcXVpcmUoJy4vbW9kdWxlcy91c2IvY2hyb21lX3dlYl91c2Jfc2VydmljZScpXG4jIHJlcXVpcmUoJy4vbW9kdWxlcy91c2IvY2hyb21lX3dlYl9ibHVldG9vdGhfc2VydmljZScpXG5cbiMgRmFjdG9yaWVzXG5yZXF1aXJlKCcuL21vZHVsZXMva2V5L2ZhY3RvcnknKVxuXG4jICMgIyAjICNcblxuIyBNb2R1bGVzXG4jIE1vZHVsZXMgcmVwcmVzZW50IGNvbGxlY3Rpb25zIG9mIGVuZHBvaW50cyBpbiB0aGUgYXBwbGljYXRpb24uXG4jIFRoZXkgaGF2ZSByb3V0ZXMgYW5kIGVudGl0aWVzIChtb2RlbHMgYW5kIGNvbGxlY3Rpb25zKVxuIyBFYWNoIHJvdXRlIHJlcHJlc2VudHMgYW4gZW5kcG9pbnQsIG9yICdwYWdlJyBpbiB0aGUgYXBwLlxuTWFpbk1vZHVsZSA9IHJlcXVpcmUgJy4vbW9kdWxlcy9tYWluL3JvdXRlcidcbm5ldyBNYWluTW9kdWxlKHsgY29udGFpbmVyOiBBcHBMYXlvdXQubWFpbiB9KVxuXG4jICMgIyAjICMgI1xuXG4jIFBhZ2UgaGFzIGxvYWRlZCwgZG9jdW1lbnQgaXMgcmVhZHlcbiQoZG9jdW1lbnQpLm9uICdyZWFkeScsID0+IG5ldyBBcHAoKSAjIEluc3RhbnRpYXRlcyBuZXcgQXBwXG4iLCJcbiMgS2V5TW9kZWwgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgS2V5TW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIERlZmF1bHQgYXR0cmlidXRlc1xuICBkZWZhdWx0czoge31cblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBLZXlNb2RlbFxuICBjb21wYXJhdG9yOiAnb3JkZXInXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1vZGVsOiAgICAgIEtleU1vZGVsXG4gIENvbGxlY3Rpb246IEtleUNvbGxlY3Rpb25cbiIsIkVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpXG5LZXlEYXRhID0gcmVxdWlyZSgnLi9rZXlzJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleUZhY3RvcnkgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb1JlcXVlc3RzOlxuICAgICdrZXkgbW9kZWwnOiAgICAgICAnZ2V0TW9kZWwnXG4gICAgJ2tleSBjb2xsZWN0aW9uJzogICdnZXRDb2xsZWN0aW9uJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGNhY2hlZENvbGxlY3Rpb24gPSBuZXcgRW50aXRpZXMuQ29sbGVjdGlvbihLZXlEYXRhLCB7IHBhcnNlOiB0cnVlIH0pXG5cbiAgZ2V0TW9kZWw6IChpZCkgLT5cbiAgICByZXR1cm4gQGNhY2hlZENvbGxlY3Rpb24uZ2V0KGlkKVxuXG4gIGdldENvbGxlY3Rpb246IC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBLZXlGYWN0b3J5KClcbiIsIlxuIyBLZXkgSlNPTiBkZWZpbml0aW9uc1xuIyBUT0RPIC0gYWJzdHJhY3QgUk9XIGF0dHJpYnV0ZXMgZnJvbSB0aGlzIERTXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnYCcsIHNoaWZ0X2tleTogJ34nLCBrZXljb2RlOiAxOTIsIGRlYzogNTMgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICcxJywgc2hpZnRfa2V5OiAnIScsIGtleWNvZGU6IDQ5LCBkZWM6IDMwIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMicsIHNoaWZ0X2tleTogJ0AnLCBrZXljb2RlOiA1MCwgZGVjOiAzMSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzMnLCBzaGlmdF9rZXk6ICcjJywga2V5Y29kZTogNTEsIGRlYzogMzIgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc0Jywgc2hpZnRfa2V5OiAnJCcsIGtleWNvZGU6IDUyLCBkZWM6IDMzIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNScsIHNoaWZ0X2tleTogJyUnLCBrZXljb2RlOiA1MywgZGVjOiAzNCB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzYnLCBzaGlmdF9rZXk6ICdeJywga2V5Y29kZTogNTQsIGRlYzogMzUgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc3Jywgc2hpZnRfa2V5OiAnJicsIGtleWNvZGU6IDU1LCBkZWM6IDM2IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnOCcsIHNoaWZ0X2tleTogJyonLCBrZXljb2RlOiA1NiwgZGVjOiAzNyB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzknLCBzaGlmdF9rZXk6ICcoJywga2V5Y29kZTogNTcsIGRlYzogMzggfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICcwJywgc2hpZnRfa2V5OiAnKScsIGtleWNvZGU6IDQ4LCBkZWM6IDM5IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnLScsIHNoaWZ0X2tleTogJ18nLCBrZXljb2RlOiAxODksIGRlYzogNDUgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc9Jywgc2hpZnRfa2V5OiAnKycsIGtleWNvZGU6IDE4NywgZGVjOiA0NiB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJ0JBQ0tTUEFDRScsIGtleWNvZGU6IDgsIGNzczogJ3cyXzAnLCBkZWM6IDQyIH1cblxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdUQUInLCBrZXljb2RlOiA5LCBjc3M6ICd3MV81Jywgc3BlY2lhbDogdHJ1ZSwgZGVjOiA0MyB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ3EnLCBzaGlmdF9rZXk6ICdRJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDgxLCBkZWM6IDIwIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAndycsIHNoaWZ0X2tleTogJ1cnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODcsIGRlYzogMjYgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdlJywgc2hpZnRfa2V5OiAnRScsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA2OSwgZGVjOiA4IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAncicsIHNoaWZ0X2tleTogJ1InLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODIsIGRlYzogMjEgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICd0Jywgc2hpZnRfa2V5OiAnVCcsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4NCwgZGVjOiAyMyB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ3knLCBzaGlmdF9rZXk6ICdZJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg5LCBkZWM6IDI4IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAndScsIHNoaWZ0X2tleTogJ1UnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODUsIGRlYzogMjQgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdpJywgc2hpZnRfa2V5OiAnSScsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3MywgZGVjOiAxMiB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ28nLCBzaGlmdF9rZXk6ICdPJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDc5LCBkZWM6IDE4IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAncCcsIHNoaWZ0X2tleTogJ1AnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODAsIGRlYzogMTkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdbJywgc2hpZnRfa2V5OiAneycsIGtleWNvZGU6IDIxOSwgZGVjOiA0NyB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ10nLCBzaGlmdF9rZXk6ICd9Jywga2V5Y29kZTogMjIxLCBkZWM6IDQ4IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnXFxcXCcsIHNoaWZ0X2tleTogJ3wnLCBrZXljb2RlOiAyMjAsIGNzczogJ3cxXzUnLCBkZWM6IDQ5IH1cblxuICAgIHsgcm93OiAncjInLCBrZXk6ICdDQVBTJywgY3NzOiAndzFfNzUnLCBrZXljb2RlOiAyMCwgc3BlY2lhbDogdHJ1ZSwgZGVjOiA1NyB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2EnLCBzaGlmdF9rZXk6ICdBJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDY1LCBkZWM6IDQgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdzJywgc2hpZnRfa2V5OiAnUycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4MywgZGVjOiAyMiB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2QnLCBzaGlmdF9rZXk6ICdEJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDY4LCBkZWM6IDcgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdmJywgc2hpZnRfa2V5OiAnRicsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3MCwgZGVjOiA5IH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnZycsIHNoaWZ0X2tleTogJ0cnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzEsIGRlYzogMTAgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdoJywgc2hpZnRfa2V5OiAnSCcsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3MiwgZGVjOiAxMSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2onLCBzaGlmdF9rZXk6ICdKJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDc0LCBkZWM6IDEzIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnaycsIHNoaWZ0X2tleTogJ0snLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzUsIGRlYzogMTQgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdsJywgc2hpZnRfa2V5OiAnTCcsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3NiwgZGVjOiAxNSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJzsnLCBzaGlmdF9rZXk6ICc6Jywga2V5Y29kZTogMTg2LCBkZWM6IDUxIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiBcIidcIiwgc2hpZnRfa2V5OiAnXCInLCBrZXljb2RlOiAyMjIsIGRlYzogNTIgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdSRVRVUk4nLCBjc3M6ICd3Ml8yNScsIGtleWNvZGU6IDEzLCBzcGVjaWFsOiB0cnVlLCBkZWM6IDg4IH0gIyBFTlRFUiA9PSB7IGRlYzogNDAgfVxuXG4gICAgeyByb3c6ICdyMScsIGtleTogJ1NISUZUJywgY3NzOiAndzJfMjUnLCBrZXljb2RlOiAxNiwgc3BlY2lhbDogdHJ1ZSwgZGVjOiAyMjUgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICd6Jywgc2hpZnRfa2V5OiAnWicsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA5MCwgZGVjOiAyOSB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ3gnLCBzaGlmdF9rZXk6ICdYJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg4LCBkZWM6IDI3IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnYycsIHNoaWZ0X2tleTogJ0MnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNjcsIGRlYzogNiB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ3YnLCBzaGlmdF9rZXk6ICdWJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg2LCBkZWM6IDI1IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnYicsIHNoaWZ0X2tleTogJ0InLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNjYsIGRlYzogNSB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ24nLCBzaGlmdF9rZXk6ICdOJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDc4LCBkZWM6IDE3IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnbScsIHNoaWZ0X2tleTogJ00nLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzcsIGRlYzogMTYgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICcsJywgc2hpZnRfa2V5OiAnPCcsIGtleWNvZGU6IDE4OCwgZGVjOiA1NCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJy4nLCBzaGlmdF9rZXk6ICc+Jywga2V5Y29kZTogMTkwLCBkZWM6IDU1IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnLycsIHNoaWZ0X2tleTogJz8nLCBrZXljb2RlOiAxOTEsIGRlYzogNTYgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICdTSElGVCcsIGNzczogJ3cyXzc1Jywga2V5Y29kZTogMTYsIHNwZWNpYWw6IHRydWUsIGRlYzogMjI1IH1cblxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdDVFJMJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxNywgc3BlY2lhbDogdHJ1ZSwgZGVjOiAyMjQgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdNRVRBJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiA5MSwgc3BlY2lhbDogdHJ1ZSwgZGVjOiAyMjcgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdBTFQnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE4LCBzcGVjaWFsOiB0cnVlLCBkZWM6IDIyNiB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ1NQQUNFJywgY3NzOiAnc3BhY2UnLCBrZXljb2RlOiAzMiwgc3BlY2lhbDogdHJ1ZSwgZGVjOiA0NCB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0NUUkwnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE3LCBzcGVjaWFsOiB0cnVlLCBkZWM6IDIyNCB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ00nLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE4LCBzcGVjaWFsOiB0cnVlLCBkZWM6IDIyNyB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ1AnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDkzLCBzcGVjaWFsOiB0cnVlLCBkZWM6IDcwIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnQUxUJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxOCwgc3BlY2lhbDogdHJ1ZSwgZGVjOiAyMjYgfVxuXG4gICAgIyBOVU1QQURcbiAgICB7IHJvdzogJ251bV9yNCcsIGtleTogJ25fQ0xFQVInLCBrZXljb2RlOiA2MDgzLCBkZWM6IDgzIH1cbiAgICB7IHJvdzogJ251bV9yNCcsIGtleTogJ25fLycsIGtleWNvZGU6IDYwODQsIGRlYzogODQgfVxuICAgIHsgcm93OiAnbnVtX3I0Jywga2V5OiAnbl8qJywga2V5Y29kZTogNjA4NSwgZGVjOiA4NSB9XG5cbiAgICB7IHJvdzogJ251bV9jb2wnLCBrZXk6ICduXy0nLCBrZXljb2RlOiA2MDg2LCBkZWM6IDg2IH1cbiAgICB7IHJvdzogJ251bV9jb2wnLCBrZXk6ICduXysnLCBrZXljb2RlOiA2MDg3LCBjc3M6ICdoMl8wJywgZGVjOiA4NyB9XG4gICAgeyByb3c6ICdudW1fY29sJywga2V5OiAnbl9FTlRFUicsIGtleWNvZGU6IDYwODgsIGNzczogJ2gyXzAnLCBkZWM6IDg4IH1cblxuICAgIHsgcm93OiAnbnVtX3IxJywga2V5OiAnbl8xJywga2V5Y29kZTogNjA4OSwgZGVjOiA4OSB9XG4gICAgeyByb3c6ICdudW1fcjEnLCBrZXk6ICduXzInLCBrZXljb2RlOiA2MDkwLCBkZWM6IDkwIH1cbiAgICB7IHJvdzogJ251bV9yMScsIGtleTogJ25fMycsIGtleWNvZGU6IDYwOTEsIGRlYzogOTEgfVxuXG4gICAgeyByb3c6ICdudW1fcjInLCBrZXk6ICduXzQnLCBrZXljb2RlOiA2MDkyLCBkZWM6IDkyIH1cbiAgICB7IHJvdzogJ251bV9yMicsIGtleTogJ25fNScsIGtleWNvZGU6IDYwOTMsIGRlYzogOTMgfVxuICAgIHsgcm93OiAnbnVtX3IyJywga2V5OiAnbl82Jywga2V5Y29kZTogNjA5NCwgZGVjOiA5NCB9XG5cbiAgICB7IHJvdzogJ251bV9yMycsIGtleTogJ25fNycsIGtleWNvZGU6IDYwOTUsIGRlYzogOTUgfVxuICAgIHsgcm93OiAnbnVtX3IzJywga2V5OiAnbl84Jywga2V5Y29kZTogNjA5NiwgZGVjOiA5NiB9XG4gICAgeyByb3c6ICdudW1fcjMnLCBrZXk6ICduXzknLCBrZXljb2RlOiA2MDk3LCBkZWM6IDk3IH1cblxuICAgIHsgcm93OiAnbnVtX3IwJywga2V5OiAnbl8wJywga2V5Y29kZTogNjA5OCwgZGVjOiA5OCB9XG4gICAgeyByb3c6ICdudW1fcjAnLCBrZXk6ICduXy4nLCBrZXljb2RlOiA2MDk5LCBkZWM6IDk5IH1cblxuICAgICMgRnVuY3Rpb24gS2V5cyAoRjEgLSBGMTIpXG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEnLCBrZXljb2RlOiAyMDAwLCBkZWM6IDU4IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMicsIGtleWNvZGU6IDIwMDEsIGRlYzogNTkgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YzJywga2V5Y29kZTogMjAwMiwgZGVjOiA2MCB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjQnLCBrZXljb2RlOiAyMDAzLCBkZWM6IDYxIH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGNScsIGtleWNvZGU6IDIwMDQsIGRlYzogNjIgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y2Jywga2V5Y29kZTogMjAwNSwgZGVjOiA2MyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjcnLCBrZXljb2RlOiAyMDA2LCBkZWM6IDY0IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGOCcsIGtleWNvZGU6IDIwMDcsIGRlYzogNjUgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y5Jywga2V5Y29kZTogMjAwOCwgZGVjOiA2NiB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEwJywga2V5Y29kZTogMjAwOSwgZGVjOiA2NyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjExJywga2V5Y29kZTogMjAxMCwgZGVjOiA2OCB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEyJywga2V5Y29kZTogMjAxMSwgZGVjOiA2OSB9XG5cbiAgICAjIEZ1bmN0aW9uIEtleXMgKEYxMy1GMjQpXG4gICAgIyB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiAyMTA0LCBkZWM6IDEwNCB9XG4gICAgIyB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTQnLCBrZXljb2RlOiAyMTA1LCBkZWM6IDEwNSB9XG4gICAgIyB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTUnLCBrZXljb2RlOiAyMTA2LCBkZWM6IDEwNiB9XG4gICAgIyB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTYnLCBrZXljb2RlOiAyMTA3LCBkZWM6IDEwNyB9XG4gICAgIyB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTcnLCBrZXljb2RlOiAyMTA4LCBkZWM6IDEwOCB9XG4gICAgIyB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTgnLCBrZXljb2RlOiAyMTA5LCBkZWM6IDEwOSB9XG4gICAgIyB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTknLCBrZXljb2RlOiAyMTEwLCBkZWM6IDExMCB9XG4gICAgIyB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMjAnLCBrZXljb2RlOiAyMTExLCBkZWM6IDExMSB9XG4gICAgIyB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMjEnLCBrZXljb2RlOiAyMTEyLCBkZWM6IDExMiB9XG4gICAgIyB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMjInLCBrZXljb2RlOiAyMTEzLCBkZWM6IDExMyB9XG4gICAgIyB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMjMnLCBrZXljb2RlOiAyMTE0LCBkZWM6IDExNCB9XG4gICAgIyB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMjQnLCBrZXljb2RlOiAyMTE1LCBkZWM6IDExNSB9XG5cbiAgICAjIE1lZGlhIEtleXNcbiAgICAjIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXN0ZXAtYmFja3dhcmQnIH1cbiAgICAjIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXBsYXknIH1cbiAgICAjIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXN0ZXAtZm9yd2FyZCcgfVxuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdNVVRFJywga2V5Y29kZTogNTEyNywgaWNvbjogJ2ZhLXZvbHVtZS1vZmYnLCBkZWM6IDEyNyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ1ZPTFVNRV9VUCcsIGtleWNvZGU6IDUxMjksIGljb246ICdmYS12b2x1bWUtdXAnLCBkZWM6IDEyOCB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ1ZPTFVNRV9ETicsIGtleWNvZGU6IDUxMjgsIGljb246ICdmYS12b2x1bWUtZG93bicsIGRlYzogMTI5IH1cblxuICAgICMgTmF2aWdhdGlvbiBLZXlzXG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdQR1VQJywga2V5Y29kZTogNDA3NSwgZGVjOiA3NSB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdQR0ROJywga2V5Y29kZTogNDA3OCwgZGVjOiA3OCB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdFTkQnLCBrZXljb2RlOiA0MDc3LCBkZWM6IDc3IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0hPTUUnLCBrZXljb2RlOiA0MDc0LCBkZWM6IDc0IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0xFRlQtQVJST1cnLCBrZXljb2RlOiA0MDgwLCBpY29uOiAnZmEtY2hldnJvbi1sZWZ0JywgZGVjOiA4MCB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdVUC1BUlJPVycsIGtleWNvZGU6IDQwODIsIGljb246ICdmYS1jaGV2cm9uLXVwJywgZGVjOiA4MiB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdET1dOLUFSUk9XJywga2V5Y29kZTogNDA4MSwgaWNvbjogJ2ZhLWNoZXZyb24tZG93bicsIGRlYzogODEgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnUklHSFQtQVJST1cnLCBrZXljb2RlOiA0MDc5LCBpY29uOiAnZmEtY2hldnJvbi1yaWdodCcsIGRlYzogNzkgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnSU5TJywga2V5Y29kZTogNDA3MywgZGVjOiA3MyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdERUwnLCBrZXljb2RlOiA0MDc2LCBkZWM6IDc2IH1cblxuICAgICMgU1BFQ0lBTCAvIE1JU0NcbiAgICB7IHJvdzogJ3NwZWNpYWxfcjAnLCBrZXk6ICdERUxBWScsIGtleWNvZGU6IDEwMDgsIGRlbGF5OiB0cnVlLCBwb3NpdGlvbjogMyB9XG4gICAgIyB7IHJvdzogJ3NwZWNpYWxfcjAnLCBrZXk6ICdDVVQnLCBrZXljb2RlOiAxMDAwIH1cbiAgICAjIHsgcm93OiAnc3BlY2lhbF9yMCcsIGtleTogJ0NPUFknLCBrZXljb2RlOiAxMDAxIH1cbiAgICAjIHsgcm93OiAnc3BlY2lhbF9yMCcsIGtleTogJ1BBU1RFJywga2V5Y29kZTogMTAwMiB9XG4gICAgIyB7IHJvdzogJ3NwZWNpYWxfcjAnLCBrZXk6ICdERUxBWScsIGtleWNvZGU6IDEwMDQgfVxuICAgICMgeyByb3c6ICdzcGVjaWFsX3IwJywga2V5OiAnTUVOVScsIGtleWNvZGU6IDEwMDUgfVxuICAgICMgeyByb3c6ICdzcGVjaWFsX3IwJywga2V5OiAnS0VZUEFEX0hFWCcsIGtleWNvZGU6IDEwMDYgfVxuXG5dXG5cbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHIwKSB7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbigpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8dWwgY2xhc3M9XFxcImxpc3QtdW5zdHlsZWQgbWItMCBrZXlib2FyZC0tcm93IHctMTAwXFxcIj5cIik7XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L3VsPlwiKTtcbn07XG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXljb2RlXCIsIG9wdHMua2V5Y29kZSwgdHJ1ZSwgZmFsc2UpKSArIFwiIGRhdGEtY2xpY2s9XFxcImtleVxcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleVwiLCBvcHRzLmtleSwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmNscyhbJ2J0bicsJ2J0bi1vdXRsaW5lLWxpZ2h0Jywna2V5Ym9hcmQtLWtleScsb3B0cy5jc3NdLCBbbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggb3B0cy5pY29uKVxue1xuYnVmLnB1c2goXCI8aVwiICsgKGphZGUuY2xzKFsnZmEnLCdmYS1mdycsb3B0cy5pY29uXSwgW251bGwsbnVsbCx0cnVlXSkpICsgXCI+PC9pPlwiKTtcbn1cbmVsc2VcbntcbmlmICggb3B0cy5rZXkgJiYgb3B0cy5zaGlmdF9rZXkgJiYgIW9wdHMuYWxwaGEpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInNoaWZ0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuZWxzZSBpZiAoIG9wdHMuYWxwaGEpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG59XG5idWYucHVzaChcIjwvbGk+XCIpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwia2V5Ym9hcmQtLWJvZHlcXFwiPlwiKTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjBcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjA7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpO30uY2FsbCh0aGlzLFwicjBcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIwOnR5cGVvZiByMCE9PVwidW5kZWZpbmVkXCI/cjA6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAocjAsIHIxLCByMiwgcjMsIHI0KSB7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbigpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8dWwgY2xhc3M9XFxcImxpc3QtdW5zdHlsZWQgbWItMCBrZXlib2FyZC0tcm93IHctMTAwXFxcIj5cIik7XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L3VsPlwiKTtcbn07XG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXljb2RlXCIsIG9wdHMua2V5Y29kZSwgdHJ1ZSwgZmFsc2UpKSArIFwiIGRhdGEtY2xpY2s9XFxcImtleVxcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleVwiLCBvcHRzLmtleSwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmNscyhbJ2J0bicsJ2J0bi1vdXRsaW5lLWxpZ2h0Jywna2V5Ym9hcmQtLWtleScsb3B0cy5jc3NdLCBbbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggb3B0cy5pY29uKVxue1xuYnVmLnB1c2goXCI8aVwiICsgKGphZGUuY2xzKFsnZmEnLCdmYS1mdycsb3B0cy5pY29uXSwgW251bGwsbnVsbCx0cnVlXSkpICsgXCI+PC9pPlwiKTtcbn1cbmVsc2VcbntcbmlmICggb3B0cy5rZXkgJiYgb3B0cy5zaGlmdF9rZXkgJiYgIW9wdHMuYWxwaGEpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInNoaWZ0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuZWxzZSBpZiAoIG9wdHMuYWxwaGEpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG59XG5idWYucHVzaChcIjwvbGk+XCIpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwia2V5Ym9hcmQtLWJvZHlcXFwiPlwiKTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjRcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjQ7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjJcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjI7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjFcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjE7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjBcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjA7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpO30uY2FsbCh0aGlzLFwicjBcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIwOnR5cGVvZiByMCE9PVwidW5kZWZpbmVkXCI/cjA6dW5kZWZpbmVkLFwicjFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIxOnR5cGVvZiByMSE9PVwidW5kZWZpbmVkXCI/cjE6dW5kZWZpbmVkLFwicjJcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIyOnR5cGVvZiByMiE9PVwidW5kZWZpbmVkXCI/cjI6dW5kZWZpbmVkLFwicjNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIzOnR5cGVvZiByMyE9PVwidW5kZWZpbmVkXCI/cjM6dW5kZWZpbmVkLFwicjRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnI0OnR5cGVvZiByNCE9PVwidW5kZWZpbmVkXCI/cjQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoY29sLCByMCwgcjEsIHIyLCByMywgcjQsIHVuZGVmaW5lZCkge1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24oKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPHVsIGNsYXNzPVxcXCJsaXN0LXVuc3R5bGVkIG1iLTAga2V5Ym9hcmQtLXJvdyB3LTEwMFxcXCI+XCIpO1xuYmxvY2sgJiYgYmxvY2soKTtcbmJ1Zi5wdXNoKFwiPC91bD5cIik7XG59O1xuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxsaVwiICsgKGphZGUuYXR0cihcImRhdGEta2V5Y29kZVwiLCBvcHRzLmtleWNvZGUsIHRydWUsIGZhbHNlKSkgKyBcIiBkYXRhLWNsaWNrPVxcXCJrZXlcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXlcIiwgb3B0cy5rZXksIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydidG4nLCdidG4tb3V0bGluZS1saWdodCcsJ2tleWJvYXJkLS1rZXknLG9wdHMuY3NzXSwgW251bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIG9wdHMuaWNvbilcbntcbmJ1Zi5wdXNoKFwiPGlcIiArIChqYWRlLmNscyhbJ2ZhJywnZmEtZncnLG9wdHMuaWNvbl0sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT5cIik7XG59XG5lbHNlXG57XG5pZiAoIG9wdHMua2V5ICYmIG9wdHMuc2hpZnRfa2V5ICYmICFvcHRzLmFscGhhKVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJzaGlmdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLnNoaWZ0X2tleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+PGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmVsc2UgaWYgKCBvcHRzLmFscGhhKVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLnNoaWZ0X2tleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxufVxuYnVmLnB1c2goXCI8L2xpPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImtleWJvYXJkLS1ib2R5XFxcIj48ZGl2IGNsYXNzPVxcXCJkLWZsZXggZmxleC1yb3dcXFwiPjxkaXYgY2xhc3M9XFxcImQtZmxleCBmbGV4LWNvbHVtblxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByNFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByNDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByM1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMlxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMjtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuYnVmLnB1c2goXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJkLWZsZXggZmxleC1jb2x1bW5cXFwiPlwiKTtcbi8vIGl0ZXJhdGUgY29sXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGNvbDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiY29sXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jb2w6dHlwZW9mIGNvbCE9PVwidW5kZWZpbmVkXCI/Y29sOnVuZGVmaW5lZCxcInIwXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMDp0eXBlb2YgcjAhPT1cInVuZGVmaW5lZFwiP3IwOnVuZGVmaW5lZCxcInIxXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMTp0eXBlb2YgcjEhPT1cInVuZGVmaW5lZFwiP3IxOnVuZGVmaW5lZCxcInIyXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMjp0eXBlb2YgcjIhPT1cInVuZGVmaW5lZFwiP3IyOnVuZGVmaW5lZCxcInIzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMzp0eXBlb2YgcjMhPT1cInVuZGVmaW5lZFwiP3IzOnVuZGVmaW5lZCxcInI0XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yNDp0eXBlb2YgcjQhPT1cInVuZGVmaW5lZFwiP3I0OnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChuYXZJdGVtcywgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy04IGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj5cIik7XG4vLyBpdGVyYXRlIG5hdkl0ZW1zXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IG5hdkl0ZW1zO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBzdHlsZT1cXFwiZmxleC1ncm93OjE7XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEtdHJpZ2dlclwiLCBuYXZJdGVtLnRyaWdnZXIsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwiZC1mbGV4IGJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkgYnRuLXNtIGp1c3RpZnktY29udGVudC1jZW50ZXIgbXgtM1xcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBuYXZJdGVtLnRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYnV0dG9uPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIG5hdkl0ZW0udHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBidG4tc20ganVzdGlmeS1jb250ZW50LWNlbnRlciBteC0zXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48aHIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiY29udGVudFxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibmF2SXRlbXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm5hdkl0ZW1zOnR5cGVvZiBuYXZJdGVtcyE9PVwidW5kZWZpbmVkXCI/bmF2SXRlbXM6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIk1hY3JvRXhhbXBsZXMgPSByZXF1aXJlKCcuL2V4YW1wbGVzJylcblxuIyAjICMgIyAjXG5cbiMgTWFjcm9Nb2RlbCBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBNYWNyb01vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6XG4gICAgb3JkZXI6IDBcbiAgICBwb3NpdGlvbjogMyAjIFRPRE8gLSByZW5hbWUgJ3Bvc2l0aW9uJyB0byAnYWN0aW9uX3R5cGUnXG4gICAgc2hpZnRlZDogZmFsc2VcblxuICBnZXRLZXlEYXRhOiAtPlxuXG4gICAgZGF0YSA9IFtdXG5cbiAgICBhdHRycyA9IF8uY2xvbmUoQGF0dHJpYnV0ZXMpXG5cbiAgICAjIGNvbnNvbGUubG9nIGF0dHJzXG5cbiAgICAjIEFjdGlvblR5cGVcbiAgICAjIEtFWV9ETiA9IDEsIEtFWSBWQUxVRVxuICAgICMgS0VZX1VQID0gMiwgS0VZIFZBTFVFXG4gICAgIyBLRVlfUFIgPSAzLCBLRVkgVkFMVUVcblxuICAgICMgS0VZX0RFTEFZXG4gICAgaWYgYXR0cnMuZGVsYXlcbiAgICAgIGRhdGEucHVzaCgxNikgIyBERUxBWSBpbmRpY2F0b3JcbiAgICAgIGRhdGEucHVzaCgxKSAjIDEgLSAyNTUgKGkuZS4gNSA9IDUgeCAxMDBtcyA9IDUwMG1zKVxuICAgICAgcmV0dXJuIGRhdGFcblxuICAgICMgS0VZX0ROXG4gICAgaWYgYXR0cnMucG9zaXRpb24gPT0gMSAjIFRPRE8gLSBjb25zdGFudGl6ZVxuICAgICAgZGF0YS5wdXNoKDEpXG4gICAgICBkYXRhLnB1c2goYXR0cnMuZGVjIHx8IDQpXG4gICAgICByZXR1cm4gZGF0YVxuXG4gICAgIyBLRVlfVVBcbiAgICBpZiBhdHRycy5wb3NpdGlvbiA9PSAyICMgVE9ETyAtIGNvbnN0YW50aXplXG4gICAgICBkYXRhLnB1c2goMilcbiAgICAgIGRhdGEucHVzaChhdHRycy5kZWMgfHwgNClcbiAgICAgIHJldHVybiBkYXRhXG5cbiAgICAjIEtFWV9QUlxuICAgIGlmIGF0dHJzLnBvc2l0aW9uID09IDMgIyBUT0RPIC0gY29uc3RhbnRpemVcbiAgICAgIGRhdGEucHVzaCgzKVxuICAgICAgZGF0YS5wdXNoKGF0dHJzLmRlYyB8fCA0KVxuICAgICAgcmV0dXJuIGRhdGFcblxuICAgIHJldHVybiBkYXRhXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBNYWNyb0NvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBNYWNyb01vZGVsXG4gIGNvbXBhcmF0b3I6ICdvcmRlcidcblxuICAjIGxvYWRFeGFtcGxlXG4gICMgUmVzZXRzIHRoZSBjb2xsZWN0aW9uIHRvIG9uZSBvZiB0aGUgZXhhbXBsZXNcbiAgbG9hZEV4YW1wbGU6IChleGFtcGxlX2lkKSAtPlxuXG4gICAgIyBSZXNldHMgdGhlIGNvbGxlY3Rpb24gd2l0aCB0aGUgZGF0YSBkZWZpbmVkIGluIHRoZSBFeGFtcGxlcyBvYmplY3RcbiAgICBAcmVzZXQoTWFjcm9FeGFtcGxlc1tleGFtcGxlX2lkXSlcblxuICAjIGJ1aWxkXG4gICMgQ29tcGlsZXMgdGhlIGNvbXBsZXRlIG1hY3JvIGZyb20gZWFjaCBtYWNybyBtb2RlbFxuICBidWlsZDogLT5cbiAgICBkYXRhID0gW11cbiAgICBfLmVhY2goQG1vZGVscywgKG1hY3JvKSA9PlxuICAgICAgIyBjb25zb2xlLmxvZyAnRUFDSCBNQUNSTydcbiAgICAgICMgY29uc29sZS5sb2cgbWFjcm8uZ2V0S2V5RGF0YSgpXG4gICAgICBkYXRhID0gZGF0YS5jb25jYXQobWFjcm8uZ2V0S2V5RGF0YSgpKVxuICAgIClcblxuICAgIHJldHVybiBkYXRhXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1vZGVsOiAgICAgIE1hY3JvTW9kZWxcbiAgQ29sbGVjdGlvbjogTWFjcm9Db2xsZWN0aW9uXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiSFwiLFxuICAgIFwia2V5Y29kZVwiOiA3MixcbiAgICBcIm9yZGVyXCI6IDIsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDNcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDQsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkxcIixcbiAgICBcImtleWNvZGVcIjogNzYsXG4gICAgXCJvcmRlclwiOiA1LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJMXCIsXG4gICAgXCJrZXljb2RlXCI6IDc2LFxuICAgIFwib3JkZXJcIjogNixcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiT1wiLFxuICAgIFwia2V5Y29kZVwiOiA3OSxcbiAgICBcIm9yZGVyXCI6IDcsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiA4XG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIjFcIixcbiAgICBcInNoaWZ0XCI6IFwiIVwiLFxuICAgIFwia2V5Y29kZVwiOiA0OSxcbiAgICBcIm9yZGVyXCI6IDksXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDEwXG4gIH1cbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJrZXlcIjogXCJSXCIsXG4gICAgXCJrZXljb2RlXCI6IDgyLFxuICAgIFwib3JkZXJcIjogMSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDIsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNcIixcbiAgICBcImtleWNvZGVcIjogODMsXG4gICAgXCJvcmRlclwiOiAzLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJVXCIsXG4gICAgXCJrZXljb2RlXCI6IDg1LFxuICAgIFwib3JkZXJcIjogNCxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiTVwiLFxuICAgIFwia2V5Y29kZVwiOiA3NyxcbiAgICBcIm9yZGVyXCI6IDUsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkFMVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxOCxcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogNlxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJgXCIsXG4gICAgXCJzaGlmdFwiOiBcIn5cIixcbiAgICBcImtleWNvZGVcIjogMTkyLFxuICAgIFwib3JkZXJcIjogNyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDhcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDksXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH1cbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDJcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiLVwiLFxuICAgIFwic2hpZnRcIjogXCJfXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4OSxcbiAgICBcIm9yZGVyXCI6IDMsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDRcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDVcbiAgfVxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBcImtleVwiOiBcIkNUUkxcIixcbiAgICBcImtleWNvZGVcIjogMTcsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiAyXG4gIH0sXG4gIHtcbiAgICBcInJvd1wiOiBcIm5hdl9yMFwiLFxuICAgIFwia2V5XCI6IFwiREVMXCIsXG4gICAgXCJrZXljb2RlXCI6IDQ2LFxuICAgIFwib3JkZXJcIjogMyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDRcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQ1RSTFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNyxcbiAgICBcInBvc2l0aW9uXCI6IDEsXG4gICAgXCJvcmRlclwiOiA1XG4gIH1cbl1cbiIsIlxuIyBFeHBvcnRzIGFuIG9iamVjdCBkZWZpbmluZyB0aGUgZXhhbXBsZSBtYWNyb3Ncbm1vZHVsZS5leHBvcnRzID0ge1xuICBleF8wMTogcmVxdWlyZSgnLi9leGFtcGxlXzEnKVxuICBleF8wMjogcmVxdWlyZSgnLi9leGFtcGxlXzInKVxuICBleF8wMzogcmVxdWlyZSgnLi9leGFtcGxlXzMnKVxuICBleF8wNDogcmVxdWlyZSgnLi9leGFtcGxlXzQnKVxufVxuIiwiTGF5b3V0VmlldyAgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyAjICMgIyAjXG5cbmNsYXNzIERhc2hib2FyZFJvdXRlIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGUnXG5cbiAgdGl0bGU6ICdBc3Ryb0tleSdcblxuICBicmVhZGNydW1iczogW3sgdGV4dDogJ0RldmljZScgfV1cblxuICBmZXRjaDogLT5cbiAgICBAZGV2aWNlID0gUmFkaW8uY2hhbm5lbCgnZGV2aWNlJykucmVxdWVzdCgnbW9kZWwnLCAnZGV2aWNlXzEnKVxuXG4gIHJlbmRlcjogLT5cbiAgICBAY29udGFpbmVyLnNob3cgbmV3IExheW91dFZpZXcoeyBtb2RlbDogQGRldmljZSB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBEYXNoYm9hcmRSb3V0ZVxuIiwiS2V5U2VsZWN0b3IgPSByZXF1aXJlKCcuL2tleVNlbGVjdG9yJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIERldmljZVN0YXR1c1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2RldmljZV9zdGF0dXMnXG4gIGNsYXNzTmFtZTogJ3JvdydcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG5cbiAgICBzdGF0dXMgPSB7XG4gICAgICB0ZXh0OiAnTm90IENvbm5lY3RlZCdcbiAgICAgIGNzczogICdiYWRnZS1kZWZhdWx0J1xuICAgIH1cblxuICAgICMgQ29ubmVjdGVkXG4gICAgaWYgQG1vZGVsLmdldCgnc3RhdHVzX2NvZGUnKSA9PSAxXG5cbiAgICAgIHN0YXR1cyA9IHtcbiAgICAgICAgdGV4dDogJ0Nvbm5lY3RlZCdcbiAgICAgICAgY3NzOiAnYmFkZ2Utc3VjY2VzcydcbiAgICAgIH1cblxuICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzIH1cblxuIyAjICMgIyAjXG5cbmNsYXNzIERldmljZUxheW91dCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93J1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZGV2aWNlX2xheW91dCcpXG5cbiAgcmVnaW9uczpcbiAgICAjIHN0YXR1c1JlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1zdGF0dXNdJ1xuICAgIGtleXNSZWdpb246ICAgJ1tkYXRhLXJlZ2lvbj1rZXlzXSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIFtkYXRhLWNsaWNrPWNvbm5lY3RdJzogJ2Nvbm5lY3RUb0RldmljZSdcblxuICBjb25uZWN0VG9EZXZpY2U6IC0+XG4gICAgUmFkaW8uY2hhbm5lbCgndXNiJykucmVxdWVzdCgnZGV2aWNlcycpLnRoZW4gKGQpID0+IEByZW5kZXIoKVxuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBpZiB3aW5kb3cuZFxuICAgICAgcmV0dXJuIHsgY29ubmVjdGVkOiB0cnVlIH1cbiAgICBlbHNlXG4gICAgICByZXR1cm4geyBjb25uZWN0ZWQ6IGZhbHNlIH1cblxuICBvblJlbmRlcjogLT5cblxuICAgICMgSW5zdGFudGlhdGVzIG5ldyBLZXlTZWxlY3RvciBWaWV3XG4gICAga2V5U2VsZWN0b3IgPSBuZXcgS2V5U2VsZWN0b3IoeyBjb2xsZWN0aW9uOiBAbW9kZWwuZ2V0KCdrZXlzJykgfSlcbiAgICBrZXlTZWxlY3Rvci5vbiAnY2hpbGR2aWV3OnNlbGVjdGVkJywgKHZpZXcpID0+IEB0cmlnZ2VyKCdrZXk6c2VsZWN0ZWQnLCB2aWV3Lm1vZGVsKVxuICAgIGtleVNlbGVjdG9yLm9uICdjaGlsZHZpZXc6ZGVzZWxlY3RlZCcsICh2aWV3KSA9PiBAdHJpZ2dlcigna2V5OmRlc2VsZWN0ZWQnKVxuICAgIEBrZXlzUmVnaW9uLnNob3coa2V5U2VsZWN0b3IpXG5cbiAgICAjIFN0YXR1cyBWaWV3XG4gICAgIyBUT0RPIC0gc3RhdHVzICYgY29ubmVjdGlvbiB2aWV3XG4gICAgIyBAc3RhdHVzUmVnaW9uLnNob3cgbmV3IERldmljZVN0YXR1c1ZpZXcoeyBtb2RlbDogQG1vZGVsIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IERldmljZUxheW91dFxuXG5cbiIsIlNpbXBsZU5hdiA9IHJlcXVpcmUgJ2xpYi92aWV3cy9zaW1wbGVfbmF2J1xuXG4jICMgIyAjICNcblxuY2xhc3MgRWRpdG9yU2VsZWN0b3IgZXh0ZW5kcyBTaW1wbGVOYXZcbiAgY2xhc3NOYW1lOiAncm93IGgtMTAwJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZWRpdG9yX3NlbGVjdG9yJylcblxuICBiZWhhdmlvcnM6XG4gICAgVG9vbHRpcHM6IHt9XG5cbiAgbmF2SXRlbXM6IFtcbiAgICB7IGljb246ICdmYS1rZXlib2FyZC1vJywgIHRleHQ6ICdNYWNybycsICB0cmlnZ2VyOiAnbWFjcm8nIH1cbiAgICB7IGljb246ICdmYS1maWxlLXRleHQtbycsIHRleHQ6ICdTbmlwcGV0JywgICB0cmlnZ2VyOiAndGV4dCcgfVxuICAgICMgeyBpY29uOiAnZmEtYXN0ZXJpc2snLCAgICB0ZXh0OiAnS2V5JywgICAgdHJpZ2dlcjogJ2tleScsIGRpc2FibGVkOiB0cnVlLCBjc3M6ICdkaXNhYmxlZCcsIHRpdGxlOiAnQ29taW5nIFNvb24nIH1cbiAgXVxuXG4gIG9uUmVuZGVyOiAtPlxuICAgIGNvbmZpZ01vZGVsID0gQG1vZGVsLmdldCgnY29uZmlnJylcbiAgICB0cmlnZ2VyID0gY29uZmlnTW9kZWwuZ2V0KCd0eXBlJylcbiAgICByZXR1cm4gQCQoXCJbZGF0YS10cmlnZ2VyPSN7dHJpZ2dlcn1dXCIpLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gIG9uTmF2aWdhdGVNYWNybzogLT5cbiAgICBAdHJpZ2dlciAnc2hvdzptYWNybzplZGl0b3InXG5cbiAgb25OYXZpZ2F0ZVRleHQ6IC0+XG4gICAgQHRyaWdnZXIgJ3Nob3c6dGV4dDplZGl0b3InXG5cbiAgb25OYXZpZ2F0ZUtleTogLT5cbiAgICBAdHJpZ2dlciAnc2hvdzprZXk6ZWRpdG9yJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JTZWxlY3RvclxuIiwiVGV4dEVkaXRvciA9IHJlcXVpcmUoJy4vdGV4dEVkaXRvcicpXG5NYWNyb0VkaXRvciA9IHJlcXVpcmUoJy4vbWFjcm9FZGl0b3InKVxuXG4jICMgIyAjICNcblxuY2xhc3MgRWRpdG9yV3JhcHBlciBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvZWRpdG9yX3dyYXBwZXInXG4gIGNsYXNzTmFtZTogJ3JvdydcblxuICByZWdpb25zOlxuICAgIGNvbnRlbnRSZWdpb246ICdbZGF0YS1yZWdpb249Y29udGVudF0nXG5cbiAgdWk6XG4gICAgcmVjb3JkQnRuOiAnW2RhdGEtY2xpY2s9cmVjb3JkXSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIFtkYXRhLWNsaWNrPXNhdmVdJzogICAgJ29uU2F2ZSdcbiAgICAnY2xpY2sgW2RhdGEtY2xpY2s9Y2xlYXJdJzogICAnb25DbGVhcidcbiAgICAnY2xpY2sgW2RhdGEtY2xpY2s9Y2FuY2VsXSc6ICAnb25DYW5jZWwnXG4gICAgJ2NsaWNrIFtkYXRhLWV4YW1wbGVdJzogICAgICAgJ2xvYWRFeGFtcGxlJ1xuICAgICdjbGljayBAdWkucmVjb3JkQnRuJzogICAgICAgICd0b2dnbGVSZWNvcmQnXG5cbiAgZWRpdG9yczpcbiAgICBtYWNybzogIE1hY3JvRWRpdG9yXG4gICAgdGV4dDogICBUZXh0RWRpdG9yXG4gICAga2V5OiAgICBNYWNyb0VkaXRvclxuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cblxuICAgICMgU2hvcnQtY2lyY3VpdFxuICAgIHJldHVybiB7IG1hY3JvX2VkaXRvcjogdHJ1ZSB9IGlmIEBvcHRpb25zLmVkaXRvciA9PSAnbWFjcm8nXG4gICAgcmV0dXJuIHsgbWFjcm9fZWRpdG9yOiBmYWxzZSB9XG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEZldGNoZXMgdGhlIEVkaXRvclZpZXcgcHJvdG90eXBlXG4gICAgRWRpdG9yVmlldyA9IEBlZGl0b3JzW0BvcHRpb25zLmVkaXRvcl1cblxuICAgICMgSXNvbGF0ZXMgQ29uZmlnXG4gICAgY29uZmlnID0gQG1vZGVsLmdldCgnY29uZmlnJylcblxuICAgICMgQ2FjaGVzIHRoZSBjdXJyZW50IGNvbmZpZ3VyYXRpb24gdG8gYmUgcmVzdG9yZWQgd2hlbiB0aGlzIHZpZXcgaXMgY2FuY2VsbGVkIG91dFxuICAgIEBjYWNoZWRDb25maWcgPSBjb25maWcudG9KU09OKClcblxuICAgICMgSXNvbGF0ZXMgTWFjcm9Db2xsZWN0aW9uXG4gICAgQG1hY3JvcyA9IGNvbmZpZy5nZXQoJ21hY3JvcycpXG5cbiAgICAjIFJlcXVlc3RzIEtleUNvbGxlY3Rpb24gZnJvbSB0aGUgS2V5RmFjdG9yeVxuICAgIGtleXMgPSBSYWRpby5jaGFubmVsKCdrZXknKS5yZXF1ZXN0KCdjb2xsZWN0aW9uJylcblxuICAgICMgSW5zdGFudGlhdGVzIG5ldyBFZGl0b3JWaWV3IGluc3RhbmNlXG4gICAgQGVkaXRvclZpZXcgPSBuZXcgRWRpdG9yVmlldyh7IG1vZGVsOiBjb25maWcsIGtleXM6IGtleXMsIG1hY3JvczogQG1hY3JvcyB9KVxuXG4gICAgIyBMaXN0ZW5zIGZvciAnc3RvcDpyZWNvcmRpbmcnIGV2ZW50XG4gICAgQGVkaXRvclZpZXcub24gJ3N0b3A6cmVjb3JkaW5nJywgPT4gQHRvZ2dsZVJlY29yZCgpXG5cbiAgICAjIFNob3dzIHRoZSB2aWV3IGluIEBjb250ZW50UmVnaW9uXG4gICAgQGNvbnRlbnRSZWdpb24uc2hvdyBAZWRpdG9yVmlld1xuXG4gICMgb25DbGVhclxuICAjIEVtcHRpZXMgdGhlIE1hY3JvQ29sbGVjdGlvblxuICAjIFRPRE8gLSB1bmRvIGJ1dHRvbj9cbiAgb25DbGVhcjogLT5cblxuICAgICMgU3RvcHMgUmVjb3JkaW5nXG4gICAgQHN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyBFbXB0aWVzIHRoZSBNYWNyb0NvbGxlY3Rpb25cbiAgICBAbWFjcm9zLnJlc2V0KClcbiAgICByZXR1cm5cblxuICAjIG9uU2F2ZVxuICBvblNhdmU6IC0+XG5cbiAgICAjIFN0b3BzIFJlY29yZGluZ1xuICAgIEBzdG9wUmVjb3JkaW5nKClcblxuICAgICMgU2VyaWFsaXplcyBkYXRhIGZyb20gYW55IGZvcm0gZWxlbWVudHMgaW4gdGhpcyB2aWV3XG4gICAgZGF0YSA9IEJhY2tib25lLlN5cGhvbi5zZXJpYWxpemUoQClcblxuICAgICMgSGFuZGxlcyBNYWNyb1xuICAgIGlmIGRhdGEudHlwZSA9PSAnbWFjcm8nXG5cbiAgICAgICMgQ2xlYXIgdW51c2VkIHR5cGUtc3BlY2lmaWMgYXR0cmlidXRlc1xuICAgICAgZGF0YS50ZXh0X3ZhbHVlID0gJydcblxuICAgICAgIyBBcHBsaWVzIHRoZSBhdHRyaWJ1dGVzIHRvIHRoZSBjb25maWcgbW9kZWxcbiAgICAgIEBtb2RlbC5nZXQoJ2NvbmZpZycpLnNldChkYXRhKVxuXG4gICAgICAjIFRyaWdnZXJzIGNoYW5nZSBldmVudCBvbiBAbW9kZWwgdG8gcmUtcmVuZGVyIHRoZSBjdXJyZW50bHkgaGlkZGVuIEtleVNlbGVjdG9yXG4gICAgICBAbW9kZWwudHJpZ2dlcignY29uZmlnOnVwZGF0ZWQnKVxuXG4gICAgICAjIEdldHMgdGhlIG1hY3JvSW5kZXhcbiAgICAgIG1hY3JvSW5kZXggPSBAbW9kZWwuZ2V0KCdvcmRlcicpXG5cbiAgICAgICMgR2V0cyBkYXRhIGZyb20gTWFjcm9Db2xsZWN0aW9uLmJ1aWxkKCkgbWV0aG9kXG4gICAgICBkYXRhID0gQG1hY3Jvcy5idWlsZCgpXG5cbiAgICAgICMgVE9ETyAtIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyAnV1JJVElORydcbiAgICAgIGNvbnNvbGUubG9nIGRhdGFcblxuICAgICAgIyBTaG9ydC1jaXJjdWl0c1xuICAgICAgcmV0dXJuIEB0cmlnZ2VyKCdzYXZlJykgdW5sZXNzIHdpbmRvdy5kXG5cbiAgICAgICMgSW52b2tlcyBDaHJvbWVXZWJVU0JTZXJ2aWNlIGRpcmVjdGx5XG4gICAgICAjIFRPRE8gLSBhYnN0cmFjdCB0aGlzIGludG8gdGhlIE1hY3JvIHNlcnZpY2VcbiAgICAgIFJhZGlvLmNoYW5uZWwoJ3VzYicpLnJlcXVlc3QoJ3dyaXRlOm1hY3JvJywgbWFjcm9JbmRleCwgZGF0YSlcbiAgICAgIC50aGVuKCAocmVzcG9uc2UpID0+XG4gICAgICAgIHJldHVybiBAdHJpZ2dlcignc2F2ZScpXG4gICAgICApXG5cbiAgICAjIEhhbmRsZXMgU25pcHBldFxuICAgIGVsc2UgaWYgZGF0YS50eXBlID09ICd0ZXh0J1xuXG4gICAgICAjIENsZWFyIHVudXNlZCB0eXBlLXNwZWNpZmljIGF0dHJpYnV0ZXNcbiAgICAgIGRhdGEubWFjcm9zID0gW11cblxuICAgICAgIyBBcHBsaWVzIHRoZSBhdHRyaWJ1dGVzIHRvIHRoZSBjb25maWcgbW9kZWxcbiAgICAgIEBtb2RlbC5nZXQoJ2NvbmZpZycpLnNldChkYXRhKVxuXG4gICAgICAjIFRyaWdnZXJzIGNoYW5nZSBldmVudCBvbiBAbW9kZWwgdG8gcmUtcmVuZGVyIHRoZSBjdXJyZW50bHkgaGlkZGVuIEtleVNlbGVjdG9yXG4gICAgICBAbW9kZWwudHJpZ2dlcignY29uZmlnOnVwZGF0ZWQnKVxuXG4gICAgICAjIEdldHMgdGhlIG1hY3JvSW5kZXhcbiAgICAgIG1hY3JvSW5kZXggPSBAbW9kZWwuZ2V0KCdvcmRlcicpXG5cbiAgICAgICMgR2V0cyBkYXRhIGZyb20gTWFjcm9Db2xsZWN0aW9uLmJ1aWxkKCkgbWV0aG9kXG4gICAgICAjIFRPRE8gLSBzaG91bGQgYmUgQHNuaXBwZXQuYnVpbGQoKVxuICAgICAgZGF0YSA9IEBtb2RlbC5idWlsZFNuaXBwZXQoZGF0YS50ZXh0X3ZhbHVlKVxuXG4gICAgICAjIFNldHMgdGhlIEBtYWNyb3MgY29sbGVjdGlvbiB3aXRoIHRoZSB1cGRhdGVkIGRhdGFcbiAgICAgICMgVXNlZCB0byBpbnZva2UgbWFjcm9zLmJ1aWxkXG4gICAgICBAbWFjcm9zLnJlc2V0KGRhdGEpXG4gICAgICBkYXRhID0gQG1hY3Jvcy5idWlsZCgpXG5cbiAgICAgICMgU2hvcnQtY2lyY3VpdHNcbiAgICAgIHJldHVybiBAdHJpZ2dlcignc2F2ZScpIHVubGVzcyB3aW5kb3cuZFxuXG4gICAgICAjIEludm9rZXMgQ2hyb21lV2ViVVNCU2VydmljZSBkaXJlY3RseVxuICAgICAgIyBUT0RPIC0gYWJzdHJhY3QgdGhpcyBpbnRvIHRoZSBNYWNybyBzZXJ2aWNlXG4gICAgICBSYWRpby5jaGFubmVsKCd1c2InKS5yZXF1ZXN0KCd3cml0ZTptYWNybycsIG1hY3JvSW5kZXgsIGRhdGEpXG4gICAgICAudGhlbiggKHJlc3BvbnNlKSA9PlxuICAgICAgICByZXR1cm4gQHRyaWdnZXIoJ3NhdmUnKVxuICAgICAgKVxuXG5cbiAgIyBvbkNhbmNlbFxuICBvbkNhbmNlbDogLT5cblxuICAgICMgU3RvcHMgUmVjb3JkaW5nXG4gICAgQHN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyBSZXNldHMgY29uZmlnIGF0dHJpYnV0ZXNcbiAgICBAbW9kZWwuZ2V0KCdjb25maWcnKS5zZXQoQGNhY2hlZENvbmZpZylcblxuICAgICMgVHJpZ2dlcnMgJ2NhbmNlbCcgZXZlbnQsIGNsb3NpbmcgdGhpcyB2aWV3XG4gICAgcmV0dXJuIEB0cmlnZ2VyICdjYW5jZWwnXG5cbiAgIyBsb2FkRXhhbXBsZVxuICAjIEVtcHRpZXMgb3V0IHRoZSBNYWNyb0NvbGxlY2lvbiBhbmQgbG9hZHMgYW4gZXhhbXBsZSBtYWNyb1xuICBsb2FkRXhhbXBsZTogKGUpIC0+XG5cbiAgICAjIFN0b3BzIFJlY29yZGluZ1xuICAgIEBzdG9wUmVjb3JkaW5nKClcblxuICAgICMgQ2FjaGVzIGNsaWNrZWQgZWxcbiAgICBlbCA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuXG4gICAgIyBHZXRzIHRoZSBJRCBvZiB0aGUgZXhhbXBsZSB0byBsb2FkXG4gICAgZXhhbXBsZV9pZCA9IGVsLmRhdGEoJ2V4YW1wbGUnKVxuXG4gICAgIyBJbnZva2VzIHRoZSBsb2FkRXhhbXBsZSBtZXRob2Qgb24gdGhlIE1hY3JvQ29sbGVjdGlvblxuICAgIHJldHVybiBAbWFjcm9zLmxvYWRFeGFtcGxlKGV4YW1wbGVfaWQpXG5cbiAgIyB0b2dnbGVSZWNvcmRcbiAgIyBUb2dnbGVzIHdldGhlciBvciBub3QgdGhlIHVzZXIncyBrZXlib2FyZCBpcyByZWNvcmRpbmcga2V5c3Ryb2tlc1xuICB0b2dnbGVSZWNvcmQ6IChlKSAtPlxuICAgIHJldHVybiBAc3RvcFJlY29yZGluZygpIGlmIEBpc1JlY29yZGluZ1xuICAgIEBzdGFydFJlY29yZGluZygpXG5cbiAgIyBzdG9wUmVjb3JkaW5nXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG5cbiAgICAjIFNldHMgQGlzUmVjb3JkaW5nIGZsYWdcbiAgICBAaXNSZWNvcmRpbmcgPSBmYWxzZVxuXG4gICAgIyBVcGRhdGVzIHRoZSBFZGl0b3JWaWV3IGluc3RhbmNlIHRvIGlnbm9yZSBrZXlib2FyZCBpbnB1dFxuICAgIEBlZGl0b3JWaWV3LmtleWJvYXJkU2VsZWN0b3I/LmN1cnJlbnQuc3RvcFJlY29yZGluZygpXG5cbiAgICAjIFVwZGF0ZXMgdGhlIEB1aS5yZWNvcmRCdG4gZWxlbWVudFxuICAgIEB1aS5yZWNvcmRCdG4ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoJ2knKS5yZW1vdmVDbGFzcygnZmEtc3BpbiBmYS1jaXJjbGUtby1ub3RjaCcpLmFkZENsYXNzKCdmYS1jaXJjbGUnKVxuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG5cbiAgICAjIEVtcHR5IG1hY3Jvc1xuICAgIEBtYWNyb3MucmVzZXQoKVxuXG4gICAgIyBTZXRzIEBpc1JlY29yZGluZyBmbGFnXG4gICAgQGlzUmVjb3JkaW5nID0gdHJ1ZVxuXG4gICAgIyBVcGRhdGVzIHRoZSBFZGl0b3JWaWV3IGluc3RhbmNlIHRvIGFsbG93IGtleWJvYXJkIGlucHV0XG4gICAgQGVkaXRvclZpZXcua2V5Ym9hcmRTZWxlY3Rvcj8uY3VycmVudC5zdGFydFJlY29yZGluZygpXG5cbiAgICAjIFVwZGF0ZXMgdGhlIEB1aS5yZWNvcmRCdG4gZWxlbWVudFxuICAgIEB1aS5yZWNvcmRCdG4uYWRkQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoJ2knKS5hZGRDbGFzcygnZmEtc3BpbiBmYS1jaXJjbGUtby1ub3RjaCcpLnJlbW92ZUNsYXNzKCdmYS1jaXJjbGUnKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JXcmFwcGVyXG5cblxuXG4iLCJcbmNsYXNzIEtleUNoaWxkIGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0YWdOYW1lOiAnbGknXG4gIGNsYXNzTmFtZTogJ2J0biBidG4tb3V0bGluZS1saWdodCBrZXktLWNoaWxkIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBteC0yJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMva2V5X2NoaWxkJylcblxuICBiZWhhdmlvcnM6XG4gICAgU2VsZWN0YWJsZUNoaWxkOiB7IGRlc2VsZWN0OiB0cnVlIH1cblxuICBtb2RlbEV2ZW50czpcbiAgICAnY29uZmlnOnVwZGF0ZWQnOiAnb25Nb2RlbENoYW5nZSdcblxuICBvbk1vZGVsQ2hhbmdlOiAtPlxuICAgIHJldHVybiBAcmVuZGVyKClcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG5cbiAgICAjIElzb2xhdGVzIEFzdHJvS2V5Q29uZmlnIG1vZGVsXG4gICAgY29uZmlnID0gQG1vZGVsLmdldCgnY29uZmlnJylcblxuICAgICMgTWFjcm9cbiAgICBpZiBjb25maWcuZ2V0KCd0eXBlJykgPT0gJ21hY3JvJ1xuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdNJyB9XG5cbiAgICAjIFRleHRcbiAgICBpZiBjb25maWcuZ2V0KCd0eXBlJykgPT0gJ3RleHQnXG4gICAgICByZXR1cm4geyBsYWJlbDogJ1QnIH1cblxuICAgICMgS2V5XG4gICAgIyBUT0RPIC0gRElTUExBWSBLRVkgSU4gVklFV1xuICAgIGlmIGNvbmZpZy5nZXQoJ3R5cGUnKSA9PSAna2V5J1xuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdLJyB9XG5cbiMgIyAjICMgI1xuXG4jIGNsYXNzIEtleVNlbGVjdG9yIGV4dGVuZHMgTW4uQ29sbGVjdGlvblZpZXdcbiMgICB0YWdOYW1lOiAndWwnXG4jICAgY2xhc3NOYW1lOiAnbGlzdC11bnN0eWxlZCBrZXktLWxpc3QgcHgtMyBweS0zIG15LTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlciBmbGV4LXJvdydcbiMgICBjaGlsZFZpZXc6IEtleUNoaWxkXG5cbmNsYXNzIEtleVNlbGVjdG9yIGV4dGVuZHMgTW4uQ29tcG9zaXRlVmlld1xuICBjbGFzc05hbWU6ICdrZXktLWxpc3QtLXdyYXBwZXIgcHgtMyBweS0zIGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIgbXktNCdcbiAgY2hpbGRWaWV3OiBLZXlDaGlsZFxuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMva2V5X3NlbGVjdG9yJylcbiAgY2hpbGRWaWV3Q29udGFpbmVyOiAndWwnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleVNlbGVjdG9yXG5cblxuIiwiRGV2aWNlTGF5b3V0ID0gcmVxdWlyZSgnLi9kZXZpY2VMYXlvdXQnKVxuRWRpdG9yU2VsZWN0b3IgPSByZXF1aXJlKCcuL2VkaXRvclNlbGVjdG9yJylcbkVkaXRvcldyYXBwZXIgPSByZXF1aXJlKCcuL2VkaXRvcldyYXBwZXInKVxuXG4jICMgIyAjICNcblxuY2xhc3MgSGVscFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2hlbHBfdmlldydcbiAgY2xhc3NOYW1lOiAncm93J1xuXG4jICMgIyAjICNcblxuY2xhc3MgTGF5b3V0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvbGF5b3V0J1xuICBjbGFzc05hbWU6ICdjb250YWluZXItZmx1aWQgZC1mbGV4IGZsZXgtY29sdW1uIHctMTAwIGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIGRldmljZS0tbGF5b3V0J1xuXG4gIHJlZ2lvbnM6XG4gICAgZGV2aWNlUmVnaW9uOiAgICdbZGF0YS1yZWdpb249ZGV2aWNlXSdcbiAgICBzZWxlY3RvclJlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1zZWxlY3Rvcl0nXG4gICAgZWRpdG9yUmVnaW9uOiAgICdbZGF0YS1yZWdpb249ZWRpdG9yXSdcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgRGlzcGxheXMgZGVmYXVsdCBoZWxwIHRleHRcbiAgICBAc2hvd0hlbHBWaWV3KClcblxuICAgICMgSW5zdGFudGlhdGVzIGEgbmV3IERldmljZUxheW91dCBmb3IgY29ubmVjdGluZyB0byBhbiBBc3Ryb0tleVxuICAgICMgYW5kIHNlbGVjdGluZyB3aGljaCBrZXkgdGhlIHVzZXIgd291bGQgbGlrZSB0byBlZGl0XG4gICAgZGV2aWNlVmlldyA9IG5ldyBEZXZpY2VMYXlvdXQoeyBtb2RlbDogQG1vZGVsIH0pXG4gICAgZGV2aWNlVmlldy5vbiAna2V5OnNlbGVjdGVkJywgKGtleU1vZGVsKSA9PiBAc2hvd0VkaXRvclNlbGVjdG9yKGtleU1vZGVsKVxuICAgIGRldmljZVZpZXcub24gJ2tleTpkZXNlbGVjdGVkJywgKCkgPT4gQHNob3dIZWxwVmlldygpXG4gICAgQGRldmljZVJlZ2lvbi5zaG93KGRldmljZVZpZXcpXG5cbiAgICAjIE1hY3JvIERldmVsb3BtZW50IGhhY2tcbiAgICAjIHNldFRpbWVvdXQoID0+XG4gICAgIyAgIEBzaG93RWRpdG9yVmlldyhAbW9kZWwuZ2V0KCdrZXlzJykuZmlyc3QoKSwgJ21hY3JvJylcbiAgICAjICwgMTAwMClcbiAgICAjIEBzaG93RWRpdG9yVmlldyhAbW9kZWwuZ2V0KCdrZXlzJykuZmlyc3QoKSwgJ21hY3JvJylcblxuICBzaG93SGVscFZpZXc6IC0+XG5cbiAgICAjIEluc3RhbnRpYXRlcyBhIG5ldyBIZWxwVmlldyBhbmQgc2hvd3MgaXQgaW4gQHNlbGVjdG9yUmVnaW9uXG4gICAgQHNlbGVjdG9yUmVnaW9uLnNob3cgbmV3IEhlbHBWaWV3KClcblxuICBzaG93RWRpdG9yU2VsZWN0b3I6IChrZXlNb2RlbCkgLT5cblxuICAgICMgSW5zdGFudGFpYXRlcyBuZXcgRWRpdG9yU2VsZWN0b3Igdmlld1xuICAgIGVkaXRvclNlbGVjdG9yID0gbmV3IEVkaXRvclNlbGVjdG9yKHsgbW9kZWw6IGtleU1vZGVsIH0pXG5cbiAgICAjIFNob3dzIE1hY3JvIEVkaXRvclxuICAgIGVkaXRvclNlbGVjdG9yLm9uICdzaG93Om1hY3JvOmVkaXRvcicsID0+IEBzaG93RWRpdG9yVmlldyhrZXlNb2RlbCwgJ21hY3JvJylcblxuICAgICMgU2hvd3MgVGV4dCBFZGl0b3JcbiAgICBlZGl0b3JTZWxlY3Rvci5vbiAnc2hvdzp0ZXh0OmVkaXRvcicsID0+IEBzaG93RWRpdG9yVmlldyhrZXlNb2RlbCwgJ3RleHQnKVxuXG4gICAgIyBTaG93cyBLZXkgRWRpdG9yXG4gICAgZWRpdG9yU2VsZWN0b3Iub24gJ3Nob3c6a2V5OmVkaXRvcicsID0+IEBzaG93RWRpdG9yVmlldyhrZXlNb2RlbCwgJ2tleScpXG5cbiAgICAjIFNob3dzIHRoZSBFZGl0b3JTZWxlY3RvciB2aWV3XG4gICAgQHNlbGVjdG9yUmVnaW9uLnNob3coZWRpdG9yU2VsZWN0b3IpXG5cbiAgc2hvd0VkaXRvclZpZXc6IChrZXlNb2RlbCwgZWRpdG9yKSAtPlxuXG4gICAgIyBBZGp1c3RzIHRoZSBDU1MgdG8gZGlzcGxheSB0aGUgRWRpdG9yV3JhcHBlclxuICAgIEAkZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAjIFJlYWRzIG1hY3JvIGZyb20gZGV2aWNlXG4gICAgIyBOT1RFIC0gdGhpcyBoYXBwZW5zIGFzeW5jaHJvbm91c2x5XG4gICAgIyBXZSBfc2hvdWxkXyBub3QgcmVuZGVyIHRoZSBFZGl0b3JXcmFwcGVyIHZpZXcgdW50aWwgaWYgYSBkZXZpY2UgaXMgbm90IHByZXNlbnQsXG4gICAgIyBidXQgd2Ugd2lsbCBpbiB0aGUgbWVhbnRpbWUgZm9yIGRlbW9uc3RyYXRpb24gcHVycG9zZXNcbiAgICBrZXlNb2RlbC5yZWFkTWFjcm8oKVxuXG4gICAgIyBJbnN0YW50aWF0ZXMgbmV3IEVkaXRvcldyYXBwZXIgdmlld1xuICAgIGVkaXRvcldyYXBwZXIgPSBuZXcgRWRpdG9yV3JhcHBlcih7IG1vZGVsOiBrZXlNb2RlbCwgZWRpdG9yOiBlZGl0b3IgfSlcblxuICAgICMgSGFuZGxlcyAnY2FuY2VsJyBldmVudFxuICAgIGVkaXRvcldyYXBwZXIub24gJ2NhbmNlbCcsID0+XG4gICAgICBAJGVsLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuXG4gICAgIyBIYW5kbGVzICdzYXZlJyBldmVudFxuICAgIGVkaXRvcldyYXBwZXIub24gJ3NhdmUnLCA9PlxuICAgICAgIyBUT0RPIC0gaGl0IHRoZSBLZXlNb2RlbCAvIERldmljZU1vZGVsIHRvIGRvIHRoZSByZXN0IGZyb20gaGVyZVxuICAgICAgQCRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICMgU2hvd3MgdGhlIEVkaXRvcldyYXBwZXIgdmlldyBpbiBAZWRpdG9yUmVnaW9uXG4gICAgQGVkaXRvclJlZ2lvbi5zaG93KGVkaXRvcldyYXBwZXIpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IExheW91dFZpZXdcblxuXG5cbiIsIktleWJvYXJkU2VsZWN0b3IgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3InKVxuTWFjcm9MaXN0ID0gcmVxdWlyZSgnLi9tYWNyb0xpc3QnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9FZGl0b3IgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL21hY3JvX2VkaXRvcidcbiAgY2xhc3NOYW1lOiAncm93IGgtMTAwJ1xuXG4gIHJlZ2lvbnM6XG4gICAgbWFjcm9SZWdpb246ICAgICdbZGF0YS1yZWdpb249bWFjcm9dJ1xuICAgIGNvbnRyb2xzUmVnaW9uOiAnW2RhdGEtcmVnaW9uPWNvbnRyb2xzXSdcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgR2V0cyB0aGUgY3VycmVudCBtYWNybyBhc3NpZ25lZCB0byB0aGUga2V5TW9kZWxcbiAgICAjIG1hY3JvQ29sbGVjdGlvbiA9IGtleU1vZGVsLmdldE1hY3JvQ29sbGVjdGlvbigpXG4gICAgQG1hY3JvUmVnaW9uLnNob3cgbmV3IE1hY3JvTGlzdCh7IGNvbGxlY3Rpb246IEBvcHRpb25zLm1hY3JvcyB9KVxuXG4gICAgIyBJbnN0YW50YWlhdGVzIG5ldyBLZXlib2FyZFNlbGVjdG9yXG4gICAgIyBUT0RPIC0gdGhpcyB3aWxsICpldmVudHVhbGx5KiBkaXNwbGF5IGEgc2VsZWN0b3IgYmV0d2VlbiBkaWZmZXJlbnQgdHlwZXMgb2Yga2V5Ym9hcmRzIC8gc2V0cyBvZiBrZXlzXG4gICAgQGtleWJvYXJkU2VsZWN0b3IgPSBuZXcgS2V5Ym9hcmRTZWxlY3Rvcih7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSlcblxuICAgICMgQnViYmxlcyB1cCBzdG9wOnJlY29yZGluZyBldmVudFxuICAgIEBrZXlib2FyZFNlbGVjdG9yLm9uICdzdG9wOnJlY29yZGluZycsID0+IEB0cmlnZ2VyICdzdG9wOnJlY29yZGluZydcblxuICAgICMgSGFuZGxlcyBLZXlTZWxlY3Rpb24gZXZlbnRcbiAgICBAa2V5Ym9hcmRTZWxlY3Rvci5vbiAna2V5OnNlbGVjdGVkJywgKGtleSkgPT5cblxuICAgICAgIyBDbG9uZXMgdGhlIG9yaWdpbmFsIG9iamVjdFxuICAgICAga2V5ID0gXy5jbG9uZShrZXkpXG5cbiAgICAgICMgQWRkcyB0aGUgY29ycmVjdCBgb3JkZXJgIGF0dHJpYnV0ZVxuICAgICAga2V5Lm9yZGVyID0gQG9wdGlvbnMubWFjcm9zLmxlbmd0aFxuXG4gICAgICAjIEFkZHMgdGhlIGtleSB0byB0aGUgTWFjcm9Db2xsZWN0aW9uXG4gICAgICBAb3B0aW9ucy5tYWNyb3MuYWRkKGtleSlcbiAgICAgIEBvcHRpb25zLm1hY3Jvcy5zb3J0KClcblxuICAgICMgU2hvd3MgdGhlIGtleWJvYXJkVmlld1xuICAgIEBjb250cm9sc1JlZ2lvbi5zaG93IEBrZXlib2FyZFNlbGVjdG9yXG5cbiAgIyBzdGFydFJlY29yZGluZ1xuICBzdGFydFJlY29yZGluZzogLT5cbiAgICBAa2V5Ym9hcmRWaWV3LnN0YXJ0UmVjb3JkaW5nKClcblxuICAjIHN0b3BSZWNvcmRpbmdcbiAgc3RvcFJlY29yZGluZzogLT5cbiAgICBAa2V5Ym9hcmRWaWV3LnN0b3BSZWNvcmRpbmcoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNYWNyb0VkaXRvclxuXG5cblxuIiwiXG5jbGFzcyBNYWNyb0NoaWxkIGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0YWdOYW1lOiAnbGknXG4gIGNsYXNzTmFtZTogJ21hY3JvLS1jaGlsZCBmbGV4LWNvbHVtbiBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBteS0yJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvbWFjcm9fY2hpbGQnKVxuXG4gIGJlaGF2aW9yczpcbiAgICBTb3J0YWJsZUNoaWxkOiB7fVxuICAgIFRvb2x0aXBzOiB7fVxuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdjaGFuZ2U6cG9zaXRpb24nOiAgJ3JlbmRlcidcbiAgICAnY2hhbmdlOnNoaWZ0ZWQnOiAgICdyZW5kZXInXG5cbiAgdWk6XG4gICAgdG9vbHRpcDogJ1tkYXRhLXRvZ2dsZT10b29sdGlwXSdcblxuICBldmVudHM6XG4gICAgJ2RyYWcnOiAnb25EcmFnJ1xuICAgICdkcmFnc3RhcnQnOiAnb25EcmFnU3RhcnQnXG4gICAgJ21vdXNlb3ZlciAua2V5JzogJ29uTW91c2VPdmVyJ1xuICAgICdtb3VzZW91dCAua2V5JzogJ29uTW91c2VPdXQnXG4gICAgJ2NsaWNrIC5rZXknOiAncmVtb3ZlTWFjcm8nXG4gICAgJ2NsaWNrIFtkYXRhLXBvc2l0aW9uXTpub3QoLmFjdGl2ZSknOiAnb25Qb3NpdGlvbkNsaWNrJ1xuXG4gIHN0YXRlOiB7XG4gICAgdG9vbHRpcE9uUmVuZGVyOiBmYWxzZVxuICB9XG5cbiAgb25SZW5kZXI6IC0+XG4gICAgcmV0dXJuIHVubGVzcyBAc3RhdGUudG9vbHRpcE9uUmVuZGVyXG5cbiAgICAjIFVuc2V0cyB0b29sdGlwIGZsYWdcbiAgICBAc3RhdGUudG9vbHRpcE9uUmVuZGVyID0gZmFsc2VcblxuICAgICMgU2hvd3MgdGhlIHRvb2x0aXBcbiAgICBAdWkudG9vbHRpcC50b29sdGlwKCdzaG93JylcblxuICBvbk1vdXNlT3ZlcjogLT5cbiAgICBAJGVsLmFkZENsYXNzKCdob3ZlcmVkJylcblxuICBvbk1vdXNlT3V0OiAtPlxuICAgIEAkZWwucmVtb3ZlQ2xhc3MoJ2hvdmVyZWQnKVxuXG4gIG9uRHJhZ1N0YXJ0OiAtPlxuICAgIEAkZWwuYWRkQ2xhc3MoJ2RyYWctc3RhcnQnKVxuXG4gIG9uRHJhZzogLT5cbiAgICBAJGVsLnJlbW92ZUNsYXNzKCdkcmFnLXN0YXJ0IGhvdmVyZWQnKVxuICAgIEAkZWwuc2libGluZ3MoJy5tYWNyby0tY2hpbGQnKS5yZW1vdmVDbGFzcygnZHJhZy1zdGFydCBob3ZlcmVkJylcblxuICByZW1vdmVNYWNybzogLT5cbiAgICAjIGNvbnNvbGUubG9nIEBtb2RlbFxuICAgICMgQG1vZGVsLnNldCgnc2hpZnRlZCcsICFAbW9kZWwuZ2V0KCdzaGlmdGVkJykpXG4gICAgQG1vZGVsLmNvbGxlY3Rpb24ucmVtb3ZlKEBtb2RlbClcblxuICBvblBvc2l0aW9uQ2xpY2s6IChlKSAtPlxuXG4gICAgIyBEaXNwbGF5cyB0aGUgdG9vbHRpcCBhZnRlciB0aGUgdmlldyByZS1yZW5kZXJzXG4gICAgQHN0YXRlLnRvb2x0aXBPblJlbmRlciA9IHRydWVcblxuICAgICMgQ2xlYXJzIGFjdGl2ZSB0b29sdGlwc1xuICAgIEBjbGVhclRvb2x0aXBzKClcblxuICAgICMgQ2FjaGVzIGNsaWNrZWQgZWxcbiAgICBlbCA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuXG4gICAgIyBJc29sYXRlcyBwb3NpdGlvbiBkYXRhIGZyb20gZWxlbWVudFxuICAgIHBvc2l0aW9uID0gZWwuZGF0YSgncG9zaXRpb24nKVxuXG4gICAgIyBEZXRlcm1pbmVzIG5leHQgcG9zaXRpb25cblxuICAgICMgS0VZX0ROIC0+IEtFWV9VUFxuICAgIGlmIHBvc2l0aW9uID09IDFcbiAgICAgIG5ld19wb3NpdGlvbiA9IDJcblxuICAgICMgS0VZX1VQIC0+IEtFWV9QUlxuICAgIGlmIHBvc2l0aW9uID09IDJcbiAgICAgIG5ld19wb3NpdGlvbiA9IDNcblxuICAgICMgS0VZX1BSIC0+IEtFWV9ETlxuICAgIGlmIHBvc2l0aW9uID09IDNcbiAgICAgIG5ld19wb3NpdGlvbiA9IDFcblxuICAgICMgU2V0cyB0aGUgcG9zaXRpb24gYXR0cmlidXRlIG9uIHRoZSBtb2RlbFxuICAgIEBtb2RlbC5zZXQoJ3Bvc2l0aW9uJywgbmV3X3Bvc2l0aW9uKVxuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBwb3NpdGlvbnMgPSBbXG4gICAgICB7IHBvc2l0aW9uOiAzLCBjc3M6ICdmYS1hcnJvd3MtdicsIHRvb2x0aXA6ICdLZXkgUHJlc3MnIH1cbiAgICAgIHsgcG9zaXRpb246IDEsIGNzczogJ2ZhLWxvbmctYXJyb3ctZG93bicsIHRvb2x0aXA6ICdLZXkgRG93bicgfVxuICAgICAgeyBwb3NpdGlvbjogMiwgY3NzOiAnZmEtbG9uZy1hcnJvdy11cCcsIHRvb2x0aXA6ICdLZXkgVXAnIH1cbiAgICBdXG5cbiAgICBpZiBAbW9kZWwuZ2V0KCdkZWxheScpXG4gICAgICBhY3RpdmVfcG9zaXRpb24gPSB7IHBvc2l0aW9uOiAxNiwgY3NzOiAnZmEtY2xvY2stbycsIHRvb2x0aXA6ICcxMDBtcyBEZWxheScgfVxuICAgICAgcmV0dXJuIHsgYWN0aXZlX3Bvc2l0aW9uIH1cblxuICAgIGVsc2VcbiAgICAgIHBvc2l0aW9uID0gQG1vZGVsLmdldCgncG9zaXRpb24nKVxuICAgICAgYWN0aXZlX3Bvc2l0aW9uID0gXy5maW5kV2hlcmUocG9zaXRpb25zLCB7IHBvc2l0aW9uOiBwb3NpdGlvbiB9KVxuICAgICAgcmV0dXJuIHsgYWN0aXZlX3Bvc2l0aW9uIH1cblxuIyAjICMgIyAjXG5cbmNsYXNzIE1hY3JvRW1wdHkgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnbWFjcm8tLWNoaWxkIGVtcHR5IGZsZXgtY29sdW1uIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIG15LTInXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9tYWNyb19lbXB0eScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBNYWNyb0xpc3QgZXh0ZW5kcyBNbi5Db2xsZWN0aW9uVmlld1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ2xpc3QtdW5zdHlsZWQgbWFjcm8tLWxpc3QgcHgtNCBteS0yIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBmbGV4LXJvdyBmbGV4LXdyYXAnXG4gIGNoaWxkVmlldzogTWFjcm9DaGlsZFxuICBlbXB0eVZpZXc6IE1hY3JvRW1wdHlcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgU29ydHMgdGhlIGNvbGxlY3Rpb25cbiAgICBAY29sbGVjdGlvbi5zb3J0KClcblxuICAgICMgSW5pdGlhbGl6ZXMgU29ydGFibGUgY29udGFpbmVyXG4gICAgU29ydGFibGUuY3JlYXRlIEBlbCxcbiAgICAgIGFuaW1hdGlvbjogICAgMTUwXG4gICAgICBoYW5kbGU6ICAgICAgICcua2V5J1xuICAgICAgZ2hvc3RDbGFzczogICAnZ2hvc3QnICAjIENsYXNzIG5hbWUgZm9yIHRoZSBkcm9wIHBsYWNlaG9sZGVyXG4gICAgICBjaG9zZW5DbGFzczogICdjaG9zZW4nICAjIENsYXNzIG5hbWUgZm9yIHRoZSBjaG9zZW4gaXRlbVxuICAgICAgZHJhZ0NsYXNzOiAgICAnZHJhZycgICMgQ2xhc3MgbmFtZSBmb3IgdGhlIGRyYWdnaW5nIGl0ZW1cbiAgICAgICMgZ3JvdXA6XG4gICAgICAjICAgbmFtZTogJ21hY3JvJ1xuICAgICAgIyAgIHB1bGw6IGZhbHNlXG4gICAgICAjICAgcHV0OiAgdHJ1ZVxuICAgICAgZmFsbGJhY2tUb2xlcmFuY2U6IDEwMFxuICAgICAgb25FbmQ6IChlKSA9PiBAcmVvcmRlckNvbGxlY3Rpb24oKVxuXG4gICMgcmVvcmRlckNvbGxlY3Rpb25cbiAgIyBJbnZva2VkIGFmdGVyIHNvcnRpbmcgaGFzIGNvbXBsZXRlZFxuICByZW9yZGVyQ29sbGVjdGlvbjogPT5cblxuICAgICMgVHJpZ2dlcnMgb3JkZXIgZXZlbnRzIG9uIENvbGxlY3Rpb25WaWV3IGNoaWxkVmlldyAkZWxzXG4gICAgb3JkZXIgPSAxXG4gICAgZm9yIGVsIGluIEBlbC5jaGlsZHJlblxuICAgICAgJChlbCkudHJpZ2dlcignc29ydGVkJyxvcmRlcilcbiAgICAgIG9yZGVyKytcblxuICAgICMgQGNvbGxlY3Rpb24uc29ydCgpXG4gICAgQHJlbmRlcigpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hY3JvTGlzdFxuXG5cbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGNvbm5lY3RlZCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIG1iLTRcXFwiPlwiKTtcbmlmICggY29ubmVjdGVkKVxue1xuYnVmLnB1c2goXCI8YnV0dG9uIGRhdGEtY2xpY2s9XFxcImRpc2Nvbm5lY3RcXFwiIGNsYXNzPVxcXCJidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtdGltZXMgbXItMVxcXCI+PC9pPkRJU0NPTk5FQ1Q8L2J1dHRvbj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxidXR0b24gZGF0YS1jbGljaz1cXFwiY29ubmVjdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnlcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS11c2IgbXItMVxcXCI+PC9pPkNPTk5FQ1Q8L2J1dHRvbj5cIik7XG59XG5idWYucHVzaChcIjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcImtleXNcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyXFxcIj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJjb25uZWN0ZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNvbm5lY3RlZDp0eXBlb2YgY29ubmVjdGVkIT09XCJ1bmRlZmluZWRcIj9jb25uZWN0ZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobGFiZWwpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3cgZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlclxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEwXFxcIj48cCBjbGFzcz1cXFwibGVhZCBtYi0wXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGxhYmVsKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3A+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTIgdGV4dC1yaWdodCB0ZXh0LW11dGVkXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtcGVuY2lsXFxcIj48L2k+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibGFiZWxcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmxhYmVsOnR5cGVvZiBsYWJlbCE9PVwidW5kZWZpbmVkXCI/bGFiZWw6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobmF2SXRlbXMsIHVuZGVmaW5lZCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBmbGV4LXJvdyBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGkgY2xhc3M9XFxcImQtZmxleCBmYSBmYS1mdyBmYS0yeCBmYS1hcnJvdy1jaXJjbGUtby1kb3duIG1yLTFcXFwiPjwvaT48cCBzdHlsZT1cXFwibGV0dGVyLXNwYWNpbmc6IDAuMjVyZW07IGZvbnQtd2VpZ2h0OiAyMDA7XFxcIiBjbGFzcz1cXFwiZC1mbGV4IGxlYWQgbS0wXFxcIj5TZWxlY3QgYW4gZWRpdG9yPC9wPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvdyBtdC01XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlwiKTtcbi8vIGl0ZXJhdGUgbmF2SXRlbXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbmF2SXRlbXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIlwiICsgKGphZGUuYXR0cihcInRpdGxlXCIsIG5hdkl0ZW0udGl0bGUsIHRydWUsIGZhbHNlKSkgKyBcIiBkYXRhLXBsYWNlbWVudD1cXFwiYm90dG9tXFxcIiBzdHlsZT1cXFwiZmxleC1ncm93OjE7XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEtdHJpZ2dlclwiLCBuYXZJdGVtLnRyaWdnZXIsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5hdHRyKFwiZGlzYWJsZWRcIiwgbmF2SXRlbS5kaXNhYmxlZCwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmNscyhbJ2QtZmxleCcsJ2J0bicsJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsJ2p1c3RpZnktY29udGVudC1jZW50ZXInLCdteC0zJyxuYXZJdGVtLmNzc10sIFtudWxsLG51bGwsbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbmF2SXRlbS50ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2J1dHRvbj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCJcIiArIChqYWRlLmF0dHIoXCJ0aXRsZVwiLCBuYXZJdGVtLnRpdGxlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1wbGFjZW1lbnQ9XFxcImJvdHRvbVxcXCIgc3R5bGU9XFxcImZsZXgtZ3JvdzoxO1xcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLXRyaWdnZXJcIiwgbmF2SXRlbS50cmlnZ2VyLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuYXR0cihcImRpc2FibGVkXCIsIG5hdkl0ZW0uZGlzYWJsZWQsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydkLWZsZXgnLCdidG4nLCdidG4tb3V0bGluZS1zZWNvbmRhcnknLCdqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJywnbXgtMycsbmF2SXRlbS5jc3NdLCBbbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcIm5hdkl0ZW1zXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5uYXZJdGVtczp0eXBlb2YgbmF2SXRlbXMhPT1cInVuZGVmaW5lZFwiP25hdkl0ZW1zOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChtYWNyb19lZGl0b3IpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcImNhbmNlbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IG14LTIgcHgtNFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IG14LTQgZmEtYW5nbGUtbGVmdFxcXCI+PC9pPjwvYnV0dG9uPjxidXR0b24gZGF0YS1jbGljaz1cXFwic2F2ZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtc3VjY2VzcyBteC0yIHB4LTRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS0yeCBteC00IGZhLWNoZWNrLWNpcmNsZS1vXFxcIj48L2k+PC9idXR0b24+XCIpO1xuaWYgKCBtYWNyb19lZGl0b3IpXG57XG5idWYucHVzaChcIjxidXR0b24gZGF0YS1jbGljaz1cXFwiY2xlYXJcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXdhcm5pbmcgbXgtMiBweC00XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtMnggbXgtNCBmYS10aW1lc1xcXCI+PC9pPjwvYnV0dG9uPjxidXR0b24gZGF0YS1jbGljaz1cXFwicmVjb3JkXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1kYW5nZXIgbXgtMiBweC00XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtMnggbXgtNCBmYS1jaXJjbGVcXFwiPjwvaT48L2J1dHRvbj48ZGl2IGNsYXNzPVxcXCJidG4tZ3JvdXBcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLXRvZ2dsZT1cXFwiZHJvcGRvd25cXFwiIGFyaWEtaGFzcG9wdXA9XFxcInRydWVcXFwiIGFyaWEtZXhwYW5kZWQ9XFxcImZhbHNlXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1wcmltYXJ5IGRyb3Bkb3duLXRvZ2dsZSBteC0yIHB4LTRcXFwiPkV4YW1wbGVzPC9idXR0b24+PGRpdiBjbGFzcz1cXFwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0IG10LTNcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWV4YW1wbGU9XFxcImV4XzAxXFxcIiBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+RXguIDE6IFxcXCJIZWxsbyFcXFwiPC9idXR0b24+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZXhhbXBsZT1cXFwiZXhfMDJcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1pdGVtXFxcIj5FeC4gMjogXFxcIlJlc3Vtw6hcXFwiPC9idXR0b24+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZXhhbXBsZT1cXFwiZXhfMDNcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1pdGVtXFxcIj5FeC4gMzogRW0gRGFzaCAo4oCUKTwvYnV0dG9uPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWV4YW1wbGU9XFxcImV4XzA0XFxcIiBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+RXguIDQ6IENUUkwgKyBBTFQgKyBERUxFVEU8L2J1dHRvbj48L2Rpdj48L2Rpdj5cIik7XG59XG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGhyLz48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJjb250ZW50XFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJtYWNyb19lZGl0b3JcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm1hY3JvX2VkaXRvcjp0eXBlb2YgbWFjcm9fZWRpdG9yIT09XCJ1bmRlZmluZWRcIj9tYWNyb19lZGl0b3I6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXggZmxleC1yb3cgYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxpIGNsYXNzPVxcXCJkLWZsZXggZmEgZmEtZncgZmEtMnggZmEtcXVlc3Rpb24tY2lyY2xlLW8gbXItMVxcXCI+PC9pPjxwIHN0eWxlPVxcXCJsZXR0ZXItc3BhY2luZzogMC4yNXJlbTsgZm9udC13ZWlnaHQ6IDIwMDtcXFwiIGNsYXNzPVxcXCJkLWZsZXggbGVhZCBtLTBcXFwiPkNsaWNrIGEga2V5IHRvIGVkaXQ8L3A+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93IG10LTVcXFwiPjxkaXYgc3R5bGU9XFxcIm9wYWNpdHk6MFxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGJ1dHRvbiBkaXNhYmxlZD1cXFwiZGlzYWJsZWRcXFwiIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG14LTNcXFwiPkJMQU5LPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGxhYmVsKSB7XG5idWYucHVzaChcIjxzcGFuPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGFiZWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Bhbj5cIik7fS5jYWxsKHRoaXMsXCJsYWJlbFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubGFiZWw6dHlwZW9mIGxhYmVsIT09XCJ1bmRlZmluZWRcIj9sYWJlbDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8dWwgY2xhc3M9XFxcImxpc3QtdW5zdHlsZWQga2V5LS1saXN0IGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXIgZmxleC1yb3cgbXktMlxcXCI+PC91bD48aW1nIHNyYz1cXFwiLi9pbWcvaWNvbl93aGl0ZS5zdmdcXFwiIGNsYXNzPVxcXCJsb2dvXFxcIi8+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvdyBoLTEwMCB3LTEwMCBlZGl0b3ItLW92ZXJsYXlcXFwiPjxkaXYgZGF0YS1yZWdpb249XFxcImVkaXRvclxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBwdC0yXFxcIj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3cgZGV2aWNlLS1vdmVybGF5XFxcIj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJkZXZpY2VcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcInNlbGVjdG9yXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyIHB0LTVcXFwiPjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChhY3RpdmVfcG9zaXRpb24sIGFscGhhLCBjc3MsIGtleSwgc2hpZnRfa2V5LCBzaGlmdGVkLCBzcGVjaWFsKSB7XG5qYWRlX21peGluc1tcInBvc2l0aW9uU2VsZWN0XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPHNwYW4gZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiXCIgKyAoamFkZS5hdHRyKFwidGl0bGVcIiwgb3B0cy50b29sdGlwLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1wbGFjZW1lbnQ9XFxcImJvdHRvbVxcXCJcIiArIChqYWRlLmNscyhbJ2ZhLXN0YWNrJywnZmEtbGcnLCdwb3NpdGlvbi0tc2VsZWN0JyxgcG9zaXRpb25fJHtvcHRzLnBvc2l0aW9ufWBdLCBbbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1jaXJjbGUtdGhpbiBmYS1zdGFjay0yeFxcXCI+PC9pPjxpIGNsYXNzPVxcXCJmYSBmYS1zdGFjay0xeCBmYS1zdGFja1xcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWNpcmNsZS10aGluIGZhLXN0YWNrLTJ4IGZhLTJ4XFxcIj48L2k+PGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLXBvc2l0aW9uXCIsIG9wdHMucG9zaXRpb24sIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydmYScsJ2ZhLXN0YWNrLTF4JyxvcHRzLmNzc10sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT48L2k+PC9zcGFuPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXZcIiArIChqYWRlLmNscyhbJ2tleScsJ2QtZmxleCcsdHlwZW9mIHNwZWNpYWwgPT09IFwidW5kZWZpbmVkXCIgPyBcIlwiIDogXCJzcGVjaWFsXCJdLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48ZGl2XCIgKyAoamFkZS5jbHMoWydpbm5lcicsJ2NvbnRlbnQnLGNzc10sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggc2hpZnRlZCB8fCBzaGlmdF9rZXkgJiYgIWFscGhhKVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJzaGlmdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBzaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0ga2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0ga2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5idWYucHVzaChcIjwvZGl2PjxkaXYgY2xhc3M9XFxcImlubmVyIGhvdmVyXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtbGcgZmEtdGltZXNcXFwiPjwvaT48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJwb3NpdGlvbiBtdC0yXFxcIj5cIik7XG5qYWRlX21peGluc1tcInBvc2l0aW9uU2VsZWN0XCJdKGFjdGl2ZV9wb3NpdGlvbik7XG5idWYucHVzaChcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImFjdGl2ZV9wb3NpdGlvblwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguYWN0aXZlX3Bvc2l0aW9uOnR5cGVvZiBhY3RpdmVfcG9zaXRpb24hPT1cInVuZGVmaW5lZFwiP2FjdGl2ZV9wb3NpdGlvbjp1bmRlZmluZWQsXCJhbHBoYVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguYWxwaGE6dHlwZW9mIGFscGhhIT09XCJ1bmRlZmluZWRcIj9hbHBoYTp1bmRlZmluZWQsXCJjc3NcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNzczp0eXBlb2YgY3NzIT09XCJ1bmRlZmluZWRcIj9jc3M6dW5kZWZpbmVkLFwia2V5XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5rZXk6dHlwZW9mIGtleSE9PVwidW5kZWZpbmVkXCI/a2V5OnVuZGVmaW5lZCxcInNoaWZ0X2tleVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc2hpZnRfa2V5OnR5cGVvZiBzaGlmdF9rZXkhPT1cInVuZGVmaW5lZFwiP3NoaWZ0X2tleTp1bmRlZmluZWQsXCJzaGlmdGVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5zaGlmdGVkOnR5cGVvZiBzaGlmdGVkIT09XCJ1bmRlZmluZWRcIj9zaGlmdGVkOnVuZGVmaW5lZCxcInNwZWNpYWxcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnNwZWNpYWw6dHlwZW9mIHNwZWNpYWwhPT1cInVuZGVmaW5lZFwiP3NwZWNpYWw6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwidHlwZVxcXCIgdmFsdWU9XFxcIm1hY3JvXFxcIiByZWFkb25seT1cXFwicmVhZG9ubHlcXFwiLz48ZGl2IGRhdGEtcmVnaW9uPVxcXCJtYWNyb1xcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48aHIvPjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcImNvbnRyb2xzXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPHAgY2xhc3M9XFxcImxlYWQgdGV4dC1jZW50ZXJcXFwiPk1hY3Jvczxici8+PHNtYWxsPkV4ZWN1dGUga2V5c3Ryb2tlcyBpbiBhIHNwZWNpZmljIHNlcXVlbmNlPC9zbWFsbD48L3A+PHNtYWxsIHN0eWxlPVxcXCJmb250LXNpemU6IDFyZW07XFxcIiBjbGFzcz1cXFwidGV4dC1tdXRlZCBkLWZsZXggZmxleC1yb3cganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXJcXFwiPjxkaXYgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLXF1ZXN0aW9uLWNpcmNsZS1vIG1yLTEgZC1mbGV4IGZsZXgtY29sdW1uXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJkLWZsZXggZmxleC1yb3dcXFwiPjxzcGFuPlVzZSB0aGUga2V5cyBiZWxvdywgb3IgY2xpY2smbmJzcDs8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRleHQtZGFuZ2VyXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtY2lyY2xlIHRleHQtZGFuZ2VyXFxcIj48L2k+IHJlY29yZCZuYnNwOzwvc3Bhbj4mbmJzcDt0byBzdGFydCB0eXBpbmc8L2Rpdj48L3NtYWxsPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuamFkZV9taXhpbnNbXCJmb3JtR3JvdXBcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8ZmllbGRzZXRcIiArIChqYWRlLmNscyhbJ2Zvcm0tZ3JvdXAnLG9wdHMuZm9ybUdyb3VwQ3NzXSwgW251bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggb3B0cy5sYWJlbClcbntcbmJ1Zi5wdXNoKFwiPGxhYmVsIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wtbGFiZWxcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5sYWJlbCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9sYWJlbD5cIik7XG59XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L2ZpZWxkc2V0PlwiKTtcbn07XG5idWYucHVzaChcIlwiKTtcbmphZGVfbWl4aW5zW1wiZm9ybUlucHV0XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmphZGVfbWl4aW5zW1wiZm9ybUdyb3VwXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5idWYucHVzaChcIjxpbnB1dFwiICsgKGphZGUuYXR0cnMoamFkZS5tZXJnZShbe1wicGxhY2Vob2xkZXJcIjogamFkZS5lc2NhcGUob3B0cy5wbGFjZWhvbGRlciksXCJuYW1lXCI6IGphZGUuZXNjYXBlKG9wdHMubmFtZSksXCJ0eXBlXCI6IGphZGUuZXNjYXBlKG9wdHMudHlwZSksXCJjbGFzc1wiOiBcImZvcm0tY29udHJvbFwifSxhdHRyaWJ1dGVzXSksIGZhbHNlKSkgKyBcIi8+XCIpO1xufVxufSwgb3B0cyk7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctOFxcXCI+PGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwidHlwZVxcXCIgdmFsdWU9XFxcInRleHRcXFwiIHJlYWRvbmx5PVxcXCJyZWFkb25seVxcXCIvPlwiKTtcbmphZGVfbWl4aW5zW1wiZm9ybUlucHV0XCJdLmNhbGwoe1xuYXR0cmlidXRlczogamFkZS5tZXJnZShbeyBjbGFzczogJ2Zvcm0tY29udHJvbC1sZycgfV0pXG59LCB7IG5hbWU6ICd0ZXh0X3ZhbHVlJywgdHlwZTogJ3RleHQnLCBwbGFjZWhvbGRlcjogJ0VudGVyIHNvbWUgdGV4dCBoZXJlLi4uJyB9KTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxuY2xhc3MgVGV4dEVkaXRvciBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICBjbGFzc05hbWU6ICdyb3cgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXInXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy90ZXh0X2VkaXRvcicpXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgQmFja2JvbmUuU3lwaG9uLmRlc2VyaWFsaXplKEAsIHsgdHlwZTogJ3RleHQnLCB0ZXh0X3ZhbHVlOiBAbW9kZWwuZ2V0KCd0ZXh0X3ZhbHVlJykgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dEVkaXRvclxuIiwiXG4jIER1bW15IERldmljZSBEYXRhIGZvciBVSSBkZXZlbG9wbWVudFxuIyBUT0RPIC0gcHVsbCBmcm9tIFdlYlVTQj9cbm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgaWQ6ICdkZXZpY2VfMScsXG4gICAgbGFiZWw6ICdBbGV4XFwncyBBc3Ryb0tleScsXG4gICAgc3RhdHVzX2NvZGU6IDEsXG4gICAga2V5czogW1xuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV8xJywgb3JkZXI6ICcweDAwMDAnLCBjb25maWc6IHsgdHlwZTogJ21hY3JvJywgbWFjcm9zOiBbXSB9IH1cbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfMicsIG9yZGVyOiAnMHgwMDAxJywgY29uZmlnOiB7IHR5cGU6ICdtYWNybycsIG1hY3JvczogW10gfSB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzMnLCBvcmRlcjogJzB4MDAwMicsIGNvbmZpZzogeyB0eXBlOiAnbWFjcm8nLCBtYWNyb3M6IFtdIH0gfVxuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV80Jywgb3JkZXI6ICcweDAwMDMnLCBjb25maWc6IHsgdHlwZTogJ21hY3JvJywgbWFjcm9zOiBbXSB9IH1cbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfNScsIG9yZGVyOiAnMHgwMDA0JywgY29uZmlnOiB7IHR5cGU6ICdtYWNybycsIG1hY3JvczogW10gfSB9XG4gICAgXVxuICB9XG5dXG4iLCJNYWNyb0VudGl0aWVzID0gcmVxdWlyZSgnLi4vbWFjcm8vZW50aXRpZXMnKVxuTWFjcm9LZXlzID0gcmVxdWlyZSgnLi4va2V5L2tleXMnKVxuXG4jICMgIyAjICNcblxuIyBBY2NlcHRzIGFuIGFycmF5IGFuZCBzcGxpdHMgaXRcbiMgaW50byBwYWlycyBvZiBbcG9zaXRpb24sIGNoYXJhY3Rlcl9pZF1cbnBhaXJBcnJheSA9IChhKSA9PlxuICB0ZW1wID0gYS5zbGljZSgpXG4gIGFyciA9IFtdXG5cbiAgd2hpbGUgKHRlbXAubGVuZ3RoKVxuICAgIGFyci5wdXNoKHRlbXAuc3BsaWNlKDAsMikpXG5cbiAgcmV0dXJuIGFyclxuXG4jICMgIyAjICNcblxuIyBBc3Ryb0tleUNvbmZpZyBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBBc3Ryb2tleUNvbmZpZyBleHRlbmRzIEJhY2tib25lLlJlbGF0aW9uYWxNb2RlbFxuXG4gICMgRGVmYXVsdCBhdHRyaWJ1dGVzXG4gIGRlZmF1bHRzOiB7XG4gICAgdHlwZTogJ21hY3JvJ1xuICAgIG1hY3JvczogW11cbiAgICB0ZXh0X3ZhbHVlOiAnJ1xuICAgIGtleV92YWx1ZTogJydcbiAgfVxuXG4gICMgQmFja2JvbmUuUmVsYXRpb25hbCAtIEByZWxhdGlvbnMgZGVmaW5pdGlvblxuICByZWxhdGlvbnM6IFtcbiAgICAgIHR5cGU6ICAgICAgICAgICBCYWNrYm9uZS5IYXNNYW55XG4gICAgICBrZXk6ICAgICAgICAgICAgJ21hY3JvcydcbiAgICAgIHJlbGF0ZWRNb2RlbDogICBNYWNyb0VudGl0aWVzLk1vZGVsXG4gICAgICBjb2xsZWN0aW9uVHlwZTogTWFjcm9FbnRpdGllcy5Db2xsZWN0aW9uXG4gIF1cblxuIyAjICMgIyAjXG5cbiMgQXN0cm9rZXlNb2RlbCBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBBc3Ryb2tleU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6XG4gICAgb3JkZXI6IG51bGxcbiAgICBjb25maWc6IHt9XG5cbiAgIyBCYWNrYm9uZS5SZWxhdGlvbmFsIC0gQHJlbGF0aW9ucyBkZWZpbml0aW9uXG4gIHJlbGF0aW9uczogW1xuICAgICAgdHlwZTogICAgICAgICAgIEJhY2tib25lLkhhc09uZVxuICAgICAga2V5OiAgICAgICAgICAgICdjb25maWcnXG4gICAgICByZWxhdGVkTW9kZWw6ICAgQXN0cm9rZXlDb25maWdcbiAgXVxuXG4gICMgVE9ETyAtIHRoaXMgc2hvdWxkIGJlIG1vdmVkIGVsc2V3aGVyZSAobm90IGEgRGV2aWNlLWxldmVsIGNvbmNlcm4pXG4gIGJ1aWxkU25pcHBldDogKHNuaXBwZXQpIC0+XG4gICAgZGF0YSA9IFtdXG5cbiAgICAjIEl0ZXJhdGVzIG92ZXIgZWFjaCBjaGFyYWN0ZXIgaW4gdGhlIHNuaXBwZXRcbiAgICBmb3IgaW5kZXggaW4gWzAuLnNuaXBwZXQubGVuZ3RoIC0gMV1cblxuICAgICAgIyBJc29sYWV0cyB0aGUgY2hhcmFjdGVyXG4gICAgICBjaGFyID0gc25pcHBldFtpbmRleF1cblxuICAgICAgIyBGaW5kcyB0aGUgbWFjcm9cbiAgICAgIG1hY3JvID0gXy5maW5kV2hlcmUoTWFjcm9LZXlzLCB7IGtleTogY2hhciB9KVxuICAgICAgbWFjcm8gfHw9IF8uZmluZFdoZXJlKE1hY3JvS2V5cywgeyBrZXk6ICdTUEFDRScgfSlcblxuICAgICAgIyBDbG9uZXMgdGhlIG1hY3JvIG9iamVjdFxuICAgICAgbWFjcm8gPSBfLmNsb25lKG1hY3JvKVxuXG4gICAgICAjIEFzc2lnbnNzIHRoZSBwcm9wZXIgb3JkZXIvaW5kZXggYW5kIHBvc2l0aW9uIGF0dHJpYnV0ZXNcbiAgICAgIG1hY3JvLm9yZGVyID0gaW5kZXhcbiAgICAgIG1hY3JvLnBvc2l0aW9uID0gMFxuXG4gICAgICAjIEFwcGVuZHMgbWFjcm8gdG8gZGF0YSBhcnJheVxuICAgICAgZGF0YS5wdXNoKG1hY3JvKVxuXG4gICAgIyBSZXR1cm5zIHRoZSBmb3JtYXR0ZWQgZGF0YSBhcnJheVxuICAgIHJldHVybiBkYXRhXG5cbiAgIyByZWFkTWFjcm9cbiAgIyBSZWFkcyBhbmQgcGFyc2VzIHRoZSBtYWNybyBmcm9tIHRoZSBkZXZpY2VcbiAgIyBUT0RPIC0gbW9zdCBvZiB0aGlzIHNob3VsZCBiZSBtb3ZlZCBlbHNld2hlcmUgKG5vdCBhIERldmljZS1sZXZlbCBjb25jZXJuKVxuICByZWFkTWFjcm86IC0+XG5cbiAgICAjIFJldHVybnMgYSBQcm9taXNlIHRvIGhhbmRsZSBhc3luY2hyb25vdXMgYmVoYXZpb3JcbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgIyBJc3N1ZXMgJ3JlYWQ6bWFjcm8nIHJlcXVlc3QgdG8gdGhlIFVTQiBzZXJ2aWNlXG4gICAgICBSYWRpby5jaGFubmVsKCd1c2InKS5yZXF1ZXN0KCdyZWFkOm1hY3JvJywgQGdldCgnb3JkZXInKSkudGhlbigobWFjcm9BcnJheSkgPT5cblxuICAgICAgICAjIFN0b3JlcyB0aGUga2V5cyB1c2VkIHRvIHBvcHVsYXRlIHRoZSBtYWNybyBjb2xsZWN0aW9uXG4gICAgICAgIG1hY3JvcyA9IFtdXG4gICAgICAgIHBhcnNlZE1hY3JvcyA9IFtdXG5cbiAgICAgICAgIyBUT0RPIC0gcmVtb3ZlXG4gICAgICAgIGNvbnNvbGUubG9nICdQYXJzZWQgTWFjcm8gZnJvbSBrZXk6ICcsIEBnZXQoJ29yZGVyJylcbiAgICAgICAgY29uc29sZS5sb2cgbWFjcm9BcnJheVxuXG4gICAgICAgICMgQ29tcGFjdHMgdGhlIG1hY3JvQXJyYXlcbiAgICAgICAgIyBRVUVTVElPTiAtIHdpbGwgd2UgZXZlciBoYXZlIHplcm9zIGJldHdlZW4gZWFjaCBrZXkgc3Ryb2tlP1xuICAgICAgICBtYWNyb0FycmF5ID0gXy5jb21wYWN0KG1hY3JvQXJyYXkpXG5cbiAgICAgICAgIyBTcGxpdHMgdGhlIGFycmF5IGludG8gcGFpcnMgb2YgW3Bvc2l0aW9uLCBjaGFyYWN0ZXJfaWRdXG4gICAgICAgIHBhaXJzID0gcGFpckFycmF5KG1hY3JvQXJyYXkpXG5cbiAgICAgICAgIyBJdGVyYXRlcyBvdmVyIGVhY2ggcGFpciBpbiB0aGUgbWFjcm9BcnJheVxuICAgICAgICBmb3IgcGFpciwgaW5kZXggaW4gcGFpcnNcblxuICAgICAgICAgICMgQ2FwdHVyZXMgYW5kIGZvcm1hdHMgdGhlIHBvc2l0aW9uXG4gICAgICAgICAgcG9zaXRpb24gPSBwYWlyWzBdXG5cbiAgICAgICAgICAjIEZpbmRzIHRoZSBtYWNybyBvYmplY3RcbiAgICAgICAgICBpZiBwYWlyWzBdID09IDE2ICMgMTYgPT0gREVMQVlcblxuICAgICAgICAgICAgIyBGaW5kcyBtYWNybyBvYmplY3RcbiAgICAgICAgICAgIG1hY3JvID0gXy5maW5kV2hlcmUoTWFjcm9LZXlzLCB7IGRlbGF5OiB0cnVlIH0pXG5cbiAgICAgICAgICAgICMgQ2xvbmVzIHRoZSBtYWNybyBvYmplY3RcbiAgICAgICAgICAgIG1hY3JvID0gXy5jbG9uZShtYWNybylcblxuICAgICAgICAgICAgIyBBc3NpZ25zcyB0aGUgcHJvcGVyIG9yZGVyL2luZGV4IGFuZCBwb3NpdGlvbiBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAjIFRPRE8gLSB0aGlzIG11c3QgYmUgYWRqdXN0ZWQgZm9yIGRlbGF5LCBhbmQgb3RoZXJzXG4gICAgICAgICAgICBtYWNyby5wb3NpdGlvbiA9IDNcblxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIG1hY3JvID0gXy5maW5kV2hlcmUoTWFjcm9LZXlzLCB7IGRlYzogcGFpclsxXSB9KVxuXG4gICAgICAgICAgICAjIENsb25lcyB0aGUgbWFjcm8gb2JqZWN0XG4gICAgICAgICAgICBtYWNybyA9IF8uY2xvbmUobWFjcm8pXG5cbiAgICAgICAgICAgICMgQXNzaWduc3MgdGhlIHByb3BlciBvcmRlci9pbmRleCBhbmQgcG9zaXRpb24gYXR0cmlidXRlc1xuICAgICAgICAgICAgbWFjcm8ucG9zaXRpb24gPSBwb3NpdGlvblxuXG4gICAgICAgICAgIyBBcHBlbmRzIHRoZSBtYWNybyB0aGUgdGhlIGBtYWNyb3NgIGFycmF5XG4gICAgICAgICAgbWFjcm9zLnB1c2gobWFjcm8pXG5cbiAgICAgICAgIyBJdGVyYXRlcyBvdmVyIHRoZSBtYWNyb3MgX2FnYWluXyAtIHRoaXMgdGltZSB0byBtZXJnZSBrZXl1cC9rZXlkb3duIGFjdGlvbnNcbiAgICAgICAgcGFyc2VkSW5kZXggPSAwXG4gICAgICAgIGl0ZXJhdGVJbmRleCA9IDBcbiAgICAgICAgd2hpbGUgaXRlcmF0ZUluZGV4IDwgbWFjcm9zLmxlbmd0aFxuXG4gICAgICAgICAgIyBJc29sYXRlcyB0aGUgY3VycmVudCBhbmQgbmV4dCBtYWNyb3MgaW4gdGhlIGFycmF5XG4gICAgICAgICAgbWFjcm8gPSBtYWNyb3NbaXRlcmF0ZUluZGV4XVxuICAgICAgICAgIG5leHRNYWNybyA9IG1hY3Jvc1tpdGVyYXRlSW5kZXggKyAxXVxuXG4gICAgICAgICAgIyBSZXR1cm5zIGlmIG5leHRNYWNybyBpcyB1bmRlZmluZWRcbiAgICAgICAgICBpZiAhbmV4dE1hY3JvXG4gICAgICAgICAgICBtYWNyby5vcmRlciA9IHBhcnNlZEluZGV4XG4gICAgICAgICAgICBwYXJzZWRJbmRleCsrXG4gICAgICAgICAgICBwYXJzZWRNYWNyb3MucHVzaChtYWNybylcbiAgICAgICAgICAgIGl0ZXJhdGVJbmRleCsrXG4gICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgIyAjIENvbnRpbnVlcyBjaGVjayBpZiB0aGUgbWFjcm8gaXMgYSBjb3JyZXNwb25kaW5nIEtFWV9VUFxuICAgICAgICAgICMgaWYgbWFjcm8ucG9zaXRpb24gPT0gMSAmJiBuZXh0TWFjcm8ucG9zaXRpb24gPT0gMiAmJiBtYWNyby5rZXkgPT0gbmV4dE1hY3JvLmtleVxuXG4gICAgICAgICAgIyAgICMgS0VZX1BSRVNTXG4gICAgICAgICAgIyAgIG1hY3JvLnBvc2l0aW9uID0gM1xuXG4gICAgICAgICAgIyAgICMgQXBwZW5kcyB0aGUgbWFjcm8gdG8gdGhlIHBhcnNlZE1hY3JvcyBhcnJheVxuICAgICAgICAgICMgICBtYWNyby5vcmRlciA9IHBhcnNlZEluZGV4XG4gICAgICAgICAgIyAgIHBhcnNlZEluZGV4KytcbiAgICAgICAgICAjICAgcGFyc2VkTWFjcm9zLnB1c2gobWFjcm8pXG5cbiAgICAgICAgICAjICAgIyBJdGVyYXRlcywgc2tpcHBpbmcgdGhlIG1hdGNoZWQgbWFjcm9cbiAgICAgICAgICAjICAgaXRlcmF0ZUluZGV4ID0gaXRlcmF0ZUluZGV4ICsgMlxuICAgICAgICAgICMgICBjb250aW51ZVxuXG4gICAgICAgICAgIyBOb24tUmVwZWF0ZWQgLSBzdGFuZGFyZCBwcm9jZWR1cmVcbiAgICAgICAgICBtYWNyby5vcmRlciA9IHBhcnNlZEluZGV4XG4gICAgICAgICAgcGFyc2VkSW5kZXgrK1xuICAgICAgICAgIHBhcnNlZE1hY3Jvcy5wdXNoKG1hY3JvKVxuICAgICAgICAgIGl0ZXJhdGVJbmRleCsrXG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICAjIFNldHMgdGhlIE1hY3JvcyBvbiB0aGUgQXN0cm9rZXlDb25maWcgbW9kZWxcbiAgICAgICAgY29uZmlnID0gQGdldCgnY29uZmlnJylcbiAgICAgICAgY29uZmlnLmdldCgnbWFjcm9zJykucmVzZXQocGFyc2VkTWFjcm9zKVxuXG4gICAgICAgICMgUmVzb2x2ZXMgdGhlIFByb21pc2Ugd2l0aCB0aGUgcGFyc2VkIG1hY3Jvc1xuICAgICAgICByZXR1cm4gcmVzb2x2ZShtYWNyb3MpXG4gICAgICApXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBBc3Ryb2tleUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBBc3Ryb2tleU1vZGVsXG4gIGNvbXBhcmF0b3I6ICdvcmRlcidcblxuIyAjICMgIyAjXG5cbiMgRGV2aWNlTW9kZWwgZGVmaW5pdGlvblxuY2xhc3MgRGV2aWNlTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIEJhY2tib25lLlJlbGF0aW9uYWwgLSBAcmVsYXRpb25zIGRlZmluaXRpb25cbiAgcmVsYXRpb25zOiBbXG4gICAgICB0eXBlOiAgICAgICAgICAgQmFja2JvbmUuSGFzTWFueVxuICAgICAga2V5OiAgICAgICAgICAgICdrZXlzJ1xuICAgICAgcmVsYXRlZE1vZGVsOiAgIEFzdHJva2V5TW9kZWxcbiAgICAgIGNvbGxlY3Rpb25UeXBlOiBBc3Ryb2tleUNvbGxlY3Rpb25cbiAgXVxuXG4jICMgIyAjICNcblxuIyBEZXZpY2VDb2xsZWN0aW9uIGRlZmluaXRpb25cbmNsYXNzIERldmljZUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBEZXZpY2VNb2RlbFxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPVxuICBNb2RlbDogICAgICBEZXZpY2VNb2RlbFxuICBDb2xsZWN0aW9uOiBEZXZpY2VDb2xsZWN0aW9uXG4iLCJFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKVxuRGV2aWNlRGF0YSA9IHJlcXVpcmUoJy4vZGF0YScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VGYWN0b3J5IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAnZGV2aWNlIG1vZGVsJzogICAgICAgJ2dldE1vZGVsJ1xuICAgICdkZXZpY2UgY29sbGVjdGlvbic6ICAnZ2V0Q29sbGVjdGlvbidcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjYWNoZWRDb2xsZWN0aW9uID0gbmV3IEVudGl0aWVzLkNvbGxlY3Rpb24oRGV2aWNlRGF0YSwgeyBwYXJzZTogdHJ1ZSB9KVxuXG4gIGdldE1vZGVsOiAoaWQpIC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uLmdldChpZClcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBAY2FjaGVkQ29sbGVjdGlvblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRGV2aWNlRmFjdG9yeSgpXG4iLCJMYXlvdXRWaWV3ICA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jICMgIyAjICNcblxuY2xhc3MgSG9tZVJvdXRlIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGUnXG5cbiAgdGl0bGU6ICdBc3Ryb0tleSBIb21lJ1xuXG4gIGJyZWFkY3J1bWJzOiBbeyB0ZXh0OiAnRGV2aWNlJyB9XVxuXG4gIGZldGNoOiAtPlxuICAgIEBkZXZpY2VNb2RlbCA9IFJhZGlvLmNoYW5uZWwoJ2RldmljZScpLnJlcXVlc3QoJ21vZGVsJywgJ2RldmljZV8xJylcblxuICByZW5kZXI6IC0+XG4gICAgY29uc29sZS5sb2coQGRldmljZU1vZGVsKTsgIyBEZWJ1Z1xuICAgIEBjb250YWluZXIuc2hvdyBuZXcgTGF5b3V0Vmlldyh7IG1vZGVsOiBAZGV2aWNlTW9kZWwgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSG9tZVJvdXRlXG4iLCJcbmNsYXNzIEhvbWVMYXlvdXRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9sYXlvdXQnXG4gIGNsYXNzTmFtZTogJ2NvbnRhaW5lci1mbHVpZCBoLTEwMCdcblxuIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWVMYXlvdXRWaWV3XG5cblxuXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3cgaC0xMDBcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PHAgY2xhc3M9XFxcImxlYWRcXFwiPkFzdHJvS2V5PC9wPjxoci8+PHAgY2xhc3M9XFxcImxlYWRcXFwiPkNvbm5lY3QgYW4gQXN0cm9LZXkgZGV2aWNlIHRvIGdldCBzdGFydGVkPC9wPjxoci8+PGEgaHJlZj1cXFwiI2RldmljZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tb3V0bGluZS1wcmltYXJ5XFxcIj5ERVZJQ0U8L2E+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInJlcXVpcmUgJy4vZmFjdG9yeSdcbkhvbWVSb3V0ZSA9IHJlcXVpcmUgJy4vaG9tZS9yb3V0ZSdcbkRhc2hib2FyZFJvdXRlID0gcmVxdWlyZSAnLi9kYXNoYm9hcmQvcm91dGUnXG5cbiMgIyAjICMgI1xuXG4jIE1haW5Sb3V0ZXIgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgTWFpblJvdXRlciBleHRlbmRzIHJlcXVpcmUgJ2huX3JvdXRpbmcvbGliL3JvdXRlcidcblxuICByb3V0ZXM6XG4gICAgJygvKSc6ICdob21lJ1xuXG4gIGhvbWU6IC0+XG4gICAgbmV3IERhc2hib2FyZFJvdXRlKHsgY29udGFpbmVyOiBAY29udGFpbmVyIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1haW5Sb3V0ZXJcbiIsIlxuIyBGaWx0ZXJzIHVzZWQgdG8gcXVlcnkgV2ViVVNCIGRldmljZXNcbiMgVE9ETyAtIHVwZGF0ZSBmaWx0ZXJzIHRvIHF1ZXJ5IGRldmljZXMgYnkgQXN0cm9LZXkgVmVuZG9ySURcbnJlcXVlc3REZXZpY2VGaWx0ZXJzID0gW1xuICB7IHZlbmRvcklkOiAweDEwYzQgfVxuXVxuXG4jICMgIyAjXG5cbiMgQ2hyb21lV2ViVXNiU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIFJlc3BvbnNpYmxlIGZvciBtYW5hZ2luZyBVU0IgZGV2aWNlc1xuIyAtIGZldGNoIGFsbCBkZXZpY2VzXG4jIC0gd3JpdGluZyBkYXRhIHRvIGEgZGV2aWNlXG4jIC0gcmVhZGluZyBkYXRhIGZyb20gYSBkZXZpY2VcbiMgLSB3cml0ZSBmaXJtd2FyZSB0byBhIGRldmljZVxuY2xhc3MgQ2hyb21lV2ViVXNiU2VydmljZSBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ3VzYiBkZXZpY2VzJzogICAgICAnZ2V0RGV2aWNlcydcbiAgICAndXNiIHJlYWQ6bWFjcm8nOiAgICdyZWFkTWFjcm8nXG4gICAgJ3VzYiB3cml0ZTptYWNybyc6ICAnd3JpdGVNYWNybydcblxuICAjIGdldERldmljZXNcbiAgZ2V0RGV2aWNlczogLT5cblxuICAgICMgUmV0dXJucyBhIFByb21pc2UgdG8gbWFuYWdlIGFzeW5jaG9ub3VzIGJlaGF2aW9yXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG5cbiAgICAgICMgU3RlcCAxIC0gUmVxdWVzdCBkZXZpY2VcbiAgICAgIG5hdmlnYXRvci51c2IucmVxdWVzdERldmljZSh7IGZpbHRlcnM6IHJlcXVlc3REZXZpY2VGaWx0ZXJzIH0pXG4gICAgICAudGhlbiggKGRldmljZSkgPT5cblxuICAgICAgICAjIFRPRE8gLSByZW1vdmVcbiAgICAgICAgIyBjb25zb2xlLmxvZyBkZXZpY2VcblxuICAgICAgICAjIFN0ZXAgMiAtIEdldCBEZXZpY2VzXG4gICAgICAgICMgVE9ETyAtIHZlcmlmeSB0aGlzIHdvcmtmbG93XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNiLmdldERldmljZXMoKVxuICAgICAgICAudGhlbigoZCkgPT5cblxuICAgICAgICAgIGNvbnNvbGUubG9nKGQpXG5cbiAgICAgICAgICBkID0gZFswXVxuXG4gICAgICAgICAgIyBTVEVQIDMgLSBvcGVuIGRldmljZVxuICAgICAgICAgIGQub3BlbigpLnRoZW4gPT5cblxuICAgICAgICAgICAgY29uc29sZS5sb2cgJ29wZW4nXG5cbiAgICAgICAgICAgICMgU3RlcCA0IC0gc2VsZWN0IGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICAgIGQuc2VsZWN0Q29uZmlndXJhdGlvbigxKS50aGVuID0+XG5cbiAgICAgICAgICAgICAgIyBjb25zb2xlLmxvZyAnc2VsZWN0Q29uZmlndXJhdGlvbidcblxuICAgICAgICAgICAgICAjIFRPRE8gLSByZW1vdmVcbiAgICAgICAgICAgICAgd2luZG93LmQgPSBkXG5cbiAgICAgICAgICAgICAgIyBSZXNvbHZlcyB3aXRoIGRldmljZVxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShkKVxuXG4gICAgICAgICAgICAgICMgd0luZGV4IC0gUmVxdWVzdCB0eXBlICgweDAxIGZvciBzZXQgbWFjcm8pXG4gICAgICAgICAgICAgICMgd1ZhbHVlIC0gTWFjcm8gaW5kZXggKDAgLSA0IGluY2x1c2l2ZSlcbiAgICAgICAgICAgICAgIyBiUmVxdWVzdCAtIDMgKGhhcmRjb2RlZClcbiAgICAgICAgICAgICAgIyB3TGVuZ3RoIC0gbnVtYmVyIG9mIGJ5dGVzIChzaG91bGQgYmUgbWFjcm8gbGVuZ3RoICogMilcblxuICAgICAgICAgICAgICAjIGQuY29udHJvbFRyYW5zZmVyT3V0KFxuICAgICAgICAgICAgICAjICAge1xuICAgICAgICAgICAgICAjICAgICAncmVxdWVzdFR5cGUnOiAndmVuZG9yJyxcbiAgICAgICAgICAgICAgIyAgICAgJ3JlY2lwaWVudCc6ICdkZXZpY2UnLFxuICAgICAgICAgICAgICAjICAgICAncmVxdWVzdCc6IDB4MDMsXG4gICAgICAgICAgICAgICMgICAgICd2YWx1ZSc6IDB4MDAwMCxcbiAgICAgICAgICAgICAgIyAgICAgJ2luZGV4JzogMHgwMVxuICAgICAgICAgICAgICAjICAgfSwgbmV3IFVpbnQ4QXJyYXkoWzEsNCwyLDRdKS5idWZmZXJcbiAgICAgICAgICAgICAgIyApLnRoZW4oIChyZXNwb25zZSkgPT4geyBjb25zb2xlLmxvZyhyZXNwb25zZSkgfSlcblxuICAgICAgICAgICAgICAjIFNURVAgNSAtIGNvbnRyb2xUcmFuc2ZlckluXG4gICAgICAgICAgICAgICMgd2luZG93LmQuY29udHJvbFRyYW5zZmVySW4oeydyZXF1ZXN0VHlwZSc6ICdzdGFuZGFyZCcsICdyZWNpcGllbnQnOiAnZGV2aWNlJywgJ3JlcXVlc3QnOiAweDA2LCAndmFsdWUnOiAweDBGMDAsICdpbmRleCc6IDB4MDB9LCA1KS50aGVuKCAocikgPT4geyBjb25zb2xlLmxvZyhyKSB9KVxuXG5cbiAgICAgICAgKVxuICAgICAgICAjIGdldERldmljZXMgRXJyb3IgaGFuZGxpbmdcbiAgICAgICAgLmNhdGNoKChlcnIpID0+XG4gICAgICAgICAgY29uc29sZS5sb2cgJ0VSUiAtIG5hdmlnYXRvci51c2IuZ2V0RGV2aWNlcygpJ1xuICAgICAgICApXG5cbiAgICAgIClcblxuICAjIHJlYWRNYWNyb1xuICByZWFkTWFjcm86IChtYWNyb0luZGV4ID0gMHgwMDAwKSAtPlxuXG4gICAgIyBSZXR1cm5zIGEgUHJvbWlzZSB0byBtYW5hZ2UgYXN5bmNob25vdXMgYmVoYXZpb3JcbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgIyBUT0RPIC0gbW92ZSB0byBjb25zdGFudHNcbiAgICAgIHRyYW5zZmVyT3B0aW9ucyA9IHtcbiAgICAgICAgJ3JlcXVlc3RUeXBlJzogICd2ZW5kb3InLFxuICAgICAgICAncmVjaXBpZW50JzogICAgJ2RldmljZScsXG4gICAgICAgICdyZXF1ZXN0JzogICAgICAweDAzLFxuICAgICAgICAndmFsdWUnOiAgICAgICAgbWFjcm9JbmRleCxcbiAgICAgICAgJ2luZGV4JzogICAgICAgIDB4MDJcbiAgICAgIH1cblxuICAgICAgIyBkZXZpY2UuY29udHJvbFRyYW5zZmVySW4gKFJFQURTIERBVEEgRlJPTSBERVZJQ0UpXG4gICAgICAjIFRPRE8gLSBhYnN0cmFjdCB0aGUgY29udHJvbFRyYW5zZmVySW4gcmVxdWVzdCBvYmplY3QgaW50byBhIGNvbnN0YW50IChjbG9uZWQgZWFjaCB0aW1lKVxuICAgICAgZC5jb250cm9sVHJhbnNmZXJJbih0cmFuc2Zlck9wdGlvbnMsIDI1NikgIyBUT0RPIC0gJzI1Nicgc2hvdWxkIGJlICcxMjgnXG4gICAgICAudGhlbiggKHJlc3BvbnNlKSA9PlxuICAgICAgICBjb25zb2xlLmxvZyAncmVhZE1hY3JvIHJlc3BvbnNlOidcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgIHJldHVybiByZXNvbHZlKG5ldyBVaW50OEFycmF5KHJlc3BvbnNlLmRhdGEuYnVmZmVyKSlcbiAgICAgIClcbiAgICAgIC5jYXRjaCggKGVycikgPT5cbiAgICAgICAgY29uc29sZS5sb2cgJ3JlYWRNYWNybyBlcnJvcjonXG4gICAgICAgIGNvbnNvbGUubG9nIGVyclxuICAgICAgICByZXR1cm4gcmVqZWN0KGVycilcbiAgICAgIClcblxuICAjIHdyaXRlTWFjcm9cbiAgd3JpdGVNYWNybzogKG1hY3JvSW5kZXgsIGRhdGEpIC0+XG5cbiAgICAjIFJldHVybnMgYSBQcm9taXNlIHRvIG1hbmFnZSBhc3luY2hvbm91cyBiZWhhdmlvclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuXG4gICAgICAjIHdJbmRleCAtIFJlcXVlc3QgdHlwZSAoMHgwMSBmb3Igc2V0IG1hY3JvKVxuICAgICAgIyB3VmFsdWUgLSBNYWNybyBpbmRleCAoMCAtIDQgaW5jbHVzaXZlKVxuICAgICAgIyBiUmVxdWVzdCAtIDMgKGhhcmRjb2RlZClcbiAgICAgICMgd0xlbmd0aCAtIG51bWJlciBvZiBieXRlcyAoc2hvdWxkIGJlIG1hY3JvIGxlbmd0aCAqIDIpXG4gICAgICByZXF1ZXN0T2JqID0ge1xuICAgICAgICAgICdyZXF1ZXN0VHlwZSc6ICAndmVuZG9yJyxcbiAgICAgICAgICAncmVjaXBpZW50JzogICAgJ2RldmljZScsXG4gICAgICAgICAgJ3JlcXVlc3QnOiAgICAgIDB4MDMsICMgVE9ETyAtIGRvY3VtZW50XG4gICAgICAgICAgJ3ZhbHVlJzogICAgICAgIG1hY3JvSW5kZXgsXG4gICAgICAgICAgJ2luZGV4JzogICAgICAgIDB4MDEgIyBUT0RPIC0gV2UgY2FuIHVzZSBpbmRleCBmb3IgdGhlIGtleSB0aGUgbWFjcm8gY29ycmVzcG9uZHMgdG8gKGxvdy1ieXRlID0ga2V5LCBoaWdoLWJ5dGUgPSBudW1iZXIgb2YgYWN0aW9ucyBpbiB0aGUgbWFjcm8pXG4gICAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2cgcmVxdWVzdE9ialxuXG4gICAgICByZXR1cm4gZC5jb250cm9sVHJhbnNmZXJPdXQocmVxdWVzdE9iaiwgbmV3IFVpbnQ4QXJyYXkoZGF0YSkuYnVmZmVyKVxuICAgICAgLnRoZW4oIChyZXNwb25zZSkgPT5cbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgIHJldHVybiByZXNvbHZlKHJlc3BvbnNlKVxuICAgICAgKVxuICAgICAgLmNhdGNoKCAoZXJyKSA9PlxuICAgICAgICBjb25zb2xlLmxvZyAnRVJST1IgU0VORElORyBNQUNSTydcbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpXG4gICAgICApXG5cblxuIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBDaHJvbWVXZWJVc2JTZXJ2aWNlKClcbiIsbnVsbCwiXG4jIFByb3ZpZGVzIHVwZGF0ZUF0dHJzIG1ldGhvZCB1c2VkIGJ5IGJpbmRDaGVja2JveGVzLCBiaW5kSW5wdXRzLCBiaW5kUmFkaW9zLCBiaW5kU2VsZWN0c1xuY2xhc3MgQmluZEJhc2UgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgdXBkYXRlQXR0cnM6IChlKSAtPlxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBAdmlldy5tb2RlbC5zZXQoQmFja2JvbmUuU3lwaG9uLnNlcmlhbGl6ZShAKSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQmluZEJhc2VcbiIsIlxuIyBEYXRhYmluZGluZyBmb3IgZm9ybSBpbnB1dHNcbmNsYXNzIEJpbmRJbnB1dHMgZXh0ZW5kcyByZXF1aXJlICcuL2JpbmRCYXNlJ1xuXG4gIGV2ZW50czpcbiAgICAnaW5wdXQgaW5wdXQnOiAgJ3VwZGF0ZUF0dHJzJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5kSW5wdXRzXG4iLCJcbl9zZW5kRmxhc2ggPSAodHlwZSwgb2JqKSAtPlxuICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdmbGFzaCcpLnRyaWdnZXIodHlwZSwgb2JqKVxuXG4jICMgIyAjICNcblxuY2xhc3MgRmxhc2hlc0JlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zPXt9KSAtPlxuICAgIEB2aWV3Ll9mbGFzaGVzICAgICAgPSBAb3B0aW9uc1xuICAgIEB2aWV3LmZsYXNoRXJyb3IgICAgPSBAZmxhc2hFcnJvclxuICAgIEB2aWV3LmZsYXNoU3VjY2VzcyAgPSBAZmxhc2hTdWNjZXNzXG5cbiAgZmxhc2hFcnJvcjogKG9iaj17fSkgLT5cbiAgICBfc2VuZEZsYXNoKCdlcnJvcicsIEBfZmxhc2hlc1snZXJyb3InXSB8fCBvYmopXG5cbiAgZmxhc2hTdWNjZXNzOiAob2JqPXt9KSAtPlxuICAgIF9zZW5kRmxhc2goJ3N1Y2Nlc3MnLCBAX2ZsYXNoZXNbJ3N1Y2Nlc3MnXSB8fCBvYmopXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoZXNCZWhhdmlvclxuIiwiXG5jbGFzcyBNb2RlbEV2ZW50c0JlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdyZXF1ZXN0JzogICdvbk1vZGVsUmVxdWVzdCdcbiAgICAnc3luYyc6ICAgICAnb25Nb2RlbFN5bmMnXG4gICAgJ2Vycm9yJzogICAgJ29uTW9kZWxFcnJvcidcblxuICBvbk1vZGVsUmVxdWVzdDogKG1vZGVsLCBzdGF0dXMsIG9wdGlvbnMpIC0+XG4gICAgQHZpZXcub25SZXF1ZXN0Pyhtb2RlbCwgc3RhdHVzLCBvcHRpb25zKVxuXG4gIG9uTW9kZWxTeW5jOiAobW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKSAtPlxuICAgIEB2aWV3Lm9uU3luYz8obW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKVxuXG4gIG9uTW9kZWxFcnJvcjogKG1vZGVsLCByZXNwb25zZSwgb3B0aW9ucykgLT5cbiAgICBAdmlldy5vbkVycm9yPyhtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVsRXZlbnRzQmVoYXZpb3JcbiIsIlxuIyBTdWJtaXRCdXR0b25CZWhhdmlvciBjbGFzcyBkZWZpbml0aW9uXG4jIFByb3ZpZGVzIGFuIGV2ZW50IGxpc3RlbmVyIGFuZCBoYW5kbGVyLCBhbmQgZGVmaW5lc1xuIyBhc3NvY2lhdGVkIGNhbGxiYWNrcyBvbiB0aGUgdmlldyB0byB3aGljaCB0aGUgYmVoYXZpb3JcbiMgaXMgYXR0YWNoZWQuIFRoaXMgaXMgdXNlZCBpbiB0aGUgUGFzc3dvcmQgYW5kIFNuaXBwZXQgZm9ybXMuXG5jbGFzcyBTdWJtaXRCdXR0b25CZWhhdmlvciBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1aTpcbiAgICBzdWJtaXQ6ICdbZGF0YS1jbGljaz1zdWJtaXRdJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLnN1Ym1pdDpub3QoLmRpc2FibGVkKSc6ICdvblN1Ym1pdENsaWNrJ1xuXG4gIGluaXRpYWxpemU6IChvcHRpb25zPXt9KSAtPlxuICAgIEB2aWV3LmRpc2FibGVTdWJtaXQgPSA9PiBAZGlzYWJsZVN1Ym1pdCgpXG4gICAgQHZpZXcuZW5hYmxlU3VibWl0ICA9ID0+IEBlbmFibGVTdWJtaXQoKVxuXG4gIG9uU3VibWl0Q2xpY2s6IChlKSAtPiBAdmlldy5vblN1Ym1pdD8oZSlcbiAgZGlzYWJsZVN1Ym1pdDogLT4gQHVpLnN1Ym1pdC5hZGRDbGFzcygnZGlzYWJsZWQnKVxuICBlbmFibGVTdWJtaXQ6IC0+ICBAdWkuc3VibWl0LnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN1Ym1pdEJ1dHRvbkJlaGF2aW9yXG4iLCJcbmNsYXNzIFRvb2x0aXBCZWhhdmlvciBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1aTpcbiAgICB0b29sdGlwczogJ1tkYXRhLXRvZ2dsZT10b29sdGlwXSdcblxuICBpbml0aWFsaXplOiAtPlxuICAgICMgUHJveGllcyBjbGVhciBtZXRob2QgdG8gYmUgYWNjZXNzaWJsZSBpbnNpZGUgdGhlIHZpZXdcbiAgICBAdmlldy5jbGVhclRvb2x0aXBzID0gPT4gQGNsZWFyKClcblxuICBjbGVhcjogLT5cbiAgICBAdWkudG9vbHRpcHMudG9vbHRpcCgnaGlkZScpXG4gICAgQHVpLnRvb2x0aXBzLnRvb2x0aXAoJ2Rpc3Bvc2UnKVxuXG4gIG9uUmVuZGVyOiAtPiBAdWkudG9vbHRpcHM/LnRvb2x0aXAoKVxuICBvbkJlZm9yZURlc3Ryb3k6IC0+IEBjbGVhcigpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRvb2x0aXBCZWhhdmlvclxuIiwiXG4jIEFzc2lnbnMgTWFyaW9uZXR0ZS5EZWNvcmF0b3Jcbk1hcmlvbmV0dGUuRGVjb3JhdG9yID0gcmVxdWlyZSAnLi9kZWNvcmF0b3InXG5cbiMgT3ZlcnJpZGVzIGRlZmF1bHQgc2VyaWFsaXplTW9kZWwoKSBtZXRob2QgZGVmaW5pdGlvblxuIyBJbiB0aGUgY29udGV4dCB0aGUgc2VyaWFsaXplTW9kZWwgbWV0aG9kLCAndGhpcydcbiMgcmVmZXJzIHRvIHRoZSB2aWV3IGluc3RhbmNlIGluc2lkZSB3aGljaCB0aGVcbiMgc2VyaWFsaXplTW9kZWwgbWV0aG9kIHdhcyBpbnZva2VkXG5NYXJpb25ldHRlLlZpZXcucHJvdG90eXBlLnNlcmlhbGl6ZU1vZGVsID0gLT5cblxuICAjIElmIHRoaXMubW9kZWwgaXMgbm90IGRlZmluZWQsIHJldHVybiBhbiBlbXB0eSBvYmplY3RcbiAgaWYgIXRoaXMubW9kZWxcbiAgICByZXR1cm4ge31cblxuICAjIElmIHRoaXMubW9kZWwgZXhpc3RzLCBhbmQgaGFzIGEgZGVjb3JhdG9yIGRlZmluZWQsXG4gICMgcmV0dXJuIHRoZSB0aGlzLm1vZGVsJ3MgYXR0cmlidXRlcyBhbmQgZGVjb3JhdGlvbnNcbiAgZWxzZSBpZiB0aGlzLm1vZGVsLmRlY29yYXRvclxuICAgIHJldHVybiB0aGlzLm1vZGVsLmRlY29yYXRvci5kZWNvcmF0ZSh0aGlzLm1vZGVsKVxuXG4gICMgT3RoZXJ3aXNlLCByZXR1cm4gdGhlIGNsb25lZCBhdHRyaWJ1dGVzIG9mIHRoaXMubW9kZWxcbiAgcmV0dXJuIF8uY2xvbmUgdGhpcy5tb2RlbC5hdHRyaWJ1dGVzXG4iLCJcbiMgQmFzZURlY29yYXRvciBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBzaW1wbGUgY2xhc3MgdG8gZGVjb3JhdGUgbW9kZWxzIHdoZW5cbiMgdGhleSBhcmUgc2VyaWFsaXplZCBpbnRvIGEgdmlldydzIHRlbXBsYXRlXG5jbGFzcyBCYXNlRGVjb3JhdG9yXG5cbiAgIyBEZWNvcmF0aW9uIG1ldGhvZFxuICAjIEludm9rZWQgaW4gTWFyaW9uZXR0ZS5WaWV3LnByb3RvdHlwZS5zZXJpYWxpemVNb2RlbFxuICBAZGVjb3JhdGU6IChtb2RlbCkgLT5cblxuICAgICMgQ2xvbmVzIG1vZGVsJ3MgYXR0cmlidXRlc1xuICAgICMgQ2xvbmluZyBwcmV2ZW50cyBjb250YW1pbmF0aW9uIG9mXG4gICAgZGF0YSA9IF8uY2xvbmUobW9kZWwuYXR0cmlidXRlcylcblxuICAgICMgSXRlcmF0ZXMgb3ZlciBlYWNoIGZ1bmN0aW9uIGluIHByb3RvdHlwZVxuICAgICMgTGV2ZXJhZ2VzIFVuZGVyc2NvcmUuanMgXy5mdW5jdGlvbnMoKVxuICAgIGZvciBmdW5jIGluIF8uZnVuY3Rpb25zKEBwcm90b3R5cGUpXG5cbiAgICAgICMgU2tpcCBjb25zdHJ1Y3RvclxuICAgICAgY29udGludWUgaWYgZnVuYyA9PSAnY29uc3RydWN0b3InXG5cbiAgICAgICMgQXNzaWducyB2YWx1ZSBvZiBmdW5jdGlvbiB0byBoYXNoXG4gICAgICBkYXRhW2Z1bmNdID0gQHByb3RvdHlwZVtmdW5jXS5hcHBseShtb2RlbClcblxuICAgICMgUmV0dXJucyB0aGUgbW9kZWwncyBhdHRyaWJ1dGVzICYgZGVjb3JhdGlvbnNcbiAgICByZXR1cm4gZGF0YVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlRGVjb3JhdG9yXG4iLCJcbiMgRmxhc2hDb2xsZWN0aW9uIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIEJhY2tib25lLkNvbGxlY3Rpb24gdG8gYmUgdXNlZCBieSB0aGVcbiMgRmxhc2hDb21wb25lbnQgZm9yIHN0b3JpbmcgbXVsdGlwbGUgZmxhc2ggbW9kZWxzXG5jbGFzcyBGbGFzaENvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiByZXF1aXJlICcuL21vZGVsJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaENvbGxlY3Rpb25cbiIsInJlcXVpcmUgJy4vc2VydmljZSdcbkZsYXNoTGlzdCA9IHJlcXVpcmUgJy4vdmlld3MvZmxhc2hMaXN0J1xuXG4jICMgIyAjICNcblxuIyBGbGFzaFNlcnZpY2UgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgY29tcG9uZW50IHRvIGNyZWF0ZSBhbmQgZGlzcGxheSBmbGFzaGVzXG4jIGluIHRoZSBhcHAuIFByb3ZpZGVzIG11bHRpcGxlIGludGVyZmFjZXMgaW4gcmFkaW9FdmVudHNcbiMgdG8gaGFuZGxlIGNvbW1vbiB0eXBlcyBvZiBmbGFzaGVzIChlcnJvciwgd2FybmluZywgc3VjY2VzcylcbmNsYXNzIEZsYXNoQ29tcG9uZW50IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdmbGFzaCcpLnJlcXVlc3QoJ2NvbGxlY3Rpb24nKS50aGVuIChjb2xsZWN0aW9uKSA9PlxuICAgICAgQGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uXG4gICAgICBAY29sbGVjdGlvbi5vbiAndXBkYXRlJywgQHNob3dMaXN0VmlldywgQFxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdmbGFzaCBhZGQnOiAgICAgICdhZGQnXG4gICAgJ2ZsYXNoIHJlc2V0JzogICAgJ3Jlc2V0J1xuICAgICdmbGFzaCBlcnJvcic6ICAgICdlcnJvcidcbiAgICAnZmxhc2ggd2FybmluZyc6ICAnd2FybmluZydcbiAgICAnZmxhc2ggc3VjY2Vzcyc6ICAnc3VjY2VzcydcblxuICBhZGQ6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbGxlY3Rpb24uYWRkKG9wdGlvbnMpXG5cbiAgcmVzZXQ6IC0+XG4gICAgQGNvbGxlY3Rpb24ucmVzZXQoKVxuXG4gIGVycm9yOiAob3B0aW9ucz17fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQgXy5leHRlbmQoIG9wdGlvbnMsIHsgY29udGV4dDogICdkYW5nZXInIH0pXG5cbiAgd2FybmluZzogKG9wdGlvbnM9e30pIC0+XG4gICAgQGNvbGxlY3Rpb24uYWRkIF8uZXh0ZW5kKCBvcHRpb25zLCB7IGNvbnRleHQ6ICAnd2FybmluZycgfSlcblxuICBzdWNjZXNzOiAob3B0aW9ucz17fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQgXy5leHRlbmQoIG9wdGlvbnMsIHsgY29udGV4dDogICdzdWNjZXNzJyB9KVxuXG4gIHNob3dMaXN0VmlldzogPT5cbiAgICB1bmxlc3MgQHJlbmRlcmVkXG4gICAgICBAY29udGFpbmVyLnNob3cgbmV3IEZsYXNoTGlzdCh7IGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uIH0pXG4gICAgICBAcmVuZGVyZWQgPSB0cnVlXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoQ29tcG9uZW50XG4iLCJcbiMgRmxhc2hNb2RlbCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBiYXNpYyBCYWNrYm9uZS5Nb2RlbCB0byBtYW5hZ2Ugdmlld3NcbiMgZGlzcGxheWVkIGluIHRoZSBGbGFzaENvbXBvbmVudFxuY2xhc3MgRmxhc2hNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cbiAgZGVmYXVsdHM6XG4gICAgdGltZW91dDogNTAwMFxuICAgIGRpc21pc3NpYmxlOiB0cnVlXG4gICAgY29udGV4dDogJ2luZm8nXG5cbiAgIyBBbGVydCBNb2RlbCBBdHRyaWJ1dGVzIC8gT3B0aW9uc1xuICAjIC0gbWVzc2FnZVxuICAjIC0gc3Ryb25nVGV4dCAocGxlYXNlIHJlbmFtZSB0byAnc3Ryb25nJyAmIGFkZCBhcHByb3ByaWF0ZSBzcGFjaW5nIHRvIHRlbXBsYXRlKVxuICAjIC0gY29udGV4dENsYXNzIChwbGVhc2UgcmVuYW1lIHRvICdjb250ZXh0JylcbiAgIyAtIHRpbWVvdXQgKGRlZmF1bHQgaXMgNSBzZWNvbmRzKVxuICAjIC0gZGlzbWlzc2libGUgKGRlZmF1bHQgaXMgdHJ1ZSlcblxuICBkaXNtaXNzOiAtPlxuICAgIEBjb2xsZWN0aW9uLnJlbW92ZShAKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaE1vZGVsXG4iLCJGbGFzaENvbGxlY3Rpb24gPSByZXF1aXJlICcuL2NvbGxlY3Rpb24nXG5cbiMgIyAjICMgI1xuXG4jIEZsYXNoU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZWQgYSBiYXNpYyBzZXJ2aWNlIHRvIHJldHVybiB0aGUgRmxhc2hlc0NvbGxlY3Rpb25cbiMgd2hlbiByZXF1ZXN0ZWQuIFRoaXMgaXMgdXNlZCBieSB0aGUgRmxhc2hDb21wb25lbnQgdG8gcmV0cmlldmVcbiMgdGhlIEZsYXNoQ29sbGVjdGlvbiBpdCBpcyByZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nXG5jbGFzcyBGbGFzaFNlcnZpY2UgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb1JlcXVlc3RzOlxuICAgICdmbGFzaCBjb2xsZWN0aW9uJzogJ2dldENvbGxlY3Rpb24nXG5cbiAgYWxlcnRzOiBudWxsXG5cbiAgZ2V0Q29sbGVjdGlvbjogLT5cbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUscmVqZWN0KSA9PlxuICAgICAgQGFsZXJ0cyB8fD0gbmV3IEZsYXNoQ29sbGVjdGlvbigpXG4gICAgICByZXNvbHZlKEBhbGVydHMpXG4gICAgICByZXR1cm5cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEZsYXNoU2VydmljZSgpXG4iLCIjIEZsYXNoQ2hpbGQgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3IHRvIGRpc3BsYXkgYSBGbGFzaE1vZGVsIGluc3RhbmNlXG4jIFRoaXMgdmlldyBhdXRvLWRpc21pc3NlcyBhZnRlciB0aGUgdGltZW91dCBkZWZpbmVkIGluIHRoZSBGbGFzaE1vZGVsIGluc3RhbmNlXG5jbGFzcyBGbGFzaENoaWxkIGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdydcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2ZsYXNoX2NoaWxkJ1xuXG4gIGF0dHJpYnV0ZXM6XG4gICAgc3R5bGU6ICdkaXNwbGF5Om5vbmU7J1xuXG4gIHVpOlxuICAgIGNsb3NlOiAnW2RhdGEtY2xpY2s9ZGlzbWlzc10nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuY2xvc2UnOiAnZGlzbWlzcydcblxuICBvblNob3c6IC0+XG4gICAgdGltZW91dCA9IEBtb2RlbC5nZXQoJ3RpbWVvdXQnKVxuICAgIHNldFRpbWVvdXQoIEBkaXNtaXNzLCB0aW1lb3V0IClcblxuICBvbkF0dGFjaDogLT5cbiAgICBAJGVsLmZhZGVJbigpXG5cbiAgcmVtb3ZlOiAtPlxuICAgIEAkZWwuc2xpZGVUb2dnbGUoID0+XG4gICAgICBNYXJpb25ldHRlLkxheW91dFZpZXcucHJvdG90eXBlLnJlbW92ZS5jYWxsKEApXG4gICAgKVxuXG4gIGRpc21pc3M6ID0+XG4gICAgQG1vZGVsLmNvbGxlY3Rpb24/LnJlbW92ZSggQG1vZGVsIClcblxuIyBGbGFzaExpc3QgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlldyB0byB0aGUgbGlzdCBvZiBGbGFzaGVzXG5jbGFzcyBGbGFzaExpc3QgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIGNsYXNzTmFtZTogJ2NvbnRhaW5lci1mbHVpZCdcbiAgY2hpbGRWaWV3OiBGbGFzaENoaWxkXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoTGlzdFxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoY29udGV4dCwgZGlzbWlzc2libGUsIG1lc3NhZ2UsIHN0cm9uZykge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTIgdGV4dC1jZW50ZXJcXFwiPjxkaXYgcm9sZT1cXFwiYWxlcnRcXFwiXCIgKyAoamFkZS5jbHMoWydhbGVydCcsJ2FsZXJ0LWRpc21pc3NpYmxlJywnZmFkZScsJ2luJyxcImFsZXJ0LVwiICsgY29udGV4dF0sIFtudWxsLG51bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIGRpc21pc3NpYmxlKVxue1xuYnVmLnB1c2goXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1jbGljaz1cXFwiZGlzbWlzc1xcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJzci1vbmx5XFxcIj5DbG9zZTwvc3Bhbj48L2J1dHRvbj5cIik7XG59XG5pZiAoIHN0cm9uZylcbntcbmJ1Zi5wdXNoKFwiPHN0cm9uZz5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHN0cm9uZyArIFwiIFwiKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3N0cm9uZz5cIik7XG59XG5pZiAoIG1lc3NhZ2UpXG57XG5idWYucHVzaChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG1lc3NhZ2UpID8gXCJcIiA6IGphZGVfaW50ZXJwKSk7XG59XG5idWYucHVzaChcIjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImNvbnRleHRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNvbnRleHQ6dHlwZW9mIGNvbnRleHQhPT1cInVuZGVmaW5lZFwiP2NvbnRleHQ6dW5kZWZpbmVkLFwiZGlzbWlzc2libGVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRpc21pc3NpYmxlOnR5cGVvZiBkaXNtaXNzaWJsZSE9PVwidW5kZWZpbmVkXCI/ZGlzbWlzc2libGU6dW5kZWZpbmVkLFwibWVzc2FnZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubWVzc2FnZTp0eXBlb2YgbWVzc2FnZSE9PVwidW5kZWZpbmVkXCI/bWVzc2FnZTp1bmRlZmluZWQsXCJzdHJvbmdcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnN0cm9uZzp0eXBlb2Ygc3Ryb25nIT09XCJ1bmRlZmluZWRcIj9zdHJvbmc6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiTW9kYWxWaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuXG4jICMgIyAjICNcblxuIyBXaW5kb3cgZXZlbnQgbGlzdGVuZXIgdG8gaGlkZSB0aGUgbW9kYWwgd2hlbiBuYXZpZ2F0aW9uIG9jY3Vycy5cbmhpZGVNb2RhbE9uSGFzaENoYW5nZSA9IC0+IHdpbmRvdy5tb2RhbFdpbmRvdy5oaWRlTW9kYWwoKVxuXG4jIEFic3RyYWN0IGNsYXNzIGZvciBtb2RhbC1iYXNlZCBjb21wb25lbnRzLlxuY2xhc3MgQWJzdHJhY3RNb2RhbENvbXBvbmVudCBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiAgaGlkZU1vZGFsOiAtPlxuICAgIEBtb2RhbFZpZXcuaGlkZU1vZGFsKClcblxuICBzaG93TW9kYWw6IChjb250ZW50VmlldywgbW9kYWxWaWV3T3B0aW9ucz17fSkgLT5cblxuICAgICAgIyBOZXcgTW9kYWwgVmlldyAob3VyIHZpZXcgaXMgc2hvd24gaW5zaWRlIHRoaXMgb25lKVxuICAgICAgQG1vZGFsVmlldyA9IG5ldyBNb2RhbFZpZXcobW9kYWxWaWV3T3B0aW9ucylcblxuICAgICAgIyBTaG93IHRoZSB2aWV3IGluc2lkZSB0aGUgbW9kYWwgd3JhcHBlciwgYWRkcyBoaWRlTW9kYWxPbkhhc2hDaGFuZ2UgZXZlbnQgbGlzdGVuZXJcbiAgICAgIEBtb2RhbFZpZXcub24gJ3Nob3cnLCA9PlxuICAgICAgICBAbW9kYWxWaWV3LmNvbnRlbnRSZWdpb24uc2hvdyggY29udGVudFZpZXcgKVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGhpZGVNb2RhbE9uSGFzaENoYW5nZSlcbiAgICAgICAgd2luZG93Lm1vZGFsV2luZG93ID0gQG1vZGFsVmlld1xuXG4gICAgICAjIFJlbW92ZXMgaGlkZU1vZGFsT25IYXNoQ2hhbmdlIGV2ZW50IGxpc3RlbmVyXG4gICAgICBAbW9kYWxWaWV3Lm9uICdkZXN0cm95JywgLT5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBoaWRlTW9kYWxPbkhhc2hDaGFuZ2UpXG4gICAgICAgIGRlbGV0ZSB3aW5kb3cubW9kYWxXaW5kb3dcblxuICAgICAgIyBvbk1vZGFsSGlkZGVuIGNhbGxiYWNrXG4gICAgICBAbW9kYWxWaWV3Lm9uICdoaWRkZW46bW9kYWwnLCA9PiBAb25Nb2RhbEhpZGRlbj8oKVxuXG4gICAgICAjIFNob3cgdmlldyBpbiB0aGUgbW9kYWxcbiAgICAgIEBjb250YWluZXIuc2hvdyBAbW9kYWxWaWV3XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0TW9kYWxDb21wb25lbnRcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG1vZGFsQ3NzKSB7XG5idWYucHVzaChcIjxkaXYgcm9sZT1cXFwiZG9jdW1lbnRcXFwiIGRhdGEtcmVnaW9uPVxcXCJtb2RhbC1jb250ZW50XFxcIlwiICsgKGphZGUuY2xzKFttb2RhbENzc10sIFt0cnVlXSkpICsgXCI+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibW9kYWxDc3NcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm1vZGFsQ3NzOnR5cGVvZiBtb2RhbENzcyE9PVwidW5kZWZpbmVkXCI/bW9kYWxDc3M6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG4jIE1vZGFsVmlldyBjbGFzcyBkZWZpbml0aW9uXG4jIFByb3ZpZGVzIGEgZ2VuZXJpYyB2aWV3IGFuZCByZWdpb24gaW50byB3aGljaFxuIyBvdGhlciB2aWV3cyBjYW4gY29udmVuaWVudGx5IGJlIGRpc3BsYXllZCBpbiBhIG1vZGFsXG5jbGFzcyBNb2RhbFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vbW9kYWxfdGVtcGxhdGUnXG5cbiAgYXR0cmlidXRlczpcbiAgICByb2xlOiAgICAgJ2RpYWxvZydcbiAgICB0YWJpbmRleDogJy0xJ1xuXG4gIGNsYXNzTmFtZTogJ21vZGFsIGZhZGUnXG5cbiAgIyBTZXRzIG1vZGFsIHNpemUgLSBub3JtYWwgLyBzbWFsbCAvIGxhcmdlXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBzaXplID0gQG9wdGlvbnMuc2l6ZSB8fCAnJ1xuICAgIGNzcyA9ICdtb2RhbC1kaWFsb2cnXG4gICAgY3NzICs9ICcgbW9kYWwtc20nIGlmIHNpemUgPT0gJ3NtYWxsJ1xuICAgIGNzcyArPSAnIG1vZGFsLWxnJyBpZiBzaXplID09ICdsYXJnZSdcbiAgICByZXR1cm4geyBtb2RhbENzczogY3NzIH1cblxuICByZWdpb25zOlxuICAgIGNvbnRlbnRSZWdpb246ICdbZGF0YS1yZWdpb249bW9kYWwtY29udGVudF0nXG5cbiAgZXZlbnRzOlxuICAgICdzaG93LmJzLm1vZGFsJyAgIDogLT4gQHRyaWdnZXJNZXRob2QgJ3Nob3c6bW9kYWwnXG4gICAgJ3Nob3duLmJzLm1vZGFsJyAgOiAtPiBAdHJpZ2dlck1ldGhvZCAnc2hvd246bW9kYWwnXG4gICAgJ2hpZGUuYnMubW9kYWwnICAgOiAtPiBAdHJpZ2dlck1ldGhvZCAnaGlkZTptb2RhbCdcbiAgICAnaGlkZGVuLmJzLm1vZGFsJyA6IC0+IEB0cmlnZ2VyTWV0aG9kICdoaWRkZW46bW9kYWwnXG4gICAgJ2xvYWRlZC5icy5tb2RhbCcgOiAtPiBAdHJpZ2dlck1ldGhvZCAnbG9hZGVkOm1vZGFsJ1xuXG4gIG9uU2hvdzogLT5cbiAgICBAJGVsLm1vZGFsKCBAb3B0aW9ucy5tb2RhbE9wdGlvbnMgfHwge30gKVxuXG4gIGhpZGVNb2RhbDogLT5cbiAgICBAJGVsLm1vZGFsKCdoaWRlJylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxWaWV3XG4iLCJcbmNsYXNzIE92ZXJsYXlWaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogZmFsc2VcbiAgY2xhc3NOYW1lOiAnb3ZlcmxheSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrJzogJ29uQ2xpY2snXG5cbiAgb25DbGljazogLT5cbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdzaWRlYmFyJykudHJpZ2dlcignaGlkZScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBPdmVybGF5Q29tcG9uZW50IGV4dGVuZHMgTW4uU2VydmljZVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbnRhaW5lciAgPSBvcHRpb25zLmNvbnRhaW5lclxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdvdmVybGF5IHJlYWR5JzogICdvblJlYWR5J1xuICAgICdvdmVybGF5IHNob3cnOiAgICdzaG93T3ZlcmxheSdcbiAgICAnb3ZlcmxheSBoaWRlJzogICAnaGlkZU92ZXJsYXknXG5cbiAgc2hvd092ZXJsYXk6IC0+XG4gICAgJCgnLm92ZXJsYXktcmVnaW9uJykuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgaGlkZU92ZXJsYXk6IC0+XG4gICAgJCgnLm92ZXJsYXktcmVnaW9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgb25SZWFkeTogLT5cbiAgICB1bmxlc3MgQHZpZXdcbiAgICAgIEB2aWV3ID0gbmV3IE92ZXJsYXlWaWV3KClcbiAgICAgIEBjb250YWluZXIuc2hvdyhAdmlldylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gT3ZlcmxheUNvbXBvbmVudFxuIiwiXG4jIEJhc2VSb3V0ZSBjbGFzcyBkZWZpbml0aW9uXG4jIFRoZSBiYXNlIHJvdXRlIHJlZHVjZXMgcmVwZWF0ZWQgY29kZSBieVxuIyBhdHRhY2hpbmcgdGhlIEBjb250YWluZXIgcHJvcGVydHkgcGFzc2VkIGluIGZyb21cbiMgdGhlIHJvdXRlci4gVGhpcyBwcm9wZXJ0eSBpcyB1c2VkIHRvIGRpc3BsYXkgdmlld3MgaW4gdGhlIGFwcFxuY2xhc3MgQmFzZVJvdXRlIGV4dGVuZHMgQmFja2JvbmUuUm91dGluZy5Sb3V0ZVxuXG4gIGJyZWFkY3J1bWJzOiBbXVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zKSAtPlxuXG4gICAgIyBBdHRhY2hlcyBvcHRpb25zXG4gICAgQG9wdGlvbnMgPSBvcHRpb25zXG5cbiAgICAjIEF0dGFjaGVzIGNvbnRhaW5lclxuICAgIEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuXG4gICAgIyBFdmVudCBoYW5kbGVyc1xuICAgIEBvbiAnYmVmb3JlOmVudGVyJywgPT4gQG9uQmVmb3JlRW50ZXI/KGFyZ3VtZW50cylcbiAgICBAb24gJ2JlZm9yZTpmZXRjaCcsID0+IEBvbkJlZm9yZUZldGNoPyhhcmd1bWVudHMpXG4gICAgQG9uICdiZWZvcmU6cmVuZGVyJywgPT4gQG9uQmVmb3JlUmVuZGVyPyhhcmd1bWVudHMpXG4gICAgQG9uICdmZXRjaCcsID0+IEBvbkZldGNoPyhhcmd1bWVudHMpXG4gICAgQG9uICdyZW5kZXInLCA9PiBAb25SZW5kZXI/KGFyZ3VtZW50cylcbiAgICBAb24gJ2VudGVyJywgPT4gQG9uRW50ZXI/KGFyZ3VtZW50cylcblxuICAgICMgSGlkZXMgc2lkZWJhciBjb21wb25lbnRcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdzaWRlYmFyJykudHJpZ2dlcignaGlkZScpXG5cbiAgX3NldFBhZ2VUaXRsZTogLT5cbiAgICBkb2N1bWVudC50aXRsZSA9IF8ucmVzdWx0IEAsICd0aXRsZSdcblxuICBfdXBkYXRlQnJlYWRjcnVtYnM6IC0+XG4gICAgYnJlYWRjcnVtYnMgPSBfLnJlc3VsdCBALCAnYnJlYWRjcnVtYnMnXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnYnJlYWRjcnVtYicpLnRyaWdnZXIoJ3NldCcsIGJyZWFkY3J1bWJzKSBpZiBicmVhZGNydW1ic1xuXG4gIG9uRmV0Y2g6IC0+XG4gICAgQF9zZXRQYWdlVGl0bGUoKVxuICAgIEBfdXBkYXRlQnJlYWRjcnVtYnMoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlUm91dGVcbiIsIlxuIyBCYXNlUm91dGVyIGNsYXNzIGRlZmluaXRpb25cbiMgVGhlIGJhc2Ugcm91dGVyIHJlZHVjZXMgcmVwZWF0ZWQgY29kZSBieVxuIyBhdHRhY2hpbmcgdGhlIEBjb250YWluZXIgcHJvcGVydHkgcGFzc2VkIGluIGZyb20gd2hlbiBpbnN0YW50aWF0ZWQuXG4jIFRoaXMgcHJvcGVydHkgaXMgc3Vic2VxdWVudGx5IHBhc3NlZCB0byBhbGwgcm91dGVzIGNyZWF0ZWQgaW5zaWRlXG4jIHJvdXRlcnMgc3ViY2xhc3NlZCBmcm9tIHRoaXMgZGVmaW5pdGlvblxuY2xhc3MgQmFzZVJvdXRlciBleHRlbmRzIEJhY2tib25lLlJvdXRpbmcuUm91dGVyXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+IEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlUm91dGVyXG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4oZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5qYWRlID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKSA6XG4gICAgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxba2V5XTsgfSkgOlxuICAgIFt2YWxdKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0eWxlID0gZnVuY3Rpb24gKHZhbCkge1xuICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubWFwKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXTtcbiAgICB9KS5qb2luKCc7Jyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICB2YWwgPSBleHBvcnRzLnN0eWxlKHZhbCk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsKS5pbmRleE9mKCcmJykgIT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NpbmNlIEphZGUgMi4wLjAsIGFtcGVyc2FuZHMgKGAmYCkgaW4gZGF0YSBhdHRyaWJ1dGVzICcgK1xuICAgICAgICAgICAgICAgICAgICd3aWxsIGJlIGVzY2FwZWQgdG8gYCZhbXA7YCcpO1xuICAgIH07XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBlbGltaW5hdGUgdGhlIGRvdWJsZSBxdW90ZXMgYXJvdW5kIGRhdGVzIGluICcgK1xuICAgICAgICAgICAgICAgICAgICdJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBqYWRlX2VuY29kZV9odG1sX3J1bGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90Oydcbn07XG52YXIgamFkZV9tYXRjaF9odG1sID0gL1smPD5cIl0vZztcblxuZnVuY3Rpb24gamFkZV9lbmNvZGVfY2hhcihjKSB7XG4gIHJldHVybiBqYWRlX2VuY29kZV9odG1sX3J1bGVzW2NdIHx8IGM7XG59XG5cbmV4cG9ydHMuZXNjYXBlID0gamFkZV9lc2NhcGU7XG5mdW5jdGlvbiBqYWRlX2VzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKS5yZXBsYWNlKGphZGVfbWF0Y2hfaHRtbCwgamFkZV9lbmNvZGVfY2hhcik7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuZXhwb3J0cy5EZWJ1Z0l0ZW0gPSBmdW5jdGlvbiBEZWJ1Z0l0ZW0obGluZW5vLCBmaWxlbmFtZSkge1xuICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xufVxuXG59LHtcImZzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XX0se30sWzFdKSgxKVxufSk7XG59KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIlxuY2xhc3MgQWJzdHJhY3RLZXlib2FyZFZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdyBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlcidcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2tleWJvYXJkX2Fic3RyYWN0J1xuXG4gICMgVE9ETyAtIGFjdGl2YXRlIHRoaXMgYmVoYXZpb3IgY29uZGl0aW9uYWxseVxuICAjIGJlaGF2aW9yczpcbiAgIyAgIEtleWJvYXJkQ29udHJvbHM6IHt9XG5cbiAgdWk6XG4gICAga2V5OiAnW2RhdGEtY2xpY2s9a2V5XSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5rZXknOiAnb25LZXlDbGljaydcblxuICBpc1JlY29yZGluZzogZmFsc2VcblxuICAjIGluaXRpYWxpemVcbiAgaW5pdGlhbGl6ZTogLT5cblxuICAgICMgRGVmaW5lcyBAZGVib3VuY2VTdG9wUmVjb3JkaW5nXG4gICAgQGRlYm91bmNlU3RvcFJlY29yZGluZyA9IF8uZGVib3VuY2UoICgpID0+XG4gICAgICBAdHJpZ2dlciAnc3RvcDpyZWNvcmRpbmcnXG4gICAgLCAxNTAwKTtcblxuICAjIHN0YXJ0UmVjb3JkaW5nXG4gICMgVE9ETyAtIG1vdmUgcmVjb3JkaW5nIE9VVCBvZiB0aGlzIHZpZXcgYW5kIGludG8gYSBnbG9iYWxpemVkIHNlcnZpY2VcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG4gICAgQGlzUmVjb3JkaW5nID0gdHJ1ZVxuXG4gICMgc3RvcFJlY29yZGluZ1xuICBzdG9wUmVjb3JkaW5nOiAtPlxuICAgIEBpc1JlY29yZGluZyA9IGZhbHNlXG5cbiAgIyBvblJlbmRlcjogLT5cbiAgIyAgIHNldFRpbWVvdXQoIEBpbml0U29ydGFibGUsIDMwMCApXG5cbiAgIyAjIGluaXRTb3J0YWJsZVxuICAjIGluaXRTb3J0YWJsZTogLT5cblxuICAjICAgY29uc29sZS5sb2cgJ09OIEFUVEFDSCdcblxuICAjICAgY29uc29sZS5sb2cgJCgndWwua2V5Ym9hcmQtLXJvdycpXG5cbiAgIyAgIF8uZWFjaCAkKCd1bC5rZXlib2FyZC0tcm93JyksIChlbCkgPT5cblxuICAjICAgICAjIEluaXRpYWxpemVzIFNvcnRhYmxlIGNvbnRhaW5lclxuICAjICAgICBTb3J0YWJsZS5jcmVhdGUgZWwsXG4gICMgICAgICAgYW5pbWF0aW9uOiAgICAxNTBcbiAgIyAgICAgICBoYW5kbGU6ICAgICAgICcuaGFuZGxlJ1xuICAjICAgICAgICMgZ2hvc3RDbGFzczogICAnZ2hvc3QnICAjIENsYXNzIG5hbWUgZm9yIHRoZSBkcm9wIHBsYWNlaG9sZGVyXG4gICMgICAgICAgIyBjaG9zZW5DbGFzczogICdjaG9zZW4nICAjIENsYXNzIG5hbWUgZm9yIHRoZSBjaG9zZW4gaXRlbVxuICAjICAgICAgICMgZHJhZ0NsYXNzOiAgICAnZHJhZycgICMgQ2xhc3MgbmFtZSBmb3IgdGhlIGRyYWdnaW5nIGl0ZW1cblxuICAjICAgICAgIGdyb3VwOlxuICAjICAgICAgICAgbmFtZTogJ21hY3JvJ1xuICAjICAgICAgICAgcHVsbDogJ2Nsb25lJ1xuICAjICAgICAgICAgcHV0OiAgZmFsc2VcblxuICAjICAgICAgIGZhbGxiYWNrVG9sZXJhbmNlOiAxMDBcblxuICAjIEtleWJvYXJkQ29udHJvbHMgYmVoYXZpb3IgY2FsbGJhY2tcbiAgIyBUT0RPIC0gYW5ub2F0ZSBhbmQgY2xlYW4gdXAgdGhpcyBtZXRob2RcbiAgb25LZXlBY3Rpb246IChlKSAtPlxuXG4gICAgIyBTaG9ydC1jaXJjdWl0cyB1bmxlc3NcbiAgICByZXR1cm4gdW5sZXNzIEBpc1JlY29yZGluZ1xuXG4gICAgIyBQcmV2ZW50cyBkZWZhdWx0IGhvdGtleXMgd2hpbGUgcmVjb3JkaW5nXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAjIFRPRE8gLSBpZ25vcmUga2V5dXAgb24gYWxwaGFudW1lcmljLCBsaXN0ZW4gZm9yIHNwZWNpYWwga2V5cz9cbiAgICAjIHJldHVybiBpZiBlLmtleSBpbiBbXCJDb250cm9sXCIsIFwiTWV0YVwiLCBcIkFsdFwiXVxuICAgIGtleSA9IEBvcHRpb25zLmtleXMuZmluZFdoZXJlKHsga2V5Y29kZTogZS5rZXlDb2RlIH0pXG5cbiAgICAjICMgIyAjXG5cbiAgICAjIFRPRE8gLSBkb2N1bWVudCB0aGlzIGJsb2NrIG9mIGNvZGVcblxuICAgIGlmIGUudHlwZSA9PSAna2V5ZG93bidcblxuICAgICAgaWYgZS5rZXkgaW4gW1wiQ29udHJvbFwiLCBcIk1ldGFcIiwgXCJBbHRcIiwgXCJTaGlmdFwiXVxuICAgICAgICBqc29uID0ga2V5LnRvSlNPTigpXG4gICAgICAgIGpzb24ucG9zaXRpb24gPSAxICMgS0VZX0ROIC0gVE9ETyAtIGNvbnN0YW50aXplXG4gICAgICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBqc29uXG4gICAgICBlbHNlXG4gICAgICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBrZXkudG9KU09OKClcblxuICAgIGlmIGUudHlwZSA9PSAna2V5dXAnXG5cbiAgICAgIGlmIGUua2V5IGluIFtcIkNvbnRyb2xcIiwgXCJNZXRhXCIsIFwiQWx0XCIsIFwiU2hpZnRcIl1cbiAgICAgICAganNvbiA9IGtleS50b0pTT04oKVxuICAgICAgICBqc29uLnBvc2l0aW9uID0gMiAjIEtFWV9VUCAtIFRPRE8gLSBjb25zdGFudGl6ZVxuICAgICAgICBAdHJpZ2dlciAna2V5OnNlbGVjdGVkJywganNvblxuXG5cbiAgICAjICMgIyAjXG5cbiAgICBpZiBlLnR5cGUgPT0gJ2tleXVwJ1xuICAgICAgQCQoXCJbZGF0YS1rZXljb2RlPSN7ZS5rZXlDb2RlfV1cIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgZWxzZVxuICAgICAgQCQoXCJbZGF0YS1rZXljb2RlPSN7ZS5rZXlDb2RlfV1cIikuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAjIFRPRE8gLSBhbm5vdGFlXG4gICAgc2V0VGltZW91dCggPT5cbiAgICAgIEAkKFwiW2RhdGEta2V5Y29kZT0je2Uua2V5Q29kZX1dXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICwgMTAwMClcblxuICAgICMgU3RvcHMgcmVjb3JkaW5nIDIgc2Vjb25kcyBhZnRlciBsYXN0IGtleXN0cm9rZVxuICAgIEBkZWJvdW5jZVN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyAjICMgI1xuXG5cbiAgIyBLZXlDbGljayBjYWxsYmFja1xuICBvbktleUNsaWNrOiAoZSkgLT5cblxuICAgICMgQ2FjaGVzIGVsIGFuZCBrZXljb2RlXG4gICAgZWwgID0gJChlLmN1cnJlbnRUYXJnZXQpXG4gICAga2V5Y29kZSA9IGVsLmRhdGEoJ2tleWNvZGUnKVxuXG4gICAgIyBGaW5kcyB0aGUgbW9kZWwgb2YgdGhlIGtleSB0aGF0IHdhcyBzZWxlY3RlZFxuICAgIGtleSA9IEBvcHRpb25zLmtleXMuZmluZFdoZXJlKHsga2V5Y29kZToga2V5Y29kZSB9KVxuXG4gICAgIyBUcmlnZ2VycyAna2V5OnNlbGVjdGVkJyBldmVudFxuICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBrZXkudG9KU09OKClcblxuICAgICMgQmx1cnMgZm9jdXMgZnJvbSBjbGlja2VkIGtleVxuICAgIGVsLmJsdXIoKVxuXG4gICAgcmV0dXJuXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0S2V5Ym9hcmRWaWV3XG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlib2FyZFZpZXcgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMva2V5Ym9hcmRfZnVsbCdcblxuICBiZWhhdmlvcnM6XG4gICAgS2V5Ym9hcmRDb250cm9sczoge31cblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IwJ30pXG4gICAgICByMTogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IxJ30pXG4gICAgICByMjogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IyJ30pXG4gICAgICByMzogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IzJ30pXG4gICAgICByNDogXy53aGVyZShrZXlzLCB7IHJvdzogJ3I0J30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZFZpZXdcbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgI1xuXG5jbGFzcyBGdW5jdGlvbktleWJvYXJkIGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ2Z1bmNfcjAnIH0pXG4gICAgICAjIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAnc3BlY2lhbF9yMCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb25LZXlib2FyZFxuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjXG5cbmNsYXNzIE1lZGlhS2V5Ym9hcmQgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuXG4gICMgUGFzc2VzIGtleSBvYmplY3RzIHRvIFVJXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBrZXlzID0gQG9wdGlvbnMua2V5cy50b0pTT04oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbWVkaWFfcjAnfSlcbiAgICB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1lZGlhS2V5Ym9hcmRcblxuXG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICNcblxuY2xhc3MgTmF2S2V5Ym9hcmQgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuXG4gICMgUGFzc2VzIGtleSBvYmplY3RzIHRvIFVJXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBrZXlzID0gQG9wdGlvbnMua2V5cy50b0pTT04oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbmF2X3IwJ30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBOYXZLZXlib2FyZFxuXG5cbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgI1xuXG5jbGFzcyBOdW1wYWRWaWV3IGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2tleWJvYXJkX251bXBhZCdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yMCd9KVxuICAgICAgcjE6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjEnfSlcbiAgICAgIHIyOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3IyJ30pXG4gICAgICByMzogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yMyd9KVxuICAgICAgcjQ6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjQnfSlcbiAgICAgIGNvbDogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9jb2wnfSlcbiAgICB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE51bXBhZFZpZXdcblxuXG4iLCJTaW1wbGVOYXYgPSByZXF1aXJlKCdsaWIvdmlld3Mvc2ltcGxlX25hdicpXG5GdWxsS2V5Ym9hcmQgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfZnVsbCcpXG5OdW1wYWRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX251bXBhZCcpXG5GdW5jdGlvbktleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Z1bmN0aW9uJylcbk1lZGlhS2V5Ym9hcmQgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfbWVkaWEnKVxuU3BlY2lhbEtleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX3NwZWNpYWwnKVxuTmF2S2V5Ym9hcmQgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfbmF2JylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleWJvYXJkU2VsZWN0b3IgZXh0ZW5kcyBTaW1wbGVOYXZcbiAgY2xhc3NOYW1lOiAncm93IGgtMTAwJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMva2V5Ym9hcmRfc2VsZWN0b3InKVxuXG4gIG5hdkl0ZW1zOiBbXG4gICAgeyBpY29uOiAnZmEta2V5Ym9hcmQtbycsICB0ZXh0OiAnS2V5Ym9hcmQnLCAgdHJpZ2dlcjogJ2tleWJvYXJkJywgZGVmYXVsdDogdHJ1ZSB9XG4gICAgeyBpY29uOiAnZmEtZmlsZS10ZXh0LW8nLCB0ZXh0OiAnTnVtcGFkJywgICB0cmlnZ2VyOiAnbnVtcGFkJyB9XG4gICAgeyBpY29uOiAnZmEtZmlsZS10ZXh0LW8nLCB0ZXh0OiAnU3BlY2lhbCcsICAgdHJpZ2dlcjogJ3NwZWNpYWwnIH1cbiAgICB7IGljb246ICdmYS1jYXJldC1zcXVhcmUtby11cCcsICAgIHRleHQ6ICdGdW5jdGlvbicsICAgIHRyaWdnZXI6ICdmdW5jdGlvbicgfVxuICAgIHsgaWNvbjogJ2ZhLWFzdGVyaXNrJywgICAgdGV4dDogJ01lZGlhJywgICAgdHJpZ2dlcjogJ21lZGlhJyB9XG4gICAgeyBpY29uOiAnZmEtYXN0ZXJpc2snLCAgICB0ZXh0OiAnTmF2aWdhdGlvbicsICAgIHRyaWdnZXI6ICduYXYnIH1cbiAgXVxuXG4gIHNob3dLZXlib2FyZFZpZXc6IChrZXlib2FyZFZpZXcpIC0+XG5cbiAgICAjIENhY2hlcyBjdXJyZW50IGtleWJvYXJkIHZpZXdcbiAgICBAY3VycmVudCA9IGtleWJvYXJkVmlld1xuXG4gICAgIyBIYW5kbGVzICdzdG9wOnJlY29yZGluZycgZXZlbnRcbiAgICBAY3VycmVudC5vbiAnc3RvcDpyZWNvcmRpbmcnLCA9PiBAdHJpZ2dlciAnc3RvcDpyZWNvcmRpbmcnXG5cbiAgICAjIEhhbmRsZXMgS2V5U2VsZWN0aW9uIGV2ZW50XG4gICAga2V5Ym9hcmRWaWV3Lm9uICdrZXk6c2VsZWN0ZWQnLCAoa2V5KSA9PiBAdHJpZ2dlcigna2V5OnNlbGVjdGVkJywga2V5KVxuXG4gICAgIyBTaG93cyB0aGUga2V5Ym9hcmRWaWV3XG4gICAgQGNvbnRlbnRSZWdpb24uc2hvdyBrZXlib2FyZFZpZXdcblxuICBvbk5hdmlnYXRlS2V5Ym9hcmQ6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IEZ1bGxLZXlib2FyZCh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZVNwZWNpYWw6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IFNwZWNpYWxLZXlib2FyZCh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZU51bXBhZDogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgTnVtcGFkVmlldyh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZUZ1bmN0aW9uOiAtPlxuICAgIEBzaG93S2V5Ym9hcmRWaWV3KG5ldyBGdW5jdGlvbktleWJvYXJkKHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuICBvbk5hdmlnYXRlTWVkaWE6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IE1lZGlhS2V5Ym9hcmQoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4gIG9uTmF2aWdhdGVOYXY6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IE5hdktleWJvYXJkKHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRTZWxlY3RvclxuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjXG5cbmNsYXNzIFNwZWNpYWxLZXlib2FyZCBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdzcGVjaWFsX3IwJ30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTcGVjaWFsS2V5Ym9hcmRcblxuXG4iLCJjbGFzcyBTaW1wbGVOYXYgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBbZGF0YS10cmlnZ2VyXTpub3QoLmRpc2FibGVkKSc6ICdvbk5hdkl0ZW1DbGljaydcblxuICBuYXZJdGVtczogW11cblxuICByZWdpb25zOlxuICAgIGNvbnRlbnRSZWdpb246ICdbZGF0YS1yZWdpb249Y29udGVudF0nXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgZGVmID0gXy53aGVyZShfLnJlc3VsdChALCAnbmF2SXRlbXMnKSwgeyBkZWZhdWx0OiB0cnVlIH0pWzBdXG4gICAgcmV0dXJuIHVubGVzcyBkZWZcbiAgICBAdHJpZ2dlck1ldGhvZChcIm5hdmlnYXRlOiN7ZGVmLnRyaWdnZXJ9XCIpXG4gICAgQCQoXCJbZGF0YS10cmlnZ2VyPSN7ZGVmLnRyaWdnZXJ9XVwiKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICBzZXJpYWxpemVEYXRhOiAtPlxuICAgIGRhdGEgPSBzdXBlclxuICAgIF8uZXh0ZW5kKGRhdGEsIHsgbmF2SXRlbXM6IF8ucmVzdWx0KEAsICduYXZJdGVtcycpIH0pXG4gICAgcmV0dXJuIGRhdGFcblxuICBvbk5hdkl0ZW1DbGljazogKGUpID0+XG4gICAgZWwgPSAkKGUuY3VycmVudFRhcmdldClcbiAgICBlbC5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICBAdHJpZ2dlck1ldGhvZChcIm5hdmlnYXRlOiN7ZWwuZGF0YSgndHJpZ2dlcicpfVwiKVxuICAgIGVsLmJsdXIoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVOYXZcbiJdfQ==
