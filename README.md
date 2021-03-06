# react-native-manga-reader-app

<!-- releases / versioning -->
[![runs-with-expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/@agilgur5/react-native-manga-reader-app)
[![releases](https://img.shields.io/github/v/release/agilgur5/react-native-manga-reader-app?include_prereleases&sort=semver)](https://github.com/agilgur5/react-native-manga-reader-app/releases)
[![commits](https://img.shields.io/github/commits-since/agilgur5/react-native-manga-reader-app/latest.svg)](https://github.com/agilgur5/react-native-manga-reader-app/commits/master)

<!-- render icon from Expo CDN at its native dimensions -->
<p align='center'>
  <img width='192' height='192' src='https://d1wp6m56sqw74a.cloudfront.net/~assets/48e9407ff061a854a5103c70faaf897f' />
</p>

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
The API and scraper code is still mostly the same, as is some of the styling / layout, for now.
Have added many features like Search, persistence (via [`mst-persist`](https://github.com/agilgur5/mst-persist)), Favorites, Chapter Read/Unread indicators, Chapter Release Dates, New Chapter indicators, and will likely continue to change more and more.
