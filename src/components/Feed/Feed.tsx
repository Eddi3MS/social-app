import React, { useState } from "react";
import FeedModal from "./components/FeedModal";
import FeedPhotos from "./components/FeedPhotos";

const Feed = () => {
  const [photoId, setPhotoId] = useState<number | null>(null);

  return (
    <div>
      {photoId && <FeedModal setPhotoId={setPhotoId} photoId={photoId} />}
      <FeedPhotos setPhotoId={setPhotoId} />
    </div>
  );
};

export default Feed;
