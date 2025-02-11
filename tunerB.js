let audioContext;
let analyser;
let microphone;
let dataArray;

const targetFrequencies = {
    E1: 41.20,
    A1: 55.00,
    D2: 73.42,
    G2: 98.00
}

function startTuning(string) {
    if (!audioContext) {
        setupAudio();
    }

    const targetFrequency = targetFrequencies[string];
    analyser.getFloatFrequencyData(dataArray);
    const frequency = detectPitch(dataArray);

    const feedbackElement = document.querySelector(`#${string} .feedback`);

    if (frequency) {
        const difference = frequency - targetFrequency;

        if (Math.abs(difference) < 2) { 
            feedbackElement.textContent = "In Tune!";
            feedbackElement.style.color = "green";
        } else if (difference > 0) {
            feedbackElement.textContent = "Too High! 🔼";
            feedbackElement.style.color = "red";
        } else {
            feedbackElement.textContent = "Too Low! 🔽";
            feedbackElement.style.color = "red";
        }
    } else {
        feedbackElement.textContent = "No Sound Detected!";
        feedbackElement.style.color = "orange";
    }

    requestAnimationFrame(() => startTuning(string));
}

function setupAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            dataArray = new Float32Array(analyser.frequencyBinCount);
        })
        .catch(error => {
            console.error("Error accessing microphone:", error);
        });
}

function detectPitch(data) {
    let maxIndex = -1;
    let maxValue = -Infinity;

    for (let i = 0; i < data.length; i++) {
        if (data[i] > maxValue) {
            maxValue = data[i];
            maxIndex = i;
        }
    }

    const frequency = maxIndex * audioContext.sampleRate / analyser.fftSize;

    return (maxValue < -100) ? null : frequency; // Only return valid frequencies
}
