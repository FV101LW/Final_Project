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

        // Only allow the commenter to delete their own comment
        deleteButton.onclick = function () {
            const currentUser = prompt("Enter your name to delete the comment:");

            if (currentUser === comment.userName) {
                deleteComment(comment.id);
            } else {
                alert("You can only delete your own comments.");
            }
        };

        commentDiv.appendChild(userName);
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

/* For topics */
document.addEventListener('DOMContentLoaded', () => {
    const topicsSection = document.querySelector('.topics-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                topicsSection.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    observer.observe(topicsSection);
});

/* For topics search bar */
document.getElementById('searchTopics').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const topics = document.querySelectorAll('.topics-list li');

    topics.forEach(topic => {
        const text = topic.textContent.toLowerCase();
        topic.style.display = text.includes(query) ? 'block' : 'none';
    });
});
