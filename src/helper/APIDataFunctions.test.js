import { getUsers, getQuestions, saveQuestionRequestToApi, deleteQuestion, updateQuestionRequestToApi } from './APIDataFunctions'


jest.mock("./APIDataFunctions.js");

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

test('get users array', async () => {
    const res = await getUsers();
    expect(Object.prototype.toString.call(res)).toEqual('[object Array]')
    expect(res.length).toBeGreaterThan(0)
})

test('post question', async () => {
    // const questionText = "Added a question";
    let result;
    try {
        result = await saveQuestionRequestToApi(freeTextQuestion);
    } catch (err) {
        throw new Error(err)
    }
    // console.error(result)
    const resultID = result._id;
    expect(resultID.length).not.toEqual(0);
})

test('delete question (with post before)', async () => {
    const result = await saveQuestionRequestToApi(freeTextQuestion);
    const createdQuestionId = result._id;
    const deletedResponse = await deleteQuestion(createdQuestionId);
    expect(deletedResponse.success).toEqual(true);
    expect(deletedResponse.deletedQuestionId).toEqual(createdQuestionId);
})

test('update question (with post before)', async () => {
    const someQuestion = await saveQuestionRequestToApi(freeTextQuestion);
    const someQuestionId = someQuestion._id;
    const updatedQuestion = {
        questionText: 'Updated question text',
        answerType: 'number'
    }
    let updateResponse = {};
    try {
        updateResponse = await updateQuestionRequestToApi(someQuestionId, updatedQuestion)
    } catch (err) {
        throw new Error(err)
    }
   
    expect(updateResponse.success).toEqual(true);
})

