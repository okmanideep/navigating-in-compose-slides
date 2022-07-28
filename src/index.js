import Reveal from 'reveal.js'
import Highlight from 'reveal.js/plugin/highlight/highlight.esm'
import bindMenu from './bind-menu.js'

let deck = new Reveal({
  hash: true,
  plugins: [Highlight],
})
deck.initialize()

window.bindMenu = bindMenu
