import React from 'react';

/**
 * Displays a single post.
 * @prop {Post} post - The post to be displayed.
 * @returns - Display of the post.
 */
function PostView({post}) {
  return (
        <div>
          <div>Post type: {post.is_listing ? ("Listing") : ("Request")} </div>
          <div>Title: {post.title} </div>
          <div>Item: {post.item_name} </div>
          <div>Description: {post.description} </div>
          <div>Rental cost: {post.rental_cost} </div>
          <div>Location: {post.location} </div>
          <div>Image:<br />{post.image && <img src={post.image} alt="post_image" style={{ maxWidth: "100%", maxHeight: "300px" }} />} </div>
          
          <div>
            {post.availability_start ? (
                <div>Availability start: {
                    post.availability_start.getDate() + "-" + 
                    post.availability_start.getMonth() + "-" +
                    post.availability_start.getFullYear()} 
                </div>
                // {/* option2 */}
                // {/* <div>Availability start: {post.availability_start.toDateString()} </div>
                // <div>Availability end: {post.availability_end.toDateString()} </div> */}
            ) : (
                <div>Availability start: Any </div>
            )}
          </div>
          <div>
            {post.availability_end ? (
                <div>Availability end: {
                    post.availability_end.getDate() + "-" + 
                    post.availability_end.getMonth() + "-" +
                    post.availability_end.getFullYear()} 
                </div>
            ) : (
                <div>Availability end: Any</div>
            )}
          </div>

          <h4>Contact information:</h4>
          <div>Name: {post.owner.name_first + " " + post.owner.name_last} </div>
          <div>Phone: {post.owner.phone_number} </div>
          <div>Email: {post.owner.email} </div>
        </div>
  );
}

export default PostView;