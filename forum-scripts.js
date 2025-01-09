// Load comments from localStorage and display them when the page is loaded
window.onload = function() {
    loadComments();
}

// Function to add a comment
function addComment() {
    const input = document.getElementById("commentInput");
    const commentsSection = document.getElementById("commentsSection");

    if (input.value.trim() === "") {
        alert("Please enter a comment before posting.");
        return;
    }

    // Prompt user to enter their name
    const userName = prompt("Please enter your name to identify your comments (it will be used for deleting your comment).");

    if (!userName) {
        alert("Name is required to post a comment.");
        return;
    }

    // Store the comment data
    const commentId = new Date().getTime(); // Unique ID for each comment
    const commentData = {
        id: commentId,
        text: input.value,
        userName: userName
    };

    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(commentData);
    localStorage.setItem("comments", JSON.stringify(comments));

    // Clear the input
    input.value = "";

    // Reload the comments
    loadComments();
}

// Function to load and display comments
function loadComments() {
    const commentsSection = document.getElementById("commentsSection");
    commentsSection.innerHTML = "<h2>Comments</h2>"; // Reset the section

    const comments = JSON.parse(localStorage.getItem("comments")) || [];

    comments.forEach(comment => {
        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";

        // Create user name element
        const userName = document.createElement("p");
        userName.innerText = `Posted by: ${comment.userName}`;
        userName.className = "user-name";

        const commentText = document.createElement("p");
        commentText.innerText = comment.text;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        // Only allow the commenter to dele
