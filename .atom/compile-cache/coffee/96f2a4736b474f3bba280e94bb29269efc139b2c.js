(function() {
  var BufferedProcess;

  BufferedProcess = require("atom").BufferedProcess;

  module.exports = {
    exec: function(file, callback) {
      var response;
      response = "";
      return new BufferedProcess({
        command: atom.config.get("hashrocket.bashExecutablePath"),
        args: [file],
        stdout: function(data) {
          return response += data.toString();
        },
        exit: function() {
          return callback(response);
        }
      });
    },
    printer: "echo \"<$1>`echo $2`</$1>\"",
    prefix: "#=>",
    matcher: /(#=>)(.+)/gi,
    comment: "#"
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2dlbmF1Y2svLmF0b20vcGFja2FnZXMvaGFzaHJvY2tldC9saWIvYnJva2Vycy9iYXNoLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxlQUFBOztBQUFBLEVBQUMsa0JBQW1CLE9BQUEsQ0FBUSxNQUFSLEVBQW5CLGVBQUQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLElBQUEsRUFBZSxTQUFDLElBQUQsRUFBTyxRQUFQLEdBQUE7QUFDYixVQUFBLFFBQUE7QUFBQSxNQUFBLFFBQUEsR0FBVyxFQUFYLENBQUE7YUFDSSxJQUFBLGVBQUEsQ0FDRjtBQUFBLFFBQUEsT0FBQSxFQUFVLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiwrQkFBaEIsQ0FBVjtBQUFBLFFBQ0EsSUFBQSxFQUFVLENBQUMsSUFBRCxDQURWO0FBQUEsUUFFQSxNQUFBLEVBQVUsU0FBQyxJQUFELEdBQUE7aUJBQVMsUUFBQSxJQUFZLElBQUksQ0FBQyxRQUFMLENBQUEsRUFBckI7UUFBQSxDQUZWO0FBQUEsUUFHQSxJQUFBLEVBQVUsU0FBQSxHQUFBO2lCQUFHLFFBQUEsQ0FBUyxRQUFULEVBQUg7UUFBQSxDQUhWO09BREUsRUFGUztJQUFBLENBQWY7QUFBQSxJQVFBLE9BQUEsRUFBZSw2QkFSZjtBQUFBLElBU0EsTUFBQSxFQUFlLEtBVGY7QUFBQSxJQVVBLE9BQUEsRUFBZSxhQVZmO0FBQUEsSUFXQSxPQUFBLEVBQWUsR0FYZjtHQUhGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/genauck/.atom/packages/hashrocket/lib/brokers/bash.coffee
