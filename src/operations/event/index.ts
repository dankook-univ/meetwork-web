import { list } from '@/operations/event/list';
import { create } from '@/operations/event/new';
import { checkCode } from '@/operations/event/checkCode';

const EventApi = {
  list,
  create,
  checkCode,
};

export default EventApi;
