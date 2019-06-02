import React from 'react'

const Statistic = ({user}) => {
    const {name, avatarURL, answers, questions} = user
    const answered = Object.keys(answers).length
    const opened = questions.length
    const score = +answered + +opened

    return (    
        <div className="question">
            <div className="question-info">
                <div>
                    <span>
                        {name} <img src={avatarURL} className="avatar-small" alt="" /> / Score: {score}
                    </span>
                    <p>Answered questions: {answered}</p>
                    <p>Opened questions: {opened}</p>
                </div>                  
            </div>
        </div>
    )
}

export default Statistic