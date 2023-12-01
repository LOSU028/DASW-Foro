"use strict";

let proposalContainer =  document.getElementById('proposalList');
const proposalsURL = 'http://localhost:3000/proposals'

function proposalToHTML(proposal){
    return `
    <div class="row">
    <!-- Proposal Card -->
    <div class="col-md-6">
        <div class="card user-cards">
            <div class="row no-gutters">
                <div class="col-md-2">
                    <h5 class="card-title">${proposal._username}</h5>
                </div>
                <div class="col-md-10">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-9">
                                <h5 class="card-title">${proposal._title}</h5>
                                <p class="card-text">${proposal._content}</p>
                            </div>
                            <div class="col-md-3">
                                <!-- Buttons inside the card -->
                                <div class="d-flex flex-column align-items-end">
                                    <button class="btn btn-success mb-2">
                                        <i class="fas fa-thumbs-up"></i> <span class="like-count">${proposal._likes}</span>
                                    </button>
                                    <button class="btn btn-danger">
                                        <i class="fas fa-thumbs-down"></i> <span class="dislike-count">${proposal._dislikes}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Comments Section (below and moved to the right) -->
    <div class="col-md-6 mt-3 offset-md-2">
            <div class="card comments-section">
                <div class="card-body">
                    <!-- Comment Form -->
                    <form>
                        <div class="form-group">
                            <label for="commentInput">Add your comment:</label>
                            <textarea class="form-control" id="commentInput" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>

                    <!-- Existing Comments -->
                    <div class="existing-comments" id="comments-${proposal._id}">
                        <!-- Comments will be dynamically loaded here -->
                    </div>
                </div>
            </div>
        </div>
    </div>

`
}

async function loadComments(proposalId) {
    const commentsURL = `http://localhost:3000/proposals/${proposalId}/comments`;
    const response = await fetch(commentsURL);
    const comments = await response.json();
    return comments;
}

async function displayProposalPage(proposalList) {
    for (const proposal of proposalList) {
        proposalContainer.insertAdjacentHTML('beforeend', proposalToHTML(proposal));

        const commentsContainer = document.getElementById(`comments-${proposal._id}`);

        // Move the loadComments call inside the loop
        const comments = await loadComments(proposal._id);

        commentsContainer.insertAdjacentHTML('beforeend', comments.map(comment => `
            <div class="comment">
                <h6>${comment._username}:</h6>
                <p>${comment._content}</p>
            </div>
        `).join(''));
    }
}



loadProposals(proposalsURL).then(proposals => {
    displayProposalPage(proposals);
});

