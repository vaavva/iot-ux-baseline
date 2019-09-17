import * as React from 'react';
import * as classnames from 'classnames/bind';
import { GenericManagementList } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/List';
import { Link, generatePath, Route, Switch } from 'react-router-dom';
import { Paths } from '../../shell/routes';
import { MockDevices } from './mockDevices';
import { TextField, RadioField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Field';
import { DateField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/DateTime';

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

    var Registry = require('azure-iothub').Registry;
    var connectionString = process.env.IOTHUB_CONNECTION_STRING;
    const deviceId = 'MyNodeDevice';
    var registry = Registry.fromConnectionString(connectionString);

    console.log(registry)
    console.log(deviceId)
    
    registry.getTwin(deviceId, function(err: { message: any; }, twin: any) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(JSON.stringify(twin, null, 2));
        }
    });

    // registry.list(function (err: any, deviceList: { forEach: (arg0: (device: any) => void) => void; }) {
    //     console.log(deviceList)
    //     if (err) {
    //         console.log("Hit an error: " + err)
    //     } else {
    //         deviceList.forEach(function (device) {
    //         var key = device.authentication ? device.authentication.symmetricKey.primaryKey : '<no primary key>';      
    //         console.log(device.deviceId + ': ' + key);
    //         });
    //     }
        // Create a new device
        // var device = {
        //   deviceId: 'sample-device-' + Date.now()
        // };
        // console.log('\n**creating device \'' + device.deviceId + '\'');
        // registry.create(device, printAndContinue('create', function next() {
      
        //   // Get the newly-created device
        //   console.log('\n**getting device \'' + device.deviceId + '\'');
        //   registry.get(device.deviceId, printAndContinue('get', function next() {
      
        //     // Delete the new device
        //     console.log('\n**deleting device \'' + device.deviceId + '\'');
        //     registry.delete(device.deviceId, printAndContinue('delete'));
        //   }));
        // }));
    //   });
    // registry.getTwin(deviceId, function(err: { message: any; }, twin: { update: (arg0: { tags: { city: string; }; properties: { desired: { telemetryInterval: number; }; }; }, arg1: (err: any, twin: any) => void) => void; }) {
    //     if (err) {
    //         console.error("My Error " + err.message);
    //     } else {
    //         console.log("SUCCESS!!")
    //         console.log(JSON.stringify(twin, null, 2));
            // var twinPatch = {
            // tags: {
            //     city: "Redmond"
            // },
            // properties: {
            //     desired: {
            //     telemetryInterval: 1000
            //     }
            // }
            // };

            // method 1: using the update method directly on the twin
            // twin.update(twinPatch, function(err, twin) {
            // if (err) {
            //     console.error(err.message);
            // } else {
            //     console.log(JSON.stringify(twin, null, 2));
            //     // method 2: using the updateTwin method on the Registry object
            //     registry.updateTwin(twin.deviceId, { properties: { desired: { telemetryInterval: 2000 }}}, twin.etag, function(err, twin) {
            //     if (err) {
            //         console.error(err.message);
            //     } else {
            //         console.log(JSON.stringify(twin, null, 2));
            //     }
            //     });
            // }
            // });
    //     }
        
    // });

    // var iothub = require('azure-iothub')
    // var connectionString = 'HostName=VA-IoT-Sample-Hub.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=CNcwMhKHpBpEKwpWOcZ3/bj7V1pQUsANtDVnf541PFE=';
 
    // var registry = iothub.Registry.fromConnectionString(connectionString);
    // console.log(registry)
    // console.log(registry.list())
    // var regList = registry.list()
    // console.log(regList)

    // Create a new device
    // var device = {
    // deviceId: 'sample-device-' + Date.now()
    // };
    
    // registry.create(device, function(err: { toString: () => string; }, deviceInfo: any, res: { statusCode: string; statusMessage: string; }) {
    //     if (err) console.log(' error: ' + err.toString());
    //     if (res) console.log(' status: ' + res.statusCode + ' ' + res.statusMessage);
    //     if (deviceInfo) console.log(' device info: ' + JSON.stringify(deviceInfo));
    // });
    
    return (
        <div>
            <Switch>
                <Route path={Paths.iotDevices.index} exact component={Root} />
                <Route path={Paths.iotDevices.mockDevices} component={MockDevices} />
            </Switch>
            {/* <h2>Devices</h2>
            <GenericManagementList<Row>
                rows={rows}
                columns={[
                    { label: 'Name', mapColumn: mapNameCol },
                    { label: 'Location', mapColumn: 'location' },
                ]}
                isSelected={isSelected}
                onSelect={onSelect}
                onSelectAll={onSelectAll}
            /> */}

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
