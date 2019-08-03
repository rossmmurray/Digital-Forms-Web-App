import PropTypes from 'prop-types';


export const answerOptionType = PropTypes.shape({
    optionName: PropTypes.string,
    questionLink: PropTypes.string
})

export const questionType = PropTypes.shape({
    questionText: PropTypes.string,
    answerType: PropTypes.string,
    _id: PropTypes.string,
    answerOptions: PropTypes.arrayOf(answerOptionType)
})