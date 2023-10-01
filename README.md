# rollup-side-effectful-imports-order-broken-demo

> **Note**
> The issue here is already reported in https://github.com/rollup/rollup/issues/3888

ECMAScript modules allow us to import modules with side effects and the order of side effects should be deterministic when there is no top-level await (TODO: cite the precise place from the ES modules spec here).

Suppose we have a.js and b.js like the following, where the side-effectful imports just call "console.log()":

- a.js

  ```javascript
  import "../lib/first-side-effect.js";
  import "../lib/second-side-effect.js";
  ```

- b.js
  ```javascript
  import "../lib/second-side-effect.js";
  ```

Then executing a.js should emit something like the following:

```
first-side-effect
second-side-effect
```

And it's trivial to confirm this behavior using web browsers / Node.js / Deno / Bun. All the major known engines execute this correctly.

However, Rollup (tested v3.29.4) compiles a.js and b.js into the following:

- a.js
  ```javascript
  import "./b.js";
  console.log("first-side-effect");
  ```
- b.js
  ```
  console.log("second-side-effect");
  ```

This is because Rollup tries to share the common module.
However, since the side effects in the imported modules are always executed before the module top level code, a.js from Rollup build emits the following when executed:

```
second-side-effect
first-side-effect
```

Here we see that the order of the side effects are wrong. I confirmed that the exact same issue happens for Vite (tested v4.4.9) since it is internally using Rollup.

## How to run the repro in this repo

```sh
npm ci
npm run rollup:check
```

## Related discussions

- https://github.com/rollup/rollup/issues/3888
- https://github.com/evanw/esbuild/issues/399
- https://github.com/parcel-bundler/parcel/issues/5659
