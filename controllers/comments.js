"use strict";

class CommentException{
    constructor(errorMessagge){
        this.errorMessagge = errorMessagge;
    }
}

class Comment{
    constructor(userid, username, proposalid, content){
        this.userid = userid;
        this.username = username;
        this.proposalid = proposalid;
        this.content = content;
    }

    //setters
    set userid(value){
        if(typeof value !== 'string' || value === ''){
            throw new CommentException("Comment userid cannot be empty or not a string!");
        }
        this._userid = value;
    }

    set username(value){
        if(typeof value !== 'string' || value === ''){
            throw new CommentException("Comment username cannot be empty or not a string!");   
        }
        this._username = value;
    }

    set proposalid(value){
        if(typeof value !== 'string' || value === ''){
            throw new CommentException("Comment proposal id cannot be empty or not a string!");
        }
        this._proposalid = value;
    }

    set content(value){
        if(typeof value !== 'string' || value === ''){
            throw new CommentException("Comment content cannot be empty or not a string!");
        }
        this._content = value;
    }

    //getters

    get userid(){
        return this._userid;
    }

    get username(){
        return this._username;
    }

    get proposalid(){
        return this._proposalid;
    }

    get content(){
        return this._content;
    }
}

module.exports = Comment;