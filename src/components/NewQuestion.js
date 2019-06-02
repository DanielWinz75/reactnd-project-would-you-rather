import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addNewQuestion } from '../actions/shared'
import { push } from 'connected-react-router'

class NewQuestion extends Component {
    state = {
      optionOneText: '',
      optionTwoText: '',
      toHome: false,
    }
    handleChange = (e) => {
      const optionText = e.target.value
      const type = e.target.name
      if (type === 'optionOne') {
        this.setState(() => ({
          optionOneText : optionText
        }))
      }
      if (type === 'optionTwo') {
        this.setState(() => ({
          optionTwoText : optionText
        }))
      }      
    }
    handleSubmit = (e) => {
      e.preventDefault()

      const { optionOneText, optionTwoText } = this.state
      const { dispatch } = this.props

      dispatch(addNewQuestion(optionOneText, optionTwoText))
      dispatch(push(`/app/dashboard`))

      this.setState(() => ({
          optionOneText: '',
          optionTwoText: '',
          toHome: true,
      }))
    }
    
    render() {
      const { optionOne, optionTwo } = this.state
 
      return(
        <div>
          <h3 className='center'>Would you rather</h3>
          <form className='new-question' onSubmit={this.handleSubmit}>

            <textarea
              placeholder="Option One"
              name="optionOne"
              value={optionOne}
              onChange={this.handleChange}
              className='textarea'
            />
            <textarea
              placeholder="Option Two"
              name="optionTwo"
              value={optionTwo}
              onChange={this.handleChange}
              className='textarea'
            />   
            <button
              className='btn'
              type='submit'
              disabled={optionOne === '' || optionTwo === ''}>
              Submit
            </button>

          </form>
        </div>
      )
    }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}
 
export default connect(mapStateToProps)(NewQuestion)
