import * as React from 'react';
import * as classnames from 'classnames/bind';
import { GenericManagementList } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/List';
import { Link, generatePath, Route, Switch } from 'react-router-dom';
import { Paths } from '../../shell/routes';
import { MockDevices } from './mockDevices';
import { TextField, RadioField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Field';
import { DateField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/DateTime';
import { Component } from 'react';

const cx = classnames.bind(require('./iotDevices.module.scss'));

export interface Properties {
}

interface Row {
    id: string;
    name: string;
    location: string;
}

export default function IotDevices() {
    const [rows] = React.useState(() => [
        { id: 'foo', name: 'Foo', location: 'Seattle' },
        { id: 'bar', name: 'Bar', location: 'Redmond' },
    ]);

    const [selected, changeSelected] = React.useState(new Set<string>());
    const [textValue, changeTextValue] = React.useState('');
    const [radioValue, changeRadioValue] = React.useState('');
    const [dateValue, changeDateValue] = React.useState('');

    function isSelected(row: Row) {
        return selected.has(row.id);
    }

    function onSelect(row: Row) {
        const newSelection = new Set<string>(selected);
        if (!newSelection.delete(row.id)) {
            newSelection.add(row.id);
        }

        changeSelected(newSelection);
    }

    function onSelectAll() {
        const newSelected = new Set<string>();
        if (rows.length !== selected.size) {
            for (const row of rows) {
                newSelected.add(row.id);
            }
        }
        
        changeSelected(newSelected);
    }



    /**
     * My Code
     * 
     */

    // var Registry = require('azure-iothub').Registry;
    // // var connectionString = process.env.IOTHUB_CONNECTION_STRING;
    // const deviceId = 'MyNodeDevice';
    // var registry = Registry.fromConnectionString(connectionString);

    // console.log(registry)
    // console.log(deviceId)
    
    // registry.getTwin(deviceId, function(err: { message: any; }, twin: any) {
    //     if (err) {
    //       console.error(err.message);
    //     } else {
    //       console.log(JSON.stringify(twin, null, 2));
    //     }
    // });



    return (
        <div>
            <Switch>
                <Route path={Paths.iotDevices.index} exact component={Root} />
                <Route path={Paths.iotDevices.mockDevices} component={MockDevices} />
            </Switch>

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

function mapNameCol(row: Row) {
    return (
        <Link to={generatePath(Paths.examples.parameterized, { id: row.id })} className='link'>{row.name}</Link>
    )
}

function Root() {
    return (
        <ul>
            <li><Link to={Paths.iotDevices.mockDevices} className='link'>Mock Devices</Link></li>
        </ul>
    );
}

// const Devices = ({ devices }:{[key:string]:any}) => {
//     console.log("devices")
//     console.log(devices)
//     return (
//         <div>
//             {devices.map((device: React.ReactNode) =>
//                 <li>{device}</li>
//             )}
//         </div>
//     )
// }


function NumberList(props: { numbers: any; }) {
    const numbers = props.numbers;
    // const pretty = JSON.parse(JSON.stringify(numbers));
    // console.log(pretty)
    var deviceItems: any = [];
    const listItems = numbers.map((number: React.ReactNode[][]) => 
        // deviceItems = number[1].map(itm => (
        //     <li>{itm}</li>
        //     ))
        
        
        <div>
            <h3>{number[0]}</h3>
            <div>
                <li>Authentication Type: {(number[1] as unknown as DeviceInfo).authenticationType}</li>
                <li>Capabilities: {JSON.stringify((number[1] as unknown as DeviceInfo).capabilities)}</li>
                <li>Cloud To Device Message Count: {(number[1] as unknown as DeviceInfo).cloudToDeviceMessageCount}</li>
                <li>Connection State: {(number[1] as unknown as DeviceInfo).connectionState}</li>
                <li>Device Etag: {(number[1] as unknown as DeviceInfo).deviceEtag}</li>
                <li>Device ID: {(number[1] as unknown as DeviceInfo).deviceId}</li>
                <li>Etag: {(number[1] as unknown as DeviceInfo).etag}</li>
                <li>Last Activity Time: {(number[1] as unknown as DeviceInfo).lastActivityTime}</li>
                <li>Properties: {JSON.stringify((number[1] as unknown as DeviceInfo).properties)}</li>
                <li>Status: {(number[1] as unknown as DeviceInfo).status}</li>
                <li>Status Update Time: {(number[1] as unknown as DeviceInfo).statusUpdateTime}</li>
                <li>Tags: {JSON.stringify((number[1] as unknown as DeviceInfo).tags)}</li>
                <li>Version: {(number[1] as unknown as DeviceInfo).version}</li>
            </div>
        </div>
        
        
        // console.log(number[0])
        
        // deviceItems = number[1];
        // console.log(deviceItems);
        // deviceItems = <li>{number[0]}</li>
        // deviceItems = number[1].map((itm: React.ReactNode[]) => (
        //     <li>{itm[0]}</li>
        // )
        // <li>{itm}</li>
    );
      
    
    // console.log("DEvice items")
    // console.log(deviceItems)
    return (
      <ul>{listItems}</ul>
    );
  }
 

// function Devices(props: any) =  {
//     const devices = props.devices
//     console.log("devices")
//     console.log(devices)
//     return (
//         <div>
//             {devices.map((device: React.ReactNode) =>
//                 <li>{device}</li>
//             )}
//         </div>
//     )
// }

type cap = {
    iotEdge: boolean
}

type DeviceInfo  = {
    authenticationType: string
    capabilities: cap
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
        const dId = "MyNodeDevice"
        fetch('http://localhost:5000/url/?deviceId=' + dId,
            // { headers: {'Access-Control-Allow-Origin' : '*'}}
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
        const numbers = [1,2,3,4,5];
        console.log(numbers)
        console.log(this.state.devices)
        return (
            
            <NumberList numbers={this.state.devices} />
            // <ul><Devices devices={this.state.devices} /></ul>
        )
    }

//     return (
//         <div>
//             Devices
//         </div>
//     );
}
