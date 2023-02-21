import React, { useState } from 'react';
import Post from './Post';

/**
 * Creates a new Post object from the input form data.
 * @function
 * @param {props} PostFormProps - As described below.
 * @prop {User} active_user - The currently signed in user that will become the owner of the post.
 * @prop {onAddPostCallback} onAddPost - A callback function to handle the submission of a new post.
 * @returns - A form with input for creating a new post.
 */
function PostForm({active_user, onAddPost}) {
//   const post_type = isListing ? "Listing" : "Request";
  const [is_listing, setIsListing] = useState(true);
  const [title, setTitle] = useState("Tool for rent!");
  const [item_name, setItemName] = useState("Tool");
  const [description, setDescription] = useState("Handle with care.");
  const [category, setCategory] = useState("Category");
  const [rental_cost, setRentalCost] = useState(0);
  const [replacement_cost, setReplacementCost] = useState(0);
  const [location, setLocation] = useState("Outside");
  const [image, setImage] = useState(null);
  const [availability_start, setAvailabilityStart] = useState(null);
  const [availability_end, setAvailabilityEnd] = useState(null);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (active_user == null) {
        alert("You must be signed in to add a post.")
    } else {
        // const isListing = document.querySelector("#post_type").value === "Listing";
        const post = new Post(is_listing, title, item_name, description, category,
            rental_cost, replacement_cost, location, image, 
            availability_start, availability_end,
            active_user);
        onAddPost(post);
    }
  };

  const handleUploadImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleAvailabilityStartChange = (event) => {
    event.preventDefault();
    setAvailabilityStart(event.target.value);
  }
  
  const handleAvailabilityEndChange = (event) => {
    event.preventDefault();
    setAvailabilityEnd(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Post-form:</h3>
      <label>
        Post-type:
        Listing<input type="radio" name="post_type" value={is_listing} onChange={() => setIsListing(true)} defaultChecked />
        Request<input type="radio" name="post_type" value={is_listing} onChange={() => setIsListing(false)} />
      </label>
      <br />
      <label>
        Title:
        <input type="string" value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <br />
      <label>
        Item:
        <input type="string" value={item_name} onChange={(event) => setItemName(event.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <input type="string" value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <br />
      <label>
        Category:
        <input type="string" value={category} onChange={(event) => setCategory(event.target.value)} />
      </label>
      <br />
      <label>
        Rental cost:
        <input type="number" value={rental_cost} onChange={(event) => setRentalCost(event.target.value)} />
      </label>
      <br />
      <label>
        Replacement cost:
        <input type="number" value={replacement_cost} onChange={(event) => setReplacementCost(event.target.value)} />
      </label>
      <br />
      <label>
        Location:
        <input type="string" value={location} onChange={(event) => setLocation(event.target.value)} />
      </label>
      <br />
      <label>
        Image:
        <input type="file" onChange={handleUploadImage} />
      </label>
      <br />
      <label>
        Availability start:
        <input type="date" value={availability_start} onChange={handleAvailabilityStartChange} />
      </label>
      <br />
      <label>
        Availability end:
        <input type="date" value={availability_end} onChange={handleAvailabilityEndChange} />
      </label>
      <br />
      <button type="submit">Add Post</button>
    </form>
  );
}

export default PostForm;