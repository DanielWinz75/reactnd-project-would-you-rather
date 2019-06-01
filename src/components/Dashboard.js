import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { toggleQuestions } from '../actions/catalog'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.toggleQuestionList=this.toggleQuestionList.bind(this)
  }

  toggleQuestionList = (e) => {
    const value = e.target.value
    const {dispatch } = this.props
    dispatch(toggleQuestions(value))
  }

  render() {
    const { sortedIds, currentlyDisplayed } = this.props
    return (
      <div>
        <h3 className='center'>What would you rather?</h3>
        <div className='center'>
          <button className={currentlyDisplayed === 'open' ? 'btn btn-touched' : 'btn'} onClick={this.toggleQuestionList} value="open" >open questions</button>       
          <button className={currentlyDisplayed === 'closed' ? 'btn btn-touched' : 'btn'} onClick={this.toggleQuestionList} value="closed">answered by me</button>  
        </div>
        <div>
            {sortedIds !== null && sortedIds.length > 0 ?
            sortedIds.map((id) => (
                <Question key={id} id={id} />
            )) : <h3 className="center">No {currentlyDisplayed} questions yet</h3>}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ questions, catalog, authedUser }) {
  let sortedIds = null
  const currentlyDisplayed = catalog.displayQuestionType
  if (catalog.displayQuestionType === 'open' || catalog.displayQuestionType === undefined) {
    if(catalog.openQuestions) {
      sortedIds = catalog.openQuestions
                    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
  }
  if (catalog.displayQuestionType === 'closed') {
    if(catalog.closedQuestions) {
      sortedIds = catalog.closedQuestions
                    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
  }
  return {
    questions,
    sortedIds,
    currentlyDisplayed,
    authedUser,
  }
}

export default connect(mapStateToProps)(Dashboard)