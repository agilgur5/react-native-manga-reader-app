# react-native-manga-reader-app

A React Native / Expo app for cross-platform manga reading

[View the Expo app](https://expo.io/@agilgur5/react-native-manga-reader-app)

<br>

## Why?

Wanted to build my first RN cross-platform app without the constraints of having to integrate with an existing codebase.

I figured a cross-platform manga reader app would be a somewhat easy starter project and would actually be something I would personally use as the options on both platforms don't completely match what I'm looking for.

Decided to use Expo since it's the easiest platform to start developing on when you don't have to integrate with an existing codebase. I would probably be more in favor of [Haul](https://github.com/callstack/haul) or [spinjs](https://github.com/sysgears/spinjs) plus an integation with Expo as they're Webpack-based.
Having a custom webpack config integrated with my [front end boilerplate](https://github.com/agilgur5/front-end-base) and `react-native-web` would be ideal for single codebase development and similar configuration of JS and CSS across all platforms.

<br>

## Misc

Parts of the codebase were originally `cp`'d from [yinshanyang/manga](https://github.com/yinshanyang/manga) as a starting point.
Since then, much of it has been highly refactored, reorganized, bugfixed, changed, etc.
The API and scraper code is still mostly the same, as is the styling / layout of main Manga List View and the Chapter List View, for now.
Will likely continue to change more and more as I get into it and add new sites, `AsyncStorage`, `FileSystem` storage, Search, more loading icons, better image components, etc.
