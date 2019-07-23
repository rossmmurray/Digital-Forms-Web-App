import { getQuestions, saveQuestion, deleteQuestion} from './APIDataFunctions'

// test('apidata get success message from api', async () => {
//     const result = await getQuestionsFromAPI();
//     expect(result.data.success).toEqual(true)
// });

test('get questions array', async () => {
    const result = await getQuestions();
    const arrayCheckString = Object.prototype.toString.call(result);
    expect(arrayCheckString).toEqual('[object Array]');
    // expect(result.length).not.toEqual(0);
});

test('post question', async () => {
    const questionText = "Added a question";
    const result = await saveQuestion(questionText);
    const resultID = result._id;
    expect(resultID.length).not.toEqual(0);
})

test('delete question (with post before)', async () => {
    const questionText = "Added a question";
    const result = await saveQuestion(questionText);
    const createdQuestionId = result._id;
    const deletedResponse = await deleteQuestion(createdQuestionId);
    expect(deletedResponse.success).toEqual(true);
    expect(deletedResponse.deletedQuestionId).toEqual(createdQuestionId);
})