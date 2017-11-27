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

buf.push("<div class=\"navbar-brand title\">ASTROKEY</div><ul class=\"navbar-nav mr-auto\"><li class=\"nav-item\"><a style=\"cursor:pointer\" onClick=\"Radio.channel('usb').request('devices');\" class=\"nav-link\"><i class=\"fa fa-fw fa-lg fa-usb\"></i></a></li><li class=\"nav-item\"><a style=\"cursor:pointer\" onClick=\"Radio.channel('about').trigger('show');\" class=\"nav-link\"><i class=\"fa fa-fw fa-lg fa-question-circle-o\"></i></a></li></ul>");;return buf.join("");
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



},{"./app":1,"./application/views/layout":2,"./components/about/component":8,"./components/header/component":11,"./config":15,"./modules/key/factory":21,"./modules/main/router":59,"./modules/usb/chrome_web_usb_service":60,"hn_entities/lib/config":68,"hn_flash/lib/component":71,"hn_overlay/lib/component":79}],20:[function(require,module,exports){
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
    keycode: 192
  }, {
    row: 'r4',
    key: '1',
    shift_key: '!',
    keycode: 49
  }, {
    row: 'r4',
    key: '2',
    shift_key: '@',
    keycode: 50
  }, {
    row: 'r4',
    key: '3',
    shift_key: '#',
    keycode: 51
  }, {
    row: 'r4',
    key: '4',
    shift_key: '$',
    keycode: 52
  }, {
    row: 'r4',
    key: '5',
    shift_key: '%',
    keycode: 53
  }, {
    row: 'r4',
    key: '6',
    shift_key: '^',
    keycode: 54
  }, {
    row: 'r4',
    key: '7',
    shift_key: '&',
    keycode: 55
  }, {
    row: 'r4',
    key: '8',
    shift_key: '*',
    keycode: 56
  }, {
    row: 'r4',
    key: '9',
    shift_key: '(',
    keycode: 57
  }, {
    row: 'r4',
    key: '0',
    shift_key: ')',
    keycode: 48
  }, {
    row: 'r4',
    key: '-',
    shift_key: '_',
    keycode: 189
  }, {
    row: 'r4',
    key: '=',
    shift_key: '+',
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
    key: 'q',
    shift_key: 'Q',
    alpha: true,
    keycode: 81
  }, {
    row: 'r3',
    key: 'w',
    shift_key: 'W',
    alpha: true,
    keycode: 87
  }, {
    row: 'r3',
    key: 'e',
    shift_key: 'E',
    alpha: true,
    keycode: 69
  }, {
    row: 'r3',
    key: 'r',
    shift_key: 'R',
    alpha: true,
    keycode: 82
  }, {
    row: 'r3',
    key: 't',
    shift_key: 'T',
    alpha: true,
    keycode: 84
  }, {
    row: 'r3',
    key: 'y',
    shift_key: 'Y',
    alpha: true,
    keycode: 89
  }, {
    row: 'r3',
    key: 'u',
    shift_key: 'U',
    alpha: true,
    keycode: 85
  }, {
    row: 'r3',
    key: 'i',
    shift_key: 'I',
    alpha: true,
    keycode: 73
  }, {
    row: 'r3',
    key: 'o',
    shift_key: 'O',
    alpha: true,
    keycode: 79
  }, {
    row: 'r3',
    key: 'p',
    shift_key: 'P',
    alpha: true,
    keycode: 80
  }, {
    row: 'r3',
    key: '[',
    shift_key: '{',
    keycode: 219
  }, {
    row: 'r3',
    key: ']',
    shift_key: '}',
    keycode: 221
  }, {
    row: 'r3',
    key: '\\',
    shift_key: '|',
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
    key: 'a',
    shift_key: 'A',
    alpha: true,
    keycode: 65
  }, {
    row: 'r2',
    key: 's',
    shift_key: 'S',
    alpha: true,
    keycode: 83
  }, {
    row: 'r2',
    key: 'd',
    shift_key: 'D',
    alpha: true,
    keycode: 68
  }, {
    row: 'r2',
    key: 'f',
    shift_key: 'F',
    alpha: true,
    keycode: 70
  }, {
    row: 'r2',
    key: 'g',
    shift_key: 'G',
    alpha: true,
    keycode: 71
  }, {
    row: 'r2',
    key: 'h',
    shift_key: 'H',
    alpha: true,
    keycode: 72
  }, {
    row: 'r2',
    key: 'j',
    shift_key: 'J',
    alpha: true,
    keycode: 74
  }, {
    row: 'r2',
    key: 'k',
    shift_key: 'K',
    alpha: true,
    keycode: 75
  }, {
    row: 'r2',
    key: 'l',
    shift_key: 'L',
    alpha: true,
    keycode: 76
  }, {
    row: 'r2',
    key: ';',
    shift_key: ':',
    keycode: 186
  }, {
    row: 'r2',
    key: "'",
    shift_key: '"',
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
    key: 'z',
    shift_key: 'Z',
    alpha: true,
    keycode: 90
  }, {
    row: 'r1',
    key: 'x',
    shift_key: 'X',
    alpha: true,
    keycode: 88
  }, {
    row: 'r1',
    key: 'c',
    shift_key: 'C',
    alpha: true,
    keycode: 67
  }, {
    row: 'r1',
    key: 'v',
    shift_key: 'V',
    alpha: true,
    keycode: 86
  }, {
    row: 'r1',
    key: 'b',
    shift_key: 'B',
    alpha: true,
    keycode: 66
  }, {
    row: 'r1',
    key: 'n',
    shift_key: 'N',
    alpha: true,
    keycode: 78
  }, {
    row: 'r1',
    key: 'm',
    shift_key: 'M',
    alpha: true,
    keycode: 77
  }, {
    row: 'r1',
    key: ',',
    shift_key: '<',
    keycode: 188
  }, {
    row: 'r1',
    key: '.',
    shift_key: '>',
    keycode: 190
  }, {
    row: 'r1',
    key: '/',
    shift_key: '?',
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
},{"jade/runtime":82}],24:[function(require,module,exports){
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
},{"jade/runtime":82}],25:[function(require,module,exports){
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
var MacroCollection, MacroExamples, MacroModel, charMap,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MacroExamples = require('./examples');

charMap = require('lib/character_map');

MacroModel = (function(superClass) {
  extend(MacroModel, superClass);

  function MacroModel() {
    return MacroModel.__super__.constructor.apply(this, arguments);
  }

  MacroModel.prototype.defaults = {
    order: 0,
    position: 0,
    shifted: false
  };

  MacroModel.prototype.getKeyData = function() {
    var attrs, data;
    data = [];
    attrs = _.clone(this.attributes);
    if (attrs.position === 0) {
      data.push(1);
      data.push(charMap[attrs.key] || 4);
      data.push(2);
      data.push(charMap[attrs.key] || 4);
    }
    if (attrs.position === -1) {
      data.push(1);
      data.push(charMap[attrs.key] || 4);
    }
    if (attrs.position === 1) {
      data.push(2);
      data.push(charMap[attrs.key] || 4);
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

  return MacroCollection;

})(Backbone.Collection);

module.exports = {
  Model: MacroModel,
  Collection: MacroCollection
};



},{"./examples":32,"lib/character_map":83}],28:[function(require,module,exports){
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
      text: 'Text',
      trigger: 'text',
      disabled: true,
      css: 'disabled',
      title: 'Coming Soon'
    }, {
      icon: 'fa-asterisk',
      text: 'Key',
      trigger: 'key',
      disabled: true,
      css: 'disabled',
      title: 'Coming Soon'
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



},{"./templates/editor_selector":43,"lib/views/simple_nav":91}],36:[function(require,module,exports){
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
    var data, macroIndex, requestObj;
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
    if (true) {
      console.log('HAS DEVICE - SEND TO DEVICE');
      console.log(this.model);
      console.log(this.model.get('order'));
      macroIndex = this.model.get('order');
      data = [];
      _.each(this.macros.models, (function(_this) {
        return function(macro) {
          console.log('EACH MACRO');
          console.log(macro.getKeyData());
          return data = data.concat(macro.getKeyData());
        };
      })(this));
      console.log(data);
      if (!window.d) {
        return this.trigger('save');
      }
      requestObj = {
        'requestType': 'vendor',
        'recipient': 'device',
        'request': 0x03,
        'value': macroIndex,
        'index': 0x01
      };
      console.log(requestObj);
      return d.controlTransferOut(requestObj, new Uint8Array(data).buffer).then((function(_this) {
        return function(response) {
          console.log(response);
          return _this.trigger('save');
        };
      })(this));
    } else {
      return this.trigger('save');
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



},{"./macroList":40,"./templates/macro_editor":49,"lib/views/keyboard_selector":90}],40:[function(require,module,exports){
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
    'change:position': 'render',
    'change:shifted': 'render'
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
        css: 'fa-long-arrow-down',
        tooltip: 'Key Down'
      }, {
        position: 0,
        css: 'fa-arrows-v',
        tooltip: 'Key Down | Up'
      }, {
        position: 1,
        css: 'fa-long-arrow-up',
        tooltip: 'Key Up'
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



},{"./templates/macro_child":48,"./templates/macro_empty":50}],41:[function(require,module,exports){
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
},{"jade/runtime":82}],44:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"col-lg-12\"><div class=\"row justify-content-center\"><div class=\"col-lg-12 d-flex justify-content-center\"><button data-click=\"cancel\" class=\"btn btn-sm btn-outline-secondary mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-angle-left\"></i></button><button data-click=\"save\" class=\"btn btn-sm btn-outline-success mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-check-circle-o\"></i></button><button data-click=\"clear\" class=\"btn btn-sm btn-outline-warning mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-times\"></i></button><button data-click=\"record\" class=\"btn btn-sm btn-outline-danger mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-circle\"></i></button><div class=\"btn-group\"><button type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"btn btn-sm btn-outline-primary dropdown-toggle mx-2 px-4\">Examples</button><div class=\"dropdown-menu dropdown-menu-right mt-3\"><button type=\"button\" data-example=\"ex_01\" class=\"dropdown-item\">Ex. 1: \"Hello!\"</button><button type=\"button\" data-example=\"ex_02\" class=\"dropdown-item\">Ex. 2: \"Resumè\"</button><button type=\"button\" data-example=\"ex_03\" class=\"dropdown-item\">Ex. 3: Em Dash (—)</button><button type=\"button\" data-example=\"ex_04\" class=\"dropdown-item\">Ex. 4: CTRL + ALT + DELETE</button></div></div></div></div></div><div class=\"col-lg-12\"><hr/></div><div data-region=\"content\" class=\"col-lg-12\"></div>");;return buf.join("");
};
},{"jade/runtime":82}],45:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"col-lg-12\"><div class=\"row\"><div class=\"col-lg-12 d-flex flex-row align-items-center justify-content-center\"><i class=\"d-flex fa fa-fw fa-2x fa-question-circle-o mr-1\"></i><p style=\"letter-spacing: 0.25rem; font-weight: 200;\" class=\"d-flex lead m-0\">Click a key to edit</p></div></div><div class=\"row mt-5\"><div style=\"opacity:0\" class=\"col-lg-12 d-flex justify-content-center\"><button disabled=\"disabled\" style=\"flex-grow:1;\" class=\"d-flex btn btn-outline-secondary justify-content-center mx-3\">BLANK</button></div></div></div>");;return buf.join("");
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



},{}],54:[function(require,module,exports){
var AstrokeyCollection, AstrokeyConfig, AstrokeyModel, CharacterMap, DeviceCollection, DeviceModel, InvertedCharacterMap, MacroEntities, MacroKeys, pairArray,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MacroEntities = require('../macro/entities');

MacroKeys = require('../key/keys');

CharacterMap = require('lib/character_map');

InvertedCharacterMap = _.invert(CharacterMap);

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

  AstrokeyModel.prototype.readMacro = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return Radio.channel('usb').request('read:macro', _this.get('order')).then(function(macroArray) {
          var config, i, index, len, macro, macroIndex, macros, nextMacro, pair, pairs, parsedMacros, position;
          macros = [];
          parsedMacros = [];
          macroArray = _.compact(macroArray);
          pairs = pairArray(macroArray);
          for (index = i = 0, len = pairs.length; i < len; index = ++i) {
            pair = pairs[index];
            position = pair[0];
            position = position === 2 ? 1 : -1;
            macro = _.findWhere(MacroKeys, {
              key: InvertedCharacterMap[pair[1]]
            });
            macro = _.clone(macro);
            macro.order = index;
            macro.position = position;
            macros.push(macro);
          }
          macroIndex = 0;
          while (macroIndex <= macros.length) {
            macro = macros[macroIndex];
            nextMacro = macros[macroIndex + 1];
            if (!nextMacro) {
              parsedMacros.push(macro);
              macroIndex++;
              continue;
            }
            if (macro.position === -1 && nextMacro.position === 1 && macro.key === nextMacro.key) {
              macro.position = 0;
              parsedMacros.push(macro);
              macroIndex = macroIndex + 2;
              continue;
            }
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



},{"../key/keys":22,"../macro/entities":27,"lib/character_map":83}],55:[function(require,module,exports){
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
        return d.controlTransferIn({
          'requestType': 'vendor',
          'recipient': 'device',
          'request': 0x03,
          'value': macroIndex,
          'index': 0x02
        }, 128).then(function(response) {
          return resolve(new Int8Array(response.data.buffer));
        })["catch"](function(err) {
          console.log('ERROR READING MACRO');
          return reject(err);
        });
      };
    })(this));
  };

  ChromeWebUsbService.prototype.sendMacro = function(data) {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return d.controlTransferOut({
          requestType: 'vendor',
          recipient: 'device',
          request: 0x03,
          value: 0x0013,
          index: 0x0001
        }, new Uint8Array(data).buffer).then(function(response) {
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
module.exports = {
  'a': 4,
  'b': 5,
  'c': 6,
  'd': 7,
  'e': 8,
  'f': 9,
  'g': 10,
  'h': 11,
  'i': 12,
  'j': 13,
  'k': 14,
  'l': 15,
  'm': 16,
  'n': 17,
  'o': 18,
  'p': 19,
  'q': 20,
  'r': 21,
  's': 22,
  't': 23,
  'u': 24,
  'v': 25,
  'w': 26,
  'x': 27,
  'y': 28,
  'z': 29,
  '1': 30,
  '2': 31,
  '3': 32,
  '4': 33,
  '5': 34,
  '6': 35,
  '7': 36,
  '8': 37,
  '9': 38,
  '0': 39,
  '.': 99,
  'SPACE': 44,
  right: 79,
  left: 80,
  down: 81,
  up: 82,
  'BACKSPACE': 42,
  '/': 84,
  '*': 85,
  '-': 86,
  '+': 87,
  'RETURN': 88
};



},{}],84:[function(require,module,exports){
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



},{"./templates/keyboard_selector":26,"lib/views/keyboard_full":85,"lib/views/keyboard_function":86,"lib/views/keyboard_media":87,"lib/views/keyboard_nav":88,"lib/views/keyboard_numpad":89,"lib/views/simple_nav":91}],91:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2FwcC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvYXBwbGljYXRpb24vdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2JlaGF2aW9ycy9rZXlib2FyZENvbnRyb2xzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc2VsZWN0YWJsZUNoaWxkLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc29ydGFibGVDaGlsZC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvYmVoYXZpb3JzL3NvcnRhYmxlTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbXBvbmVudHMvYWJvdXQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9jb21wb25lbnRzL2Fib3V0L3ZpZXdzL3RlbXBsYXRlcy9hYm91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29tcG9uZW50cy9oZWFkZXIvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9jb21wb25lbnRzL2hlYWRlci92aWV3cy90ZW1wbGF0ZXMvaGVhZGVyLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL2NvcnMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbmZpZy9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL2p3dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL21hcmlvbmV0dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbmZpZy93aW5kb3cuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21hbmlmZXN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL2tleS9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9rZXkvZmFjdG9yeS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9rZXkva2V5cy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QvdGVtcGxhdGVzL2tleWJvYXJkX2Fic3RyYWN0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVsbC90ZW1wbGF0ZXMva2V5Ym9hcmRfZnVsbC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX251bXBhZC90ZW1wbGF0ZXMva2V5Ym9hcmRfbnVtcGFkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3IvdGVtcGxhdGVzL2tleWJvYXJkX3NlbGVjdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvZXhhbXBsZV8yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21hY3JvL2V4YW1wbGVzL2V4YW1wbGVfMy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvZGV2aWNlTGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvclNlbGVjdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvcldyYXBwZXIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3Mva2V5U2VsZWN0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL21hY3JvRWRpdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL21hY3JvTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZGV2aWNlX2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2RldmljZV9zdGF0dXMuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfc2VsZWN0b3IuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfd3JhcHBlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2hlbHBfdmlldy5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2tleV9jaGlsZC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL21hY3JvX2NoaWxkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZWRpdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZW1wdHkuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy90ZXh0X2VkaXRvci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGV4dEVkaXRvci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2RhdGEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2ZhY3RvcnkuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3JvdXRlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vaG9tZS92aWV3cy9sYXlvdXQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3ZpZXdzL3RlbXBsYXRlcy9sYXlvdXQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL3VzYi9jaHJvbWVfd2ViX3VzYl9zZXJ2aWNlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9iaW5kQmFzZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9iZWhhdmlvcnMvbGliL2JpbmRJbnB1dHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9mbGFzaGVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9zdWJtaXRCdXR0b24uY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi90b29sdGlwcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9lbnRpdGllcy9saWIvY29uZmlnLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2huX2VudGl0aWVzL2xpYi9kZWNvcmF0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbGxlY3Rpb24uY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvbW9kZWwuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3NlcnZpY2UuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3ZpZXdzL2ZsYXNoTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvdmlld3MvdGVtcGxhdGVzL2ZsYXNoX2NoaWxkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9tb2RhbC9saWIvYWJzdHJhY3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fbW9kYWwvbGliL21vZGFsX3RlbXBsYXRlLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9tb2RhbC9saWIvdmlldy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9vdmVybGF5L2xpYi9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2phZGUvcnVudGltZS5qcyIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvY2hhcmFjdGVyX21hcC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0L2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVsbC9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Z1bmN0aW9uL2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfbWVkaWEvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9uYXYvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9zZWxlY3Rvci9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL3NpbXBsZV9uYXYvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDR0EsSUFBQSxXQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3dCQUVKLFdBQUEsR0FDRTtJQUFBLGNBQUEsRUFBZ0IsWUFBaEI7Ozt3QkFHRixVQUFBLEdBQVksU0FBQTtJQUdWLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFnQyxDQUFDLE9BQWpDLENBQXlDLE9BQXpDO0lBR0EsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQW9DLENBQUMsT0FBckMsQ0FBNkMsT0FBN0M7SUFDQSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxPQUExQztJQUNBLElBQUMsQ0FBQSxPQUFELENBQUE7QUFDQSxXQUFPO0VBVEc7O3dCQWNaLE9BQUEsR0FBUyxTQUFBO0lBQ1AsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFqQixDQUFBO1dBR0EsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFkLENBQUEsQ0FDQSxDQUFDLElBREQsQ0FDTyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsQ0FBRDtRQUNMLElBQUEsQ0FBYyxDQUFFLENBQUEsQ0FBQSxDQUFoQjtBQUFBLGlCQUFBOztRQUNBLENBQUUsQ0FBQSxDQUFBLENBQUUsQ0FBQyxJQUFMLENBQUE7ZUFDQSxNQUFNLENBQUMsQ0FBUCxHQUFXLENBQUUsQ0FBQSxDQUFB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QyxDQUFDLGFBQUo7SUFDTCxFQUFFLENBQUMsUUFBSCxDQUFZLFFBQVosQ0FBcUIsQ0FBQyxRQUF0QixDQUFBLENBQWdDLENBQUMsV0FBakMsQ0FBNkMsUUFBN0M7SUFDQSxJQUFDLENBQUEsYUFBRCxDQUFlLFdBQUEsR0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFILENBQVEsU0FBUixDQUFELENBQTFCO1dBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBQTtFQUpjOzs7O0dBckJNLEVBQUUsQ0FBQzs7QUE2QjNCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuIyBBcHBsaWNhdGlvbiBjbGFzcyBkZWZpbml0aW9uXG4jIE1hbmFnZXMgbGlmZWN5Y2xlIGFuZCBib290c3RyYXBzIGFwcGxpY2F0aW9uXG5jbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdhcHAgcmVkaXJlY3QnOiAncmVkaXJlY3RUbydcblxuICAjIEludm9rZWQgYWZ0ZXIgY29uc3RydWN0b3JcbiAgaW5pdGlhbGl6ZTogLT5cblxuICAgICMgU3RhcnRzIEhlYWRlciBDb21wb25lbnRcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdoZWFkZXInKS50cmlnZ2VyKCdyZXNldCcpXG5cbiAgICAjIFN0YXJ0cyBIZW5zb24uanMgQ29tcG9uZW50c1xuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2JyZWFkY3J1bWInKS50cmlnZ2VyKCdyZWFkeScpXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnb3ZlcmxheScpLnRyaWdnZXIoJ3JlYWR5JylcbiAgICBAb25SZWFkeSgpXG4gICAgcmV0dXJuIHRydWVcblxuICAjIFN0YXJ0cyB0aGUgYXBwbGljYXRpb25cbiAgIyBTdGFydHMgQmFja2JvbmUuaGlzdG9yeSAoZW5hYmxlcyByb3V0aW5nKVxuICAjIEFuZCBpbml0aWFsaXplcyBzaWRlYmFyIG1vZHVsZVxuICBvblJlYWR5OiAtPlxuICAgIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKVxuXG4gICAgIyBUT0RPIC0gdGhpcyBpcyBhIGhhY2sgdG8gYXV0by1jb25uZWN0IHRvIGEgZGV2aWNlIElGIGl0J3MgYWxyZWFkeSBiZWVuIGNvbm5lY3RlZCB0b1xuICAgIG5hdmlnYXRvci51c2IuZ2V0RGV2aWNlcygpXG4gICAgLnRoZW4oIChkKSA9PlxuICAgICAgcmV0dXJuIHVubGVzcyBkWzBdXG4gICAgICBkWzBdLm9wZW4oKVxuICAgICAgd2luZG93LmQgPSBkWzBdXG4gICAgKVxuXG4gICMgUmVkaXJlY3Rpb24gaW50ZXJmYWNlXG4gICMgVXNlZCBhY2Nyb3NzIHRoZSBhcHBsaWNhdGlvbiB0byByZWRpcmVjdFxuICAjIHRvIHNwZWNpZmljIHZpZXdzIGFmdGVyIHNwZWNpZmljIGFjdGlvbnNcbiAgcmVkaXJlY3RUbzogKHJvdXRlKSAtPlxuICAgIHdpbmRvdy5sb2NhdGlvbiA9IHJvdXRlXG4gICAgcmV0dXJuIHRydWVcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb25cbiIsIlxuIyBBcHBsaWNhdGlvbkxheW91dCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBNYXJpb25ldHRlLkxheW91dFZpZXcgdG8gbWFuYWdlXG4jIHRvcC1sZXZlbCBhcHBsaWNhdGlvbiByZWdpb25zXG5jbGFzcyBBcHBsaWNhdGlvbkxheW91dCBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICBlbDogJ2JvZHknXG5cbiAgdGVtcGxhdGU6IGZhbHNlXG5cbiAgcmVnaW9uczpcbiAgICBoZWFkZXI6ICAgICAnW2FwcC1yZWdpb249aGVhZGVyXSdcbiAgICBvdmVybGF5OiAgICAnW2FwcC1yZWdpb249b3ZlcmxheV0nXG4gICAgZmxhc2g6ICAgICAgJ1thcHAtcmVnaW9uPWZsYXNoXSdcbiAgICBtb2RhbDogICAgICAnW2FwcC1yZWdpb249bW9kYWxdJ1xuICAgIG1haW46ICAgICAgICdbYXBwLXJlZ2lvbj1tYWluXSdcblxuIyAjICMgIyAjXG5cbiMgRXhwb3J0cyBpbnN0YW5jZVxubW9kdWxlLmV4cG9ydHMgPSBuZXcgQXBwbGljYXRpb25MYXlvdXQoKS5yZW5kZXIoKVxuIiwiXG4jIE1hcmlvbmV0dGUgQmVoYXZpb3IgTWFuaWZlc3Rcbm1vZHVsZS5leHBvcnRzID1cbiAgU3VibWl0QnV0dG9uOiAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi9zdWJtaXRCdXR0b24nXG4gIEZsYXNoZXM6ICAgICAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvZmxhc2hlcydcbiAgTW9kZWxFdmVudHM6ICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi9tb2RlbEV2ZW50cydcbiAgQmluZElucHV0czogICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi9iaW5kSW5wdXRzJ1xuICBUb29sdGlwczogICAgICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL3Rvb2x0aXBzJ1xuICBTZWxlY3RhYmxlQ2hpbGQ6ICByZXF1aXJlICcuL3NlbGVjdGFibGVDaGlsZCdcbiAgS2V5Ym9hcmRDb250cm9sczogIHJlcXVpcmUgJy4va2V5Ym9hcmRDb250cm9scydcbiAgU29ydGFibGVDaGlsZDogICAgcmVxdWlyZSAnLi9zb3J0YWJsZUNoaWxkJ1xuICBTb3J0YWJsZUxpc3Q6ICAgICByZXF1aXJlICcuL3NvcnRhYmxlTGlzdCdcbiIsIiMgTk9URSAtIHRoaXMgYmVoYXZpb3IgaGFzIG5vdCBiZWVuIHRlc3RlZCB3aXRoIG11bHRpcGxlIHZpZXdzIHNpbXVsdGFuZW91c2x5XG5cbiMgRW5hYmxlcyB2aWV3IGNhbGxiYWNrcyB0byBiZSB0cmlnZ2VyZWQgYnkga2V5Ym9hcmQgaW5wdXRcbmNsYXNzIEtleWJvYXJkQ29udHJvbHMgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAa2V5RXZlbnRzID0gQG9wdGlvbnMua2V5RXZlbnRzXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgQGFkZEV2ZW50TGlzdGVuZXIoKVxuXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBAcmVtb3ZlRXZlbnRMaXN0ZW5lcigpXG5cbiAga2V5QWN0aW9uOiAoZSkgPT5cblxuICAgICMgY29uc29sZS5sb2coZSk7XG5cbiAgICAjIElzb2xhdGVzIHRoZSBrZXlzdHJva2VcbiAgICAjIGtleUNvZGUgPSBlLmtleUNvZGVcblxuICAgIHJldHVybiBAdmlldy50cmlnZ2VyTWV0aG9kKCdrZXk6YWN0aW9uJywgZSlcblxuICAgICMgRG8gbm90aGluZyBpZiB0aGVyZSBpc24ndCBhblxuICAgICMgZXZlbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXlzdHJva2VcbiAgICAjIHJldHVybiB1bmxlc3MgQGtleUV2ZW50c1trZXlDb2RlXVxuXG4gICAgIyBQcmV2ZW50cyBhbnkgZGVmYXVsdCBhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXljb2RlXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAjIFRyaWdnZXJzIHRoZSBldmVudCBhc3NvY2lhdGVkIHdpdGhcbiAgICAjIHRoZSBrZXlzdHJva2Ugb24gdGhlIHZpZXcgaW5zdGFuY2VcbiAgICAjIHJldHVybiBAdmlldy50cmlnZ2VyTWV0aG9kKEBrZXlFdmVudHNba2V5Q29kZV0pXG5cbiAgYWRkRXZlbnRMaXN0ZW5lcjogLT5cbiAgICAkKGRvY3VtZW50KS5vbiAna2V5ZG93bicsIEBrZXlBY3Rpb25cbiAgICAkKGRvY3VtZW50KS5vbiAna2V5dXAnLCBAa2V5QWN0aW9uXG4gICAgIyAkKGRvY3VtZW50KS5vbiAna2V5cHJlc3MnLCBAa2V5QWN0aW9uXG4gICAgIyBSYWRpby5jaGFubmVsKCdmbGFzaCcpLnRyaWdnZXIoJ2FkZCcsIHsgY29udGV4dDogJ2luZm8nLCB0aW1lb3V0OiAxNTAwLCBtZXNzYWdlOiAnS2V5Ym9hcmQgY29udHJvbHMgZW5hYmxlZCd9KVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6IC0+XG4gICAgJChkb2N1bWVudCkub2ZmICdrZXlkb3duJywgQGtleUFjdGlvblxuICAgICQoZG9jdW1lbnQpLm9mZiAna2V5dXAnLCBAa2V5QWN0aW9uXG4gICAgIyAkKGRvY3VtZW50KS5vZmYgJ2tleXByZXNzJywgQGtleUFjdGlvblxuICAgICMgUmFkaW8uY2hhbm5lbCgnZmxhc2gnKS50cmlnZ2VyKCdhZGQnLCB7IGNvbnRleHQ6ICdpbmZvJywgdGltZW91dDogMTUwMCwgbWVzc2FnZTogJ0tleWJvYXJkIGNvbnRyb2xzIGRpc2FibGVkJ30pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkQ29udHJvbHNcbiIsIlxuY2xhc3MgU2VsZWN0YWJsZUNoaWxkIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIGNzczpcbiAgICBhY3RpdmU6ICdhY3RpdmUnXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayc6ICAnb25DbGljaydcblxuICBtb2RlbEV2ZW50czpcbiAgICAnc2VsZWN0ZWQnOiAnb25DbGljaydcblxuICAjIFNlbGVjdHMgYWN0aXZlTW9kZWwgb24gcmVuZGVyXG4gIG9uUmVuZGVyOiAtPlxuICAgIHJldHVybiB1bmxlc3MgQG9wdGlvbnMuc2V0QWN0aXZlXG5cbiAgIyBJbnZva2VkIHdoZW4gY2xpY2tlZFxuICBvbkNsaWNrOiAoZSkgLT5cbiAgICAjIEJ5cGFzcyBiZWhhdmlvciB3aXRoIGN1c3RvbSBvbkNsaWNrIGNhbGxiYWNrXG4gICAgcmV0dXJuIEB2aWV3Lm9uQ2xpY2soZSkgaWYgQHZpZXcub25DbGlja1xuXG4gICAgIyBQcmV2ZW50IGRvdWJsZS1jbGljayB1bmxlc3Mgc3BlY2lmaWNlZFxuICAgIGU/LnByZXZlbnREZWZhdWx0KCkgdW5sZXNzIEBvcHRpb25zLmRvdWJsZUNsaWNrXG5cbiAgICAjIEhhbmRsZXMgZGUtc2VsZWN0aW9uXG4gICAgaWYgQG9wdGlvbnMuZGVzZWxlY3QgJiYgQCRlbC5oYXNDbGFzcyhAY3NzLmFjdGl2ZSlcbiAgICAgIEAkZWwucmVtb3ZlQ2xhc3MoQGNzcy5hY3RpdmUpXG4gICAgICByZXR1cm4gQHZpZXcudHJpZ2dlck1ldGhvZCAnZGVzZWxlY3RlZCdcblxuICAgICMgUmV0dXJuIGlmIGVsZW1lbnQgaXMgY3VycmVudGx5IHNlbGVjdGVkXG4gICAgcmV0dXJuIGlmIEAkZWwuaGFzQ2xhc3MoQGNzcy5hY3RpdmUpXG5cbiAgICAjIFByZXZlbnQgZGVhZnVsdCBhbmQgdHJpZ2dlciBzZWxlY3RlZFxuICAgIGU/LnByZXZlbnREZWZhdWx0KClcbiAgICBAdmlldy50cmlnZ2VyTWV0aG9kICdzZWxlY3RlZCdcbiAgICBAJGVsLmFkZENsYXNzKEBjc3MuYWN0aXZlKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKEBjc3MuYWN0aXZlKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RhYmxlQ2hpbGRcbiIsIlxuIyBTb3J0YWJsZUNoaWxkIEJlaGF2aW9yIGRlZmluaXRpb25cbiMgV29ya3Mgd2l0aCBTb3J0YWJsZUxpc3QgQmVoYXZpb3JcbmNsYXNzIFNvcnRhYmxlQ2hpbGQgZXh0ZW5kcyBNbi5CZWhhdmlvclxuXG4gIGV2ZW50czpcbiAgICAnc29ydGVkJzogJ29uU29ydGVkJ1xuXG4gIG9uU29ydGVkOiAoZSwgb3JkZXIpIC0+XG4gICAgQHZpZXcubW9kZWwuc2V0KCdvcmRlcicsIG9yZGVyKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTb3J0YWJsZUNoaWxkXG4iLCJcbiMgU29ydGFibGVMaXN0IEJlaGF2aW9yIGRlZmluaXRpb25cbiMgV29ya3Mgd2l0aCBTb3J0YWJsZUNoaWxkIEJlaGF2aW9yXG5jbGFzcyBTb3J0YWJsZUxpc3QgZXh0ZW5kcyBNbi5CZWhhdmlvclxuXG4gICMgRGVmaW5lcyB0aGUgcmVvcmRlckNvbGxlY3Rpb24gbWV0aG9kIG9uIHRoZSB2aWV3XG4gICMgdG8gd2hpY2ggdGhlIGJlaGF2aW9yIGlzIGFzc2lnbmVkXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQHZpZXcucmVvcmRlckNvbGxlY3Rpb24gPSA9PiBAcmVvcmRlckNvbGxlY3Rpb24oKVxuXG4gIG9uUmVuZGVyOiAtPlxuXG4gICAgIyBJbml0aWFsaXplcyBTb3J0YWJsZSBjb250YWluZXJcbiAgICBTb3J0YWJsZS5jcmVhdGUgQHZpZXcuZWwsXG4gICAgICBoYW5kbGU6ICAgICAgIEBvcHRpb25zLmhhbmRsZSB8fCAnLnNvcnRhYmxlJ1xuICAgICAgYW5pbWF0aW9uOiAgICBAb3B0aW9ucy5hbmltYXRpb24gfHwgMjUwXG4gICAgICBvbkVuZDogKGUpID0+IEByZW9yZGVyQ29sbGVjdGlvbigpXG5cbiAgIyByZW9yZGVyQ29sbGVjdGlvblxuICAjIEludm9rZWQgYWZ0ZXIgc29ydGluZyBoYXMgY29tcGxldGVkXG4gIHJlb3JkZXJDb2xsZWN0aW9uOiA9PlxuXG4gICAgIyBUcmlnZ2VycyBvcmRlciBldmVudHMgb24gQ29sbGVjdGlvblZpZXcgY2hpbGRWaWV3ICRlbHNcbiAgICBvcmRlciA9IDFcbiAgICBmb3IgZWwgaW4gQHZpZXcuJGVsWzBdLmNoaWxkcmVuXG4gICAgICAkKGVsKS50cmlnZ2VyKCdzb3J0ZWQnLG9yZGVyKVxuICAgICAgb3JkZXIrK1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTb3J0YWJsZUxpc3RcbiIsIkFib3V0VmlldyAgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyAjICMgIyAjXG5cbmNsYXNzIEFib3V0Q29tcG9uZW50IGV4dGVuZHMgcmVxdWlyZSAnaG5fbW9kYWwvbGliL2Fic3RyYWN0J1xuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdhYm91dCBzaG93JzogJ3Nob3dBYm91dCdcblxuICBzaG93QWJvdXQ6IC0+XG4gICAgYWJvdXRWaWV3ID0gbmV3IEFib3V0VmlldygpXG4gICAgQHNob3dNb2RhbChhYm91dFZpZXcsIHsgc2l6ZTogJ2xhcmdlJyB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBBYm91dENvbXBvbmVudFxuIiwiXG4jIEFib3V0VmlldyBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBBYm91dFZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9hYm91dCdcbiAgY2xhc3NOYW1lOiAnbW9kYWwtY29udGVudCdcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQWJvdXRWaWV3XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PGg1IGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+QUJPVVQ8L2g1PjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PGhyLz48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgdGV4dC1jZW50ZXJcXFwiPjxwIGNsYXNzPVxcXCJsZWFkXFxcIj48YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vQXN0cm9LZXlcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj4gQXN0cm9LZXk8L2E+IGlzIGFuIG9wZW4tc291cmNlIHBsYXRmb3JtIGZvciByZS1wcm9ncmFtbWFibGUgVVNCIGtleWJvYXJkcy48L3A+PHA+QXN0cm9LZXkgcHJvdmlkZXMgYW4gaW50dWl0aXZlIGludGVyZmFjZSBhbnlib2R5IGNhbiB1c2UgdG8gYXV0b21hdGUgYmFzaWMga2V5Ym9hcmQgYWN0aW9ucy48L3A+PHA+U2ltcGx5IGRyYWcgYW5kIGRyb3Aga2V5Ym9hcmQga2V5cyB0byBjb25zdHJ1Y3QgeW91ciBkZXNpcmVkIHNlcXVlbmNlIC0gQXN0cm9LZXkgZG9lcyB0aGUgcmVzdC48L3A+PHA+SXQncyB0aGF0IGVhc3kuPC9wPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PGhyLz48cD5CdWlsdCBieSZuYnNwOzxhIGhyZWY9XFxcImh0dHBzOi8vZ2l0aHViLmNvbS9BYXJvblBlcmxcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5BYXJvbiBQZXJsPC9hPiZuYnNwO2FuZCZuYnNwOzxhIGhyZWY9XFxcImh0dHA6Ly9hZWtzLmNvXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+QWxleGFuZGVyIFNjaHdhcnR6YmVyZzwvYT4mbmJzcDtmb3ImbmJzcDs8YSBocmVmPVxcXCJodHRwczovL3Jjb3MuaW8vXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+UkNPUy48L2E+PC9wPjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJMYXlvdXRWaWV3ID0gcmVxdWlyZSAnLi92aWV3cy9sYXlvdXQnXG5cbiMgSGVhZGVyU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBiYXNpYyBzZXJ2aWNlIGZvciBtYW5hZ2luZyBhcHBsaWNhdGlvblxuIyBoZWFkZXIgc3RhdGUuIERpc3BsYXlzIHRoZSBhdXRoZW50aWNhdGVkIHVzZXIsXG4jIG9yIHRoZSAndW5hdXRoZW50aWNhdGVkJyBtZXNzYWdlIGlmIG5vbmUgaXMgZGVmaW5lZFxuY2xhc3MgSGVhZGVyU2VydmljZSBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGNvbnRhaW5lciA9IEBvcHRpb25zLmNvbnRhaW5lclxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdoZWFkZXIgcmVzZXQnOiAncmVzZXQnXG5cbiAgcmVzZXQ6IC0+XG4gICAgQGNvbnRhaW5lci5zaG93IG5ldyBMYXlvdXRWaWV3KClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyU2VydmljZVxuIiwiXG4jIEhlYWRlclZpZXcgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgc2ltYnBsZSB2aWV3IGZvciBkaXNwbGF5aW5nIHRoZVxuIyBoZWFkZXIgb2YgdGhlIGFwcGxpY2F0aW9uLiBUaGUgaGVhZGVyIGRpc3BsYXlzXG4jIHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgYW5kXG4jIG1hbmFnZXMgdG9nZ2xpbmcgdGhlIFNpZGViYXJDb21wb25lbnQncyB2aWV3XG5jbGFzcyBIZWFkZXJWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9oZWFkZXInXG4gIGNsYXNzTmFtZTogJ25hdmJhciBuYXZiYXItZXhwYW5kLWxnIGZpeGVkLXRvcCBuYXZiYXItZGFyayBiZy1kYXJrJ1xuICB0YWdOYW1lOiAnbmF2J1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJWaWV3XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJuYXZiYXItYnJhbmQgdGl0bGVcXFwiPkFTVFJPS0VZPC9kaXY+PHVsIGNsYXNzPVxcXCJuYXZiYXItbmF2IG1yLWF1dG9cXFwiPjxsaSBjbGFzcz1cXFwibmF2LWl0ZW1cXFwiPjxhIHN0eWxlPVxcXCJjdXJzb3I6cG9pbnRlclxcXCIgb25DbGljaz1cXFwiUmFkaW8uY2hhbm5lbCgndXNiJykucmVxdWVzdCgnZGV2aWNlcycpO1xcXCIgY2xhc3M9XFxcIm5hdi1saW5rXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtbGcgZmEtdXNiXFxcIj48L2k+PC9hPjwvbGk+PGxpIGNsYXNzPVxcXCJuYXYtaXRlbVxcXCI+PGEgc3R5bGU9XFxcImN1cnNvcjpwb2ludGVyXFxcIiBvbkNsaWNrPVxcXCJSYWRpby5jaGFubmVsKCdhYm91dCcpLnRyaWdnZXIoJ3Nob3cnKTtcXFwiIGNsYXNzPVxcXCJuYXYtbGlua1xcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLWxnIGZhLXF1ZXN0aW9uLWNpcmNsZS1vXFxcIj48L2k+PC9hPjwvbGk+PC91bD5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiIyBTdXBwb3J0IGZvciBjcm9zcy1kb21haW4gcmVxdWVzdHMgaW4gQmFja2JvbmUuanMgLSB1c3VhbGx5IHZlcmJvdGVuLlxuIyBUaGlzIGFsbG93cyB0aGUgZGV2IHNlcnZlciBhdCBsb2NhbC5jb3J0aWNhbG1ldHJpY3MuY29tOjgwODAgdG8gY29tbXVuaWNhdGUgd2l0aCBkZXYuY29ydGljYWxtZXRyaWNzLmNvbTozMDAwIChjbS1ub2RlLWFwcClcblxuY3Jvc3NEb21haW5Sb290ID0gJ2h0dHA6Ly8xOTIuMTY4LjMzLjMzOjMwMDAnICMgREVWIE9OTFlcblxucHJveGllZFN5bmMgPSBCYWNrYm9uZS5zeW5jXG5cbkJhY2tib25lLnN5bmMgPSAobWV0aG9kLCBtb2RlbCwgb3B0aW9ucyA9IHt9KSA9PlxuXG4gIGlmICFvcHRpb25zLnVybFxuICAgIG9wdGlvbnMudXJsID0gY3Jvc3NEb21haW5Sb290ICsgXy5yZXN1bHQobW9kZWwsICd1cmwnKSB8fCB1cmxFcnJvcigpXG5cbiAgZWxzZSBpZiBvcHRpb25zLnVybC5zdWJzdHJpbmcoMCwgNikgIT0gY3Jvc3NEb21haW5Sb290LnN1YnN0cmluZygwLCA2KVxuICAgIG9wdGlvbnMudXJsID0gY3Jvc3NEb21haW5Sb290ICsgb3B0aW9ucy51cmxcblxuICBpZiAhb3B0aW9ucy5jcm9zc0RvbWFpblxuICAgIG9wdGlvbnMuY3Jvc3NEb21haW4gPSB0cnVlXG5cbiAgaWYgIW9wdGlvbnMueGhyRmllbGRzXG4gICAgb3B0aW9ucy54aHJGaWVsZHMgPSB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9XG5cbiAgcmV0dXJuIHByb3hpZWRTeW5jKG1ldGhvZCwgbW9kZWwsIG9wdGlvbnMpXG4iLCIjIEFwcCBjb25maWd1cmF0aW9uIG1hbmlmZXN0XG5yZXF1aXJlICcuL3dpbmRvdydcbnJlcXVpcmUgJy4vand0J1xucmVxdWlyZSAnLi9jb3JzJ1xucmVxdWlyZSAnLi9tYXJpb25ldHRlJ1xuIiwiIyBBamF4IEpXVCBTaGltXG4kLmFqYXhTZXR1cFxuICBiZWZvcmVTZW5kOiAoeGhyKSAtPlxuICAgIHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJylcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsICdKV1QgJyArIHRva2VuKSBpZiB0b2tlblxuICAgIHJldHVyblxuIiwiIyBNYXJpb25ldHRlLkJlaGF2aW9ycyBjb25maWd1cmF0aW9uXG5NYXJpb25ldHRlLkJlaGF2aW9ycy5iZWhhdmlvcnNMb29rdXAgPSAtPiByZXF1aXJlICcuLi9iZWhhdmlvcnMnXG4iLCIjIEFsaWFzZXMgQmFja2JvbmUuUmFkaW8gdG8gd2luZG93LlJhZGlvXG53aW5kb3cuUmFkaW8gPSBCYWNrYm9uZS5SYWRpb1xuIiwiIyBUaGlzIGZpbGUgZGVmaW5lcyBhIG1hbmlmZXN0IGZvciB0aGUgY2xpZW50IGFwcGxpY2F0aW9uLlxuIyBUaGlzIGluY2x1ZGVzIGNvbmZpZ3VyYXRpb24sIFNlcnZpY2VzLCBDb21wb25lbnRzLCBNb2R1bGVzXG4jIGFuZCB0aGUgQXBwbGljYXRpb24gc2luZ2xldG9uIGluc3RhbmNlLlxuXG4jICMgIyAjICNcblxuIyBBcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uIG1hbmlmZXN0XG5yZXF1aXJlICcuL2NvbmZpZydcblxuIyBBcHBsaWNhdGlvbiBjbGFzcyBkZWZpbml0aW9uICYgQXBwIExheW91dFxuQXBwICAgICAgID0gcmVxdWlyZSAnLi9hcHAnXG5BcHBMYXlvdXQgPSByZXF1aXJlICcuL2FwcGxpY2F0aW9uL3ZpZXdzL2xheW91dCdcblxuIyBIZW5zb24gRW50aXRpZXNcbnJlcXVpcmUgJ2huX2VudGl0aWVzL2xpYi9jb25maWcnXG5cbiMgIyAjICMgI1xuXG4jIENvbXBvbmVudHMgYXJlIHJvdXRlbGVzcyBzZXJ2aWNlcyB3aXRoIHZpZXdzIHRoYXQgYXJlXG4jIGFjY2Vzc2libGUgYW55d2hlcmUgaW4gdGhlIGFwcGxpY2F0aW9uXG4jIFVzZWQgdG8gbWFuYWdlIHRoZSBoZWFkZXIsIHNpZGViYXIsIGZsYXNoLCBhbmQgY29uZmlybSBVSSBlbGVtZW50c1xuXG4jIEhlbnNvbi5qcyBDb21wb25lbnRzXG5IZWFkZXJDb21wb25lbnQgICAgID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL2hlYWRlci9jb21wb25lbnQnXG5BYm91dENvbXBvbmVudCAgICAgID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL2Fib3V0L2NvbXBvbmVudCdcbk92ZXJsYXlDb21wb25lbnQgICAgPSByZXF1aXJlICdobl9vdmVybGF5L2xpYi9jb21wb25lbnQnXG5GbGFzaENvbXBvbmVudCAgICAgID0gcmVxdWlyZSAnaG5fZmxhc2gvbGliL2NvbXBvbmVudCdcbm5ldyBIZWFkZXJDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5oZWFkZXIgfSlcbm5ldyBPdmVybGF5Q29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQub3ZlcmxheSB9KVxubmV3IEZsYXNoQ29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQuZmxhc2ggfSlcbm5ldyBBYm91dENvbXBvbmVudCh7IGNvbnRhaW5lcjogQXBwTGF5b3V0Lm1vZGFsIH0pXG5cbiMgIyAjICMgI1xuXG4jIFNlcnZpY2VzXG5yZXF1aXJlKCcuL21vZHVsZXMvdXNiL2Nocm9tZV93ZWJfdXNiX3NlcnZpY2UnKVxuIyByZXF1aXJlKCcuL21vZHVsZXMvdXNiL2Nocm9tZV93ZWJfYmx1ZXRvb3RoX3NlcnZpY2UnKVxuXG4jIEZhY3Rvcmllc1xucmVxdWlyZSgnLi9tb2R1bGVzL2tleS9mYWN0b3J5JylcblxuIyAjICMgIyAjXG5cbiMgTW9kdWxlc1xuIyBNb2R1bGVzIHJlcHJlc2VudCBjb2xsZWN0aW9ucyBvZiBlbmRwb2ludHMgaW4gdGhlIGFwcGxpY2F0aW9uLlxuIyBUaGV5IGhhdmUgcm91dGVzIGFuZCBlbnRpdGllcyAobW9kZWxzIGFuZCBjb2xsZWN0aW9ucylcbiMgRWFjaCByb3V0ZSByZXByZXNlbnRzIGFuIGVuZHBvaW50LCBvciAncGFnZScgaW4gdGhlIGFwcC5cbk1haW5Nb2R1bGUgPSByZXF1aXJlICcuL21vZHVsZXMvbWFpbi9yb3V0ZXInXG5uZXcgTWFpbk1vZHVsZSh7IGNvbnRhaW5lcjogQXBwTGF5b3V0Lm1haW4gfSlcblxuIyAjICMgIyAjICNcblxuIyBQYWdlIGhhcyBsb2FkZWQsIGRvY3VtZW50IGlzIHJlYWR5XG4kKGRvY3VtZW50KS5vbiAncmVhZHknLCA9PiBuZXcgQXBwKCkgIyBJbnN0YW50aWF0ZXMgbmV3IEFwcFxuIiwiXG4jIEtleU1vZGVsIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEtleU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6IHt9XG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogS2V5TW9kZWxcbiAgY29tcGFyYXRvcjogJ29yZGVyJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPVxuICBNb2RlbDogICAgICBLZXlNb2RlbFxuICBDb2xsZWN0aW9uOiBLZXlDb2xsZWN0aW9uXG4iLCJFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKVxuS2V5RGF0YSA9IHJlcXVpcmUoJy4va2V5cycpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlGYWN0b3J5IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAna2V5IG1vZGVsJzogICAgICAgJ2dldE1vZGVsJ1xuICAgICdrZXkgY29sbGVjdGlvbic6ICAnZ2V0Q29sbGVjdGlvbidcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjYWNoZWRDb2xsZWN0aW9uID0gbmV3IEVudGl0aWVzLkNvbGxlY3Rpb24oS2V5RGF0YSwgeyBwYXJzZTogdHJ1ZSB9KVxuXG4gIGdldE1vZGVsOiAoaWQpIC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uLmdldChpZClcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBAY2FjaGVkQ29sbGVjdGlvblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgS2V5RmFjdG9yeSgpXG4iLCJcbiMgS2V5IEpTT04gZGVmaW5pdGlvbnNcbm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHsgcm93OiAncjQnLCBrZXk6ICdgJywgc2hpZnRfa2V5OiAnficsIGtleWNvZGU6IDE5MiB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzEnLCBzaGlmdF9rZXk6ICchJywga2V5Y29kZTogNDkgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICcyJywgc2hpZnRfa2V5OiAnQCcsIGtleWNvZGU6IDUwIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMycsIHNoaWZ0X2tleTogJyMnLCBrZXljb2RlOiA1MSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzQnLCBzaGlmdF9rZXk6ICckJywga2V5Y29kZTogNTIgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc1Jywgc2hpZnRfa2V5OiAnJScsIGtleWNvZGU6IDUzIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNicsIHNoaWZ0X2tleTogJ14nLCBrZXljb2RlOiA1NCB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzcnLCBzaGlmdF9rZXk6ICcmJywga2V5Y29kZTogNTUgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc4Jywgc2hpZnRfa2V5OiAnKicsIGtleWNvZGU6IDU2IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnOScsIHNoaWZ0X2tleTogJygnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzAnLCBzaGlmdF9rZXk6ICcpJywga2V5Y29kZTogNDggfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICctJywgc2hpZnRfa2V5OiAnXycsIGtleWNvZGU6IDE4OSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJz0nLCBzaGlmdF9rZXk6ICcrJywga2V5Y29kZTogMTg3IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnQkFDS1NQQUNFJywga2V5Y29kZTogOCwgY3NzOiAndzJfMCcgfVxuXG4gICAgeyByb3c6ICdyMycsIGtleTogJ1RBQicsIGtleWNvZGU6IDksIGNzczogJ3cxXzUnLCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAncScsIHNoaWZ0X2tleTogJ1EnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODEgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICd3Jywgc2hpZnRfa2V5OiAnVycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4NyB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ2UnLCBzaGlmdF9rZXk6ICdFJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDY5IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAncicsIHNoaWZ0X2tleTogJ1InLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODIgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICd0Jywgc2hpZnRfa2V5OiAnVCcsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4NCB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ3knLCBzaGlmdF9rZXk6ICdZJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg5IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAndScsIHNoaWZ0X2tleTogJ1UnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODUgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdpJywgc2hpZnRfa2V5OiAnSScsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3MyB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ28nLCBzaGlmdF9rZXk6ICdPJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDc5IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAncCcsIHNoaWZ0X2tleTogJ1AnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODAgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdbJywgc2hpZnRfa2V5OiAneycsIGtleWNvZGU6IDIxOSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ10nLCBzaGlmdF9rZXk6ICd9Jywga2V5Y29kZTogMjIxIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnXFxcXCcsIHNoaWZ0X2tleTogJ3wnLCBrZXljb2RlOiAyMjAsIGNzczogJ3cxXzUnIH1cblxuICAgIHsgcm93OiAncjInLCBrZXk6ICdDQVBTJywgY3NzOiAndzFfNzUnLCBrZXljb2RlOiAyMCwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2EnLCBzaGlmdF9rZXk6ICdBJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDY1IH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAncycsIHNoaWZ0X2tleTogJ1MnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODMgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdkJywgc2hpZnRfa2V5OiAnRCcsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA2OCB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2YnLCBzaGlmdF9rZXk6ICdGJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDcwIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnZycsIHNoaWZ0X2tleTogJ0cnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzEgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdoJywgc2hpZnRfa2V5OiAnSCcsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3MiB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2onLCBzaGlmdF9rZXk6ICdKJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDc0IH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnaycsIHNoaWZ0X2tleTogJ0snLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzUgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdsJywgc2hpZnRfa2V5OiAnTCcsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3NiB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJzsnLCBzaGlmdF9rZXk6ICc6Jywga2V5Y29kZTogMTg2IH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiBcIidcIiwgc2hpZnRfa2V5OiAnXCInLCBrZXljb2RlOiAyMjIgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdSRVRVUk4nLCBjc3M6ICd3Ml8yNScsIGtleWNvZGU6IDEzLCBzcGVjaWFsOiB0cnVlIH1cblxuICAgIHsgcm93OiAncjEnLCBrZXk6ICdTSElGVCcsIGNzczogJ3cyXzI1Jywga2V5Y29kZTogMTYsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICd6Jywgc2hpZnRfa2V5OiAnWicsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA5MCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ3gnLCBzaGlmdF9rZXk6ICdYJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg4IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnYycsIHNoaWZ0X2tleTogJ0MnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNjcgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICd2Jywgc2hpZnRfa2V5OiAnVicsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4NiB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ2InLCBzaGlmdF9rZXk6ICdCJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDY2IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnbicsIHNoaWZ0X2tleTogJ04nLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzggfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICdtJywgc2hpZnRfa2V5OiAnTScsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3NyB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJywnLCBzaGlmdF9rZXk6ICc8Jywga2V5Y29kZTogMTg4IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnLicsIHNoaWZ0X2tleTogJz4nLCBrZXljb2RlOiAxOTAgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICcvJywgc2hpZnRfa2V5OiAnPycsIGtleWNvZGU6IDE5MSB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ1NISUZUJywgY3NzOiAndzJfNzUnLCBrZXljb2RlOiAxNiwgc3BlY2lhbDogdHJ1ZSB9XG5cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnQ1RSTCcsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTcsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdNJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiA5MSwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0FMVCcsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTgsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdTUEFDRScsIGNzczogJ3NwYWNlJywga2V5Y29kZTogMzIsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdDVFJMJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxNywgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ00nLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE4LCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnUCcsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogOTMsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdBTFQnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE4LCBzcGVjaWFsOiB0cnVlIH1cblxuICAgICMgTlVNUEFEIEtFWVNcbiAgICB7IHJvdzogJ251bV9yMCcsIGtleTogJzAnLCBrZXljb2RlOiA0OSwgY3NzOiAndzJfMjUnIH1cbiAgICB7IHJvdzogJ251bV9yMCcsIGtleTogJy4nLCBrZXljb2RlOiA0OSB9XG5cbiAgICB7IHJvdzogJ251bV9yMScsIGtleTogJzEnLCBrZXljb2RlOiA0OSB9XG4gICAgeyByb3c6ICdudW1fcjEnLCBrZXk6ICcyJywga2V5Y29kZTogNTAgfVxuICAgIHsgcm93OiAnbnVtX3IxJywga2V5OiAnMycsIGtleWNvZGU6IDUxIH1cblxuICAgIHsgcm93OiAnbnVtX3IyJywga2V5OiAnNCcsIGtleWNvZGU6IDUyIH1cbiAgICB7IHJvdzogJ251bV9yMicsIGtleTogJzUnLCBrZXljb2RlOiA1MyB9XG4gICAgeyByb3c6ICdudW1fcjInLCBrZXk6ICc2Jywga2V5Y29kZTogNTQgfVxuXG4gICAgeyByb3c6ICdudW1fcjMnLCBrZXk6ICc3Jywga2V5Y29kZTogNTUgfVxuICAgIHsgcm93OiAnbnVtX3IzJywga2V5OiAnOCcsIGtleWNvZGU6IDU2IH1cbiAgICB7IHJvdzogJ251bV9yMycsIGtleTogJzknLCBrZXljb2RlOiA1NyB9XG5cbiAgICB7IHJvdzogJ251bV9yNCcsIGtleTogJ0NMRUFSJywga2V5Y29kZTogNDggfVxuICAgIHsgcm93OiAnbnVtX3I0Jywga2V5OiAnLycsIGtleWNvZGU6IDE4OSB9XG4gICAgeyByb3c6ICdudW1fcjQnLCBrZXk6ICcqJywga2V5Y29kZTogMTg3IH1cblxuICAgIHsgcm93OiAnbnVtX2NvbCcsIGtleTogJy0nLCBrZXljb2RlOiA0OCB9XG4gICAgeyByb3c6ICdudW1fY29sJywga2V5OiAnKycsIGtleWNvZGU6IDE4OSwgY3NzOiAnaDJfMCcgfVxuICAgIHsgcm93OiAnbnVtX2NvbCcsIGtleTogJ0VOVEVSJywga2V5Y29kZTogMTg3LCBjc3M6ICdoMl8wJyB9XG5cbiAgICAjIEZ1bmN0aW9uIEtleXNcbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMScsIGtleWNvZGU6IDQ5IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMicsIGtleWNvZGU6IDUwIH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMycsIGtleWNvZGU6IDUxIH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGNCcsIGtleWNvZGU6IDUyIH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGNScsIGtleWNvZGU6IDUzIH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGNicsIGtleWNvZGU6IDU0IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGNycsIGtleWNvZGU6IDU1IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGOCcsIGtleWNvZGU6IDU2IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGOScsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTAnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjExJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxMicsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NyB9XG5cbiAgICAjIE1lZGlhIEtleXNcbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS1zdGVwLWJhY2t3YXJkJyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtcGxheScgfVxuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXN0ZXAtZm9yd2FyZCcgfVxuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXZvbHVtZS1vZmYnIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS12b2x1bWUtZG93bicgfVxuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXZvbHVtZS11cCcgfVxuXG4gICAgIyBOYXZpZ2F0aW9uIEtleXNcbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ1BHVVAnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdQR0ROJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnRU5EJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnSE9NRScsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0xFRlQtQVJST1cnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLWNoZXZyb24tbGVmdCcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnVVAtQVJST1cnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLWNoZXZyb24tdXAnIH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0RPV04tQVJST1cnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLWNoZXZyb24tZG93bicgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnUklHSFQtQVJST1cnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLWNoZXZyb24tcmlnaHQnIH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0lOUycsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0RFTCcsIGtleWNvZGU6IDQ2IH1cblxuXVxuXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChyMCkge1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24oKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPHVsIGNsYXNzPVxcXCJsaXN0LXVuc3R5bGVkIG1iLTAga2V5Ym9hcmQtLXJvdyB3LTEwMFxcXCI+XCIpO1xuYmxvY2sgJiYgYmxvY2soKTtcbmJ1Zi5wdXNoKFwiPC91bD5cIik7XG59O1xuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxsaVwiICsgKGphZGUuYXR0cihcImRhdGEta2V5Y29kZVwiLCBvcHRzLmtleWNvZGUsIHRydWUsIGZhbHNlKSkgKyBcIiBkYXRhLWNsaWNrPVxcXCJrZXlcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXlcIiwgb3B0cy5rZXksIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydidG4nLCdidG4tb3V0bGluZS1saWdodCcsJ2tleWJvYXJkLS1rZXknLG9wdHMuY3NzXSwgW251bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIG9wdHMuaWNvbilcbntcbmJ1Zi5wdXNoKFwiPGlcIiArIChqYWRlLmNscyhbJ2ZhJywnZmEtZncnLG9wdHMuaWNvbl0sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT5cIik7XG59XG5lbHNlXG57XG5pZiAoIG9wdHMua2V5ICYmIG9wdHMuc2hpZnRfa2V5ICYmICFvcHRzLmFscGhhKVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJzaGlmdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLnNoaWZ0X2tleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+PGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmVsc2UgaWYgKCBvcHRzLmFscGhhKVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLnNoaWZ0X2tleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxufVxuYnVmLnB1c2goXCI8L2xpPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImtleWJvYXJkLS1ib2R5XFxcIj5cIik7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIwXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIwO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5idWYucHVzaChcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcInIwXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMDp0eXBlb2YgcjAhPT1cInVuZGVmaW5lZFwiP3IwOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHIwLCByMSwgcjIsIHIzLCByNCkge1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24oKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPHVsIGNsYXNzPVxcXCJsaXN0LXVuc3R5bGVkIG1iLTAga2V5Ym9hcmQtLXJvdyB3LTEwMFxcXCI+XCIpO1xuYmxvY2sgJiYgYmxvY2soKTtcbmJ1Zi5wdXNoKFwiPC91bD5cIik7XG59O1xuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxsaVwiICsgKGphZGUuYXR0cihcImRhdGEta2V5Y29kZVwiLCBvcHRzLmtleWNvZGUsIHRydWUsIGZhbHNlKSkgKyBcIiBkYXRhLWNsaWNrPVxcXCJrZXlcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXlcIiwgb3B0cy5rZXksIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydidG4nLCdidG4tb3V0bGluZS1saWdodCcsJ2tleWJvYXJkLS1rZXknLG9wdHMuY3NzXSwgW251bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIG9wdHMuaWNvbilcbntcbmJ1Zi5wdXNoKFwiPGlcIiArIChqYWRlLmNscyhbJ2ZhJywnZmEtZncnLG9wdHMuaWNvbl0sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT5cIik7XG59XG5lbHNlXG57XG5pZiAoIG9wdHMua2V5ICYmIG9wdHMuc2hpZnRfa2V5ICYmICFvcHRzLmFscGhhKVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJzaGlmdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLnNoaWZ0X2tleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+PGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmVsc2UgaWYgKCBvcHRzLmFscGhhKVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLnNoaWZ0X2tleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxufVxuYnVmLnB1c2goXCI8L2xpPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImtleWJvYXJkLS1ib2R5XFxcIj5cIik7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHI0XG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHI0O1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIyXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIyO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIxXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIxO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIwXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIwO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5idWYucHVzaChcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcInIwXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMDp0eXBlb2YgcjAhPT1cInVuZGVmaW5lZFwiP3IwOnVuZGVmaW5lZCxcInIxXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMTp0eXBlb2YgcjEhPT1cInVuZGVmaW5lZFwiP3IxOnVuZGVmaW5lZCxcInIyXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMjp0eXBlb2YgcjIhPT1cInVuZGVmaW5lZFwiP3IyOnVuZGVmaW5lZCxcInIzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMzp0eXBlb2YgcjMhPT1cInVuZGVmaW5lZFwiP3IzOnVuZGVmaW5lZCxcInI0XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yNDp0eXBlb2YgcjQhPT1cInVuZGVmaW5lZFwiP3I0OnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGNvbCwgcjAsIHIxLCByMiwgcjMsIHI0LCB1bmRlZmluZWQpIHtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKCl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjx1bCBjbGFzcz1cXFwibGlzdC11bnN0eWxlZCBtYi0wIGtleWJvYXJkLS1yb3cgdy0xMDBcXFwiPlwiKTtcbmJsb2NrICYmIGJsb2NrKCk7XG5idWYucHVzaChcIjwvdWw+XCIpO1xufTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleWNvZGVcIiwgb3B0cy5rZXljb2RlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1jbGljaz1cXFwia2V5XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEta2V5XCIsIG9wdHMua2V5LCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnYnRuJywnYnRuLW91dGxpbmUtbGlnaHQnLCdrZXlib2FyZC0ta2V5JyxvcHRzLmNzc10sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxvcHRzLmljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBvcHRzLmtleSAmJiBvcHRzLnNoaWZ0X2tleSAmJiAhb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlIGlmICggb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbn1cbmJ1Zi5wdXNoKFwiPC9saT5cIik7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tYm9keVxcXCI+PGRpdiBjbGFzcz1cXFwiZC1mbGV4IGZsZXgtcm93XFxcIj48ZGl2IGNsYXNzPVxcXCJkLWZsZXggZmxleC1jb2x1bW5cXFwiPlwiKTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjRcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjQ7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjJcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjI7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjFcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjE7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjBcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjA7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmJ1Zi5wdXNoKFwiPC9kaXY+PGRpdiBjbGFzcz1cXFwiZC1mbGV4IGZsZXgtY29sdW1uXFxcIj5cIik7XG4vLyBpdGVyYXRlIGNvbFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBjb2w7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImNvbFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguY29sOnR5cGVvZiBjb2whPT1cInVuZGVmaW5lZFwiP2NvbDp1bmRlZmluZWQsXCJyMFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjA6dHlwZW9mIHIwIT09XCJ1bmRlZmluZWRcIj9yMDp1bmRlZmluZWQsXCJyMVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjE6dHlwZW9mIHIxIT09XCJ1bmRlZmluZWRcIj9yMTp1bmRlZmluZWQsXCJyMlwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjI6dHlwZW9mIHIyIT09XCJ1bmRlZmluZWRcIj9yMjp1bmRlZmluZWQsXCJyM1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjM6dHlwZW9mIHIzIT09XCJ1bmRlZmluZWRcIj9yMzp1bmRlZmluZWQsXCJyNFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjQ6dHlwZW9mIHI0IT09XCJ1bmRlZmluZWRcIj9yNDp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobmF2SXRlbXMsIHVuZGVmaW5lZCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxkaXYgY2xhc3M9XFxcInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctOCBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+XCIpO1xuLy8gaXRlcmF0ZSBuYXZJdGVtc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBuYXZJdGVtcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIG5hdkl0ZW0gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxidXR0b24gc3R5bGU9XFxcImZsZXgtZ3JvdzoxO1xcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLXRyaWdnZXJcIiwgbmF2SXRlbS50cmlnZ2VyLCB0cnVlLCBmYWxzZSkpICsgXCIgY2xhc3M9XFxcImQtZmxleCBidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IGJ0bi1zbSBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG14LTNcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbmF2SXRlbS50ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2J1dHRvbj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBzdHlsZT1cXFwiZmxleC1ncm93OjE7XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEtdHJpZ2dlclwiLCBuYXZJdGVtLnRyaWdnZXIsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwiZC1mbGV4IGJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkgYnRuLXNtIGp1c3RpZnktY29udGVudC1jZW50ZXIgbXgtM1xcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBuYXZJdGVtLnRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYnV0dG9uPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGhyLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgZGF0YS1yZWdpb249XFxcImNvbnRlbnRcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjwvZGl2PjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcIm5hdkl0ZW1zXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5uYXZJdGVtczp0eXBlb2YgbmF2SXRlbXMhPT1cInVuZGVmaW5lZFwiP25hdkl0ZW1zOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJNYWNyb0V4YW1wbGVzID0gcmVxdWlyZSgnLi9leGFtcGxlcycpXG5jaGFyTWFwID0gcmVxdWlyZSgnbGliL2NoYXJhY3Rlcl9tYXAnKVxuXG4jICMgIyAjICNcblxuIyBNYWNyb01vZGVsIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIE1hY3JvTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIERlZmF1bHQgYXR0cmlidXRlc1xuICBkZWZhdWx0czpcbiAgICBvcmRlcjogMFxuICAgIHBvc2l0aW9uOiAwXG4gICAgc2hpZnRlZDogZmFsc2VcblxuICBnZXRLZXlEYXRhOiAtPlxuXG4gICAgZGF0YSA9IFtdXG5cbiAgICBhdHRycyA9IF8uY2xvbmUoQGF0dHJpYnV0ZXMpXG5cbiAgICAjIGNvbnNvbGUubG9nIGF0dHJzXG5cbiAgICAjIEFjdGlvblR5cGVcbiAgICAjIFByZXNzICAgPSAxLCBLRVkgVkFMVUVcbiAgICAjIFJlbGVhc2UgPSAyLCBLRVkgVkFMVUVcblxuICAgICMgS0VZIERPV04gJiBLRVkgVVBcbiAgICBpZiBhdHRycy5wb3NpdGlvbiA9PSAwXG4gICAgICBkYXRhLnB1c2goMSlcbiAgICAgIGRhdGEucHVzaChjaGFyTWFwW2F0dHJzLmtleV0gfHwgNClcblxuICAgICAgZGF0YS5wdXNoKDIpXG4gICAgICBkYXRhLnB1c2goY2hhck1hcFthdHRycy5rZXldIHx8IDQpXG5cbiAgICAjIEtFWSBET1dOXG4gICAgaWYgYXR0cnMucG9zaXRpb24gPT0gLTFcbiAgICAgIGRhdGEucHVzaCgxKVxuICAgICAgZGF0YS5wdXNoKGNoYXJNYXBbYXR0cnMua2V5XSB8fCA0KVxuXG4gICAgIyBLRVkgVVBcbiAgICBpZiBhdHRycy5wb3NpdGlvbiA9PSAxXG4gICAgICBkYXRhLnB1c2goMilcbiAgICAgIGRhdGEucHVzaChjaGFyTWFwW2F0dHJzLmtleV0gfHwgNClcblxuICAgIHJldHVybiBkYXRhXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBNYWNyb0NvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBNYWNyb01vZGVsXG4gIGNvbXBhcmF0b3I6ICdvcmRlcidcblxuICAjIGxvYWRFeGFtcGxlXG4gICMgUmVzZXRzIHRoZSBjb2xsZWN0aW9uIHRvIG9uZSBvZiB0aGUgZXhhbXBsZXNcbiAgbG9hZEV4YW1wbGU6IChleGFtcGxlX2lkKSAtPlxuXG4gICAgIyBSZXNldHMgdGhlIGNvbGxlY3Rpb24gd2l0aCB0aGUgZGF0YSBkZWZpbmVkIGluIHRoZSBFeGFtcGxlcyBvYmplY3RcbiAgICBAcmVzZXQoTWFjcm9FeGFtcGxlc1tleGFtcGxlX2lkXSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgTW9kZWw6ICAgICAgTWFjcm9Nb2RlbFxuICBDb2xsZWN0aW9uOiBNYWNyb0NvbGxlY3Rpb25cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJrZXlcIjogXCJTSElGVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNixcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogMVxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJIXCIsXG4gICAgXCJrZXljb2RlXCI6IDcyLFxuICAgIFwib3JkZXJcIjogMixcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAxLFxuICAgIFwib3JkZXJcIjogM1xuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJFXCIsXG4gICAgXCJrZXljb2RlXCI6IDY5LFxuICAgIFwib3JkZXJcIjogNCxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiTFwiLFxuICAgIFwia2V5Y29kZVwiOiA3NixcbiAgICBcIm9yZGVyXCI6IDUsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkxcIixcbiAgICBcImtleWNvZGVcIjogNzYsXG4gICAgXCJvcmRlclwiOiA2LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJPXCIsXG4gICAgXCJrZXljb2RlXCI6IDc5LFxuICAgIFwib3JkZXJcIjogNyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDhcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiMVwiLFxuICAgIFwic2hpZnRcIjogXCIhXCIsXG4gICAgXCJrZXljb2RlXCI6IDQ5LFxuICAgIFwib3JkZXJcIjogOSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAxLFxuICAgIFwib3JkZXJcIjogMTBcbiAgfVxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBcImtleVwiOiBcIlJcIixcbiAgICBcImtleWNvZGVcIjogODIsXG4gICAgXCJvcmRlclwiOiAxLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJFXCIsXG4gICAgXCJrZXljb2RlXCI6IDY5LFxuICAgIFwib3JkZXJcIjogMixcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU1wiLFxuICAgIFwia2V5Y29kZVwiOiA4MyxcbiAgICBcIm9yZGVyXCI6IDMsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlVcIixcbiAgICBcImtleWNvZGVcIjogODUsXG4gICAgXCJvcmRlclwiOiA0LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJNXCIsXG4gICAgXCJrZXljb2RlXCI6IDc3LFxuICAgIFwib3JkZXJcIjogNSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiA2XG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcImBcIixcbiAgICBcInNoaWZ0XCI6IFwiflwiLFxuICAgIFwia2V5Y29kZVwiOiAxOTIsXG4gICAgXCJvcmRlclwiOiA3LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAxLFxuICAgIFwib3JkZXJcIjogOFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJFXCIsXG4gICAgXCJrZXljb2RlXCI6IDY5LFxuICAgIFwib3JkZXJcIjogOSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfVxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBcImtleVwiOiBcIkFMVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxOCxcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogMVxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJTSElGVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNixcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogMlxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCItXCIsXG4gICAgXCJzaGlmdFwiOiBcIl9cIixcbiAgICBcImtleWNvZGVcIjogMTg5LFxuICAgIFwib3JkZXJcIjogMyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAxLFxuICAgIFwib3JkZXJcIjogNFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAxLFxuICAgIFwib3JkZXJcIjogNVxuICB9XG5dXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAge1xuICAgIFwia2V5XCI6IFwiQ1RSTFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNyxcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogMVxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDJcbiAgfSxcbiAge1xuICAgIFwicm93XCI6IFwibmF2X3IwXCIsXG4gICAgXCJrZXlcIjogXCJERUxcIixcbiAgICBcImtleWNvZGVcIjogNDYsXG4gICAgXCJvcmRlclwiOiAzLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAxLFxuICAgIFwib3JkZXJcIjogNFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJDVFJMXCIsXG4gICAgXCJrZXljb2RlXCI6IDE3LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDVcbiAgfVxuXVxuIiwiXG4jIEV4cG9ydHMgYW4gb2JqZWN0IGRlZmluaW5nIHRoZSBleGFtcGxlIG1hY3Jvc1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGV4XzAxOiByZXF1aXJlKCcuL2V4YW1wbGVfMScpXG4gIGV4XzAyOiByZXF1aXJlKCcuL2V4YW1wbGVfMicpXG4gIGV4XzAzOiByZXF1aXJlKCcuL2V4YW1wbGVfMycpXG4gIGV4XzA0OiByZXF1aXJlKCcuL2V4YW1wbGVfNCcpXG59XG4iLCJMYXlvdXRWaWV3ICA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jICMgIyAjICNcblxuY2xhc3MgRGFzaGJvYXJkUm91dGUgZXh0ZW5kcyByZXF1aXJlICdobl9yb3V0aW5nL2xpYi9yb3V0ZSdcblxuICB0aXRsZTogJ0FzdHJvS2V5J1xuXG4gIGJyZWFkY3J1bWJzOiBbeyB0ZXh0OiAnRGV2aWNlJyB9XVxuXG4gIGZldGNoOiAtPlxuICAgIEBkZXZpY2UgPSBSYWRpby5jaGFubmVsKCdkZXZpY2UnKS5yZXF1ZXN0KCdtb2RlbCcsICdkZXZpY2VfMScpXG5cbiAgcmVuZGVyOiAtPlxuICAgIEBjb250YWluZXIuc2hvdyBuZXcgTGF5b3V0Vmlldyh7IG1vZGVsOiBAZGV2aWNlIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhc2hib2FyZFJvdXRlXG4iLCJLZXlTZWxlY3RvciA9IHJlcXVpcmUoJy4va2V5U2VsZWN0b3InKVxuXG4jICMgIyAjICNcblxuY2xhc3MgRGV2aWNlU3RhdHVzVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvZGV2aWNlX3N0YXR1cydcbiAgY2xhc3NOYW1lOiAncm93J1xuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cblxuICAgIHN0YXR1cyA9IHtcbiAgICAgIHRleHQ6ICdOb3QgQ29ubmVjdGVkJ1xuICAgICAgY3NzOiAgJ2JhZGdlLWRlZmF1bHQnXG4gICAgfVxuXG4gICAgIyBDb25uZWN0ZWRcbiAgICBpZiBAbW9kZWwuZ2V0KCdzdGF0dXNfY29kZScpID09IDFcblxuICAgICAgc3RhdHVzID0ge1xuICAgICAgICB0ZXh0OiAnQ29ubmVjdGVkJ1xuICAgICAgICBjc3M6ICdiYWRnZS1zdWNjZXNzJ1xuICAgICAgfVxuXG4gICAgcmV0dXJuIHsgc3RhdHVzOiBzdGF0dXMgfVxuXG4jICMgIyAjICNcblxuY2xhc3MgRGV2aWNlTGF5b3V0IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICBjbGFzc05hbWU6ICdyb3cnXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9kZXZpY2VfbGF5b3V0JylcblxuICByZWdpb25zOlxuICAgICMgc3RhdHVzUmVnaW9uOiAnW2RhdGEtcmVnaW9uPXN0YXR1c10nXG4gICAga2V5c1JlZ2lvbjogICAnW2RhdGEtcmVnaW9uPWtleXNdJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgW2RhdGEtY2xpY2s9Y29ubmVjdF0nOiAnY29ubmVjdFRvRGV2aWNlJ1xuXG4gIGNvbm5lY3RUb0RldmljZTogLT5cbiAgICBSYWRpby5jaGFubmVsKCd1c2InKS5yZXF1ZXN0KCdkZXZpY2VzJykudGhlbiAoZCkgPT4gQHJlbmRlcigpXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGlmIHdpbmRvdy5kXG4gICAgICByZXR1cm4geyBjb25uZWN0ZWQ6IHRydWUgfVxuICAgIGVsc2VcbiAgICAgIHJldHVybiB7IGNvbm5lY3RlZDogZmFsc2UgfVxuXG4gIG9uUmVuZGVyOiAtPlxuXG4gICAgIyBJbnN0YW50aWF0ZXMgbmV3IEtleVNlbGVjdG9yIFZpZXdcbiAgICBrZXlTZWxlY3RvciA9IG5ldyBLZXlTZWxlY3Rvcih7IGNvbGxlY3Rpb246IEBtb2RlbC5nZXQoJ2tleXMnKSB9KVxuICAgIGtleVNlbGVjdG9yLm9uICdjaGlsZHZpZXc6c2VsZWN0ZWQnLCAodmlldykgPT4gQHRyaWdnZXIoJ2tleTpzZWxlY3RlZCcsIHZpZXcubW9kZWwpXG4gICAga2V5U2VsZWN0b3Iub24gJ2NoaWxkdmlldzpkZXNlbGVjdGVkJywgKHZpZXcpID0+IEB0cmlnZ2VyKCdrZXk6ZGVzZWxlY3RlZCcpXG4gICAgQGtleXNSZWdpb24uc2hvdyhrZXlTZWxlY3RvcilcblxuICAgICMgU3RhdHVzIFZpZXdcbiAgICAjIFRPRE8gLSBzdGF0dXMgJiBjb25uZWN0aW9uIHZpZXdcbiAgICAjIEBzdGF0dXNSZWdpb24uc2hvdyBuZXcgRGV2aWNlU3RhdHVzVmlldyh7IG1vZGVsOiBAbW9kZWwgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRGV2aWNlTGF5b3V0XG5cblxuIiwiU2ltcGxlTmF2ID0gcmVxdWlyZSAnbGliL3ZpZXdzL3NpbXBsZV9uYXYnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBFZGl0b3JTZWxlY3RvciBleHRlbmRzIFNpbXBsZU5hdlxuICBjbGFzc05hbWU6ICdyb3cgaC0xMDAnXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9lZGl0b3Jfc2VsZWN0b3InKVxuXG4gIGJlaGF2aW9yczpcbiAgICBUb29sdGlwczoge31cblxuICBuYXZJdGVtczogW1xuICAgIHsgaWNvbjogJ2ZhLWtleWJvYXJkLW8nLCAgdGV4dDogJ01hY3JvJywgIHRyaWdnZXI6ICdtYWNybycgfVxuICAgIHsgaWNvbjogJ2ZhLWZpbGUtdGV4dC1vJywgdGV4dDogJ1RleHQnLCAgIHRyaWdnZXI6ICd0ZXh0JywgZGlzYWJsZWQ6IHRydWUsIGNzczogJ2Rpc2FibGVkJywgdGl0bGU6ICdDb21pbmcgU29vbicgfVxuICAgIHsgaWNvbjogJ2ZhLWFzdGVyaXNrJywgICAgdGV4dDogJ0tleScsICAgIHRyaWdnZXI6ICdrZXknLCBkaXNhYmxlZDogdHJ1ZSwgY3NzOiAnZGlzYWJsZWQnLCB0aXRsZTogJ0NvbWluZyBTb29uJyB9XG4gIF1cblxuICBvblJlbmRlcjogLT5cbiAgICBjb25maWdNb2RlbCA9IEBtb2RlbC5nZXQoJ2NvbmZpZycpXG4gICAgdHJpZ2dlciA9IGNvbmZpZ01vZGVsLmdldCgndHlwZScpXG4gICAgcmV0dXJuIEAkKFwiW2RhdGEtdHJpZ2dlcj0je3RyaWdnZXJ9XVwiKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICBvbk5hdmlnYXRlTWFjcm86IC0+XG4gICAgQHRyaWdnZXIgJ3Nob3c6bWFjcm86ZWRpdG9yJ1xuXG4gIG9uTmF2aWdhdGVUZXh0OiAtPlxuICAgIEB0cmlnZ2VyICdzaG93OnRleHQ6ZWRpdG9yJ1xuXG4gIG9uTmF2aWdhdGVLZXk6IC0+XG4gICAgQHRyaWdnZXIgJ3Nob3c6a2V5OmVkaXRvcidcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yU2VsZWN0b3JcbiIsIlRleHRFZGl0b3IgPSByZXF1aXJlKCcuL3RleHRFZGl0b3InKVxuTWFjcm9FZGl0b3IgPSByZXF1aXJlKCcuL21hY3JvRWRpdG9yJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEVkaXRvcldyYXBwZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2VkaXRvcl93cmFwcGVyJ1xuICBjbGFzc05hbWU6ICdyb3cnXG5cbiAgcmVnaW9uczpcbiAgICBjb250ZW50UmVnaW9uOiAnW2RhdGEtcmVnaW9uPWNvbnRlbnRdJ1xuXG4gIHVpOlxuICAgIHJlY29yZEJ0bjogJ1tkYXRhLWNsaWNrPXJlY29yZF0nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBbZGF0YS1jbGljaz1zYXZlXSc6ICAgICdvblNhdmUnXG4gICAgJ2NsaWNrIFtkYXRhLWNsaWNrPWNsZWFyXSc6ICAgJ29uQ2xlYXInXG4gICAgJ2NsaWNrIFtkYXRhLWNsaWNrPWNhbmNlbF0nOiAgJ29uQ2FuY2VsJ1xuICAgICdjbGljayBbZGF0YS1leGFtcGxlXSc6ICAgICAgICdsb2FkRXhhbXBsZSdcbiAgICAnY2xpY2sgQHVpLnJlY29yZEJ0bic6ICAgICAgICAndG9nZ2xlUmVjb3JkJ1xuXG4gIGVkaXRvcnM6XG4gICAgbWFjcm86ICBNYWNyb0VkaXRvclxuICAgIHRleHQ6ICAgVGV4dEVkaXRvclxuICAgIGtleTogICAgTWFjcm9FZGl0b3JcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgRmV0Y2hlcyB0aGUgRWRpdG9yVmlldyBwcm90b3R5cGVcbiAgICBFZGl0b3JWaWV3ID0gQGVkaXRvcnNbQG9wdGlvbnMuZWRpdG9yXVxuXG4gICAgIyBJc29sYXRlcyBDb25maWdcbiAgICBjb25maWcgPSBAbW9kZWwuZ2V0KCdjb25maWcnKVxuXG4gICAgIyBDYWNoZXMgdGhlIGN1cnJlbnQgY29uZmlndXJhdGlvbiB0byBiZSByZXN0b3JlZCB3aGVuIHRoaXMgdmlldyBpcyBjYW5jZWxsZWQgb3V0XG4gICAgQGNhY2hlZENvbmZpZyA9IGNvbmZpZy50b0pTT04oKVxuXG4gICAgIyBJc29sYXRlcyBNYWNyb0NvbGxlY3Rpb25cbiAgICBAbWFjcm9zID0gY29uZmlnLmdldCgnbWFjcm9zJylcblxuICAgIHdpbmRvdy5tYWNyb3MgPSBAbWFjcm9zICMgVE9ETyAtIHJlbW92ZVxuXG4gICAgIyBSZXF1ZXN0cyBLZXlDb2xsZWN0aW9uIGZyb20gdGhlIEtleUZhY3RvcnlcbiAgICBrZXlzID0gUmFkaW8uY2hhbm5lbCgna2V5JykucmVxdWVzdCgnY29sbGVjdGlvbicpXG5cbiAgICAjIEluc3RhbnRpYXRlcyBuZXcgRWRpdG9yVmlldyBpbnN0YW5jZVxuICAgIEBlZGl0b3JWaWV3ID0gbmV3IEVkaXRvclZpZXcoeyBtb2RlbDogY29uZmlnLCBrZXlzOiBrZXlzLCBtYWNyb3M6IEBtYWNyb3MgfSlcblxuICAgICMgTGlzdGVucyBmb3IgJ3N0b3A6cmVjb3JkaW5nJyBldmVudFxuICAgIEBlZGl0b3JWaWV3Lm9uICdzdG9wOnJlY29yZGluZycsID0+IEB0b2dnbGVSZWNvcmQoKVxuXG4gICAgIyBTaG93cyB0aGUgdmlldyBpbiBAY29udGVudFJlZ2lvblxuICAgIEBjb250ZW50UmVnaW9uLnNob3cgQGVkaXRvclZpZXdcblxuICAjIG9uQ2xlYXJcbiAgIyBFbXB0aWVzIHRoZSBNYWNyb0NvbGxlY3Rpb25cbiAgIyBUT0RPIC0gdW5kbyBidXR0b24/XG4gIG9uQ2xlYXI6IC0+XG5cbiAgICAjIFN0b3BzIFJlY29yZGluZ1xuICAgIEBzdG9wUmVjb3JkaW5nKClcblxuICAgICMgRW1wdGllcyB0aGUgTWFjcm9Db2xsZWN0aW9uXG4gICAgQG1hY3Jvcy5yZXNldCgpXG4gICAgcmV0dXJuXG5cbiAgIyBvblNhdmVcbiAgb25TYXZlOiAtPlxuXG4gICAgIyBTdG9wcyBSZWNvcmRpbmdcbiAgICBAc3RvcFJlY29yZGluZygpXG5cbiAgICAjIFNlcmlhbGl6ZXMgZGF0YSBmcm9tIGFueSBmb3JtIGVsZW1lbnRzIGluIHRoaXMgdmlld1xuICAgIGRhdGEgPSBCYWNrYm9uZS5TeXBob24uc2VyaWFsaXplKEApXG5cbiAgICAjIENsZWFyIHVudXNlZCB0eXBlLXNwZWNpZmljIGF0dHJpYnV0ZXNcbiAgICBkYXRhLm1hY3JvcyA9IFtdIGlmIGRhdGEudHlwZSAhPSAnbWFjcm8nXG4gICAgZGF0YS50ZXh0X3ZhbHVlID0gJycgaWYgZGF0YS50eXBlICE9ICd0ZXh0J1xuXG4gICAgIyBBcHBsaWVzIHRoZSBhdHRyaWJ1dGVzIHRvIHRoZSBjb25maWcgbW9kZWxcbiAgICBAbW9kZWwuZ2V0KCdjb25maWcnKS5zZXQoZGF0YSlcblxuICAgICMgVHJpZ2dlcnMgY2hhbmdlIGV2ZW50IG9uIEBtb2RlbCB0byByZS1yZW5kZXIgdGhlIGN1cnJlbnRseSBoaWRkZW4gQXN0cm9LZXkgZWxlbWVudFxuICAgIEBtb2RlbC50cmlnZ2VyKCdjb25maWc6dXBkYXRlZCcpXG5cbiAgICAjIFNFTkRTIFRPIERFVklDRSAoSUYgQVZBSUxBQkxFKVxuICAgICMgVE9ETyAtIHRoaXMgaXMgYSBIQUNLS0tLS0tLXG4gICAgIyBpZiB3aW5kb3cuZFxuICAgIGlmIHRydWUgIyBUT0RPIC0gcmVtb3ZlIHRydWVcblxuICAgICAgY29uc29sZS5sb2cgJ0hBUyBERVZJQ0UgLSBTRU5EIFRPIERFVklDRSdcblxuICAgICAgY29uc29sZS5sb2cgQG1vZGVsXG4gICAgICBjb25zb2xlLmxvZyBAbW9kZWwuZ2V0KCdvcmRlcicpXG5cbiAgICAgICMgR2V0cyB0aGUgbWFjcm9JbmRleFxuICAgICAgbWFjcm9JbmRleCA9IEBtb2RlbC5nZXQoJ29yZGVyJylcblxuICAgICAgIyBjb25zb2xlLmxvZyBAbWFjcm9zLnRvSlNPTigpXG5cbiAgICAgICMgRGF0YSBmb3IgYXJyYXkgYnVmZmVyXG4gICAgICBkYXRhID0gW11cblxuICAgICAgIyBJdGVyYXRlcyBvdmVyIGVhY2ggbWFjcm9cbiAgICAgIF8uZWFjaChAbWFjcm9zLm1vZGVscywgKG1hY3JvKSA9PlxuICAgICAgICBjb25zb2xlLmxvZyAnRUFDSCBNQUNSTydcbiAgICAgICAgY29uc29sZS5sb2cgbWFjcm8uZ2V0S2V5RGF0YSgpXG4gICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdChtYWNyby5nZXRLZXlEYXRhKCkpXG4gICAgICApXG5cbiAgICAgIGNvbnNvbGUubG9nIGRhdGFcblxuICAgICAgIyB3SW5kZXggLSBSZXF1ZXN0IHR5cGUgKDB4MDEgZm9yIHNldCBtYWNybylcbiAgICAgICMgd1ZhbHVlIC0gTWFjcm8gaW5kZXggKDAgLSA0IGluY2x1c2l2ZSlcbiAgICAgICMgYlJlcXVlc3QgLSAzIChoYXJkY29kZWQpXG4gICAgICAjIHdMZW5ndGggLSBudW1iZXIgb2YgYnl0ZXMgKHNob3VsZCBiZSBtYWNybyBsZW5ndGggKiAyKVxuXG4gICAgICByZXR1cm4gQHRyaWdnZXIoJ3NhdmUnKSB1bmxlc3Mgd2luZG93LmRcblxuICAgICAgcmVxdWVzdE9iaiA9IHtcbiAgICAgICAgICAncmVxdWVzdFR5cGUnOiAndmVuZG9yJyxcbiAgICAgICAgICAncmVjaXBpZW50JzogJ2RldmljZScsXG4gICAgICAgICAgJ3JlcXVlc3QnOiAweDAzLFxuICAgICAgICAgICd2YWx1ZSc6IG1hY3JvSW5kZXgsXG4gICAgICAgICAgJ2luZGV4JzogMHgwMVxuICAgICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nIHJlcXVlc3RPYmpcblxuICAgICAgZC5jb250cm9sVHJhbnNmZXJPdXQocmVxdWVzdE9iaiwgbmV3IFVpbnQ4QXJyYXkoZGF0YSkuYnVmZmVyKS50aGVuIChyZXNwb25zZSkgPT5cbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgIHJldHVybiBAdHJpZ2dlciAnc2F2ZSdcblxuICAgIGVsc2VcblxuICAgICAgIyBUcmlnZ2VycyAnc2F2ZScgZXZlbnQsIGNsb3NpbmcgdGhpcyB2aWV3XG4gICAgICAjIFRPRE8gLSB0aGlzIGlzIGR1bW15XG4gICAgICByZXR1cm4gQHRyaWdnZXIgJ3NhdmUnXG5cbiAgIyBvbkNhbmNlbFxuICBvbkNhbmNlbDogLT5cblxuICAgICMgU3RvcHMgUmVjb3JkaW5nXG4gICAgQHN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyBSZXNldHMgY29uZmlnIGF0dHJpYnV0ZXNcbiAgICBAbW9kZWwuZ2V0KCdjb25maWcnKS5zZXQoQGNhY2hlZENvbmZpZylcblxuICAgICMgVHJpZ2dlcnMgJ2NhbmNlbCcgZXZlbnQsIGNsb3NpbmcgdGhpcyB2aWV3XG4gICAgcmV0dXJuIEB0cmlnZ2VyICdjYW5jZWwnXG5cbiAgIyBsb2FkRXhhbXBsZVxuICAjIEVtcHRpZXMgb3V0IHRoZSBNYWNyb0NvbGxlY2lvbiBhbmQgbG9hZHMgYW4gZXhhbXBsZSBtYWNyb1xuICBsb2FkRXhhbXBsZTogKGUpIC0+XG5cbiAgICAjIFN0b3BzIFJlY29yZGluZ1xuICAgIEBzdG9wUmVjb3JkaW5nKClcblxuICAgICMgQ2FjaGVzIGNsaWNrZWQgZWxcbiAgICBlbCA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuXG4gICAgIyBHZXRzIHRoZSBJRCBvZiB0aGUgZXhhbXBsZSB0byBsb2FkXG4gICAgZXhhbXBsZV9pZCA9IGVsLmRhdGEoJ2V4YW1wbGUnKVxuXG4gICAgIyBJbnZva2VzIHRoZSBsb2FkRXhhbXBsZSBtZXRob2Qgb24gdGhlIE1hY3JvQ29sbGVjdGlvblxuICAgIHJldHVybiBAbWFjcm9zLmxvYWRFeGFtcGxlKGV4YW1wbGVfaWQpXG5cbiAgIyB0b2dnbGVSZWNvcmRcbiAgIyBUb2dnbGVzIHdldGhlciBvciBub3QgdGhlIHVzZXIncyBrZXlib2FyZCBpcyByZWNvcmRpbmcga2V5c3Ryb2tlc1xuICB0b2dnbGVSZWNvcmQ6IChlKSAtPlxuICAgIHJldHVybiBAc3RvcFJlY29yZGluZygpIGlmIEBpc1JlY29yZGluZ1xuICAgIEBzdGFydFJlY29yZGluZygpXG5cbiAgIyBzdG9wUmVjb3JkaW5nXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG5cbiAgICAjIFNldHMgQGlzUmVjb3JkaW5nIGZsYWdcbiAgICBAaXNSZWNvcmRpbmcgPSBmYWxzZVxuXG4gICAgIyBVcGRhdGVzIHRoZSBFZGl0b3JWaWV3IGluc3RhbmNlIHRvIGlnbm9yZSBrZXlib2FyZCBpbnB1dFxuICAgIEBlZGl0b3JWaWV3LmtleWJvYXJkU2VsZWN0b3I/LmN1cnJlbnQuc3RvcFJlY29yZGluZygpXG5cbiAgICAjIFVwZGF0ZXMgdGhlIEB1aS5yZWNvcmRCdG4gZWxlbWVudFxuICAgIEB1aS5yZWNvcmRCdG4ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoJ2knKS5yZW1vdmVDbGFzcygnZmEtc3BpbiBmYS1jaXJjbGUtby1ub3RjaCcpLmFkZENsYXNzKCdmYS1jaXJjbGUnKVxuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG5cbiAgICAjIEVtcHR5IG1hY3Jvc1xuICAgIEBtYWNyb3MucmVzZXQoKVxuXG4gICAgIyBTZXRzIEBpc1JlY29yZGluZyBmbGFnXG4gICAgQGlzUmVjb3JkaW5nID0gdHJ1ZVxuXG4gICAgIyBVcGRhdGVzIHRoZSBFZGl0b3JWaWV3IGluc3RhbmNlIHRvIGFsbG93IGtleWJvYXJkIGlucHV0XG4gICAgQGVkaXRvclZpZXcua2V5Ym9hcmRTZWxlY3Rvcj8uY3VycmVudC5zdGFydFJlY29yZGluZygpXG5cbiAgICAjIFVwZGF0ZXMgdGhlIEB1aS5yZWNvcmRCdG4gZWxlbWVudFxuICAgIEB1aS5yZWNvcmRCdG4uYWRkQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoJ2knKS5hZGRDbGFzcygnZmEtc3BpbiBmYS1jaXJjbGUtby1ub3RjaCcpLnJlbW92ZUNsYXNzKCdmYS1jaXJjbGUnKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JXcmFwcGVyXG5cblxuXG4iLCJcbmNsYXNzIEtleUNoaWxkIGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0YWdOYW1lOiAnbGknXG4gIGNsYXNzTmFtZTogJ2J0biBidG4tb3V0bGluZS1saWdodCBrZXktLWNoaWxkIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBteC0yJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMva2V5X2NoaWxkJylcblxuICBiZWhhdmlvcnM6XG4gICAgU2VsZWN0YWJsZUNoaWxkOiB7IGRlc2VsZWN0OiB0cnVlIH1cblxuICBtb2RlbEV2ZW50czpcbiAgICAnY29uZmlnOnVwZGF0ZWQnOiAnb25Nb2RlbENoYW5nZSdcblxuICBvbk1vZGVsQ2hhbmdlOiAtPlxuICAgIHJldHVybiBAcmVuZGVyKClcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG5cbiAgICAjIElzb2xhdGVzIEFzdHJvS2V5Q29uZmlnIG1vZGVsXG4gICAgY29uZmlnID0gQG1vZGVsLmdldCgnY29uZmlnJylcblxuICAgICMgTWFjcm9cbiAgICBpZiBjb25maWcuZ2V0KCd0eXBlJykgPT0gJ21hY3JvJ1xuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdNYWNybycgfVxuXG4gICAgIyBUZXh0XG4gICAgaWYgY29uZmlnLmdldCgndHlwZScpID09ICd0ZXh0J1xuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdUZXh0JyB9XG5cbiAgICAjIEtleVxuICAgICMgVE9ETyAtIERJU1BMQVkgS0VZIElOIFZJRVdcbiAgICBpZiBjb25maWcuZ2V0KCd0eXBlJykgPT0gJ2tleSdcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnS2V5JyB9XG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlTZWxlY3RvciBleHRlbmRzIE1uLkNvbGxlY3Rpb25WaWV3XG4gIHRhZ05hbWU6ICd1bCdcbiAgY2xhc3NOYW1lOiAnbGlzdC11bnN0eWxlZCBrZXktLWxpc3QgcHgtNCBweS0zIG15LTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlciBmbGV4LXJvdydcbiAgY2hpbGRWaWV3OiBLZXlDaGlsZFxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlTZWxlY3RvclxuXG5cbiIsIkRldmljZUxheW91dCA9IHJlcXVpcmUoJy4vZGV2aWNlTGF5b3V0JylcbkVkaXRvclNlbGVjdG9yID0gcmVxdWlyZSgnLi9lZGl0b3JTZWxlY3RvcicpXG5FZGl0b3JXcmFwcGVyID0gcmVxdWlyZSgnLi9lZGl0b3JXcmFwcGVyJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEhlbHBWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9oZWxwX3ZpZXcnXG4gIGNsYXNzTmFtZTogJ3JvdydcblxuIyAjICMgIyAjXG5cbmNsYXNzIExheW91dFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2xheW91dCdcbiAgY2xhc3NOYW1lOiAnY29udGFpbmVyLWZsdWlkIGQtZmxleCBmbGV4LWNvbHVtbiB3LTEwMCBoLTEwMCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBkZXZpY2UtLWxheW91dCdcblxuICByZWdpb25zOlxuICAgIGRldmljZVJlZ2lvbjogICAnW2RhdGEtcmVnaW9uPWRldmljZV0nXG4gICAgc2VsZWN0b3JSZWdpb246ICdbZGF0YS1yZWdpb249c2VsZWN0b3JdJ1xuICAgIGVkaXRvclJlZ2lvbjogICAnW2RhdGEtcmVnaW9uPWVkaXRvcl0nXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIERpc3BsYXlzIGRlZmF1bHQgaGVscCB0ZXh0XG4gICAgQHNob3dIZWxwVmlldygpXG5cbiAgICAjIEluc3RhbnRpYXRlcyBhIG5ldyBEZXZpY2VMYXlvdXQgZm9yIGNvbm5lY3RpbmcgdG8gYW4gQXN0cm9LZXlcbiAgICAjIGFuZCBzZWxlY3Rpbmcgd2hpY2gga2V5IHRoZSB1c2VyIHdvdWxkIGxpa2UgdG8gZWRpdFxuICAgIGRldmljZVZpZXcgPSBuZXcgRGV2aWNlTGF5b3V0KHsgbW9kZWw6IEBtb2RlbCB9KVxuICAgIGRldmljZVZpZXcub24gJ2tleTpzZWxlY3RlZCcsIChrZXlNb2RlbCkgPT4gQHNob3dFZGl0b3JTZWxlY3RvcihrZXlNb2RlbClcbiAgICBkZXZpY2VWaWV3Lm9uICdrZXk6ZGVzZWxlY3RlZCcsICgpID0+IEBzaG93SGVscFZpZXcoKVxuICAgIEBkZXZpY2VSZWdpb24uc2hvdyhkZXZpY2VWaWV3KVxuXG4gICAgIyBNYWNybyBEZXZlbG9wbWVudCBoYWNrXG4gICAgIyBzZXRUaW1lb3V0KCA9PlxuICAgICMgICBAc2hvd0VkaXRvclZpZXcoQG1vZGVsLmdldCgna2V5cycpLmZpcnN0KCksICdtYWNybycpXG4gICAgIyAsIDEwMDApXG4gICAgIyBAc2hvd0VkaXRvclZpZXcoQG1vZGVsLmdldCgna2V5cycpLmZpcnN0KCksICdtYWNybycpXG5cbiAgc2hvd0hlbHBWaWV3OiAtPlxuXG4gICAgIyBJbnN0YW50aWF0ZXMgYSBuZXcgSGVscFZpZXcgYW5kIHNob3dzIGl0IGluIEBzZWxlY3RvclJlZ2lvblxuICAgIEBzZWxlY3RvclJlZ2lvbi5zaG93IG5ldyBIZWxwVmlldygpXG5cbiAgc2hvd0VkaXRvclNlbGVjdG9yOiAoa2V5TW9kZWwpIC0+XG5cbiAgICAjIEluc3RhbnRhaWF0ZXMgbmV3IEVkaXRvclNlbGVjdG9yIHZpZXdcbiAgICBlZGl0b3JTZWxlY3RvciA9IG5ldyBFZGl0b3JTZWxlY3Rvcih7IG1vZGVsOiBrZXlNb2RlbCB9KVxuXG4gICAgIyBTaG93cyBNYWNybyBFZGl0b3JcbiAgICBlZGl0b3JTZWxlY3Rvci5vbiAnc2hvdzptYWNybzplZGl0b3InLCA9PiBAc2hvd0VkaXRvclZpZXcoa2V5TW9kZWwsICdtYWNybycpXG5cbiAgICAjIFNob3dzIFRleHQgRWRpdG9yXG4gICAgZWRpdG9yU2VsZWN0b3Iub24gJ3Nob3c6dGV4dDplZGl0b3InLCA9PiBAc2hvd0VkaXRvclZpZXcoa2V5TW9kZWwsICd0ZXh0JylcblxuICAgICMgU2hvd3MgS2V5IEVkaXRvclxuICAgIGVkaXRvclNlbGVjdG9yLm9uICdzaG93OmtleTplZGl0b3InLCA9PiBAc2hvd0VkaXRvclZpZXcoa2V5TW9kZWwsICdrZXknKVxuXG4gICAgIyBTaG93cyB0aGUgRWRpdG9yU2VsZWN0b3Igdmlld1xuICAgIEBzZWxlY3RvclJlZ2lvbi5zaG93KGVkaXRvclNlbGVjdG9yKVxuXG4gIHNob3dFZGl0b3JWaWV3OiAoa2V5TW9kZWwsIGVkaXRvcikgLT5cblxuICAgICMgQWRqdXN0cyB0aGUgQ1NTIHRvIGRpc3BsYXkgdGhlIEVkaXRvcldyYXBwZXJcbiAgICBAJGVsLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gICAgIyBSZWFkcyBtYWNybyBmcm9tIGRldmljZVxuICAgICMgTk9URSAtIHRoaXMgaGFwcGVucyBhc3luY2hyb25vdXNseVxuICAgICMgV2UgX3Nob3VsZF8gbm90IHJlbmRlciB0aGUgRWRpdG9yV3JhcHBlciB2aWV3IHVudGlsIGlmIGEgZGV2aWNlIGlzIG5vdCBwcmVzZW50LFxuICAgICMgYnV0IHdlIHdpbGwgaW4gdGhlIG1lYW50aW1lIGZvciBkZW1vbnN0cmF0aW9uIHB1cnBvc2VzXG4gICAga2V5TW9kZWwucmVhZE1hY3JvKClcblxuICAgICMgSW5zdGFudGlhdGVzIG5ldyBFZGl0b3JXcmFwcGVyIHZpZXdcbiAgICBlZGl0b3JXcmFwcGVyID0gbmV3IEVkaXRvcldyYXBwZXIoeyBtb2RlbDoga2V5TW9kZWwsIGVkaXRvcjogZWRpdG9yIH0pXG5cbiAgICAjIEhhbmRsZXMgJ2NhbmNlbCcgZXZlbnRcbiAgICBlZGl0b3JXcmFwcGVyLm9uICdjYW5jZWwnLCA9PlxuICAgICAgQCRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICMgSGFuZGxlcyAnc2F2ZScgZXZlbnRcbiAgICBlZGl0b3JXcmFwcGVyLm9uICdzYXZlJywgPT5cbiAgICAgICMgVE9ETyAtIGhpdCB0aGUgS2V5TW9kZWwgLyBEZXZpY2VNb2RlbCB0byBkbyB0aGUgcmVzdCBmcm9tIGhlcmVcbiAgICAgIEAkZWwucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAjIFNob3dzIHRoZSBFZGl0b3JXcmFwcGVyIHZpZXcgaW4gQGVkaXRvclJlZ2lvblxuICAgIEBlZGl0b3JSZWdpb24uc2hvdyhlZGl0b3JXcmFwcGVyKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXRWaWV3XG5cblxuXG4iLCJLZXlib2FyZFNlbGVjdG9yID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX3NlbGVjdG9yJylcbk1hY3JvTGlzdCA9IHJlcXVpcmUoJy4vbWFjcm9MaXN0JylcblxuIyAjICMgIyAjXG5cbmNsYXNzIE1hY3JvRWRpdG9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9tYWNyb19lZGl0b3InXG4gIGNsYXNzTmFtZTogJ3JvdyBoLTEwMCdcblxuICByZWdpb25zOlxuICAgIG1hY3JvUmVnaW9uOiAgICAnW2RhdGEtcmVnaW9uPW1hY3JvXSdcbiAgICBjb250cm9sc1JlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1jb250cm9sc10nXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEdldHMgdGhlIGN1cnJlbnQgbWFjcm8gYXNzaWduZWQgdG8gdGhlIGtleU1vZGVsXG4gICAgIyBtYWNyb0NvbGxlY3Rpb24gPSBrZXlNb2RlbC5nZXRNYWNyb0NvbGxlY3Rpb24oKVxuICAgIEBtYWNyb1JlZ2lvbi5zaG93IG5ldyBNYWNyb0xpc3QoeyBjb2xsZWN0aW9uOiBAb3B0aW9ucy5tYWNyb3MgfSlcblxuICAgICMgSW5zdGFudGFpYXRlcyBuZXcgS2V5Ym9hcmRTZWxlY3RvclxuICAgICMgVE9ETyAtIHRoaXMgd2lsbCAqZXZlbnR1YWxseSogZGlzcGxheSBhIHNlbGVjdG9yIGJldHdlZW4gZGlmZmVyZW50IHR5cGVzIG9mIGtleWJvYXJkcyAvIHNldHMgb2Yga2V5c1xuICAgIEBrZXlib2FyZFNlbGVjdG9yID0gbmV3IEtleWJvYXJkU2VsZWN0b3IoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pXG5cbiAgICAjIEJ1YmJsZXMgdXAgc3RvcDpyZWNvcmRpbmcgZXZlbnRcbiAgICBAa2V5Ym9hcmRTZWxlY3Rvci5vbiAnc3RvcDpyZWNvcmRpbmcnLCA9PiBAdHJpZ2dlciAnc3RvcDpyZWNvcmRpbmcnXG5cbiAgICAjIEhhbmRsZXMgS2V5U2VsZWN0aW9uIGV2ZW50XG4gICAgQGtleWJvYXJkU2VsZWN0b3Iub24gJ2tleTpzZWxlY3RlZCcsIChrZXkpID0+XG5cbiAgICAgICMgQ2xvbmVzIHRoZSBvcmlnaW5hbCBvYmplY3RcbiAgICAgIGtleSA9IF8uY2xvbmUoa2V5KVxuXG4gICAgICAjIEFkZHMgdGhlIGNvcnJlY3QgYG9yZGVyYCBhdHRyaWJ1dGVcbiAgICAgIGtleS5vcmRlciA9IEBvcHRpb25zLm1hY3Jvcy5sZW5ndGggKyAxXG5cbiAgICAgICMgQWRkcyB0aGUga2V5IHRvIHRoZSBNYWNyb0NvbGxlY3Rpb25cbiAgICAgIEBvcHRpb25zLm1hY3Jvcy5hZGQoa2V5KVxuXG4gICAgIyBTaG93cyB0aGUga2V5Ym9hcmRWaWV3XG4gICAgQGNvbnRyb2xzUmVnaW9uLnNob3cgQGtleWJvYXJkU2VsZWN0b3JcblxuICAjIHN0YXJ0UmVjb3JkaW5nXG4gIHN0YXJ0UmVjb3JkaW5nOiAtPlxuICAgIEBrZXlib2FyZFZpZXcuc3RhcnRSZWNvcmRpbmcoKVxuXG4gICMgc3RvcFJlY29yZGluZ1xuICBzdG9wUmVjb3JkaW5nOiAtPlxuICAgIEBrZXlib2FyZFZpZXcuc3RvcFJlY29yZGluZygpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hY3JvRWRpdG9yXG5cblxuXG4iLCJcbmNsYXNzIE1hY3JvQ2hpbGQgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnbWFjcm8tLWNoaWxkIGZsZXgtY29sdW1uIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIG15LTInXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9tYWNyb19jaGlsZCcpXG5cbiAgYmVoYXZpb3JzOlxuICAgIFNvcnRhYmxlQ2hpbGQ6IHt9XG4gICAgIyBUb29sdGlwczoge31cblxuICBtb2RlbEV2ZW50czpcbiAgICAnY2hhbmdlOnBvc2l0aW9uJzogICdyZW5kZXInXG4gICAgJ2NoYW5nZTpzaGlmdGVkJzogICAncmVuZGVyJ1xuXG4gICMgdWk6XG4gICMgICB0b29sdGlwOiAnW2RhdGEtdG9nZ2xlPXRvb2x0aXBdJ1xuXG4gIGV2ZW50czpcbiAgICAnZHJhZyc6ICdvbkRyYWcnXG4gICAgJ2RyYWdzdGFydCc6ICdvbkRyYWdTdGFydCdcbiAgICAnbW91c2VvdmVyIC5rZXknOiAnb25Nb3VzZU92ZXInXG4gICAgJ21vdXNlb3V0IC5rZXknOiAnb25Nb3VzZU91dCdcbiAgICAnY2xpY2sgLmtleSc6ICdyZW1vdmVNYWNybydcbiAgICAnY2xpY2sgW2RhdGEtcG9zaXRpb25dOm5vdCguYWN0aXZlKSc6ICdvblBvc2l0aW9uQ2xpY2snXG5cbiAgIyBzdGF0ZToge1xuICAjICAgdG9vbHRpcE9uUmVuZGVyOiBmYWxzZVxuICAjIH1cblxuICAjIG9uUmVuZGVyOiAtPlxuICAjICAgcmV0dXJuIHVubGVzcyBAc3RhdGUudG9vbHRpcE9uUmVuZGVyXG5cbiAgIyAgICMgVW5zZXRzIHRvb2x0aXAgZmxhZ1xuICAjICAgQHN0YXRlLnRvb2x0aXBPblJlbmRlciA9IGZhbHNlXG5cbiAgIyAgICMgU2hvd3MgdGhlIHRvb2x0aXBcbiAgIyAgIEB1aS50b29sdGlwLnRvb2x0aXAoJ3Nob3cnKVxuXG4gIG9uTW91c2VPdmVyOiAtPlxuICAgIEAkZWwuYWRkQ2xhc3MoJ2hvdmVyZWQnKVxuXG4gIG9uTW91c2VPdXQ6IC0+XG4gICAgQCRlbC5yZW1vdmVDbGFzcygnaG92ZXJlZCcpXG5cbiAgb25EcmFnU3RhcnQ6IC0+XG4gICAgQCRlbC5hZGRDbGFzcygnZHJhZy1zdGFydCcpXG5cbiAgb25EcmFnOiAtPlxuICAgIEAkZWwucmVtb3ZlQ2xhc3MoJ2RyYWctc3RhcnQgaG92ZXJlZCcpXG4gICAgQCRlbC5zaWJsaW5ncygnLm1hY3JvLS1jaGlsZCcpLnJlbW92ZUNsYXNzKCdkcmFnLXN0YXJ0IGhvdmVyZWQnKVxuXG4gIHJlbW92ZU1hY3JvOiAtPlxuICAgICMgY29uc29sZS5sb2cgQG1vZGVsXG4gICAgIyBAbW9kZWwuc2V0KCdzaGlmdGVkJywgIUBtb2RlbC5nZXQoJ3NoaWZ0ZWQnKSlcbiAgICBAbW9kZWwuY29sbGVjdGlvbi5yZW1vdmUoQG1vZGVsKVxuXG4gIG9uUG9zaXRpb25DbGljazogKGUpIC0+XG5cbiAgICAjIERpc3BsYXlzIHRoZSB0b29sdGlwIGFmdGVyIHRoZSB2aWV3IHJlLXJlbmRlcnNcbiAgICAjIEBzdGF0ZS50b29sdGlwT25SZW5kZXIgPSB0cnVlXG5cbiAgICAjIENsZWFycyBhY3RpdmUgdG9vbHRpcHNcbiAgICAjIEBjbGVhclRvb2x0aXBzKClcblxuICAgICMgQ2FjaGVzIGNsaWNrZWQgZWxcbiAgICBlbCA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuXG4gICAgIyBJc29sYXRlcyBwb3NpdGlvbiBkYXRhIGZyb20gZWxlbWVudFxuICAgIHBvc2l0aW9uID0gZWwuZGF0YSgncG9zaXRpb24nKVxuXG4gICAgIyBEZXRlcm1pbmVzIG5leHQgcG9zaXRpb25cbiAgICBpZiBwb3NpdGlvbiA9PSAtMVxuICAgICAgbmV3X3Bvc2l0aW9uID0gMVxuICAgIGlmIHBvc2l0aW9uID09IDBcbiAgICAgIG5ld19wb3NpdGlvbiA9IC0xXG4gICAgaWYgcG9zaXRpb24gPT0gMVxuICAgICAgbmV3X3Bvc2l0aW9uID0gMFxuXG4gICAgIyBTZXRzIHRoZSBwb3NpdGlvbiBhdHRyaWJ1dGUgb24gdGhlIG1vZGVsXG4gICAgQG1vZGVsLnNldCgncG9zaXRpb24nLCBuZXdfcG9zaXRpb24pXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIHBvc2l0aW9ucyA9IFtcbiAgICAgIHsgcG9zaXRpb246IC0xLCBjc3M6ICdmYS1sb25nLWFycm93LWRvd24nLCB0b29sdGlwOiAnS2V5IERvd24nIH1cbiAgICAgIHsgcG9zaXRpb246IDAsIGNzczogJ2ZhLWFycm93cy12JywgdG9vbHRpcDogJ0tleSBEb3duIHwgVXAnIH1cbiAgICAgIHsgcG9zaXRpb246IDEsIGNzczogJ2ZhLWxvbmctYXJyb3ctdXAnLCB0b29sdGlwOiAnS2V5IFVwJyB9XG4gICAgXVxuXG4gICAgcG9zaXRpb24gPSBAbW9kZWwuZ2V0KCdwb3NpdGlvbicpXG4gICAgYWN0aXZlX3Bvc2l0aW9uID0gXy5maW5kV2hlcmUocG9zaXRpb25zLCB7IHBvc2l0aW9uOiBwb3NpdGlvbiB9KVxuICAgIHJldHVybiB7IGFjdGl2ZV9wb3NpdGlvbiB9XG5cbiMgIyAjICMgI1xuXG5jbGFzcyBNYWNyb0VtcHR5IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0YWdOYW1lOiAnbGknXG4gIGNsYXNzTmFtZTogJ21hY3JvLS1jaGlsZCBlbXB0eSBmbGV4LWNvbHVtbiBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBteS0yJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvbWFjcm9fZW1wdHknKVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9MaXN0IGV4dGVuZHMgTW4uQ29sbGVjdGlvblZpZXdcbiAgdGFnTmFtZTogJ3VsJ1xuICBjbGFzc05hbWU6ICdsaXN0LXVuc3R5bGVkIG1hY3JvLS1saXN0IHB4LTQgbXktMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgZmxleC1yb3cgZmxleC13cmFwJ1xuICBjaGlsZFZpZXc6IE1hY3JvQ2hpbGRcbiAgZW1wdHlWaWV3OiBNYWNyb0VtcHR5XG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIFNvcnRzIHRoZSBjb2xsZWN0aW9uXG4gICAgQGNvbGxlY3Rpb24uc29ydCgpXG5cbiAgICAjIEluaXRpYWxpemVzIFNvcnRhYmxlIGNvbnRhaW5lclxuICAgIFNvcnRhYmxlLmNyZWF0ZSBAZWwsXG4gICAgICBhbmltYXRpb246ICAgIDE1MFxuICAgICAgaGFuZGxlOiAgICAgICAnLmtleSdcbiAgICAgIGdob3N0Q2xhc3M6ICAgJ2dob3N0JyAgIyBDbGFzcyBuYW1lIGZvciB0aGUgZHJvcCBwbGFjZWhvbGRlclxuICAgICAgY2hvc2VuQ2xhc3M6ICAnY2hvc2VuJyAgIyBDbGFzcyBuYW1lIGZvciB0aGUgY2hvc2VuIGl0ZW1cbiAgICAgIGRyYWdDbGFzczogICAgJ2RyYWcnICAjIENsYXNzIG5hbWUgZm9yIHRoZSBkcmFnZ2luZyBpdGVtXG4gICAgICAjIGdyb3VwOlxuICAgICAgIyAgIG5hbWU6ICdtYWNybydcbiAgICAgICMgICBwdWxsOiBmYWxzZVxuICAgICAgIyAgIHB1dDogIHRydWVcbiAgICAgIGZhbGxiYWNrVG9sZXJhbmNlOiAxMDBcbiAgICAgIG9uRW5kOiAoZSkgPT4gQHJlb3JkZXJDb2xsZWN0aW9uKClcblxuICAjIHJlb3JkZXJDb2xsZWN0aW9uXG4gICMgSW52b2tlZCBhZnRlciBzb3J0aW5nIGhhcyBjb21wbGV0ZWRcbiAgcmVvcmRlckNvbGxlY3Rpb246ID0+XG5cbiAgICAjIFRyaWdnZXJzIG9yZGVyIGV2ZW50cyBvbiBDb2xsZWN0aW9uVmlldyBjaGlsZFZpZXcgJGVsc1xuICAgIG9yZGVyID0gMVxuICAgIGZvciBlbCBpbiBAZWwuY2hpbGRyZW5cbiAgICAgICQoZWwpLnRyaWdnZXIoJ3NvcnRlZCcsb3JkZXIpXG4gICAgICBvcmRlcisrXG5cbiAgICAjIEBjb2xsZWN0aW9uLnNvcnQoKVxuICAgIEByZW5kZXIoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNYWNyb0xpc3RcblxuXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChjb25uZWN0ZWQpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBtYi00XFxcIj5cIik7XG5pZiAoIGNvbm5lY3RlZClcbntcbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJkaXNjb25uZWN0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeVxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLXRpbWVzIG1yLTFcXFwiPjwvaT5ESVNDT05ORUNUPC9idXR0b24+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8YnV0dG9uIGRhdGEtY2xpY2s9XFxcImNvbm5lY3RcXFwiIGNsYXNzPVxcXCJidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtdXNiIG1yLTFcXFwiPjwvaT5DT05ORUNUPC9idXR0b24+XCIpO1xufVxuYnVmLnB1c2goXCI8L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJrZXlzXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclxcXCI+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiY29ubmVjdGVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jb25uZWN0ZWQ6dHlwZW9mIGNvbm5lY3RlZCE9PVwidW5kZWZpbmVkXCI/Y29ubmVjdGVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGxhYmVsKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwicm93IGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMFxcXCI+PHAgY2xhc3M9XFxcImxlYWQgbWItMFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBsYWJlbCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9wPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0yIHRleHQtcmlnaHQgdGV4dC1tdXRlZFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLXBlbmNpbFxcXCI+PC9pPjwvZGl2PjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImxhYmVsXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5sYWJlbDp0eXBlb2YgbGFiZWwhPT1cInVuZGVmaW5lZFwiP2xhYmVsOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG5hdkl0ZW1zLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXggZmxleC1yb3cgYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxpIGNsYXNzPVxcXCJkLWZsZXggZmEgZmEtZncgZmEtMnggZmEtYXJyb3ctY2lyY2xlLW8tZG93biBtci0xXFxcIj48L2k+PHAgc3R5bGU9XFxcImxldHRlci1zcGFjaW5nOiAwLjI1cmVtOyBmb250LXdlaWdodDogMjAwO1xcXCIgY2xhc3M9XFxcImQtZmxleCBsZWFkIG0tMFxcXCI+U2VsZWN0IGFuIGVkaXRvcjwvcD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3cgbXQtNVxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj5cIik7XG4vLyBpdGVyYXRlIG5hdkl0ZW1zXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IG5hdkl0ZW1zO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCJcIiArIChqYWRlLmF0dHIoXCJ0aXRsZVwiLCBuYXZJdGVtLnRpdGxlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1wbGFjZW1lbnQ9XFxcImJvdHRvbVxcXCIgc3R5bGU9XFxcImZsZXgtZ3JvdzoxO1xcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLXRyaWdnZXJcIiwgbmF2SXRlbS50cmlnZ2VyLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuYXR0cihcImRpc2FibGVkXCIsIG5hdkl0ZW0uZGlzYWJsZWQsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydkLWZsZXgnLCdidG4nLCdidG4tb3V0bGluZS1zZWNvbmRhcnknLCdqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJywnbXgtMycsbmF2SXRlbS5jc3NdLCBbbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIG5hdkl0ZW0gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxidXR0b24gZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiXCIgKyAoamFkZS5hdHRyKFwidGl0bGVcIiwgbmF2SXRlbS50aXRsZSwgdHJ1ZSwgZmFsc2UpKSArIFwiIGRhdGEtcGxhY2VtZW50PVxcXCJib3R0b21cXFwiIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIG5hdkl0ZW0udHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmF0dHIoXCJkaXNhYmxlZFwiLCBuYXZJdGVtLmRpc2FibGVkLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnZC1mbGV4JywnYnRuJywnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywnanVzdGlmeS1jb250ZW50LWNlbnRlcicsJ214LTMnLG5hdkl0ZW0uY3NzXSwgW251bGwsbnVsbCxudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBuYXZJdGVtLnRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYnV0dG9uPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJuYXZJdGVtc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubmF2SXRlbXM6dHlwZW9mIG5hdkl0ZW1zIT09XCJ1bmRlZmluZWRcIj9uYXZJdGVtczp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcImNhbmNlbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IG14LTIgcHgtNFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IG14LTQgZmEtYW5nbGUtbGVmdFxcXCI+PC9pPjwvYnV0dG9uPjxidXR0b24gZGF0YS1jbGljaz1cXFwic2F2ZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtc3VjY2VzcyBteC0yIHB4LTRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS0yeCBteC00IGZhLWNoZWNrLWNpcmNsZS1vXFxcIj48L2k+PC9idXR0b24+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJjbGVhclxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtd2FybmluZyBteC0yIHB4LTRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS0yeCBteC00IGZhLXRpbWVzXFxcIj48L2k+PC9idXR0b24+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJyZWNvcmRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLWRhbmdlciBteC0yIHB4LTRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS0yeCBteC00IGZhLWNpcmNsZVxcXCI+PC9pPjwvYnV0dG9uPjxkaXYgY2xhc3M9XFxcImJ0bi1ncm91cFxcXCI+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtdG9nZ2xlPVxcXCJkcm9wZG93blxcXCIgYXJpYS1oYXNwb3B1cD1cXFwidHJ1ZVxcXCIgYXJpYS1leHBhbmRlZD1cXFwiZmFsc2VcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXByaW1hcnkgZHJvcGRvd24tdG9nZ2xlIG14LTIgcHgtNFxcXCI+RXhhbXBsZXM8L2J1dHRvbj48ZGl2IGNsYXNzPVxcXCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHQgbXQtM1xcXCI+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZXhhbXBsZT1cXFwiZXhfMDFcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1pdGVtXFxcIj5FeC4gMTogXFxcIkhlbGxvIVxcXCI8L2J1dHRvbj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1leGFtcGxlPVxcXCJleF8wMlxcXCIgY2xhc3M9XFxcImRyb3Bkb3duLWl0ZW1cXFwiPkV4LiAyOiBcXFwiUmVzdW3DqFxcXCI8L2J1dHRvbj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1leGFtcGxlPVxcXCJleF8wM1xcXCIgY2xhc3M9XFxcImRyb3Bkb3duLWl0ZW1cXFwiPkV4LiAzOiBFbSBEYXNoICjigJQpPC9idXR0b24+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZXhhbXBsZT1cXFwiZXhfMDRcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1pdGVtXFxcIj5FeC4gNDogQ1RSTCArIEFMVCArIERFTEVURTwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGhyLz48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJjb250ZW50XFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXggZmxleC1yb3cgYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxpIGNsYXNzPVxcXCJkLWZsZXggZmEgZmEtZncgZmEtMnggZmEtcXVlc3Rpb24tY2lyY2xlLW8gbXItMVxcXCI+PC9pPjxwIHN0eWxlPVxcXCJsZXR0ZXItc3BhY2luZzogMC4yNXJlbTsgZm9udC13ZWlnaHQ6IDIwMDtcXFwiIGNsYXNzPVxcXCJkLWZsZXggbGVhZCBtLTBcXFwiPkNsaWNrIGEga2V5IHRvIGVkaXQ8L3A+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93IG10LTVcXFwiPjxkaXYgc3R5bGU9XFxcIm9wYWNpdHk6MFxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGJ1dHRvbiBkaXNhYmxlZD1cXFwiZGlzYWJsZWRcXFwiIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG14LTNcXFwiPkJMQU5LPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGxhYmVsKSB7XG5idWYucHVzaChcIjxzcGFuPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGFiZWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Bhbj5cIik7fS5jYWxsKHRoaXMsXCJsYWJlbFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubGFiZWw6dHlwZW9mIGxhYmVsIT09XCJ1bmRlZmluZWRcIj9sYWJlbDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3cgaC0xMDAgdy0xMDAgZWRpdG9yLS1vdmVybGF5XFxcIj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJlZGl0b3JcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTIgcHQtMlxcXCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93IGRldmljZS0tb3ZlcmxheVxcXCI+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiZGV2aWNlXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJzZWxlY3RvclxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBwdC01XFxcIj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoYWN0aXZlX3Bvc2l0aW9uLCBhbHBoYSwgY3NzLCBrZXksIHNoaWZ0X2tleSwgc2hpZnRlZCwgc3BlY2lhbCkge1xuamFkZV9taXhpbnNbXCJwb3NpdGlvblNlbGVjdFwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxzcGFuIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIlwiICsgKGphZGUuYXR0cihcInRpdGxlXCIsIG9wdHMudG9vbHRpcCwgdHJ1ZSwgZmFsc2UpKSArIFwiIGRhdGEtcGxhY2VtZW50PVxcXCJib3R0b21cXFwiXCIgKyAoamFkZS5jbHMoWydmYS1zdGFjaycsJ2ZhLWxnJywncG9zaXRpb24tLXNlbGVjdCcsYHBvc2l0aW9uXyR7b3B0cy5wb3NpdGlvbn1gXSwgW251bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj48aSBjbGFzcz1cXFwiZmEgZmEtY2lyY2xlLXRoaW4gZmEtc3RhY2stMnhcXFwiPjwvaT48aSBjbGFzcz1cXFwiZmEgZmEtc3RhY2stMXggZmEtc3RhY2tcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1jaXJjbGUtdGhpbiBmYS1zdGFjay0yeCBmYS0yeFxcXCI+PC9pPjxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1wb3NpdGlvblwiLCBvcHRzLnBvc2l0aW9uLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnZmEnLCdmYS1zdGFjay0xeCcsb3B0cy5jc3NdLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+PC9pPjwvc3Bhbj5cIik7XG59O1xuYnVmLnB1c2goXCI8ZGl2XCIgKyAoamFkZS5jbHMoWydrZXknLCdkLWZsZXgnLHR5cGVvZiBzcGVjaWFsID09PSBcInVuZGVmaW5lZFwiID8gXCJcIiA6IFwic3BlY2lhbFwiXSwgW251bGwsbnVsbCx0cnVlXSkpICsgXCI+PGRpdlwiICsgKGphZGUuY2xzKFsnaW5uZXInLCdjb250ZW50Jyxjc3NdLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIHNoaWZ0ZWQgfHwgc2hpZnRfa2V5ICYmICFhbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSk7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuYnVmLnB1c2goXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJpbm5lciBob3ZlclxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLWxnIGZhLXRpbWVzXFxcIj48L2k+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicG9zaXRpb24gbXQtMlxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJwb3NpdGlvblNlbGVjdFwiXShhY3RpdmVfcG9zaXRpb24pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJhY3RpdmVfcG9zaXRpb25cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmFjdGl2ZV9wb3NpdGlvbjp0eXBlb2YgYWN0aXZlX3Bvc2l0aW9uIT09XCJ1bmRlZmluZWRcIj9hY3RpdmVfcG9zaXRpb246dW5kZWZpbmVkLFwiYWxwaGFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmFscGhhOnR5cGVvZiBhbHBoYSE9PVwidW5kZWZpbmVkXCI/YWxwaGE6dW5kZWZpbmVkLFwiY3NzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jc3M6dHlwZW9mIGNzcyE9PVwidW5kZWZpbmVkXCI/Y3NzOnVuZGVmaW5lZCxcImtleVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgua2V5OnR5cGVvZiBrZXkhPT1cInVuZGVmaW5lZFwiP2tleTp1bmRlZmluZWQsXCJzaGlmdF9rZXlcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnNoaWZ0X2tleTp0eXBlb2Ygc2hpZnRfa2V5IT09XCJ1bmRlZmluZWRcIj9zaGlmdF9rZXk6dW5kZWZpbmVkLFwic2hpZnRlZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc2hpZnRlZDp0eXBlb2Ygc2hpZnRlZCE9PVwidW5kZWZpbmVkXCI/c2hpZnRlZDp1bmRlZmluZWQsXCJzcGVjaWFsXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5zcGVjaWFsOnR5cGVvZiBzcGVjaWFsIT09XCJ1bmRlZmluZWRcIj9zcGVjaWFsOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInR5cGVcXFwiIHZhbHVlPVxcXCJtYWNyb1xcXCIgcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIi8+PGRpdiBkYXRhLXJlZ2lvbj1cXFwibWFjcm9cXFwiIGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGhyLz48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJjb250cm9sc1xcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxwIGNsYXNzPVxcXCJsZWFkIHRleHQtY2VudGVyXFxcIj5NYWNyb3M8YnIvPjxzbWFsbD5FeGVjdXRlIGtleXN0cm9rZXMgaW4gYSBzcGVjaWZpYyBzZXF1ZW5jZTwvc21hbGw+PC9wPjxzbWFsbCBzdHlsZT1cXFwiZm9udC1zaXplOiAxcmVtO1xcXCIgY2xhc3M9XFxcInRleHQtbXV0ZWQgZC1mbGV4IGZsZXgtcm93IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyXFxcIj48ZGl2IGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1xdWVzdGlvbi1jaXJjbGUtbyBtci0xIGQtZmxleCBmbGV4LWNvbHVtblxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZC1mbGV4IGZsZXgtcm93XFxcIj48c3Bhbj5Vc2UgdGhlIGtleXMgYmVsb3csIG9yIGNsaWNrJm5ic3A7PC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0ZXh0LWRhbmdlclxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLWNpcmNsZSB0ZXh0LWRhbmdlclxcXCI+PC9pPiByZWNvcmQmbmJzcDs8L3NwYW4+Jm5ic3A7dG8gc3RhcnQgdHlwaW5nPC9kaXY+PC9zbWFsbD5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmphZGVfbWl4aW5zW1wiZm9ybUdyb3VwXCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGZpZWxkc2V0XCIgKyAoamFkZS5jbHMoWydmb3JtLWdyb3VwJyxvcHRzLmZvcm1Hcm91cENzc10sIFtudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIG9wdHMubGFiZWwpXG57XG5idWYucHVzaChcIjxsYWJlbCBjbGFzcz1cXFwiZm9ybS1jb250cm9sLWxhYmVsXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMubGFiZWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGFiZWw+XCIpO1xufVxuYmxvY2sgJiYgYmxvY2soKTtcbmJ1Zi5wdXNoKFwiPC9maWVsZHNldD5cIik7XG59O1xuYnVmLnB1c2goXCJcIik7XG5qYWRlX21peGluc1tcImZvcm1JbnB1dFwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5qYWRlX21peGluc1tcImZvcm1Hcm91cFwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCI8aW5wdXRcIiArIChqYWRlLmF0dHJzKGphZGUubWVyZ2UoW3tcInBsYWNlaG9sZGVyXCI6IGphZGUuZXNjYXBlKG9wdHMucGxhY2Vob2xkZXIpLFwibmFtZVwiOiBqYWRlLmVzY2FwZShvcHRzLm5hbWUpLFwidHlwZVwiOiBqYWRlLmVzY2FwZShvcHRzLnR5cGUpLFwiY2xhc3NcIjogXCJmb3JtLWNvbnRyb2xcIn0sYXR0cmlidXRlc10pLCBmYWxzZSkpICsgXCIvPlwiKTtcbn1cbn0sIG9wdHMpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJ0eXBlXFxcIiB2YWx1ZT1cXFwidGV4dFxcXCIgcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIi8+XCIpO1xuamFkZV9taXhpbnNbXCJmb3JtSW5wdXRcIl0uY2FsbCh7XG5hdHRyaWJ1dGVzOiBqYWRlLm1lcmdlKFt7IGNsYXNzOiAnZm9ybS1jb250cm9sLWxnJyB9XSlcbn0sIHsgbmFtZTogJ3RleHRfdmFsdWUnLCB0eXBlOiAndGV4dCcsIHBsYWNlaG9sZGVyOiAnRW50ZXIgc29tZSB0ZXh0IGhlcmUuLi4nIH0pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5jbGFzcyBUZXh0RWRpdG9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdydcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RleHRfZWRpdG9yJylcblxuICBvblJlbmRlcjogLT5cbiAgICBCYWNrYm9uZS5TeXBob24uZGVzZXJpYWxpemUoQCwgeyB0eXBlOiAndGV4dCcsIHRleHRfdmFsdWU6IEBtb2RlbC5nZXQoJ3RleHRfdmFsdWUnKSB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0RWRpdG9yXG4iLCJcbiMgRHVtbXkgRGV2aWNlIERhdGEgZm9yIFVJIGRldmVsb3BtZW50XG4jIFRPRE8gLSBwdWxsIGZyb20gV2ViVVNCP1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBpZDogJ2RldmljZV8xJyxcbiAgICBsYWJlbDogJ0FsZXhcXCdzIEFzdHJvS2V5JyxcbiAgICBzdGF0dXNfY29kZTogMSxcbiAgICBrZXlzOiBbXG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzEnLCBvcmRlcjogJzB4MDAwMCcsIGNvbmZpZzogeyB0eXBlOiAnbWFjcm8nLCBtYWNyb3M6IFtdIH0gfVxuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV8yJywgb3JkZXI6ICcweDAwMDEnLCBjb25maWc6IHsgdHlwZTogJ21hY3JvJywgbWFjcm9zOiBbXSB9IH1cbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfMycsIG9yZGVyOiAnMHgwMDAyJywgY29uZmlnOiB7IHR5cGU6ICdtYWNybycsIG1hY3JvczogW10gfSB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzQnLCBvcmRlcjogJzB4MDAwMycsIGNvbmZpZzogeyB0eXBlOiAnbWFjcm8nLCBtYWNyb3M6IFtdIH0gfVxuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV81Jywgb3JkZXI6ICcweDAwMDQnLCBjb25maWc6IHsgdHlwZTogJ21hY3JvJywgbWFjcm9zOiBbXSB9IH1cbiAgICBdXG4gIH1cbl1cbiIsIk1hY3JvRW50aXRpZXMgPSByZXF1aXJlKCcuLi9tYWNyby9lbnRpdGllcycpXG5NYWNyb0tleXMgPSByZXF1aXJlKCcuLi9rZXkva2V5cycpXG5DaGFyYWN0ZXJNYXAgPSByZXF1aXJlKCdsaWIvY2hhcmFjdGVyX21hcCcpXG5JbnZlcnRlZENoYXJhY3Rlck1hcCA9IF8uaW52ZXJ0KENoYXJhY3Rlck1hcClcblxuIyAjICMgIyAjXG5cbiMgQWNjZXB0cyBhbiBhcnJheSBhbmQgc3BsaXRzIGl0XG4jIGludG8gcGFpcnMgb2YgW3Bvc2l0aW9uLCBjaGFyYWN0ZXJfaWRdXG5wYWlyQXJyYXkgPSAoYSkgPT5cbiAgdGVtcCA9IGEuc2xpY2UoKVxuICBhcnIgPSBbXVxuXG4gIHdoaWxlICh0ZW1wLmxlbmd0aClcbiAgICBhcnIucHVzaCh0ZW1wLnNwbGljZSgwLDIpKVxuXG4gIHJldHVybiBhcnJcblxuIyAjICMgIyAjXG5cbiMgQXN0cm9LZXlDb25maWcgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgQXN0cm9rZXlDb25maWcgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIERlZmF1bHQgYXR0cmlidXRlc1xuICBkZWZhdWx0czoge1xuICAgIHR5cGU6ICdtYWNybydcbiAgICBtYWNyb3M6IFtdXG4gICAgdGV4dF92YWx1ZTogJydcbiAgICBrZXlfdmFsdWU6ICcnXG4gIH1cblxuICAjIEJhY2tib25lLlJlbGF0aW9uYWwgLSBAcmVsYXRpb25zIGRlZmluaXRpb25cbiAgcmVsYXRpb25zOiBbXG4gICAgICB0eXBlOiAgICAgICAgICAgQmFja2JvbmUuSGFzTWFueVxuICAgICAga2V5OiAgICAgICAgICAgICdtYWNyb3MnXG4gICAgICByZWxhdGVkTW9kZWw6ICAgTWFjcm9FbnRpdGllcy5Nb2RlbFxuICAgICAgY29sbGVjdGlvblR5cGU6IE1hY3JvRW50aXRpZXMuQ29sbGVjdGlvblxuICBdXG5cbiMgIyAjICMgI1xuXG4jIEFzdHJva2V5TW9kZWwgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgQXN0cm9rZXlNb2RlbCBleHRlbmRzIEJhY2tib25lLlJlbGF0aW9uYWxNb2RlbFxuXG4gICMgRGVmYXVsdCBhdHRyaWJ1dGVzXG4gIGRlZmF1bHRzOlxuICAgIG9yZGVyOiBudWxsXG4gICAgY29uZmlnOiB7fVxuXG4gICMgQmFja2JvbmUuUmVsYXRpb25hbCAtIEByZWxhdGlvbnMgZGVmaW5pdGlvblxuICByZWxhdGlvbnM6IFtcbiAgICAgIHR5cGU6ICAgICAgICAgICBCYWNrYm9uZS5IYXNPbmVcbiAgICAgIGtleTogICAgICAgICAgICAnY29uZmlnJ1xuICAgICAgcmVsYXRlZE1vZGVsOiAgIEFzdHJva2V5Q29uZmlnXG4gIF1cblxuICAjIHJlYWRNYWNyb1xuICAjIFJlYWRzIGFuZCBwYXJzZXMgdGhlIG1hY3JvIGZyb20gdGhlIGRldmljZVxuICByZWFkTWFjcm86IC0+XG5cbiAgICAjIFJldHVybnMgYSBQcm9taXNlIHRvIGhhbmRsZSBhc3luY2hyb25vdXMgYmVoYXZpb3JcbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgIyBJc3N1ZXMgJ3JlYWQ6bWFjcm8nIHJlcXVlc3QgdG8gdGhlIFVTQiBzZXJ2aWNlXG4gICAgICBSYWRpby5jaGFubmVsKCd1c2InKS5yZXF1ZXN0KCdyZWFkOm1hY3JvJywgQGdldCgnb3JkZXInKSkudGhlbigobWFjcm9BcnJheSkgPT5cblxuICAgICAgICAjIFN0b3JlcyB0aGUga2V5cyB1c2VkIHRvIHBvcHVsYXRlIHRoZSBtYWNybyBjb2xsZWN0aW9uXG4gICAgICAgIG1hY3JvcyA9IFtdXG4gICAgICAgIHBhcnNlZE1hY3JvcyA9IFtdXG5cbiAgICAgICAgIyBDb21wYWN0cyB0aGUgbWFjcm9BcnJheVxuICAgICAgICAjIFFVRVNUSU9OIC0gd2lsbCB3ZSBldmVyIGhhdmUgemVyb3MgYmV0d2VlbiBlYWNoIGtleSBzdHJva2U/XG4gICAgICAgIG1hY3JvQXJyYXkgPSBfLmNvbXBhY3QobWFjcm9BcnJheSlcblxuICAgICAgICAjIFNwbGl0cyB0aGUgYXJyYXkgaW50byBwYWlycyBvZiBbcG9zaXRpb24sIGNoYXJhY3Rlcl9pZF1cbiAgICAgICAgcGFpcnMgPSBwYWlyQXJyYXkobWFjcm9BcnJheSlcblxuICAgICAgICAjIEl0ZXJhdGVzIG92ZXIgZWFjaCBwYWlyIGluIHRoZSBtYWNyb0FycmF5XG4gICAgICAgIGZvciBwYWlyLCBpbmRleCBpbiBwYWlyc1xuXG4gICAgICAgICAgIyBDYXB0dXJlcyBhbmQgZm9ybWF0cyB0aGUgcG9zaXRpb25cbiAgICAgICAgICBwb3NpdGlvbiA9IHBhaXJbMF1cbiAgICAgICAgICBwb3NpdGlvbiA9IGlmIHBvc2l0aW9uID09IDIgdGhlbiAxIGVsc2UgLTFcblxuICAgICAgICAgICMgRmluZHMgdGhlIG1hY3JvIG9iamVjdFxuICAgICAgICAgIG1hY3JvID0gXy5maW5kV2hlcmUoTWFjcm9LZXlzLCB7IGtleTogSW52ZXJ0ZWRDaGFyYWN0ZXJNYXBbcGFpclsxXV0gfSlcblxuICAgICAgICAgICMgQ2xvbmVzIHRoZSBtYWNybyBvYmplY3RcbiAgICAgICAgICBtYWNybyA9IF8uY2xvbmUobWFjcm8pXG5cbiAgICAgICAgICAjIEFzc2lnbnNzIHRoZSBwcm9wZXIgb3JkZXIvaW5kZXggYW5kIHBvc2l0aW9uIGF0dHJpYnV0ZXNcbiAgICAgICAgICBtYWNyby5vcmRlciA9IGluZGV4XG4gICAgICAgICAgbWFjcm8ucG9zaXRpb24gPSBwb3NpdGlvblxuXG4gICAgICAgICAgIyBBcHBlbmRzIHRoZSBtYWNybyB0aGUgdGhlIGBtYWNyb3NgIGFycmF5XG4gICAgICAgICAgbWFjcm9zLnB1c2gobWFjcm8pXG5cbiAgICAgICAgIyBJdGVyYXRlcyBvdmVyIHRoZSBtYWNyb3MgX2FnYWluXyAtIHRoaXMgdGltZSB0byBtZXJnZSBrZXl1cC9rZXlkb3duIGFjdGlvbnNcbiAgICAgICAgbWFjcm9JbmRleCA9IDBcbiAgICAgICAgd2hpbGUgbWFjcm9JbmRleCA8PSBtYWNyb3MubGVuZ3RoXG5cbiAgICAgICAgICAjIElzb2xhdGVzIHRoZSBjdXJyZW50IGFuZCBuZXh0IG1hY3JvcyBpbiB0aGUgYXJyYXlcbiAgICAgICAgICBtYWNybyA9IG1hY3Jvc1ttYWNyb0luZGV4XVxuICAgICAgICAgIG5leHRNYWNybyA9IG1hY3Jvc1ttYWNyb0luZGV4ICsgMV1cblxuICAgICAgICAgICMgUmV0dXJucyBpZiBuZXh0TWFjcm8gaXMgdW5kZWZpbmVkXG4gICAgICAgICAgaWYgIW5leHRNYWNyb1xuICAgICAgICAgICAgcGFyc2VkTWFjcm9zLnB1c2gobWFjcm8pXG4gICAgICAgICAgICBtYWNyb0luZGV4KytcbiAgICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgICAjIENvbnRpbnVlcyBjaGVjayBpZiB0aGUgbWFjcm8gaXMgYSBLRVlfRE9XTlxuICAgICAgICAgIGlmIG1hY3JvLnBvc2l0aW9uID09IC0xICYmIG5leHRNYWNyby5wb3NpdGlvbiA9PSAxICYmIG1hY3JvLmtleSA9PSBuZXh0TWFjcm8ua2V5XG5cbiAgICAgICAgICAgICMgS0VZX1BSRVNTXG4gICAgICAgICAgICBtYWNyby5wb3NpdGlvbiA9IDBcblxuICAgICAgICAgICAgIyBBcHBlbmRzIHRoZSBtYWNybyB0byB0aGUgcGFyc2VkTWFjcm9zIGFycmF5XG4gICAgICAgICAgICBwYXJzZWRNYWNyb3MucHVzaChtYWNybylcblxuICAgICAgICAgICAgIyBJdGVyYXRlcywgc2tpcHBpbmcgdGhlIG1hdGNoZWQgbWFjcm9cbiAgICAgICAgICAgIG1hY3JvSW5kZXggPSBtYWNyb0luZGV4ICsgMlxuICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICAjIFNldHMgdGhlIE1hY3JvcyBvbiB0aGUgQXN0cm9rZXlDb25maWcgbW9kZWxcbiAgICAgICAgY29uZmlnID0gQGdldCgnY29uZmlnJylcbiAgICAgICAgY29uZmlnLmdldCgnbWFjcm9zJykucmVzZXQocGFyc2VkTWFjcm9zKVxuXG4gICAgICAgICMgUmVzb2x2ZXMgdGhlIFByb21pc2Ugd2l0aCB0aGUgcGFyc2VkIG1hY3Jvc1xuICAgICAgICByZXR1cm4gcmVzb2x2ZShtYWNyb3MpXG4gICAgICApXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBBc3Ryb2tleUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBBc3Ryb2tleU1vZGVsXG4gIGNvbXBhcmF0b3I6ICdvcmRlcidcblxuIyAjICMgIyAjXG5cbiMgRGV2aWNlTW9kZWwgZGVmaW5pdGlvblxuY2xhc3MgRGV2aWNlTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIEJhY2tib25lLlJlbGF0aW9uYWwgLSBAcmVsYXRpb25zIGRlZmluaXRpb25cbiAgcmVsYXRpb25zOiBbXG4gICAgICB0eXBlOiAgICAgICAgICAgQmFja2JvbmUuSGFzTWFueVxuICAgICAga2V5OiAgICAgICAgICAgICdrZXlzJ1xuICAgICAgcmVsYXRlZE1vZGVsOiAgIEFzdHJva2V5TW9kZWxcbiAgICAgIGNvbGxlY3Rpb25UeXBlOiBBc3Ryb2tleUNvbGxlY3Rpb25cbiAgXVxuXG4jICMgIyAjICNcblxuIyBEZXZpY2VDb2xsZWN0aW9uIGRlZmluaXRpb25cbmNsYXNzIERldmljZUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBEZXZpY2VNb2RlbFxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPVxuICBNb2RlbDogICAgICBEZXZpY2VNb2RlbFxuICBDb2xsZWN0aW9uOiBEZXZpY2VDb2xsZWN0aW9uXG4iLCJFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKVxuRGV2aWNlRGF0YSA9IHJlcXVpcmUoJy4vZGF0YScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VGYWN0b3J5IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAnZGV2aWNlIG1vZGVsJzogICAgICAgJ2dldE1vZGVsJ1xuICAgICdkZXZpY2UgY29sbGVjdGlvbic6ICAnZ2V0Q29sbGVjdGlvbidcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjYWNoZWRDb2xsZWN0aW9uID0gbmV3IEVudGl0aWVzLkNvbGxlY3Rpb24oRGV2aWNlRGF0YSwgeyBwYXJzZTogdHJ1ZSB9KVxuXG4gIGdldE1vZGVsOiAoaWQpIC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uLmdldChpZClcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBAY2FjaGVkQ29sbGVjdGlvblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRGV2aWNlRmFjdG9yeSgpXG4iLCJMYXlvdXRWaWV3ICA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jICMgIyAjICNcblxuY2xhc3MgSG9tZVJvdXRlIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGUnXG5cbiAgdGl0bGU6ICdBc3Ryb0tleSBIb21lJ1xuXG4gIGJyZWFkY3J1bWJzOiBbeyB0ZXh0OiAnRGV2aWNlJyB9XVxuXG4gIGZldGNoOiAtPlxuICAgIEBkZXZpY2VNb2RlbCA9IFJhZGlvLmNoYW5uZWwoJ2RldmljZScpLnJlcXVlc3QoJ21vZGVsJywgJ2RldmljZV8xJylcblxuICByZW5kZXI6IC0+XG4gICAgY29uc29sZS5sb2coQGRldmljZU1vZGVsKTsgIyBEZWJ1Z1xuICAgIEBjb250YWluZXIuc2hvdyBuZXcgTGF5b3V0Vmlldyh7IG1vZGVsOiBAZGV2aWNlTW9kZWwgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSG9tZVJvdXRlXG4iLCJcbmNsYXNzIEhvbWVMYXlvdXRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9sYXlvdXQnXG4gIGNsYXNzTmFtZTogJ2NvbnRhaW5lci1mbHVpZCBoLTEwMCdcblxuIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWVMYXlvdXRWaWV3XG5cblxuXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3cgaC0xMDBcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PHAgY2xhc3M9XFxcImxlYWRcXFwiPkFzdHJvS2V5PC9wPjxoci8+PHAgY2xhc3M9XFxcImxlYWRcXFwiPkNvbm5lY3QgYW4gQXN0cm9LZXkgZGV2aWNlIHRvIGdldCBzdGFydGVkPC9wPjxoci8+PGEgaHJlZj1cXFwiI2RldmljZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tb3V0bGluZS1wcmltYXJ5XFxcIj5ERVZJQ0U8L2E+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInJlcXVpcmUgJy4vZmFjdG9yeSdcbkhvbWVSb3V0ZSA9IHJlcXVpcmUgJy4vaG9tZS9yb3V0ZSdcbkRhc2hib2FyZFJvdXRlID0gcmVxdWlyZSAnLi9kYXNoYm9hcmQvcm91dGUnXG5cbiMgIyAjICMgI1xuXG4jIE1haW5Sb3V0ZXIgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgTWFpblJvdXRlciBleHRlbmRzIHJlcXVpcmUgJ2huX3JvdXRpbmcvbGliL3JvdXRlcidcblxuICByb3V0ZXM6XG4gICAgJygvKSc6ICdob21lJ1xuXG4gIGhvbWU6IC0+XG4gICAgbmV3IERhc2hib2FyZFJvdXRlKHsgY29udGFpbmVyOiBAY29udGFpbmVyIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1haW5Sb3V0ZXJcbiIsIlxuIyBGaWx0ZXJzIHVzZWQgdG8gcXVlcnkgV2ViVVNCIGRldmljZXNcbiMgVE9ETyAtIHVwZGF0ZSBmaWx0ZXJzIHRvIHF1ZXJ5IGRldmljZXMgYnkgQXN0cm9LZXkgVmVuZG9ySURcbnJlcXVlc3REZXZpY2VGaWx0ZXJzID0gW1xuICB7IHZlbmRvcklkOiAweDEwYzQgfVxuXVxuXG4jICMgIyAjXG5cbiMgQ2hyb21lV2ViVXNiU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIFJlc3BvbnNpYmxlIGZvciBtYW5hZ2luZyBVU0IgZGV2aWNlc1xuIyAtIGZldGNoIGFsbCBkZXZpY2VzXG4jIC0gd3JpdGluZyBkYXRhIHRvIGEgZGV2aWNlXG4jIC0gcmVhZGluZyBkYXRhIGZyb20gYSBkZXZpY2VcbiMgLSB3cml0ZSBmaXJtd2FyZSB0byBhIGRldmljZVxuY2xhc3MgQ2hyb21lV2ViVXNiU2VydmljZSBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ3VzYiBkZXZpY2VzJzogICAgICAnZ2V0RGV2aWNlcydcbiAgICAndXNiIHJlYWQ6bWFjcm8nOiAgICdyZWFkTWFjcm8nXG4gICAgJ3VzYiB3cml0ZTptYWNybyc6ICAnd3JpdGVNYWNybydcblxuICAjIGdldERldmljZXNcbiAgZ2V0RGV2aWNlczogLT5cblxuICAgICMgUmV0dXJucyBhIFByb21pc2UgdG8gbWFuYWdlIGFzeW5jaG9ub3VzIGJlaGF2aW9yXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG5cbiAgICAgICMgU3RlcCAxIC0gUmVxdWVzdCBkZXZpY2VcbiAgICAgIG5hdmlnYXRvci51c2IucmVxdWVzdERldmljZSh7IGZpbHRlcnM6IHJlcXVlc3REZXZpY2VGaWx0ZXJzIH0pXG4gICAgICAudGhlbiggKGRldmljZSkgPT5cblxuICAgICAgICAjIFRPRE8gLSByZW1vdmVcbiAgICAgICAgIyBjb25zb2xlLmxvZyBkZXZpY2VcblxuICAgICAgICAjIFN0ZXAgMiAtIEdldCBEZXZpY2VzXG4gICAgICAgICMgVE9ETyAtIHZlcmlmeSB0aGlzIHdvcmtmbG93XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNiLmdldERldmljZXMoKVxuICAgICAgICAudGhlbigoZCkgPT5cblxuICAgICAgICAgIGNvbnNvbGUubG9nKGQpXG5cbiAgICAgICAgICBkID0gZFswXVxuXG4gICAgICAgICAgIyBTVEVQIDMgLSBvcGVuIGRldmljZVxuICAgICAgICAgIGQub3BlbigpLnRoZW4gPT5cblxuICAgICAgICAgICAgY29uc29sZS5sb2cgJ29wZW4nXG5cbiAgICAgICAgICAgICMgU3RlcCA0IC0gc2VsZWN0IGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICAgIGQuc2VsZWN0Q29uZmlndXJhdGlvbigxKS50aGVuID0+XG5cbiAgICAgICAgICAgICAgIyBjb25zb2xlLmxvZyAnc2VsZWN0Q29uZmlndXJhdGlvbidcblxuICAgICAgICAgICAgICAjIFRPRE8gLSByZW1vdmVcbiAgICAgICAgICAgICAgd2luZG93LmQgPSBkXG5cbiAgICAgICAgICAgICAgIyBSZXNvbHZlcyB3aXRoIGRldmljZVxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShkKVxuXG4gICAgICAgICAgICAgICMgd0luZGV4IC0gUmVxdWVzdCB0eXBlICgweDAxIGZvciBzZXQgbWFjcm8pXG4gICAgICAgICAgICAgICMgd1ZhbHVlIC0gTWFjcm8gaW5kZXggKDAgLSA0IGluY2x1c2l2ZSlcbiAgICAgICAgICAgICAgIyBiUmVxdWVzdCAtIDMgKGhhcmRjb2RlZClcbiAgICAgICAgICAgICAgIyB3TGVuZ3RoIC0gbnVtYmVyIG9mIGJ5dGVzIChzaG91bGQgYmUgbWFjcm8gbGVuZ3RoICogMilcblxuICAgICAgICAgICAgICAjIGQuY29udHJvbFRyYW5zZmVyT3V0KFxuICAgICAgICAgICAgICAjICAge1xuICAgICAgICAgICAgICAjICAgICAncmVxdWVzdFR5cGUnOiAndmVuZG9yJyxcbiAgICAgICAgICAgICAgIyAgICAgJ3JlY2lwaWVudCc6ICdkZXZpY2UnLFxuICAgICAgICAgICAgICAjICAgICAncmVxdWVzdCc6IDB4MDMsXG4gICAgICAgICAgICAgICMgICAgICd2YWx1ZSc6IDB4MDAwMCxcbiAgICAgICAgICAgICAgIyAgICAgJ2luZGV4JzogMHgwMVxuICAgICAgICAgICAgICAjICAgfSwgbmV3IFVpbnQ4QXJyYXkoWzEsNCwyLDRdKS5idWZmZXJcbiAgICAgICAgICAgICAgIyApLnRoZW4oIChyZXNwb25zZSkgPT4geyBjb25zb2xlLmxvZyhyZXNwb25zZSkgfSlcblxuICAgICAgICAgICAgICAjIFNURVAgNSAtIGNvbnRyb2xUcmFuc2ZlckluXG4gICAgICAgICAgICAgICMgd2luZG93LmQuY29udHJvbFRyYW5zZmVySW4oeydyZXF1ZXN0VHlwZSc6ICdzdGFuZGFyZCcsICdyZWNpcGllbnQnOiAnZGV2aWNlJywgJ3JlcXVlc3QnOiAweDA2LCAndmFsdWUnOiAweDBGMDAsICdpbmRleCc6IDB4MDB9LCA1KS50aGVuKCAocikgPT4geyBjb25zb2xlLmxvZyhyKSB9KVxuXG5cbiAgICAgICAgKVxuICAgICAgICAjIGdldERldmljZXMgRXJyb3IgaGFuZGxpbmdcbiAgICAgICAgLmNhdGNoKChlcnIpID0+XG4gICAgICAgICAgY29uc29sZS5sb2cgJ0VSUiAtIG5hdmlnYXRvci51c2IuZ2V0RGV2aWNlcygpJ1xuICAgICAgICApXG5cbiAgICAgIClcblxuICAjIHJlYWRNYWNyb1xuICByZWFkTWFjcm86IChtYWNyb0luZGV4ID0gMHgwMDAwKSAtPlxuICAgICMgUmV0dXJucyBhIFByb21pc2UgdG8gbWFuYWdlIGFzeW5jaG9ub3VzIGJlaGF2aW9yXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG5cbiAgICAgICMgZGV2aWNlLmNvbnRyb2xUcmFuc2ZlckluIChSRUFEUyBEQVRBIEZST00gREVWSUNFKVxuICAgICAgIyBUT0RPIC0gYWJzdHJhY3QgdGhlIGNvbnRyb2xUcmFuc2ZlckluIHJlcXVlc3Qgb2JqZWN0IGludG8gYSBjb25zdGFudCAoY2xvbmVkIGVhY2ggdGltZSlcbiAgICAgIGQuY29udHJvbFRyYW5zZmVySW4oXG4gICAgICAgIHtcbiAgICAgICAgICAncmVxdWVzdFR5cGUnOiAgJ3ZlbmRvcicsXG4gICAgICAgICAgJ3JlY2lwaWVudCc6ICAgICdkZXZpY2UnLFxuICAgICAgICAgICdyZXF1ZXN0JzogICAgICAweDAzLFxuICAgICAgICAgICd2YWx1ZSc6ICAgICAgICBtYWNyb0luZGV4LFxuICAgICAgICAgICdpbmRleCc6ICAgICAgICAweDAyXG4gICAgICAgIH0sIDEyOCAjIFFVRVNUSU9OIC0gd2h5IFwiMTI4XCI/XG4gICAgICApXG4gICAgICAudGhlbiggKHJlc3BvbnNlKSA9PlxuICAgICAgICByZXR1cm4gcmVzb2x2ZShuZXcgSW50OEFycmF5KHJlc3BvbnNlLmRhdGEuYnVmZmVyKSlcbiAgICAgIClcbiAgICAgIC5jYXRjaCggKGVycikgPT5cbiAgICAgICAgY29uc29sZS5sb2cgJ0VSUk9SIFJFQURJTkcgTUFDUk8nXG4gICAgICAgIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgKVxuXG5cbiAgIyBzZW5kTWFjcm9cbiAgc2VuZE1hY3JvOiAoZGF0YSkgLT5cblxuICAgICMgUmV0dXJucyBhIFByb21pc2UgdG8gbWFuYWdlIGFzeW5jaG9ub3VzIGJlaGF2aW9yXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG5cbiAgICAgIGQuY29udHJvbFRyYW5zZmVyT3V0KFxuICAgICAgICB7XG4gICAgICAgICAgcmVxdWVzdFR5cGU6ICAndmVuZG9yJyxcbiAgICAgICAgICByZWNpcGllbnQ6ICAgICdkZXZpY2UnLFxuICAgICAgICAgIHJlcXVlc3Q6ICAgICAgMHgwMyxcbiAgICAgICAgICB2YWx1ZTogICAgICAgIDB4MDAxMywgIyBXaGF0ZXZlciB3ZSB3YW50ICh0byBzb21lIGV4dGVudClcbiAgICAgICAgICBpbmRleDogICAgICAgIDB4MDAwMSAgIyBUT0RPIC0gV2UgY2FuIHVzZSBpbmRleCBmb3IgdGhlIGtleSB0aGUgbWFjcm8gY29ycmVzcG9uZHMgdG8gKGxvdy1ieXRlID0ga2V5LCBoaWdoLWJ5dGUgPSBudW1iZXIgb2YgYWN0aW9ucyBpbiB0aGUgbWFjcm8pXG4gICAgICAgIH0sIG5ldyBVaW50OEFycmF5KGRhdGEpLmJ1ZmZlclxuICAgICAgKVxuICAgICAgLnRoZW4oIChyZXNwb25zZSkgPT5cbiAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzcG9uc2UpXG4gICAgICApXG4gICAgICAuY2F0Y2goIChlcnIpID0+XG4gICAgICAgIGNvbnNvbGUubG9nICdFUlJPUiBTRU5ESU5HIE1BQ1JPJ1xuICAgICAgICByZXR1cm4gcmVqZWN0KGVycilcbiAgICAgIClcblxuXG4jICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IENocm9tZVdlYlVzYlNlcnZpY2UoKVxuIixudWxsLCJcbiMgUHJvdmlkZXMgdXBkYXRlQXR0cnMgbWV0aG9kIHVzZWQgYnkgYmluZENoZWNrYm94ZXMsIGJpbmRJbnB1dHMsIGJpbmRSYWRpb3MsIGJpbmRTZWxlY3RzXG5jbGFzcyBCaW5kQmFzZSBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1cGRhdGVBdHRyczogKGUpIC0+XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIEB2aWV3Lm1vZGVsLnNldChCYWNrYm9uZS5TeXBob24uc2VyaWFsaXplKEApKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5kQmFzZVxuIiwiXG4jIERhdGFiaW5kaW5nIGZvciBmb3JtIGlucHV0c1xuY2xhc3MgQmluZElucHV0cyBleHRlbmRzIHJlcXVpcmUgJy4vYmluZEJhc2UnXG5cbiAgZXZlbnRzOlxuICAgICdpbnB1dCBpbnB1dCc6ICAndXBkYXRlQXR0cnMnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbmRJbnB1dHNcbiIsIlxuX3NlbmRGbGFzaCA9ICh0eXBlLCBvYmopIC0+XG4gIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykudHJpZ2dlcih0eXBlLCBvYmopXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBGbGFzaGVzQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnM9e30pIC0+XG4gICAgQHZpZXcuX2ZsYXNoZXMgICAgICA9IEBvcHRpb25zXG4gICAgQHZpZXcuZmxhc2hFcnJvciAgICA9IEBmbGFzaEVycm9yXG4gICAgQHZpZXcuZmxhc2hTdWNjZXNzICA9IEBmbGFzaFN1Y2Nlc3NcblxuICBmbGFzaEVycm9yOiAob2JqPXt9KSAtPlxuICAgIF9zZW5kRmxhc2goJ2Vycm9yJywgQF9mbGFzaGVzWydlcnJvciddIHx8IG9iailcblxuICBmbGFzaFN1Y2Nlc3M6IChvYmo9e30pIC0+XG4gICAgX3NlbmRGbGFzaCgnc3VjY2VzcycsIEBfZmxhc2hlc1snc3VjY2VzcyddIHx8IG9iailcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hlc0JlaGF2aW9yXG4iLCJcbmNsYXNzIE1vZGVsRXZlbnRzQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgbW9kZWxFdmVudHM6XG4gICAgJ3JlcXVlc3QnOiAgJ29uTW9kZWxSZXF1ZXN0J1xuICAgICdzeW5jJzogICAgICdvbk1vZGVsU3luYydcbiAgICAnZXJyb3InOiAgICAnb25Nb2RlbEVycm9yJ1xuXG4gIG9uTW9kZWxSZXF1ZXN0OiAobW9kZWwsIHN0YXR1cywgb3B0aW9ucykgLT5cbiAgICBAdmlldy5vblJlcXVlc3Q/KG1vZGVsLCBzdGF0dXMsIG9wdGlvbnMpXG5cbiAgb25Nb2RlbFN5bmM6IChtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpIC0+XG4gICAgQHZpZXcub25TeW5jPyhtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpXG5cbiAgb25Nb2RlbEVycm9yOiAobW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKSAtPlxuICAgIEB2aWV3Lm9uRXJyb3I/KG1vZGVsLCByZXNwb25zZSwgb3B0aW9ucylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kZWxFdmVudHNCZWhhdmlvclxuIiwiXG4jIFN1Ym1pdEJ1dHRvbkJlaGF2aW9yIGNsYXNzIGRlZmluaXRpb25cbiMgUHJvdmlkZXMgYW4gZXZlbnQgbGlzdGVuZXIgYW5kIGhhbmRsZXIsIGFuZCBkZWZpbmVzXG4jIGFzc29jaWF0ZWQgY2FsbGJhY2tzIG9uIHRoZSB2aWV3IHRvIHdoaWNoIHRoZSBiZWhhdmlvclxuIyBpcyBhdHRhY2hlZC4gVGhpcyBpcyB1c2VkIGluIHRoZSBQYXNzd29yZCBhbmQgU25pcHBldCBmb3Jtcy5cbmNsYXNzIFN1Ym1pdEJ1dHRvbkJlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIHVpOlxuICAgIHN1Ym1pdDogJ1tkYXRhLWNsaWNrPXN1Ym1pdF0nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuc3VibWl0Om5vdCguZGlzYWJsZWQpJzogJ29uU3VibWl0Q2xpY2snXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnM9e30pIC0+XG4gICAgQHZpZXcuZGlzYWJsZVN1Ym1pdCA9ID0+IEBkaXNhYmxlU3VibWl0KClcbiAgICBAdmlldy5lbmFibGVTdWJtaXQgID0gPT4gQGVuYWJsZVN1Ym1pdCgpXG5cbiAgb25TdWJtaXRDbGljazogKGUpIC0+IEB2aWV3Lm9uU3VibWl0PyhlKVxuICBkaXNhYmxlU3VibWl0OiAtPiBAdWkuc3VibWl0LmFkZENsYXNzKCdkaXNhYmxlZCcpXG4gIGVuYWJsZVN1Ym1pdDogLT4gIEB1aS5zdWJtaXQucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU3VibWl0QnV0dG9uQmVoYXZpb3JcbiIsIlxuY2xhc3MgVG9vbHRpcEJlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIHVpOlxuICAgIHRvb2x0aXBzOiAnW2RhdGEtdG9nZ2xlPXRvb2x0aXBdJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgIyBQcm94aWVzIGNsZWFyIG1ldGhvZCB0byBiZSBhY2Nlc3NpYmxlIGluc2lkZSB0aGUgdmlld1xuICAgIEB2aWV3LmNsZWFyVG9vbHRpcHMgPSA9PiBAY2xlYXIoKVxuXG4gIGNsZWFyOiAtPlxuICAgIEB1aS50b29sdGlwcy50b29sdGlwKCdoaWRlJylcbiAgICBAdWkudG9vbHRpcHMudG9vbHRpcCgnZGlzcG9zZScpXG5cbiAgb25SZW5kZXI6IC0+IEB1aS50b29sdGlwcz8udG9vbHRpcCgpXG4gIG9uQmVmb3JlRGVzdHJveTogLT4gQGNsZWFyKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gVG9vbHRpcEJlaGF2aW9yXG4iLCJcbiMgQXNzaWducyBNYXJpb25ldHRlLkRlY29yYXRvclxuTWFyaW9uZXR0ZS5EZWNvcmF0b3IgPSByZXF1aXJlICcuL2RlY29yYXRvcidcblxuIyBPdmVycmlkZXMgZGVmYXVsdCBzZXJpYWxpemVNb2RlbCgpIG1ldGhvZCBkZWZpbml0aW9uXG4jIEluIHRoZSBjb250ZXh0IHRoZSBzZXJpYWxpemVNb2RlbCBtZXRob2QsICd0aGlzJ1xuIyByZWZlcnMgdG8gdGhlIHZpZXcgaW5zdGFuY2UgaW5zaWRlIHdoaWNoIHRoZVxuIyBzZXJpYWxpemVNb2RlbCBtZXRob2Qgd2FzIGludm9rZWRcbk1hcmlvbmV0dGUuVmlldy5wcm90b3R5cGUuc2VyaWFsaXplTW9kZWwgPSAtPlxuXG4gICMgSWYgdGhpcy5tb2RlbCBpcyBub3QgZGVmaW5lZCwgcmV0dXJuIGFuIGVtcHR5IG9iamVjdFxuICBpZiAhdGhpcy5tb2RlbFxuICAgIHJldHVybiB7fVxuXG4gICMgSWYgdGhpcy5tb2RlbCBleGlzdHMsIGFuZCBoYXMgYSBkZWNvcmF0b3IgZGVmaW5lZCxcbiAgIyByZXR1cm4gdGhlIHRoaXMubW9kZWwncyBhdHRyaWJ1dGVzIGFuZCBkZWNvcmF0aW9uc1xuICBlbHNlIGlmIHRoaXMubW9kZWwuZGVjb3JhdG9yXG4gICAgcmV0dXJuIHRoaXMubW9kZWwuZGVjb3JhdG9yLmRlY29yYXRlKHRoaXMubW9kZWwpXG5cbiAgIyBPdGhlcndpc2UsIHJldHVybiB0aGUgY2xvbmVkIGF0dHJpYnV0ZXMgb2YgdGhpcy5tb2RlbFxuICByZXR1cm4gXy5jbG9uZSB0aGlzLm1vZGVsLmF0dHJpYnV0ZXNcbiIsIlxuIyBCYXNlRGVjb3JhdG9yIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIHNpbXBsZSBjbGFzcyB0byBkZWNvcmF0ZSBtb2RlbHMgd2hlblxuIyB0aGV5IGFyZSBzZXJpYWxpemVkIGludG8gYSB2aWV3J3MgdGVtcGxhdGVcbmNsYXNzIEJhc2VEZWNvcmF0b3JcblxuICAjIERlY29yYXRpb24gbWV0aG9kXG4gICMgSW52b2tlZCBpbiBNYXJpb25ldHRlLlZpZXcucHJvdG90eXBlLnNlcmlhbGl6ZU1vZGVsXG4gIEBkZWNvcmF0ZTogKG1vZGVsKSAtPlxuXG4gICAgIyBDbG9uZXMgbW9kZWwncyBhdHRyaWJ1dGVzXG4gICAgIyBDbG9uaW5nIHByZXZlbnRzIGNvbnRhbWluYXRpb24gb2ZcbiAgICBkYXRhID0gXy5jbG9uZShtb2RlbC5hdHRyaWJ1dGVzKVxuXG4gICAgIyBJdGVyYXRlcyBvdmVyIGVhY2ggZnVuY3Rpb24gaW4gcHJvdG90eXBlXG4gICAgIyBMZXZlcmFnZXMgVW5kZXJzY29yZS5qcyBfLmZ1bmN0aW9ucygpXG4gICAgZm9yIGZ1bmMgaW4gXy5mdW5jdGlvbnMoQHByb3RvdHlwZSlcblxuICAgICAgIyBTa2lwIGNvbnN0cnVjdG9yXG4gICAgICBjb250aW51ZSBpZiBmdW5jID09ICdjb25zdHJ1Y3RvcidcblxuICAgICAgIyBBc3NpZ25zIHZhbHVlIG9mIGZ1bmN0aW9uIHRvIGhhc2hcbiAgICAgIGRhdGFbZnVuY10gPSBAcHJvdG90eXBlW2Z1bmNdLmFwcGx5KG1vZGVsKVxuXG4gICAgIyBSZXR1cm5zIHRoZSBtb2RlbCdzIGF0dHJpYnV0ZXMgJiBkZWNvcmF0aW9uc1xuICAgIHJldHVybiBkYXRhXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VEZWNvcmF0b3JcbiIsIlxuIyBGbGFzaENvbGxlY3Rpb24gY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgYmFzaWMgQmFja2JvbmUuQ29sbGVjdGlvbiB0byBiZSB1c2VkIGJ5IHRoZVxuIyBGbGFzaENvbXBvbmVudCBmb3Igc3RvcmluZyBtdWx0aXBsZSBmbGFzaCBtb2RlbHNcbmNsYXNzIEZsYXNoQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IHJlcXVpcmUgJy4vbW9kZWwnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoQ29sbGVjdGlvblxuIiwicmVxdWlyZSAnLi9zZXJ2aWNlJ1xuRmxhc2hMaXN0ID0gcmVxdWlyZSAnLi92aWV3cy9mbGFzaExpc3QnXG5cbiMgIyAjICMgI1xuXG4jIEZsYXNoU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBjb21wb25lbnQgdG8gY3JlYXRlIGFuZCBkaXNwbGF5IGZsYXNoZXNcbiMgaW4gdGhlIGFwcC4gUHJvdmlkZXMgbXVsdGlwbGUgaW50ZXJmYWNlcyBpbiByYWRpb0V2ZW50c1xuIyB0byBoYW5kbGUgY29tbW9uIHR5cGVzIG9mIGZsYXNoZXMgKGVycm9yLCB3YXJuaW5nLCBzdWNjZXNzKVxuY2xhc3MgRmxhc2hDb21wb25lbnQgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlNlcnZpY2VcblxuICBpbml0aWFsaXplOiAob3B0aW9ucyA9IHt9KSAtPlxuICAgIEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykucmVxdWVzdCgnY29sbGVjdGlvbicpLnRoZW4gKGNvbGxlY3Rpb24pID0+XG4gICAgICBAY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25cbiAgICAgIEBjb2xsZWN0aW9uLm9uICd1cGRhdGUnLCBAc2hvd0xpc3RWaWV3LCBAXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2ZsYXNoIGFkZCc6ICAgICAgJ2FkZCdcbiAgICAnZmxhc2ggcmVzZXQnOiAgICAncmVzZXQnXG4gICAgJ2ZsYXNoIGVycm9yJzogICAgJ2Vycm9yJ1xuICAgICdmbGFzaCB3YXJuaW5nJzogICd3YXJuaW5nJ1xuICAgICdmbGFzaCBzdWNjZXNzJzogICdzdWNjZXNzJ1xuXG4gIGFkZDogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQob3B0aW9ucylcblxuICByZXNldDogLT5cbiAgICBAY29sbGVjdGlvbi5yZXNldCgpXG5cbiAgZXJyb3I6IChvcHRpb25zPXt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZCBfLmV4dGVuZCggb3B0aW9ucywgeyBjb250ZXh0OiAgJ2RhbmdlcicgfSlcblxuICB3YXJuaW5nOiAob3B0aW9ucz17fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQgXy5leHRlbmQoIG9wdGlvbnMsIHsgY29udGV4dDogICd3YXJuaW5nJyB9KVxuXG4gIHN1Y2Nlc3M6IChvcHRpb25zPXt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZCBfLmV4dGVuZCggb3B0aW9ucywgeyBjb250ZXh0OiAgJ3N1Y2Nlc3MnIH0pXG5cbiAgc2hvd0xpc3RWaWV3OiA9PlxuICAgIHVubGVzcyBAcmVuZGVyZWRcbiAgICAgIEBjb250YWluZXIuc2hvdyBuZXcgRmxhc2hMaXN0KHsgY29sbGVjdGlvbjogQGNvbGxlY3Rpb24gfSlcbiAgICAgIEByZW5kZXJlZCA9IHRydWVcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hDb21wb25lbnRcbiIsIlxuIyBGbGFzaE1vZGVsIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIEJhY2tib25lLk1vZGVsIHRvIG1hbmFnZSB2aWV3c1xuIyBkaXNwbGF5ZWQgaW4gdGhlIEZsYXNoQ29tcG9uZW50XG5jbGFzcyBGbGFzaE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblxuICBkZWZhdWx0czpcbiAgICB0aW1lb3V0OiA1MDAwXG4gICAgZGlzbWlzc2libGU6IHRydWVcbiAgICBjb250ZXh0OiAnaW5mbydcblxuICAjIEFsZXJ0IE1vZGVsIEF0dHJpYnV0ZXMgLyBPcHRpb25zXG4gICMgLSBtZXNzYWdlXG4gICMgLSBzdHJvbmdUZXh0IChwbGVhc2UgcmVuYW1lIHRvICdzdHJvbmcnICYgYWRkIGFwcHJvcHJpYXRlIHNwYWNpbmcgdG8gdGVtcGxhdGUpXG4gICMgLSBjb250ZXh0Q2xhc3MgKHBsZWFzZSByZW5hbWUgdG8gJ2NvbnRleHQnKVxuICAjIC0gdGltZW91dCAoZGVmYXVsdCBpcyA1IHNlY29uZHMpXG4gICMgLSBkaXNtaXNzaWJsZSAoZGVmYXVsdCBpcyB0cnVlKVxuXG4gIGRpc21pc3M6IC0+XG4gICAgQGNvbGxlY3Rpb24ucmVtb3ZlKEApXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoTW9kZWxcbiIsIkZsYXNoQ29sbGVjdGlvbiA9IHJlcXVpcmUgJy4vY29sbGVjdGlvbidcblxuIyAjICMgIyAjXG5cbiMgRmxhc2hTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lZCBhIGJhc2ljIHNlcnZpY2UgdG8gcmV0dXJuIHRoZSBGbGFzaGVzQ29sbGVjdGlvblxuIyB3aGVuIHJlcXVlc3RlZC4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBGbGFzaENvbXBvbmVudCB0byByZXRyaWV2ZVxuIyB0aGUgRmxhc2hDb2xsZWN0aW9uIGl0IGlzIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmdcbmNsYXNzIEZsYXNoU2VydmljZSBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ2ZsYXNoIGNvbGxlY3Rpb24nOiAnZ2V0Q29sbGVjdGlvbidcblxuICBhbGVydHM6IG51bGxcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBuZXcgUHJvbWlzZSAocmVzb2x2ZSxyZWplY3QpID0+XG4gICAgICBAYWxlcnRzIHx8PSBuZXcgRmxhc2hDb2xsZWN0aW9uKClcbiAgICAgIHJlc29sdmUoQGFsZXJ0cylcbiAgICAgIHJldHVyblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRmxhc2hTZXJ2aWNlKClcbiIsIiMgRmxhc2hDaGlsZCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBNYXJpb25ldHRlLkxheW91dFZpZXcgdG8gZGlzcGxheSBhIEZsYXNoTW9kZWwgaW5zdGFuY2VcbiMgVGhpcyB2aWV3IGF1dG8tZGlzbWlzc2VzIGFmdGVyIHRoZSB0aW1lb3V0IGRlZmluZWQgaW4gdGhlIEZsYXNoTW9kZWwgaW5zdGFuY2VcbmNsYXNzIEZsYXNoQ2hpbGQgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93J1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvZmxhc2hfY2hpbGQnXG5cbiAgYXR0cmlidXRlczpcbiAgICBzdHlsZTogJ2Rpc3BsYXk6bm9uZTsnXG5cbiAgdWk6XG4gICAgY2xvc2U6ICdbZGF0YS1jbGljaz1kaXNtaXNzXSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5jbG9zZSc6ICdkaXNtaXNzJ1xuXG4gIG9uU2hvdzogLT5cbiAgICB0aW1lb3V0ID0gQG1vZGVsLmdldCgndGltZW91dCcpXG4gICAgc2V0VGltZW91dCggQGRpc21pc3MsIHRpbWVvdXQgKVxuXG4gIG9uQXR0YWNoOiAtPlxuICAgIEAkZWwuZmFkZUluKClcblxuICByZW1vdmU6IC0+XG4gICAgQCRlbC5zbGlkZVRvZ2dsZSggPT5cbiAgICAgIE1hcmlvbmV0dGUuTGF5b3V0Vmlldy5wcm90b3R5cGUucmVtb3ZlLmNhbGwoQClcbiAgICApXG5cbiAgZGlzbWlzczogPT5cbiAgICBAbW9kZWwuY29sbGVjdGlvbj8ucmVtb3ZlKCBAbW9kZWwgKVxuXG4jIEZsYXNoTGlzdCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3IHRvIHRoZSBsaXN0IG9mIEZsYXNoZXNcbmNsYXNzIEZsYXNoTGlzdCBleHRlbmRzIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXdcbiAgY2xhc3NOYW1lOiAnY29udGFpbmVyLWZsdWlkJ1xuICBjaGlsZFZpZXc6IEZsYXNoQ2hpbGRcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hMaXN0XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChjb250ZXh0LCBkaXNtaXNzaWJsZSwgbWVzc2FnZSwgc3Ryb25nKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMiB0ZXh0LWNlbnRlclxcXCI+PGRpdiByb2xlPVxcXCJhbGVydFxcXCJcIiArIChqYWRlLmNscyhbJ2FsZXJ0JywnYWxlcnQtZGlzbWlzc2libGUnLCdmYWRlJywnaW4nLFwiYWxlcnQtXCIgKyBjb250ZXh0XSwgW251bGwsbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggZGlzbWlzc2libGUpXG57XG5idWYucHVzaChcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWNsaWNrPVxcXCJkaXNtaXNzXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInNyLW9ubHlcXFwiPkNsb3NlPC9zcGFuPjwvYnV0dG9uPlwiKTtcbn1cbmlmICggc3Ryb25nKVxue1xuYnVmLnB1c2goXCI8c3Ryb25nPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc3Ryb25nICsgXCIgXCIpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Ryb25nPlwiKTtcbn1cbmlmICggbWVzc2FnZSlcbntcbmJ1Zi5wdXNoKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbWVzc2FnZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKTtcbn1cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiY29udGV4dFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguY29udGV4dDp0eXBlb2YgY29udGV4dCE9PVwidW5kZWZpbmVkXCI/Y29udGV4dDp1bmRlZmluZWQsXCJkaXNtaXNzaWJsZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGlzbWlzc2libGU6dHlwZW9mIGRpc21pc3NpYmxlIT09XCJ1bmRlZmluZWRcIj9kaXNtaXNzaWJsZTp1bmRlZmluZWQsXCJtZXNzYWdlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5tZXNzYWdlOnR5cGVvZiBtZXNzYWdlIT09XCJ1bmRlZmluZWRcIj9tZXNzYWdlOnVuZGVmaW5lZCxcInN0cm9uZ1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc3Ryb25nOnR5cGVvZiBzdHJvbmchPT1cInVuZGVmaW5lZFwiP3N0cm9uZzp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJNb2RhbFZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5cbiMgIyAjICMgI1xuXG4jIFdpbmRvdyBldmVudCBsaXN0ZW5lciB0byBoaWRlIHRoZSBtb2RhbCB3aGVuIG5hdmlnYXRpb24gb2NjdXJzLlxuaGlkZU1vZGFsT25IYXNoQ2hhbmdlID0gLT4gd2luZG93Lm1vZGFsV2luZG93LmhpZGVNb2RhbCgpXG5cbiMgQWJzdHJhY3QgY2xhc3MgZm9yIG1vZGFsLWJhc2VkIGNvbXBvbmVudHMuXG5jbGFzcyBBYnN0cmFjdE1vZGFsQ29tcG9uZW50IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcblxuICBoaWRlTW9kYWw6IC0+XG4gICAgQG1vZGFsVmlldy5oaWRlTW9kYWwoKVxuXG4gIHNob3dNb2RhbDogKGNvbnRlbnRWaWV3LCBtb2RhbFZpZXdPcHRpb25zPXt9KSAtPlxuXG4gICAgICAjIE5ldyBNb2RhbCBWaWV3IChvdXIgdmlldyBpcyBzaG93biBpbnNpZGUgdGhpcyBvbmUpXG4gICAgICBAbW9kYWxWaWV3ID0gbmV3IE1vZGFsVmlldyhtb2RhbFZpZXdPcHRpb25zKVxuXG4gICAgICAjIFNob3cgdGhlIHZpZXcgaW5zaWRlIHRoZSBtb2RhbCB3cmFwcGVyLCBhZGRzIGhpZGVNb2RhbE9uSGFzaENoYW5nZSBldmVudCBsaXN0ZW5lclxuICAgICAgQG1vZGFsVmlldy5vbiAnc2hvdycsID0+XG4gICAgICAgIEBtb2RhbFZpZXcuY29udGVudFJlZ2lvbi5zaG93KCBjb250ZW50VmlldyApXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgaGlkZU1vZGFsT25IYXNoQ2hhbmdlKVxuICAgICAgICB3aW5kb3cubW9kYWxXaW5kb3cgPSBAbW9kYWxWaWV3XG5cbiAgICAgICMgUmVtb3ZlcyBoaWRlTW9kYWxPbkhhc2hDaGFuZ2UgZXZlbnQgbGlzdGVuZXJcbiAgICAgIEBtb2RhbFZpZXcub24gJ2Rlc3Ryb3knLCAtPlxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGhpZGVNb2RhbE9uSGFzaENoYW5nZSlcbiAgICAgICAgZGVsZXRlIHdpbmRvdy5tb2RhbFdpbmRvd1xuXG4gICAgICAjIG9uTW9kYWxIaWRkZW4gY2FsbGJhY2tcbiAgICAgIEBtb2RhbFZpZXcub24gJ2hpZGRlbjptb2RhbCcsID0+IEBvbk1vZGFsSGlkZGVuPygpXG5cbiAgICAgICMgU2hvdyB2aWV3IGluIHRoZSBtb2RhbFxuICAgICAgQGNvbnRhaW5lci5zaG93IEBtb2RhbFZpZXdcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RNb2RhbENvbXBvbmVudFxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobW9kYWxDc3MpIHtcbmJ1Zi5wdXNoKFwiPGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgZGF0YS1yZWdpb249XFxcIm1vZGFsLWNvbnRlbnRcXFwiXCIgKyAoamFkZS5jbHMoW21vZGFsQ3NzXSwgW3RydWVdKSkgKyBcIj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJtb2RhbENzc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubW9kYWxDc3M6dHlwZW9mIG1vZGFsQ3NzIT09XCJ1bmRlZmluZWRcIj9tb2RhbENzczp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbiMgTW9kYWxWaWV3IGNsYXNzIGRlZmluaXRpb25cbiMgUHJvdmlkZXMgYSBnZW5lcmljIHZpZXcgYW5kIHJlZ2lvbiBpbnRvIHdoaWNoXG4jIG90aGVyIHZpZXdzIGNhbiBjb252ZW5pZW50bHkgYmUgZGlzcGxheWVkIGluIGEgbW9kYWxcbmNsYXNzIE1vZGFsVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi9tb2RhbF90ZW1wbGF0ZSdcblxuICBhdHRyaWJ1dGVzOlxuICAgIHJvbGU6ICAgICAnZGlhbG9nJ1xuICAgIHRhYmluZGV4OiAnLTEnXG5cbiAgY2xhc3NOYW1lOiAnbW9kYWwgZmFkZSdcblxuICAjIFNldHMgbW9kYWwgc2l6ZSAtIG5vcm1hbCAvIHNtYWxsIC8gbGFyZ2VcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIHNpemUgPSBAb3B0aW9ucy5zaXplIHx8ICcnXG4gICAgY3NzID0gJ21vZGFsLWRpYWxvZydcbiAgICBjc3MgKz0gJyBtb2RhbC1zbScgaWYgc2l6ZSA9PSAnc21hbGwnXG4gICAgY3NzICs9ICcgbW9kYWwtbGcnIGlmIHNpemUgPT0gJ2xhcmdlJ1xuICAgIHJldHVybiB7IG1vZGFsQ3NzOiBjc3MgfVxuXG4gIHJlZ2lvbnM6XG4gICAgY29udGVudFJlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1tb2RhbC1jb250ZW50XSdcblxuICBldmVudHM6XG4gICAgJ3Nob3cuYnMubW9kYWwnICAgOiAtPiBAdHJpZ2dlck1ldGhvZCAnc2hvdzptb2RhbCdcbiAgICAnc2hvd24uYnMubW9kYWwnICA6IC0+IEB0cmlnZ2VyTWV0aG9kICdzaG93bjptb2RhbCdcbiAgICAnaGlkZS5icy5tb2RhbCcgICA6IC0+IEB0cmlnZ2VyTWV0aG9kICdoaWRlOm1vZGFsJ1xuICAgICdoaWRkZW4uYnMubW9kYWwnIDogLT4gQHRyaWdnZXJNZXRob2QgJ2hpZGRlbjptb2RhbCdcbiAgICAnbG9hZGVkLmJzLm1vZGFsJyA6IC0+IEB0cmlnZ2VyTWV0aG9kICdsb2FkZWQ6bW9kYWwnXG5cbiAgb25TaG93OiAtPlxuICAgIEAkZWwubW9kYWwoIEBvcHRpb25zLm1vZGFsT3B0aW9ucyB8fCB7fSApXG5cbiAgaGlkZU1vZGFsOiAtPlxuICAgIEAkZWwubW9kYWwoJ2hpZGUnKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFZpZXdcbiIsIlxuY2xhc3MgT3ZlcmxheVZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiBmYWxzZVxuICBjbGFzc05hbWU6ICdvdmVybGF5J1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2snOiAnb25DbGljaydcblxuICBvbkNsaWNrOiAtPlxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3NpZGViYXInKS50cmlnZ2VyKCdoaWRlJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIE92ZXJsYXlDb21wb25lbnQgZXh0ZW5kcyBNbi5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29udGFpbmVyICA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ292ZXJsYXkgcmVhZHknOiAgJ29uUmVhZHknXG4gICAgJ292ZXJsYXkgc2hvdyc6ICAgJ3Nob3dPdmVybGF5J1xuICAgICdvdmVybGF5IGhpZGUnOiAgICdoaWRlT3ZlcmxheSdcblxuICBzaG93T3ZlcmxheTogLT5cbiAgICAkKCcub3ZlcmxheS1yZWdpb24nKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICBoaWRlT3ZlcmxheTogLT5cbiAgICAkKCcub3ZlcmxheS1yZWdpb24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICBvblJlYWR5OiAtPlxuICAgIHVubGVzcyBAdmlld1xuICAgICAgQHZpZXcgPSBuZXcgT3ZlcmxheVZpZXcoKVxuICAgICAgQGNvbnRhaW5lci5zaG93KEB2aWV3KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBPdmVybGF5Q29tcG9uZW50XG4iLCJcbiMgQmFzZVJvdXRlIGNsYXNzIGRlZmluaXRpb25cbiMgVGhlIGJhc2Ugcm91dGUgcmVkdWNlcyByZXBlYXRlZCBjb2RlIGJ5XG4jIGF0dGFjaGluZyB0aGUgQGNvbnRhaW5lciBwcm9wZXJ0eSBwYXNzZWQgaW4gZnJvbVxuIyB0aGUgcm91dGVyLiBUaGlzIHByb3BlcnR5IGlzIHVzZWQgdG8gZGlzcGxheSB2aWV3cyBpbiB0aGUgYXBwXG5jbGFzcyBCYXNlUm91dGUgZXh0ZW5kcyBCYWNrYm9uZS5Sb3V0aW5nLlJvdXRlXG5cbiAgYnJlYWRjcnVtYnM6IFtdXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+XG5cbiAgICAjIEF0dGFjaGVzIG9wdGlvbnNcbiAgICBAb3B0aW9ucyA9IG9wdGlvbnNcblxuICAgICMgQXR0YWNoZXMgY29udGFpbmVyXG4gICAgQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiAgICAjIEV2ZW50IGhhbmRsZXJzXG4gICAgQG9uICdiZWZvcmU6ZW50ZXInLCA9PiBAb25CZWZvcmVFbnRlcj8oYXJndW1lbnRzKVxuICAgIEBvbiAnYmVmb3JlOmZldGNoJywgPT4gQG9uQmVmb3JlRmV0Y2g/KGFyZ3VtZW50cylcbiAgICBAb24gJ2JlZm9yZTpyZW5kZXInLCA9PiBAb25CZWZvcmVSZW5kZXI/KGFyZ3VtZW50cylcbiAgICBAb24gJ2ZldGNoJywgPT4gQG9uRmV0Y2g/KGFyZ3VtZW50cylcbiAgICBAb24gJ3JlbmRlcicsID0+IEBvblJlbmRlcj8oYXJndW1lbnRzKVxuICAgIEBvbiAnZW50ZXInLCA9PiBAb25FbnRlcj8oYXJndW1lbnRzKVxuXG4gICAgIyBIaWRlcyBzaWRlYmFyIGNvbXBvbmVudFxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3NpZGViYXInKS50cmlnZ2VyKCdoaWRlJylcblxuICBfc2V0UGFnZVRpdGxlOiAtPlxuICAgIGRvY3VtZW50LnRpdGxlID0gXy5yZXN1bHQgQCwgJ3RpdGxlJ1xuXG4gIF91cGRhdGVCcmVhZGNydW1iczogLT5cbiAgICBicmVhZGNydW1icyA9IF8ucmVzdWx0IEAsICdicmVhZGNydW1icydcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdicmVhZGNydW1iJykudHJpZ2dlcignc2V0JywgYnJlYWRjcnVtYnMpIGlmIGJyZWFkY3J1bWJzXG5cbiAgb25GZXRjaDogLT5cbiAgICBAX3NldFBhZ2VUaXRsZSgpXG4gICAgQF91cGRhdGVCcmVhZGNydW1icygpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VSb3V0ZVxuIiwiXG4jIEJhc2VSb3V0ZXIgY2xhc3MgZGVmaW5pdGlvblxuIyBUaGUgYmFzZSByb3V0ZXIgcmVkdWNlcyByZXBlYXRlZCBjb2RlIGJ5XG4jIGF0dGFjaGluZyB0aGUgQGNvbnRhaW5lciBwcm9wZXJ0eSBwYXNzZWQgaW4gZnJvbSB3aGVuIGluc3RhbnRpYXRlZC5cbiMgVGhpcyBwcm9wZXJ0eSBpcyBzdWJzZXF1ZW50bHkgcGFzc2VkIHRvIGFsbCByb3V0ZXMgY3JlYXRlZCBpbnNpZGVcbiMgcm91dGVycyBzdWJjbGFzc2VkIGZyb20gdGhpcyBkZWZpbml0aW9uXG5jbGFzcyBCYXNlUm91dGVyIGV4dGVuZHMgQmFja2JvbmUuUm91dGluZy5Sb3V0ZXJcblxuICBpbml0aWFsaXplOiAob3B0aW9ucykgLT4gQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VSb3V0ZXJcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmphZGUgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGphZGVfZW5jb2RlX2h0bWxfcnVsZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbnZhciBqYWRlX21hdGNoX2h0bWwgPSAvWyY8PlwiXS9nO1xuXG5mdW5jdGlvbiBqYWRlX2VuY29kZV9jaGFyKGMpIHtcbiAgcmV0dXJuIGphZGVfZW5jb2RlX2h0bWxfcnVsZXNbY10gfHwgYztcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBqYWRlX2VzY2FwZTtcbmZ1bmN0aW9uIGphZGVfZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpLnJlcGxhY2UoamFkZV9tYXRjaF9odG1sLCBqYWRlX2VuY29kZV9jaGFyKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTtcbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgIyBMb3dlcmNhc2VcbiAgJ2EnOiAgNFxuICAnYic6ICA1XG4gICdjJzogIDZcbiAgJ2QnOiAgN1xuICAnZSc6ICA4XG4gICdmJzogIDlcbiAgJ2cnOiAxMFxuICAnaCc6IDExXG4gICdpJzogMTJcbiAgJ2onOiAxM1xuICAnayc6IDE0XG4gICdsJzogMTVcbiAgJ20nOiAxNlxuICAnbic6IDE3XG4gICdvJzogMThcbiAgJ3AnOiAxOVxuICAncSc6IDIwXG4gICdyJzogMjFcbiAgJ3MnOiAyMlxuICAndCc6IDIzXG4gICd1JzogMjRcbiAgJ3YnOiAyNVxuICAndyc6IDI2XG4gICd4JzogMjdcbiAgJ3knOiAyOFxuICAneic6IDI5XG5cbiAgIyBOdW1lcmljXG4gICcxJzogMzBcbiAgJzInOiAzMVxuICAnMyc6IDMyXG4gICc0JzogMzNcbiAgJzUnOiAzNFxuICAnNic6IDM1XG4gICc3JzogMzZcbiAgJzgnOiAzN1xuICAnOSc6IDM4XG4gICcwJzogMzlcblxuICAjIEVsc2VcbiAgJy4nOiAgICAgIDk5XG4gICdTUEFDRSc6ICA0NFxuICByaWdodDogICAgNzlcbiAgbGVmdDogICAgIDgwXG4gIGRvd246ICAgICA4MVxuICB1cDogICAgICAgODJcbiAgJ0JBQ0tTUEFDRSc6IDQyXG4gICcvJzogICAgICA4NFxuICAnKic6ICAgICAgODVcbiAgJy0nOiAgICAgIDg2XG4gICcrJzogICAgICA4N1xuICAnUkVUVVJOJzogIDg4XG5cbn1cbiIsIlxuY2xhc3MgQWJzdHJhY3RLZXlib2FyZFZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdyBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlcidcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2tleWJvYXJkX2Fic3RyYWN0J1xuXG4gICMgVE9ETyAtIGFjdGl2YXRlIHRoaXMgYmVoYXZpb3IgY29uZGl0aW9uYWxseVxuICAjIGJlaGF2aW9yczpcbiAgIyAgIEtleWJvYXJkQ29udHJvbHM6IHt9XG5cbiAgdWk6XG4gICAga2V5OiAnW2RhdGEtY2xpY2s9a2V5XSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5rZXknOiAnb25LZXlDbGljaydcblxuICBpc1JlY29yZGluZzogZmFsc2VcblxuICAjIGluaXRpYWxpemVcbiAgaW5pdGlhbGl6ZTogLT5cblxuICAgICMgRGVmaW5lcyBAZGVib3VuY2VTdG9wUmVjb3JkaW5nXG4gICAgQGRlYm91bmNlU3RvcFJlY29yZGluZyA9IF8uZGVib3VuY2UoICgpID0+XG4gICAgICBAdHJpZ2dlciAnc3RvcDpyZWNvcmRpbmcnXG4gICAgLCAxNTAwKTtcblxuICAjIHN0YXJ0UmVjb3JkaW5nXG4gICMgVE9ETyAtIG1vdmUgcmVjb3JkaW5nIE9VVCBvZiB0aGlzIHZpZXcgYW5kIGludG8gYSBnbG9iYWxpemVkIHNlcnZpY2VcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG4gICAgQGlzUmVjb3JkaW5nID0gdHJ1ZVxuXG4gICMgc3RvcFJlY29yZGluZ1xuICBzdG9wUmVjb3JkaW5nOiAtPlxuICAgIEBpc1JlY29yZGluZyA9IGZhbHNlXG5cbiAgIyBvblJlbmRlcjogLT5cbiAgIyAgIHNldFRpbWVvdXQoIEBpbml0U29ydGFibGUsIDMwMCApXG5cbiAgIyAjIGluaXRTb3J0YWJsZVxuICAjIGluaXRTb3J0YWJsZTogLT5cblxuICAjICAgY29uc29sZS5sb2cgJ09OIEFUVEFDSCdcblxuICAjICAgY29uc29sZS5sb2cgJCgndWwua2V5Ym9hcmQtLXJvdycpXG5cbiAgIyAgIF8uZWFjaCAkKCd1bC5rZXlib2FyZC0tcm93JyksIChlbCkgPT5cblxuICAjICAgICAjIEluaXRpYWxpemVzIFNvcnRhYmxlIGNvbnRhaW5lclxuICAjICAgICBTb3J0YWJsZS5jcmVhdGUgZWwsXG4gICMgICAgICAgYW5pbWF0aW9uOiAgICAxNTBcbiAgIyAgICAgICBoYW5kbGU6ICAgICAgICcuaGFuZGxlJ1xuICAjICAgICAgICMgZ2hvc3RDbGFzczogICAnZ2hvc3QnICAjIENsYXNzIG5hbWUgZm9yIHRoZSBkcm9wIHBsYWNlaG9sZGVyXG4gICMgICAgICAgIyBjaG9zZW5DbGFzczogICdjaG9zZW4nICAjIENsYXNzIG5hbWUgZm9yIHRoZSBjaG9zZW4gaXRlbVxuICAjICAgICAgICMgZHJhZ0NsYXNzOiAgICAnZHJhZycgICMgQ2xhc3MgbmFtZSBmb3IgdGhlIGRyYWdnaW5nIGl0ZW1cblxuICAjICAgICAgIGdyb3VwOlxuICAjICAgICAgICAgbmFtZTogJ21hY3JvJ1xuICAjICAgICAgICAgcHVsbDogJ2Nsb25lJ1xuICAjICAgICAgICAgcHV0OiAgZmFsc2VcblxuICAjICAgICAgIGZhbGxiYWNrVG9sZXJhbmNlOiAxMDBcblxuICAjIEtleWJvYXJkQ29udHJvbHMgYmVoYXZpb3IgY2FsbGJhY2tcbiAgIyBUT0RPIC0gYW5ub2F0ZSBhbmQgY2xlYW4gdXAgdGhpcyBtZXRob2RcbiAgb25LZXlBY3Rpb246IChlKSAtPlxuXG4gICAgIyBTaG9ydC1jaXJjdWl0cyB1bmxlc3NcbiAgICByZXR1cm4gdW5sZXNzIEBpc1JlY29yZGluZ1xuXG4gICAgIyBQcmV2ZW50cyBkZWZhdWx0IGhvdGtleXMgd2hpbGUgcmVjb3JkaW5nXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAjIFRPRE8gLSBpZ25vcmUga2V5dXAgb24gYWxwaGFudW1lcmljLCBsaXN0ZW4gZm9yIHNwZWNpYWwga2V5cz9cbiAgICAjIHJldHVybiBpZiBlLmtleSBpbiBbXCJDb250cm9sXCIsIFwiTWV0YVwiLCBcIkFsdFwiXVxuICAgIGtleSA9IEBvcHRpb25zLmtleXMuZmluZFdoZXJlKHsga2V5Y29kZTogZS5rZXlDb2RlIH0pXG5cbiAgICAjICMgIyAjXG5cbiAgICAjIFRPRE8gLSBkb2N1bWVudCB0aGlzIGJsb2NrIG9mIGNvZGVcblxuICAgIGlmIGUudHlwZSA9PSAna2V5ZG93bidcblxuICAgICAgaWYgZS5rZXkgaW4gW1wiQ29udHJvbFwiLCBcIk1ldGFcIiwgXCJBbHRcIiwgXCJTaGlmdFwiXVxuICAgICAgICBqc29uID0ga2V5LnRvSlNPTigpXG4gICAgICAgIGpzb24ucG9zaXRpb24gPSAtMVxuICAgICAgICBAdHJpZ2dlciAna2V5OnNlbGVjdGVkJywganNvblxuICAgICAgZWxzZVxuICAgICAgICBAdHJpZ2dlciAna2V5OnNlbGVjdGVkJywga2V5LnRvSlNPTigpXG5cbiAgICBpZiBlLnR5cGUgPT0gJ2tleXVwJ1xuXG4gICAgICBpZiBlLmtleSBpbiBbXCJDb250cm9sXCIsIFwiTWV0YVwiLCBcIkFsdFwiLCBcIlNoaWZ0XCJdXG4gICAgICAgIGpzb24gPSBrZXkudG9KU09OKClcbiAgICAgICAganNvbi5wb3NpdGlvbiA9IDFcbiAgICAgICAgQHRyaWdnZXIgJ2tleTpzZWxlY3RlZCcsIGpzb25cblxuXG4gICAgIyAjICMgI1xuXG4gICAgaWYgZS50eXBlID09ICdrZXl1cCdcbiAgICAgIEAkKFwiW2RhdGEta2V5Y29kZT0je2Uua2V5Q29kZX1dXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgIGVsc2VcbiAgICAgIEAkKFwiW2RhdGEta2V5Y29kZT0je2Uua2V5Q29kZX1dXCIpLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gICAgIyBUT0RPIC0gYW5ub3RhZVxuICAgIHNldFRpbWVvdXQoID0+XG4gICAgICBAJChcIltkYXRhLWtleWNvZGU9I3tlLmtleUNvZGV9XVwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAsIDEwMDApXG5cbiAgICAjIFN0b3BzIHJlY29yZGluZyAyIHNlY29uZHMgYWZ0ZXIgbGFzdCBrZXlzdHJva2VcbiAgICBAZGVib3VuY2VTdG9wUmVjb3JkaW5nKClcblxuICAgICMgIyAjICNcblxuXG4gICMgS2V5Q2xpY2sgY2FsbGJhY2tcbiAgb25LZXlDbGljazogKGUpIC0+XG5cbiAgICAjIENhY2hlcyBlbCBhbmQga2V5Y29kZVxuICAgIGVsICA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuICAgIGtleWNvZGUgPSBlbC5kYXRhKCdrZXljb2RlJylcblxuICAgICMgRmluZHMgdGhlIG1vZGVsIG9mIHRoZSBrZXkgdGhhdCB3YXMgc2VsZWN0ZWRcbiAgICBrZXkgPSBAb3B0aW9ucy5rZXlzLmZpbmRXaGVyZSh7IGtleWNvZGU6IGtleWNvZGUgfSlcblxuICAgICMgVHJpZ2dlcnMgJ2tleTpzZWxlY3RlZCcgZXZlbnRcbiAgICBAdHJpZ2dlciAna2V5OnNlbGVjdGVkJywga2V5LnRvSlNPTigpXG5cbiAgICAjIEJsdXJzIGZvY3VzIGZyb20gY2xpY2tlZCBrZXlcbiAgICBlbC5ibHVyKClcblxuICAgIHJldHVyblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBBYnN0cmFjdEtleWJvYXJkVmlld1xuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgS2V5Ym9hcmRWaWV3IGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2tleWJvYXJkX2Z1bGwnXG5cbiAgYmVoYXZpb3JzOlxuICAgIEtleWJvYXJkQ29udHJvbHM6IHt9XG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdyMCd9KVxuICAgICAgcjE6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdyMSd9KVxuICAgICAgcjI6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdyMid9KVxuICAgICAgcjM6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdyMyd9KVxuICAgICAgcjQ6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdyNCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRWaWV3XG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICNcblxuY2xhc3MgRnVuY3Rpb25LZXlib2FyZCBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdmdW5jX3IwJ30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGdW5jdGlvbktleWJvYXJkXG5cblxuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjXG5cbmNsYXNzIE1lZGlhS2V5Ym9hcmQgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuXG4gICMgUGFzc2VzIGtleSBvYmplY3RzIHRvIFVJXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBrZXlzID0gQG9wdGlvbnMua2V5cy50b0pTT04oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbWVkaWFfcjAnfSlcbiAgICB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1lZGlhS2V5Ym9hcmRcblxuXG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICNcblxuY2xhc3MgTmF2S2V5Ym9hcmQgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuXG4gICMgUGFzc2VzIGtleSBvYmplY3RzIHRvIFVJXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBrZXlzID0gQG9wdGlvbnMua2V5cy50b0pTT04oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbmF2X3IwJ30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBOYXZLZXlib2FyZFxuXG5cbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgI1xuXG5jbGFzcyBOdW1wYWRWaWV3IGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2tleWJvYXJkX251bXBhZCdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yMCd9KVxuICAgICAgcjE6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjEnfSlcbiAgICAgIHIyOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3IyJ30pXG4gICAgICByMzogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yMyd9KVxuICAgICAgcjQ6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjQnfSlcbiAgICAgIGNvbDogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9jb2wnfSlcbiAgICB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE51bXBhZFZpZXdcblxuXG4iLCJTaW1wbGVOYXYgPSByZXF1aXJlKCdsaWIvdmlld3Mvc2ltcGxlX25hdicpXG5GdWxsS2V5Ym9hcmQgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfZnVsbCcpXG5OdW1wYWRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX251bXBhZCcpXG5GdW5jdGlvbktleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Z1bmN0aW9uJylcbk1lZGlhS2V5Ym9hcmQgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfbWVkaWEnKVxuTmF2S2V5Ym9hcmQgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfbmF2JylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleWJvYXJkU2VsZWN0b3IgZXh0ZW5kcyBTaW1wbGVOYXZcbiAgY2xhc3NOYW1lOiAncm93IGgtMTAwJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMva2V5Ym9hcmRfc2VsZWN0b3InKVxuXG4gIG5hdkl0ZW1zOiBbXG4gICAgeyBpY29uOiAnZmEta2V5Ym9hcmQtbycsICB0ZXh0OiAnS2V5Ym9hcmQnLCAgdHJpZ2dlcjogJ2tleWJvYXJkJywgZGVmYXVsdDogdHJ1ZSB9XG4gICAgeyBpY29uOiAnZmEtZmlsZS10ZXh0LW8nLCB0ZXh0OiAnTnVtcGFkJywgICB0cmlnZ2VyOiAnbnVtcGFkJyB9XG4gICAgeyBpY29uOiAnZmEtY2FyZXQtc3F1YXJlLW8tdXAnLCAgICB0ZXh0OiAnRnVuY3Rpb24nLCAgICB0cmlnZ2VyOiAnZnVuY3Rpb24nIH1cbiAgICB7IGljb246ICdmYS1hc3RlcmlzaycsICAgIHRleHQ6ICdNZWRpYScsICAgIHRyaWdnZXI6ICdtZWRpYScgfVxuICAgIHsgaWNvbjogJ2ZhLWFzdGVyaXNrJywgICAgdGV4dDogJ05hdmlnYXRpb24nLCAgICB0cmlnZ2VyOiAnbmF2JyB9XG4gIF1cblxuICBzaG93S2V5Ym9hcmRWaWV3OiAoa2V5Ym9hcmRWaWV3KSAtPlxuXG4gICAgIyBDYWNoZXMgY3VycmVudCBrZXlib2FyZCB2aWV3XG4gICAgQGN1cnJlbnQgPSBrZXlib2FyZFZpZXdcblxuICAgICMgSGFuZGxlcyAnc3RvcDpyZWNvcmRpbmcnIGV2ZW50XG4gICAgQGN1cnJlbnQub24gJ3N0b3A6cmVjb3JkaW5nJywgPT4gQHRyaWdnZXIgJ3N0b3A6cmVjb3JkaW5nJ1xuXG4gICAgIyBIYW5kbGVzIEtleVNlbGVjdGlvbiBldmVudFxuICAgIGtleWJvYXJkVmlldy5vbiAna2V5OnNlbGVjdGVkJywgKGtleSkgPT4gQHRyaWdnZXIoJ2tleTpzZWxlY3RlZCcsIGtleSlcblxuICAgICMgU2hvd3MgdGhlIGtleWJvYXJkVmlld1xuICAgIEBjb250ZW50UmVnaW9uLnNob3cga2V5Ym9hcmRWaWV3XG5cbiAgb25OYXZpZ2F0ZUtleWJvYXJkOiAtPlxuICAgIEBzaG93S2V5Ym9hcmRWaWV3KG5ldyBGdWxsS2V5Ym9hcmQoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4gIG9uTmF2aWdhdGVOdW1wYWQ6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IE51bXBhZFZpZXcoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4gIG9uTmF2aWdhdGVGdW5jdGlvbjogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgRnVuY3Rpb25LZXlib2FyZCh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZU1lZGlhOiAtPlxuICAgIEBzaG93S2V5Ym9hcmRWaWV3KG5ldyBNZWRpYUtleWJvYXJkKHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuICBvbk5hdmlnYXRlTmF2OiAtPlxuICAgIEBzaG93S2V5Ym9hcmRWaWV3KG5ldyBOYXZLZXlib2FyZCh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkU2VsZWN0b3JcbiIsImNsYXNzIFNpbXBsZU5hdiBleHRlbmRzIE1uLkxheW91dFZpZXdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIFtkYXRhLXRyaWdnZXJdOm5vdCguZGlzYWJsZWQpJzogJ29uTmF2SXRlbUNsaWNrJ1xuXG4gIG5hdkl0ZW1zOiBbXVxuXG4gIHJlZ2lvbnM6XG4gICAgY29udGVudFJlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1jb250ZW50XSdcblxuICBvblJlbmRlcjogLT5cbiAgICBkZWYgPSBfLndoZXJlKF8ucmVzdWx0KEAsICduYXZJdGVtcycpLCB7IGRlZmF1bHQ6IHRydWUgfSlbMF1cbiAgICByZXR1cm4gdW5sZXNzIGRlZlxuICAgIEB0cmlnZ2VyTWV0aG9kKFwibmF2aWdhdGU6I3tkZWYudHJpZ2dlcn1cIilcbiAgICBAJChcIltkYXRhLXRyaWdnZXI9I3tkZWYudHJpZ2dlcn1dXCIpLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gIHNlcmlhbGl6ZURhdGE6IC0+XG4gICAgZGF0YSA9IHN1cGVyXG4gICAgXy5leHRlbmQoZGF0YSwgeyBuYXZJdGVtczogXy5yZXN1bHQoQCwgJ25hdkl0ZW1zJykgfSlcbiAgICByZXR1cm4gZGF0YVxuXG4gIG9uTmF2SXRlbUNsaWNrOiAoZSkgPT5cbiAgICBlbCA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuICAgIGVsLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgIEB0cmlnZ2VyTWV0aG9kKFwibmF2aWdhdGU6I3tlbC5kYXRhKCd0cmlnZ2VyJyl9XCIpXG4gICAgZWwuYmx1cigpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbXBsZU5hdlxuIl19
