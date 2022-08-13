import { list } from '@/operations/event/list';
import { get } from '@/operations/event/get';
import { create } from '@/operations/event/new';
import { checkCode } from '@/operations/event/checkCode';

const EventApi = {
  list,
  get,
  create,
  checkCode,
};

export default EventApi;
