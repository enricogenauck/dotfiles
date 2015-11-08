(function() {
  var BufferedProcess, coffee, fs;

  BufferedProcess = require("atom").BufferedProcess;

  coffee = require("coffee-script");

  fs = require("fs");

  module.exports = {
    exec: function(file, callback) {
      var js, jsFile, response;
      try {
        js = coffee.compile(fs.readFileSync(file).toString());
        jsFile = "" + file + ".js";
        fs.writeFileSync(jsFile, js);
        response = "";
        return new BufferedProcess({
          command: atom.config.get("hashrocket.nodeExecutablePath"),
          args: [jsFile],
          stdout: function(data) {
            return response += data.toString();
          },
          exit: function() {
            return callback(response);
          }
        });
      } catch (_error) {}
    },
    printer: "console.log \"<$1>\#{$2}</$1>\"",
    prefix: "#=>",
    matcher: /(#=>)(.+)/gi,
    comment: "#"
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2dlbmF1Y2svLmF0b20vcGFja2FnZXMvaGFzaHJvY2tldC9saWIvYnJva2Vycy9jb2ZmZWUuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJCQUFBOztBQUFBLEVBQUMsa0JBQW1CLE9BQUEsQ0FBUSxNQUFSLEVBQW5CLGVBQUQsQ0FBQTs7QUFBQSxFQUNBLE1BQUEsR0FBb0IsT0FBQSxDQUFRLGVBQVIsQ0FEcEIsQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBb0IsT0FBQSxDQUFRLElBQVIsQ0FGcEIsQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLElBQUEsRUFBZSxTQUFDLElBQUQsRUFBTyxRQUFQLEdBQUE7QUFFYixVQUFBLG9CQUFBO0FBQUE7QUFDRSxRQUFBLEVBQUEsR0FBVyxNQUFNLENBQUMsT0FBUCxDQUFlLEVBQUUsQ0FBQyxZQUFILENBQWdCLElBQWhCLENBQXFCLENBQUMsUUFBdEIsQ0FBQSxDQUFmLENBQVgsQ0FBQTtBQUFBLFFBQ0EsTUFBQSxHQUFXLEVBQUEsR0FBRyxJQUFILEdBQVEsS0FEbkIsQ0FBQTtBQUFBLFFBRUEsRUFBRSxDQUFDLGFBQUgsQ0FBaUIsTUFBakIsRUFBeUIsRUFBekIsQ0FGQSxDQUFBO0FBQUEsUUFHQSxRQUFBLEdBQVcsRUFIWCxDQUFBO2VBSUksSUFBQSxlQUFBLENBQ0Y7QUFBQSxVQUFBLE9BQUEsRUFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsK0JBQWhCLENBQVY7QUFBQSxVQUNBLElBQUEsRUFBVSxDQUFDLE1BQUQsQ0FEVjtBQUFBLFVBRUEsTUFBQSxFQUFVLFNBQUMsSUFBRCxHQUFBO21CQUFTLFFBQUEsSUFBWSxJQUFJLENBQUMsUUFBTCxDQUFBLEVBQXJCO1VBQUEsQ0FGVjtBQUFBLFVBR0EsSUFBQSxFQUFVLFNBQUEsR0FBQTttQkFBRyxRQUFBLENBQVMsUUFBVCxFQUFIO1VBQUEsQ0FIVjtTQURFLEVBTE47T0FBQSxrQkFGYTtJQUFBLENBQWY7QUFBQSxJQWFBLE9BQUEsRUFBZ0IsaUNBYmhCO0FBQUEsSUFjQSxNQUFBLEVBQWUsS0FkZjtBQUFBLElBZUEsT0FBQSxFQUFlLGFBZmY7QUFBQSxJQWdCQSxPQUFBLEVBQWUsR0FoQmY7R0FMRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/genauck/.atom/packages/hashrocket/lib/brokers/coffee.coffee
