export interface Comments {
  id: number;
  content: string;
  blog_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentPayload {
  blogId: number;
  content: string;
}
