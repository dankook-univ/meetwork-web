import { create } from '@/operations/post/create';
import { deletePost } from '@/operations/post/delete';
import { get } from '@/operations/post/get';
import { list } from '@/operations/post/list';
import { update } from '@/operations/post/update';

const PostApi = {
  create,
  delete: deletePost,
  get,
  list,
  update,
};

export default PostApi;
