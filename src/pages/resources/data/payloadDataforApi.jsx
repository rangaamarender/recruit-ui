export const payloadDataForApi = (formData) => {
    const {
        givenName,
        middleName,
        familyName,
        preferredName,
        emailId,
        dialNumber,
        joiningDate,
        workerAttributes
    } = formData;

    // Remove all non-numeric characters from dialNumber
    const cleanedDialNumber = dialNumber ? dialNumber.replace(/\D/g, '') : null;

    // Format startDate to "yyyy-mm-dd"
    const formattedStartDate = joiningDate ? new Date(joiningDate).toISOString().split('T')[0] : null;

    const transformedData = {

        joiningDate: formattedStartDate || null,
        workerType: {
            workerTypeCode: formData.resourceType || null,
        },
        organization: {
            organizationID: formData.organizationID || null
        },
        personLegal: {
            givenName: givenName || null,
            middleName: middleName || null,
            familyName: familyName || null,
            preferredName: preferredName || null,
            primaryContactDetails: [
                {
                    emailId: emailId || null,
                    phoneNumber: {
                        dialNumber: cleanedDialNumber || null
                    },
                }
            ]
        },

        department: {
            deptID: formData.deptID || null,
        },
        billable: formData.resourceStatus || null,

        workerAttributes: (workerAttributes || []).map((attribute) => ({
            workerAttributeDef: {
                attrDefId: attribute.attrDefId || null,
            },
            attrValue: attribute.attrListValueID || null
        }))
    };
    
    return transformedData;
};
