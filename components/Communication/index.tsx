"use client";
import SideBox from "./NewsLatterBox";
import React, { useRef, useEffect, useState } from "react";
import "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

const URL = "./model/";

const Communication = () => {
  const [isChecked, setIsChecked] = useState(false);

  const webcamRef = useRef(null);
  const labelContainerRef = useRef(null);
  let model, webcam, labelContainer, maxPredictions;

  useEffect(() => {
    const init = async () => {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

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
        labelContainer.innerHTML = ""; // Clear previous predictions
        prediction.forEach((pred) => {
          if (pred.probability.toFixed(2) > 0.6) {
            const div = document.createElement("div");
            div.innerText = `${pred.className}`;
            labelContainer.appendChild(div);
          }
        });
      }
    };
    if (isChecked) {
      init();
    }

    return () => {
      if (webcam && webcam.stop) {
        webcam.stop();
      }
    };
  }, [isChecked]);

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] px-8 py-11 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              {/*  */}
              {!isChecked && (
                <img
                  src="/images/camera/icon.svg"
                  alt="shape"
                  className="my-6 w-full py-5"
                />
              )}
                {isChecked && (
                  <div className="py-5 flex justify-center">
                    <div id="webcam-container" ref={webcamRef}></div>
                  </div>
                )}
              {/*  */}
              <label className="inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  value=""
                  className="peer sr-only"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  readOnly
                />
                <div className="peer relative  h-6 w-11 rounded-full border-gray-300 bg-grey after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                <span className="text-gray-900 ms-3 text-sm font-medium dark:text-gray-300">
                  Mở camera
                </span>
              </label>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <SideBox ref={labelContainerRef} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Communication;
