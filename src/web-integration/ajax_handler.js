"use strict";

async function loadProposals(url){
    let response =  await fetch(url);
    if(response.status != 200)return [];
    return await response.json();
}
