import { list } from '@/operations/event/list';
import { get } from '@/operations/event/get';
import { getProfile } from '@/operations/event/getProfile';
import { create } from '@/operations/event/new';
import { checkCode } from '@/operations/event/checkCode';

const EventApi = {
  list,
  get,
  getProfile,
  create,
  checkCode,
};

export default EventApi;
