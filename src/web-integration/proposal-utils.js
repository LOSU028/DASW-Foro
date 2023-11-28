"use strict";

let proposalContainer =  document.getElementById('proposalList');
const proposalsURL = 'http://localhost:3000/proposals'

function proposalToHTML(proposal){
    return `
    <div class="row">
    <!-- Card -->
        <div class="col-md-10">
            <div class="card user-cards">
                <div class="row no-gutters">
                    <div class="col-md-2">
                        <img src="user-placeholder.jpg" class="card-img" alt="User Icon Placeholder">
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
                                        <button class="btn btn-success mb-2"><i class="fas fa-thumbs-up"></i></button>
                                        <button class="btn btn-danger"><i class="fas fa-thumbs-down"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

function displayProposalPage(proposalList){
    const proposalCardsContainer = document.getElementById('proposalCards');
    proposalCardsContainer.innerHTML = proposalList.map(proposalToHTML).join('\n');
}

loadProposals(proposalsURL).then(proposals => {
    displayProposalPage(proposals);
})


