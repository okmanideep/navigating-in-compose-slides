function bindHeader(reveal) {
  setHeaderVisibility(reveal) // initial visibility

  reveal.on('slidechanged', _ => {
    setHeaderVisibility(reveal)
  })
}

function setHeaderVisibility(reveal) {
  const header = document.querySelector('.reveal header')
  if (reveal.isFirstSlide()) {
    header.classList.remove('hidden')
  } else {
    header.classList.add('hidden')
  }
}

export default bindHeader

