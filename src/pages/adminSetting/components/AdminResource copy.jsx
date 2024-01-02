import React, { useState, useRef } from 'react';
import AdminResourceDataTable from '../container/AdminResourceDataTable';
import AdminRadioOptionReusable from './AdminRadioOptionReusable';
import { Toast } from 'primereact/toast';

import {
    employeeTypeOptions,
    shiftOptions,
    skillOptions,
    locationOptions,
    employmentOptions,
    workloadOptions,
    licenseOptions,
    unionOptions,
} from '../data/RadioOptionsData';

const AdminResource = () => {
    const toast = useRef(null);

    // inputSwitch State
    const [empType, setEmpType] = useState(false);
    const [shift, setShift] = useState(false);
    const [skill, setSkill] = useState(false);
    const [location, setLocation] = useState(false);
    const [empStatus, setEmpStatus] = useState(false);
    const [workload, setWorkLoad] = useState(false);
    const [license, setLicense] = useState(false);
    const [union, setUnion] = useState(false);

    // RadioButton State
    const [empTypeRadio, setEmpTypeRadio] = useState('');
    const [shiftRadio, setShiftRadio] = useState('');
    const [skillRadio, setSkillRadio] = useState('');
    const [locationRadio, setLocationRadio] = useState('');
    const [empStatusRadio, setEmplStatusRadio] = useState('');
    const [workloadRadio, setWorkLoadRadio] = useState('');
    const [licenseRadio, setLicenseRadio] = useState('');
    const [unionRadio, setUnionRadio] = useState('');
    //edit mode
    const [editMode, setEditMode] = useState(false);

    return (
        <div className="row">
            <div>
                <Toast ref={toast} />
            </div>
            <div>
                <AdminResourceDataTable editMode={editMode} setEditMode={setEditMode} />
            </div>
            <div className="mt-4">
                <h6 className="fw-bold">Optional Onboarding Options for Resources</h6>
            </div>
            <div className="mt-2">
                <AdminRadioOptionReusable
                    title="Employment Type Options"
                    options={employeeTypeOptions}
                    state={empType}
                    setState={setEmpType}
                    showInputSwitch={true}
                    onChange={(e) => setEmpTypeRadio(e.value)}
                    checked={empTypeRadio}
                    disabled={true}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            </div>
            <div className="mt-2">
                <AdminRadioOptionReusable
                    title="Shift Schedule Options"
                    options={shiftOptions}
                    state={shift}
                    setState={setShift}
                    showInputSwitch={true}
                    onChange={(e) => setShiftRadio(e.value)}
                    checked={shiftRadio}
                    disabled={true}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            </div>
            <div className="mt-2">
                <AdminRadioOptionReusable
                    title="Skill Level Options"
                    options={skillOptions}
                    state={skill}
                    setState={setSkill}
                    showInputSwitch={true}
                    onChange={(e) => setSkillRadio(e.value)}
                    checked={skillRadio}
                    disabled={true}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            </div>
            <div className="mt-2">
                <AdminRadioOptionReusable
                    title="Location Options"
                    options={locationOptions}
                    state={location}
                    setState={setLocation}
                    showInputSwitch={true}
                    onChange={(e) => setLocationRadio(e.value)}
                    checked={locationRadio}
                    disabled={true}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            </div>
            <div className="mt-2">
                <AdminRadioOptionReusable
                    title="Employement Status Options"
                    options={employmentOptions}
                    state={empStatus}
                    setState={setEmpStatus}
                    showInputSwitch={true}
                    onChange={(e) => setEmplStatusRadio(e.value)}
                    checked={empStatusRadio}
                    disabled={true}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            </div>
            <div className="mt-2">
                <AdminRadioOptionReusable
                    title="Workload Options"
                    options={workloadOptions}
                    state={workload}
                    setState={setWorkLoad}
                    showInputSwitch={true}
                    onChange={(e) => setWorkLoadRadio(e.value)}
                    checked={workloadRadio}
                    disabled={true}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            </div>
            <div className="mt-2">
                <AdminRadioOptionReusable
                    title="Certification or License Options"
                    options={licenseOptions}
                    state={license}
                    setState={setLicense}
                    showInputSwitch={true}
                    onChange={(e) => setLicenseRadio(e.value)}
                    checked={licenseRadio}
                    disabled={true}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            </div>
            <div className="mt-2">
                <AdminRadioOptionReusable
                    title="Union Membership Options"
                    options={unionOptions}
                    state={union}
                    setState={setUnion}
                    showInputSwitch={true}
                    onChange={(e) => setUnionRadio(e.value)}
                    checked={unionRadio}
                    disabled={true}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            </div>
        </div>
    );
};

export default AdminResource;
