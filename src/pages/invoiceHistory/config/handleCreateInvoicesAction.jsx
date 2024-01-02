const handleCreateInvoicesAction = (action, rowData) => {
    switch (action) {
        case 'view':
            // Implement view action logic
            console.log('Viewing:', rowData.name);
            break;
        case 'edit':
            // Implement edit action logic
            console.log('Editing:', rowData.companyName);
            break;
        default:
            break;
    }
};
export default handleCreateInvoicesAction;
