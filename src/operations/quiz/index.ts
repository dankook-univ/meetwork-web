import { check } from '@/operations/quiz/check';
import { create } from '@/operations/quiz/create';
import { deleteQuiz } from '@/operations/quiz/delete';
import { get } from '@/operations/quiz/get';
import { list } from '@/operations/quiz/list';
import { me } from '@/operations/quiz/me';
import { participant } from '@/operations/quiz/participant';
import { result } from '@/operations/quiz/result';
import { update } from '@/operations/quiz/update';

const QuizApi = {
  check,
  create,
  delete: deleteQuiz,
  get,
  list,
  me,
  participant,
  result,
  update,
};

export default QuizApi;
