import React, { useEffect, useRef, useState } from "react";
import { ICommentDTO } from "../../services/userService/dtos/userServiceDTO";
import { useAppSelector } from "../../store/hooks";
import PhotoCommentsForm from "../PhotoCommentsForm";

import "./PhotoComments.scss";

interface IPhotoComments {
  id: number;
  comments: ICommentDTO[];
  single?: boolean;
}

const PhotoComments = ({ id, comments, single }: IPhotoComments) => {
  const [commentsState, setCommentsState] = useState<ICommentDTO[]>(comments);
  const commentsSection = useRef<HTMLUListElement | null>(null);

  const userReducer = useAppSelector((state) => state.user);

  useEffect(() => {
    if (commentsSection.current)
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [commentsState]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`comments_list ${single && "list_single"}`}
      >
        {commentsState.map((comment: any) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {userReducer.user && (
        <PhotoCommentsForm
          id={id}
          single={single}
          setComments={setCommentsState}
        />
      )}
    </>
  );
};

export default PhotoComments;
