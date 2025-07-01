import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";

import image1 from "../assets/banner/img1.webp";
import image2 from "../assets/banner/img2.webp";
import image3 from "../assets/banner/img3.jpg";
import image4 from "../assets/banner/img4.jpg";
import image5 from "../assets/banner/img5.webp";

import image1Mobile1 from "../assets/banner/img1_mobile.jpg";
import image1Mobile2 from "../assets/banner/img2_mobile.webp";
import image1Mobile3 from "../assets/banner/img3_mobile.jpg";
import image1Mobile4 from "../assets/banner/img4_mobile.jpg";
import image1Mobile5 from "../assets/banner/img5_mobile.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    image1Mobile1,
    image1Mobile2,
    image1Mobile3,
    image1Mobile4,
    image1Mobile5,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const previousImage = () => {
    if (currentImage != 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);
  return (
    <div className="container mx-auto px-4 rounded">
      <div className=" h-80 md:h-[310px] w-full bg-slate-200 relative">
        <div className="absolute z-10 w-full h-full md:flex items-center hidden">
          <div className=" flex justify-between w-full text-2xl">
            <button
              onClick={previousImage}
              className="bg-white shadow-md rounded p-1 hover:scale-105"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded p-1 hover:scale-105"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="hidden md:flex h-full w-full overflow-hidden ">
          {desktopImages.map((imageUrl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageUrl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageUrl} className="w-full h-full" />
              </div>
            );
          })}
        </div>

        <div className="flex h-full w-full overflow-hidden md:hidden ">
          {mobileImages.map((imageUrl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageUrl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageUrl} className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
