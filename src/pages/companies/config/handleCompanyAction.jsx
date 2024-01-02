const handleCompanyAction = (action, rowData) => {
    switch (action) {
        case 'view':
            // Implement view action logic
            console.log('view:', rowData);
            break;
        case 'edit':
            // Implement edit action logic
            console.log('edit:', rowData);
            break;
        case 'addUser':
            // Implement edit action logic
            console.log('addUser:', rowData);
            break;
        case 'addDocuments':
            // Implement edit action logic
            console.log('addDocuments:', rowData);
            break;
        case 'addNotes':
            // Implement delete action logic
            console.log('addNotes:', rowData);
            break;
        default:
            break;
    }
};
export default handleCompanyAction;
