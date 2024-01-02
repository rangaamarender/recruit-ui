import React from 'react';
import { useForm } from 'react-hook-form';
import CustomInputColor from '../../../components/controls/CustomInputColor';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { useDispatch } from 'react-redux';
import { TenantColorRequest } from '../../../redux/actions/headerTitleActions';

const AdminColor = () => {
    const dispatch = useDispatch();
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const handleColor = (data1) => {
        const data = {
            name: 'COMPANYCOLOR',
            value: data1.color,
            type: 'STRING'
        };
        dispatch(TenantColorRequest({ data }));
        document.documentElement.style.setProperty('--primary-color', data1.color);
    };
    return (
        <div>
            <div className="fw-bold">Choose Company Color Theme</div>
            <div className="mt-2">
                <Accordion>
                    <AccordionTab header="Company Color" collapseIcon={false}>
                        <CustomInputColor
                            inline
                            format="hex"
                            name="color"
                            control={control}
                            defaultValue="#ff6600"
                            errors={errors}
                            onClick={handleSubmit(handleColor)}
                        />
                    </AccordionTab>
                </Accordion>
            </div>
        </div>
    );
};

export default AdminColor;
