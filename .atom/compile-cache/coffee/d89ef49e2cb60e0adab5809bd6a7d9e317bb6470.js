(function() {
  describe('editor-linter', function() {
    var EditorLinter, editorLinter, getMessage, textEditor, wait, _ref;
    _ref = require('./common'), getMessage = _ref.getMessage, wait = _ref.wait;
    EditorLinter = require('../lib/editor-linter');
    editorLinter = null;
    textEditor = null;
    beforeEach(function() {
      global.setTimeout = require('remote').getGlobal('setTimeout');
      global.setInterval = require('remote').getGlobal('setInterval');
      return waitsForPromise(function() {
        atom.workspace.destroyActivePaneItem();
        return atom.workspace.open(__dirname + '/fixtures/file.txt').then(function() {
          if (editorLinter != null) {
            editorLinter.dispose();
          }
          textEditor = atom.workspace.getActiveTextEditor();
          return editorLinter = new EditorLinter(textEditor);
        });
      });
    });
    describe('::constructor', function() {
      return it("cries when provided argument isn't a TextEditor", function() {
        expect(function() {
          return new EditorLinter;
        }).toThrow();
        expect(function() {
          return new EditorLinter(null);
        }).toThrow();
        return expect(function() {
          return new EditorLinter(55);
        }).toThrow();
      });
    });
    describe('::{add, remove}Message', function() {
      return it('adds/removes decorations from the editor', function() {
        var countDecorations, message;
        countDecorations = textEditor.getDecorations().length;
        editorLinter.underlineIssues = true;
        message = getMessage('Hey!', __dirname + '/fixtures/file.txt', [[0, 1], [0, 2]]);
        editorLinter.addMessage(message);
        expect(textEditor.getDecorations().length).toBe(countDecorations + 1);
        editorLinter.deleteMessage(message);
        return expect(textEditor.getDecorations().length).toBe(countDecorations);
      });
    });
    describe('::getMessages', function() {
      return it('returns a set of messages', function() {
        var message, messageSet;
        message = getMessage('Hey!', __dirname + '/fixtures/file.txt', [[0, 1], [0, 2]]);
        messageSet = editorLinter.getMessages();
        editorLinter.addMessage(message);
        expect(messageSet.has(message)).toBe(true);
        editorLinter.deleteMessage(message);
        return expect(messageSet.has(message)).toBe(false);
      });
    });
    describe('::onDidMessage{Add, Change, Delete}', function() {
      return it('notifies us of the changes to messages', function() {
        var message, messageAdd, messageChange, messageRemove;
        message = getMessage('Hey!', __dirname + '/fixtures/file.txt', [[0, 1], [0, 2]]);
        messageAdd = jasmine.createSpy('messageAdd');
        messageChange = jasmine.createSpy('messageChange');
        messageRemove = jasmine.createSpy('messageRemove');
        editorLinter.onDidMessageAdd(messageAdd);
        editorLinter.onDidMessageChange(messageChange);
        editorLinter.onDidMessageDelete(messageRemove);
        editorLinter.addMessage(message);
        expect(messageAdd).toHaveBeenCalled();
        expect(messageAdd).toHaveBeenCalledWith(message);
        expect(messageChange).toHaveBeenCalled();
        expect(messageChange.mostRecentCall.args[0].type).toBe('add');
        expect(messageChange.mostRecentCall.args[0].message).toBe(message);
        editorLinter.deleteMessage(message);
        expect(messageRemove).toHaveBeenCalled();
        expect(messageRemove).toHaveBeenCalledWith(message);
        expect(messageChange.mostRecentCall.args[0].type).toBe('delete');
        return expect(messageChange.mostRecentCall.args[0].message).toBe(message);
      });
    });
    describe('::active', function() {
      return it('updates currentFile attribute on the messages', function() {
        var message;
        message = getMessage('Hey!', __dirname + '/fixtures/file.txt', [[0, 1], [0, 2]]);
        editorLinter.addMessage(message);
        expect(message.currentFile).toBe(true);
        editorLinter.active = false;
        expect(message.currentFile).toBe(false);
        editorLinter.deleteMessage(message);
        editorLinter.addMessage(message);
        return expect(message.currentFile).toBe(false);
      });
    });
    describe('::{calculateLineMessages, onDidCalculateLineMessages}', function() {
      return it('works and also ignores', function() {
        var listener, message;
        listener = jasmine.createSpy('onDidCalculateLineMessages');
        message = getMessage('Hey!', __dirname + '/fixtures/file.txt', [[0, 1], [0, 2]]);
        editorLinter.addMessage(message);
        editorLinter.onDidCalculateLineMessages(listener);
        atom.config.set('linter.showErrorTabLine', true);
        expect(editorLinter.calculateLineMessages(0)).toBe(1);
        expect(editorLinter.countLineMessages).toBe(1);
        expect(listener).toHaveBeenCalledWith(1);
        atom.config.set('linter.showErrorTabLine', false);
        expect(editorLinter.calculateLineMessages(0)).toBe(0);
        expect(editorLinter.countLineMessages).toBe(0);
        expect(listener).toHaveBeenCalledWith(0);
        atom.config.set('linter.showErrorTabLine', true);
        expect(editorLinter.calculateLineMessages(0)).toBe(1);
        expect(editorLinter.countLineMessages).toBe(1);
        return expect(listener).toHaveBeenCalledWith(1);
      });
    });
    describe('::{handle, add, remove}Gutter', function() {
      return it('handles the attachment and detachment of gutter to text editor', function() {
        editorLinter.gutterEnabled = false;
        expect(editorLinter.gutter === null).toBe(true);
        editorLinter.gutterEnabled = true;
        editorLinter.handleGutter();
        expect(editorLinter.gutter === null).toBe(false);
        editorLinter.gutterEnabled = false;
        editorLinter.handleGutter();
        expect(editorLinter.gutter === null).toBe(true);
        editorLinter.addGutter();
        expect(editorLinter.gutter === null).toBe(false);
        editorLinter.removeGutter();
        expect(editorLinter.gutter === null).toBe(true);
        editorLinter.removeGutter();
        return expect(editorLinter.gutter === null).toBe(true);
      });
    });
    describe('::onShouldLint', function() {
      it('is triggered on save', function() {
        var timesTriggered;
        timesTriggered = 0;
        editorLinter.onShouldLint(function() {
          return timesTriggered++;
        });
        textEditor.save();
        textEditor.save();
        textEditor.save();
        textEditor.save();
        textEditor.save();
        return expect(timesTriggered).toBe(5);
      });
      return it('respects lintOnFlyInterval config', function() {
        var flyStatus, timeCalled, timeDid;
        timeCalled = null;
        flyStatus = null;
        atom.config.set('linter.lintOnFlyInterval', 300);
        editorLinter.onShouldLint(function(fly) {
          flyStatus = fly;
          return timeCalled = new Date();
        });
        timeDid = new Date();
        editorLinter.editor.insertText("Hey\n");
        return waitsForPromise(function() {
          return wait(300).then(function() {
            expect(timeCalled !== null).toBe(true);
            expect(flyStatus !== null).toBe(true);
            expect(flyStatus).toBe(true);
            expect(timeCalled - timeDid).toBeLessThan(400);
            atom.config.set('linter.lintOnFlyInterval', 600);
            timeCalled = null;
            flyStatus = null;
            timeDid = new Date();
            editorLinter.editor.insertText("Hey\n");
            return wait(600);
          }).then(function() {
            expect(timeCalled !== null).toBe(true);
            expect(flyStatus !== null).toBe(true);
            expect(flyStatus).toBe(true);
            expect(timeCalled - timeDid).toBeGreaterThan(599);
            return expect(timeCalled - timeDid).toBeLessThan(700);
          });
        });
      });
    });
    return describe('::onDidDestroy', function() {
      return it('is called when TextEditor is destroyed', function() {
        var didDestroy;
        didDestroy = false;
        editorLinter.onDidDestroy(function() {
          return didDestroy = true;
        });
        textEditor.destroy();
        return expect(didDestroy).toBe(true);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2dlbmF1Y2svLmF0b20vcGFja2FnZXMvbGludGVyL3NwZWMvZWRpdG9yLWxpbnRlci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsZUFBVCxFQUEwQixTQUFBLEdBQUE7QUFDeEIsUUFBQSw4REFBQTtBQUFBLElBQUEsT0FBcUIsT0FBQSxDQUFRLFVBQVIsQ0FBckIsRUFBQyxrQkFBQSxVQUFELEVBQWEsWUFBQSxJQUFiLENBQUE7QUFBQSxJQUNBLFlBQUEsR0FBZSxPQUFBLENBQVEsc0JBQVIsQ0FEZixDQUFBO0FBQUEsSUFFQSxZQUFBLEdBQWUsSUFGZixDQUFBO0FBQUEsSUFHQSxVQUFBLEdBQWEsSUFIYixDQUFBO0FBQUEsSUFLQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxNQUFNLENBQUMsVUFBUCxHQUFvQixPQUFBLENBQVEsUUFBUixDQUFpQixDQUFDLFNBQWxCLENBQTRCLFlBQTVCLENBQXBCLENBQUE7QUFBQSxNQUNBLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLE9BQUEsQ0FBUSxRQUFSLENBQWlCLENBQUMsU0FBbEIsQ0FBNEIsYUFBNUIsQ0FEckIsQ0FBQTthQUVBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO0FBQ2QsUUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFmLENBQUEsQ0FBQSxDQUFBO2VBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLFNBQUEsR0FBWSxvQkFBaEMsQ0FBcUQsQ0FBQyxJQUF0RCxDQUEyRCxTQUFBLEdBQUE7O1lBQ3pELFlBQVksQ0FBRSxPQUFkLENBQUE7V0FBQTtBQUFBLFVBQ0EsVUFBQSxHQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQSxDQURiLENBQUE7aUJBRUEsWUFBQSxHQUFtQixJQUFBLFlB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

//# sourceURL=/Users/genauck/.atom/packages/linter/spec/editor-linter-spec.coffee
