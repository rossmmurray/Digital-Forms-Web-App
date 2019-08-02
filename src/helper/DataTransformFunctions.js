import react from 'react'


export const getQuestionsDropdown = (questions) => {

    const dropdownData = questions.map(question => {
        return { value: question._id, displayText: question.questionText }
    })
    return dropdownData;
}