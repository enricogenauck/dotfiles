(function() {
  var BufferedProcess;

  BufferedProcess = require("atom").BufferedProcess;

  module.exports = {
    exec: function(file, callback) {
      var response;
      response = "";
      return new BufferedProcess({
        command: atom.config.get("hashrocket.pythonExecutablePath"),
        args: [file],
        stdout: function(data) {
          return response += data.toString();
        },
        exit: function() {
          return callback(response);
        }
      });
    },
    printer: "print \"<$1>\", ($2), \"</$1>\"",
    prefix: "#=>",
    matcher: /(#=>)(.+)/gi,
    comment: "#"
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2dlbmF1Y2svLmF0b20vcGFja2FnZXMvaGFzaHJvY2tldC9saWIvYnJva2Vycy9weXRob24uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGVBQUE7O0FBQUEsRUFBQyxrQkFBbUIsT0FBQSxDQUFRLE1BQVIsRUFBbkIsZUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsSUFBQSxFQUFlLFNBQUMsSUFBRCxFQUFPLFFBQVAsR0FBQTtBQUNiLFVBQUEsUUFBQTtBQUFBLE1BQUEsUUFBQSxHQUFXLEVBQVgsQ0FBQTthQUNJLElBQUEsZUFBQSxDQUNGO0FBQUEsUUFBQSxPQUFBLEVBQVUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGlDQUFoQixDQUFWO0FBQUEsUUFDQSxJQUFBLEVBQVUsQ0FBQyxJQUFELENBRFY7QUFBQSxRQUVBLE1BQUEsRUFBVSxTQUFDLElBQUQsR0FBQTtpQkFBUyxRQUFBLElBQVksSUFBSSxDQUFDLFFBQUwsQ0FBQSxFQUFyQjtRQUFBLENBRlY7QUFBQSxRQUdBLElBQUEsRUFBVSxTQUFBLEdBQUE7aUJBQUcsUUFBQSxDQUFTLFFBQVQsRUFBSDtRQUFBLENBSFY7T0FERSxFQUZTO0lBQUEsQ0FBZjtBQUFBLElBUUEsT0FBQSxFQUFlLGlDQVJmO0FBQUEsSUFTQSxNQUFBLEVBQWUsS0FUZjtBQUFBLElBVUEsT0FBQSxFQUFlLGFBVmY7QUFBQSxJQVdBLE9BQUEsRUFBZSxHQVhmO0dBSEYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/genauck/.atom/packages/hashrocket/lib/brokers/python.coffee
