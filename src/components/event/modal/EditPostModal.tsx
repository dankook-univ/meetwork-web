import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import classNames from 'classnames';

import { MeetworkApi } from '@/operations';

interface EditPostModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string;
  postId: string;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  visible,
  setVisible,
  boardId,
  postId,
}) => {
  const router = useRouter();

  const { mutate } = useSWR(['/api/post/list', boardId, 1], () =>
    MeetworkApi.post.list(boardId),
  );

  const handleClose = useCallback(
    async (event: React.TouchEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        setVisible(false);
      }
    },
    [setVisible],
  );

  const handleEdit = useCallback(async () => {
    await router.push(`${router.asPath}/edit`);
  }, [router]);

  const handleDelete = useCallback(async () => {
    await MeetworkApi.post.delete(postId);
    await mutate();

    router.back();
  }, [mutate, postId, router]);

  return (
    <div
      className={classNames(
        'absolute top-0 z-[100] flex flex-col w-screen h-screen px-[56px] items-center justify-center bg-[rgba(54,54,54,0.3)]',
        `${visible ? '' : 'hidden'}`,
      )}
      onTouchEnd={handleClose}
    >
      <section className="flex flex-col w-full p-[12px] rounded-[18px] items-center bg-white z-[200]">
        <div
          className="flex w-full py-[16px] rounded-[12px] mb-[6px] items-center justify-center bg-mint"
          onClick={handleEdit}
        >
          <span className="font-[600] text-[16px] text-white">수정하기</span>
        </div>

        <div
          className="flex w-full py-[16px] rounded-[12px] mt-[6px] items-center justify-center bg-pink"
          onClick={handleDelete}
        >
          <span className="font-[600] text-[16px] text-white">삭제하기</span>
        </div>
      </section>
    </div>
  );
};

export default EditPostModal;
