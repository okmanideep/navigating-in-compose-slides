import Reveal from 'reveal.js'
import Highlight from 'reveal.js/plugin/highlight/highlight.esm'
import bindMenu from './bind-menu.js'
import bindHeader from './header-control.js'

let deck = new Reveal({
  hash: true,
  plugins: [Highlight],
})
deck.initialize()

deck.on('ready', () => {
  bindHeader(deck)
})

window.bindMenu = bindMenu
