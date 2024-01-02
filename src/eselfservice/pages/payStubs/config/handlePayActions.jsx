const handlePayrollActions = (action, rowData) => {
    switch (action) {
        case 'view':
            // Implement view action logic
            console.log('Viewing:', rowData.companyName);
            break;
        case 'edit':
            // Implement edit action logic
            console.log('Editing:', rowData.companyName);
            break;
        case 'delete':
            // Implement delete action logic
            console.log('Deleting:', rowData.companyName);
            break;
        default:
            break;
    }
};

export default handlePayrollActions;