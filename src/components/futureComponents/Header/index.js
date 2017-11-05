import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './index.css'

class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className='cool'> Header</div>
            </div>
        );
    }
}

Header.propTypes = {};
Header.defaultProps = {};

export default Header;
