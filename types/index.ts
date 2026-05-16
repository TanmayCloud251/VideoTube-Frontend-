export interface User {
  _id: string;
  username: string;
  fullName: string;
  avatar: string;
  coverImage?: string;
  email: string;
}

export interface Video {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: User;
  createdAt: string;
  updatedAt: string;
  likesCount?: number;
  isLiked?: boolean;
}

export interface Comment {
  _id: string;
  content: string;
  video: string;
  owner: User;
  createdAt: string;
  likesCount?: number;
  isLiked?: boolean;
}

export interface Playlist {
  _id: string;
  name: string;
  description: string;
  videos: string[] | Video[];
  owner: string;
  createdAt: string;
  updatedAt: string;
}
