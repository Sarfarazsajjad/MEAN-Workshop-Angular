import { Injectable } from "@angular/core";
import { Post } from "./post.model"
import { Subject } from "rxjs"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {

  }
  private posts: Post[] = []
  private postsUpdated = new Subject<Post[]>();
  getPosts() {
    this.http.get("http://localhost:3000/api/posts")
      .subscribe((postData: { message: "string", posts: Post[] }) => {
        this.posts = postData.posts;

        this.postsUpdated.next([...this.posts]);
      })
  }

  getPostUpdateListner() {
    return this.postsUpdated.asObservable();
  }
  getPost(id: string){
    const post = {...this.posts.find(p => p._id === id)};
    return post;
  }
  addPost(title: string, content: string) {
    let post: Post = {
      _id:null,
      title: title,
      content: content
    }

    this.http.post<{ message: string, post: Post }>("http://localhost:3000/api/posts", post)
      .subscribe((responseData) => {
        console.log(responseData);

        this.posts.push(responseData.post);
        this.postsUpdated.next([...this.posts])
      })

  }

  updatePost(post: Post){
    this.http
      .put('http://localhost:3000/api/posts/'+post._id, post)
      .subscribe(response => console.log(response));
  }

  deletePost(postId: string){
    console.log('posts service delete post',postId);
    this.http.delete('http://localhost:3000/api/posts/'+postId)
      .subscribe((responseMessage)=>{
        console.log(responseMessage);

        const updatedPosts = this.posts.filter(post=>post._id !== postId)
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      })

  }
}