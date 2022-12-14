import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';
import { Board } from '@/domain/board';

import BasicLayout from '@/components/layout/BasicLayout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import CameraIcon from '@/components/icons/CameraIcon';
import CustomButton from '@/components/button/CustomButton';

interface NewProps {
  eventId: string;
  boardId: string;
  postId: string;
}

const imageReg =
  /!\[post_image]&#x28;https:&#x2F;&#x2F;kr.object.ncloudstorage.com&#x2F;meetwork&#x2F;post&#x2F;[a-zA-Z0-9\-]+.(jpeg|png|jpg|gif)&#x29;/g;

const New: NextPage<NewProps> = ({ eventId, boardId, postId }) => {
  const router = useRouter();

  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);

  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );
  const { data: boards } = useSWR(['/api/board/list', eventId], () =>
    MeetworkApi.board.list(eventId),
  );
  const { data: post, mutate: mutatePost } = useSWR(['/api/post', postId], () =>
    MeetworkApi.post.get(postId),
  );
  const { mutate: mutatePosts } = useSWR(['/api/post/list', eventId, 1], () =>
    MeetworkApi.post.list(postId),
  );

  const board = useMemo<Board | null>(
    () => boards?.find((it) => it.id === boardId) ?? null,
    [boardId, boards],
  );

  useEffect(() => {
    if (post?.writer.id !== me?.id) {
      router.back();
    } else {
      setContent(post?.content.replace(imageReg, '').trim() ?? '');
      setImages(
        post?.content.match(imageReg)?.map((image) =>
          image
            .replace('![post_image]&#x28;', '')
            .replace('&#x29;', '')
            .replaceAll(/&#x2F;/g, '/'),
        ) ?? [],
      );
    }
  }, [me?.id, post?.content, post?.writer.id, router]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo<JSX.Element>(
    () => (
      <div className="flex flex-row items-center">
        <HeaderBackButton onClick={handleBack} />

        <header className="flex flex-col ml-[10px]">
          <span className="font-[400] text-[18px] text-black">????????????</span>
          <span className="font-[400] text-[14px] text-black">
            {board?.name ?? ''}
          </span>
        </header>
      </div>
    ),
    [board?.name, handleBack],
  );

  const handlePost = useCallback(async () => {
    if (content.trim().length > 0) {
      await MeetworkApi.post.update(postId, {
        content: `${content.trim()}\n${images
          .map((image) => `![post_image](${image})`)
          .join('\n')}\n`,
      });
      await mutatePost();
      await mutatePosts();

      router.back();
    }
  }, [content, images, mutatePost, mutatePosts, postId, router]);

  const headerRight = useMemo<JSX.Element>(
    () => (
      <CustomButton
        label="??????"
        style="px-[14px] py-[6px] rounded-[10px] bg-mint"
        textStyle="font-[400] text-[13px] text-white"
        onClick={handlePost}
      />
    ),
    [handlePost],
  );

  const handleContentChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);
    },
    [],
  );

  const handleImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      MeetworkApi.file.uploads([...(event.target.files ?? [])]).then((res) => {
        setImages((prev) => [...prev, ...res]);
      });
    },
    [],
  );

  const handleDeleteImage = useCallback((image: string) => {
    setImages((prev) => prev.filter((it) => it !== image));
  }, []);

  return (
    <BasicLayout
      header={{
        left: headerLeft,
        right: headerRight,
        color: 'white',
        style: 'pb-[10px] border-b-[1px] border-b-gray',
      }}
    >
      <div className="flex flex-1 flex-col">
        <textarea
          className="w-full h-[calc(100%-214px)] p-[20px] bg-white focus:outline-none caret-pink font-normal text-[14px] text-black placeholder:font-normal placeholder:font-[14px] placeholder:text-gray border-b-[1px] border-b-gray"
          placeholder="????????? ???????????????."
          value={content}
          onChange={handleContentChange}
        />

        <div className="absolute bottom-[60px] flex flex-row w-screen max-h-[144px] px-[20px] items-center overflow-y-auto overflow-x-auto overscroll-x-contain scrollbar-hide">
          {images.map((image) => (
            <div
              key={image}
              className="relative flex-none w-[120px] h-[120px] mr-[20px]"
            >
              <div
                className="absolute flex right-[-10px] top-[-10px] z-[100] w-[20px] h-[20px] rounded-[100%] items-center justify-center bg-gray"
                onClick={() => handleDeleteImage(image)}
              >
                <Image src="/icons/x.svg" width={14} height={14} alt="" />
              </div>

              <Image
                className="object-cover"
                src={image}
                width={120}
                height={120}
                alt=""
              />
            </div>
          ))}
        </div>

        <div className="absolute w-full bottom-[20px] left-[20px] w-[24px] h-[24px] items-center justify-center">
          <label htmlFor="file">
            <CameraIcon color="#535353" />
          </label>

          <input
            id="file"
            className="hidden"
            type="file"
            accept="image/jpg,image/jpeg,impge/png,image/gif"
            multiple
            onChange={handleImage}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    const { id, boardId, postId } = (await context.query) as {
      id: string;
      boardId: string;
      postId: string;
    };

    return {
      props: {
        eventId: id,
        boardId,
        postId,
      },
    };
  },
);

export default New;
