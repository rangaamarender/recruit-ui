export const payloadDataForApi = (formData, orgDomains) => {
    const {
        name,
        phoneNumber,
        fax,
        description,
        dba,
        country,
        taxId,
        code,
        statusCode,
        stateOfIncorporation,
        taxClassification,
        createdDt,
    } = formData;

    // Construct the transformed data object
    const transformedData = {
        name: name || '',
        phoneNumber: phoneNumber || '',
        fax: fax || '',
        description: description || 'description',
        taxId: taxId || '',
        code: code || '200',
        statusCode: statusCode || '100',
        dba: dba || '',
        country: country || '',
        stateOfIncorporation: stateOfIncorporation || '',
        taxClassification: taxClassification || '',
        createdDt: createdDt || '2023-06-01',

        orgDomains: orgDomains.map(url => ({ "domain": url })) || '',

        orgCommunications: [{
            authSignataryFn: formData.authSignataryFn || '',
            authSignataryLn: formData.authSignataryLn || '',
            authSignataryPhone: formData.authSignataryPhone || '',
            authSignataryEmail: formData.authSignataryEmail || '',
            startDate: "2023-06-01"
        }],
        // organizationDocuments: organizationDocuments.map((documentObj) => ({
        //     expirationDate: documentObj.expirationDate || '',
        //     documentType: documentObj.documentType || '',
        //     issuedDt: documentObj.issuedDt || '',
        //     docNumber: documentObj.docNumber || '',
        //     documentName: documentObj.documentName || '',
        //     url: documentObj.url || '',
        //     fileExt: documentObj.fileExt || '',
        //     fileType: documentObj.fileType || '',
        // })),
    };

    return transformedData;
};