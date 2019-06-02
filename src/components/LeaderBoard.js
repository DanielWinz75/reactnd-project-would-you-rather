import React, {Component} from 'react'
import { connect } from 'react-redux'
import Statistic from './Statistic';

class LeaderBoard extends Component {
    render() {
        const {users,usersSortedByScore} = this.props
        return(
            <div>
                {usersSortedByScore.map((user) => {
                        const id = Object.keys(user)[0]
                        return (
                            <Statistic user={users[id]} key={id} />
                        )
                })}
            </div>
        )
    }
}

function sortByScore(a,b) {
    const ascore = a[Object.keys(a)[0]]
    const bscore = b[Object.keys(b)[0]]
    return +bscore - +ascore
}

function mapStateToProps({users}) {
    let userids = Object.keys(users)

    const usersSortedByScore = userids.map((id) => {
        const user = users[id]
        const score = Object.keys(user.answers).length + user.questions.length
        return {[id]: score}
    }).sort(sortByScore)

    return {
        users,
        usersSortedByScore,
    }
}

export default connect(mapStateToProps)(LeaderBoard)