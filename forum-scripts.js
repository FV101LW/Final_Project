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

    const commentId = new Date().getTime(); // Unique ID for each comment based on timestamp
    const userId = prompt("Please enter your name to identify your comments (it will be used for deleting your comment).");

    // Store the comment data
    const commentData = {
        id: commentId,
        text: input.value,
        userId: userId
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

        const commentText = document.createElement("p");
        commentText.innerText = comment.text;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        // Only allow the commenter to delete their own comment
        deleteButton.onclick = function () {
            if (comment.userId === prompt("Enter your name to delete the comment:")) {
                deleteComment(comment.id);
            } else {
                alert("You can only delete your own comments.");
            }
        };

        commentDiv.appendChild(commentText);
        commentDiv.appendChild(deleteButton);
        commentsSection.appendChild(commentDiv);
    });
}

// Function to delete a comment by ID
function deleteComment(commentId) {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    const filteredComments = comments.filter(comment => comment.id !== commentId);
    localStorage.setItem("comments", JSON.stringify(filteredComments));

    // Reload the comments
    loadComments();
}
