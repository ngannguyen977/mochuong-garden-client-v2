import Quagga from 'quagga'
export const app = {
    lastResult: null,
    init: function () {

        Quagga.init({
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                constraints: {
                    width: { min: 640 },
                    height: { min: 480 },
                    facingMode: "environment",
                    aspectRatio: { min: 1, max: 2 }
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true
                },
                numOfWorkers: 2,
                frequency: 10,
                locate: true,
                target: document.querySelector('#scanner')    // Or '#yourElement' (optional)
            },
            decoder: {
                readers: [{
                    format: "code_128_reader",
                    config: {}
                },{
                    format: "ean_reader",
                    config: {
                        supplements: [
                            'ean_5_reader', 'ean_2_reader'
                        ]
                    }}]
            }
        }, function (err) {
            if (err) {
                return app.handleError(err)
            }
            app.initCamera()
            Quagga.start()
        })
    },
    initCamera: function () {
        let streamLabel = Quagga.CameraAccess.getActiveStreamLabel()
        return Quagga.CameraAccess.enumerateVideoDevices().then(devices => {
            console.log('devices', devices)
        })

    },
    stop: function (e) {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault()
        }
        Quagga.stop()
    },
    resultCollector: function () {
        return Quagga.ResultCollector.create({
            capture: true,
            capacity: 20,
            filter: function (codeResult) {
                // only store results which match this constraint
                // e.g.: codeResult
                console.log('result', codeResult)
                return codeResult
            }
        })
    },
    handleError: function (err) {
        console.log(err)
    },
    onProcessed: function () {
        return Quagga.onProcessed(function (result) {
            let drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")))
                    result.boxes.filter(function (box) {
                        return box !== result.box
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 })
                    })
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 })
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 })
                }
            }
        })
    },
    onDetected: function (callback) {
         Quagga.onDetected(function (result) {
            let code = result.codeResult.code
            if (app.lastResult !== code) {
                app.lastResult = code
                callback(code)
            }
        })
    }
}
export default app