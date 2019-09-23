import * as React from 'react';
import * as classnames from 'classnames/bind';
import { TextField, RadioField, CheckboxField, ComboField, SelectField, NumberField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Field';
import { DateField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/DateTime';
import { Component } from 'react';
import { FormOption } from '@microsoft/azure-iot-ux-fluent-controls/lib/Common';
import { Button } from '@microsoft/azure-iot-ux-fluent-controls'

const cx = classnames.bind(require('./iotDevices.module.scss'));

export default function IotDevices() {

    const [textValue, changeTextValue] = React.useState('');
    const [radioValue, changeRadioValue] = React.useState('');
    const [dateValue, changeDateValue] = React.useState('');
    const [phoneValue, changePhoneValue] = React.useState(0);
    const [isShown, changeShown] = React.useState(false);

    function handleClick(event: MouseEvent) {
        //when button shows 'hide twin'
        changeShown(!isShown)
      }
    
    return (
        <div className={cx('container')}>
            <h1 className={cx('header')}>
                IoT Devices
            </h1>
            <div>
                <TextField 
                    name='textField'
                    value={textValue}
                    onChange={changeTextValue}
                    label='Name'
                    tooltip='Please Enter Your Name'
                />
                <DateField
                    name='dateField'
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
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                        { value: 'Other/Prefer Not To Say', label: 'Other/Prefer Not To Say' },
                    ]}
                />
                <Button onClick={handleClick}>
                    {isShown ? "Hide User Data" : "Submit User Data"}
                </Button>
                { isShown ? <div className={cx('card')}>
                    <div className={cx('text')}>
                        Name: {textValue}
                        <br/>
                        Birthdate: {new Date(dateValue).toDateString()}
                        <br/>
                        Gender: {radioValue}
                    </div>
                </div>: <div></div> }
                <br/><br/>

                

                {/* <NumberField 
                    name='phoneNumField'
                    label='Phone Number'
                    placeholder='Please enter your phone number'
                    value={phoneValue}
                    onChange={changePhoneValue}
                /> */}

                <h2>Device Twins</h2>
                <br/>

                <DeviceGetter />
                <br/>

                <Select />

            </div>
        </div>
    )
}

function formatJson(json: string) {
    // let newjson = json.replace(/{/g, "\n{");
    // // return newjson;
    // // return "";

    // newjson.split('\n').map(function(item, key) {
    //     return (
    //       <span key={key}>
    //         {item}
    //         <br/>
    //       </span>
    //     )
    //   });
    return json;
}

function Select() {
    //currently selected item in selector
    const [selectValue, changeSelectValue] = React.useState('');
    //Values to put in dropdown selector
    const [selectOptions, changeSelectOptions] = React.useState<FormOption[]>([
        // show a placeholder text initially:
        { value: '', label: 'Loading…', disabled: true, hidden: true }
    ]);
    //twin data for selected device
    const [deviceValue, changeDeviceValue] = React.useState('');
    //whether or now we should show the twin template
    const [isShown, changeShown] = React.useState(false);
    

    React.useEffect(() => {
        // load the actual options asynchronously. In practice, we'd probably call fetch()
        // to make an HTTP call and call changeSelectOptions() after the promise resolves.
        const handle = setTimeout(() => {
            fetch('http://localhost:5000/deviceList/',
            )
            .then(res => res.json())
            .then((data) => {
                var newSelectOptions = [{value: 'AllDevices', label: "Select Device", disabled: true}]
                newSelectOptions = data.map((deviceName: React.ReactNode) => {
                    // add device names to the dropdown selector   
                    return newSelectOptions = newSelectOptions, {value: deviceName, label: deviceName};
                        
                });
                // newSelectOptions = {value: "AllDevices", label: "Select Device", disabled: true}, newSelectOptions;
                // console.log(newSelectOptions)
                changeSelectOptions(
                    newSelectOptions
                );
                changeSelectValue(newSelectOptions[0].label)
            })
            .catch(console.log)
            
        }, 2000);

        // return a function that cleans up after this effect (e.g., if the 
        // component unloads before the options are fetched):
        return () => clearTimeout(handle);
    }, [changeSelectOptions]);


    function handleClick(event: MouseEvent) {
        //when button shows 'hide twin'
        if (isShown) {
            changeShown(false)
        //when button shows 'show twin data for...', get twin
        } else {
            fetch('http://localhost:5000/deviceTwin/?deviceId=' + selectValue,
                )
                .then(res => res.json())
                .then((data) => {
                    changeDeviceValue(data);
                    changeShown(true);
                })
                .catch(console.log)
        }
      }

    return (
        <div>
            <SelectField
                name='selectField'
                value={selectValue}
                onChange={changeSelectValue}
                label='Select Device on IoT Hub'
                options={selectOptions}
            />
            <Button onClick={handleClick}>
                { isShown ? "Hide Twin" : "See Device Twin for " + (selectValue ? selectValue : "...")}
            </Button>
            
            { isShown ?  
                <div className={cx('card')}>
                    <div className={cx('text')}>
                        <b>Authentication Type: </b>{(deviceValue as unknown as DeviceInfo).authenticationType} <br/>
                        <b>Capabilities: </b>{JSON.stringify((deviceValue as unknown as DeviceInfo).capabilities)} <br/>
                        <b>Cloud To Device Message Count: </b>{(deviceValue as unknown as DeviceInfo).cloudToDeviceMessageCount} <br/>
                        <b>Connection State: </b>{(deviceValue as unknown as DeviceInfo).connectionState} <br/>
                        <b>Device Etag: </b>{(deviceValue as unknown as DeviceInfo).deviceEtag} <br/>
                        <b>Device ID: </b>{(deviceValue as unknown as DeviceInfo).deviceId} <br/>
                        <b>Etag: </b>{(deviceValue as unknown as DeviceInfo).etag} <br/>
                        <b>Last Activity Time: </b>{(deviceValue as unknown as DeviceInfo).lastActivityTime} <br/>
                        <b>Properties: </b>{formatJson(JSON.stringify((deviceValue as unknown as DeviceInfo).properties))} <br/>
                        <b>Status: </b>{(deviceValue as unknown as DeviceInfo).status} <br/>
                        <b>Status Update Time: </b>{(deviceValue as unknown as DeviceInfo).statusUpdateTime} <br/>
                        <b>Tags: </b>{JSON.stringify((deviceValue as unknown as DeviceInfo).tags)} <br/>
                        <b>Version: </b>{(deviceValue as unknown as DeviceInfo).version} <br/>
                    </div>
                </div>
            : <div></div>}
        </div>
    );
}

// format to show all devices and their twins
function DeviceList(props: { devices: any; }) {
    const devices = props.devices;
    const listItems = devices.map((device: React.ReactNode[][]) =>        
        
        <div className={cx('card')}>
            <div className={cx('text')}>
                <h3>{device[0]}</h3>
                <b>Authentication Type: </b>{(device[1] as unknown as DeviceInfo).authenticationType} <br/>
                <b>Capabilities: </b>{JSON.stringify((device[1] as unknown as DeviceInfo).capabilities)} <br/>
                <b>Cloud To Device Message Count: </b>{(device[1] as unknown as DeviceInfo).cloudToDeviceMessageCount} <br/>
                <b>Connection State: </b>{(device[1] as unknown as DeviceInfo).connectionState} <br/>
                <b>Device Etag: </b>{(device[1] as unknown as DeviceInfo).deviceEtag} <br/>
                <b>Device ID: </b>{(device[1] as unknown as DeviceInfo).deviceId} <br/>
                <b>Etag: </b>{(device[1] as unknown as DeviceInfo).etag} <br/>
                <b>Last Activity Time: </b>{(device[1] as unknown as DeviceInfo).lastActivityTime} <br/>
                <b>Properties: </b>{JSON.stringify((device[1] as unknown as DeviceInfo).properties)} <br/>
                <b>Status: </b>{(device[1] as unknown as DeviceInfo).status} <br/>
                <b>Status Update Time: </b>{(device[1] as unknown as DeviceInfo).statusUpdateTime} <br/>
                <b>Tags: </b>{JSON.stringify((device[1] as unknown as DeviceInfo).tags)} <br/>
                <b>Version: </b>{(device[1] as unknown as DeviceInfo).version} <br/>
            </div>
        </div>
    );
      
    return (
      <ul>{listItems}</ul>
    );
  }

//format of device twins
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

//gets all device twins and shows button with that option
function DeviceGetter () {

    const [twinsValue, changeTwinsValue] = React.useState('');
    const [isShown, changeShown] = React.useState(false);

    function handleClick(event: MouseEvent) {
        //for when button shows 'hide all device twins'
        if (isShown) {
            changeShown(false)
        //for when button shows 'show all device twins', make request to get them and show them
        } else {
            fetch('http://localhost:5000/allDeviceTwins/',
                )
                .then(res => res.json())
                .then((data) => {
                    changeTwinsValue(data)
                    changeShown(true);
                })
                .catch(console.log)
        }
      }

    return (
        <div>
            <Button onClick={handleClick}>
                {isShown ? "Hide All Device Twins" : "Show All Device Twins"}
            </Button>
            { isShown ? <DeviceList devices={twinsValue} /> : <div></div>}
        </div>
    )
}
