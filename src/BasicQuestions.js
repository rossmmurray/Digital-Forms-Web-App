import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";


const BasicQuestions = () => (
    <div>
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="email" name="email" className="nhsuk-input" label="email" />
                    <ErrorMessage name="email" component="div" />
                    <Field type="password" name="password" className="nhsuk-input"/>
                    <ErrorMessage name="password" component="div" />
                    <button type="submit" disabled={isSubmitting} className='nhsuk-button'>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);

export default BasicQuestions;
