import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import CustomDropdown from "../../../../../components/controls/CustomDropdown";

export default function AccountManagerInfoStep({ errors }) {
    const [gradeOptions, setGradeOptions] = useState([
        { label: "John", value: "John" },
        { label: "Mike", value: "Mike" },
        { label: "Max", value: "Max" },
        { label: "Kevin", value: "Kevin" }
    ]);
    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option2' },
        { value: 'option3', label: 'option3' },
        { value: 'option4', label: 'option4' },
    ];
    let required = false;
    const { control, handleSubmit } = useForm();
    const { fields, remove, append } = useFieldArray({
        control,
        name: "students"
    });

    const [students, setStudents] = useState([]);
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [showAddButton, setShowAddButton] = useState(true);
    const selectedValuesSet = new Set();

    // const gradeOptions = [
    //   { label: "John", value: "John" },
    //   { label: "Mike", value: "Mike" },
    //   { label: "Max", value: "Max" },
    //   { label: "Kevin", value: "Kevin" }
    // ];

    // const onSubmit = (data) => {
    //   const newStudents = data.students.filter(student => !selectedValuesSet.has(student.grade));
    //   setStudents((prevStudents) => [...prevStudents, ...newStudents]);
    //   newStudents.forEach(student => selectedValuesSet.add(student.grade));
    //   // Reset the fields
    //   fields.forEach((_, index) => remove(index));
    //   // Hide the Submit button after submitting
    //   setShowSubmitButton(false);
    //   // Show the "Add" button after submitting
    //   setShowAddButton(true);
    // };
    const onSubmit = (data) => {
        const newStudents = data.students.filter(student => !selectedValuesSet.has(student.grade));
        setStudents((prevStudents) => [...prevStudents, ...newStudents]);
        newStudents.forEach(student => selectedValuesSet.add(student.grade));
        // Reset the fields
        fields.forEach((_, index) => remove(index));
        // Clear selected values from dropdown options
        setGradeOptions(gradeOptions.filter(option => !selectedValuesSet.has(option.value)));
        // Hide the Submit button after submitting
        setShowSubmitButton(false);
        // Show the "Add" button after submitting
        setShowAddButton(true);
    };

    const DeleteInput = (index) => {
        remove(index);
        // Hide the Submit button when Remove is clicked
        setShowSubmitButton(false);
        // Show the "Add" button when Remove is clicked
        setShowAddButton(true);
    };

    // const handleDelete = (index) => {
    //   const deletedStudent = students[index];
    //   selectedValuesSet.delete(deletedStudent.grade);
    //   // Use filter to remove the selected student
    //   setStudents((prevStudents) =>
    //     prevStudents.filter((_, studentIndex) => studentIndex !== index)
    //   );
    //   // Hide the Submit button when Delete is clicked
    //   setShowSubmitButton(false);
    //   // Show the "Add" button when Delete is clicked
    //   setShowAddButton(true);
    // };
    const handleDelete = (index) => {
        const deletedStudent = students[index];
        selectedValuesSet.delete(deletedStudent.grade);
        // Use filter to remove the selected student
        setStudents((prevStudents) =>
            prevStudents.filter((_, studentIndex) => studentIndex !== index)
        );
        // Hide the Submit button when Delete is clicked
        setShowSubmitButton(false);
        // Show the "Add" button when Delete is clicked
        setShowAddButton(true);
    };

    return (
        <div>
            <div className=" flex-wrap gap-3 p-fluid mb-6">
                <h1 className="fw-bold text-center" >Account Manager Info</h1>
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="selectedMsa"
                    labelId="accountManager.label"
                    defaultValue=""
                    options={options}
                    required={required}
                    requiredMsg="selectedMsa.required"
                    placeholder="Select selectedMsa type"
                    className="md:col-12"
                />
            </div>

            <div className="m-2 flex">
                <span className="fw-bold mr-2 mt-2">RecruiterInfo</span>
                {showAddButton && (
                    <Button
                        outlined
                        size="small"
                        label="Add"
                        type="button"
                        icon="pi pi-plus"
                        severity="secondary"
                        onClick={() => {
                            append({});
                            setShowSubmitButton(true);
                            setShowAddButton(false);
                        }}
                    />
                )}
            </div>

            <div className="mb-6">
                {fields.map(({ id, grade }, index) => (
                    <div key={id} className="d-flex justify-content-start align-items-center g-4">

                        <div className="m-2">
                            <Controller
                                name={`students[${index}].grade`}
                                control={control}
                                defaultValue="John"
                                // defaultValue={grade}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={gradeOptions.filter(option => !selectedValuesSet.has(option.value))}
                                        placeholder="Recruit Info"
                                    />
                                )}
                            />
                        </div>
                        <div className="m-2">
                            <Button type="button" icon="pi pi-times" onClick={() => DeleteInput(index)}>

                            </Button>
                        </div>
                        <div className="m-2">
                            {showSubmitButton && (
                                <Button type="button" icon="pi pi-check" onClick={handleSubmit(onSubmit)}>

                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="m-3 mb-6">
                <DataTable value={students}>
                    <Column field="grade" header="RecruiterName" />
                    <Column
                        body={(rowData) => (
                            <Button onClick={() => handleDelete(students.indexOf(rowData))}
                                icon="pi pi-trash"
                            >
                            </Button>
                        )}
                        header="Action"
                    />
                </DataTable>
            </div>
        </div>
    );
}
