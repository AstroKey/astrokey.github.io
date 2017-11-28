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
    row: 'num_r4',
    key: 'n_CLEAR',
    keycode: 83
  }, {
    row: 'num_r4',
    key: 'n_/',
    keycode: 84
  }, {
    row: 'num_r4',
    key: 'n_*',
    keycode: 85
  }, {
    row: 'num_col',
    key: 'n_-',
    keycode: 86
  }, {
    row: 'num_col',
    key: 'n_+',
    keycode: 87,
    css: 'h2_0'
  }, {
    row: 'num_col',
    key: 'n_ENTER',
    keycode: 88,
    css: 'h2_0'
  }, {
    row: 'num_r1',
    key: 'n_1',
    keycode: 89
  }, {
    row: 'num_r1',
    key: 'n_2',
    keycode: 90
  }, {
    row: 'num_r1',
    key: 'n_3',
    keycode: 91
  }, {
    row: 'num_r2',
    key: 'n_4',
    keycode: 92
  }, {
    row: 'num_r2',
    key: 'n_5',
    keycode: 93
  }, {
    row: 'num_r2',
    key: 'n_6',
    keycode: 94
  }, {
    row: 'num_r3',
    key: 'n_7',
    keycode: 95
  }, {
    row: 'num_r3',
    key: 'n_8',
    keycode: 96
  }, {
    row: 'num_r3',
    key: 'n_9',
    keycode: 97
  }, {
    row: 'num_r0',
    key: 'n_0',
    keycode: 98
  }, {
    row: 'num_r0',
    key: 'n_.',
    keycode: 99
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



},{"./examples":32,"lib/character_map":84}],28:[function(require,module,exports){
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



},{"./macroList":40,"./templates/macro_editor":50,"lib/views/keyboard_selector":91}],40:[function(require,module,exports){
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

  AstrokeyModel.prototype.buildSnippet = function(snippet) {
    var char, data, i, index, macro, ref;
    data = [];
    console.log('BUILDING SNIPPET');
    console.log(snippet);
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
          var config, i, index, len, macro, macroIndex, macros, nextMacro, pair, pairs, parsedMacros, position;
          macros = [];
          parsedMacros = [];
          console.log('Parsed Macro from device:');
          console.log(macroArray);
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
            parsedMacros.push(macro);
            macroIndex++;
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



},{"../key/keys":22,"../macro/entities":27,"lib/character_map":84}],56:[function(require,module,exports){
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
        return d.controlTransferIn({
          'requestType': 'vendor',
          'recipient': 'device',
          'request': 0x03,
          'value': macroIndex,
          'index': 0x02
        }, 128).then(function(response) {
          return resolve(new Uint8Array(response.data.buffer));
        })["catch"](function(err) {
          console.log('ERROR READING MACRO');
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
  'RETURN': 88,
  'SHIFT': 225,
  'ALT': 226,
  'CTRL': 224,
  'n_CLEAR': 83,
  'n_/': 84,
  'n_*': 85,
  'n_-': 86,
  'n_+': 87,
  'n_ENTER': 88,
  'n_1': 89,
  'n_2': 90,
  'n_3': 91,
  'n_4': 92,
  'n_5': 93,
  'n_6': 94,
  'n_7': 95,
  'n_8': 96,
  'n_9': 97,
  'n_0': 98,
  'n_.': 99
};



},{}],85:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2FwcC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvYXBwbGljYXRpb24vdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2JlaGF2aW9ycy9rZXlib2FyZENvbnRyb2xzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc2VsZWN0YWJsZUNoaWxkLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc29ydGFibGVDaGlsZC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvYmVoYXZpb3JzL3NvcnRhYmxlTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbXBvbmVudHMvYWJvdXQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9jb21wb25lbnRzL2Fib3V0L3ZpZXdzL3RlbXBsYXRlcy9hYm91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29tcG9uZW50cy9oZWFkZXIvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9jb21wb25lbnRzL2hlYWRlci92aWV3cy90ZW1wbGF0ZXMvaGVhZGVyLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL2NvcnMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbmZpZy9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL2p3dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL21hcmlvbmV0dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbmZpZy93aW5kb3cuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21hbmlmZXN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL2tleS9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9rZXkvZmFjdG9yeS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9rZXkva2V5cy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QvdGVtcGxhdGVzL2tleWJvYXJkX2Fic3RyYWN0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVsbC90ZW1wbGF0ZXMva2V5Ym9hcmRfZnVsbC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX251bXBhZC90ZW1wbGF0ZXMva2V5Ym9hcmRfbnVtcGFkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3IvdGVtcGxhdGVzL2tleWJvYXJkX3NlbGVjdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvZXhhbXBsZV8yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21hY3JvL2V4YW1wbGVzL2V4YW1wbGVfMy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvZGV2aWNlTGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvclNlbGVjdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvcldyYXBwZXIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3Mva2V5U2VsZWN0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL21hY3JvRWRpdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL21hY3JvTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZGV2aWNlX2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2RldmljZV9zdGF0dXMuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfc2VsZWN0b3IuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfd3JhcHBlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2hlbHBfdmlldy5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2tleV9jaGlsZC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2tleV9zZWxlY3Rvci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL21hY3JvX2NoaWxkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZWRpdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZW1wdHkuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy90ZXh0X2VkaXRvci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGV4dEVkaXRvci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2RhdGEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2ZhY3RvcnkuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3JvdXRlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vaG9tZS92aWV3cy9sYXlvdXQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3ZpZXdzL3RlbXBsYXRlcy9sYXlvdXQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL3VzYi9jaHJvbWVfd2ViX3VzYl9zZXJ2aWNlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9iaW5kQmFzZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9iZWhhdmlvcnMvbGliL2JpbmRJbnB1dHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9mbGFzaGVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9zdWJtaXRCdXR0b24uY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi90b29sdGlwcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9lbnRpdGllcy9saWIvY29uZmlnLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2huX2VudGl0aWVzL2xpYi9kZWNvcmF0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbGxlY3Rpb24uY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvbW9kZWwuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3NlcnZpY2UuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3ZpZXdzL2ZsYXNoTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvdmlld3MvdGVtcGxhdGVzL2ZsYXNoX2NoaWxkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9tb2RhbC9saWIvYWJzdHJhY3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fbW9kYWwvbGliL21vZGFsX3RlbXBsYXRlLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9tb2RhbC9saWIvdmlldy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9vdmVybGF5L2xpYi9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2phZGUvcnVudGltZS5qcyIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvY2hhcmFjdGVyX21hcC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0L2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVsbC9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Z1bmN0aW9uL2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfbWVkaWEvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9uYXYvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9zZWxlY3Rvci9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL3NpbXBsZV9uYXYvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDR0EsSUFBQSxXQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3dCQUVKLFdBQUEsR0FDRTtJQUFBLGNBQUEsRUFBZ0IsWUFBaEI7Ozt3QkFHRixVQUFBLEdBQVksU0FBQTtJQUdWLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFnQyxDQUFDLE9BQWpDLENBQXlDLE9BQXpDO0lBR0EsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQW9DLENBQUMsT0FBckMsQ0FBNkMsT0FBN0M7SUFDQSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxPQUExQztJQUNBLElBQUMsQ0FBQSxPQUFELENBQUE7QUFDQSxXQUFPO0VBVEc7O3dCQWNaLE9BQUEsR0FBUyxTQUFBO0lBQ1AsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFqQixDQUFBO1dBR0EsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFkLENBQUEsQ0FDQSxDQUFDLElBREQsQ0FDTyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsQ0FBRDtRQUNM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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkEsSUFBQSxVQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3VCQUNKLFNBQUEsR0FBVzs7dUJBQ1gsUUFBQSxHQUFVLE9BQUEsQ0FBUSx5QkFB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNSLFFBQUE7SUFBQSxHQUFBLEdBQU0sQ0FBQyxDQUFDLEtBQUYsQ0FBUSxDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsRUFBWSxVQUFaLENBQVIsRUFBaUM7TUFBRSxTQUFBLEVBQVMsSUFBWDtLQUFqQyxDQUFvRCxDQUFBLENBQUE7SUFDMUQsSUFBQSxDQUFjLEdBQWQ7QUFBQSxhQUFBOztJQUNBLElBQUMsQ0FBQSxhQUFELENBQWUsV0FBQSxHQUFZLEdBQUcsQ0FBQyxPQUEvQjtXQUNBLElBQUMsQ0FBQSxDQUFELENBQUcsZ0JBQUEsR0FBaUIsR0FBRyxDQUFDLE9BQXJCLEdBQTZCLEdBQWhDLENBQW1DLENBQUMsUUFBcEMsQ0FBNkMsUUFBN0M7RUFKUTs7c0JBTVYsYUFBQSxHQUFlLFNBQUE7QUFDYixRQUFBO0lBQUEsSUFBQSxHQUFPLDhDQUFBLFNBQUE7SUFDUCxDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsRUFBZTtNQUFFLFFBQUEsRUFBVSxDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsRUFBWSxVQUFaLENBQVo7S0FBZjtBQUNBLFdBQU87RUFITTs7c0JBS2YsY0FBQSxHQUFnQixTQUFDLENBQUQ7QUFDZCxRQUFBO0lBQUEsRUFBQSxHQUFLLENBQUEsQ0FBRSxDQUFDLENBQUMsYUFBSjtJQUNMLEVBQUUsQ0FBQyxRQUFILENBQVksUUFBWixDQUFxQixDQUFDLFFBQXRCLENBQUEsQ0FBZ0MsQ0FBQyxXQUFqQyxDQUE2QyxRQUE3QztJQUNBLElBQUMsQ0FBQSxhQUFELENBQWUsV0FBQSxHQUFXLENBQUMsRUFBRSxDQUFDLElBQUgsQ0FBUSxTQUFSLENBQUQsQ0FBMUI7V0FDQSxFQUFFLENBQUMsSUFBSCxDQUFBO0VBSmM7Ozs7R0FyQk0sRUFBRSxDQUFDOztBQTZCM0IsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4jIEFwcGxpY2F0aW9uIGNsYXNzIGRlZmluaXRpb25cbiMgTWFuYWdlcyBsaWZlY3ljbGUgYW5kIGJvb3RzdHJhcHMgYXBwbGljYXRpb25cbmNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2FwcCByZWRpcmVjdCc6ICdyZWRpcmVjdFRvJ1xuXG4gICMgSW52b2tlZCBhZnRlciBjb25zdHJ1Y3RvclxuICBpbml0aWFsaXplOiAtPlxuXG4gICAgIyBTdGFydHMgSGVhZGVyIENvbXBvbmVudFxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2hlYWRlcicpLnRyaWdnZXIoJ3Jlc2V0JylcblxuICAgICMgU3RhcnRzIEhlbnNvbi5qcyBDb21wb25lbnRzXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnYnJlYWRjcnVtYicpLnRyaWdnZXIoJ3JlYWR5JylcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdvdmVybGF5JykudHJpZ2dlcigncmVhZHknKVxuICAgIEBvblJlYWR5KClcbiAgICByZXR1cm4gdHJ1ZVxuXG4gICMgU3RhcnRzIHRoZSBhcHBsaWNhdGlvblxuICAjIFN0YXJ0cyBCYWNrYm9uZS5oaXN0b3J5IChlbmFibGVzIHJvdXRpbmcpXG4gICMgQW5kIGluaXRpYWxpemVzIHNpZGViYXIgbW9kdWxlXG4gIG9uUmVhZHk6IC0+XG4gICAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCgpXG5cbiAgICAjIFRPRE8gLSB0aGlzIGlzIGEgaGFjayB0byBhdXRvLWNvbm5lY3QgdG8gYSBkZXZpY2UgSUYgaXQncyBhbHJlYWR5IGJlZW4gY29ubmVjdGVkIHRvXG4gICAgbmF2aWdhdG9yLnVzYi5nZXREZXZpY2VzKClcbiAgICAudGhlbiggKGQpID0+XG4gICAgICByZXR1cm4gdW5sZXNzIGRbMF1cbiAgICAgIGRbMF0ub3BlbigpXG4gICAgICB3aW5kb3cuZCA9IGRbMF1cbiAgICApXG5cbiAgIyBSZWRpcmVjdGlvbiBpbnRlcmZhY2VcbiAgIyBVc2VkIGFjY3Jvc3MgdGhlIGFwcGxpY2F0aW9uIHRvIHJlZGlyZWN0XG4gICMgdG8gc3BlY2lmaWMgdmlld3MgYWZ0ZXIgc3BlY2lmaWMgYWN0aW9uc1xuICByZWRpcmVjdFRvOiAocm91dGUpIC0+XG4gICAgd2luZG93LmxvY2F0aW9uID0gcm91dGVcbiAgICByZXR1cm4gdHJ1ZVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBsaWNhdGlvblxuIiwiXG4jIEFwcGxpY2F0aW9uTGF5b3V0IGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIE1hcmlvbmV0dGUuTGF5b3V0VmlldyB0byBtYW5hZ2VcbiMgdG9wLWxldmVsIGFwcGxpY2F0aW9uIHJlZ2lvbnNcbmNsYXNzIEFwcGxpY2F0aW9uTGF5b3V0IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIGVsOiAnYm9keSdcblxuICB0ZW1wbGF0ZTogZmFsc2VcblxuICByZWdpb25zOlxuICAgIGhlYWRlcjogICAgICdbYXBwLXJlZ2lvbj1oZWFkZXJdJ1xuICAgIG92ZXJsYXk6ICAgICdbYXBwLXJlZ2lvbj1vdmVybGF5XSdcbiAgICBmbGFzaDogICAgICAnW2FwcC1yZWdpb249Zmxhc2hdJ1xuICAgIG1vZGFsOiAgICAgICdbYXBwLXJlZ2lvbj1tb2RhbF0nXG4gICAgbWFpbjogICAgICAgJ1thcHAtcmVnaW9uPW1haW5dJ1xuXG4jICMgIyAjICNcblxuIyBFeHBvcnRzIGluc3RhbmNlXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBBcHBsaWNhdGlvbkxheW91dCgpLnJlbmRlcigpXG4iLCJcbiMgTWFyaW9uZXR0ZSBCZWhhdmlvciBNYW5pZmVzdFxubW9kdWxlLmV4cG9ydHMgPVxuICBTdWJtaXRCdXR0b246ICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL3N1Ym1pdEJ1dHRvbidcbiAgRmxhc2hlczogICAgICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi9mbGFzaGVzJ1xuICBNb2RlbEV2ZW50czogICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL21vZGVsRXZlbnRzJ1xuICBCaW5kSW5wdXRzOiAgICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL2JpbmRJbnB1dHMnXG4gIFRvb2x0aXBzOiAgICAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvdG9vbHRpcHMnXG4gIFNlbGVjdGFibGVDaGlsZDogIHJlcXVpcmUgJy4vc2VsZWN0YWJsZUNoaWxkJ1xuICBLZXlib2FyZENvbnRyb2xzOiAgcmVxdWlyZSAnLi9rZXlib2FyZENvbnRyb2xzJ1xuICBTb3J0YWJsZUNoaWxkOiAgICByZXF1aXJlICcuL3NvcnRhYmxlQ2hpbGQnXG4gIFNvcnRhYmxlTGlzdDogICAgIHJlcXVpcmUgJy4vc29ydGFibGVMaXN0J1xuIiwiIyBOT1RFIC0gdGhpcyBiZWhhdmlvciBoYXMgbm90IGJlZW4gdGVzdGVkIHdpdGggbXVsdGlwbGUgdmlld3Mgc2ltdWx0YW5lb3VzbHlcblxuIyBFbmFibGVzIHZpZXcgY2FsbGJhY2tzIHRvIGJlIHRyaWdnZXJlZCBieSBrZXlib2FyZCBpbnB1dFxuY2xhc3MgS2V5Ym9hcmRDb250cm9scyBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBrZXlFdmVudHMgPSBAb3B0aW9ucy5rZXlFdmVudHNcblxuICBvblJlbmRlcjogLT5cbiAgICBAYWRkRXZlbnRMaXN0ZW5lcigpXG5cbiAgb25CZWZvcmVEZXN0cm95OiAtPlxuICAgIEByZW1vdmVFdmVudExpc3RlbmVyKClcblxuICBrZXlBY3Rpb246IChlKSA9PlxuXG4gICAgIyBjb25zb2xlLmxvZyhlKTtcblxuICAgICMgSXNvbGF0ZXMgdGhlIGtleXN0cm9rZVxuICAgICMga2V5Q29kZSA9IGUua2V5Q29kZVxuXG4gICAgcmV0dXJuIEB2aWV3LnRyaWdnZXJNZXRob2QoJ2tleTphY3Rpb24nLCBlKVxuXG4gICAgIyBEbyBub3RoaW5nIGlmIHRoZXJlIGlzbid0IGFuXG4gICAgIyBldmVudCBhc3NvY2lhdGVkIHdpdGggdGhlIGtleXN0cm9rZVxuICAgICMgcmV0dXJuIHVubGVzcyBAa2V5RXZlbnRzW2tleUNvZGVdXG5cbiAgICAjIFByZXZlbnRzIGFueSBkZWZhdWx0IGFjdGlvbiBhc3NvY2lhdGVkIHdpdGggdGhlIGtleWNvZGVcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICMgVHJpZ2dlcnMgdGhlIGV2ZW50IGFzc29jaWF0ZWQgd2l0aFxuICAgICMgdGhlIGtleXN0cm9rZSBvbiB0aGUgdmlldyBpbnN0YW5jZVxuICAgICMgcmV0dXJuIEB2aWV3LnRyaWdnZXJNZXRob2QoQGtleUV2ZW50c1trZXlDb2RlXSlcblxuICBhZGRFdmVudExpc3RlbmVyOiAtPlxuICAgICQoZG9jdW1lbnQpLm9uICdrZXlkb3duJywgQGtleUFjdGlvblxuICAgICQoZG9jdW1lbnQpLm9uICdrZXl1cCcsIEBrZXlBY3Rpb25cbiAgICAjICQoZG9jdW1lbnQpLm9uICdrZXlwcmVzcycsIEBrZXlBY3Rpb25cbiAgICAjIFJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykudHJpZ2dlcignYWRkJywgeyBjb250ZXh0OiAnaW5mbycsIHRpbWVvdXQ6IDE1MDAsIG1lc3NhZ2U6ICdLZXlib2FyZCBjb250cm9scyBlbmFibGVkJ30pXG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogLT5cbiAgICAkKGRvY3VtZW50KS5vZmYgJ2tleWRvd24nLCBAa2V5QWN0aW9uXG4gICAgJChkb2N1bWVudCkub2ZmICdrZXl1cCcsIEBrZXlBY3Rpb25cbiAgICAjICQoZG9jdW1lbnQpLm9mZiAna2V5cHJlc3MnLCBAa2V5QWN0aW9uXG4gICAgIyBSYWRpby5jaGFubmVsKCdmbGFzaCcpLnRyaWdnZXIoJ2FkZCcsIHsgY29udGV4dDogJ2luZm8nLCB0aW1lb3V0OiAxNTAwLCBtZXNzYWdlOiAnS2V5Ym9hcmQgY29udHJvbHMgZGlzYWJsZWQnfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRDb250cm9sc1xuIiwiXG5jbGFzcyBTZWxlY3RhYmxlQ2hpbGQgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgY3NzOlxuICAgIGFjdGl2ZTogJ2FjdGl2ZSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrJzogICdvbkNsaWNrJ1xuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdzZWxlY3RlZCc6ICdvbkNsaWNrJ1xuXG4gICMgU2VsZWN0cyBhY3RpdmVNb2RlbCBvbiByZW5kZXJcbiAgb25SZW5kZXI6IC0+XG4gICAgcmV0dXJuIHVubGVzcyBAb3B0aW9ucy5zZXRBY3RpdmVcblxuICAjIEludm9rZWQgd2hlbiBjbGlja2VkXG4gIG9uQ2xpY2s6IChlKSAtPlxuICAgICMgQnlwYXNzIGJlaGF2aW9yIHdpdGggY3VzdG9tIG9uQ2xpY2sgY2FsbGJhY2tcbiAgICByZXR1cm4gQHZpZXcub25DbGljayhlKSBpZiBAdmlldy5vbkNsaWNrXG5cbiAgICAjIFByZXZlbnQgZG91YmxlLWNsaWNrIHVubGVzcyBzcGVjaWZpY2VkXG4gICAgZT8ucHJldmVudERlZmF1bHQoKSB1bmxlc3MgQG9wdGlvbnMuZG91YmxlQ2xpY2tcblxuICAgICMgSGFuZGxlcyBkZS1zZWxlY3Rpb25cbiAgICBpZiBAb3B0aW9ucy5kZXNlbGVjdCAmJiBAJGVsLmhhc0NsYXNzKEBjc3MuYWN0aXZlKVxuICAgICAgQCRlbC5yZW1vdmVDbGFzcyhAY3NzLmFjdGl2ZSlcbiAgICAgIHJldHVybiBAdmlldy50cmlnZ2VyTWV0aG9kICdkZXNlbGVjdGVkJ1xuXG4gICAgIyBSZXR1cm4gaWYgZWxlbWVudCBpcyBjdXJyZW50bHkgc2VsZWN0ZWRcbiAgICByZXR1cm4gaWYgQCRlbC5oYXNDbGFzcyhAY3NzLmFjdGl2ZSlcblxuICAgICMgUHJldmVudCBkZWFmdWx0IGFuZCB0cmlnZ2VyIHNlbGVjdGVkXG4gICAgZT8ucHJldmVudERlZmF1bHQoKVxuICAgIEB2aWV3LnRyaWdnZXJNZXRob2QgJ3NlbGVjdGVkJ1xuICAgIEAkZWwuYWRkQ2xhc3MoQGNzcy5hY3RpdmUpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoQGNzcy5hY3RpdmUpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdGFibGVDaGlsZFxuIiwiXG4jIFNvcnRhYmxlQ2hpbGQgQmVoYXZpb3IgZGVmaW5pdGlvblxuIyBXb3JrcyB3aXRoIFNvcnRhYmxlTGlzdCBCZWhhdmlvclxuY2xhc3MgU29ydGFibGVDaGlsZCBleHRlbmRzIE1uLkJlaGF2aW9yXG5cbiAgZXZlbnRzOlxuICAgICdzb3J0ZWQnOiAnb25Tb3J0ZWQnXG5cbiAgb25Tb3J0ZWQ6IChlLCBvcmRlcikgLT5cbiAgICBAdmlldy5tb2RlbC5zZXQoJ29yZGVyJywgb3JkZXIpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvcnRhYmxlQ2hpbGRcbiIsIlxuIyBTb3J0YWJsZUxpc3QgQmVoYXZpb3IgZGVmaW5pdGlvblxuIyBXb3JrcyB3aXRoIFNvcnRhYmxlQ2hpbGQgQmVoYXZpb3JcbmNsYXNzIFNvcnRhYmxlTGlzdCBleHRlbmRzIE1uLkJlaGF2aW9yXG5cbiAgIyBEZWZpbmVzIHRoZSByZW9yZGVyQ29sbGVjdGlvbiBtZXRob2Qgb24gdGhlIHZpZXdcbiAgIyB0byB3aGljaCB0aGUgYmVoYXZpb3IgaXMgYXNzaWduZWRcbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAdmlldy5yZW9yZGVyQ29sbGVjdGlvbiA9ID0+IEByZW9yZGVyQ29sbGVjdGlvbigpXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEluaXRpYWxpemVzIFNvcnRhYmxlIGNvbnRhaW5lclxuICAgIFNvcnRhYmxlLmNyZWF0ZSBAdmlldy5lbCxcbiAgICAgIGhhbmRsZTogICAgICAgQG9wdGlvbnMuaGFuZGxlIHx8ICcuc29ydGFibGUnXG4gICAgICBhbmltYXRpb246ICAgIEBvcHRpb25zLmFuaW1hdGlvbiB8fCAyNTBcbiAgICAgIG9uRW5kOiAoZSkgPT4gQHJlb3JkZXJDb2xsZWN0aW9uKClcblxuICAjIHJlb3JkZXJDb2xsZWN0aW9uXG4gICMgSW52b2tlZCBhZnRlciBzb3J0aW5nIGhhcyBjb21wbGV0ZWRcbiAgcmVvcmRlckNvbGxlY3Rpb246ID0+XG5cbiAgICAjIFRyaWdnZXJzIG9yZGVyIGV2ZW50cyBvbiBDb2xsZWN0aW9uVmlldyBjaGlsZFZpZXcgJGVsc1xuICAgIG9yZGVyID0gMVxuICAgIGZvciBlbCBpbiBAdmlldy4kZWxbMF0uY2hpbGRyZW5cbiAgICAgICQoZWwpLnRyaWdnZXIoJ3NvcnRlZCcsb3JkZXIpXG4gICAgICBvcmRlcisrXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvcnRhYmxlTGlzdFxuIiwiQWJvdXRWaWV3ICA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jICMgIyAjICNcblxuY2xhc3MgQWJvdXRDb21wb25lbnQgZXh0ZW5kcyByZXF1aXJlICdobl9tb2RhbC9saWIvYWJzdHJhY3QnXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2Fib3V0IHNob3cnOiAnc2hvd0Fib3V0J1xuXG4gIHNob3dBYm91dDogLT5cbiAgICBhYm91dFZpZXcgPSBuZXcgQWJvdXRWaWV3KClcbiAgICBAc2hvd01vZGFsKGFib3V0VmlldywgeyBzaXplOiAnbGFyZ2UnIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFib3V0Q29tcG9uZW50XG4iLCJcbiMgQWJvdXRWaWV3IGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEFib3V0VmlldyBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2Fib3V0J1xuICBjbGFzc05hbWU6ICdtb2RhbC1jb250ZW50J1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBBYm91dFZpZXdcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48aDUgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIj5BQk9VVDwvaDU+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48aHIvPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PHAgY2xhc3M9XFxcImxlYWRcXFwiPjxhIGhyZWY9XFxcImh0dHBzOi8vZ2l0aHViLmNvbS9Bc3Ryb0tleVxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPiBBc3Ryb0tleTwvYT4gaXMgYW4gb3Blbi1zb3VyY2UgcGxhdGZvcm0gZm9yIHJlLXByb2dyYW1tYWJsZSBVU0Iga2V5Ym9hcmRzLjwvcD48cD5Bc3Ryb0tleSBwcm92aWRlcyBhbiBpbnR1aXRpdmUgaW50ZXJmYWNlIGFueWJvZHkgY2FuIHVzZSB0byBhdXRvbWF0ZSBiYXNpYyBrZXlib2FyZCBhY3Rpb25zLjwvcD48cD5TaW1wbHkgZHJhZyBhbmQgZHJvcCBrZXlib2FyZCBrZXlzIHRvIGNvbnN0cnVjdCB5b3VyIGRlc2lyZWQgc2VxdWVuY2UgLSBBc3Ryb0tleSBkb2VzIHRoZSByZXN0LjwvcD48cD5JdCdzIHRoYXQgZWFzeS48L3A+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48aHIvPjxwPkJ1aWx0IGJ5Jm5ic3A7PGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL0Fhcm9uUGVybFxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPkFhcm9uIFBlcmw8L2E+Jm5ic3A7YW5kJm5ic3A7PGEgaHJlZj1cXFwiaHR0cDovL2Fla3MuY29cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5BbGV4YW5kZXIgU2Nod2FydHpiZXJnPC9hPiZuYnNwO2ZvciZuYnNwOzxhIGhyZWY9XFxcImh0dHBzOi8vcmNvcy5pby9cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5SQ09TLjwvYT48L3A+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIkxheW91dFZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyBIZWFkZXJTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIHNlcnZpY2UgZm9yIG1hbmFnaW5nIGFwcGxpY2F0aW9uXG4jIGhlYWRlciBzdGF0ZS4gRGlzcGxheXMgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcixcbiMgb3IgdGhlICd1bmF1dGhlbnRpY2F0ZWQnIG1lc3NhZ2UgaWYgbm9uZSBpcyBkZWZpbmVkXG5jbGFzcyBIZWFkZXJTZXJ2aWNlIGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAY29udGFpbmVyID0gQG9wdGlvbnMuY29udGFpbmVyXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2hlYWRlciByZXNldCc6ICdyZXNldCdcblxuICByZXNldDogLT5cbiAgICBAY29udGFpbmVyLnNob3cgbmV3IExheW91dFZpZXcoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJTZXJ2aWNlXG4iLCJcbiMgSGVhZGVyVmlldyBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBzaW1icGxlIHZpZXcgZm9yIGRpc3BsYXlpbmcgdGhlXG4jIGhlYWRlciBvZiB0aGUgYXBwbGljYXRpb24uIFRoZSBoZWFkZXIgZGlzcGxheXNcbiMgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBhbmRcbiMgbWFuYWdlcyB0b2dnbGluZyB0aGUgU2lkZWJhckNvbXBvbmVudCdzIHZpZXdcbmNsYXNzIEhlYWRlclZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2hlYWRlcidcbiAgY2xhc3NOYW1lOiAnbmF2YmFyIG5hdmJhci1leHBhbmQtbGcgZml4ZWQtdG9wIG5hdmJhci1kYXJrIGJnLWRhcmsnXG4gIHRhZ05hbWU6ICduYXYnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclZpZXdcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcIm5hdmJhci1icmFuZCB0aXRsZVxcXCI+PGltZyBzcmM9XFxcIi4vaW1nL2ljb25fd2hpdGUuc3ZnXFxcIiBjbGFzcz1cXFwibG9nb1xcXCIvPnN0cm9rZXk8L2Rpdj48dWwgY2xhc3M9XFxcIm5hdmJhci1uYXYgbXItYXV0b1xcXCI+PGxpIGNsYXNzPVxcXCJuYXYtaXRlbVxcXCI+PGEgc3R5bGU9XFxcImN1cnNvcjpwb2ludGVyXFxcIiBvbkNsaWNrPVxcXCJSYWRpby5jaGFubmVsKCd1c2InKS5yZXF1ZXN0KCdkZXZpY2VzJyk7XFxcIiBjbGFzcz1cXFwibmF2LWxpbmtcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1sZyBmYS11c2JcXFwiPjwvaT48L2E+PC9saT48bGkgY2xhc3M9XFxcIm5hdi1pdGVtXFxcIj48YSBzdHlsZT1cXFwiY3Vyc29yOnBvaW50ZXJcXFwiIG9uQ2xpY2s9XFxcIlJhZGlvLmNoYW5uZWwoJ2Fib3V0JykudHJpZ2dlcignc2hvdycpO1xcXCIgY2xhc3M9XFxcIm5hdi1saW5rXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtbGcgZmEtcXVlc3Rpb24tY2lyY2xlLW9cXFwiPjwvaT48L2E+PC9saT48L3VsPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCIjIFN1cHBvcnQgZm9yIGNyb3NzLWRvbWFpbiByZXF1ZXN0cyBpbiBCYWNrYm9uZS5qcyAtIHVzdWFsbHkgdmVyYm90ZW4uXG4jIFRoaXMgYWxsb3dzIHRoZSBkZXYgc2VydmVyIGF0IGxvY2FsLmNvcnRpY2FsbWV0cmljcy5jb206ODA4MCB0byBjb21tdW5pY2F0ZSB3aXRoIGRldi5jb3J0aWNhbG1ldHJpY3MuY29tOjMwMDAgKGNtLW5vZGUtYXBwKVxuXG5jcm9zc0RvbWFpblJvb3QgPSAnaHR0cDovLzE5Mi4xNjguMzMuMzM6MzAwMCcgIyBERVYgT05MWVxuXG5wcm94aWVkU3luYyA9IEJhY2tib25lLnN5bmNcblxuQmFja2JvbmUuc3luYyA9IChtZXRob2QsIG1vZGVsLCBvcHRpb25zID0ge30pID0+XG5cbiAgaWYgIW9wdGlvbnMudXJsXG4gICAgb3B0aW9ucy51cmwgPSBjcm9zc0RvbWFpblJvb3QgKyBfLnJlc3VsdChtb2RlbCwgJ3VybCcpIHx8IHVybEVycm9yKClcblxuICBlbHNlIGlmIG9wdGlvbnMudXJsLnN1YnN0cmluZygwLCA2KSAhPSBjcm9zc0RvbWFpblJvb3Quc3Vic3RyaW5nKDAsIDYpXG4gICAgb3B0aW9ucy51cmwgPSBjcm9zc0RvbWFpblJvb3QgKyBvcHRpb25zLnVybFxuXG4gIGlmICFvcHRpb25zLmNyb3NzRG9tYWluXG4gICAgb3B0aW9ucy5jcm9zc0RvbWFpbiA9IHRydWVcblxuICBpZiAhb3B0aW9ucy54aHJGaWVsZHNcbiAgICBvcHRpb25zLnhockZpZWxkcyA9IHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH1cblxuICByZXR1cm4gcHJveGllZFN5bmMobWV0aG9kLCBtb2RlbCwgb3B0aW9ucylcbiIsIiMgQXBwIGNvbmZpZ3VyYXRpb24gbWFuaWZlc3RcbnJlcXVpcmUgJy4vd2luZG93J1xucmVxdWlyZSAnLi9qd3QnXG5yZXF1aXJlICcuL2NvcnMnXG5yZXF1aXJlICcuL21hcmlvbmV0dGUnXG4iLCIjIEFqYXggSldUIFNoaW1cbiQuYWpheFNldHVwXG4gIGJlZm9yZVNlbmQ6ICh4aHIpIC0+XG4gICAgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKVxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgJ0pXVCAnICsgdG9rZW4pIGlmIHRva2VuXG4gICAgcmV0dXJuXG4iLCIjIE1hcmlvbmV0dGUuQmVoYXZpb3JzIGNvbmZpZ3VyYXRpb25cbk1hcmlvbmV0dGUuQmVoYXZpb3JzLmJlaGF2aW9yc0xvb2t1cCA9IC0+IHJlcXVpcmUgJy4uL2JlaGF2aW9ycydcbiIsIiMgQWxpYXNlcyBCYWNrYm9uZS5SYWRpbyB0byB3aW5kb3cuUmFkaW9cbndpbmRvdy5SYWRpbyA9IEJhY2tib25lLlJhZGlvXG4iLCIjIFRoaXMgZmlsZSBkZWZpbmVzIGEgbWFuaWZlc3QgZm9yIHRoZSBjbGllbnQgYXBwbGljYXRpb24uXG4jIFRoaXMgaW5jbHVkZXMgY29uZmlndXJhdGlvbiwgU2VydmljZXMsIENvbXBvbmVudHMsIE1vZHVsZXNcbiMgYW5kIHRoZSBBcHBsaWNhdGlvbiBzaW5nbGV0b24gaW5zdGFuY2UuXG5cbiMgIyAjICMgI1xuXG4jIEFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24gbWFuaWZlc3RcbnJlcXVpcmUgJy4vY29uZmlnJ1xuXG4jIEFwcGxpY2F0aW9uIGNsYXNzIGRlZmluaXRpb24gJiBBcHAgTGF5b3V0XG5BcHAgICAgICAgPSByZXF1aXJlICcuL2FwcCdcbkFwcExheW91dCA9IHJlcXVpcmUgJy4vYXBwbGljYXRpb24vdmlld3MvbGF5b3V0J1xuXG4jIEhlbnNvbiBFbnRpdGllc1xucmVxdWlyZSAnaG5fZW50aXRpZXMvbGliL2NvbmZpZydcblxuIyAjICMgIyAjXG5cbiMgQ29tcG9uZW50cyBhcmUgcm91dGVsZXNzIHNlcnZpY2VzIHdpdGggdmlld3MgdGhhdCBhcmVcbiMgYWNjZXNzaWJsZSBhbnl3aGVyZSBpbiB0aGUgYXBwbGljYXRpb25cbiMgVXNlZCB0byBtYW5hZ2UgdGhlIGhlYWRlciwgc2lkZWJhciwgZmxhc2gsIGFuZCBjb25maXJtIFVJIGVsZW1lbnRzXG5cbiMgSGVuc29uLmpzIENvbXBvbmVudHNcbkhlYWRlckNvbXBvbmVudCAgICAgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudCdcbkFib3V0Q29tcG9uZW50ICAgICAgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvYWJvdXQvY29tcG9uZW50J1xuT3ZlcmxheUNvbXBvbmVudCAgICA9IHJlcXVpcmUgJ2huX292ZXJsYXkvbGliL2NvbXBvbmVudCdcbkZsYXNoQ29tcG9uZW50ICAgICAgPSByZXF1aXJlICdobl9mbGFzaC9saWIvY29tcG9uZW50J1xubmV3IEhlYWRlckNvbXBvbmVudCh7IGNvbnRhaW5lcjogQXBwTGF5b3V0LmhlYWRlciB9KVxubmV3IE92ZXJsYXlDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5vdmVybGF5IH0pXG5uZXcgRmxhc2hDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5mbGFzaCB9KVxubmV3IEFib3V0Q29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQubW9kYWwgfSlcblxuIyAjICMgIyAjXG5cbiMgU2VydmljZXNcbnJlcXVpcmUoJy4vbW9kdWxlcy91c2IvY2hyb21lX3dlYl91c2Jfc2VydmljZScpXG4jIHJlcXVpcmUoJy4vbW9kdWxlcy91c2IvY2hyb21lX3dlYl9ibHVldG9vdGhfc2VydmljZScpXG5cbiMgRmFjdG9yaWVzXG5yZXF1aXJlKCcuL21vZHVsZXMva2V5L2ZhY3RvcnknKVxuXG4jICMgIyAjICNcblxuIyBNb2R1bGVzXG4jIE1vZHVsZXMgcmVwcmVzZW50IGNvbGxlY3Rpb25zIG9mIGVuZHBvaW50cyBpbiB0aGUgYXBwbGljYXRpb24uXG4jIFRoZXkgaGF2ZSByb3V0ZXMgYW5kIGVudGl0aWVzIChtb2RlbHMgYW5kIGNvbGxlY3Rpb25zKVxuIyBFYWNoIHJvdXRlIHJlcHJlc2VudHMgYW4gZW5kcG9pbnQsIG9yICdwYWdlJyBpbiB0aGUgYXBwLlxuTWFpbk1vZHVsZSA9IHJlcXVpcmUgJy4vbW9kdWxlcy9tYWluL3JvdXRlcidcbm5ldyBNYWluTW9kdWxlKHsgY29udGFpbmVyOiBBcHBMYXlvdXQubWFpbiB9KVxuXG4jICMgIyAjICMgI1xuXG4jIFBhZ2UgaGFzIGxvYWRlZCwgZG9jdW1lbnQgaXMgcmVhZHlcbiQoZG9jdW1lbnQpLm9uICdyZWFkeScsID0+IG5ldyBBcHAoKSAjIEluc3RhbnRpYXRlcyBuZXcgQXBwXG4iLCJcbiMgS2V5TW9kZWwgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgS2V5TW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIERlZmF1bHQgYXR0cmlidXRlc1xuICBkZWZhdWx0czoge31cblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBLZXlNb2RlbFxuICBjb21wYXJhdG9yOiAnb3JkZXInXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1vZGVsOiAgICAgIEtleU1vZGVsXG4gIENvbGxlY3Rpb246IEtleUNvbGxlY3Rpb25cbiIsIkVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpXG5LZXlEYXRhID0gcmVxdWlyZSgnLi9rZXlzJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleUZhY3RvcnkgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb1JlcXVlc3RzOlxuICAgICdrZXkgbW9kZWwnOiAgICAgICAnZ2V0TW9kZWwnXG4gICAgJ2tleSBjb2xsZWN0aW9uJzogICdnZXRDb2xsZWN0aW9uJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGNhY2hlZENvbGxlY3Rpb24gPSBuZXcgRW50aXRpZXMuQ29sbGVjdGlvbihLZXlEYXRhLCB7IHBhcnNlOiB0cnVlIH0pXG5cbiAgZ2V0TW9kZWw6IChpZCkgLT5cbiAgICByZXR1cm4gQGNhY2hlZENvbGxlY3Rpb24uZ2V0KGlkKVxuXG4gIGdldENvbGxlY3Rpb246IC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBLZXlGYWN0b3J5KClcbiIsIlxuIyBLZXkgSlNPTiBkZWZpbml0aW9uc1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICAgeyByb3c6ICdyNCcsIGtleTogJ2AnLCBzaGlmdF9rZXk6ICd+Jywga2V5Y29kZTogMTkyIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMScsIHNoaWZ0X2tleTogJyEnLCBrZXljb2RlOiA0OSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzInLCBzaGlmdF9rZXk6ICdAJywga2V5Y29kZTogNTAgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICczJywgc2hpZnRfa2V5OiAnIycsIGtleWNvZGU6IDUxIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNCcsIHNoaWZ0X2tleTogJyQnLCBrZXljb2RlOiA1MiB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzUnLCBzaGlmdF9rZXk6ICclJywga2V5Y29kZTogNTMgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc2Jywgc2hpZnRfa2V5OiAnXicsIGtleWNvZGU6IDU0IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNycsIHNoaWZ0X2tleTogJyYnLCBrZXljb2RlOiA1NSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzgnLCBzaGlmdF9rZXk6ICcqJywga2V5Y29kZTogNTYgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc5Jywgc2hpZnRfa2V5OiAnKCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMCcsIHNoaWZ0X2tleTogJyknLCBrZXljb2RlOiA0OCB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJy0nLCBzaGlmdF9rZXk6ICdfJywga2V5Y29kZTogMTg5IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnPScsIHNoaWZ0X2tleTogJysnLCBrZXljb2RlOiAxODcgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICdCQUNLU1BBQ0UnLCBrZXljb2RlOiA4LCBjc3M6ICd3Ml8wJyB9XG5cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnVEFCJywga2V5Y29kZTogOSwgY3NzOiAndzFfNScsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdxJywgc2hpZnRfa2V5OiAnUScsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4MSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ3cnLCBzaGlmdF9rZXk6ICdXJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg3IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnZScsIHNoaWZ0X2tleTogJ0UnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNjkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdyJywgc2hpZnRfa2V5OiAnUicsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4MiB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ3QnLCBzaGlmdF9rZXk6ICdUJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg0IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAneScsIHNoaWZ0X2tleTogJ1knLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICd1Jywgc2hpZnRfa2V5OiAnVScsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4NSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ2knLCBzaGlmdF9rZXk6ICdJJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDczIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnbycsIHNoaWZ0X2tleTogJ08nLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdwJywgc2hpZnRfa2V5OiAnUCcsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4MCB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ1snLCBzaGlmdF9rZXk6ICd7Jywga2V5Y29kZTogMjE5IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnXScsIHNoaWZ0X2tleTogJ30nLCBrZXljb2RlOiAyMjEgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdcXFxcJywgc2hpZnRfa2V5OiAnfCcsIGtleWNvZGU6IDIyMCwgY3NzOiAndzFfNScgfVxuXG4gICAgeyByb3c6ICdyMicsIGtleTogJ0NBUFMnLCBjc3M6ICd3MV83NScsIGtleWNvZGU6IDIwLCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnYScsIHNoaWZ0X2tleTogJ0EnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNjUgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdzJywgc2hpZnRfa2V5OiAnUycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4MyB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2QnLCBzaGlmdF9rZXk6ICdEJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDY4IH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnZicsIHNoaWZ0X2tleTogJ0YnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzAgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdnJywgc2hpZnRfa2V5OiAnRycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3MSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2gnLCBzaGlmdF9rZXk6ICdIJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDcyIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnaicsIHNoaWZ0X2tleTogJ0onLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzQgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdrJywgc2hpZnRfa2V5OiAnSycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3NSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2wnLCBzaGlmdF9rZXk6ICdMJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDc2IH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnOycsIHNoaWZ0X2tleTogJzonLCBrZXljb2RlOiAxODYgfVxuICAgIHsgcm93OiAncjInLCBrZXk6IFwiJ1wiLCBzaGlmdF9rZXk6ICdcIicsIGtleWNvZGU6IDIyMiB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ1JFVFVSTicsIGNzczogJ3cyXzI1Jywga2V5Y29kZTogMTMsIHNwZWNpYWw6IHRydWUgfVxuXG4gICAgeyByb3c6ICdyMScsIGtleTogJ1NISUZUJywgY3NzOiAndzJfMjUnLCBrZXljb2RlOiAxNiwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ3onLCBzaGlmdF9rZXk6ICdaJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDkwIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAneCcsIHNoaWZ0X2tleTogJ1gnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODggfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICdjJywgc2hpZnRfa2V5OiAnQycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA2NyB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ3YnLCBzaGlmdF9rZXk6ICdWJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg2IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnYicsIHNoaWZ0X2tleTogJ0InLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNjYgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICduJywgc2hpZnRfa2V5OiAnTicsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3OCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ20nLCBzaGlmdF9rZXk6ICdNJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDc3IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnLCcsIHNoaWZ0X2tleTogJzwnLCBrZXljb2RlOiAxODggfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICcuJywgc2hpZnRfa2V5OiAnPicsIGtleWNvZGU6IDE5MCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJy8nLCBzaGlmdF9rZXk6ICc/Jywga2V5Y29kZTogMTkxIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnU0hJRlQnLCBjc3M6ICd3Ml83NScsIGtleWNvZGU6IDE2LCBzcGVjaWFsOiB0cnVlIH1cblxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdDVFJMJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxNywgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ00nLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDkxLCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnQUxUJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxOCwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ1NQQUNFJywgY3NzOiAnc3BhY2UnLCBrZXljb2RlOiAzMiwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0NUUkwnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE3LCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnTScsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTgsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdQJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiA5Mywgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0FMVCcsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTgsIHNwZWNpYWw6IHRydWUgfVxuXG4gICAgIyBOVU1QQURcbiAgICB7IHJvdzogJ251bV9yNCcsIGtleTogJ25fQ0xFQVInLCBrZXljb2RlOiA4MyB9XG4gICAgeyByb3c6ICdudW1fcjQnLCBrZXk6ICduXy8nLCBrZXljb2RlOiA4NCB9XG4gICAgeyByb3c6ICdudW1fcjQnLCBrZXk6ICduXyonLCBrZXljb2RlOiA4NSB9XG5cbiAgICB7IHJvdzogJ251bV9jb2wnLCBrZXk6ICduXy0nLCBrZXljb2RlOiA4NiB9XG4gICAgeyByb3c6ICdudW1fY29sJywga2V5OiAnbl8rJywga2V5Y29kZTogODcsIGNzczogJ2gyXzAnIH1cbiAgICB7IHJvdzogJ251bV9jb2wnLCBrZXk6ICduX0VOVEVSJywga2V5Y29kZTogODgsIGNzczogJ2gyXzAnIH1cblxuICAgIHsgcm93OiAnbnVtX3IxJywga2V5OiAnbl8xJywga2V5Y29kZTogODkgfVxuICAgIHsgcm93OiAnbnVtX3IxJywga2V5OiAnbl8yJywga2V5Y29kZTogOTAgfVxuICAgIHsgcm93OiAnbnVtX3IxJywga2V5OiAnbl8zJywga2V5Y29kZTogOTEgfVxuXG4gICAgeyByb3c6ICdudW1fcjInLCBrZXk6ICduXzQnLCBrZXljb2RlOiA5MiB9XG4gICAgeyByb3c6ICdudW1fcjInLCBrZXk6ICduXzUnLCBrZXljb2RlOiA5MyB9XG4gICAgeyByb3c6ICdudW1fcjInLCBrZXk6ICduXzYnLCBrZXljb2RlOiA5NCB9XG5cbiAgICB7IHJvdzogJ251bV9yMycsIGtleTogJ25fNycsIGtleWNvZGU6IDk1IH1cbiAgICB7IHJvdzogJ251bV9yMycsIGtleTogJ25fOCcsIGtleWNvZGU6IDk2IH1cbiAgICB7IHJvdzogJ251bV9yMycsIGtleTogJ25fOScsIGtleWNvZGU6IDk3IH1cblxuICAgIHsgcm93OiAnbnVtX3IwJywga2V5OiAnbl8wJywga2V5Y29kZTogOTggfVxuICAgIHsgcm93OiAnbnVtX3IwJywga2V5OiAnbl8uJywga2V5Y29kZTogOTkgfVxuXG4gICAgIyBGdW5jdGlvbiBLZXlzXG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEnLCBrZXljb2RlOiA0OSB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjInLCBrZXljb2RlOiA1MCB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjMnLCBrZXljb2RlOiA1MSB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjQnLCBrZXljb2RlOiA1MiB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjUnLCBrZXljb2RlOiA1MyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjYnLCBrZXljb2RlOiA1NCB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjcnLCBrZXljb2RlOiA1NSB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjgnLCBrZXljb2RlOiA1NiB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjknLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEwJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxMScsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTInLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcgfVxuXG4gICAgIyBNZWRpYSBLZXlzXG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtc3RlcC1iYWNrd2FyZCcgfVxuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXBsYXknIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS1zdGVwLWZvcndhcmQnIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS12b2x1bWUtb2ZmJyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtdm9sdW1lLWRvd24nIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS12b2x1bWUtdXAnIH1cblxuICAgICMgTmF2aWdhdGlvbiBLZXlzXG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdQR1VQJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnUEdETicsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0VORCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ0hPTUUnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdMRUZULUFSUk9XJywga2V5Y29kZTogNTcsIGljb246ICdmYS1jaGV2cm9uLWxlZnQnIH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ1VQLUFSUk9XJywga2V5Y29kZTogNTcsIGljb246ICdmYS1jaGV2cm9uLXVwJyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdET1dOLUFSUk9XJywga2V5Y29kZTogNTcsIGljb246ICdmYS1jaGV2cm9uLWRvd24nIH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ1JJR0hULUFSUk9XJywga2V5Y29kZTogNTcsIGljb246ICdmYS1jaGV2cm9uLXJpZ2h0JyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdJTlMnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdERUwnLCBrZXljb2RlOiA0NiB9XG5cbl1cblxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAocjApIHtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKCl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjx1bCBjbGFzcz1cXFwibGlzdC11bnN0eWxlZCBtYi0wIGtleWJvYXJkLS1yb3cgdy0xMDBcXFwiPlwiKTtcbmJsb2NrICYmIGJsb2NrKCk7XG5idWYucHVzaChcIjwvdWw+XCIpO1xufTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleWNvZGVcIiwgb3B0cy5rZXljb2RlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1jbGljaz1cXFwia2V5XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEta2V5XCIsIG9wdHMua2V5LCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnYnRuJywnYnRuLW91dGxpbmUtbGlnaHQnLCdrZXlib2FyZC0ta2V5JyxvcHRzLmNzc10sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxvcHRzLmljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBvcHRzLmtleSAmJiBvcHRzLnNoaWZ0X2tleSAmJiAhb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlIGlmICggb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbn1cbmJ1Zi5wdXNoKFwiPC9saT5cIik7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tYm9keVxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJyMFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjA6dHlwZW9mIHIwIT09XCJ1bmRlZmluZWRcIj9yMDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChyMCwgcjEsIHIyLCByMywgcjQpIHtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKCl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjx1bCBjbGFzcz1cXFwibGlzdC11bnN0eWxlZCBtYi0wIGtleWJvYXJkLS1yb3cgdy0xMDBcXFwiPlwiKTtcbmJsb2NrICYmIGJsb2NrKCk7XG5idWYucHVzaChcIjwvdWw+XCIpO1xufTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleWNvZGVcIiwgb3B0cy5rZXljb2RlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1jbGljaz1cXFwia2V5XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEta2V5XCIsIG9wdHMua2V5LCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnYnRuJywnYnRuLW91dGxpbmUtbGlnaHQnLCdrZXlib2FyZC0ta2V5JyxvcHRzLmNzc10sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxvcHRzLmljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBvcHRzLmtleSAmJiBvcHRzLnNoaWZ0X2tleSAmJiAhb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlIGlmICggb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbn1cbmJ1Zi5wdXNoKFwiPC9saT5cIik7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tYm9keVxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByNFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByNDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByM1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMlxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMjtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJyMFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjA6dHlwZW9mIHIwIT09XCJ1bmRlZmluZWRcIj9yMDp1bmRlZmluZWQsXCJyMVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjE6dHlwZW9mIHIxIT09XCJ1bmRlZmluZWRcIj9yMTp1bmRlZmluZWQsXCJyMlwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjI6dHlwZW9mIHIyIT09XCJ1bmRlZmluZWRcIj9yMjp1bmRlZmluZWQsXCJyM1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjM6dHlwZW9mIHIzIT09XCJ1bmRlZmluZWRcIj9yMzp1bmRlZmluZWQsXCJyNFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjQ6dHlwZW9mIHI0IT09XCJ1bmRlZmluZWRcIj9yNDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChjb2wsIHIwLCByMSwgcjIsIHIzLCByNCwgdW5kZWZpbmVkKSB7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbigpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8dWwgY2xhc3M9XFxcImxpc3QtdW5zdHlsZWQgbWItMCBrZXlib2FyZC0tcm93IHctMTAwXFxcIj5cIik7XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L3VsPlwiKTtcbn07XG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXljb2RlXCIsIG9wdHMua2V5Y29kZSwgdHJ1ZSwgZmFsc2UpKSArIFwiIGRhdGEtY2xpY2s9XFxcImtleVxcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleVwiLCBvcHRzLmtleSwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmNscyhbJ2J0bicsJ2J0bi1vdXRsaW5lLWxpZ2h0Jywna2V5Ym9hcmQtLWtleScsb3B0cy5jc3NdLCBbbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggb3B0cy5pY29uKVxue1xuYnVmLnB1c2goXCI8aVwiICsgKGphZGUuY2xzKFsnZmEnLCdmYS1mdycsb3B0cy5pY29uXSwgW251bGwsbnVsbCx0cnVlXSkpICsgXCI+PC9pPlwiKTtcbn1cbmVsc2VcbntcbmlmICggb3B0cy5rZXkgJiYgb3B0cy5zaGlmdF9rZXkgJiYgIW9wdHMuYWxwaGEpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInNoaWZ0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuZWxzZSBpZiAoIG9wdHMuYWxwaGEpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG59XG5idWYucHVzaChcIjwvbGk+XCIpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwia2V5Ym9hcmQtLWJvZHlcXFwiPjxkaXYgY2xhc3M9XFxcImQtZmxleCBmbGV4LXJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiZC1mbGV4IGZsZXgtY29sdW1uXFxcIj5cIik7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHI0XG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHI0O1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIyXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIyO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIxXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIxO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIwXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIwO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5idWYucHVzaChcIjwvZGl2PjxkaXYgY2xhc3M9XFxcImQtZmxleCBmbGV4LWNvbHVtblxcXCI+XCIpO1xuLy8gaXRlcmF0ZSBjb2xcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gY29sO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJjb2xcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNvbDp0eXBlb2YgY29sIT09XCJ1bmRlZmluZWRcIj9jb2w6dW5kZWZpbmVkLFwicjBcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIwOnR5cGVvZiByMCE9PVwidW5kZWZpbmVkXCI/cjA6dW5kZWZpbmVkLFwicjFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIxOnR5cGVvZiByMSE9PVwidW5kZWZpbmVkXCI/cjE6dW5kZWZpbmVkLFwicjJcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIyOnR5cGVvZiByMiE9PVwidW5kZWZpbmVkXCI/cjI6dW5kZWZpbmVkLFwicjNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIzOnR5cGVvZiByMyE9PVwidW5kZWZpbmVkXCI/cjM6dW5kZWZpbmVkLFwicjRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnI0OnR5cGVvZiByNCE9PVwidW5kZWZpbmVkXCI/cjQ6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG5hdkl0ZW1zLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTggZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlwiKTtcbi8vIGl0ZXJhdGUgbmF2SXRlbXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbmF2SXRlbXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIG5hdkl0ZW0udHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBidG4tc20ganVzdGlmeS1jb250ZW50LWNlbnRlciBteC0zXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIG5hdkl0ZW0gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxidXR0b24gc3R5bGU9XFxcImZsZXgtZ3JvdzoxO1xcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLXRyaWdnZXJcIiwgbmF2SXRlbS50cmlnZ2VyLCB0cnVlLCBmYWxzZSkpICsgXCIgY2xhc3M9XFxcImQtZmxleCBidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IGJ0bi1zbSBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG14LTNcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbmF2SXRlbS50ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2J1dHRvbj5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxoci8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJjb250ZW50XFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJuYXZJdGVtc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubmF2SXRlbXM6dHlwZW9mIG5hdkl0ZW1zIT09XCJ1bmRlZmluZWRcIj9uYXZJdGVtczp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiTWFjcm9FeGFtcGxlcyA9IHJlcXVpcmUoJy4vZXhhbXBsZXMnKVxuY2hhck1hcCA9IHJlcXVpcmUoJ2xpYi9jaGFyYWN0ZXJfbWFwJylcblxuIyAjICMgIyAjXG5cbiMgTWFjcm9Nb2RlbCBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBNYWNyb01vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6XG4gICAgb3JkZXI6IDBcbiAgICBwb3NpdGlvbjogMFxuICAgIHNoaWZ0ZWQ6IGZhbHNlXG5cbiAgZ2V0S2V5RGF0YTogLT5cblxuICAgIGRhdGEgPSBbXVxuXG4gICAgYXR0cnMgPSBfLmNsb25lKEBhdHRyaWJ1dGVzKVxuXG4gICAgIyBjb25zb2xlLmxvZyBhdHRyc1xuXG4gICAgIyBBY3Rpb25UeXBlXG4gICAgIyBQcmVzcyAgID0gMSwgS0VZIFZBTFVFXG4gICAgIyBSZWxlYXNlID0gMiwgS0VZIFZBTFVFXG5cbiAgICAjIEtFWSBET1dOICYgS0VZIFVQXG4gICAgaWYgYXR0cnMucG9zaXRpb24gPT0gMFxuICAgICAgZGF0YS5wdXNoKDEpXG4gICAgICBkYXRhLnB1c2goY2hhck1hcFthdHRycy5rZXldIHx8IDQpXG5cbiAgICAgIGRhdGEucHVzaCgyKVxuICAgICAgZGF0YS5wdXNoKGNoYXJNYXBbYXR0cnMua2V5XSB8fCA0KVxuXG4gICAgIyBLRVkgRE9XTlxuICAgIGlmIGF0dHJzLnBvc2l0aW9uID09IC0xXG4gICAgICBkYXRhLnB1c2goMSlcbiAgICAgIGRhdGEucHVzaChjaGFyTWFwW2F0dHJzLmtleV0gfHwgNClcblxuICAgICMgS0VZIFVQXG4gICAgaWYgYXR0cnMucG9zaXRpb24gPT0gMVxuICAgICAgZGF0YS5wdXNoKDIpXG4gICAgICBkYXRhLnB1c2goY2hhck1hcFthdHRycy5rZXldIHx8IDQpXG5cbiAgICByZXR1cm4gZGF0YVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9Db2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogTWFjcm9Nb2RlbFxuICBjb21wYXJhdG9yOiAnb3JkZXInXG5cbiAgIyBsb2FkRXhhbXBsZVxuICAjIFJlc2V0cyB0aGUgY29sbGVjdGlvbiB0byBvbmUgb2YgdGhlIGV4YW1wbGVzXG4gIGxvYWRFeGFtcGxlOiAoZXhhbXBsZV9pZCkgLT5cblxuICAgICMgUmVzZXRzIHRoZSBjb2xsZWN0aW9uIHdpdGggdGhlIGRhdGEgZGVmaW5lZCBpbiB0aGUgRXhhbXBsZXMgb2JqZWN0XG4gICAgQHJlc2V0KE1hY3JvRXhhbXBsZXNbZXhhbXBsZV9pZF0pXG5cblxuICAjIGJ1aWxkXG4gICMgQ29tcGlsZXMgdGhlIGNvbXBsZXRlIG1hY3JvIGZyb20gZWFjaCBtYWNybyBtb2RlbFxuICBidWlsZDogLT5cbiAgICBkYXRhID0gW11cbiAgICBfLmVhY2goQG1vZGVscywgKG1hY3JvKSA9PlxuICAgICAgIyBjb25zb2xlLmxvZyAnRUFDSCBNQUNSTydcbiAgICAgICMgY29uc29sZS5sb2cgbWFjcm8uZ2V0S2V5RGF0YSgpXG4gICAgICBkYXRhID0gZGF0YS5jb25jYXQobWFjcm8uZ2V0S2V5RGF0YSgpKVxuICAgIClcblxuICAgIHJldHVybiBkYXRhXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1vZGVsOiAgICAgIE1hY3JvTW9kZWxcbiAgQ29sbGVjdGlvbjogTWFjcm9Db2xsZWN0aW9uXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiSFwiLFxuICAgIFwia2V5Y29kZVwiOiA3MixcbiAgICBcIm9yZGVyXCI6IDIsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDNcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDQsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkxcIixcbiAgICBcImtleWNvZGVcIjogNzYsXG4gICAgXCJvcmRlclwiOiA1LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJMXCIsXG4gICAgXCJrZXljb2RlXCI6IDc2LFxuICAgIFwib3JkZXJcIjogNixcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiT1wiLFxuICAgIFwia2V5Y29kZVwiOiA3OSxcbiAgICBcIm9yZGVyXCI6IDcsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiA4XG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIjFcIixcbiAgICBcInNoaWZ0XCI6IFwiIVwiLFxuICAgIFwia2V5Y29kZVwiOiA0OSxcbiAgICBcIm9yZGVyXCI6IDksXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDEwXG4gIH1cbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJrZXlcIjogXCJSXCIsXG4gICAgXCJrZXljb2RlXCI6IDgyLFxuICAgIFwib3JkZXJcIjogMSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDIsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNcIixcbiAgICBcImtleWNvZGVcIjogODMsXG4gICAgXCJvcmRlclwiOiAzLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJVXCIsXG4gICAgXCJrZXljb2RlXCI6IDg1LFxuICAgIFwib3JkZXJcIjogNCxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiTVwiLFxuICAgIFwia2V5Y29kZVwiOiA3NyxcbiAgICBcIm9yZGVyXCI6IDUsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkFMVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxOCxcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogNlxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJgXCIsXG4gICAgXCJzaGlmdFwiOiBcIn5cIixcbiAgICBcImtleWNvZGVcIjogMTkyLFxuICAgIFwib3JkZXJcIjogNyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDhcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDksXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH1cbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDJcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiLVwiLFxuICAgIFwic2hpZnRcIjogXCJfXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4OSxcbiAgICBcIm9yZGVyXCI6IDMsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDRcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDVcbiAgfVxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBcImtleVwiOiBcIkNUUkxcIixcbiAgICBcImtleWNvZGVcIjogMTcsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiAyXG4gIH0sXG4gIHtcbiAgICBcInJvd1wiOiBcIm5hdl9yMFwiLFxuICAgIFwia2V5XCI6IFwiREVMXCIsXG4gICAgXCJrZXljb2RlXCI6IDQ2LFxuICAgIFwib3JkZXJcIjogMyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDRcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQ1RSTFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNyxcbiAgICBcInBvc2l0aW9uXCI6IDEsXG4gICAgXCJvcmRlclwiOiA1XG4gIH1cbl1cbiIsIlxuIyBFeHBvcnRzIGFuIG9iamVjdCBkZWZpbmluZyB0aGUgZXhhbXBsZSBtYWNyb3Ncbm1vZHVsZS5leHBvcnRzID0ge1xuICBleF8wMTogcmVxdWlyZSgnLi9leGFtcGxlXzEnKVxuICBleF8wMjogcmVxdWlyZSgnLi9leGFtcGxlXzInKVxuICBleF8wMzogcmVxdWlyZSgnLi9leGFtcGxlXzMnKVxuICBleF8wNDogcmVxdWlyZSgnLi9leGFtcGxlXzQnKVxufVxuIiwiTGF5b3V0VmlldyAgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyAjICMgIyAjXG5cbmNsYXNzIERhc2hib2FyZFJvdXRlIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGUnXG5cbiAgdGl0bGU6ICdBc3Ryb0tleSdcblxuICBicmVhZGNydW1iczogW3sgdGV4dDogJ0RldmljZScgfV1cblxuICBmZXRjaDogLT5cbiAgICBAZGV2aWNlID0gUmFkaW8uY2hhbm5lbCgnZGV2aWNlJykucmVxdWVzdCgnbW9kZWwnLCAnZGV2aWNlXzEnKVxuXG4gIHJlbmRlcjogLT5cbiAgICBAY29udGFpbmVyLnNob3cgbmV3IExheW91dFZpZXcoeyBtb2RlbDogQGRldmljZSB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBEYXNoYm9hcmRSb3V0ZVxuIiwiS2V5U2VsZWN0b3IgPSByZXF1aXJlKCcuL2tleVNlbGVjdG9yJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIERldmljZVN0YXR1c1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2RldmljZV9zdGF0dXMnXG4gIGNsYXNzTmFtZTogJ3JvdydcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG5cbiAgICBzdGF0dXMgPSB7XG4gICAgICB0ZXh0OiAnTm90IENvbm5lY3RlZCdcbiAgICAgIGNzczogICdiYWRnZS1kZWZhdWx0J1xuICAgIH1cblxuICAgICMgQ29ubmVjdGVkXG4gICAgaWYgQG1vZGVsLmdldCgnc3RhdHVzX2NvZGUnKSA9PSAxXG5cbiAgICAgIHN0YXR1cyA9IHtcbiAgICAgICAgdGV4dDogJ0Nvbm5lY3RlZCdcbiAgICAgICAgY3NzOiAnYmFkZ2Utc3VjY2VzcydcbiAgICAgIH1cblxuICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzIH1cblxuIyAjICMgIyAjXG5cbmNsYXNzIERldmljZUxheW91dCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93J1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZGV2aWNlX2xheW91dCcpXG5cbiAgcmVnaW9uczpcbiAgICAjIHN0YXR1c1JlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1zdGF0dXNdJ1xuICAgIGtleXNSZWdpb246ICAgJ1tkYXRhLXJlZ2lvbj1rZXlzXSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIFtkYXRhLWNsaWNrPWNvbm5lY3RdJzogJ2Nvbm5lY3RUb0RldmljZSdcblxuICBjb25uZWN0VG9EZXZpY2U6IC0+XG4gICAgUmFkaW8uY2hhbm5lbCgndXNiJykucmVxdWVzdCgnZGV2aWNlcycpLnRoZW4gKGQpID0+IEByZW5kZXIoKVxuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBpZiB3aW5kb3cuZFxuICAgICAgcmV0dXJuIHsgY29ubmVjdGVkOiB0cnVlIH1cbiAgICBlbHNlXG4gICAgICByZXR1cm4geyBjb25uZWN0ZWQ6IGZhbHNlIH1cblxuICBvblJlbmRlcjogLT5cblxuICAgICMgSW5zdGFudGlhdGVzIG5ldyBLZXlTZWxlY3RvciBWaWV3XG4gICAga2V5U2VsZWN0b3IgPSBuZXcgS2V5U2VsZWN0b3IoeyBjb2xsZWN0aW9uOiBAbW9kZWwuZ2V0KCdrZXlzJykgfSlcbiAgICBrZXlTZWxlY3Rvci5vbiAnY2hpbGR2aWV3OnNlbGVjdGVkJywgKHZpZXcpID0+IEB0cmlnZ2VyKCdrZXk6c2VsZWN0ZWQnLCB2aWV3Lm1vZGVsKVxuICAgIGtleVNlbGVjdG9yLm9uICdjaGlsZHZpZXc6ZGVzZWxlY3RlZCcsICh2aWV3KSA9PiBAdHJpZ2dlcigna2V5OmRlc2VsZWN0ZWQnKVxuICAgIEBrZXlzUmVnaW9uLnNob3coa2V5U2VsZWN0b3IpXG5cbiAgICAjIFN0YXR1cyBWaWV3XG4gICAgIyBUT0RPIC0gc3RhdHVzICYgY29ubmVjdGlvbiB2aWV3XG4gICAgIyBAc3RhdHVzUmVnaW9uLnNob3cgbmV3IERldmljZVN0YXR1c1ZpZXcoeyBtb2RlbDogQG1vZGVsIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IERldmljZUxheW91dFxuXG5cbiIsIlNpbXBsZU5hdiA9IHJlcXVpcmUgJ2xpYi92aWV3cy9zaW1wbGVfbmF2J1xuXG4jICMgIyAjICNcblxuY2xhc3MgRWRpdG9yU2VsZWN0b3IgZXh0ZW5kcyBTaW1wbGVOYXZcbiAgY2xhc3NOYW1lOiAncm93IGgtMTAwJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZWRpdG9yX3NlbGVjdG9yJylcblxuICBiZWhhdmlvcnM6XG4gICAgVG9vbHRpcHM6IHt9XG5cbiAgbmF2SXRlbXM6IFtcbiAgICB7IGljb246ICdmYS1rZXlib2FyZC1vJywgIHRleHQ6ICdNYWNybycsICB0cmlnZ2VyOiAnbWFjcm8nIH1cbiAgICB7IGljb246ICdmYS1maWxlLXRleHQtbycsIHRleHQ6ICdTbmlwcGV0JywgICB0cmlnZ2VyOiAndGV4dCcgfVxuICAgICMgeyBpY29uOiAnZmEtYXN0ZXJpc2snLCAgICB0ZXh0OiAnS2V5JywgICAgdHJpZ2dlcjogJ2tleScsIGRpc2FibGVkOiB0cnVlLCBjc3M6ICdkaXNhYmxlZCcsIHRpdGxlOiAnQ29taW5nIFNvb24nIH1cbiAgXVxuXG4gIG9uUmVuZGVyOiAtPlxuICAgIGNvbmZpZ01vZGVsID0gQG1vZGVsLmdldCgnY29uZmlnJylcbiAgICB0cmlnZ2VyID0gY29uZmlnTW9kZWwuZ2V0KCd0eXBlJylcbiAgICByZXR1cm4gQCQoXCJbZGF0YS10cmlnZ2VyPSN7dHJpZ2dlcn1dXCIpLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gIG9uTmF2aWdhdGVNYWNybzogLT5cbiAgICBAdHJpZ2dlciAnc2hvdzptYWNybzplZGl0b3InXG5cbiAgb25OYXZpZ2F0ZVRleHQ6IC0+XG4gICAgQHRyaWdnZXIgJ3Nob3c6dGV4dDplZGl0b3InXG5cbiAgb25OYXZpZ2F0ZUtleTogLT5cbiAgICBAdHJpZ2dlciAnc2hvdzprZXk6ZWRpdG9yJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JTZWxlY3RvclxuIiwiVGV4dEVkaXRvciA9IHJlcXVpcmUoJy4vdGV4dEVkaXRvcicpXG5NYWNyb0VkaXRvciA9IHJlcXVpcmUoJy4vbWFjcm9FZGl0b3InKVxuXG4jICMgIyAjICNcblxuY2xhc3MgRWRpdG9yV3JhcHBlciBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvZWRpdG9yX3dyYXBwZXInXG4gIGNsYXNzTmFtZTogJ3JvdydcblxuICByZWdpb25zOlxuICAgIGNvbnRlbnRSZWdpb246ICdbZGF0YS1yZWdpb249Y29udGVudF0nXG5cbiAgdWk6XG4gICAgcmVjb3JkQnRuOiAnW2RhdGEtY2xpY2s9cmVjb3JkXSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIFtkYXRhLWNsaWNrPXNhdmVdJzogICAgJ29uU2F2ZSdcbiAgICAnY2xpY2sgW2RhdGEtY2xpY2s9Y2xlYXJdJzogICAnb25DbGVhcidcbiAgICAnY2xpY2sgW2RhdGEtY2xpY2s9Y2FuY2VsXSc6ICAnb25DYW5jZWwnXG4gICAgJ2NsaWNrIFtkYXRhLWV4YW1wbGVdJzogICAgICAgJ2xvYWRFeGFtcGxlJ1xuICAgICdjbGljayBAdWkucmVjb3JkQnRuJzogICAgICAgICd0b2dnbGVSZWNvcmQnXG5cbiAgZWRpdG9yczpcbiAgICBtYWNybzogIE1hY3JvRWRpdG9yXG4gICAgdGV4dDogICBUZXh0RWRpdG9yXG4gICAga2V5OiAgICBNYWNyb0VkaXRvclxuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cblxuICAgICMgU2hvcnQtY2lyY3VpdFxuICAgIHJldHVybiB7IG1hY3JvX2VkaXRvcjogdHJ1ZSB9IGlmIEBvcHRpb25zLmVkaXRvciA9PSAnbWFjcm8nXG4gICAgcmV0dXJuIHsgbWFjcm9fZWRpdG9yOiBmYWxzZSB9XG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEZldGNoZXMgdGhlIEVkaXRvclZpZXcgcHJvdG90eXBlXG4gICAgRWRpdG9yVmlldyA9IEBlZGl0b3JzW0BvcHRpb25zLmVkaXRvcl1cblxuICAgICMgSXNvbGF0ZXMgQ29uZmlnXG4gICAgY29uZmlnID0gQG1vZGVsLmdldCgnY29uZmlnJylcblxuICAgICMgQ2FjaGVzIHRoZSBjdXJyZW50IGNvbmZpZ3VyYXRpb24gdG8gYmUgcmVzdG9yZWQgd2hlbiB0aGlzIHZpZXcgaXMgY2FuY2VsbGVkIG91dFxuICAgIEBjYWNoZWRDb25maWcgPSBjb25maWcudG9KU09OKClcblxuICAgICMgSXNvbGF0ZXMgTWFjcm9Db2xsZWN0aW9uXG4gICAgQG1hY3JvcyA9IGNvbmZpZy5nZXQoJ21hY3JvcycpXG5cbiAgICAjIFJlcXVlc3RzIEtleUNvbGxlY3Rpb24gZnJvbSB0aGUgS2V5RmFjdG9yeVxuICAgIGtleXMgPSBSYWRpby5jaGFubmVsKCdrZXknKS5yZXF1ZXN0KCdjb2xsZWN0aW9uJylcblxuICAgICMgSW5zdGFudGlhdGVzIG5ldyBFZGl0b3JWaWV3IGluc3RhbmNlXG4gICAgQGVkaXRvclZpZXcgPSBuZXcgRWRpdG9yVmlldyh7IG1vZGVsOiBjb25maWcsIGtleXM6IGtleXMsIG1hY3JvczogQG1hY3JvcyB9KVxuXG4gICAgIyBMaXN0ZW5zIGZvciAnc3RvcDpyZWNvcmRpbmcnIGV2ZW50XG4gICAgQGVkaXRvclZpZXcub24gJ3N0b3A6cmVjb3JkaW5nJywgPT4gQHRvZ2dsZVJlY29yZCgpXG5cbiAgICAjIFNob3dzIHRoZSB2aWV3IGluIEBjb250ZW50UmVnaW9uXG4gICAgQGNvbnRlbnRSZWdpb24uc2hvdyBAZWRpdG9yVmlld1xuXG4gICMgb25DbGVhclxuICAjIEVtcHRpZXMgdGhlIE1hY3JvQ29sbGVjdGlvblxuICAjIFRPRE8gLSB1bmRvIGJ1dHRvbj9cbiAgb25DbGVhcjogLT5cblxuICAgICMgU3RvcHMgUmVjb3JkaW5nXG4gICAgQHN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyBFbXB0aWVzIHRoZSBNYWNyb0NvbGxlY3Rpb25cbiAgICBAbWFjcm9zLnJlc2V0KClcbiAgICByZXR1cm5cblxuICAjIG9uU2F2ZVxuICBvblNhdmU6IC0+XG5cbiAgICAjIFN0b3BzIFJlY29yZGluZ1xuICAgIEBzdG9wUmVjb3JkaW5nKClcblxuICAgICMgU2VyaWFsaXplcyBkYXRhIGZyb20gYW55IGZvcm0gZWxlbWVudHMgaW4gdGhpcyB2aWV3XG4gICAgZGF0YSA9IEJhY2tib25lLlN5cGhvbi5zZXJpYWxpemUoQClcblxuICAgICMgSGFuZGxlcyBNYWNyb1xuICAgIGlmIGRhdGEudHlwZSA9PSAnbWFjcm8nXG5cbiAgICAgICMgQ2xlYXIgdW51c2VkIHR5cGUtc3BlY2lmaWMgYXR0cmlidXRlc1xuICAgICAgZGF0YS50ZXh0X3ZhbHVlID0gJydcblxuICAgICAgIyBBcHBsaWVzIHRoZSBhdHRyaWJ1dGVzIHRvIHRoZSBjb25maWcgbW9kZWxcbiAgICAgIEBtb2RlbC5nZXQoJ2NvbmZpZycpLnNldChkYXRhKVxuXG4gICAgICAjIFRyaWdnZXJzIGNoYW5nZSBldmVudCBvbiBAbW9kZWwgdG8gcmUtcmVuZGVyIHRoZSBjdXJyZW50bHkgaGlkZGVuIEtleVNlbGVjdG9yXG4gICAgICBAbW9kZWwudHJpZ2dlcignY29uZmlnOnVwZGF0ZWQnKVxuXG4gICAgICAjIEdldHMgdGhlIG1hY3JvSW5kZXhcbiAgICAgIG1hY3JvSW5kZXggPSBAbW9kZWwuZ2V0KCdvcmRlcicpXG5cbiAgICAgICMgR2V0cyBkYXRhIGZyb20gTWFjcm9Db2xsZWN0aW9uLmJ1aWxkKCkgbWV0aG9kXG4gICAgICBkYXRhID0gQG1hY3Jvcy5idWlsZCgpXG5cbiAgICAgICMgVE9ETyAtIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyAnV1JJVElORydcbiAgICAgIGNvbnNvbGUubG9nIGRhdGFcblxuICAgICAgIyBTaG9ydC1jaXJjdWl0c1xuICAgICAgcmV0dXJuIEB0cmlnZ2VyKCdzYXZlJykgdW5sZXNzIHdpbmRvdy5kXG5cbiAgICAgICMgSW52b2tlcyBDaHJvbWVXZWJVU0JTZXJ2aWNlIGRpcmVjdGx5XG4gICAgICAjIFRPRE8gLSBhYnN0cmFjdCB0aGlzIGludG8gdGhlIE1hY3JvIHNlcnZpY2VcbiAgICAgIFJhZGlvLmNoYW5uZWwoJ3VzYicpLnJlcXVlc3QoJ3dyaXRlOm1hY3JvJywgbWFjcm9JbmRleCwgZGF0YSlcbiAgICAgIC50aGVuKCAocmVzcG9uc2UpID0+XG4gICAgICAgIHJldHVybiBAdHJpZ2dlcignc2F2ZScpXG4gICAgICApXG5cbiAgICAjIEhhbmRsZXMgU25pcHBldFxuICAgIGVsc2UgaWYgZGF0YS50eXBlID09ICd0ZXh0J1xuXG4gICAgICAjIENsZWFyIHVudXNlZCB0eXBlLXNwZWNpZmljIGF0dHJpYnV0ZXNcbiAgICAgIGRhdGEubWFjcm9zID0gW11cblxuICAgICAgIyBBcHBsaWVzIHRoZSBhdHRyaWJ1dGVzIHRvIHRoZSBjb25maWcgbW9kZWxcbiAgICAgIEBtb2RlbC5nZXQoJ2NvbmZpZycpLnNldChkYXRhKVxuXG4gICAgICAjIFRyaWdnZXJzIGNoYW5nZSBldmVudCBvbiBAbW9kZWwgdG8gcmUtcmVuZGVyIHRoZSBjdXJyZW50bHkgaGlkZGVuIEtleVNlbGVjdG9yXG4gICAgICBAbW9kZWwudHJpZ2dlcignY29uZmlnOnVwZGF0ZWQnKVxuXG4gICAgICAjIEdldHMgdGhlIG1hY3JvSW5kZXhcbiAgICAgIG1hY3JvSW5kZXggPSBAbW9kZWwuZ2V0KCdvcmRlcicpXG5cbiAgICAgICMgR2V0cyBkYXRhIGZyb20gTWFjcm9Db2xsZWN0aW9uLmJ1aWxkKCkgbWV0aG9kXG4gICAgICAjIFRPRE8gLSBzaG91bGQgYmUgQHNuaXBwZXQuYnVpbGQoKVxuICAgICAgZGF0YSA9IEBtb2RlbC5idWlsZFNuaXBwZXQoZGF0YS50ZXh0X3ZhbHVlKVxuXG4gICAgICAjIFNldHMgdGhlIEBtYWNyb3MgY29sbGVjdGlvbiB3aXRoIHRoZSB1cGRhdGVkIGRhdGFcbiAgICAgICMgVXNlZCB0byBpbnZva2UgbWFjcm9zLmJ1aWxkXG4gICAgICBAbWFjcm9zLnJlc2V0KGRhdGEpXG4gICAgICBkYXRhID0gQG1hY3Jvcy5idWlsZCgpXG5cbiAgICAgICMgU2hvcnQtY2lyY3VpdHNcbiAgICAgIHJldHVybiBAdHJpZ2dlcignc2F2ZScpIHVubGVzcyB3aW5kb3cuZFxuXG4gICAgICAjIEludm9rZXMgQ2hyb21lV2ViVVNCU2VydmljZSBkaXJlY3RseVxuICAgICAgIyBUT0RPIC0gYWJzdHJhY3QgdGhpcyBpbnRvIHRoZSBNYWNybyBzZXJ2aWNlXG4gICAgICBSYWRpby5jaGFubmVsKCd1c2InKS5yZXF1ZXN0KCd3cml0ZTptYWNybycsIG1hY3JvSW5kZXgsIGRhdGEpXG4gICAgICAudGhlbiggKHJlc3BvbnNlKSA9PlxuICAgICAgICByZXR1cm4gQHRyaWdnZXIoJ3NhdmUnKVxuICAgICAgKVxuXG5cbiAgIyBvbkNhbmNlbFxuICBvbkNhbmNlbDogLT5cblxuICAgICMgU3RvcHMgUmVjb3JkaW5nXG4gICAgQHN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyBSZXNldHMgY29uZmlnIGF0dHJpYnV0ZXNcbiAgICBAbW9kZWwuZ2V0KCdjb25maWcnKS5zZXQoQGNhY2hlZENvbmZpZylcblxuICAgICMgVHJpZ2dlcnMgJ2NhbmNlbCcgZXZlbnQsIGNsb3NpbmcgdGhpcyB2aWV3XG4gICAgcmV0dXJuIEB0cmlnZ2VyICdjYW5jZWwnXG5cbiAgIyBsb2FkRXhhbXBsZVxuICAjIEVtcHRpZXMgb3V0IHRoZSBNYWNyb0NvbGxlY2lvbiBhbmQgbG9hZHMgYW4gZXhhbXBsZSBtYWNyb1xuICBsb2FkRXhhbXBsZTogKGUpIC0+XG5cbiAgICAjIFN0b3BzIFJlY29yZGluZ1xuICAgIEBzdG9wUmVjb3JkaW5nKClcblxuICAgICMgQ2FjaGVzIGNsaWNrZWQgZWxcbiAgICBlbCA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuXG4gICAgIyBHZXRzIHRoZSBJRCBvZiB0aGUgZXhhbXBsZSB0byBsb2FkXG4gICAgZXhhbXBsZV9pZCA9IGVsLmRhdGEoJ2V4YW1wbGUnKVxuXG4gICAgIyBJbnZva2VzIHRoZSBsb2FkRXhhbXBsZSBtZXRob2Qgb24gdGhlIE1hY3JvQ29sbGVjdGlvblxuICAgIHJldHVybiBAbWFjcm9zLmxvYWRFeGFtcGxlKGV4YW1wbGVfaWQpXG5cbiAgIyB0b2dnbGVSZWNvcmRcbiAgIyBUb2dnbGVzIHdldGhlciBvciBub3QgdGhlIHVzZXIncyBrZXlib2FyZCBpcyByZWNvcmRpbmcga2V5c3Ryb2tlc1xuICB0b2dnbGVSZWNvcmQ6IChlKSAtPlxuICAgIHJldHVybiBAc3RvcFJlY29yZGluZygpIGlmIEBpc1JlY29yZGluZ1xuICAgIEBzdGFydFJlY29yZGluZygpXG5cbiAgIyBzdG9wUmVjb3JkaW5nXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG5cbiAgICAjIFNldHMgQGlzUmVjb3JkaW5nIGZsYWdcbiAgICBAaXNSZWNvcmRpbmcgPSBmYWxzZVxuXG4gICAgIyBVcGRhdGVzIHRoZSBFZGl0b3JWaWV3IGluc3RhbmNlIHRvIGlnbm9yZSBrZXlib2FyZCBpbnB1dFxuICAgIEBlZGl0b3JWaWV3LmtleWJvYXJkU2VsZWN0b3I/LmN1cnJlbnQuc3RvcFJlY29yZGluZygpXG5cbiAgICAjIFVwZGF0ZXMgdGhlIEB1aS5yZWNvcmRCdG4gZWxlbWVudFxuICAgIEB1aS5yZWNvcmRCdG4ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoJ2knKS5yZW1vdmVDbGFzcygnZmEtc3BpbiBmYS1jaXJjbGUtby1ub3RjaCcpLmFkZENsYXNzKCdmYS1jaXJjbGUnKVxuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG5cbiAgICAjIEVtcHR5IG1hY3Jvc1xuICAgIEBtYWNyb3MucmVzZXQoKVxuXG4gICAgIyBTZXRzIEBpc1JlY29yZGluZyBmbGFnXG4gICAgQGlzUmVjb3JkaW5nID0gdHJ1ZVxuXG4gICAgIyBVcGRhdGVzIHRoZSBFZGl0b3JWaWV3IGluc3RhbmNlIHRvIGFsbG93IGtleWJvYXJkIGlucHV0XG4gICAgQGVkaXRvclZpZXcua2V5Ym9hcmRTZWxlY3Rvcj8uY3VycmVudC5zdGFydFJlY29yZGluZygpXG5cbiAgICAjIFVwZGF0ZXMgdGhlIEB1aS5yZWNvcmRCdG4gZWxlbWVudFxuICAgIEB1aS5yZWNvcmRCdG4uYWRkQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoJ2knKS5hZGRDbGFzcygnZmEtc3BpbiBmYS1jaXJjbGUtby1ub3RjaCcpLnJlbW92ZUNsYXNzKCdmYS1jaXJjbGUnKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JXcmFwcGVyXG5cblxuXG4iLCJcbmNsYXNzIEtleUNoaWxkIGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0YWdOYW1lOiAnbGknXG4gIGNsYXNzTmFtZTogJ2J0biBidG4tb3V0bGluZS1saWdodCBrZXktLWNoaWxkIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBteC0yJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMva2V5X2NoaWxkJylcblxuICBiZWhhdmlvcnM6XG4gICAgU2VsZWN0YWJsZUNoaWxkOiB7IGRlc2VsZWN0OiB0cnVlIH1cblxuICBtb2RlbEV2ZW50czpcbiAgICAnY29uZmlnOnVwZGF0ZWQnOiAnb25Nb2RlbENoYW5nZSdcblxuICBvbk1vZGVsQ2hhbmdlOiAtPlxuICAgIHJldHVybiBAcmVuZGVyKClcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG5cbiAgICAjIElzb2xhdGVzIEFzdHJvS2V5Q29uZmlnIG1vZGVsXG4gICAgY29uZmlnID0gQG1vZGVsLmdldCgnY29uZmlnJylcblxuICAgICMgTWFjcm9cbiAgICBpZiBjb25maWcuZ2V0KCd0eXBlJykgPT0gJ21hY3JvJ1xuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdNJyB9XG5cbiAgICAjIFRleHRcbiAgICBpZiBjb25maWcuZ2V0KCd0eXBlJykgPT0gJ3RleHQnXG4gICAgICByZXR1cm4geyBsYWJlbDogJ1QnIH1cblxuICAgICMgS2V5XG4gICAgIyBUT0RPIC0gRElTUExBWSBLRVkgSU4gVklFV1xuICAgIGlmIGNvbmZpZy5nZXQoJ3R5cGUnKSA9PSAna2V5J1xuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdLJyB9XG5cbiMgIyAjICMgI1xuXG4jIGNsYXNzIEtleVNlbGVjdG9yIGV4dGVuZHMgTW4uQ29sbGVjdGlvblZpZXdcbiMgICB0YWdOYW1lOiAndWwnXG4jICAgY2xhc3NOYW1lOiAnbGlzdC11bnN0eWxlZCBrZXktLWxpc3QgcHgtMyBweS0zIG15LTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlciBmbGV4LXJvdydcbiMgICBjaGlsZFZpZXc6IEtleUNoaWxkXG5cbmNsYXNzIEtleVNlbGVjdG9yIGV4dGVuZHMgTW4uQ29tcG9zaXRlVmlld1xuICBjbGFzc05hbWU6ICdrZXktLWxpc3QtLXdyYXBwZXIgcHgtMyBweS0zIGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIgbXktNCdcbiAgY2hpbGRWaWV3OiBLZXlDaGlsZFxuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMva2V5X3NlbGVjdG9yJylcbiAgY2hpbGRWaWV3Q29udGFpbmVyOiAndWwnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleVNlbGVjdG9yXG5cblxuIiwiRGV2aWNlTGF5b3V0ID0gcmVxdWlyZSgnLi9kZXZpY2VMYXlvdXQnKVxuRWRpdG9yU2VsZWN0b3IgPSByZXF1aXJlKCcuL2VkaXRvclNlbGVjdG9yJylcbkVkaXRvcldyYXBwZXIgPSByZXF1aXJlKCcuL2VkaXRvcldyYXBwZXInKVxuXG4jICMgIyAjICNcblxuY2xhc3MgSGVscFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2hlbHBfdmlldydcbiAgY2xhc3NOYW1lOiAncm93J1xuXG4jICMgIyAjICNcblxuY2xhc3MgTGF5b3V0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvbGF5b3V0J1xuICBjbGFzc05hbWU6ICdjb250YWluZXItZmx1aWQgZC1mbGV4IGZsZXgtY29sdW1uIHctMTAwIGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIGRldmljZS0tbGF5b3V0J1xuXG4gIHJlZ2lvbnM6XG4gICAgZGV2aWNlUmVnaW9uOiAgICdbZGF0YS1yZWdpb249ZGV2aWNlXSdcbiAgICBzZWxlY3RvclJlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1zZWxlY3Rvcl0nXG4gICAgZWRpdG9yUmVnaW9uOiAgICdbZGF0YS1yZWdpb249ZWRpdG9yXSdcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgRGlzcGxheXMgZGVmYXVsdCBoZWxwIHRleHRcbiAgICBAc2hvd0hlbHBWaWV3KClcblxuICAgICMgSW5zdGFudGlhdGVzIGEgbmV3IERldmljZUxheW91dCBmb3IgY29ubmVjdGluZyB0byBhbiBBc3Ryb0tleVxuICAgICMgYW5kIHNlbGVjdGluZyB3aGljaCBrZXkgdGhlIHVzZXIgd291bGQgbGlrZSB0byBlZGl0XG4gICAgZGV2aWNlVmlldyA9IG5ldyBEZXZpY2VMYXlvdXQoeyBtb2RlbDogQG1vZGVsIH0pXG4gICAgZGV2aWNlVmlldy5vbiAna2V5OnNlbGVjdGVkJywgKGtleU1vZGVsKSA9PiBAc2hvd0VkaXRvclNlbGVjdG9yKGtleU1vZGVsKVxuICAgIGRldmljZVZpZXcub24gJ2tleTpkZXNlbGVjdGVkJywgKCkgPT4gQHNob3dIZWxwVmlldygpXG4gICAgQGRldmljZVJlZ2lvbi5zaG93KGRldmljZVZpZXcpXG5cbiAgICAjIE1hY3JvIERldmVsb3BtZW50IGhhY2tcbiAgICAjIHNldFRpbWVvdXQoID0+XG4gICAgIyAgIEBzaG93RWRpdG9yVmlldyhAbW9kZWwuZ2V0KCdrZXlzJykuZmlyc3QoKSwgJ21hY3JvJylcbiAgICAjICwgMTAwMClcbiAgICAjIEBzaG93RWRpdG9yVmlldyhAbW9kZWwuZ2V0KCdrZXlzJykuZmlyc3QoKSwgJ21hY3JvJylcblxuICBzaG93SGVscFZpZXc6IC0+XG5cbiAgICAjIEluc3RhbnRpYXRlcyBhIG5ldyBIZWxwVmlldyBhbmQgc2hvd3MgaXQgaW4gQHNlbGVjdG9yUmVnaW9uXG4gICAgQHNlbGVjdG9yUmVnaW9uLnNob3cgbmV3IEhlbHBWaWV3KClcblxuICBzaG93RWRpdG9yU2VsZWN0b3I6IChrZXlNb2RlbCkgLT5cblxuICAgICMgSW5zdGFudGFpYXRlcyBuZXcgRWRpdG9yU2VsZWN0b3Igdmlld1xuICAgIGVkaXRvclNlbGVjdG9yID0gbmV3IEVkaXRvclNlbGVjdG9yKHsgbW9kZWw6IGtleU1vZGVsIH0pXG5cbiAgICAjIFNob3dzIE1hY3JvIEVkaXRvclxuICAgIGVkaXRvclNlbGVjdG9yLm9uICdzaG93Om1hY3JvOmVkaXRvcicsID0+IEBzaG93RWRpdG9yVmlldyhrZXlNb2RlbCwgJ21hY3JvJylcblxuICAgICMgU2hvd3MgVGV4dCBFZGl0b3JcbiAgICBlZGl0b3JTZWxlY3Rvci5vbiAnc2hvdzp0ZXh0OmVkaXRvcicsID0+IEBzaG93RWRpdG9yVmlldyhrZXlNb2RlbCwgJ3RleHQnKVxuXG4gICAgIyBTaG93cyBLZXkgRWRpdG9yXG4gICAgZWRpdG9yU2VsZWN0b3Iub24gJ3Nob3c6a2V5OmVkaXRvcicsID0+IEBzaG93RWRpdG9yVmlldyhrZXlNb2RlbCwgJ2tleScpXG5cbiAgICAjIFNob3dzIHRoZSBFZGl0b3JTZWxlY3RvciB2aWV3XG4gICAgQHNlbGVjdG9yUmVnaW9uLnNob3coZWRpdG9yU2VsZWN0b3IpXG5cbiAgc2hvd0VkaXRvclZpZXc6IChrZXlNb2RlbCwgZWRpdG9yKSAtPlxuXG4gICAgIyBBZGp1c3RzIHRoZSBDU1MgdG8gZGlzcGxheSB0aGUgRWRpdG9yV3JhcHBlclxuICAgIEAkZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAjIFJlYWRzIG1hY3JvIGZyb20gZGV2aWNlXG4gICAgIyBOT1RFIC0gdGhpcyBoYXBwZW5zIGFzeW5jaHJvbm91c2x5XG4gICAgIyBXZSBfc2hvdWxkXyBub3QgcmVuZGVyIHRoZSBFZGl0b3JXcmFwcGVyIHZpZXcgdW50aWwgaWYgYSBkZXZpY2UgaXMgbm90IHByZXNlbnQsXG4gICAgIyBidXQgd2Ugd2lsbCBpbiB0aGUgbWVhbnRpbWUgZm9yIGRlbW9uc3RyYXRpb24gcHVycG9zZXNcbiAgICBrZXlNb2RlbC5yZWFkTWFjcm8oKVxuXG4gICAgIyBJbnN0YW50aWF0ZXMgbmV3IEVkaXRvcldyYXBwZXIgdmlld1xuICAgIGVkaXRvcldyYXBwZXIgPSBuZXcgRWRpdG9yV3JhcHBlcih7IG1vZGVsOiBrZXlNb2RlbCwgZWRpdG9yOiBlZGl0b3IgfSlcblxuICAgICMgSGFuZGxlcyAnY2FuY2VsJyBldmVudFxuICAgIGVkaXRvcldyYXBwZXIub24gJ2NhbmNlbCcsID0+XG4gICAgICBAJGVsLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuXG4gICAgIyBIYW5kbGVzICdzYXZlJyBldmVudFxuICAgIGVkaXRvcldyYXBwZXIub24gJ3NhdmUnLCA9PlxuICAgICAgIyBUT0RPIC0gaGl0IHRoZSBLZXlNb2RlbCAvIERldmljZU1vZGVsIHRvIGRvIHRoZSByZXN0IGZyb20gaGVyZVxuICAgICAgQCRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICMgU2hvd3MgdGhlIEVkaXRvcldyYXBwZXIgdmlldyBpbiBAZWRpdG9yUmVnaW9uXG4gICAgQGVkaXRvclJlZ2lvbi5zaG93KGVkaXRvcldyYXBwZXIpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IExheW91dFZpZXdcblxuXG5cbiIsIktleWJvYXJkU2VsZWN0b3IgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3InKVxuTWFjcm9MaXN0ID0gcmVxdWlyZSgnLi9tYWNyb0xpc3QnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9FZGl0b3IgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL21hY3JvX2VkaXRvcidcbiAgY2xhc3NOYW1lOiAncm93IGgtMTAwJ1xuXG4gIHJlZ2lvbnM6XG4gICAgbWFjcm9SZWdpb246ICAgICdbZGF0YS1yZWdpb249bWFjcm9dJ1xuICAgIGNvbnRyb2xzUmVnaW9uOiAnW2RhdGEtcmVnaW9uPWNvbnRyb2xzXSdcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgR2V0cyB0aGUgY3VycmVudCBtYWNybyBhc3NpZ25lZCB0byB0aGUga2V5TW9kZWxcbiAgICAjIG1hY3JvQ29sbGVjdGlvbiA9IGtleU1vZGVsLmdldE1hY3JvQ29sbGVjdGlvbigpXG4gICAgQG1hY3JvUmVnaW9uLnNob3cgbmV3IE1hY3JvTGlzdCh7IGNvbGxlY3Rpb246IEBvcHRpb25zLm1hY3JvcyB9KVxuXG4gICAgIyBJbnN0YW50YWlhdGVzIG5ldyBLZXlib2FyZFNlbGVjdG9yXG4gICAgIyBUT0RPIC0gdGhpcyB3aWxsICpldmVudHVhbGx5KiBkaXNwbGF5IGEgc2VsZWN0b3IgYmV0d2VlbiBkaWZmZXJlbnQgdHlwZXMgb2Yga2V5Ym9hcmRzIC8gc2V0cyBvZiBrZXlzXG4gICAgQGtleWJvYXJkU2VsZWN0b3IgPSBuZXcgS2V5Ym9hcmRTZWxlY3Rvcih7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSlcblxuICAgICMgQnViYmxlcyB1cCBzdG9wOnJlY29yZGluZyBldmVudFxuICAgIEBrZXlib2FyZFNlbGVjdG9yLm9uICdzdG9wOnJlY29yZGluZycsID0+IEB0cmlnZ2VyICdzdG9wOnJlY29yZGluZydcblxuICAgICMgSGFuZGxlcyBLZXlTZWxlY3Rpb24gZXZlbnRcbiAgICBAa2V5Ym9hcmRTZWxlY3Rvci5vbiAna2V5OnNlbGVjdGVkJywgKGtleSkgPT5cblxuICAgICAgIyBDbG9uZXMgdGhlIG9yaWdpbmFsIG9iamVjdFxuICAgICAga2V5ID0gXy5jbG9uZShrZXkpXG5cbiAgICAgICMgQWRkcyB0aGUgY29ycmVjdCBgb3JkZXJgIGF0dHJpYnV0ZVxuICAgICAga2V5Lm9yZGVyID0gQG9wdGlvbnMubWFjcm9zLmxlbmd0aCArIDFcblxuICAgICAgIyBBZGRzIHRoZSBrZXkgdG8gdGhlIE1hY3JvQ29sbGVjdGlvblxuICAgICAgQG9wdGlvbnMubWFjcm9zLmFkZChrZXkpXG5cbiAgICAjIFNob3dzIHRoZSBrZXlib2FyZFZpZXdcbiAgICBAY29udHJvbHNSZWdpb24uc2hvdyBAa2V5Ym9hcmRTZWxlY3RvclxuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG4gICAgQGtleWJvYXJkVmlldy5zdGFydFJlY29yZGluZygpXG5cbiAgIyBzdG9wUmVjb3JkaW5nXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG4gICAgQGtleWJvYXJkVmlldy5zdG9wUmVjb3JkaW5nKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWFjcm9FZGl0b3JcblxuXG5cbiIsIlxuY2xhc3MgTWFjcm9DaGlsZCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGFnTmFtZTogJ2xpJ1xuICBjbGFzc05hbWU6ICdtYWNyby0tY2hpbGQgZmxleC1jb2x1bW4ganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgbXktMidcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL21hY3JvX2NoaWxkJylcblxuICBiZWhhdmlvcnM6XG4gICAgU29ydGFibGVDaGlsZDoge31cbiAgICAjIFRvb2x0aXBzOiB7fVxuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdjaGFuZ2U6cG9zaXRpb24nOiAgJ3JlbmRlcidcbiAgICAnY2hhbmdlOnNoaWZ0ZWQnOiAgICdyZW5kZXInXG5cbiAgIyB1aTpcbiAgIyAgIHRvb2x0aXA6ICdbZGF0YS10b2dnbGU9dG9vbHRpcF0nXG5cbiAgZXZlbnRzOlxuICAgICdkcmFnJzogJ29uRHJhZydcbiAgICAnZHJhZ3N0YXJ0JzogJ29uRHJhZ1N0YXJ0J1xuICAgICdtb3VzZW92ZXIgLmtleSc6ICdvbk1vdXNlT3ZlcidcbiAgICAnbW91c2VvdXQgLmtleSc6ICdvbk1vdXNlT3V0J1xuICAgICdjbGljayAua2V5JzogJ3JlbW92ZU1hY3JvJ1xuICAgICdjbGljayBbZGF0YS1wb3NpdGlvbl06bm90KC5hY3RpdmUpJzogJ29uUG9zaXRpb25DbGljaydcblxuICAjIHN0YXRlOiB7XG4gICMgICB0b29sdGlwT25SZW5kZXI6IGZhbHNlXG4gICMgfVxuXG4gICMgb25SZW5kZXI6IC0+XG4gICMgICByZXR1cm4gdW5sZXNzIEBzdGF0ZS50b29sdGlwT25SZW5kZXJcblxuICAjICAgIyBVbnNldHMgdG9vbHRpcCBmbGFnXG4gICMgICBAc3RhdGUudG9vbHRpcE9uUmVuZGVyID0gZmFsc2VcblxuICAjICAgIyBTaG93cyB0aGUgdG9vbHRpcFxuICAjICAgQHVpLnRvb2x0aXAudG9vbHRpcCgnc2hvdycpXG5cbiAgb25Nb3VzZU92ZXI6IC0+XG4gICAgQCRlbC5hZGRDbGFzcygnaG92ZXJlZCcpXG5cbiAgb25Nb3VzZU91dDogLT5cbiAgICBAJGVsLnJlbW92ZUNsYXNzKCdob3ZlcmVkJylcblxuICBvbkRyYWdTdGFydDogLT5cbiAgICBAJGVsLmFkZENsYXNzKCdkcmFnLXN0YXJ0JylcblxuICBvbkRyYWc6IC0+XG4gICAgQCRlbC5yZW1vdmVDbGFzcygnZHJhZy1zdGFydCBob3ZlcmVkJylcbiAgICBAJGVsLnNpYmxpbmdzKCcubWFjcm8tLWNoaWxkJykucmVtb3ZlQ2xhc3MoJ2RyYWctc3RhcnQgaG92ZXJlZCcpXG5cbiAgcmVtb3ZlTWFjcm86IC0+XG4gICAgIyBjb25zb2xlLmxvZyBAbW9kZWxcbiAgICAjIEBtb2RlbC5zZXQoJ3NoaWZ0ZWQnLCAhQG1vZGVsLmdldCgnc2hpZnRlZCcpKVxuICAgIEBtb2RlbC5jb2xsZWN0aW9uLnJlbW92ZShAbW9kZWwpXG5cbiAgb25Qb3NpdGlvbkNsaWNrOiAoZSkgLT5cblxuICAgICMgRGlzcGxheXMgdGhlIHRvb2x0aXAgYWZ0ZXIgdGhlIHZpZXcgcmUtcmVuZGVyc1xuICAgICMgQHN0YXRlLnRvb2x0aXBPblJlbmRlciA9IHRydWVcblxuICAgICMgQ2xlYXJzIGFjdGl2ZSB0b29sdGlwc1xuICAgICMgQGNsZWFyVG9vbHRpcHMoKVxuXG4gICAgIyBDYWNoZXMgY2xpY2tlZCBlbFxuICAgIGVsID0gJChlLmN1cnJlbnRUYXJnZXQpXG5cbiAgICAjIElzb2xhdGVzIHBvc2l0aW9uIGRhdGEgZnJvbSBlbGVtZW50XG4gICAgcG9zaXRpb24gPSBlbC5kYXRhKCdwb3NpdGlvbicpXG5cbiAgICAjIERldGVybWluZXMgbmV4dCBwb3NpdGlvblxuICAgIGlmIHBvc2l0aW9uID09IC0xXG4gICAgICBuZXdfcG9zaXRpb24gPSAxXG4gICAgaWYgcG9zaXRpb24gPT0gMFxuICAgICAgbmV3X3Bvc2l0aW9uID0gLTFcbiAgICBpZiBwb3NpdGlvbiA9PSAxXG4gICAgICBuZXdfcG9zaXRpb24gPSAwXG5cbiAgICAjIFNldHMgdGhlIHBvc2l0aW9uIGF0dHJpYnV0ZSBvbiB0aGUgbW9kZWxcbiAgICBAbW9kZWwuc2V0KCdwb3NpdGlvbicsIG5ld19wb3NpdGlvbilcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAgcG9zaXRpb25zID0gW1xuICAgICAgeyBwb3NpdGlvbjogLTEsIGNzczogJ2ZhLWxvbmctYXJyb3ctZG93bicsIHRvb2x0aXA6ICdLZXkgRG93bicgfVxuICAgICAgeyBwb3NpdGlvbjogMCwgY3NzOiAnZmEtYXJyb3dzLXYnLCB0b29sdGlwOiAnS2V5IERvd24gfCBVcCcgfVxuICAgICAgeyBwb3NpdGlvbjogMSwgY3NzOiAnZmEtbG9uZy1hcnJvdy11cCcsIHRvb2x0aXA6ICdLZXkgVXAnIH1cbiAgICBdXG5cbiAgICBwb3NpdGlvbiA9IEBtb2RlbC5nZXQoJ3Bvc2l0aW9uJylcbiAgICBhY3RpdmVfcG9zaXRpb24gPSBfLmZpbmRXaGVyZShwb3NpdGlvbnMsIHsgcG9zaXRpb246IHBvc2l0aW9uIH0pXG4gICAgcmV0dXJuIHsgYWN0aXZlX3Bvc2l0aW9uIH1cblxuIyAjICMgIyAjXG5cbmNsYXNzIE1hY3JvRW1wdHkgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnbWFjcm8tLWNoaWxkIGVtcHR5IGZsZXgtY29sdW1uIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIG15LTInXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9tYWNyb19lbXB0eScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBNYWNyb0xpc3QgZXh0ZW5kcyBNbi5Db2xsZWN0aW9uVmlld1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ2xpc3QtdW5zdHlsZWQgbWFjcm8tLWxpc3QgcHgtNCBteS0yIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBmbGV4LXJvdyBmbGV4LXdyYXAnXG4gIGNoaWxkVmlldzogTWFjcm9DaGlsZFxuICBlbXB0eVZpZXc6IE1hY3JvRW1wdHlcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgU29ydHMgdGhlIGNvbGxlY3Rpb25cbiAgICBAY29sbGVjdGlvbi5zb3J0KClcblxuICAgICMgSW5pdGlhbGl6ZXMgU29ydGFibGUgY29udGFpbmVyXG4gICAgU29ydGFibGUuY3JlYXRlIEBlbCxcbiAgICAgIGFuaW1hdGlvbjogICAgMTUwXG4gICAgICBoYW5kbGU6ICAgICAgICcua2V5J1xuICAgICAgZ2hvc3RDbGFzczogICAnZ2hvc3QnICAjIENsYXNzIG5hbWUgZm9yIHRoZSBkcm9wIHBsYWNlaG9sZGVyXG4gICAgICBjaG9zZW5DbGFzczogICdjaG9zZW4nICAjIENsYXNzIG5hbWUgZm9yIHRoZSBjaG9zZW4gaXRlbVxuICAgICAgZHJhZ0NsYXNzOiAgICAnZHJhZycgICMgQ2xhc3MgbmFtZSBmb3IgdGhlIGRyYWdnaW5nIGl0ZW1cbiAgICAgICMgZ3JvdXA6XG4gICAgICAjICAgbmFtZTogJ21hY3JvJ1xuICAgICAgIyAgIHB1bGw6IGZhbHNlXG4gICAgICAjICAgcHV0OiAgdHJ1ZVxuICAgICAgZmFsbGJhY2tUb2xlcmFuY2U6IDEwMFxuICAgICAgb25FbmQ6IChlKSA9PiBAcmVvcmRlckNvbGxlY3Rpb24oKVxuXG4gICMgcmVvcmRlckNvbGxlY3Rpb25cbiAgIyBJbnZva2VkIGFmdGVyIHNvcnRpbmcgaGFzIGNvbXBsZXRlZFxuICByZW9yZGVyQ29sbGVjdGlvbjogPT5cblxuICAgICMgVHJpZ2dlcnMgb3JkZXIgZXZlbnRzIG9uIENvbGxlY3Rpb25WaWV3IGNoaWxkVmlldyAkZWxzXG4gICAgb3JkZXIgPSAxXG4gICAgZm9yIGVsIGluIEBlbC5jaGlsZHJlblxuICAgICAgJChlbCkudHJpZ2dlcignc29ydGVkJyxvcmRlcilcbiAgICAgIG9yZGVyKytcblxuICAgICMgQGNvbGxlY3Rpb24uc29ydCgpXG4gICAgQHJlbmRlcigpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hY3JvTGlzdFxuXG5cbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGNvbm5lY3RlZCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIG1iLTRcXFwiPlwiKTtcbmlmICggY29ubmVjdGVkKVxue1xuYnVmLnB1c2goXCI8YnV0dG9uIGRhdGEtY2xpY2s9XFxcImRpc2Nvbm5lY3RcXFwiIGNsYXNzPVxcXCJidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtdGltZXMgbXItMVxcXCI+PC9pPkRJU0NPTk5FQ1Q8L2J1dHRvbj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxidXR0b24gZGF0YS1jbGljaz1cXFwiY29ubmVjdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnlcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS11c2IgbXItMVxcXCI+PC9pPkNPTk5FQ1Q8L2J1dHRvbj5cIik7XG59XG5idWYucHVzaChcIjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcImtleXNcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyXFxcIj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJjb25uZWN0ZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNvbm5lY3RlZDp0eXBlb2YgY29ubmVjdGVkIT09XCJ1bmRlZmluZWRcIj9jb25uZWN0ZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobGFiZWwpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3cgZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlclxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEwXFxcIj48cCBjbGFzcz1cXFwibGVhZCBtYi0wXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGxhYmVsKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3A+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTIgdGV4dC1yaWdodCB0ZXh0LW11dGVkXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtcGVuY2lsXFxcIj48L2k+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibGFiZWxcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmxhYmVsOnR5cGVvZiBsYWJlbCE9PVwidW5kZWZpbmVkXCI/bGFiZWw6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobmF2SXRlbXMsIHVuZGVmaW5lZCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBmbGV4LXJvdyBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGkgY2xhc3M9XFxcImQtZmxleCBmYSBmYS1mdyBmYS0yeCBmYS1hcnJvdy1jaXJjbGUtby1kb3duIG1yLTFcXFwiPjwvaT48cCBzdHlsZT1cXFwibGV0dGVyLXNwYWNpbmc6IDAuMjVyZW07IGZvbnQtd2VpZ2h0OiAyMDA7XFxcIiBjbGFzcz1cXFwiZC1mbGV4IGxlYWQgbS0wXFxcIj5TZWxlY3QgYW4gZWRpdG9yPC9wPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvdyBtdC01XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlwiKTtcbi8vIGl0ZXJhdGUgbmF2SXRlbXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbmF2SXRlbXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIlwiICsgKGphZGUuYXR0cihcInRpdGxlXCIsIG5hdkl0ZW0udGl0bGUsIHRydWUsIGZhbHNlKSkgKyBcIiBkYXRhLXBsYWNlbWVudD1cXFwiYm90dG9tXFxcIiBzdHlsZT1cXFwiZmxleC1ncm93OjE7XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEtdHJpZ2dlclwiLCBuYXZJdGVtLnRyaWdnZXIsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5hdHRyKFwiZGlzYWJsZWRcIiwgbmF2SXRlbS5kaXNhYmxlZCwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmNscyhbJ2QtZmxleCcsJ2J0bicsJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsJ2p1c3RpZnktY29udGVudC1jZW50ZXInLCdteC0zJyxuYXZJdGVtLmNzc10sIFtudWxsLG51bGwsbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbmF2SXRlbS50ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2J1dHRvbj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCJcIiArIChqYWRlLmF0dHIoXCJ0aXRsZVwiLCBuYXZJdGVtLnRpdGxlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1wbGFjZW1lbnQ9XFxcImJvdHRvbVxcXCIgc3R5bGU9XFxcImZsZXgtZ3JvdzoxO1xcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLXRyaWdnZXJcIiwgbmF2SXRlbS50cmlnZ2VyLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuYXR0cihcImRpc2FibGVkXCIsIG5hdkl0ZW0uZGlzYWJsZWQsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydkLWZsZXgnLCdidG4nLCdidG4tb3V0bGluZS1zZWNvbmRhcnknLCdqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJywnbXgtMycsbmF2SXRlbS5jc3NdLCBbbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcIm5hdkl0ZW1zXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5uYXZJdGVtczp0eXBlb2YgbmF2SXRlbXMhPT1cInVuZGVmaW5lZFwiP25hdkl0ZW1zOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChtYWNyb19lZGl0b3IpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcImNhbmNlbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IG14LTIgcHgtNFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IG14LTQgZmEtYW5nbGUtbGVmdFxcXCI+PC9pPjwvYnV0dG9uPjxidXR0b24gZGF0YS1jbGljaz1cXFwic2F2ZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtc3VjY2VzcyBteC0yIHB4LTRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS0yeCBteC00IGZhLWNoZWNrLWNpcmNsZS1vXFxcIj48L2k+PC9idXR0b24+XCIpO1xuaWYgKCBtYWNyb19lZGl0b3IpXG57XG5idWYucHVzaChcIjxidXR0b24gZGF0YS1jbGljaz1cXFwiY2xlYXJcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXdhcm5pbmcgbXgtMiBweC00XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtMnggbXgtNCBmYS10aW1lc1xcXCI+PC9pPjwvYnV0dG9uPjxidXR0b24gZGF0YS1jbGljaz1cXFwicmVjb3JkXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1kYW5nZXIgbXgtMiBweC00XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtMnggbXgtNCBmYS1jaXJjbGVcXFwiPjwvaT48L2J1dHRvbj48ZGl2IGNsYXNzPVxcXCJidG4tZ3JvdXBcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLXRvZ2dsZT1cXFwiZHJvcGRvd25cXFwiIGFyaWEtaGFzcG9wdXA9XFxcInRydWVcXFwiIGFyaWEtZXhwYW5kZWQ9XFxcImZhbHNlXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1wcmltYXJ5IGRyb3Bkb3duLXRvZ2dsZSBteC0yIHB4LTRcXFwiPkV4YW1wbGVzPC9idXR0b24+PGRpdiBjbGFzcz1cXFwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0IG10LTNcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWV4YW1wbGU9XFxcImV4XzAxXFxcIiBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+RXguIDE6IFxcXCJIZWxsbyFcXFwiPC9idXR0b24+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZXhhbXBsZT1cXFwiZXhfMDJcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1pdGVtXFxcIj5FeC4gMjogXFxcIlJlc3Vtw6hcXFwiPC9idXR0b24+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZXhhbXBsZT1cXFwiZXhfMDNcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1pdGVtXFxcIj5FeC4gMzogRW0gRGFzaCAo4oCUKTwvYnV0dG9uPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWV4YW1wbGU9XFxcImV4XzA0XFxcIiBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+RXguIDQ6IENUUkwgKyBBTFQgKyBERUxFVEU8L2J1dHRvbj48L2Rpdj48L2Rpdj5cIik7XG59XG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGhyLz48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJjb250ZW50XFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJtYWNyb19lZGl0b3JcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm1hY3JvX2VkaXRvcjp0eXBlb2YgbWFjcm9fZWRpdG9yIT09XCJ1bmRlZmluZWRcIj9tYWNyb19lZGl0b3I6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXggZmxleC1yb3cgYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxpIGNsYXNzPVxcXCJkLWZsZXggZmEgZmEtZncgZmEtMnggZmEtcXVlc3Rpb24tY2lyY2xlLW8gbXItMVxcXCI+PC9pPjxwIHN0eWxlPVxcXCJsZXR0ZXItc3BhY2luZzogMC4yNXJlbTsgZm9udC13ZWlnaHQ6IDIwMDtcXFwiIGNsYXNzPVxcXCJkLWZsZXggbGVhZCBtLTBcXFwiPkNsaWNrIGEga2V5IHRvIGVkaXQ8L3A+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93IG10LTVcXFwiPjxkaXYgc3R5bGU9XFxcIm9wYWNpdHk6MFxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGJ1dHRvbiBkaXNhYmxlZD1cXFwiZGlzYWJsZWRcXFwiIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG14LTNcXFwiPkJMQU5LPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGxhYmVsKSB7XG5idWYucHVzaChcIjxzcGFuPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGFiZWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Bhbj5cIik7fS5jYWxsKHRoaXMsXCJsYWJlbFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubGFiZWw6dHlwZW9mIGxhYmVsIT09XCJ1bmRlZmluZWRcIj9sYWJlbDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8dWwgY2xhc3M9XFxcImxpc3QtdW5zdHlsZWQga2V5LS1saXN0IGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXIgZmxleC1yb3cgbXktMlxcXCI+PC91bD48aW1nIHNyYz1cXFwiLi9pbWcvaWNvbl93aGl0ZS5zdmdcXFwiIGNsYXNzPVxcXCJsb2dvXFxcIi8+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvdyBoLTEwMCB3LTEwMCBlZGl0b3ItLW92ZXJsYXlcXFwiPjxkaXYgZGF0YS1yZWdpb249XFxcImVkaXRvclxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBwdC0yXFxcIj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3cgZGV2aWNlLS1vdmVybGF5XFxcIj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJkZXZpY2VcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcInNlbGVjdG9yXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyIHB0LTVcXFwiPjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChhY3RpdmVfcG9zaXRpb24sIGFscGhhLCBjc3MsIGtleSwgc2hpZnRfa2V5LCBzaGlmdGVkLCBzcGVjaWFsKSB7XG5qYWRlX21peGluc1tcInBvc2l0aW9uU2VsZWN0XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPHNwYW4gZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiXCIgKyAoamFkZS5hdHRyKFwidGl0bGVcIiwgb3B0cy50b29sdGlwLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1wbGFjZW1lbnQ9XFxcImJvdHRvbVxcXCJcIiArIChqYWRlLmNscyhbJ2ZhLXN0YWNrJywnZmEtbGcnLCdwb3NpdGlvbi0tc2VsZWN0JyxgcG9zaXRpb25fJHtvcHRzLnBvc2l0aW9ufWBdLCBbbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1jaXJjbGUtdGhpbiBmYS1zdGFjay0yeFxcXCI+PC9pPjxpIGNsYXNzPVxcXCJmYSBmYS1zdGFjay0xeCBmYS1zdGFja1xcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWNpcmNsZS10aGluIGZhLXN0YWNrLTJ4IGZhLTJ4XFxcIj48L2k+PGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLXBvc2l0aW9uXCIsIG9wdHMucG9zaXRpb24sIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydmYScsJ2ZhLXN0YWNrLTF4JyxvcHRzLmNzc10sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT48L2k+PC9zcGFuPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXZcIiArIChqYWRlLmNscyhbJ2tleScsJ2QtZmxleCcsdHlwZW9mIHNwZWNpYWwgPT09IFwidW5kZWZpbmVkXCIgPyBcIlwiIDogXCJzcGVjaWFsXCJdLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48ZGl2XCIgKyAoamFkZS5jbHMoWydpbm5lcicsJ2NvbnRlbnQnLGNzc10sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggc2hpZnRlZCB8fCBzaGlmdF9rZXkgJiYgIWFscGhhKVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJzaGlmdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBzaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0ga2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0ga2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5idWYucHVzaChcIjwvZGl2PjxkaXYgY2xhc3M9XFxcImlubmVyIGhvdmVyXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtbGcgZmEtdGltZXNcXFwiPjwvaT48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJwb3NpdGlvbiBtdC0yXFxcIj5cIik7XG5qYWRlX21peGluc1tcInBvc2l0aW9uU2VsZWN0XCJdKGFjdGl2ZV9wb3NpdGlvbik7XG5idWYucHVzaChcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImFjdGl2ZV9wb3NpdGlvblwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguYWN0aXZlX3Bvc2l0aW9uOnR5cGVvZiBhY3RpdmVfcG9zaXRpb24hPT1cInVuZGVmaW5lZFwiP2FjdGl2ZV9wb3NpdGlvbjp1bmRlZmluZWQsXCJhbHBoYVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguYWxwaGE6dHlwZW9mIGFscGhhIT09XCJ1bmRlZmluZWRcIj9hbHBoYTp1bmRlZmluZWQsXCJjc3NcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNzczp0eXBlb2YgY3NzIT09XCJ1bmRlZmluZWRcIj9jc3M6dW5kZWZpbmVkLFwia2V5XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5rZXk6dHlwZW9mIGtleSE9PVwidW5kZWZpbmVkXCI/a2V5OnVuZGVmaW5lZCxcInNoaWZ0X2tleVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc2hpZnRfa2V5OnR5cGVvZiBzaGlmdF9rZXkhPT1cInVuZGVmaW5lZFwiP3NoaWZ0X2tleTp1bmRlZmluZWQsXCJzaGlmdGVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5zaGlmdGVkOnR5cGVvZiBzaGlmdGVkIT09XCJ1bmRlZmluZWRcIj9zaGlmdGVkOnVuZGVmaW5lZCxcInNwZWNpYWxcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnNwZWNpYWw6dHlwZW9mIHNwZWNpYWwhPT1cInVuZGVmaW5lZFwiP3NwZWNpYWw6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwidHlwZVxcXCIgdmFsdWU9XFxcIm1hY3JvXFxcIiByZWFkb25seT1cXFwicmVhZG9ubHlcXFwiLz48ZGl2IGRhdGEtcmVnaW9uPVxcXCJtYWNyb1xcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48aHIvPjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcImNvbnRyb2xzXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPHAgY2xhc3M9XFxcImxlYWQgdGV4dC1jZW50ZXJcXFwiPk1hY3Jvczxici8+PHNtYWxsPkV4ZWN1dGUga2V5c3Ryb2tlcyBpbiBhIHNwZWNpZmljIHNlcXVlbmNlPC9zbWFsbD48L3A+PHNtYWxsIHN0eWxlPVxcXCJmb250LXNpemU6IDFyZW07XFxcIiBjbGFzcz1cXFwidGV4dC1tdXRlZCBkLWZsZXggZmxleC1yb3cganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXJcXFwiPjxkaXYgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLXF1ZXN0aW9uLWNpcmNsZS1vIG1yLTEgZC1mbGV4IGZsZXgtY29sdW1uXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJkLWZsZXggZmxleC1yb3dcXFwiPjxzcGFuPlVzZSB0aGUga2V5cyBiZWxvdywgb3IgY2xpY2smbmJzcDs8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRleHQtZGFuZ2VyXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtY2lyY2xlIHRleHQtZGFuZ2VyXFxcIj48L2k+IHJlY29yZCZuYnNwOzwvc3Bhbj4mbmJzcDt0byBzdGFydCB0eXBpbmc8L2Rpdj48L3NtYWxsPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuamFkZV9taXhpbnNbXCJmb3JtR3JvdXBcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8ZmllbGRzZXRcIiArIChqYWRlLmNscyhbJ2Zvcm0tZ3JvdXAnLG9wdHMuZm9ybUdyb3VwQ3NzXSwgW251bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggb3B0cy5sYWJlbClcbntcbmJ1Zi5wdXNoKFwiPGxhYmVsIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wtbGFiZWxcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5sYWJlbCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9sYWJlbD5cIik7XG59XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L2ZpZWxkc2V0PlwiKTtcbn07XG5idWYucHVzaChcIlwiKTtcbmphZGVfbWl4aW5zW1wiZm9ybUlucHV0XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmphZGVfbWl4aW5zW1wiZm9ybUdyb3VwXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5idWYucHVzaChcIjxpbnB1dFwiICsgKGphZGUuYXR0cnMoamFkZS5tZXJnZShbe1wicGxhY2Vob2xkZXJcIjogamFkZS5lc2NhcGUob3B0cy5wbGFjZWhvbGRlciksXCJuYW1lXCI6IGphZGUuZXNjYXBlKG9wdHMubmFtZSksXCJ0eXBlXCI6IGphZGUuZXNjYXBlKG9wdHMudHlwZSksXCJjbGFzc1wiOiBcImZvcm0tY29udHJvbFwifSxhdHRyaWJ1dGVzXSksIGZhbHNlKSkgKyBcIi8+XCIpO1xufVxufSwgb3B0cyk7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctOFxcXCI+PGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwidHlwZVxcXCIgdmFsdWU9XFxcInRleHRcXFwiIHJlYWRvbmx5PVxcXCJyZWFkb25seVxcXCIvPlwiKTtcbmphZGVfbWl4aW5zW1wiZm9ybUlucHV0XCJdLmNhbGwoe1xuYXR0cmlidXRlczogamFkZS5tZXJnZShbeyBjbGFzczogJ2Zvcm0tY29udHJvbC1sZycgfV0pXG59LCB7IG5hbWU6ICd0ZXh0X3ZhbHVlJywgdHlwZTogJ3RleHQnLCBwbGFjZWhvbGRlcjogJ0VudGVyIHNvbWUgdGV4dCBoZXJlLi4uJyB9KTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxuY2xhc3MgVGV4dEVkaXRvciBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICBjbGFzc05hbWU6ICdyb3cgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXInXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy90ZXh0X2VkaXRvcicpXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgQmFja2JvbmUuU3lwaG9uLmRlc2VyaWFsaXplKEAsIHsgdHlwZTogJ3RleHQnLCB0ZXh0X3ZhbHVlOiBAbW9kZWwuZ2V0KCd0ZXh0X3ZhbHVlJykgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dEVkaXRvclxuIiwiXG4jIER1bW15IERldmljZSBEYXRhIGZvciBVSSBkZXZlbG9wbWVudFxuIyBUT0RPIC0gcHVsbCBmcm9tIFdlYlVTQj9cbm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgaWQ6ICdkZXZpY2VfMScsXG4gICAgbGFiZWw6ICdBbGV4XFwncyBBc3Ryb0tleScsXG4gICAgc3RhdHVzX2NvZGU6IDEsXG4gICAga2V5czogW1xuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV8xJywgb3JkZXI6ICcweDAwMDAnLCBjb25maWc6IHsgdHlwZTogJ21hY3JvJywgbWFjcm9zOiBbXSB9IH1cbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfMicsIG9yZGVyOiAnMHgwMDAxJywgY29uZmlnOiB7IHR5cGU6ICdtYWNybycsIG1hY3JvczogW10gfSB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzMnLCBvcmRlcjogJzB4MDAwMicsIGNvbmZpZzogeyB0eXBlOiAnbWFjcm8nLCBtYWNyb3M6IFtdIH0gfVxuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV80Jywgb3JkZXI6ICcweDAwMDMnLCBjb25maWc6IHsgdHlwZTogJ21hY3JvJywgbWFjcm9zOiBbXSB9IH1cbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfNScsIG9yZGVyOiAnMHgwMDA0JywgY29uZmlnOiB7IHR5cGU6ICdtYWNybycsIG1hY3JvczogW10gfSB9XG4gICAgXVxuICB9XG5dXG4iLCJNYWNyb0VudGl0aWVzID0gcmVxdWlyZSgnLi4vbWFjcm8vZW50aXRpZXMnKVxuTWFjcm9LZXlzID0gcmVxdWlyZSgnLi4va2V5L2tleXMnKVxuQ2hhcmFjdGVyTWFwID0gcmVxdWlyZSgnbGliL2NoYXJhY3Rlcl9tYXAnKVxuSW52ZXJ0ZWRDaGFyYWN0ZXJNYXAgPSBfLmludmVydChDaGFyYWN0ZXJNYXApXG5cbiMgIyAjICMgI1xuXG4jIEFjY2VwdHMgYW4gYXJyYXkgYW5kIHNwbGl0cyBpdFxuIyBpbnRvIHBhaXJzIG9mIFtwb3NpdGlvbiwgY2hhcmFjdGVyX2lkXVxucGFpckFycmF5ID0gKGEpID0+XG4gIHRlbXAgPSBhLnNsaWNlKClcbiAgYXJyID0gW11cblxuICB3aGlsZSAodGVtcC5sZW5ndGgpXG4gICAgYXJyLnB1c2godGVtcC5zcGxpY2UoMCwyKSlcblxuICByZXR1cm4gYXJyXG5cbiMgIyAjICMgI1xuXG4jIEFzdHJvS2V5Q29uZmlnIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEFzdHJva2V5Q29uZmlnIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6IHtcbiAgICB0eXBlOiAnbWFjcm8nXG4gICAgbWFjcm9zOiBbXVxuICAgIHRleHRfdmFsdWU6ICcnXG4gICAga2V5X3ZhbHVlOiAnJ1xuICB9XG5cbiAgIyBCYWNrYm9uZS5SZWxhdGlvbmFsIC0gQHJlbGF0aW9ucyBkZWZpbml0aW9uXG4gIHJlbGF0aW9uczogW1xuICAgICAgdHlwZTogICAgICAgICAgIEJhY2tib25lLkhhc01hbnlcbiAgICAgIGtleTogICAgICAgICAgICAnbWFjcm9zJ1xuICAgICAgcmVsYXRlZE1vZGVsOiAgIE1hY3JvRW50aXRpZXMuTW9kZWxcbiAgICAgIGNvbGxlY3Rpb25UeXBlOiBNYWNyb0VudGl0aWVzLkNvbGxlY3Rpb25cbiAgXVxuXG4jICMgIyAjICNcblxuIyBBc3Ryb2tleU1vZGVsIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEFzdHJva2V5TW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIERlZmF1bHQgYXR0cmlidXRlc1xuICBkZWZhdWx0czpcbiAgICBvcmRlcjogbnVsbFxuICAgIGNvbmZpZzoge31cblxuICAjIEJhY2tib25lLlJlbGF0aW9uYWwgLSBAcmVsYXRpb25zIGRlZmluaXRpb25cbiAgcmVsYXRpb25zOiBbXG4gICAgICB0eXBlOiAgICAgICAgICAgQmFja2JvbmUuSGFzT25lXG4gICAgICBrZXk6ICAgICAgICAgICAgJ2NvbmZpZydcbiAgICAgIHJlbGF0ZWRNb2RlbDogICBBc3Ryb2tleUNvbmZpZ1xuICBdXG5cbiAgIyBUT0RPIC0gdGhpcyBzaG91bGQgYmUgbW92ZWQgZWxzZXdoZXJlIChub3QgYSBEZXZpY2UtbGV2ZWwgY29uY2VybilcbiAgYnVpbGRTbmlwcGV0OiAoc25pcHBldCkgLT5cbiAgICBkYXRhID0gW11cblxuICAgIGNvbnNvbGUubG9nICdCVUlMRElORyBTTklQUEVUJ1xuICAgIGNvbnNvbGUubG9nIHNuaXBwZXRcblxuICAgIGZvciBpbmRleCBpbiBbMC4uc25pcHBldC5sZW5ndGggLSAxXVxuXG4gICAgICAjIElzb2xhZXRzIHRoZSBjaGFyYWN0ZXJcbiAgICAgIGNoYXIgPSBzbmlwcGV0W2luZGV4XVxuXG4gICAgICAjIEZpbmRzIHRoZSBtYWNyb1xuICAgICAgbWFjcm8gPSBfLmZpbmRXaGVyZShNYWNyb0tleXMsIHsga2V5OiBjaGFyIH0pXG4gICAgICBtYWNybyB8fD0gXy5maW5kV2hlcmUoTWFjcm9LZXlzLCB7IGtleTogJ1NQQUNFJyB9KVxuXG4gICAgICAjIENsb25lcyB0aGUgbWFjcm8gb2JqZWN0XG4gICAgICBtYWNybyA9IF8uY2xvbmUobWFjcm8pXG5cbiAgICAgICMgQXNzaWduc3MgdGhlIHByb3BlciBvcmRlci9pbmRleCBhbmQgcG9zaXRpb24gYXR0cmlidXRlc1xuICAgICAgbWFjcm8ub3JkZXIgPSBpbmRleFxuICAgICAgbWFjcm8ucG9zaXRpb24gPSAwXG5cbiAgICAgICMgQXBwZW5kcyBtYWNybyB0byBkYXRhIGFycmF5XG4gICAgICBkYXRhLnB1c2gobWFjcm8pXG5cbiAgICAjIFJldHVybnMgdGhlIGZvcm1hdHRlZCBkYXRhIGFycmF5XG4gICAgcmV0dXJuIGRhdGFcblxuICAjIHJlYWRNYWNyb1xuICAjIFJlYWRzIGFuZCBwYXJzZXMgdGhlIG1hY3JvIGZyb20gdGhlIGRldmljZVxuICAjIFRPRE8gLSBtb3N0IG9mIHRoaXMgc2hvdWxkIGJlIG1vdmVkIGVsc2V3aGVyZSAobm90IGEgRGV2aWNlLWxldmVsIGNvbmNlcm4pXG4gIHJlYWRNYWNybzogLT5cblxuICAgICMgUmV0dXJucyBhIFByb21pc2UgdG8gaGFuZGxlIGFzeW5jaHJvbm91cyBiZWhhdmlvclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuXG4gICAgICAjIElzc3VlcyAncmVhZDptYWNybycgcmVxdWVzdCB0byB0aGUgVVNCIHNlcnZpY2VcbiAgICAgIFJhZGlvLmNoYW5uZWwoJ3VzYicpLnJlcXVlc3QoJ3JlYWQ6bWFjcm8nLCBAZ2V0KCdvcmRlcicpKS50aGVuKChtYWNyb0FycmF5KSA9PlxuXG4gICAgICAgICMgU3RvcmVzIHRoZSBrZXlzIHVzZWQgdG8gcG9wdWxhdGUgdGhlIG1hY3JvIGNvbGxlY3Rpb25cbiAgICAgICAgbWFjcm9zID0gW11cbiAgICAgICAgcGFyc2VkTWFjcm9zID0gW11cblxuICAgICAgICAjIFRPRE8gLSByZW1vdmVcbiAgICAgICAgY29uc29sZS5sb2cgJ1BhcnNlZCBNYWNybyBmcm9tIGRldmljZTonXG4gICAgICAgIGNvbnNvbGUubG9nIG1hY3JvQXJyYXlcblxuICAgICAgICAjIENvbXBhY3RzIHRoZSBtYWNyb0FycmF5XG4gICAgICAgICMgUVVFU1RJT04gLSB3aWxsIHdlIGV2ZXIgaGF2ZSB6ZXJvcyBiZXR3ZWVuIGVhY2gga2V5IHN0cm9rZT9cbiAgICAgICAgbWFjcm9BcnJheSA9IF8uY29tcGFjdChtYWNyb0FycmF5KVxuXG4gICAgICAgICMgU3BsaXRzIHRoZSBhcnJheSBpbnRvIHBhaXJzIG9mIFtwb3NpdGlvbiwgY2hhcmFjdGVyX2lkXVxuICAgICAgICBwYWlycyA9IHBhaXJBcnJheShtYWNyb0FycmF5KVxuXG4gICAgICAgICMgSXRlcmF0ZXMgb3ZlciBlYWNoIHBhaXIgaW4gdGhlIG1hY3JvQXJyYXlcbiAgICAgICAgZm9yIHBhaXIsIGluZGV4IGluIHBhaXJzXG5cbiAgICAgICAgICAjIENhcHR1cmVzIGFuZCBmb3JtYXRzIHRoZSBwb3NpdGlvblxuICAgICAgICAgIHBvc2l0aW9uID0gcGFpclswXVxuICAgICAgICAgIHBvc2l0aW9uID0gaWYgcG9zaXRpb24gPT0gMiB0aGVuIDEgZWxzZSAtMVxuXG4gICAgICAgICAgIyBGaW5kcyB0aGUgbWFjcm8gb2JqZWN0XG4gICAgICAgICAgbWFjcm8gPSBfLmZpbmRXaGVyZShNYWNyb0tleXMsIHsga2V5OiBJbnZlcnRlZENoYXJhY3Rlck1hcFtwYWlyWzFdXSB9KVxuXG4gICAgICAgICAgIyBDbG9uZXMgdGhlIG1hY3JvIG9iamVjdFxuICAgICAgICAgIG1hY3JvID0gXy5jbG9uZShtYWNybylcblxuICAgICAgICAgICMgQXNzaWduc3MgdGhlIHByb3BlciBvcmRlci9pbmRleCBhbmQgcG9zaXRpb24gYXR0cmlidXRlc1xuICAgICAgICAgIG1hY3JvLm9yZGVyID0gaW5kZXhcbiAgICAgICAgICBtYWNyby5wb3NpdGlvbiA9IHBvc2l0aW9uXG5cbiAgICAgICAgICAjIEFwcGVuZHMgdGhlIG1hY3JvIHRoZSB0aGUgYG1hY3Jvc2AgYXJyYXlcbiAgICAgICAgICBtYWNyb3MucHVzaChtYWNybylcblxuICAgICAgICAjIEl0ZXJhdGVzIG92ZXIgdGhlIG1hY3JvcyBfYWdhaW5fIC0gdGhpcyB0aW1lIHRvIG1lcmdlIGtleXVwL2tleWRvd24gYWN0aW9uc1xuICAgICAgICBtYWNyb0luZGV4ID0gMFxuICAgICAgICB3aGlsZSBtYWNyb0luZGV4IDw9IG1hY3Jvcy5sZW5ndGhcblxuICAgICAgICAgICMgSXNvbGF0ZXMgdGhlIGN1cnJlbnQgYW5kIG5leHQgbWFjcm9zIGluIHRoZSBhcnJheVxuICAgICAgICAgIG1hY3JvID0gbWFjcm9zW21hY3JvSW5kZXhdXG4gICAgICAgICAgbmV4dE1hY3JvID0gbWFjcm9zW21hY3JvSW5kZXggKyAxXVxuXG4gICAgICAgICAgIyBSZXR1cm5zIGlmIG5leHRNYWNybyBpcyB1bmRlZmluZWRcbiAgICAgICAgICBpZiAhbmV4dE1hY3JvXG4gICAgICAgICAgICBwYXJzZWRNYWNyb3MucHVzaChtYWNybylcbiAgICAgICAgICAgIG1hY3JvSW5kZXgrK1xuICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICAgICMgQ29udGludWVzIGNoZWNrIGlmIHRoZSBtYWNybyBpcyBhIEtFWV9ET1dOXG4gICAgICAgICAgaWYgbWFjcm8ucG9zaXRpb24gPT0gLTEgJiYgbmV4dE1hY3JvLnBvc2l0aW9uID09IDEgJiYgbWFjcm8ua2V5ID09IG5leHRNYWNyby5rZXlcblxuICAgICAgICAgICAgIyBLRVlfUFJFU1NcbiAgICAgICAgICAgIG1hY3JvLnBvc2l0aW9uID0gMFxuXG4gICAgICAgICAgICAjIEFwcGVuZHMgdGhlIG1hY3JvIHRvIHRoZSBwYXJzZWRNYWNyb3MgYXJyYXlcbiAgICAgICAgICAgIHBhcnNlZE1hY3Jvcy5wdXNoKG1hY3JvKVxuXG4gICAgICAgICAgICAjIEl0ZXJhdGVzLCBza2lwcGluZyB0aGUgbWF0Y2hlZCBtYWNyb1xuICAgICAgICAgICAgbWFjcm9JbmRleCA9IG1hY3JvSW5kZXggKyAyXG4gICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgIyBOb24tUmVwZWF0ZWQgLSBzdGFuZGFyZCBwcm9jZWR1cmVcbiAgICAgICAgICBwYXJzZWRNYWNyb3MucHVzaChtYWNybylcbiAgICAgICAgICBtYWNyb0luZGV4KytcbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICMgU2V0cyB0aGUgTWFjcm9zIG9uIHRoZSBBc3Ryb2tleUNvbmZpZyBtb2RlbFxuICAgICAgICBjb25maWcgPSBAZ2V0KCdjb25maWcnKVxuICAgICAgICBjb25maWcuZ2V0KCdtYWNyb3MnKS5yZXNldChwYXJzZWRNYWNyb3MpXG5cbiAgICAgICAgIyBSZXNvbHZlcyB0aGUgUHJvbWlzZSB3aXRoIHRoZSBwYXJzZWQgbWFjcm9zXG4gICAgICAgIHJldHVybiByZXNvbHZlKG1hY3JvcylcbiAgICAgIClcblxuIyAjICMgIyAjXG5cbmNsYXNzIEFzdHJva2V5Q29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IEFzdHJva2V5TW9kZWxcbiAgY29tcGFyYXRvcjogJ29yZGVyJ1xuXG4jICMgIyAjICNcblxuIyBEZXZpY2VNb2RlbCBkZWZpbml0aW9uXG5jbGFzcyBEZXZpY2VNb2RlbCBleHRlbmRzIEJhY2tib25lLlJlbGF0aW9uYWxNb2RlbFxuXG4gICMgQmFja2JvbmUuUmVsYXRpb25hbCAtIEByZWxhdGlvbnMgZGVmaW5pdGlvblxuICByZWxhdGlvbnM6IFtcbiAgICAgIHR5cGU6ICAgICAgICAgICBCYWNrYm9uZS5IYXNNYW55XG4gICAgICBrZXk6ICAgICAgICAgICAgJ2tleXMnXG4gICAgICByZWxhdGVkTW9kZWw6ICAgQXN0cm9rZXlNb2RlbFxuICAgICAgY29sbGVjdGlvblR5cGU6IEFzdHJva2V5Q29sbGVjdGlvblxuICBdXG5cbiMgIyAjICMgI1xuXG4jIERldmljZUNvbGxlY3Rpb24gZGVmaW5pdGlvblxuY2xhc3MgRGV2aWNlQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IERldmljZU1vZGVsXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1vZGVsOiAgICAgIERldmljZU1vZGVsXG4gIENvbGxlY3Rpb246IERldmljZUNvbGxlY3Rpb25cbiIsIkVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpXG5EZXZpY2VEYXRhID0gcmVxdWlyZSgnLi9kYXRhJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIERldmljZUZhY3RvcnkgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb1JlcXVlc3RzOlxuICAgICdkZXZpY2UgbW9kZWwnOiAgICAgICAnZ2V0TW9kZWwnXG4gICAgJ2RldmljZSBjb2xsZWN0aW9uJzogICdnZXRDb2xsZWN0aW9uJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGNhY2hlZENvbGxlY3Rpb24gPSBuZXcgRW50aXRpZXMuQ29sbGVjdGlvbihEZXZpY2VEYXRhLCB7IHBhcnNlOiB0cnVlIH0pXG5cbiAgZ2V0TW9kZWw6IChpZCkgLT5cbiAgICByZXR1cm4gQGNhY2hlZENvbGxlY3Rpb24uZ2V0KGlkKVxuXG4gIGdldENvbGxlY3Rpb246IC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBEZXZpY2VGYWN0b3J5KClcbiIsIkxheW91dFZpZXcgID0gcmVxdWlyZSAnLi92aWV3cy9sYXlvdXQnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBIb21lUm91dGUgZXh0ZW5kcyByZXF1aXJlICdobl9yb3V0aW5nL2xpYi9yb3V0ZSdcblxuICB0aXRsZTogJ0FzdHJvS2V5IEhvbWUnXG5cbiAgYnJlYWRjcnVtYnM6IFt7IHRleHQ6ICdEZXZpY2UnIH1dXG5cbiAgZmV0Y2g6IC0+XG4gICAgQGRldmljZU1vZGVsID0gUmFkaW8uY2hhbm5lbCgnZGV2aWNlJykucmVxdWVzdCgnbW9kZWwnLCAnZGV2aWNlXzEnKVxuXG4gIHJlbmRlcjogLT5cbiAgICBjb25zb2xlLmxvZyhAZGV2aWNlTW9kZWwpOyAjIERlYnVnXG4gICAgQGNvbnRhaW5lci5zaG93IG5ldyBMYXlvdXRWaWV3KHsgbW9kZWw6IEBkZXZpY2VNb2RlbCB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBIb21lUm91dGVcbiIsIlxuY2xhc3MgSG9tZUxheW91dFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2xheW91dCdcbiAgY2xhc3NOYW1lOiAnY29udGFpbmVyLWZsdWlkIGgtMTAwJ1xuXG4jICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSG9tZUxheW91dFZpZXdcblxuXG5cbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvdyBoLTEwMFxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48cCBjbGFzcz1cXFwibGVhZFxcXCI+QXN0cm9LZXk8L3A+PGhyLz48cCBjbGFzcz1cXFwibGVhZFxcXCI+Q29ubmVjdCBhbiBBc3Ryb0tleSBkZXZpY2UgdG8gZ2V0IHN0YXJ0ZWQ8L3A+PGhyLz48YSBocmVmPVxcXCIjZGV2aWNlXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcXFwiPkRFVklDRTwvYT48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwicmVxdWlyZSAnLi9mYWN0b3J5J1xuSG9tZVJvdXRlID0gcmVxdWlyZSAnLi9ob21lL3JvdXRlJ1xuRGFzaGJvYXJkUm91dGUgPSByZXF1aXJlICcuL2Rhc2hib2FyZC9yb3V0ZSdcblxuIyAjICMgIyAjXG5cbiMgTWFpblJvdXRlciBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBNYWluUm91dGVyIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGVyJ1xuXG4gIHJvdXRlczpcbiAgICAnKC8pJzogJ2hvbWUnXG5cbiAgaG9tZTogLT5cbiAgICBuZXcgRGFzaGJvYXJkUm91dGUoeyBjb250YWluZXI6IEBjb250YWluZXIgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWFpblJvdXRlclxuIiwiXG4jIEZpbHRlcnMgdXNlZCB0byBxdWVyeSBXZWJVU0IgZGV2aWNlc1xuIyBUT0RPIC0gdXBkYXRlIGZpbHRlcnMgdG8gcXVlcnkgZGV2aWNlcyBieSBBc3Ryb0tleSBWZW5kb3JJRFxucmVxdWVzdERldmljZUZpbHRlcnMgPSBbXG4gIHsgdmVuZG9ySWQ6IDB4MTBjNCB9XG5dXG5cbiMgIyAjICNcblxuIyBDaHJvbWVXZWJVc2JTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgUmVzcG9uc2libGUgZm9yIG1hbmFnaW5nIFVTQiBkZXZpY2VzXG4jIC0gZmV0Y2ggYWxsIGRldmljZXNcbiMgLSB3cml0aW5nIGRhdGEgdG8gYSBkZXZpY2VcbiMgLSByZWFkaW5nIGRhdGEgZnJvbSBhIGRldmljZVxuIyAtIHdyaXRlIGZpcm13YXJlIHRvIGEgZGV2aWNlXG5jbGFzcyBDaHJvbWVXZWJVc2JTZXJ2aWNlIGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAndXNiIGRldmljZXMnOiAgICAgICdnZXREZXZpY2VzJ1xuICAgICd1c2IgcmVhZDptYWNybyc6ICAgJ3JlYWRNYWNybydcbiAgICAndXNiIHdyaXRlOm1hY3JvJzogICd3cml0ZU1hY3JvJ1xuXG4gICMgZ2V0RGV2aWNlc1xuICBnZXREZXZpY2VzOiAtPlxuXG4gICAgIyBSZXR1cm5zIGEgUHJvbWlzZSB0byBtYW5hZ2UgYXN5bmNob25vdXMgYmVoYXZpb3JcbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgIyBTdGVwIDEgLSBSZXF1ZXN0IGRldmljZVxuICAgICAgbmF2aWdhdG9yLnVzYi5yZXF1ZXN0RGV2aWNlKHsgZmlsdGVyczogcmVxdWVzdERldmljZUZpbHRlcnMgfSlcbiAgICAgIC50aGVuKCAoZGV2aWNlKSA9PlxuXG4gICAgICAgICMgVE9ETyAtIHJlbW92ZVxuICAgICAgICAjIGNvbnNvbGUubG9nIGRldmljZVxuXG4gICAgICAgICMgU3RlcCAyIC0gR2V0IERldmljZXNcbiAgICAgICAgIyBUT0RPIC0gdmVyaWZ5IHRoaXMgd29ya2Zsb3dcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2IuZ2V0RGV2aWNlcygpXG4gICAgICAgIC50aGVuKChkKSA9PlxuXG4gICAgICAgICAgY29uc29sZS5sb2coZClcblxuICAgICAgICAgIGQgPSBkWzBdXG5cbiAgICAgICAgICAjIFNURVAgMyAtIG9wZW4gZGV2aWNlXG4gICAgICAgICAgZC5vcGVuKCkudGhlbiA9PlxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnb3BlbidcblxuICAgICAgICAgICAgIyBTdGVwIDQgLSBzZWxlY3QgY29uZmlndXJhdGlvblxuICAgICAgICAgICAgZC5zZWxlY3RDb25maWd1cmF0aW9uKDEpLnRoZW4gPT5cblxuICAgICAgICAgICAgICAjIGNvbnNvbGUubG9nICdzZWxlY3RDb25maWd1cmF0aW9uJ1xuXG4gICAgICAgICAgICAgICMgVE9ETyAtIHJlbW92ZVxuICAgICAgICAgICAgICB3aW5kb3cuZCA9IGRcblxuICAgICAgICAgICAgICAjIFJlc29sdmVzIHdpdGggZGV2aWNlXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGQpXG5cbiAgICAgICAgICAgICAgIyB3SW5kZXggLSBSZXF1ZXN0IHR5cGUgKDB4MDEgZm9yIHNldCBtYWNybylcbiAgICAgICAgICAgICAgIyB3VmFsdWUgLSBNYWNybyBpbmRleCAoMCAtIDQgaW5jbHVzaXZlKVxuICAgICAgICAgICAgICAjIGJSZXF1ZXN0IC0gMyAoaGFyZGNvZGVkKVxuICAgICAgICAgICAgICAjIHdMZW5ndGggLSBudW1iZXIgb2YgYnl0ZXMgKHNob3VsZCBiZSBtYWNybyBsZW5ndGggKiAyKVxuXG4gICAgICAgICAgICAgICMgZC5jb250cm9sVHJhbnNmZXJPdXQoXG4gICAgICAgICAgICAgICMgICB7XG4gICAgICAgICAgICAgICMgICAgICdyZXF1ZXN0VHlwZSc6ICd2ZW5kb3InLFxuICAgICAgICAgICAgICAjICAgICAncmVjaXBpZW50JzogJ2RldmljZScsXG4gICAgICAgICAgICAgICMgICAgICdyZXF1ZXN0JzogMHgwMyxcbiAgICAgICAgICAgICAgIyAgICAgJ3ZhbHVlJzogMHgwMDAwLFxuICAgICAgICAgICAgICAjICAgICAnaW5kZXgnOiAweDAxXG4gICAgICAgICAgICAgICMgICB9LCBuZXcgVWludDhBcnJheShbMSw0LDIsNF0pLmJ1ZmZlclxuICAgICAgICAgICAgICAjICkudGhlbiggKHJlc3BvbnNlKSA9PiB7IGNvbnNvbGUubG9nKHJlc3BvbnNlKSB9KVxuXG4gICAgICAgICAgICAgICMgU1RFUCA1IC0gY29udHJvbFRyYW5zZmVySW5cbiAgICAgICAgICAgICAgIyB3aW5kb3cuZC5jb250cm9sVHJhbnNmZXJJbih7J3JlcXVlc3RUeXBlJzogJ3N0YW5kYXJkJywgJ3JlY2lwaWVudCc6ICdkZXZpY2UnLCAncmVxdWVzdCc6IDB4MDYsICd2YWx1ZSc6IDB4MEYwMCwgJ2luZGV4JzogMHgwMH0sIDUpLnRoZW4oIChyKSA9PiB7IGNvbnNvbGUubG9nKHIpIH0pXG5cblxuICAgICAgICApXG4gICAgICAgICMgZ2V0RGV2aWNlcyBFcnJvciBoYW5kbGluZ1xuICAgICAgICAuY2F0Y2goKGVycikgPT5cbiAgICAgICAgICBjb25zb2xlLmxvZyAnRVJSIC0gbmF2aWdhdG9yLnVzYi5nZXREZXZpY2VzKCknXG4gICAgICAgIClcblxuICAgICAgKVxuXG4gICMgcmVhZE1hY3JvXG4gIHJlYWRNYWNybzogKG1hY3JvSW5kZXggPSAweDAwMDApIC0+XG4gICAgIyBSZXR1cm5zIGEgUHJvbWlzZSB0byBtYW5hZ2UgYXN5bmNob25vdXMgYmVoYXZpb3JcbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgIyBkZXZpY2UuY29udHJvbFRyYW5zZmVySW4gKFJFQURTIERBVEEgRlJPTSBERVZJQ0UpXG4gICAgICAjIFRPRE8gLSBhYnN0cmFjdCB0aGUgY29udHJvbFRyYW5zZmVySW4gcmVxdWVzdCBvYmplY3QgaW50byBhIGNvbnN0YW50IChjbG9uZWQgZWFjaCB0aW1lKVxuICAgICAgZC5jb250cm9sVHJhbnNmZXJJbihcbiAgICAgICAge1xuICAgICAgICAgICdyZXF1ZXN0VHlwZSc6ICAndmVuZG9yJyxcbiAgICAgICAgICAncmVjaXBpZW50JzogICAgJ2RldmljZScsXG4gICAgICAgICAgJ3JlcXVlc3QnOiAgICAgIDB4MDMsXG4gICAgICAgICAgJ3ZhbHVlJzogICAgICAgIG1hY3JvSW5kZXgsXG4gICAgICAgICAgJ2luZGV4JzogICAgICAgIDB4MDJcbiAgICAgICAgfSwgMTI4ICMgUVVFU1RJT04gLSB3aHkgXCIxMjhcIj9cbiAgICAgIClcbiAgICAgIC50aGVuKCAocmVzcG9uc2UpID0+XG4gICAgICAgIHJldHVybiByZXNvbHZlKG5ldyBVaW50OEFycmF5KHJlc3BvbnNlLmRhdGEuYnVmZmVyKSlcbiAgICAgIClcbiAgICAgIC5jYXRjaCggKGVycikgPT5cbiAgICAgICAgY29uc29sZS5sb2cgJ0VSUk9SIFJFQURJTkcgTUFDUk8nXG4gICAgICAgIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgKVxuXG4gICMgd3JpdGVNYWNyb1xuICB3cml0ZU1hY3JvOiAobWFjcm9JbmRleCwgZGF0YSkgLT5cblxuICAgICMgUmV0dXJucyBhIFByb21pc2UgdG8gbWFuYWdlIGFzeW5jaG9ub3VzIGJlaGF2aW9yXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG5cbiAgICAgICMgd0luZGV4IC0gUmVxdWVzdCB0eXBlICgweDAxIGZvciBzZXQgbWFjcm8pXG4gICAgICAjIHdWYWx1ZSAtIE1hY3JvIGluZGV4ICgwIC0gNCBpbmNsdXNpdmUpXG4gICAgICAjIGJSZXF1ZXN0IC0gMyAoaGFyZGNvZGVkKVxuICAgICAgIyB3TGVuZ3RoIC0gbnVtYmVyIG9mIGJ5dGVzIChzaG91bGQgYmUgbWFjcm8gbGVuZ3RoICogMilcbiAgICAgIHJlcXVlc3RPYmogPSB7XG4gICAgICAgICAgJ3JlcXVlc3RUeXBlJzogICd2ZW5kb3InLFxuICAgICAgICAgICdyZWNpcGllbnQnOiAgICAnZGV2aWNlJyxcbiAgICAgICAgICAncmVxdWVzdCc6ICAgICAgMHgwMywgIyBUT0RPIC0gZG9jdW1lbnRcbiAgICAgICAgICAndmFsdWUnOiAgICAgICAgbWFjcm9JbmRleCxcbiAgICAgICAgICAnaW5kZXgnOiAgICAgICAgMHgwMSAjIFRPRE8gLSBXZSBjYW4gdXNlIGluZGV4IGZvciB0aGUga2V5IHRoZSBtYWNybyBjb3JyZXNwb25kcyB0byAobG93LWJ5dGUgPSBrZXksIGhpZ2gtYnl0ZSA9IG51bWJlciBvZiBhY3Rpb25zIGluIHRoZSBtYWNybylcbiAgICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyByZXF1ZXN0T2JqXG5cbiAgICAgIHJldHVybiBkLmNvbnRyb2xUcmFuc2Zlck91dChyZXF1ZXN0T2JqLCBuZXcgVWludDhBcnJheShkYXRhKS5idWZmZXIpXG4gICAgICAudGhlbiggKHJlc3BvbnNlKSA9PlxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzcG9uc2UpXG4gICAgICApXG4gICAgICAuY2F0Y2goIChlcnIpID0+XG4gICAgICAgIGNvbnNvbGUubG9nICdFUlJPUiBTRU5ESU5HIE1BQ1JPJ1xuICAgICAgICByZXR1cm4gcmVqZWN0KGVycilcbiAgICAgIClcblxuXG4jICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IENocm9tZVdlYlVzYlNlcnZpY2UoKVxuIixudWxsLCJcbiMgUHJvdmlkZXMgdXBkYXRlQXR0cnMgbWV0aG9kIHVzZWQgYnkgYmluZENoZWNrYm94ZXMsIGJpbmRJbnB1dHMsIGJpbmRSYWRpb3MsIGJpbmRTZWxlY3RzXG5jbGFzcyBCaW5kQmFzZSBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1cGRhdGVBdHRyczogKGUpIC0+XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIEB2aWV3Lm1vZGVsLnNldChCYWNrYm9uZS5TeXBob24uc2VyaWFsaXplKEApKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5kQmFzZVxuIiwiXG4jIERhdGFiaW5kaW5nIGZvciBmb3JtIGlucHV0c1xuY2xhc3MgQmluZElucHV0cyBleHRlbmRzIHJlcXVpcmUgJy4vYmluZEJhc2UnXG5cbiAgZXZlbnRzOlxuICAgICdpbnB1dCBpbnB1dCc6ICAndXBkYXRlQXR0cnMnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbmRJbnB1dHNcbiIsIlxuX3NlbmRGbGFzaCA9ICh0eXBlLCBvYmopIC0+XG4gIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykudHJpZ2dlcih0eXBlLCBvYmopXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBGbGFzaGVzQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnM9e30pIC0+XG4gICAgQHZpZXcuX2ZsYXNoZXMgICAgICA9IEBvcHRpb25zXG4gICAgQHZpZXcuZmxhc2hFcnJvciAgICA9IEBmbGFzaEVycm9yXG4gICAgQHZpZXcuZmxhc2hTdWNjZXNzICA9IEBmbGFzaFN1Y2Nlc3NcblxuICBmbGFzaEVycm9yOiAob2JqPXt9KSAtPlxuICAgIF9zZW5kRmxhc2goJ2Vycm9yJywgQF9mbGFzaGVzWydlcnJvciddIHx8IG9iailcblxuICBmbGFzaFN1Y2Nlc3M6IChvYmo9e30pIC0+XG4gICAgX3NlbmRGbGFzaCgnc3VjY2VzcycsIEBfZmxhc2hlc1snc3VjY2VzcyddIHx8IG9iailcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hlc0JlaGF2aW9yXG4iLCJcbmNsYXNzIE1vZGVsRXZlbnRzQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgbW9kZWxFdmVudHM6XG4gICAgJ3JlcXVlc3QnOiAgJ29uTW9kZWxSZXF1ZXN0J1xuICAgICdzeW5jJzogICAgICdvbk1vZGVsU3luYydcbiAgICAnZXJyb3InOiAgICAnb25Nb2RlbEVycm9yJ1xuXG4gIG9uTW9kZWxSZXF1ZXN0OiAobW9kZWwsIHN0YXR1cywgb3B0aW9ucykgLT5cbiAgICBAdmlldy5vblJlcXVlc3Q/KG1vZGVsLCBzdGF0dXMsIG9wdGlvbnMpXG5cbiAgb25Nb2RlbFN5bmM6IChtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpIC0+XG4gICAgQHZpZXcub25TeW5jPyhtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpXG5cbiAgb25Nb2RlbEVycm9yOiAobW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKSAtPlxuICAgIEB2aWV3Lm9uRXJyb3I/KG1vZGVsLCByZXNwb25zZSwgb3B0aW9ucylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kZWxFdmVudHNCZWhhdmlvclxuIiwiXG4jIFN1Ym1pdEJ1dHRvbkJlaGF2aW9yIGNsYXNzIGRlZmluaXRpb25cbiMgUHJvdmlkZXMgYW4gZXZlbnQgbGlzdGVuZXIgYW5kIGhhbmRsZXIsIGFuZCBkZWZpbmVzXG4jIGFzc29jaWF0ZWQgY2FsbGJhY2tzIG9uIHRoZSB2aWV3IHRvIHdoaWNoIHRoZSBiZWhhdmlvclxuIyBpcyBhdHRhY2hlZC4gVGhpcyBpcyB1c2VkIGluIHRoZSBQYXNzd29yZCBhbmQgU25pcHBldCBmb3Jtcy5cbmNsYXNzIFN1Ym1pdEJ1dHRvbkJlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIHVpOlxuICAgIHN1Ym1pdDogJ1tkYXRhLWNsaWNrPXN1Ym1pdF0nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuc3VibWl0Om5vdCguZGlzYWJsZWQpJzogJ29uU3VibWl0Q2xpY2snXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnM9e30pIC0+XG4gICAgQHZpZXcuZGlzYWJsZVN1Ym1pdCA9ID0+IEBkaXNhYmxlU3VibWl0KClcbiAgICBAdmlldy5lbmFibGVTdWJtaXQgID0gPT4gQGVuYWJsZVN1Ym1pdCgpXG5cbiAgb25TdWJtaXRDbGljazogKGUpIC0+IEB2aWV3Lm9uU3VibWl0PyhlKVxuICBkaXNhYmxlU3VibWl0OiAtPiBAdWkuc3VibWl0LmFkZENsYXNzKCdkaXNhYmxlZCcpXG4gIGVuYWJsZVN1Ym1pdDogLT4gIEB1aS5zdWJtaXQucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU3VibWl0QnV0dG9uQmVoYXZpb3JcbiIsIlxuY2xhc3MgVG9vbHRpcEJlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIHVpOlxuICAgIHRvb2x0aXBzOiAnW2RhdGEtdG9nZ2xlPXRvb2x0aXBdJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgIyBQcm94aWVzIGNsZWFyIG1ldGhvZCB0byBiZSBhY2Nlc3NpYmxlIGluc2lkZSB0aGUgdmlld1xuICAgIEB2aWV3LmNsZWFyVG9vbHRpcHMgPSA9PiBAY2xlYXIoKVxuXG4gIGNsZWFyOiAtPlxuICAgIEB1aS50b29sdGlwcy50b29sdGlwKCdoaWRlJylcbiAgICBAdWkudG9vbHRpcHMudG9vbHRpcCgnZGlzcG9zZScpXG5cbiAgb25SZW5kZXI6IC0+IEB1aS50b29sdGlwcz8udG9vbHRpcCgpXG4gIG9uQmVmb3JlRGVzdHJveTogLT4gQGNsZWFyKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gVG9vbHRpcEJlaGF2aW9yXG4iLCJcbiMgQXNzaWducyBNYXJpb25ldHRlLkRlY29yYXRvclxuTWFyaW9uZXR0ZS5EZWNvcmF0b3IgPSByZXF1aXJlICcuL2RlY29yYXRvcidcblxuIyBPdmVycmlkZXMgZGVmYXVsdCBzZXJpYWxpemVNb2RlbCgpIG1ldGhvZCBkZWZpbml0aW9uXG4jIEluIHRoZSBjb250ZXh0IHRoZSBzZXJpYWxpemVNb2RlbCBtZXRob2QsICd0aGlzJ1xuIyByZWZlcnMgdG8gdGhlIHZpZXcgaW5zdGFuY2UgaW5zaWRlIHdoaWNoIHRoZVxuIyBzZXJpYWxpemVNb2RlbCBtZXRob2Qgd2FzIGludm9rZWRcbk1hcmlvbmV0dGUuVmlldy5wcm90b3R5cGUuc2VyaWFsaXplTW9kZWwgPSAtPlxuXG4gICMgSWYgdGhpcy5tb2RlbCBpcyBub3QgZGVmaW5lZCwgcmV0dXJuIGFuIGVtcHR5IG9iamVjdFxuICBpZiAhdGhpcy5tb2RlbFxuICAgIHJldHVybiB7fVxuXG4gICMgSWYgdGhpcy5tb2RlbCBleGlzdHMsIGFuZCBoYXMgYSBkZWNvcmF0b3IgZGVmaW5lZCxcbiAgIyByZXR1cm4gdGhlIHRoaXMubW9kZWwncyBhdHRyaWJ1dGVzIGFuZCBkZWNvcmF0aW9uc1xuICBlbHNlIGlmIHRoaXMubW9kZWwuZGVjb3JhdG9yXG4gICAgcmV0dXJuIHRoaXMubW9kZWwuZGVjb3JhdG9yLmRlY29yYXRlKHRoaXMubW9kZWwpXG5cbiAgIyBPdGhlcndpc2UsIHJldHVybiB0aGUgY2xvbmVkIGF0dHJpYnV0ZXMgb2YgdGhpcy5tb2RlbFxuICByZXR1cm4gXy5jbG9uZSB0aGlzLm1vZGVsLmF0dHJpYnV0ZXNcbiIsIlxuIyBCYXNlRGVjb3JhdG9yIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIHNpbXBsZSBjbGFzcyB0byBkZWNvcmF0ZSBtb2RlbHMgd2hlblxuIyB0aGV5IGFyZSBzZXJpYWxpemVkIGludG8gYSB2aWV3J3MgdGVtcGxhdGVcbmNsYXNzIEJhc2VEZWNvcmF0b3JcblxuICAjIERlY29yYXRpb24gbWV0aG9kXG4gICMgSW52b2tlZCBpbiBNYXJpb25ldHRlLlZpZXcucHJvdG90eXBlLnNlcmlhbGl6ZU1vZGVsXG4gIEBkZWNvcmF0ZTogKG1vZGVsKSAtPlxuXG4gICAgIyBDbG9uZXMgbW9kZWwncyBhdHRyaWJ1dGVzXG4gICAgIyBDbG9uaW5nIHByZXZlbnRzIGNvbnRhbWluYXRpb24gb2ZcbiAgICBkYXRhID0gXy5jbG9uZShtb2RlbC5hdHRyaWJ1dGVzKVxuXG4gICAgIyBJdGVyYXRlcyBvdmVyIGVhY2ggZnVuY3Rpb24gaW4gcHJvdG90eXBlXG4gICAgIyBMZXZlcmFnZXMgVW5kZXJzY29yZS5qcyBfLmZ1bmN0aW9ucygpXG4gICAgZm9yIGZ1bmMgaW4gXy5mdW5jdGlvbnMoQHByb3RvdHlwZSlcblxuICAgICAgIyBTa2lwIGNvbnN0cnVjdG9yXG4gICAgICBjb250aW51ZSBpZiBmdW5jID09ICdjb25zdHJ1Y3RvcidcblxuICAgICAgIyBBc3NpZ25zIHZhbHVlIG9mIGZ1bmN0aW9uIHRvIGhhc2hcbiAgICAgIGRhdGFbZnVuY10gPSBAcHJvdG90eXBlW2Z1bmNdLmFwcGx5KG1vZGVsKVxuXG4gICAgIyBSZXR1cm5zIHRoZSBtb2RlbCdzIGF0dHJpYnV0ZXMgJiBkZWNvcmF0aW9uc1xuICAgIHJldHVybiBkYXRhXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VEZWNvcmF0b3JcbiIsIlxuIyBGbGFzaENvbGxlY3Rpb24gY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgYmFzaWMgQmFja2JvbmUuQ29sbGVjdGlvbiB0byBiZSB1c2VkIGJ5IHRoZVxuIyBGbGFzaENvbXBvbmVudCBmb3Igc3RvcmluZyBtdWx0aXBsZSBmbGFzaCBtb2RlbHNcbmNsYXNzIEZsYXNoQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IHJlcXVpcmUgJy4vbW9kZWwnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoQ29sbGVjdGlvblxuIiwicmVxdWlyZSAnLi9zZXJ2aWNlJ1xuRmxhc2hMaXN0ID0gcmVxdWlyZSAnLi92aWV3cy9mbGFzaExpc3QnXG5cbiMgIyAjICMgI1xuXG4jIEZsYXNoU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBjb21wb25lbnQgdG8gY3JlYXRlIGFuZCBkaXNwbGF5IGZsYXNoZXNcbiMgaW4gdGhlIGFwcC4gUHJvdmlkZXMgbXVsdGlwbGUgaW50ZXJmYWNlcyBpbiByYWRpb0V2ZW50c1xuIyB0byBoYW5kbGUgY29tbW9uIHR5cGVzIG9mIGZsYXNoZXMgKGVycm9yLCB3YXJuaW5nLCBzdWNjZXNzKVxuY2xhc3MgRmxhc2hDb21wb25lbnQgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlNlcnZpY2VcblxuICBpbml0aWFsaXplOiAob3B0aW9ucyA9IHt9KSAtPlxuICAgIEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykucmVxdWVzdCgnY29sbGVjdGlvbicpLnRoZW4gKGNvbGxlY3Rpb24pID0+XG4gICAgICBAY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25cbiAgICAgIEBjb2xsZWN0aW9uLm9uICd1cGRhdGUnLCBAc2hvd0xpc3RWaWV3LCBAXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2ZsYXNoIGFkZCc6ICAgICAgJ2FkZCdcbiAgICAnZmxhc2ggcmVzZXQnOiAgICAncmVzZXQnXG4gICAgJ2ZsYXNoIGVycm9yJzogICAgJ2Vycm9yJ1xuICAgICdmbGFzaCB3YXJuaW5nJzogICd3YXJuaW5nJ1xuICAgICdmbGFzaCBzdWNjZXNzJzogICdzdWNjZXNzJ1xuXG4gIGFkZDogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQob3B0aW9ucylcblxuICByZXNldDogLT5cbiAgICBAY29sbGVjdGlvbi5yZXNldCgpXG5cbiAgZXJyb3I6IChvcHRpb25zPXt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZCBfLmV4dGVuZCggb3B0aW9ucywgeyBjb250ZXh0OiAgJ2RhbmdlcicgfSlcblxuICB3YXJuaW5nOiAob3B0aW9ucz17fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQgXy5leHRlbmQoIG9wdGlvbnMsIHsgY29udGV4dDogICd3YXJuaW5nJyB9KVxuXG4gIHN1Y2Nlc3M6IChvcHRpb25zPXt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZCBfLmV4dGVuZCggb3B0aW9ucywgeyBjb250ZXh0OiAgJ3N1Y2Nlc3MnIH0pXG5cbiAgc2hvd0xpc3RWaWV3OiA9PlxuICAgIHVubGVzcyBAcmVuZGVyZWRcbiAgICAgIEBjb250YWluZXIuc2hvdyBuZXcgRmxhc2hMaXN0KHsgY29sbGVjdGlvbjogQGNvbGxlY3Rpb24gfSlcbiAgICAgIEByZW5kZXJlZCA9IHRydWVcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hDb21wb25lbnRcbiIsIlxuIyBGbGFzaE1vZGVsIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIEJhY2tib25lLk1vZGVsIHRvIG1hbmFnZSB2aWV3c1xuIyBkaXNwbGF5ZWQgaW4gdGhlIEZsYXNoQ29tcG9uZW50XG5jbGFzcyBGbGFzaE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblxuICBkZWZhdWx0czpcbiAgICB0aW1lb3V0OiA1MDAwXG4gICAgZGlzbWlzc2libGU6IHRydWVcbiAgICBjb250ZXh0OiAnaW5mbydcblxuICAjIEFsZXJ0IE1vZGVsIEF0dHJpYnV0ZXMgLyBPcHRpb25zXG4gICMgLSBtZXNzYWdlXG4gICMgLSBzdHJvbmdUZXh0IChwbGVhc2UgcmVuYW1lIHRvICdzdHJvbmcnICYgYWRkIGFwcHJvcHJpYXRlIHNwYWNpbmcgdG8gdGVtcGxhdGUpXG4gICMgLSBjb250ZXh0Q2xhc3MgKHBsZWFzZSByZW5hbWUgdG8gJ2NvbnRleHQnKVxuICAjIC0gdGltZW91dCAoZGVmYXVsdCBpcyA1IHNlY29uZHMpXG4gICMgLSBkaXNtaXNzaWJsZSAoZGVmYXVsdCBpcyB0cnVlKVxuXG4gIGRpc21pc3M6IC0+XG4gICAgQGNvbGxlY3Rpb24ucmVtb3ZlKEApXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoTW9kZWxcbiIsIkZsYXNoQ29sbGVjdGlvbiA9IHJlcXVpcmUgJy4vY29sbGVjdGlvbidcblxuIyAjICMgIyAjXG5cbiMgRmxhc2hTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lZCBhIGJhc2ljIHNlcnZpY2UgdG8gcmV0dXJuIHRoZSBGbGFzaGVzQ29sbGVjdGlvblxuIyB3aGVuIHJlcXVlc3RlZC4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBGbGFzaENvbXBvbmVudCB0byByZXRyaWV2ZVxuIyB0aGUgRmxhc2hDb2xsZWN0aW9uIGl0IGlzIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmdcbmNsYXNzIEZsYXNoU2VydmljZSBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ2ZsYXNoIGNvbGxlY3Rpb24nOiAnZ2V0Q29sbGVjdGlvbidcblxuICBhbGVydHM6IG51bGxcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBuZXcgUHJvbWlzZSAocmVzb2x2ZSxyZWplY3QpID0+XG4gICAgICBAYWxlcnRzIHx8PSBuZXcgRmxhc2hDb2xsZWN0aW9uKClcbiAgICAgIHJlc29sdmUoQGFsZXJ0cylcbiAgICAgIHJldHVyblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRmxhc2hTZXJ2aWNlKClcbiIsIiMgRmxhc2hDaGlsZCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBNYXJpb25ldHRlLkxheW91dFZpZXcgdG8gZGlzcGxheSBhIEZsYXNoTW9kZWwgaW5zdGFuY2VcbiMgVGhpcyB2aWV3IGF1dG8tZGlzbWlzc2VzIGFmdGVyIHRoZSB0aW1lb3V0IGRlZmluZWQgaW4gdGhlIEZsYXNoTW9kZWwgaW5zdGFuY2VcbmNsYXNzIEZsYXNoQ2hpbGQgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93J1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvZmxhc2hfY2hpbGQnXG5cbiAgYXR0cmlidXRlczpcbiAgICBzdHlsZTogJ2Rpc3BsYXk6bm9uZTsnXG5cbiAgdWk6XG4gICAgY2xvc2U6ICdbZGF0YS1jbGljaz1kaXNtaXNzXSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5jbG9zZSc6ICdkaXNtaXNzJ1xuXG4gIG9uU2hvdzogLT5cbiAgICB0aW1lb3V0ID0gQG1vZGVsLmdldCgndGltZW91dCcpXG4gICAgc2V0VGltZW91dCggQGRpc21pc3MsIHRpbWVvdXQgKVxuXG4gIG9uQXR0YWNoOiAtPlxuICAgIEAkZWwuZmFkZUluKClcblxuICByZW1vdmU6IC0+XG4gICAgQCRlbC5zbGlkZVRvZ2dsZSggPT5cbiAgICAgIE1hcmlvbmV0dGUuTGF5b3V0Vmlldy5wcm90b3R5cGUucmVtb3ZlLmNhbGwoQClcbiAgICApXG5cbiAgZGlzbWlzczogPT5cbiAgICBAbW9kZWwuY29sbGVjdGlvbj8ucmVtb3ZlKCBAbW9kZWwgKVxuXG4jIEZsYXNoTGlzdCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3IHRvIHRoZSBsaXN0IG9mIEZsYXNoZXNcbmNsYXNzIEZsYXNoTGlzdCBleHRlbmRzIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXdcbiAgY2xhc3NOYW1lOiAnY29udGFpbmVyLWZsdWlkJ1xuICBjaGlsZFZpZXc6IEZsYXNoQ2hpbGRcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hMaXN0XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChjb250ZXh0LCBkaXNtaXNzaWJsZSwgbWVzc2FnZSwgc3Ryb25nKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMiB0ZXh0LWNlbnRlclxcXCI+PGRpdiByb2xlPVxcXCJhbGVydFxcXCJcIiArIChqYWRlLmNscyhbJ2FsZXJ0JywnYWxlcnQtZGlzbWlzc2libGUnLCdmYWRlJywnaW4nLFwiYWxlcnQtXCIgKyBjb250ZXh0XSwgW251bGwsbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggZGlzbWlzc2libGUpXG57XG5idWYucHVzaChcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWNsaWNrPVxcXCJkaXNtaXNzXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInNyLW9ubHlcXFwiPkNsb3NlPC9zcGFuPjwvYnV0dG9uPlwiKTtcbn1cbmlmICggc3Ryb25nKVxue1xuYnVmLnB1c2goXCI8c3Ryb25nPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc3Ryb25nICsgXCIgXCIpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Ryb25nPlwiKTtcbn1cbmlmICggbWVzc2FnZSlcbntcbmJ1Zi5wdXNoKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbWVzc2FnZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKTtcbn1cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiY29udGV4dFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguY29udGV4dDp0eXBlb2YgY29udGV4dCE9PVwidW5kZWZpbmVkXCI/Y29udGV4dDp1bmRlZmluZWQsXCJkaXNtaXNzaWJsZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGlzbWlzc2libGU6dHlwZW9mIGRpc21pc3NpYmxlIT09XCJ1bmRlZmluZWRcIj9kaXNtaXNzaWJsZTp1bmRlZmluZWQsXCJtZXNzYWdlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5tZXNzYWdlOnR5cGVvZiBtZXNzYWdlIT09XCJ1bmRlZmluZWRcIj9tZXNzYWdlOnVuZGVmaW5lZCxcInN0cm9uZ1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc3Ryb25nOnR5cGVvZiBzdHJvbmchPT1cInVuZGVmaW5lZFwiP3N0cm9uZzp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJNb2RhbFZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5cbiMgIyAjICMgI1xuXG4jIFdpbmRvdyBldmVudCBsaXN0ZW5lciB0byBoaWRlIHRoZSBtb2RhbCB3aGVuIG5hdmlnYXRpb24gb2NjdXJzLlxuaGlkZU1vZGFsT25IYXNoQ2hhbmdlID0gLT4gd2luZG93Lm1vZGFsV2luZG93LmhpZGVNb2RhbCgpXG5cbiMgQWJzdHJhY3QgY2xhc3MgZm9yIG1vZGFsLWJhc2VkIGNvbXBvbmVudHMuXG5jbGFzcyBBYnN0cmFjdE1vZGFsQ29tcG9uZW50IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcblxuICBoaWRlTW9kYWw6IC0+XG4gICAgQG1vZGFsVmlldy5oaWRlTW9kYWwoKVxuXG4gIHNob3dNb2RhbDogKGNvbnRlbnRWaWV3LCBtb2RhbFZpZXdPcHRpb25zPXt9KSAtPlxuXG4gICAgICAjIE5ldyBNb2RhbCBWaWV3IChvdXIgdmlldyBpcyBzaG93biBpbnNpZGUgdGhpcyBvbmUpXG4gICAgICBAbW9kYWxWaWV3ID0gbmV3IE1vZGFsVmlldyhtb2RhbFZpZXdPcHRpb25zKVxuXG4gICAgICAjIFNob3cgdGhlIHZpZXcgaW5zaWRlIHRoZSBtb2RhbCB3cmFwcGVyLCBhZGRzIGhpZGVNb2RhbE9uSGFzaENoYW5nZSBldmVudCBsaXN0ZW5lclxuICAgICAgQG1vZGFsVmlldy5vbiAnc2hvdycsID0+XG4gICAgICAgIEBtb2RhbFZpZXcuY29udGVudFJlZ2lvbi5zaG93KCBjb250ZW50VmlldyApXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgaGlkZU1vZGFsT25IYXNoQ2hhbmdlKVxuICAgICAgICB3aW5kb3cubW9kYWxXaW5kb3cgPSBAbW9kYWxWaWV3XG5cbiAgICAgICMgUmVtb3ZlcyBoaWRlTW9kYWxPbkhhc2hDaGFuZ2UgZXZlbnQgbGlzdGVuZXJcbiAgICAgIEBtb2RhbFZpZXcub24gJ2Rlc3Ryb3knLCAtPlxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGhpZGVNb2RhbE9uSGFzaENoYW5nZSlcbiAgICAgICAgZGVsZXRlIHdpbmRvdy5tb2RhbFdpbmRvd1xuXG4gICAgICAjIG9uTW9kYWxIaWRkZW4gY2FsbGJhY2tcbiAgICAgIEBtb2RhbFZpZXcub24gJ2hpZGRlbjptb2RhbCcsID0+IEBvbk1vZGFsSGlkZGVuPygpXG5cbiAgICAgICMgU2hvdyB2aWV3IGluIHRoZSBtb2RhbFxuICAgICAgQGNvbnRhaW5lci5zaG93IEBtb2RhbFZpZXdcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RNb2RhbENvbXBvbmVudFxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobW9kYWxDc3MpIHtcbmJ1Zi5wdXNoKFwiPGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgZGF0YS1yZWdpb249XFxcIm1vZGFsLWNvbnRlbnRcXFwiXCIgKyAoamFkZS5jbHMoW21vZGFsQ3NzXSwgW3RydWVdKSkgKyBcIj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJtb2RhbENzc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubW9kYWxDc3M6dHlwZW9mIG1vZGFsQ3NzIT09XCJ1bmRlZmluZWRcIj9tb2RhbENzczp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbiMgTW9kYWxWaWV3IGNsYXNzIGRlZmluaXRpb25cbiMgUHJvdmlkZXMgYSBnZW5lcmljIHZpZXcgYW5kIHJlZ2lvbiBpbnRvIHdoaWNoXG4jIG90aGVyIHZpZXdzIGNhbiBjb252ZW5pZW50bHkgYmUgZGlzcGxheWVkIGluIGEgbW9kYWxcbmNsYXNzIE1vZGFsVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi9tb2RhbF90ZW1wbGF0ZSdcblxuICBhdHRyaWJ1dGVzOlxuICAgIHJvbGU6ICAgICAnZGlhbG9nJ1xuICAgIHRhYmluZGV4OiAnLTEnXG5cbiAgY2xhc3NOYW1lOiAnbW9kYWwgZmFkZSdcblxuICAjIFNldHMgbW9kYWwgc2l6ZSAtIG5vcm1hbCAvIHNtYWxsIC8gbGFyZ2VcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIHNpemUgPSBAb3B0aW9ucy5zaXplIHx8ICcnXG4gICAgY3NzID0gJ21vZGFsLWRpYWxvZydcbiAgICBjc3MgKz0gJyBtb2RhbC1zbScgaWYgc2l6ZSA9PSAnc21hbGwnXG4gICAgY3NzICs9ICcgbW9kYWwtbGcnIGlmIHNpemUgPT0gJ2xhcmdlJ1xuICAgIHJldHVybiB7IG1vZGFsQ3NzOiBjc3MgfVxuXG4gIHJlZ2lvbnM6XG4gICAgY29udGVudFJlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1tb2RhbC1jb250ZW50XSdcblxuICBldmVudHM6XG4gICAgJ3Nob3cuYnMubW9kYWwnICAgOiAtPiBAdHJpZ2dlck1ldGhvZCAnc2hvdzptb2RhbCdcbiAgICAnc2hvd24uYnMubW9kYWwnICA6IC0+IEB0cmlnZ2VyTWV0aG9kICdzaG93bjptb2RhbCdcbiAgICAnaGlkZS5icy5tb2RhbCcgICA6IC0+IEB0cmlnZ2VyTWV0aG9kICdoaWRlOm1vZGFsJ1xuICAgICdoaWRkZW4uYnMubW9kYWwnIDogLT4gQHRyaWdnZXJNZXRob2QgJ2hpZGRlbjptb2RhbCdcbiAgICAnbG9hZGVkLmJzLm1vZGFsJyA6IC0+IEB0cmlnZ2VyTWV0aG9kICdsb2FkZWQ6bW9kYWwnXG5cbiAgb25TaG93OiAtPlxuICAgIEAkZWwubW9kYWwoIEBvcHRpb25zLm1vZGFsT3B0aW9ucyB8fCB7fSApXG5cbiAgaGlkZU1vZGFsOiAtPlxuICAgIEAkZWwubW9kYWwoJ2hpZGUnKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFZpZXdcbiIsIlxuY2xhc3MgT3ZlcmxheVZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiBmYWxzZVxuICBjbGFzc05hbWU6ICdvdmVybGF5J1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2snOiAnb25DbGljaydcblxuICBvbkNsaWNrOiAtPlxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3NpZGViYXInKS50cmlnZ2VyKCdoaWRlJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIE92ZXJsYXlDb21wb25lbnQgZXh0ZW5kcyBNbi5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29udGFpbmVyICA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ292ZXJsYXkgcmVhZHknOiAgJ29uUmVhZHknXG4gICAgJ292ZXJsYXkgc2hvdyc6ICAgJ3Nob3dPdmVybGF5J1xuICAgICdvdmVybGF5IGhpZGUnOiAgICdoaWRlT3ZlcmxheSdcblxuICBzaG93T3ZlcmxheTogLT5cbiAgICAkKCcub3ZlcmxheS1yZWdpb24nKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICBoaWRlT3ZlcmxheTogLT5cbiAgICAkKCcub3ZlcmxheS1yZWdpb24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICBvblJlYWR5OiAtPlxuICAgIHVubGVzcyBAdmlld1xuICAgICAgQHZpZXcgPSBuZXcgT3ZlcmxheVZpZXcoKVxuICAgICAgQGNvbnRhaW5lci5zaG93KEB2aWV3KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBPdmVybGF5Q29tcG9uZW50XG4iLCJcbiMgQmFzZVJvdXRlIGNsYXNzIGRlZmluaXRpb25cbiMgVGhlIGJhc2Ugcm91dGUgcmVkdWNlcyByZXBlYXRlZCBjb2RlIGJ5XG4jIGF0dGFjaGluZyB0aGUgQGNvbnRhaW5lciBwcm9wZXJ0eSBwYXNzZWQgaW4gZnJvbVxuIyB0aGUgcm91dGVyLiBUaGlzIHByb3BlcnR5IGlzIHVzZWQgdG8gZGlzcGxheSB2aWV3cyBpbiB0aGUgYXBwXG5jbGFzcyBCYXNlUm91dGUgZXh0ZW5kcyBCYWNrYm9uZS5Sb3V0aW5nLlJvdXRlXG5cbiAgYnJlYWRjcnVtYnM6IFtdXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+XG5cbiAgICAjIEF0dGFjaGVzIG9wdGlvbnNcbiAgICBAb3B0aW9ucyA9IG9wdGlvbnNcblxuICAgICMgQXR0YWNoZXMgY29udGFpbmVyXG4gICAgQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiAgICAjIEV2ZW50IGhhbmRsZXJzXG4gICAgQG9uICdiZWZvcmU6ZW50ZXInLCA9PiBAb25CZWZvcmVFbnRlcj8oYXJndW1lbnRzKVxuICAgIEBvbiAnYmVmb3JlOmZldGNoJywgPT4gQG9uQmVmb3JlRmV0Y2g/KGFyZ3VtZW50cylcbiAgICBAb24gJ2JlZm9yZTpyZW5kZXInLCA9PiBAb25CZWZvcmVSZW5kZXI/KGFyZ3VtZW50cylcbiAgICBAb24gJ2ZldGNoJywgPT4gQG9uRmV0Y2g/KGFyZ3VtZW50cylcbiAgICBAb24gJ3JlbmRlcicsID0+IEBvblJlbmRlcj8oYXJndW1lbnRzKVxuICAgIEBvbiAnZW50ZXInLCA9PiBAb25FbnRlcj8oYXJndW1lbnRzKVxuXG4gICAgIyBIaWRlcyBzaWRlYmFyIGNvbXBvbmVudFxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3NpZGViYXInKS50cmlnZ2VyKCdoaWRlJylcblxuICBfc2V0UGFnZVRpdGxlOiAtPlxuICAgIGRvY3VtZW50LnRpdGxlID0gXy5yZXN1bHQgQCwgJ3RpdGxlJ1xuXG4gIF91cGRhdGVCcmVhZGNydW1iczogLT5cbiAgICBicmVhZGNydW1icyA9IF8ucmVzdWx0IEAsICdicmVhZGNydW1icydcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdicmVhZGNydW1iJykudHJpZ2dlcignc2V0JywgYnJlYWRjcnVtYnMpIGlmIGJyZWFkY3J1bWJzXG5cbiAgb25GZXRjaDogLT5cbiAgICBAX3NldFBhZ2VUaXRsZSgpXG4gICAgQF91cGRhdGVCcmVhZGNydW1icygpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VSb3V0ZVxuIiwiXG4jIEJhc2VSb3V0ZXIgY2xhc3MgZGVmaW5pdGlvblxuIyBUaGUgYmFzZSByb3V0ZXIgcmVkdWNlcyByZXBlYXRlZCBjb2RlIGJ5XG4jIGF0dGFjaGluZyB0aGUgQGNvbnRhaW5lciBwcm9wZXJ0eSBwYXNzZWQgaW4gZnJvbSB3aGVuIGluc3RhbnRpYXRlZC5cbiMgVGhpcyBwcm9wZXJ0eSBpcyBzdWJzZXF1ZW50bHkgcGFzc2VkIHRvIGFsbCByb3V0ZXMgY3JlYXRlZCBpbnNpZGVcbiMgcm91dGVycyBzdWJjbGFzc2VkIGZyb20gdGhpcyBkZWZpbml0aW9uXG5jbGFzcyBCYXNlUm91dGVyIGV4dGVuZHMgQmFja2JvbmUuUm91dGluZy5Sb3V0ZXJcblxuICBpbml0aWFsaXplOiAob3B0aW9ucykgLT4gQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VSb3V0ZXJcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmphZGUgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGphZGVfZW5jb2RlX2h0bWxfcnVsZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbnZhciBqYWRlX21hdGNoX2h0bWwgPSAvWyY8PlwiXS9nO1xuXG5mdW5jdGlvbiBqYWRlX2VuY29kZV9jaGFyKGMpIHtcbiAgcmV0dXJuIGphZGVfZW5jb2RlX2h0bWxfcnVsZXNbY10gfHwgYztcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBqYWRlX2VzY2FwZTtcbmZ1bmN0aW9uIGphZGVfZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpLnJlcGxhY2UoamFkZV9tYXRjaF9odG1sLCBqYWRlX2VuY29kZV9jaGFyKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTtcbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgIyBMb3dlcmNhc2VcbiAgJ2EnOiAgNFxuICAnYic6ICA1XG4gICdjJzogIDZcbiAgJ2QnOiAgN1xuICAnZSc6ICA4XG4gICdmJzogIDlcbiAgJ2cnOiAxMFxuICAnaCc6IDExXG4gICdpJzogMTJcbiAgJ2onOiAxM1xuICAnayc6IDE0XG4gICdsJzogMTVcbiAgJ20nOiAxNlxuICAnbic6IDE3XG4gICdvJzogMThcbiAgJ3AnOiAxOVxuICAncSc6IDIwXG4gICdyJzogMjFcbiAgJ3MnOiAyMlxuICAndCc6IDIzXG4gICd1JzogMjRcbiAgJ3YnOiAyNVxuICAndyc6IDI2XG4gICd4JzogMjdcbiAgJ3knOiAyOFxuICAneic6IDI5XG5cbiAgIyBOdW1lcmljXG4gICcxJzogMzBcbiAgJzInOiAzMVxuICAnMyc6IDMyXG4gICc0JzogMzNcbiAgJzUnOiAzNFxuICAnNic6IDM1XG4gICc3JzogMzZcbiAgJzgnOiAzN1xuICAnOSc6IDM4XG4gICcwJzogMzlcblxuICAjIEVsc2VcbiAgJy4nOiAgICAgIDk5XG4gICdTUEFDRSc6ICA0NFxuICByaWdodDogICAgNzlcbiAgbGVmdDogICAgIDgwXG4gIGRvd246ICAgICA4MVxuICB1cDogICAgICAgODJcbiAgJ0JBQ0tTUEFDRSc6IDQyXG4gICcvJzogICAgICA4NFxuICAnKic6ICAgICAgODVcbiAgJy0nOiAgICAgIDg2XG4gICcrJzogICAgICA4N1xuICAnUkVUVVJOJzogODhcbiAgJ1NISUZUJzogMjI1XG4gICdBTFQnOiAyMjZcbiAgJ0NUUkwnOiAyMjRcblxuICAjIE5VTVBBRFxuICAnbl9DTEVBUic6IDgzXG4gICduXy8nOiA4NFxuICAnbl8qJzogODVcbiAgJ25fLSc6IDg2XG4gICduXysnOiA4N1xuICAnbl9FTlRFUic6IDg4XG4gICduXzEnOiA4OVxuICAnbl8yJzogOTBcbiAgJ25fMyc6IDkxXG4gICduXzQnOiA5MlxuICAnbl81JzogOTNcbiAgJ25fNic6IDk0XG4gICduXzcnOiA5NVxuICAnbl84JzogOTZcbiAgJ25fOSc6IDk3XG4gICduXzAnOiA5OFxuICAnbl8uJzogOTlcblxufVxuIiwiXG5jbGFzcyBBYnN0cmFjdEtleWJvYXJkVmlldyBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93IGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMva2V5Ym9hcmRfYWJzdHJhY3QnXG5cbiAgIyBUT0RPIC0gYWN0aXZhdGUgdGhpcyBiZWhhdmlvciBjb25kaXRpb25hbGx5XG4gICMgYmVoYXZpb3JzOlxuICAjICAgS2V5Ym9hcmRDb250cm9sczoge31cblxuICB1aTpcbiAgICBrZXk6ICdbZGF0YS1jbGljaz1rZXldJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLmtleSc6ICdvbktleUNsaWNrJ1xuXG4gIGlzUmVjb3JkaW5nOiBmYWxzZVxuXG4gICMgaW5pdGlhbGl6ZVxuICBpbml0aWFsaXplOiAtPlxuXG4gICAgIyBEZWZpbmVzIEBkZWJvdW5jZVN0b3BSZWNvcmRpbmdcbiAgICBAZGVib3VuY2VTdG9wUmVjb3JkaW5nID0gXy5kZWJvdW5jZSggKCkgPT5cbiAgICAgIEB0cmlnZ2VyICdzdG9wOnJlY29yZGluZydcbiAgICAsIDE1MDApO1xuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgIyBUT0RPIC0gbW92ZSByZWNvcmRpbmcgT1VUIG9mIHRoaXMgdmlldyBhbmQgaW50byBhIGdsb2JhbGl6ZWQgc2VydmljZVxuICBzdGFydFJlY29yZGluZzogLT5cbiAgICBAaXNSZWNvcmRpbmcgPSB0cnVlXG5cbiAgIyBzdG9wUmVjb3JkaW5nXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG4gICAgQGlzUmVjb3JkaW5nID0gZmFsc2VcblxuICAjIG9uUmVuZGVyOiAtPlxuICAjICAgc2V0VGltZW91dCggQGluaXRTb3J0YWJsZSwgMzAwIClcblxuICAjICMgaW5pdFNvcnRhYmxlXG4gICMgaW5pdFNvcnRhYmxlOiAtPlxuXG4gICMgICBjb25zb2xlLmxvZyAnT04gQVRUQUNIJ1xuXG4gICMgICBjb25zb2xlLmxvZyAkKCd1bC5rZXlib2FyZC0tcm93JylcblxuICAjICAgXy5lYWNoICQoJ3VsLmtleWJvYXJkLS1yb3cnKSwgKGVsKSA9PlxuXG4gICMgICAgICMgSW5pdGlhbGl6ZXMgU29ydGFibGUgY29udGFpbmVyXG4gICMgICAgIFNvcnRhYmxlLmNyZWF0ZSBlbCxcbiAgIyAgICAgICBhbmltYXRpb246ICAgIDE1MFxuICAjICAgICAgIGhhbmRsZTogICAgICAgJy5oYW5kbGUnXG4gICMgICAgICAgIyBnaG9zdENsYXNzOiAgICdnaG9zdCcgICMgQ2xhc3MgbmFtZSBmb3IgdGhlIGRyb3AgcGxhY2Vob2xkZXJcbiAgIyAgICAgICAjIGNob3NlbkNsYXNzOiAgJ2Nob3NlbicgICMgQ2xhc3MgbmFtZSBmb3IgdGhlIGNob3NlbiBpdGVtXG4gICMgICAgICAgIyBkcmFnQ2xhc3M6ICAgICdkcmFnJyAgIyBDbGFzcyBuYW1lIGZvciB0aGUgZHJhZ2dpbmcgaXRlbVxuXG4gICMgICAgICAgZ3JvdXA6XG4gICMgICAgICAgICBuYW1lOiAnbWFjcm8nXG4gICMgICAgICAgICBwdWxsOiAnY2xvbmUnXG4gICMgICAgICAgICBwdXQ6ICBmYWxzZVxuXG4gICMgICAgICAgZmFsbGJhY2tUb2xlcmFuY2U6IDEwMFxuXG4gICMgS2V5Ym9hcmRDb250cm9scyBiZWhhdmlvciBjYWxsYmFja1xuICAjIFRPRE8gLSBhbm5vYXRlIGFuZCBjbGVhbiB1cCB0aGlzIG1ldGhvZFxuICBvbktleUFjdGlvbjogKGUpIC0+XG5cbiAgICAjIFNob3J0LWNpcmN1aXRzIHVubGVzc1xuICAgIHJldHVybiB1bmxlc3MgQGlzUmVjb3JkaW5nXG5cbiAgICAjIFByZXZlbnRzIGRlZmF1bHQgaG90a2V5cyB3aGlsZSByZWNvcmRpbmdcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICMgVE9ETyAtIGlnbm9yZSBrZXl1cCBvbiBhbHBoYW51bWVyaWMsIGxpc3RlbiBmb3Igc3BlY2lhbCBrZXlzP1xuICAgICMgcmV0dXJuIGlmIGUua2V5IGluIFtcIkNvbnRyb2xcIiwgXCJNZXRhXCIsIFwiQWx0XCJdXG4gICAga2V5ID0gQG9wdGlvbnMua2V5cy5maW5kV2hlcmUoeyBrZXljb2RlOiBlLmtleUNvZGUgfSlcblxuICAgICMgIyAjICNcblxuICAgICMgVE9ETyAtIGRvY3VtZW50IHRoaXMgYmxvY2sgb2YgY29kZVxuXG4gICAgaWYgZS50eXBlID09ICdrZXlkb3duJ1xuXG4gICAgICBpZiBlLmtleSBpbiBbXCJDb250cm9sXCIsIFwiTWV0YVwiLCBcIkFsdFwiLCBcIlNoaWZ0XCJdXG4gICAgICAgIGpzb24gPSBrZXkudG9KU09OKClcbiAgICAgICAganNvbi5wb3NpdGlvbiA9IC0xXG4gICAgICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBqc29uXG4gICAgICBlbHNlXG4gICAgICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBrZXkudG9KU09OKClcblxuICAgIGlmIGUudHlwZSA9PSAna2V5dXAnXG5cbiAgICAgIGlmIGUua2V5IGluIFtcIkNvbnRyb2xcIiwgXCJNZXRhXCIsIFwiQWx0XCIsIFwiU2hpZnRcIl1cbiAgICAgICAganNvbiA9IGtleS50b0pTT04oKVxuICAgICAgICBqc29uLnBvc2l0aW9uID0gMVxuICAgICAgICBAdHJpZ2dlciAna2V5OnNlbGVjdGVkJywganNvblxuXG5cbiAgICAjICMgIyAjXG5cbiAgICBpZiBlLnR5cGUgPT0gJ2tleXVwJ1xuICAgICAgQCQoXCJbZGF0YS1rZXljb2RlPSN7ZS5rZXlDb2RlfV1cIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgZWxzZVxuICAgICAgQCQoXCJbZGF0YS1rZXljb2RlPSN7ZS5rZXlDb2RlfV1cIikuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAjIFRPRE8gLSBhbm5vdGFlXG4gICAgc2V0VGltZW91dCggPT5cbiAgICAgIEAkKFwiW2RhdGEta2V5Y29kZT0je2Uua2V5Q29kZX1dXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICwgMTAwMClcblxuICAgICMgU3RvcHMgcmVjb3JkaW5nIDIgc2Vjb25kcyBhZnRlciBsYXN0IGtleXN0cm9rZVxuICAgIEBkZWJvdW5jZVN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyAjICMgI1xuXG5cbiAgIyBLZXlDbGljayBjYWxsYmFja1xuICBvbktleUNsaWNrOiAoZSkgLT5cblxuICAgICMgQ2FjaGVzIGVsIGFuZCBrZXljb2RlXG4gICAgZWwgID0gJChlLmN1cnJlbnRUYXJnZXQpXG4gICAga2V5Y29kZSA9IGVsLmRhdGEoJ2tleWNvZGUnKVxuXG4gICAgIyBGaW5kcyB0aGUgbW9kZWwgb2YgdGhlIGtleSB0aGF0IHdhcyBzZWxlY3RlZFxuICAgIGtleSA9IEBvcHRpb25zLmtleXMuZmluZFdoZXJlKHsga2V5Y29kZToga2V5Y29kZSB9KVxuXG4gICAgIyBUcmlnZ2VycyAna2V5OnNlbGVjdGVkJyBldmVudFxuICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBrZXkudG9KU09OKClcblxuICAgICMgQmx1cnMgZm9jdXMgZnJvbSBjbGlja2VkIGtleVxuICAgIGVsLmJsdXIoKVxuXG4gICAgcmV0dXJuXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0S2V5Ym9hcmRWaWV3XG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlib2FyZFZpZXcgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMva2V5Ym9hcmRfZnVsbCdcblxuICBiZWhhdmlvcnM6XG4gICAgS2V5Ym9hcmRDb250cm9sczoge31cblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IwJ30pXG4gICAgICByMTogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IxJ30pXG4gICAgICByMjogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IyJ30pXG4gICAgICByMzogXy53aGVyZShrZXlzLCB7IHJvdzogJ3IzJ30pXG4gICAgICByNDogXy53aGVyZShrZXlzLCB7IHJvdzogJ3I0J30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZFZpZXdcbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgI1xuXG5jbGFzcyBGdW5jdGlvbktleWJvYXJkIGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ2Z1bmNfcjAnfSlcbiAgICB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uS2V5Ym9hcmRcblxuXG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICNcblxuY2xhc3MgTWVkaWFLZXlib2FyZCBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdtZWRpYV9yMCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWVkaWFLZXlib2FyZFxuXG5cbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgI1xuXG5jbGFzcyBOYXZLZXlib2FyZCBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICduYXZfcjAnfSlcbiAgICB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdktleWJvYXJkXG5cblxuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjXG5cbmNsYXNzIE51bXBhZFZpZXcgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMva2V5Ym9hcmRfbnVtcGFkJ1xuXG4gICMgUGFzc2VzIGtleSBvYmplY3RzIHRvIFVJXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBrZXlzID0gQG9wdGlvbnMua2V5cy50b0pTT04oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3IwJ30pXG4gICAgICByMTogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yMSd9KVxuICAgICAgcjI6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjInfSlcbiAgICAgIHIzOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3IzJ30pXG4gICAgICByNDogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yNCd9KVxuICAgICAgY29sOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX2NvbCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTnVtcGFkVmlld1xuXG5cbiIsIlNpbXBsZU5hdiA9IHJlcXVpcmUoJ2xpYi92aWV3cy9zaW1wbGVfbmF2JylcbkZ1bGxLZXlib2FyZCA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9mdWxsJylcbk51bXBhZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfbnVtcGFkJylcbkZ1bmN0aW9uS2V5Ym9hcmQgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfZnVuY3Rpb24nKVxuTWVkaWFLZXlib2FyZCA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9tZWRpYScpXG5OYXZLZXlib2FyZCA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9uYXYnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgS2V5Ym9hcmRTZWxlY3RvciBleHRlbmRzIFNpbXBsZU5hdlxuICBjbGFzc05hbWU6ICdyb3cgaC0xMDAnXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9rZXlib2FyZF9zZWxlY3RvcicpXG5cbiAgbmF2SXRlbXM6IFtcbiAgICB7IGljb246ICdmYS1rZXlib2FyZC1vJywgIHRleHQ6ICdLZXlib2FyZCcsICB0cmlnZ2VyOiAna2V5Ym9hcmQnLCBkZWZhdWx0OiB0cnVlIH1cbiAgICB7IGljb246ICdmYS1maWxlLXRleHQtbycsIHRleHQ6ICdOdW1wYWQnLCAgIHRyaWdnZXI6ICdudW1wYWQnIH1cbiAgICB7IGljb246ICdmYS1jYXJldC1zcXVhcmUtby11cCcsICAgIHRleHQ6ICdGdW5jdGlvbicsICAgIHRyaWdnZXI6ICdmdW5jdGlvbicgfVxuICAgIHsgaWNvbjogJ2ZhLWFzdGVyaXNrJywgICAgdGV4dDogJ01lZGlhJywgICAgdHJpZ2dlcjogJ21lZGlhJyB9XG4gICAgeyBpY29uOiAnZmEtYXN0ZXJpc2snLCAgICB0ZXh0OiAnTmF2aWdhdGlvbicsICAgIHRyaWdnZXI6ICduYXYnIH1cbiAgXVxuXG4gIHNob3dLZXlib2FyZFZpZXc6IChrZXlib2FyZFZpZXcpIC0+XG5cbiAgICAjIENhY2hlcyBjdXJyZW50IGtleWJvYXJkIHZpZXdcbiAgICBAY3VycmVudCA9IGtleWJvYXJkVmlld1xuXG4gICAgIyBIYW5kbGVzICdzdG9wOnJlY29yZGluZycgZXZlbnRcbiAgICBAY3VycmVudC5vbiAnc3RvcDpyZWNvcmRpbmcnLCA9PiBAdHJpZ2dlciAnc3RvcDpyZWNvcmRpbmcnXG5cbiAgICAjIEhhbmRsZXMgS2V5U2VsZWN0aW9uIGV2ZW50XG4gICAga2V5Ym9hcmRWaWV3Lm9uICdrZXk6c2VsZWN0ZWQnLCAoa2V5KSA9PiBAdHJpZ2dlcigna2V5OnNlbGVjdGVkJywga2V5KVxuXG4gICAgIyBTaG93cyB0aGUga2V5Ym9hcmRWaWV3XG4gICAgQGNvbnRlbnRSZWdpb24uc2hvdyBrZXlib2FyZFZpZXdcblxuICBvbk5hdmlnYXRlS2V5Ym9hcmQ6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IEZ1bGxLZXlib2FyZCh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZU51bXBhZDogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgTnVtcGFkVmlldyh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZUZ1bmN0aW9uOiAtPlxuICAgIEBzaG93S2V5Ym9hcmRWaWV3KG5ldyBGdW5jdGlvbktleWJvYXJkKHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuICBvbk5hdmlnYXRlTWVkaWE6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IE1lZGlhS2V5Ym9hcmQoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4gIG9uTmF2aWdhdGVOYXY6IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IE5hdktleWJvYXJkKHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRTZWxlY3RvclxuIiwiY2xhc3MgU2ltcGxlTmF2IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgW2RhdGEtdHJpZ2dlcl06bm90KC5kaXNhYmxlZCknOiAnb25OYXZJdGVtQ2xpY2snXG5cbiAgbmF2SXRlbXM6IFtdXG5cbiAgcmVnaW9uczpcbiAgICBjb250ZW50UmVnaW9uOiAnW2RhdGEtcmVnaW9uPWNvbnRlbnRdJ1xuXG4gIG9uUmVuZGVyOiAtPlxuICAgIGRlZiA9IF8ud2hlcmUoXy5yZXN1bHQoQCwgJ25hdkl0ZW1zJyksIHsgZGVmYXVsdDogdHJ1ZSB9KVswXVxuICAgIHJldHVybiB1bmxlc3MgZGVmXG4gICAgQHRyaWdnZXJNZXRob2QoXCJuYXZpZ2F0ZToje2RlZi50cmlnZ2VyfVwiKVxuICAgIEAkKFwiW2RhdGEtdHJpZ2dlcj0je2RlZi50cmlnZ2VyfV1cIikuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgc2VyaWFsaXplRGF0YTogLT5cbiAgICBkYXRhID0gc3VwZXJcbiAgICBfLmV4dGVuZChkYXRhLCB7IG5hdkl0ZW1zOiBfLnJlc3VsdChALCAnbmF2SXRlbXMnKSB9KVxuICAgIHJldHVybiBkYXRhXG5cbiAgb25OYXZJdGVtQ2xpY2s6IChlKSA9PlxuICAgIGVsID0gJChlLmN1cnJlbnRUYXJnZXQpXG4gICAgZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgQHRyaWdnZXJNZXRob2QoXCJuYXZpZ2F0ZToje2VsLmRhdGEoJ3RyaWdnZXInKX1cIilcbiAgICBlbC5ibHVyKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU2ltcGxlTmF2XG4iXX0=
