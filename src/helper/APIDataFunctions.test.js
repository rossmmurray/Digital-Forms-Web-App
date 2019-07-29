import { getQuestions, saveQuestionRequestToApi, deleteQuestion, deleteAllQuestions, updateQuestion} from './APIDataFunctions'

// test('apidata get success message from api', async () => {
//     const result = await getQuestionsFromAPI();
//     expect(result.data.success).toEqual(true)
// });

const freeTextQuestion = {
    questionText: "Standard qustions text",
    answerType: 'free'
}

test('get questions array', async () => {
    const result = await getQuestions();
    const arrayCheckString = Object.prototype.toString.call(result);
    expect(arrayCheckString).toEqual('[object Array]');
    // expect(result.length).not.toEqual(0);
});

test('post question', async () => {
    // const questionText = "Added a question";
    const result = await saveQuestionRequestToApi(freeTextQuestion);
    const resultID = result._id;
    expect(resultID.length).not.toEqual(0);
})

test('delete question (with post before)', async () => {
    const questionText = "Added a question";
    const result = await saveQuestionRequestToApi(freeTextQuestion);
    const createdQuestionId = result._id;
    const deletedResponse = await deleteQuestion(createdQuestionId);
    expect(deletedResponse.success).toEqual(true);
    expect(deletedResponse.deletedQuestionId).toEqual(createdQuestionId);
})

test('update question (with post before)', async () => {
    const newQuestion = await saveQuestionRequestToApi(freeTextQuestion);
    const newQuestionId = newQuestion._id
    const updateResponse = await updateQuestion(newQuestionId, 'Updated question text');
    expect(updateResponse.success).toEqual(true);
})

afterAll(() => {
    deleteAllQuestions();
});