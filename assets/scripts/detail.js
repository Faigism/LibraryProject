const commentInput = document.querySelector('.commentInput');
const commentButton = document.querySelector('.commentButton');
const commentsContainer = document.querySelector('.commentsContainer');

const commentsKey = 'savedComments';


window.addEventListener('DOMContentLoaded', () => {
    const savedComments = JSON.parse(localStorage.getItem(commentsKey)) || [];
    savedComments.forEach(comment => {
        addCommentToDOM(comment);
    });
});

commentButton.addEventListener('click', function (event) {
    event.preventDefault()
    const text = commentInput.value.trim();
    if (text !== '') {
        const userName = 'Anonim';
        const currentDate = new Date().toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            weekday: 'long',
        });

        const newComment = { id: generateId(), userName, date: currentDate, text };
        addCommentToDOM(newComment);

        const savedComments = JSON.parse(localStorage.getItem(commentsKey)) || [];
        savedComments.unshift(newComment);
        localStorage.setItem(commentsKey, JSON.stringify(savedComments));

        commentInput.value = '';
    }
});

function addCommentToDOM(comment) {
    const newDiv = document.createElement('div');
    const userNameDate = document.createElement('span');
    const commentText = document.createElement('p');
    // const deleteButton = document.createElement('button');

    userNameDate.innerHTML = `<b>${comment.userName}</b> ${comment.date}`;

    commentText.textContent = comment.text;

    // deleteButton.textContent = 'Delete';
    // deleteButton.addEventListener('click', () => {
    //     deleteComment(comment.id);
    //     newDiv.remove();
    // });

    newDiv.appendChild(userNameDate);
    newDiv.appendChild(commentText);
    // newDiv.appendChild(deleteButton);

    commentsContainer.insertBefore(newDiv, commentsContainer.firstChild);
}

function generateId() {
    return Math.random().toString();
}

// function deleteComment(commentId) {
//     const savedComments = JSON.parse(localStorage.getItem(commentsKey)) || [];
//     const updatedComments = savedComments.filter(comment => comment.id !== commentId);
//     localStorage.setItem(commentsKey, JSON.stringify(updatedComments));
// }