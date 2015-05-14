SpaceTalk is an open-source chat app built with Meteor.

Note: SpaceTalk is beta software. Most of it should work but it's still a little unpolished and you'll probably find some bugs. Use at your own risk :)

### We Need Your Help!

A lot of work has already gone into SpaceTalk, but it needs that final push to reach its full potential.

So if you'd like to be part of the project, please check out the [roadmap](https://trello.com/b/R9Nh1V3t/spacetalk-roadmap) and [issues](https://github.com/SpaceTalk/SpaceTalk/issues) to see if there's anything you can help with.

### Features

- [x] Channels for multiple users
- [x] Markdown in messages
- [x] Gravatar profile pictures
- [x] Auto-resizing textarea
- [ ] Auto-scroll on new messages

### Important features (We want these)

- [ ] List of people
- [ ] Online status
- [ ] Direct messages
- [ ] Notifications
- [ ] Mentions
- [ ] Email notifications
- [ ] Rich embeds
- [ ] Private groups
- [ ] Channel members

### Prerequisites

* [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Meteor](https://www.meteor.com/install)

### Getting started

Clone the repository:

```
git clone git@github.com:SpaceTalk/SpaceTalk.git
```

Start the app:

```
cd SpaceTalk
meteor
```

### Deploying

Here are guides on deploying your app on some different clouds:

#### Digital Ocean

Here's a [$10 reference promo to setup a new droplet](https://www.digitalocean.com/?refcode=0d850306ddd1), and do check if this promo code works as well: **DROPLET10**

1. Create a droplet on Digital Ocean
  * And add your SSH-key (it makes it simpler). ```pbcopy < ~/.ssh/id-rsa.pub```
2. Install and use [Meteor Up](https://github.com/arunoda/meteor-up)
3. Create a .deploy folder for the Meteor Up settings.

  ```
  mkdir .deploy
  cd .deploy
  mup init
  ```

4. Add your settings for the droplet and your ssh-key in mup.json
5. Setup your machine with node.js, mongo and spiderable (if desired).

  ```
  mup setup
  ```

6. Deploy your app to the droplet

  ```
  mup deploy
  ```

#### Meteor

```
meteor deploy my-spacetalk-app.meteor.com
```

####

### Disclaimer

This code is part of the Meteor Workshop that takes place on the 14th of May 2015 in Gothenburg Sweden.

Where we built a chat application in 25 steps (https://slides.com/timbrandin/meteor-slack) – originally designed to look a little bit like Slack.

It was made solely made do demonstrate the efficiency and simple nature of Meteor applications.

### Credits

Thanks to [@timbrandin](https://twitter.com/timbrandin) who created this material, and the experts who helped to improve and make this workshop awesome (in alphabetical order):

* Andreas Rolén ([@adderollen](https://twitter.com/adderollen))
* Johan Brook ([@johanbrook](https://twitter.com/johanbrook))
* Oscar ([@oscrse](https://twitter.com/oscrse))
* Patrik ([@gopatrik](https://twitter.com/gopatrik))
* Per Fredelius ([@worldsayshi](https://github.com/worldsayshi))
* Robin Lindh Nilsson (?)
* Tim Brandin ([@timbrandin](https://twitter.com/timbrandin))
* Tobias Tikka ([@tobiastikka](https://twitter.com/tobiastikka))

### License

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
MA  02110-1301, USA.

-------

Copyright © 2014 Tim Brandin &amp; SpaceTalk
