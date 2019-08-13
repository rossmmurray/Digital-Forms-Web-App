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

const singleQuestion = {
    _id: '5d44e24265aed852d0223fd3',
    questionText: 'Standard qustions text',
    answerType: 'free',
    answerOptions: [],
    createdAt: '2019-08-03T01:24:18.548Z',
    updatedAt: '2019-08-03T01:24:18.548Z',
    __v: 0
}

const updateResponse = {
    success: true,
    question:
    {
        _id: '5d44e3dc65aed852d0223ff1',
        questionText: 'Updated question text',
        answerType: 'number',
        answerOptions: [],
        createdAt: '2019-08-03T01:31:08.282Z',
        updatedAt: '2019-08-03T01:31:08.303Z',
        __v: 0
    }
}

const usersMocked = [
    {
        role: 'admin',
        _id: '5d4c84779952b437d62fc31d',
        email: 'rossmichaelm@gmail.com',
        googleProvider:
        {
            id: '101351826470304396905',
            token:
                'ya29.GlxeB1LjEuQ7q_NDCohwfuc3RCAHlcE70sBQEfjl9MyxIuTC8166R7QKl2668a8zhvU_Phcmv9WaiW8SosUR-fL0GCucjCdTdBy5XSNYbLpqzz82wNRYEaerJzku3A'
        },
        __v: 0
    }
]


export const getQuestions = jest.fn(() => questionsMocked);
export const saveQuestionRequestToApi = jest.fn(() => singleQuestion);
export const deleteQuestion = jest.fn(() => { return { success: true, deletedQuestionId: '5d44e24265aed852d0223fd3' } });
export const updateQuestionRequestToApi = jest.fn(() => updateResponse);
export const deleteAllQuestions = jest.fn();
export const getUsers = jest.fn(() => usersMocked)
