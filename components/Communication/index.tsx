"use client"
import { useState} from "react"
import NewsLatterBox from "./NewsLatterBox";
// import WebcamComponent from "./WebcamComponent"

const Communication = () => {

  const [isChecked,setIsChecked] = useState(false);

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
           <img src="/images/camera/icon.svg" alt="shape" className="w-full py-5 my-6" />
           {/* {isChecked ? <WebcamComponent isChecked={isChecked}/>: <img src="/images/camera/icon.svg" alt="shape" className="w-full py-5 my-6" />} */}
           {/*  */}
              <label className="inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  value=""
                  className="peer sr-only"
                  checked={isChecked}
                  onChange={()=>setIsChecked(!isChecked)}
                  readOnly
                />
                <div className="bg-grey peer-focus:ring-blue-300  dark:peer-focus:ring-blue-800 dark:bg-gray-700 after:border-gray-300 border-gray-300 dark:border-gray-600 peer-checked:bg-blue-600 peer relative h-6 w-11 rounded-full after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 rtl:peer-checked:after:-translate-x-full"></div>
                <span className="text-gray-900 dark:text-gray-300 ms-3 text-sm font-medium">
                  Mở camera
                </span>
              </label>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Communication;
