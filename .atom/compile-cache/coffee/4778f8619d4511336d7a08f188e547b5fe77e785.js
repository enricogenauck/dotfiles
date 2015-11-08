(function() {
  var BufferedProcess;

  BufferedProcess = require("atom").BufferedProcess;

  module.exports = {
    exec: function(file, callback) {
      var response;
      response = "";
      return new BufferedProcess({
        command: atom.config.get("hashrocket.nodeExecutablePath"),
        args: [file],
        stdout: function(data) {
          return response += data.toString();
        },
        exit: function() {
          return callback(response);
        }
      });
    },
    printer: "console.log(\"<$1>\" + ($2) + \"</$1>\")",
    prefix: "//=>",
    matcher: /(\/\/=>)(.+)/gi,
    comment: "//"
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2dlbmF1Y2svLmF0b20vcGFja2FnZXMvaGFzaHJvY2tldC9saWIvYnJva2Vycy9qcy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZUFBQTs7QUFBQSxFQUFDLGtCQUFtQixPQUFBLENBQVEsTUFBUixFQUFuQixlQUFELENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxJQUFBLEVBQWUsU0FBQyxJQUFELEVBQU8sUUFBUCxHQUFBO0FBQ2IsVUFBQSxRQUFBO0FBQUEsTUFBQSxRQUFBLEdBQVcsRUFBWCxDQUFBO2FBQ0ksSUFBQSxlQUFBLENBQ0Y7QUFBQSxRQUFBLE9BQUEsRUFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsK0JBQWhCLENBQVY7QUFBQSxRQUNBLElBQUEsRUFBVSxDQUFDLElBQUQsQ0FEVjtBQUFBLFFBRUEsTUFBQSxFQUFVLFNBQUMsSUFBRCxHQUFBO2lCQUFTLFFBQUEsSUFBWSxJQUFJLENBQUMsUUFBTCxDQUFBLEVBQXJCO1FBQUEsQ0FGVjtBQUFBLFFBR0EsSUFBQSxFQUFVLFNBQUEsR0FBQTtpQkFBRyxRQUFBLENBQVMsUUFBVCxFQUFIO1FBQUEsQ0FIVjtPQURFLEVBRlM7SUFBQSxDQUFmO0FBQUEsSUFRQSxPQUFBLEVBQWUsMENBUmY7QUFBQSxJQVNBLE1BQUEsRUFBZSxNQVRmO0FBQUEsSUFVQSxPQUFBLEVBQWUsZ0JBVmY7QUFBQSxJQVdBLE9BQUEsRUFBZSxJQVhmO0dBSEYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/genauck/.atom/packages/hashrocket/lib/brokers/js.coffee
