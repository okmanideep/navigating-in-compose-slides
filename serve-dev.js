import express from 'express'
import fs from 'fs'
import build from './build.js'

// watch `src` and build on update
async function watchAndBuild() {
  try {
    const changes = fs.promises.watch("src", {
      recursive: true,
    })

    for await (const _ of changes) {
      await build()
    }
  } catch (error) {
    if (error.name === "AbortError"){
      return;
    }

    throw error
  }
}

const app = express()
app.use(express.static("docs"))
app.listen("3333")
await watchAndBuild()
