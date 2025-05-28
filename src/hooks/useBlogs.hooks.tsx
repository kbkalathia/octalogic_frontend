"use client";
import {
  addBlog,
  deleteBlog,
  editBlog,
  fetchBlogs,
  getBlogDetails,
} from "@/src/services/bookings.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BlogPost, BlogPayload } from "../types/blogs.types";
import toast from "react-hot-toast";

export function useFetchBlogs(params: Record<string, number | string> = {}) {
  return useQuery({
    queryKey: ["blogsList"],
    queryFn: () => fetchBlogs(params),
  });
}

export function useFetchBlogDetails(id: string) {
  return useQuery({
    queryKey: ["blogDetails", id],
    queryFn: () => getBlogDetails(id),
    enabled: !!id,
  });
}

export function useAddBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BlogPost) => addBlog(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogsList"] });

      toast.success(data.message);
    },
    onError: (error) => {
      console.error("Failed to add blog:", error);
    },
  });
}

export function useEditBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BlogPayload) => editBlog(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogDetails"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });

      toast.success(data.message);
    },

    onError: (error) => {
      console.error("Failed to update blog:", error);
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBlog(id),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogsList"] });
      toast.success(data.message);
    },

    onError: (error) => {
      console.error("Failed to delete blog:", error);
    },
  });
}
