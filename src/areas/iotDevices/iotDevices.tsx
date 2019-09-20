import * as React from 'react';
import * as classnames from 'classnames/bind';
import { TextField, RadioField, CheckboxField, ComboField, SelectField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Field';
import { DateField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/DateTime';
import { Component } from 'react';
import { FormOption } from '@microsoft/azure-iot-ux-fluent-controls/lib/Common';
import { Button } from '@microsoft/azure-iot-ux-fluent-controls'

const cx = classnames.bind(require('./iotDevices.module.scss'));

export default function IotDevices() {

    const [textValue, changeTextValue] = React.useState('');
    const [radioValue, changeRadioValue] = React.useState('');
    const [dateValue, changeDateValue] = React.useState('');

    return (
        <div>

            {/* <DeviceChooser /> */}
            <Select />

            {/* <Switch>
                <Route path={Paths.iotDevices.index} exact component={Root} />
                <Route path={Paths.iotDevices.mockDevices} component={MockDevices} />
            </Switch> */}

            {/* <DeviceGetter /> */}
            

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

function DeviceCheckboxes(props: { deviceNames: any; }) {
    const deviceNames = props.deviceNames;
//     const initialState = {
//         field : [false, false, false],
//     }
//     let counter = 0
//     const checkBoxes = deviceNames.map((deviceName: React.ReactNode) => {
//         const nameField = 'checkbox_field_' + deviceName;
//         // initialState.field[counter] = false;
        
//         <div>
//             <ComboField
//                 name={nameField}
//                 value={checkValue[counter]}
//                 label={nameField}
//                 onChange={changeCheckValue}
//                 // name={nameField}
//                 // value={initialState.field[counter]}
//                 // label={nameField}
//                 // onChange={(newValue) => setState({field: newValue})}

//             />
//             {deviceName}
//         </div>
//         counter++;
//     }
// );

    const [nameValue, changeNameValue] = React.useState();

    
    return (
    <div>
            <div style={{marginBottom: '20px'}}>
                Current value:  {
                    typeof(nameValue) === 'string' ? `'${nameValue}'`
                        : <pre>{JSON.stringify(nameValue, null, 2)}</pre>
                }
            </div>
        <ComboField
            name='devicesNames'
            label='Devices'
            value={nameValue}
            onChange={changeNameValue}
            options={deviceNames.push("All Devices")}
            placeholder='Choose a device to View'
        />
    </div>
    );

}

function Select() {
    const [selectValue, changeSelectValue] = React.useState('');
    const [selectOptions, changeSelectOptions] = React.useState<FormOption[]>([
        // show a placeholder text initially:
        { value: '', label: 'Loading…', disabled: true, hidden: true }
    ]);
    const [deviceValue, changeDeviceValue] = React.useState('');
    const [isShown, changeShown] = React.useState(false);
    

    React.useEffect(() => {
        // load the actual options asynchronously. In practice, we'd probably call fetch()
        // to make an HTTP call and call changeSelectOptions() after the promise resolves.
        const handle = setTimeout(() => {
            fetch('http://localhost:5000/deviceList/',
            )
            .then(res => res.json())
            .then((data) => {
                console.log("Device Names")
                console.log(data)
                var newSelectOptions = [{value: 'AllDevices', label: "All Devices"}]
                newSelectOptions = data.map((deviceName: React.ReactNode) => {
                        return newSelectOptions = newSelectOptions, {value: deviceName, label: deviceName};
                        
                });
                console.log(newSelectOptions)
                // newSelectOptions = [{value: 'AllDevices', label: "All Devices"}, {value: 'device2', label: "Device 2"}]
                changeSelectOptions(
                    newSelectOptions
                    // // Replace the placeholder text now that we've finished loading:
                    // { value: '', label: 'Select an option', hidden: true, disabled: true },
                    
                    // // actual options:
                    // { value: 'option1', label: 'Option 1' },
                    // { value: 'option2', label: 'Option 2' },
                );
            })
            .catch(console.log)
            
        }, 2000);

        // return a function that cleans up after this effect (e.g., if the 
        // component unloads before the options are fetched):
        return () => clearTimeout(handle);
    }, [changeSelectOptions]);


    function handleClick(event: MouseEvent) {
        console.log("Clicked!")
        fetch('http://localhost:5000/deviceTwin/?deviceId=' + selectValue,
            )
            .then(res => res.json())
            .then((data) => {
                console.log("Device Names")
                console.log(data)
                // changeDeviceValue(data)
                // console.log(deviceValue)
                // this.setState({deviceNames: data})
                changeDeviceValue(data);
                changeShown(true);
            })
            .catch(console.log)
        console.log(isShown)
      }

    return (
        <div>
            <SelectField
                name='selectField'
                value={selectValue}
                onChange={changeSelectValue}
                label='Select Field'
                options={selectOptions}
            />
            {/* <Button
                primary
                onClick={DisplayTwins}
                attr={{container: {'data-test-hook': 'button1'}}}
            >
                Click to Show Device Twins
            </Button> */}
            {/* < TwinButton deviceId={selectValue}/> */}
            <Button onClick={handleClick}>
                See Device Twin for {selectValue}
            </Button>
            <div >
                <li>Should I be here? {isShown as boolean}</li>
                <li>Authentication Type: {(deviceValue as unknown as DeviceInfo).authenticationType}</li>
                <li>Capabilities: {JSON.stringify((deviceValue as unknown as DeviceInfo).capabilities)}</li>
                <li>Cloud To Device Message Count: {(deviceValue as unknown as DeviceInfo).cloudToDeviceMessageCount}</li>
                <li>Connection State: {(deviceValue as unknown as DeviceInfo).connectionState}</li>
                <li>Device Etag: {(deviceValue as unknown as DeviceInfo).deviceEtag}</li>
                <li>Device ID: {(deviceValue as unknown as DeviceInfo).deviceId}</li>
                <li>Etag: {(deviceValue as unknown as DeviceInfo).etag}</li>
                <li>Last Activity Time: {(deviceValue as unknown as DeviceInfo).lastActivityTime}</li>
                <li>Properties: {JSON.stringify((deviceValue as unknown as DeviceInfo).properties)}</li>
                <li>Status: {(deviceValue as unknown as DeviceInfo).status}</li>
                <li>Status Update Time: {(deviceValue as unknown as DeviceInfo).statusUpdateTime}</li>
                <li>Tags: {JSON.stringify((deviceValue as unknown as DeviceInfo).tags)}</li>
                <li>Version: {(deviceValue as unknown as DeviceInfo).version}</li>
            </div>

        </div>
    );
}

// class TwinButton extends Component {
//     constructor(props: Readonly<{}>) {
//         super(props);
//         const deviceId = props.deviceId;
//         this.state = {
//             isClicked: false,
//         }
//     }
//     handleClick(event: MouseEvent) {
//         // event.preventDefault();
//         // alert(event.currentTarget.tagName); // alerts BUTTON
//         this.setState(state => ({ isClicked: !this.state.isClicked}));
//         console.log("Clicked!")
//         // console.log(this.props.deviceId)
//       }
      
//     render() {
//         return ( 
//         <Button onClick={this.handleClick}>
//             See Device Twin for {/* {this.props.deviceId} */}
//         </Button>
//         )
//     }
// }


class DeviceChooser extends Component {
    state = {
        deviceNames: []
    }

    componentDidMount() {
        console.log("fetching")
        fetch('http://localhost:5000/deviceList/',
            )
            .then(res => res.json())
            .then((data) => {
                console.log("Device Names")
                console.log(data)
                this.setState({deviceNames: data})
            })
            .catch(console.log)
    }

    render() {
        return (
            <DeviceCheckboxes deviceNames={this.state.deviceNames} />
        )
    }
}


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
        fetch('http://localhost:5000/allDeviceTwins/',
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
