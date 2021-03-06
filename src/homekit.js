module.exports = function(RED) {
    const debug = require('debug')('NRCHKB')
    const HAPStorage = require('hap-nodejs').HAPStorage
    const API = require('./lib/api')(RED)
    const HAPBridgeNode = require('./lib/HAPBridgeNode')(RED)
    const HAPServiceNode = require('./lib/HAPServiceNode')(RED)

    // Initialize our storage system
    if (RED.settings.available()) {
        debug('RED settings available')
        HAPStorage.setCustomStoragePath(RED.settings.userDir + '/homekit-persist')
    } else {
        debug('RED settings not available')
    }

    // Initialize API
    API.init()

    RED.nodes.registerType('homekit-bridge', HAPBridgeNode.init)
    RED.nodes.registerType('homekit-service', HAPServiceNode.init)
}
