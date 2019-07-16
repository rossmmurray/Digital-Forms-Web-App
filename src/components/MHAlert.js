import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class MHAlert extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

    }

    componentDidUpdate() {
        console.log("mhalert props changed: " + JSON.stringify(this.props));
        // this.createNotification('info');
        NotificationManager.info('Info message');
    }

    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };

    render() {
        return (
            <div>
                <NotificationContainer/>
                <p>some text</p>
            </div>

        );
    }
}

export default MHAlert;
