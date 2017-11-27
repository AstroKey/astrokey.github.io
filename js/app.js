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
    keyModel.readMacro().then((function(_this) {
      return function(macros) {
        console.log('PARSED MACROS');
        return console.log(macros);
      };
    })(this));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2FwcC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvYXBwbGljYXRpb24vdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2JlaGF2aW9ycy9rZXlib2FyZENvbnRyb2xzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc2VsZWN0YWJsZUNoaWxkLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc29ydGFibGVDaGlsZC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvYmVoYXZpb3JzL3NvcnRhYmxlTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbXBvbmVudHMvYWJvdXQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9jb21wb25lbnRzL2Fib3V0L3ZpZXdzL3RlbXBsYXRlcy9hYm91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29tcG9uZW50cy9oZWFkZXIvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9jb21wb25lbnRzL2hlYWRlci92aWV3cy90ZW1wbGF0ZXMvaGVhZGVyLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL2NvcnMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbmZpZy9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL2p3dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL21hcmlvbmV0dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbmZpZy93aW5kb3cuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21hbmlmZXN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL2tleS9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9rZXkvZmFjdG9yeS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9rZXkva2V5cy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QvdGVtcGxhdGVzL2tleWJvYXJkX2Fic3RyYWN0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVsbC90ZW1wbGF0ZXMva2V5Ym9hcmRfZnVsbC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX251bXBhZC90ZW1wbGF0ZXMva2V5Ym9hcmRfbnVtcGFkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3IvdGVtcGxhdGVzL2tleWJvYXJkX3NlbGVjdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvZXhhbXBsZV8yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21hY3JvL2V4YW1wbGVzL2V4YW1wbGVfMy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvZGV2aWNlTGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvclNlbGVjdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvcldyYXBwZXIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3Mva2V5U2VsZWN0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL21hY3JvRWRpdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL21hY3JvTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZGV2aWNlX2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2RldmljZV9zdGF0dXMuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfc2VsZWN0b3IuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfd3JhcHBlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2hlbHBfdmlldy5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2tleV9jaGlsZC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL21hY3JvX2NoaWxkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZWRpdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZW1wdHkuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy90ZXh0X2VkaXRvci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGV4dEVkaXRvci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2RhdGEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2ZhY3RvcnkuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3JvdXRlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vaG9tZS92aWV3cy9sYXlvdXQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3ZpZXdzL3RlbXBsYXRlcy9sYXlvdXQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL3VzYi9zZXJ2aWNlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9iaW5kQmFzZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9iZWhhdmlvcnMvbGliL2JpbmRJbnB1dHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9mbGFzaGVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9zdWJtaXRCdXR0b24uY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi90b29sdGlwcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9lbnRpdGllcy9saWIvY29uZmlnLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2huX2VudGl0aWVzL2xpYi9kZWNvcmF0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbGxlY3Rpb24uY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvbW9kZWwuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3NlcnZpY2UuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3ZpZXdzL2ZsYXNoTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvdmlld3MvdGVtcGxhdGVzL2ZsYXNoX2NoaWxkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9tb2RhbC9saWIvYWJzdHJhY3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fbW9kYWwvbGliL21vZGFsX3RlbXBsYXRlLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9tb2RhbC9saWIvdmlldy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9vdmVybGF5L2xpYi9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2phZGUvcnVudGltZS5qcyIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvY2hhcmFjdGVyX21hcC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0L2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVsbC9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Z1bmN0aW9uL2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfbWVkaWEvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9uYXYvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9zZWxlY3Rvci9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL3NpbXBsZV9uYXYvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDR0EsSUFBQSxXQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3dCQUVKLFdBQUEsR0FDRTtJQUFBLGNBQUEsRUFBZ0IsWUFBaEI7Ozt3QkFHRixVQUFBLEdBQVksU0FBQTtJQUdWLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFnQyxDQUFDLE9BQWpDLENBQXlDLE9BQXpDO0lBR0EsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQW9DLENBQUMsT0FBckMsQ0FBNkMsT0FBN0M7SUFDQSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxPQUExQztJQUNBLElBQUMsQ0FBQSxPQUFELENBQUE7QUFDQSxXQUFPO0VBVEc7O3dCQWNaLE9BQUEsR0FBUyxTQUFBO0lBQ1AsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFqQixDQUFBO1dBR0EsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFkLENBQUEsQ0FDQSxDQUFDLElBREQsQ0FDTyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsQ0FBRDtRQUNMLElBQUEsQ0FBYyxDQUFFLENBQUEsQ0FBQSxDQUFoQjtBQUFBLGlCQUFBOztRQUNBLENBQUUsQ0FBQSxDQUFBLENBQUUsQ0FBQyxJQUFMLENBQUE7ZUFDQSxNQUFNLENBQUMsQ0FBUCxHQUFXLENBQUUsQ0FBQSxDQUFBO01BSFI7SUFBQSxDQUFB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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UUFBQSxFQUFVLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBVCxFQUFZLFVBQVosQ0FBWjtLQUFmO0FBQ0EsV0FBTztFQUhNOztzQkFLZixjQUFBLEdBQWdCLFNBQUMsQ0FBRDtBQUNkLFFBQUE7SUFBQSxFQUFBLEdBQUssQ0FBQSxDQUFFLENBQUMsQ0FBQyxhQUFKO0lBQ0wsRUFBRSxDQUFDLFFBQUgsQ0FBWSxRQUFaLENBQXFCLENBQUMsUUFBdEIsQ0FBQSxDQUFnQyxDQUFDLFdBQWpDLENBQTZDLFFBQTdDO0lBQ0EsSUFBQyxDQUFBLGFBQUQsQ0FBZSxXQUFBLEdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSCxDQUFRLFNBQVIsQ0FBRCxDQUExQjtXQUNBLEVBQUUsQ0FBQyxJQUFILENBQUE7RUFKYzs7OztHQXJCTSxFQUFFLENBQUM7O0FBNkIzQixNQUFNLENBQUMsT0FBUCxHQUFpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbiMgQXBwbGljYXRpb24gY2xhc3MgZGVmaW5pdGlvblxuIyBNYW5hZ2VzIGxpZmVjeWNsZSBhbmQgYm9vdHN0cmFwcyBhcHBsaWNhdGlvblxuY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb0V2ZW50czpcbiAgICAnYXBwIHJlZGlyZWN0JzogJ3JlZGlyZWN0VG8nXG5cbiAgIyBJbnZva2VkIGFmdGVyIGNvbnN0cnVjdG9yXG4gIGluaXRpYWxpemU6IC0+XG5cbiAgICAjIFN0YXJ0cyBIZWFkZXIgQ29tcG9uZW50XG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnaGVhZGVyJykudHJpZ2dlcigncmVzZXQnKVxuXG4gICAgIyBTdGFydHMgSGVuc29uLmpzIENvbXBvbmVudHNcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdicmVhZGNydW1iJykudHJpZ2dlcigncmVhZHknKVxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ292ZXJsYXknKS50cmlnZ2VyKCdyZWFkeScpXG4gICAgQG9uUmVhZHkoKVxuICAgIHJldHVybiB0cnVlXG5cbiAgIyBTdGFydHMgdGhlIGFwcGxpY2F0aW9uXG4gICMgU3RhcnRzIEJhY2tib25lLmhpc3RvcnkgKGVuYWJsZXMgcm91dGluZylcbiAgIyBBbmQgaW5pdGlhbGl6ZXMgc2lkZWJhciBtb2R1bGVcbiAgb25SZWFkeTogLT5cbiAgICBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KClcblxuICAgICMgVE9ETyAtIHRoaXMgaXMgYSBoYWNrIHRvIGF1dG8tY29ubmVjdCB0byBhIGRldmljZSBJRiBpdCdzIGFscmVhZHkgYmVlbiBjb25uZWN0ZWQgdG9cbiAgICBuYXZpZ2F0b3IudXNiLmdldERldmljZXMoKVxuICAgIC50aGVuKCAoZCkgPT5cbiAgICAgIHJldHVybiB1bmxlc3MgZFswXVxuICAgICAgZFswXS5vcGVuKClcbiAgICAgIHdpbmRvdy5kID0gZFswXVxuICAgIClcblxuICAjIFJlZGlyZWN0aW9uIGludGVyZmFjZVxuICAjIFVzZWQgYWNjcm9zcyB0aGUgYXBwbGljYXRpb24gdG8gcmVkaXJlY3RcbiAgIyB0byBzcGVjaWZpYyB2aWV3cyBhZnRlciBzcGVjaWZpYyBhY3Rpb25zXG4gIHJlZGlyZWN0VG86IChyb3V0ZSkgLT5cbiAgICB3aW5kb3cubG9jYXRpb24gPSByb3V0ZVxuICAgIHJldHVybiB0cnVlXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uXG4iLCJcbiMgQXBwbGljYXRpb25MYXlvdXQgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3IHRvIG1hbmFnZVxuIyB0b3AtbGV2ZWwgYXBwbGljYXRpb24gcmVnaW9uc1xuY2xhc3MgQXBwbGljYXRpb25MYXlvdXQgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgZWw6ICdib2R5J1xuXG4gIHRlbXBsYXRlOiBmYWxzZVxuXG4gIHJlZ2lvbnM6XG4gICAgaGVhZGVyOiAgICAgJ1thcHAtcmVnaW9uPWhlYWRlcl0nXG4gICAgb3ZlcmxheTogICAgJ1thcHAtcmVnaW9uPW92ZXJsYXldJ1xuICAgIGZsYXNoOiAgICAgICdbYXBwLXJlZ2lvbj1mbGFzaF0nXG4gICAgbW9kYWw6ICAgICAgJ1thcHAtcmVnaW9uPW1vZGFsXSdcbiAgICBtYWluOiAgICAgICAnW2FwcC1yZWdpb249bWFpbl0nXG5cbiMgIyAjICMgI1xuXG4jIEV4cG9ydHMgaW5zdGFuY2Vcbm1vZHVsZS5leHBvcnRzID0gbmV3IEFwcGxpY2F0aW9uTGF5b3V0KCkucmVuZGVyKClcbiIsIlxuIyBNYXJpb25ldHRlIEJlaGF2aW9yIE1hbmlmZXN0XG5tb2R1bGUuZXhwb3J0cyA9XG4gIFN1Ym1pdEJ1dHRvbjogICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvc3VibWl0QnV0dG9uJ1xuICBGbGFzaGVzOiAgICAgICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL2ZsYXNoZXMnXG4gIE1vZGVsRXZlbnRzOiAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMnXG4gIEJpbmRJbnB1dHM6ICAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvYmluZElucHV0cydcbiAgVG9vbHRpcHM6ICAgICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi90b29sdGlwcydcbiAgU2VsZWN0YWJsZUNoaWxkOiAgcmVxdWlyZSAnLi9zZWxlY3RhYmxlQ2hpbGQnXG4gIEtleWJvYXJkQ29udHJvbHM6ICByZXF1aXJlICcuL2tleWJvYXJkQ29udHJvbHMnXG4gIFNvcnRhYmxlQ2hpbGQ6ICAgIHJlcXVpcmUgJy4vc29ydGFibGVDaGlsZCdcbiAgU29ydGFibGVMaXN0OiAgICAgcmVxdWlyZSAnLi9zb3J0YWJsZUxpc3QnXG4iLCIjIE5PVEUgLSB0aGlzIGJlaGF2aW9yIGhhcyBub3QgYmVlbiB0ZXN0ZWQgd2l0aCBtdWx0aXBsZSB2aWV3cyBzaW11bHRhbmVvdXNseVxuXG4jIEVuYWJsZXMgdmlldyBjYWxsYmFja3MgdG8gYmUgdHJpZ2dlcmVkIGJ5IGtleWJvYXJkIGlucHV0XG5jbGFzcyBLZXlib2FyZENvbnRyb2xzIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGtleUV2ZW50cyA9IEBvcHRpb25zLmtleUV2ZW50c1xuXG4gIG9uUmVuZGVyOiAtPlxuICAgIEBhZGRFdmVudExpc3RlbmVyKClcblxuICBvbkJlZm9yZURlc3Ryb3k6IC0+XG4gICAgQHJlbW92ZUV2ZW50TGlzdGVuZXIoKVxuXG4gIGtleUFjdGlvbjogKGUpID0+XG5cbiAgICAjIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgIyBJc29sYXRlcyB0aGUga2V5c3Ryb2tlXG4gICAgIyBrZXlDb2RlID0gZS5rZXlDb2RlXG5cbiAgICByZXR1cm4gQHZpZXcudHJpZ2dlck1ldGhvZCgna2V5OmFjdGlvbicsIGUpXG5cbiAgICAjIERvIG5vdGhpbmcgaWYgdGhlcmUgaXNuJ3QgYW5cbiAgICAjIGV2ZW50IGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5c3Ryb2tlXG4gICAgIyByZXR1cm4gdW5sZXNzIEBrZXlFdmVudHNba2V5Q29kZV1cblxuICAgICMgUHJldmVudHMgYW55IGRlZmF1bHQgYWN0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5Y29kZVxuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgIyBUcmlnZ2VycyB0aGUgZXZlbnQgYXNzb2NpYXRlZCB3aXRoXG4gICAgIyB0aGUga2V5c3Ryb2tlIG9uIHRoZSB2aWV3IGluc3RhbmNlXG4gICAgIyByZXR1cm4gQHZpZXcudHJpZ2dlck1ldGhvZChAa2V5RXZlbnRzW2tleUNvZGVdKVxuXG4gIGFkZEV2ZW50TGlzdGVuZXI6IC0+XG4gICAgJChkb2N1bWVudCkub24gJ2tleWRvd24nLCBAa2V5QWN0aW9uXG4gICAgJChkb2N1bWVudCkub24gJ2tleXVwJywgQGtleUFjdGlvblxuICAgICMgJChkb2N1bWVudCkub24gJ2tleXByZXNzJywgQGtleUFjdGlvblxuICAgICMgUmFkaW8uY2hhbm5lbCgnZmxhc2gnKS50cmlnZ2VyKCdhZGQnLCB7IGNvbnRleHQ6ICdpbmZvJywgdGltZW91dDogMTUwMCwgbWVzc2FnZTogJ0tleWJvYXJkIGNvbnRyb2xzIGVuYWJsZWQnfSlcblxuICByZW1vdmVFdmVudExpc3RlbmVyOiAtPlxuICAgICQoZG9jdW1lbnQpLm9mZiAna2V5ZG93bicsIEBrZXlBY3Rpb25cbiAgICAkKGRvY3VtZW50KS5vZmYgJ2tleXVwJywgQGtleUFjdGlvblxuICAgICMgJChkb2N1bWVudCkub2ZmICdrZXlwcmVzcycsIEBrZXlBY3Rpb25cbiAgICAjIFJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykudHJpZ2dlcignYWRkJywgeyBjb250ZXh0OiAnaW5mbycsIHRpbWVvdXQ6IDE1MDAsIG1lc3NhZ2U6ICdLZXlib2FyZCBjb250cm9scyBkaXNhYmxlZCd9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZENvbnRyb2xzXG4iLCJcbmNsYXNzIFNlbGVjdGFibGVDaGlsZCBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICBjc3M6XG4gICAgYWN0aXZlOiAnYWN0aXZlJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2snOiAgJ29uQ2xpY2snXG5cbiAgbW9kZWxFdmVudHM6XG4gICAgJ3NlbGVjdGVkJzogJ29uQ2xpY2snXG5cbiAgIyBTZWxlY3RzIGFjdGl2ZU1vZGVsIG9uIHJlbmRlclxuICBvblJlbmRlcjogLT5cbiAgICByZXR1cm4gdW5sZXNzIEBvcHRpb25zLnNldEFjdGl2ZVxuXG4gICMgSW52b2tlZCB3aGVuIGNsaWNrZWRcbiAgb25DbGljazogKGUpIC0+XG4gICAgIyBCeXBhc3MgYmVoYXZpb3Igd2l0aCBjdXN0b20gb25DbGljayBjYWxsYmFja1xuICAgIHJldHVybiBAdmlldy5vbkNsaWNrKGUpIGlmIEB2aWV3Lm9uQ2xpY2tcblxuICAgICMgUHJldmVudCBkb3VibGUtY2xpY2sgdW5sZXNzIHNwZWNpZmljZWRcbiAgICBlPy5wcmV2ZW50RGVmYXVsdCgpIHVubGVzcyBAb3B0aW9ucy5kb3VibGVDbGlja1xuXG4gICAgIyBIYW5kbGVzIGRlLXNlbGVjdGlvblxuICAgIGlmIEBvcHRpb25zLmRlc2VsZWN0ICYmIEAkZWwuaGFzQ2xhc3MoQGNzcy5hY3RpdmUpXG4gICAgICBAJGVsLnJlbW92ZUNsYXNzKEBjc3MuYWN0aXZlKVxuICAgICAgcmV0dXJuIEB2aWV3LnRyaWdnZXJNZXRob2QgJ2Rlc2VsZWN0ZWQnXG5cbiAgICAjIFJldHVybiBpZiBlbGVtZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZFxuICAgIHJldHVybiBpZiBAJGVsLmhhc0NsYXNzKEBjc3MuYWN0aXZlKVxuXG4gICAgIyBQcmV2ZW50IGRlYWZ1bHQgYW5kIHRyaWdnZXIgc2VsZWN0ZWRcbiAgICBlPy5wcmV2ZW50RGVmYXVsdCgpXG4gICAgQHZpZXcudHJpZ2dlck1ldGhvZCAnc2VsZWN0ZWQnXG4gICAgQCRlbC5hZGRDbGFzcyhAY3NzLmFjdGl2ZSkuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhAY3NzLmFjdGl2ZSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0YWJsZUNoaWxkXG4iLCJcbiMgU29ydGFibGVDaGlsZCBCZWhhdmlvciBkZWZpbml0aW9uXG4jIFdvcmtzIHdpdGggU29ydGFibGVMaXN0IEJlaGF2aW9yXG5jbGFzcyBTb3J0YWJsZUNoaWxkIGV4dGVuZHMgTW4uQmVoYXZpb3JcblxuICBldmVudHM6XG4gICAgJ3NvcnRlZCc6ICdvblNvcnRlZCdcblxuICBvblNvcnRlZDogKGUsIG9yZGVyKSAtPlxuICAgIEB2aWV3Lm1vZGVsLnNldCgnb3JkZXInLCBvcmRlcilcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU29ydGFibGVDaGlsZFxuIiwiXG4jIFNvcnRhYmxlTGlzdCBCZWhhdmlvciBkZWZpbml0aW9uXG4jIFdvcmtzIHdpdGggU29ydGFibGVDaGlsZCBCZWhhdmlvclxuY2xhc3MgU29ydGFibGVMaXN0IGV4dGVuZHMgTW4uQmVoYXZpb3JcblxuICAjIERlZmluZXMgdGhlIHJlb3JkZXJDb2xsZWN0aW9uIG1ldGhvZCBvbiB0aGUgdmlld1xuICAjIHRvIHdoaWNoIHRoZSBiZWhhdmlvciBpcyBhc3NpZ25lZFxuICBpbml0aWFsaXplOiAtPlxuICAgIEB2aWV3LnJlb3JkZXJDb2xsZWN0aW9uID0gPT4gQHJlb3JkZXJDb2xsZWN0aW9uKClcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgSW5pdGlhbGl6ZXMgU29ydGFibGUgY29udGFpbmVyXG4gICAgU29ydGFibGUuY3JlYXRlIEB2aWV3LmVsLFxuICAgICAgaGFuZGxlOiAgICAgICBAb3B0aW9ucy5oYW5kbGUgfHwgJy5zb3J0YWJsZSdcbiAgICAgIGFuaW1hdGlvbjogICAgQG9wdGlvbnMuYW5pbWF0aW9uIHx8IDI1MFxuICAgICAgb25FbmQ6IChlKSA9PiBAcmVvcmRlckNvbGxlY3Rpb24oKVxuXG4gICMgcmVvcmRlckNvbGxlY3Rpb25cbiAgIyBJbnZva2VkIGFmdGVyIHNvcnRpbmcgaGFzIGNvbXBsZXRlZFxuICByZW9yZGVyQ29sbGVjdGlvbjogPT5cblxuICAgICMgVHJpZ2dlcnMgb3JkZXIgZXZlbnRzIG9uIENvbGxlY3Rpb25WaWV3IGNoaWxkVmlldyAkZWxzXG4gICAgb3JkZXIgPSAxXG4gICAgZm9yIGVsIGluIEB2aWV3LiRlbFswXS5jaGlsZHJlblxuICAgICAgJChlbCkudHJpZ2dlcignc29ydGVkJyxvcmRlcilcbiAgICAgIG9yZGVyKytcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU29ydGFibGVMaXN0XG4iLCJBYm91dFZpZXcgID0gcmVxdWlyZSAnLi92aWV3cy9sYXlvdXQnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBBYm91dENvbXBvbmVudCBleHRlbmRzIHJlcXVpcmUgJ2huX21vZGFsL2xpYi9hYnN0cmFjdCdcblxuICByYWRpb0V2ZW50czpcbiAgICAnYWJvdXQgc2hvdyc6ICdzaG93QWJvdXQnXG5cbiAgc2hvd0Fib3V0OiAtPlxuICAgIGFib3V0VmlldyA9IG5ldyBBYm91dFZpZXcoKVxuICAgIEBzaG93TW9kYWwoYWJvdXRWaWV3LCB7IHNpemU6ICdsYXJnZScgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQWJvdXRDb21wb25lbnRcbiIsIlxuIyBBYm91dFZpZXcgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgQWJvdXRWaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvYWJvdXQnXG4gIGNsYXNzTmFtZTogJ21vZGFsLWNvbnRlbnQnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFib3V0Vmlld1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgdGV4dC1jZW50ZXJcXFwiPjxoNSBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPkFCT1VUPC9oNT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgdGV4dC1jZW50ZXJcXFwiPjxoci8+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48cCBjbGFzcz1cXFwibGVhZFxcXCI+PGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL0FzdHJvS2V5XFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+IEFzdHJvS2V5PC9hPiBpcyBhbiBvcGVuLXNvdXJjZSBwbGF0Zm9ybSBmb3IgcmUtcHJvZ3JhbW1hYmxlIFVTQiBrZXlib2FyZHMuPC9wPjxwPkFzdHJvS2V5IHByb3ZpZGVzIGFuIGludHVpdGl2ZSBpbnRlcmZhY2UgYW55Ym9keSBjYW4gdXNlIHRvIGF1dG9tYXRlIGJhc2ljIGtleWJvYXJkIGFjdGlvbnMuPC9wPjxwPlNpbXBseSBkcmFnIGFuZCBkcm9wIGtleWJvYXJkIGtleXMgdG8gY29uc3RydWN0IHlvdXIgZGVzaXJlZCBzZXF1ZW5jZSAtIEFzdHJvS2V5IGRvZXMgdGhlIHJlc3QuPC9wPjxwPkl0J3MgdGhhdCBlYXN5LjwvcD48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgdGV4dC1jZW50ZXJcXFwiPjxoci8+PHA+QnVpbHQgYnkmbmJzcDs8YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vQWFyb25QZXJsXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+QWFyb24gUGVybDwvYT4mbmJzcDthbmQmbmJzcDs8YSBocmVmPVxcXCJodHRwOi8vYWVrcy5jb1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPkFsZXhhbmRlciBTY2h3YXJ0emJlcmc8L2E+Jm5ic3A7Zm9yJm5ic3A7PGEgaHJlZj1cXFwiaHR0cHM6Ly9yY29zLmlvL1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPlJDT1MuPC9hPjwvcD48L2Rpdj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiTGF5b3V0VmlldyA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jIEhlYWRlclNlcnZpY2UgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgYmFzaWMgc2VydmljZSBmb3IgbWFuYWdpbmcgYXBwbGljYXRpb25cbiMgaGVhZGVyIHN0YXRlLiBEaXNwbGF5cyB0aGUgYXV0aGVudGljYXRlZCB1c2VyLFxuIyBvciB0aGUgJ3VuYXV0aGVudGljYXRlZCcgbWVzc2FnZSBpZiBub25lIGlzIGRlZmluZWRcbmNsYXNzIEhlYWRlclNlcnZpY2UgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjb250YWluZXIgPSBAb3B0aW9ucy5jb250YWluZXJcblxuICByYWRpb0V2ZW50czpcbiAgICAnaGVhZGVyIHJlc2V0JzogJ3Jlc2V0J1xuXG4gIHJlc2V0OiAtPlxuICAgIEBjb250YWluZXIuc2hvdyBuZXcgTGF5b3V0VmlldygpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclNlcnZpY2VcbiIsIlxuIyBIZWFkZXJWaWV3IGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIHNpbWJwbGUgdmlldyBmb3IgZGlzcGxheWluZyB0aGVcbiMgaGVhZGVyIG9mIHRoZSBhcHBsaWNhdGlvbi4gVGhlIGhlYWRlciBkaXNwbGF5c1xuIyB0aGUgYXV0aGVudGljYXRlZCB1c2VyIGFuZFxuIyBtYW5hZ2VzIHRvZ2dsaW5nIHRoZSBTaWRlYmFyQ29tcG9uZW50J3Mgdmlld1xuY2xhc3MgSGVhZGVyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvaGVhZGVyJ1xuICBjbGFzc05hbWU6ICduYXZiYXIgbmF2YmFyLWV4cGFuZC1sZyBmaXhlZC10b3AgbmF2YmFyLWRhcmsgYmctZGFyaydcbiAgdGFnTmFtZTogJ25hdidcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyVmlld1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwibmF2YmFyLWJyYW5kIHRpdGxlXFxcIj5BU1RST0tFWTwvZGl2Pjx1bCBjbGFzcz1cXFwibmF2YmFyLW5hdiBtci1hdXRvXFxcIj48bGkgY2xhc3M9XFxcIm5hdi1pdGVtXFxcIj48YSBzdHlsZT1cXFwiY3Vyc29yOnBvaW50ZXJcXFwiIG9uQ2xpY2s9XFxcIlJhZGlvLmNoYW5uZWwoJ3VzYicpLnJlcXVlc3QoJ2RldmljZXMnKTtcXFwiIGNsYXNzPVxcXCJuYXYtbGlua1xcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLWxnIGZhLXVzYlxcXCI+PC9pPjwvYT48L2xpPjxsaSBjbGFzcz1cXFwibmF2LWl0ZW1cXFwiPjxhIHN0eWxlPVxcXCJjdXJzb3I6cG9pbnRlclxcXCIgb25DbGljaz1cXFwiUmFkaW8uY2hhbm5lbCgnYWJvdXQnKS50cmlnZ2VyKCdzaG93Jyk7XFxcIiBjbGFzcz1cXFwibmF2LWxpbmtcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1sZyBmYS1xdWVzdGlvbi1jaXJjbGUtb1xcXCI+PC9pPjwvYT48L2xpPjwvdWw+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIiMgU3VwcG9ydCBmb3IgY3Jvc3MtZG9tYWluIHJlcXVlc3RzIGluIEJhY2tib25lLmpzIC0gdXN1YWxseSB2ZXJib3Rlbi5cbiMgVGhpcyBhbGxvd3MgdGhlIGRldiBzZXJ2ZXIgYXQgbG9jYWwuY29ydGljYWxtZXRyaWNzLmNvbTo4MDgwIHRvIGNvbW11bmljYXRlIHdpdGggZGV2LmNvcnRpY2FsbWV0cmljcy5jb206MzAwMCAoY20tbm9kZS1hcHApXG5cbmNyb3NzRG9tYWluUm9vdCA9ICdodHRwOi8vMTkyLjE2OC4zMy4zMzozMDAwJyAjIERFViBPTkxZXG5cbnByb3hpZWRTeW5jID0gQmFja2JvbmUuc3luY1xuXG5CYWNrYm9uZS5zeW5jID0gKG1ldGhvZCwgbW9kZWwsIG9wdGlvbnMgPSB7fSkgPT5cblxuICBpZiAhb3B0aW9ucy51cmxcbiAgICBvcHRpb25zLnVybCA9IGNyb3NzRG9tYWluUm9vdCArIF8ucmVzdWx0KG1vZGVsLCAndXJsJykgfHwgdXJsRXJyb3IoKVxuXG4gIGVsc2UgaWYgb3B0aW9ucy51cmwuc3Vic3RyaW5nKDAsIDYpICE9IGNyb3NzRG9tYWluUm9vdC5zdWJzdHJpbmcoMCwgNilcbiAgICBvcHRpb25zLnVybCA9IGNyb3NzRG9tYWluUm9vdCArIG9wdGlvbnMudXJsXG5cbiAgaWYgIW9wdGlvbnMuY3Jvc3NEb21haW5cbiAgICBvcHRpb25zLmNyb3NzRG9tYWluID0gdHJ1ZVxuXG4gIGlmICFvcHRpb25zLnhockZpZWxkc1xuICAgIG9wdGlvbnMueGhyRmllbGRzID0geyB3aXRoQ3JlZGVudGlhbHM6IHRydWUgfVxuXG4gIHJldHVybiBwcm94aWVkU3luYyhtZXRob2QsIG1vZGVsLCBvcHRpb25zKVxuIiwiIyBBcHAgY29uZmlndXJhdGlvbiBtYW5pZmVzdFxucmVxdWlyZSAnLi93aW5kb3cnXG5yZXF1aXJlICcuL2p3dCdcbnJlcXVpcmUgJy4vY29ycydcbnJlcXVpcmUgJy4vbWFyaW9uZXR0ZSdcbiIsIiMgQWpheCBKV1QgU2hpbVxuJC5hamF4U2V0dXBcbiAgYmVmb3JlU2VuZDogKHhocikgLT5cbiAgICB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCAnSldUICcgKyB0b2tlbikgaWYgdG9rZW5cbiAgICByZXR1cm5cbiIsIiMgTWFyaW9uZXR0ZS5CZWhhdmlvcnMgY29uZmlndXJhdGlvblxuTWFyaW9uZXR0ZS5CZWhhdmlvcnMuYmVoYXZpb3JzTG9va3VwID0gLT4gcmVxdWlyZSAnLi4vYmVoYXZpb3JzJ1xuIiwiIyBBbGlhc2VzIEJhY2tib25lLlJhZGlvIHRvIHdpbmRvdy5SYWRpb1xud2luZG93LlJhZGlvID0gQmFja2JvbmUuUmFkaW9cbiIsIiMgVGhpcyBmaWxlIGRlZmluZXMgYSBtYW5pZmVzdCBmb3IgdGhlIGNsaWVudCBhcHBsaWNhdGlvbi5cbiMgVGhpcyBpbmNsdWRlcyBjb25maWd1cmF0aW9uLCBTZXJ2aWNlcywgQ29tcG9uZW50cywgTW9kdWxlc1xuIyBhbmQgdGhlIEFwcGxpY2F0aW9uIHNpbmdsZXRvbiBpbnN0YW5jZS5cblxuIyAjICMgIyAjXG5cbiMgQXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBtYW5pZmVzdFxucmVxdWlyZSAnLi9jb25maWcnXG5cbiMgQXBwbGljYXRpb24gY2xhc3MgZGVmaW5pdGlvbiAmIEFwcCBMYXlvdXRcbkFwcCAgICAgICA9IHJlcXVpcmUgJy4vYXBwJ1xuQXBwTGF5b3V0ID0gcmVxdWlyZSAnLi9hcHBsaWNhdGlvbi92aWV3cy9sYXlvdXQnXG5cbiMgSGVuc29uIEVudGl0aWVzXG5yZXF1aXJlICdobl9lbnRpdGllcy9saWIvY29uZmlnJ1xuXG4jICMgIyAjICNcblxuIyBDb21wb25lbnRzIGFyZSByb3V0ZWxlc3Mgc2VydmljZXMgd2l0aCB2aWV3cyB0aGF0IGFyZVxuIyBhY2Nlc3NpYmxlIGFueXdoZXJlIGluIHRoZSBhcHBsaWNhdGlvblxuIyBVc2VkIHRvIG1hbmFnZSB0aGUgaGVhZGVyLCBzaWRlYmFyLCBmbGFzaCwgYW5kIGNvbmZpcm0gVUkgZWxlbWVudHNcblxuIyBIZW5zb24uanMgQ29tcG9uZW50c1xuSGVhZGVyQ29tcG9uZW50ICAgICA9IHJlcXVpcmUgJy4vY29tcG9uZW50cy9oZWFkZXIvY29tcG9uZW50J1xuQWJvdXRDb21wb25lbnQgICAgICA9IHJlcXVpcmUgJy4vY29tcG9uZW50cy9hYm91dC9jb21wb25lbnQnXG5PdmVybGF5Q29tcG9uZW50ICAgID0gcmVxdWlyZSAnaG5fb3ZlcmxheS9saWIvY29tcG9uZW50J1xuRmxhc2hDb21wb25lbnQgICAgICA9IHJlcXVpcmUgJ2huX2ZsYXNoL2xpYi9jb21wb25lbnQnXG5uZXcgSGVhZGVyQ29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQuaGVhZGVyIH0pXG5uZXcgT3ZlcmxheUNvbXBvbmVudCh7IGNvbnRhaW5lcjogQXBwTGF5b3V0Lm92ZXJsYXkgfSlcbm5ldyBGbGFzaENvbXBvbmVudCh7IGNvbnRhaW5lcjogQXBwTGF5b3V0LmZsYXNoIH0pXG5uZXcgQWJvdXRDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5tb2RhbCB9KVxuXG4jICMgIyAjICNcblxuIyBTZXJ2aWNlc1xucmVxdWlyZSgnLi9tb2R1bGVzL3VzYi9zZXJ2aWNlJylcblxuIyBGYWN0b3JpZXNcbnJlcXVpcmUoJy4vbW9kdWxlcy9rZXkvZmFjdG9yeScpXG5cbiMgIyAjICMgI1xuXG4jIE1vZHVsZXNcbiMgTW9kdWxlcyByZXByZXNlbnQgY29sbGVjdGlvbnMgb2YgZW5kcG9pbnRzIGluIHRoZSBhcHBsaWNhdGlvbi5cbiMgVGhleSBoYXZlIHJvdXRlcyBhbmQgZW50aXRpZXMgKG1vZGVscyBhbmQgY29sbGVjdGlvbnMpXG4jIEVhY2ggcm91dGUgcmVwcmVzZW50cyBhbiBlbmRwb2ludCwgb3IgJ3BhZ2UnIGluIHRoZSBhcHAuXG5NYWluTW9kdWxlID0gcmVxdWlyZSAnLi9tb2R1bGVzL21haW4vcm91dGVyJ1xubmV3IE1haW5Nb2R1bGUoeyBjb250YWluZXI6IEFwcExheW91dC5tYWluIH0pXG5cbiMgIyAjICMgIyAjXG5cbiMgUGFnZSBoYXMgbG9hZGVkLCBkb2N1bWVudCBpcyByZWFkeVxuJChkb2N1bWVudCkub24gJ3JlYWR5JywgPT4gbmV3IEFwcCgpICMgSW5zdGFudGlhdGVzIG5ldyBBcHBcbiIsIlxuIyBLZXlNb2RlbCBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBLZXlNb2RlbCBleHRlbmRzIEJhY2tib25lLlJlbGF0aW9uYWxNb2RlbFxuXG4gICMgRGVmYXVsdCBhdHRyaWJ1dGVzXG4gIGRlZmF1bHRzOiB7fVxuXG4jICMgIyAjICNcblxuY2xhc3MgS2V5Q29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IEtleU1vZGVsXG4gIGNvbXBhcmF0b3I6ICdvcmRlcidcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgTW9kZWw6ICAgICAgS2V5TW9kZWxcbiAgQ29sbGVjdGlvbjogS2V5Q29sbGVjdGlvblxuIiwiRW50aXRpZXMgPSByZXF1aXJlKCcuL2VudGl0aWVzJylcbktleURhdGEgPSByZXF1aXJlKCcuL2tleXMnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgS2V5RmFjdG9yeSBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ2tleSBtb2RlbCc6ICAgICAgICdnZXRNb2RlbCdcbiAgICAna2V5IGNvbGxlY3Rpb24nOiAgJ2dldENvbGxlY3Rpb24nXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAY2FjaGVkQ29sbGVjdGlvbiA9IG5ldyBFbnRpdGllcy5Db2xsZWN0aW9uKEtleURhdGEsIHsgcGFyc2U6IHRydWUgfSlcblxuICBnZXRNb2RlbDogKGlkKSAtPlxuICAgIHJldHVybiBAY2FjaGVkQ29sbGVjdGlvbi5nZXQoaWQpXG5cbiAgZ2V0Q29sbGVjdGlvbjogLT5cbiAgICByZXR1cm4gQGNhY2hlZENvbGxlY3Rpb25cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEtleUZhY3RvcnkoKVxuIiwiXG4jIEtleSBKU09OIGRlZmluaXRpb25zXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnYCcsIHNoaWZ0X2tleTogJ34nLCBrZXljb2RlOiAxOTIgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICcxJywgc2hpZnRfa2V5OiAnIScsIGtleWNvZGU6IDQ5IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMicsIHNoaWZ0X2tleTogJ0AnLCBrZXljb2RlOiA1MCB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzMnLCBzaGlmdF9rZXk6ICcjJywga2V5Y29kZTogNTEgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc0Jywgc2hpZnRfa2V5OiAnJCcsIGtleWNvZGU6IDUyIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNScsIHNoaWZ0X2tleTogJyUnLCBrZXljb2RlOiA1MyB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzYnLCBzaGlmdF9rZXk6ICdeJywga2V5Y29kZTogNTQgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc3Jywgc2hpZnRfa2V5OiAnJicsIGtleWNvZGU6IDU1IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnOCcsIHNoaWZ0X2tleTogJyonLCBrZXljb2RlOiA1NiB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzknLCBzaGlmdF9rZXk6ICcoJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICcwJywgc2hpZnRfa2V5OiAnKScsIGtleWNvZGU6IDQ4IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnLScsIHNoaWZ0X2tleTogJ18nLCBrZXljb2RlOiAxODkgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc9Jywgc2hpZnRfa2V5OiAnKycsIGtleWNvZGU6IDE4NyB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJ0JBQ0tTUEFDRScsIGtleWNvZGU6IDgsIGNzczogJ3cyXzAnIH1cblxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdUQUInLCBrZXljb2RlOiA5LCBjc3M6ICd3MV81Jywgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ3EnLCBzaGlmdF9rZXk6ICdRJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDgxIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAndycsIHNoaWZ0X2tleTogJ1cnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODcgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdlJywgc2hpZnRfa2V5OiAnRScsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA2OSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ3InLCBzaGlmdF9rZXk6ICdSJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDgyIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAndCcsIHNoaWZ0X2tleTogJ1QnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODQgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICd5Jywgc2hpZnRfa2V5OiAnWScsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4OSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ3UnLCBzaGlmdF9rZXk6ICdVJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg1IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnaScsIHNoaWZ0X2tleTogJ0knLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzMgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdvJywgc2hpZnRfa2V5OiAnTycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3OSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ3AnLCBzaGlmdF9rZXk6ICdQJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDgwIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnWycsIHNoaWZ0X2tleTogJ3snLCBrZXljb2RlOiAyMTkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICddJywgc2hpZnRfa2V5OiAnfScsIGtleWNvZGU6IDIyMSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ1xcXFwnLCBzaGlmdF9rZXk6ICd8Jywga2V5Y29kZTogMjIwLCBjc3M6ICd3MV81JyB9XG5cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnQ0FQUycsIGNzczogJ3cxXzc1Jywga2V5Y29kZTogMjAsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdhJywgc2hpZnRfa2V5OiAnQScsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA2NSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ3MnLCBzaGlmdF9rZXk6ICdTJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDgzIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnZCcsIHNoaWZ0X2tleTogJ0QnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNjggfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdmJywgc2hpZnRfa2V5OiAnRicsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3MCB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2cnLCBzaGlmdF9rZXk6ICdHJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDcxIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnaCcsIHNoaWZ0X2tleTogJ0gnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzIgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdqJywgc2hpZnRfa2V5OiAnSicsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3NCB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2snLCBzaGlmdF9rZXk6ICdLJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDc1IH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnbCcsIHNoaWZ0X2tleTogJ0wnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzYgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICc7Jywgc2hpZnRfa2V5OiAnOicsIGtleWNvZGU6IDE4NiB9XG4gICAgeyByb3c6ICdyMicsIGtleTogXCInXCIsIHNoaWZ0X2tleTogJ1wiJywga2V5Y29kZTogMjIyIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnUkVUVVJOJywgY3NzOiAndzJfMjUnLCBrZXljb2RlOiAxMywgc3BlY2lhbDogdHJ1ZSB9XG5cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnU0hJRlQnLCBjc3M6ICd3Ml8yNScsIGtleWNvZGU6IDE2LCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAneicsIHNoaWZ0X2tleTogJ1onLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogOTAgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICd4Jywgc2hpZnRfa2V5OiAnWCcsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4OCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ2MnLCBzaGlmdF9rZXk6ICdDJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDY3IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAndicsIHNoaWZ0X2tleTogJ1YnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODYgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICdiJywgc2hpZnRfa2V5OiAnQicsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA2NiB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ24nLCBzaGlmdF9rZXk6ICdOJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDc4IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnbScsIHNoaWZ0X2tleTogJ00nLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzcgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICcsJywgc2hpZnRfa2V5OiAnPCcsIGtleWNvZGU6IDE4OCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJy4nLCBzaGlmdF9rZXk6ICc+Jywga2V5Y29kZTogMTkwIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnLycsIHNoaWZ0X2tleTogJz8nLCBrZXljb2RlOiAxOTEgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICdTSElGVCcsIGNzczogJ3cyXzc1Jywga2V5Y29kZTogMTYsIHNwZWNpYWw6IHRydWUgfVxuXG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0NUUkwnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE3LCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnTScsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogOTEsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdBTFQnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE4LCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnU1BBQ0UnLCBjc3M6ICdzcGFjZScsIGtleWNvZGU6IDMyLCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnQ1RSTCcsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTcsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdNJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxOCwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ1AnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDkzLCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnQUxUJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxOCwgc3BlY2lhbDogdHJ1ZSB9XG5cbiAgICAjIE5VTVBBRCBLRVlTXG4gICAgeyByb3c6ICdudW1fcjAnLCBrZXk6ICcwJywga2V5Y29kZTogNDksIGNzczogJ3cyXzI1JyB9XG4gICAgeyByb3c6ICdudW1fcjAnLCBrZXk6ICcuJywga2V5Y29kZTogNDkgfVxuXG4gICAgeyByb3c6ICdudW1fcjEnLCBrZXk6ICcxJywga2V5Y29kZTogNDkgfVxuICAgIHsgcm93OiAnbnVtX3IxJywga2V5OiAnMicsIGtleWNvZGU6IDUwIH1cbiAgICB7IHJvdzogJ251bV9yMScsIGtleTogJzMnLCBrZXljb2RlOiA1MSB9XG5cbiAgICB7IHJvdzogJ251bV9yMicsIGtleTogJzQnLCBrZXljb2RlOiA1MiB9XG4gICAgeyByb3c6ICdudW1fcjInLCBrZXk6ICc1Jywga2V5Y29kZTogNTMgfVxuICAgIHsgcm93OiAnbnVtX3IyJywga2V5OiAnNicsIGtleWNvZGU6IDU0IH1cblxuICAgIHsgcm93OiAnbnVtX3IzJywga2V5OiAnNycsIGtleWNvZGU6IDU1IH1cbiAgICB7IHJvdzogJ251bV9yMycsIGtleTogJzgnLCBrZXljb2RlOiA1NiB9XG4gICAgeyByb3c6ICdudW1fcjMnLCBrZXk6ICc5Jywga2V5Y29kZTogNTcgfVxuXG4gICAgeyByb3c6ICdudW1fcjQnLCBrZXk6ICdDTEVBUicsIGtleWNvZGU6IDQ4IH1cbiAgICB7IHJvdzogJ251bV9yNCcsIGtleTogJy8nLCBrZXljb2RlOiAxODkgfVxuICAgIHsgcm93OiAnbnVtX3I0Jywga2V5OiAnKicsIGtleWNvZGU6IDE4NyB9XG5cbiAgICB7IHJvdzogJ251bV9jb2wnLCBrZXk6ICctJywga2V5Y29kZTogNDggfVxuICAgIHsgcm93OiAnbnVtX2NvbCcsIGtleTogJysnLCBrZXljb2RlOiAxODksIGNzczogJ2gyXzAnIH1cbiAgICB7IHJvdzogJ251bV9jb2wnLCBrZXk6ICdFTlRFUicsIGtleWNvZGU6IDE4NywgY3NzOiAnaDJfMCcgfVxuXG4gICAgIyBGdW5jdGlvbiBLZXlzXG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEnLCBrZXljb2RlOiA0OSB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjInLCBrZXljb2RlOiA1MCB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjMnLCBrZXljb2RlOiA1MSB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjQnLCBrZXljb2RlOiA1MiB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjUnLCBrZXljb2RlOiA1MyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjYnLCBrZXljb2RlOiA1NCB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjcnLCBrZXljb2RlOiA1NSB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjgnLCBrZXljb2RlOiA1NiB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjknLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEwJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxMScsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTInLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcgfVxuXG4gICAgIyBNZWRpYSBLZXlzXG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtc3RlcC1iYWNrd2FyZCcgfVxuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXBsYXknIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS1zdGVwLWZvcndhcmQnIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS12b2x1bWUtb2ZmJyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtdm9sdW1lLWRvd24nIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS12b2x1bWUtdXAnIH1cblxuICAgICMgTmF2aWdhdGlvbiBLZXlzXG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdQR1VQJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnUEdETicsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0VORCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0hPTUUnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdMRUZULUFSUk9XJywga2V5Y29kZTogNTcsIGljb246ICdmYS1jaGV2cm9uLWxlZnQnIH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ1VQLUFSUk9XJywga2V5Y29kZTogNTcsIGljb246ICdmYS1jaGV2cm9uLXVwJyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdET1dOLUFSUk9XJywga2V5Y29kZTogNTcsIGljb246ICdmYS1jaGV2cm9uLWRvd24nIH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ1JJR0hULUFSUk9XJywga2V5Y29kZTogNTcsIGljb246ICdmYS1jaGV2cm9uLXJpZ2h0JyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdJTlMnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdERUwnLCBrZXljb2RlOiA0NiB9XG5cbl1cblxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAocjApIHtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKCl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjx1bCBjbGFzcz1cXFwibGlzdC11bnN0eWxlZCBtYi0wIGtleWJvYXJkLS1yb3cgdy0xMDBcXFwiPlwiKTtcbmJsb2NrICYmIGJsb2NrKCk7XG5idWYucHVzaChcIjwvdWw+XCIpO1xufTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleWNvZGVcIiwgb3B0cy5rZXljb2RlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1jbGljaz1cXFwia2V5XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEta2V5XCIsIG9wdHMua2V5LCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnYnRuJywnYnRuLW91dGxpbmUtbGlnaHQnLCdrZXlib2FyZC0ta2V5JyxvcHRzLmNzc10sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxvcHRzLmljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBvcHRzLmtleSAmJiBvcHRzLnNoaWZ0X2tleSAmJiAhb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlIGlmICggb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbn1cbmJ1Zi5wdXNoKFwiPC9saT5cIik7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tYm9keVxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJyMFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjA6dHlwZW9mIHIwIT09XCJ1bmRlZmluZWRcIj9yMDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChyMCwgcjEsIHIyLCByMywgcjQpIHtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKCl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjx1bCBjbGFzcz1cXFwibGlzdC11bnN0eWxlZCBtYi0wIGtleWJvYXJkLS1yb3cgdy0xMDBcXFwiPlwiKTtcbmJsb2NrICYmIGJsb2NrKCk7XG5idWYucHVzaChcIjwvdWw+XCIpO1xufTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleWNvZGVcIiwgb3B0cy5rZXljb2RlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1jbGljaz1cXFwia2V5XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEta2V5XCIsIG9wdHMua2V5LCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnYnRuJywnYnRuLW91dGxpbmUtbGlnaHQnLCdrZXlib2FyZC0ta2V5JyxvcHRzLmNzc10sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxvcHRzLmljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBvcHRzLmtleSAmJiBvcHRzLnNoaWZ0X2tleSAmJiAhb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlIGlmICggb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbn1cbmJ1Zi5wdXNoKFwiPC9saT5cIik7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tYm9keVxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByNFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByNDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByM1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMlxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMjtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJyMFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjA6dHlwZW9mIHIwIT09XCJ1bmRlZmluZWRcIj9yMDp1bmRlZmluZWQsXCJyMVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjE6dHlwZW9mIHIxIT09XCJ1bmRlZmluZWRcIj9yMTp1bmRlZmluZWQsXCJyMlwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjI6dHlwZW9mIHIyIT09XCJ1bmRlZmluZWRcIj9yMjp1bmRlZmluZWQsXCJyM1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjM6dHlwZW9mIHIzIT09XCJ1bmRlZmluZWRcIj9yMzp1bmRlZmluZWQsXCJyNFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjQ6dHlwZW9mIHI0IT09XCJ1bmRlZmluZWRcIj9yNDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChjb2wsIHIwLCByMSwgcjIsIHIzLCByNCwgdW5kZWZpbmVkKSB7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbigpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8dWwgY2xhc3M9XFxcImxpc3QtdW5zdHlsZWQgbWItMCBrZXlib2FyZC0tcm93IHctMTAwXFxcIj5cIik7XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L3VsPlwiKTtcbn07XG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXljb2RlXCIsIG9wdHMua2V5Y29kZSwgdHJ1ZSwgZmFsc2UpKSArIFwiIGRhdGEtY2xpY2s9XFxcImtleVxcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleVwiLCBvcHRzLmtleSwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmNscyhbJ2J0bicsJ2J0bi1vdXRsaW5lLWxpZ2h0Jywna2V5Ym9hcmQtLWtleScsb3B0cy5jc3NdLCBbbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggb3B0cy5pY29uKVxue1xuYnVmLnB1c2goXCI8aVwiICsgKGphZGUuY2xzKFsnZmEnLCdmYS1mdycsb3B0cy5pY29uXSwgW251bGwsbnVsbCx0cnVlXSkpICsgXCI+PC9pPlwiKTtcbn1cbmVsc2VcbntcbmlmICggb3B0cy5rZXkgJiYgb3B0cy5zaGlmdF9rZXkgJiYgIW9wdHMuYWxwaGEpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInNoaWZ0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuZWxzZSBpZiAoIG9wdHMuYWxwaGEpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG59XG5idWYucHVzaChcIjwvbGk+XCIpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwia2V5Ym9hcmQtLWJvZHlcXFwiPjxkaXYgY2xhc3M9XFxcImQtZmxleCBmbGV4LXJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiZC1mbGV4IGZsZXgtY29sdW1uXFxcIj5cIik7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHI0XG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHI0O1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIyXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIyO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIxXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIxO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIwXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIwO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5idWYucHVzaChcIjwvZGl2PjxkaXYgY2xhc3M9XFxcImQtZmxleCBmbGV4LWNvbHVtblxcXCI+XCIpO1xuLy8gaXRlcmF0ZSBjb2xcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gY29sO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJjb2xcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNvbDp0eXBlb2YgY29sIT09XCJ1bmRlZmluZWRcIj9jb2w6dW5kZWZpbmVkLFwicjBcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIwOnR5cGVvZiByMCE9PVwidW5kZWZpbmVkXCI/cjA6dW5kZWZpbmVkLFwicjFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIxOnR5cGVvZiByMSE9PVwidW5kZWZpbmVkXCI/cjE6dW5kZWZpbmVkLFwicjJcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIyOnR5cGVvZiByMiE9PVwidW5kZWZpbmVkXCI/cjI6dW5kZWZpbmVkLFwicjNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIzOnR5cGVvZiByMyE9PVwidW5kZWZpbmVkXCI/cjM6dW5kZWZpbmVkLFwicjRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnI0OnR5cGVvZiByNCE9PVwidW5kZWZpbmVkXCI/cjQ6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG5hdkl0ZW1zLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTggZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlwiKTtcbi8vIGl0ZXJhdGUgbmF2SXRlbXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbmF2SXRlbXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIG5hdkl0ZW0udHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBidG4tc20ganVzdGlmeS1jb250ZW50LWNlbnRlciBteC0zXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIG5hdkl0ZW0gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxidXR0b24gc3R5bGU9XFxcImZsZXgtZ3JvdzoxO1xcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLXRyaWdnZXJcIiwgbmF2SXRlbS50cmlnZ2VyLCB0cnVlLCBmYWxzZSkpICsgXCIgY2xhc3M9XFxcImQtZmxleCBidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IGJ0bi1zbSBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG14LTNcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbmF2SXRlbS50ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2J1dHRvbj5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxoci8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJjb250ZW50XFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJuYXZJdGVtc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubmF2SXRlbXM6dHlwZW9mIG5hdkl0ZW1zIT09XCJ1bmRlZmluZWRcIj9uYXZJdGVtczp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiTWFjcm9FeGFtcGxlcyA9IHJlcXVpcmUoJy4vZXhhbXBsZXMnKVxuY2hhck1hcCA9IHJlcXVpcmUoJ2xpYi9jaGFyYWN0ZXJfbWFwJylcblxuIyAjICMgIyAjXG5cbiMgTWFjcm9Nb2RlbCBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBNYWNyb01vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6XG4gICAgb3JkZXI6IDBcbiAgICBwb3NpdGlvbjogMFxuICAgIHNoaWZ0ZWQ6IGZhbHNlXG5cbiAgZ2V0S2V5RGF0YTogLT5cblxuICAgIGRhdGEgPSBbXVxuXG4gICAgYXR0cnMgPSBfLmNsb25lKEBhdHRyaWJ1dGVzKVxuXG4gICAgIyBjb25zb2xlLmxvZyBhdHRyc1xuXG4gICAgIyBBY3Rpb25UeXBlXG4gICAgIyBQcmVzcyAgID0gMSwgS0VZIFZBTFVFXG4gICAgIyBSZWxlYXNlID0gMiwgS0VZIFZBTFVFXG5cbiAgICAjIEtFWSBET1dOICYgS0VZIFVQXG4gICAgaWYgYXR0cnMucG9zaXRpb24gPT0gMFxuICAgICAgZGF0YS5wdXNoKDEpXG4gICAgICBkYXRhLnB1c2goY2hhck1hcFthdHRycy5rZXldIHx8IDQpXG5cbiAgICAgIGRhdGEucHVzaCgyKVxuICAgICAgZGF0YS5wdXNoKGNoYXJNYXBbYXR0cnMua2V5XSB8fCA0KVxuXG4gICAgIyBLRVkgRE9XTlxuICAgIGlmIGF0dHJzLnBvc2l0aW9uID09IC0xXG4gICAgICBkYXRhLnB1c2goMSlcbiAgICAgIGRhdGEucHVzaChjaGFyTWFwW2F0dHJzLmtleV0gfHwgNClcblxuICAgICMgS0VZIFVQXG4gICAgaWYgYXR0cnMucG9zaXRpb24gPT0gMVxuICAgICAgZGF0YS5wdXNoKDIpXG4gICAgICBkYXRhLnB1c2goY2hhck1hcFthdHRycy5rZXldIHx8IDQpXG5cbiAgICByZXR1cm4gZGF0YVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9Db2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogTWFjcm9Nb2RlbFxuICBjb21wYXJhdG9yOiAnb3JkZXInXG5cbiAgIyBsb2FkRXhhbXBsZVxuICAjIFJlc2V0cyB0aGUgY29sbGVjdGlvbiB0byBvbmUgb2YgdGhlIGV4YW1wbGVzXG4gIGxvYWRFeGFtcGxlOiAoZXhhbXBsZV9pZCkgLT5cblxuICAgICMgUmVzZXRzIHRoZSBjb2xsZWN0aW9uIHdpdGggdGhlIGRhdGEgZGVmaW5lZCBpbiB0aGUgRXhhbXBsZXMgb2JqZWN0XG4gICAgQHJlc2V0KE1hY3JvRXhhbXBsZXNbZXhhbXBsZV9pZF0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1vZGVsOiAgICAgIE1hY3JvTW9kZWxcbiAgQ29sbGVjdGlvbjogTWFjcm9Db2xsZWN0aW9uXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiSFwiLFxuICAgIFwia2V5Y29kZVwiOiA3MixcbiAgICBcIm9yZGVyXCI6IDIsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDNcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDQsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkxcIixcbiAgICBcImtleWNvZGVcIjogNzYsXG4gICAgXCJvcmRlclwiOiA1LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJMXCIsXG4gICAgXCJrZXljb2RlXCI6IDc2LFxuICAgIFwib3JkZXJcIjogNixcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiT1wiLFxuICAgIFwia2V5Y29kZVwiOiA3OSxcbiAgICBcIm9yZGVyXCI6IDcsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiA4XG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIjFcIixcbiAgICBcInNoaWZ0XCI6IFwiIVwiLFxuICAgIFwia2V5Y29kZVwiOiA0OSxcbiAgICBcIm9yZGVyXCI6IDksXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDEwXG4gIH1cbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJrZXlcIjogXCJSXCIsXG4gICAgXCJrZXljb2RlXCI6IDgyLFxuICAgIFwib3JkZXJcIjogMSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDIsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNcIixcbiAgICBcImtleWNvZGVcIjogODMsXG4gICAgXCJvcmRlclwiOiAzLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJVXCIsXG4gICAgXCJrZXljb2RlXCI6IDg1LFxuICAgIFwib3JkZXJcIjogNCxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiTVwiLFxuICAgIFwia2V5Y29kZVwiOiA3NyxcbiAgICBcIm9yZGVyXCI6IDUsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkFMVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxOCxcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogNlxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJgXCIsXG4gICAgXCJzaGlmdFwiOiBcIn5cIixcbiAgICBcImtleWNvZGVcIjogMTkyLFxuICAgIFwib3JkZXJcIjogNyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDhcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDksXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH1cbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDJcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiLVwiLFxuICAgIFwic2hpZnRcIjogXCJfXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4OSxcbiAgICBcIm9yZGVyXCI6IDMsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDRcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDVcbiAgfVxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBcImtleVwiOiBcIkNUUkxcIixcbiAgICBcImtleWNvZGVcIjogMTcsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiAyXG4gIH0sXG4gIHtcbiAgICBcInJvd1wiOiBcIm5hdl9yMFwiLFxuICAgIFwia2V5XCI6IFwiREVMXCIsXG4gICAgXCJrZXljb2RlXCI6IDQ2LFxuICAgIFwib3JkZXJcIjogMyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDRcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQ1RSTFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNyxcbiAgICBcInBvc2l0aW9uXCI6IDEsXG4gICAgXCJvcmRlclwiOiA1XG4gIH1cbl1cbiIsIlxuIyBFeHBvcnRzIGFuIG9iamVjdCBkZWZpbmluZyB0aGUgZXhhbXBsZSBtYWNyb3Ncbm1vZHVsZS5leHBvcnRzID0ge1xuICBleF8wMTogcmVxdWlyZSgnLi9leGFtcGxlXzEnKVxuICBleF8wMjogcmVxdWlyZSgnLi9leGFtcGxlXzInKVxuICBleF8wMzogcmVxdWlyZSgnLi9leGFtcGxlXzMnKVxuICBleF8wNDogcmVxdWlyZSgnLi9leGFtcGxlXzQnKVxufVxuIiwiTGF5b3V0VmlldyAgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyAjICMgIyAjXG5cbmNsYXNzIERhc2hib2FyZFJvdXRlIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGUnXG5cbiAgdGl0bGU6ICdBc3Ryb0tleSBXZWInXG5cbiAgYnJlYWRjcnVtYnM6IFt7IHRleHQ6ICdEZXZpY2UnIH1dXG5cbiAgZmV0Y2g6IC0+XG4gICAgQGRldmljZSA9IFJhZGlvLmNoYW5uZWwoJ2RldmljZScpLnJlcXVlc3QoJ21vZGVsJywgJ2RldmljZV8xJylcblxuICByZW5kZXI6IC0+XG4gICAgQGNvbnRhaW5lci5zaG93IG5ldyBMYXlvdXRWaWV3KHsgbW9kZWw6IEBkZXZpY2UgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRGFzaGJvYXJkUm91dGVcbiIsIktleVNlbGVjdG9yID0gcmVxdWlyZSgnLi9rZXlTZWxlY3RvcicpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VTdGF0dXNWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9kZXZpY2Vfc3RhdHVzJ1xuICBjbGFzc05hbWU6ICdyb3cnXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuXG4gICAgc3RhdHVzID0ge1xuICAgICAgdGV4dDogJ05vdCBDb25uZWN0ZWQnXG4gICAgICBjc3M6ICAnYmFkZ2UtZGVmYXVsdCdcbiAgICB9XG5cbiAgICAjIENvbm5lY3RlZFxuICAgIGlmIEBtb2RlbC5nZXQoJ3N0YXR1c19jb2RlJykgPT0gMVxuXG4gICAgICBzdGF0dXMgPSB7XG4gICAgICAgIHRleHQ6ICdDb25uZWN0ZWQnXG4gICAgICAgIGNzczogJ2JhZGdlLXN1Y2Nlc3MnXG4gICAgICB9XG5cbiAgICByZXR1cm4geyBzdGF0dXM6IHN0YXR1cyB9XG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VMYXlvdXQgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdydcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2RldmljZV9sYXlvdXQnKVxuXG4gIHJlZ2lvbnM6XG4gICAgIyBzdGF0dXNSZWdpb246ICdbZGF0YS1yZWdpb249c3RhdHVzXSdcbiAgICBrZXlzUmVnaW9uOiAgICdbZGF0YS1yZWdpb249a2V5c10nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBbZGF0YS1jbGljaz1jb25uZWN0XSc6ICdjb25uZWN0VG9EZXZpY2UnXG5cbiAgY29ubmVjdFRvRGV2aWNlOiAtPlxuICAgIFJhZGlvLmNoYW5uZWwoJ3VzYicpLnJlcXVlc3QoJ2RldmljZXMnKS50aGVuIChkKSA9PiBAcmVuZGVyKClcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAgaWYgd2luZG93LmRcbiAgICAgIHJldHVybiB7IGNvbm5lY3RlZDogdHJ1ZSB9XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHsgY29ubmVjdGVkOiBmYWxzZSB9XG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEluc3RhbnRpYXRlcyBuZXcgS2V5U2VsZWN0b3IgVmlld1xuICAgIGtleVNlbGVjdG9yID0gbmV3IEtleVNlbGVjdG9yKHsgY29sbGVjdGlvbjogQG1vZGVsLmdldCgna2V5cycpIH0pXG4gICAga2V5U2VsZWN0b3Iub24gJ2NoaWxkdmlldzpzZWxlY3RlZCcsICh2aWV3KSA9PiBAdHJpZ2dlcigna2V5OnNlbGVjdGVkJywgdmlldy5tb2RlbClcbiAgICBrZXlTZWxlY3Rvci5vbiAnY2hpbGR2aWV3OmRlc2VsZWN0ZWQnLCAodmlldykgPT4gQHRyaWdnZXIoJ2tleTpkZXNlbGVjdGVkJylcbiAgICBAa2V5c1JlZ2lvbi5zaG93KGtleVNlbGVjdG9yKVxuXG4gICAgIyBTdGF0dXMgVmlld1xuICAgICMgVE9ETyAtIHN0YXR1cyAmIGNvbm5lY3Rpb24gdmlld1xuICAgICMgQHN0YXR1c1JlZ2lvbi5zaG93IG5ldyBEZXZpY2VTdGF0dXNWaWV3KHsgbW9kZWw6IEBtb2RlbCB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBEZXZpY2VMYXlvdXRcblxuXG4iLCJTaW1wbGVOYXYgPSByZXF1aXJlICdsaWIvdmlld3Mvc2ltcGxlX25hdidcblxuIyAjICMgIyAjXG5cbmNsYXNzIEVkaXRvclNlbGVjdG9yIGV4dGVuZHMgU2ltcGxlTmF2XG4gIGNsYXNzTmFtZTogJ3JvdyBoLTEwMCdcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2VkaXRvcl9zZWxlY3RvcicpXG5cbiAgYmVoYXZpb3JzOlxuICAgIFRvb2x0aXBzOiB7fVxuXG4gIG5hdkl0ZW1zOiBbXG4gICAgeyBpY29uOiAnZmEta2V5Ym9hcmQtbycsICB0ZXh0OiAnTWFjcm8nLCAgdHJpZ2dlcjogJ21hY3JvJyB9XG4gICAgeyBpY29uOiAnZmEtZmlsZS10ZXh0LW8nLCB0ZXh0OiAnVGV4dCcsICAgdHJpZ2dlcjogJ3RleHQnLCBkaXNhYmxlZDogdHJ1ZSwgY3NzOiAnZGlzYWJsZWQnLCB0aXRsZTogJ0NvbWluZyBTb29uJyB9XG4gICAgeyBpY29uOiAnZmEtYXN0ZXJpc2snLCAgICB0ZXh0OiAnS2V5JywgICAgdHJpZ2dlcjogJ2tleScsIGRpc2FibGVkOiB0cnVlLCBjc3M6ICdkaXNhYmxlZCcsIHRpdGxlOiAnQ29taW5nIFNvb24nIH1cbiAgXVxuXG4gIG9uUmVuZGVyOiAtPlxuICAgIGNvbmZpZ01vZGVsID0gQG1vZGVsLmdldCgnY29uZmlnJylcbiAgICB0cmlnZ2VyID0gY29uZmlnTW9kZWwuZ2V0KCd0eXBlJylcbiAgICByZXR1cm4gQCQoXCJbZGF0YS10cmlnZ2VyPSN7dHJpZ2dlcn1dXCIpLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gIG9uTmF2aWdhdGVNYWNybzogLT5cbiAgICBAdHJpZ2dlciAnc2hvdzptYWNybzplZGl0b3InXG5cbiAgb25OYXZpZ2F0ZVRleHQ6IC0+XG4gICAgQHRyaWdnZXIgJ3Nob3c6dGV4dDplZGl0b3InXG5cbiAgb25OYXZpZ2F0ZUtleTogLT5cbiAgICBAdHJpZ2dlciAnc2hvdzprZXk6ZWRpdG9yJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JTZWxlY3RvclxuIiwiVGV4dEVkaXRvciA9IHJlcXVpcmUoJy4vdGV4dEVkaXRvcicpXG5NYWNyb0VkaXRvciA9IHJlcXVpcmUoJy4vbWFjcm9FZGl0b3InKVxuXG4jICMgIyAjICNcblxuY2xhc3MgRWRpdG9yV3JhcHBlciBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvZWRpdG9yX3dyYXBwZXInXG4gIGNsYXNzTmFtZTogJ3JvdydcblxuICByZWdpb25zOlxuICAgIGNvbnRlbnRSZWdpb246ICdbZGF0YS1yZWdpb249Y29udGVudF0nXG5cbiAgdWk6XG4gICAgcmVjb3JkQnRuOiAnW2RhdGEtY2xpY2s9cmVjb3JkXSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIFtkYXRhLWNsaWNrPXNhdmVdJzogICAgJ29uU2F2ZSdcbiAgICAnY2xpY2sgW2RhdGEtY2xpY2s9Y2xlYXJdJzogICAnb25DbGVhcidcbiAgICAnY2xpY2sgW2RhdGEtY2xpY2s9Y2FuY2VsXSc6ICAnb25DYW5jZWwnXG4gICAgJ2NsaWNrIFtkYXRhLWV4YW1wbGVdJzogICAgICAgJ2xvYWRFeGFtcGxlJ1xuICAgICdjbGljayBAdWkucmVjb3JkQnRuJzogICAgICAgICd0b2dnbGVSZWNvcmQnXG5cbiAgZWRpdG9yczpcbiAgICBtYWNybzogIE1hY3JvRWRpdG9yXG4gICAgdGV4dDogICBUZXh0RWRpdG9yXG4gICAga2V5OiAgICBNYWNyb0VkaXRvclxuXG4gIG9uUmVuZGVyOiAtPlxuXG4gICAgIyBGZXRjaGVzIHRoZSBFZGl0b3JWaWV3IHByb3RvdHlwZVxuICAgIEVkaXRvclZpZXcgPSBAZWRpdG9yc1tAb3B0aW9ucy5lZGl0b3JdXG5cbiAgICAjIElzb2xhdGVzIENvbmZpZ1xuICAgIGNvbmZpZyA9IEBtb2RlbC5nZXQoJ2NvbmZpZycpXG5cbiAgICAjIENhY2hlcyB0aGUgY3VycmVudCBjb25maWd1cmF0aW9uIHRvIGJlIHJlc3RvcmVkIHdoZW4gdGhpcyB2aWV3IGlzIGNhbmNlbGxlZCBvdXRcbiAgICBAY2FjaGVkQ29uZmlnID0gY29uZmlnLnRvSlNPTigpXG5cbiAgICAjIElzb2xhdGVzIE1hY3JvQ29sbGVjdGlvblxuICAgIEBtYWNyb3MgPSBjb25maWcuZ2V0KCdtYWNyb3MnKVxuXG4gICAgd2luZG93Lm1hY3JvcyA9IEBtYWNyb3MgIyBUT0RPIC0gcmVtb3ZlXG5cbiAgICAjIFJlcXVlc3RzIEtleUNvbGxlY3Rpb24gZnJvbSB0aGUgS2V5RmFjdG9yeVxuICAgIGtleXMgPSBSYWRpby5jaGFubmVsKCdrZXknKS5yZXF1ZXN0KCdjb2xsZWN0aW9uJylcblxuICAgICMgSW5zdGFudGlhdGVzIG5ldyBFZGl0b3JWaWV3IGluc3RhbmNlXG4gICAgQGVkaXRvclZpZXcgPSBuZXcgRWRpdG9yVmlldyh7IG1vZGVsOiBjb25maWcsIGtleXM6IGtleXMsIG1hY3JvczogQG1hY3JvcyB9KVxuXG4gICAgIyBMaXN0ZW5zIGZvciAnc3RvcDpyZWNvcmRpbmcnIGV2ZW50XG4gICAgQGVkaXRvclZpZXcub24gJ3N0b3A6cmVjb3JkaW5nJywgPT4gQHRvZ2dsZVJlY29yZCgpXG5cbiAgICAjIFNob3dzIHRoZSB2aWV3IGluIEBjb250ZW50UmVnaW9uXG4gICAgQGNvbnRlbnRSZWdpb24uc2hvdyBAZWRpdG9yVmlld1xuXG4gICMgb25DbGVhclxuICAjIEVtcHRpZXMgdGhlIE1hY3JvQ29sbGVjdGlvblxuICAjIFRPRE8gLSB1bmRvIGJ1dHRvbj9cbiAgb25DbGVhcjogLT5cblxuICAgICMgU3RvcHMgUmVjb3JkaW5nXG4gICAgQHN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyBFbXB0aWVzIHRoZSBNYWNyb0NvbGxlY3Rpb25cbiAgICBAbWFjcm9zLnJlc2V0KClcbiAgICByZXR1cm5cblxuICAjIG9uU2F2ZVxuICBvblNhdmU6IC0+XG5cbiAgICAjIFN0b3BzIFJlY29yZGluZ1xuICAgIEBzdG9wUmVjb3JkaW5nKClcblxuICAgICMgU2VyaWFsaXplcyBkYXRhIGZyb20gYW55IGZvcm0gZWxlbWVudHMgaW4gdGhpcyB2aWV3XG4gICAgZGF0YSA9IEJhY2tib25lLlN5cGhvbi5zZXJpYWxpemUoQClcblxuICAgICMgQ2xlYXIgdW51c2VkIHR5cGUtc3BlY2lmaWMgYXR0cmlidXRlc1xuICAgIGRhdGEubWFjcm9zID0gW10gaWYgZGF0YS50eXBlICE9ICdtYWNybydcbiAgICBkYXRhLnRleHRfdmFsdWUgPSAnJyBpZiBkYXRhLnR5cGUgIT0gJ3RleHQnXG5cbiAgICAjIEFwcGxpZXMgdGhlIGF0dHJpYnV0ZXMgdG8gdGhlIGNvbmZpZyBtb2RlbFxuICAgIEBtb2RlbC5nZXQoJ2NvbmZpZycpLnNldChkYXRhKVxuXG4gICAgIyBUcmlnZ2VycyBjaGFuZ2UgZXZlbnQgb24gQG1vZGVsIHRvIHJlLXJlbmRlciB0aGUgY3VycmVudGx5IGhpZGRlbiBBc3Ryb0tleSBlbGVtZW50XG4gICAgQG1vZGVsLnRyaWdnZXIoJ2NvbmZpZzp1cGRhdGVkJylcblxuICAgICMgU0VORFMgVE8gREVWSUNFIChJRiBBVkFJTEFCTEUpXG4gICAgIyBUT0RPIC0gdGhpcyBpcyBhIEhBQ0tLS0tLS0tcbiAgICAjIGlmIHdpbmRvdy5kXG4gICAgaWYgdHJ1ZSAjIFRPRE8gLSByZW1vdmUgdHJ1ZVxuXG4gICAgICBjb25zb2xlLmxvZyAnSEFTIERFVklDRSAtIFNFTkQgVE8gREVWSUNFJ1xuXG4gICAgICBjb25zb2xlLmxvZyBAbW9kZWxcbiAgICAgIGNvbnNvbGUubG9nIEBtb2RlbC5nZXQoJ29yZGVyJylcblxuICAgICAgIyBHZXRzIHRoZSBtYWNyb0luZGV4XG4gICAgICBtYWNyb0luZGV4ID0gQG1vZGVsLmdldCgnb3JkZXInKVxuXG4gICAgICAjIGNvbnNvbGUubG9nIEBtYWNyb3MudG9KU09OKClcblxuICAgICAgIyBEYXRhIGZvciBhcnJheSBidWZmZXJcbiAgICAgIGRhdGEgPSBbXVxuXG4gICAgICAjIEl0ZXJhdGVzIG92ZXIgZWFjaCBtYWNyb1xuICAgICAgXy5lYWNoKEBtYWNyb3MubW9kZWxzLCAobWFjcm8pID0+XG4gICAgICAgIGNvbnNvbGUubG9nICdFQUNIIE1BQ1JPJ1xuICAgICAgICBjb25zb2xlLmxvZyBtYWNyby5nZXRLZXlEYXRhKClcbiAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KG1hY3JvLmdldEtleURhdGEoKSlcbiAgICAgIClcblxuICAgICAgY29uc29sZS5sb2cgZGF0YVxuXG4gICAgICAjIHdJbmRleCAtIFJlcXVlc3QgdHlwZSAoMHgwMSBmb3Igc2V0IG1hY3JvKVxuICAgICAgIyB3VmFsdWUgLSBNYWNybyBpbmRleCAoMCAtIDQgaW5jbHVzaXZlKVxuICAgICAgIyBiUmVxdWVzdCAtIDMgKGhhcmRjb2RlZClcbiAgICAgICMgd0xlbmd0aCAtIG51bWJlciBvZiBieXRlcyAoc2hvdWxkIGJlIG1hY3JvIGxlbmd0aCAqIDIpXG5cbiAgICAgIHJldHVybiBAdHJpZ2dlcignc2F2ZScpIHVubGVzcyB3aW5kb3cuZFxuXG4gICAgICByZXF1ZXN0T2JqID0ge1xuICAgICAgICAgICdyZXF1ZXN0VHlwZSc6ICd2ZW5kb3InLFxuICAgICAgICAgICdyZWNpcGllbnQnOiAnZGV2aWNlJyxcbiAgICAgICAgICAncmVxdWVzdCc6IDB4MDMsXG4gICAgICAgICAgJ3ZhbHVlJzogbWFjcm9JbmRleCxcbiAgICAgICAgICAnaW5kZXgnOiAweDAxXG4gICAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2cgcmVxdWVzdE9ialxuXG4gICAgICBkLmNvbnRyb2xUcmFuc2Zlck91dChyZXF1ZXN0T2JqLCBuZXcgVWludDhBcnJheShkYXRhKS5idWZmZXIpLnRoZW4gKHJlc3BvbnNlKSA9PlxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgcmV0dXJuIEB0cmlnZ2VyICdzYXZlJ1xuXG4gICAgZWxzZVxuXG4gICAgICAjIFRyaWdnZXJzICdzYXZlJyBldmVudCwgY2xvc2luZyB0aGlzIHZpZXdcbiAgICAgICMgVE9ETyAtIHRoaXMgaXMgZHVtbXlcbiAgICAgIHJldHVybiBAdHJpZ2dlciAnc2F2ZSdcblxuICAjIG9uQ2FuY2VsXG4gIG9uQ2FuY2VsOiAtPlxuXG4gICAgIyBTdG9wcyBSZWNvcmRpbmdcbiAgICBAc3RvcFJlY29yZGluZygpXG5cbiAgICAjIFJlc2V0cyBjb25maWcgYXR0cmlidXRlc1xuICAgIEBtb2RlbC5nZXQoJ2NvbmZpZycpLnNldChAY2FjaGVkQ29uZmlnKVxuXG4gICAgIyBUcmlnZ2VycyAnY2FuY2VsJyBldmVudCwgY2xvc2luZyB0aGlzIHZpZXdcbiAgICByZXR1cm4gQHRyaWdnZXIgJ2NhbmNlbCdcblxuICAjIGxvYWRFeGFtcGxlXG4gICMgRW1wdGllcyBvdXQgdGhlIE1hY3JvQ29sbGVjaW9uIGFuZCBsb2FkcyBhbiBleGFtcGxlIG1hY3JvXG4gIGxvYWRFeGFtcGxlOiAoZSkgLT5cblxuICAgICMgU3RvcHMgUmVjb3JkaW5nXG4gICAgQHN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyBDYWNoZXMgY2xpY2tlZCBlbFxuICAgIGVsID0gJChlLmN1cnJlbnRUYXJnZXQpXG5cbiAgICAjIEdldHMgdGhlIElEIG9mIHRoZSBleGFtcGxlIHRvIGxvYWRcbiAgICBleGFtcGxlX2lkID0gZWwuZGF0YSgnZXhhbXBsZScpXG5cbiAgICAjIEludm9rZXMgdGhlIGxvYWRFeGFtcGxlIG1ldGhvZCBvbiB0aGUgTWFjcm9Db2xsZWN0aW9uXG4gICAgcmV0dXJuIEBtYWNyb3MubG9hZEV4YW1wbGUoZXhhbXBsZV9pZClcblxuICAjIHRvZ2dsZVJlY29yZFxuICAjIFRvZ2dsZXMgd2V0aGVyIG9yIG5vdCB0aGUgdXNlcidzIGtleWJvYXJkIGlzIHJlY29yZGluZyBrZXlzdHJva2VzXG4gIHRvZ2dsZVJlY29yZDogKGUpIC0+XG4gICAgcmV0dXJuIEBzdG9wUmVjb3JkaW5nKCkgaWYgQGlzUmVjb3JkaW5nXG4gICAgQHN0YXJ0UmVjb3JkaW5nKClcblxuICAjIHN0b3BSZWNvcmRpbmdcbiAgc3RvcFJlY29yZGluZzogLT5cblxuICAgICMgU2V0cyBAaXNSZWNvcmRpbmcgZmxhZ1xuICAgIEBpc1JlY29yZGluZyA9IGZhbHNlXG5cbiAgICAjIFVwZGF0ZXMgdGhlIEVkaXRvclZpZXcgaW5zdGFuY2UgdG8gaWdub3JlIGtleWJvYXJkIGlucHV0XG4gICAgQGVkaXRvclZpZXcua2V5Ym9hcmRTZWxlY3Rvcj8uY3VycmVudC5zdG9wUmVjb3JkaW5nKClcblxuICAgICMgVXBkYXRlcyB0aGUgQHVpLnJlY29yZEJ0biBlbGVtZW50XG4gICAgQHVpLnJlY29yZEJ0bi5yZW1vdmVDbGFzcygnYWN0aXZlJykuZmluZCgnaScpLnJlbW92ZUNsYXNzKCdmYS1zcGluIGZhLWNpcmNsZS1vLW5vdGNoJykuYWRkQ2xhc3MoJ2ZhLWNpcmNsZScpXG5cbiAgIyBzdGFydFJlY29yZGluZ1xuICBzdGFydFJlY29yZGluZzogLT5cblxuICAgICMgRW1wdHkgbWFjcm9zXG4gICAgQG1hY3Jvcy5yZXNldCgpXG5cbiAgICAjIFNldHMgQGlzUmVjb3JkaW5nIGZsYWdcbiAgICBAaXNSZWNvcmRpbmcgPSB0cnVlXG5cbiAgICAjIFVwZGF0ZXMgdGhlIEVkaXRvclZpZXcgaW5zdGFuY2UgdG8gYWxsb3cga2V5Ym9hcmQgaW5wdXRcbiAgICBAZWRpdG9yVmlldy5rZXlib2FyZFNlbGVjdG9yPy5jdXJyZW50LnN0YXJ0UmVjb3JkaW5nKClcblxuICAgICMgVXBkYXRlcyB0aGUgQHVpLnJlY29yZEJ0biBlbGVtZW50XG4gICAgQHVpLnJlY29yZEJ0bi5hZGRDbGFzcygnYWN0aXZlJykuZmluZCgnaScpLmFkZENsYXNzKCdmYS1zcGluIGZhLWNpcmNsZS1vLW5vdGNoJykucmVtb3ZlQ2xhc3MoJ2ZhLWNpcmNsZScpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvcldyYXBwZXJcblxuXG5cbiIsIlxuY2xhc3MgS2V5Q2hpbGQgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnYnRuIGJ0bi1vdXRsaW5lLWxpZ2h0IGtleS0tY2hpbGQgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIG14LTInXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9rZXlfY2hpbGQnKVxuXG4gIGJlaGF2aW9yczpcbiAgICBTZWxlY3RhYmxlQ2hpbGQ6IHsgZGVzZWxlY3Q6IHRydWUgfVxuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdjb25maWc6dXBkYXRlZCc6ICdvbk1vZGVsQ2hhbmdlJ1xuXG4gIG9uTW9kZWxDaGFuZ2U6IC0+XG4gICAgcmV0dXJuIEByZW5kZXIoKVxuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cblxuICAgICMgSXNvbGF0ZXMgQXN0cm9LZXlDb25maWcgbW9kZWxcbiAgICBjb25maWcgPSBAbW9kZWwuZ2V0KCdjb25maWcnKVxuXG4gICAgIyBNYWNyb1xuICAgIGlmIGNvbmZpZy5nZXQoJ3R5cGUnKSA9PSAnbWFjcm8nXG4gICAgICByZXR1cm4geyBsYWJlbDogJ01hY3JvJyB9XG5cbiAgICAjIFRleHRcbiAgICBpZiBjb25maWcuZ2V0KCd0eXBlJykgPT0gJ3RleHQnXG4gICAgICByZXR1cm4geyBsYWJlbDogJ1RleHQnIH1cblxuICAgICMgS2V5XG4gICAgIyBUT0RPIC0gRElTUExBWSBLRVkgSU4gVklFV1xuICAgIGlmIGNvbmZpZy5nZXQoJ3R5cGUnKSA9PSAna2V5J1xuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdLZXknIH1cblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleVNlbGVjdG9yIGV4dGVuZHMgTW4uQ29sbGVjdGlvblZpZXdcbiAgdGFnTmFtZTogJ3VsJ1xuICBjbGFzc05hbWU6ICdsaXN0LXVuc3R5bGVkIGtleS0tbGlzdCBweC00IHB5LTMgbXktMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gYWxpZ24taXRlbXMtY2VudGVyIGZsZXgtcm93J1xuICBjaGlsZFZpZXc6IEtleUNoaWxkXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleVNlbGVjdG9yXG5cblxuIiwiRGV2aWNlTGF5b3V0ID0gcmVxdWlyZSgnLi9kZXZpY2VMYXlvdXQnKVxuRWRpdG9yU2VsZWN0b3IgPSByZXF1aXJlKCcuL2VkaXRvclNlbGVjdG9yJylcbkVkaXRvcldyYXBwZXIgPSByZXF1aXJlKCcuL2VkaXRvcldyYXBwZXInKVxuXG4jICMgIyAjICNcblxuY2xhc3MgSGVscFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2hlbHBfdmlldydcbiAgY2xhc3NOYW1lOiAncm93J1xuXG4jICMgIyAjICNcblxuY2xhc3MgTGF5b3V0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvbGF5b3V0J1xuICBjbGFzc05hbWU6ICdjb250YWluZXItZmx1aWQgZC1mbGV4IGZsZXgtY29sdW1uIHctMTAwIGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIGRldmljZS0tbGF5b3V0J1xuXG4gIHJlZ2lvbnM6XG4gICAgZGV2aWNlUmVnaW9uOiAgICdbZGF0YS1yZWdpb249ZGV2aWNlXSdcbiAgICBzZWxlY3RvclJlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1zZWxlY3Rvcl0nXG4gICAgZWRpdG9yUmVnaW9uOiAgICdbZGF0YS1yZWdpb249ZWRpdG9yXSdcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgRGlzcGxheXMgZGVmYXVsdCBoZWxwIHRleHRcbiAgICBAc2hvd0hlbHBWaWV3KClcblxuICAgICMgSW5zdGFudGlhdGVzIGEgbmV3IERldmljZUxheW91dCBmb3IgY29ubmVjdGluZyB0byBhbiBBc3Ryb0tleVxuICAgICMgYW5kIHNlbGVjdGluZyB3aGljaCBrZXkgdGhlIHVzZXIgd291bGQgbGlrZSB0byBlZGl0XG4gICAgZGV2aWNlVmlldyA9IG5ldyBEZXZpY2VMYXlvdXQoeyBtb2RlbDogQG1vZGVsIH0pXG4gICAgZGV2aWNlVmlldy5vbiAna2V5OnNlbGVjdGVkJywgKGtleU1vZGVsKSA9PiBAc2hvd0VkaXRvclNlbGVjdG9yKGtleU1vZGVsKVxuICAgIGRldmljZVZpZXcub24gJ2tleTpkZXNlbGVjdGVkJywgKCkgPT4gQHNob3dIZWxwVmlldygpXG4gICAgQGRldmljZVJlZ2lvbi5zaG93KGRldmljZVZpZXcpXG5cbiAgICAjIE1hY3JvIERldmVsb3BtZW50IGhhY2tcbiAgICAjIHNldFRpbWVvdXQoID0+XG4gICAgIyAgIEBzaG93RWRpdG9yVmlldyhAbW9kZWwuZ2V0KCdrZXlzJykuZmlyc3QoKSwgJ21hY3JvJylcbiAgICAjICwgMTAwMClcbiAgICAjIEBzaG93RWRpdG9yVmlldyhAbW9kZWwuZ2V0KCdrZXlzJykuZmlyc3QoKSwgJ21hY3JvJylcblxuICBzaG93SGVscFZpZXc6IC0+XG5cbiAgICAjIEluc3RhbnRpYXRlcyBhIG5ldyBIZWxwVmlldyBhbmQgc2hvd3MgaXQgaW4gQHNlbGVjdG9yUmVnaW9uXG4gICAgQHNlbGVjdG9yUmVnaW9uLnNob3cgbmV3IEhlbHBWaWV3KClcblxuICBzaG93RWRpdG9yU2VsZWN0b3I6IChrZXlNb2RlbCkgLT5cblxuICAgICMgSW5zdGFudGFpYXRlcyBuZXcgRWRpdG9yU2VsZWN0b3Igdmlld1xuICAgIGVkaXRvclNlbGVjdG9yID0gbmV3IEVkaXRvclNlbGVjdG9yKHsgbW9kZWw6IGtleU1vZGVsIH0pXG5cbiAgICAjIFNob3dzIE1hY3JvIEVkaXRvclxuICAgIGVkaXRvclNlbGVjdG9yLm9uICdzaG93Om1hY3JvOmVkaXRvcicsID0+IEBzaG93RWRpdG9yVmlldyhrZXlNb2RlbCwgJ21hY3JvJylcblxuICAgICMgU2hvd3MgVGV4dCBFZGl0b3JcbiAgICBlZGl0b3JTZWxlY3Rvci5vbiAnc2hvdzp0ZXh0OmVkaXRvcicsID0+IEBzaG93RWRpdG9yVmlldyhrZXlNb2RlbCwgJ3RleHQnKVxuXG4gICAgIyBTaG93cyBLZXkgRWRpdG9yXG4gICAgZWRpdG9yU2VsZWN0b3Iub24gJ3Nob3c6a2V5OmVkaXRvcicsID0+IEBzaG93RWRpdG9yVmlldyhrZXlNb2RlbCwgJ2tleScpXG5cbiAgICAjIFNob3dzIHRoZSBFZGl0b3JTZWxlY3RvciB2aWV3XG4gICAgQHNlbGVjdG9yUmVnaW9uLnNob3coZWRpdG9yU2VsZWN0b3IpXG5cbiAgc2hvd0VkaXRvclZpZXc6IChrZXlNb2RlbCwgZWRpdG9yKSAtPlxuICAgIEAkZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAjIFJlYWRzIG1hY3JvIGZyb20gZGV2aWNlXG4gICAga2V5TW9kZWwucmVhZE1hY3JvKCkudGhlbiggKG1hY3JvcykgPT5cbiAgICAgIGNvbnNvbGUubG9nICdQQVJTRUQgTUFDUk9TJ1xuICAgICAgY29uc29sZS5sb2cgbWFjcm9zXG4gICAgKVxuXG4gICAgIyBJbnN0YW50aWF0ZXMgbmV3IEVkaXRvcldyYXBwZXIgdmlld1xuICAgIGVkaXRvcldyYXBwZXIgPSBuZXcgRWRpdG9yV3JhcHBlcih7IG1vZGVsOiBrZXlNb2RlbCwgZWRpdG9yOiBlZGl0b3IgfSlcblxuICAgICMgSGFuZGxlcyAnY2FuY2VsJyBldmVudFxuICAgIGVkaXRvcldyYXBwZXIub24gJ2NhbmNlbCcsID0+XG4gICAgICBAJGVsLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuXG4gICAgIyBIYW5kbGVzICdzYXZlJyBldmVudFxuICAgIGVkaXRvcldyYXBwZXIub24gJ3NhdmUnLCA9PlxuICAgICAgIyBUT0RPIC0gaGl0IHRoZSBLZXlNb2RlbCAvIERldmljZU1vZGVsIHRvIGRvIHRoZSByZXN0IGZyb20gaGVyZVxuICAgICAgQCRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICMgU2hvd3MgdGhlIEVkaXRvcldyYXBwZXIgdmlldyBpbiBAZWRpdG9yUmVnaW9uXG4gICAgQGVkaXRvclJlZ2lvbi5zaG93KGVkaXRvcldyYXBwZXIpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IExheW91dFZpZXdcblxuXG5cbiIsIktleWJvYXJkU2VsZWN0b3IgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3InKVxuTWFjcm9MaXN0ID0gcmVxdWlyZSgnLi9tYWNyb0xpc3QnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9FZGl0b3IgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL21hY3JvX2VkaXRvcidcbiAgY2xhc3NOYW1lOiAncm93IGgtMTAwJ1xuXG4gIHJlZ2lvbnM6XG4gICAgbWFjcm9SZWdpb246ICAgICdbZGF0YS1yZWdpb249bWFjcm9dJ1xuICAgIGNvbnRyb2xzUmVnaW9uOiAnW2RhdGEtcmVnaW9uPWNvbnRyb2xzXSdcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgR2V0cyB0aGUgY3VycmVudCBtYWNybyBhc3NpZ25lZCB0byB0aGUga2V5TW9kZWxcbiAgICAjIG1hY3JvQ29sbGVjdGlvbiA9IGtleU1vZGVsLmdldE1hY3JvQ29sbGVjdGlvbigpXG4gICAgQG1hY3JvUmVnaW9uLnNob3cgbmV3IE1hY3JvTGlzdCh7IGNvbGxlY3Rpb246IEBvcHRpb25zLm1hY3JvcyB9KVxuXG4gICAgIyBJbnN0YW50YWlhdGVzIG5ldyBLZXlib2FyZFNlbGVjdG9yXG4gICAgIyBUT0RPIC0gdGhpcyB3aWxsICpldmVudHVhbGx5KiBkaXNwbGF5IGEgc2VsZWN0b3IgYmV0d2VlbiBkaWZmZXJlbnQgdHlwZXMgb2Yga2V5Ym9hcmRzIC8gc2V0cyBvZiBrZXlzXG4gICAgQGtleWJvYXJkU2VsZWN0b3IgPSBuZXcgS2V5Ym9hcmRTZWxlY3Rvcih7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSlcblxuICAgICMgQnViYmxlcyB1cCBzdG9wOnJlY29yZGluZyBldmVudFxuICAgIEBrZXlib2FyZFNlbGVjdG9yLm9uICdzdG9wOnJlY29yZGluZycsID0+IEB0cmlnZ2VyICdzdG9wOnJlY29yZGluZydcblxuICAgICMgSGFuZGxlcyBLZXlTZWxlY3Rpb24gZXZlbnRcbiAgICBAa2V5Ym9hcmRTZWxlY3Rvci5vbiAna2V5OnNlbGVjdGVkJywgKGtleSkgPT5cblxuICAgICAgIyBDbG9uZXMgdGhlIG9yaWdpbmFsIG9iamVjdFxuICAgICAga2V5ID0gXy5jbG9uZShrZXkpXG5cbiAgICAgICMgQWRkcyB0aGUgY29ycmVjdCBgb3JkZXJgIGF0dHJpYnV0ZVxuICAgICAga2V5Lm9yZGVyID0gQG9wdGlvbnMubWFjcm9zLmxlbmd0aCArIDFcblxuICAgICAgIyBBZGRzIHRoZSBrZXkgdG8gdGhlIE1hY3JvQ29sbGVjdGlvblxuICAgICAgQG9wdGlvbnMubWFjcm9zLmFkZChrZXkpXG5cbiAgICAjIFNob3dzIHRoZSBrZXlib2FyZFZpZXdcbiAgICBAY29udHJvbHNSZWdpb24uc2hvdyBAa2V5Ym9hcmRTZWxlY3RvclxuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG4gICAgQGtleWJvYXJkVmlldy5zdGFydFJlY29yZGluZygpXG5cbiAgIyBzdG9wUmVjb3JkaW5nXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG4gICAgQGtleWJvYXJkVmlldy5zdG9wUmVjb3JkaW5nKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWFjcm9FZGl0b3JcblxuXG5cbiIsIlxuY2xhc3MgTWFjcm9DaGlsZCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGFnTmFtZTogJ2xpJ1xuICBjbGFzc05hbWU6ICdtYWNyby0tY2hpbGQgZmxleC1jb2x1bW4ganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgbXktMidcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL21hY3JvX2NoaWxkJylcblxuICBiZWhhdmlvcnM6XG4gICAgU29ydGFibGVDaGlsZDoge31cbiAgICAjIFRvb2x0aXBzOiB7fVxuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdjaGFuZ2U6cG9zaXRpb24nOiAgJ3JlbmRlcidcbiAgICAnY2hhbmdlOnNoaWZ0ZWQnOiAgICdyZW5kZXInXG5cbiAgIyB1aTpcbiAgIyAgIHRvb2x0aXA6ICdbZGF0YS10b2dnbGU9dG9vbHRpcF0nXG5cbiAgZXZlbnRzOlxuICAgICdkcmFnJzogJ29uRHJhZydcbiAgICAnZHJhZ3N0YXJ0JzogJ29uRHJhZ1N0YXJ0J1xuICAgICdtb3VzZW92ZXIgLmtleSc6ICdvbk1vdXNlT3ZlcidcbiAgICAnbW91c2VvdXQgLmtleSc6ICdvbk1vdXNlT3V0J1xuICAgICdjbGljayAua2V5JzogJ3JlbW92ZU1hY3JvJ1xuICAgICdjbGljayBbZGF0YS1wb3NpdGlvbl06bm90KC5hY3RpdmUpJzogJ29uUG9zaXRpb25DbGljaydcblxuICAjIHN0YXRlOiB7XG4gICMgICB0b29sdGlwT25SZW5kZXI6IGZhbHNlXG4gICMgfVxuXG4gICMgb25SZW5kZXI6IC0+XG4gICMgICByZXR1cm4gdW5sZXNzIEBzdGF0ZS50b29sdGlwT25SZW5kZXJcblxuICAjICAgIyBVbnNldHMgdG9vbHRpcCBmbGFnXG4gICMgICBAc3RhdGUudG9vbHRpcE9uUmVuZGVyID0gZmFsc2VcblxuICAjICAgIyBTaG93cyB0aGUgdG9vbHRpcFxuICAjICAgQHVpLnRvb2x0aXAudG9vbHRpcCgnc2hvdycpXG5cbiAgb25Nb3VzZU92ZXI6IC0+XG4gICAgQCRlbC5hZGRDbGFzcygnaG92ZXJlZCcpXG5cbiAgb25Nb3VzZU91dDogLT5cbiAgICBAJGVsLnJlbW92ZUNsYXNzKCdob3ZlcmVkJylcblxuICBvbkRyYWdTdGFydDogLT5cbiAgICBAJGVsLmFkZENsYXNzKCdkcmFnLXN0YXJ0JylcblxuICBvbkRyYWc6IC0+XG4gICAgQCRlbC5yZW1vdmVDbGFzcygnZHJhZy1zdGFydCBob3ZlcmVkJylcbiAgICBAJGVsLnNpYmxpbmdzKCcubWFjcm8tLWNoaWxkJykucmVtb3ZlQ2xhc3MoJ2RyYWctc3RhcnQgaG92ZXJlZCcpXG5cbiAgcmVtb3ZlTWFjcm86IC0+XG4gICAgIyBjb25zb2xlLmxvZyBAbW9kZWxcbiAgICAjIEBtb2RlbC5zZXQoJ3NoaWZ0ZWQnLCAhQG1vZGVsLmdldCgnc2hpZnRlZCcpKVxuICAgIEBtb2RlbC5jb2xsZWN0aW9uLnJlbW92ZShAbW9kZWwpXG5cbiAgb25Qb3NpdGlvbkNsaWNrOiAoZSkgLT5cblxuICAgICMgRGlzcGxheXMgdGhlIHRvb2x0aXAgYWZ0ZXIgdGhlIHZpZXcgcmUtcmVuZGVyc1xuICAgICMgQHN0YXRlLnRvb2x0aXBPblJlbmRlciA9IHRydWVcblxuICAgICMgQ2xlYXJzIGFjdGl2ZSB0b29sdGlwc1xuICAgICMgQGNsZWFyVG9vbHRpcHMoKVxuXG4gICAgIyBDYWNoZXMgY2xpY2tlZCBlbFxuICAgIGVsID0gJChlLmN1cnJlbnRUYXJnZXQpXG5cbiAgICAjIElzb2xhdGVzIHBvc2l0aW9uIGRhdGEgZnJvbSBlbGVtZW50XG4gICAgcG9zaXRpb24gPSBlbC5kYXRhKCdwb3NpdGlvbicpXG5cbiAgICAjIERldGVybWluZXMgbmV4dCBwb3NpdGlvblxuICAgIGlmIHBvc2l0aW9uID09IC0xXG4gICAgICBuZXdfcG9zaXRpb24gPSAxXG4gICAgaWYgcG9zaXRpb24gPT0gMFxuICAgICAgbmV3X3Bvc2l0aW9uID0gLTFcbiAgICBpZiBwb3NpdGlvbiA9PSAxXG4gICAgICBuZXdfcG9zaXRpb24gPSAwXG5cbiAgICAjIFNldHMgdGhlIHBvc2l0aW9uIGF0dHJpYnV0ZSBvbiB0aGUgbW9kZWxcbiAgICBAbW9kZWwuc2V0KCdwb3NpdGlvbicsIG5ld19wb3NpdGlvbilcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAgcG9zaXRpb25zID0gW1xuICAgICAgeyBwb3NpdGlvbjogLTEsIGNzczogJ2ZhLWxvbmctYXJyb3ctZG93bicsIHRvb2x0aXA6ICdLZXkgRG93bicgfVxuICAgICAgeyBwb3NpdGlvbjogMCwgY3NzOiAnZmEtYXJyb3dzLXYnLCB0b29sdGlwOiAnS2V5IERvd24gfCBVcCcgfVxuICAgICAgeyBwb3NpdGlvbjogMSwgY3NzOiAnZmEtbG9uZy1hcnJvdy11cCcsIHRvb2x0aXA6ICdLZXkgVXAnIH1cbiAgICBdXG5cbiAgICBwb3NpdGlvbiA9IEBtb2RlbC5nZXQoJ3Bvc2l0aW9uJylcbiAgICBhY3RpdmVfcG9zaXRpb24gPSBfLmZpbmRXaGVyZShwb3NpdGlvbnMsIHsgcG9zaXRpb246IHBvc2l0aW9uIH0pXG4gICAgcmV0dXJuIHsgYWN0aXZlX3Bvc2l0aW9uIH1cblxuIyAjICMgIyAjXG5cbmNsYXNzIE1hY3JvRW1wdHkgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnbWFjcm8tLWNoaWxkIGVtcHR5IGZsZXgtY29sdW1uIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIG15LTInXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9tYWNyb19lbXB0eScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBNYWNyb0xpc3QgZXh0ZW5kcyBNbi5Db2xsZWN0aW9uVmlld1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ2xpc3QtdW5zdHlsZWQgbWFjcm8tLWxpc3QgcHgtNCBteS0yIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBmbGV4LXJvdyBmbGV4LXdyYXAnXG4gIGNoaWxkVmlldzogTWFjcm9DaGlsZFxuICBlbXB0eVZpZXc6IE1hY3JvRW1wdHlcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgU29ydHMgdGhlIGNvbGxlY3Rpb25cbiAgICBAY29sbGVjdGlvbi5zb3J0KClcblxuICAgICMgSW5pdGlhbGl6ZXMgU29ydGFibGUgY29udGFpbmVyXG4gICAgU29ydGFibGUuY3JlYXRlIEBlbCxcbiAgICAgIGFuaW1hdGlvbjogICAgMTUwXG4gICAgICBoYW5kbGU6ICAgICAgICcua2V5J1xuICAgICAgZ2hvc3RDbGFzczogICAnZ2hvc3QnICAjIENsYXNzIG5hbWUgZm9yIHRoZSBkcm9wIHBsYWNlaG9sZGVyXG4gICAgICBjaG9zZW5DbGFzczogICdjaG9zZW4nICAjIENsYXNzIG5hbWUgZm9yIHRoZSBjaG9zZW4gaXRlbVxuICAgICAgZHJhZ0NsYXNzOiAgICAnZHJhZycgICMgQ2xhc3MgbmFtZSBmb3IgdGhlIGRyYWdnaW5nIGl0ZW1cbiAgICAgICMgZ3JvdXA6XG4gICAgICAjICAgbmFtZTogJ21hY3JvJ1xuICAgICAgIyAgIHB1bGw6IGZhbHNlXG4gICAgICAjICAgcHV0OiAgdHJ1ZVxuICAgICAgZmFsbGJhY2tUb2xlcmFuY2U6IDEwMFxuICAgICAgb25FbmQ6IChlKSA9PiBAcmVvcmRlckNvbGxlY3Rpb24oKVxuXG4gICMgcmVvcmRlckNvbGxlY3Rpb25cbiAgIyBJbnZva2VkIGFmdGVyIHNvcnRpbmcgaGFzIGNvbXBsZXRlZFxuICByZW9yZGVyQ29sbGVjdGlvbjogPT5cblxuICAgICMgVHJpZ2dlcnMgb3JkZXIgZXZlbnRzIG9uIENvbGxlY3Rpb25WaWV3IGNoaWxkVmlldyAkZWxzXG4gICAgb3JkZXIgPSAxXG4gICAgZm9yIGVsIGluIEBlbC5jaGlsZHJlblxuICAgICAgJChlbCkudHJpZ2dlcignc29ydGVkJyxvcmRlcilcbiAgICAgIG9yZGVyKytcblxuICAgICMgQGNvbGxlY3Rpb24uc29ydCgpXG4gICAgQHJlbmRlcigpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hY3JvTGlzdFxuXG5cbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGNvbm5lY3RlZCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIG1iLTRcXFwiPlwiKTtcbmlmICggY29ubmVjdGVkKVxue1xuYnVmLnB1c2goXCI8YnV0dG9uIGRhdGEtY2xpY2s9XFxcImRpc2Nvbm5lY3RcXFwiIGNsYXNzPVxcXCJidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtdGltZXMgbXItMVxcXCI+PC9pPkRJU0NPTk5FQ1Q8L2J1dHRvbj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxidXR0b24gZGF0YS1jbGljaz1cXFwiY29ubmVjdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnlcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS11c2IgbXItMVxcXCI+PC9pPkNPTk5FQ1Q8L2J1dHRvbj5cIik7XG59XG5idWYucHVzaChcIjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcImtleXNcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyXFxcIj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJjb25uZWN0ZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNvbm5lY3RlZDp0eXBlb2YgY29ubmVjdGVkIT09XCJ1bmRlZmluZWRcIj9jb25uZWN0ZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobGFiZWwpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3cgZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlclxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEwXFxcIj48cCBjbGFzcz1cXFwibGVhZCBtYi0wXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGxhYmVsKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3A+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTIgdGV4dC1yaWdodCB0ZXh0LW11dGVkXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtcGVuY2lsXFxcIj48L2k+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibGFiZWxcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmxhYmVsOnR5cGVvZiBsYWJlbCE9PVwidW5kZWZpbmVkXCI/bGFiZWw6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobmF2SXRlbXMsIHVuZGVmaW5lZCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBmbGV4LXJvdyBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGkgY2xhc3M9XFxcImQtZmxleCBmYSBmYS1mdyBmYS0yeCBmYS1hcnJvdy1jaXJjbGUtby1kb3duIG1yLTFcXFwiPjwvaT48cCBzdHlsZT1cXFwibGV0dGVyLXNwYWNpbmc6IDAuMjVyZW07IGZvbnQtd2VpZ2h0OiAyMDA7XFxcIiBjbGFzcz1cXFwiZC1mbGV4IGxlYWQgbS0wXFxcIj5TZWxlY3QgYW4gZWRpdG9yPC9wPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvdyBtdC01XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlwiKTtcbi8vIGl0ZXJhdGUgbmF2SXRlbXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbmF2SXRlbXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIlwiICsgKGphZGUuYXR0cihcInRpdGxlXCIsIG5hdkl0ZW0udGl0bGUsIHRydWUsIGZhbHNlKSkgKyBcIiBkYXRhLXBsYWNlbWVudD1cXFwiYm90dG9tXFxcIiBzdHlsZT1cXFwiZmxleC1ncm93OjE7XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEtdHJpZ2dlclwiLCBuYXZJdGVtLnRyaWdnZXIsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5hdHRyKFwiZGlzYWJsZWRcIiwgbmF2SXRlbS5kaXNhYmxlZCwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmNscyhbJ2QtZmxleCcsJ2J0bicsJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsJ2p1c3RpZnktY29udGVudC1jZW50ZXInLCdteC0zJyxuYXZJdGVtLmNzc10sIFtudWxsLG51bGwsbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbmF2SXRlbS50ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2J1dHRvbj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCJcIiArIChqYWRlLmF0dHIoXCJ0aXRsZVwiLCBuYXZJdGVtLnRpdGxlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1wbGFjZW1lbnQ9XFxcImJvdHRvbVxcXCIgc3R5bGU9XFxcImZsZXgtZ3JvdzoxO1xcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLXRyaWdnZXJcIiwgbmF2SXRlbS50cmlnZ2VyLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuYXR0cihcImRpc2FibGVkXCIsIG5hdkl0ZW0uZGlzYWJsZWQsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydkLWZsZXgnLCdidG4nLCdidG4tb3V0bGluZS1zZWNvbmRhcnknLCdqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJywnbXgtMycsbmF2SXRlbS5jc3NdLCBbbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcIm5hdkl0ZW1zXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5uYXZJdGVtczp0eXBlb2YgbmF2SXRlbXMhPT1cInVuZGVmaW5lZFwiP25hdkl0ZW1zOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxkaXYgY2xhc3M9XFxcInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxidXR0b24gZGF0YS1jbGljaz1cXFwiY2FuY2VsXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1zZWNvbmRhcnkgbXgtMiBweC00XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtMnggbXgtNCBmYS1hbmdsZS1sZWZ0XFxcIj48L2k+PC9idXR0b24+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJzYXZlXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1zdWNjZXNzIG14LTIgcHgtNFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IG14LTQgZmEtY2hlY2stY2lyY2xlLW9cXFwiPjwvaT48L2J1dHRvbj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcImNsZWFyXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS13YXJuaW5nIG14LTIgcHgtNFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IG14LTQgZmEtdGltZXNcXFwiPjwvaT48L2J1dHRvbj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcInJlY29yZFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtZGFuZ2VyIG14LTIgcHgtNFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IG14LTQgZmEtY2lyY2xlXFxcIj48L2k+PC9idXR0b24+PGRpdiBjbGFzcz1cXFwiYnRuLWdyb3VwXFxcIj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS10b2dnbGU9XFxcImRyb3Bkb3duXFxcIiBhcmlhLWhhc3BvcHVwPVxcXCJ0cnVlXFxcIiBhcmlhLWV4cGFuZGVkPVxcXCJmYWxzZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtcHJpbWFyeSBkcm9wZG93bi10b2dnbGUgbXgtMiBweC00XFxcIj5FeGFtcGxlczwvYnV0dG9uPjxkaXYgY2xhc3M9XFxcImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1yaWdodCBtdC0zXFxcIj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1leGFtcGxlPVxcXCJleF8wMVxcXCIgY2xhc3M9XFxcImRyb3Bkb3duLWl0ZW1cXFwiPkV4LiAxOiBcXFwiSGVsbG8hXFxcIjwvYnV0dG9uPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWV4YW1wbGU9XFxcImV4XzAyXFxcIiBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+RXguIDI6IFxcXCJSZXN1bcOoXFxcIjwvYnV0dG9uPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWV4YW1wbGU9XFxcImV4XzAzXFxcIiBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+RXguIDM6IEVtIERhc2ggKOKAlCk8L2J1dHRvbj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1leGFtcGxlPVxcXCJleF8wNFxcXCIgY2xhc3M9XFxcImRyb3Bkb3duLWl0ZW1cXFwiPkV4LiA0OiBDVFJMICsgQUxUICsgREVMRVRFPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48aHIvPjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcImNvbnRlbnRcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBmbGV4LXJvdyBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGkgY2xhc3M9XFxcImQtZmxleCBmYSBmYS1mdyBmYS0yeCBmYS1xdWVzdGlvbi1jaXJjbGUtbyBtci0xXFxcIj48L2k+PHAgc3R5bGU9XFxcImxldHRlci1zcGFjaW5nOiAwLjI1cmVtOyBmb250LXdlaWdodDogMjAwO1xcXCIgY2xhc3M9XFxcImQtZmxleCBsZWFkIG0tMFxcXCI+Q2xpY2sgYSBrZXkgdG8gZWRpdDwvcD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3cgbXQtNVxcXCI+PGRpdiBzdHlsZT1cXFwib3BhY2l0eTowXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj48YnV0dG9uIGRpc2FibGVkPVxcXCJkaXNhYmxlZFxcXCIgc3R5bGU9XFxcImZsZXgtZ3JvdzoxO1xcXCIgY2xhc3M9XFxcImQtZmxleCBidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IGp1c3RpZnktY29udGVudC1jZW50ZXIgbXgtM1xcXCI+QkxBTks8L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobGFiZWwpIHtcbmJ1Zi5wdXNoKFwiPHNwYW4+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBsYWJlbCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zcGFuPlwiKTt9LmNhbGwodGhpcyxcImxhYmVsXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5sYWJlbDp0eXBlb2YgbGFiZWwhPT1cInVuZGVmaW5lZFwiP2xhYmVsOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvdyBoLTEwMCB3LTEwMCBlZGl0b3ItLW92ZXJsYXlcXFwiPjxkaXYgZGF0YS1yZWdpb249XFxcImVkaXRvclxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBwdC0yXFxcIj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3cgZGV2aWNlLS1vdmVybGF5XFxcIj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJkZXZpY2VcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcInNlbGVjdG9yXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyIHB0LTVcXFwiPjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChhY3RpdmVfcG9zaXRpb24sIGFscGhhLCBjc3MsIGtleSwgc2hpZnRfa2V5LCBzaGlmdGVkLCBzcGVjaWFsKSB7XG5qYWRlX21peGluc1tcInBvc2l0aW9uU2VsZWN0XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPHNwYW4gZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiXCIgKyAoamFkZS5hdHRyKFwidGl0bGVcIiwgb3B0cy50b29sdGlwLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1wbGFjZW1lbnQ9XFxcImJvdHRvbVxcXCJcIiArIChqYWRlLmNscyhbJ2ZhLXN0YWNrJywnZmEtbGcnLCdwb3NpdGlvbi0tc2VsZWN0JyxgcG9zaXRpb25fJHtvcHRzLnBvc2l0aW9ufWBdLCBbbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1jaXJjbGUtdGhpbiBmYS1zdGFjay0yeFxcXCI+PC9pPjxpIGNsYXNzPVxcXCJmYSBmYS1zdGFjay0xeCBmYS1zdGFja1xcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWNpcmNsZS10aGluIGZhLXN0YWNrLTJ4IGZhLTJ4XFxcIj48L2k+PGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLXBvc2l0aW9uXCIsIG9wdHMucG9zaXRpb24sIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydmYScsJ2ZhLXN0YWNrLTF4JyxvcHRzLmNzc10sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT48L2k+PC9zcGFuPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXZcIiArIChqYWRlLmNscyhbJ2tleScsJ2QtZmxleCcsdHlwZW9mIHNwZWNpYWwgPT09IFwidW5kZWZpbmVkXCIgPyBcIlwiIDogXCJzcGVjaWFsXCJdLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48ZGl2XCIgKyAoamFkZS5jbHMoWydpbm5lcicsJ2NvbnRlbnQnLGNzc10sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggc2hpZnRlZCB8fCBzaGlmdF9rZXkgJiYgIWFscGhhKVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJzaGlmdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBzaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0ga2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0ga2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5idWYucHVzaChcIjwvZGl2PjxkaXYgY2xhc3M9XFxcImlubmVyIGhvdmVyXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtbGcgZmEtdGltZXNcXFwiPjwvaT48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJwb3NpdGlvbiBtdC0yXFxcIj5cIik7XG5qYWRlX21peGluc1tcInBvc2l0aW9uU2VsZWN0XCJdKGFjdGl2ZV9wb3NpdGlvbik7XG5idWYucHVzaChcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImFjdGl2ZV9wb3NpdGlvblwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguYWN0aXZlX3Bvc2l0aW9uOnR5cGVvZiBhY3RpdmVfcG9zaXRpb24hPT1cInVuZGVmaW5lZFwiP2FjdGl2ZV9wb3NpdGlvbjp1bmRlZmluZWQsXCJhbHBoYVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguYWxwaGE6dHlwZW9mIGFscGhhIT09XCJ1bmRlZmluZWRcIj9hbHBoYTp1bmRlZmluZWQsXCJjc3NcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNzczp0eXBlb2YgY3NzIT09XCJ1bmRlZmluZWRcIj9jc3M6dW5kZWZpbmVkLFwia2V5XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5rZXk6dHlwZW9mIGtleSE9PVwidW5kZWZpbmVkXCI/a2V5OnVuZGVmaW5lZCxcInNoaWZ0X2tleVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc2hpZnRfa2V5OnR5cGVvZiBzaGlmdF9rZXkhPT1cInVuZGVmaW5lZFwiP3NoaWZ0X2tleTp1bmRlZmluZWQsXCJzaGlmdGVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5zaGlmdGVkOnR5cGVvZiBzaGlmdGVkIT09XCJ1bmRlZmluZWRcIj9zaGlmdGVkOnVuZGVmaW5lZCxcInNwZWNpYWxcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnNwZWNpYWw6dHlwZW9mIHNwZWNpYWwhPT1cInVuZGVmaW5lZFwiP3NwZWNpYWw6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwidHlwZVxcXCIgdmFsdWU9XFxcIm1hY3JvXFxcIiByZWFkb25seT1cXFwicmVhZG9ubHlcXFwiLz48ZGl2IGRhdGEtcmVnaW9uPVxcXCJtYWNyb1xcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48aHIvPjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcImNvbnRyb2xzXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPHAgY2xhc3M9XFxcImxlYWQgdGV4dC1jZW50ZXJcXFwiPk1hY3Jvczxici8+PHNtYWxsPkV4ZWN1dGUga2V5c3Ryb2tlcyBpbiBhIHNwZWNpZmljIHNlcXVlbmNlPC9zbWFsbD48L3A+PHNtYWxsIHN0eWxlPVxcXCJmb250LXNpemU6IDFyZW07XFxcIiBjbGFzcz1cXFwidGV4dC1tdXRlZCBkLWZsZXggZmxleC1yb3cganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXJcXFwiPjxkaXYgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLXF1ZXN0aW9uLWNpcmNsZS1vIG1yLTEgZC1mbGV4IGZsZXgtY29sdW1uXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJkLWZsZXggZmxleC1yb3dcXFwiPjxzcGFuPlVzZSB0aGUga2V5cyBiZWxvdywgb3IgY2xpY2smbmJzcDs8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRleHQtZGFuZ2VyXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtY2lyY2xlIHRleHQtZGFuZ2VyXFxcIj48L2k+IHJlY29yZCZuYnNwOzwvc3Bhbj4mbmJzcDt0byBzdGFydCB0eXBpbmc8L2Rpdj48L3NtYWxsPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuamFkZV9taXhpbnNbXCJmb3JtR3JvdXBcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8ZmllbGRzZXRcIiArIChqYWRlLmNscyhbJ2Zvcm0tZ3JvdXAnLG9wdHMuZm9ybUdyb3VwQ3NzXSwgW251bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggb3B0cy5sYWJlbClcbntcbmJ1Zi5wdXNoKFwiPGxhYmVsIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wtbGFiZWxcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5sYWJlbCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9sYWJlbD5cIik7XG59XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L2ZpZWxkc2V0PlwiKTtcbn07XG5idWYucHVzaChcIlwiKTtcbmphZGVfbWl4aW5zW1wiZm9ybUlucHV0XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmphZGVfbWl4aW5zW1wiZm9ybUdyb3VwXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5idWYucHVzaChcIjxpbnB1dFwiICsgKGphZGUuYXR0cnMoamFkZS5tZXJnZShbe1wicGxhY2Vob2xkZXJcIjogamFkZS5lc2NhcGUob3B0cy5wbGFjZWhvbGRlciksXCJuYW1lXCI6IGphZGUuZXNjYXBlKG9wdHMubmFtZSksXCJ0eXBlXCI6IGphZGUuZXNjYXBlKG9wdHMudHlwZSksXCJjbGFzc1wiOiBcImZvcm0tY29udHJvbFwifSxhdHRyaWJ1dGVzXSksIGZhbHNlKSkgKyBcIi8+XCIpO1xufVxufSwgb3B0cyk7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInR5cGVcXFwiIHZhbHVlPVxcXCJ0ZXh0XFxcIiByZWFkb25seT1cXFwicmVhZG9ubHlcXFwiLz5cIik7XG5qYWRlX21peGluc1tcImZvcm1JbnB1dFwiXS5jYWxsKHtcbmF0dHJpYnV0ZXM6IGphZGUubWVyZ2UoW3sgY2xhc3M6ICdmb3JtLWNvbnRyb2wtbGcnIH1dKVxufSwgeyBuYW1lOiAndGV4dF92YWx1ZScsIHR5cGU6ICd0ZXh0JywgcGxhY2Vob2xkZXI6ICdFbnRlciBzb21lIHRleHQgaGVyZS4uLicgfSk7XG5idWYucHVzaChcIjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbmNsYXNzIFRleHRFZGl0b3IgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93J1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGV4dF9lZGl0b3InKVxuXG4gIG9uUmVuZGVyOiAtPlxuICAgIEJhY2tib25lLlN5cGhvbi5kZXNlcmlhbGl6ZShALCB7IHR5cGU6ICd0ZXh0JywgdGV4dF92YWx1ZTogQG1vZGVsLmdldCgndGV4dF92YWx1ZScpIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRFZGl0b3JcbiIsIlxuIyBEdW1teSBEZXZpY2UgRGF0YSBmb3IgVUkgZGV2ZWxvcG1lbnRcbiMgVE9ETyAtIHB1bGwgZnJvbSBXZWJVU0I/XG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAge1xuICAgIGlkOiAnZGV2aWNlXzEnLFxuICAgIGxhYmVsOiAnQWxleFxcJ3MgQXN0cm9LZXknLFxuICAgIHN0YXR1c19jb2RlOiAxLFxuICAgIGtleXM6IFtcbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfMScsIG9yZGVyOiAnMHgwMDAwJywgY29uZmlnOiB7IHR5cGU6ICdtYWNybycsIG1hY3JvczogW10gfSB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzInLCBvcmRlcjogJzB4MDAwMScsIGNvbmZpZzogeyB0eXBlOiAnbWFjcm8nLCBtYWNyb3M6IFtdIH0gfVxuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV8zJywgb3JkZXI6ICcweDAwMDInLCBjb25maWc6IHsgdHlwZTogJ21hY3JvJywgbWFjcm9zOiBbXSB9IH1cbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfNCcsIG9yZGVyOiAnMHgwMDAzJywgY29uZmlnOiB7IHR5cGU6ICdtYWNybycsIG1hY3JvczogW10gfSB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzUnLCBvcmRlcjogJzB4MDAwNCcsIGNvbmZpZzogeyB0eXBlOiAnbWFjcm8nLCBtYWNyb3M6IFtdIH0gfVxuICAgIF1cbiAgfVxuXVxuIiwiTWFjcm9FbnRpdGllcyA9IHJlcXVpcmUoJy4uL21hY3JvL2VudGl0aWVzJylcbk1hY3JvS2V5cyA9IHJlcXVpcmUoJy4uL2tleS9rZXlzJylcbkNoYXJhY3Rlck1hcCA9IHJlcXVpcmUoJ2xpYi9jaGFyYWN0ZXJfbWFwJylcbkludmVydGVkQ2hhcmFjdGVyTWFwID0gXy5pbnZlcnQoQ2hhcmFjdGVyTWFwKVxuXG4jICMgIyAjICNcblxuIyBBY2NlcHRzIGFuIGFycmF5IGFuZCBzcGxpdHMgaXRcbiMgaW50byBwYWlycyBvZiBbcG9zaXRpb24sIGNoYXJhY3Rlcl9pZF1cbnBhaXJBcnJheSA9IChhKSA9PlxuICB0ZW1wID0gYS5zbGljZSgpXG4gIGFyciA9IFtdXG5cbiAgd2hpbGUgKHRlbXAubGVuZ3RoKVxuICAgIGFyci5wdXNoKHRlbXAuc3BsaWNlKDAsMikpXG5cbiAgcmV0dXJuIGFyclxuXG4jICMgIyAjICNcblxuIyBBc3Ryb0tleUNvbmZpZyBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBBc3Ryb2tleUNvbmZpZyBleHRlbmRzIEJhY2tib25lLlJlbGF0aW9uYWxNb2RlbFxuXG4gICMgRGVmYXVsdCBhdHRyaWJ1dGVzXG4gIGRlZmF1bHRzOiB7XG4gICAgdHlwZTogJ21hY3JvJ1xuICAgIG1hY3JvczogW11cbiAgICB0ZXh0X3ZhbHVlOiAnJ1xuICAgIGtleV92YWx1ZTogJydcbiAgfVxuXG4gICMgQmFja2JvbmUuUmVsYXRpb25hbCAtIEByZWxhdGlvbnMgZGVmaW5pdGlvblxuICByZWxhdGlvbnM6IFtcbiAgICAgIHR5cGU6ICAgICAgICAgICBCYWNrYm9uZS5IYXNNYW55XG4gICAgICBrZXk6ICAgICAgICAgICAgJ21hY3JvcydcbiAgICAgIHJlbGF0ZWRNb2RlbDogICBNYWNyb0VudGl0aWVzLk1vZGVsXG4gICAgICBjb2xsZWN0aW9uVHlwZTogTWFjcm9FbnRpdGllcy5Db2xsZWN0aW9uXG4gIF1cblxuIyAjICMgIyAjXG5cbiMgQXN0cm9rZXlNb2RlbCBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBBc3Ryb2tleU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6XG4gICAgb3JkZXI6IG51bGxcbiAgICBjb25maWc6IHt9XG5cbiAgIyBCYWNrYm9uZS5SZWxhdGlvbmFsIC0gQHJlbGF0aW9ucyBkZWZpbml0aW9uXG4gIHJlbGF0aW9uczogW1xuICAgICAgdHlwZTogICAgICAgICAgIEJhY2tib25lLkhhc09uZVxuICAgICAga2V5OiAgICAgICAgICAgICdjb25maWcnXG4gICAgICByZWxhdGVkTW9kZWw6ICAgQXN0cm9rZXlDb25maWdcbiAgXVxuXG4gICMgcmVhZE1hY3JvXG4gICMgUmVhZHMgYW5kIHBhcnNlcyB0aGUgbWFjcm8gZnJvbSB0aGUgZGV2aWNlXG4gIHJlYWRNYWNybzogLT5cblxuICAgICMgUmV0dXJucyBhIFByb21pc2UgdG8gaGFuZGxlIGFzeW5jaHJvbm91cyBiZWhhdmlvclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuXG4gICAgICAjIElzc3VlcyAncmVhZDptYWNybycgcmVxdWVzdCB0byB0aGUgVVNCIHNlcnZpY2VcbiAgICAgIFJhZGlvLmNoYW5uZWwoJ3VzYicpLnJlcXVlc3QoJ3JlYWQ6bWFjcm8nLCBAZ2V0KCdvcmRlcicpKS50aGVuKChtYWNyb0FycmF5KSA9PlxuXG4gICAgICAgICMgU3RvcmVzIHRoZSBrZXlzIHVzZWQgdG8gcG9wdWxhdGUgdGhlIG1hY3JvIGNvbGxlY3Rpb25cbiAgICAgICAgbWFjcm9zID0gW11cbiAgICAgICAgcGFyc2VkTWFjcm9zID0gW11cblxuICAgICAgICAjIENvbXBhY3RzIHRoZSBtYWNyb0FycmF5XG4gICAgICAgICMgUVVFU1RJT04gLSB3aWxsIHdlIGV2ZXIgaGF2ZSB6ZXJvcyBiZXR3ZWVuIGVhY2gga2V5IHN0cm9rZT9cbiAgICAgICAgbWFjcm9BcnJheSA9IF8uY29tcGFjdChtYWNyb0FycmF5KVxuXG4gICAgICAgICMgU3BsaXRzIHRoZSBhcnJheSBpbnRvIHBhaXJzIG9mIFtwb3NpdGlvbiwgY2hhcmFjdGVyX2lkXVxuICAgICAgICBwYWlycyA9IHBhaXJBcnJheShtYWNyb0FycmF5KVxuXG4gICAgICAgICMgSXRlcmF0ZXMgb3ZlciBlYWNoIHBhaXIgaW4gdGhlIG1hY3JvQXJyYXlcbiAgICAgICAgZm9yIHBhaXIsIGluZGV4IGluIHBhaXJzXG5cbiAgICAgICAgICAjIENhcHR1cmVzIGFuZCBmb3JtYXRzIHRoZSBwb3NpdGlvblxuICAgICAgICAgIHBvc2l0aW9uID0gcGFpclswXVxuICAgICAgICAgIHBvc2l0aW9uID0gaWYgcG9zaXRpb24gPT0gMiB0aGVuIDEgZWxzZSAtMVxuXG4gICAgICAgICAgIyBGaW5kcyB0aGUgbWFjcm8gb2JqZWN0XG4gICAgICAgICAgbWFjcm8gPSBfLmZpbmRXaGVyZShNYWNyb0tleXMsIHsga2V5OiBJbnZlcnRlZENoYXJhY3Rlck1hcFtwYWlyWzFdXSB9KVxuXG4gICAgICAgICAgIyBDbG9uZXMgdGhlIG1hY3JvIG9iamVjdFxuICAgICAgICAgIG1hY3JvID0gXy5jbG9uZShtYWNybylcblxuICAgICAgICAgICMgQXNzaWduc3MgdGhlIHByb3BlciBvcmRlci9pbmRleCBhbmQgcG9zaXRpb24gYXR0cmlidXRlc1xuICAgICAgICAgIG1hY3JvLm9yZGVyID0gaW5kZXhcbiAgICAgICAgICBtYWNyby5wb3NpdGlvbiA9IHBvc2l0aW9uXG5cbiAgICAgICAgICAjIEFwcGVuZHMgdGhlIG1hY3JvIHRoZSB0aGUgYG1hY3Jvc2AgYXJyYXlcbiAgICAgICAgICBtYWNyb3MucHVzaChtYWNybylcblxuICAgICAgICAjIEl0ZXJhdGVzIG92ZXIgdGhlIG1hY3JvcyBfYWdhaW5fIC0gdGhpcyB0aW1lIHRvIG1lcmdlIGtleXVwL2tleWRvd24gYWN0aW9uc1xuICAgICAgICBtYWNyb0luZGV4ID0gMFxuICAgICAgICB3aGlsZSBtYWNyb0luZGV4IDw9IG1hY3Jvcy5sZW5ndGhcblxuICAgICAgICAgICMgSXNvbGF0ZXMgdGhlIGN1cnJlbnQgYW5kIG5leHQgbWFjcm9zIGluIHRoZSBhcnJheVxuICAgICAgICAgIG1hY3JvID0gbWFjcm9zW21hY3JvSW5kZXhdXG4gICAgICAgICAgbmV4dE1hY3JvID0gbWFjcm9zW21hY3JvSW5kZXggKyAxXVxuXG4gICAgICAgICAgIyBSZXR1cm5zIGlmIG5leHRNYWNybyBpcyB1bmRlZmluZWRcbiAgICAgICAgICBpZiAhbmV4dE1hY3JvXG4gICAgICAgICAgICBwYXJzZWRNYWNyb3MucHVzaChtYWNybylcbiAgICAgICAgICAgIG1hY3JvSW5kZXgrK1xuICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICAgICMgQ29udGludWVzIGNoZWNrIGlmIHRoZSBtYWNybyBpcyBhIEtFWV9ET1dOXG4gICAgICAgICAgaWYgbWFjcm8ucG9zaXRpb24gPT0gLTEgJiYgbmV4dE1hY3JvLnBvc2l0aW9uID09IDEgJiYgbWFjcm8ua2V5ID09IG5leHRNYWNyby5rZXlcblxuICAgICAgICAgICAgIyBLRVlfUFJFU1NcbiAgICAgICAgICAgIG1hY3JvLnBvc2l0aW9uID0gMFxuXG4gICAgICAgICAgICAjIEFwcGVuZHMgdGhlIG1hY3JvIHRvIHRoZSBwYXJzZWRNYWNyb3MgYXJyYXlcbiAgICAgICAgICAgIHBhcnNlZE1hY3Jvcy5wdXNoKG1hY3JvKVxuXG4gICAgICAgICAgICAjIEl0ZXJhdGVzLCBza2lwcGluZyB0aGUgbWF0Y2hlZCBtYWNyb1xuICAgICAgICAgICAgbWFjcm9JbmRleCA9IG1hY3JvSW5kZXggKyAyXG4gICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICMgU2V0cyB0aGUgTWFjcm9zIG9uIHRoZSBBc3Ryb2tleUNvbmZpZyBtb2RlbFxuICAgICAgICBjb25maWcgPSBAZ2V0KCdjb25maWcnKVxuICAgICAgICBjb25maWcuZ2V0KCdtYWNyb3MnKS5yZXNldChwYXJzZWRNYWNyb3MpXG5cbiAgICAgICAgIyBSZXNvbHZlcyB0aGUgUHJvbWlzZSB3aXRoIHRoZSBwYXJzZWQgbWFjcm9zXG4gICAgICAgIHJldHVybiByZXNvbHZlKG1hY3JvcylcbiAgICAgIClcblxuIyAjICMgIyAjXG5cbmNsYXNzIEFzdHJva2V5Q29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IEFzdHJva2V5TW9kZWxcbiAgY29tcGFyYXRvcjogJ29yZGVyJ1xuXG4jICMgIyAjICNcblxuIyBEZXZpY2VNb2RlbCBkZWZpbml0aW9uXG5jbGFzcyBEZXZpY2VNb2RlbCBleHRlbmRzIEJhY2tib25lLlJlbGF0aW9uYWxNb2RlbFxuXG4gICMgQmFja2JvbmUuUmVsYXRpb25hbCAtIEByZWxhdGlvbnMgZGVmaW5pdGlvblxuICByZWxhdGlvbnM6IFtcbiAgICAgIHR5cGU6ICAgICAgICAgICBCYWNrYm9uZS5IYXNNYW55XG4gICAgICBrZXk6ICAgICAgICAgICAgJ2tleXMnXG4gICAgICByZWxhdGVkTW9kZWw6ICAgQXN0cm9rZXlNb2RlbFxuICAgICAgY29sbGVjdGlvblR5cGU6IEFzdHJva2V5Q29sbGVjdGlvblxuICBdXG5cbiMgIyAjICMgI1xuXG4jIERldmljZUNvbGxlY3Rpb24gZGVmaW5pdGlvblxuY2xhc3MgRGV2aWNlQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IERldmljZU1vZGVsXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1vZGVsOiAgICAgIERldmljZU1vZGVsXG4gIENvbGxlY3Rpb246IERldmljZUNvbGxlY3Rpb25cbiIsIkVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpXG5EZXZpY2VEYXRhID0gcmVxdWlyZSgnLi9kYXRhJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIERldmljZUZhY3RvcnkgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb1JlcXVlc3RzOlxuICAgICdkZXZpY2UgbW9kZWwnOiAgICAgICAnZ2V0TW9kZWwnXG4gICAgJ2RldmljZSBjb2xsZWN0aW9uJzogICdnZXRDb2xsZWN0aW9uJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGNhY2hlZENvbGxlY3Rpb24gPSBuZXcgRW50aXRpZXMuQ29sbGVjdGlvbihEZXZpY2VEYXRhLCB7IHBhcnNlOiB0cnVlIH0pXG5cbiAgZ2V0TW9kZWw6IChpZCkgLT5cbiAgICByZXR1cm4gQGNhY2hlZENvbGxlY3Rpb24uZ2V0KGlkKVxuXG4gIGdldENvbGxlY3Rpb246IC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBEZXZpY2VGYWN0b3J5KClcbiIsIkxheW91dFZpZXcgID0gcmVxdWlyZSAnLi92aWV3cy9sYXlvdXQnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBIb21lUm91dGUgZXh0ZW5kcyByZXF1aXJlICdobl9yb3V0aW5nL2xpYi9yb3V0ZSdcblxuICB0aXRsZTogJ0FzdHJvS2V5IEhvbWUnXG5cbiAgYnJlYWRjcnVtYnM6IFt7IHRleHQ6ICdEZXZpY2UnIH1dXG5cbiAgZmV0Y2g6IC0+XG4gICAgQGRldmljZU1vZGVsID0gUmFkaW8uY2hhbm5lbCgnZGV2aWNlJykucmVxdWVzdCgnbW9kZWwnLCAnZGV2aWNlXzEnKVxuXG4gIHJlbmRlcjogLT5cbiAgICBjb25zb2xlLmxvZyhAZGV2aWNlTW9kZWwpOyAjIERlYnVnXG4gICAgQGNvbnRhaW5lci5zaG93IG5ldyBMYXlvdXRWaWV3KHsgbW9kZWw6IEBkZXZpY2VNb2RlbCB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBIb21lUm91dGVcbiIsIlxuY2xhc3MgSG9tZUxheW91dFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2xheW91dCdcbiAgY2xhc3NOYW1lOiAnY29udGFpbmVyLWZsdWlkIGgtMTAwJ1xuXG4jICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSG9tZUxheW91dFZpZXdcblxuXG5cbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvdyBoLTEwMFxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48cCBjbGFzcz1cXFwibGVhZFxcXCI+QXN0cm9LZXk8L3A+PGhyLz48cCBjbGFzcz1cXFwibGVhZFxcXCI+Q29ubmVjdCBhbiBBc3Ryb0tleSBkZXZpY2UgdG8gZ2V0IHN0YXJ0ZWQ8L3A+PGhyLz48YSBocmVmPVxcXCIjZGV2aWNlXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcXFwiPkRFVklDRTwvYT48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwicmVxdWlyZSAnLi9mYWN0b3J5J1xuSG9tZVJvdXRlID0gcmVxdWlyZSAnLi9ob21lL3JvdXRlJ1xuRGFzaGJvYXJkUm91dGUgPSByZXF1aXJlICcuL2Rhc2hib2FyZC9yb3V0ZSdcblxuIyAjICMgIyAjXG5cbiMgTWFpblJvdXRlciBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBNYWluUm91dGVyIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGVyJ1xuXG4gIHJvdXRlczpcbiAgICAnKC8pJzogJ2hvbWUnXG5cbiAgaG9tZTogLT5cbiAgICBuZXcgRGFzaGJvYXJkUm91dGUoeyBjb250YWluZXI6IEBjb250YWluZXIgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWFpblJvdXRlclxuIiwiXG4jIEZpbHRlcnMgdXNlZCB0byBxdWVyeSBXZWJVU0IgZGV2aWNlc1xuIyBUT0RPIC0gdXBkYXRlIGZpbHRlcnMgdG8gcXVlcnkgZGV2aWNlcyBieSBBc3Ryb0tleSBWZW5kb3JJRFxucmVxdWVzdERldmljZUZpbHRlcnMgPSBbXG4gIHsgdmVuZG9ySWQ6IDB4MTBjNCB9XG5dXG5cbiMgIyAjICNcblxuIyBDaHJvbWVXZWJVc2JTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgUmVzcG9uc2libGUgZm9yIG1hbmFnaW5nIFVTQiBkZXZpY2VzXG4jIC0gZmV0Y2ggYWxsIGRldmljZXNcbiMgLSB3cml0aW5nIGRhdGEgdG8gYSBkZXZpY2VcbiMgLSByZWFkaW5nIGRhdGEgZnJvbSBhIGRldmljZVxuIyAtIHdyaXRlIGZpcm13YXJlIHRvIGEgZGV2aWNlXG5jbGFzcyBDaHJvbWVXZWJVc2JTZXJ2aWNlIGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAndXNiIGRldmljZXMnOiAgICAgICdnZXREZXZpY2VzJ1xuICAgICd1c2IgcmVhZDptYWNybyc6ICAgJ3JlYWRNYWNybydcbiAgICAndXNiIHdyaXRlOm1hY3JvJzogICd3cml0ZU1hY3JvJ1xuXG4gICMgZ2V0RGV2aWNlc1xuICBnZXREZXZpY2VzOiAtPlxuXG4gICAgIyBSZXR1cm5zIGEgUHJvbWlzZSB0byBtYW5hZ2UgYXN5bmNob25vdXMgYmVoYXZpb3JcbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgIyBTdGVwIDEgLSBSZXF1ZXN0IGRldmljZVxuICAgICAgbmF2aWdhdG9yLnVzYi5yZXF1ZXN0RGV2aWNlKHsgZmlsdGVyczogcmVxdWVzdERldmljZUZpbHRlcnMgfSlcbiAgICAgIC50aGVuKCAoZGV2aWNlKSA9PlxuXG4gICAgICAgICMgVE9ETyAtIHJlbW92ZVxuICAgICAgICAjIGNvbnNvbGUubG9nIGRldmljZVxuXG4gICAgICAgICMgU3RlcCAyIC0gR2V0IERldmljZXNcbiAgICAgICAgIyBUT0RPIC0gdmVyaWZ5IHRoaXMgd29ya2Zsb3dcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2IuZ2V0RGV2aWNlcygpXG4gICAgICAgIC50aGVuKChkKSA9PlxuXG4gICAgICAgICAgY29uc29sZS5sb2coZClcblxuICAgICAgICAgIGQgPSBkWzBdXG5cbiAgICAgICAgICAjIFNURVAgMyAtIG9wZW4gZGV2aWNlXG4gICAgICAgICAgZC5vcGVuKCkudGhlbiA9PlxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnb3BlbidcblxuICAgICAgICAgICAgIyBTdGVwIDQgLSBzZWxlY3QgY29uZmlndXJhdGlvblxuICAgICAgICAgICAgZC5zZWxlY3RDb25maWd1cmF0aW9uKDEpLnRoZW4gPT5cblxuICAgICAgICAgICAgICAjIGNvbnNvbGUubG9nICdzZWxlY3RDb25maWd1cmF0aW9uJ1xuXG4gICAgICAgICAgICAgICMgVE9ETyAtIHJlbW92ZVxuICAgICAgICAgICAgICB3aW5kb3cuZCA9IGRcblxuICAgICAgICAgICAgICAjIFJlc29sdmVzIHdpdGggZGV2aWNlXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGQpXG5cbiAgICAgICAgICAgICAgIyB3SW5kZXggLSBSZXF1ZXN0IHR5cGUgKDB4MDEgZm9yIHNldCBtYWNybylcbiAgICAgICAgICAgICAgIyB3VmFsdWUgLSBNYWNybyBpbmRleCAoMCAtIDQgaW5jbHVzaXZlKVxuICAgICAgICAgICAgICAjIGJSZXF1ZXN0IC0gMyAoaGFyZGNvZGVkKVxuICAgICAgICAgICAgICAjIHdMZW5ndGggLSBudW1iZXIgb2YgYnl0ZXMgKHNob3VsZCBiZSBtYWNybyBsZW5ndGggKiAyKVxuXG4gICAgICAgICAgICAgICMgZC5jb250cm9sVHJhbnNmZXJPdXQoXG4gICAgICAgICAgICAgICMgICB7XG4gICAgICAgICAgICAgICMgICAgICdyZXF1ZXN0VHlwZSc6ICd2ZW5kb3InLFxuICAgICAgICAgICAgICAjICAgICAncmVjaXBpZW50JzogJ2RldmljZScsXG4gICAgICAgICAgICAgICMgICAgICdyZXF1ZXN0JzogMHgwMyxcbiAgICAgICAgICAgICAgIyAgICAgJ3ZhbHVlJzogMHgwMDAwLFxuICAgICAgICAgICAgICAjICAgICAnaW5kZXgnOiAweDAxXG4gICAgICAgICAgICAgICMgICB9LCBuZXcgVWludDhBcnJheShbMSw0LDIsNF0pLmJ1ZmZlclxuICAgICAgICAgICAgICAjICkudGhlbiggKHJlc3BvbnNlKSA9PiB7IGNvbnNvbGUubG9nKHJlc3BvbnNlKSB9KVxuXG4gICAgICAgICAgICAgICMgU1RFUCA1IC0gY29udHJvbFRyYW5zZmVySW5cbiAgICAgICAgICAgICAgIyB3aW5kb3cuZC5jb250cm9sVHJhbnNmZXJJbih7J3JlcXVlc3RUeXBlJzogJ3N0YW5kYXJkJywgJ3JlY2lwaWVudCc6ICdkZXZpY2UnLCAncmVxdWVzdCc6IDB4MDYsICd2YWx1ZSc6IDB4MEYwMCwgJ2luZGV4JzogMHgwMH0sIDUpLnRoZW4oIChyKSA9PiB7IGNvbnNvbGUubG9nKHIpIH0pXG5cblxuICAgICAgICApXG4gICAgICAgICMgZ2V0RGV2aWNlcyBFcnJvciBoYW5kbGluZ1xuICAgICAgICAuY2F0Y2goKGVycikgPT5cbiAgICAgICAgICBjb25zb2xlLmxvZyAnRVJSIC0gbmF2aWdhdG9yLnVzYi5nZXREZXZpY2VzKCknXG4gICAgICAgIClcblxuICAgICAgKVxuXG4gICMgcmVhZE1hY3JvXG4gIHJlYWRNYWNybzogKG1hY3JvSW5kZXggPSAweDAwMDApIC0+XG4gICAgIyBSZXR1cm5zIGEgUHJvbWlzZSB0byBtYW5hZ2UgYXN5bmNob25vdXMgYmVoYXZpb3JcbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgIyBkZXZpY2UuY29udHJvbFRyYW5zZmVySW4gKFJFQURTIERBVEEgRlJPTSBERVZJQ0UpXG4gICAgICAjIFRPRE8gLSBhYnN0cmFjdCB0aGUgY29udHJvbFRyYW5zZmVySW4gcmVxdWVzdCBvYmplY3QgaW50byBhIGNvbnN0YW50IChjbG9uZWQgZWFjaCB0aW1lKVxuICAgICAgZC5jb250cm9sVHJhbnNmZXJJbihcbiAgICAgICAge1xuICAgICAgICAgICdyZXF1ZXN0VHlwZSc6ICAndmVuZG9yJyxcbiAgICAgICAgICAncmVjaXBpZW50JzogICAgJ2RldmljZScsXG4gICAgICAgICAgJ3JlcXVlc3QnOiAgICAgIDB4MDMsXG4gICAgICAgICAgJ3ZhbHVlJzogICAgICAgIG1hY3JvSW5kZXgsXG4gICAgICAgICAgJ2luZGV4JzogICAgICAgIDB4MDJcbiAgICAgICAgfSwgMTI4ICMgUVVFU1RJT04gLSB3aHkgXCIxMjhcIj9cbiAgICAgIClcbiAgICAgIC50aGVuKCAocmVzcG9uc2UpID0+XG4gICAgICAgIHJldHVybiByZXNvbHZlKG5ldyBJbnQ4QXJyYXkocmVzcG9uc2UuZGF0YS5idWZmZXIpKVxuICAgICAgKVxuICAgICAgLmNhdGNoKCAoZXJyKSA9PlxuICAgICAgICBjb25zb2xlLmxvZyAnRVJST1IgUkVBRElORyBNQUNSTydcbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpXG4gICAgICApXG5cblxuICAjIHNlbmRNYWNyb1xuICBzZW5kTWFjcm86IChkYXRhKSAtPlxuXG4gICAgIyBSZXR1cm5zIGEgUHJvbWlzZSB0byBtYW5hZ2UgYXN5bmNob25vdXMgYmVoYXZpb3JcbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgZC5jb250cm9sVHJhbnNmZXJPdXQoXG4gICAgICAgIHtcbiAgICAgICAgICByZXF1ZXN0VHlwZTogICd2ZW5kb3InLFxuICAgICAgICAgIHJlY2lwaWVudDogICAgJ2RldmljZScsXG4gICAgICAgICAgcmVxdWVzdDogICAgICAweDAzLFxuICAgICAgICAgIHZhbHVlOiAgICAgICAgMHgwMDEzLCAjIFdoYXRldmVyIHdlIHdhbnQgKHRvIHNvbWUgZXh0ZW50KVxuICAgICAgICAgIGluZGV4OiAgICAgICAgMHgwMDAxICAjIFRPRE8gLSBXZSBjYW4gdXNlIGluZGV4IGZvciB0aGUga2V5IHRoZSBtYWNybyBjb3JyZXNwb25kcyB0byAobG93LWJ5dGUgPSBrZXksIGhpZ2gtYnl0ZSA9IG51bWJlciBvZiBhY3Rpb25zIGluIHRoZSBtYWNybylcbiAgICAgICAgfSwgbmV3IFVpbnQ4QXJyYXkoZGF0YSkuYnVmZmVyXG4gICAgICApXG4gICAgICAudGhlbiggKHJlc3BvbnNlKSA9PlxuICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXNwb25zZSlcbiAgICAgIClcbiAgICAgIC5jYXRjaCggKGVycikgPT5cbiAgICAgICAgY29uc29sZS5sb2cgJ0VSUk9SIFNFTkRJTkcgTUFDUk8nXG4gICAgICAgIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgKVxuXG5cbiMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgQ2hyb21lV2ViVXNiU2VydmljZSgpXG4iLG51bGwsIlxuIyBQcm92aWRlcyB1cGRhdGVBdHRycyBtZXRob2QgdXNlZCBieSBiaW5kQ2hlY2tib3hlcywgYmluZElucHV0cywgYmluZFJhZGlvcywgYmluZFNlbGVjdHNcbmNsYXNzIEJpbmRCYXNlIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIHVwZGF0ZUF0dHJzOiAoZSkgLT5cbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgQHZpZXcubW9kZWwuc2V0KEJhY2tib25lLlN5cGhvbi5zZXJpYWxpemUoQCkpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbmRCYXNlXG4iLCJcbiMgRGF0YWJpbmRpbmcgZm9yIGZvcm0gaW5wdXRzXG5jbGFzcyBCaW5kSW5wdXRzIGV4dGVuZHMgcmVxdWlyZSAnLi9iaW5kQmFzZSdcblxuICBldmVudHM6XG4gICAgJ2lucHV0IGlucHV0JzogICd1cGRhdGVBdHRycydcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQmluZElucHV0c1xuIiwiXG5fc2VuZEZsYXNoID0gKHR5cGUsIG9iaikgLT5cbiAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnZmxhc2gnKS50cmlnZ2VyKHR5cGUsIG9iailcblxuIyAjICMgIyAjXG5cbmNsYXNzIEZsYXNoZXNCZWhhdmlvciBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICBpbml0aWFsaXplOiAob3B0aW9ucz17fSkgLT5cbiAgICBAdmlldy5fZmxhc2hlcyAgICAgID0gQG9wdGlvbnNcbiAgICBAdmlldy5mbGFzaEVycm9yICAgID0gQGZsYXNoRXJyb3JcbiAgICBAdmlldy5mbGFzaFN1Y2Nlc3MgID0gQGZsYXNoU3VjY2Vzc1xuXG4gIGZsYXNoRXJyb3I6IChvYmo9e30pIC0+XG4gICAgX3NlbmRGbGFzaCgnZXJyb3InLCBAX2ZsYXNoZXNbJ2Vycm9yJ10gfHwgb2JqKVxuXG4gIGZsYXNoU3VjY2VzczogKG9iaj17fSkgLT5cbiAgICBfc2VuZEZsYXNoKCdzdWNjZXNzJywgQF9mbGFzaGVzWydzdWNjZXNzJ10gfHwgb2JqKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaGVzQmVoYXZpb3JcbiIsIlxuY2xhc3MgTW9kZWxFdmVudHNCZWhhdmlvciBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICBtb2RlbEV2ZW50czpcbiAgICAncmVxdWVzdCc6ICAnb25Nb2RlbFJlcXVlc3QnXG4gICAgJ3N5bmMnOiAgICAgJ29uTW9kZWxTeW5jJ1xuICAgICdlcnJvcic6ICAgICdvbk1vZGVsRXJyb3InXG5cbiAgb25Nb2RlbFJlcXVlc3Q6IChtb2RlbCwgc3RhdHVzLCBvcHRpb25zKSAtPlxuICAgIEB2aWV3Lm9uUmVxdWVzdD8obW9kZWwsIHN0YXR1cywgb3B0aW9ucylcblxuICBvbk1vZGVsU3luYzogKG1vZGVsLCByZXNwb25zZSwgb3B0aW9ucykgLT5cbiAgICBAdmlldy5vblN5bmM/KG1vZGVsLCByZXNwb25zZSwgb3B0aW9ucylcblxuICBvbk1vZGVsRXJyb3I6IChtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpIC0+XG4gICAgQHZpZXcub25FcnJvcj8obW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RlbEV2ZW50c0JlaGF2aW9yXG4iLCJcbiMgU3VibWl0QnV0dG9uQmVoYXZpb3IgY2xhc3MgZGVmaW5pdGlvblxuIyBQcm92aWRlcyBhbiBldmVudCBsaXN0ZW5lciBhbmQgaGFuZGxlciwgYW5kIGRlZmluZXNcbiMgYXNzb2NpYXRlZCBjYWxsYmFja3Mgb24gdGhlIHZpZXcgdG8gd2hpY2ggdGhlIGJlaGF2aW9yXG4jIGlzIGF0dGFjaGVkLiBUaGlzIGlzIHVzZWQgaW4gdGhlIFBhc3N3b3JkIGFuZCBTbmlwcGV0IGZvcm1zLlxuY2xhc3MgU3VibWl0QnV0dG9uQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgdWk6XG4gICAgc3VibWl0OiAnW2RhdGEtY2xpY2s9c3VibWl0XSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5zdWJtaXQ6bm90KC5kaXNhYmxlZCknOiAnb25TdWJtaXRDbGljaydcblxuICBpbml0aWFsaXplOiAob3B0aW9ucz17fSkgLT5cbiAgICBAdmlldy5kaXNhYmxlU3VibWl0ID0gPT4gQGRpc2FibGVTdWJtaXQoKVxuICAgIEB2aWV3LmVuYWJsZVN1Ym1pdCAgPSA9PiBAZW5hYmxlU3VibWl0KClcblxuICBvblN1Ym1pdENsaWNrOiAoZSkgLT4gQHZpZXcub25TdWJtaXQ/KGUpXG4gIGRpc2FibGVTdWJtaXQ6IC0+IEB1aS5zdWJtaXQuYWRkQ2xhc3MoJ2Rpc2FibGVkJylcbiAgZW5hYmxlU3VibWl0OiAtPiAgQHVpLnN1Ym1pdC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTdWJtaXRCdXR0b25CZWhhdmlvclxuIiwiXG5jbGFzcyBUb29sdGlwQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgdWk6XG4gICAgdG9vbHRpcHM6ICdbZGF0YS10b2dnbGU9dG9vbHRpcF0nXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICAjIFByb3hpZXMgY2xlYXIgbWV0aG9kIHRvIGJlIGFjY2Vzc2libGUgaW5zaWRlIHRoZSB2aWV3XG4gICAgQHZpZXcuY2xlYXJUb29sdGlwcyA9ID0+IEBjbGVhcigpXG5cbiAgY2xlYXI6IC0+XG4gICAgQHVpLnRvb2x0aXBzLnRvb2x0aXAoJ2hpZGUnKVxuICAgIEB1aS50b29sdGlwcy50b29sdGlwKCdkaXNwb3NlJylcblxuICBvblJlbmRlcjogLT4gQHVpLnRvb2x0aXBzPy50b29sdGlwKClcbiAgb25CZWZvcmVEZXN0cm95OiAtPiBAY2xlYXIoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBUb29sdGlwQmVoYXZpb3JcbiIsIlxuIyBBc3NpZ25zIE1hcmlvbmV0dGUuRGVjb3JhdG9yXG5NYXJpb25ldHRlLkRlY29yYXRvciA9IHJlcXVpcmUgJy4vZGVjb3JhdG9yJ1xuXG4jIE92ZXJyaWRlcyBkZWZhdWx0IHNlcmlhbGl6ZU1vZGVsKCkgbWV0aG9kIGRlZmluaXRpb25cbiMgSW4gdGhlIGNvbnRleHQgdGhlIHNlcmlhbGl6ZU1vZGVsIG1ldGhvZCwgJ3RoaXMnXG4jIHJlZmVycyB0byB0aGUgdmlldyBpbnN0YW5jZSBpbnNpZGUgd2hpY2ggdGhlXG4jIHNlcmlhbGl6ZU1vZGVsIG1ldGhvZCB3YXMgaW52b2tlZFxuTWFyaW9uZXR0ZS5WaWV3LnByb3RvdHlwZS5zZXJpYWxpemVNb2RlbCA9IC0+XG5cbiAgIyBJZiB0aGlzLm1vZGVsIGlzIG5vdCBkZWZpbmVkLCByZXR1cm4gYW4gZW1wdHkgb2JqZWN0XG4gIGlmICF0aGlzLm1vZGVsXG4gICAgcmV0dXJuIHt9XG5cbiAgIyBJZiB0aGlzLm1vZGVsIGV4aXN0cywgYW5kIGhhcyBhIGRlY29yYXRvciBkZWZpbmVkLFxuICAjIHJldHVybiB0aGUgdGhpcy5tb2RlbCdzIGF0dHJpYnV0ZXMgYW5kIGRlY29yYXRpb25zXG4gIGVsc2UgaWYgdGhpcy5tb2RlbC5kZWNvcmF0b3JcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5kZWNvcmF0b3IuZGVjb3JhdGUodGhpcy5tb2RlbClcblxuICAjIE90aGVyd2lzZSwgcmV0dXJuIHRoZSBjbG9uZWQgYXR0cmlidXRlcyBvZiB0aGlzLm1vZGVsXG4gIHJldHVybiBfLmNsb25lIHRoaXMubW9kZWwuYXR0cmlidXRlc1xuIiwiXG4jIEJhc2VEZWNvcmF0b3IgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgc2ltcGxlIGNsYXNzIHRvIGRlY29yYXRlIG1vZGVscyB3aGVuXG4jIHRoZXkgYXJlIHNlcmlhbGl6ZWQgaW50byBhIHZpZXcncyB0ZW1wbGF0ZVxuY2xhc3MgQmFzZURlY29yYXRvclxuXG4gICMgRGVjb3JhdGlvbiBtZXRob2RcbiAgIyBJbnZva2VkIGluIE1hcmlvbmV0dGUuVmlldy5wcm90b3R5cGUuc2VyaWFsaXplTW9kZWxcbiAgQGRlY29yYXRlOiAobW9kZWwpIC0+XG5cbiAgICAjIENsb25lcyBtb2RlbCdzIGF0dHJpYnV0ZXNcbiAgICAjIENsb25pbmcgcHJldmVudHMgY29udGFtaW5hdGlvbiBvZlxuICAgIGRhdGEgPSBfLmNsb25lKG1vZGVsLmF0dHJpYnV0ZXMpXG5cbiAgICAjIEl0ZXJhdGVzIG92ZXIgZWFjaCBmdW5jdGlvbiBpbiBwcm90b3R5cGVcbiAgICAjIExldmVyYWdlcyBVbmRlcnNjb3JlLmpzIF8uZnVuY3Rpb25zKClcbiAgICBmb3IgZnVuYyBpbiBfLmZ1bmN0aW9ucyhAcHJvdG90eXBlKVxuXG4gICAgICAjIFNraXAgY29uc3RydWN0b3JcbiAgICAgIGNvbnRpbnVlIGlmIGZ1bmMgPT0gJ2NvbnN0cnVjdG9yJ1xuXG4gICAgICAjIEFzc2lnbnMgdmFsdWUgb2YgZnVuY3Rpb24gdG8gaGFzaFxuICAgICAgZGF0YVtmdW5jXSA9IEBwcm90b3R5cGVbZnVuY10uYXBwbHkobW9kZWwpXG5cbiAgICAjIFJldHVybnMgdGhlIG1vZGVsJ3MgYXR0cmlidXRlcyAmIGRlY29yYXRpb25zXG4gICAgcmV0dXJuIGRhdGFcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZURlY29yYXRvclxuIiwiXG4jIEZsYXNoQ29sbGVjdGlvbiBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBiYXNpYyBCYWNrYm9uZS5Db2xsZWN0aW9uIHRvIGJlIHVzZWQgYnkgdGhlXG4jIEZsYXNoQ29tcG9uZW50IGZvciBzdG9yaW5nIG11bHRpcGxlIGZsYXNoIG1vZGVsc1xuY2xhc3MgRmxhc2hDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogcmVxdWlyZSAnLi9tb2RlbCdcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hDb2xsZWN0aW9uXG4iLCJyZXF1aXJlICcuL3NlcnZpY2UnXG5GbGFzaExpc3QgPSByZXF1aXJlICcuL3ZpZXdzL2ZsYXNoTGlzdCdcblxuIyAjICMgIyAjXG5cbiMgRmxhc2hTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGNvbXBvbmVudCB0byBjcmVhdGUgYW5kIGRpc3BsYXkgZmxhc2hlc1xuIyBpbiB0aGUgYXBwLiBQcm92aWRlcyBtdWx0aXBsZSBpbnRlcmZhY2VzIGluIHJhZGlvRXZlbnRzXG4jIHRvIGhhbmRsZSBjb21tb24gdHlwZXMgb2YgZmxhc2hlcyAoZXJyb3IsIHdhcm5pbmcsIHN1Y2Nlc3MpXG5jbGFzcyBGbGFzaENvbXBvbmVudCBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuU2VydmljZVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnZmxhc2gnKS5yZXF1ZXN0KCdjb2xsZWN0aW9uJykudGhlbiAoY29sbGVjdGlvbikgPT5cbiAgICAgIEBjb2xsZWN0aW9uID0gY29sbGVjdGlvblxuICAgICAgQGNvbGxlY3Rpb24ub24gJ3VwZGF0ZScsIEBzaG93TGlzdFZpZXcsIEBcblxuICByYWRpb0V2ZW50czpcbiAgICAnZmxhc2ggYWRkJzogICAgICAnYWRkJ1xuICAgICdmbGFzaCByZXNldCc6ICAgICdyZXNldCdcbiAgICAnZmxhc2ggZXJyb3InOiAgICAnZXJyb3InXG4gICAgJ2ZsYXNoIHdhcm5pbmcnOiAgJ3dhcm5pbmcnXG4gICAgJ2ZsYXNoIHN1Y2Nlc3MnOiAgJ3N1Y2Nlc3MnXG5cbiAgYWRkOiAob3B0aW9ucyA9IHt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZChvcHRpb25zKVxuXG4gIHJlc2V0OiAtPlxuICAgIEBjb2xsZWN0aW9uLnJlc2V0KClcblxuICBlcnJvcjogKG9wdGlvbnM9e30pIC0+XG4gICAgQGNvbGxlY3Rpb24uYWRkIF8uZXh0ZW5kKCBvcHRpb25zLCB7IGNvbnRleHQ6ICAnZGFuZ2VyJyB9KVxuXG4gIHdhcm5pbmc6IChvcHRpb25zPXt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZCBfLmV4dGVuZCggb3B0aW9ucywgeyBjb250ZXh0OiAgJ3dhcm5pbmcnIH0pXG5cbiAgc3VjY2VzczogKG9wdGlvbnM9e30pIC0+XG4gICAgQGNvbGxlY3Rpb24uYWRkIF8uZXh0ZW5kKCBvcHRpb25zLCB7IGNvbnRleHQ6ICAnc3VjY2VzcycgfSlcblxuICBzaG93TGlzdFZpZXc6ID0+XG4gICAgdW5sZXNzIEByZW5kZXJlZFxuICAgICAgQGNvbnRhaW5lci5zaG93IG5ldyBGbGFzaExpc3QoeyBjb2xsZWN0aW9uOiBAY29sbGVjdGlvbiB9KVxuICAgICAgQHJlbmRlcmVkID0gdHJ1ZVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaENvbXBvbmVudFxuIiwiXG4jIEZsYXNoTW9kZWwgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgYmFzaWMgQmFja2JvbmUuTW9kZWwgdG8gbWFuYWdlIHZpZXdzXG4jIGRpc3BsYXllZCBpbiB0aGUgRmxhc2hDb21wb25lbnRcbmNsYXNzIEZsYXNoTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXG4gIGRlZmF1bHRzOlxuICAgIHRpbWVvdXQ6IDUwMDBcbiAgICBkaXNtaXNzaWJsZTogdHJ1ZVxuICAgIGNvbnRleHQ6ICdpbmZvJ1xuXG4gICMgQWxlcnQgTW9kZWwgQXR0cmlidXRlcyAvIE9wdGlvbnNcbiAgIyAtIG1lc3NhZ2VcbiAgIyAtIHN0cm9uZ1RleHQgKHBsZWFzZSByZW5hbWUgdG8gJ3N0cm9uZycgJiBhZGQgYXBwcm9wcmlhdGUgc3BhY2luZyB0byB0ZW1wbGF0ZSlcbiAgIyAtIGNvbnRleHRDbGFzcyAocGxlYXNlIHJlbmFtZSB0byAnY29udGV4dCcpXG4gICMgLSB0aW1lb3V0IChkZWZhdWx0IGlzIDUgc2Vjb25kcylcbiAgIyAtIGRpc21pc3NpYmxlIChkZWZhdWx0IGlzIHRydWUpXG5cbiAgZGlzbWlzczogLT5cbiAgICBAY29sbGVjdGlvbi5yZW1vdmUoQClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hNb2RlbFxuIiwiRmxhc2hDb2xsZWN0aW9uID0gcmVxdWlyZSAnLi9jb2xsZWN0aW9uJ1xuXG4jICMgIyAjICNcblxuIyBGbGFzaFNlcnZpY2UgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVkIGEgYmFzaWMgc2VydmljZSB0byByZXR1cm4gdGhlIEZsYXNoZXNDb2xsZWN0aW9uXG4jIHdoZW4gcmVxdWVzdGVkLiBUaGlzIGlzIHVzZWQgYnkgdGhlIEZsYXNoQ29tcG9uZW50IHRvIHJldHJpZXZlXG4jIHRoZSBGbGFzaENvbGxlY3Rpb24gaXQgaXMgcmVzcG9uc2libGUgZm9yIHJlbmRlcmluZ1xuY2xhc3MgRmxhc2hTZXJ2aWNlIGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAnZmxhc2ggY29sbGVjdGlvbic6ICdnZXRDb2xsZWN0aW9uJ1xuXG4gIGFsZXJ0czogbnVsbFxuXG4gIGdldENvbGxlY3Rpb246IC0+XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlIChyZXNvbHZlLHJlamVjdCkgPT5cbiAgICAgIEBhbGVydHMgfHw9IG5ldyBGbGFzaENvbGxlY3Rpb24oKVxuICAgICAgcmVzb2x2ZShAYWxlcnRzKVxuICAgICAgcmV0dXJuXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBGbGFzaFNlcnZpY2UoKVxuIiwiIyBGbGFzaENoaWxkIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIE1hcmlvbmV0dGUuTGF5b3V0VmlldyB0byBkaXNwbGF5IGEgRmxhc2hNb2RlbCBpbnN0YW5jZVxuIyBUaGlzIHZpZXcgYXV0by1kaXNtaXNzZXMgYWZ0ZXIgdGhlIHRpbWVvdXQgZGVmaW5lZCBpbiB0aGUgRmxhc2hNb2RlbCBpbnN0YW5jZVxuY2xhc3MgRmxhc2hDaGlsZCBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICBjbGFzc05hbWU6ICdyb3cnXG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9mbGFzaF9jaGlsZCdcblxuICBhdHRyaWJ1dGVzOlxuICAgIHN0eWxlOiAnZGlzcGxheTpub25lOydcblxuICB1aTpcbiAgICBjbG9zZTogJ1tkYXRhLWNsaWNrPWRpc21pc3NdJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLmNsb3NlJzogJ2Rpc21pc3MnXG5cbiAgb25TaG93OiAtPlxuICAgIHRpbWVvdXQgPSBAbW9kZWwuZ2V0KCd0aW1lb3V0JylcbiAgICBzZXRUaW1lb3V0KCBAZGlzbWlzcywgdGltZW91dCApXG5cbiAgb25BdHRhY2g6IC0+XG4gICAgQCRlbC5mYWRlSW4oKVxuXG4gIHJlbW92ZTogLT5cbiAgICBAJGVsLnNsaWRlVG9nZ2xlKCA9PlxuICAgICAgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3LnByb3RvdHlwZS5yZW1vdmUuY2FsbChAKVxuICAgIClcblxuICBkaXNtaXNzOiA9PlxuICAgIEBtb2RlbC5jb2xsZWN0aW9uPy5yZW1vdmUoIEBtb2RlbCApXG5cbiMgRmxhc2hMaXN0IGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXcgdG8gdGhlIGxpc3Qgb2YgRmxhc2hlc1xuY2xhc3MgRmxhc2hMaXN0IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlld1xuICBjbGFzc05hbWU6ICdjb250YWluZXItZmx1aWQnXG4gIGNoaWxkVmlldzogRmxhc2hDaGlsZFxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaExpc3RcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGNvbnRleHQsIGRpc21pc3NpYmxlLCBtZXNzYWdlLCBzdHJvbmcpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyIHRleHQtY2VudGVyXFxcIj48ZGl2IHJvbGU9XFxcImFsZXJ0XFxcIlwiICsgKGphZGUuY2xzKFsnYWxlcnQnLCdhbGVydC1kaXNtaXNzaWJsZScsJ2ZhZGUnLCdpbicsXCJhbGVydC1cIiArIGNvbnRleHRdLCBbbnVsbCxudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBkaXNtaXNzaWJsZSlcbntcbmJ1Zi5wdXNoKFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtY2xpY2s9XFxcImRpc21pc3NcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiPjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj7Dlzwvc3Bhbj48c3BhbiBjbGFzcz1cXFwic3Itb25seVxcXCI+Q2xvc2U8L3NwYW4+PC9idXR0b24+XCIpO1xufVxuaWYgKCBzdHJvbmcpXG57XG5idWYucHVzaChcIjxzdHJvbmc+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBzdHJvbmcgKyBcIiBcIikgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zdHJvbmc+XCIpO1xufVxuaWYgKCBtZXNzYWdlKVxue1xuYnVmLnB1c2goamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBtZXNzYWdlKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpO1xufVxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJjb250ZXh0XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jb250ZXh0OnR5cGVvZiBjb250ZXh0IT09XCJ1bmRlZmluZWRcIj9jb250ZXh0OnVuZGVmaW5lZCxcImRpc21pc3NpYmxlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kaXNtaXNzaWJsZTp0eXBlb2YgZGlzbWlzc2libGUhPT1cInVuZGVmaW5lZFwiP2Rpc21pc3NpYmxlOnVuZGVmaW5lZCxcIm1lc3NhZ2VcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm1lc3NhZ2U6dHlwZW9mIG1lc3NhZ2UhPT1cInVuZGVmaW5lZFwiP21lc3NhZ2U6dW5kZWZpbmVkLFwic3Ryb25nXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5zdHJvbmc6dHlwZW9mIHN0cm9uZyE9PVwidW5kZWZpbmVkXCI/c3Ryb25nOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIk1vZGFsVmlldyA9IHJlcXVpcmUgJy4vdmlldydcblxuIyAjICMgIyAjXG5cbiMgV2luZG93IGV2ZW50IGxpc3RlbmVyIHRvIGhpZGUgdGhlIG1vZGFsIHdoZW4gbmF2aWdhdGlvbiBvY2N1cnMuXG5oaWRlTW9kYWxPbkhhc2hDaGFuZ2UgPSAtPiB3aW5kb3cubW9kYWxXaW5kb3cuaGlkZU1vZGFsKClcblxuIyBBYnN0cmFjdCBjbGFzcyBmb3IgbW9kYWwtYmFzZWQgY29tcG9uZW50cy5cbmNsYXNzIEFic3RyYWN0TW9kYWxDb21wb25lbnQgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICBpbml0aWFsaXplOiAob3B0aW9ucyA9IHt9KSAtPlxuICAgIEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuXG4gIGhpZGVNb2RhbDogLT5cbiAgICBAbW9kYWxWaWV3LmhpZGVNb2RhbCgpXG5cbiAgc2hvd01vZGFsOiAoY29udGVudFZpZXcsIG1vZGFsVmlld09wdGlvbnM9e30pIC0+XG5cbiAgICAgICMgTmV3IE1vZGFsIFZpZXcgKG91ciB2aWV3IGlzIHNob3duIGluc2lkZSB0aGlzIG9uZSlcbiAgICAgIEBtb2RhbFZpZXcgPSBuZXcgTW9kYWxWaWV3KG1vZGFsVmlld09wdGlvbnMpXG5cbiAgICAgICMgU2hvdyB0aGUgdmlldyBpbnNpZGUgdGhlIG1vZGFsIHdyYXBwZXIsIGFkZHMgaGlkZU1vZGFsT25IYXNoQ2hhbmdlIGV2ZW50IGxpc3RlbmVyXG4gICAgICBAbW9kYWxWaWV3Lm9uICdzaG93JywgPT5cbiAgICAgICAgQG1vZGFsVmlldy5jb250ZW50UmVnaW9uLnNob3coIGNvbnRlbnRWaWV3IClcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBoaWRlTW9kYWxPbkhhc2hDaGFuZ2UpXG4gICAgICAgIHdpbmRvdy5tb2RhbFdpbmRvdyA9IEBtb2RhbFZpZXdcblxuICAgICAgIyBSZW1vdmVzIGhpZGVNb2RhbE9uSGFzaENoYW5nZSBldmVudCBsaXN0ZW5lclxuICAgICAgQG1vZGFsVmlldy5vbiAnZGVzdHJveScsIC0+XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgaGlkZU1vZGFsT25IYXNoQ2hhbmdlKVxuICAgICAgICBkZWxldGUgd2luZG93Lm1vZGFsV2luZG93XG5cbiAgICAgICMgb25Nb2RhbEhpZGRlbiBjYWxsYmFja1xuICAgICAgQG1vZGFsVmlldy5vbiAnaGlkZGVuOm1vZGFsJywgPT4gQG9uTW9kYWxIaWRkZW4/KClcblxuICAgICAgIyBTaG93IHZpZXcgaW4gdGhlIG1vZGFsXG4gICAgICBAY29udGFpbmVyLnNob3cgQG1vZGFsVmlld1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBBYnN0cmFjdE1vZGFsQ29tcG9uZW50XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChtb2RhbENzcykge1xuYnVmLnB1c2goXCI8ZGl2IHJvbGU9XFxcImRvY3VtZW50XFxcIiBkYXRhLXJlZ2lvbj1cXFwibW9kYWwtY29udGVudFxcXCJcIiArIChqYWRlLmNscyhbbW9kYWxDc3NdLCBbdHJ1ZV0pKSArIFwiPjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcIm1vZGFsQ3NzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5tb2RhbENzczp0eXBlb2YgbW9kYWxDc3MhPT1cInVuZGVmaW5lZFwiP21vZGFsQ3NzOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxuIyBNb2RhbFZpZXcgY2xhc3MgZGVmaW5pdGlvblxuIyBQcm92aWRlcyBhIGdlbmVyaWMgdmlldyBhbmQgcmVnaW9uIGludG8gd2hpY2hcbiMgb3RoZXIgdmlld3MgY2FuIGNvbnZlbmllbnRseSBiZSBkaXNwbGF5ZWQgaW4gYSBtb2RhbFxuY2xhc3MgTW9kYWxWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL21vZGFsX3RlbXBsYXRlJ1xuXG4gIGF0dHJpYnV0ZXM6XG4gICAgcm9sZTogICAgICdkaWFsb2cnXG4gICAgdGFiaW5kZXg6ICctMSdcblxuICBjbGFzc05hbWU6ICdtb2RhbCBmYWRlJ1xuXG4gICMgU2V0cyBtb2RhbCBzaXplIC0gbm9ybWFsIC8gc21hbGwgLyBsYXJnZVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAgc2l6ZSA9IEBvcHRpb25zLnNpemUgfHwgJydcbiAgICBjc3MgPSAnbW9kYWwtZGlhbG9nJ1xuICAgIGNzcyArPSAnIG1vZGFsLXNtJyBpZiBzaXplID09ICdzbWFsbCdcbiAgICBjc3MgKz0gJyBtb2RhbC1sZycgaWYgc2l6ZSA9PSAnbGFyZ2UnXG4gICAgcmV0dXJuIHsgbW9kYWxDc3M6IGNzcyB9XG5cbiAgcmVnaW9uczpcbiAgICBjb250ZW50UmVnaW9uOiAnW2RhdGEtcmVnaW9uPW1vZGFsLWNvbnRlbnRdJ1xuXG4gIGV2ZW50czpcbiAgICAnc2hvdy5icy5tb2RhbCcgICA6IC0+IEB0cmlnZ2VyTWV0aG9kICdzaG93Om1vZGFsJ1xuICAgICdzaG93bi5icy5tb2RhbCcgIDogLT4gQHRyaWdnZXJNZXRob2QgJ3Nob3duOm1vZGFsJ1xuICAgICdoaWRlLmJzLm1vZGFsJyAgIDogLT4gQHRyaWdnZXJNZXRob2QgJ2hpZGU6bW9kYWwnXG4gICAgJ2hpZGRlbi5icy5tb2RhbCcgOiAtPiBAdHJpZ2dlck1ldGhvZCAnaGlkZGVuOm1vZGFsJ1xuICAgICdsb2FkZWQuYnMubW9kYWwnIDogLT4gQHRyaWdnZXJNZXRob2QgJ2xvYWRlZDptb2RhbCdcblxuICBvblNob3c6IC0+XG4gICAgQCRlbC5tb2RhbCggQG9wdGlvbnMubW9kYWxPcHRpb25zIHx8IHt9IClcblxuICBoaWRlTW9kYWw6IC0+XG4gICAgQCRlbC5tb2RhbCgnaGlkZScpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsVmlld1xuIiwiXG5jbGFzcyBPdmVybGF5VmlldyBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IGZhbHNlXG4gIGNsYXNzTmFtZTogJ292ZXJsYXknXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayc6ICdvbkNsaWNrJ1xuXG4gIG9uQ2xpY2s6IC0+XG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnc2lkZWJhcicpLnRyaWdnZXIoJ2hpZGUnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgT3ZlcmxheUNvbXBvbmVudCBleHRlbmRzIE1uLlNlcnZpY2VcblxuICBpbml0aWFsaXplOiAob3B0aW9ucyA9IHt9KSAtPlxuICAgIEBjb250YWluZXIgID0gb3B0aW9ucy5jb250YWluZXJcblxuICByYWRpb0V2ZW50czpcbiAgICAnb3ZlcmxheSByZWFkeSc6ICAnb25SZWFkeSdcbiAgICAnb3ZlcmxheSBzaG93JzogICAnc2hvd092ZXJsYXknXG4gICAgJ292ZXJsYXkgaGlkZSc6ICAgJ2hpZGVPdmVybGF5J1xuXG4gIHNob3dPdmVybGF5OiAtPlxuICAgICQoJy5vdmVybGF5LXJlZ2lvbicpLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gIGhpZGVPdmVybGF5OiAtPlxuICAgICQoJy5vdmVybGF5LXJlZ2lvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuXG4gIG9uUmVhZHk6IC0+XG4gICAgdW5sZXNzIEB2aWV3XG4gICAgICBAdmlldyA9IG5ldyBPdmVybGF5VmlldygpXG4gICAgICBAY29udGFpbmVyLnNob3coQHZpZXcpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE92ZXJsYXlDb21wb25lbnRcbiIsIlxuIyBCYXNlUm91dGUgY2xhc3MgZGVmaW5pdGlvblxuIyBUaGUgYmFzZSByb3V0ZSByZWR1Y2VzIHJlcGVhdGVkIGNvZGUgYnlcbiMgYXR0YWNoaW5nIHRoZSBAY29udGFpbmVyIHByb3BlcnR5IHBhc3NlZCBpbiBmcm9tXG4jIHRoZSByb3V0ZXIuIFRoaXMgcHJvcGVydHkgaXMgdXNlZCB0byBkaXNwbGF5IHZpZXdzIGluIHRoZSBhcHBcbmNsYXNzIEJhc2VSb3V0ZSBleHRlbmRzIEJhY2tib25lLlJvdXRpbmcuUm91dGVcblxuICBicmVhZGNydW1iczogW11cblxuICBpbml0aWFsaXplOiAob3B0aW9ucykgLT5cblxuICAgICMgQXR0YWNoZXMgb3B0aW9uc1xuICAgIEBvcHRpb25zID0gb3B0aW9uc1xuXG4gICAgIyBBdHRhY2hlcyBjb250YWluZXJcbiAgICBAY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcblxuICAgICMgRXZlbnQgaGFuZGxlcnNcbiAgICBAb24gJ2JlZm9yZTplbnRlcicsID0+IEBvbkJlZm9yZUVudGVyPyhhcmd1bWVudHMpXG4gICAgQG9uICdiZWZvcmU6ZmV0Y2gnLCA9PiBAb25CZWZvcmVGZXRjaD8oYXJndW1lbnRzKVxuICAgIEBvbiAnYmVmb3JlOnJlbmRlcicsID0+IEBvbkJlZm9yZVJlbmRlcj8oYXJndW1lbnRzKVxuICAgIEBvbiAnZmV0Y2gnLCA9PiBAb25GZXRjaD8oYXJndW1lbnRzKVxuICAgIEBvbiAncmVuZGVyJywgPT4gQG9uUmVuZGVyPyhhcmd1bWVudHMpXG4gICAgQG9uICdlbnRlcicsID0+IEBvbkVudGVyPyhhcmd1bWVudHMpXG5cbiAgICAjIEhpZGVzIHNpZGViYXIgY29tcG9uZW50XG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnc2lkZWJhcicpLnRyaWdnZXIoJ2hpZGUnKVxuXG4gIF9zZXRQYWdlVGl0bGU6IC0+XG4gICAgZG9jdW1lbnQudGl0bGUgPSBfLnJlc3VsdCBALCAndGl0bGUnXG5cbiAgX3VwZGF0ZUJyZWFkY3J1bWJzOiAtPlxuICAgIGJyZWFkY3J1bWJzID0gXy5yZXN1bHQgQCwgJ2JyZWFkY3J1bWJzJ1xuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2JyZWFkY3J1bWInKS50cmlnZ2VyKCdzZXQnLCBicmVhZGNydW1icykgaWYgYnJlYWRjcnVtYnNcblxuICBvbkZldGNoOiAtPlxuICAgIEBfc2V0UGFnZVRpdGxlKClcbiAgICBAX3VwZGF0ZUJyZWFkY3J1bWJzKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVJvdXRlXG4iLCJcbiMgQmFzZVJvdXRlciBjbGFzcyBkZWZpbml0aW9uXG4jIFRoZSBiYXNlIHJvdXRlciByZWR1Y2VzIHJlcGVhdGVkIGNvZGUgYnlcbiMgYXR0YWNoaW5nIHRoZSBAY29udGFpbmVyIHByb3BlcnR5IHBhc3NlZCBpbiBmcm9tIHdoZW4gaW5zdGFudGlhdGVkLlxuIyBUaGlzIHByb3BlcnR5IGlzIHN1YnNlcXVlbnRseSBwYXNzZWQgdG8gYWxsIHJvdXRlcyBjcmVhdGVkIGluc2lkZVxuIyByb3V0ZXJzIHN1YmNsYXNzZWQgZnJvbSB0aGlzIGRlZmluaXRpb25cbmNsYXNzIEJhc2VSb3V0ZXIgZXh0ZW5kcyBCYWNrYm9uZS5Sb3V0aW5nLlJvdXRlclxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zKSAtPiBAY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVJvdXRlclxuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuamFkZSA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLm1hcChqb2luQ2xhc3NlcykgOlxuICAgICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpID8gT2JqZWN0LmtleXModmFsKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsW2tleV07IH0pIDpcbiAgICBbdmFsXSkuZmlsdGVyKG51bGxzKS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXkuPEJvb2xlYW4+fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xzID0gZnVuY3Rpb24gY2xzKGNsYXNzZXMsIGVzY2FwZWQpIHtcbiAgdmFyIGJ1ZiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZXNjYXBlZCAmJiBlc2NhcGVkW2ldKSB7XG4gICAgICBidWYucHVzaChleHBvcnRzLmVzY2FwZShqb2luQ2xhc3NlcyhbY2xhc3Nlc1tpXV0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGpvaW5DbGFzc2VzKGNsYXNzZXNbaV0pKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRleHQgPSBqb2luQ2xhc3NlcyhidWYpO1xuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyBjbGFzcz1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHlsZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLm1hcChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIHJldHVybiBzdHlsZSArICc6JyArIHZhbFtzdHlsZV07XG4gICAgfSkuam9pbignOycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgdmFsID0gZXhwb3J0cy5zdHlsZSh2YWwpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHZhbCB8fCBudWxsID09IHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKDAgPT0ga2V5LmluZGV4T2YoJ2RhdGEnKSAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbCkuaW5kZXhPZignJicpICE9PSAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdTaW5jZSBKYWRlIDIuMC4wLCBhbXBlcnNhbmRzIChgJmApIGluIGRhdGEgYXR0cmlidXRlcyAnICtcbiAgICAgICAgICAgICAgICAgICAnd2lsbCBiZSBlc2NhcGVkIHRvIGAmYW1wO2AnKTtcbiAgICB9O1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgZWxpbWluYXRlIHRoZSBkb3VibGUgcXVvdGVzIGFyb3VuZCBkYXRlcyBpbiAnICtcbiAgICAgICAgICAgICAgICAgICAnSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArIFwiPSdcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkucmVwbGFjZSgvJy9nLCAnJmFwb3M7JykgKyBcIidcIjtcbiAgfSBlbHNlIGlmIChlc2NhcGVkKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgZXhwb3J0cy5lc2NhcGUodmFsKSArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBmdW5jdGlvbiBhdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGJ1ZiA9IFtdO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgICwgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09IGtleSkge1xuICAgICAgICBpZiAodmFsID0gam9pbkNsYXNzZXModmFsKSkge1xuICAgICAgICAgIGJ1Zi5wdXNoKCcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgamFkZV9lbmNvZGVfaHRtbF9ydWxlcyA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnXG59O1xudmFyIGphZGVfbWF0Y2hfaHRtbCA9IC9bJjw+XCJdL2c7XG5cbmZ1bmN0aW9uIGphZGVfZW5jb2RlX2NoYXIoYykge1xuICByZXR1cm4gamFkZV9lbmNvZGVfaHRtbF9ydWxlc1tjXSB8fCBjO1xufVxuXG5leHBvcnRzLmVzY2FwZSA9IGphZGVfZXNjYXBlO1xuZnVuY3Rpb24gamFkZV9lc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbCkucmVwbGFjZShqYWRlX21hdGNoX2h0bWwsIGphZGVfZW5jb2RlX2NoYXIpO1xuICBpZiAocmVzdWx0ID09PSAnJyArIGh0bWwpIHJldHVybiBodG1sO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIGphZGUgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdKYWRlJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cbmV4cG9ydHMuRGVidWdJdGVtID0gZnVuY3Rpb24gRGVidWdJdGVtKGxpbmVubywgZmlsZW5hbWUpIHtcbiAgdGhpcy5saW5lbm8gPSBsaW5lbm87XG4gIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbn1cblxufSx7XCJmc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxufSx7fV19LHt9LFsxXSkoMSlcbn0pO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcblxuICAjIExvd2VyY2FzZVxuICAnYSc6ICA0XG4gICdiJzogIDVcbiAgJ2MnOiAgNlxuICAnZCc6ICA3XG4gICdlJzogIDhcbiAgJ2YnOiAgOVxuICAnZyc6IDEwXG4gICdoJzogMTFcbiAgJ2knOiAxMlxuICAnaic6IDEzXG4gICdrJzogMTRcbiAgJ2wnOiAxNVxuICAnbSc6IDE2XG4gICduJzogMTdcbiAgJ28nOiAxOFxuICAncCc6IDE5XG4gICdxJzogMjBcbiAgJ3InOiAyMVxuICAncyc6IDIyXG4gICd0JzogMjNcbiAgJ3UnOiAyNFxuICAndic6IDI1XG4gICd3JzogMjZcbiAgJ3gnOiAyN1xuICAneSc6IDI4XG4gICd6JzogMjlcblxuICAjIE51bWVyaWNcbiAgJzEnOiAzMFxuICAnMic6IDMxXG4gICczJzogMzJcbiAgJzQnOiAzM1xuICAnNSc6IDM0XG4gICc2JzogMzVcbiAgJzcnOiAzNlxuICAnOCc6IDM3XG4gICc5JzogMzhcbiAgJzAnOiAzOVxuXG4gICMgRWxzZVxuICAnLic6ICAgICAgOTlcbiAgJ1NQQUNFJzogIDQ0XG4gIHJpZ2h0OiAgICA3OVxuICBsZWZ0OiAgICAgODBcbiAgZG93bjogICAgIDgxXG4gIHVwOiAgICAgICA4MlxuICAnQkFDS1NQQUNFJzogNDJcbiAgJy8nOiAgICAgIDg0XG4gICcqJzogICAgICA4NVxuICAnLSc6ICAgICAgODZcbiAgJysnOiAgICAgIDg3XG4gICdSRVRVUk4nOiAgODhcblxufVxuIiwiXG5jbGFzcyBBYnN0cmFjdEtleWJvYXJkVmlldyBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93IGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMva2V5Ym9hcmRfYWJzdHJhY3QnXG5cbiAgIyBUT0RPIC0gYWN0aXZhdGUgdGhpcyBiZWhhdmlvciBjb25kaXRpb25hbGx5XG4gICMgYmVoYXZpb3JzOlxuICAjICAgS2V5Ym9hcmRDb250cm9sczoge31cblxuICB1aTpcbiAgICBrZXk6ICdbZGF0YS1jbGljaz1rZXldJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLmtleSc6ICdvbktleUNsaWNrJ1xuXG4gIGlzUmVjb3JkaW5nOiBmYWxzZVxuXG4gICMgaW5pdGlhbGl6ZVxuICBpbml0aWFsaXplOiAtPlxuXG4gICAgIyBEZWZpbmVzIEBkZWJvdW5jZVN0b3BSZWNvcmRpbmdcbiAgICBAZGVib3VuY2VTdG9wUmVjb3JkaW5nID0gXy5kZWJvdW5jZSggKCkgPT5cbiAgICAgIEB0cmlnZ2VyICdzdG9wOnJlY29yZGluZydcbiAgICAsIDE1MDApO1xuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgIyBUT0RPIC0gbW92ZSByZWNvcmRpbmcgT1VUIG9mIHRoaXMgdmlldyBhbmQgaW50byBhIGdsb2JhbGl6ZWQgc2VydmljZVxuICBzdGFydFJlY29yZGluZzogLT5cbiAgICBAaXNSZWNvcmRpbmcgPSB0cnVlXG5cbiAgIyBzdG9wUmVjb3JkaW5nXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG4gICAgQGlzUmVjb3JkaW5nID0gZmFsc2VcblxuICAjIG9uUmVuZGVyOiAtPlxuICAjICAgc2V0VGltZW91dCggQGluaXRTb3J0YWJsZSwgMzAwIClcblxuICAjICMgaW5pdFNvcnRhYmxlXG4gICMgaW5pdFNvcnRhYmxlOiAtPlxuXG4gICMgICBjb25zb2xlLmxvZyAnT04gQVRUQUNIJ1xuXG4gICMgICBjb25zb2xlLmxvZyAkKCd1bC5rZXlib2FyZC0tcm93JylcblxuICAjICAgXy5lYWNoICQoJ3VsLmtleWJvYXJkLS1yb3cnKSwgKGVsKSA9PlxuXG4gICMgICAgICMgSW5pdGlhbGl6ZXMgU29ydGFibGUgY29udGFpbmVyXG4gICMgICAgIFNvcnRhYmxlLmNyZWF0ZSBlbCxcbiAgIyAgICAgICBhbmltYXRpb246ICAgIDE1MFxuICAjICAgICAgIGhhbmRsZTogICAgICAgJy5oYW5kbGUnXG4gICMgICAgICAgIyBnaG9zdENsYXNzOiAgICdnaG9zdCcgICMgQ2xhc3MgbmFtZSBmb3IgdGhlIGRyb3AgcGxhY2Vob2xkZXJcbiAgIyAgICAgICAjIGNob3NlbkNsYXNzOiAgJ2Nob3NlbicgICMgQ2xhc3MgbmFtZSBmb3IgdGhlIGNob3NlbiBpdGVtXG4gICMgICAgICAgIyBkcmFnQ2xhc3M6ICAgICdkcmFnJyAgIyBDbGFzcyBuYW1lIGZvciB0aGUgZHJhZ2dpbmcgaXRlbVxuXG4gICMgICAgICAgZ3JvdXA6XG4gICMgICAgICAgICBuYW1lOiAnbWFjcm8nXG4gICMgICAgICAgICBwdWxsOiAnY2xvbmUnXG4gICMgICAgICAgICBwdXQ6ICBmYWxzZVxuXG4gICMgICAgICAgZmFsbGJhY2tUb2xlcmFuY2U6IDEwMFxuXG4gICMgS2V5Ym9hcmRDb250cm9scyBiZWhhdmlvciBjYWxsYmFja1xuICAjIFRPRE8gLSBhbm5vYXRlIGFuZCBjbGVhbiB1cCB0aGlzIG1ldGhvZFxuICBvbktleUFjdGlvbjogKGUpIC0+XG5cbiAgICAjIFNob3J0LWNpcmN1aXRzIHVubGVzc1xuICAgIHJldHVybiB1bmxlc3MgQGlzUmVjb3JkaW5nXG5cbiAgICAjIFByZXZlbnRzIGRlZmF1bHQgaG90a2V5cyB3aGlsZSByZWNvcmRpbmdcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICMgVE9ETyAtIGlnbm9yZSBrZXl1cCBvbiBhbHBoYW51bWVyaWMsIGxpc3RlbiBmb3Igc3BlY2lhbCBrZXlzP1xuICAgICMgcmV0dXJuIGlmIGUua2V5IGluIFtcIkNvbnRyb2xcIiwgXCJNZXRhXCIsIFwiQWx0XCJdXG4gICAga2V5ID0gQG9wdGlvbnMua2V5cy5maW5kV2hlcmUoeyBrZXljb2RlOiBlLmtleUNvZGUgfSlcblxuICAgICMgIyAjICNcblxuICAgICMgVE9ETyAtIGRvY3VtZW50IHRoaXMgYmxvY2sgb2YgY29kZVxuXG4gICAgaWYgZS50eXBlID09ICdrZXlkb3duJ1xuXG4gICAgICBpZiBlLmtleSBpbiBbXCJDb250cm9sXCIsIFwiTWV0YVwiLCBcIkFsdFwiLCBcIlNoaWZ0XCJdXG4gICAgICAgIGpzb24gPSBrZXkudG9KU09OKClcbiAgICAgICAganNvbi5wb3NpdGlvbiA9IC0xXG4gICAgICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBqc29uXG4gICAgICBlbHNlXG4gICAgICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBrZXkudG9KU09OKClcblxuICAgIGlmIGUudHlwZSA9PSAna2V5dXAnXG5cbiAgICAgIGlmIGUua2V5IGluIFtcIkNvbnRyb2xcIiwgXCJNZXRhXCIsIFwiQWx0XCIsIFwiU2hpZnRcIl1cbiAgICAgICAganNvbiA9IGtleS50b0pTT04oKVxuICAgICAgICBqc29uLnBvc2l0aW9uID0gMVxuICAgICAgICBAdHJpZ2dlciAna2V5OnNlbGVjdGVkJywganNvblxuXG5cbiAgICAjICMgIyAjXG5cbiAgICBpZiBlLnR5cGUgPT0gJ2tleXVwJ1xuICAgICAgQCQoXCJbZGF0YS1rZXljb2RlPSN7ZS5rZXlDb2RlfV1cIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgZWxzZVxuICAgICAgQCQoXCJbZGF0YS1rZXljb2RlPSN7ZS5rZXlDb2RlfV1cIikuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAjIFRPRE8gLSBhbm5vdGFlXG4gICAgc2V0VGltZW91dCggPT5cbiAgICAgIEAkKFwiW2RhdGEta2V5Y29kZT0je2Uua2V5Q29kZX1dXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICwgMTAwMClcblxuICAgICMgU3RvcHMgcmVjb3JkaW5nIDIgc2Vjb25kcyBhZnRlciBsYXN0IGtleXN0cm9rZVxuICAgIEBkZWJvdW5jZVN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyAjICMgI1xuXG5cbiAgIyBLZXlDbGljayBjYWxsYmFja1xuICBvbktleUNsaWNrOiAoZSkgLT5cblxuICAgICMgQ2FjaGVzIGVsIGFuZCBrZXljb2RlXG4gICAgZWwgID0gJChlLmN1cnJlbnRUYXJnZXQpXG4gICAga2V5Y29kZSA9IGVsLmRhdGEoJ2tleWNvZGUnKVxuXG4gICAgIyBGaW5kcyB0aGUgbW9kZWwgb2YgdGhlIGtleSB0aGF0IHdhcyBzZWxlY3RlZFxuICAgIGtleSA9IEBvcHRpb25zLmtleXMuZmluZFdoZXJlKHsga2V5Y29kZToga2V5Y29kZSB9KVxuXG4gICAgIyBUcmlnZ2VycyAna2V5OnNlbGVjdGVkJyBldmVudFxuICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBrZXkudG9KU09OKClcblxuICAgICMgQmx1cnMgZm9jdXMgZnJvbSBjbGlja2VkIGtleVxuICAgIGVsLmJsdXIoKVxuXG4gICAgcmV0dXJuXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0S2V5Ym9hcmRWaWV3XG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlib2FyZFZpZXcgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMva2V5Ym9hcmRfZnVsbCdcblxuICBiZWhhdmlvcnM6XG4gICAgS2V5Ym9hcmRDb250cm9sczoge31cblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IwJ30pXG4gICAgICByMTogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IxJ30pXG4gICAgICByMjogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IyJ30pXG4gICAgICByMzogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IzJ30pXG4gICAgICByNDogXy53aGVyZShrZXlzLCB7IHJvdzogJ3I0J30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZFZpZXdcbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgI1xuXG5jbGFzcyBGdW5jdGlvbktleWJvYXJkIGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ2Z1bmNfcjAnfSlcbiAgICB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uS2V5Ym9hcmRcblxuXG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICNcblxuY2xhc3MgTWVkaWFLZXlib2FyZCBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdtZWRpYV9yMCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWVkaWFLZXlib2FyZFxuXG5cbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgI1xuXG5jbGFzcyBOYXZLZXlib2FyZCBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICduYXZfcjAnfSlcbiAgICB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdktleWJvYXJkXG5cblxuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjXG5cbmNsYXNzIE51bXBhZFZpZXcgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMva2V5Ym9hcmRfbnVtcGFkJ1xuXG4gICMgUGFzc2VzIGtleSBvYmplY3RzIHRvIFVJXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBrZXlzID0gQG9wdGlvbnMua2V5cy50b0pTT04oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3IwJ30pXG4gICAgICByMTogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yMSd9KVxuICAgICAgcjI6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjInfSlcbiAgICAgIHIzOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3IzJ30pXG4gICAgICByNDogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yNCd9KVxuICAgICAgY29sOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX2NvbCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTnVtcGFkVmlld1xuXG5cbiIsIlNpbXBsZU5hdiA9IHJlcXVpcmUoJ2xpYi92aWV3cy9zaW1wbGVfbmF2JylcbkZ1bGxLZXlib2FyZCA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9mdWxsJylcbk51bXBhZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfbnVtcGFkJylcbkZ1bmN0aW9uS2V5Ym9hcmQgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfZnVuY3Rpb24nKVxuTWVkaWFLZXlib2FyZCA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9tZWRpYScpXG5OYXZLZXlib2FyZCA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9uYXYnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgS2V5Ym9hcmRTZWxlY3RvciBleHRlbmRzIFNpbXBsZU5hdlxuICBjbGFzc05hbWU6ICdyb3cgaC0xMDAnXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9rZXlib2FyZF9zZWxlY3RvcicpXG5cbiAgbmF2SXRlbXM6IFtcbiAgICB7IGljb246ICdmYS1rZXlib2FyZC1vJywgIHRleHQ6ICdLZXlib2FyZCcsICB0cmlnZ2VyOiAna2V5Ym9hcmQnLCBkZWZhdWx0OiB0cnVlIH1cbiAgICB7IGljb246ICdmYS1maWxlLXRleHQtbycsIHRleHQ6ICdOdW1wYWQnLCAgIHRyaWdnZXI6ICdudW1wYWQnIH1cbiAgICB7IGljb246ICdmYS1jYXJldC1zcXVhcmUtby11cCcsICAgIHRleHQ6ICdGdW5jdGlvbicsICAgIHRyaWdnZXI6ICdmdW5jdGlvbicgfVxuICAgIHsgaWNvbjogJ2ZhLWFzdGVyaXNrJywgICAgdGV4dDogJ01lZGlhJywgICAgdHJpZ2dlcjogJ21lZGlhJyB9XG4gICAgeyBpY29uOiAnZmEtYXN0ZXJpc2snLCAgICB0ZXh0OiAnTmF2aWdhdGlvbicsICAgIHRyaWdnZXI6ICduYXYnIH1cbiAgXVxuXG4gIHNob3dLZXlib2FyZFZpZXc6IChrZXlib2FyZFZpZXcpIC0+XG5cbiAgICAjIENhY2hlcyBjdXJyZW50IGtleWJvYXJkIHZpZXdcbiAgICBAY3VycmVudCA9IGtleWJvYXJkVmlld1xuXG4gICAgIyBIYW5kbGVzICdzdG9wOnJlY29yZGluZycgZXZlbnRcbiAgICBAY3VycmVudC5vbiAnc3RvcDpyZWNvcmRpbmcnLCA9PiBAdHJpZ2dlciAnc3RvcDpyZWNvcmRpbmcnXG5cbiAgICAjIEhhbmRsZXMgS2V5U2VsZWN0aW9uIGV2ZW50XG4gICAga2V5Ym9hcmRWaWV3Lm9uICdrZXk6c2VsZWN0ZWQnLCAoa2V5KSA9PiBAdHJpZ2dlcigna2V5OnNlbGVjdGVkJywga2V5KVxuXG4gICAgIyBTaG93cyB0aGUga2V5Ym9hcmRWaWV3XG4gICAgQGNvbnRlbnRSZWdpb24uc2hvdyBrZXlib2FyZFZpZXdcblxuICBvbk5hdmlnYXRlS2V5Ym9hcmQ6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IEZ1bGxLZXlib2FyZCh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZU51bXBhZDogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgTnVtcGFkVmlldyh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZUZ1bmN0aW9uOiAtPlxuICAgIEBzaG93S2V5Ym9hcmRWaWV3KG5ldyBGdW5jdGlvbktleWJvYXJkKHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuICBvbk5hdmlnYXRlTWVkaWE6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IE1lZGlhS2V5Ym9hcmQoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4gIG9uTmF2aWdhdGVOYXY6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IE5hdktleWJvYXJkKHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRTZWxlY3RvclxuIiwiY2xhc3MgU2ltcGxlTmF2IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgW2RhdGEtdHJpZ2dlcl06bm90KC5kaXNhYmxlZCknOiAnb25OYXZJdGVtQ2xpY2snXG5cbiAgbmF2SXRlbXM6IFtdXG5cbiAgcmVnaW9uczpcbiAgICBjb250ZW50UmVnaW9uOiAnW2RhdGEtcmVnaW9uPWNvbnRlbnRdJ1xuXG4gIG9uUmVuZGVyOiAtPlxuICAgIGRlZiA9IF8ud2hlcmUoXy5yZXN1bHQoQCwgJ25hdkl0ZW1zJyksIHsgZGVmYXVsdDogdHJ1ZSB9KVswXVxuICAgIHJldHVybiB1bmxlc3MgZGVmXG4gICAgQHRyaWdnZXJNZXRob2QoXCJuYXZpZ2F0ZToje2RlZi50cmlnZ2VyfVwiKVxuICAgIEAkKFwiW2RhdGEtdHJpZ2dlcj0je2RlZi50cmlnZ2VyfV1cIikuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgc2VyaWFsaXplRGF0YTogLT5cbiAgICBkYXRhID0gc3VwZXJcbiAgICBfLmV4dGVuZChkYXRhLCB7IG5hdkl0ZW1zOiBfLnJlc3VsdChALCAnbmF2SXRlbXMnKSB9KVxuICAgIHJldHVybiBkYXRhXG5cbiAgb25OYXZJdGVtQ2xpY2s6IChlKSA9PlxuICAgIGVsID0gJChlLmN1cnJlbnRUYXJnZXQpXG4gICAgZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgQHRyaWdnZXJNZXRob2QoXCJuYXZpZ2F0ZToje2VsLmRhdGEoJ3RyaWdnZXInKX1cIilcbiAgICBlbC5ibHVyKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU2ltcGxlTmF2XG4iXX0=
