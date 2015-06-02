SpaceTalk is an open-source chat app built with Meteor.

Note: SpaceTalk is beta software. Most of it should work but it's still a little unpolished and you'll probably find some bugs. Use at your own risk :)

### We Need Your Help!

A lot of work has already gone into SpaceTalk, but it needs that final push to reach its full potential.

So if you'd like to be part of the project, please check out the [roadmap](https://trello.com/b/R9Nh1V3t/spacetalk-roadmap) and [issues](https://github.com/SpaceTalk/SpaceTalk/issues) to see if there's anything you can help with.

### Prerequisites

* [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Meteor](https://www.meteor.com/install)

### Style Guide & Naming Conventions

* We're following [Meteor Style Guide](https://github.com/meteor/meteor/wiki/Meteor-Style-Guide)
* Template names: `<template name="camelCase"></template>`
* Route names: `dashed-case/routing-perhaps`
* File names: `dashed-case.html`, `dashed-case.js`
* Custom HTML id / class naming convention: `<div id="dashed-case"></div>` however class names preferred instead of using ids `<div class="some-custom-class"></div>`


### Getting started

Fork the repository with the [top right button](https://github.com/SpaceTalk/SpaceTalk#fork-destination-box) and clone your fork:

```
git clone https://github.com/YOURGITHUBUSERNAME/SpaceTalk.git
```

Add the remote source to your local clone:

```
git remote add upstream https://github.com/SpaceTalk/SpaceTalk.git
```

Start the app:

```
cd SpaceTalk
meteor run --settings=settings.json
```

Or for Mac and Unix users. This executes the exact same command but doens't make you forget adding the settings argument.
```
cd SpaceTalk
./run
```

To update your clone do a pull:

```
git pull upstream master
```

Commit your changes to your fork, and create Pull Request with [github helper](https://github.com/SpaceTalk/SpaceTalk/compare/master...#)

### Guidelines for reviewing Pull Requests

1. Code follows the [Meteor Style Guide](https://github.com/meteor/meteor/wiki/Meteor-Style-Guide)
2. Code doesn’t break things (The app can still run)

### Libraries

This project is in flux at the moment, these are the currently agreed upon client side libraries:

* CSS Pre-Processor: [Sass / .scss](http://sass-lang.com/)
* Icon Font Library: [FontAwesome](http://fortawesome.github.io/Font-Awesome/)

### Packages

This project is in flux at the moment, these are the currently used Meteor packages:

* markdown
* reactive-var
* accounts-password
* momentjs:moment
* fourseven:scss
* copleykj:jquery-autosize
* tmeasday:gravatar
* meteorhacks:flow-layout
* meteorhacks:flow-router
* peerlibrary:blaze-components
* mizzao:user-status
* todda00:friendly-slugs
* useraccounts:core
* arillo:flow-router-helpers
* seriousm:emoji-continued
* mrt:tiny-scrollbar
* jquery
* kevohagan:sweetalert
* fortawesome:fontawesome
* aldeed:autoform
* useraccounts:unstyled
* dburles:collection-helpers
* iframely:oembed
* matb33:collection-hooks
* qnub:emojione
* mquandalle:jquery-textcomplete
* ogourment:settings
* tmeasday:presence

### Disclaimer

This code was part of a [Meteor Workshop](http://www.meetup.com/Meteor-Goteborg/events/221282857/) that took place on the 14th of May 2015 in Gothenburg, Sweden.

We used it to build a chat application in 25 steps (https://slides.com/timbrandin/meteor-slack) – it was originally designed to look a little bit like Slack.

But it was solely made do demonstrate the efficiency and simple nature of Meteor applications.

#### Credits

Thanks to [@timbrandin](https://twitter.com/timbrandin) who created this material for [a Meteor workshop](http://www.meetup.com/Meteor-Goteborg/events/221282857/).

### License

Note that SpaceTalk is distributed under the [MIT License](http://opensource.org/licenses/MIT).

-------

Copyright © 2015 Tim Brandin &amp; SpaceTalk
