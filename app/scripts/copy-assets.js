#!/usr/bin/env node
const fs = require('fs')
const fsp = fs.promises
const path = require('path')

const srcDir = path.join(__dirname, '..', 'src', 'assets', 'data')
const destDir = path.join(__dirname, '..', 'public', 'assets', 'data')

async function ensureDir(dir) {
  try {
    await fsp.mkdir(dir, { recursive: true })
  } catch (err) {
    // ignore
  }
}

async function copyFiles() {
  try {
    await ensureDir(destDir)
    const files = await fsp.readdir(srcDir)
    const jsonFiles = files.filter(f => f.toLowerCase().endsWith('.json'))
    for (const file of jsonFiles) {
      const src = path.join(srcDir, file)
      const dest = path.join(destDir, file)
      await fsp.copyFile(src, dest)
    }
    console.log(`Copied ${jsonFiles.length} JSON files to ${destDir}`)
  } catch (err) {
    console.error('Error copying JSON assets:', err.message)
    process.exitCode = 1
  }
}

copyFiles()
