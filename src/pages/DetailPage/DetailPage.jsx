import React, { useEffect, useState } from 'react';
import supabase from '../../supabase/supabase';

const Detail = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const detail = async () => {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        console.log(error);
      } else {
        // console.log("data =>", data);
        setPosts(data);
      }
    };
    detail();
  }, []);

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
                <button className="bg-blue-500 hover:bg-blue-600 rounded-lg p-4 m-2 text-white">수정</button>
                <button className="bg-red-600 hover:bg-red-700 rounded-lg p-4 m-2 text-white">삭제</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Detail;
