import { getQuestionsDropdown } from './DataTransformFunctions'
import { getQuestions, saveQuestionRequestToApi, deleteQuestion, updateQuestionRequestToApi } from './APIDataFunctions'

test('transform questions into dropdown data', async () => {
    const allQuestions = await getQuestions();
    const transformedData = getQuestionsDropdown(allQuestions);
    const arrayCheckString = Object.prototype.toString.call(transformedData);
    expect(arrayCheckString).toEqual('[object Array]');
    // if (transformedData.length > 0) {
    // console.log(transformedData)
    // expect(transformedData[0]).toMatchObject({value: 'x', displayText: 'y'})
    expect(transformedData[0]).toHaveProperty('value')
    expect(transformedData[0]).toHaveProperty('displayText')
    // expect(1).toEqual(1)
    // }
})