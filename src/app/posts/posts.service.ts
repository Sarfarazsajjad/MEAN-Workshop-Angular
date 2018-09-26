import { Injectable } from "@angular/core";
import { Post } from "./post.model"

@Injectable({
  providedIn: 'root'
})
export class PostsService {
    private Posts: Post[] = []

    getPost(){
      return [...this.Posts];
    }

    addPost(title: string,content: string){
      let post: Post = {
        title: title,
        content: content
      }

      this.Posts.push(post);
    }
}