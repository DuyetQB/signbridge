import { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';

const WebcamComponent = () => {
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [webcam, setWebcam] = useState<tmImage.Webcam | null>(null);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const webcamRef = useRef<HTMLDivElement>(null);
  const labelContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef(null);

  const URL = "./model/";

  useEffect(() => {
    if (isRunning) {
      init();
    } else {
      if (webcam) {
        webcam?.stop();
        setWebcam(null);
      }
    }

    return () => {
      if (webcam) {
        webcam?.stop();
      }
    };
  }, [isRunning]);

  const init = async () => {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Load the model and metadata
    const model = await tmImage.load(modelURL, metadataURL);
    setModel(model);
    setMaxPredictions(model.getTotalClasses());

    // Setup a webcam
    const flip = true; // whether to flip the webcam
    const webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    setWebcam(webcam);

    // Append elements to the DOM
    if (webcamRef.current) {
      webcamRef.current.innerHTML = ''; // Clear any existing content
      // webcamRef.current.appendChild(webcam.canvas);
    }
    if (labelContainerRef.current) {
      labelContainerRef.current.innerHTML = ''; // Clear any existing content
      for (let i = 0; i < model.getTotalClasses(); i++) {
        labelContainerRef.current.appendChild(document.createElement("div"));
      }
    }

    window.requestAnimationFrame(loop);
  };

  const loop = async () => {
    if (webcam && isRunning) {
      webcam.update(); // update the webcam frame
      await predict();
      window.requestAnimationFrame(loop);
    }
  };

  const predict = async () => {
    if (model && webcam) {
      // Run the webcam image through the image model
      const prediction = await model.predict(webcam.canvas);
      if (labelContainerRef.current) {
        for (let i = 0; i < maxPredictions; i++) {
          const classPrediction = `${prediction[i].className}: ${prediction[i].probability.toFixed(2)}`;
          labelContainerRef.current.childNodes[i].textContent = classPrediction;
        }
      }
    }
  };

  return (
    <div>
      <div>Image Model</div>
      <button type="button" onClick={() => setIsRunning(true)}>
        Start
      </button>
      <button type="button" onClick={() => setIsRunning(false)}>
        Stop
      </button>
      <div id="webcam-container" ref={webcamRef}>
        <canvas
            ref={canvasRef} width={400} height={400}
          />
      </div>
      <div id="label-container" ref={labelContainerRef}></div>
    </div>
  );
};

export default WebcamComponent;
