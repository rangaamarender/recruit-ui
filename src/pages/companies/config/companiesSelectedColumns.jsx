const companiesSelectedColumns = [
    'name',
    'location',
    'concatenatedName', // Include the new field for the concatenated name
    'orgCommunications.0.authSignataryPhone',
    'orgCommunications.0.authSignataryEmail',
    'fax',
    'country.countryName',
    'status.0.effectiveDate',
    'status.0.statusCode'
];

export default companiesSelectedColumns;
