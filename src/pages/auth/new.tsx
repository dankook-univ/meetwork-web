import React, { useCallback, useMemo, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { withoutAuthSSR } from '@/utils/session/withoutAuth';

import AccountInfoInput from '@/components/auth/AccountInfoInput';
import CustomButton from '@/components/button/CustomButton';
import { MeetworkApi } from '@/operations';

const emailReg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const New: NextPage = () => {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const nameError = useMemo<boolean>(() => name.length < 2, [name]);
  const emailError = useMemo<boolean>(() => !emailReg.test(email), [email]);
  const buttonStatus = useMemo<boolean>(
    () => nameError || emailError,
    [nameError, emailError],
  );

  const handleOnClick = useCallback(async () => {
    const { type, token } = router.query as { type: 'kakao'; token: string };

    await MeetworkApi.auth.signUp({
      type,
      token,
      name,
      email,
    });

    await router.push(`/`);
  }, [router, name, email]);

  return (
    <div className="flex min-w-screen min-h-screen items-center justify-center bg-gradient-to-b from-mint to-primary">
      <div className="flex flex-col w-full items-center p-[26px]">
        <span className="font-normal text-[26px] text-white">
          CREATE ACCOUNT
        </span>

        <div className="flex flex-col w-full mt-[90px] mb-[100px]">
          <AccountInfoInput<string>
            value={name}
            setValue={setName}
            error={nameError}
            style="h-[52px] mb-[14px]"
            icon={{ src: '/icons/user.svg', width: 24, height: 24 }}
            placeholder="사용자 이름"
          />
          <AccountInfoInput<string>
            value={email}
            setValue={setEmail}
            error={emailError}
            style="h-[52px]"
            icon={{ src: '/icons/mail.svg', width: 24, height: 24 }}
            placeholder="Email"
          />
        </div>

        <CustomButton
          style="w-full rounded-[50px]"
          textStyle="text-white"
          label="계속"
          onClick={handleOnClick}
          disable={buttonStatus}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withoutAuthSSR(
  async () => {
    return {
      props: {},
    };
  },
);

export default New;
