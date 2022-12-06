function bindMenu(element, initBack) {
  const isBinded = element.getAttribute("data-bind-menu")
  if (isBinded) return;

  element.setAttribute("data-bind-menu", "true")
  const stack = []

  // bind menu items to tab content
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

  // bind counters
  const counters = {}
  const counterElements = element.querySelectorAll('.counter')
  counterElements.forEach((element) => {
    const counterName = getCounterName(element)
    initializeCounter(counters, counterName)
    subscribeToCounter(counters, counterName, element)

    element.addEventListener("click", () => {
      incrementCounter(counters, counterName)
    })
  })

  // bind back button
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

function getCounterName(element) {
  let counterName = element.getAttribute("data-counter")
  if (!counterName) {
    counterName = "default"
  }
  return counterName
}

function initializeCounter(counters, name) {
  if (counters[name] === undefined) {
    counters[name] = {
      count: 1,
      elements: []
    }
  }
}

function subscribeToCounter(counters, name, element) {
  const counter = counters[name]
  element.innerHTML = counter.count
  counter.elements = [...counter.elements, element]
  counters[name] = counter
}

function incrementCounter(counters, name) {
  const counter = counters[name]
  counter.count = counter.count + 1
  counter.elements.forEach(element => {
    element.innerHTML = counter.count
  })
  counters[name] = counter
}

export default bindMenu
