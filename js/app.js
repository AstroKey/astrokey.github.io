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
var MacroCollection, MacroExamples, MacroModel, charMap,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MacroExamples = require('./examples');

charMap = {
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
  'z': 29
};

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
      return d.controlTransferIn(requestObj, new Uint8Array(data).buffer).then((function(_this) {
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
    this.deviceRegion.show(deviceView);
    return this.showEditorView(this.model.get('keys').first(), 'macro');
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
;var locals_for_with = (locals || {});(function (connected) {
buf.push("");
if ( !connected)
{
buf.push("<div class=\"col-lg-12 d-flex justify-content-center align-items-center\"><button data-click=\"connect\" class=\"btn btn-outline-secondary\">CONNECT</button></div>");
}
buf.push("<div data-region=\"keys\" class=\"col-lg-12 d-flex justify-content-center align-items-center\"></div>");}.call(this,"connected" in locals_for_with?locals_for_with.connected:typeof connected!=="undefined"?connected:undefined));;return buf.join("");
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

buf.push("<div class=\"col-lg-12\"><div class=\"row justify-content-center\"><div class=\"col-lg-12 d-flex justify-content-center\"><button data-click=\"cancel\" class=\"btn btn-sm btn-outline-secondary mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-angle-left\"></i></button><button data-click=\"save\" class=\"btn btn-sm btn-outline-success mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-check-circle-o\"></i></button><button data-click=\"clear\" class=\"btn btn-sm btn-outline-warning mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-times\"></i></button><button data-click=\"record\" class=\"btn btn-sm btn-outline-danger mx-2 px-4\"><i class=\"fa fa-fw fa-2x mx-4 fa-circle\"></i></button><div class=\"btn-group\"><button type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"btn btn-sm btn-outline-primary dropdown-toggle mx-2 px-4\">Examples</button><div class=\"dropdown-menu dropdown-menu-right mt-3\"><button type=\"button\" data-example=\"ex_01\" class=\"dropdown-item\">Ex. 1: \"Hello!\"</button><button type=\"button\" data-example=\"ex_02\" class=\"dropdown-item\">Ex. 2: \"Resumè\"</button><button type=\"button\" data-example=\"ex_03\" class=\"dropdown-item\">Ex. 3: Em Dash (—)</button><button type=\"button\" data-example=\"ex_04\" class=\"dropdown-item\">Ex. 4: CTRL + ALT + DELETE</button></div></div></div></div></div><div class=\"col-lg-12\"><hr/></div><div data-region=\"content\" class=\"col-lg-12\"></div>");;return buf.join("");
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
          type: 'text',
          text_value: 'Hello world!'
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
          type: 'text',
          text_value: 'Hello, again'
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
                window.d = d;
                return resolve(d);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9hcHAuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvYXBwbGljYXRpb24vdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2JlaGF2aW9ycy9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9iZWhhdmlvcnMva2V5Ym9hcmRDb250cm9scy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9iZWhhdmlvcnMvc2VsZWN0YWJsZUNoaWxkLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2JlaGF2aW9ycy9zb3J0YWJsZUNoaWxkLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2JlaGF2aW9ycy9zb3J0YWJsZUxpc3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC92aWV3cy9sYXlvdXQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9hYm91dC92aWV3cy90ZW1wbGF0ZXMvYWJvdXQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9jb21wb25lbnRzL2hlYWRlci92aWV3cy9sYXlvdXQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9oZWFkZXIvdmlld3MvdGVtcGxhdGVzL2hlYWRlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29uZmlnL2NvcnMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29uZmlnL2luZGV4LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL2NvbmZpZy9qd3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29uZmlnL21hcmlvbmV0dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvY29uZmlnL3dpbmRvdy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tYW5pZmVzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2tleS9lbnRpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2tleS9mYWN0b3J5LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMva2V5L2tleXMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QvdGVtcGxhdGVzL2tleWJvYXJkX2Fic3RyYWN0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9mdWxsL3RlbXBsYXRlcy9rZXlib2FyZF9mdWxsLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQvdGVtcGxhdGVzL2tleWJvYXJkX251bXBhZC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3IvdGVtcGxhdGVzL2tleWJvYXJkX3NlbGVjdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21hY3JvL2VudGl0aWVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvZXhhbXBsZV8xLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvZXhhbXBsZV8yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvZXhhbXBsZV8zLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvZXhhbXBsZV80LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFjcm8vZXhhbXBsZXMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC9yb3V0ZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2RldmljZUxheW91dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2VkaXRvclNlbGVjdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvZWRpdG9yV3JhcHBlci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL2tleVNlbGVjdG9yLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvbWFjcm9FZGl0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy9tYWNyb0xpc3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZGV2aWNlX2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZGV2aWNlX3N0YXR1cy5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvZWRpdG9yX3NlbGVjdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9lZGl0b3Jfd3JhcHBlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvaGVscF92aWV3LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9rZXlfY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2xheW91dC5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL21hY3JvX2VkaXRvci5qYWRlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbWFjcm9fZW1wdHkuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL3RleHRfZWRpdG9yLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vZGFzaGJvYXJkL3ZpZXdzL3RleHRFZGl0b3IuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2RhdGEuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL2FwcC9jb2ZmZWUvbW9kdWxlcy9tYWluL2VudGl0aWVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9mYWN0b3J5LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3JvdXRlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvbWFpbi9ob21lL3ZpZXdzL2xheW91dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vaG9tZS92aWV3cy90ZW1wbGF0ZXMvbGF5b3V0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvYXBwL2NvZmZlZS9tb2R1bGVzL21haW4vcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9hcHAvY29mZmVlL21vZHVsZXMvdXNiL3NlcnZpY2UuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcmVzb2x2ZS9lbXB0eS5qcyIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9iaW5kQmFzZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvYmluZElucHV0cy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvZmxhc2hlcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9obl9iZWhhdmlvcnMvbGliL3N1Ym1pdEJ1dHRvbi5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvdG9vbHRpcHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9obl9lbnRpdGllcy9saWIvY29uZmlnLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fZW50aXRpZXMvbGliL2RlY29yYXRvci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9jb2xsZWN0aW9uLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9tb2RlbC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9zZXJ2aWNlLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fZmxhc2gvbGliL3ZpZXdzL2ZsYXNoTGlzdC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi92aWV3cy90ZW1wbGF0ZXMvZmxhc2hfY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fbW9kYWwvbGliL2Fic3RyYWN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fbW9kYWwvbGliL21vZGFsX3RlbXBsYXRlLmphZGUiLCIvVXNlcnMvYWVrc2NvL2NvZGVfbWVnYS9hc3Ryb2tleS9hc3Ryb2tleV93ZWIvbm9kZV9tb2R1bGVzL2huX21vZGFsL2xpYi92aWV3LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fb3ZlcmxheS9saWIvY29tcG9uZW50LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vY29kZV9tZWdhL2FzdHJva2V5L2FzdHJva2V5X3dlYi9ub2RlX21vZHVsZXMvaG5fcm91dGluZy9saWIvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9obl9yb3V0aW5nL2xpYi9yb3V0ZXIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9jb2RlX21lZ2EvYXN0cm9rZXkvYXN0cm9rZXlfd2ViL25vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0L2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfZnVsbC9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL2tleWJvYXJkX2Z1bmN0aW9uL2luZGV4LmNvZmZlZSIsImFwcC9jb2ZmZWUvbW9kdWxlcy9saWIvdmlld3Mva2V5Ym9hcmRfbWVkaWEvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9uYXYvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQvaW5kZXguY29mZmVlIiwiYXBwL2NvZmZlZS9tb2R1bGVzL2xpYi92aWV3cy9rZXlib2FyZF9zZWxlY3Rvci9pbmRleC5jb2ZmZWUiLCJhcHAvY29mZmVlL21vZHVsZXMvbGliL3ZpZXdzL3NpbXBsZV9uYXYvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDR0EsSUFBQSxXQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3dCQUVKLFdBQUEsR0FDRTtJQUFBLGNBQUEsRUFBZ0IsWUFBaEI7Ozt3QkFHRixVQUFBLEdBQVksU0FBQTtJQUdWLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFnQyxDQUFDLE9BQWpDLENBQXlDLE9BQXpDO0lBR0EsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQW9DLENBQUMsT0FBckMsQ0FBNkMsT0FBN0M7SUFDQSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxPQUExQztJQUNBLElBQUMsQ0FBQSxPQUFELENBQUE7QUFDQSxXQUFPO0VBVEc7O3dCQWNaLE9BQUEs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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QyxPQUFQLEdBQWlCOzs7OztBQ3pJakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQSxJQUFBLFVBQUE7RUFBQTs7O0FBQU07Ozs7Ozs7dUJBQ0osU0FB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SUFDQSxJQUFDLENBQUEsYUFBRCxDQUFlLFdBQUEsR0FBWSxHQUFHLENBQUMsT0FBL0I7V0FDQSxJQUFDLENBQUEsQ0FBRCxDQUFHLGdCQUFBLEdBQWlCLEdBQUcsQ0FBQyxPQUFyQixHQUE2QixHQUFoQyxDQUFtQyxDQUFDLFFBQXBDLENBQTZDLFFBQTdDO0VBSlE7O3NCQU1WLGFBQUEsR0FBZSxTQUFBO0FBQ2IsUUFBQTtJQUFBLElBQUEsR0FBTyw4Q0FBQSxTQUFBO0lBQ1AsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFULEVBQWU7TUFBRSxRQUFBLEVBQVUsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFULEVBQVksVUFBWixDQUFaO0tBQWY7QUFDQSxXQUFPO0VBSE07O3NCQUtmLGNBQUEsR0FBZ0IsU0FBQyxDQUFEO0FBQ2QsUUFBQTtJQUFBLEVBQUEsR0FBSyxDQUFBLENBQUUsQ0FBQyxDQUFDLGFBQUo7SUFDTCxFQUFFLENBQUMsUUFBSCxDQUFZLFFBQVosQ0FBcUIsQ0FBQyxRQUF0QixDQUFBLENBQWdDLENBQUMsV0FBakMsQ0FBNkMsUUFBN0M7SUFDQSxJQUFDLENBQUEsYUFBRCxDQUFlLFdBQUEsR0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFILENBQVEsU0FBUixDQUFELENBQTFCO1dBQ0EsRUFBRSxDQUFDLElBQUgsQ0FBQTtFQUpjOzs7O0dBckJNLEVBQUUsQ0FBQzs7QUE2QjNCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuIyBBcHBsaWNhdGlvbiBjbGFzcyBkZWZpbml0aW9uXG4jIE1hbmFnZXMgbGlmZWN5Y2xlIGFuZCBib290c3RyYXBzIGFwcGxpY2F0aW9uXG5jbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdhcHAgcmVkaXJlY3QnOiAncmVkaXJlY3RUbydcblxuICAjIEludm9rZWQgYWZ0ZXIgY29uc3RydWN0b3JcbiAgaW5pdGlhbGl6ZTogLT5cblxuICAgICMgU3RhcnRzIEhlYWRlciBDb21wb25lbnRcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdoZWFkZXInKS50cmlnZ2VyKCdyZXNldCcpXG5cbiAgICAjIFN0YXJ0cyBIZW5zb24uanMgQ29tcG9uZW50c1xuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2JyZWFkY3J1bWInKS50cmlnZ2VyKCdyZWFkeScpXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnb3ZlcmxheScpLnRyaWdnZXIoJ3JlYWR5JylcbiAgICBAb25SZWFkeSgpXG4gICAgcmV0dXJuIHRydWVcblxuICAjIFN0YXJ0cyB0aGUgYXBwbGljYXRpb25cbiAgIyBTdGFydHMgQmFja2JvbmUuaGlzdG9yeSAoZW5hYmxlcyByb3V0aW5nKVxuICAjIEFuZCBpbml0aWFsaXplcyBzaWRlYmFyIG1vZHVsZVxuICBvblJlYWR5OiAtPlxuICAgIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKVxuXG4gICMgUmVkaXJlY3Rpb24gaW50ZXJmYWNlXG4gICMgVXNlZCBhY2Nyb3NzIHRoZSBhcHBsaWNhdGlvbiB0byByZWRpcmVjdFxuICAjIHRvIHNwZWNpZmljIHZpZXdzIGFmdGVyIHNwZWNpZmljIGFjdGlvbnNcbiAgcmVkaXJlY3RUbzogKHJvdXRlKSAtPlxuICAgIHdpbmRvdy5sb2NhdGlvbiA9IHJvdXRlXG4gICAgcmV0dXJuIHRydWVcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb25cbiIsIlxuIyBBcHBsaWNhdGlvbkxheW91dCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBNYXJpb25ldHRlLkxheW91dFZpZXcgdG8gbWFuYWdlXG4jIHRvcC1sZXZlbCBhcHBsaWNhdGlvbiByZWdpb25zXG5jbGFzcyBBcHBsaWNhdGlvbkxheW91dCBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICBlbDogJ2JvZHknXG5cbiAgdGVtcGxhdGU6IGZhbHNlXG5cbiAgcmVnaW9uczpcbiAgICBoZWFkZXI6ICAgICAnW2FwcC1yZWdpb249aGVhZGVyXSdcbiAgICBvdmVybGF5OiAgICAnW2FwcC1yZWdpb249b3ZlcmxheV0nXG4gICAgZmxhc2g6ICAgICAgJ1thcHAtcmVnaW9uPWZsYXNoXSdcbiAgICBtb2RhbDogICAgICAnW2FwcC1yZWdpb249bW9kYWxdJ1xuICAgIG1haW46ICAgICAgICdbYXBwLXJlZ2lvbj1tYWluXSdcblxuIyAjICMgIyAjXG5cbiMgRXhwb3J0cyBpbnN0YW5jZVxubW9kdWxlLmV4cG9ydHMgPSBuZXcgQXBwbGljYXRpb25MYXlvdXQoKS5yZW5kZXIoKVxuIiwiXG4jIE1hcmlvbmV0dGUgQmVoYXZpb3IgTWFuaWZlc3Rcbm1vZHVsZS5leHBvcnRzID1cbiAgU3VibWl0QnV0dG9uOiAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi9zdWJtaXRCdXR0b24nXG4gIEZsYXNoZXM6ICAgICAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvZmxhc2hlcydcbiAgTW9kZWxFdmVudHM6ICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi9tb2RlbEV2ZW50cydcbiAgQmluZElucHV0czogICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi9iaW5kSW5wdXRzJ1xuICBUb29sdGlwczogICAgICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL3Rvb2x0aXBzJ1xuICBTZWxlY3RhYmxlQ2hpbGQ6ICByZXF1aXJlICcuL3NlbGVjdGFibGVDaGlsZCdcbiAgS2V5Ym9hcmRDb250cm9sczogIHJlcXVpcmUgJy4va2V5Ym9hcmRDb250cm9scydcbiAgU29ydGFibGVDaGlsZDogICAgcmVxdWlyZSAnLi9zb3J0YWJsZUNoaWxkJ1xuICBTb3J0YWJsZUxpc3Q6ICAgICByZXF1aXJlICcuL3NvcnRhYmxlTGlzdCdcbiIsIiMgTk9URSAtIHRoaXMgYmVoYXZpb3IgaGFzIG5vdCBiZWVuIHRlc3RlZCB3aXRoIG11bHRpcGxlIHZpZXdzIHNpbXVsdGFuZW91c2x5XG5cbiMgRW5hYmxlcyB2aWV3IGNhbGxiYWNrcyB0byBiZSB0cmlnZ2VyZWQgYnkga2V5Ym9hcmQgaW5wdXRcbmNsYXNzIEtleWJvYXJkQ29udHJvbHMgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAa2V5RXZlbnRzID0gQG9wdGlvbnMua2V5RXZlbnRzXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgQGFkZEV2ZW50TGlzdGVuZXIoKVxuXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBAcmVtb3ZlRXZlbnRMaXN0ZW5lcigpXG5cbiAga2V5QWN0aW9uOiAoZSkgPT5cblxuICAgICMgY29uc29sZS5sb2coZSk7XG5cbiAgICAjIElzb2xhdGVzIHRoZSBrZXlzdHJva2VcbiAgICAjIGtleUNvZGUgPSBlLmtleUNvZGVcblxuICAgIHJldHVybiBAdmlldy50cmlnZ2VyTWV0aG9kKCdrZXk6YWN0aW9uJywgZSlcblxuICAgICMgRG8gbm90aGluZyBpZiB0aGVyZSBpc24ndCBhblxuICAgICMgZXZlbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXlzdHJva2VcbiAgICAjIHJldHVybiB1bmxlc3MgQGtleUV2ZW50c1trZXlDb2RlXVxuXG4gICAgIyBQcmV2ZW50cyBhbnkgZGVmYXVsdCBhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXljb2RlXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAjIFRyaWdnZXJzIHRoZSBldmVudCBhc3NvY2lhdGVkIHdpdGhcbiAgICAjIHRoZSBrZXlzdHJva2Ugb24gdGhlIHZpZXcgaW5zdGFuY2VcbiAgICAjIHJldHVybiBAdmlldy50cmlnZ2VyTWV0aG9kKEBrZXlFdmVudHNba2V5Q29kZV0pXG5cbiAgYWRkRXZlbnRMaXN0ZW5lcjogLT5cbiAgICAkKGRvY3VtZW50KS5vbiAna2V5ZG93bicsIEBrZXlBY3Rpb25cbiAgICAkKGRvY3VtZW50KS5vbiAna2V5dXAnLCBAa2V5QWN0aW9uXG4gICAgIyAkKGRvY3VtZW50KS5vbiAna2V5cHJlc3MnLCBAa2V5QWN0aW9uXG4gICAgIyBSYWRpby5jaGFubmVsKCdmbGFzaCcpLnRyaWdnZXIoJ2FkZCcsIHsgY29udGV4dDogJ2luZm8nLCB0aW1lb3V0OiAxNTAwLCBtZXNzYWdlOiAnS2V5Ym9hcmQgY29udHJvbHMgZW5hYmxlZCd9KVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6IC0+XG4gICAgJChkb2N1bWVudCkub2ZmICdrZXlkb3duJywgQGtleUFjdGlvblxuICAgICQoZG9jdW1lbnQpLm9mZiAna2V5dXAnLCBAa2V5QWN0aW9uXG4gICAgIyAkKGRvY3VtZW50KS5vZmYgJ2tleXByZXNzJywgQGtleUFjdGlvblxuICAgICMgUmFkaW8uY2hhbm5lbCgnZmxhc2gnKS50cmlnZ2VyKCdhZGQnLCB7IGNvbnRleHQ6ICdpbmZvJywgdGltZW91dDogMTUwMCwgbWVzc2FnZTogJ0tleWJvYXJkIGNvbnRyb2xzIGRpc2FibGVkJ30pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkQ29udHJvbHNcbiIsIlxuY2xhc3MgU2VsZWN0YWJsZUNoaWxkIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIGNzczpcbiAgICBhY3RpdmU6ICdhY3RpdmUnXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayc6ICAnb25DbGljaydcblxuICBtb2RlbEV2ZW50czpcbiAgICAnc2VsZWN0ZWQnOiAnb25DbGljaydcblxuICAjIFNlbGVjdHMgYWN0aXZlTW9kZWwgb24gcmVuZGVyXG4gIG9uUmVuZGVyOiAtPlxuICAgIHJldHVybiB1bmxlc3MgQG9wdGlvbnMuc2V0QWN0aXZlXG5cbiAgIyBJbnZva2VkIHdoZW4gY2xpY2tlZFxuICBvbkNsaWNrOiAoZSkgLT5cbiAgICAjIEJ5cGFzcyBiZWhhdmlvciB3aXRoIGN1c3RvbSBvbkNsaWNrIGNhbGxiYWNrXG4gICAgcmV0dXJuIEB2aWV3Lm9uQ2xpY2soZSkgaWYgQHZpZXcub25DbGlja1xuXG4gICAgIyBQcmV2ZW50IGRvdWJsZS1jbGljayB1bmxlc3Mgc3BlY2lmaWNlZFxuICAgIGU/LnByZXZlbnREZWZhdWx0KCkgdW5sZXNzIEBvcHRpb25zLmRvdWJsZUNsaWNrXG5cbiAgICAjIEhhbmRsZXMgZGUtc2VsZWN0aW9uXG4gICAgaWYgQG9wdGlvbnMuZGVzZWxlY3QgJiYgQCRlbC5oYXNDbGFzcyhAY3NzLmFjdGl2ZSlcbiAgICAgIEAkZWwucmVtb3ZlQ2xhc3MoQGNzcy5hY3RpdmUpXG4gICAgICByZXR1cm4gQHZpZXcudHJpZ2dlck1ldGhvZCAnZGVzZWxlY3RlZCdcblxuICAgICMgUmV0dXJuIGlmIGVsZW1lbnQgaXMgY3VycmVudGx5IHNlbGVjdGVkXG4gICAgcmV0dXJuIGlmIEAkZWwuaGFzQ2xhc3MoQGNzcy5hY3RpdmUpXG5cbiAgICAjIFByZXZlbnQgZGVhZnVsdCBhbmQgdHJpZ2dlciBzZWxlY3RlZFxuICAgIGU/LnByZXZlbnREZWZhdWx0KClcbiAgICBAdmlldy50cmlnZ2VyTWV0aG9kICdzZWxlY3RlZCdcbiAgICBAJGVsLmFkZENsYXNzKEBjc3MuYWN0aXZlKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKEBjc3MuYWN0aXZlKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RhYmxlQ2hpbGRcbiIsIlxuIyBTb3J0YWJsZUNoaWxkIEJlaGF2aW9yIGRlZmluaXRpb25cbiMgV29ya3Mgd2l0aCBTb3J0YWJsZUxpc3QgQmVoYXZpb3JcbmNsYXNzIFNvcnRhYmxlQ2hpbGQgZXh0ZW5kcyBNbi5CZWhhdmlvclxuXG4gIGV2ZW50czpcbiAgICAnc29ydGVkJzogJ29uU29ydGVkJ1xuXG4gIG9uU29ydGVkOiAoZSwgb3JkZXIpIC0+XG4gICAgQHZpZXcubW9kZWwuc2V0KCdvcmRlcicsIG9yZGVyKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTb3J0YWJsZUNoaWxkXG4iLCJcbiMgU29ydGFibGVMaXN0IEJlaGF2aW9yIGRlZmluaXRpb25cbiMgV29ya3Mgd2l0aCBTb3J0YWJsZUNoaWxkIEJlaGF2aW9yXG5jbGFzcyBTb3J0YWJsZUxpc3QgZXh0ZW5kcyBNbi5CZWhhdmlvclxuXG4gICMgRGVmaW5lcyB0aGUgcmVvcmRlckNvbGxlY3Rpb24gbWV0aG9kIG9uIHRoZSB2aWV3XG4gICMgdG8gd2hpY2ggdGhlIGJlaGF2aW9yIGlzIGFzc2lnbmVkXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQHZpZXcucmVvcmRlckNvbGxlY3Rpb24gPSA9PiBAcmVvcmRlckNvbGxlY3Rpb24oKVxuXG4gIG9uUmVuZGVyOiAtPlxuXG4gICAgIyBJbml0aWFsaXplcyBTb3J0YWJsZSBjb250YWluZXJcbiAgICBTb3J0YWJsZS5jcmVhdGUgQHZpZXcuZWwsXG4gICAgICBoYW5kbGU6ICAgICAgIEBvcHRpb25zLmhhbmRsZSB8fCAnLnNvcnRhYmxlJ1xuICAgICAgYW5pbWF0aW9uOiAgICBAb3B0aW9ucy5hbmltYXRpb24gfHwgMjUwXG4gICAgICBvbkVuZDogKGUpID0+IEByZW9yZGVyQ29sbGVjdGlvbigpXG5cbiAgIyByZW9yZGVyQ29sbGVjdGlvblxuICAjIEludm9rZWQgYWZ0ZXIgc29ydGluZyBoYXMgY29tcGxldGVkXG4gIHJlb3JkZXJDb2xsZWN0aW9uOiA9PlxuXG4gICAgIyBUcmlnZ2VycyBvcmRlciBldmVudHMgb24gQ29sbGVjdGlvblZpZXcgY2hpbGRWaWV3ICRlbHNcbiAgICBvcmRlciA9IDFcbiAgICBmb3IgZWwgaW4gQHZpZXcuJGVsWzBdLmNoaWxkcmVuXG4gICAgICAkKGVsKS50cmlnZ2VyKCdzb3J0ZWQnLG9yZGVyKVxuICAgICAgb3JkZXIrK1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTb3J0YWJsZUxpc3RcbiIsIkFib3V0VmlldyAgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyAjICMgIyAjXG5cbmNsYXNzIEFib3V0Q29tcG9uZW50IGV4dGVuZHMgcmVxdWlyZSAnaG5fbW9kYWwvbGliL2Fic3RyYWN0J1xuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdhYm91dCBzaG93JzogJ3Nob3dBYm91dCdcblxuICBzaG93QWJvdXQ6IC0+XG4gICAgYWJvdXRWaWV3ID0gbmV3IEFib3V0VmlldygpXG4gICAgQHNob3dNb2RhbChhYm91dFZpZXcsIHsgc2l6ZTogJ2xhcmdlJyB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBBYm91dENvbXBvbmVudFxuIiwiXG4jIEFib3V0VmlldyBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBBYm91dFZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9hYm91dCdcbiAgY2xhc3NOYW1lOiAnbW9kYWwtY29udGVudCdcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQWJvdXRWaWV3XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PGg1IGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+QUJPVVQ8L2g1PjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PGhyLz48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgdGV4dC1jZW50ZXJcXFwiPjxwIGNsYXNzPVxcXCJsZWFkXFxcIj48YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vQXN0cm9LZXlcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj4gQXN0cm9LZXk8L2E+IGlzIGFuIG9wZW4tc291cmNlIHBsYXRmb3JtIGZvciByZS1wcm9ncmFtbWFibGUgVVNCIGtleWJvYXJkcy48L3A+PHA+QXN0cm9LZXkgcHJvdmlkZXMgYW4gaW50dWl0aXZlIGludGVyZmFjZSBhbnlib2R5IGNhbiB1c2UgdG8gYXV0b21hdGUgYmFzaWMga2V5Ym9hcmQgYWN0aW9ucy48L3A+PHA+U2ltcGx5IGRyYWcgYW5kIGRyb3Aga2V5Ym9hcmQga2V5cyB0byBjb25zdHJ1Y3QgeW91ciBkZXNpcmVkIHNlcXVlbmNlIC0gQXN0cm9LZXkgZG9lcyB0aGUgcmVzdC48L3A+PHA+SXQncyB0aGF0IGVhc3kuPC9wPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiB0ZXh0LWNlbnRlclxcXCI+PGhyLz48cD5CdWlsdCBieSZuYnNwOzxhIGhyZWY9XFxcImh0dHBzOi8vZ2l0aHViLmNvbS9BYXJvblBlcmxcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5BYXJvbiBQZXJsPC9hPiZuYnNwO2FuZCZuYnNwOzxhIGhyZWY9XFxcImh0dHA6Ly9hZWtzLmNvXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+QWxleGFuZGVyIFNjaHdhcnR6YmVyZzwvYT4mbmJzcDtmb3ImbmJzcDs8YSBocmVmPVxcXCJodHRwczovL3Jjb3MuaW8vXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+UkNPUy48L2E+PC9wPjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJMYXlvdXRWaWV3ID0gcmVxdWlyZSAnLi92aWV3cy9sYXlvdXQnXG5cbiMgSGVhZGVyU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBiYXNpYyBzZXJ2aWNlIGZvciBtYW5hZ2luZyBhcHBsaWNhdGlvblxuIyBoZWFkZXIgc3RhdGUuIERpc3BsYXlzIHRoZSBhdXRoZW50aWNhdGVkIHVzZXIsXG4jIG9yIHRoZSAndW5hdXRoZW50aWNhdGVkJyBtZXNzYWdlIGlmIG5vbmUgaXMgZGVmaW5lZFxuY2xhc3MgSGVhZGVyU2VydmljZSBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGNvbnRhaW5lciA9IEBvcHRpb25zLmNvbnRhaW5lclxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdoZWFkZXIgcmVzZXQnOiAncmVzZXQnXG5cbiAgcmVzZXQ6IC0+XG4gICAgQGNvbnRhaW5lci5zaG93IG5ldyBMYXlvdXRWaWV3KClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyU2VydmljZVxuIiwiXG4jIEhlYWRlclZpZXcgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgc2ltYnBsZSB2aWV3IGZvciBkaXNwbGF5aW5nIHRoZVxuIyBoZWFkZXIgb2YgdGhlIGFwcGxpY2F0aW9uLiBUaGUgaGVhZGVyIGRpc3BsYXlzXG4jIHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgYW5kXG4jIG1hbmFnZXMgdG9nZ2xpbmcgdGhlIFNpZGViYXJDb21wb25lbnQncyB2aWV3XG5jbGFzcyBIZWFkZXJWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9oZWFkZXInXG4gIGNsYXNzTmFtZTogJ25hdmJhciBmaXhlZC10b3AgbmF2YmFyLWRhcmsgYmctZGFyaydcbiAgdGFnTmFtZTogJ25hdidcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyVmlld1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwibmF2YmFyLWJyYW5kIHRpdGxlXFxcIj5BU1RST0tFWTwvZGl2Pjx1bCBjbGFzcz1cXFwibmF2YmFyLW5hdiBtbC1hdXRvXFxcIj48bGkgY2xhc3M9XFxcIm5hdi1pdGVtXFxcIj48YSBzdHlsZT1cXFwiY3Vyc29yOnBvaW50ZXJcXFwiIG9uQ2xpY2s9XFxcIlJhZGlvLmNoYW5uZWwoJ2Fib3V0JykudHJpZ2dlcignc2hvdycpO1xcXCIgY2xhc3M9XFxcIm5hdi1saW5rXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtbGcgZmEtcXVlc3Rpb24tY2lyY2xlLW9cXFwiPjwvaT48L2E+PC9saT48L3VsPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCIjIFN1cHBvcnQgZm9yIGNyb3NzLWRvbWFpbiByZXF1ZXN0cyBpbiBCYWNrYm9uZS5qcyAtIHVzdWFsbHkgdmVyYm90ZW4uXG4jIFRoaXMgYWxsb3dzIHRoZSBkZXYgc2VydmVyIGF0IGxvY2FsLmNvcnRpY2FsbWV0cmljcy5jb206ODA4MCB0byBjb21tdW5pY2F0ZSB3aXRoIGRldi5jb3J0aWNhbG1ldHJpY3MuY29tOjMwMDAgKGNtLW5vZGUtYXBwKVxuXG5jcm9zc0RvbWFpblJvb3QgPSAnaHR0cDovLzE5Mi4xNjguMzMuMzM6MzAwMCcgIyBERVYgT05MWVxuXG5wcm94aWVkU3luYyA9IEJhY2tib25lLnN5bmNcblxuQmFja2JvbmUuc3luYyA9IChtZXRob2QsIG1vZGVsLCBvcHRpb25zID0ge30pID0+XG5cbiAgaWYgIW9wdGlvbnMudXJsXG4gICAgb3B0aW9ucy51cmwgPSBjcm9zc0RvbWFpblJvb3QgKyBfLnJlc3VsdChtb2RlbCwgJ3VybCcpIHx8IHVybEVycm9yKClcblxuICBlbHNlIGlmIG9wdGlvbnMudXJsLnN1YnN0cmluZygwLCA2KSAhPSBjcm9zc0RvbWFpblJvb3Quc3Vic3RyaW5nKDAsIDYpXG4gICAgb3B0aW9ucy51cmwgPSBjcm9zc0RvbWFpblJvb3QgKyBvcHRpb25zLnVybFxuXG4gIGlmICFvcHRpb25zLmNyb3NzRG9tYWluXG4gICAgb3B0aW9ucy5jcm9zc0RvbWFpbiA9IHRydWVcblxuICBpZiAhb3B0aW9ucy54aHJGaWVsZHNcbiAgICBvcHRpb25zLnhockZpZWxkcyA9IHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH1cblxuICByZXR1cm4gcHJveGllZFN5bmMobWV0aG9kLCBtb2RlbCwgb3B0aW9ucylcbiIsIiMgQXBwIGNvbmZpZ3VyYXRpb24gbWFuaWZlc3RcbnJlcXVpcmUgJy4vd2luZG93J1xucmVxdWlyZSAnLi9qd3QnXG5yZXF1aXJlICcuL2NvcnMnXG5yZXF1aXJlICcuL21hcmlvbmV0dGUnXG4iLCIjIEFqYXggSldUIFNoaW1cbiQuYWpheFNldHVwXG4gIGJlZm9yZVNlbmQ6ICh4aHIpIC0+XG4gICAgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKVxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgJ0pXVCAnICsgdG9rZW4pIGlmIHRva2VuXG4gICAgcmV0dXJuXG4iLCIjIE1hcmlvbmV0dGUuQmVoYXZpb3JzIGNvbmZpZ3VyYXRpb25cbk1hcmlvbmV0dGUuQmVoYXZpb3JzLmJlaGF2aW9yc0xvb2t1cCA9IC0+IHJlcXVpcmUgJy4uL2JlaGF2aW9ycydcbiIsIiMgQWxpYXNlcyBCYWNrYm9uZS5SYWRpbyB0byB3aW5kb3cuUmFkaW9cbndpbmRvdy5SYWRpbyA9IEJhY2tib25lLlJhZGlvXG4iLCIjIFRoaXMgZmlsZSBkZWZpbmVzIGEgbWFuaWZlc3QgZm9yIHRoZSBjbGllbnQgYXBwbGljYXRpb24uXG4jIFRoaXMgaW5jbHVkZXMgY29uZmlndXJhdGlvbiwgU2VydmljZXMsIENvbXBvbmVudHMsIE1vZHVsZXNcbiMgYW5kIHRoZSBBcHBsaWNhdGlvbiBzaW5nbGV0b24gaW5zdGFuY2UuXG5cbiMgIyAjICMgI1xuXG4jIEFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24gbWFuaWZlc3RcbnJlcXVpcmUgJy4vY29uZmlnJ1xuXG4jIEFwcGxpY2F0aW9uIGNsYXNzIGRlZmluaXRpb24gJiBBcHAgTGF5b3V0XG5BcHAgICAgICAgPSByZXF1aXJlICcuL2FwcCdcbkFwcExheW91dCA9IHJlcXVpcmUgJy4vYXBwbGljYXRpb24vdmlld3MvbGF5b3V0J1xuXG4jIEhlbnNvbiBFbnRpdGllc1xucmVxdWlyZSAnaG5fZW50aXRpZXMvbGliL2NvbmZpZydcblxuIyAjICMgIyAjXG5cbiMgQ29tcG9uZW50cyBhcmUgcm91dGVsZXNzIHNlcnZpY2VzIHdpdGggdmlld3MgdGhhdCBhcmVcbiMgYWNjZXNzaWJsZSBhbnl3aGVyZSBpbiB0aGUgYXBwbGljYXRpb25cbiMgVXNlZCB0byBtYW5hZ2UgdGhlIGhlYWRlciwgc2lkZWJhciwgZmxhc2gsIGFuZCBjb25maXJtIFVJIGVsZW1lbnRzXG5cbiMgSGVuc29uLmpzIENvbXBvbmVudHNcbkhlYWRlckNvbXBvbmVudCAgICAgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudCdcbkFib3V0Q29tcG9uZW50ICAgICAgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvYWJvdXQvY29tcG9uZW50J1xuT3ZlcmxheUNvbXBvbmVudCAgICA9IHJlcXVpcmUgJ2huX292ZXJsYXkvbGliL2NvbXBvbmVudCdcbkZsYXNoQ29tcG9uZW50ICAgICAgPSByZXF1aXJlICdobl9mbGFzaC9saWIvY29tcG9uZW50J1xubmV3IEhlYWRlckNvbXBvbmVudCh7IGNvbnRhaW5lcjogQXBwTGF5b3V0LmhlYWRlciB9KVxubmV3IE92ZXJsYXlDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5vdmVybGF5IH0pXG5uZXcgRmxhc2hDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5mbGFzaCB9KVxubmV3IEFib3V0Q29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQubW9kYWwgfSlcblxuIyAjICMgIyAjXG5cbiMgU2VydmljZXNcbnJlcXVpcmUoJy4vbW9kdWxlcy91c2Ivc2VydmljZScpXG5cbiMgRmFjdG9yaWVzXG5yZXF1aXJlKCcuL21vZHVsZXMva2V5L2ZhY3RvcnknKVxuXG4jICMgIyAjICNcblxuIyBNb2R1bGVzXG4jIE1vZHVsZXMgcmVwcmVzZW50IGNvbGxlY3Rpb25zIG9mIGVuZHBvaW50cyBpbiB0aGUgYXBwbGljYXRpb24uXG4jIFRoZXkgaGF2ZSByb3V0ZXMgYW5kIGVudGl0aWVzIChtb2RlbHMgYW5kIGNvbGxlY3Rpb25zKVxuIyBFYWNoIHJvdXRlIHJlcHJlc2VudHMgYW4gZW5kcG9pbnQsIG9yICdwYWdlJyBpbiB0aGUgYXBwLlxuTWFpbk1vZHVsZSA9IHJlcXVpcmUgJy4vbW9kdWxlcy9tYWluL3JvdXRlcidcbm5ldyBNYWluTW9kdWxlKHsgY29udGFpbmVyOiBBcHBMYXlvdXQubWFpbiB9KVxuXG4jICMgIyAjICMgI1xuXG4jIFBhZ2UgaGFzIGxvYWRlZCwgZG9jdW1lbnQgaXMgcmVhZHlcbiQoZG9jdW1lbnQpLm9uICdyZWFkeScsID0+IG5ldyBBcHAoKSAjIEluc3RhbnRpYXRlcyBuZXcgQXBwXG4iLCJcbiMgS2V5TW9kZWwgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgS2V5TW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5SZWxhdGlvbmFsTW9kZWxcblxuICAjIERlZmF1bHQgYXR0cmlidXRlc1xuICBkZWZhdWx0czoge31cblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBLZXlNb2RlbFxuICBjb21wYXJhdG9yOiAnb3JkZXInXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1vZGVsOiAgICAgIEtleU1vZGVsXG4gIENvbGxlY3Rpb246IEtleUNvbGxlY3Rpb25cbiIsIkVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpXG5LZXlEYXRhID0gcmVxdWlyZSgnLi9rZXlzJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleUZhY3RvcnkgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb1JlcXVlc3RzOlxuICAgICdrZXkgbW9kZWwnOiAgICAgICAnZ2V0TW9kZWwnXG4gICAgJ2tleSBjb2xsZWN0aW9uJzogICdnZXRDb2xsZWN0aW9uJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGNhY2hlZENvbGxlY3Rpb24gPSBuZXcgRW50aXRpZXMuQ29sbGVjdGlvbihLZXlEYXRhLCB7IHBhcnNlOiB0cnVlIH0pXG5cbiAgZ2V0TW9kZWw6IChpZCkgLT5cbiAgICByZXR1cm4gQGNhY2hlZENvbGxlY3Rpb24uZ2V0KGlkKVxuXG4gIGdldENvbGxlY3Rpb246IC0+XG4gICAgcmV0dXJuIEBjYWNoZWRDb2xsZWN0aW9uXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBLZXlGYWN0b3J5KClcbiIsIlxuIyBLZXkgSlNPTiBkZWZpbml0aW9uc1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICAgeyByb3c6ICdyNCcsIGtleTogJ2AnLCBzaGlmdF9rZXk6ICd+Jywga2V5Y29kZTogMTkyIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMScsIHNoaWZ0X2tleTogJyEnLCBrZXljb2RlOiA0OSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzInLCBzaGlmdF9rZXk6ICdAJywga2V5Y29kZTogNTAgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICczJywgc2hpZnRfa2V5OiAnIycsIGtleWNvZGU6IDUxIH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNCcsIHNoaWZ0X2tleTogJyQnLCBrZXljb2RlOiA1MiB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzUnLCBzaGlmdF9rZXk6ICclJywga2V5Y29kZTogNTMgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc2Jywgc2hpZnRfa2V5OiAnXicsIGtleWNvZGU6IDU0IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnNycsIHNoaWZ0X2tleTogJyYnLCBrZXljb2RlOiA1NSB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJzgnLCBzaGlmdF9rZXk6ICcqJywga2V5Y29kZTogNTYgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICc5Jywgc2hpZnRfa2V5OiAnKCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnMCcsIHNoaWZ0X2tleTogJyknLCBrZXljb2RlOiA0OCB9XG4gICAgeyByb3c6ICdyNCcsIGtleTogJy0nLCBzaGlmdF9rZXk6ICdfJywga2V5Y29kZTogMTg5IH1cbiAgICB7IHJvdzogJ3I0Jywga2V5OiAnPScsIHNoaWZ0X2tleTogJysnLCBrZXljb2RlOiAxODcgfVxuICAgIHsgcm93OiAncjQnLCBrZXk6ICdCQUNLU1BBQ0UnLCBrZXljb2RlOiA4LCBjc3M6ICd3Ml8wJyB9XG5cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnVEFCJywga2V5Y29kZTogOSwgY3NzOiAndzFfNScsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdxJywgc2hpZnRfa2V5OiAnUScsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4MSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ3cnLCBzaGlmdF9rZXk6ICdXJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg3IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnZScsIHNoaWZ0X2tleTogJ0UnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNjkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdyJywgc2hpZnRfa2V5OiAnUicsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4MiB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ3QnLCBzaGlmdF9rZXk6ICdUJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg0IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAneScsIHNoaWZ0X2tleTogJ1knLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICd1Jywgc2hpZnRfa2V5OiAnVScsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4NSB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ2knLCBzaGlmdF9rZXk6ICdJJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDczIH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnbycsIHNoaWZ0X2tleTogJ08nLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzkgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdwJywgc2hpZnRfa2V5OiAnUCcsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4MCB9XG4gICAgeyByb3c6ICdyMycsIGtleTogJ1snLCBzaGlmdF9rZXk6ICd7Jywga2V5Y29kZTogMjE5IH1cbiAgICB7IHJvdzogJ3IzJywga2V5OiAnXScsIHNoaWZ0X2tleTogJ30nLCBrZXljb2RlOiAyMjEgfVxuICAgIHsgcm93OiAncjMnLCBrZXk6ICdcXFxcJywgc2hpZnRfa2V5OiAnfCcsIGtleWNvZGU6IDIyMCwgY3NzOiAndzFfNScgfVxuXG4gICAgeyByb3c6ICdyMicsIGtleTogJ0NBUFMnLCBjc3M6ICd3MV83NScsIGtleWNvZGU6IDIwLCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnYScsIHNoaWZ0X2tleTogJ0EnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNjUgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdzJywgc2hpZnRfa2V5OiAnUycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA4MyB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2QnLCBzaGlmdF9rZXk6ICdEJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDY4IH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnZicsIHNoaWZ0X2tleTogJ0YnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzAgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdnJywgc2hpZnRfa2V5OiAnRycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3MSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2gnLCBzaGlmdF9rZXk6ICdIJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDcyIH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnaicsIHNoaWZ0X2tleTogJ0onLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNzQgfVxuICAgIHsgcm93OiAncjInLCBrZXk6ICdrJywgc2hpZnRfa2V5OiAnSycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3NSB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ2wnLCBzaGlmdF9rZXk6ICdMJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDc2IH1cbiAgICB7IHJvdzogJ3IyJywga2V5OiAnOycsIHNoaWZ0X2tleTogJzonLCBrZXljb2RlOiAxODYgfVxuICAgIHsgcm93OiAncjInLCBrZXk6IFwiJ1wiLCBzaGlmdF9rZXk6ICdcIicsIGtleWNvZGU6IDIyMiB9XG4gICAgeyByb3c6ICdyMicsIGtleTogJ1JFVFVSTicsIGNzczogJ3cyXzI1Jywga2V5Y29kZTogMTMsIHNwZWNpYWw6IHRydWUgfVxuXG4gICAgeyByb3c6ICdyMScsIGtleTogJ1NISUZUJywgY3NzOiAndzJfMjUnLCBrZXljb2RlOiAxNiwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ3onLCBzaGlmdF9rZXk6ICdaJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDkwIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAneCcsIHNoaWZ0X2tleTogJ1gnLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogODggfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICdjJywgc2hpZnRfa2V5OiAnQycsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA2NyB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ3YnLCBzaGlmdF9rZXk6ICdWJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDg2IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnYicsIHNoaWZ0X2tleTogJ0InLCBhbHBoYTogdHJ1ZSwga2V5Y29kZTogNjYgfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICduJywgc2hpZnRfa2V5OiAnTicsIGFscGhhOiB0cnVlLCBrZXljb2RlOiA3OCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJ20nLCBzaGlmdF9rZXk6ICdNJywgYWxwaGE6IHRydWUsIGtleWNvZGU6IDc3IH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnLCcsIHNoaWZ0X2tleTogJzwnLCBrZXljb2RlOiAxODggfVxuICAgIHsgcm93OiAncjEnLCBrZXk6ICcuJywgc2hpZnRfa2V5OiAnPicsIGtleWNvZGU6IDE5MCB9XG4gICAgeyByb3c6ICdyMScsIGtleTogJy8nLCBzaGlmdF9rZXk6ICc/Jywga2V5Y29kZTogMTkxIH1cbiAgICB7IHJvdzogJ3IxJywga2V5OiAnU0hJRlQnLCBjc3M6ICd3Ml83NScsIGtleWNvZGU6IDE2LCBzcGVjaWFsOiB0cnVlIH1cblxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdDVFJMJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxNywgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ00nLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDkxLCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnQUxUJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiAxOCwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ1NQQUNFJywgY3NzOiAnc3BhY2UnLCBrZXljb2RlOiAzMiwgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0NUUkwnLCBjc3M6ICd3MV8yNScsIGtleWNvZGU6IDE3LCBzcGVjaWFsOiB0cnVlIH1cbiAgICB7IHJvdzogJ3IwJywga2V5OiAnTScsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTgsIHNwZWNpYWw6IHRydWUgfVxuICAgIHsgcm93OiAncjAnLCBrZXk6ICdQJywgY3NzOiAndzFfMjUnLCBrZXljb2RlOiA5Mywgc3BlY2lhbDogdHJ1ZSB9XG4gICAgeyByb3c6ICdyMCcsIGtleTogJ0FMVCcsIGNzczogJ3cxXzI1Jywga2V5Y29kZTogMTgsIHNwZWNpYWw6IHRydWUgfVxuXG4gICAgIyBOVU1QQUQgS0VZU1xuICAgIHsgcm93OiAnbnVtX3IwJywga2V5OiAnMCcsIGtleWNvZGU6IDQ5LCBjc3M6ICd3Ml8yNScgfVxuICAgIHsgcm93OiAnbnVtX3IwJywga2V5OiAnLicsIGtleWNvZGU6IDQ5IH1cblxuICAgIHsgcm93OiAnbnVtX3IxJywga2V5OiAnMScsIGtleWNvZGU6IDQ5IH1cbiAgICB7IHJvdzogJ251bV9yMScsIGtleTogJzInLCBrZXljb2RlOiA1MCB9XG4gICAgeyByb3c6ICdudW1fcjEnLCBrZXk6ICczJywga2V5Y29kZTogNTEgfVxuXG4gICAgeyByb3c6ICdudW1fcjInLCBrZXk6ICc0Jywga2V5Y29kZTogNTIgfVxuICAgIHsgcm93OiAnbnVtX3IyJywga2V5OiAnNScsIGtleWNvZGU6IDUzIH1cbiAgICB7IHJvdzogJ251bV9yMicsIGtleTogJzYnLCBrZXljb2RlOiA1NCB9XG5cbiAgICB7IHJvdzogJ251bV9yMycsIGtleTogJzcnLCBrZXljb2RlOiA1NSB9XG4gICAgeyByb3c6ICdudW1fcjMnLCBrZXk6ICc4Jywga2V5Y29kZTogNTYgfVxuICAgIHsgcm93OiAnbnVtX3IzJywga2V5OiAnOScsIGtleWNvZGU6IDU3IH1cblxuICAgIHsgcm93OiAnbnVtX3I0Jywga2V5OiAnQ0xFQVInLCBrZXljb2RlOiA0OCB9XG4gICAgeyByb3c6ICdudW1fcjQnLCBrZXk6ICcvJywga2V5Y29kZTogMTg5IH1cbiAgICB7IHJvdzogJ251bV9yNCcsIGtleTogJyonLCBrZXljb2RlOiAxODcgfVxuXG4gICAgeyByb3c6ICdudW1fY29sJywga2V5OiAnLScsIGtleWNvZGU6IDQ4IH1cbiAgICB7IHJvdzogJ251bV9jb2wnLCBrZXk6ICcrJywga2V5Y29kZTogMTg5LCBjc3M6ICdoMl8wJyB9XG4gICAgeyByb3c6ICdudW1fY29sJywga2V5OiAnRU5URVInLCBrZXljb2RlOiAxODcsIGNzczogJ2gyXzAnIH1cblxuICAgICMgRnVuY3Rpb24gS2V5c1xuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxJywga2V5Y29kZTogNDkgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YyJywga2V5Y29kZTogNTAgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YzJywga2V5Y29kZTogNTEgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y0Jywga2V5Y29kZTogNTIgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y1Jywga2V5Y29kZTogNTMgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y2Jywga2V5Y29kZTogNTQgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y3Jywga2V5Y29kZTogNTUgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y4Jywga2V5Y29kZTogNTYgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0Y5Jywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxMCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ2Z1bmNfcjAnLCBrZXk6ICdGMTEnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICdmdW5jX3IwJywga2V5OiAnRjEyJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnZnVuY19yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3IH1cblxuICAgICMgTWVkaWEgS2V5c1xuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXN0ZXAtYmFja3dhcmQnIH1cbiAgICB7IHJvdzogJ21lZGlhX3IwJywga2V5OiAnRjEzJywga2V5Y29kZTogNTcsIGljb246ICdmYS1wbGF5JyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtc3RlcC1mb3J3YXJkJyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtdm9sdW1lLW9mZicgfVxuICAgIHsgcm93OiAnbWVkaWFfcjAnLCBrZXk6ICdGMTMnLCBrZXljb2RlOiA1NywgaWNvbjogJ2ZhLXZvbHVtZS1kb3duJyB9XG4gICAgeyByb3c6ICdtZWRpYV9yMCcsIGtleTogJ0YxMycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtdm9sdW1lLXVwJyB9XG5cbiAgICAjIE5hdmlnYXRpb24gS2V5c1xuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnUEdVUCcsIGtleWNvZGU6IDU3IH1cbiAgICB7IHJvdzogJ25hdl9yMCcsIGtleTogJ1BHRE4nLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdFTkQnLCBrZXljb2RlOiA1NyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdIT01FJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnTEVGVC1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi1sZWZ0JyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdVUC1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi11cCcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnRE9XTi1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi1kb3duJyB9XG4gICAgeyByb3c6ICduYXZfcjAnLCBrZXk6ICdSSUdIVC1BUlJPVycsIGtleWNvZGU6IDU3LCBpY29uOiAnZmEtY2hldnJvbi1yaWdodCcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnSU5TJywga2V5Y29kZTogNTcgfVxuICAgIHsgcm93OiAnbmF2X3IwJywga2V5OiAnREVMJywga2V5Y29kZTogNDYgfVxuXG5dXG5cbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHIwKSB7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbigpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tcm93IHctMTAwXFxcIj5cIik7XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7XG59O1xuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxidXR0b25cIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleWNvZGVcIiwgb3B0cy5rZXljb2RlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1jbGljaz1cXFwia2V5XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEta2V5XCIsIG9wdHMua2V5LCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnYnRuJywnYnRuLW91dGxpbmUtbGlnaHQnLCdrZXlib2FyZC0ta2V5JyxvcHRzLmNzc10sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxvcHRzLmljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBvcHRzLmtleSAmJiBvcHRzLnNoaWZ0X2tleSAmJiAhb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlIGlmICggb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbn1cbmJ1Zi5wdXNoKFwiPC9idXR0b24+XCIpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwia2V5Ym9hcmQtLWJvZHlcXFwiPlwiKTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjBcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjA7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpO30uY2FsbCh0aGlzLFwicjBcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIwOnR5cGVvZiByMCE9PVwidW5kZWZpbmVkXCI/cjA6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAocjAsIHIxLCByMiwgcjMsIHI0KSB7XG5qYWRlX21peGluc1tcImtleWJvYXJkUm93XCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbigpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJrZXlib2FyZC0tcm93IHctMTAwXFxcIj5cIik7XG5ibG9jayAmJiBibG9jaygpO1xuYnVmLnB1c2goXCI8L2Rpdj5cIik7XG59O1xuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxidXR0b25cIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleWNvZGVcIiwgb3B0cy5rZXljb2RlLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS1jbGljaz1cXFwia2V5XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEta2V5XCIsIG9wdHMua2V5LCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFsnYnRuJywnYnRuLW91dGxpbmUtbGlnaHQnLCdrZXlib2FyZC0ta2V5JyxvcHRzLmNzc10sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxvcHRzLmljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBvcHRzLmtleSAmJiBvcHRzLnNoaWZ0X2tleSAmJiAhb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwic2hpZnRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlIGlmICggb3B0cy5hbHBoYSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5zaGlmdF9rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGxhaW5cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy5rZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbn1cbmJ1Zi5wdXNoKFwiPC9idXR0b24+XCIpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwia2V5Ym9hcmQtLWJvZHlcXFwiPlwiKTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjRcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjQ7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjJcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjI7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjFcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjE7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRSb3dcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbi8vIGl0ZXJhdGUgcjBcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcjA7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2V5ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJrZXlib2FyZEtleVwiXShrZXkpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG59KTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpO30uY2FsbCh0aGlzLFwicjBcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIwOnR5cGVvZiByMCE9PVwidW5kZWZpbmVkXCI/cjA6dW5kZWZpbmVkLFwicjFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIxOnR5cGVvZiByMSE9PVwidW5kZWZpbmVkXCI/cjE6dW5kZWZpbmVkLFwicjJcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIyOnR5cGVvZiByMiE9PVwidW5kZWZpbmVkXCI/cjI6dW5kZWZpbmVkLFwicjNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnIzOnR5cGVvZiByMyE9PVwidW5kZWZpbmVkXCI/cjM6dW5kZWZpbmVkLFwicjRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnI0OnR5cGVvZiByNCE9PVwidW5kZWZpbmVkXCI/cjQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoY29sLCByMCwgcjEsIHIyLCByMywgcjQsIHVuZGVmaW5lZCkge1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24oKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwia2V5Ym9hcmQtLXJvdyB3LTEwMFxcXCI+XCIpO1xuYmxvY2sgJiYgYmxvY2soKTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpO1xufTtcbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8YnV0dG9uXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1rZXljb2RlXCIsIG9wdHMua2V5Y29kZSwgdHJ1ZSwgZmFsc2UpKSArIFwiIGRhdGEtY2xpY2s9XFxcImtleVxcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLWtleVwiLCBvcHRzLmtleSwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmNscyhbJ2J0bicsJ2J0bi1vdXRsaW5lLWxpZ2h0Jywna2V5Ym9hcmQtLWtleScsb3B0cy5jc3NdLCBbbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggb3B0cy5pY29uKVxue1xuYnVmLnB1c2goXCI8aVwiICsgKGphZGUuY2xzKFsnZmEnLCdmYS1mdycsb3B0cy5pY29uXSwgW251bGwsbnVsbCx0cnVlXSkpICsgXCI+PC9pPlwiKTtcbn1cbmVsc2VcbntcbmlmICggb3B0cy5rZXkgJiYgb3B0cy5zaGlmdF9rZXkgJiYgIW9wdHMuYWxwaGEpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInNoaWZ0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmtleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xufVxuZWxzZSBpZiAoIG9wdHMuYWxwaGEpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMuc2hpZnRfa2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBsYWluXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMua2V5KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG59XG59XG5idWYucHVzaChcIjwvYnV0dG9uPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImtleWJvYXJkLS1ib2R5XFxcIj48ZGl2IGNsYXNzPVxcXCJkLWZsZXggZmxleC1yb3dcXFwiPjxkaXYgY2xhc3M9XFxcImQtZmxleCBmbGV4LWNvbHVtblxcXCI+XCIpO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByNFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByNDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByM1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMlxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMjtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuamFkZV9taXhpbnNbXCJrZXlib2FyZFJvd1wiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuLy8gaXRlcmF0ZSByMFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSByMDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbn0pO1xuYnVmLnB1c2goXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJkLWZsZXggZmxleC1jb2x1bW5cXFwiPlwiKTtcbi8vIGl0ZXJhdGUgY29sXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGNvbDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wia2V5Ym9hcmRLZXlcIl0oa2V5KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrZXkgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImtleWJvYXJkS2V5XCJdKGtleSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiY29sXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jb2w6dHlwZW9mIGNvbCE9PVwidW5kZWZpbmVkXCI/Y29sOnVuZGVmaW5lZCxcInIwXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMDp0eXBlb2YgcjAhPT1cInVuZGVmaW5lZFwiP3IwOnVuZGVmaW5lZCxcInIxXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMTp0eXBlb2YgcjEhPT1cInVuZGVmaW5lZFwiP3IxOnVuZGVmaW5lZCxcInIyXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMjp0eXBlb2YgcjIhPT1cInVuZGVmaW5lZFwiP3IyOnVuZGVmaW5lZCxcInIzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yMzp0eXBlb2YgcjMhPT1cInVuZGVmaW5lZFwiP3IzOnVuZGVmaW5lZCxcInI0XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yNDp0eXBlb2YgcjQhPT1cInVuZGVmaW5lZFwiP3I0OnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChuYXZJdGVtcywgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1sZy04IGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj5cIik7XG4vLyBpdGVyYXRlIG5hdkl0ZW1zXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IG5hdkl0ZW1zO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBzdHlsZT1cXFwiZmxleC1ncm93OjE7XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEtdHJpZ2dlclwiLCBuYXZJdGVtLnRyaWdnZXIsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwiZC1mbGV4IGJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkgYnRuLXNtIGp1c3RpZnktY29udGVudC1jZW50ZXIgbXgtM1xcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBuYXZJdGVtLnRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYnV0dG9uPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIG5hdkl0ZW0udHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBidG4tc20ganVzdGlmeS1jb250ZW50LWNlbnRlciBteC0zXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48aHIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiY29udGVudFxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwibmF2SXRlbXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm5hdkl0ZW1zOnR5cGVvZiBuYXZJdGVtcyE9PVwidW5kZWZpbmVkXCI/bmF2SXRlbXM6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIk1hY3JvRXhhbXBsZXMgPSByZXF1aXJlKCcuL2V4YW1wbGVzJylcblxuIyAjICMgIyAjXG5cbmNoYXJNYXAgPSB7XG5cbiAgIyBMb3dlcmNhc2VcbiAgJ2EnOiAgNFxuICAnYic6ICA1XG4gICdjJzogIDZcbiAgJ2QnOiAgN1xuICAnZSc6ICA4XG4gICdmJzogIDlcbiAgJ2cnOiAxMFxuICAnaCc6IDExXG4gICdpJzogMTJcbiAgJ2onOiAxM1xuICAnayc6IDE0XG4gICdsJzogMTVcbiAgJ20nOiAxNlxuICAnbic6IDE3XG4gICdvJzogMThcbiAgJ3AnOiAxOVxuICAncSc6IDIwXG4gICdyJzogMjFcbiAgJ3MnOiAyMlxuICAndCc6IDIzXG4gICd1JzogMjRcbiAgJ3YnOiAyNVxuICAndyc6IDI2XG4gICd4JzogMjdcbiAgJ3knOiAyOFxuICAneic6IDI5XG5cbn1cblxuIyAjICMgIyAjXG5cbiMgTWFjcm9Nb2RlbCBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBNYWNyb01vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6XG4gICAgb3JkZXI6IDBcbiAgICBwb3NpdGlvbjogMFxuICAgIHNoaWZ0ZWQ6IGZhbHNlXG5cbiAgZ2V0S2V5RGF0YTogLT5cblxuICAgIGRhdGEgPSBbXVxuXG4gICAgYXR0cnMgPSBfLmNsb25lKEBhdHRyaWJ1dGVzKVxuXG4gICAgIyBjb25zb2xlLmxvZyBhdHRyc1xuXG4gICAgIyBBY3Rpb25UeXBlXG4gICAgIyBQcmVzcyAgID0gMSwgS0VZIFZBTFVFXG4gICAgIyBSZWxlYXNlID0gMiwgS0VZIFZBTFVFXG5cbiAgICAjIEtFWSBET1dOICYgS0VZIFVQXG4gICAgaWYgYXR0cnMucG9zaXRpb24gPT0gMFxuICAgICAgZGF0YS5wdXNoKDEpXG4gICAgICBkYXRhLnB1c2goY2hhck1hcFthdHRycy5rZXldIHx8IDQpXG5cbiAgICAgIGRhdGEucHVzaCgyKVxuICAgICAgZGF0YS5wdXNoKGNoYXJNYXBbYXR0cnMua2V5XSB8fCA0KVxuXG4gICAgIyBLRVkgRE9XTlxuICAgIGlmIGF0dHJzLnBvc2l0aW9uID09IC0xXG4gICAgICBkYXRhLnB1c2goMSlcbiAgICAgIGRhdGEucHVzaChjaGFyTWFwW2F0dHJzLmtleV0gfHwgNClcblxuICAgICMgS0VZIFVQXG4gICAgaWYgYXR0cnMucG9zaXRpb24gPT0gMVxuICAgICAgZGF0YS5wdXNoKDIpXG4gICAgICBkYXRhLnB1c2goY2hhck1hcFthdHRycy5rZXldIHx8IDQpXG5cbiAgICByZXR1cm4gZGF0YVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9Db2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogTWFjcm9Nb2RlbFxuICBjb21wYXJhdG9yOiAnb3JkZXInXG5cbiAgIyBsb2FkRXhhbXBsZVxuICAjIFJlc2V0cyB0aGUgY29sbGVjdGlvbiB0byBvbmUgb2YgdGhlIGV4YW1wbGVzXG4gIGxvYWRFeGFtcGxlOiAoZXhhbXBsZV9pZCkgLT5cblxuICAgICMgUmVzZXRzIHRoZSBjb2xsZWN0aW9uIHdpdGggdGhlIGRhdGEgZGVmaW5lZCBpbiB0aGUgRXhhbXBsZXMgb2JqZWN0XG4gICAgQHJlc2V0KE1hY3JvRXhhbXBsZXNbZXhhbXBsZV9pZF0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1vZGVsOiAgICAgIE1hY3JvTW9kZWxcbiAgQ29sbGVjdGlvbjogTWFjcm9Db2xsZWN0aW9uXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiSFwiLFxuICAgIFwia2V5Y29kZVwiOiA3MixcbiAgICBcIm9yZGVyXCI6IDIsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDNcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDQsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkxcIixcbiAgICBcImtleWNvZGVcIjogNzYsXG4gICAgXCJvcmRlclwiOiA1LFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJMXCIsXG4gICAgXCJrZXljb2RlXCI6IDc2LFxuICAgIFwib3JkZXJcIjogNixcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiT1wiLFxuICAgIFwia2V5Y29kZVwiOiA3OSxcbiAgICBcIm9yZGVyXCI6IDcsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiA4XG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIjFcIixcbiAgICBcInNoaWZ0XCI6IFwiIVwiLFxuICAgIFwia2V5Y29kZVwiOiA0OSxcbiAgICBcIm9yZGVyXCI6IDksXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDEwXG4gIH1cbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJrZXlcIjogXCJSXCIsXG4gICAgXCJrZXljb2RlXCI6IDgyLFxuICAgIFwib3JkZXJcIjogMSxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDIsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNcIixcbiAgICBcImtleWNvZGVcIjogODMsXG4gICAgXCJvcmRlclwiOiAzLFxuICAgIFwicG9zaXRpb25cIjogMFxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJVXCIsXG4gICAgXCJrZXljb2RlXCI6IDg1LFxuICAgIFwib3JkZXJcIjogNCxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiTVwiLFxuICAgIFwia2V5Y29kZVwiOiA3NyxcbiAgICBcIm9yZGVyXCI6IDUsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIkFMVFwiLFxuICAgIFwia2V5Y29kZVwiOiAxOCxcbiAgICBcInBvc2l0aW9uXCI6IC0xLFxuICAgIFwib3JkZXJcIjogNlxuICB9LFxuICB7XG4gICAgXCJrZXlcIjogXCJgXCIsXG4gICAgXCJzaGlmdFwiOiBcIn5cIixcbiAgICBcImtleWNvZGVcIjogMTkyLFxuICAgIFwib3JkZXJcIjogNyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDhcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiRVwiLFxuICAgIFwia2V5Y29kZVwiOiA2OSxcbiAgICBcIm9yZGVyXCI6IDksXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH1cbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgXCJrZXlcIjogXCJBTFRcIixcbiAgICBcImtleWNvZGVcIjogMTgsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiU0hJRlRcIixcbiAgICBcImtleWNvZGVcIjogMTYsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDJcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiLVwiLFxuICAgIFwic2hpZnRcIjogXCJfXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4OSxcbiAgICBcIm9yZGVyXCI6IDMsXG4gICAgXCJwb3NpdGlvblwiOiAwXG4gIH0sXG4gIHtcbiAgICBcImtleVwiOiBcIlNISUZUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE2LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDRcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDVcbiAgfVxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBcImtleVwiOiBcIkNUUkxcIixcbiAgICBcImtleWNvZGVcIjogMTcsXG4gICAgXCJwb3NpdGlvblwiOiAtMSxcbiAgICBcIm9yZGVyXCI6IDFcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogLTEsXG4gICAgXCJvcmRlclwiOiAyXG4gIH0sXG4gIHtcbiAgICBcInJvd1wiOiBcIm5hdl9yMFwiLFxuICAgIFwia2V5XCI6IFwiREVMXCIsXG4gICAgXCJrZXljb2RlXCI6IDQ2LFxuICAgIFwib3JkZXJcIjogMyxcbiAgICBcInBvc2l0aW9uXCI6IDBcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQUxUXCIsXG4gICAgXCJrZXljb2RlXCI6IDE4LFxuICAgIFwicG9zaXRpb25cIjogMSxcbiAgICBcIm9yZGVyXCI6IDRcbiAgfSxcbiAge1xuICAgIFwia2V5XCI6IFwiQ1RSTFwiLFxuICAgIFwia2V5Y29kZVwiOiAxNyxcbiAgICBcInBvc2l0aW9uXCI6IDEsXG4gICAgXCJvcmRlclwiOiA1XG4gIH1cbl1cbiIsIlxuIyBFeHBvcnRzIGFuIG9iamVjdCBkZWZpbmluZyB0aGUgZXhhbXBsZSBtYWNyb3Ncbm1vZHVsZS5leHBvcnRzID0ge1xuICBleF8wMTogcmVxdWlyZSgnLi9leGFtcGxlXzEnKVxuICBleF8wMjogcmVxdWlyZSgnLi9leGFtcGxlXzInKVxuICBleF8wMzogcmVxdWlyZSgnLi9leGFtcGxlXzMnKVxuICBleF8wNDogcmVxdWlyZSgnLi9leGFtcGxlXzQnKVxufVxuIiwiTGF5b3V0VmlldyAgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyAjICMgIyAjXG5cbmNsYXNzIERhc2hib2FyZFJvdXRlIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGUnXG5cbiAgdGl0bGU6ICdBc3Ryb0tleSBXZWInXG5cbiAgYnJlYWRjcnVtYnM6IFt7IHRleHQ6ICdEZXZpY2UnIH1dXG5cbiAgZmV0Y2g6IC0+XG4gICAgQGRldmljZSA9IFJhZGlvLmNoYW5uZWwoJ2RldmljZScpLnJlcXVlc3QoJ21vZGVsJywgJ2RldmljZV8xJylcblxuICByZW5kZXI6IC0+XG4gICAgQGNvbnRhaW5lci5zaG93IG5ldyBMYXlvdXRWaWV3KHsgbW9kZWw6IEBkZXZpY2UgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRGFzaGJvYXJkUm91dGVcbiIsIktleVNlbGVjdG9yID0gcmVxdWlyZSgnLi9rZXlTZWxlY3RvcicpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VTdGF0dXNWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9kZXZpY2Vfc3RhdHVzJ1xuICBjbGFzc05hbWU6ICdyb3cnXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuXG4gICAgc3RhdHVzID0ge1xuICAgICAgdGV4dDogJ05vdCBDb25uZWN0ZWQnXG4gICAgICBjc3M6ICAnYmFkZ2UtZGVmYXVsdCdcbiAgICB9XG5cbiAgICAjIENvbm5lY3RlZFxuICAgIGlmIEBtb2RlbC5nZXQoJ3N0YXR1c19jb2RlJykgPT0gMVxuXG4gICAgICBzdGF0dXMgPSB7XG4gICAgICAgIHRleHQ6ICdDb25uZWN0ZWQnXG4gICAgICAgIGNzczogJ2JhZGdlLXN1Y2Nlc3MnXG4gICAgICB9XG5cbiAgICByZXR1cm4geyBzdGF0dXM6IHN0YXR1cyB9XG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEZXZpY2VMYXlvdXQgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdydcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2RldmljZV9sYXlvdXQnKVxuXG4gIHJlZ2lvbnM6XG4gICAgIyBzdGF0dXNSZWdpb246ICdbZGF0YS1yZWdpb249c3RhdHVzXSdcbiAgICBrZXlzUmVnaW9uOiAgICdbZGF0YS1yZWdpb249a2V5c10nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBbZGF0YS1jbGljaz1jb25uZWN0XSc6ICdjb25uZWN0VG9EZXZpY2UnXG5cbiAgY29ubmVjdFRvRGV2aWNlOiAtPlxuICAgIFJhZGlvLmNoYW5uZWwoJ3VzYicpLnJlcXVlc3QoJ2RldmljZXMnKS50aGVuIChkKSA9PiBAcmVuZGVyKClcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAgaWYgd2luZG93LmRcbiAgICAgIHJldHVybiB7IGNvbm5lY3RlZDogdHJ1ZSB9XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHsgY29ubmVjdGVkOiBmYWxzZSB9XG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEluc3RhbnRpYXRlcyBuZXcgS2V5U2VsZWN0b3IgVmlld1xuICAgIGtleVNlbGVjdG9yID0gbmV3IEtleVNlbGVjdG9yKHsgY29sbGVjdGlvbjogQG1vZGVsLmdldCgna2V5cycpIH0pXG4gICAga2V5U2VsZWN0b3Iub24gJ2NoaWxkdmlldzpzZWxlY3RlZCcsICh2aWV3KSA9PiBAdHJpZ2dlcigna2V5OnNlbGVjdGVkJywgdmlldy5tb2RlbClcbiAgICBrZXlTZWxlY3Rvci5vbiAnY2hpbGR2aWV3OmRlc2VsZWN0ZWQnLCAodmlldykgPT4gQHRyaWdnZXIoJ2tleTpkZXNlbGVjdGVkJylcbiAgICBAa2V5c1JlZ2lvbi5zaG93KGtleVNlbGVjdG9yKVxuXG4gICAgIyBTdGF0dXMgVmlld1xuICAgICMgVE9ETyAtIHN0YXR1cyAmIGNvbm5lY3Rpb24gdmlld1xuICAgICMgQHN0YXR1c1JlZ2lvbi5zaG93IG5ldyBEZXZpY2VTdGF0dXNWaWV3KHsgbW9kZWw6IEBtb2RlbCB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBEZXZpY2VMYXlvdXRcblxuXG4iLCJTaW1wbGVOYXYgPSByZXF1aXJlICdsaWIvdmlld3Mvc2ltcGxlX25hdidcblxuIyAjICMgIyAjXG5cbmNsYXNzIEVkaXRvclNlbGVjdG9yIGV4dGVuZHMgU2ltcGxlTmF2XG4gIGNsYXNzTmFtZTogJ3JvdyBoLTEwMCdcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2VkaXRvcl9zZWxlY3RvcicpXG5cbiAgbmF2SXRlbXM6IFtcbiAgICB7IGljb246ICdmYS1rZXlib2FyZC1vJywgIHRleHQ6ICdNYWNybycsICB0cmlnZ2VyOiAnbWFjcm8nIH1cbiAgICB7IGljb246ICdmYS1maWxlLXRleHQtbycsIHRleHQ6ICdUZXh0JywgICB0cmlnZ2VyOiAndGV4dCcgfVxuICAgICMgeyBpY29uOiAnZmEtYXN0ZXJpc2snLCAgICB0ZXh0OiAnS2V5JywgICAgdHJpZ2dlcjogJ2tleScgfVxuICBdXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgY29uZmlnTW9kZWwgPSBAbW9kZWwuZ2V0KCdjb25maWcnKVxuICAgIHRyaWdnZXIgPSBjb25maWdNb2RlbC5nZXQoJ3R5cGUnKVxuICAgIHJldHVybiBAJChcIltkYXRhLXRyaWdnZXI9I3t0cmlnZ2VyfV1cIikuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgb25OYXZpZ2F0ZU1hY3JvOiAtPlxuICAgIEB0cmlnZ2VyICdzaG93Om1hY3JvOmVkaXRvcidcblxuICBvbk5hdmlnYXRlVGV4dDogLT5cbiAgICBAdHJpZ2dlciAnc2hvdzp0ZXh0OmVkaXRvcidcblxuICBvbk5hdmlnYXRlS2V5OiAtPlxuICAgIEB0cmlnZ2VyICdzaG93OmtleTplZGl0b3InXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvclNlbGVjdG9yXG4iLCJUZXh0RWRpdG9yID0gcmVxdWlyZSgnLi90ZXh0RWRpdG9yJylcbk1hY3JvRWRpdG9yID0gcmVxdWlyZSgnLi9tYWNyb0VkaXRvcicpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBFZGl0b3JXcmFwcGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9lZGl0b3Jfd3JhcHBlcidcbiAgY2xhc3NOYW1lOiAncm93J1xuXG4gIHJlZ2lvbnM6XG4gICAgY29udGVudFJlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1jb250ZW50XSdcblxuICB1aTpcbiAgICByZWNvcmRCdG46ICdbZGF0YS1jbGljaz1yZWNvcmRdJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgW2RhdGEtY2xpY2s9c2F2ZV0nOiAgICAnb25TYXZlJ1xuICAgICdjbGljayBbZGF0YS1jbGljaz1jbGVhcl0nOiAgICdvbkNsZWFyJ1xuICAgICdjbGljayBbZGF0YS1jbGljaz1jYW5jZWxdJzogICdvbkNhbmNlbCdcbiAgICAnY2xpY2sgW2RhdGEtZXhhbXBsZV0nOiAgICAgICAnbG9hZEV4YW1wbGUnXG4gICAgJ2NsaWNrIEB1aS5yZWNvcmRCdG4nOiAgICAgICAgJ3RvZ2dsZVJlY29yZCdcblxuICBlZGl0b3JzOlxuICAgIG1hY3JvOiAgTWFjcm9FZGl0b3JcbiAgICB0ZXh0OiAgIFRleHRFZGl0b3JcbiAgICBrZXk6ICAgIE1hY3JvRWRpdG9yXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIEZldGNoZXMgdGhlIEVkaXRvclZpZXcgcHJvdG90eXBlXG4gICAgRWRpdG9yVmlldyA9IEBlZGl0b3JzW0BvcHRpb25zLmVkaXRvcl1cblxuICAgICMgSXNvbGF0ZXMgQ29uZmlnXG4gICAgY29uZmlnID0gQG1vZGVsLmdldCgnY29uZmlnJylcblxuICAgICMgQ2FjaGVzIHRoZSBjdXJyZW50IGNvbmZpZ3VyYXRpb24gdG8gYmUgcmVzdG9yZWQgd2hlbiB0aGlzIHZpZXcgaXMgY2FuY2VsbGVkIG91dFxuICAgIEBjYWNoZWRDb25maWcgPSBjb25maWcudG9KU09OKClcblxuICAgICMgSXNvbGF0ZXMgTWFjcm9Db2xsZWN0aW9uXG4gICAgQG1hY3JvcyA9IGNvbmZpZy5nZXQoJ21hY3JvcycpXG5cbiAgICB3aW5kb3cubWFjcm9zID0gQG1hY3JvcyAjIFRPRE8gLSByZW1vdmVcblxuICAgICMgUmVxdWVzdHMgS2V5Q29sbGVjdGlvbiBmcm9tIHRoZSBLZXlGYWN0b3J5XG4gICAga2V5cyA9IFJhZGlvLmNoYW5uZWwoJ2tleScpLnJlcXVlc3QoJ2NvbGxlY3Rpb24nKVxuXG4gICAgIyBJbnN0YW50aWF0ZXMgbmV3IEVkaXRvclZpZXcgaW5zdGFuY2VcbiAgICBAZWRpdG9yVmlldyA9IG5ldyBFZGl0b3JWaWV3KHsgbW9kZWw6IGNvbmZpZywga2V5czoga2V5cywgbWFjcm9zOiBAbWFjcm9zIH0pXG5cbiAgICAjIExpc3RlbnMgZm9yICdzdG9wOnJlY29yZGluZycgZXZlbnRcbiAgICBAZWRpdG9yVmlldy5vbiAnc3RvcDpyZWNvcmRpbmcnLCA9PiBAdG9nZ2xlUmVjb3JkKClcblxuICAgICMgU2hvd3MgdGhlIHZpZXcgaW4gQGNvbnRlbnRSZWdpb25cbiAgICBAY29udGVudFJlZ2lvbi5zaG93IEBlZGl0b3JWaWV3XG5cbiAgIyBvbkNsZWFyXG4gICMgRW1wdGllcyB0aGUgTWFjcm9Db2xsZWN0aW9uXG4gICMgVE9ETyAtIHVuZG8gYnV0dG9uP1xuICBvbkNsZWFyOiAtPlxuXG4gICAgIyBTdG9wcyBSZWNvcmRpbmdcbiAgICBAc3RvcFJlY29yZGluZygpXG5cbiAgICAjIEVtcHRpZXMgdGhlIE1hY3JvQ29sbGVjdGlvblxuICAgIEBtYWNyb3MucmVzZXQoKVxuICAgIHJldHVyblxuXG4gICMgb25TYXZlXG4gIG9uU2F2ZTogLT5cblxuICAgICMgU3RvcHMgUmVjb3JkaW5nXG4gICAgQHN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyBTZXJpYWxpemVzIGRhdGEgZnJvbSBhbnkgZm9ybSBlbGVtZW50cyBpbiB0aGlzIHZpZXdcbiAgICBkYXRhID0gQmFja2JvbmUuU3lwaG9uLnNlcmlhbGl6ZShAKVxuXG4gICAgIyBDbGVhciB1bnVzZWQgdHlwZS1zcGVjaWZpYyBhdHRyaWJ1dGVzXG4gICAgZGF0YS5tYWNyb3MgPSBbXSBpZiBkYXRhLnR5cGUgIT0gJ21hY3JvJ1xuICAgIGRhdGEudGV4dF92YWx1ZSA9ICcnIGlmIGRhdGEudHlwZSAhPSAndGV4dCdcblxuICAgICMgQXBwbGllcyB0aGUgYXR0cmlidXRlcyB0byB0aGUgY29uZmlnIG1vZGVsXG4gICAgQG1vZGVsLmdldCgnY29uZmlnJykuc2V0KGRhdGEpXG5cbiAgICAjIFRyaWdnZXJzIGNoYW5nZSBldmVudCBvbiBAbW9kZWwgdG8gcmUtcmVuZGVyIHRoZSBjdXJyZW50bHkgaGlkZGVuIEFzdHJvS2V5IGVsZW1lbnRcbiAgICBAbW9kZWwudHJpZ2dlcignY29uZmlnOnVwZGF0ZWQnKVxuXG4gICAgIyBTRU5EUyBUTyBERVZJQ0UgKElGIEFWQUlMQUJMRSlcbiAgICAjIFRPRE8gLSB0aGlzIGlzIGEgSEFDS0tLS0tLS1xuICAgICMgaWYgd2luZG93LmRcbiAgICBpZiB0cnVlICMgVE9ETyAtIHJlbW92ZSB0cnVlXG5cbiAgICAgIGNvbnNvbGUubG9nICdIQVMgREVWSUNFIC0gU0VORCBUTyBERVZJQ0UnXG5cbiAgICAgIGNvbnNvbGUubG9nIEBtb2RlbFxuICAgICAgY29uc29sZS5sb2cgQG1vZGVsLmdldCgnb3JkZXInKVxuXG4gICAgICAjIEdldHMgdGhlIG1hY3JvSW5kZXhcbiAgICAgIG1hY3JvSW5kZXggPSBAbW9kZWwuZ2V0KCdvcmRlcicpXG5cbiAgICAgICMgY29uc29sZS5sb2cgQG1hY3Jvcy50b0pTT04oKVxuXG4gICAgICAjIERhdGEgZm9yIGFycmF5IGJ1ZmZlclxuICAgICAgZGF0YSA9IFtdXG5cbiAgICAgICMgSXRlcmF0ZXMgb3ZlciBlYWNoIG1hY3JvXG4gICAgICBfLmVhY2goQG1hY3Jvcy5tb2RlbHMsIChtYWNybykgPT5cbiAgICAgICAgY29uc29sZS5sb2cgJ0VBQ0ggTUFDUk8nXG4gICAgICAgIGNvbnNvbGUubG9nIG1hY3JvLmdldEtleURhdGEoKVxuICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQobWFjcm8uZ2V0S2V5RGF0YSgpKVxuICAgICAgKVxuXG4gICAgICBjb25zb2xlLmxvZyBkYXRhXG5cbiAgICAgICMgd0luZGV4IC0gUmVxdWVzdCB0eXBlICgweDAxIGZvciBzZXQgbWFjcm8pXG4gICAgICAjIHdWYWx1ZSAtIE1hY3JvIGluZGV4ICgwIC0gNCBpbmNsdXNpdmUpXG4gICAgICAjIGJSZXF1ZXN0IC0gMyAoaGFyZGNvZGVkKVxuICAgICAgIyB3TGVuZ3RoIC0gbnVtYmVyIG9mIGJ5dGVzIChzaG91bGQgYmUgbWFjcm8gbGVuZ3RoICogMilcblxuICAgICAgcmV0dXJuIEB0cmlnZ2VyKCdzYXZlJykgdW5sZXNzIHdpbmRvdy5kXG5cbiAgICAgIHJlcXVlc3RPYmogPSB7XG4gICAgICAgICAgJ3JlcXVlc3RUeXBlJzogJ3ZlbmRvcicsXG4gICAgICAgICAgJ3JlY2lwaWVudCc6ICdkZXZpY2UnLFxuICAgICAgICAgICdyZXF1ZXN0JzogMHgwMyxcbiAgICAgICAgICAndmFsdWUnOiBtYWNyb0luZGV4LFxuICAgICAgICAgICdpbmRleCc6IDB4MDFcbiAgICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyByZXF1ZXN0T2JqXG5cbiAgICAgIGQuY29udHJvbFRyYW5zZmVySW4ocmVxdWVzdE9iaiwgbmV3IFVpbnQ4QXJyYXkoZGF0YSkuYnVmZmVyKS50aGVuIChyZXNwb25zZSkgPT5cbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgIHJldHVybiBAdHJpZ2dlciAnc2F2ZSdcblxuICAgIGVsc2VcblxuICAgICAgIyBUcmlnZ2VycyAnc2F2ZScgZXZlbnQsIGNsb3NpbmcgdGhpcyB2aWV3XG4gICAgICAjIFRPRE8gLSB0aGlzIGlzIGR1bW15XG4gICAgICByZXR1cm4gQHRyaWdnZXIgJ3NhdmUnXG5cbiAgIyBvbkNhbmNlbFxuICBvbkNhbmNlbDogLT5cblxuICAgICMgU3RvcHMgUmVjb3JkaW5nXG4gICAgQHN0b3BSZWNvcmRpbmcoKVxuXG4gICAgIyBSZXNldHMgY29uZmlnIGF0dHJpYnV0ZXNcbiAgICBAbW9kZWwuZ2V0KCdjb25maWcnKS5zZXQoQGNhY2hlZENvbmZpZylcblxuICAgICMgVHJpZ2dlcnMgJ2NhbmNlbCcgZXZlbnQsIGNsb3NpbmcgdGhpcyB2aWV3XG4gICAgcmV0dXJuIEB0cmlnZ2VyICdjYW5jZWwnXG5cbiAgIyBsb2FkRXhhbXBsZVxuICAjIEVtcHRpZXMgb3V0IHRoZSBNYWNyb0NvbGxlY2lvbiBhbmQgbG9hZHMgYW4gZXhhbXBsZSBtYWNyb1xuICBsb2FkRXhhbXBsZTogKGUpIC0+XG5cbiAgICAjIFN0b3BzIFJlY29yZGluZ1xuICAgIEBzdG9wUmVjb3JkaW5nKClcblxuICAgICMgQ2FjaGVzIGNsaWNrZWQgZWxcbiAgICBlbCA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuXG4gICAgIyBHZXRzIHRoZSBJRCBvZiB0aGUgZXhhbXBsZSB0byBsb2FkXG4gICAgZXhhbXBsZV9pZCA9IGVsLmRhdGEoJ2V4YW1wbGUnKVxuXG4gICAgIyBJbnZva2VzIHRoZSBsb2FkRXhhbXBsZSBtZXRob2Qgb24gdGhlIE1hY3JvQ29sbGVjdGlvblxuICAgIHJldHVybiBAbWFjcm9zLmxvYWRFeGFtcGxlKGV4YW1wbGVfaWQpXG5cbiAgIyB0b2dnbGVSZWNvcmRcbiAgIyBUb2dnbGVzIHdldGhlciBvciBub3QgdGhlIHVzZXIncyBrZXlib2FyZCBpcyByZWNvcmRpbmcga2V5c3Ryb2tlc1xuICB0b2dnbGVSZWNvcmQ6IChlKSAtPlxuICAgIHJldHVybiBAc3RvcFJlY29yZGluZygpIGlmIEBpc1JlY29yZGluZ1xuICAgIEBzdGFydFJlY29yZGluZygpXG5cbiAgIyBzdG9wUmVjb3JkaW5nXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG5cbiAgICAjIFNldHMgQGlzUmVjb3JkaW5nIGZsYWdcbiAgICBAaXNSZWNvcmRpbmcgPSBmYWxzZVxuXG4gICAgIyBVcGRhdGVzIHRoZSBFZGl0b3JWaWV3IGluc3RhbmNlIHRvIGlnbm9yZSBrZXlib2FyZCBpbnB1dFxuICAgIEBlZGl0b3JWaWV3LmtleWJvYXJkU2VsZWN0b3I/LmN1cnJlbnQuc3RvcFJlY29yZGluZygpXG5cbiAgICAjIFVwZGF0ZXMgdGhlIEB1aS5yZWNvcmRCdG4gZWxlbWVudFxuICAgIEB1aS5yZWNvcmRCdG4ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoJ2knKS5yZW1vdmVDbGFzcygnZmEtc3BpbiBmYS1jaXJjbGUtby1ub3RjaCcpLmFkZENsYXNzKCdmYS1jaXJjbGUnKVxuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG5cbiAgICAjIEVtcHR5IG1hY3Jvc1xuICAgIEBtYWNyb3MucmVzZXQoKVxuXG4gICAgIyBTZXRzIEBpc1JlY29yZGluZyBmbGFnXG4gICAgQGlzUmVjb3JkaW5nID0gdHJ1ZVxuXG4gICAgIyBVcGRhdGVzIHRoZSBFZGl0b3JWaWV3IGluc3RhbmNlIHRvIGFsbG93IGtleWJvYXJkIGlucHV0XG4gICAgQGVkaXRvclZpZXcua2V5Ym9hcmRTZWxlY3Rvcj8uY3VycmVudC5zdGFydFJlY29yZGluZygpXG5cbiAgICAjIFVwZGF0ZXMgdGhlIEB1aS5yZWNvcmRCdG4gZWxlbWVudFxuICAgIEB1aS5yZWNvcmRCdG4uYWRkQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoJ2knKS5hZGRDbGFzcygnZmEtc3BpbiBmYS1jaXJjbGUtby1ub3RjaCcpLnJlbW92ZUNsYXNzKCdmYS1jaXJjbGUnKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JXcmFwcGVyXG5cblxuXG4iLCJcbmNsYXNzIEtleUNoaWxkIGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0YWdOYW1lOiAnbGknXG4gIGNsYXNzTmFtZTogJ2J0biBidG4tb3V0bGluZS1saWdodCBrZXktLWNoaWxkIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBteC0yJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMva2V5X2NoaWxkJylcblxuICBiZWhhdmlvcnM6XG4gICAgU2VsZWN0YWJsZUNoaWxkOiB7IGRlc2VsZWN0OiB0cnVlIH1cblxuICBtb2RlbEV2ZW50czpcbiAgICAnY29uZmlnOnVwZGF0ZWQnOiAnb25Nb2RlbENoYW5nZSdcblxuICBvbk1vZGVsQ2hhbmdlOiAtPlxuICAgIHJldHVybiBAcmVuZGVyKClcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG5cbiAgICAjIElzb2xhdGVzIEFzdHJvS2V5Q29uZmlnIG1vZGVsXG4gICAgY29uZmlnID0gQG1vZGVsLmdldCgnY29uZmlnJylcblxuICAgICMgTWFjcm9cbiAgICBpZiBjb25maWcuZ2V0KCd0eXBlJykgPT0gJ21hY3JvJ1xuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdNYWNybycgfVxuXG4gICAgIyBUZXh0XG4gICAgaWYgY29uZmlnLmdldCgndHlwZScpID09ICd0ZXh0J1xuICAgICAgcmV0dXJuIHsgbGFiZWw6ICdUZXh0JyB9XG5cbiAgICAjIEtleVxuICAgICMgVE9ETyAtIERJU1BMQVkgS0VZIElOIFZJRVdcbiAgICBpZiBjb25maWcuZ2V0KCd0eXBlJykgPT0gJ2tleSdcbiAgICAgIHJldHVybiB7IGxhYmVsOiAnS2V5JyB9XG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlTZWxlY3RvciBleHRlbmRzIE1uLkNvbGxlY3Rpb25WaWV3XG4gIHRhZ05hbWU6ICd1bCdcbiAgY2xhc3NOYW1lOiAnbGlzdC11bnN0eWxlZCBrZXktLWxpc3QgcHgtNCBweS0zIG15LTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlciBmbGV4LXJvdydcbiAgY2hpbGRWaWV3OiBLZXlDaGlsZFxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlTZWxlY3RvclxuXG5cbiIsIkRldmljZUxheW91dCA9IHJlcXVpcmUoJy4vZGV2aWNlTGF5b3V0JylcbkVkaXRvclNlbGVjdG9yID0gcmVxdWlyZSgnLi9lZGl0b3JTZWxlY3RvcicpXG5FZGl0b3JXcmFwcGVyID0gcmVxdWlyZSgnLi9lZGl0b3JXcmFwcGVyJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEhlbHBWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9oZWxwX3ZpZXcnXG4gIGNsYXNzTmFtZTogJ3JvdydcblxuIyAjICMgIyAjXG5cbmNsYXNzIExheW91dFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2xheW91dCdcbiAgY2xhc3NOYW1lOiAnY29udGFpbmVyLWZsdWlkIGQtZmxleCBmbGV4LWNvbHVtbiB3LTEwMCBoLTEwMCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBkZXZpY2UtLWxheW91dCdcblxuICByZWdpb25zOlxuICAgIGRldmljZVJlZ2lvbjogICAnW2RhdGEtcmVnaW9uPWRldmljZV0nXG4gICAgc2VsZWN0b3JSZWdpb246ICdbZGF0YS1yZWdpb249c2VsZWN0b3JdJ1xuICAgIGVkaXRvclJlZ2lvbjogICAnW2RhdGEtcmVnaW9uPWVkaXRvcl0nXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIERpc3BsYXlzIGRlZmF1bHQgaGVscCB0ZXh0XG4gICAgQHNob3dIZWxwVmlldygpXG5cbiAgICAjIEluc3RhbnRpYXRlcyBhIG5ldyBEZXZpY2VMYXlvdXQgZm9yIGNvbm5lY3RpbmcgdG8gYW4gQXN0cm9LZXlcbiAgICAjIGFuZCBzZWxlY3Rpbmcgd2hpY2gga2V5IHRoZSB1c2VyIHdvdWxkIGxpa2UgdG8gZWRpdFxuICAgIGRldmljZVZpZXcgPSBuZXcgRGV2aWNlTGF5b3V0KHsgbW9kZWw6IEBtb2RlbCB9KVxuICAgIGRldmljZVZpZXcub24gJ2tleTpzZWxlY3RlZCcsIChrZXlNb2RlbCkgPT4gQHNob3dFZGl0b3JTZWxlY3RvcihrZXlNb2RlbClcbiAgICBkZXZpY2VWaWV3Lm9uICdrZXk6ZGVzZWxlY3RlZCcsICgpID0+IEBzaG93SGVscFZpZXcoKVxuICAgIEBkZXZpY2VSZWdpb24uc2hvdyhkZXZpY2VWaWV3KVxuXG4gICAgIyBNYWNybyBEZXZlbG9wbWVudCBoYWNrXG4gICAgQHNob3dFZGl0b3JWaWV3KEBtb2RlbC5nZXQoJ2tleXMnKS5maXJzdCgpLCAnbWFjcm8nKVxuXG4gICAgIyBAc2hvd0VkaXRvclZpZXcoKVxuXG4gIHNob3dIZWxwVmlldzogLT5cblxuICAgICMgSW5zdGFudGlhdGVzIGEgbmV3IEhlbHBWaWV3IGFuZCBzaG93cyBpdCBpbiBAc2VsZWN0b3JSZWdpb25cbiAgICBAc2VsZWN0b3JSZWdpb24uc2hvdyBuZXcgSGVscFZpZXcoKVxuXG4gIHNob3dFZGl0b3JTZWxlY3RvcjogKGtleU1vZGVsKSAtPlxuXG4gICAgIyBJbnN0YW50YWlhdGVzIG5ldyBFZGl0b3JTZWxlY3RvciB2aWV3XG4gICAgZWRpdG9yU2VsZWN0b3IgPSBuZXcgRWRpdG9yU2VsZWN0b3IoeyBtb2RlbDoga2V5TW9kZWwgfSlcblxuICAgICMgU2hvd3MgTWFjcm8gRWRpdG9yXG4gICAgZWRpdG9yU2VsZWN0b3Iub24gJ3Nob3c6bWFjcm86ZWRpdG9yJywgPT4gQHNob3dFZGl0b3JWaWV3KGtleU1vZGVsLCAnbWFjcm8nKVxuXG4gICAgIyBTaG93cyBUZXh0IEVkaXRvclxuICAgIGVkaXRvclNlbGVjdG9yLm9uICdzaG93OnRleHQ6ZWRpdG9yJywgPT4gQHNob3dFZGl0b3JWaWV3KGtleU1vZGVsLCAndGV4dCcpXG5cbiAgICAjIFNob3dzIEtleSBFZGl0b3JcbiAgICBlZGl0b3JTZWxlY3Rvci5vbiAnc2hvdzprZXk6ZWRpdG9yJywgPT4gQHNob3dFZGl0b3JWaWV3KGtleU1vZGVsLCAna2V5JylcblxuICAgICMgU2hvd3MgdGhlIEVkaXRvclNlbGVjdG9yIHZpZXdcbiAgICBAc2VsZWN0b3JSZWdpb24uc2hvdyhlZGl0b3JTZWxlY3RvcilcblxuICBzaG93RWRpdG9yVmlldzogKGtleU1vZGVsLCBlZGl0b3IpIC0+XG4gICAgQCRlbC5hZGRDbGFzcygnYWN0aXZlJylcblxuICAgICMgSW5zdGFudGlhdGVzIG5ldyBFZGl0b3JXcmFwcGVyIHZpZXdcbiAgICBlZGl0b3JXcmFwcGVyID0gbmV3IEVkaXRvcldyYXBwZXIoeyBtb2RlbDoga2V5TW9kZWwsIGVkaXRvcjogZWRpdG9yIH0pXG5cbiAgICAjIEhhbmRsZXMgJ2NhbmNlbCcgZXZlbnRcbiAgICBlZGl0b3JXcmFwcGVyLm9uICdjYW5jZWwnLCA9PlxuICAgICAgQCRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICMgSGFuZGxlcyAnc2F2ZScgZXZlbnRcbiAgICBlZGl0b3JXcmFwcGVyLm9uICdzYXZlJywgPT5cbiAgICAgICMgVE9ETyAtIGhpdCB0aGUgS2V5TW9kZWwgLyBEZXZpY2VNb2RlbCB0byBkbyB0aGUgcmVzdCBmcm9tIGhlcmVcbiAgICAgIGNvbnNvbGUubG9nICdTQVZFIEtFWSBNT0RFTCBTRVRUSU5HUyBIRVJFJ1xuICAgICAgQCRlbC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICMgU2hvd3MgdGhlIEVkaXRvcldyYXBwZXIgdmlldyBpbiBAZWRpdG9yUmVnaW9uXG4gICAgQGVkaXRvclJlZ2lvbi5zaG93KGVkaXRvcldyYXBwZXIpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IExheW91dFZpZXdcblxuXG5cbiIsIktleWJvYXJkU2VsZWN0b3IgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfc2VsZWN0b3InKVxuTWFjcm9MaXN0ID0gcmVxdWlyZSgnLi9tYWNyb0xpc3QnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFjcm9FZGl0b3IgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL21hY3JvX2VkaXRvcidcbiAgY2xhc3NOYW1lOiAncm93IGgtMTAwJ1xuXG4gIHJlZ2lvbnM6XG4gICAgbWFjcm9SZWdpb246ICAgICdbZGF0YS1yZWdpb249bWFjcm9dJ1xuICAgIGNvbnRyb2xzUmVnaW9uOiAnW2RhdGEtcmVnaW9uPWNvbnRyb2xzXSdcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgR2V0cyB0aGUgY3VycmVudCBtYWNybyBhc3NpZ25lZCB0byB0aGUga2V5TW9kZWxcbiAgICAjIG1hY3JvQ29sbGVjdGlvbiA9IGtleU1vZGVsLmdldE1hY3JvQ29sbGVjdGlvbigpXG4gICAgQG1hY3JvUmVnaW9uLnNob3cgbmV3IE1hY3JvTGlzdCh7IGNvbGxlY3Rpb246IEBvcHRpb25zLm1hY3JvcyB9KVxuXG4gICAgIyBJbnN0YW50YWlhdGVzIG5ldyBLZXlib2FyZFNlbGVjdG9yXG4gICAgIyBUT0RPIC0gdGhpcyB3aWxsICpldmVudHVhbGx5KiBkaXNwbGF5IGEgc2VsZWN0b3IgYmV0d2VlbiBkaWZmZXJlbnQgdHlwZXMgb2Yga2V5Ym9hcmRzIC8gc2V0cyBvZiBrZXlzXG4gICAgQGtleWJvYXJkU2VsZWN0b3IgPSBuZXcgS2V5Ym9hcmRTZWxlY3Rvcih7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSlcblxuICAgICMgQnViYmxlcyB1cCBzdG9wOnJlY29yZGluZyBldmVudFxuICAgIEBrZXlib2FyZFNlbGVjdG9yLm9uICdzdG9wOnJlY29yZGluZycsID0+IEB0cmlnZ2VyICdzdG9wOnJlY29yZGluZydcblxuICAgICMgSGFuZGxlcyBLZXlTZWxlY3Rpb24gZXZlbnRcbiAgICBAa2V5Ym9hcmRTZWxlY3Rvci5vbiAna2V5OnNlbGVjdGVkJywgKGtleSkgPT5cblxuICAgICAgIyBDbG9uZXMgdGhlIG9yaWdpbmFsIG9iamVjdFxuICAgICAga2V5ID0gXy5jbG9uZShrZXkpXG5cbiAgICAgICMgQWRkcyB0aGUgY29ycmVjdCBgb3JkZXJgIGF0dHJpYnV0ZVxuICAgICAga2V5Lm9yZGVyID0gQG9wdGlvbnMubWFjcm9zLmxlbmd0aCArIDFcblxuICAgICAgIyBBZGRzIHRoZSBrZXkgdG8gdGhlIE1hY3JvQ29sbGVjdGlvblxuICAgICAgQG9wdGlvbnMubWFjcm9zLmFkZChrZXkpXG5cbiAgICAjIFNob3dzIHRoZSBrZXlib2FyZFZpZXdcbiAgICBAY29udHJvbHNSZWdpb24uc2hvdyBAa2V5Ym9hcmRTZWxlY3RvclxuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG4gICAgQGtleWJvYXJkVmlldy5zdGFydFJlY29yZGluZygpXG5cbiAgIyBzdG9wUmVjb3JkaW5nXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG4gICAgQGtleWJvYXJkVmlldy5zdG9wUmVjb3JkaW5nKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWFjcm9FZGl0b3JcblxuXG5cbiIsIlxuY2xhc3MgTWFjcm9DaGlsZCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGFnTmFtZTogJ2xpJ1xuICBjbGFzc05hbWU6ICdtYWNyby0tY2hpbGQgZmxleC1jb2x1bW4ganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgbXktMidcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL21hY3JvX2NoaWxkJylcblxuICBiZWhhdmlvcnM6XG4gICAgU29ydGFibGVDaGlsZDoge31cbiAgICAjIFRvb2x0aXBzOiB7fVxuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdjaGFuZ2U6cG9zaXRpb24nOiAgJ3JlbmRlcidcbiAgICAnY2hhbmdlOnNoaWZ0ZWQnOiAgICdyZW5kZXInXG5cbiAgIyB1aTpcbiAgIyAgIHRvb2x0aXA6ICdbZGF0YS10b2dnbGU9dG9vbHRpcF0nXG5cbiAgZXZlbnRzOlxuICAgICdkcmFnJzogJ29uRHJhZydcbiAgICAnZHJhZ3N0YXJ0JzogJ29uRHJhZ1N0YXJ0J1xuICAgICdtb3VzZW92ZXIgLmtleSc6ICdvbk1vdXNlT3ZlcidcbiAgICAnbW91c2VvdXQgLmtleSc6ICdvbk1vdXNlT3V0J1xuICAgICdjbGljayAua2V5JzogJ3JlbW92ZU1hY3JvJ1xuICAgICdjbGljayBbZGF0YS1wb3NpdGlvbl06bm90KC5hY3RpdmUpJzogJ29uUG9zaXRpb25DbGljaydcblxuICAjIHN0YXRlOiB7XG4gICMgICB0b29sdGlwT25SZW5kZXI6IGZhbHNlXG4gICMgfVxuXG4gICMgb25SZW5kZXI6IC0+XG4gICMgICByZXR1cm4gdW5sZXNzIEBzdGF0ZS50b29sdGlwT25SZW5kZXJcblxuICAjICAgIyBVbnNldHMgdG9vbHRpcCBmbGFnXG4gICMgICBAc3RhdGUudG9vbHRpcE9uUmVuZGVyID0gZmFsc2VcblxuICAjICAgIyBTaG93cyB0aGUgdG9vbHRpcFxuICAjICAgQHVpLnRvb2x0aXAudG9vbHRpcCgnc2hvdycpXG5cbiAgb25Nb3VzZU92ZXI6IC0+XG4gICAgQCRlbC5hZGRDbGFzcygnaG92ZXJlZCcpXG5cbiAgb25Nb3VzZU91dDogLT5cbiAgICBAJGVsLnJlbW92ZUNsYXNzKCdob3ZlcmVkJylcblxuICBvbkRyYWdTdGFydDogLT5cbiAgICBAJGVsLmFkZENsYXNzKCdkcmFnLXN0YXJ0JylcblxuICBvbkRyYWc6IC0+XG4gICAgQCRlbC5yZW1vdmVDbGFzcygnZHJhZy1zdGFydCBob3ZlcmVkJylcbiAgICBAJGVsLnNpYmxpbmdzKCcubWFjcm8tLWNoaWxkJykucmVtb3ZlQ2xhc3MoJ2RyYWctc3RhcnQgaG92ZXJlZCcpXG5cbiAgcmVtb3ZlTWFjcm86IC0+XG4gICAgIyBjb25zb2xlLmxvZyBAbW9kZWxcbiAgICAjIEBtb2RlbC5zZXQoJ3NoaWZ0ZWQnLCAhQG1vZGVsLmdldCgnc2hpZnRlZCcpKVxuICAgIEBtb2RlbC5jb2xsZWN0aW9uLnJlbW92ZShAbW9kZWwpXG5cbiAgb25Qb3NpdGlvbkNsaWNrOiAoZSkgLT5cblxuICAgICMgRGlzcGxheXMgdGhlIHRvb2x0aXAgYWZ0ZXIgdGhlIHZpZXcgcmUtcmVuZGVyc1xuICAgICMgQHN0YXRlLnRvb2x0aXBPblJlbmRlciA9IHRydWVcblxuICAgICMgQ2xlYXJzIGFjdGl2ZSB0b29sdGlwc1xuICAgICMgQGNsZWFyVG9vbHRpcHMoKVxuXG4gICAgIyBDYWNoZXMgY2xpY2tlZCBlbFxuICAgIGVsID0gJChlLmN1cnJlbnRUYXJnZXQpXG5cbiAgICAjIElzb2xhdGVzIHBvc2l0aW9uIGRhdGEgZnJvbSBlbGVtZW50XG4gICAgcG9zaXRpb24gPSBlbC5kYXRhKCdwb3NpdGlvbicpXG5cbiAgICAjIERldGVybWluZXMgbmV4dCBwb3NpdGlvblxuICAgIGlmIHBvc2l0aW9uID09IC0xXG4gICAgICBuZXdfcG9zaXRpb24gPSAxXG4gICAgaWYgcG9zaXRpb24gPT0gMFxuICAgICAgbmV3X3Bvc2l0aW9uID0gLTFcbiAgICBpZiBwb3NpdGlvbiA9PSAxXG4gICAgICBuZXdfcG9zaXRpb24gPSAwXG5cbiAgICAjIFNldHMgdGhlIHBvc2l0aW9uIGF0dHJpYnV0ZSBvbiB0aGUgbW9kZWxcbiAgICBAbW9kZWwuc2V0KCdwb3NpdGlvbicsIG5ld19wb3NpdGlvbilcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAgcG9zaXRpb25zID0gW1xuICAgICAgeyBwb3NpdGlvbjogLTEsIGNzczogJ2ZhLWxvbmctYXJyb3ctZG93bicsIHRvb2x0aXA6ICdLZXkgRG93bicgfVxuICAgICAgeyBwb3NpdGlvbjogMCwgY3NzOiAnZmEtYXJyb3dzLXYnLCB0b29sdGlwOiAnS2V5IERvd24gfCBVcCcgfVxuICAgICAgeyBwb3NpdGlvbjogMSwgY3NzOiAnZmEtbG9uZy1hcnJvdy11cCcsIHRvb2x0aXA6ICdLZXkgVXAnIH1cbiAgICBdXG5cbiAgICBwb3NpdGlvbiA9IEBtb2RlbC5nZXQoJ3Bvc2l0aW9uJylcbiAgICBhY3RpdmVfcG9zaXRpb24gPSBfLmZpbmRXaGVyZShwb3NpdGlvbnMsIHsgcG9zaXRpb246IHBvc2l0aW9uIH0pXG4gICAgcmV0dXJuIHsgYWN0aXZlX3Bvc2l0aW9uIH1cblxuIyAjICMgIyAjXG5cbmNsYXNzIE1hY3JvRW1wdHkgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnbWFjcm8tLWNoaWxkIGVtcHR5IGZsZXgtY29sdW1uIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIG15LTInXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9tYWNyb19lbXB0eScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBNYWNyb0xpc3QgZXh0ZW5kcyBNbi5Db2xsZWN0aW9uVmlld1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ2xpc3QtdW5zdHlsZWQgbWFjcm8tLWxpc3QgcHgtNCBteS0yIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBmbGV4LXJvdyBmbGV4LXdyYXAnXG4gIGNoaWxkVmlldzogTWFjcm9DaGlsZFxuICBlbXB0eVZpZXc6IE1hY3JvRW1wdHlcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgU29ydHMgdGhlIGNvbGxlY3Rpb25cbiAgICBAY29sbGVjdGlvbi5zb3J0KClcblxuICAgICMgSW5pdGlhbGl6ZXMgU29ydGFibGUgY29udGFpbmVyXG4gICAgU29ydGFibGUuY3JlYXRlIEBlbCxcbiAgICAgIGFuaW1hdGlvbjogICAgMFxuICAgICAgaGFuZGxlOiAgICAgICAnLmtleSdcbiAgICAgIGdob3N0Q2xhc3M6ICAgJ2dob3N0JyAgIyBDbGFzcyBuYW1lIGZvciB0aGUgZHJvcCBwbGFjZWhvbGRlclxuICAgICAgY2hvc2VuQ2xhc3M6ICAnY2hvc2VuJyAgIyBDbGFzcyBuYW1lIGZvciB0aGUgY2hvc2VuIGl0ZW1cbiAgICAgIGRyYWdDbGFzczogICAgJ2RyYWcnICAjIENsYXNzIG5hbWUgZm9yIHRoZSBkcmFnZ2luZyBpdGVtXG4gICAgICBmYWxsYmFja1RvbGVyYW5jZTogMTAwXG4gICAgICBvbkVuZDogKGUpID0+IEByZW9yZGVyQ29sbGVjdGlvbigpXG5cbiAgIyByZW9yZGVyQ29sbGVjdGlvblxuICAjIEludm9rZWQgYWZ0ZXIgc29ydGluZyBoYXMgY29tcGxldGVkXG4gIHJlb3JkZXJDb2xsZWN0aW9uOiA9PlxuXG4gICAgIyBUcmlnZ2VycyBvcmRlciBldmVudHMgb24gQ29sbGVjdGlvblZpZXcgY2hpbGRWaWV3ICRlbHNcbiAgICBvcmRlciA9IDFcbiAgICBmb3IgZWwgaW4gQGVsLmNoaWxkcmVuXG4gICAgICAkKGVsKS50cmlnZ2VyKCdzb3J0ZWQnLG9yZGVyKVxuICAgICAgb3JkZXIrK1xuXG4gICAgIyBAY29sbGVjdGlvbi5zb3J0KClcbiAgICBAcmVuZGVyKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTWFjcm9MaXN0XG5cblxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoY29ubmVjdGVkKSB7XG5idWYucHVzaChcIlwiKTtcbmlmICggIWNvbm5lY3RlZClcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclxcXCI+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJjb25uZWN0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeVxcXCI+Q09OTkVDVDwvYnV0dG9uPjwvZGl2PlwiKTtcbn1cbmJ1Zi5wdXNoKFwiPGRpdiBkYXRhLXJlZ2lvbj1cXFwia2V5c1xcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXJcXFwiPjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImNvbm5lY3RlZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguY29ubmVjdGVkOnR5cGVvZiBjb25uZWN0ZWQhPT1cInVuZGVmaW5lZFwiP2Nvbm5lY3RlZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChsYWJlbCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxkaXYgY2xhc3M9XFxcInJvdyBkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTBcXFwiPjxwIGNsYXNzPVxcXCJsZWFkIG1iLTBcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGFiZWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvcD48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMiB0ZXh0LXJpZ2h0IHRleHQtbXV0ZWRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1wZW5jaWxcXFwiPjwvaT48L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJsYWJlbFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubGFiZWw6dHlwZW9mIGxhYmVsIT09XCJ1bmRlZmluZWRcIj9sYWJlbDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChuYXZJdGVtcywgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlwiKTtcbi8vIGl0ZXJhdGUgbmF2SXRlbXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbmF2SXRlbXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBuYXZJdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YnV0dG9uIHN0eWxlPVxcXCJmbGV4LWdyb3c6MTtcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIG5hdkl0ZW0udHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJkLWZsZXggYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG14LTNcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbmF2SXRlbS50ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2J1dHRvbj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgbmF2SXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGJ1dHRvbiBzdHlsZT1cXFwiZmxleC1ncm93OjE7XFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEtdHJpZ2dlclwiLCBuYXZJdGVtLnRyaWdnZXIsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwiZC1mbGV4IGJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkganVzdGlmeS1jb250ZW50LWNlbnRlciBteC0zXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG5hdkl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9idXR0b24+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcIm5hdkl0ZW1zXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5uYXZJdGVtczp0eXBlb2YgbmF2SXRlbXMhPT1cInVuZGVmaW5lZFwiP25hdkl0ZW1zOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxkaXYgY2xhc3M9XFxcInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPjxidXR0b24gZGF0YS1jbGljaz1cXFwiY2FuY2VsXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1zZWNvbmRhcnkgbXgtMiBweC00XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtMnggbXgtNCBmYS1hbmdsZS1sZWZ0XFxcIj48L2k+PC9idXR0b24+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJzYXZlXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1zdWNjZXNzIG14LTIgcHgtNFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IG14LTQgZmEtY2hlY2stY2lyY2xlLW9cXFwiPjwvaT48L2J1dHRvbj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcImNsZWFyXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS13YXJuaW5nIG14LTIgcHgtNFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IG14LTQgZmEtdGltZXNcXFwiPjwvaT48L2J1dHRvbj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcInJlY29yZFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtZGFuZ2VyIG14LTIgcHgtNFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IG14LTQgZmEtY2lyY2xlXFxcIj48L2k+PC9idXR0b24+PGRpdiBjbGFzcz1cXFwiYnRuLWdyb3VwXFxcIj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS10b2dnbGU9XFxcImRyb3Bkb3duXFxcIiBhcmlhLWhhc3BvcHVwPVxcXCJ0cnVlXFxcIiBhcmlhLWV4cGFuZGVkPVxcXCJmYWxzZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tc20gYnRuLW91dGxpbmUtcHJpbWFyeSBkcm9wZG93bi10b2dnbGUgbXgtMiBweC00XFxcIj5FeGFtcGxlczwvYnV0dG9uPjxkaXYgY2xhc3M9XFxcImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1yaWdodCBtdC0zXFxcIj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1leGFtcGxlPVxcXCJleF8wMVxcXCIgY2xhc3M9XFxcImRyb3Bkb3duLWl0ZW1cXFwiPkV4LiAxOiBcXFwiSGVsbG8hXFxcIjwvYnV0dG9uPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWV4YW1wbGU9XFxcImV4XzAyXFxcIiBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+RXguIDI6IFxcXCJSZXN1bcOoXFxcIjwvYnV0dG9uPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWV4YW1wbGU9XFxcImV4XzAzXFxcIiBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+RXguIDM6IEVtIERhc2ggKOKAlCk8L2J1dHRvbj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1leGFtcGxlPVxcXCJleF8wNFxcXCIgY2xhc3M9XFxcImRyb3Bkb3duLWl0ZW1cXFwiPkV4LiA0OiBDVFJMICsgQUxUICsgREVMRVRFPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48aHIvPjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcImNvbnRlbnRcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgZC1mbGV4IGZsZXgtcm93IGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj48aSBjbGFzcz1cXFwiZC1mbGV4IGZhIGZhLWZ3IGZhLTJ4IGZhLXF1ZXN0aW9uLWNpcmNsZS1vIG1yLTFcXFwiPjwvaT48cCBzdHlsZT1cXFwibGV0dGVyLXNwYWNpbmc6IDAuMjVyZW07IGZvbnQtd2VpZ2h0OiAyMDA7XFxcIiBjbGFzcz1cXFwiZC1mbGV4IGxlYWQgbS0wXFxcIj5DbGljayBhIGtleSB0byBlZGl0PC9wPjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChsYWJlbCkge1xuYnVmLnB1c2goXCI8c3Bhbj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGxhYmVsKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+XCIpO30uY2FsbCh0aGlzLFwibGFiZWxcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmxhYmVsOnR5cGVvZiBsYWJlbCE9PVwidW5kZWZpbmVkXCI/bGFiZWw6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicm93IGgtMTAwIHctMTAwIGVkaXRvci0tb3ZlcmxheVxcXCI+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiZWRpdG9yXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyIHB0LTJcXFwiPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvdyBkZXZpY2UtLW92ZXJsYXlcXFwiPjxkaXYgZGF0YS1yZWdpb249XFxcImRldmljZVxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PC9kaXY+PGRpdiBkYXRhLXJlZ2lvbj1cXFwic2VsZWN0b3JcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTIgcHQtNVxcXCI+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGFjdGl2ZV9wb3NpdGlvbiwgYWxwaGEsIGNzcywga2V5LCBzaGlmdF9rZXksIHNoaWZ0ZWQsIHNwZWNpYWwpIHtcbmphZGVfbWl4aW5zW1wicG9zaXRpb25TZWxlY3RcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8c3BhbiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCJcIiArIChqYWRlLmF0dHIoXCJ0aXRsZVwiLCBvcHRzLnRvb2x0aXAsIHRydWUsIGZhbHNlKSkgKyBcIiBkYXRhLXBsYWNlbWVudD1cXFwiYm90dG9tXFxcIlwiICsgKGphZGUuY2xzKFsnZmEtc3RhY2snLCdmYS1sZycsJ3Bvc2l0aW9uLS1zZWxlY3QnLGBwb3NpdGlvbl8ke29wdHMucG9zaXRpb259YF0sIFtudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+PGkgY2xhc3M9XFxcImZhIGZhLWNpcmNsZS10aGluIGZhLXN0YWNrLTJ4XFxcIj48L2k+PGkgY2xhc3M9XFxcImZhIGZhLXN0YWNrLTF4IGZhLXN0YWNrXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtY2lyY2xlLXRoaW4gZmEtc3RhY2stMnggZmEtMnhcXFwiPjwvaT48aVwiICsgKGphZGUuYXR0cihcImRhdGEtcG9zaXRpb25cIiwgb3B0cy5wb3NpdGlvbiwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmNscyhbJ2ZhJywnZmEtc3RhY2stMXgnLG9wdHMuY3NzXSwgW251bGwsbnVsbCx0cnVlXSkpICsgXCI+PC9pPjwvaT48L3NwYW4+XCIpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdlwiICsgKGphZGUuY2xzKFsna2V5JywnZC1mbGV4Jyx0eXBlb2Ygc3BlY2lhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwiXCIgOiBcInNwZWNpYWxcIl0sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjxkaXZcIiArIChqYWRlLmNscyhbJ2lubmVyJywnY29udGVudCcsY3NzXSwgW251bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBzaGlmdGVkIHx8IHNoaWZ0X2tleSAmJiAhYWxwaGEpXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInNoaWZ0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHNoaWZ0X2tleSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBrZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwbGFpblxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBrZXkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbn1cbmJ1Zi5wdXNoKFwiPC9kaXY+PGRpdiBjbGFzcz1cXFwiaW5uZXIgaG92ZXJcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1sZyBmYS10aW1lc1xcXCI+PC9pPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInBvc2l0aW9uIG10LTJcXFwiPlwiKTtcbmphZGVfbWl4aW5zW1wicG9zaXRpb25TZWxlY3RcIl0oYWN0aXZlX3Bvc2l0aW9uKTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiYWN0aXZlX3Bvc2l0aW9uXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5hY3RpdmVfcG9zaXRpb246dHlwZW9mIGFjdGl2ZV9wb3NpdGlvbiE9PVwidW5kZWZpbmVkXCI/YWN0aXZlX3Bvc2l0aW9uOnVuZGVmaW5lZCxcImFscGhhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5hbHBoYTp0eXBlb2YgYWxwaGEhPT1cInVuZGVmaW5lZFwiP2FscGhhOnVuZGVmaW5lZCxcImNzc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguY3NzOnR5cGVvZiBjc3MhPT1cInVuZGVmaW5lZFwiP2Nzczp1bmRlZmluZWQsXCJrZXlcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmtleTp0eXBlb2Yga2V5IT09XCJ1bmRlZmluZWRcIj9rZXk6dW5kZWZpbmVkLFwic2hpZnRfa2V5XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5zaGlmdF9rZXk6dHlwZW9mIHNoaWZ0X2tleSE9PVwidW5kZWZpbmVkXCI/c2hpZnRfa2V5OnVuZGVmaW5lZCxcInNoaWZ0ZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnNoaWZ0ZWQ6dHlwZW9mIHNoaWZ0ZWQhPT1cInVuZGVmaW5lZFwiP3NoaWZ0ZWQ6dW5kZWZpbmVkLFwic3BlY2lhbFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc3BlY2lhbDp0eXBlb2Ygc3BlY2lhbCE9PVwidW5kZWZpbmVkXCI/c3BlY2lhbDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJ0eXBlXFxcIiB2YWx1ZT1cXFwibWFjcm9cXFwiIHJlYWRvbmx5PVxcXCJyZWFkb25seVxcXCIvPjxkaXYgZGF0YS1yZWdpb249XFxcIm1hY3JvXFxcIiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjxoci8+PC9kaXY+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiY29udHJvbHNcXFwiIGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8cCBjbGFzcz1cXFwibGVhZCB0ZXh0LWNlbnRlclxcXCI+TWFjcm9zPGJyLz48c21hbGw+RXhlY3V0ZSBrZXlzdHJva2VzIGluIGEgc3BlY2lmaWMgc2VxdWVuY2U8L3NtYWxsPjwvcD48c21hbGwgc3R5bGU9XFxcImZvbnQtc2l6ZTogMXJlbTtcXFwiIGNsYXNzPVxcXCJ0ZXh0LW11dGVkIGQtZmxleCBmbGV4LXJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclxcXCI+PGRpdiBjbGFzcz1cXFwiZmEgZmEtZncgZmEtcXVlc3Rpb24tY2lyY2xlLW8gbXItMSBkLWZsZXggZmxleC1jb2x1bW5cXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImQtZmxleCBmbGV4LXJvd1xcXCI+PHNwYW4+VXNlIHRoZSBrZXlzIGJlbG93LCBvciBjbGljayZuYnNwOzwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidGV4dC1kYW5nZXJcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1jaXJjbGUgdGV4dC1kYW5nZXJcXFwiPjwvaT4gcmVjb3JkJm5ic3A7PC9zcGFuPiZuYnNwO3RvIHN0YXJ0IHR5cGluZzwvZGl2Pjwvc21hbGw+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5qYWRlX21peGluc1tcImZvcm1Hcm91cFwiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxmaWVsZHNldFwiICsgKGphZGUuY2xzKFsnZm9ybS1ncm91cCcsb3B0cy5mb3JtR3JvdXBDc3NdLCBbbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBvcHRzLmxhYmVsKVxue1xuYnVmLnB1c2goXCI8bGFiZWwgY2xhc3M9XFxcImZvcm0tY29udHJvbC1sYWJlbFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcHRzLmxhYmVsKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2xhYmVsPlwiKTtcbn1cbmJsb2NrICYmIGJsb2NrKCk7XG5idWYucHVzaChcIjwvZmllbGRzZXQ+XCIpO1xufTtcbmJ1Zi5wdXNoKFwiXCIpO1xuamFkZV9taXhpbnNbXCJmb3JtSW5wdXRcIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKG9wdHMpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuamFkZV9taXhpbnNbXCJmb3JtR3JvdXBcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwiPGlucHV0XCIgKyAoamFkZS5hdHRycyhqYWRlLm1lcmdlKFt7XCJwbGFjZWhvbGRlclwiOiBqYWRlLmVzY2FwZShvcHRzLnBsYWNlaG9sZGVyKSxcIm5hbWVcIjogamFkZS5lc2NhcGUob3B0cy5uYW1lKSxcInR5cGVcIjogamFkZS5lc2NhcGUob3B0cy50eXBlKSxcImNsYXNzXCI6IFwiZm9ybS1jb250cm9sXCJ9LGF0dHJpYnV0ZXNdKSwgZmFsc2UpKSArIFwiLz5cIik7XG59XG59LCBvcHRzKTtcbn07XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+PGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwidHlwZVxcXCIgdmFsdWU9XFxcInRleHRcXFwiIHJlYWRvbmx5PVxcXCJyZWFkb25seVxcXCIvPlwiKTtcbmphZGVfbWl4aW5zW1wiZm9ybUlucHV0XCJdLmNhbGwoe1xuYXR0cmlidXRlczogamFkZS5tZXJnZShbeyBjbGFzczogJ2Zvcm0tY29udHJvbC1sZycgfV0pXG59LCB7IG5hbWU6ICd0ZXh0X3ZhbHVlJywgdHlwZTogJ3RleHQnLCBwbGFjZWhvbGRlcjogJ0VudGVyIHNvbWUgdGV4dCBoZXJlLi4uJyB9KTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxuY2xhc3MgVGV4dEVkaXRvciBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICBjbGFzc05hbWU6ICdyb3cnXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy90ZXh0X2VkaXRvcicpXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgQmFja2JvbmUuU3lwaG9uLmRlc2VyaWFsaXplKEAsIHsgdHlwZTogJ3RleHQnLCB0ZXh0X3ZhbHVlOiBAbW9kZWwuZ2V0KCd0ZXh0X3ZhbHVlJykgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dEVkaXRvclxuIiwiXG4jIER1bW15IERldmljZSBEYXRhIGZvciBVSSBkZXZlbG9wbWVudFxuIyBUT0RPIC0gcHVsbCBmcm9tIFdlYlVTQj9cbm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgaWQ6ICdkZXZpY2VfMScsXG4gICAgbGFiZWw6ICdBbGV4XFwncyBBc3Ryb0tleScsXG4gICAgc3RhdHVzX2NvZGU6IDEsXG4gICAga2V5czogW1xuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV8xJywgb3JkZXI6ICcweDAwMDAnLCBjb25maWc6IHsgdHlwZTogJ21hY3JvJywgbWFjcm9zOiBbXSB9IH1cbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfMicsIG9yZGVyOiAnMHgwMDAxJywgY29uZmlnOiB7IHR5cGU6ICd0ZXh0JywgdGV4dF92YWx1ZTogJ0hlbGxvIHdvcmxkIScgfSB9XG4gICAgICB7IGlkOiAnZGV2aWNlXzFfa2V5XzMnLCBvcmRlcjogJzB4MDAwMicsIGNvbmZpZzogeyB0eXBlOiAnbWFjcm8nLCBtYWNyb3M6IFtdIH0gfVxuICAgICAgeyBpZDogJ2RldmljZV8xX2tleV80Jywgb3JkZXI6ICcweDAwMDMnLCBjb25maWc6IHsgdHlwZTogJ3RleHQnLCB0ZXh0X3ZhbHVlOiAnSGVsbG8sIGFnYWluJyB9IH1cbiAgICAgIHsgaWQ6ICdkZXZpY2VfMV9rZXlfNScsIG9yZGVyOiAnMHgwMDA0JywgY29uZmlnOiB7IHR5cGU6ICdtYWNybycsIG1hY3JvczogW10gfSB9XG4gICAgXVxuICB9XG5dXG4iLCJNYWNyb0VudGl0aWVzID0gcmVxdWlyZSgnLi4vbWFjcm8vZW50aXRpZXMnKVxuXG4jICMgIyAjICNcblxuIyBBc3Ryb0tleUNvbmZpZyBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBBc3Ryb2tleUNvbmZpZyBleHRlbmRzIEJhY2tib25lLlJlbGF0aW9uYWxNb2RlbFxuXG4gICMgRGVmYXVsdCBhdHRyaWJ1dGVzXG4gIGRlZmF1bHRzOiB7XG4gICAgdHlwZTogJ21hY3JvJ1xuICAgIG1hY3JvczogW11cbiAgICB0ZXh0X3ZhbHVlOiAnJ1xuICAgIGtleV92YWx1ZTogJydcbiAgfVxuXG4gICMgQmFja2JvbmUuUmVsYXRpb25hbCAtIEByZWxhdGlvbnMgZGVmaW5pdGlvblxuICByZWxhdGlvbnM6IFtcbiAgICAgIHR5cGU6ICAgICAgICAgICBCYWNrYm9uZS5IYXNNYW55XG4gICAgICBrZXk6ICAgICAgICAgICAgJ21hY3JvcydcbiAgICAgIHJlbGF0ZWRNb2RlbDogICBNYWNyb0VudGl0aWVzLk1vZGVsXG4gICAgICBjb2xsZWN0aW9uVHlwZTogTWFjcm9FbnRpdGllcy5Db2xsZWN0aW9uXG4gIF1cblxuIyAjICMgIyAjXG5cbiMgQXN0cm9rZXlNb2RlbCBjbGFzcyBkZWZpbml0aW9uXG5jbGFzcyBBc3Ryb2tleU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgZGVmYXVsdHM6XG4gICAgb3JkZXI6IG51bGxcbiAgICBjb25maWc6IHt9XG5cbiAgIyBCYWNrYm9uZS5SZWxhdGlvbmFsIC0gQHJlbGF0aW9ucyBkZWZpbml0aW9uXG4gIHJlbGF0aW9uczogW1xuICAgICAgdHlwZTogICAgICAgICAgIEJhY2tib25lLkhhc09uZVxuICAgICAga2V5OiAgICAgICAgICAgICdjb25maWcnXG4gICAgICByZWxhdGVkTW9kZWw6ICAgQXN0cm9rZXlDb25maWdcbiAgXVxuXG4jICMgIyAjICNcblxuY2xhc3MgQXN0cm9rZXlDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogQXN0cm9rZXlNb2RlbFxuICBjb21wYXJhdG9yOiAnb3JkZXInXG5cbiMgIyAjICMgI1xuXG4jIERldmljZU1vZGVsIGRlZmluaXRpb25cbmNsYXNzIERldmljZU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuUmVsYXRpb25hbE1vZGVsXG5cbiAgIyBCYWNrYm9uZS5SZWxhdGlvbmFsIC0gQHJlbGF0aW9ucyBkZWZpbml0aW9uXG4gIHJlbGF0aW9uczogW1xuICAgICAgdHlwZTogICAgICAgICAgIEJhY2tib25lLkhhc01hbnlcbiAgICAgIGtleTogICAgICAgICAgICAna2V5cydcbiAgICAgIHJlbGF0ZWRNb2RlbDogICBBc3Ryb2tleU1vZGVsXG4gICAgICBjb2xsZWN0aW9uVHlwZTogQXN0cm9rZXlDb2xsZWN0aW9uXG4gIF1cblxuIyAjICMgIyAjXG5cbiMgRGV2aWNlQ29sbGVjdGlvbiBkZWZpbml0aW9uXG5jbGFzcyBEZXZpY2VDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogRGV2aWNlTW9kZWxcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgTW9kZWw6ICAgICAgRGV2aWNlTW9kZWxcbiAgQ29sbGVjdGlvbjogRGV2aWNlQ29sbGVjdGlvblxuIiwiRW50aXRpZXMgPSByZXF1aXJlKCcuL2VudGl0aWVzJylcbkRldmljZURhdGEgPSByZXF1aXJlKCcuL2RhdGEnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgRGV2aWNlRmFjdG9yeSBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ2RldmljZSBtb2RlbCc6ICAgICAgICdnZXRNb2RlbCdcbiAgICAnZGV2aWNlIGNvbGxlY3Rpb24nOiAgJ2dldENvbGxlY3Rpb24nXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAY2FjaGVkQ29sbGVjdGlvbiA9IG5ldyBFbnRpdGllcy5Db2xsZWN0aW9uKERldmljZURhdGEsIHsgcGFyc2U6IHRydWUgfSlcblxuICBnZXRNb2RlbDogKGlkKSAtPlxuICAgIHJldHVybiBAY2FjaGVkQ29sbGVjdGlvbi5nZXQoaWQpXG5cbiAgZ2V0Q29sbGVjdGlvbjogLT5cbiAgICByZXR1cm4gQGNhY2hlZENvbGxlY3Rpb25cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IERldmljZUZhY3RvcnkoKVxuIiwiTGF5b3V0VmlldyAgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyAjICMgIyAjXG5cbmNsYXNzIEhvbWVSb3V0ZSBleHRlbmRzIHJlcXVpcmUgJ2huX3JvdXRpbmcvbGliL3JvdXRlJ1xuXG4gIHRpdGxlOiAnQXN0cm9LZXkgSG9tZSdcblxuICBicmVhZGNydW1iczogW3sgdGV4dDogJ0RldmljZScgfV1cblxuICBmZXRjaDogLT5cbiAgICBAZGV2aWNlTW9kZWwgPSBSYWRpby5jaGFubmVsKCdkZXZpY2UnKS5yZXF1ZXN0KCdtb2RlbCcsICdkZXZpY2VfMScpXG5cbiAgcmVuZGVyOiAtPlxuICAgIGNvbnNvbGUubG9nKEBkZXZpY2VNb2RlbCk7ICMgRGVidWdcbiAgICBAY29udGFpbmVyLnNob3cgbmV3IExheW91dFZpZXcoeyBtb2RlbDogQGRldmljZU1vZGVsIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWVSb3V0ZVxuIiwiXG5jbGFzcyBIb21lTGF5b3V0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvbGF5b3V0J1xuICBjbGFzc05hbWU6ICdjb250YWluZXItZmx1aWQgaC0xMDAnXG5cbiMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBIb21lTGF5b3V0Vmlld1xuXG5cblxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicm93IGgtMTAwXFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgdGV4dC1jZW50ZXJcXFwiPjxwIGNsYXNzPVxcXCJsZWFkXFxcIj5Bc3Ryb0tleTwvcD48aHIvPjxwIGNsYXNzPVxcXCJsZWFkXFxcIj5Db25uZWN0IGFuIEFzdHJvS2V5IGRldmljZSB0byBnZXQgc3RhcnRlZDwvcD48aHIvPjxhIGhyZWY9XFxcIiNkZXZpY2VcXFwiIGNsYXNzPVxcXCJidG4gYnRuLW91dGxpbmUtcHJpbWFyeVxcXCI+REVWSUNFPC9hPjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJyZXF1aXJlICcuL2ZhY3RvcnknXG5Ib21lUm91dGUgPSByZXF1aXJlICcuL2hvbWUvcm91dGUnXG5EYXNoYm9hcmRSb3V0ZSA9IHJlcXVpcmUgJy4vZGFzaGJvYXJkL3JvdXRlJ1xuXG4jICMgIyAjICNcblxuIyBNYWluUm91dGVyIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIE1haW5Sb3V0ZXIgZXh0ZW5kcyByZXF1aXJlICdobl9yb3V0aW5nL2xpYi9yb3V0ZXInXG5cbiAgcm91dGVzOlxuICAgICcoLyknOiAnaG9tZSdcblxuICBob21lOiAtPlxuICAgIG5ldyBEYXNoYm9hcmRSb3V0ZSh7IGNvbnRhaW5lcjogQGNvbnRhaW5lciB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNYWluUm91dGVyXG4iLCJcbiMgRmlsdGVycyB1c2VkIHRvIHF1ZXJ5IFdlYlVTQiBkZXZpY2VzXG4jIFRPRE8gLSB1cGRhdGUgZmlsdGVycyB0byBxdWVyeSBkZXZpY2VzIGJ5IEFzdHJvS2V5IFZlbmRvcklEXG5yZXF1ZXN0RGV2aWNlRmlsdGVycyA9IFtcbiAgeyB2ZW5kb3JJZDogMHgxMGM0IH1cbl1cblxuIyAjICMgI1xuXG4jIFVzYlNlcnZpY2UgY2xhc3MgZGVmaW5pdGlvblxuIyBSZXNwb25zaWJsZSBmb3IgbWFuYWdpbmcgVVNCIGRldmljZXNcbiMgLSBmZXRjaCBhbGwgZGV2aWNlc1xuY2xhc3MgVXNiU2VydmljZSBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ3VzYiBkZXZpY2VzJzogJ2dldERldmljZXMnXG5cbiAgIyBnZXREZXZpY2VzXG4gIGdldERldmljZXM6IC0+XG5cbiAgICAjIFJldHVybnMgYSBQcm9taXNlIHRvIG1hbmFnZSBhc3luY2hvbm91cyBiZWhhdmlvclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuXG4gICAgICAjIFN0ZXAgMSAtIFJlcXVlc3QgZGV2aWNlXG4gICAgICBuYXZpZ2F0b3IudXNiLnJlcXVlc3REZXZpY2UoeyBmaWx0ZXJzOiByZXF1ZXN0RGV2aWNlRmlsdGVycyB9KVxuICAgICAgLnRoZW4oIChkZXZpY2UpID0+XG5cbiAgICAgICAgIyBUT0RPIC0gcmVtb3ZlXG4gICAgICAgICMgY29uc29sZS5sb2cgZGV2aWNlXG5cbiAgICAgICAgIyBTdGVwIDIgLSBHZXQgRGV2aWNlc1xuICAgICAgICAjIFRPRE8gLSB2ZXJpZnkgdGhpcyB3b3JrZmxvd1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzYi5nZXREZXZpY2VzKCkudGhlbigoZCkgPT5cblxuICAgICAgICAgIGNvbnNvbGUubG9nKGQpXG5cbiAgICAgICAgICBkID0gZFswXVxuXG4gICAgICAgICAgIyBTVEVQIDMgLSBvcGVuIGRldmljZVxuICAgICAgICAgIGQub3BlbigpLnRoZW4gPT5cblxuICAgICAgICAgICAgY29uc29sZS5sb2cgJ29wZW4nXG5cbiAgICAgICAgICAgICMgU3RlcCA0IC0gc2VsZWN0IGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICAgIGQuc2VsZWN0Q29uZmlndXJhdGlvbigxKS50aGVuID0+XG5cbiAgICAgICAgICAgICAgIyBjb25zb2xlLmxvZyAnc2VsZWN0Q29uZmlndXJhdGlvbidcblxuICAgICAgICAgICAgICAjIFRPRE8gLSByZW1vdmVcbiAgICAgICAgICAgICAgd2luZG93LmQgPSBkXG5cbiAgICAgICAgICAgICAgIyBSZXNvbHZlcyB3aXRoIGRldmljZVxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShkKVxuXG4gICAgICAgICAgICAgICMgd0luZGV4IC0gUmVxdWVzdCB0eXBlICgweDAxIGZvciBzZXQgbWFjcm8pXG4gICAgICAgICAgICAgICMgd1ZhbHVlIC0gTWFjcm8gaW5kZXggKDAgLSA0IGluY2x1c2l2ZSlcbiAgICAgICAgICAgICAgIyBiUmVxdWVzdCAtIDMgKGhhcmRjb2RlZClcbiAgICAgICAgICAgICAgIyB3TGVuZ3RoIC0gbnVtYmVyIG9mIGJ5dGVzIChzaG91bGQgYmUgbWFjcm8gbGVuZ3RoICogMilcblxuICAgICAgICAgICAgICAjIGQuY29udHJvbFRyYW5zZmVySW4oXG4gICAgICAgICAgICAgICMgICB7XG4gICAgICAgICAgICAgICMgICAgICdyZXF1ZXN0VHlwZSc6ICd2ZW5kb3InLFxuICAgICAgICAgICAgICAjICAgICAncmVjaXBpZW50JzogJ2RldmljZScsXG4gICAgICAgICAgICAgICMgICAgICdyZXF1ZXN0JzogMHgwMyxcbiAgICAgICAgICAgICAgIyAgICAgJ3ZhbHVlJzogMHgwMDAwLFxuICAgICAgICAgICAgICAjICAgICAnaW5kZXgnOiAweDAxXG4gICAgICAgICAgICAgICMgICB9LCBuZXcgVWludDhBcnJheShbMSw0LDIsNF0pLmJ1ZmZlclxuICAgICAgICAgICAgICAjICkudGhlbiggKHJlc3BvbnNlKSA9PiB7IGNvbnNvbGUubG9nKHJlc3BvbnNlKSB9KVxuXG4gICAgICAgICAgICAgICMgU1RFUCA1IC0gY29udHJvbFRyYW5zZmVySW5cbiAgICAgICAgICAgICAgIyB3aW5kb3cuZC5jb250cm9sVHJhbnNmZXJJbih7J3JlcXVlc3RUeXBlJzogJ3N0YW5kYXJkJywgJ3JlY2lwaWVudCc6ICdkZXZpY2UnLCAncmVxdWVzdCc6IDB4MDYsICd2YWx1ZSc6IDB4MEYwMCwgJ2luZGV4JzogMHgwMH0sIDUpLnRoZW4oIChyKSA9PiB7IGNvbnNvbGUubG9nKHIpIH0pXG5cblxuICAgICAgICApXG5cbiAgICAgIClcblxuICAjIHNlbmRcbiAgc2VuZDogLT5cblxuICAgIHdpbmRvdy5kLmNvbnRyb2xUcmFuc2Zlck91dCh7XG4gICAgICAgIHJlcXVlc3RUeXBlOiAgJ3ZlbmRvcicsXG4gICAgICAgIHJlY2lwaWVudDogICAgJ2RldmljZScsXG4gICAgICAgIHJlcXVlc3Q6ICAgICAgMHgwMyxcbiAgICAgICAgdmFsdWU6ICAgICAgICAweDAwMTMsICMgV2hhdGV2ZXIgd2Ugd2FudCAodG8gc29tZSBleHRlbnQpXG4gICAgICAgIGluZGV4OiAgICAgICAgMHgwMDAxICAjIFRPRE8gLSBXZSBjYW4gdXNlIGluZGV4IGZvciB0aGUga2V5IHRoZSBtYWNybyBjb3JyZXNwb25kcyB0byAobG93LWJ5dGUgPSBrZXksIGhpZ2gtYnl0ZSA9IG51bWJlciBvZiBhY3Rpb25zIGluIHRoZSBtYWNybylcbiAgICB9LCBkYXRhKTtcblxuXG4jICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFVzYlNlcnZpY2UoKVxuIixudWxsLCJcbiMgUHJvdmlkZXMgdXBkYXRlQXR0cnMgbWV0aG9kIHVzZWQgYnkgYmluZENoZWNrYm94ZXMsIGJpbmRJbnB1dHMsIGJpbmRSYWRpb3MsIGJpbmRTZWxlY3RzXG5jbGFzcyBCaW5kQmFzZSBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1cGRhdGVBdHRyczogKGUpIC0+XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIEB2aWV3Lm1vZGVsLnNldChCYWNrYm9uZS5TeXBob24uc2VyaWFsaXplKEApKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5kQmFzZVxuIiwiXG4jIERhdGFiaW5kaW5nIGZvciBmb3JtIGlucHV0c1xuY2xhc3MgQmluZElucHV0cyBleHRlbmRzIHJlcXVpcmUgJy4vYmluZEJhc2UnXG5cbiAgZXZlbnRzOlxuICAgICdpbnB1dCBpbnB1dCc6ICAndXBkYXRlQXR0cnMnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbmRJbnB1dHNcbiIsIlxuX3NlbmRGbGFzaCA9ICh0eXBlLCBvYmopIC0+XG4gIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykudHJpZ2dlcih0eXBlLCBvYmopXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBGbGFzaGVzQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnM9e30pIC0+XG4gICAgQHZpZXcuX2ZsYXNoZXMgICAgICA9IEBvcHRpb25zXG4gICAgQHZpZXcuZmxhc2hFcnJvciAgICA9IEBmbGFzaEVycm9yXG4gICAgQHZpZXcuZmxhc2hTdWNjZXNzICA9IEBmbGFzaFN1Y2Nlc3NcblxuICBmbGFzaEVycm9yOiAob2JqPXt9KSAtPlxuICAgIF9zZW5kRmxhc2goJ2Vycm9yJywgQF9mbGFzaGVzWydlcnJvciddIHx8IG9iailcblxuICBmbGFzaFN1Y2Nlc3M6IChvYmo9e30pIC0+XG4gICAgX3NlbmRGbGFzaCgnc3VjY2VzcycsIEBfZmxhc2hlc1snc3VjY2VzcyddIHx8IG9iailcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hlc0JlaGF2aW9yXG4iLCJcbmNsYXNzIE1vZGVsRXZlbnRzQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgbW9kZWxFdmVudHM6XG4gICAgJ3JlcXVlc3QnOiAgJ29uTW9kZWxSZXF1ZXN0J1xuICAgICdzeW5jJzogICAgICdvbk1vZGVsU3luYydcbiAgICAnZXJyb3InOiAgICAnb25Nb2RlbEVycm9yJ1xuXG4gIG9uTW9kZWxSZXF1ZXN0OiAobW9kZWwsIHN0YXR1cywgb3B0aW9ucykgLT5cbiAgICBAdmlldy5vblJlcXVlc3Q/KG1vZGVsLCBzdGF0dXMsIG9wdGlvbnMpXG5cbiAgb25Nb2RlbFN5bmM6IChtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpIC0+XG4gICAgQHZpZXcub25TeW5jPyhtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpXG5cbiAgb25Nb2RlbEVycm9yOiAobW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKSAtPlxuICAgIEB2aWV3Lm9uRXJyb3I/KG1vZGVsLCByZXNwb25zZSwgb3B0aW9ucylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kZWxFdmVudHNCZWhhdmlvclxuIiwiXG4jIFN1Ym1pdEJ1dHRvbkJlaGF2aW9yIGNsYXNzIGRlZmluaXRpb25cbiMgUHJvdmlkZXMgYW4gZXZlbnQgbGlzdGVuZXIgYW5kIGhhbmRsZXIsIGFuZCBkZWZpbmVzXG4jIGFzc29jaWF0ZWQgY2FsbGJhY2tzIG9uIHRoZSB2aWV3IHRvIHdoaWNoIHRoZSBiZWhhdmlvclxuIyBpcyBhdHRhY2hlZC4gVGhpcyBpcyB1c2VkIGluIHRoZSBQYXNzd29yZCBhbmQgU25pcHBldCBmb3Jtcy5cbmNsYXNzIFN1Ym1pdEJ1dHRvbkJlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIHVpOlxuICAgIHN1Ym1pdDogJ1tkYXRhLWNsaWNrPXN1Ym1pdF0nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuc3VibWl0Om5vdCguZGlzYWJsZWQpJzogJ29uU3VibWl0Q2xpY2snXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnM9e30pIC0+XG4gICAgQHZpZXcuZGlzYWJsZVN1Ym1pdCA9ID0+IEBkaXNhYmxlU3VibWl0KClcbiAgICBAdmlldy5lbmFibGVTdWJtaXQgID0gPT4gQGVuYWJsZVN1Ym1pdCgpXG5cbiAgb25TdWJtaXRDbGljazogKGUpIC0+IEB2aWV3Lm9uU3VibWl0PyhlKVxuICBkaXNhYmxlU3VibWl0OiAtPiBAdWkuc3VibWl0LmFkZENsYXNzKCdkaXNhYmxlZCcpXG4gIGVuYWJsZVN1Ym1pdDogLT4gIEB1aS5zdWJtaXQucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU3VibWl0QnV0dG9uQmVoYXZpb3JcbiIsIlxuY2xhc3MgVG9vbHRpcEJlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIHVpOlxuICAgIHRvb2x0aXBzOiAnW2RhdGEtdG9nZ2xlPXRvb2x0aXBdJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgIyBQcm94aWVzIGNsZWFyIG1ldGhvZCB0byBiZSBhY2Nlc3NpYmxlIGluc2lkZSB0aGUgdmlld1xuICAgIEB2aWV3LmNsZWFyVG9vbHRpcHMgPSA9PiBAY2xlYXIoKVxuXG4gIGNsZWFyOiAtPlxuICAgIEB1aS50b29sdGlwcy50b29sdGlwKCdoaWRlJylcbiAgICBAdWkudG9vbHRpcHMudG9vbHRpcCgnZGlzcG9zZScpXG5cbiAgb25SZW5kZXI6IC0+IEB1aS50b29sdGlwcz8udG9vbHRpcCgpXG4gIG9uQmVmb3JlRGVzdHJveTogLT4gQGNsZWFyKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gVG9vbHRpcEJlaGF2aW9yXG4iLCJcbiMgQXNzaWducyBNYXJpb25ldHRlLkRlY29yYXRvclxuTWFyaW9uZXR0ZS5EZWNvcmF0b3IgPSByZXF1aXJlICcuL2RlY29yYXRvcidcblxuIyBPdmVycmlkZXMgZGVmYXVsdCBzZXJpYWxpemVNb2RlbCgpIG1ldGhvZCBkZWZpbml0aW9uXG4jIEluIHRoZSBjb250ZXh0IHRoZSBzZXJpYWxpemVNb2RlbCBtZXRob2QsICd0aGlzJ1xuIyByZWZlcnMgdG8gdGhlIHZpZXcgaW5zdGFuY2UgaW5zaWRlIHdoaWNoIHRoZVxuIyBzZXJpYWxpemVNb2RlbCBtZXRob2Qgd2FzIGludm9rZWRcbk1hcmlvbmV0dGUuVmlldy5wcm90b3R5cGUuc2VyaWFsaXplTW9kZWwgPSAtPlxuXG4gICMgSWYgdGhpcy5tb2RlbCBpcyBub3QgZGVmaW5lZCwgcmV0dXJuIGFuIGVtcHR5IG9iamVjdFxuICBpZiAhdGhpcy5tb2RlbFxuICAgIHJldHVybiB7fVxuXG4gICMgSWYgdGhpcy5tb2RlbCBleGlzdHMsIGFuZCBoYXMgYSBkZWNvcmF0b3IgZGVmaW5lZCxcbiAgIyByZXR1cm4gdGhlIHRoaXMubW9kZWwncyBhdHRyaWJ1dGVzIGFuZCBkZWNvcmF0aW9uc1xuICBlbHNlIGlmIHRoaXMubW9kZWwuZGVjb3JhdG9yXG4gICAgcmV0dXJuIHRoaXMubW9kZWwuZGVjb3JhdG9yLmRlY29yYXRlKHRoaXMubW9kZWwpXG5cbiAgIyBPdGhlcndpc2UsIHJldHVybiB0aGUgY2xvbmVkIGF0dHJpYnV0ZXMgb2YgdGhpcy5tb2RlbFxuICByZXR1cm4gXy5jbG9uZSB0aGlzLm1vZGVsLmF0dHJpYnV0ZXNcbiIsIlxuIyBCYXNlRGVjb3JhdG9yIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIHNpbXBsZSBjbGFzcyB0byBkZWNvcmF0ZSBtb2RlbHMgd2hlblxuIyB0aGV5IGFyZSBzZXJpYWxpemVkIGludG8gYSB2aWV3J3MgdGVtcGxhdGVcbmNsYXNzIEJhc2VEZWNvcmF0b3JcblxuICAjIERlY29yYXRpb24gbWV0aG9kXG4gICMgSW52b2tlZCBpbiBNYXJpb25ldHRlLlZpZXcucHJvdG90eXBlLnNlcmlhbGl6ZU1vZGVsXG4gIEBkZWNvcmF0ZTogKG1vZGVsKSAtPlxuXG4gICAgIyBDbG9uZXMgbW9kZWwncyBhdHRyaWJ1dGVzXG4gICAgIyBDbG9uaW5nIHByZXZlbnRzIGNvbnRhbWluYXRpb24gb2ZcbiAgICBkYXRhID0gXy5jbG9uZShtb2RlbC5hdHRyaWJ1dGVzKVxuXG4gICAgIyBJdGVyYXRlcyBvdmVyIGVhY2ggZnVuY3Rpb24gaW4gcHJvdG90eXBlXG4gICAgIyBMZXZlcmFnZXMgVW5kZXJzY29yZS5qcyBfLmZ1bmN0aW9ucygpXG4gICAgZm9yIGZ1bmMgaW4gXy5mdW5jdGlvbnMoQHByb3RvdHlwZSlcblxuICAgICAgIyBTa2lwIGNvbnN0cnVjdG9yXG4gICAgICBjb250aW51ZSBpZiBmdW5jID09ICdjb25zdHJ1Y3RvcidcblxuICAgICAgIyBBc3NpZ25zIHZhbHVlIG9mIGZ1bmN0aW9uIHRvIGhhc2hcbiAgICAgIGRhdGFbZnVuY10gPSBAcHJvdG90eXBlW2Z1bmNdLmFwcGx5KG1vZGVsKVxuXG4gICAgIyBSZXR1cm5zIHRoZSBtb2RlbCdzIGF0dHJpYnV0ZXMgJiBkZWNvcmF0aW9uc1xuICAgIHJldHVybiBkYXRhXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VEZWNvcmF0b3JcbiIsIlxuIyBGbGFzaENvbGxlY3Rpb24gY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgYmFzaWMgQmFja2JvbmUuQ29sbGVjdGlvbiB0byBiZSB1c2VkIGJ5IHRoZVxuIyBGbGFzaENvbXBvbmVudCBmb3Igc3RvcmluZyBtdWx0aXBsZSBmbGFzaCBtb2RlbHNcbmNsYXNzIEZsYXNoQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IHJlcXVpcmUgJy4vbW9kZWwnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoQ29sbGVjdGlvblxuIiwicmVxdWlyZSAnLi9zZXJ2aWNlJ1xuRmxhc2hMaXN0ID0gcmVxdWlyZSAnLi92aWV3cy9mbGFzaExpc3QnXG5cbiMgIyAjICMgI1xuXG4jIEZsYXNoU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBjb21wb25lbnQgdG8gY3JlYXRlIGFuZCBkaXNwbGF5IGZsYXNoZXNcbiMgaW4gdGhlIGFwcC4gUHJvdmlkZXMgbXVsdGlwbGUgaW50ZXJmYWNlcyBpbiByYWRpb0V2ZW50c1xuIyB0byBoYW5kbGUgY29tbW9uIHR5cGVzIG9mIGZsYXNoZXMgKGVycm9yLCB3YXJuaW5nLCBzdWNjZXNzKVxuY2xhc3MgRmxhc2hDb21wb25lbnQgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlNlcnZpY2VcblxuICBpbml0aWFsaXplOiAob3B0aW9ucyA9IHt9KSAtPlxuICAgIEBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykucmVxdWVzdCgnY29sbGVjdGlvbicpLnRoZW4gKGNvbGxlY3Rpb24pID0+XG4gICAgICBAY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25cbiAgICAgIEBjb2xsZWN0aW9uLm9uICd1cGRhdGUnLCBAc2hvd0xpc3RWaWV3LCBAXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2ZsYXNoIGFkZCc6ICAgICAgJ2FkZCdcbiAgICAnZmxhc2ggcmVzZXQnOiAgICAncmVzZXQnXG4gICAgJ2ZsYXNoIGVycm9yJzogICAgJ2Vycm9yJ1xuICAgICdmbGFzaCB3YXJuaW5nJzogICd3YXJuaW5nJ1xuICAgICdmbGFzaCBzdWNjZXNzJzogICdzdWNjZXNzJ1xuXG4gIGFkZDogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQob3B0aW9ucylcblxuICByZXNldDogLT5cbiAgICBAY29sbGVjdGlvbi5yZXNldCgpXG5cbiAgZXJyb3I6IChvcHRpb25zPXt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZCBfLmV4dGVuZCggb3B0aW9ucywgeyBjb250ZXh0OiAgJ2RhbmdlcicgfSlcblxuICB3YXJuaW5nOiAob3B0aW9ucz17fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQgXy5leHRlbmQoIG9wdGlvbnMsIHsgY29udGV4dDogICd3YXJuaW5nJyB9KVxuXG4gIHN1Y2Nlc3M6IChvcHRpb25zPXt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZCBfLmV4dGVuZCggb3B0aW9ucywgeyBjb250ZXh0OiAgJ3N1Y2Nlc3MnIH0pXG5cbiAgc2hvd0xpc3RWaWV3OiA9PlxuICAgIHVubGVzcyBAcmVuZGVyZWRcbiAgICAgIEBjb250YWluZXIuc2hvdyBuZXcgRmxhc2hMaXN0KHsgY29sbGVjdGlvbjogQGNvbGxlY3Rpb24gfSlcbiAgICAgIEByZW5kZXJlZCA9IHRydWVcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hDb21wb25lbnRcbiIsIlxuIyBGbGFzaE1vZGVsIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIEJhY2tib25lLk1vZGVsIHRvIG1hbmFnZSB2aWV3c1xuIyBkaXNwbGF5ZWQgaW4gdGhlIEZsYXNoQ29tcG9uZW50XG5jbGFzcyBGbGFzaE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblxuICBkZWZhdWx0czpcbiAgICB0aW1lb3V0OiA1MDAwXG4gICAgZGlzbWlzc2libGU6IHRydWVcbiAgICBjb250ZXh0OiAnaW5mbydcblxuICAjIEFsZXJ0IE1vZGVsIEF0dHJpYnV0ZXMgLyBPcHRpb25zXG4gICMgLSBtZXNzYWdlXG4gICMgLSBzdHJvbmdUZXh0IChwbGVhc2UgcmVuYW1lIHRvICdzdHJvbmcnICYgYWRkIGFwcHJvcHJpYXRlIHNwYWNpbmcgdG8gdGVtcGxhdGUpXG4gICMgLSBjb250ZXh0Q2xhc3MgKHBsZWFzZSByZW5hbWUgdG8gJ2NvbnRleHQnKVxuICAjIC0gdGltZW91dCAoZGVmYXVsdCBpcyA1IHNlY29uZHMpXG4gICMgLSBkaXNtaXNzaWJsZSAoZGVmYXVsdCBpcyB0cnVlKVxuXG4gIGRpc21pc3M6IC0+XG4gICAgQGNvbGxlY3Rpb24ucmVtb3ZlKEApXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoTW9kZWxcbiIsIkZsYXNoQ29sbGVjdGlvbiA9IHJlcXVpcmUgJy4vY29sbGVjdGlvbidcblxuIyAjICMgIyAjXG5cbiMgRmxhc2hTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lZCBhIGJhc2ljIHNlcnZpY2UgdG8gcmV0dXJuIHRoZSBGbGFzaGVzQ29sbGVjdGlvblxuIyB3aGVuIHJlcXVlc3RlZC4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBGbGFzaENvbXBvbmVudCB0byByZXRyaWV2ZVxuIyB0aGUgRmxhc2hDb2xsZWN0aW9uIGl0IGlzIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmdcbmNsYXNzIEZsYXNoU2VydmljZSBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ2ZsYXNoIGNvbGxlY3Rpb24nOiAnZ2V0Q29sbGVjdGlvbidcblxuICBhbGVydHM6IG51bGxcblxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIHJldHVybiBuZXcgUHJvbWlzZSAocmVzb2x2ZSxyZWplY3QpID0+XG4gICAgICBAYWxlcnRzIHx8PSBuZXcgRmxhc2hDb2xsZWN0aW9uKClcbiAgICAgIHJlc29sdmUoQGFsZXJ0cylcbiAgICAgIHJldHVyblxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRmxhc2hTZXJ2aWNlKClcbiIsIiMgRmxhc2hDaGlsZCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBNYXJpb25ldHRlLkxheW91dFZpZXcgdG8gZGlzcGxheSBhIEZsYXNoTW9kZWwgaW5zdGFuY2VcbiMgVGhpcyB2aWV3IGF1dG8tZGlzbWlzc2VzIGFmdGVyIHRoZSB0aW1lb3V0IGRlZmluZWQgaW4gdGhlIEZsYXNoTW9kZWwgaW5zdGFuY2VcbmNsYXNzIEZsYXNoQ2hpbGQgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93J1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvZmxhc2hfY2hpbGQnXG5cbiAgYXR0cmlidXRlczpcbiAgICBzdHlsZTogJ2Rpc3BsYXk6bm9uZTsnXG5cbiAgdWk6XG4gICAgY2xvc2U6ICdbZGF0YS1jbGljaz1kaXNtaXNzXSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5jbG9zZSc6ICdkaXNtaXNzJ1xuXG4gIG9uU2hvdzogLT5cbiAgICB0aW1lb3V0ID0gQG1vZGVsLmdldCgndGltZW91dCcpXG4gICAgc2V0VGltZW91dCggQGRpc21pc3MsIHRpbWVvdXQgKVxuXG4gIG9uQXR0YWNoOiAtPlxuICAgIEAkZWwuZmFkZUluKClcblxuICByZW1vdmU6IC0+XG4gICAgQCRlbC5zbGlkZVRvZ2dsZSggPT5cbiAgICAgIE1hcmlvbmV0dGUuTGF5b3V0Vmlldy5wcm90b3R5cGUucmVtb3ZlLmNhbGwoQClcbiAgICApXG5cbiAgZGlzbWlzczogPT5cbiAgICBAbW9kZWwuY29sbGVjdGlvbj8ucmVtb3ZlKCBAbW9kZWwgKVxuXG4jIEZsYXNoTGlzdCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3IHRvIHRoZSBsaXN0IG9mIEZsYXNoZXNcbmNsYXNzIEZsYXNoTGlzdCBleHRlbmRzIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXdcbiAgY2xhc3NOYW1lOiAnY29udGFpbmVyLWZsdWlkJ1xuICBjaGlsZFZpZXc6IEZsYXNoQ2hpbGRcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hMaXN0XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChjb250ZXh0LCBkaXNtaXNzaWJsZSwgbWVzc2FnZSwgc3Ryb25nKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMiB0ZXh0LWNlbnRlclxcXCI+PGRpdiByb2xlPVxcXCJhbGVydFxcXCJcIiArIChqYWRlLmNscyhbJ2FsZXJ0JywnYWxlcnQtZGlzbWlzc2libGUnLCdmYWRlJywnaW4nLFwiYWxlcnQtXCIgKyBjb250ZXh0XSwgW251bGwsbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPlwiKTtcbmlmICggZGlzbWlzc2libGUpXG57XG5idWYucHVzaChcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWNsaWNrPVxcXCJkaXNtaXNzXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInNyLW9ubHlcXFwiPkNsb3NlPC9zcGFuPjwvYnV0dG9uPlwiKTtcbn1cbmlmICggc3Ryb25nKVxue1xuYnVmLnB1c2goXCI8c3Ryb25nPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc3Ryb25nICsgXCIgXCIpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Ryb25nPlwiKTtcbn1cbmlmICggbWVzc2FnZSlcbntcbmJ1Zi5wdXNoKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbWVzc2FnZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKTtcbn1cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiY29udGV4dFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguY29udGV4dDp0eXBlb2YgY29udGV4dCE9PVwidW5kZWZpbmVkXCI/Y29udGV4dDp1bmRlZmluZWQsXCJkaXNtaXNzaWJsZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGlzbWlzc2libGU6dHlwZW9mIGRpc21pc3NpYmxlIT09XCJ1bmRlZmluZWRcIj9kaXNtaXNzaWJsZTp1bmRlZmluZWQsXCJtZXNzYWdlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5tZXNzYWdlOnR5cGVvZiBtZXNzYWdlIT09XCJ1bmRlZmluZWRcIj9tZXNzYWdlOnVuZGVmaW5lZCxcInN0cm9uZ1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc3Ryb25nOnR5cGVvZiBzdHJvbmchPT1cInVuZGVmaW5lZFwiP3N0cm9uZzp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJNb2RhbFZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5cbiMgIyAjICMgI1xuXG4jIFdpbmRvdyBldmVudCBsaXN0ZW5lciB0byBoaWRlIHRoZSBtb2RhbCB3aGVuIG5hdmlnYXRpb24gb2NjdXJzLlxuaGlkZU1vZGFsT25IYXNoQ2hhbmdlID0gLT4gd2luZG93Lm1vZGFsV2luZG93LmhpZGVNb2RhbCgpXG5cbiMgQWJzdHJhY3QgY2xhc3MgZm9yIG1vZGFsLWJhc2VkIGNvbXBvbmVudHMuXG5jbGFzcyBBYnN0cmFjdE1vZGFsQ29tcG9uZW50IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcblxuICBoaWRlTW9kYWw6IC0+XG4gICAgQG1vZGFsVmlldy5oaWRlTW9kYWwoKVxuXG4gIHNob3dNb2RhbDogKGNvbnRlbnRWaWV3LCBtb2RhbFZpZXdPcHRpb25zPXt9KSAtPlxuXG4gICAgICAjIE5ldyBNb2RhbCBWaWV3IChvdXIgdmlldyBpcyBzaG93biBpbnNpZGUgdGhpcyBvbmUpXG4gICAgICBAbW9kYWxWaWV3ID0gbmV3IE1vZGFsVmlldyhtb2RhbFZpZXdPcHRpb25zKVxuXG4gICAgICAjIFNob3cgdGhlIHZpZXcgaW5zaWRlIHRoZSBtb2RhbCB3cmFwcGVyLCBhZGRzIGhpZGVNb2RhbE9uSGFzaENoYW5nZSBldmVudCBsaXN0ZW5lclxuICAgICAgQG1vZGFsVmlldy5vbiAnc2hvdycsID0+XG4gICAgICAgIEBtb2RhbFZpZXcuY29udGVudFJlZ2lvbi5zaG93KCBjb250ZW50VmlldyApXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgaGlkZU1vZGFsT25IYXNoQ2hhbmdlKVxuICAgICAgICB3aW5kb3cubW9kYWxXaW5kb3cgPSBAbW9kYWxWaWV3XG5cbiAgICAgICMgUmVtb3ZlcyBoaWRlTW9kYWxPbkhhc2hDaGFuZ2UgZXZlbnQgbGlzdGVuZXJcbiAgICAgIEBtb2RhbFZpZXcub24gJ2Rlc3Ryb3knLCAtPlxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGhpZGVNb2RhbE9uSGFzaENoYW5nZSlcbiAgICAgICAgZGVsZXRlIHdpbmRvdy5tb2RhbFdpbmRvd1xuXG4gICAgICAjIG9uTW9kYWxIaWRkZW4gY2FsbGJhY2tcbiAgICAgIEBtb2RhbFZpZXcub24gJ2hpZGRlbjptb2RhbCcsID0+IEBvbk1vZGFsSGlkZGVuPygpXG5cbiAgICAgICMgU2hvdyB2aWV3IGluIHRoZSBtb2RhbFxuICAgICAgQGNvbnRhaW5lci5zaG93IEBtb2RhbFZpZXdcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RNb2RhbENvbXBvbmVudFxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobW9kYWxDc3MpIHtcbmJ1Zi5wdXNoKFwiPGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgZGF0YS1yZWdpb249XFxcIm1vZGFsLWNvbnRlbnRcXFwiXCIgKyAoamFkZS5jbHMoW21vZGFsQ3NzXSwgW3RydWVdKSkgKyBcIj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJtb2RhbENzc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubW9kYWxDc3M6dHlwZW9mIG1vZGFsQ3NzIT09XCJ1bmRlZmluZWRcIj9tb2RhbENzczp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbiMgTW9kYWxWaWV3IGNsYXNzIGRlZmluaXRpb25cbiMgUHJvdmlkZXMgYSBnZW5lcmljIHZpZXcgYW5kIHJlZ2lvbiBpbnRvIHdoaWNoXG4jIG90aGVyIHZpZXdzIGNhbiBjb252ZW5pZW50bHkgYmUgZGlzcGxheWVkIGluIGEgbW9kYWxcbmNsYXNzIE1vZGFsVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi9tb2RhbF90ZW1wbGF0ZSdcblxuICBhdHRyaWJ1dGVzOlxuICAgIHJvbGU6ICAgICAnZGlhbG9nJ1xuICAgIHRhYmluZGV4OiAnLTEnXG5cbiAgY2xhc3NOYW1lOiAnbW9kYWwgZmFkZSdcblxuICAjIFNldHMgbW9kYWwgc2l6ZSAtIG5vcm1hbCAvIHNtYWxsIC8gbGFyZ2VcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIHNpemUgPSBAb3B0aW9ucy5zaXplIHx8ICcnXG4gICAgY3NzID0gJ21vZGFsLWRpYWxvZydcbiAgICBjc3MgKz0gJyBtb2RhbC1zbScgaWYgc2l6ZSA9PSAnc21hbGwnXG4gICAgY3NzICs9ICcgbW9kYWwtbGcnIGlmIHNpemUgPT0gJ2xhcmdlJ1xuICAgIHJldHVybiB7IG1vZGFsQ3NzOiBjc3MgfVxuXG4gIHJlZ2lvbnM6XG4gICAgY29udGVudFJlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1tb2RhbC1jb250ZW50XSdcblxuICBldmVudHM6XG4gICAgJ3Nob3cuYnMubW9kYWwnICAgOiAtPiBAdHJpZ2dlck1ldGhvZCAnc2hvdzptb2RhbCdcbiAgICAnc2hvd24uYnMubW9kYWwnICA6IC0+IEB0cmlnZ2VyTWV0aG9kICdzaG93bjptb2RhbCdcbiAgICAnaGlkZS5icy5tb2RhbCcgICA6IC0+IEB0cmlnZ2VyTWV0aG9kICdoaWRlOm1vZGFsJ1xuICAgICdoaWRkZW4uYnMubW9kYWwnIDogLT4gQHRyaWdnZXJNZXRob2QgJ2hpZGRlbjptb2RhbCdcbiAgICAnbG9hZGVkLmJzLm1vZGFsJyA6IC0+IEB0cmlnZ2VyTWV0aG9kICdsb2FkZWQ6bW9kYWwnXG5cbiAgb25TaG93OiAtPlxuICAgIEAkZWwubW9kYWwoIEBvcHRpb25zLm1vZGFsT3B0aW9ucyB8fCB7fSApXG5cbiAgaGlkZU1vZGFsOiAtPlxuICAgIEAkZWwubW9kYWwoJ2hpZGUnKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFZpZXdcbiIsIlxuY2xhc3MgT3ZlcmxheVZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiBmYWxzZVxuICBjbGFzc05hbWU6ICdvdmVybGF5J1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2snOiAnb25DbGljaydcblxuICBvbkNsaWNrOiAtPlxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3NpZGViYXInKS50cmlnZ2VyKCdoaWRlJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIE92ZXJsYXlDb21wb25lbnQgZXh0ZW5kcyBNbi5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29udGFpbmVyICA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ292ZXJsYXkgcmVhZHknOiAgJ29uUmVhZHknXG4gICAgJ292ZXJsYXkgc2hvdyc6ICAgJ3Nob3dPdmVybGF5J1xuICAgICdvdmVybGF5IGhpZGUnOiAgICdoaWRlT3ZlcmxheSdcblxuICBzaG93T3ZlcmxheTogLT5cbiAgICAkKCcub3ZlcmxheS1yZWdpb24nKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICBoaWRlT3ZlcmxheTogLT5cbiAgICAkKCcub3ZlcmxheS1yZWdpb24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICBvblJlYWR5OiAtPlxuICAgIHVubGVzcyBAdmlld1xuICAgICAgQHZpZXcgPSBuZXcgT3ZlcmxheVZpZXcoKVxuICAgICAgQGNvbnRhaW5lci5zaG93KEB2aWV3KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBPdmVybGF5Q29tcG9uZW50XG4iLCJcbiMgQmFzZVJvdXRlIGNsYXNzIGRlZmluaXRpb25cbiMgVGhlIGJhc2Ugcm91dGUgcmVkdWNlcyByZXBlYXRlZCBjb2RlIGJ5XG4jIGF0dGFjaGluZyB0aGUgQGNvbnRhaW5lciBwcm9wZXJ0eSBwYXNzZWQgaW4gZnJvbVxuIyB0aGUgcm91dGVyLiBUaGlzIHByb3BlcnR5IGlzIHVzZWQgdG8gZGlzcGxheSB2aWV3cyBpbiB0aGUgYXBwXG5jbGFzcyBCYXNlUm91dGUgZXh0ZW5kcyBCYWNrYm9uZS5Sb3V0aW5nLlJvdXRlXG5cbiAgYnJlYWRjcnVtYnM6IFtdXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+XG5cbiAgICAjIEF0dGFjaGVzIG9wdGlvbnNcbiAgICBAb3B0aW9ucyA9IG9wdGlvbnNcblxuICAgICMgQXR0YWNoZXMgY29udGFpbmVyXG4gICAgQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiAgICAjIEV2ZW50IGhhbmRsZXJzXG4gICAgQG9uICdiZWZvcmU6ZW50ZXInLCA9PiBAb25CZWZvcmVFbnRlcj8oYXJndW1lbnRzKVxuICAgIEBvbiAnYmVmb3JlOmZldGNoJywgPT4gQG9uQmVmb3JlRmV0Y2g/KGFyZ3VtZW50cylcbiAgICBAb24gJ2JlZm9yZTpyZW5kZXInLCA9PiBAb25CZWZvcmVSZW5kZXI/KGFyZ3VtZW50cylcbiAgICBAb24gJ2ZldGNoJywgPT4gQG9uRmV0Y2g/KGFyZ3VtZW50cylcbiAgICBAb24gJ3JlbmRlcicsID0+IEBvblJlbmRlcj8oYXJndW1lbnRzKVxuICAgIEBvbiAnZW50ZXInLCA9PiBAb25FbnRlcj8oYXJndW1lbnRzKVxuXG4gICAgIyBIaWRlcyBzaWRlYmFyIGNvbXBvbmVudFxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3NpZGViYXInKS50cmlnZ2VyKCdoaWRlJylcblxuICBfc2V0UGFnZVRpdGxlOiAtPlxuICAgIGRvY3VtZW50LnRpdGxlID0gXy5yZXN1bHQgQCwgJ3RpdGxlJ1xuXG4gIF91cGRhdGVCcmVhZGNydW1iczogLT5cbiAgICBicmVhZGNydW1icyA9IF8ucmVzdWx0IEAsICdicmVhZGNydW1icydcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdicmVhZGNydW1iJykudHJpZ2dlcignc2V0JywgYnJlYWRjcnVtYnMpIGlmIGJyZWFkY3J1bWJzXG5cbiAgb25GZXRjaDogLT5cbiAgICBAX3NldFBhZ2VUaXRsZSgpXG4gICAgQF91cGRhdGVCcmVhZGNydW1icygpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VSb3V0ZVxuIiwiXG4jIEJhc2VSb3V0ZXIgY2xhc3MgZGVmaW5pdGlvblxuIyBUaGUgYmFzZSByb3V0ZXIgcmVkdWNlcyByZXBlYXRlZCBjb2RlIGJ5XG4jIGF0dGFjaGluZyB0aGUgQGNvbnRhaW5lciBwcm9wZXJ0eSBwYXNzZWQgaW4gZnJvbSB3aGVuIGluc3RhbnRpYXRlZC5cbiMgVGhpcyBwcm9wZXJ0eSBpcyBzdWJzZXF1ZW50bHkgcGFzc2VkIHRvIGFsbCByb3V0ZXMgY3JlYXRlZCBpbnNpZGVcbiMgcm91dGVycyBzdWJjbGFzc2VkIGZyb20gdGhpcyBkZWZpbml0aW9uXG5jbGFzcyBCYXNlUm91dGVyIGV4dGVuZHMgQmFja2JvbmUuUm91dGluZy5Sb3V0ZXJcblxuICBpbml0aWFsaXplOiAob3B0aW9ucykgLT4gQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VSb3V0ZXJcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmphZGUgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGphZGVfZW5jb2RlX2h0bWxfcnVsZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbnZhciBqYWRlX21hdGNoX2h0bWwgPSAvWyY8PlwiXS9nO1xuXG5mdW5jdGlvbiBqYWRlX2VuY29kZV9jaGFyKGMpIHtcbiAgcmV0dXJuIGphZGVfZW5jb2RlX2h0bWxfcnVsZXNbY10gfHwgYztcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBqYWRlX2VzY2FwZTtcbmZ1bmN0aW9uIGphZGVfZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpLnJlcGxhY2UoamFkZV9tYXRjaF9odG1sLCBqYWRlX2VuY29kZV9jaGFyKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTtcbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiXG5jbGFzcyBBYnN0cmFjdEtleWJvYXJkVmlldyBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAncm93IGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMva2V5Ym9hcmRfYWJzdHJhY3QnXG5cbiAgIyBUT0RPIC0gYWN0aXZhdGUgdGhpcyBiZWhhdmlvciBjb25kaXRpb25hbGx5XG4gICMgYmVoYXZpb3JzOlxuICAjICAgS2V5Ym9hcmRDb250cm9sczoge31cblxuICB1aTpcbiAgICBrZXk6ICdbZGF0YS1jbGljaz1rZXldJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLmtleSc6ICdvbktleUNsaWNrJ1xuXG4gIGlzUmVjb3JkaW5nOiBmYWxzZVxuXG4gICMgaW5pdGlhbGl6ZVxuICBpbml0aWFsaXplOiAtPlxuXG4gICAgIyBEZWZpbmVzIEBkZWJvdW5jZVN0b3BSZWNvcmRpbmdcbiAgICBAZGVib3VuY2VTdG9wUmVjb3JkaW5nID0gXy5kZWJvdW5jZSggKCkgPT5cbiAgICAgIEB0cmlnZ2VyICdzdG9wOnJlY29yZGluZydcbiAgICAsIDE1MDApO1xuXG4gICMgc3RhcnRSZWNvcmRpbmdcbiAgc3RhcnRSZWNvcmRpbmc6IC0+XG4gICAgQGlzUmVjb3JkaW5nID0gdHJ1ZVxuXG4gICMgc3RvcFJlY29yZGluZ1xuICBzdG9wUmVjb3JkaW5nOiAtPlxuICAgIEBpc1JlY29yZGluZyA9IGZhbHNlXG5cbiAgIyBLZXlib2FyZENvbnRyb2xzIGJlaGF2aW9yIGNhbGxiYWNrXG4gICMgVE9ETyAtIGFubm9hdGUgYW5kIGNsZWFuIHVwIHRoaXMgbWV0aG9kXG4gIG9uS2V5QWN0aW9uOiAoZSkgLT5cblxuICAgICMgU2hvcnQtY2lyY3VpdHMgdW5sZXNzXG4gICAgcmV0dXJuIHVubGVzcyBAaXNSZWNvcmRpbmdcblxuICAgICMgUHJldmVudHMgZGVmYXVsdCBob3RrZXlzIHdoaWxlIHJlY29yZGluZ1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgIyBUT0RPIC0gaWdub3JlIGtleXVwIG9uIGFscGhhbnVtZXJpYywgbGlzdGVuIGZvciBzcGVjaWFsIGtleXM/XG4gICAgIyByZXR1cm4gaWYgZS5rZXkgaW4gW1wiQ29udHJvbFwiLCBcIk1ldGFcIiwgXCJBbHRcIl1cbiAgICBrZXkgPSBAb3B0aW9ucy5rZXlzLmZpbmRXaGVyZSh7IGtleWNvZGU6IGUua2V5Q29kZSB9KVxuXG4gICAgIyAjICMgI1xuXG4gICAgIyBUT0RPIC0gZG9jdW1lbnQgdGhpcyBibG9jayBvZiBjb2RlXG5cbiAgICBpZiBlLnR5cGUgPT0gJ2tleWRvd24nXG5cbiAgICAgIGlmIGUua2V5IGluIFtcIkNvbnRyb2xcIiwgXCJNZXRhXCIsIFwiQWx0XCIsIFwiU2hpZnRcIl1cbiAgICAgICAganNvbiA9IGtleS50b0pTT04oKVxuICAgICAgICBqc29uLnBvc2l0aW9uID0gLTFcbiAgICAgICAgQHRyaWdnZXIgJ2tleTpzZWxlY3RlZCcsIGpzb25cbiAgICAgIGVsc2VcbiAgICAgICAgQHRyaWdnZXIgJ2tleTpzZWxlY3RlZCcsIGtleS50b0pTT04oKVxuXG4gICAgaWYgZS50eXBlID09ICdrZXl1cCdcblxuICAgICAgaWYgZS5rZXkgaW4gW1wiQ29udHJvbFwiLCBcIk1ldGFcIiwgXCJBbHRcIiwgXCJTaGlmdFwiXVxuICAgICAgICBqc29uID0ga2V5LnRvSlNPTigpXG4gICAgICAgIGpzb24ucG9zaXRpb24gPSAxXG4gICAgICAgIEB0cmlnZ2VyICdrZXk6c2VsZWN0ZWQnLCBqc29uXG5cblxuICAgICMgIyAjICNcblxuICAgIGlmIGUudHlwZSA9PSAna2V5dXAnXG4gICAgICBAJChcIltkYXRhLWtleWNvZGU9I3tlLmtleUNvZGV9XVwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICBlbHNlXG4gICAgICBAJChcIltkYXRhLWtleWNvZGU9I3tlLmtleUNvZGV9XVwiKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICAgICMgVE9ETyAtIGFubm90YWVcbiAgICBzZXRUaW1lb3V0KCA9PlxuICAgICAgQCQoXCJbZGF0YS1rZXljb2RlPSN7ZS5rZXlDb2RlfV1cIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgLCAxMDAwKVxuXG4gICAgIyBTdG9wcyByZWNvcmRpbmcgMiBzZWNvbmRzIGFmdGVyIGxhc3Qga2V5c3Ryb2tlXG4gICAgQGRlYm91bmNlU3RvcFJlY29yZGluZygpXG5cbiAgICAjICMgIyAjXG5cblxuICAjIEtleUNsaWNrIGNhbGxiYWNrXG4gIG9uS2V5Q2xpY2s6IChlKSAtPlxuXG4gICAgIyBDYWNoZXMgZWwgYW5kIGtleWNvZGVcbiAgICBlbCAgPSAkKGUuY3VycmVudFRhcmdldClcbiAgICBrZXljb2RlID0gZWwuZGF0YSgna2V5Y29kZScpXG5cbiAgICAjIEZpbmRzIHRoZSBtb2RlbCBvZiB0aGUga2V5IHRoYXQgd2FzIHNlbGVjdGVkXG4gICAga2V5ID0gQG9wdGlvbnMua2V5cy5maW5kV2hlcmUoeyBrZXljb2RlOiBrZXljb2RlIH0pXG5cbiAgICAjIFRyaWdnZXJzICdrZXk6c2VsZWN0ZWQnIGV2ZW50XG4gICAgQHRyaWdnZXIgJ2tleTpzZWxlY3RlZCcsIGtleS50b0pTT04oKVxuXG4gICAgIyBCbHVycyBmb2N1cyBmcm9tIGNsaWNrZWQga2V5XG4gICAgZWwuYmx1cigpXG5cbiAgICByZXR1cm5cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RLZXlib2FyZFZpZXdcbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEtleWJvYXJkVmlldyBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9rZXlib2FyZF9mdWxsJ1xuXG4gIGJlaGF2aW9yczpcbiAgICBLZXlib2FyZENvbnRyb2xzOiB7fVxuXG4gICMgUGFzc2VzIGtleSBvYmplY3RzIHRvIFVJXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBrZXlzID0gQG9wdGlvbnMua2V5cy50b0pTT04oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAncjAnfSlcbiAgICAgIHIxOiBfLndoZXJlKGtleXMsIHsgcm93OiAncjEnfSlcbiAgICAgIHIyOiBfLndoZXJlKGtleXMsIHsgcm93OiAncjInfSlcbiAgICAgIHIzOiBfLndoZXJlKGtleXMsIHsgcm93OiAncjMnfSlcbiAgICAgIHI0OiBfLndoZXJlKGtleXMsIHsgcm93OiAncjQnfSlcbiAgICB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkVmlld1xuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjXG5cbmNsYXNzIEZ1bmN0aW9uS2V5Ym9hcmQgZXh0ZW5kcyBBYnN0cmFjdEtleWJvYXJkVmlld1xuXG4gICMgUGFzc2VzIGtleSBvYmplY3RzIHRvIFVJXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICBrZXlzID0gQG9wdGlvbnMua2V5cy50b0pTT04oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHIwOiBfLndoZXJlKGtleXMsIHsgcm93OiAnZnVuY19yMCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb25LZXlib2FyZFxuXG5cbiIsIkFic3RyYWN0S2V5Ym9hcmRWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Fic3RyYWN0JylcblxuIyAjICMgI1xuXG5jbGFzcyBNZWRpYUtleWJvYXJkIGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ21lZGlhX3IwJ30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNZWRpYUtleWJvYXJkXG5cblxuIiwiQWJzdHJhY3RLZXlib2FyZFZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3Mva2V5Ym9hcmRfYWJzdHJhY3QnKVxuXG4jICMgIyAjXG5cbmNsYXNzIE5hdktleWJvYXJkIGV4dGVuZHMgQWJzdHJhY3RLZXlib2FyZFZpZXdcblxuICAjIFBhc3NlcyBrZXkgb2JqZWN0cyB0byBVSVxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAga2V5cyA9IEBvcHRpb25zLmtleXMudG9KU09OKClcblxuICAgIHJldHVybiB7XG4gICAgICByMDogXy53aGVyZShrZXlzLCB7IHJvdzogJ25hdl9yMCd9KVxuICAgIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTmF2S2V5Ym9hcmRcblxuXG4iLCJBYnN0cmFjdEtleWJvYXJkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9hYnN0cmFjdCcpXG5cbiMgIyAjICNcblxuY2xhc3MgTnVtcGFkVmlldyBleHRlbmRzIEFic3RyYWN0S2V5Ym9hcmRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9rZXlib2FyZF9udW1wYWQnXG5cbiAgIyBQYXNzZXMga2V5IG9iamVjdHMgdG8gVUlcbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIGtleXMgPSBAb3B0aW9ucy5rZXlzLnRvSlNPTigpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcjA6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjAnfSlcbiAgICAgIHIxOiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3IxJ30pXG4gICAgICByMjogXy53aGVyZShrZXlzLCB7IHJvdzogJ251bV9yMid9KVxuICAgICAgcjM6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fcjMnfSlcbiAgICAgIHI0OiBfLndoZXJlKGtleXMsIHsgcm93OiAnbnVtX3I0J30pXG4gICAgICBjb2w6IF8ud2hlcmUoa2V5cywgeyByb3c6ICdudW1fY29sJ30pXG4gICAgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBOdW1wYWRWaWV3XG5cblxuIiwiU2ltcGxlTmF2ID0gcmVxdWlyZSgnbGliL3ZpZXdzL3NpbXBsZV9uYXYnKVxuRnVsbEtleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX2Z1bGwnKVxuTnVtcGFkVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9udW1wYWQnKVxuRnVuY3Rpb25LZXlib2FyZCA9IHJlcXVpcmUoJ2xpYi92aWV3cy9rZXlib2FyZF9mdW5jdGlvbicpXG5NZWRpYUtleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX21lZGlhJylcbk5hdktleWJvYXJkID0gcmVxdWlyZSgnbGliL3ZpZXdzL2tleWJvYXJkX25hdicpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBLZXlib2FyZFNlbGVjdG9yIGV4dGVuZHMgU2ltcGxlTmF2XG4gIGNsYXNzTmFtZTogJ3JvdyBoLTEwMCdcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2tleWJvYXJkX3NlbGVjdG9yJylcblxuICBuYXZJdGVtczogW1xuICAgIHsgaWNvbjogJ2ZhLWtleWJvYXJkLW8nLCAgdGV4dDogJ0tleWJvYXJkJywgIHRyaWdnZXI6ICdrZXlib2FyZCcsIGRlZmF1bHQ6IHRydWUgfVxuICAgIHsgaWNvbjogJ2ZhLWZpbGUtdGV4dC1vJywgdGV4dDogJ051bXBhZCcsICAgdHJpZ2dlcjogJ251bXBhZCcgfVxuICAgIHsgaWNvbjogJ2ZhLWNhcmV0LXNxdWFyZS1vLXVwJywgICAgdGV4dDogJ0Z1bmN0aW9uJywgICAgdHJpZ2dlcjogJ2Z1bmN0aW9uJyB9XG4gICAgeyBpY29uOiAnZmEtYXN0ZXJpc2snLCAgICB0ZXh0OiAnTWVkaWEnLCAgICB0cmlnZ2VyOiAnbWVkaWEnIH1cbiAgICB7IGljb246ICdmYS1hc3RlcmlzaycsICAgIHRleHQ6ICdOYXZpZ2F0aW9uJywgICAgdHJpZ2dlcjogJ25hdicgfVxuICBdXG5cbiAgc2hvd0tleWJvYXJkVmlldzogKGtleWJvYXJkVmlldykgLT5cblxuICAgICMgQ2FjaGVzIGN1cnJlbnQga2V5Ym9hcmQgdmlld1xuICAgIEBjdXJyZW50ID0ga2V5Ym9hcmRWaWV3XG5cbiAgICAjIEhhbmRsZXMgJ3N0b3A6cmVjb3JkaW5nJyBldmVudFxuICAgIEBjdXJyZW50Lm9uICdzdG9wOnJlY29yZGluZycsID0+IEB0cmlnZ2VyICdzdG9wOnJlY29yZGluZydcblxuICAgICMgSGFuZGxlcyBLZXlTZWxlY3Rpb24gZXZlbnRcbiAgICBrZXlib2FyZFZpZXcub24gJ2tleTpzZWxlY3RlZCcsIChrZXkpID0+IEB0cmlnZ2VyKCdrZXk6c2VsZWN0ZWQnLCBrZXkpXG5cbiAgICAjIFNob3dzIHRoZSBrZXlib2FyZFZpZXdcbiAgICBAY29udGVudFJlZ2lvbi5zaG93IGtleWJvYXJkVmlld1xuXG4gIG9uTmF2aWdhdGVLZXlib2FyZDogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgRnVsbEtleWJvYXJkKHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuICBvbk5hdmlnYXRlTnVtcGFkOiAtPlxuICAgIEBzaG93S2V5Ym9hcmRWaWV3KG5ldyBOdW1wYWRWaWV3KHsgbW9kZWw6IEBtb2RlbCwga2V5czogQG9wdGlvbnMua2V5cyB9KSlcblxuICBvbk5hdmlnYXRlRnVuY3Rpb246IC0+XG4gICAgQHNob3dLZXlib2FyZFZpZXcobmV3IEZ1bmN0aW9uS2V5Ym9hcmQoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4gIG9uTmF2aWdhdGVNZWRpYTogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgTWVkaWFLZXlib2FyZCh7IG1vZGVsOiBAbW9kZWwsIGtleXM6IEBvcHRpb25zLmtleXMgfSkpXG5cbiAgb25OYXZpZ2F0ZU5hdjogLT5cbiAgICBAc2hvd0tleWJvYXJkVmlldyhuZXcgTmF2S2V5Ym9hcmQoeyBtb2RlbDogQG1vZGVsLCBrZXlzOiBAb3B0aW9ucy5rZXlzIH0pKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZFNlbGVjdG9yXG4iLCJjbGFzcyBTaW1wbGVOYXYgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBbZGF0YS10cmlnZ2VyXSc6ICdvbk5hdkl0ZW1DbGljaydcblxuICBuYXZJdGVtczogW11cblxuICByZWdpb25zOlxuICAgIGNvbnRlbnRSZWdpb246ICdbZGF0YS1yZWdpb249Y29udGVudF0nXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgZGVmID0gXy53aGVyZShfLnJlc3VsdChALCAnbmF2SXRlbXMnKSwgeyBkZWZhdWx0OiB0cnVlIH0pWzBdXG4gICAgcmV0dXJuIHVubGVzcyBkZWZcbiAgICBAdHJpZ2dlck1ldGhvZChcIm5hdmlnYXRlOiN7ZGVmLnRyaWdnZXJ9XCIpXG4gICAgQCQoXCJbZGF0YS10cmlnZ2VyPSN7ZGVmLnRyaWdnZXJ9XVwiKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICBzZXJpYWxpemVEYXRhOiAtPlxuICAgIGRhdGEgPSBzdXBlclxuICAgIF8uZXh0ZW5kKGRhdGEsIHsgbmF2SXRlbXM6IF8ucmVzdWx0KEAsICduYXZJdGVtcycpIH0pXG4gICAgcmV0dXJuIGRhdGFcblxuICBvbk5hdkl0ZW1DbGljazogKGUpID0+XG4gICAgZWwgPSAkKGUuY3VycmVudFRhcmdldClcbiAgICBlbC5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICBAdHJpZ2dlck1ldGhvZChcIm5hdmlnYXRlOiN7ZWwuZGF0YSgndHJpZ2dlcicpfVwiKVxuICAgIGVsLmJsdXIoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVOYXZcbiJdfQ==
