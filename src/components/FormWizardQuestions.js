import React, { useEffect, useState } from 'react';
import { MHPaper } from '../styling/MHPaper'
import { getFormsFromAPI, getQuestions } from '../helper/ApiDataFunctions';

// to not highlight props validation
/* eslint react/prop-types: 0 */

export const FormWizardQuestions = props => {

    const form = props.form
    const firstQuestion = props.firstQuestion


    return (
        <div>
            <h2>{firstQuestion.questionText}</h2>

        </div>
    )
}

