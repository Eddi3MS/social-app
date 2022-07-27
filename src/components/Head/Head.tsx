import React, { useEffect } from "react";

interface IHead {
  title: string;
  description: string;
}

const Head = ({ title, description }: IHead) => {
  useEffect(() => {
    if (document) {
      document.title = title + " | Dogs";
      document
        .querySelector("meta[name='description']")
        ?.setAttribute("content", description || "");
    }
  }, [title, description]);

  return <></>;
};

export default Head;
