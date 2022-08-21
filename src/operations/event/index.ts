import { checkCode } from '@/operations/event/checkCode';
import { create } from '@/operations/event/create';
import { get } from '@/operations/event/get';
import { getProfile } from '@/operations/event/getProfile';
import { members } from '@/operations/event/members';
import { list } from '@/operations/event/list';
import { update } from '@/operations/event/update';

const EventApi = {
  checkCode,
  create,
  get,
  getProfile,
  members,
  list,
  update,
};

export default EventApi;
