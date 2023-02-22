import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if(slug) {
      getSimilarPosts(categories, slug)
        .then((res) => setRelatedPosts(res));
    } else {
      getRecentPosts()
      .then((res) => setRelatedPosts(res));
    }
      
  }, [slug])

  return (
    <div className="bg-white shadow-lg rounded-lg p-8  mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-6">
          <div className="w-16 h-16 flex-none">
            <img
              // loader={grpahCMSImageLoader}
              alt={post.title}
              unoptimized
              className=" rounded-full object-cover object-center"
              src={post.featuredImage.url}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`} className="text-md hover:text-pink-600 transition-all " key={index}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  ) // return
}; // PostWidget

export default PostWidget