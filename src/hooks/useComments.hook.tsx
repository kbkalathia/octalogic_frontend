"use client";
import {
  addCommentForBlog,
  deleteCommentOfBlog,
  editCommentOfBlog,
  fetchCommentsForBlog,
  getSpecificCommentDetails,
} from "@/src/services/comments.service";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { CommentPayload } from "../types/comments.types";

export function useFetchCommentsForBlog(blogId: number) {
  return useSuspenseQuery({
    queryKey: ["commentsList", blogId],
    queryFn: () => fetchCommentsForBlog(blogId),
  });
}

export function useCommentDetails(commentId: number, blogId: number) {
  return useSuspenseQuery({
    queryKey: ["comment-details", commentId],
    queryFn: () => getSpecificCommentDetails(commentId),
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CommentPayload) => addCommentForBlog(payload),

    onSuccess: (_, { blogId }) => {
      queryClient.invalidateQueries({ queryKey: ["commentsList", blogId] });
    },

    onError: (error) => {
      console.error("Failed to add comment:", error);
    },
  });
}

export function useEditComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      updatedComment,
    }: {
      commentId: number;
      updatedComment: string;
    }) => editCommentOfBlog(commentId, updatedComment),

    onSuccess: ({
      commentId,
      updatedComment,
    }: {
      commentId: number;
      updatedComment: string;
    }) => {
      queryClient.invalidateQueries({
        queryKey: ["comment-details", commentId],
      });
    },

    onError: (error) => {
      console.error("Failed to edit comment:", error);
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      blogId,
      commentId,
    }: {
      blogId: number;
      commentId: number;
    }) => deleteCommentOfBlog(commentId),

    onSuccess: ({
      blogId,
      commentId,
    }: {
      commentId: number;
      blogId: number;
    }) => {
      queryClient.invalidateQueries({ queryKey: ["commentsList", blogId] });
    },

    onError: (error) => {
      console.error("Failed to delete comment:", error);
    },
  });
}
