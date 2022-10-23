(function() {
    if (!"mediaDevices" in navigator ||
        !"getUserMedia" in navigator.mediaDevices
    ) {
        alert("O browser não pode abrir a camera");
        return;
    }

    const video = document.querySelector("#video");
    const canvas = document.querySelector("#canvas");

    const constraints = {
        video: {
            width: {
                min: 1280,
                ideal: 1920,
                max: 2560,
            },
            height: {
                min: 720,
                ideal: 1080,
                max: 1440,
            },
        },
    };

    let useFrontCamera = true;
    let videoStream;

    var play = function() {
        video.play();
    }

    var processFace = function() {
        const img = document.createElement("img");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        img.src = canvas.toDataURL("image/png");
        var blob = makeblob(img.src)
        processImage(blob);
    };


    async function initializeCamera() {
        constraints.video.facingMode = "user"; //useFrontCamera ? "user" : "environment";

        try {
            videoStream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = videoStream;
        } catch (err) {
            alert("Sem acesso a camera");
        }
    }
    initializeCamera();
    //processFace();
    setTimeout(function() {
        processFace();
    }, 2000)

    setInterval(function() {
        processFace();

    }, 5000);

})();