function addComment() {
    const input = document.getElementById("commentInput");
    const commentsSection = document.getElementById("commentsSection");

    if (input.value.trim() === "") {
        alert("Please enter a comment before posting.");
        return;
    }

    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";

    const commentText = document.createElement("p");
    commentText.innerText = input.value;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
        commentsSection.removeChild(commentDiv);
    };

    commentDiv.appendChild(commentText);
    commentDiv.appendChild(deleteButton);
    commentsSection.appendChild(commentDiv);

    input.value = ""; // Clear the input after posting
}
