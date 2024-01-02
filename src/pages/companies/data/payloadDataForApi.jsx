export const payloadDataForApi = (formData) => {
    const {
        name,
        phoneNumber,
        fax,
        tradeName,
        country,
        taxId,
        stateOfInc,
        taxClassification,
        // domain,
    } = formData;

    const addressFields = [
        'state',
        'orgAddrescountry',
        'postalCode',
        'address1',
        'address2',
        'address3',
        'address4',
        'address5',
        'city',
        'postOfficeBox',
        'addressName',
        'addressType',
    ];

    const orgAddressFieldValue = addressFields.some(field => formData[field]);

    const transformedData = {
        name: name || '',
        phoneNumber: phoneNumber || '',
        fax: fax || '',
        taxId: taxId || '',
        tradeName: tradeName || '',
        country: {
            countryCode: country || '',
        },
        stateOfInc: stateOfInc || '',
        taxClassification: {
            taxClassCode: taxClassification || ''
        },

        orgDomains: [{
            domain: formData.domain || '',
        }],

        orgCommunications: [{
            authSignataryFn: formData.authSignataryFn || '',
            authSignataryLn: formData.authSignataryLn || '',
            authSignataryPhone: formData.authSignataryPhone || '',
            authSignataryEmail: formData.authSignataryEmail || '',
        }],

        orgAddresses: orgAddressFieldValue ? [{
            state: formData.state || '',
            country: {
                countryCode: formData.orgAddrescountry || '',
            },
            postalCode: formData.postalCode || '',
            address1: formData.address1 || '',
            address2: formData.address2 || '',
            address3: formData.address3 || '',
            address4: formData.address4 || '',
            address5: formData.address5 || '',
            city: formData.city || '',
            postOfficeBox: formData.postOfficeBox || '',
            addressName: formData.addressName || '',
            orgAddressType: {
                addressType: formData.addressType || '',
            },
        }] : [],
    };
    return transformedData;
};
