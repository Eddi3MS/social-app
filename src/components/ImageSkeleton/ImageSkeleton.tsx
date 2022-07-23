import React, { useState } from "react";
import "./ImageSkeleton.scss";

const ImageSkeleton = ({ alt, ...props }: any) => {
  const [skeleton, setSkeleton] = useState(true);

  const handleLoad = ({ target }: any) => {
    setSkeleton(false);
    target.style.opacity = 1;
  };
  return (
    <div className="image_wrapper">
      {skeleton && <div className="image_skeleton"></div>}
      <img onLoad={handleLoad} className="image_img" alt={alt} {...props} />
    </div>
  );
};

export default ImageSkeleton;
