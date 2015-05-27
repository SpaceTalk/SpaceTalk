# Testing

## UI Component Testing

For UI Component testing you use the Client Integration mode of sanjo:jasmine.
Have a look at the existing tests to learn the patterns of writing UI
Component tests. A good example is: `TODO: ...`.

### Keeping reactivity under control

First you should understand how reactivity and Meteor works.
The component that manages reactivity is called Tracker (previously Deps).
You can read how it works in the [Meteor Manual](http://manual.meteor.com/#deps-theflushcycle).

Each time you trigger an action that will cause reactive behavior and
you want to test the result of the reactive behavior, you should
call `Tracker.flush()` after triggering the action. This will ensure that
all reactive changes are applied before you evaluate your expectations.

__When is a `Tracker.flush()` call required? (incomplete list)?__

* After rendering templates with `Blaze.render` and `Blaze.renderWithData`
* After triggering DOM events
* After changing data in collections

If your expectations fail and you have verified manually that the tested
behavior works, you can try to insert a `Tracker.flush` before your expectations.

### What you cannot test

#### UI interaction that involves focusing

Because the tests are executed in a hidden iFrame that is embedded in the app,
those tests are non-deterministic.
