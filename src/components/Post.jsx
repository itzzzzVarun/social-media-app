import { useContext } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { PostList } from "../store/post-list-store";

const Post = ( {post} ) => {
  const { deletePost } = useContext(PostList);

  return (
    <div className="card post-card" style={{width: "18rem"}}>
  <div className="card-body">
  <h5 className="card-title">{post.title}</h5>
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
  onClick={() => deletePost(post.id)}>
  <TiDeleteOutline />
  </span>
    <p className="card-text">{post.body}</p>
    {post.tags.map((tag) => (
      <span key={tag} className="badge text-bg-primary hashtag">{tag}</span>
      ))}
  </div>
  <div className="alert alert-success reactions" role="alert">
     This post has been liked by {post.reactions.likes} people.
  </div>
  <div className="alert alert-success reactions" role="alert">
     This post has been disliked by {post.reactions.dislikes} people.
  </div>
</div>
  )
}

export default Post;