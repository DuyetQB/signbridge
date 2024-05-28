import React, { useRef, useEffect } from 'react';
import '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

const URL = './model/';

const WebcamComponent = ({isChecked}:{isChecked:boolean}) => {
  const webcamRef = useRef(null);
  const labelContainerRef = useRef(null);
  let model, webcam, labelContainer, maxPredictions;

  useEffect(() => {
    const init = async () => {
      const modelURL = URL + 'model.json';
      const metadataURL = URL + 'metadata.json';

      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      const flip = true;
      webcam = new tmImage.Webcam(600, 400, flip);
      await webcam.setup();
      await webcam.play();

      webcamRef.current.appendChild(webcam.canvas);
      labelContainer = labelContainerRef.current;

      window.requestAnimationFrame(loop);
    };

    const loop = async () => {
      if (webcam && webcam.canvas) {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
      }
    };

    const predict = async () => {
      const prediction = await model.predict(webcam.canvas);
      if (labelContainer) {
        labelContainer.innerHTML = ''; // Clear previous predictions
        prediction.forEach(pred => {
          if (pred.probability.toFixed(2) > 0.6) {
            const div = document.createElement('div');
            div.innerText = `${pred.className}: ${pred.probability.toFixed(2)}`;
            labelContainer.appendChild(div);
          }
        });
      }
    };
    if(isChecked){
      init();
    }
    
    return () => {
      if (webcam && webcam.stop) {
        webcam.stop();
      }
    };
  }, [isChecked]);

  return (
    <>
      {isChecked && (
        <div className="py-5">
          <div id="webcam-container" ref={webcamRef}></div>
          <div id="label-container" ref={labelContainerRef}></div>
        </div>
      )}
    </>
  );
};

export default WebcamComponent;
