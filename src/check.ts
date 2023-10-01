import { $ } from 'zx'

const o = await $`node dist-rollup/a.js`

const stringifiedLines = JSON.stringify(o.stdout.split('\n').map(l => l.trim()).filter(Boolean))

if (stringifiedLines !== JSON.stringify(['first-side-effect', 'second-side-effect'])) {
  throw new Error('side effects were executed in a wrong order: ' + stringifiedLines)
}
