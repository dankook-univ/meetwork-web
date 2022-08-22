import { checkCode } from '@/operations/event/checkCode';
import { create } from '@/operations/event/create';
import { get } from '@/operations/event/get';
import { getProfile } from '@/operations/event/getProfile';
import { member } from '@/operations/event/member';
import { members } from '@/operations/event/members';
import { list } from '@/operations/event/list';
import { release } from '@/operations/event/release';
import { update } from '@/operations/event/update';
import { updateAdmin } from '@/operations/event/updateAdmin';

const EventApi = {
  checkCode,
  create,
  get,
  getProfile,
  member,
  members,
  list,
  release,
  update,
  updateAdmin,
};

export default EventApi;
