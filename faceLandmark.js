let video
let faceapi
let detections = []

function setup() {
    createCanvas(640, 480)
    video = createCapture(VIDEO)
    video.size(width, height)
    video.hide()

    const options = {
        withLandmarks: true,
        withDescriptors: false,
        minConfidence: 0.5
    }

    faceapi = ml5.faceApi(video, options, modelReady)
    //Callback
}

function modelReady() {
    console.log("FaceAPI 모델 로드 완료")
    faceapi.detect(gotResults)
}

function gotResults(err, result) {
    if (err) {
        console.error(err)
        return
    }

    detections = result
    faceapi.detect(gotResults)
}

function draw() {
    image(video, 0, 0)

    if (detections.length > 0) {
        let points = detections[0].parts

        drawLandmarks(points.leftEye)
        drawLandmarks(points.rightEye)
        drawLandmarks(points.nose)
        drawLandmarks(points.mouth)
        drawLandmarks(points.jawOutline)
    }
}

function drawLandmarks(part) {
    fill(0, 255, 0)
    noStroke()
    for (let pt of part) {
        circle(pt._x, pt._y, 5)
    }
}
