import { Post } from 'contexts/blog/Post'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

@Service()
export class BlogContext {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) {}

  async createPost({ title, content, user }) {
    const post = new Post({ title, content, user })
    await this.postRepository.insert(post)
    return post
  }

  async posts() {
    return await this.postRepository.find()
  }
}
