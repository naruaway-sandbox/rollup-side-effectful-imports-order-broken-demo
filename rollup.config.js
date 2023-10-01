/** @type {import('rollup').RollupOptions} */
export default {
  input: {
    a: './src/entries/a.js',
    b: './src/entries/b.js',
  },
  output: {
    dir: './dist-rollup',
  },
};
