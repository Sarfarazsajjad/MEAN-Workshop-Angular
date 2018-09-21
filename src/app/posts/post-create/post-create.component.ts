import { Component } from "@angular/core";

@Component({
  selector : "app-post-create",
  templateUrl:"./post-create.component.html"
})
export class PostCreateComponent{
  newPost = "No Content";
  enteredValue;

  onSavePost(postInput: HTMLTextAreaElement){
    postInput
    this.newPost = this.enteredValue;
  }
}