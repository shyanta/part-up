I20150430-14:41:24.152(2)? SA GridFS - DONE!
I20150430-14:41:24.153(2)? -----------STORED STREAM _tempstore
I20150430-14:41:24.154(2)? -----------CLOSE STREAM _tempstore
I20150430-14:41:24.161(2)? TempStore progress: Received 1 of 1 chunks for 936576359706407.jpg
I20150430-14:41:24.165(2)? UPDATE: {"$set":{"uploadedAt":"2015-04-30T12:41:24.162Z"},"$unset":{"chunkCount":1,"chunkSum":1,"chunkSize":1}}
I20150430-14:41:24.170(2)? 936576359706407.jpg was successfully uploaded. You are seeing this informational message because you enabled debugging and you have not defined any listeners for the "uploaded" event on the images collection.
I20150430-14:41:24.204(2)? FileWorker ADDED - calling saveCopy 1200x520 for mDT9wDDaGmuWFCrrJ
I20150430-14:41:24.204(2)? saving to store 1200x520
I20150430-14:41:24.204(2)? createWriteStream 1200x520, internal: false
I20150430-14:41:24.205(2)? createWriteStreamForFileKey 1200x520
I20150430-14:41:24.223(2)? FS.TempStore creating read stream for mDT9wDDaGmuWFCrrJ
I20150430-14:41:24.233(2)? FileWorker ADDED - calling saveCopy original for mDT9wDDaGmuWFCrrJ
I20150430-14:41:24.234(2)? saving to store original
I20150430-14:41:24.234(2)? createWriteStream original, internal: false
I20150430-14:41:24.234(2)? createWriteStreamForFileKey original
I20150430-14:41:24.238(2)? FS.TempStore creating read stream for mDT9wDDaGmuWFCrrJ
I20150430-14:41:24.245(2)? createReadStream _tempstore
I20150430-14:41:24.246(2)? createReadStreamForFileKey _tempstore
I20150430-14:41:24.247(2)? GRIDFS { _id: 554222f3c0355ecc6370a763, root: 'cfs_gridfs._tempstore' }
I20150430-14:41:24.253(2)? FileWorker ADDED - calling saveCopy 360x360 for mDT9wDDaGmuWFCrrJ
I20150430-14:41:24.253(2)? saving to store 360x360
I20150430-14:41:24.253(2)? createWriteStream 360x360, internal: false
I20150430-14:41:24.253(2)? createWriteStreamForFileKey 360x360
I20150430-14:41:24.264(2)? FS.TempStore creating read stream for mDT9wDDaGmuWFCrrJ
I20150430-14:41:24.267(2)? createReadStream _tempstore
I20150430-14:41:24.268(2)? createReadStreamForFileKey _tempstore
I20150430-14:41:24.269(2)? GRIDFS { _id: 554222f3c0355ecc6370a763, root: 'cfs_gridfs._tempstore' }
I20150430-14:41:24.277(2)? -----------FINISH STREAM 1200x520
I20150430-14:41:24.277(2)? -----------END STREAM 1200x520
I20150430-14:41:24.282(2)? createReadStream _tempstore
I20150430-14:41:24.282(2)? createReadStreamForFileKey _tempstore
I20150430-14:41:24.282(2)? GRIDFS { _id: 554222f3c0355ecc6370a763, root: 'cfs_gridfs._tempstore' }
I20150430-14:41:24.290(2)? -----------FINISH STREAM 360x360
I20150430-14:41:24.291(2)? -----------END STREAM 360x360
I20150430-14:41:24.584(2)? -----------FINISH STREAM original
I20150430-14:41:24.584(2)? -----------FINISH STREAM original
I20150430-14:41:24.592(2)? -----------FINISH STREAM 1200x520
I20150430-14:41:24.606(2)? -----------FINISH STREAM 360x360
I20150430-14:41:25.135(2)? SA S3 - DONE!!
I20150430-14:41:25.135(2)? -----------STORED STREAM 360x360
I20150430-14:41:25.135(2)? -----------STORED STREAM 360x360
I20150430-14:41:25.136(2)? SA 360x360 stored images/mDT9wDDaGmuWFCrrJ-936576359706407.jpg
I20150430-14:41:25.136(2)? FS.File._saveChanges: 360x360
I20150430-14:41:25.136(2)? UPDATE: {"$set":{"copies.360x360":{"name":"936576359706407.jpg","type":"image/jpeg","size":19188,"key":"images/mDT9wDDaGmuWFCrrJ-936576359706407.jpg","updatedAt":"2015-04-30T12:41:25.135Z","createdAt":"2015-04-30T12:41:25.135Z"}}}
I20150430-14:41:25.137(2)? 936576359706407.jpg was successfully saved to the 360x360 store. You are seeing this informational message because you enabled debugging and you have not defined any listeners for the "stored" event on the images collection.
I20150430-14:41:25.138(2)? FS.File._saveChanges: _original
I20150430-14:41:25.138(2)? UPDATE: {"$set":{"original":{"type":"image/jpeg","size":206335,"updatedAt":"2014-04-12T17:41:29.000Z","name":"936576359706407.jpg"}}}
I20150430-14:41:25.172(2)? SA S3 - DONE!!
I20150430-14:41:25.172(2)? -----------STORED STREAM 1200x520
I20150430-14:41:25.172(2)? -----------STORED STREAM 1200x520
I20150430-14:41:25.172(2)? SA 1200x520 stored images/mDT9wDDaGmuWFCrrJ-936576359706407.jpg
I20150430-14:41:25.173(2)? FS.File._saveChanges: 1200x520
I20150430-14:41:25.173(2)? UPDATE: {"$set":{"copies.1200x520":{"name":"936576359706407.jpg","type":"image/jpeg","size":42178,"key":"images/mDT9wDDaGmuWFCrrJ-936576359706407.jpg","updatedAt":"2015-04-30T12:41:25.171Z","createdAt":"2015-04-30T12:41:25.171Z"}}}
I20150430-14:41:25.174(2)? 936576359706407.jpg was successfully saved to the 1200x520 store. You are seeing this informational message because you enabled debugging and you have not defined any listeners for the "stored" event on the images collection.
I20150430-14:41:25.175(2)? FS.File._saveChanges: _original
I20150430-14:41:25.176(2)? UPDATE: {"$set":{"original":{"type":"image/jpeg","size":206335,"updatedAt":"2014-04-12T17:41:29.000Z","name":"936576359706407.jpg"}}}
I20150430-14:41:25.294(2)? SA S3 - DONE!!
I20150430-14:41:25.294(2)? -----------STORED STREAM original
I20150430-14:41:25.294(2)? -----------STORED STREAM original
I20150430-14:41:25.294(2)? SA original stored images/mDT9wDDaGmuWFCrrJ-936576359706407.jpg
I20150430-14:41:25.294(2)? FS.File._saveChanges: original
I20150430-14:41:25.295(2)? UPDATE: {"$set":{"copies.original":{"name":"936576359706407.jpg","type":"image/jpeg","size":206335,"key":"images/mDT9wDDaGmuWFCrrJ-936576359706407.jpg","updatedAt":"2015-04-30T12:41:25.293Z","createdAt":"2015-04-30T12:41:25.293Z"}}}
I20150430-14:41:25.296(2)? 936576359706407.jpg was successfully saved to the original store. You are seeing this informational message because you enabled debugging and you have not defined any listeners for the "stored" event on the images collection.
I20150430-14:41:25.297(2)? FS.File._saveChanges: _original
I20150430-14:41:25.297(2)? UPDATE: {"$set":{"original":{"type":"image/jpeg","size":206335,"updatedAt":"2014-04-12T17:41:29.000Z","name":"936576359706407.jpg"}}}
I20150430-14:41:25.308(2)? FileWorker ADDED - calling deleteChunks for mDT9wDDaGmuWFCrrJ
I20150430-14:41:25.309(2)? ---SA REMOVE
I20150430-14:41:33.624(2)? token: eyJhdXRoVG9rZW4iOiIzV29vREdEWnpZT2JKV3R3cE9XWGRsTmI1UFkzbXYzTkM4Z2M0WGswTDZsIn0=
I20150430-14:41:33.626(2)? GET FILERECORD: mDT9wDDaGmuWFCrrJ
I20150430-14:41:33.628(2)? Read file "936576359706407.jpg" bytes 0-19187/19188
I20150430-14:41:33.628(2)? createReadStream 360x360
I20150430-14:41:33.628(2)? createReadStreamForFileKey 360x360

http.js:732
    throw new Error('Can\'t render headers after they are sent to the client.'
    ^
Error: Can't render headers after they are sent to the client.
    at ServerResponse.OutgoingMessage._renderHeaders (http.js:732:11)
    at ServerResponse.writeHead (http.js:1153:20)
    at ProxyServer.<anonymous> (/Users/bryantebeek/.meteor/packages/meteor-tool/.1.1.3.1sra5fd++os.osx.x86_64+web.browser+web.cordova/mt-os.osx.x86_64/tools/run-proxy.js:96:21)
    at ProxyServer.emit (/Users/bryantebeek/.meteor/packages/meteor-tool/.1.1.3.1sra5fd++os.osx.x86_64+web.browser+web.cordova/mt-os.osx.x86_64/dev_bundle/lib/node_modules/http-proxy/node_modules/eventemitter3/index.js:100:27)
    at ClientRequest.proxyError (/Users/bryantebeek/.meteor/packages/meteor-tool/.1.1.3.1sra5fd++os.osx.x86_64+web.browser+web.cordova/mt-os.osx.x86_64/dev_bundle/lib/node_modules/http-proxy/lib/http-proxy/passes/web-incoming.js:140:16)
    at ClientRequest.emit (events.js:117:20)
    at Socket.socketOnData (http.js:1593:9)
    at TCP.onread (net.js:528:27)
