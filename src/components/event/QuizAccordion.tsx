import React, { useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomInput from '@/components/form/CustomInput';

interface QuizAccordionProps {
  index: number;
  quiz:
    | {
        answer: string;
        choice: string[];
        content: string;
      }
    | {
        questionId: string;
        answer: string;
        choice: string[];
        content: string;
      };
  setQuiz: (
    props:
      | {
          answer: string;
          choice: string[];
          content: string;
        }
      | {
          questionId: string;
          answer: string;
          choice: string[];
          content: string;
        }
      | null,
  ) => void;
  show: number | null;
  setShow: React.Dispatch<React.SetStateAction<number | null>>;
}

const QuizAccordion: React.FC<QuizAccordionProps> = ({
  index,
  quiz,
  setQuiz,
  show,
  setShow,
}) => {
  const visible = useMemo<boolean>(() => show === index, [index, show]);

  const handleShow = useCallback(() => {
    if (index === show) {
      setShow(null);
    } else {
      setShow(index);
    }
  }, [index, setShow, show]);

  const handleTitle = useCallback(
    (text: string) => {
      setQuiz({ ...quiz, content: text });
    },
    [quiz, setQuiz],
  );

  const handleAnswer = useCallback(
    (text: string) => {
      setQuiz({ ...quiz, answer: text });
    },
    [quiz, setQuiz],
  );

  const handleWrong = useCallback(
    (idx: number) => {
      return (text: string) => {
        setQuiz({
          ...quiz,
          choice: quiz.choice.map((it, i) => (idx === i ? text : it)),
        });
      };
    },
    [quiz, setQuiz],
  );

  return (
    <div className="flex flex-col">
      <header
        className="flex px-[22px] py-[12px] border-b-[1px] border-b-gray"
        onClick={handleShow}
      >
        <span className="flex flex-1 font-[400] text-[16px] text-black">
          {`Q${index + 1}. ${quiz.content}`}
        </span>
      </header>

      <AnimatePresence initial={false}>
        {visible && (
          <motion.section
            key={index}
            className="flex flex-col border-b-[1px] border-b-gray pl-[22px]"
            initial="close"
            animate="open"
            exit="close"
            variants={{
              open: { opacity: 1, height: 'auto' },
              close: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.6, ease: [0.64, 0.62, 0.23, 0.98] }}
          >
            <section className="flex flex-col">
              <header className="flex px-[22px] py-[4px] bg-lightGray">
                <span className="font-[400] text-[14px] text-black">문제</span>
              </header>

              <div className="flex px-[22px] py-[16px]">
                <CustomInput
                  value={quiz.content}
                  setValue={handleTitle}
                  placeholder="문제"
                  textStyle="text-[16px]"
                />
              </div>
            </section>

            <section className="flex flex-col">
              <header className="flex px-[22px] py-[4px] bg-lightGray">
                <span className="font-[400] text-[14px] text-black">정답</span>
              </header>

              <div className="flex px-[22px] py-[16px]">
                <CustomInput
                  value={quiz.answer}
                  setValue={handleAnswer}
                  placeholder="정답"
                  textStyle="text-[16px]"
                />
              </div>
            </section>

            <section className="flex flex-col">
              <header className="flex px-[22px] py-[4px] bg-lightGray">
                <span className="font-[400] text-[14px] text-black">오답</span>
              </header>

              <div className="flex flex-col px-[22px] py-[16px]">
                {quiz.choice.map((choice, idx) => (
                  <CustomInput
                    key={idx}
                    value={choice}
                    setValue={handleWrong(idx)}
                    placeholder={`오답 ${idx + 1}`}
                    textStyle="text-[16px]"
                  />
                ))}
              </div>
            </section>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizAccordion;
