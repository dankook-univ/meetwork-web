import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import useSWR from 'swr';
import { MeetworkApi } from '@/operations';
import { ChatRoom } from '@/domain/chat/chat-room';
import ChannelItem from '@/components/event/ChannelItem';

interface SearchChatRoomProps {
  eventId: string;
}

const SearchChatRoom: React.FC<SearchChatRoomProps> = ({ eventId }) => {
  const router = useRouter();

  const { data } = useSWR(['/api/chat/', eventId], () =>
    MeetworkApi.chat.list(eventId),
  );

  const [search, setSearch] = useState<string>('');

  const rooms = useMemo<ChatRoom[]>(
    () => data?.filter((room) => room.name.includes(search)) ?? [],
    [data, search],
  );

  const visible = useMemo<boolean>(
    () => router.asPath.includes('?search=true'),
    [router],
  );

  const handleClose = useCallback(async () => {
    await router.replace(router.asPath.replace('?search=true', ''));
  }, [router]);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target?.value.trimStart());
    },
    [setSearch],
  );

  const handleOnClick = useCallback(async (eventId: string, roomId: string) => {
    await MeetworkApi.chat.join(eventId, roomId);
  }, []);

  return (
    <div
      className={classNames(
        'absolute top-0 z-[100] flex flex-col w-screen h-screen bg-[rgba(54,54,54,0.3)]',
        `${visible ? '' : 'hidden'}`,
      )}
    >
      <div className="flex w-screen h-[108px]" onClick={handleClose} />
      <div className="flex flex-1 flex-col w-screen rounded-tl-[20px] rounded-tr-[20px] shadow-[0_-3px_4px_rgba(0,0,0,0.25)] bg-white">
        <div className="flex px-[20px] py-[28px]">
          <input
            className="w-full h-[40px] px-[20px] focus:outline-none caret-mint font-normal text-[14px] text-black placeholder:font-normal placeholder:font-[14px] placeholder:text-lightGray rounded-[10px] border-[1px] border-lightGray bg-[#FCFCFC]"
            placeholder="다음으로 이동..."
            onChange={handleOnChange}
          />
        </div>

        {rooms.map((room) => (
          <ChannelItem key={room.id} channel={room} onClick={handleOnClick} />
        ))}
      </div>
    </div>
  );
};

export default SearchChatRoom;
