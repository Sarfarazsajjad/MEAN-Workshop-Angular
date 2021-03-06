import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";


@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {

  private mode = 'create';
  private postId: string;
  post: Post = {
    _id: null,
    title: null,
    content: null
  };
  isLoading = false;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }
  onSavePost(form: NgForm) {

    if (form.invalid) {
      return;
    }

    if(this.mode === 'create'){
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      const post: Post = {
        _id : this.postId,
        title: form.value.title,
        content: form.value.content
      }
      this.postsService.updatePost(post);
    }
    form.resetForm();

  }

  ngOnInit(){
    this.route.paramMap.subscribe(( paramMap : ParamMap)=>{
      if (paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((post: Post) => {
          this.post = post;
          this.isLoading = false;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }
}