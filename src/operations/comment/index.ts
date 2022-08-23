import { create } from '@/operations/comment/create';
import { deleteComment } from '@/operations/comment/delete';

const CommentApi = {
  create,
  delete: deleteComment,
};

export default CommentApi;