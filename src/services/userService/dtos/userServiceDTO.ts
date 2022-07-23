export interface IUserLoginDTO {
  token: string;
  user_display_name: string;
  user_email: string;
  user_nicename: string;
}

export interface ITokenValidateDTO {
  status: number;
}

export interface IGetUserDTO {
  id: number;
  username: string;
  nome: string;
  email: string;
}

export interface IPhotoDTO {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  peso: string;
  idade: string;
  acessos: string;
  total_comments: string;
}

export interface ICommentDTO {
  comment_ID: string;
  comment_post_ID: string;
  comment_author: string;
  comment_author_email: string;
  comment_author_url: string;
  comment_author_IP: string;
  comment_date: string;
  comment_date_gmt: string;
  comment_content: string;
  comment_karma: string;
  comment_approved: string;
  comment_agent: string;
  comment_type: string;
  comment_parent: string;
  user_id: string;
}

export interface ISinglePhotoDTO {
  photo: {
    id: number;
    author: string;
    title: string;
    date: string;
    src: string;
    peso: string;
    idade: string;
    acessos: number;
    total_comments: string;
  };
  comments: ICommentDTO[];
}
