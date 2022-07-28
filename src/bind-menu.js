function bindMenu(element, initBack) {
  const isBinded = element.getAttribute("data-bind-menu")
  if (isBinded) return;

  element.setAttribute("data-bind-menu", "true")

  const stack = []
  const menuItems = element.querySelectorAll("nav a")
  const tabContainer = element.querySelector(".tab-container")
  menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const curIndex = parseInt(tabContainer.getAttribute("data-index"))
      if (curIndex == index) return

      stack.push(curIndex)
      tabContainer.setAttribute("data-index", `${index}`)
      selectMenuItem(menuItems, index)
    })
  })

  if (!initBack) return
  const back = element.querySelector(".system-nav .back")
  back.addEventListener("click", () => {
    if (stack.length > 0) {
      const i = stack.pop();
      tabContainer.setAttribute("data-index", `${i}`)
      selectMenuItem(menuItems, i)
    } else {
      tabContainer.setAttribute("data-index", "0")
      selectMenuItem(menuItems, 0)
    }
  })
}

function selectMenuItem(items, index) {
  items.forEach((item, i) => {
    if (index === i) {
      item.classList.add("selected")
    } else {
      item.classList.remove("selected")
    }
  })
}

export default bindMenu
