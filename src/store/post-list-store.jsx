import {createContext, useCallback, useReducer, useState, useEffect } from "react";



export const PostList = createContext(
  {
    postList : [],
    addPost : () => {},
    deletePost : () => {},
    fetching:false
  }
)

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList
  if (action.type === 'DELETE_POST') {
    newPostList = currPostList.filter((post) => 
      post.id !== action.payload.postId
    )
  } else if (action.type === 'ADD_POST') {
    newPostList = [action.payload, ...currPostList]
  } else if (action.type === 'ADD_INITIAL_POSTS') {
    newPostList = action.payload.posts
  }
  return newPostList
} 

const PostListProvider = ({ children }) => {

  const [postList, dispatchPostList] = useReducer(
    postListReducer, 
    []
  )
  const [fetching, setFetching] = useState(false)

  const addInitialPosts = (posts) => {



    dispatchPostList({
      type : 'ADD_INITIAL_POSTS',
      payload : {
          posts
      }

    })
  }

  const addPost = (posts) => {




    dispatchPostList({
      type : 'ADD_POST',
      payload : posts
    })
  }
  
  const deletePost = useCallback((postId) => {

    

    
    dispatchPostList({
      type: 'DELETE_POST',
      payload : {
        postId
      }})
  }, [dispatchPostList]
);


useEffect(() => {
  setFetching(true)

  const controller = new AbortController();

  const signal = controller.signal;
  fetch('https://dummyjson.com/posts', signal)
  .then(res => res.json())
  .then(obj => {
    addInitialPosts(obj.posts);
    setFetching(false);
  });

  return () => {
      controller.abort()
  }

}, [])


    return (
      <PostList.Provider value={{postList,  addPost, deletePost, fetching}}> 
        {children}  
      </ PostList.Provider>
    )
}



export default PostListProvider