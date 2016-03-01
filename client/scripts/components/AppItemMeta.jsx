import moment from 'moment'
import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import { formatDateTime, formatDateTimeForHuman } from '../util/date-time-util'

const propTypes = {
    dateTime: PropTypes.string,
    user: PropTypes.string
};

class AppItemMeta extends PureComponent {
  render() {
    const { dateTime, user } = this.props;

    return (
        <p className="appItemMeta">
            <time
                dateTime={formatDateTime(dateTime)}
            >
                {formatDateTimeForHuman(dateTime)}
            </time> by {user}
        </p>
    );
  }
}

AppItemMeta.propTypes = propTypes;

export default AppItemMeta;