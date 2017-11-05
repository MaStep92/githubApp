import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UnAuthorized extends Component {
    static propTypes = {

    }

    render() {
        return(
            <div>
                <h1>UnAuthorized, please <Link to="/auth/signin">Sign in</Link></h1>
            </div>
        )

    }
}

export default UnAuthorized
