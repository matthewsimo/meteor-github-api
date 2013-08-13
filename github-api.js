/*jshint expr:true*/

var Future = Npm.require("fibers/future");

/**
 * Creates an instance of the github class.
 *
 * @param {Object} An object containing the target version of the GitHub API
 * and, optionally, a timeout for calls to the GitHub API.
 */
GitHub = function(config) {
  var wrap, target,
      Module = Npm.require("github"),
      interface = new Module(config),
      rx = /[1-3]\.0\.0/;

  /**
   * Wraps an asynchronous function in a future, making it synchronous.
   *
   * @param {Function} The function to be wrapped in a future.
   * @return A future-backed promise.
   */
  wrap = function(fn) {
    return function() {
      var future = new Future(),
          args = _.toArray(arguments),
          lastArg = _.last(args);

      // If a callback is provided, wrap it in a future without changing the
      // called function's API
      if (_.isFunction(lastArg)) {
        args[args.length - 1] = function(error, data) {
          if (error) {
            future.throw(error);
          } else {
            lastArg(error, data);
            future.return();
          }
        };
      } else {
        // If no callback is provided, set up a default one backed by a future
        args.push(function(error, data) {
          if (error) {
            future.throw(error);
          } else {
            future.return(data);
          }
        });
      }

      fn.apply(this, args);
      return future.wait();
    };
  };

  // Get a list of the modules that contain functions we need to modify.
  // interface['3.0.0'].routes (subbing in a different API version as necessary)
  // will give us the names of all these modules.
  //
  // TODO: Can we make this less janky/fragile?
  target = _.filter(interface, function(val, name) {
    return rx.test(name);
  })[0].routes;

  // Iterate over all modules and shim each method to be synchronous. Guard
  // against iterating over non-objects and against modifying non-functions.
  _.each(interface, function(obj) {
    if (_.isObject(obj)) {
      _.each(obj, function(fn, name, module) {
        if (_.isFunction(fn)) {
          module[name] = wrap(fn);
        }
      });
    }
  });

  return interface;
};
