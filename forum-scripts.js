// Load comments from localStorage when the page is loaded
window.onload = function() {
    loadComments();
}

// Function to add a main comment
function addComment() {
    const input = document.getElementById("commentInput");
    const commentsSection = document.getElementById("commentsSection");

    // Get the comment text
    if (input.value.trim() === "") {
        alert("Please enter a comment before posting.");
        return;
    }

    const commentId = new Date().getTime(); // Unique ID for each comment
    const commentData = {
        id: commentId,
        text: input.value,
        replies: [] // Array to hold replies for this comment
    };

    // Save comment data to localStorage
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(commentData);
    localStorage.setItem("comments", JSON.stringify(comments));

    // Clear the input field
    input.value = "";

    // Reload the comments
    loadComments();
}

// Function to load and display comments from localStorage
function loadComments() {
    const commentsSection = document.getElementById("commentsSection");
    commentsSection.innerHTML = "<h2>Comments</h2>"; // Reset the section

    const comments = JSON.parse(localStorage.getItem("comments")) || [];

    comments.forEach(comment => {
        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";
        commentDiv.id = "comment-" + comment.id;

        const commentText = document.createElement("p");
        commentText.innerText = comment.text;

        const replyButton = document.createElement("button");
        replyButton.innerText = "Reply";
        replyButton.onclick = function() {
            showReplyInput(comment.id);
        };

        commentDiv.appendChild(commentText);
        commentDiv.appendChild(replyButton);

        // Display replies if they exist
        if (comment.replies.length > 0) {
            const repliesDiv = document.createElement("div");
            repliesDiv.className = "replies";
            comment.replies.forEach(reply => {
                const replyDiv = document.createElement("div");
                replyDiv.className = "reply";
                replyDiv.innerText = reply;
                repliesDiv.appendChild(replyDiv);
            });
            commentDiv.appendChild(repliesDiv);
        }

        commentsSection.appendChild(commentDiv);
    });
}

// Function to display the reply input under a specific comment
function showReplyInput(commentId) {
    const commentDiv = document.getElementById("comment-" + commentId);
    const replyInput = document.createElement("div");
    replyInput.className = "reply-input";

    const replyTextarea = document.createElement("textarea");
    replyTextarea.placeholder = "Write a reply...";

    const submitReplyButton = document.createElement("button");
    submitReplyButton.innerText = "Post Reply";
    submitReplyButton.onclick = function() {
        addReply(commentId, replyTextarea.value);
    };

    replyInput.appendChild(replyTextarea);
    replyInput.appendChild(submitReplyButton);

    commentDiv.appendChild(replyInput);
}

// Function to add a reply to a comment
function addReply(commentId, replyText) {
    if (replyText.trim() === "") {
        alert("Please enter a reply before posting.");
        return;
    }

    // Get the comments from localStorage
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    
    // Find the comment to which the reply belongs
    const comment = comments.find(c => c.id === commentId);
    
    // Add the reply to the comment's replies array
    comment.replies.push(replyText);
    
    // Save the updated comments back to localStorage
    localStorage.setItem("comments", JSON.stringify(comments));

    // Reload the comments to show the new reply
    loadComments();
}
