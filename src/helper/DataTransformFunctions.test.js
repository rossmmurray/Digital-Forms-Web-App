import { getQuestionsDropdown } from './DataTransformFunctions'
import { getQuestions } from './APIDataFunctions'

jest.mock('./APIDataFunctions.js')

test('transform questions into dropdown data', async () => {
    const allQuestions = await getQuestions();
    const transformedData = getQuestionsDropdown(allQuestions);
    const arrayCheckString = Object.prototype.toString.call(transformedData);
    expect(arrayCheckString).toEqual('[object Array]');
    expect(transformedData[0]).toHaveProperty('value')
    expect(transformedData[0]).toHaveProperty('displayText')
    expect(1).toEqual(1);
})