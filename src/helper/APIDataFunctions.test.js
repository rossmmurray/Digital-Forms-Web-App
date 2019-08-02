import { getQuestions, saveQuestionRequestToApi, deleteQuestion, updateQuestionRequestToApi } from './APIDataFunctions'

// test('apidata get success message from api', async () => {
//     const result = await getQuestionsFromAPI();
//     expect(result.data.success).toEqual(true)
// });

// jest.mock("./APIDataFunctions.js");

// todo: continue with mocks

const questionsMocked = [{
    _id: '5d446dd365aed852d0223db7',
    questionText: 'Updated question text',
    answerType: 'number',
    answerOptions: [],
    createdAt: '2019-08-02T17:07:31.486Z',
    updatedAt: '2019-08-02T17:07:31.506Z',
    __v: 0
},
{
    _id: '5d446dd365aed852d0223db3',
    questionText: 'Standard qustions text',
    answerType: 'free',
    answerOptions: [],
    createdAt: '2019-08-02T17:07:31.421Z',
    updatedAt: '2019-08-02T17:07:31.421Z',
    __v: 0
}]

// getQuestions.mockImplementation(() => questionsMocked)

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
    const updateResponse = await updateQuestionRequestToApi(someQuestionId, updatedQuestion).catch(error => {
        console.error(error);
    });
    expect(updateResponse.success).toEqual(true);
})

