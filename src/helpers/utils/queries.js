// hooks/queries.js
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData, postData, updateData, deleteData } from "../utils/api";

// GET query
export const useFetch = (queryKey, url, params = {}) => {
  return useQuery({
    queryKey: [queryKey,params], 
    queryFn: () => fetchData(url, params),
    keepPreviousData: true, 

  });
};

// CREATE / UPDATE / DELETE mutations
export const useMutationAction = (type, url, queryKey) => {
  const queryClient = useQueryClient();

  const mutationFn = (payload) => {
    if (type === "create") return postData(url, payload);
    if (type === "update") return updateData(url, payload);
    if (type === "delete") return deleteData(url,payload);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      if (queryKey) queryClient.invalidateQueries([queryKey]); // automatically refetch
    },
  });
};
