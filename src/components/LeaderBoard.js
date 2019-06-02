import React, {Component} from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
    render() {
        return(
            <div></div>
        )
    }
}

function mapStateToProps({users}) {

    console.log('leader board: ', users)

    return {}
}

export default connect(mapStateToProps)(LeaderBoard)