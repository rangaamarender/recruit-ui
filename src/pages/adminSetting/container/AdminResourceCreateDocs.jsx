
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


const AdminResourceCreateDocs = ({ hidedoc, handleCreateNewDocbtn, editDocRow, docMode, setResourceDocument, resourceDocument }) => {
  const [addDoc, setAddDoc] = useState({
    doctype: editDocRow ? editDocRow.doctype : '',
    checkbox1: editDocRow ? editDocRow.checkbox1 : false,
    checkbox2: editDocRow ? editDocRow.checkbox2 : false,
    checkbox3: editDocRow ? editDocRow.checkbox3 : false,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleUpdateClick = () => {
    if (!addDoc.doctype.trim()) {
      setValidationErrors({ doctype: 'Document Name is required' });
    } else {
      const newDocValue = {
        ...addDoc,
      };

      const inputValue = newDocValue.doctype.trim().toLowerCase();
      const isDuplicate = resourceDocument.some(
        row =>
          row !== editDocRow &&
          row.doctype.trim().toLowerCase().replace(/\s+/g, '') === inputValue.replace(/\s+/g, '')
      );

      if (isDuplicate) {
        setValidationErrors({ doctype: 'Duplicate document name' });
      } else {
        setValidationErrors({});

        if (docMode === 'edt') {
          const updatedDocs = resourceDocument.map(row =>
            row === editDocRow ? newDocValue : row
          );
          setResourceDocument(updatedDocs);
        } else if (docMode === 'crt') {
          handleCreateNewDocbtn(newDocValue);
        }

        hidedoc(false);
      }
    }
  };
  
  const handleCheckboxChange = (checkboxName) => {
    setAddDoc((prevDoc) => ({
      ...prevDoc,
      [checkboxName]: !prevDoc[checkboxName],
    }));
  };

  return (
    <>
      <div className='border 2px solid black bg-white'>
        <div className="p-inputgroup p-2">
          <InputText
            id="doctype"
            value={addDoc.doctype}
            onChange={(e) => {
              setAddDoc({ ...addDoc, doctype: e.target.value });
            }}
            className="w-full md:w-14rem company-layout-bg"
            placeholder="Document Name"
          />
          <Button
            className="company-primary-btn"
            icon="pi pi-check"
            onClick={handleUpdateClick}
          />
          <Button
            className="company-secondary-btn"
            icon="pi pi-times"
            onClick={() => {
              hidedoc(false);
              setValidationErrors({});
            }}
          />
        </div>

        <div className='d-flex justify-content-between col-5 p-2'>
          <div>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                checked={addDoc.checkbox1}
                onChange={() => handleCheckboxChange('checkbox1')}
                className="cursor-pointer"
              />
              Number
            </label>
          </div>
          <div>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                checked={addDoc.checkbox2}
                onChange={() => handleCheckboxChange('checkbox2')}
                className="cursor-pointer"
              />
              Issue Date
            </label>
          </div>
          <div>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                checked={addDoc.checkbox3}
                onChange={() => handleCheckboxChange('checkbox3')}
                className="cursor-pointer"
              />
              Expiry Date
            </label>
          </div>
        </div>
      </div>

      {validationErrors.doctype && (
        <div className="">{validationErrors.doctype}</div>
      )}
    </>
  );
};

export default AdminResourceCreateDocs;
