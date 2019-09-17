import * as React from 'react';
import * as classnames from 'classnames/bind';
import { SelectField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Field'
import { FormOption } from '@microsoft/azure-iot-ux-fluent-controls/lib/Common';

const cx = classnames.bind(require('./mockDevices.module.scss'));

export function MockDevices() {
    // use hooks (https://reactjs.org/docs/hooks-intro.html) to maintain state:
    
    var json = "details"
    var devices = [{
            Name: "MyNodeDevice",
            Twin: json,
        },  
        {
            Name: "MyTestDevice",
            Twin: "more details",
        } ]
    var renderedOutput = devices.map((device) => 
                <div> 
                    <h2>
                    {device.Name}
                    </h2>
                    {device.Twin}
                    <br/><br/>
                </div>
        )

    return (
        <div className={cx('container')}>
            <h1>Device Twins</h1>
            <br/><br/>
            <h3>
                {renderedOutput}
            </h3>
            
            
            {/* <TextField 
                name='textField'
                value={textValue}
                onChange={changeTextValue}
                label='Text Field'
                tooltip='Description for a text field'
                required
            />
            <CheckboxField 
                name='checkboxField'
                value={checkboxValue}
                onChange={changeCheckboxValue}
                label='Checkbox Field'
            />
            <ToggleField
                name='toggleField'
                value={toggleValue}
                onChange={changeToggleValue}
                label='Toggle Field'
                onLabel='Enabled'
                offLabel='Disabled'
            />
            <RadioField
                name='radioField'
                value={radioValue}
                onChange={changeRadioValue}
                label='Radio Field'
                options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                ]}
            />
            <Select />
            <DateTimeField
                name='dateTimeField'
                initialValue={dateTimeValue}
                onChange={changeDateTimeValue}
                label='Date Time Field'
            /> */}
        </div>
    );
}

function Select() {
    const [selectValue, changeSelectValue] = React.useState('');
    const [selectOptions, changeSelectOptions] = React.useState<FormOption[]>([
        // show a placeholder text initially:
        { value: '', label: 'Loading…', disabled: true, hidden: true }
    ]);

    React.useEffect(() => {
        // load the actual options asynchronously. In practice, we'd probably call fetch()
        // to make an HTTP call and call changeSelectOptions() after the promise resolves.
        const handle = setTimeout(() => {
            changeSelectOptions([
                // Replace the placeholder text now that we've finished loading:
                { value: '', label: 'Select an option', hidden: true, disabled: true },
                
                // actual options:
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
            ]);
        }, 2000);

        // return a function that cleans up after this effect (e.g., if the 
        // component unloads before the options are fetched):
        return () => clearTimeout(handle);
    }, [changeSelectOptions]);

    return (
        <SelectField
            name='selectField'
            value={selectValue}
            onChange={changeSelectValue}
            label='Select Field'
            options={selectOptions}
        />
    );
}