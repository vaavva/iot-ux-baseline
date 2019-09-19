import * as React from 'react';
import * as classnames from 'classnames/bind';
import { TextField, RadioField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Field';
import { DateField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/DateTime';
import { Component } from 'react';

const cx = classnames.bind(require('./iotDevices.module.scss'));

export default function IotDevices() {

    const [textValue, changeTextValue] = React.useState('');
    const [radioValue, changeRadioValue] = React.useState('');
    const [dateValue, changeDateValue] = React.useState('');

    return (
        <div>
            {/* <Switch>
                <Route path={Paths.iotDevices.index} exact component={Root} />
                <Route path={Paths.iotDevices.mockDevices} component={MockDevices} />
            </Switch> */}

            <DeviceGetter />
            

            <TextField 
                name='textField'
                value={textValue}
                onChange={changeTextValue}
                label='Name'
                tooltip='Please Enter Your Name'
                required
            />
            <DateField
                name='dateTimeField'
                initialValue={dateValue}
                onChange={changeDateValue}
                label='Birthdate'
            />
            <RadioField
                name='radioField'
                value={radioValue}
                onChange={changeRadioValue}
                label='Gender'
                options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other/Prefer Not To Say' },
                ]}
            />

        </div>
    )
}

// function Root() {
//     return (
//         <ul>
//             <li><Link to={Paths.iotDevices.mockDevices} className='link'>Mock Devices</Link></li>
//         </ul>
//     );
// }


function DeviceList(props: { devices: any; }) {
    const devices = props.devices;
    const listItems = devices.map((device: React.ReactNode[][]) =>        
        
        <div>
            <h3>{device[0]}</h3>
            <div>
                <li>Authentication Type: {(device[1] as unknown as DeviceInfo).authenticationType}</li>
                <li>Capabilities: {JSON.stringify((device[1] as unknown as DeviceInfo).capabilities)}</li>
                <li>Cloud To Device Message Count: {(device[1] as unknown as DeviceInfo).cloudToDeviceMessageCount}</li>
                <li>Connection State: {(device[1] as unknown as DeviceInfo).connectionState}</li>
                <li>Device Etag: {(device[1] as unknown as DeviceInfo).deviceEtag}</li>
                <li>Device ID: {(device[1] as unknown as DeviceInfo).deviceId}</li>
                <li>Etag: {(device[1] as unknown as DeviceInfo).etag}</li>
                <li>Last Activity Time: {(device[1] as unknown as DeviceInfo).lastActivityTime}</li>
                <li>Properties: {JSON.stringify((device[1] as unknown as DeviceInfo).properties)}</li>
                <li>Status: {(device[1] as unknown as DeviceInfo).status}</li>
                <li>Status Update Time: {(device[1] as unknown as DeviceInfo).statusUpdateTime}</li>
                <li>Tags: {JSON.stringify((device[1] as unknown as DeviceInfo).tags)}</li>
                <li>Version: {(device[1] as unknown as DeviceInfo).version}</li>
            </div>
        </div>
    );
      
    return (
      <ul>{listItems}</ul>
    );
  }


type DeviceInfo  = {
    authenticationType: string
    capabilities: any
    cloudToDeviceMessageCount: number
    connectionState: string
    deviceEtag: string
    deviceId: string
    etag: string
    lastActivityTime: any
    properties: any
    status: string
    statusUpdateTime: any
    tags: any
    version: number
}

class DeviceGetter extends Component {
    state = {
        devices: []
    }

    componentDidMount() {
        console.log("fetching")
        fetch('http://localhost:5000/deviceTwins/',
            )
            .then(res => res.json())
            .then((data) => {
                console.log("data")
                console.log(data)
                this.setState({devices: data})
            })
            .catch(console.log)
    }

    render() {
        console.log(this.state.devices)
        return (
            <DeviceList devices={this.state.devices} />
        )
    }
}
