# meteor-github

This is a version of [Mike de Boer](https://github.com/mikedeboer)'s excellent
[node-github](https://github.com/mikedeboer/node-github) npm module, repackaged
for Meteor.

## Example Usage
You can use it in exactly the same way you would use the original package
(example adapted from its GitHub page):

```javascript
var GitHub = require("github");

var github = new GitHub({
    version: "3.0.0", // required
    timeout: 5000     // optional
});

github.user.getFollowingFromUser({
    user: "ndhoule"
}, function(err, res) {
    console.log(JSON.stringify(res));
});
```

Because Meteor follows a synchronous programming model, this package allows you
to skip out on the callback if you prefer:

```javascript
var result = github.user.getFollowingFromUser({
    user: "ndhoule"
});

console.log(JSON.stringify(result));
```

## How to Get It
You can install this package through Atmosphere using
[meteorite](https://github.com/oortcloud/meteorite) by running `mrt add github`.

## Feedback
This is my first Meteor package; while there's not much to it, but I'm sure
there's room for improvement. If you like it and want to help make it better,
file an [issue](https://github.com/ndhoule/meteor-github/issues), submit a pull
request, or drop me an [email](nathan@nathanhoule.com). Thanks!
