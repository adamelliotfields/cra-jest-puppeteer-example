# `cra-jest-puppeteer-example`

> Leveraging `react-scripts` and `react-dev-utils` to integrate `jest-puppeteer` into a `create-react-app` project.

I wanted to create a similar experience when running E2E tests with `jest-puppeteer` compared to the
existing `react-scripts test` command that is included in every Create React App (CRA) project.

The `react-scripts` and `react-dev-utils` packages export some useful utilities to help accomplish
this.

Hopefully in the future this will become built into CRA, since both Angular and Vue provide this out
of the box.

## Create a New `e2e` Script

We want to reuse as much code as possible, so instead of maintaining a separate Jest config just for
our E2E tests, we can use the `createJestConfig` function from `react-scripts`. This function
returns a regular JavaScript object we can override with the necessary properties for
`jest-puppeteer` to work.

This script is also responsible for setting environment variables including reading `.env` files
with the `env` module from `react-scripts`.

Finally, don't forget to add a new NPM script in your [`package.json`](./package.json).

See the complete script [here](./scripts/e2e.js).

## Create a `jest-puppeteer` Config

In our `jest-puppeteer` configuration, we want to make sure we use the `HTTPS`, `HOST`, and `PORT`
environment variables that could be in one of our `.env` files. This is better than hard-coding them
and possibly having a conflict.

We can also add any Puppeteer launch settings here (see the WSL2 section below).

Finally, we want to make sure we are running our tests against the same URL that we'd be developing
on locally. We can get this url by using the `prepareUrls` utilty from `react-dev-utils`.

See the complete config [here](./jest-puppeteer.config.js).

## Create E2E Tests

When we run `npm run e2e`, we don't want to run any tests that would normally be run by
`react-scripts test`.

By default, `react-scripts test` runs any tests in `src/**/*.{spec,test}.{js,ts,jsx,tsx}` or
`src/**/__tests__/*.{js,ts,jsx,tsx}`.

By putting E2E tests in the top-level `e2e` folder, we won't have any overlap with
`react-scripts test` (coincidentally, this is where E2E tests go in Angular).

In order for Jest to search for test files in this folder, we need to update the `testMatch` and
`roots` properties in our Jest config (see [`scripts/e2e.js`](./scripts/e2e.js)).

See the complete test suite [here](./e2e/index.js).

## WSL2

I ran into an issue where Puppeteer wouldn't launch in WSL2 (note that WSL2 is not the same as the
original WSL that came out in 2016). There's an open [issue](https://github.com/puppeteer/puppeteer/issues/1837).

I did find two potential solutions.

The first solution involves installing an X Server in Windows. For whatever reason, even launching
Puppeteer in headless mode wouldn't work unless the X Server was running. I already had x410
installed on Windows and LXDE installed on Linux, so this wasn't a big deal, but I prefer the second
option.

The second option was simply to install Chromium manually. I'm running Debian 10, so I ran
`sudo apt install -y --no-install-recommends chromium`. This also required setting the
`launch.executablePath` to `/usr/bin/chromium` in `jest-puppeteer.config.js`. Note that this
approach does not require running an X Server in Windows.
