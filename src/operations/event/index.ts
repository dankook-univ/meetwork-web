import { checkCode } from '@/operations/event/checkCode';
import { create } from '@/operations/event/create';
import { deleteEvent } from '@/operations/event/delete';
import { get } from '@/operations/event/get';
import { getProfile } from '@/operations/event/getProfile';
import { join } from '@/operations/event/join';
import { member } from '@/operations/event/member';
import { members } from '@/operations/event/members';
import { list } from '@/operations/event/list';
import { release } from '@/operations/event/release';
import { secession } from '@/operations/event/secession';
import { update } from '@/operations/event/update';
import { updateAdmin } from '@/operations/event/updateAdmin';

const EventApi = {
  checkCode,
  create,
  delete: deleteEvent,
  get,
  getProfile,
  join,
  member,
  members,
  list,
  release,
  leave: secession,
  update,
  updateAdmin,
};

export default EventApi;
