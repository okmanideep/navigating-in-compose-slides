import fs from 'fs'
import path from 'path'
import { Liquid } from 'liquidjs'
import CleanCss from 'clean-css'
import esbuild from 'esbuild'

// es-build of src/index.js
async function js() {
  const result = await esbuild.build({
    entryPoints: ["src/index.js"],
    write: false,
    bundle: true,
  })
  const [indexJs] = result.outputFiles
  return indexJs.text
}

async function css() {
  const directory = await fs.promises.readdir("src/css", {
    withFileTypes: true
  })
  const cssFiles = directory
    .filter(f => f.isFile())
    .map(f => f.name)
    .map(filename => path.join("src/css", filename))

  const cssOutput = await (new CleanCss({
    returnPromise: true
  })).minify([
    "node_modules/reveal.js/dist/reset.css",
    "node_modules/reveal.js/dist/reveal.css",
    ...cssFiles
  ])

  return cssOutput.styles
}

async function main() {
  try {
    await fs.promises.access("docs", fs.constants.R_OK | fs.constants.W_OK)
  } catch (_) {
    console.log("Creating docs directory")
    await fs.promises.mkdir("docs")
  } finally {
    // clean`/docs` folder if exists
    console.log("Cleaning docs")
    await fs.promises.rm("docs/index.html", { force: true })
  }

  const liquid = new Liquid({
    root: "src",
    extname: ".html"
  })

  const [INLINE_JS, INLINE_CSS] = await Promise.all([js(), css()])
  const htmlStream = await liquid.renderFileToNodeStream("index", { INLINE_CSS, INLINE_JS })
  await fs.promises.writeFile("docs/index.html", htmlStream)
  console.log("Updated docs/index.html")
}

await main()

export default main
