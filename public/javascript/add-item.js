// New Post Form Handler
async function newFormHandler(event) {
    event.preventDefault();
    console.log("INSIDE ADD ITEM")

    // Get the post title and post text from the form
    const title = document.querySelector('input[name="post-title"]').value;
    const item_text = document.querySelector('textarea[name="post-text"]').value;
    const category_id = document.querySelector('input[name="category-id"]').value;

    // use the add a new post POST route to add the post 
    // user id is added from the session information in the route
    const response = await fetch(`/api/item`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        item_text,
        category_id: category_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("category_id is: " + category_id)
    console.log("response is-----------")
    console.log(response)

    // if the response is okay, reload the page, showing the newest post now in the user's post list
    if (response.ok) {
        console.log("post worked")
      document.location.replace('/');
      // otherwise, display the error
    } else {
      alert(response.statusText);
    }
  }
  
  // Event Listener for the new post submit button
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);