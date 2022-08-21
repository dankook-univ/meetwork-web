import { create } from '@/operations/board/create';
import { deleteBoard } from '@/operations/board/delete';
import { list } from '@/operations/board/list';
import { update } from '@/operations/board/update';

const BoardApi = {
  create,
  delete: deleteBoard,
  list,
  update,
};

export default BoardApi;
