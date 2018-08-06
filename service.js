'use strict'

const 42d = require('./')
const util = require('util')

var daemon = new 42d({
  // Load additional daemon parameters here
})

function log (message) {
  console.log(util.format('%s: %s', (new Date()).toUTCString(), message))
}

daemon.on('start', (args) => {
  log(util.format('42d has started... %s', args))
})

daemon.on('started', () => {
  log('42d is attempting to synchronize with the network...')
})

daemon.on('syncing', (info) => {
  log(util.format('42d has syncronized %s out of %s blocks [%s%]', info.height, info.network_height, info.percent))
})

daemon.on('synced', () => {
  log('42d is synchronized with the network...')
})

daemon.on('ready', (info) => {
  log(util.format('42d is waiting for connections at %s @ %s - %s H/s', info.height, info.difficulty, info.globalHashRate))
})

daemon.on('desync', (daemon, network, deviance) => {
  log(util.format('42d is currently off the blockchain by %s blocks. Network: %s  Daemon: %s', deviance, network, daemon))
})

daemon.on('down', () => {
  log('42d is not responding... stopping process...')
  daemon.stop()
})

daemon.on('stopped', (exitcode) => {
  log(util.format('42d has closed (exitcode: %s)... restarting process...', exitcode))
  daemon.start()
})

daemon.on('info', (info) => {
  log(info)
})

daemon.on('error', (err) => {
  log(err)
})

daemon.start()
