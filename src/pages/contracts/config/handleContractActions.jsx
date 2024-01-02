const handleContractActions = (action, rowData) => {
    switch (action) {
        case 'view':
            // Implement view action logic
            console.log('Viewing:', );
            break;
        case 'edit':
            // Implement edit action logic
            console.log('Editing:');
            break;
        case 'delete':
            // Implement delete action logic
            // console.log('Deleting:', rowData.companyName);
            break;
        default:
            break;
    }
};

export default handleContractActions;