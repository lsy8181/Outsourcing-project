import React, { useEffect, useState } from 'react';
import supabase from '../supabase/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const navigate = useNavigate();

  // console.log(postId);

  const getPost = async ({ postId }) => {
    const { data, error } = await supabase.from('posts').select().eq('post_id', postId);
    if (error) {
      console.log(error);
    } else {
      console.log('data =>', data);
    }
    return data;
  };

  const { data: posts, isError, isPending } = useQuery({ queryKey: ['posts', postId], queryFn: getPost });

  const updatePost = async ({ postId, updatedData }) => {
    const { error } = await supabase.from('posts').update(updatedData).eq('post_id', postId);
    if (error) {
      console.log('error', error);
    }
  };

  const deletePost = async ({ postId }) => {
    const { error } = await supabase.from('posts').delete().eq('post_id', postId);
    if (error) {
      console.log('error', error);
    }
  };

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      navigate('/posts/:postId');
      queryClient.invalidateQueries(['posts']);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      navigate('/');
      queryClient.invalidateQueries(['posts']);
    }
  });

  const handleUpdate = (postId) => {
    const updatedData = { title: title, contents: contents, star: star };
    updateMutation.mutate({ postId, updatedData });
  };

  const handleDelete = (postId) => {
    deleteMutation.mutate({ postId });
  };

  if (isPending) {
    return <div>로딩중입니다</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다</div>;
  }

  return (
    <>
      <div className="w-[1000px] h-[500px] ">
        {posts.map((post) => {
          return (
            <div key={post.post_id}>
              <header className="flex">
                <h2 className="text-2xl py-11 m-2">{post.title}</h2>
                <div className="text-2xl py-11 m-2">{post.star}</div>
              </header>
              <div className="w-[1000px] h-[500px] bg-indigo-300 mb-5">지도</div>
              <div>label</div>
              <div className="w-[1000px] h-[250px] border-2 border-slate-300 rounded-md">{post.contents}</div>
              <div className="float-right">
                <button
                  onClick={() => handleUpdate(post.post_id)}
                  className="bg-blue-500 hover:bg-blue-600 rounded-lg p-4 m-2 text-white"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(post.post_id)}
                  className="bg-red-600 hover:bg-red-700 rounded-lg p-4 m-2 text-white"
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Detail;
