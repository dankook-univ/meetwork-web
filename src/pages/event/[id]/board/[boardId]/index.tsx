import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import _ from 'lodash';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';
import { Board } from '@/domain/board';
import { Post } from '@/domain/post';

import EventLayout from '@/components/layout/EventLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import PlusIcon from '@/components/icons/PlusIcon';
import Conditional from '@/hocs/Conditional';

interface IndexProps {
  eventId: string;
  boardId: string;
}

const Index: NextPage<IndexProps> = ({ eventId, boardId }) => {
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [postList, setPostList] = useState<Post[]>([]);

  const { data: event } = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );
  const { data: boards } = useSWR(['/api/board', eventId], () =>
    MeetworkApi.board.list(eventId),
  );
  const { data: posts } = useSWR(['/api/post/list', boardId, page], () =>
    MeetworkApi.post.list(boardId, page),
  );

  useEffect(() => {
    if (posts) {
      setPostList((prev) =>
        _([...prev, ...posts])
          .uniqBy((it) => it.id)
          .value(),
      );
    }
  }, [posts]);

  const hasMore = useMemo<boolean>(
    () => !(posts !== undefined && posts.length < 10),
    [posts],
  );

  const board = useMemo<Board | null>(
    () => boards?.find((it) => it.id === boardId) ?? null,
    [boardId, boards],
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo<JSX.Element>(
    () => <HeaderBackButton onClick={handleBack} color="white" />,
    [handleBack],
  );

  const handleCreate = useCallback(async () => {
    await router.push(`/event/${eventId}/board/${boardId}/new`);
  }, [boardId, eventId, router]);

  const headerRight = useMemo<JSX.Element>(
    () => (
      <div
        className="w-[24px] h-[24px] items-center justify-center"
        onClick={handleCreate}
      >
        <PlusIcon color="#FCFCFC" />
      </div>
    ),
    [handleCreate],
  );

  const handleNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return (
    <EventLayout
      header={{
        title: board?.name ?? '',
        subTitle: event?.name ?? '',
        titleAlign: 'center',
        textColor: 'white',
        left: headerLeft,
        right: headerRight,
      }}
    >
      <div className="flex flex-1 flex-col">
        <Conditional condition={postList.length > 0 && hasMore}>
          <div
            className="flex w-[calc(100%-40px)] py-[14px] mx-[20px] my-[6px] rounded-[10px] items-center justify-center bg-gray"
            onClick={handleNextPage}
          >
            <span className="font-[400] text-[14px] text-black">더보기</span>
          </div>
        </Conditional>
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    const { id, boardId } = (await context.query) as {
      id: string;
      boardId: string;
    };

    return {
      props: {
        eventId: id,
        boardId,
      },
    };
  },
);

export default Index;
