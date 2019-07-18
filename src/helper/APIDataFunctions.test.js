// import func1 from './APIDataFunctions'
import { getQuestionsFromAPI } from './APIDataFunctions'

test('apidata get success message from api', async () => {
    const result = await getQuestionsFromAPI();
    expect(result.data.success).toEqual(true)
});

