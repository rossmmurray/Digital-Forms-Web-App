import { updateFormToAPI, deleteFormToAPI, postFormToAPI, updateUser, getUsers, getQuestions, saveQuestionRequestToApi, deleteQuestion, updateQuestionRequestToApi } from './APIDataFunctions'
import { deleteAllQuestions } from '../helper/ApiDataFunctions'
// jest.mock("./APIDataFunctions.js");


const freeTextQuestion = {
    questionText: "Standard qustions text",
    answerType: 'free'
}

test('get questions array', async () => {
    const result = await getQuestions();
    const arrayCheckString = Object.prototype.toString.call(result);
    expect(arrayCheckString).toEqual('[object Array]');
});

test('get users array', async () => {
    const res = await getUsers();
    expect(Object.prototype.toString.call(res)).toEqual('[object Array]')
    expect(res.length).toBeGreaterThan(0)
})

test('update user', async () => {
    const updatedUser = { _id: "5d52c90a1c9d4400002babdb", email: "janetestnew@gmail.com", role: "patient", googleProvider: { id: "101351826470304396904", token: "ya29.GlxeB1LjEuQ7q_NDCohwfuc3RCAHldE70sBQEfjl9MyxIuTC8166R7QKl2668a8zhvU_Phcmv9WaiW8SosUR-fL0GCucjCdTdBy5XSNYbLpqzz82wNRYEaerJzku3A" }, __v: "0" }
    const res = await updateUser(updatedUser)
    expect(res.success).toEqual(true)
})

test('post, update and delete form', async () => {

    // delete all first
    await deleteFormToAPI({})

    // need question for firstQuestion field
    const newQuestion = await saveQuestionRequestToApi(freeTextQuestion);

    // create new form
    const form = {
        title: "Mental Health Triage Form One",
        firstQuestion: newQuestion._id
    }
    const result = await postFormToAPI(form)
    expect(result.data.success).toEqual(true)
    const formID = result.data.form._id

    // // update form
    const updatedForm = { ...result.data.form, title: "some updated form" }
    const updateResult = await updateFormToAPI(updatedForm)
    expect(updateResult.success).toEqual(true)
    expect(updateResult.form.title).toEqual('some updated form')

    // delete form
    const deleteResult = await deleteFormToAPI({ _id: formID })
    expect(deleteResult).toEqual(1)

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

afterAll(async () => {
    // end - delete all questions and forms and add some back
    await deleteAllQuestions()
    await deleteFormToAPI({})
    saveQuestionRequestToApi(freeTextQuestion)
    
    //    do these backwards
    const emergencyHtml = "<div><h1>Emergency</h1></div>"
    const drinklineHtml = "<div><h1>DrinkLine</h1></div>"

    const finish = null
    const alcos = await  saveQuestionRequestToApi({ questionText: "Alchol Abuse Services", answerType: 'service', serviceHtml: drinklineHtml }) 
    const emergencys = await saveQuestionRequestToApi({ questionText: "Emergency Services", answerType: 'service', serviceHtml: emergencyHtml })
    const feelq = await saveQuestionRequestToApi({
        questionText: "How are you feeling today?",
        answerType: 'option',
        answerOptions: [
            { optionName: 'I feel great', questionLink: finish },
            { optionName: 'I feel ok', questionLink: finish },
            { optionName: 'I feel unwell', questionLink: finish},
            { optionName: 'I feel like I may put myself in danger', questionLink: emergencys._id },
        ]
    });
    const longq = await saveQuestionRequestToApi({ questionText: "How many weeks have you felt like this?", answerType: 'number', nextQuestion: feelq._id })
    const otherq = await saveQuestionRequestToApi({ questionText: "Write down the reason", answerType: 'free', nextQuestion: longq._id })
    const whyq = await saveQuestionRequestToApi({
        questionText: "Please tell us why you have contacted the service.",
        answerType: 'option',
        answerOptions: [
            { optionName: 'Anxiety', questionLink: longq._id },
            { optionName: 'Depression', questionLink: longq._id },
            { optionName: 'Panic', questionLink: longq._id },
            { optionName: 'Alcohol abuse', questionLink: alcos._id },
            { optionName: 'Other', questionLink: otherq._id },
        ]
    });
    const dobq = await saveQuestionRequestToApi({ questionText: "What is your date of Birth", answerType: 'date', nextQuestion: whyq._id })
    const nameq = await saveQuestionRequestToApi({ questionText: "What is your name?", answerType: 'free', nextQuestion: dobq._id })
    const selfq = await saveQuestionRequestToApi({
        questionText: "Are you filling out this form for yourself?",
        answerType: 'boolean',
        answerOptions: [
            { optionName: 'True', questionLink: nameq._id },
            { optionName: 'False', questionLink: nameq._id },
        ]
    })
    postFormToAPI({ title: "Mental Health: Initial Access Form 1", firstQuestion: selfq._id })
    postFormToAPI({ title: "AB4129: Student Survey", firstQuestion: otherq._id })
    updateFormToAPI({ title: "Information Gathering Form III", firstQuestion: otherq._id })
})
