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
    key: 'META',
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
    key: 'MUTE',
    keycode: 127,
    icon: 'fa-volume-off'
  }, {
    row: 'media_r0',
    key: 'VOLUME_DN',
    keycode: 128,
    icon: 'fa-volume-down'
  }, {
    row: 'media_r0',
    key: 'VOLUME_UP',
    keycode: 129,
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
  }, {
    row: 'special_r0',
    key: 'CUT'
  }, {
    row: 'special_r0',
    key: 'COPY'
  }, {
    row: 'special_r0',
    key: 'PASTE'
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
    position: 3,
    shifted: false
  };

  MacroModel.prototype.getKeyData = function() {
    var attrs, data;
    data = [];
    attrs = _.clone(this.attributes);
    if (attrs.position === 1) {
      data.push(1);
      data.push(charMap[attrs.key] || 4);
    }
    if (attrs.position === 2) {
      data.push(2);
      data.push(charMap[attrs.key] || 4);
    }
    if (attrs.position === 3) {
      data.push(3);
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
      }, {
        position: 1,
        css: 'fa-long-arrow-down',
        tooltip: 'Key Down'
      }, {
        position: 2,
        css: 'fa-long-arrow-up',
        tooltip: 'Key Up'
      }, {
        position: 3,
        css: 'fa-arrows-v',
        tooltip: 'Key Down | Up'
      }
    ];
    position = this.model.get('position');
    console.log('position: ', position);
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
            macro = _.findWhere(MacroKeys, {
              key: InvertedCharacterMap[pair[1]]
            });
            macro = _.clone(macro);
            macro.position = position;
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
  '-': 45,
  '\\': 49,
  '.': 99,
  'SPACE': 44,
  right: 79,
  left: 80,
  down: 81,
  up: 82,
  'BACKSPACE': 42,
  '/': 84,
  '*': 85,
  '+': 87,
  'RETURN': 88,
  'MUTE': 127,
  'VOLUME_UP': 128,
  'VOLUME_DN': 129,
  'SHIFT': 225,
  'ALT': 226,
  'CTRL': 224,
  'META': 227,
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
  'n_.': 99,
  'F1': 58,
  'F2': 59,
  'F3': 60,
  'F4': 61,
  'F5': 62,
  'F6': 63,
  'F7': 64,
  'F8': 65,
  'F9': 66,
  'F10': 67,
  'F11': 68,
  'F12': 69,
  'F13': 104,
  'F14': 105,
  'F15': 106,
  'F16': 107,
  'F17': 108,
  'F18': 109,
  'F19': 110,
  'F20': 111,
  'F21': 112,
  'F22': 113,
  'F23': 114,
  'F24': 115,
  'CUT': 123,
  'COPY': 124,
  'PASTE': 125
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
        row: 'special_r0'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2FwcC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvYXBwbGljYXRpb24vdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2JlaGF2aW9ycy9rZXlib2FyZENvbnRyb2xzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc2VsZWN0YWJsZUNoaWxkLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc29ydGFibGVDaGlsZC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvYmVoYXZpb3JzL3NvcnRhYmxlTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbXBvbmVudHMvYWJvdXQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9jb21wb25lbnRzL2Fib3V0L3ZpZXdzL3RlbXBsYXRlcy9hYm91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29tcG9uZW50cy9oZWFkZXIvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9jb21wb25lbnRzL2hlYWRlci92aWV3cy90ZW1wbGF0ZXMvaGVhZGVyLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL2NvcnMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbmZpZy9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL2p3dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvY29uZmlnL21hcmlvbmV0dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL2NvbmZpZy93aW5kb3cuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21hbmlmZXN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL2tleS9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9rZXkvZmFjdG9yeS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9rZXkva2V5cy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QvdGVtcGxhdGVzL2tleWJvYXJkX2Fic3RyYWN0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVsbC90ZW1wbGF0ZXMva2V5Ym9hcmRfZnVsbC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX251bXBhZC90ZW1wbGF0ZXMva2V5Ym9hcmRfbnVtcGFkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3IvdGVtcGxhdGVzL2tleWJvYXJkX3NlbGVjdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvZXhhbXBsZV8yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21hY3JvL2V4YW1wbGVzL2V4YW1wbGVfMy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWNyby9leGFtcGxlcy9leGFtcGxlXzQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvZGV2aWNlTGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvclNlbGVjdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvcldyYXBwZXIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3Mva2V5U2VsZWN0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL21hY3JvRWRpdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL21hY3JvTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZGV2aWNlX2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2RldmljZV9zdGF0dXMuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfc2VsZWN0b3IuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfd3JhcHBlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2hlbHBfdmlldy5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2tleV9jaGlsZC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2tleV9zZWxlY3Rvci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL21hY3JvX2NoaWxkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZWRpdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZW1wdHkuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy90ZXh0X2VkaXRvci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGV4dEVkaXRvci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2RhdGEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2ZhY3RvcnkuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3JvdXRlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vaG9tZS92aWV3cy9sYXlvdXQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3ZpZXdzL3RlbXBsYXRlcy9sYXlvdXQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvYXBwL2NvZmZlZS9tb2R1bGVzL3VzYi9jaHJvbWVfd2ViX3VzYl9zZXJ2aWNlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9iaW5kQmFzZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9iZWhhdmlvcnMvbGliL2JpbmRJbnB1dHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9mbGFzaGVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9zdWJtaXRCdXR0b24uY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi90b29sdGlwcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9lbnRpdGllcy9saWIvY29uZmlnLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2huX2VudGl0aWVzL2xpYi9kZWNvcmF0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbGxlY3Rpb24uY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvbW9kZWwuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3NlcnZpY2UuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3ZpZXdzL2ZsYXNoTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvdmlld3MvdGVtcGxhdGVzL2ZsYXNoX2NoaWxkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9tb2RhbC9saWIvYWJzdHJhY3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fbW9kYWwvbGliL21vZGFsX3RlbXBsYXRlLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9tb2RhbC9saWIvdmlldy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWJfY2xpZW50L25vZGVfbW9kdWxlcy9obl9vdmVybGF5L2xpYi9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViX2NsaWVudC9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYl9jbGllbnQvbm9kZV9tb2R1bGVzL2phZGUvcnVudGltZS5qcyIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvY2hhcmFjdGVyX21hcC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0L2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVsbC9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Z1bmN0aW9uL2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfbWVkaWEvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9uYXYvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9zZWxlY3Rvci9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL3NpbXBsZV9uYXYvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDR0EsSUFBQSxXQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3dCQUVKLFdBQUEsR0FDRTtJQUFBLGNBQUEsRUFBZ0IsWUFBaEI7Ozt3QkFHRixVQUFBLEdBQVksU0FBQTtJQUdWLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFnQyxDQUFDLE9BQWpDLENBQXlDLE9BQXpDO0lBR0EsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQW9DLENBQUMsT0FBckMsQ0FBNkMsT0FBN0M7SUFDQSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxPQUExQztJQUNBLElBQUMsQ0FBQSxPQUFELENBQUE7QUFDQSxXQUFPO0VBVEc7O3dCQWNaLE9BQUEsR0FBUyxTQUFBO0lBQ1AsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFqQixDQUFBO1dBR0EsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFkLENBQUEsQ0FDQSxDQUFDLElBREQsQ0FDTyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsQ0FBRDtRQUNM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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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dUJBRUosVUFBQSxHQUFZLFNBQUMsT0FBRDtXQUFhLElBQUMsQ0FBQSxTQUFELEdBQWEsT0FBTyxDQUFDO0VBQWxDOzs7O0dBRlcsUUFBUSxDQUFDLE9BQU8sQ0FBQzs7QUFNMUMsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7O0FDWmpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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KHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4jIEFwcGxpY2F0aW9uIGNsYXNzIGRlZmluaXRpb25cbiMgTWFuYWdlcyBsaWZlY3ljbGUgYW5kIGJvb3RzdHJhcHMgYXBwbGljYXRpb25cbmNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2FwcCByZWRpcmVjdCc6ICdyZWRpcmVjdFRvJ1xuXG4gICMgSW52b2tlZCBhZnRlciBjb25zdHJ1Y3RvclxuICBpbml0aWFsaXplOiAtPlxuXG4gICAgIyBTdGFydHMgSGVhZGVyIENvbXBvbmVudFxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2hlYWRlcicpLnRyaWdnZXIoJ3Jlc2V0JylcblxuICAgICMgU3RhcnRzIEhlbnNvbi5qcyBDb21wb25lbnRzXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnYnJlYWRjcnVtYicpLnRyaWdnZXIoJ3JlYWR5JylcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdvdmVybGF5JykudHJpZ2dlcigncmVhZHknKVxuICAgIEBvblJlYWR5KClcbiAgICByZXR1cm4gdHJ1ZVxuXG4gICMgU3RhcnRzIHRoZSBhcHBsaWNhdGlvblxuICAjIFN0YXJ0cyBCYWNrYm9uZS5oaXN0b3J5IChlbmFibGVzIHJvdXRpbmcpXG4gICMgQW5kIGluaXRpYWxpemVzIHNpZGViYXIgbW9kdWxlXG4gIG9uUmVhZHk6IC0+XG4gICAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCgpXG5cbiAgICAjIFRPRE8gLSB0aGlzIGlzIGEgaGFjayB0byBhdXRvLWNvbm5lY3QgdG8gYSBkZXZpY2UgSUYgaXQncyBhbHJlYWR5IGJlZW4gY29ubmVjdGVkIHRvXG4gICAgbmF2aWdhdG9yLnVzYi5nZXREZXZpY2VzKClcbiAgICAudGhlbiggKGQpID0+XG4gICAgICByZXR1cm4gdW5sZXNzIGRbMF1cbiAgICAgIGRbMF0ub3BlbigpXG4gICAgICB3aW5kb3cuZCA9IGRbMF1cbiAgICApXG5cbiAgIyBSZWRpcmVjdGlvbiBpbnRlcmZhY2VcbiAgIyBVc2VkIGFjY3Jvc3MgdGhlIGFwcGxpY2F0aW9uIHRvIHJlZGlyZWN0XG4gICMgdG8gc3BlY2lmaWMgdmlld3MgYWZ0ZXIgc3BlY2lmaWMgYWN0aW9uc1xuICByZWRpcmVjdFRvOiAocm91dGUpIC0+XG4gICAgd2luZG93LmxvY2F0aW9uID0gcm91dGVcbiAgICByZXR1cm4gdHJ1ZVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBsaWNhdGlvblxuIiwiXG4jIEFwcGxpY2F0aW9uTGF5b3V0IGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIE1hcmlvbmV0dGUuTGF5b3V0VmlldyB0byBtYW5hZ2VcbiMgdG9wLWxldmVsIGFwcGxpY2F0aW9uIHJlZ2lvbnNcbmNsYXNzIEFwcGxpY2F0aW9uTGF5b3V0IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIGVsOiAnYm9keSdcblxuICB0ZW1wbGF0ZTogZmFsc2VcblxuICByZWdpb25zOlxuICAgIGhlYWRlcjogICAgICdbYXBwLXJlZ2lvbj1oZWFkZXJdJ1xuICAgIG92ZXJsYXk6ICAgICdbYXBwLXJlZ2lvbj1vdmVybGF5XSdcbiAgICBmbGFzaDogICAgICAnW2FwcC1yZWdpb249Zmxhc2hdJ1xuICAgIG1vZGFsOiAgICAgICdbYXBwLXJlZ2lvbj1tb2RhbF0nXG4gICAgbWFpbjogICAgICAgJ1thcHAtcmVnaW9uPW1haW5dJ1xuXG4jICMgIyAjICNcblxuIyBFeHBvcnRzIGluc3RhbmNlXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBBcHBsaWNhdGlvbkxheW91dCgpLnJlbmRlcigpXG4iLCJcbiMgTWFyaW9uZXR0ZSBCZWhhdmlvciBNYW5pZmVzdFxubW9kdWxlLmV4cG9ydHMgPVxuICBTdWJtaXRCdXR0b246ICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL3N1Ym1pdEJ1dHRvbidcbiAgRmxhc2hlczogICAgICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi9mbGFzaGVzJ1xuICBNb2RlbEV2ZW50czogICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL21vZGVsRXZlbnRzJ1xuICBCaW5kSW5wdXRzOiAgICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL2JpbmRJbnB1dHMnXG4gIFRvb2x0aXBzOiAgICAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvdG9vbHRpcHMnXG4gIFNlbGVjdGFibGVDaGlsZDogIHJlcXVpcmUgJy4vc2VsZWN0YWJsZUNoaWxkJ1xuICBLZXlib2FyZENvbnRyb2xzOiAgcmVxdWlyZSAnLi9rZXlib2FyZENvbnRyb2xzJ1xuICBTb3J0YWJsZUNoaWxkOiAgICByZXF1aXJlICcuL3NvcnRhYmxlQ2hpbGQnXG4gIFNvcnRhYmxlTGlzdDogICAgIHJlcXVpcmUgJy4vc29ydGFibGVMaXN0J1xuIiwiIyBOT1RFIC0gdGhpcyBiZWhhdmlvciBoYXMgbm90IGJlZW4gdGVzdGVkIHdpdGggbXVsdGlwbGUgdmlld3Mgc2ltdWx0YW5lb3VzbHlcblxuIyBFbmFibGVzIHZpZXcgY2FsbGJhY2tzIHRvIGJlIHRyaWdnZXJlZCBieSBrZXlib2FyZCBpbnB1dFxuY2xhc3MgS2V5Ym9hcmRDb250cm9scyBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBrZXlFdmVudHMgPSBAb3B0aW9ucy5rZXlFdmVudHNcblxuICBvblJlbmRlcjogLT5cbiAgICBAYWRkRXZlbnRMaXN0ZW5lcigpXG5cbiAgb25CZWZvcmVEZXN0cm95OiAtPlxuICAgIEByZW1vdmVFdmVudExpc3RlbmVyKClcblxuICBrZXlBY3Rpb246IChlKSA9PlxuXG4gICAgIyBjb25zb2xlLmxvZyhlKTtcblxuICAgICMgSXNvbGF0ZXMgdGhlIGtleXN0cm9rZVxuICAgICMga2V5Q29kZSA9IGUua2V5Q29kZVxuXG4gICAgcmV0dXJuIEB2aWV3LnRyaWdnZXJNZXRob2QoJ2tleTphY3Rpb24nLCBlKVxuXG4gICAgIyBEbyBub3RoaW5nIGlmIHRoZXJlIGlzbid0IGFuXG4gICAgIyBldmVudCBhc3NvY2lhdGVkIHdpdGggdGhlIGtleXN0cm9rZVxuICAgICMgcmV0dXJuIHVubGVzcyBAa2V5RXZlbnRzW2tleUNvZGVdXG5cbiAgICAjIFByZXZlbnRzIGFueSBkZWZhdWx0IGFjdGlvbiBhc3NvY2lhdGVkIHdpdGggdGhlIGtleWNvZGVcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICMgVHJpZ2dlcnMgdGhlIGV2ZW50IGFzc29jaWF0ZWQgd2l0aFxuICAgICMgdGhlIGtleXN0cm9rZSBvbiB0aGUgdmlldyBpbnN0YW5jZVxuICAgICMgcmV0dXJuIEB2aWV3LnRyaWdnZXJNZXRob2QoQGtleUV2ZW50c1trZXlDb2RlXSlcblxuICBhZGRFdmVudExpc3RlbmVyOiAtPlxuICAgICQoZG9jdW1lbnQpLm9uICdrZXlkb3duJywgQGtleUFjdGlvblxuICAgICQoZG9jdW1lbnQpLm9uICdrZXl1cCcsIEBrZXlBY3Rpb25cbiAgICAjICQoZG9jdW1lbnQpLm9uICdrZXlwcmVzcycsIEBrZXlBY3Rpb25cbiAgICAjIFJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykudHJpZ2dlcignYWRkJywgeyBjb250ZXh0OiAnaW5mbycsIHRpbWVvdXQ6IDE1MDAsIG1lc3NhZ2U6ICdLZXlib2FyZCBjb250cm9scyBlbmFibGVkJ30pXG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogLT5cbiAgICAkKGRvY3VtZW50KS5vZmYgJ2tleWRvd24nLCBAa2V5QWN0aW9uXG4gICAgJChkb2N1bWVudCkub2ZmICdrZXl1cCcsIEBrZXlBY3Rpb25cbiAgICAjICQoZG9jdW1lbnQpLm9mZiAna2V5cHJlc3MnLCBAa2V5QWN0aW9uXG4gICAgIyBSYWRpby5jaGFubmVsKCdmbGFzaCcpLnRyaWdnZXIoJ2FkZCcsIHsgY29udGV4dDogJ2luZm8nLCB0aW1lb3V0OiAxNTAwLCBtZXNzYWdlOiAnS2V5Ym9hcmQgY29udHJvbHMgZGlzYWJsZWQnfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRDb250cm9sc1xuIiwiXG5jbGFzcyBTZWxlY3RhYmxlQ2hpbGQgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgY3NzOlxuICAgIGFjdGl2ZTogJ2FjdGl2ZSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrJzogICdvbkNsaWNrJ1xuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdzZWxlY3RlZCc6ICdvbkNsaWNrJ1xuXG4gICMgU2VsZWN0cyBhY3RpdmVNb2RlbCBvbiByZW5kZXJcbiAgb25SZW5kZXI6IC0+XG4gICAgcmV0dXJuIHVubGVzcyBAb3B0aW9ucy5zZXRBY3RpdmVcblxuICAjIEludm9rZWQgd2hlbiBjbGlja2VkXG4gIG9uQ2xpY2s6IChlKSAtPlxuICAgICMgQnlwYXNzIGJlaGF2aW9yIHdpdGggY3VzdG9tIG9uQ2xpY2sgY2FsbGJhY2tcbiAgICByZXR1cm4gQHZpZXcub25DbGljayhlKSBpZiBAdmlldy5vbkNsaWNrXG5cbiAgICAjIFByZXZlbnQgZG91YmxlLWNsaWNrIHVubGVzcyBzcGVjaWZpY2VkXG4gICAgZT8ucHJldmVudERlZmF1bHQoKSB1bmxlc3MgQG9wdGlvbnMuZG91YmxlQ2xpY2tcblxuICAgICMgSGFuZGxlcyBkZS1zZWxlY3Rpb25cbiAgICBpZiBAb3B0aW9ucy5kZXNlbGVjdCAmJiBAJGVsLmhhc0NsYXNzKEBjc3MuYWN0aXZlKVxuICAgICAgQCRlbC5yZW1vdmVDbGFzcyhAY3NzLmFjdGl2ZSlcbiAgICAgIHJldHVybiBAdmlldy50cmlnZ2VyTWV0aG9kICdkZXNlbGVjdGVkJ1xuXG4gICAgIyBSZXR1cm4gaWYgZWxlbWVudCBpcyBjdXJyZW50bHkgc2VsZWN0ZWRcbiAgICByZXR1cm4gaWYgQCRlbC5oYXNDbGFzcyhAY3NzLmFjdGl2ZSlcblxuICAgICMgUHJldmVudCBkZWFmdWx0IGFuZCB0cmlnZ2VyIHNlbGVjdGVkXG4gICAgZT8ucHJldmVudERlZmF1bHQoKVxuICAgIEB2aWV3LnRyaWdnZXJNZXRob2QgJ3NlbGVjdGVkJ1xuICAgIEAkZWwuYWRkQ2xhc3MoQGNzcy5hY3RpdmUpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoQGNzcy5hY3RpdmUpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdGFibGVDaGlsZFxuIiwiXG4jIFNvcnRhYmxlQ2hpbGQgQmVoYXZpb3IgZGVmaW5pdGlvblxuIyBXb3JrcyB3aXRoIFNvcnRhYmxlTGlzdCBCZWhhdmlvclxuY2xhc3MgU29ydGFibGVDaGlsZCBleHRlbmRzIE1uLkJlaGF2aW9yXG5cbiAgZXZlbnRzOlxuICAgICdzb3J0ZWQnOiAnb25Tb3J0ZWQnXG5cbiAgb25Tb3J0ZWQ6IChlLCBvcmRlcikgLT5cbiAgICBAdmlldy5tb2RlbC5zZXQoJ29yZGVyJywgb3JkZXIpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvcnRhYmxlQ2hpbGRcbiIsIlxuIyBTb3J0YWJsZUxpc3QgQmVoYXZpb3IgZGVmaW5pdGlvblxuIyBXb3JrcyB3aXRoIFNvcnRhYmxlQ2hpbGQgQmVoYXZpb3JcbmNsYXNzIFNvcnRhYmxlTGlzdCBleHRlbmRzIE1uLkJlaGF2aW9yXG5cbiAgIyBEZWZpbmVzIHRoZSByZW9yZGVyQ29sbGVjdGlvbiBtZXRob2Qgb24gdGhlIHZpZXdcbiAgIyB0byB3aGljaCB0aGUgYmVoYXZpb3IgaXMgYXNzaWduZWRcbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAdmlldy5yZW9yZGVyQ29sbGVjdGlvbiA9ID0+IEByZW9yZGVyQ29sbGVjdGlvbigpXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEluaXRpYWxpemVzIFNvcnRhYmxlIGNvbnRhaW5lclxuICAgIFNvcnRhYmxlLmNyZWF0ZSBAdmlldy5lbCxcbiAgICAgIGhhbmRsZTogICAgICAgQG9wdGlvbnMuaGFuZGxlIHx8ICcuc29ydGFibGUnXG4gICAgICBhbmltYXRpb246ICAgIEBvcHRpb25zLmFuaW1hdGlvbiB8fCAyNTBcbiAgICAgIG9uRW5kOiAoZSkgPT4gQHJlb3JkZXJDb2xsZWN0aW9uKClcblxuICAjIHJlb3JkZXJDb2xsZWN0aW9uXG4gICMgSW52b2tlZCBhZnRlciBzb3J0aW5nIGhhcyBjb21wbGV0ZWRcbiAgcmVvcmRlckNvbGxlY3Rpb246ID0+XG5cbiAgICAjIFRyaWdnZXJzIG9yZGVyIGV2ZW50cyBvbiBDb2xsZWN0aW9uVmlldyBjaGlsZFZpZXcgJGVsc1xuICAgIG9yZGVyID0gMVxuICAgIGZvciBlbCBpbiBAdmlldy4kZWxbMF0uY2hpbGRyZW5cbiAgICAgICQoZWwpLnRyaWdnZXIoJ3NvcnRlZCcsb3JkZXIpXG4gICAgICBvcmRlcisrXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvcnRhYmxlTGlzdFxuIiwiQWJvdXRWaWV3ICA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jICMgIyAjICNcblxuY2xhc3MgQWJvdXRDb21wb25lbnQgZXh0ZW5kcyByZXF1aXJlICdobl9tb2RhbC9saWIvYWJzdHJhY3QnXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2Fib3V0IHNob3cnOiAnc2hvd0Fib3V0J1xuXG4gIHNob3dBYm91dDogLT5cbiAgICBhYm91dFZpZXcgPSBuZXcgQWJvdXRWaWV3KClcbiAgICBAc2hvd01vZGFsKGFib3V0VmlldywgeyBzaXplOiAnbGFyZ2UnIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFib3V0Q29tcG9uZW50XG4iLCJcbiMgQWJvdXRWaWV3IGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEFib3V0VmlldyBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2Fib3V0J1xuICBjbGFzc05hbWU6ICdtb2RhbC1jb250ZW50J1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBBYm91dFZpZXdcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48aDUgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIj5BQk9VVDwvaDU+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48aHIvPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PHAgY2xhc3M9XFxcImxlYWRcXFwiPjxhIGhyZWY9XFxcImh0dHBzOi8vZ2l0aHViLmNvbS9Bc3Ryb0tleVxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPiBBc3Ryb0tleTwvYT4gaXMgYW4gb3Blbi1zb3VyY2UgcGxhdGZvcm0gZm9yIHJlLXByb2dyYW1tYWJsZSBVU0Iga2V5Ym9hcmRzLjwvcD48cD5Bc3Ryb0tleSBwcm92aWRlcyBhbiBpbnR1aXRpdmUgaW50ZXJmYWNlIGFueWJvZHkgY2FuIHVzZSB0byBhdXRvbWF0ZSBiYXNpYyBrZXlib2FyZCBhY3Rpb25zLjwvcD48cD5TaW1wbHkgZHJhZyBhbmQgZHJvcCBrZXlib2FyZCBrZXlzIHRvIGNvbnN0cnVjdCB5b3VyIGRlc2lyZWQgc2VxdWVuY2UgLSBBc3Ryb0tleSBkb2VzIHRoZSByZXN0LjwvcD48cD5JdCdzIHRoYXQgZWFzeS48L3A+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIHRleHQtY2VudGVyXFxcIj48aHIvPjxwPkJ1aWx0IGJ5Jm5ic3A7PGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL0Fhcm9uUGVybFxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPkFhcm9uIFBlcmw8L2E+Jm5ic3A7YW5kJm5ic3A7PGEgaHJlZj1cXFwiaHR0cDovL2Fla3MuY29cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5BbGV4YW5kZXIgU2Nod2FydHpiZXJnPC9hPiZuYnNwO2ZvciZuYnNwOzxhIGhyZWY9XFxcImh0dHBzOi8vcmNvcy5pby9cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5SQ09TLjwvYT48L3A+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIkxheW91dFZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyBIZWFkZXJTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIHNlcnZpY2UgZm9yIG1hbmFnaW5nIGFwcGxpY2F0aW9uXG4jIGhlYWRlciBzdGF0ZS4gRGlzcGxheXMgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcixcbiMgb3IgdGhlICd1bmF1dGhlbnRpY2F0ZWQnIG1lc3NhZ2UgaWYgbm9uZSBpcyBkZWZpbmVkXG5jbGFzcyBIZWFkZXJTZXJ2aWNlIGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAY29udGFpbmVyID0gQG9wdGlvbnMuY29udGFpbmVyXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2hlYWRlciByZXNldCc6ICdyZXNldCdcblxuICByZXNldDogLT5cbiAgICBAY29udGFpbmVyLnNob3cgbmV3IExheW91dFZpZXcoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJTZXJ2aWNlXG4iLCJcbiMgSGVhZGVyVmlldyBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBzaW1icGxlIHZpZXcgZm9yIGRpc3BsYXlpbmcgdGhlXG4jIGhlYWRlciBvZiB0aGUgYXBwbGljYXRpb24uIFRoZSBoZWFkZXIgZGlzcGxheXNcbiMgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBhbmRcbiMgbWFuYWdlcyB0b2dnbGluZyB0aGUgU2lkZWJhckNvbXBvbmVudCdzIHZpZXdcbmNsYXNzIEhlYWRlclZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2hlYWRlcidcbiAgY2xhc3NOYW1lOiAnbmF2YmFyIG5hdmJhci1leHBhbmQtbGcgZml4ZWQtdG9wIG5hdmJhci1kYXJrIGJnLWRhcmsnXG4gIHRhZ05hbWU6ICduYXYnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclZpZXdcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcIm5hdmJhci1icmFuZCB0aXRsZVxcXCI+PGltZyBzcmM9XFxcIi4vaW1nL2ljb25fd2hpdGUuc3ZnXFxcIiBjbGFzcz1cXFwibG9nb1xcXCIvPnN0cm9rZXk8L2Rpdj48dWwgY2xhc3M9XFxcIm5hdmJhci1uYXYgbXItYXV0b1xcXCI+PGxpIGNsYXNzPVxcXCJuYXYtaXRlbVxcXCI+PGEgc3R5bGU9XFxcImN1cnNvcjpwb2ludGVyXFxcIiBvbkNsaWNrPVxcXCJSYWRpby5jaGFubmVsKCd1c2InKS5yZXF1ZXN0KCdkZXZpY2VzJyk7XFxcIiBjbGFzcz1cXFwibmF2LWxpbmtcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1sZyBmYS11c2JcXFwiPjwvaT48L2E+PC9saT48bGkgY2xhc3M9XFxcIm5hdi1pdGVtXFxcIj48YSBzdHlsZT1cXFwiY3Vyc29yOnBvaW50ZXJcXFwiIG9uQ2xpY2s9XFxcIlJhZGlvLmNoYW5uZWwoJ2Fib3V0JykudHJpZ2dlcignc2hvdycpO1xcXCIgY2xhc3M9XFxcIm5hdi1saW5rXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtbGcgZmEtcXVlc3Rpb24tY2lyY2xlLW9cXFwiPjwvaT48L2E+PC9saT48L3VsPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCIjIFN1cHBvcnQgZm9yIGNyb3NzLWRvbWFpbiByZXF1ZXN0cyBpbiBCYWNrYm9uZS5qcyAtIHVzdWFsbHkgdmVyYm90ZW4uXG4jIFRoaXMgYWxsb3dzIHRoZSBkZXYgc2VydmVyIGF0IGxvY2FsLmNvcnRpY2FsbWV0cmljcy5jb206ODA4MCB0byBjb21tdW5pY2F0ZSB3aXRoIGRldi5jb3J0aWNhbG1ldHJpY3MuY29tOjMwMDAgKGNtLW5vZGUtYXBwKVxuXG5jcm9zc0RvbWFpblJvb3QgPSAnaHR0cDovLzE5Mi4xNjguMzMuMzM6MzAwMCcgIyBERVYgT05MWVxuXG5wcm94aWVkU3luYyA9IEJhY2tib25lLnN5bmNcblxuQmFja2JvbmUuc3luYyA9IChtZXRob2QsIG1vZGVsLCBvcHRpb25zID0ge30pID0+XG5cbiAgaWYgIW9wdGlvbnMudXJsXG4gICAgb3B0aW9ucy51cmwgPSBjcm9zc0RvbWFpblJvb3QgKyBfLnJlc3VsdChtb2RlbCwgJ3VybCcpIHx8IHVybEVycm9yKClcblxuICBlbHNlIGlmIG9wdGlvbnMudXJsLnN1YnN0cmluZygwLCA2KSAhPSBjcm9zc0RvbWFpblJvb3Quc3Vic3RyaW5nKDAsIDYpXG4gICAgb3B0aW9ucy51cmwgPSBjcm9zc0RvbWFpblJvb3QgKyBvcHRpb25zLnVybFxuXG4gIGlmICFvcHRpb25zLmNyb3NzRG9tYWluXG4gICAgb3B0aW9ucy5jcm9zc0RvbWFpbiA9IHRydWVcblxuICBpZiAhb3B0aW9ucy54aHJGaWVsZHNcbiAgICBvcHRpb25zLnhockZpZWxkcyA9IHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH1cblxuICByZXR1cm4gcHJveGllZFN5bmMobWV0aG9kLCBtb2RlbCwgb3B0aW9ucylcbiIsIiMgQXBwIGNvbmZpZ3VyYXRpb24gbWFuaWZlc3RcbnJlcXVpcmUgJy4vd2luZG93J1xucmVxdWlyZSAnLi9qd3QnXG5yZXF1aXJlICcuL2NvcnMnXG5yZXF1aXJlICcuL21hcmlvbmV0dGUnXG4iLCIjIEFqYXggSldUIFNoaW1cbiQuYWpheFNldHVwXG4gIGJlZm9yZVNlbmQ6ICh4aHIpIC0+XG4gICAgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKVxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgJ0pXVCAnICsgdG9rZW4pIGlmIHRva2VuXG4gICAgcmV0dXJuXG4iLCIjIE1hcmlvbmV0dGUuQmVoYXZpb3JzIGNvbmZpZ3VyYXRpb25cbk1hcmlvbmV0dGUuQmVoYXZpb3JzLmJlaGF2aW9yc0xvb2t1cCA9IC0+IHJlcXVpcmUgJy4uL2JlaGF2aW9ycydcbiIsIiMgQWxpYXNlcyBCYWNrYm9uZS5SYWRpbyB0byB3aW5kb3cuUmFkaW9cbndpbmRvdy5SYWRpbyA9IEJhY2tib25lLlJhZGlvXG4iLCIjIFRoaXMgZmlsZSBkZWZpbmVzIGEgbWFuaWZlc3QgZm9yIHRoZSBjbGllbnQgYXBwbGljYXRpb24uXG4jIFRoaXMgaW5jbHVkZXMgY29uZmlndXJhdGlvbiwgU2VydmljZXMsIENvbXBvbmVudHMsIE1vZHVsZXNcbiMgYW5kIHRoZSBBcHBsaWNhdGlvbiBzaW5nbGV0b24gaW5zdGFuY2UuXG5cbiMgIyAjICMgI1xuXG4jIEFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24gbWFuaWZlc3RcbnJlcXVpcmUgJy4vY29uZmlnJ1xuXG4jIEFwcGxpY2F0aW9uIGNsYXNzIGRlZmluaXRpb24gJiBBcHAgTGF5b3V0XG5BcHAgICAgICAgPSByZXF1aXJlICcuL2FwcCdcbkFwcExheW91dCA9IHJlcXVpcmUgJy4vYXBwbGljYXRpb24vdmlld3MvbGF5b3V0J1xuXG4jIEhlbnNvbiBFbnRpdGllc1xucmVxdWlyZSAnaG5fZW50aXRpZXMvbGliL2NvbmZpZydcblxuIyAjICMgIyAjXG5cbiMgQ29tcG9uZW50cyBhcmUgcm91dGVsZXNzIHNlcnZpY2VzIHdpdGggdmlld3MgdGhhdCBhcmVcbiMgYWNjZXNzaWJsZSBhbnl3aGVyZSBpbiB0aGUgYXBwbGljYXRpb25cbiMgVXNlZCB0byBtYW5hZ2UgdGhlIGhlYWRlciwgc2lkZWJhciwgZmxhc2gsIGFuZCBjb25maXJtIFVJIGVsZW1lbnRzXG5cbiMgSGVuc29uLmpzIENvbXBvbmVudHNcbkhlYWRlckNvbXBvbmVudCAgICAgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudCdcbkFib3V0Q29tcG9uZW50ICAgICAgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvYWJvdXQvY29tcG9uZW50J1xuT3ZlcmxheUNvbXBvbmVudCAgICA9IHJlcXVpcmUgJ2huX292ZXJsYXkvbGliL2NvbXBvbmVudCdcbkZsYXNoQ29tcG9uZW50ICAgICAgPSByZXF1aXJlICdobl9mbGFzaC9saWIvY29tcG9uZW50J1xubmV3IEhlYWRlckNvbXBvbmVudCh7IGNvbnRhaW5lcjogQXBwTGF5b3V0LmhlYWRlciB9KVxubmV3IE92ZXJsYXlDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5vdmVybGF5IH0pXG5uZXcgRmxhc2hDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5mbGFzaCB9KVxubmV3IEFib3V0Q29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQubW9kYWwgfSlcblxuIyAjICMgIyAjXG5cbiMgU2VydmljZXNcbnJlcXVpcmUoJy4vbW9kdWxlcy91c2IvY2hyb21lX3dlYl91c2Jfc2VydmljZScpXG4jIHJlcXVpcmUoJy4vbW9kdWxlcy91c2IvY2hyb21lX3dlYl9ibHVldG9vdGhfc2VydmljZScpXG5cbiMgRmFjdG9yaWVzXG5yZXF1aXJlKCcuL21vZHVsZXMva2V5L2ZhY3RvcnknKVxuXG4jICMgIyAjICNcblxuIyBNb2R1bGVzXG4jIE1vZHVsZXMgcmVwcmVzZW50IGNvbGxlY3Rpb25zIG9mIGVuZHBvaW50cyBpbiB0aGUgYXBwbGljYXRpb24uXG4jIFRoZXkgaGF2ZSByb3V0ZXMgYW5kIGVudGl0aWVzIChtb2RlbHMgYW5kIGNvbGxlY3Rpb25zKVxuIyBFYWNoIHJvdXRlIHJlcHJlc2VudHMgYW4gZW5kcG9pbnQsIG9yICdwYWdlJyBpbiB0aGUgYXBwLlxuTWFpbk1vZHVsZSA9IHJlcXVpcmUgJy4vbW9kdWxlcy9tYWluL3JvdXRlcidcbm5ldyBNYWluTW9kdWxlKHsgY29udGFpbmVyOiBBcHBMYXlvdXQubWFpbiB9KVxuXG4jICMgIyAjICMgI1xuXG4jIFBhZ2UgaGFzIGxvYWRlZCwgZG9jdW1lbnQgaXMgcmVhZHlcbiQoZG9jdW1lbnQpLm9uICdyZWFkeScsID0+IG5ldyBBcHAoKSAjIEluc3RhbnRpYXRlcyBuZXcgQXBwXG4iLCJcbiMgS2V5TW9kZWwgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgS2V5TW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIERlZmF1bHQgYXR0cmlidXRlc1xuICBkZWZhdWx0czoge31cblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBLZXlNb2RlbFxuICBjb21wYXJhdG9yOiAnb3JkZXInXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1vZGVsOiAgICAgIEtleU1vZGVsXG4gIENvbGxlY3Rpb246IEtleUNvbGxlY3Rpb25cbiIsIkVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpXG5LZXlEYXRhID0gcmVxdWlyZSgnLi9rZXlzJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleUZhY3RvcnkgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb1JlcXVlc3RzOlxuICAgICdrZXkgbW9kZWwnOiAgICAgICAnZ2V0TW9kZWwnXG4gICAgJ2tleSBjb2xsZWN0aW9uJzogICdnZXRDb2xsZWN0aW9uJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGNhY2hlZENvbGxlY3Rpb24gPSBuZXcgRW50aXRpZXMuQ29sbGVjdGlvbihLZXlEYXRhLCB7IHBhcnNlOiB0cnVlIH0pXG5cbiAgZ2V0TW9kZWw6IChpZCkgLT5cbiAgICByZXR1cm4gQGNhY2hlZENvbGxlY3Rpb24uZ2V0KGlkKVxuXG4gIGdldENvbGxlY3Rpb246IC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBLZXlGYWN0b3J5KClcbiIsIlxuIyBLZXkgSlNPTiBkZWZpbml0aW9uc1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICAgeyByb3c6ICdyNCcsIGtleTogJ2AnLCBzaGlmdF9rZXk6ICd+Jywga2V5Y29kZTogMTkyIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMScsIHNoaWZ0X2tleTogJyEnLCBrZXljb2RlOiA0OSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzInLCBzaGlmdF9rZXk6ICdAJywga2V5Y29kZTogNTAgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICczJywgc2hpZnRfa2V5OiAnIycsIGtleWNvZGU6IDUxIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNCcsIHNoaWZ0X2tleTogJyQnLCBrZXljb2RlOiA1MiB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzUnLCBzaGlmdF9rZXk6ICclJywga2V5Y29kZTogNTMgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc2Jywgc2hpZnRfa2V5OiAnXicsIGtleWNvZGU6IDU0IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNycsIHNoaWZ0X2tleTogJyYnLCBrZXljb2RlOiA1NSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzgnLCBzaGlmdF9rZXk6ICcqJywga2V5Y29kZTogNTYgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc5Jywgc2hpZnRfa2V5OiAnKCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMCcsIHNoaWZ0X2tleTogJyknLCBrZXljb2RlOiA0OCB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJy0nLCBzaGlmdF9rZXk6ICdfJywga2V5Y29kZTogMTg5IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnPScsIHNoaWZ0X2tleTogJysnLCBrZXljb2RlOiAxODcgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICdCQUNLU1BBQ0UnLCBrZXljb2RlOiA4LCBjc3M6ICd3Ml8wJyB9XG5cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnVEFCJywga2V5Y29kZTogOSwgY3NzOiAndzFfNScsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdxJywgc2hpZnRfa2V5OiAnUScsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4MSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ3cnLCBzaGlmdF9rZXk6ICdXJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg3IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnZScsIHNoaWZ0X2tleTogJ0UnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNjkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdyJywgc2hpZnRfa2V5OiAnUicsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4MiB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ3QnLCBzaGlmdF9rZXk6ICdUJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg0IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAneScsIHNoaWZ0X2tleTogJ1knLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICd1Jywgc2hpZnRfa2V5OiAnVScsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4NSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ2knLCBzaGlmdF9rZXk6ICdJJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDczIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnbycsIHNoaWZ0X2tleTogJ08nLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdwJywgc2hpZnRfa2V5OiAnUCcsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4MCB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ1snLCBzaGlmdF9rZXk6ICd7Jywga2V5Y29kZTogMjE5IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnXScsIHNoaWZ0X2tleTogJ30nLCBrZXljb2RlOiAyMjEgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdcXFxcJywgc2hpZnRfa2V5OiAnfCcsIGtleWNvZGU6IDIyMCwgY3NzOiAndzFfNScgfVxuXG4gICAgeyByb3c6ICdyMicsIGtleTogJ0NBUFMnLCBjc3M6ICd3MV83NScsIGtleWNvZGU6IDIwLCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnYScsIHNoaWZ0X2tleTogJ0EnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNjUgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdzJywgc2hpZnRfa2V5OiAnUycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4MyB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2QnLCBzaGlmdF9rZXk6ICdEJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDY4IH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnZicsIHNoaWZ0X2tleTogJ0YnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzAgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdnJywgc2hpZnRfa2V5OiAnRycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3MSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2gnLCBzaGlmdF9rZXk6ICdIJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDcyIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnaicsIHNoaWZ0X2tleTogJ0onLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzQgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdrJywgc2hpZnRfa2V5OiAnSycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3NSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2wnLCBzaGlmdF9rZXk6ICdMJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDc2IH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnOycsIHNoaWZ0X2tleTogJzonLCBrZXljb2RlOiAxODYgfVxuICAgIHsgcm93OiAncjInLCBrZXk6IFwiJ1wiLCBzaGlmdF9rZXk6ICdcIicsIGtleWNvZGU6IDIyMiB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ1JFVFVSTicsIGNzczogJ3cyXzI1Jywga2V5Y29kZTogMTMsIHNwZWNpYWw6IHRydWUgfVxuXG4gICAgeyByb3c6ICdyMScsIGtleTogJ1NISUZUJywgY3NzOiAndzJfMjUnLCBrZXljb2RlOiAxNiwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ3onLCBzaGlmdF9rZXk6ICdaJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDkwIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAneCcsIHNoaWZ0X2tleTogJ1gnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODggfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICdjJywgc2hpZnRfa2V5OiAnQycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA2NyB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ3YnLCBzaGlmdF9rZXk6ICdWJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg2IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnYicsIHNoaWZ0X2tleTogJ0InLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNjYgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICduJywgc2hpZnRfa2V5OiAnTicsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3OCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ20nLCBzaGlmdF9rZXk6ICdNJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDc3IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnLCcsIHNoaWZ0X2tleTogJzwnLCBrZXljb2RlOiAxODggfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICcuJywgc2hpZnRfa2V5OiAnPicsIGtleWNvZGU6IDE5MCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJy8nLCBzaGlmdF9rZXk6ICc/Jywga2V5Y29kZTogMTkxIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnU0hJRlQnLCBjc3M6ICd3Ml83NScsIGtleWNvZGU6IDE2LCBzcGVjaWFsOiB0cnVlIH1cblxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdDVFJMJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxNywgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ01FVEEnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDkxLCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnQUxUJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxOCwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ1NQQUNFJywgY3NzOiAnc3BhY2UnLCBrZXljb2RlOiAzMiwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0NUUkwnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE3LCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnTScsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTgsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdQJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiA5Mywgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0FMVCcsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTgsIHNwZWNpYWw6IHRydWUgfVxuXG4gICAgIyBOVU1QQURcbiAgICB7IHJvdzogJ251bV9yNCcsIGtleTogJ25fQ0xFQVInLCBrZXljb2RlOiA4MyB9XG4gICAgeyByb3c6ICdudW1fcjQnLCBrZXk6ICduXy8nLCBrZXljb2RlOiA4NCB9XG4gICAgeyByb3c6ICdudW1fcjQnLCBrZXk6ICduXyonLCBrZXljb2RlOiA4NSB9XG5cbiAgICB7IHJvdzogJ251bV9jb2wnLCBrZXk6ICduXy0nLCBrZXljb2RlOiA4NiB9XG4gICAgeyByb3c6ICdudW1fY29sJywga2V5OiAnbl8rJywga2V5Y29kZTogODcsIGNzczogJ2gyXzAnIH1cbiAgICB7IHJvdzogJ251bV9jb2wnLCBrZXk6ICduX0VOVEVSJywga2V5Y29kZTogODgsIGNzczogJ2gyXzAnIH1cblxuICAgIHsgcm93OiAnbnVtX3IxJywga2V5OiAnbl8xJywga2V5Y29kZTogODkgfVxuICAgIHsgcm93OiAnbnVtX3IxJywga2V5OiAnbl8yJywga2V5Y29kZTogOTAgfVxuICAgIHsgcm93OiAnbnVtX3IxJywga2V5OiAnbl8zJywga2V5Y29kZTogOTEgfVxuXG4gICAgeyByb3c6ICdudW1fcjInLCBrZXk6ICduXzQnLCBrZXljb2RlOiA5MiB9XG4gICAgeyByb3c6ICdudW1fcjInLCBrZXk6ICduXzUnLCBrZXljb2RlOiA5MyB9XG4gICAgeyByb3c6ICdudW1fcjInLCBrZXk6ICduXzYnLCBrZXljb2RlOiA5NCB9XG5cbiAgICB7IHJvdzogJ251bV9yMycsIGtleTogJ25fNycsIGtleWNvZGU6IDk1IH1cbiAgICB7IHJvdzogJ251bV9yMycsIGtleTogJ25fOCcsIGtleWNvZGU6IDk2IH1cbiAgICB7IHJvdzogJ251bV9yMycsIGtleTogJ25fOScsIGtleWNvZGU6IDk3IH1cblxuICAgIHsgcm93OiAnbnVtX3IwJywga2V5OiAnbl8wJywga2V5Y29kZTogOTggfVxuICAgIHsgcm93OiAnbnVtX3IwJywga2V5OiAnbl8uJywga2V5Y29kZTogOTkgfVxuXG4gICAgIyBGdW5jdGlvbiBLZXlzXG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEnLCBrZXljb2RlOiA0OSB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjInLCBrZXljb2RlOiA1MCB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjMnLCBrZXljb2RlOiA1MSB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjQnLCBrZXljb2RlOiA1MiB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjUnLCBrZXljb2RlOiA1MyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjYnLCBrZXljb2RlOiA1NCB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjcnLCBrZXljb2RlOiA1NSB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjgnLCBrZXljb2RlOiA1NiB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjknLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEwJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxMScsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTInLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcgfVxuXG4gICAgIyBNZWRpYSBLZXlzXG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtc3RlcC1iYWNrd2FyZCcgfVxuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXBsYXknIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS1zdGVwLWZvcndhcmQnIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnTVVURScsIGtleWNvZGU6IDEyNywgaWNvbjogJ2ZhLXZvbHVtZS1vZmYnIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnVk9MVU1FX0ROJywga2V5Y29kZTogMTI4LCBpY29uOiAnZmEtdm9sdW1lLWRvd24nIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnVk9MVU1FX1VQJywga2V5Y29kZTogMTI5LCBpY29uOiAnZmEtdm9sdW1lLXVwJyB9XG5cbiAgICAjIE5hdmlnYXRpb24gS2V5c1xuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnUEdVUCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ1BHRE4nLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdFTkQnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdIT01FJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnTEVGVC1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi1sZWZ0JyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdVUC1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi11cCcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnRE9XTi1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi1kb3duJyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdSSUdIVC1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi1yaWdodCcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnSU5TJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnREVMJywga2V5Y29kZTogNDYgfVxuXG4gICAgIyBTUEVDSUFMXG4gICAgeyByb3c6ICdzcGVjaWFsX3IwJywga2V5OiAnQ1VUJyB9XG4gICAgeyByb3c6ICdzcGVjaWFsX3IwJywga2V5OiAnQ09QWScgfVxuICAgIHsgcm93OiAnc3BlY2lhbF9yMCcsIGtleTogJ1BBU1RFJyB9XG5cbl1cblxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAocjApIHtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKCl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjx1bCBjbGFzcz1cXFwibGlzdC11bnN0eWxlZCBtYi0wIGtleWJvYXJkLS1yb3cgdy0xMDBcXFwiPlwiKTtcbmJsb2NrICYmIGJsb2NrKCk7XG5idWYucHVzaChcIjwvdWw+XCIpO1xufTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleWNvZGVcIiwgb3B0cy5rZXljb2RlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1jbGljaz1cXFwia2V5XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEta2V5XCIsIG9wdHMua2V5LCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnYnRuJywnYnRuLW91dGxpbmUtbGlnaHQnLCdrZXlib2FyZC0ta2V5JyxvcHRzLmNzc10sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxvcHRzLmljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBvcHRzLmtleSAmJiBvcHRzLnNoaWZ0X2tleSAmJiAhb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlIGlmICggb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbn1cbmJ1Zi5wdXNoKFwiPC9saT5cIik7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tYm9keVxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJyMFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjA6dHlwZW9mIHIwIT09XCJ1bmRlZmluZWRcIj9yMDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChyMCwgcjEsIHIyLCByMywgcjQpIHtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKCl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjx1bCBjbGFzcz1cXFwibGlzdC11bnN0eWxlZCBtYi0wIGtleWJvYXJkLS1yb3cgdy0xMDBcXFwiPlwiKTtcbmJsb2NrICYmIGJsb2NrKCk7XG5idWYucHVzaChcIjwvdWw+XCIpO1xufTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleWNvZGVcIiwgb3B0cy5rZXljb2RlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1jbGljaz1cXFwia2V5XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEta2V5XCIsIG9wdHMua2V5LCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnYnRuJywnYnRuLW91dGxpbmUtbGlnaHQnLCdrZXlib2FyZC0ta2V5JyxvcHRzLmNzc10sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxvcHRzLmljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBvcHRzLmtleSAmJiBvcHRzLnNoaWZ0X2tleSAmJiAhb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlIGlmICggb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbn1cbmJ1Zi5wdXNoKFwiPC9saT5cIik7XG59O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tYm9keVxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByNFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByNDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByM1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMlxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMjtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJyMFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjA6dHlwZW9mIHIwIT09XCJ1bmRlZmluZWRcIj9yMDp1bmRlZmluZWQsXCJyMVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjE6dHlwZW9mIHIxIT09XCJ1bmRlZmluZWRcIj9yMTp1bmRlZmluZWQsXCJyMlwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjI6dHlwZW9mIHIyIT09XCJ1bmRlZmluZWRcIj9yMjp1bmRlZmluZWQsXCJyM1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjM6dHlwZW9mIHIzIT09XCJ1bmRlZmluZWRcIj9yMzp1bmRlZmluZWQsXCJyNFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucjQ6dHlwZW9mIHI0IT09XCJ1bmRlZmluZWRcIj9yNDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChjb2wsIHIwLCByMSwgcjIsIHIzLCByNCwgdW5kZWZpbmVkKSB7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbigpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8dWwgY2xhc3M9XFxcImxpc3QtdW5zdHlsZWQgbWItMCBrZXlib2FyZC0tcm93IHctMTAwXFxcIj5cIik7XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L3VsPlwiKTtcbn07XG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXljb2RlXCIsIG9wdHMua2V5Y29kZSwgdHJ1ZSwgZmFsc2UpKSArIFwiIGRhdGEtY2xpY2s9XFxcImtleVxcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleVwiLCBvcHRzLmtleSwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmNscyhbJ2J0bicsJ2J0bi1vdXRsaW5lLWxpZ2h0Jywna2V5Ym9hcmQtLWtleScsb3B0cy5jc3NdLCBbbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggb3B0cy5pY29uKVxue1xuYnVmLnB1c2goXCI8aVwiICsgKGphZGUuY2xzKFsnZmEnLCdmYS1mdycsb3B0cy5pY29uXSwgW251bGwsbnVsbCx0cnVlXSkpICsgXCI+PC9pPlwiKTtcbn1cbmVsc2VcbntcbmlmICggb3B0cy5rZXkgJiYgb3B0cy5zaGlmdF9rZXkgJiYgIW9wdHMuYWxwaGEpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInNoaWZ0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuZWxzZSBpZiAoIG9wdHMuYWxwaGEpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG59XG5idWYucHVzaChcIjwvbGk+XCIpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwia2V5Ym9hcmQtLWJvZHlcXFwiPjxkaXYgY2xhc3M9XFxcImQtZmxleCBmbGV4LXJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiZC1mbGV4IGZsZXgtY29sdW1uXFxcIj5cIik7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHI0XG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHI0O1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIyXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIyO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIxXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIxO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG4vLyBpdGVyYXRlIHIwXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHIwO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxufSk7XG5idWYucHVzaChcIjwvZGl2PjxkaXYgY2xhc3M9XFxcImQtZmxleCBmbGV4LWNvbHVtblxcXCI+XCIpO1xuLy8gaXRlcmF0ZSBjb2xcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gY29sO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJjb2xcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNvbDp0eXBlb2YgY29sIT09XCJ1bmRlZmluZWRcIj9jb2w6dW5kZWZpbmVkLFwicjBcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIwOnR5cGVvZiByMCE9PVwidW5kZWZpbmVkXCI/cjA6dW5kZWZpbmVkLFwicjFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIxOnR5cGVvZiByMSE9PVwidW5kZWZpbmVkXCI/cjE6dW5kZWZpbmVkLFwicjJcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIyOnR5cGVvZiByMiE9PVwidW5kZWZpbmVkXCI/cjI6dW5kZWZpbmVkLFwicjNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIzOnR5cGVvZiByMyE9PVwidW5kZWZpbmVkXCI/cjM6dW5kZWZpbmVkLFwicjRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnI0OnR5cGVvZiByNCE9PVwidW5kZWZpbmVkXCI/cjQ6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG5hdkl0ZW1zLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTggZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlwiKTtcbi8vIGl0ZXJhdGUgbmF2SXRlbXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbmF2SXRlbXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIG5hdkl0ZW0udHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBidG4tc20ganVzdGlmeS1jb250ZW50LWNlbnRlciBteC0zXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIG5hdkl0ZW0gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxidXR0b24gc3R5bGU9XFxcImZsZXgtZ3JvdzoxO1xcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLXRyaWdnZXJcIiwgbmF2SXRlbS50cmlnZ2VyLCB0cnVlLCBmYWxzZSkpICsgXCIgY2xhc3M9XFxcImQtZmxleCBidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IGJ0bi1zbSBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG14LTNcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbmF2SXRlbS50ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2J1dHRvbj5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxoci8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJjb250ZW50XFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJuYXZJdGVtc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubmF2SXRlbXM6dHlwZW9mIG5hdkl0ZW1zIT09XCJ1bmRlZmluZWRcIj9uYXZJdGVtczp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiTWFjcm9FeGFtcGxlcyA9IHJlcXVpcmUoJy4vZXhhbXBsZXMnKVxuY2hhck1hcCA9IHJlcXVpcmUoJ2xpYi9jaGFyYWN0ZXJfbWFwJylcblxuIyAjICMgIyAjXG5cbiMgTWFjcm9Nb2RlbCBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBNYWNyb01vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6XG4gICAgb3JkZXI6IDBcbiAgICBwb3NpdGlvbjogM1xuICAgIHNoaWZ0ZWQ6IGZhbHNlXG5cbiAgZ2V0S2V5RGF0YTogLT5cblxuICAgIGRhdGEgPSBbXVxuXG4gICAgYXR0cnMgPSBfLmNsb25lKEBhdHRyaWJ1dGVzKVxuXG4gICAgIyBjb25zb2xlLmxvZyBhdHRyc1xuXG4gICAgIyBBY3Rpb25UeXBlXG4gICAgIyBLRVlfRE4gPSAxLCBLRVkgVkFMVUVcbiAgICAjIEtFWV9VUCA9IDIsIEtFWSBWQUxVRVxuICAgICMgS0VZX1BSID0gMywgS0VZIFZBTFVFXG5cbiAgICAjIEtFWV9ETlxuICAgIGlmIGF0dHJzLnBvc2l0aW9uID09IDEgIyBUT0RPIC0gY29uc3RhbnRpemVcbiAgICAgIGRhdGEucHVzaCgxKVxuICAgICAgZGF0YS5wdXNoKGNoYXJNYXBbYXR0cnMua2V5XSB8fCA0KVxuXG4gICAgIyBLRVlfRE5cbiAgICBpZiBhdHRycy5wb3NpdGlvbiA9PSAyICMgVE9ETyAtIGNvbnN0YW50aXplXG4gICAgICBkYXRhLnB1c2goMilcbiAgICAgIGRhdGEucHVzaChjaGFyTWFwW2F0dHJzLmtleV0gfHwgNClcblxuICAgICMgS0VZX1BSXG4gICAgaWYgYXR0cnMucG9zaXRpb24gPT0gMyAjIFRPRE8gLSBjb25zdGFudGl6ZVxuICAgICAgZGF0YS5wdXNoKDMpXG4gICAgICBkYXRhLnB1c2goY2hhck1hcFthdHRycy5rZXldIHx8IDQpXG5cbiAgICByZXR1cm4gZGF0YVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9Db2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogTWFjcm9Nb2RlbFxuICBjb21wYXJhdG9yOiAnb3JkZXInXG5cbiAgIyBsb2FkRXhhbXBsZVxuICAjIFJlc2V0cyB0aGUgY29sbGVjdGlvbiB0byBvbmUgb2YgdGhlIGV4YW1wbGVzXG4gIGxvYWRFeGFtcGxlOiAoZXhhbXBsZV9pZCkgLT5cblxuICAgICMgUmVzZXRzIHRoZSBjb2xsZWN0aW9uIHdpdGggdGhlIGRhdGEgZGVmaW5lZCBpbiB0aGUgRXhhbXBsZXMgb2JqZWN0XG4gICAgQHJlc2V0KE1hY3JvRXhhbXBsZXNbZXhhbXBsZV9pZF0pXG5cbiAgIyBidWlsZFxuICAjIENvbXBpbGVzIHRoZSBjb21wbGV0ZSBtYWNybyBmcm9tIGVhY2ggbWFjcm8gbW9kZWxcbiAgYnVpbGQ6IC0+XG4gICAgZGF0YSA9IFtdXG4gICAgXy5lYWNoKEBtb2RlbHMsIChtYWNybykgPT5cbiAgICAgICMgY29uc29sZS5sb2cgJ0VBQ0ggTUFDUk8nXG4gICAgICAjIGNvbnNvbGUubG9nIG1hY3JvLmdldEtleURhdGEoKVxuICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KG1hY3JvLmdldEtleURhdGEoKSlcbiAgICApXG5cbiAgICByZXR1cm4gZGF0YVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPVxuICBNb2RlbDogICAgICBNYWNyb01vZGVsXG4gIENvbGxlY3Rpb246IE1hY3JvQ29sbGVjdGlvblxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiAxXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkhcIixcbiAgICBcImtleWNvZGVcIjogNzIsXG4gICAgXCJvcmRlclwiOiAyLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJTSElGVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNixcbiAgICBcInBvc2l0aW9uXCI6IDEsXG4gICAgXCJvcmRlclwiOiAzXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkVcIixcbiAgICBcImtleWNvZGVcIjogNjksXG4gICAgXCJvcmRlclwiOiA0LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJMXCIsXG4gICAgXCJrZXljb2RlXCI6IDc2LFxuICAgIFwib3JkZXJcIjogNSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiTFwiLFxuICAgIFwia2V5Y29kZVwiOiA3NixcbiAgICBcIm9yZGVyXCI6IDYsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIk9cIixcbiAgICBcImtleWNvZGVcIjogNzksXG4gICAgXCJvcmRlclwiOiA3LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJTSElGVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNixcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogOFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCIxXCIsXG4gICAgXCJzaGlmdFwiOiBcIiFcIixcbiAgICBcImtleWNvZGVcIjogNDksXG4gICAgXCJvcmRlclwiOiA5LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJTSElGVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNixcbiAgICBcInBvc2l0aW9uXCI6IDEsXG4gICAgXCJvcmRlclwiOiAxMFxuICB9XG5dXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAge1xuICAgIFwia2V5XCI6IFwiUlwiLFxuICAgIFwia2V5Y29kZVwiOiA4MixcbiAgICBcIm9yZGVyXCI6IDEsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkVcIixcbiAgICBcImtleWNvZGVcIjogNjksXG4gICAgXCJvcmRlclwiOiAyLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJTXCIsXG4gICAgXCJrZXljb2RlXCI6IDgzLFxuICAgIFwib3JkZXJcIjogMyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiVVwiLFxuICAgIFwia2V5Y29kZVwiOiA4NSxcbiAgICBcIm9yZGVyXCI6IDQsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIk1cIixcbiAgICBcImtleWNvZGVcIjogNzcsXG4gICAgXCJvcmRlclwiOiA1LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDZcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiYFwiLFxuICAgIFwic2hpZnRcIjogXCJ+XCIsXG4gICAgXCJrZXljb2RlXCI6IDE5MixcbiAgICBcIm9yZGVyXCI6IDcsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkFMVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxOCxcbiAgICBcInBvc2l0aW9uXCI6IDEsXG4gICAgXCJvcmRlclwiOiA4XG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkVcIixcbiAgICBcImtleWNvZGVcIjogNjksXG4gICAgXCJvcmRlclwiOiA5LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9XG5dXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiAxXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiAyXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIi1cIixcbiAgICBcInNoaWZ0XCI6IFwiX1wiLFxuICAgIFwia2V5Y29kZVwiOiAxODksXG4gICAgXCJvcmRlclwiOiAzLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJTSElGVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNixcbiAgICBcInBvc2l0aW9uXCI6IDEsXG4gICAgXCJvcmRlclwiOiA0XG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkFMVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxOCxcbiAgICBcInBvc2l0aW9uXCI6IDEsXG4gICAgXCJvcmRlclwiOiA1XG4gIH1cbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJrZXlcIjogXCJDVFJMXCIsXG4gICAgXCJrZXljb2RlXCI6IDE3LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiAxXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkFMVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxOCxcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogMlxuICB9LFxuICB7XG4gICAgXCJyb3dcIjogXCJuYXZfcjBcIixcbiAgICBcImtleVwiOiBcIkRFTFwiLFxuICAgIFwia2V5Y29kZVwiOiA0NixcbiAgICBcIm9yZGVyXCI6IDMsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkFMVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxOCxcbiAgICBcInBvc2l0aW9uXCI6IDEsXG4gICAgXCJvcmRlclwiOiA0XG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkNUUkxcIixcbiAgICBcImtleWNvZGVcIjogMTcsXG4gICAgXCJwb3NpdGlvblwiOiAxLFxuICAgIFwib3JkZXJcIjogNVxuICB9XG5dXG4iLCJcbiMgRXhwb3J0cyBhbiBvYmplY3QgZGVmaW5pbmcgdGhlIGV4YW1wbGUgbWFjcm9zXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXhfMDE6IHJlcXVpcmUoJy4vZXhhbXBsZV8xJylcbiAgZXhfMDI6IHJlcXVpcmUoJy4vZXhhbXBsZV8yJylcbiAgZXhfMDM6IHJlcXVpcmUoJy4vZXhhbXBsZV8zJylcbiAgZXhfMDQ6IHJlcXVpcmUoJy4vZXhhbXBsZV80Jylcbn1cbiIsIkxheW91dFZpZXcgID0gcmVxdWlyZSAnLi92aWV3cy9sYXlvdXQnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEYXNoYm9hcmRSb3V0ZSBleHRlbmRzIHJlcXVpcmUgJ2huX3JvdXRpbmcvbGliL3JvdXRlJ1xuXG4gIHRpdGxlOiAnQXN0cm9LZXknXG5cbiAgYnJlYWRjcnVtYnM6IFt7IHRleHQ6ICdEZXZpY2UnIH1dXG5cbiAgZmV0Y2g6IC0+XG4gICAgQGRldmljZSA9IFJhZGlvLmNoYW5uZWwoJ2RldmljZScpLnJlcXVlc3QoJ21vZGVsJywgJ2RldmljZV8xJylcblxuICByZW5kZXI6IC0+XG4gICAgQGNvbnRhaW5lci5zaG93IG5ldyBMYXlvdXRWaWV3KHsgbW9kZWw6IEBkZXZpY2UgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRGFzaGJvYXJkUm91dGVcbiIsIktleVNlbGVjdG9yID0gcmVxdWlyZSgnLi9rZXlTZWxlY3RvcicpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VTdGF0dXNWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9kZXZpY2Vfc3RhdHVzJ1xuICBjbGFzc05hbWU6ICdyb3cnXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuXG4gICAgc3RhdHVzID0ge1xuICAgICAgdGV4dDogJ05vdCBDb25uZWN0ZWQnXG4gICAgICBjc3M6ICAnYmFkZ2UtZGVmYXVsdCdcbiAgICB9XG5cbiAgICAjIENvbm5lY3RlZFxuICAgIGlmIEBtb2RlbC5nZXQoJ3N0YXR1c19jb2RlJykgPT0gMVxuXG4gICAgICBzdGF0dXMgPSB7XG4gICAgICAgIHRleHQ6ICdDb25uZWN0ZWQnXG4gICAgICAgIGNzczogJ2JhZGdlLXN1Y2Nlc3MnXG4gICAgICB9XG5cbiAgICByZXR1cm4geyBzdGF0dXM6IHN0YXR1cyB9XG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VMYXlvdXQgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdydcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2RldmljZV9sYXlvdXQnKVxuXG4gIHJlZ2lvbnM6XG4gICAgIyBzdGF0dXNSZWdpb246ICdbZGF0YS1yZWdpb249c3RhdHVzXSdcbiAgICBrZXlzUmVnaW9uOiAgICdbZGF0YS1yZWdpb249a2V5c10nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBbZGF0YS1jbGljaz1jb25uZWN0XSc6ICdjb25uZWN0VG9EZXZpY2UnXG5cbiAgY29ubmVjdFRvRGV2aWNlOiAtPlxuICAgIFJhZGlvLmNoYW5uZWwoJ3VzYicpLnJlcXVlc3QoJ2RldmljZXMnKS50aGVuIChkKSA9PiBAcmVuZGVyKClcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAgaWYgd2luZG93LmRcbiAgICAgIHJldHVybiB7IGNvbm5lY3RlZDogdHJ1ZSB9XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHsgY29ubmVjdGVkOiBmYWxzZSB9XG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEluc3RhbnRpYXRlcyBuZXcgS2V5U2VsZWN0b3IgVmlld1xuICAgIGtleVNlbGVjdG9yID0gbmV3IEtleVNlbGVjdG9yKHsgY29sbGVjdGlvbjogQG1vZGVsLmdldCgna2V5cycpIH0pXG4gICAga2V5U2VsZWN0b3Iub24gJ2NoaWxkdmlldzpzZWxlY3RlZCcsICh2aWV3KSA9PiBAdHJpZ2dlcigna2V5OnNlbGVjdGVkJywgdmlldy5tb2RlbClcbiAgICBrZXlTZWxlY3Rvci5vbiAnY2hpbGR2aWV3OmRlc2VsZWN0ZWQnLCAodmlldykgPT4gQHRyaWdnZXIoJ2tleTpkZXNlbGVjdGVkJylcbiAgICBAa2V5c1JlZ2lvbi5zaG93KGtleVNlbGVjdG9yKVxuXG4gICAgIyBTdGF0dXMgVmlld1xuICAgICMgVE9ETyAtIHN0YXR1cyAmIGNvbm5lY3Rpb24gdmlld1xuICAgICMgQHN0YXR1c1JlZ2lvbi5zaG93IG5ldyBEZXZpY2VTdGF0dXNWaWV3KHsgbW9kZWw6IEBtb2RlbCB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBEZXZpY2VMYXlvdXRcblxuXG4iLCJTaW1wbGVOYXYgPSByZXF1aXJlICdsaWIvdmlld3Mvc2ltcGxlX25hdidcblxuIyAjICMgIyAjXG5cbmNsYXNzIEVkaXRvclNlbGVjdG9yIGV4dGVuZHMgU2ltcGxlTmF2XG4gIGNsYXNzTmFtZTogJ3JvdyBoLTEwMCdcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2VkaXRvcl9zZWxlY3RvcicpXG5cbiAgYmVoYXZpb3JzOlxuICAgIFRvb2x0aXBzOiB7fVxuXG4gIG5hdkl0ZW1zOiBbXG4gICAgeyBpY29uOiAnZmEta2V5Ym9hcmQtbycsICB0ZXh0OiAnTWFjcm8nLCAgdHJpZ2dlcjogJ21hY3JvJyB9XG4gICAgeyBpY29uOiAnZmEtZmlsZS10ZXh0LW8nLCB0ZXh0OiAnU25pcHBldCcsICAgdHJpZ2dlcjogJ3RleHQnIH1cbiAgICAjIHsgaWNvbjogJ2ZhLWFzdGVyaXNrJywgICAgdGV4dDogJ0tleScsICAgIHRyaWdnZXI6ICdrZXknLCBkaXNhYmxlZDogdHJ1ZSwgY3NzOiAnZGlzYWJsZWQnLCB0aXRsZTogJ0NvbWluZyBTb29uJyB9XG4gIF1cblxuICBvblJlbmRlcjogLT5cbiAgICBjb25maWdNb2RlbCA9IEBtb2RlbC5nZXQoJ2NvbmZpZycpXG4gICAgdHJpZ2dlciA9IGNvbmZpZ01vZGVsLmdldCgndHlwZScpXG4gICAgcmV0dXJuIEAkKFwiW2RhdGEtdHJpZ2dlcj0je3RyaWdnZXJ9XVwiKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICBvbk5hdmlnYXRlTWFjcm86IC0+XG4gICAgQHRyaWdnZXIgJ3Nob3c6bWFjcm86ZWRpdG9yJ1xuXG4gIG9uTmF2aWdhdGVUZXh0OiAtPlxuICAgIEB0cmlnZ2VyICdzaG93OnRleHQ6ZWRpdG9yJ1xuXG4gIG9uTmF2aWdhdGVLZXk6IC0+XG4gICAgQHRyaWdnZXIgJ3Nob3c6a2V5OmVkaXRvcidcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yU2VsZWN0b3JcbiIsIlRleHRFZGl0b3IgPSByZXF1aXJlKCcuL3RleHRFZGl0b3InKVxuTWFjcm9FZGl0b3IgPSByZXF1aXJlKCcuL21hY3JvRWRpdG9yJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEVkaXRvcldyYXBwZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2VkaXRvcl93cmFwcGVyJ1xuICBjbGFzc05hbWU6ICdyb3cnXG5cbiAgcmVnaW9uczpcbiAgICBjb250ZW50UmVnaW9uOiAnW2RhdGEtcmVnaW9uPWNvbnRlbnRdJ1xuXG4gIHVpOlxuICAgIHJlY29yZEJ0bjogJ1tkYXRhLWNsaWNrPXJlY29yZF0nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBbZGF0YS1jbGljaz1zYXZlXSc6ICAgICdvblNhdmUnXG4gICAgJ2NsaWNrIFtkYXRhLWNsaWNrPWNsZWFyXSc6ICAgJ29uQ2xlYXInXG4gICAgJ2NsaWNrIFtkYXRhLWNsaWNrPWNhbmNlbF0nOiAgJ29uQ2FuY2VsJ1xuICAgICdjbGljayBbZGF0YS1leGFtcGxlXSc6ICAgICAgICdsb2FkRXhhbXBsZSdcbiAgICAnY2xpY2sgQHVpLnJlY29yZEJ0bic6ICAgICAgICAndG9nZ2xlUmVjb3JkJ1xuXG4gIGVkaXRvcnM6XG4gICAgbWFjcm86ICBNYWNyb0VkaXRvclxuICAgIHRleHQ6ICAgVGV4dEVkaXRvclxuICAgIGtleTogICAgTWFjcm9FZGl0b3JcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG5cbiAgICAjIFNob3J0LWNpcmN1aXRcbiAgICByZXR1cm4geyBtYWNyb19lZGl0b3I6IHRydWUgfSBpZiBAb3B0aW9ucy5lZGl0b3IgPT0gJ21hY3JvJ1xuICAgIHJldHVybiB7IG1hY3JvX2VkaXRvcjogZmFsc2UgfVxuXG4gIG9uUmVuZGVyOiAtPlxuXG4gICAgIyBGZXRjaGVzIHRoZSBFZGl0b3JWaWV3IHByb3RvdHlwZVxuICAgIEVkaXRvclZpZXcgPSBAZWRpdG9yc1tAb3B0aW9ucy5lZGl0b3JdXG5cbiAgICAjIElzb2xhdGVzIENvbmZpZ1xuICAgIGNvbmZpZyA9IEBtb2RlbC5nZXQoJ2NvbmZpZycpXG5cbiAgICAjIENhY2hlcyB0aGUgY3VycmVudCBjb25maWd1cmF0aW9uIHRvIGJlIHJlc3RvcmVkIHdoZW4gdGhpcyB2aWV3IGlzIGNhbmNlbGxlZCBvdXRcbiAgICBAY2FjaGVkQ29uZmlnID0gY29uZmlnLnRvSlNPTigpXG5cbiAgICAjIElzb2xhdGVzIE1hY3JvQ29sbGVjdGlvblxuICAgIEBtYWNyb3MgPSBjb25maWcuZ2V0KCdtYWNyb3MnKVxuXG4gICAgIyBSZXF1ZXN0cyBLZXlDb2xsZWN0aW9uIGZyb20gdGhlIEtleUZhY3RvcnlcbiAgICBrZXlzID0gUmFkaW8uY2hhbm5lbCgna2V5JykucmVxdWVzdCgnY29sbGVjdGlvbicpXG5cbiAgICAjIEluc3RhbnRpYXRlcyBuZXcgRWRpdG9yVmlldyBpbnN0YW5jZVxuICAgIEBlZGl0b3JWaWV3ID0gbmV3IEVkaXRvclZpZXcoeyBtb2RlbDogY29uZmlnLCBrZXlzOiBrZXlzLCBtYWNyb3M6IEBtYWNyb3MgfSlcblxuICAgICMgTGlzdGVucyBmb3IgJ3N0b3A6cmVjb3JkaW5nJyBldmVudFxuICAgIEBlZGl0b3JWaWV3Lm9uICdzdG9wOnJlY29yZGluZycsID0+IEB0b2dnbGVSZWNvcmQoKVxuXG4gICAgIyBTaG93cyB0aGUgdmlldyBpbiBAY29udGVudFJlZ2lvblxuICAgIEBjb250ZW50UmVnaW9uLnNob3cgQGVkaXRvclZpZXdcblxuICAjIG9uQ2xlYXJcbiAgIyBFbXB0aWVzIHRoZSBNYWNyb0NvbGxlY3Rpb25cbiAgIyBUT0RPIC0gdW5kbyBidXR0b24/XG4gIG9uQ2xlYXI6IC0+XG5cbiAgICAjIFN0b3BzIFJlY29yZGluZ1xuICAgIEBzdG9wUmVjb3JkaW5nKClcblxuICAgICMgRW1wdGllcyB0aGUgTWFjcm9Db2xsZWN0aW9uXG4gICAgQG1hY3Jvcy5yZXNldCgpXG4gICAgcmV0dXJuXG5cbiAgIyBvblNhdmVcbiAgb25TYXZlOiAtPlxuXG4gICAgIyBTdG9wcyBSZWNvcmRpbmdcbiAgICBAc3RvcFJlY29yZGluZygpXG5cbiAgICAjIFNlcmlhbGl6ZXMgZGF0YSBmcm9tIGFueSBmb3JtIGVsZW1lbnRzIGluIHRoaXMgdmlld1xuICAgIGRhdGEgPSBCYWNrYm9uZS5TeXBob24uc2VyaWFsaXplKEApXG5cbiAgICAjIEhhbmRsZXMgTWFjcm9cbiAgICBpZiBkYXRhLnR5cGUgPT0gJ21hY3JvJ1xuXG4gICAgICAjIENsZWFyIHVudXNlZCB0eXBlLXNwZWNpZmljIGF0dHJpYnV0ZXNcbiAgICAgIGRhdGEudGV4dF92YWx1ZSA9ICcnXG5cbiAgICAgICMgQXBwbGllcyB0aGUgYXR0cmlidXRlcyB0byB0aGUgY29uZmlnIG1vZGVsXG4gICAgICBAbW9kZWwuZ2V0KCdjb25maWcnKS5zZXQoZGF0YSlcblxuICAgICAgIyBUcmlnZ2VycyBjaGFuZ2UgZXZlbnQgb24gQG1vZGVsIHRvIHJlLXJlbmRlciB0aGUgY3VycmVudGx5IGhpZGRlbiBLZXlTZWxlY3RvclxuICAgICAgQG1vZGVsLnRyaWdnZXIoJ2NvbmZpZzp1cGRhdGVkJylcblxuICAgICAgIyBHZXRzIHRoZSBtYWNyb0luZGV4XG4gICAgICBtYWNyb0luZGV4ID0gQG1vZGVsLmdldCgnb3JkZXInKVxuXG4gICAgICAjIEdldHMgZGF0YSBmcm9tIE1hY3JvQ29sbGVjdGlvbi5idWlsZCgpIG1ldGhvZFxuICAgICAgZGF0YSA9IEBtYWNyb3MuYnVpbGQoKVxuXG4gICAgICAjIFRPRE8gLSBERUJVR1xuICAgICAgY29uc29sZS5sb2cgJ1dSSVRJTkcnXG4gICAgICBjb25zb2xlLmxvZyBkYXRhXG5cbiAgICAgICMgU2hvcnQtY2lyY3VpdHNcbiAgICAgIHJldHVybiBAdHJpZ2dlcignc2F2ZScpIHVubGVzcyB3aW5kb3cuZFxuXG4gICAgICAjIEludm9rZXMgQ2hyb21lV2ViVVNCU2VydmljZSBkaXJlY3RseVxuICAgICAgIyBUT0RPIC0gYWJzdHJhY3QgdGhpcyBpbnRvIHRoZSBNYWNybyBzZXJ2aWNlXG4gICAgICBSYWRpby5jaGFubmVsKCd1c2InKS5yZXF1ZXN0KCd3cml0ZTptYWNybycsIG1hY3JvSW5kZXgsIGRhdGEpXG4gICAgICAudGhlbiggKHJlc3BvbnNlKSA9PlxuICAgICAgICByZXR1cm4gQHRyaWdnZXIoJ3NhdmUnKVxuICAgICAgKVxuXG4gICAgIyBIYW5kbGVzIFNuaXBwZXRcbiAgICBlbHNlIGlmIGRhdGEudHlwZSA9PSAndGV4dCdcblxuICAgICAgIyBDbGVhciB1bnVzZWQgdHlwZS1zcGVjaWZpYyBhdHRyaWJ1dGVzXG4gICAgICBkYXRhLm1hY3JvcyA9IFtdXG5cbiAgICAgICMgQXBwbGllcyB0aGUgYXR0cmlidXRlcyB0byB0aGUgY29uZmlnIG1vZGVsXG4gICAgICBAbW9kZWwuZ2V0KCdjb25maWcnKS5zZXQoZGF0YSlcblxuICAgICAgIyBUcmlnZ2VycyBjaGFuZ2UgZXZlbnQgb24gQG1vZGVsIHRvIHJlLXJlbmRlciB0aGUgY3VycmVudGx5IGhpZGRlbiBLZXlTZWxlY3RvclxuICAgICAgQG1vZGVsLnRyaWdnZXIoJ2NvbmZpZzp1cGRhdGVkJylcblxuICAgICAgIyBHZXRzIHRoZSBtYWNyb0luZGV4XG4gICAgICBtYWNyb0luZGV4ID0gQG1vZGVsLmdldCgnb3JkZXInKVxuXG4gICAgICAjIEdldHMgZGF0YSBmcm9tIE1hY3JvQ29sbGVjdGlvbi5idWlsZCgpIG1ldGhvZFxuICAgICAgIyBUT0RPIC0gc2hvdWxkIGJlIEBzbmlwcGV0LmJ1aWxkKClcbiAgICAgIGRhdGEgPSBAbW9kZWwuYnVpbGRTbmlwcGV0KGRhdGEudGV4dF92YWx1ZSlcblxuICAgICAgIyBTZXRzIHRoZSBAbWFjcm9zIGNvbGxlY3Rpb24gd2l0aCB0aGUgdXBkYXRlZCBkYXRhXG4gICAgICAjIFVzZWQgdG8gaW52b2tlIG1hY3Jvcy5idWlsZFxuICAgICAgQG1hY3Jvcy5yZXNldChkYXRhKVxuICAgICAgZGF0YSA9IEBtYWNyb3MuYnVpbGQoKVxuXG4gICAgICAjIFNob3J0LWNpcmN1aXRzXG4gICAgICByZXR1cm4gQHRyaWdnZXIoJ3NhdmUnKSB1bmxlc3Mgd2luZG93LmRcblxuICAgICAgIyBJbnZva2VzIENocm9tZVdlYlVTQlNlcnZpY2UgZGlyZWN0bHlcbiAgICAgICMgVE9ETyAtIGFic3RyYWN0IHRoaXMgaW50byB0aGUgTWFjcm8gc2VydmljZVxuICAgICAgUmFkaW8uY2hhbm5lbCgndXNiJykucmVxdWVzdCgnd3JpdGU6bWFjcm8nLCBtYWNyb0luZGV4LCBkYXRhKVxuICAgICAgLnRoZW4oIChyZXNwb25zZSkgPT5cbiAgICAgICAgcmV0dXJuIEB0cmlnZ2VyKCdzYXZlJylcbiAgICAgIClcblxuXG4gICMgb25DYW5jZWxcbiAgb25DYW5jZWw6IC0+XG5cbiAgICAjIFN0b3BzIFJlY29yZGluZ1xuICAgIEBzdG9wUmVjb3JkaW5nKClcblxuICAgICMgUmVzZXRzIGNvbmZpZyBhdHRyaWJ1dGVzXG4gICAgQG1vZGVsLmdldCgnY29uZmlnJykuc2V0KEBjYWNoZWRDb25maWcpXG5cbiAgICAjIFRyaWdnZXJzICdjYW5jZWwnIGV2ZW50LCBjbG9zaW5nIHRoaXMgdmlld1xuICAgIHJldHVybiBAdHJpZ2dlciAnY2FuY2VsJ1xuXG4gICMgbG9hZEV4YW1wbGVcbiAgIyBFbXB0aWVzIG91dCB0aGUgTWFjcm9Db2xsZWNpb24gYW5kIGxvYWRzIGFuIGV4YW1wbGUgbWFjcm9cbiAgbG9hZEV4YW1wbGU6IChlKSAtPlxuXG4gICAgIyBTdG9wcyBSZWNvcmRpbmdcbiAgICBAc3RvcFJlY29yZGluZygpXG5cbiAgICAjIENhY2hlcyBjbGlja2VkIGVsXG4gICAgZWwgPSAkKGUuY3VycmVudFRhcmdldClcblxuICAgICMgR2V0cyB0aGUgSUQgb2YgdGhlIGV4YW1wbGUgdG8gbG9hZFxuICAgIGV4YW1wbGVfaWQgPSBlbC5kYXRhKCdleGFtcGxlJylcblxuICAgICMgSW52b2tlcyB0aGUgbG9hZEV4YW1wbGUgbWV0aG9kIG9uIHRoZSBNYWNyb0NvbGxlY3Rpb25cbiAgICByZXR1cm4gQG1hY3Jvcy5sb2FkRXhhbXBsZShleGFtcGxlX2lkKVxuXG4gICMgdG9nZ2xlUmVjb3JkXG4gICMgVG9nZ2xlcyB3ZXRoZXIgb3Igbm90IHRoZSB1c2VyJ3Mga2V5Ym9hcmQgaXMgcmVjb3JkaW5nIGtleXN0cm9rZXNcbiAgdG9nZ2xlUmVjb3JkOiAoZSkgLT5cbiAgICByZXR1cm4gQHN0b3BSZWNvcmRpbmcoKSBpZiBAaXNSZWNvcmRpbmdcbiAgICBAc3RhcnRSZWNvcmRpbmcoKVxuXG4gICMgc3RvcFJlY29yZGluZ1xuICBzdG9wUmVjb3JkaW5nOiAtPlxuXG4gICAgIyBTZXRzIEBpc1JlY29yZGluZyBmbGFnXG4gICAgQGlzUmVjb3JkaW5nID0gZmFsc2VcblxuICAgICMgVXBkYXRlcyB0aGUgRWRpdG9yVmlldyBpbnN0YW5jZSB0byBpZ25vcmUga2V5Ym9hcmQgaW5wdXRcbiAgICBAZWRpdG9yVmlldy5rZXlib2FyZFNlbGVjdG9yPy5jdXJyZW50LnN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyBVcGRhdGVzIHRoZSBAdWkucmVjb3JkQnRuIGVsZW1lbnRcbiAgICBAdWkucmVjb3JkQnRuLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5maW5kKCdpJykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW4gZmEtY2lyY2xlLW8tbm90Y2gnKS5hZGRDbGFzcygnZmEtY2lyY2xlJylcblxuICAjIHN0YXJ0UmVjb3JkaW5nXG4gIHN0YXJ0UmVjb3JkaW5nOiAtPlxuXG4gICAgIyBFbXB0eSBtYWNyb3NcbiAgICBAbWFjcm9zLnJlc2V0KClcblxuICAgICMgU2V0cyBAaXNSZWNvcmRpbmcgZmxhZ1xuICAgIEBpc1JlY29yZGluZyA9IHRydWVcblxuICAgICMgVXBkYXRlcyB0aGUgRWRpdG9yVmlldyBpbnN0YW5jZSB0byBhbGxvdyBrZXlib2FyZCBpbnB1dFxuICAgIEBlZGl0b3JWaWV3LmtleWJvYXJkU2VsZWN0b3I/LmN1cnJlbnQuc3RhcnRSZWNvcmRpbmcoKVxuXG4gICAgIyBVcGRhdGVzIHRoZSBAdWkucmVjb3JkQnRuIGVsZW1lbnRcbiAgICBAdWkucmVjb3JkQnRuLmFkZENsYXNzKCdhY3RpdmUnKS5maW5kKCdpJykuYWRkQ2xhc3MoJ2ZhLXNwaW4gZmEtY2lyY2xlLW8tbm90Y2gnKS5yZW1vdmVDbGFzcygnZmEtY2lyY2xlJylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yV3JhcHBlclxuXG5cblxuIiwiXG5jbGFzcyBLZXlDaGlsZCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGFnTmFtZTogJ2xpJ1xuICBjbGFzc05hbWU6ICdidG4gYnRuLW91dGxpbmUtbGlnaHQga2V5LS1jaGlsZCBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgbXgtMidcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2tleV9jaGlsZCcpXG5cbiAgYmVoYXZpb3JzOlxuICAgIFNlbGVjdGFibGVDaGlsZDogeyBkZXNlbGVjdDogdHJ1ZSB9XG5cbiAgbW9kZWxFdmVudHM6XG4gICAgJ2NvbmZpZzp1cGRhdGVkJzogJ29uTW9kZWxDaGFuZ2UnXG5cbiAgb25Nb2RlbENoYW5nZTogLT5cbiAgICByZXR1cm4gQHJlbmRlcigpXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuXG4gICAgIyBJc29sYXRlcyBBc3Ryb0tleUNvbmZpZyBtb2RlbFxuICAgIGNvbmZpZyA9IEBtb2RlbC5nZXQoJ2NvbmZpZycpXG5cbiAgICAjIE1hY3JvXG4gICAgaWYgY29uZmlnLmdldCgndHlwZScpID09ICdtYWNybydcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnTScgfVxuXG4gICAgIyBUZXh0XG4gICAgaWYgY29uZmlnLmdldCgndHlwZScpID09ICd0ZXh0J1xuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdUJyB9XG5cbiAgICAjIEtleVxuICAgICMgVE9ETyAtIERJU1BMQVkgS0VZIElOIFZJRVdcbiAgICBpZiBjb25maWcuZ2V0KCd0eXBlJykgPT0gJ2tleSdcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnSycgfVxuXG4jICMgIyAjICNcblxuIyBjbGFzcyBLZXlTZWxlY3RvciBleHRlbmRzIE1uLkNvbGxlY3Rpb25WaWV3XG4jICAgdGFnTmFtZTogJ3VsJ1xuIyAgIGNsYXNzTmFtZTogJ2xpc3QtdW5zdHlsZWQga2V5LS1saXN0IHB4LTMgcHktMyBteS0yIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXIgZmxleC1yb3cnXG4jICAgY2hpbGRWaWV3OiBLZXlDaGlsZFxuXG5jbGFzcyBLZXlTZWxlY3RvciBleHRlbmRzIE1uLkNvbXBvc2l0ZVZpZXdcbiAgY2xhc3NOYW1lOiAna2V5LS1saXN0LS13cmFwcGVyIHB4LTMgcHktMyBkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyIG15LTQnXG4gIGNoaWxkVmlldzogS2V5Q2hpbGRcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2tleV9zZWxlY3RvcicpXG4gIGNoaWxkVmlld0NvbnRhaW5lcjogJ3VsJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlTZWxlY3RvclxuXG5cbiIsIkRldmljZUxheW91dCA9IHJlcXVpcmUoJy4vZGV2aWNlTGF5b3V0JylcbkVkaXRvclNlbGVjdG9yID0gcmVxdWlyZSgnLi9lZGl0b3JTZWxlY3RvcicpXG5FZGl0b3JXcmFwcGVyID0gcmVxdWlyZSgnLi9lZGl0b3JXcmFwcGVyJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEhlbHBWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9oZWxwX3ZpZXcnXG4gIGNsYXNzTmFtZTogJ3JvdydcblxuIyAjICMgIyAjXG5cbmNsYXNzIExheW91dFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2xheW91dCdcbiAgY2xhc3NOYW1lOiAnY29udGFpbmVyLWZsdWlkIGQtZmxleCBmbGV4LWNvbHVtbiB3LTEwMCBoLTEwMCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBkZXZpY2UtLWxheW91dCdcblxuICByZWdpb25zOlxuICAgIGRldmljZVJlZ2lvbjogICAnW2RhdGEtcmVnaW9uPWRldmljZV0nXG4gICAgc2VsZWN0b3JSZWdpb246ICdbZGF0YS1yZWdpb249c2VsZWN0b3JdJ1xuICAgIGVkaXRvclJlZ2lvbjogICAnW2RhdGEtcmVnaW9uPWVkaXRvcl0nXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIERpc3BsYXlzIGRlZmF1bHQgaGVscCB0ZXh0XG4gICAgQHNob3dIZWxwVmlldygpXG5cbiAgICAjIEluc3RhbnRpYXRlcyBhIG5ldyBEZXZpY2VMYXlvdXQgZm9yIGNvbm5lY3RpbmcgdG8gYW4gQXN0cm9LZXlcbiAgICAjIGFuZCBzZWxlY3Rpbmcgd2hpY2gga2V5IHRoZSB1c2VyIHdvdWxkIGxpa2UgdG8gZWRpdFxuICAgIGRldmljZVZpZXcgPSBuZXcgRGV2aWNlTGF5b3V0KHsgbW9kZWw6IEBtb2RlbCB9KVxuICAgIGRldmljZVZpZXcub24gJ2tleTpzZWxlY3RlZCcsIChrZXlNb2RlbCkgPT4gQHNob3dFZGl0b3JTZWxlY3RvcihrZXlNb2RlbClcbiAgICBkZXZpY2VWaWV3Lm9uICdrZXk6ZGVzZWxlY3RlZCcsICgpID0+IEBzaG93SGVscFZpZXcoKVxuICAgIEBkZXZpY2VSZWdpb24uc2hvdyhkZXZpY2VWaWV3KVxuXG4gICAgIyBNYWNybyBEZXZlbG9wbWVudCBoYWNrXG4gICAgIyBzZXRUaW1lb3V0KCA9PlxuICAgICMgICBAc2hvd0VkaXRvclZpZXcoQG1vZGVsLmdldCgna2V5cycpLmZpcnN0KCksICdtYWNybycpXG4gICAgIyAsIDEwMDApXG4gICAgIyBAc2hvd0VkaXRvclZpZXcoQG1vZGVsLmdldCgna2V5cycpLmZpcnN0KCksICdtYWNybycpXG5cbiAgc2hvd0hlbHBWaWV3OiAtPlxuXG4gICAgIyBJbnN0YW50aWF0ZXMgYSBuZXcgSGVscFZpZXcgYW5kIHNob3dzIGl0IGluIEBzZWxlY3RvclJlZ2lvblxuICAgIEBzZWxlY3RvclJlZ2lvbi5zaG93IG5ldyBIZWxwVmlldygpXG5cbiAgc2hvd0VkaXRvclNlbGVjdG9yOiAoa2V5TW9kZWwpIC0+XG5cbiAgICAjIEluc3RhbnRhaWF0ZXMgbmV3IEVkaXRvclNlbGVjdG9yIHZpZXdcbiAgICBlZGl0b3JTZWxlY3RvciA9IG5ldyBFZGl0b3JTZWxlY3Rvcih7IG1vZGVsOiBrZXlNb2RlbCB9KVxuXG4gICAgIyBTaG93cyBNYWNybyBFZGl0b3JcbiAgICBlZGl0b3JTZWxlY3Rvci5vbiAnc2hvdzptYWNybzplZGl0b3InLCA9PiBAc2hvd0VkaXRvclZpZXcoa2V5TW9kZWwsICdtYWNybycpXG5cbiAgICAjIFNob3dzIFRleHQgRWRpdG9yXG4gICAgZWRpdG9yU2VsZWN0b3Iub24gJ3Nob3c6dGV4dDplZGl0b3InLCA9PiBAc2hvd0VkaXRvclZpZXcoa2V5TW9kZWwsICd0ZXh0JylcblxuICAgICMgU2hvd3MgS2V5IEVkaXRvclxuICAgIGVkaXRvclNlbGVjdG9yLm9uICdzaG93OmtleTplZGl0b3InLCA9PiBAc2hvd0VkaXRvclZpZXcoa2V5TW9kZWwsICdrZXknKVxuXG4gICAgIyBTaG93cyB0aGUgRWRpdG9yU2VsZWN0b3Igdmlld1xuICAgIEBzZWxlY3RvclJlZ2lvbi5zaG93KGVkaXRvclNlbGVjdG9yKVxuXG4gIHNob3dFZGl0b3JWaWV3OiAoa2V5TW9kZWwsIGVkaXRvcikgLT5cblxuICAgICMgQWRqdXN0cyB0aGUgQ1NTIHRvIGRpc3BsYXkgdGhlIEVkaXRvcldyYXBwZXJcbiAgICBAJGVsLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gICAgIyBSZWFkcyBtYWNybyBmcm9tIGRldmljZVxuICAgICMgTk9URSAtIHRoaXMgaGFwcGVucyBhc3luY2hyb25vdXNseVxuICAgICMgV2UgX3Nob3VsZF8gbm90IHJlbmRlciB0aGUgRWRpdG9yV3JhcHBlciB2aWV3IHVudGlsIGlmIGEgZGV2aWNlIGlzIG5vdCBwcmVzZW50LFxuICAgICMgYnV0IHdlIHdpbGwgaW4gdGhlIG1lYW50aW1lIGZvciBkZW1vbnN0cmF0aW9uIHB1cnBvc2VzXG4gICAga2V5TW9kZWwucmVhZE1hY3JvKClcblxuICAgICMgSW5zdGFudGlhdGVzIG5ldyBFZGl0b3JXcmFwcGVyIHZpZXdcbiAgICBlZGl0b3JXcmFwcGVyID0gbmV3IEVkaXRvcldyYXBwZXIoeyBtb2RlbDoga2V5TW9kZWwsIGVkaXRvcjogZWRpdG9yIH0pXG5cbiAgICAjIEhhbmRsZXMgJ2NhbmNlbCcgZXZlbnRcbiAgICBlZGl0b3JXcmFwcGVyLm9uICdjYW5jZWwnLCA9PlxuICAgICAgQCRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICMgSGFuZGxlcyAnc2F2ZScgZXZlbnRcbiAgICBlZGl0b3JXcmFwcGVyLm9uICdzYXZlJywgPT5cbiAgICAgICMgVE9ETyAtIGhpdCB0aGUgS2V5TW9kZWwgLyBEZXZpY2VNb2RlbCB0byBkbyB0aGUgcmVzdCBmcm9tIGhlcmVcbiAgICAgIEAkZWwucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAjIFNob3dzIHRoZSBFZGl0b3JXcmFwcGVyIHZpZXcgaW4gQGVkaXRvclJlZ2lvblxuICAgIEBlZGl0b3JSZWdpb24uc2hvdyhlZGl0b3JXcmFwcGVyKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXRWaWV3XG5cblxuXG4iLCJLZXlib2FyZFNlbGVjdG9yID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX3NlbGVjdG9yJylcbk1hY3JvTGlzdCA9IHJlcXVpcmUoJy4vbWFjcm9MaXN0JylcblxuIyAjICMgIyAjXG5cbmNsYXNzIE1hY3JvRWRpdG9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9tYWNyb19lZGl0b3InXG4gIGNsYXNzTmFtZTogJ3JvdyBoLTEwMCdcblxuICByZWdpb25zOlxuICAgIG1hY3JvUmVnaW9uOiAgICAnW2RhdGEtcmVnaW9uPW1hY3JvXSdcbiAgICBjb250cm9sc1JlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1jb250cm9sc10nXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEdldHMgdGhlIGN1cnJlbnQgbWFjcm8gYXNzaWduZWQgdG8gdGhlIGtleU1vZGVsXG4gICAgIyBtYWNyb0NvbGxlY3Rpb24gPSBrZXlNb2RlbC5nZXRNYWNyb0NvbGxlY3Rpb24oKVxuICAgIEBtYWNyb1JlZ2lvbi5zaG93IG5ldyBNYWNyb0xpc3QoeyBjb2xsZWN0aW9uOiBAb3B0aW9ucy5tYWNyb3MgfSlcblxuICAgICMgSW5zdGFudGFpYXRlcyBuZXcgS2V5Ym9hcmRTZWxlY3RvclxuICAgICMgVE9ETyAtIHRoaXMgd2lsbCAqZXZlbnR1YWxseSogZGlzcGxheSBhIHNlbGVjdG9yIGJldHdlZW4gZGlmZmVyZW50IHR5cGVzIG9mIGtleWJvYXJkcyAvIHNldHMgb2Yga2V5c1xuICAgIEBrZXlib2FyZFNlbGVjdG9yID0gbmV3IEtleWJvYXJkU2VsZWN0b3IoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pXG5cbiAgICAjIEJ1YmJsZXMgdXAgc3RvcDpyZWNvcmRpbmcgZXZlbnRcbiAgICBAa2V5Ym9hcmRTZWxlY3Rvci5vbiAnc3RvcDpyZWNvcmRpbmcnLCA9PiBAdHJpZ2dlciAnc3RvcDpyZWNvcmRpbmcnXG5cbiAgICAjIEhhbmRsZXMgS2V5U2VsZWN0aW9uIGV2ZW50XG4gICAgQGtleWJvYXJkU2VsZWN0b3Iub24gJ2tleTpzZWxlY3RlZCcsIChrZXkpID0+XG5cbiAgICAgICMgQ2xvbmVzIHRoZSBvcmlnaW5hbCBvYmplY3RcbiAgICAgIGtleSA9IF8uY2xvbmUoa2V5KVxuXG4gICAgICAjIEFkZHMgdGhlIGNvcnJlY3QgYG9yZGVyYCBhdHRyaWJ1dGVcbiAgICAgIGtleS5vcmRlciA9IEBvcHRpb25zLm1hY3Jvcy5sZW5ndGhcblxuICAgICAgIyBBZGRzIHRoZSBrZXkgdG8gdGhlIE1hY3JvQ29sbGVjdGlvblxuICAgICAgQG9wdGlvbnMubWFjcm9zLmFkZChrZXkpXG4gICAgICBAb3B0aW9ucy5tYWNyb3Muc29ydCgpXG5cbiAgICAjIFNob3dzIHRoZSBrZXlib2FyZFZpZXdcbiAgICBAY29udHJvbHNSZWdpb24uc2hvdyBAa2V5Ym9hcmRTZWxlY3RvclxuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG4gICAgQGtleWJvYXJkVmlldy5zdGFydFJlY29yZGluZygpXG5cbiAgIyBzdG9wUmVjb3JkaW5nXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG4gICAgQGtleWJvYXJkVmlldy5zdG9wUmVjb3JkaW5nKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWFjcm9FZGl0b3JcblxuXG5cbiIsIlxuY2xhc3MgTWFjcm9DaGlsZCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGFnTmFtZTogJ2xpJ1xuICBjbGFzc05hbWU6ICdtYWNyby0tY2hpbGQgZmxleC1jb2x1bW4ganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgbXktMidcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL21hY3JvX2NoaWxkJylcblxuICBiZWhhdmlvcnM6XG4gICAgU29ydGFibGVDaGlsZDoge31cbiAgICAjIFRvb2x0aXBzOiB7fVxuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdjaGFuZ2U6cG9zaXRpb24nOiAgJ3JlbmRlcidcbiAgICAnY2hhbmdlOnNoaWZ0ZWQnOiAgICdyZW5kZXInXG5cbiAgIyB1aTpcbiAgIyAgIHRvb2x0aXA6ICdbZGF0YS10b2dnbGU9dG9vbHRpcF0nXG5cbiAgZXZlbnRzOlxuICAgICdkcmFnJzogJ29uRHJhZydcbiAgICAnZHJhZ3N0YXJ0JzogJ29uRHJhZ1N0YXJ0J1xuICAgICdtb3VzZW92ZXIgLmtleSc6ICdvbk1vdXNlT3ZlcidcbiAgICAnbW91c2VvdXQgLmtleSc6ICdvbk1vdXNlT3V0J1xuICAgICdjbGljayAua2V5JzogJ3JlbW92ZU1hY3JvJ1xuICAgICdjbGljayBbZGF0YS1wb3NpdGlvbl06bm90KC5hY3RpdmUpJzogJ29uUG9zaXRpb25DbGljaydcblxuICAjIHN0YXRlOiB7XG4gICMgICB0b29sdGlwT25SZW5kZXI6IGZhbHNlXG4gICMgfVxuXG4gICMgb25SZW5kZXI6IC0+XG4gICMgICByZXR1cm4gdW5sZXNzIEBzdGF0ZS50b29sdGlwT25SZW5kZXJcblxuICAjICAgIyBVbnNldHMgdG9vbHRpcCBmbGFnXG4gICMgICBAc3RhdGUudG9vbHRpcE9uUmVuZGVyID0gZmFsc2VcblxuICAjICAgIyBTaG93cyB0aGUgdG9vbHRpcFxuICAjICAgQHVpLnRvb2x0aXAudG9vbHRpcCgnc2hvdycpXG5cbiAgb25Nb3VzZU92ZXI6IC0+XG4gICAgQCRlbC5hZGRDbGFzcygnaG92ZXJlZCcpXG5cbiAgb25Nb3VzZU91dDogLT5cbiAgICBAJGVsLnJlbW92ZUNsYXNzKCdob3ZlcmVkJylcblxuICBvbkRyYWdTdGFydDogLT5cbiAgICBAJGVsLmFkZENsYXNzKCdkcmFnLXN0YXJ0JylcblxuICBvbkRyYWc6IC0+XG4gICAgQCRlbC5yZW1vdmVDbGFzcygnZHJhZy1zdGFydCBob3ZlcmVkJylcbiAgICBAJGVsLnNpYmxpbmdzKCcubWFjcm8tLWNoaWxkJykucmVtb3ZlQ2xhc3MoJ2RyYWctc3RhcnQgaG92ZXJlZCcpXG5cbiAgcmVtb3ZlTWFjcm86IC0+XG4gICAgIyBjb25zb2xlLmxvZyBAbW9kZWxcbiAgICAjIEBtb2RlbC5zZXQoJ3NoaWZ0ZWQnLCAhQG1vZGVsLmdldCgnc2hpZnRlZCcpKVxuICAgIEBtb2RlbC5jb2xsZWN0aW9uLnJlbW92ZShAbW9kZWwpXG5cbiAgb25Qb3NpdGlvbkNsaWNrOiAoZSkgLT5cblxuICAgICMgRGlzcGxheXMgdGhlIHRvb2x0aXAgYWZ0ZXIgdGhlIHZpZXcgcmUtcmVuZGVyc1xuICAgICMgQHN0YXRlLnRvb2x0aXBPblJlbmRlciA9IHRydWVcblxuICAgICMgQ2xlYXJzIGFjdGl2ZSB0b29sdGlwc1xuICAgICMgQGNsZWFyVG9vbHRpcHMoKVxuXG4gICAgIyBDYWNoZXMgY2xpY2tlZCBlbFxuICAgIGVsID0gJChlLmN1cnJlbnRUYXJnZXQpXG5cbiAgICAjIElzb2xhdGVzIHBvc2l0aW9uIGRhdGEgZnJvbSBlbGVtZW50XG4gICAgcG9zaXRpb24gPSBlbC5kYXRhKCdwb3NpdGlvbicpXG5cbiAgICAjIERldGVybWluZXMgbmV4dCBwb3NpdGlvblxuXG4gICAgIyBLRVlfRE4gLT4gS0VZX1VQXG4gICAgaWYgcG9zaXRpb24gPT0gMVxuICAgICAgbmV3X3Bvc2l0aW9uID0gMlxuXG4gICAgIyBLRVlfVVAgLT4gS0VZX1BSXG4gICAgaWYgcG9zaXRpb24gPT0gMlxuICAgICAgbmV3X3Bvc2l0aW9uID0gM1xuXG4gICAgIyBLRVlfUFIgLT4gS0VZX0ROXG4gICAgaWYgcG9zaXRpb24gPT0gM1xuICAgICAgbmV3X3Bvc2l0aW9uID0gMVxuXG4gICAgIyBTZXRzIHRoZSBwb3NpdGlvbiBhdHRyaWJ1dGUgb24gdGhlIG1vZGVsXG4gICAgQG1vZGVsLnNldCgncG9zaXRpb24nLCBuZXdfcG9zaXRpb24pXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIHBvc2l0aW9ucyA9IFtcbiAgICAgIHsgcG9zaXRpb246IC0xLCBjc3M6ICdmYS1sb25nLWFycm93LWRvd24nLCB0b29sdGlwOiAnS2V5IERvd24nIH1cbiAgICAgIHsgcG9zaXRpb246IDAsIGNzczogJ2ZhLWFycm93cy12JywgdG9vbHRpcDogJ0tleSBEb3duIHwgVXAnIH1cbiAgICAgIHsgcG9zaXRpb246IDEsIGNzczogJ2ZhLWxvbmctYXJyb3ctdXAnLCB0b29sdGlwOiAnS2V5IFVwJyB9XG5cbiAgICAgIHsgcG9zaXRpb246IDEsIGNzczogJ2ZhLWxvbmctYXJyb3ctZG93bicsIHRvb2x0aXA6ICdLZXkgRG93bicgfVxuICAgICAgeyBwb3NpdGlvbjogMiwgY3NzOiAnZmEtbG9uZy1hcnJvdy11cCcsIHRvb2x0aXA6ICdLZXkgVXAnIH1cbiAgICAgIHsgcG9zaXRpb246IDMsIGNzczogJ2ZhLWFycm93cy12JywgdG9vbHRpcDogJ0tleSBEb3duIHwgVXAnIH1cbiAgICBdXG5cbiAgICBwb3NpdGlvbiA9IEBtb2RlbC5nZXQoJ3Bvc2l0aW9uJylcbiAgICBjb25zb2xlLmxvZyAncG9zaXRpb246ICcsIHBvc2l0aW9uXG4gICAgYWN0aXZlX3Bvc2l0aW9uID0gXy5maW5kV2hlcmUocG9zaXRpb25zLCB7IHBvc2l0aW9uOiBwb3NpdGlvbiB9KVxuICAgIHJldHVybiB7IGFjdGl2ZV9wb3NpdGlvbiB9XG5cbiMgIyAjICMgI1xuXG5jbGFzcyBNYWNyb0VtcHR5IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0YWdOYW1lOiAnbGknXG4gIGNsYXNzTmFtZTogJ21hY3JvLS1jaGlsZCBlbXB0eSBmbGV4LWNvbHVtbiBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBteS0yJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvbWFjcm9fZW1wdHknKVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9MaXN0IGV4dGVuZHMgTW4uQ29sbGVjdGlvblZpZXdcbiAgdGFnTmFtZTogJ3VsJ1xuICBjbGFzc05hbWU6ICdsaXN0LXVuc3R5bGVkIG1hY3JvLS1saXN0IHB4LTQgbXktMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgZmxleC1yb3cgZmxleC13cmFwJ1xuICBjaGlsZFZpZXc6IE1hY3JvQ2hpbGRcbiAgZW1wdHlWaWV3OiBNYWNyb0VtcHR5XG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIFNvcnRzIHRoZSBjb2xsZWN0aW9uXG4gICAgQGNvbGxlY3Rpb24uc29ydCgpXG5cbiAgICAjIEluaXRpYWxpemVzIFNvcnRhYmxlIGNvbnRhaW5lclxuICAgIFNvcnRhYmxlLmNyZWF0ZSBAZWwsXG4gICAgICBhbmltYXRpb246ICAgIDE1MFxuICAgICAgaGFuZGxlOiAgICAgICAnLmtleSdcbiAgICAgIGdob3N0Q2xhc3M6ICAgJ2dob3N0JyAgIyBDbGFzcyBuYW1lIGZvciB0aGUgZHJvcCBwbGFjZWhvbGRlclxuICAgICAgY2hvc2VuQ2xhc3M6ICAnY2hvc2VuJyAgIyBDbGFzcyBuYW1lIGZvciB0aGUgY2hvc2VuIGl0ZW1cbiAgICAgIGRyYWdDbGFzczogICAgJ2RyYWcnICAjIENsYXNzIG5hbWUgZm9yIHRoZSBkcmFnZ2luZyBpdGVtXG4gICAgICAjIGdyb3VwOlxuICAgICAgIyAgIG5hbWU6ICdtYWNybydcbiAgICAgICMgICBwdWxsOiBmYWxzZVxuICAgICAgIyAgIHB1dDogIHRydWVcbiAgICAgIGZhbGxiYWNrVG9sZXJhbmNlOiAxMDBcbiAgICAgIG9uRW5kOiAoZSkgPT4gQHJlb3JkZXJDb2xsZWN0aW9uKClcblxuICAjIHJlb3JkZXJDb2xsZWN0aW9uXG4gICMgSW52b2tlZCBhZnRlciBzb3J0aW5nIGhhcyBjb21wbGV0ZWRcbiAgcmVvcmRlckNvbGxlY3Rpb246ID0+XG5cbiAgICAjIFRyaWdnZXJzIG9yZGVyIGV2ZW50cyBvbiBDb2xsZWN0aW9uVmlldyBjaGlsZFZpZXcgJGVsc1xuICAgIG9yZGVyID0gMVxuICAgIGZvciBlbCBpbiBAZWwuY2hpbGRyZW5cbiAgICAgICQoZWwpLnRyaWdnZXIoJ3NvcnRlZCcsb3JkZXIpXG4gICAgICBvcmRlcisrXG5cbiAgICAjIEBjb2xsZWN0aW9uLnNvcnQoKVxuICAgIEByZW5kZXIoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNYWNyb0xpc3RcblxuXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChjb25uZWN0ZWQpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBtYi00XFxcIj5cIik7XG5pZiAoIGNvbm5lY3RlZClcbntcbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJkaXNjb25uZWN0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeVxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLXRpbWVzIG1yLTFcXFwiPjwvaT5ESVNDT05ORUNUPC9idXR0b24+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8YnV0dG9uIGRhdGEtY2xpY2s9XFxcImNvbm5lY3RcXFwiIGNsYXNzPVxcXCJidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtdXNiIG1yLTFcXFwiPjwvaT5DT05ORUNUPC9idXR0b24+XCIpO1xufVxuYnVmLnB1c2goXCI8L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJrZXlzXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclxcXCI+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiY29ubmVjdGVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jb25uZWN0ZWQ6dHlwZW9mIGNvbm5lY3RlZCE9PVwidW5kZWZpbmVkXCI/Y29ubmVjdGVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGxhYmVsKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwicm93IGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMFxcXCI+PHAgY2xhc3M9XFxcImxlYWQgbWItMFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBsYWJlbCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9wPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0yIHRleHQtcmlnaHQgdGV4dC1tdXRlZFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLXBlbmNpbFxcXCI+PC9pPjwvZGl2PjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImxhYmVsXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5sYWJlbDp0eXBlb2YgbGFiZWwhPT1cInVuZGVmaW5lZFwiP2xhYmVsOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG5hdkl0ZW1zLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXggZmxleC1yb3cgYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxpIGNsYXNzPVxcXCJkLWZsZXggZmEgZmEtZncgZmEtMnggZmEtYXJyb3ctY2lyY2xlLW8tZG93biBtci0xXFxcIj48L2k+PHAgc3R5bGU9XFxcImxldHRlci1zcGFjaW5nOiAwLjI1cmVtOyBmb250LXdlaWdodDogMjAwO1xcXCIgY2xhc3M9XFxcImQtZmxleCBsZWFkIG0tMFxcXCI+U2VsZWN0IGFuIGVkaXRvcjwvcD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3cgbXQtNVxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj5cIik7XG4vLyBpdGVyYXRlIG5hdkl0ZW1zXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IG5hdkl0ZW1zO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCJcIiArIChqYWRlLmF0dHIoXCJ0aXRsZVwiLCBuYXZJdGVtLnRpdGxlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1wbGFjZW1lbnQ9XFxcImJvdHRvbVxcXCIgc3R5bGU9XFxcImZsZXgtZ3JvdzoxO1xcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLXRyaWdnZXJcIiwgbmF2SXRlbS50cmlnZ2VyLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuYXR0cihcImRpc2FibGVkXCIsIG5hdkl0ZW0uZGlzYWJsZWQsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWydkLWZsZXgnLCdidG4nLCdidG4tb3V0bGluZS1zZWNvbmRhcnknLCdqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJywnbXgtMycsbmF2SXRlbS5jc3NdLCBbbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIG5hdkl0ZW0gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxidXR0b24gZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiXCIgKyAoamFkZS5hdHRyKFwidGl0bGVcIiwgbmF2SXRlbS50aXRsZSwgdHJ1ZSwgZmFsc2UpKSArIFwiIGRhdGEtcGxhY2VtZW50PVxcXCJib3R0b21cXFwiIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIG5hdkl0ZW0udHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmF0dHIoXCJkaXNhYmxlZFwiLCBuYXZJdGVtLmRpc2FibGVkLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnZC1mbGV4JywnYnRuJywnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywnanVzdGlmeS1jb250ZW50LWNlbnRlcicsJ214LTMnLG5hdkl0ZW0uY3NzXSwgW251bGwsbnVsbCxudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBuYXZJdGVtLnRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYnV0dG9uPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJuYXZJdGVtc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubmF2SXRlbXM6dHlwZW9mIG5hdkl0ZW1zIT09XCJ1bmRlZmluZWRcIj9uYXZJdGVtczp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobWFjcm9fZWRpdG9yKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJjYW5jZWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBteC0yIHB4LTRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS0yeCBteC00IGZhLWFuZ2xlLWxlZnRcXFwiPjwvaT48L2J1dHRvbj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcInNhdmVcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXN1Y2Nlc3MgbXgtMiBweC00XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtMnggbXgtNCBmYS1jaGVjay1jaXJjbGUtb1xcXCI+PC9pPjwvYnV0dG9uPlwiKTtcbmlmICggbWFjcm9fZWRpdG9yKVxue1xuYnVmLnB1c2goXCI8YnV0dG9uIGRhdGEtY2xpY2s9XFxcImNsZWFyXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS13YXJuaW5nIG14LTIgcHgtNFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IG14LTQgZmEtdGltZXNcXFwiPjwvaT48L2J1dHRvbj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcInJlY29yZFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtZGFuZ2VyIG14LTIgcHgtNFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IG14LTQgZmEtY2lyY2xlXFxcIj48L2k+PC9idXR0b24+PGRpdiBjbGFzcz1cXFwiYnRuLWdyb3VwXFxcIj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS10b2dnbGU9XFxcImRyb3Bkb3duXFxcIiBhcmlhLWhhc3BvcHVwPVxcXCJ0cnVlXFxcIiBhcmlhLWV4cGFuZGVkPVxcXCJmYWxzZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtcHJpbWFyeSBkcm9wZG93bi10b2dnbGUgbXgtMiBweC00XFxcIj5FeGFtcGxlczwvYnV0dG9uPjxkaXYgY2xhc3M9XFxcImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1yaWdodCBtdC0zXFxcIj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1leGFtcGxlPVxcXCJleF8wMVxcXCIgY2xhc3M9XFxcImRyb3Bkb3duLWl0ZW1cXFwiPkV4LiAxOiBcXFwiSGVsbG8hXFxcIjwvYnV0dG9uPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWV4YW1wbGU9XFxcImV4XzAyXFxcIiBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+RXguIDI6IFxcXCJSZXN1bcOoXFxcIjwvYnV0dG9uPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWV4YW1wbGU9XFxcImV4XzAzXFxcIiBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+RXguIDM6IEVtIERhc2ggKOKAlCk8L2J1dHRvbj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1leGFtcGxlPVxcXCJleF8wNFxcXCIgY2xhc3M9XFxcImRyb3Bkb3duLWl0ZW1cXFwiPkV4LiA0OiBDVFJMICsgQUxUICsgREVMRVRFPC9idXR0b24+PC9kaXY+PC9kaXY+XCIpO1xufVxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxoci8+PC9kaXY+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiY29udGVudFxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibWFjcm9fZWRpdG9yXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5tYWNyb19lZGl0b3I6dHlwZW9mIG1hY3JvX2VkaXRvciE9PVwidW5kZWZpbmVkXCI/bWFjcm9fZWRpdG9yOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGZsZXgtcm93IGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj48aSBjbGFzcz1cXFwiZC1mbGV4IGZhIGZhLWZ3IGZhLTJ4IGZhLXF1ZXN0aW9uLWNpcmNsZS1vIG1yLTFcXFwiPjwvaT48cCBzdHlsZT1cXFwibGV0dGVyLXNwYWNpbmc6IDAuMjVyZW07IGZvbnQtd2VpZ2h0OiAyMDA7XFxcIiBjbGFzcz1cXFwiZC1mbGV4IGxlYWQgbS0wXFxcIj5DbGljayBhIGtleSB0byBlZGl0PC9wPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvdyBtdC01XFxcIj48ZGl2IHN0eWxlPVxcXCJvcGFjaXR5OjBcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxidXR0b24gZGlzYWJsZWQ9XFxcImRpc2FibGVkXFxcIiBzdHlsZT1cXFwiZmxleC1ncm93OjE7XFxcIiBjbGFzcz1cXFwiZC1mbGV4IGJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkganVzdGlmeS1jb250ZW50LWNlbnRlciBteC0zXFxcIj5CTEFOSzwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChsYWJlbCkge1xuYnVmLnB1c2goXCI8c3Bhbj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGxhYmVsKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+XCIpO30uY2FsbCh0aGlzLFwibGFiZWxcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmxhYmVsOnR5cGVvZiBsYWJlbCE9PVwidW5kZWZpbmVkXCI/bGFiZWw6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPHVsIGNsYXNzPVxcXCJsaXN0LXVuc3R5bGVkIGtleS0tbGlzdCBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gYWxpZ24taXRlbXMtY2VudGVyIGZsZXgtcm93IG15LTJcXFwiPjwvdWw+PGltZyBzcmM9XFxcIi4vaW1nL2ljb25fd2hpdGUuc3ZnXFxcIiBjbGFzcz1cXFwibG9nb1xcXCIvPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3cgaC0xMDAgdy0xMDAgZWRpdG9yLS1vdmVybGF5XFxcIj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJlZGl0b3JcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTIgcHQtMlxcXCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93IGRldmljZS0tb3ZlcmxheVxcXCI+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiZGV2aWNlXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJzZWxlY3RvclxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBwdC01XFxcIj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoYWN0aXZlX3Bvc2l0aW9uLCBhbHBoYSwgY3NzLCBrZXksIHNoaWZ0X2tleSwgc2hpZnRlZCwgc3BlY2lhbCkge1xuamFkZV9taXhpbnNbXCJwb3NpdGlvblNlbGVjdFwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxzcGFuIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIlwiICsgKGphZGUuYXR0cihcInRpdGxlXCIsIG9wdHMudG9vbHRpcCwgdHJ1ZSwgZmFsc2UpKSArIFwiIGRhdGEtcGxhY2VtZW50PVxcXCJib3R0b21cXFwiXCIgKyAoamFkZS5jbHMoWydmYS1zdGFjaycsJ2ZhLWxnJywncG9zaXRpb24tLXNlbGVjdCcsYHBvc2l0aW9uXyR7b3B0cy5wb3NpdGlvbn1gXSwgW251bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj48aSBjbGFzcz1cXFwiZmEgZmEtY2lyY2xlLXRoaW4gZmEtc3RhY2stMnhcXFwiPjwvaT48aSBjbGFzcz1cXFwiZmEgZmEtc3RhY2stMXggZmEtc3RhY2tcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1jaXJjbGUtdGhpbiBmYS1zdGFjay0yeCBmYS0yeFxcXCI+PC9pPjxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1wb3NpdGlvblwiLCBvcHRzLnBvc2l0aW9uLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnZmEnLCdmYS1zdGFjay0xeCcsb3B0cy5jc3NdLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+PC9pPjwvc3Bhbj5cIik7XG59O1xuYnVmLnB1c2goXCI8ZGl2XCIgKyAoamFkZS5jbHMoWydrZXknLCdkLWZsZXgnLHR5cGVvZiBzcGVjaWFsID09PSBcInVuZGVmaW5lZFwiID8gXCJcIiA6IFwic3BlY2lhbFwiXSwgW251bGwsbnVsbCx0cnVlXSkpICsgXCI+PGRpdlwiICsgKGphZGUuY2xzKFsnaW5uZXInLCdjb250ZW50Jyxjc3NdLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIHNoaWZ0ZWQgfHwgc2hpZnRfa2V5ICYmICFhbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSk7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuYnVmLnB1c2goXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJpbm5lciBob3ZlclxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLWxnIGZhLXRpbWVzXFxcIj48L2k+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicG9zaXRpb24gbXQtMlxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJwb3NpdGlvblNlbGVjdFwiXShhY3RpdmVfcG9zaXRpb24pO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJhY3RpdmVfcG9zaXRpb25cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmFjdGl2ZV9wb3NpdGlvbjp0eXBlb2YgYWN0aXZlX3Bvc2l0aW9uIT09XCJ1bmRlZmluZWRcIj9hY3RpdmVfcG9zaXRpb246dW5kZWZpbmVkLFwiYWxwaGFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmFscGhhOnR5cGVvZiBhbHBoYSE9PVwidW5kZWZpbmVkXCI/YWxwaGE6dW5kZWZpbmVkLFwiY3NzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jc3M6dHlwZW9mIGNzcyE9PVwidW5kZWZpbmVkXCI/Y3NzOnVuZGVmaW5lZCxcImtleVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgua2V5OnR5cGVvZiBrZXkhPT1cInVuZGVmaW5lZFwiP2tleTp1bmRlZmluZWQsXCJzaGlmdF9rZXlcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnNoaWZ0X2tleTp0eXBlb2Ygc2hpZnRfa2V5IT09XCJ1bmRlZmluZWRcIj9zaGlmdF9rZXk6dW5kZWZpbmVkLFwic2hpZnRlZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc2hpZnRlZDp0eXBlb2Ygc2hpZnRlZCE9PVwidW5kZWZpbmVkXCI/c2hpZnRlZDp1bmRlZmluZWQsXCJzcGVjaWFsXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5zcGVjaWFsOnR5cGVvZiBzcGVjaWFsIT09XCJ1bmRlZmluZWRcIj9zcGVjaWFsOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInR5cGVcXFwiIHZhbHVlPVxcXCJtYWNyb1xcXCIgcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIi8+PGRpdiBkYXRhLXJlZ2lvbj1cXFwibWFjcm9cXFwiIGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGhyLz48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJjb250cm9sc1xcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxwIGNsYXNzPVxcXCJsZWFkIHRleHQtY2VudGVyXFxcIj5NYWNyb3M8YnIvPjxzbWFsbD5FeGVjdXRlIGtleXN0cm9rZXMgaW4gYSBzcGVjaWZpYyBzZXF1ZW5jZTwvc21hbGw+PC9wPjxzbWFsbCBzdHlsZT1cXFwiZm9udC1zaXplOiAxcmVtO1xcXCIgY2xhc3M9XFxcInRleHQtbXV0ZWQgZC1mbGV4IGZsZXgtcm93IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyXFxcIj48ZGl2IGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1xdWVzdGlvbi1jaXJjbGUtbyBtci0xIGQtZmxleCBmbGV4LWNvbHVtblxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZC1mbGV4IGZsZXgtcm93XFxcIj48c3Bhbj5Vc2UgdGhlIGtleXMgYmVsb3csIG9yIGNsaWNrJm5ic3A7PC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0ZXh0LWRhbmdlclxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLWNpcmNsZSB0ZXh0LWRhbmdlclxcXCI+PC9pPiByZWNvcmQmbmJzcDs8L3NwYW4+Jm5ic3A7dG8gc3RhcnQgdHlwaW5nPC9kaXY+PC9zbWFsbD5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmphZGVfbWl4aW5zW1wiZm9ybUdyb3VwXCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGZpZWxkc2V0XCIgKyAoamFkZS5jbHMoWydmb3JtLWdyb3VwJyxvcHRzLmZvcm1Hcm91cENzc10sIFtudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIG9wdHMubGFiZWwpXG57XG5idWYucHVzaChcIjxsYWJlbCBjbGFzcz1cXFwiZm9ybS1jb250cm9sLWxhYmVsXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMubGFiZWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGFiZWw+XCIpO1xufVxuYmxvY2sgJiYgYmxvY2soKTtcbmJ1Zi5wdXNoKFwiPC9maWVsZHNldD5cIik7XG59O1xuYnVmLnB1c2goXCJcIik7XG5qYWRlX21peGluc1tcImZvcm1JbnB1dFwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5qYWRlX21peGluc1tcImZvcm1Hcm91cFwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCI8aW5wdXRcIiArIChqYWRlLmF0dHJzKGphZGUubWVyZ2UoW3tcInBsYWNlaG9sZGVyXCI6IGphZGUuZXNjYXBlKG9wdHMucGxhY2Vob2xkZXIpLFwibmFtZVwiOiBqYWRlLmVzY2FwZShvcHRzLm5hbWUpLFwidHlwZVwiOiBqYWRlLmVzY2FwZShvcHRzLnR5cGUpLFwiY2xhc3NcIjogXCJmb3JtLWNvbnRyb2xcIn0sYXR0cmlidXRlc10pLCBmYWxzZSkpICsgXCIvPlwiKTtcbn1cbn0sIG9wdHMpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLThcXFwiPjxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInR5cGVcXFwiIHZhbHVlPVxcXCJ0ZXh0XFxcIiByZWFkb25seT1cXFwicmVhZG9ubHlcXFwiLz5cIik7XG5qYWRlX21peGluc1tcImZvcm1JbnB1dFwiXS5jYWxsKHtcbmF0dHJpYnV0ZXM6IGphZGUubWVyZ2UoW3sgY2xhc3M6ICdmb3JtLWNvbnRyb2wtbGcnIH1dKVxufSwgeyBuYW1lOiAndGV4dF92YWx1ZScsIHR5cGU6ICd0ZXh0JywgcGxhY2Vob2xkZXI6ICdFbnRlciBzb21lIHRleHQgaGVyZS4uLicgfSk7XG5idWYucHVzaChcIjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbmNsYXNzIFRleHRFZGl0b3IgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93IGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGV4dF9lZGl0b3InKVxuXG4gIG9uUmVuZGVyOiAtPlxuICAgIEJhY2tib25lLlN5cGhvbi5kZXNlcmlhbGl6ZShALCB7IHR5cGU6ICd0ZXh0JywgdGV4dF92YWx1ZTogQG1vZGVsLmdldCgndGV4dF92YWx1ZScpIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRFZGl0b3JcbiIsIlxuIyBEdW1teSBEZXZpY2UgRGF0YSBmb3IgVUkgZGV2ZWxvcG1lbnRcbiMgVE9ETyAtIHB1bGwgZnJvbSBXZWJVU0I/XG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAge1xuICAgIGlkOiAnZGV2aWNlXzEnLFxuICAgIGxhYmVsOiAnQWxleFxcJ3MgQXN0cm9LZXknLFxuICAgIHN0YXR1c19jb2RlOiAxLFxuICAgIGtleXM6IFtcbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfMScsIG9yZGVyOiAnMHgwMDAwJywgY29uZmlnOiB7IHR5cGU6ICdtYWNybycsIG1hY3JvczogW10gfSB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzInLCBvcmRlcjogJzB4MDAwMScsIGNvbmZpZzogeyB0eXBlOiAnbWFjcm8nLCBtYWNyb3M6IFtdIH0gfVxuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV8zJywgb3JkZXI6ICcweDAwMDInLCBjb25maWc6IHsgdHlwZTogJ21hY3JvJywgbWFjcm9zOiBbXSB9IH1cbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfNCcsIG9yZGVyOiAnMHgwMDAzJywgY29uZmlnOiB7IHR5cGU6ICdtYWNybycsIG1hY3JvczogW10gfSB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzUnLCBvcmRlcjogJzB4MDAwNCcsIGNvbmZpZzogeyB0eXBlOiAnbWFjcm8nLCBtYWNyb3M6IFtdIH0gfVxuICAgIF1cbiAgfVxuXVxuIiwiTWFjcm9FbnRpdGllcyA9IHJlcXVpcmUoJy4uL21hY3JvL2VudGl0aWVzJylcbk1hY3JvS2V5cyA9IHJlcXVpcmUoJy4uL2tleS9rZXlzJylcbkNoYXJhY3Rlck1hcCA9IHJlcXVpcmUoJ2xpYi9jaGFyYWN0ZXJfbWFwJylcbkludmVydGVkQ2hhcmFjdGVyTWFwID0gXy5pbnZlcnQoQ2hhcmFjdGVyTWFwKVxuXG4jICMgIyAjICNcblxuIyBBY2NlcHRzIGFuIGFycmF5IGFuZCBzcGxpdHMgaXRcbiMgaW50byBwYWlycyBvZiBbcG9zaXRpb24sIGNoYXJhY3Rlcl9pZF1cbnBhaXJBcnJheSA9IChhKSA9PlxuICB0ZW1wID0gYS5zbGljZSgpXG4gIGFyciA9IFtdXG5cbiAgd2hpbGUgKHRlbXAubGVuZ3RoKVxuICAgIGFyci5wdXNoKHRlbXAuc3BsaWNlKDAsMikpXG5cbiAgcmV0dXJuIGFyclxuXG4jICMgIyAjICNcblxuIyBBc3Ryb0tleUNvbmZpZyBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBBc3Ryb2tleUNvbmZpZyBleHRlbmRzIEJhY2tib25lLlJlbGF0aW9uYWxNb2RlbFxuXG4gICMgRGVmYXVsdCBhdHRyaWJ1dGVzXG4gIGRlZmF1bHRzOiB7XG4gICAgdHlwZTogJ21hY3JvJ1xuICAgIG1hY3JvczogW11cbiAgICB0ZXh0X3ZhbHVlOiAnJ1xuICAgIGtleV92YWx1ZTogJydcbiAgfVxuXG4gICMgQmFja2JvbmUuUmVsYXRpb25hbCAtIEByZWxhdGlvbnMgZGVmaW5pdGlvblxuICByZWxhdGlvbnM6IFtcbiAgICAgIHR5cGU6ICAgICAgICAgICBCYWNrYm9uZS5IYXNNYW55XG4gICAgICBrZXk6ICAgICAgICAgICAgJ21hY3JvcydcbiAgICAgIHJlbGF0ZWRNb2RlbDogICBNYWNyb0VudGl0aWVzLk1vZGVsXG4gICAgICBjb2xsZWN0aW9uVHlwZTogTWFjcm9FbnRpdGllcy5Db2xsZWN0aW9uXG4gIF1cblxuIyAjICMgIyAjXG5cbiMgQXN0cm9rZXlNb2RlbCBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBBc3Ryb2tleU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6XG4gICAgb3JkZXI6IG51bGxcbiAgICBjb25maWc6IHt9XG5cbiAgIyBCYWNrYm9uZS5SZWxhdGlvbmFsIC0gQHJlbGF0aW9ucyBkZWZpbml0aW9uXG4gIHJlbGF0aW9uczogW1xuICAgICAgdHlwZTogICAgICAgICAgIEJhY2tib25lLkhhc09uZVxuICAgICAga2V5OiAgICAgICAgICAgICdjb25maWcnXG4gICAgICByZWxhdGVkTW9kZWw6ICAgQXN0cm9rZXlDb25maWdcbiAgXVxuXG4gICMgVE9ETyAtIHRoaXMgc2hvdWxkIGJlIG1vdmVkIGVsc2V3aGVyZSAobm90IGEgRGV2aWNlLWxldmVsIGNvbmNlcm4pXG4gIGJ1aWxkU25pcHBldDogKHNuaXBwZXQpIC0+XG4gICAgZGF0YSA9IFtdXG5cbiAgICAjIEl0ZXJhdGVzIG92ZXIgZWFjaCBjaGFyYWN0ZXIgaW4gdGhlIHNuaXBwZXRcbiAgICBmb3IgaW5kZXggaW4gWzAuLnNuaXBwZXQubGVuZ3RoIC0gMV1cblxuICAgICAgIyBJc29sYWV0cyB0aGUgY2hhcmFjdGVyXG4gICAgICBjaGFyID0gc25pcHBldFtpbmRleF1cblxuICAgICAgIyBGaW5kcyB0aGUgbWFjcm9cbiAgICAgIG1hY3JvID0gXy5maW5kV2hlcmUoTWFjcm9LZXlzLCB7IGtleTogY2hhciB9KVxuICAgICAgbWFjcm8gfHw9IF8uZmluZFdoZXJlKE1hY3JvS2V5cywgeyBrZXk6ICdTUEFDRScgfSlcblxuICAgICAgIyBDbG9uZXMgdGhlIG1hY3JvIG9iamVjdFxuICAgICAgbWFjcm8gPSBfLmNsb25lKG1hY3JvKVxuXG4gICAgICAjIEFzc2lnbnNzIHRoZSBwcm9wZXIgb3JkZXIvaW5kZXggYW5kIHBvc2l0aW9uIGF0dHJpYnV0ZXNcbiAgICAgIG1hY3JvLm9yZGVyID0gaW5kZXhcbiAgICAgIG1hY3JvLnBvc2l0aW9uID0gMFxuXG4gICAgICAjIEFwcGVuZHMgbWFjcm8gdG8gZGF0YSBhcnJheVxuICAgICAgZGF0YS5wdXNoKG1hY3JvKVxuXG4gICAgIyBSZXR1cm5zIHRoZSBmb3JtYXR0ZWQgZGF0YSBhcnJheVxuICAgIHJldHVybiBkYXRhXG5cbiAgIyByZWFkTWFjcm9cbiAgIyBSZWFkcyBhbmQgcGFyc2VzIHRoZSBtYWNybyBmcm9tIHRoZSBkZXZpY2VcbiAgIyBUT0RPIC0gbW9zdCBvZiB0aGlzIHNob3VsZCBiZSBtb3ZlZCBlbHNld2hlcmUgKG5vdCBhIERldmljZS1sZXZlbCBjb25jZXJuKVxuICByZWFkTWFjcm86IC0+XG5cbiAgICAjIFJldHVybnMgYSBQcm9taXNlIHRvIGhhbmRsZSBhc3luY2hyb25vdXMgYmVoYXZpb3JcbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgIyBJc3N1ZXMgJ3JlYWQ6bWFjcm8nIHJlcXVlc3QgdG8gdGhlIFVTQiBzZXJ2aWNlXG4gICAgICBSYWRpby5jaGFubmVsKCd1c2InKS5yZXF1ZXN0KCdyZWFkOm1hY3JvJywgQGdldCgnb3JkZXInKSkudGhlbigobWFjcm9BcnJheSkgPT5cblxuICAgICAgICAjIFN0b3JlcyB0aGUga2V5cyB1c2VkIHRvIHBvcHVsYXRlIHRoZSBtYWNybyBjb2xsZWN0aW9uXG4gICAgICAgIG1hY3JvcyA9IFtdXG4gICAgICAgIHBhcnNlZE1hY3JvcyA9IFtdXG5cbiAgICAgICAgIyBUT0RPIC0gcmVtb3ZlXG4gICAgICAgIGNvbnNvbGUubG9nICdQYXJzZWQgTWFjcm8gZnJvbSBrZXk6ICcsIEBnZXQoJ29yZGVyJylcbiAgICAgICAgY29uc29sZS5sb2cgbWFjcm9BcnJheVxuXG4gICAgICAgICMgQ29tcGFjdHMgdGhlIG1hY3JvQXJyYXlcbiAgICAgICAgIyBRVUVTVElPTiAtIHdpbGwgd2UgZXZlciBoYXZlIHplcm9zIGJldHdlZW4gZWFjaCBrZXkgc3Ryb2tlP1xuICAgICAgICBtYWNyb0FycmF5ID0gXy5jb21wYWN0KG1hY3JvQXJyYXkpXG5cbiAgICAgICAgIyBTcGxpdHMgdGhlIGFycmF5IGludG8gcGFpcnMgb2YgW3Bvc2l0aW9uLCBjaGFyYWN0ZXJfaWRdXG4gICAgICAgIHBhaXJzID0gcGFpckFycmF5KG1hY3JvQXJyYXkpXG5cbiAgICAgICAgIyBJdGVyYXRlcyBvdmVyIGVhY2ggcGFpciBpbiB0aGUgbWFjcm9BcnJheVxuICAgICAgICBmb3IgcGFpciwgaW5kZXggaW4gcGFpcnNcblxuICAgICAgICAgICMgQ2FwdHVyZXMgYW5kIGZvcm1hdHMgdGhlIHBvc2l0aW9uXG4gICAgICAgICAgcG9zaXRpb24gPSBwYWlyWzBdXG5cbiAgICAgICAgICAjIEZpbmRzIHRoZSBtYWNybyBvYmplY3RcbiAgICAgICAgICBtYWNybyA9IF8uZmluZFdoZXJlKE1hY3JvS2V5cywgeyBrZXk6IEludmVydGVkQ2hhcmFjdGVyTWFwW3BhaXJbMV1dIH0pXG5cbiAgICAgICAgICAjIENsb25lcyB0aGUgbWFjcm8gb2JqZWN0XG4gICAgICAgICAgbWFjcm8gPSBfLmNsb25lKG1hY3JvKVxuXG4gICAgICAgICAgIyBBc3NpZ25zcyB0aGUgcHJvcGVyIG9yZGVyL2luZGV4IGFuZCBwb3NpdGlvbiBhdHRyaWJ1dGVzXG4gICAgICAgICAgbWFjcm8ucG9zaXRpb24gPSBwb3NpdGlvblxuXG4gICAgICAgICAgIyBBcHBlbmRzIHRoZSBtYWNybyB0aGUgdGhlIGBtYWNyb3NgIGFycmF5XG4gICAgICAgICAgbWFjcm9zLnB1c2gobWFjcm8pXG5cbiAgICAgICAgIyBJdGVyYXRlcyBvdmVyIHRoZSBtYWNyb3MgX2FnYWluXyAtIHRoaXMgdGltZSB0byBtZXJnZSBrZXl1cC9rZXlkb3duIGFjdGlvbnNcbiAgICAgICAgcGFyc2VkSW5kZXggPSAwXG4gICAgICAgIGl0ZXJhdGVJbmRleCA9IDBcbiAgICAgICAgd2hpbGUgaXRlcmF0ZUluZGV4IDwgbWFjcm9zLmxlbmd0aFxuXG4gICAgICAgICAgIyBJc29sYXRlcyB0aGUgY3VycmVudCBhbmQgbmV4dCBtYWNyb3MgaW4gdGhlIGFycmF5XG4gICAgICAgICAgbWFjcm8gPSBtYWNyb3NbaXRlcmF0ZUluZGV4XVxuICAgICAgICAgIG5leHRNYWNybyA9IG1hY3Jvc1tpdGVyYXRlSW5kZXggKyAxXVxuXG4gICAgICAgICAgIyBSZXR1cm5zIGlmIG5leHRNYWNybyBpcyB1bmRlZmluZWRcbiAgICAgICAgICBpZiAhbmV4dE1hY3JvXG4gICAgICAgICAgICBtYWNyby5vcmRlciA9IHBhcnNlZEluZGV4XG4gICAgICAgICAgICBwYXJzZWRJbmRleCsrXG4gICAgICAgICAgICBwYXJzZWRNYWNyb3MucHVzaChtYWNybylcbiAgICAgICAgICAgIGl0ZXJhdGVJbmRleCsrXG4gICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgIyAjIENvbnRpbnVlcyBjaGVjayBpZiB0aGUgbWFjcm8gaXMgYSBjb3JyZXNwb25kaW5nIEtFWV9VUFxuICAgICAgICAgICMgaWYgbWFjcm8ucG9zaXRpb24gPT0gMSAmJiBuZXh0TWFjcm8ucG9zaXRpb24gPT0gMiAmJiBtYWNyby5rZXkgPT0gbmV4dE1hY3JvLmtleVxuXG4gICAgICAgICAgIyAgICMgS0VZX1BSRVNTXG4gICAgICAgICAgIyAgIG1hY3JvLnBvc2l0aW9uID0gM1xuXG4gICAgICAgICAgIyAgICMgQXBwZW5kcyB0aGUgbWFjcm8gdG8gdGhlIHBhcnNlZE1hY3JvcyBhcnJheVxuICAgICAgICAgICMgICBtYWNyby5vcmRlciA9IHBhcnNlZEluZGV4XG4gICAgICAgICAgIyAgIHBhcnNlZEluZGV4KytcbiAgICAgICAgICAjICAgcGFyc2VkTWFjcm9zLnB1c2gobWFjcm8pXG5cbiAgICAgICAgICAjICAgIyBJdGVyYXRlcywgc2tpcHBpbmcgdGhlIG1hdGNoZWQgbWFjcm9cbiAgICAgICAgICAjICAgaXRlcmF0ZUluZGV4ID0gaXRlcmF0ZUluZGV4ICsgMlxuICAgICAgICAgICMgICBjb250aW51ZVxuXG4gICAgICAgICAgIyBOb24tUmVwZWF0ZWQgLSBzdGFuZGFyZCBwcm9jZWR1cmVcbiAgICAgICAgICBtYWNyby5vcmRlciA9IHBhcnNlZEluZGV4XG4gICAgICAgICAgcGFyc2VkSW5kZXgrK1xuICAgICAgICAgIHBhcnNlZE1hY3Jvcy5wdXNoKG1hY3JvKVxuICAgICAgICAgIGl0ZXJhdGVJbmRleCsrXG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICAjIFNldHMgdGhlIE1hY3JvcyBvbiB0aGUgQXN0cm9rZXlDb25maWcgbW9kZWxcbiAgICAgICAgY29uZmlnID0gQGdldCgnY29uZmlnJylcbiAgICAgICAgY29uZmlnLmdldCgnbWFjcm9zJykucmVzZXQocGFyc2VkTWFjcm9zKVxuXG4gICAgICAgICMgUmVzb2x2ZXMgdGhlIFByb21pc2Ugd2l0aCB0aGUgcGFyc2VkIG1hY3Jvc1xuICAgICAgICByZXR1cm4gcmVzb2x2ZShtYWNyb3MpXG4gICAgICApXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBBc3Ryb2tleUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBBc3Ryb2tleU1vZGVsXG4gIGNvbXBhcmF0b3I6ICdvcmRlcidcblxuIyAjICMgIyAjXG5cbiMgRGV2aWNlTW9kZWwgZGVmaW5pdGlvblxuY2xhc3MgRGV2aWNlTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIEJhY2tib25lLlJlbGF0aW9uYWwgLSBAcmVsYXRpb25zIGRlZmluaXRpb25cbiAgcmVsYXRpb25zOiBbXG4gICAgICB0eXBlOiAgICAgICAgICAgQmFja2JvbmUuSGFzTWFueVxuICAgICAga2V5OiAgICAgICAgICAgICdrZXlzJ1xuICAgICAgcmVsYXRlZE1vZGVsOiAgIEFzdHJva2V5TW9kZWxcbiAgICAgIGNvbGxlY3Rpb25UeXBlOiBBc3Ryb2tleUNvbGxlY3Rpb25cbiAgXVxuXG4jICMgIyAjICNcblxuIyBEZXZpY2VDb2xsZWN0aW9uIGRlZmluaXRpb25cbmNsYXNzIERldmljZUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBEZXZpY2VNb2RlbFxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPVxuICBNb2RlbDogICAgICBEZXZpY2VNb2RlbFxuICBDb2xsZWN0aW9uOiBEZXZpY2VDb2xsZWN0aW9uXG4iLCJFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKVxuRGV2aWNlRGF0YSA9IHJlcXVpcmUoJy4vZGF0YScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VGYWN0b3J5IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAnZGV2aWNlIG1vZGVsJzogICAgICAgJ2dldE1vZGVsJ1xuICAgICdkZXZpY2UgY29sbGVjdGlvbic6ICAnZ2V0Q29sbGVjdGlvbidcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjYWNoZWRDb2xsZWN0aW9uID0gbmV3IEVudGl0aWVzLkNvbGxlY3Rpb24oRGV2aWNlRGF0YSwgeyBwYXJzZTogdHJ1ZSB9KVxuXG4gIGdldE1vZGVsOiAoaWQpIC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uLmdldChpZClcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBAY2FjaGVkQ29sbGVjdGlvblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRGV2aWNlRmFjdG9yeSgpXG4iLCJMYXlvdXRWaWV3ICA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jICMgIyAjICNcblxuY2xhc3MgSG9tZVJvdXRlIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGUnXG5cbiAgdGl0bGU6ICdBc3Ryb0tleSBIb21lJ1xuXG4gIGJyZWFkY3J1bWJzOiBbeyB0ZXh0OiAnRGV2aWNlJyB9XVxuXG4gIGZldGNoOiAtPlxuICAgIEBkZXZpY2VNb2RlbCA9IFJhZGlvLmNoYW5uZWwoJ2RldmljZScpLnJlcXVlc3QoJ21vZGVsJywgJ2RldmljZV8xJylcblxuICByZW5kZXI6IC0+XG4gICAgY29uc29sZS5sb2coQGRldmljZU1vZGVsKTsgIyBEZWJ1Z1xuICAgIEBjb250YWluZXIuc2hvdyBuZXcgTGF5b3V0Vmlldyh7IG1vZGVsOiBAZGV2aWNlTW9kZWwgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSG9tZVJvdXRlXG4iLCJcbmNsYXNzIEhvbWVMYXlvdXRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9sYXlvdXQnXG4gIGNsYXNzTmFtZTogJ2NvbnRhaW5lci1mbHVpZCBoLTEwMCdcblxuIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWVMYXlvdXRWaWV3XG5cblxuXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3cgaC0xMDBcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PHAgY2xhc3M9XFxcImxlYWRcXFwiPkFzdHJvS2V5PC9wPjxoci8+PHAgY2xhc3M9XFxcImxlYWRcXFwiPkNvbm5lY3QgYW4gQXN0cm9LZXkgZGV2aWNlIHRvIGdldCBzdGFydGVkPC9wPjxoci8+PGEgaHJlZj1cXFwiI2RldmljZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tb3V0bGluZS1wcmltYXJ5XFxcIj5ERVZJQ0U8L2E+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInJlcXVpcmUgJy4vZmFjdG9yeSdcbkhvbWVSb3V0ZSA9IHJlcXVpcmUgJy4vaG9tZS9yb3V0ZSdcbkRhc2hib2FyZFJvdXRlID0gcmVxdWlyZSAnLi9kYXNoYm9hcmQvcm91dGUnXG5cbiMgIyAjICMgI1xuXG4jIE1haW5Sb3V0ZXIgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgTWFpblJvdXRlciBleHRlbmRzIHJlcXVpcmUgJ2huX3JvdXRpbmcvbGliL3JvdXRlcidcblxuICByb3V0ZXM6XG4gICAgJygvKSc6ICdob21lJ1xuXG4gIGhvbWU6IC0+XG4gICAgbmV3IERhc2hib2FyZFJvdXRlKHsgY29udGFpbmVyOiBAY29udGFpbmVyIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1haW5Sb3V0ZXJcbiIsIlxuIyBGaWx0ZXJzIHVzZWQgdG8gcXVlcnkgV2ViVVNCIGRldmljZXNcbiMgVE9ETyAtIHVwZGF0ZSBmaWx0ZXJzIHRvIHF1ZXJ5IGRldmljZXMgYnkgQXN0cm9LZXkgVmVuZG9ySURcbnJlcXVlc3REZXZpY2VGaWx0ZXJzID0gW1xuICB7IHZlbmRvcklkOiAweDEwYzQgfVxuXVxuXG4jICMgIyAjXG5cbiMgQ2hyb21lV2ViVXNiU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIFJlc3BvbnNpYmxlIGZvciBtYW5hZ2luZyBVU0IgZGV2aWNlc1xuIyAtIGZldGNoIGFsbCBkZXZpY2VzXG4jIC0gd3JpdGluZyBkYXRhIHRvIGEgZGV2aWNlXG4jIC0gcmVhZGluZyBkYXRhIGZyb20gYSBkZXZpY2VcbiMgLSB3cml0ZSBmaXJtd2FyZSB0byBhIGRldmljZVxuY2xhc3MgQ2hyb21lV2ViVXNiU2VydmljZSBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ3VzYiBkZXZpY2VzJzogICAgICAnZ2V0RGV2aWNlcydcbiAgICAndXNiIHJlYWQ6bWFjcm8nOiAgICdyZWFkTWFjcm8nXG4gICAgJ3VzYiB3cml0ZTptYWNybyc6ICAnd3JpdGVNYWNybydcblxuICAjIGdldERldmljZXNcbiAgZ2V0RGV2aWNlczogLT5cblxuICAgICMgUmV0dXJucyBhIFByb21pc2UgdG8gbWFuYWdlIGFzeW5jaG9ub3VzIGJlaGF2aW9yXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG5cbiAgICAgICMgU3RlcCAxIC0gUmVxdWVzdCBkZXZpY2VcbiAgICAgIG5hdmlnYXRvci51c2IucmVxdWVzdERldmljZSh7IGZpbHRlcnM6IHJlcXVlc3REZXZpY2VGaWx0ZXJzIH0pXG4gICAgICAudGhlbiggKGRldmljZSkgPT5cblxuICAgICAgICAjIFRPRE8gLSByZW1vdmVcbiAgICAgICAgIyBjb25zb2xlLmxvZyBkZXZpY2VcblxuICAgICAgICAjIFN0ZXAgMiAtIEdldCBEZXZpY2VzXG4gICAgICAgICMgVE9ETyAtIHZlcmlmeSB0aGlzIHdvcmtmbG93XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNiLmdldERldmljZXMoKVxuICAgICAgICAudGhlbigoZCkgPT5cblxuICAgICAgICAgIGNvbnNvbGUubG9nKGQpXG5cbiAgICAgICAgICBkID0gZFswXVxuXG4gICAgICAgICAgIyBTVEVQIDMgLSBvcGVuIGRldmljZVxuICAgICAgICAgIGQub3BlbigpLnRoZW4gPT5cblxuICAgICAgICAgICAgY29uc29sZS5sb2cgJ29wZW4nXG5cbiAgICAgICAgICAgICMgU3RlcCA0IC0gc2VsZWN0IGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICAgIGQuc2VsZWN0Q29uZmlndXJhdGlvbigxKS50aGVuID0+XG5cbiAgICAgICAgICAgICAgIyBjb25zb2xlLmxvZyAnc2VsZWN0Q29uZmlndXJhdGlvbidcblxuICAgICAgICAgICAgICAjIFRPRE8gLSByZW1vdmVcbiAgICAgICAgICAgICAgd2luZG93LmQgPSBkXG5cbiAgICAgICAgICAgICAgIyBSZXNvbHZlcyB3aXRoIGRldmljZVxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShkKVxuXG4gICAgICAgICAgICAgICMgd0luZGV4IC0gUmVxdWVzdCB0eXBlICgweDAxIGZvciBzZXQgbWFjcm8pXG4gICAgICAgICAgICAgICMgd1ZhbHVlIC0gTWFjcm8gaW5kZXggKDAgLSA0IGluY2x1c2l2ZSlcbiAgICAgICAgICAgICAgIyBiUmVxdWVzdCAtIDMgKGhhcmRjb2RlZClcbiAgICAgICAgICAgICAgIyB3TGVuZ3RoIC0gbnVtYmVyIG9mIGJ5dGVzIChzaG91bGQgYmUgbWFjcm8gbGVuZ3RoICogMilcblxuICAgICAgICAgICAgICAjIGQuY29udHJvbFRyYW5zZmVyT3V0KFxuICAgICAgICAgICAgICAjICAge1xuICAgICAgICAgICAgICAjICAgICAncmVxdWVzdFR5cGUnOiAndmVuZG9yJyxcbiAgICAgICAgICAgICAgIyAgICAgJ3JlY2lwaWVudCc6ICdkZXZpY2UnLFxuICAgICAgICAgICAgICAjICAgICAncmVxdWVzdCc6IDB4MDMsXG4gICAgICAgICAgICAgICMgICAgICd2YWx1ZSc6IDB4MDAwMCxcbiAgICAgICAgICAgICAgIyAgICAgJ2luZGV4JzogMHgwMVxuICAgICAgICAgICAgICAjICAgfSwgbmV3IFVpbnQ4QXJyYXkoWzEsNCwyLDRdKS5idWZmZXJcbiAgICAgICAgICAgICAgIyApLnRoZW4oIChyZXNwb25zZSkgPT4geyBjb25zb2xlLmxvZyhyZXNwb25zZSkgfSlcblxuICAgICAgICAgICAgICAjIFNURVAgNSAtIGNvbnRyb2xUcmFuc2ZlckluXG4gICAgICAgICAgICAgICMgd2luZG93LmQuY29udHJvbFRyYW5zZmVySW4oeydyZXF1ZXN0VHlwZSc6ICdzdGFuZGFyZCcsICdyZWNpcGllbnQnOiAnZGV2aWNlJywgJ3JlcXVlc3QnOiAweDA2LCAndmFsdWUnOiAweDBGMDAsICdpbmRleCc6IDB4MDB9LCA1KS50aGVuKCAocikgPT4geyBjb25zb2xlLmxvZyhyKSB9KVxuXG5cbiAgICAgICAgKVxuICAgICAgICAjIGdldERldmljZXMgRXJyb3IgaGFuZGxpbmdcbiAgICAgICAgLmNhdGNoKChlcnIpID0+XG4gICAgICAgICAgY29uc29sZS5sb2cgJ0VSUiAtIG5hdmlnYXRvci51c2IuZ2V0RGV2aWNlcygpJ1xuICAgICAgICApXG5cbiAgICAgIClcblxuICAjIHJlYWRNYWNyb1xuICByZWFkTWFjcm86IChtYWNyb0luZGV4ID0gMHgwMDAwKSAtPlxuXG4gICAgIyBSZXR1cm5zIGEgUHJvbWlzZSB0byBtYW5hZ2UgYXN5bmNob25vdXMgYmVoYXZpb3JcbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgIyBUT0RPIC0gbW92ZSB0byBjb25zdGFudHNcbiAgICAgIHRyYW5zZmVyT3B0aW9ucyA9IHtcbiAgICAgICAgJ3JlcXVlc3RUeXBlJzogICd2ZW5kb3InLFxuICAgICAgICAncmVjaXBpZW50JzogICAgJ2RldmljZScsXG4gICAgICAgICdyZXF1ZXN0JzogICAgICAweDAzLFxuICAgICAgICAndmFsdWUnOiAgICAgICAgbWFjcm9JbmRleCxcbiAgICAgICAgJ2luZGV4JzogICAgICAgIDB4MDJcbiAgICAgIH1cblxuICAgICAgIyBkZXZpY2UuY29udHJvbFRyYW5zZmVySW4gKFJFQURTIERBVEEgRlJPTSBERVZJQ0UpXG4gICAgICAjIFRPRE8gLSBhYnN0cmFjdCB0aGUgY29udHJvbFRyYW5zZmVySW4gcmVxdWVzdCBvYmplY3QgaW50byBhIGNvbnN0YW50IChjbG9uZWQgZWFjaCB0aW1lKVxuICAgICAgZC5jb250cm9sVHJhbnNmZXJJbih0cmFuc2Zlck9wdGlvbnMsIDI1NikgIyBUT0RPIC0gJzI1Nicgc2hvdWxkIGJlICcxMjgnXG4gICAgICAudGhlbiggKHJlc3BvbnNlKSA9PlxuICAgICAgICBjb25zb2xlLmxvZyAncmVhZE1hY3JvIHJlc3BvbnNlOidcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgIHJldHVybiByZXNvbHZlKG5ldyBVaW50OEFycmF5KHJlc3BvbnNlLmRhdGEuYnVmZmVyKSlcbiAgICAgIClcbiAgICAgIC5jYXRjaCggKGVycikgPT5cbiAgICAgICAgY29uc29sZS5sb2cgJ3JlYWRNYWNybyBlcnJvcjonXG4gICAgICAgIGNvbnNvbGUubG9nIGVyclxuICAgICAgICByZXR1cm4gcmVqZWN0KGVycilcbiAgICAgIClcblxuICAjIHdyaXRlTWFjcm9cbiAgd3JpdGVNYWNybzogKG1hY3JvSW5kZXgsIGRhdGEpIC0+XG5cbiAgICAjIFJldHVybnMgYSBQcm9taXNlIHRvIG1hbmFnZSBhc3luY2hvbm91cyBiZWhhdmlvclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuXG4gICAgICAjIHdJbmRleCAtIFJlcXVlc3QgdHlwZSAoMHgwMSBmb3Igc2V0IG1hY3JvKVxuICAgICAgIyB3VmFsdWUgLSBNYWNybyBpbmRleCAoMCAtIDQgaW5jbHVzaXZlKVxuICAgICAgIyBiUmVxdWVzdCAtIDMgKGhhcmRjb2RlZClcbiAgICAgICMgd0xlbmd0aCAtIG51bWJlciBvZiBieXRlcyAoc2hvdWxkIGJlIG1hY3JvIGxlbmd0aCAqIDIpXG4gICAgICByZXF1ZXN0T2JqID0ge1xuICAgICAgICAgICdyZXF1ZXN0VHlwZSc6ICAndmVuZG9yJyxcbiAgICAgICAgICAncmVjaXBpZW50JzogICAgJ2RldmljZScsXG4gICAgICAgICAgJ3JlcXVlc3QnOiAgICAgIDB4MDMsICMgVE9ETyAtIGRvY3VtZW50XG4gICAgICAgICAgJ3ZhbHVlJzogICAgICAgIG1hY3JvSW5kZXgsXG4gICAgICAgICAgJ2luZGV4JzogICAgICAgIDB4MDEgIyBUT0RPIC0gV2UgY2FuIHVzZSBpbmRleCBmb3IgdGhlIGtleSB0aGUgbWFjcm8gY29ycmVzcG9uZHMgdG8gKGxvdy1ieXRlID0ga2V5LCBoaWdoLWJ5dGUgPSBudW1iZXIgb2YgYWN0aW9ucyBpbiB0aGUgbWFjcm8pXG4gICAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2cgcmVxdWVzdE9ialxuXG4gICAgICByZXR1cm4gZC5jb250cm9sVHJhbnNmZXJPdXQocmVxdWVzdE9iaiwgbmV3IFVpbnQ4QXJyYXkoZGF0YSkuYnVmZmVyKVxuICAgICAgLnRoZW4oIChyZXNwb25zZSkgPT5cbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgIHJldHVybiByZXNvbHZlKHJlc3BvbnNlKVxuICAgICAgKVxuICAgICAgLmNhdGNoKCAoZXJyKSA9PlxuICAgICAgICBjb25zb2xlLmxvZyAnRVJST1IgU0VORElORyBNQUNSTydcbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpXG4gICAgICApXG5cblxuIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBDaHJvbWVXZWJVc2JTZXJ2aWNlKClcbiIsbnVsbCwiXG4jIFByb3ZpZGVzIHVwZGF0ZUF0dHJzIG1ldGhvZCB1c2VkIGJ5IGJpbmRDaGVja2JveGVzLCBiaW5kSW5wdXRzLCBiaW5kUmFkaW9zLCBiaW5kU2VsZWN0c1xuY2xhc3MgQmluZEJhc2UgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgdXBkYXRlQXR0cnM6IChlKSAtPlxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBAdmlldy5tb2RlbC5zZXQoQmFja2JvbmUuU3lwaG9uLnNlcmlhbGl6ZShAKSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQmluZEJhc2VcbiIsIlxuIyBEYXRhYmluZGluZyBmb3IgZm9ybSBpbnB1dHNcbmNsYXNzIEJpbmRJbnB1dHMgZXh0ZW5kcyByZXF1aXJlICcuL2JpbmRCYXNlJ1xuXG4gIGV2ZW50czpcbiAgICAnaW5wdXQgaW5wdXQnOiAgJ3VwZGF0ZUF0dHJzJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5kSW5wdXRzXG4iLCJcbl9zZW5kRmxhc2ggPSAodHlwZSwgb2JqKSAtPlxuICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdmbGFzaCcpLnRyaWdnZXIodHlwZSwgb2JqKVxuXG4jICMgIyAjICNcblxuY2xhc3MgRmxhc2hlc0JlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zPXt9KSAtPlxuICAgIEB2aWV3Ll9mbGFzaGVzICAgICAgPSBAb3B0aW9uc1xuICAgIEB2aWV3LmZsYXNoRXJyb3IgICAgPSBAZmxhc2hFcnJvclxuICAgIEB2aWV3LmZsYXNoU3VjY2VzcyAgPSBAZmxhc2hTdWNjZXNzXG5cbiAgZmxhc2hFcnJvcjogKG9iaj17fSkgLT5cbiAgICBfc2VuZEZsYXNoKCdlcnJvcicsIEBfZmxhc2hlc1snZXJyb3InXSB8fCBvYmopXG5cbiAgZmxhc2hTdWNjZXNzOiAob2JqPXt9KSAtPlxuICAgIF9zZW5kRmxhc2goJ3N1Y2Nlc3MnLCBAX2ZsYXNoZXNbJ3N1Y2Nlc3MnXSB8fCBvYmopXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoZXNCZWhhdmlvclxuIiwiXG5jbGFzcyBNb2RlbEV2ZW50c0JlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdyZXF1ZXN0JzogICdvbk1vZGVsUmVxdWVzdCdcbiAgICAnc3luYyc6ICAgICAnb25Nb2RlbFN5bmMnXG4gICAgJ2Vycm9yJzogICAgJ29uTW9kZWxFcnJvcidcblxuICBvbk1vZGVsUmVxdWVzdDogKG1vZGVsLCBzdGF0dXMsIG9wdGlvbnMpIC0+XG4gICAgQHZpZXcub25SZXF1ZXN0Pyhtb2RlbCwgc3RhdHVzLCBvcHRpb25zKVxuXG4gIG9uTW9kZWxTeW5jOiAobW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKSAtPlxuICAgIEB2aWV3Lm9uU3luYz8obW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKVxuXG4gIG9uTW9kZWxFcnJvcjogKG1vZGVsLCByZXNwb25zZSwgb3B0aW9ucykgLT5cbiAgICBAdmlldy5vbkVycm9yPyhtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVsRXZlbnRzQmVoYXZpb3JcbiIsIlxuIyBTdWJtaXRCdXR0b25CZWhhdmlvciBjbGFzcyBkZWZpbml0aW9uXG4jIFByb3ZpZGVzIGFuIGV2ZW50IGxpc3RlbmVyIGFuZCBoYW5kbGVyLCBhbmQgZGVmaW5lc1xuIyBhc3NvY2lhdGVkIGNhbGxiYWNrcyBvbiB0aGUgdmlldyB0byB3aGljaCB0aGUgYmVoYXZpb3JcbiMgaXMgYXR0YWNoZWQuIFRoaXMgaXMgdXNlZCBpbiB0aGUgUGFzc3dvcmQgYW5kIFNuaXBwZXQgZm9ybXMuXG5jbGFzcyBTdWJtaXRCdXR0b25CZWhhdmlvciBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1aTpcbiAgICBzdWJtaXQ6ICdbZGF0YS1jbGljaz1zdWJtaXRdJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLnN1Ym1pdDpub3QoLmRpc2FibGVkKSc6ICdvblN1Ym1pdENsaWNrJ1xuXG4gIGluaXRpYWxpemU6IChvcHRpb25zPXt9KSAtPlxuICAgIEB2aWV3LmRpc2FibGVTdWJtaXQgPSA9PiBAZGlzYWJsZVN1Ym1pdCgpXG4gICAgQHZpZXcuZW5hYmxlU3VibWl0ICA9ID0+IEBlbmFibGVTdWJtaXQoKVxuXG4gIG9uU3VibWl0Q2xpY2s6IChlKSAtPiBAdmlldy5vblN1Ym1pdD8oZSlcbiAgZGlzYWJsZVN1Ym1pdDogLT4gQHVpLnN1Ym1pdC5hZGRDbGFzcygnZGlzYWJsZWQnKVxuICBlbmFibGVTdWJtaXQ6IC0+ICBAdWkuc3VibWl0LnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN1Ym1pdEJ1dHRvbkJlaGF2aW9yXG4iLCJcbmNsYXNzIFRvb2x0aXBCZWhhdmlvciBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1aTpcbiAgICB0b29sdGlwczogJ1tkYXRhLXRvZ2dsZT10b29sdGlwXSdcblxuICBpbml0aWFsaXplOiAtPlxuICAgICMgUHJveGllcyBjbGVhciBtZXRob2QgdG8gYmUgYWNjZXNzaWJsZSBpbnNpZGUgdGhlIHZpZXdcbiAgICBAdmlldy5jbGVhclRvb2x0aXBzID0gPT4gQGNsZWFyKClcblxuICBjbGVhcjogLT5cbiAgICBAdWkudG9vbHRpcHMudG9vbHRpcCgnaGlkZScpXG4gICAgQHVpLnRvb2x0aXBzLnRvb2x0aXAoJ2Rpc3Bvc2UnKVxuXG4gIG9uUmVuZGVyOiAtPiBAdWkudG9vbHRpcHM/LnRvb2x0aXAoKVxuICBvbkJlZm9yZURlc3Ryb3k6IC0+IEBjbGVhcigpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRvb2x0aXBCZWhhdmlvclxuIiwiXG4jIEFzc2lnbnMgTWFyaW9uZXR0ZS5EZWNvcmF0b3Jcbk1hcmlvbmV0dGUuRGVjb3JhdG9yID0gcmVxdWlyZSAnLi9kZWNvcmF0b3InXG5cbiMgT3ZlcnJpZGVzIGRlZmF1bHQgc2VyaWFsaXplTW9kZWwoKSBtZXRob2QgZGVmaW5pdGlvblxuIyBJbiB0aGUgY29udGV4dCB0aGUgc2VyaWFsaXplTW9kZWwgbWV0aG9kLCAndGhpcydcbiMgcmVmZXJzIHRvIHRoZSB2aWV3IGluc3RhbmNlIGluc2lkZSB3aGljaCB0aGVcbiMgc2VyaWFsaXplTW9kZWwgbWV0aG9kIHdhcyBpbnZva2VkXG5NYXJpb25ldHRlLlZpZXcucHJvdG90eXBlLnNlcmlhbGl6ZU1vZGVsID0gLT5cblxuICAjIElmIHRoaXMubW9kZWwgaXMgbm90IGRlZmluZWQsIHJldHVybiBhbiBlbXB0eSBvYmplY3RcbiAgaWYgIXRoaXMubW9kZWxcbiAgICByZXR1cm4ge31cblxuICAjIElmIHRoaXMubW9kZWwgZXhpc3RzLCBhbmQgaGFzIGEgZGVjb3JhdG9yIGRlZmluZWQsXG4gICMgcmV0dXJuIHRoZSB0aGlzLm1vZGVsJ3MgYXR0cmlidXRlcyBhbmQgZGVjb3JhdGlvbnNcbiAgZWxzZSBpZiB0aGlzLm1vZGVsLmRlY29yYXRvclxuICAgIHJldHVybiB0aGlzLm1vZGVsLmRlY29yYXRvci5kZWNvcmF0ZSh0aGlzLm1vZGVsKVxuXG4gICMgT3RoZXJ3aXNlLCByZXR1cm4gdGhlIGNsb25lZCBhdHRyaWJ1dGVzIG9mIHRoaXMubW9kZWxcbiAgcmV0dXJuIF8uY2xvbmUgdGhpcy5tb2RlbC5hdHRyaWJ1dGVzXG4iLCJcbiMgQmFzZURlY29yYXRvciBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBzaW1wbGUgY2xhc3MgdG8gZGVjb3JhdGUgbW9kZWxzIHdoZW5cbiMgdGhleSBhcmUgc2VyaWFsaXplZCBpbnRvIGEgdmlldydzIHRlbXBsYXRlXG5jbGFzcyBCYXNlRGVjb3JhdG9yXG5cbiAgIyBEZWNvcmF0aW9uIG1ldGhvZFxuICAjIEludm9rZWQgaW4gTWFyaW9uZXR0ZS5WaWV3LnByb3RvdHlwZS5zZXJpYWxpemVNb2RlbFxuICBAZGVjb3JhdGU6IChtb2RlbCkgLT5cblxuICAgICMgQ2xvbmVzIG1vZGVsJ3MgYXR0cmlidXRlc1xuICAgICMgQ2xvbmluZyBwcmV2ZW50cyBjb250YW1pbmF0aW9uIG9mXG4gICAgZGF0YSA9IF8uY2xvbmUobW9kZWwuYXR0cmlidXRlcylcblxuICAgICMgSXRlcmF0ZXMgb3ZlciBlYWNoIGZ1bmN0aW9uIGluIHByb3RvdHlwZVxuICAgICMgTGV2ZXJhZ2VzIFVuZGVyc2NvcmUuanMgXy5mdW5jdGlvbnMoKVxuICAgIGZvciBmdW5jIGluIF8uZnVuY3Rpb25zKEBwcm90b3R5cGUpXG5cbiAgICAgICMgU2tpcCBjb25zdHJ1Y3RvclxuICAgICAgY29udGludWUgaWYgZnVuYyA9PSAnY29uc3RydWN0b3InXG5cbiAgICAgICMgQXNzaWducyB2YWx1ZSBvZiBmdW5jdGlvbiB0byBoYXNoXG4gICAgICBkYXRhW2Z1bmNdID0gQHByb3RvdHlwZVtmdW5jXS5hcHBseShtb2RlbClcblxuICAgICMgUmV0dXJucyB0aGUgbW9kZWwncyBhdHRyaWJ1dGVzICYgZGVjb3JhdGlvbnNcbiAgICByZXR1cm4gZGF0YVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlRGVjb3JhdG9yXG4iLCJcbiMgRmxhc2hDb2xsZWN0aW9uIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIEJhY2tib25lLkNvbGxlY3Rpb24gdG8gYmUgdXNlZCBieSB0aGVcbiMgRmxhc2hDb21wb25lbnQgZm9yIHN0b3JpbmcgbXVsdGlwbGUgZmxhc2ggbW9kZWxzXG5jbGFzcyBGbGFzaENvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiByZXF1aXJlICcuL21vZGVsJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaENvbGxlY3Rpb25cbiIsInJlcXVpcmUgJy4vc2VydmljZSdcbkZsYXNoTGlzdCA9IHJlcXVpcmUgJy4vdmlld3MvZmxhc2hMaXN0J1xuXG4jICMgIyAjICNcblxuIyBGbGFzaFNlcnZpY2UgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgY29tcG9uZW50IHRvIGNyZWF0ZSBhbmQgZGlzcGxheSBmbGFzaGVzXG4jIGluIHRoZSBhcHAuIFByb3ZpZGVzIG11bHRpcGxlIGludGVyZmFjZXMgaW4gcmFkaW9FdmVudHNcbiMgdG8gaGFuZGxlIGNvbW1vbiB0eXBlcyBvZiBmbGFzaGVzIChlcnJvciwgd2FybmluZywgc3VjY2VzcylcbmNsYXNzIEZsYXNoQ29tcG9uZW50IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdmbGFzaCcpLnJlcXVlc3QoJ2NvbGxlY3Rpb24nKS50aGVuIChjb2xsZWN0aW9uKSA9PlxuICAgICAgQGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uXG4gICAgICBAY29sbGVjdGlvbi5vbiAndXBkYXRlJywgQHNob3dMaXN0VmlldywgQFxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdmbGFzaCBhZGQnOiAgICAgICdhZGQnXG4gICAgJ2ZsYXNoIHJlc2V0JzogICAgJ3Jlc2V0J1xuICAgICdmbGFzaCBlcnJvcic6ICAgICdlcnJvcidcbiAgICAnZmxhc2ggd2FybmluZyc6ICAnd2FybmluZydcbiAgICAnZmxhc2ggc3VjY2Vzcyc6ICAnc3VjY2VzcydcblxuICBhZGQ6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbGxlY3Rpb24uYWRkKG9wdGlvbnMpXG5cbiAgcmVzZXQ6IC0+XG4gICAgQGNvbGxlY3Rpb24ucmVzZXQoKVxuXG4gIGVycm9yOiAob3B0aW9ucz17fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQgXy5leHRlbmQoIG9wdGlvbnMsIHsgY29udGV4dDogICdkYW5nZXInIH0pXG5cbiAgd2FybmluZzogKG9wdGlvbnM9e30pIC0+XG4gICAgQGNvbGxlY3Rpb24uYWRkIF8uZXh0ZW5kKCBvcHRpb25zLCB7IGNvbnRleHQ6ICAnd2FybmluZycgfSlcblxuICBzdWNjZXNzOiAob3B0aW9ucz17fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQgXy5leHRlbmQoIG9wdGlvbnMsIHsgY29udGV4dDogICdzdWNjZXNzJyB9KVxuXG4gIHNob3dMaXN0VmlldzogPT5cbiAgICB1bmxlc3MgQHJlbmRlcmVkXG4gICAgICBAY29udGFpbmVyLnNob3cgbmV3IEZsYXNoTGlzdCh7IGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uIH0pXG4gICAgICBAcmVuZGVyZWQgPSB0cnVlXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoQ29tcG9uZW50XG4iLCJcbiMgRmxhc2hNb2RlbCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBiYXNpYyBCYWNrYm9uZS5Nb2RlbCB0byBtYW5hZ2Ugdmlld3NcbiMgZGlzcGxheWVkIGluIHRoZSBGbGFzaENvbXBvbmVudFxuY2xhc3MgRmxhc2hNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cbiAgZGVmYXVsdHM6XG4gICAgdGltZW91dDogNTAwMFxuICAgIGRpc21pc3NpYmxlOiB0cnVlXG4gICAgY29udGV4dDogJ2luZm8nXG5cbiAgIyBBbGVydCBNb2RlbCBBdHRyaWJ1dGVzIC8gT3B0aW9uc1xuICAjIC0gbWVzc2FnZVxuICAjIC0gc3Ryb25nVGV4dCAocGxlYXNlIHJlbmFtZSB0byAnc3Ryb25nJyAmIGFkZCBhcHByb3ByaWF0ZSBzcGFjaW5nIHRvIHRlbXBsYXRlKVxuICAjIC0gY29udGV4dENsYXNzIChwbGVhc2UgcmVuYW1lIHRvICdjb250ZXh0JylcbiAgIyAtIHRpbWVvdXQgKGRlZmF1bHQgaXMgNSBzZWNvbmRzKVxuICAjIC0gZGlzbWlzc2libGUgKGRlZmF1bHQgaXMgdHJ1ZSlcblxuICBkaXNtaXNzOiAtPlxuICAgIEBjb2xsZWN0aW9uLnJlbW92ZShAKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaE1vZGVsXG4iLCJGbGFzaENvbGxlY3Rpb24gPSByZXF1aXJlICcuL2NvbGxlY3Rpb24nXG5cbiMgIyAjICMgI1xuXG4jIEZsYXNoU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZWQgYSBiYXNpYyBzZXJ2aWNlIHRvIHJldHVybiB0aGUgRmxhc2hlc0NvbGxlY3Rpb25cbiMgd2hlbiByZXF1ZXN0ZWQuIFRoaXMgaXMgdXNlZCBieSB0aGUgRmxhc2hDb21wb25lbnQgdG8gcmV0cmlldmVcbiMgdGhlIEZsYXNoQ29sbGVjdGlvbiBpdCBpcyByZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nXG5jbGFzcyBGbGFzaFNlcnZpY2UgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb1JlcXVlc3RzOlxuICAgICdmbGFzaCBjb2xsZWN0aW9uJzogJ2dldENvbGxlY3Rpb24nXG5cbiAgYWxlcnRzOiBudWxsXG5cbiAgZ2V0Q29sbGVjdGlvbjogLT5cbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUscmVqZWN0KSA9PlxuICAgICAgQGFsZXJ0cyB8fD0gbmV3IEZsYXNoQ29sbGVjdGlvbigpXG4gICAgICByZXNvbHZlKEBhbGVydHMpXG4gICAgICByZXR1cm5cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEZsYXNoU2VydmljZSgpXG4iLCIjIEZsYXNoQ2hpbGQgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3IHRvIGRpc3BsYXkgYSBGbGFzaE1vZGVsIGluc3RhbmNlXG4jIFRoaXMgdmlldyBhdXRvLWRpc21pc3NlcyBhZnRlciB0aGUgdGltZW91dCBkZWZpbmVkIGluIHRoZSBGbGFzaE1vZGVsIGluc3RhbmNlXG5jbGFzcyBGbGFzaENoaWxkIGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdydcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2ZsYXNoX2NoaWxkJ1xuXG4gIGF0dHJpYnV0ZXM6XG4gICAgc3R5bGU6ICdkaXNwbGF5Om5vbmU7J1xuXG4gIHVpOlxuICAgIGNsb3NlOiAnW2RhdGEtY2xpY2s9ZGlzbWlzc10nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuY2xvc2UnOiAnZGlzbWlzcydcblxuICBvblNob3c6IC0+XG4gICAgdGltZW91dCA9IEBtb2RlbC5nZXQoJ3RpbWVvdXQnKVxuICAgIHNldFRpbWVvdXQoIEBkaXNtaXNzLCB0aW1lb3V0IClcblxuICBvbkF0dGFjaDogLT5cbiAgICBAJGVsLmZhZGVJbigpXG5cbiAgcmVtb3ZlOiAtPlxuICAgIEAkZWwuc2xpZGVUb2dnbGUoID0+XG4gICAgICBNYXJpb25ldHRlLkxheW91dFZpZXcucHJvdG90eXBlLnJlbW92ZS5jYWxsKEApXG4gICAgKVxuXG4gIGRpc21pc3M6ID0+XG4gICAgQG1vZGVsLmNvbGxlY3Rpb24/LnJlbW92ZSggQG1vZGVsIClcblxuIyBGbGFzaExpc3QgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlldyB0byB0aGUgbGlzdCBvZiBGbGFzaGVzXG5jbGFzcyBGbGFzaExpc3QgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIGNsYXNzTmFtZTogJ2NvbnRhaW5lci1mbHVpZCdcbiAgY2hpbGRWaWV3OiBGbGFzaENoaWxkXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoTGlzdFxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoY29udGV4dCwgZGlzbWlzc2libGUsIG1lc3NhZ2UsIHN0cm9uZykge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTIgdGV4dC1jZW50ZXJcXFwiPjxkaXYgcm9sZT1cXFwiYWxlcnRcXFwiXCIgKyAoamFkZS5jbHMoWydhbGVydCcsJ2FsZXJ0LWRpc21pc3NpYmxlJywnZmFkZScsJ2luJyxcImFsZXJ0LVwiICsgY29udGV4dF0sIFtudWxsLG51bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIGRpc21pc3NpYmxlKVxue1xuYnVmLnB1c2goXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1jbGljaz1cXFwiZGlzbWlzc1xcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJzci1vbmx5XFxcIj5DbG9zZTwvc3Bhbj48L2J1dHRvbj5cIik7XG59XG5pZiAoIHN0cm9uZylcbntcbmJ1Zi5wdXNoKFwiPHN0cm9uZz5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHN0cm9uZyArIFwiIFwiKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3N0cm9uZz5cIik7XG59XG5pZiAoIG1lc3NhZ2UpXG57XG5idWYucHVzaChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG1lc3NhZ2UpID8gXCJcIiA6IGphZGVfaW50ZXJwKSk7XG59XG5idWYucHVzaChcIjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImNvbnRleHRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNvbnRleHQ6dHlwZW9mIGNvbnRleHQhPT1cInVuZGVmaW5lZFwiP2NvbnRleHQ6dW5kZWZpbmVkLFwiZGlzbWlzc2libGVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRpc21pc3NpYmxlOnR5cGVvZiBkaXNtaXNzaWJsZSE9PVwidW5kZWZpbmVkXCI/ZGlzbWlzc2libGU6dW5kZWZpbmVkLFwibWVzc2FnZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubWVzc2FnZTp0eXBlb2YgbWVzc2FnZSE9PVwidW5kZWZpbmVkXCI/bWVzc2FnZTp1bmRlZmluZWQsXCJzdHJvbmdcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnN0cm9uZzp0eXBlb2Ygc3Ryb25nIT09XCJ1bmRlZmluZWRcIj9zdHJvbmc6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiTW9kYWxWaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuXG4jICMgIyAjICNcblxuIyBXaW5kb3cgZXZlbnQgbGlzdGVuZXIgdG8gaGlkZSB0aGUgbW9kYWwgd2hlbiBuYXZpZ2F0aW9uIG9jY3Vycy5cbmhpZGVNb2RhbE9uSGFzaENoYW5nZSA9IC0+IHdpbmRvdy5tb2RhbFdpbmRvdy5oaWRlTW9kYWwoKVxuXG4jIEFic3RyYWN0IGNsYXNzIGZvciBtb2RhbC1iYXNlZCBjb21wb25lbnRzLlxuY2xhc3MgQWJzdHJhY3RNb2RhbENvbXBvbmVudCBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiAgaGlkZU1vZGFsOiAtPlxuICAgIEBtb2RhbFZpZXcuaGlkZU1vZGFsKClcblxuICBzaG93TW9kYWw6IChjb250ZW50VmlldywgbW9kYWxWaWV3T3B0aW9ucz17fSkgLT5cblxuICAgICAgIyBOZXcgTW9kYWwgVmlldyAob3VyIHZpZXcgaXMgc2hvd24gaW5zaWRlIHRoaXMgb25lKVxuICAgICAgQG1vZGFsVmlldyA9IG5ldyBNb2RhbFZpZXcobW9kYWxWaWV3T3B0aW9ucylcblxuICAgICAgIyBTaG93IHRoZSB2aWV3IGluc2lkZSB0aGUgbW9kYWwgd3JhcHBlciwgYWRkcyBoaWRlTW9kYWxPbkhhc2hDaGFuZ2UgZXZlbnQgbGlzdGVuZXJcbiAgICAgIEBtb2RhbFZpZXcub24gJ3Nob3cnLCA9PlxuICAgICAgICBAbW9kYWxWaWV3LmNvbnRlbnRSZWdpb24uc2hvdyggY29udGVudFZpZXcgKVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGhpZGVNb2RhbE9uSGFzaENoYW5nZSlcbiAgICAgICAgd2luZG93Lm1vZGFsV2luZG93ID0gQG1vZGFsVmlld1xuXG4gICAgICAjIFJlbW92ZXMgaGlkZU1vZGFsT25IYXNoQ2hhbmdlIGV2ZW50IGxpc3RlbmVyXG4gICAgICBAbW9kYWxWaWV3Lm9uICdkZXN0cm95JywgLT5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBoaWRlTW9kYWxPbkhhc2hDaGFuZ2UpXG4gICAgICAgIGRlbGV0ZSB3aW5kb3cubW9kYWxXaW5kb3dcblxuICAgICAgIyBvbk1vZGFsSGlkZGVuIGNhbGxiYWNrXG4gICAgICBAbW9kYWxWaWV3Lm9uICdoaWRkZW46bW9kYWwnLCA9PiBAb25Nb2RhbEhpZGRlbj8oKVxuXG4gICAgICAjIFNob3cgdmlldyBpbiB0aGUgbW9kYWxcbiAgICAgIEBjb250YWluZXIuc2hvdyBAbW9kYWxWaWV3XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0TW9kYWxDb21wb25lbnRcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG1vZGFsQ3NzKSB7XG5idWYucHVzaChcIjxkaXYgcm9sZT1cXFwiZG9jdW1lbnRcXFwiIGRhdGEtcmVnaW9uPVxcXCJtb2RhbC1jb250ZW50XFxcIlwiICsgKGphZGUuY2xzKFttb2RhbENzc10sIFt0cnVlXSkpICsgXCI+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibW9kYWxDc3NcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm1vZGFsQ3NzOnR5cGVvZiBtb2RhbENzcyE9PVwidW5kZWZpbmVkXCI/bW9kYWxDc3M6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG4jIE1vZGFsVmlldyBjbGFzcyBkZWZpbml0aW9uXG4jIFByb3ZpZGVzIGEgZ2VuZXJpYyB2aWV3IGFuZCByZWdpb24gaW50byB3aGljaFxuIyBvdGhlciB2aWV3cyBjYW4gY29udmVuaWVudGx5IGJlIGRpc3BsYXllZCBpbiBhIG1vZGFsXG5jbGFzcyBNb2RhbFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vbW9kYWxfdGVtcGxhdGUnXG5cbiAgYXR0cmlidXRlczpcbiAgICByb2xlOiAgICAgJ2RpYWxvZydcbiAgICB0YWJpbmRleDogJy0xJ1xuXG4gIGNsYXNzTmFtZTogJ21vZGFsIGZhZGUnXG5cbiAgIyBTZXRzIG1vZGFsIHNpemUgLSBub3JtYWwgLyBzbWFsbCAvIGxhcmdlXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBzaXplID0gQG9wdGlvbnMuc2l6ZSB8fCAnJ1xuICAgIGNzcyA9ICdtb2RhbC1kaWFsb2cnXG4gICAgY3NzICs9ICcgbW9kYWwtc20nIGlmIHNpemUgPT0gJ3NtYWxsJ1xuICAgIGNzcyArPSAnIG1vZGFsLWxnJyBpZiBzaXplID09ICdsYXJnZSdcbiAgICByZXR1cm4geyBtb2RhbENzczogY3NzIH1cblxuICByZWdpb25zOlxuICAgIGNvbnRlbnRSZWdpb246ICdbZGF0YS1yZWdpb249bW9kYWwtY29udGVudF0nXG5cbiAgZXZlbnRzOlxuICAgICdzaG93LmJzLm1vZGFsJyAgIDogLT4gQHRyaWdnZXJNZXRob2QgJ3Nob3c6bW9kYWwnXG4gICAgJ3Nob3duLmJzLm1vZGFsJyAgOiAtPiBAdHJpZ2dlck1ldGhvZCAnc2hvd246bW9kYWwnXG4gICAgJ2hpZGUuYnMubW9kYWwnICAgOiAtPiBAdHJpZ2dlck1ldGhvZCAnaGlkZTptb2RhbCdcbiAgICAnaGlkZGVuLmJzLm1vZGFsJyA6IC0+IEB0cmlnZ2VyTWV0aG9kICdoaWRkZW46bW9kYWwnXG4gICAgJ2xvYWRlZC5icy5tb2RhbCcgOiAtPiBAdHJpZ2dlck1ldGhvZCAnbG9hZGVkOm1vZGFsJ1xuXG4gIG9uU2hvdzogLT5cbiAgICBAJGVsLm1vZGFsKCBAb3B0aW9ucy5tb2RhbE9wdGlvbnMgfHwge30gKVxuXG4gIGhpZGVNb2RhbDogLT5cbiAgICBAJGVsLm1vZGFsKCdoaWRlJylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxWaWV3XG4iLCJcbmNsYXNzIE92ZXJsYXlWaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogZmFsc2VcbiAgY2xhc3NOYW1lOiAnb3ZlcmxheSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrJzogJ29uQ2xpY2snXG5cbiAgb25DbGljazogLT5cbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdzaWRlYmFyJykudHJpZ2dlcignaGlkZScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBPdmVybGF5Q29tcG9uZW50IGV4dGVuZHMgTW4uU2VydmljZVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbnRhaW5lciAgPSBvcHRpb25zLmNvbnRhaW5lclxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdvdmVybGF5IHJlYWR5JzogICdvblJlYWR5J1xuICAgICdvdmVybGF5IHNob3cnOiAgICdzaG93T3ZlcmxheSdcbiAgICAnb3ZlcmxheSBoaWRlJzogICAnaGlkZU92ZXJsYXknXG5cbiAgc2hvd092ZXJsYXk6IC0+XG4gICAgJCgnLm92ZXJsYXktcmVnaW9uJykuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgaGlkZU92ZXJsYXk6IC0+XG4gICAgJCgnLm92ZXJsYXktcmVnaW9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgb25SZWFkeTogLT5cbiAgICB1bmxlc3MgQHZpZXdcbiAgICAgIEB2aWV3ID0gbmV3IE92ZXJsYXlWaWV3KClcbiAgICAgIEBjb250YWluZXIuc2hvdyhAdmlldylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gT3ZlcmxheUNvbXBvbmVudFxuIiwiXG4jIEJhc2VSb3V0ZSBjbGFzcyBkZWZpbml0aW9uXG4jIFRoZSBiYXNlIHJvdXRlIHJlZHVjZXMgcmVwZWF0ZWQgY29kZSBieVxuIyBhdHRhY2hpbmcgdGhlIEBjb250YWluZXIgcHJvcGVydHkgcGFzc2VkIGluIGZyb21cbiMgdGhlIHJvdXRlci4gVGhpcyBwcm9wZXJ0eSBpcyB1c2VkIHRvIGRpc3BsYXkgdmlld3MgaW4gdGhlIGFwcFxuY2xhc3MgQmFzZVJvdXRlIGV4dGVuZHMgQmFja2JvbmUuUm91dGluZy5Sb3V0ZVxuXG4gIGJyZWFkY3J1bWJzOiBbXVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zKSAtPlxuXG4gICAgIyBBdHRhY2hlcyBvcHRpb25zXG4gICAgQG9wdGlvbnMgPSBvcHRpb25zXG5cbiAgICAjIEF0dGFjaGVzIGNvbnRhaW5lclxuICAgIEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuXG4gICAgIyBFdmVudCBoYW5kbGVyc1xuICAgIEBvbiAnYmVmb3JlOmVudGVyJywgPT4gQG9uQmVmb3JlRW50ZXI/KGFyZ3VtZW50cylcbiAgICBAb24gJ2JlZm9yZTpmZXRjaCcsID0+IEBvbkJlZm9yZUZldGNoPyhhcmd1bWVudHMpXG4gICAgQG9uICdiZWZvcmU6cmVuZGVyJywgPT4gQG9uQmVmb3JlUmVuZGVyPyhhcmd1bWVudHMpXG4gICAgQG9uICdmZXRjaCcsID0+IEBvbkZldGNoPyhhcmd1bWVudHMpXG4gICAgQG9uICdyZW5kZXInLCA9PiBAb25SZW5kZXI/KGFyZ3VtZW50cylcbiAgICBAb24gJ2VudGVyJywgPT4gQG9uRW50ZXI/KGFyZ3VtZW50cylcblxuICAgICMgSGlkZXMgc2lkZWJhciBjb21wb25lbnRcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdzaWRlYmFyJykudHJpZ2dlcignaGlkZScpXG5cbiAgX3NldFBhZ2VUaXRsZTogLT5cbiAgICBkb2N1bWVudC50aXRsZSA9IF8ucmVzdWx0IEAsICd0aXRsZSdcblxuICBfdXBkYXRlQnJlYWRjcnVtYnM6IC0+XG4gICAgYnJlYWRjcnVtYnMgPSBfLnJlc3VsdCBALCAnYnJlYWRjcnVtYnMnXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnYnJlYWRjcnVtYicpLnRyaWdnZXIoJ3NldCcsIGJyZWFkY3J1bWJzKSBpZiBicmVhZGNydW1ic1xuXG4gIG9uRmV0Y2g6IC0+XG4gICAgQF9zZXRQYWdlVGl0bGUoKVxuICAgIEBfdXBkYXRlQnJlYWRjcnVtYnMoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlUm91dGVcbiIsIlxuIyBCYXNlUm91dGVyIGNsYXNzIGRlZmluaXRpb25cbiMgVGhlIGJhc2Ugcm91dGVyIHJlZHVjZXMgcmVwZWF0ZWQgY29kZSBieVxuIyBhdHRhY2hpbmcgdGhlIEBjb250YWluZXIgcHJvcGVydHkgcGFzc2VkIGluIGZyb20gd2hlbiBpbnN0YW50aWF0ZWQuXG4jIFRoaXMgcHJvcGVydHkgaXMgc3Vic2VxdWVudGx5IHBhc3NlZCB0byBhbGwgcm91dGVzIGNyZWF0ZWQgaW5zaWRlXG4jIHJvdXRlcnMgc3ViY2xhc3NlZCBmcm9tIHRoaXMgZGVmaW5pdGlvblxuY2xhc3MgQmFzZVJvdXRlciBleHRlbmRzIEJhY2tib25lLlJvdXRpbmcuUm91dGVyXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+IEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlUm91dGVyXG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4oZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5qYWRlID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKSA6XG4gICAgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxba2V5XTsgfSkgOlxuICAgIFt2YWxdKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0eWxlID0gZnVuY3Rpb24gKHZhbCkge1xuICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubWFwKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXTtcbiAgICB9KS5qb2luKCc7Jyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICB2YWwgPSBleHBvcnRzLnN0eWxlKHZhbCk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsKS5pbmRleE9mKCcmJykgIT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NpbmNlIEphZGUgMi4wLjAsIGFtcGVyc2FuZHMgKGAmYCkgaW4gZGF0YSBhdHRyaWJ1dGVzICcgK1xuICAgICAgICAgICAgICAgICAgICd3aWxsIGJlIGVzY2FwZWQgdG8gYCZhbXA7YCcpO1xuICAgIH07XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBlbGltaW5hdGUgdGhlIGRvdWJsZSBxdW90ZXMgYXJvdW5kIGRhdGVzIGluICcgK1xuICAgICAgICAgICAgICAgICAgICdJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBqYWRlX2VuY29kZV9odG1sX3J1bGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90Oydcbn07XG52YXIgamFkZV9tYXRjaF9odG1sID0gL1smPD5cIl0vZztcblxuZnVuY3Rpb24gamFkZV9lbmNvZGVfY2hhcihjKSB7XG4gIHJldHVybiBqYWRlX2VuY29kZV9odG1sX3J1bGVzW2NdIHx8IGM7XG59XG5cbmV4cG9ydHMuZXNjYXBlID0gamFkZV9lc2NhcGU7XG5mdW5jdGlvbiBqYWRlX2VzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKS5yZXBsYWNlKGphZGVfbWF0Y2hfaHRtbCwgamFkZV9lbmNvZGVfY2hhcik7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuZXhwb3J0cy5EZWJ1Z0l0ZW0gPSBmdW5jdGlvbiBEZWJ1Z0l0ZW0obGluZW5vLCBmaWxlbmFtZSkge1xuICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xufVxuXG59LHtcImZzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XX0se30sWzFdKSgxKVxufSk7XG59KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICMgTG93ZXJjYXNlXG4gICdhJzogIDRcbiAgJ2InOiAgNVxuICAnYyc6ICA2XG4gICdkJzogIDdcbiAgJ2UnOiAgOFxuICAnZic6ICA5XG4gICdnJzogMTBcbiAgJ2gnOiAxMVxuICAnaSc6IDEyXG4gICdqJzogMTNcbiAgJ2snOiAxNFxuICAnbCc6IDE1XG4gICdtJzogMTZcbiAgJ24nOiAxN1xuICAnbyc6IDE4XG4gICdwJzogMTlcbiAgJ3EnOiAyMFxuICAncic6IDIxXG4gICdzJzogMjJcbiAgJ3QnOiAyM1xuICAndSc6IDI0XG4gICd2JzogMjVcbiAgJ3cnOiAyNlxuICAneCc6IDI3XG4gICd5JzogMjhcbiAgJ3onOiAyOVxuXG4gICMgTnVtZXJpY1xuICAnMSc6IDMwXG4gICcyJzogMzFcbiAgJzMnOiAzMlxuICAnNCc6IDMzXG4gICc1JzogMzRcbiAgJzYnOiAzNVxuICAnNyc6IDM2XG4gICc4JzogMzdcbiAgJzknOiAzOFxuICAnMCc6IDM5XG5cbiAgIyBQdW5jXG4gICctJzogIDQ1XG4gICdcXFxcJzogNDlcblxuICAjIEVsc2VcbiAgJy4nOiAgICAgIDk5XG4gICdTUEFDRSc6ICA0NFxuICByaWdodDogICAgNzlcbiAgbGVmdDogICAgIDgwXG4gIGRvd246ICAgICA4MVxuICB1cDogICAgICAgODJcbiAgJ0JBQ0tTUEFDRSc6IDQyXG4gICcvJzogICAgICA4NFxuICAnKic6ICAgICAgODVcbiAgIyAnLSc6ICAgICAgODZcbiAgJysnOiAgICAgIDg3XG4gICdSRVRVUk4nOiA4OFxuICAnTVVURSc6IDEyN1xuICAnVk9MVU1FX1VQJzogMTI4XG4gICdWT0xVTUVfRE4nOiAxMjlcbiAgJ1NISUZUJzogMjI1XG4gICdBTFQnOiAyMjZcbiAgJ0NUUkwnOiAyMjRcbiAgJ01FVEEnOiAyMjdcbiAgIyAnTUVUQSc6IDIzMVxuXG4gICMgTlVNUEFEXG4gICduX0NMRUFSJzogODNcbiAgJ25fLyc6IDg0XG4gICduXyonOiA4NVxuICAnbl8tJzogODZcbiAgJ25fKyc6IDg3XG4gICduX0VOVEVSJzogODhcbiAgJ25fMSc6IDg5XG4gICduXzInOiA5MFxuICAnbl8zJzogOTFcbiAgJ25fNCc6IDkyXG4gICduXzUnOiA5M1xuICAnbl82JzogOTRcbiAgJ25fNyc6IDk1XG4gICduXzgnOiA5NlxuICAnbl85JzogOTdcbiAgJ25fMCc6IDk4XG4gICduXy4nOiA5OVxuXG4gICMgRnVuY3Rpb24gS2V5cyAoRjEtRjEyKVxuICAnRjEnOiA1OFxuICAnRjInOiA1OVxuICAnRjMnOiA2MFxuICAnRjQnOiA2MVxuICAnRjUnOiA2MlxuICAnRjYnOiA2M1xuICAnRjcnOiA2NFxuICAnRjgnOiA2NVxuICAnRjknOiA2NlxuICAnRjEwJzogNjdcbiAgJ0YxMSc6IDY4XG4gICdGMTInOiA2OVxuXG4gICMgRnVuY3Rpb24gS2V5cyAoRjEzLUYyNClcbiAgJ0YxMyc6IDEwNFxuICAnRjE0JzogMTA1XG4gICdGMTUnOiAxMDZcbiAgJ0YxNic6IDEwN1xuICAnRjE3JzogMTA4XG4gICdGMTgnOiAxMDlcbiAgJ0YxOSc6IDExMFxuICAnRjIwJzogMTExXG4gICdGMjEnOiAxMTJcbiAgJ0YyMic6IDExM1xuICAnRjIzJzogMTE0XG4gICdGMjQnOiAxMTVcblxuICAjIEN1dCAvIENvcHkgLyBQYXN0ZVxuICAnQ1VUJzogMTIzXG4gICdDT1BZJzogMTI0XG4gICdQQVNURSc6IDEyNVxuXG59XG4iLCJcbmNsYXNzIEFic3RyYWN0S2V5Ym9hcmRWaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICBjbGFzc05hbWU6ICdyb3cgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXInXG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9rZXlib2FyZF9hYnN0cmFjdCdcblxuICAjIFRPRE8gLSBhY3RpdmF0ZSB0aGlzIGJlaGF2aW9yIGNvbmRpdGlvbmFsbHlcbiAgIyBiZWhhdmlvcnM6XG4gICMgICBLZXlib2FyZENvbnRyb2xzOiB7fVxuXG4gIHVpOlxuICAgIGtleTogJ1tkYXRhLWNsaWNrPWtleV0nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkua2V5JzogJ29uS2V5Q2xpY2snXG5cbiAgaXNSZWNvcmRpbmc6IGZhbHNlXG5cbiAgIyBpbml0aWFsaXplXG4gIGluaXRpYWxpemU6IC0+XG5cbiAgICAjIERlZmluZXMgQGRlYm91bmNlU3RvcFJlY29yZGluZ1xuICAgIEBkZWJvdW5jZVN0b3BSZWNvcmRpbmcgPSBfLmRlYm91bmNlKCAoKSA9PlxuICAgICAgQHRyaWdnZXIgJ3N0b3A6cmVjb3JkaW5nJ1xuICAgICwgMTUwMCk7XG5cbiAgIyBzdGFydFJlY29yZGluZ1xuICAjIFRPRE8gLSBtb3ZlIHJlY29yZGluZyBPVVQgb2YgdGhpcyB2aWV3IGFuZCBpbnRvIGEgZ2xvYmFsaXplZCBzZXJ2aWNlXG4gIHN0YXJ0UmVjb3JkaW5nOiAtPlxuICAgIEBpc1JlY29yZGluZyA9IHRydWVcblxuICAjIHN0b3BSZWNvcmRpbmdcbiAgc3RvcFJlY29yZGluZzogLT5cbiAgICBAaXNSZWNvcmRpbmcgPSBmYWxzZVxuXG4gICMgb25SZW5kZXI6IC0+XG4gICMgICBzZXRUaW1lb3V0KCBAaW5pdFNvcnRhYmxlLCAzMDAgKVxuXG4gICMgIyBpbml0U29ydGFibGVcbiAgIyBpbml0U29ydGFibGU6IC0+XG5cbiAgIyAgIGNvbnNvbGUubG9nICdPTiBBVFRBQ0gnXG5cbiAgIyAgIGNvbnNvbGUubG9nICQoJ3VsLmtleWJvYXJkLS1yb3cnKVxuXG4gICMgICBfLmVhY2ggJCgndWwua2V5Ym9hcmQtLXJvdycpLCAoZWwpID0+XG5cbiAgIyAgICAgIyBJbml0aWFsaXplcyBTb3J0YWJsZSBjb250YWluZXJcbiAgIyAgICAgU29ydGFibGUuY3JlYXRlIGVsLFxuICAjICAgICAgIGFuaW1hdGlvbjogICAgMTUwXG4gICMgICAgICAgaGFuZGxlOiAgICAgICAnLmhhbmRsZSdcbiAgIyAgICAgICAjIGdob3N0Q2xhc3M6ICAgJ2dob3N0JyAgIyBDbGFzcyBuYW1lIGZvciB0aGUgZHJvcCBwbGFjZWhvbGRlclxuICAjICAgICAgICMgY2hvc2VuQ2xhc3M6ICAnY2hvc2VuJyAgIyBDbGFzcyBuYW1lIGZvciB0aGUgY2hvc2VuIGl0ZW1cbiAgIyAgICAgICAjIGRyYWdDbGFzczogICAgJ2RyYWcnICAjIENsYXNzIG5hbWUgZm9yIHRoZSBkcmFnZ2luZyBpdGVtXG5cbiAgIyAgICAgICBncm91cDpcbiAgIyAgICAgICAgIG5hbWU6ICdtYWNybydcbiAgIyAgICAgICAgIHB1bGw6ICdjbG9uZSdcbiAgIyAgICAgICAgIHB1dDogIGZhbHNlXG5cbiAgIyAgICAgICBmYWxsYmFja1RvbGVyYW5jZTogMTAwXG5cbiAgIyBLZXlib2FyZENvbnRyb2xzIGJlaGF2aW9yIGNhbGxiYWNrXG4gICMgVE9ETyAtIGFubm9hdGUgYW5kIGNsZWFuIHVwIHRoaXMgbWV0aG9kXG4gIG9uS2V5QWN0aW9uOiAoZSkgLT5cblxuICAgICMgU2hvcnQtY2lyY3VpdHMgdW5sZXNzXG4gICAgcmV0dXJuIHVubGVzcyBAaXNSZWNvcmRpbmdcblxuICAgICMgUHJldmVudHMgZGVmYXVsdCBob3RrZXlzIHdoaWxlIHJlY29yZGluZ1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgIyBUT0RPIC0gaWdub3JlIGtleXVwIG9uIGFscGhhbnVtZXJpYywgbGlzdGVuIGZvciBzcGVjaWFsIGtleXM/XG4gICAgIyByZXR1cm4gaWYgZS5rZXkgaW4gW1wiQ29udHJvbFwiLCBcIk1ldGFcIiwgXCJBbHRcIl1cbiAgICBrZXkgPSBAb3B0aW9ucy5rZXlzLmZpbmRXaGVyZSh7IGtleWNvZGU6IGUua2V5Q29kZSB9KVxuXG4gICAgIyAjICMgI1xuXG4gICAgIyBUT0RPIC0gZG9jdW1lbnQgdGhpcyBibG9jayBvZiBjb2RlXG5cbiAgICBpZiBlLnR5cGUgPT0gJ2tleWRvd24nXG5cbiAgICAgIGlmIGUua2V5IGluIFtcIkNvbnRyb2xcIiwgXCJNZXRhXCIsIFwiQWx0XCIsIFwiU2hpZnRcIl1cbiAgICAgICAganNvbiA9IGtleS50b0pTT04oKVxuICAgICAgICBqc29uLnBvc2l0aW9uID0gMSAjIEtFWV9ETiAtIFRPRE8gLSBjb25zdGFudGl6ZVxuICAgICAgICBAdHJpZ2dlciAna2V5OnNlbGVjdGVkJywganNvblxuICAgICAgZWxzZVxuICAgICAgICBAdHJpZ2dlciAna2V5OnNlbGVjdGVkJywga2V5LnRvSlNPTigpXG5cbiAgICBpZiBlLnR5cGUgPT0gJ2tleXVwJ1xuXG4gICAgICBpZiBlLmtleSBpbiBbXCJDb250cm9sXCIsIFwiTWV0YVwiLCBcIkFsdFwiLCBcIlNoaWZ0XCJdXG4gICAgICAgIGpzb24gPSBrZXkudG9KU09OKClcbiAgICAgICAganNvbi5wb3NpdGlvbiA9IDIgIyBLRVlfVVAgLSBUT0RPIC0gY29uc3RhbnRpemVcbiAgICAgICAgQHRyaWdnZXIgJ2tleTpzZWxlY3RlZCcsIGpzb25cblxuXG4gICAgIyAjICMgI1xuXG4gICAgaWYgZS50eXBlID09ICdrZXl1cCdcbiAgICAgIEAkKFwiW2RhdGEta2V5Y29kZT0je2Uua2V5Q29kZX1dXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgIGVsc2VcbiAgICAgIEAkKFwiW2RhdGEta2V5Y29kZT0je2Uua2V5Q29kZX1dXCIpLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gICAgIyBUT0RPIC0gYW5ub3RhZVxuICAgIHNldFRpbWVvdXQoID0+XG4gICAgICBAJChcIltkYXRhLWtleWNvZGU9I3tlLmtleUNvZGV9XVwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAsIDEwMDApXG5cbiAgICAjIFN0b3BzIHJlY29yZGluZyAyIHNlY29uZHMgYWZ0ZXIgbGFzdCBrZXlzdHJva2VcbiAgICBAZGVib3VuY2VTdG9wUmVjb3JkaW5nKClcblxuICAgICMgIyAjICNcblxuXG4gICMgS2V5Q2xpY2sgY2FsbGJhY2tcbiAgb25LZXlDbGljazogKGUpIC0+XG5cbiAgICAjIENhY2hlcyBlbCBhbmQga2V5Y29kZVxuICAgIGVsICA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuICAgIGtleWNvZGUgPSBlbC5kYXRhKCdrZXljb2RlJylcblxuICAgICMgRmluZHMgdGhlIG1vZGVsIG9mIHRoZSBrZXkgdGhhdCB3YXMgc2VsZWN0ZWRcbiAgICBrZXkgPSBAb3B0aW9ucy5rZXlzLmZpbmRXaGVyZSh7IGtleWNvZGU6IGtleWNvZGUgfSlcblxuICAgICMgVHJpZ2dlcnMgJ2tleTpzZWxlY3RlZCcgZXZlbnRcbiAgICBAdHJpZ2dlciAna2V5OnNlbGVjdGVkJywga2V5LnRvSlNPTigpXG5cbiAgICAjIEJsdXJzIGZvY3VzIGZyb20gY2xpY2tlZCBrZXlcbiAgICBlbC5ibHVyKClcblxuICAgIHJldHVyblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBBYnN0cmFjdEtleWJvYXJkVmlld1xuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgS2V5Ym9hcmRWaWV3IGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2tleWJvYXJkX2Z1bGwnXG5cbiAgYmVoYXZpb3JzOlxuICAgIEtleWJvYXJkQ29udHJvbHM6IHt9XG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdyMCd9KVxuICAgICAgcjE6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdyMSd9KVxuICAgICAgcjI6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdyMid9KVxuICAgICAgcjM6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdyMyd9KVxuICAgICAgcjQ6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdyNCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRWaWV3XG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICNcblxuY2xhc3MgRnVuY3Rpb25LZXlib2FyZCBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgIyByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ2Z1bmNfcjAnfSlcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAnc3BlY2lhbF9yMCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb25LZXlib2FyZFxuXG5cbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgI1xuXG5jbGFzcyBNZWRpYUtleWJvYXJkIGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ21lZGlhX3IwJ30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNZWRpYUtleWJvYXJkXG5cblxuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjXG5cbmNsYXNzIE5hdktleWJvYXJkIGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ25hdl9yMCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTmF2S2V5Ym9hcmRcblxuXG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICNcblxuY2xhc3MgTnVtcGFkVmlldyBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9rZXlib2FyZF9udW1wYWQnXG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjAnfSlcbiAgICAgIHIxOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3IxJ30pXG4gICAgICByMjogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yMid9KVxuICAgICAgcjM6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjMnfSlcbiAgICAgIHI0OiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3I0J30pXG4gICAgICBjb2w6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fY29sJ30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBOdW1wYWRWaWV3XG5cblxuIiwiU2ltcGxlTmF2ID0gcmVxdWlyZSgnbGliL3ZpZXdzL3NpbXBsZV9uYXYnKVxuRnVsbEtleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Z1bGwnKVxuTnVtcGFkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQnKVxuRnVuY3Rpb25LZXlib2FyZCA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9mdW5jdGlvbicpXG5NZWRpYUtleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX21lZGlhJylcbk5hdktleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX25hdicpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlib2FyZFNlbGVjdG9yIGV4dGVuZHMgU2ltcGxlTmF2XG4gIGNsYXNzTmFtZTogJ3JvdyBoLTEwMCdcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2tleWJvYXJkX3NlbGVjdG9yJylcblxuICBuYXZJdGVtczogW1xuICAgIHsgaWNvbjogJ2ZhLWtleWJvYXJkLW8nLCAgdGV4dDogJ0tleWJvYXJkJywgIHRyaWdnZXI6ICdrZXlib2FyZCcsIGRlZmF1bHQ6IHRydWUgfVxuICAgIHsgaWNvbjogJ2ZhLWZpbGUtdGV4dC1vJywgdGV4dDogJ051bXBhZCcsICAgdHJpZ2dlcjogJ251bXBhZCcgfVxuICAgIHsgaWNvbjogJ2ZhLWNhcmV0LXNxdWFyZS1vLXVwJywgICAgdGV4dDogJ0Z1bmN0aW9uJywgICAgdHJpZ2dlcjogJ2Z1bmN0aW9uJyB9XG4gICAgeyBpY29uOiAnZmEtYXN0ZXJpc2snLCAgICB0ZXh0OiAnTWVkaWEnLCAgICB0cmlnZ2VyOiAnbWVkaWEnIH1cbiAgICB7IGljb246ICdmYS1hc3RlcmlzaycsICAgIHRleHQ6ICdOYXZpZ2F0aW9uJywgICAgdHJpZ2dlcjogJ25hdicgfVxuICBdXG5cbiAgc2hvd0tleWJvYXJkVmlldzogKGtleWJvYXJkVmlldykgLT5cblxuICAgICMgQ2FjaGVzIGN1cnJlbnQga2V5Ym9hcmQgdmlld1xuICAgIEBjdXJyZW50ID0ga2V5Ym9hcmRWaWV3XG5cbiAgICAjIEhhbmRsZXMgJ3N0b3A6cmVjb3JkaW5nJyBldmVudFxuICAgIEBjdXJyZW50Lm9uICdzdG9wOnJlY29yZGluZycsID0+IEB0cmlnZ2VyICdzdG9wOnJlY29yZGluZydcblxuICAgICMgSGFuZGxlcyBLZXlTZWxlY3Rpb24gZXZlbnRcbiAgICBrZXlib2FyZFZpZXcub24gJ2tleTpzZWxlY3RlZCcsIChrZXkpID0+IEB0cmlnZ2VyKCdrZXk6c2VsZWN0ZWQnLCBrZXkpXG5cbiAgICAjIFNob3dzIHRoZSBrZXlib2FyZFZpZXdcbiAgICBAY29udGVudFJlZ2lvbi5zaG93IGtleWJvYXJkVmlld1xuXG4gIG9uTmF2aWdhdGVLZXlib2FyZDogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgRnVsbEtleWJvYXJkKHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuICBvbk5hdmlnYXRlTnVtcGFkOiAtPlxuICAgIEBzaG93S2V5Ym9hcmRWaWV3KG5ldyBOdW1wYWRWaWV3KHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuICBvbk5hdmlnYXRlRnVuY3Rpb246IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IEZ1bmN0aW9uS2V5Ym9hcmQoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4gIG9uTmF2aWdhdGVNZWRpYTogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgTWVkaWFLZXlib2FyZCh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZU5hdjogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgTmF2S2V5Ym9hcmQoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZFNlbGVjdG9yXG4iLCJjbGFzcyBTaW1wbGVOYXYgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBbZGF0YS10cmlnZ2VyXTpub3QoLmRpc2FibGVkKSc6ICdvbk5hdkl0ZW1DbGljaydcblxuICBuYXZJdGVtczogW11cblxuICByZWdpb25zOlxuICAgIGNvbnRlbnRSZWdpb246ICdbZGF0YS1yZWdpb249Y29udGVudF0nXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgZGVmID0gXy53aGVyZShfLnJlc3VsdChALCAnbmF2SXRlbXMnKSwgeyBkZWZhdWx0OiB0cnVlIH0pWzBdXG4gICAgcmV0dXJuIHVubGVzcyBkZWZcbiAgICBAdHJpZ2dlck1ldGhvZChcIm5hdmlnYXRlOiN7ZGVmLnRyaWdnZXJ9XCIpXG4gICAgQCQoXCJbZGF0YS10cmlnZ2VyPSN7ZGVmLnRyaWdnZXJ9XVwiKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICBzZXJpYWxpemVEYXRhOiAtPlxuICAgIGRhdGEgPSBzdXBlclxuICAgIF8uZXh0ZW5kKGRhdGEsIHsgbmF2SXRlbXM6IF8ucmVzdWx0KEAsICduYXZJdGVtcycpIH0pXG4gICAgcmV0dXJuIGRhdGFcblxuICBvbk5hdkl0ZW1DbGljazogKGUpID0+XG4gICAgZWwgPSAkKGUuY3VycmVudFRhcmdldClcbiAgICBlbC5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICBAdHJpZ2dlck1ldGhvZChcIm5hdmlnYXRlOiN7ZWwuZGF0YSgndHJpZ2dlcicpfVwiKVxuICAgIGVsLmJsdXIoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVOYXZcbiJdfQ==
