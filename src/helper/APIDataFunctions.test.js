import { getQuestionsFromAPI, getQuestions } from './APIDataFunctions'

test('apidata get success message from api', async () => {
    const result = await getQuestionsFromAPI();
    expect(result.data.success).toEqual(true)
});

test('get questions array', async () => {
    const result = await getQuestions();
    const arrayCheckString = Object.prototype.toString.call(result);
    expect(arrayCheckString).toEqual('[object Array]')
});

