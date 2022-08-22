import { invite } from '@/operations/invitation/invite';
import { join } from '@/operations/invitation/join';
import { list } from '@/operations/invitation/list';
import { refuse } from '@/operations/invitation/refuse';

const InvitationApi = {
  invite,
  join,
  list,
  refuse,
};

export default InvitationApi;
