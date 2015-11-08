(function() {
  module.exports = {
    clients: {
      "source.js": require("./brokers/js"),
      "source.coffee": require("./brokers/coffee"),
      "source.python": require("./brokers/python"),
      "source.ruby": require("./brokers/ruby"),
      "text.html.php": require("./brokers/php"),
      "source.shell": require("./brokers/bash")
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2dlbmF1Y2svLmF0b20vcGFja2FnZXMvaGFzaHJvY2tldC9saWIvYnJva2Vycy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsT0FBQSxFQUNFO0FBQUEsTUFBQSxXQUFBLEVBQWlCLE9BQUEsQ0FBUSxjQUFSLENBQWpCO0FBQUEsTUFDQSxlQUFBLEVBQWlCLE9BQUEsQ0FBUSxrQkFBUixDQURqQjtBQUFBLE1BRUEsZUFBQSxFQUFpQixPQUFBLENBQVEsa0JBQVIsQ0FGakI7QUFBQSxNQUdBLGFBQUEsRUFBaUIsT0FBQSxDQUFRLGdCQUFSLENBSGpCO0FBQUEsTUFJQSxlQUFBLEVBQWlCLE9BQUEsQ0FBUSxlQUFSLENBSmpCO0FBQUEsTUFLQSxjQUFBLEVBQWlCLE9BQUEsQ0FBUSxnQkFBUixDQUxqQjtLQURGO0dBREYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/genauck/.atom/packages/hashrocket/lib/brokers.coffee
