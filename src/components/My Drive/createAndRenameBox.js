import React, { useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormComponents from '../FormComponents/index'
import { crossGrey } from '../../utils/svg/index'

const CreateAndRenameBox = (props) => {
  useEffect(() => {
    const closeBtn = document.getElementById('cross-btn')
    closeBtn.addEventListener('click', () => {
      props.closingBoxFunction()
    })
  })

  const initialValues = {
    name: '',
  }
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
  })
  const onSubmit = async (values) => {
    props.closingBoxFunction()
    props.submitFunc(values)
  }

  return (
    <div className="dialog-box">
      <div className="box-body">
        <div className="box-head">
          <div style={{ display: 'flex' }}>
            <div className="icon">{props.icon}</div>
            <h4>{props.head}</h4>
          </div>
          <div className="cross-btn" id="cross-btn">
            {crossGrey}
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <FormComponents
                name="name"
                type="text"
                label={props.label}
                control="input"
              />
              <div className="control-btnx">
                <button
                  type="button"
                  className="btn btnSubmit cancelBtn"
                  onClick={props.closingBoxFunction}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btnSubmit">
                  {props.submitBtnName}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreateAndRenameBox
