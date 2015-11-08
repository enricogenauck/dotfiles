(function() {
  var $, Brokers, CompositeDisposable, Disposable, GitRepository, TextEditorView, View, fs, os, path, _, _ref, _ref1,
    __slice = [].slice;

  _ref = require('atom'), GitRepository = _ref.GitRepository, CompositeDisposable = _ref.CompositeDisposable, Disposable = _ref.Disposable;

  _ref1 = require('atom-space-pen-views'), $ = _ref1.$, TextEditorView = _ref1.TextEditorView, View = _ref1.View;

  Brokers = require('./brokers');

  fs = require('fs');

  os = require('os');

  path = require('path');

  _ = require('underscore-plus');

  module.exports = {
    config: {
      watchDebouceRate: {
        type: 'integer',
        description: 'This is the amount of delay in ms after input stops before the code will be run. (Min: 700)',
        "default": 700,
        minimum: 700
      },
      nodeExecutablePath: {
        type: 'string',
        description: 'Command is run in process.env. If you want to specify a specific executable do so here.',
        "default": os.platform() === "win32" ? "node" : os.platform() === "linux" ? "nodejs" : "/usr/bin/env node"
      },
      rubyExecutablePath: {
        type: 'string',
        description: 'Command is run in process.env. If you want to specify a specific executable do so here.',
        "default": os.platform() === "win32" ? "ruby" : os.platform() === "linux" ? "ruby" : "/usr/bin/env ruby"
      },
      phpExecutablePath: {
        type: 'string',
        description: 'Command is run in process.env. If you want to specify a specific executable do so here.',
        "default": os.platform() === "win32" ? "php" : os.platform() === "linux" ? "php" : "/usr/bin/env php"
      },
      pythonExecutablePath: {
        type: 'string',
        description: 'Command is run in process.env. If you want to specify a specific executable do so here.',
        "default": os.platform() === "win32" ? "python" : os.platform() === "linux" ? "python" : "/usr/bin/env python"
      },
      bashExecutablePath: {
        type: 'string',
        description: 'Command is run in process.env. If you want to specify a specific executable do so here.',
        "default": os.platform() === "win32" ? "bash" : os.platform() === "linux" ? "bash" : "/usr/bin/env bash"
      }
    },
    editorSub: null,
    activeFile: null,
    delay: null,
    activate: function(state) {
      atom.commands.add('atom-text-editor', 'hashrocket:run', (function(_this) {
        return function() {
          return _this.run();
        };
      })(this));
      atom.commands.add('atom-text-editor', "hashrocket:insert", (function(_this) {
        return function() {
          return _this.insertHashrocket();
        };
      })(this));
      atom.commands.add('atom-text-editor', "hashrocket:watchToggle", (function(_this) {
        return function() {
          return _this.watchToggle();
        };
      })(this));
      atom.commands.add('atom-text-editor', "hashrocket:insertRun", (function(_this) {
        return function() {
          _this.insertHashrocket();
          return _this.run();
        };
      })(this));
      this.delay = atom.config.get('hashrocket.watchDebouceRate');
      return atom.config.onDidChange('hashrocket.watchDebouceRate', (function(_this) {
        return function(values) {
          return _this.delay = values.newValue;
        };
      })(this));
    },
    makeBroker: function() {
      var args, broker, exec, printer, scope;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      scope = this.getEditor().scope;
      broker = Brokers.clients[scope];
      exec = broker.exec, printer = broker.printer;
      return {
        execute: exec,
        printer: printer.replace(/\$(\d+)/gi, function(m) {
          return args[m[1] - 1];
        })
      };
    },
    setCode: function(data) {
      var cursor, editor;
      editor = this.getEditor().editor;
      cursor = editor.getCursorBufferPosition();
      editor.setText(data);
      return editor.setCursorBufferPosition(cursor);
    },
    generateToken: function() {
      var token;
      token = Math.random().toString(36).slice(2).toUpperCase();
      return "ATOM-HR-" + token;
    },
    getEditor: function() {
      var editor, grammar;
      editor = atom.workspace.getActiveTextEditor();
      grammar = editor.getGrammar();
      return {
        editor: editor,
        scope: grammar.scopeName,
        name: grammar.name,
        code: editor.getText()
      };
    },
    insertHashrocket: function() {
      var editor, prefix, scope, word, wordPrefix, _ref2;
      _ref2 = this.getEditor(), editor = _ref2.editor, scope = _ref2.scope;
      prefix = Brokers.clients[scope].prefix;
      word = editor.getWordUnderCursor() || "";
      wordPrefix = scope === 'source.shell' ? '$' : '';
      editor.insertNewlineBelow();
      return editor.insertText("" + prefix + " " + wordPrefix + word);
    },
    watchToggle: function() {
      var activePanel, editor, handleEvent, item, _ref2;
      editor = this.getEditor().editor;
      activePanel = null;
      handleEvent = _.debounce(((function(_this) {
        return function() {
          return _this.run();
        };
      })(this)), this.delay);
      if (this.watching) {
        this.watching = false;
        alert("Hashrocket stopped watching changes of " + this.activeFile);
        if ((_ref2 = this.editorSub) != null) {
          _ref2.dispose();
        }
        return this.editorSub = null;
      } else {
        this.editorSub = new CompositeDisposable;
        this.watching = true;
        this.run();
        item = atom.workspace.getActivePaneItem();
        this.activeFile = path.basename(item.buffer.file.path);
        alert("Hashrocket is watching changes of " + this.activeFile);
        activePanel = atom.views.getView(item);
        activePanel.addEventListener('keydown', handleEvent);
        return this.editorSub.add(new Disposable((function(_this) {
          return function() {
            return activePanel != null ? activePanel.removeEventListener('keydown', handleEvent) : void 0;
          };
        })(this)));
      }
    },
    run: function() {
      var broker, code, comment, exec, fileToken, matcher, name, scope, tokenFile, tokenizedCode, tokens, _ref2;
      fileToken = this.generateToken();
      _ref2 = this.getEditor(), code = _ref2.code, scope = _ref2.scope, name = _ref2.name;
      broker = Brokers.clients[scope];
      if (!broker) {
        alert("" + name + " broker doesn't exist for Hashrocket.");
        return;
      }
      matcher = broker.matcher, exec = broker.exec, comment = broker.comment;
      tokens = [];
      code = code.replace(RegExp("" + comment + "(.*)\\sresult.*", "gi"), "" + comment + "$1");
      tokenizedCode = code.replace(matcher, (function(_this) {
        return function(all, prompt, data) {
          var printer, token;
          data = data.trim();
          token = _this.generateToken();
          printer = _this.makeBroker(token, data).printer;
          tokens.push({
            token: token,
            data: data,
            printer: printer
          });
          return printer;
        };
      })(this));
      tokenFile = path.join(os.tmpdir(), "" + fileToken + "." + scope);
      fs.writeFileSync(tokenFile, tokenizedCode);
      return exec(tokenFile, (function(_this) {
        return function(data) {
          var html, index, replacedCode, token, tokenInOut, _i, _len;
          fs.unlink(tokenFile);
          if (scope === "source.coffee") {
            fs.unlink(tokenFile + ".js");
          }
          html = $("<div>" + data + "</div>");
          for (index = _i = 0, _len = tokens.length; _i < _len; index = ++_i) {
            token = tokens[index];
            tokenInOut = html.find(token.token).last();
            tokens[index].output = tokenInOut.length > 0 ? tokenInOut.text().trim() : "unreachable";
          }
          index = 0;
          replacedCode = code.replace(matcher, function(all, prompt, data) {
            var output, replaced;
            output = tokens[index].output;
            output = output.replace(/\n/g, ' ').replace(/&gt/g, '>').replace(/&lt/g, '<');
            replaced = "" + all + " result " + output;
            index++;
            return replaced;
          });
          return _this.setCode(replacedCode);
        };
      })(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2dlbmF1Y2svLmF0b20vcGFja2FnZXMvaGFzaHJvY2tldC9saWIvaGFzaHJvY2tldC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsOEdBQUE7SUFBQSxrQkFBQTs7QUFBQSxFQUFBLE9BQW1ELE9BQUEsQ0FBUSxNQUFSLENBQW5ELEVBQUMscUJBQUEsYUFBRCxFQUFnQiwyQkFBQSxtQkFBaEIsRUFBcUMsa0JBQUEsVUFBckMsQ0FBQTs7QUFBQSxFQUNBLFFBQW1ELE9BQUEsQ0FBUSxzQkFBUixDQUFuRCxFQUFDLFVBQUEsQ0FBRCxFQUFJLHVCQUFBLGNBQUosRUFBb0IsYUFBQSxJQURwQixDQUFBOztBQUFBLEVBRUEsT0FBQSxHQUFtRCxPQUFBLENBQVEsV0FBUixDQUZuRCxDQUFBOztBQUFBLEVBR0EsRUFBQSxHQUFtRCxPQUFBLENBQVEsSUFBUixDQUhuRCxDQUFBOztBQUFBLEVBSUEsRUFBQSxHQUFtRCxPQUFBLENBQVEsSUFBUixDQUpuRCxDQUFBOztBQUFBLEVBS0EsSUFBQSxHQUFtRCxPQUFBLENBQVEsTUFBUixDQUxuRCxDQUFBOztBQUFBLEVBTUEsQ0FBQSxHQUFtRCxPQUFBLENBQVEsaUJBQVIsQ0FObkQsQ0FBQTs7QUFBQSxFQVFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsZ0JBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFdBQUEsRUFBYSw2RkFEYjtBQUFBLFFBRUEsU0FBQSxFQUFTLEdBRlQ7QUFBQSxRQUdBLE9BQUEsRUFBUyxHQUhUO09BREY7QUFBQSxNQUtBLGtCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxXQUFBLEVBQWEseUZBRGI7QUFBQSxRQUVBLFNBQUEsRUFB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

//# sourceURL=/Users/genauck/.atom/packages/hashrocket/lib/hashrocket.coffee
