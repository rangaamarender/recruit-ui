const handlePayrollSummaryAction = (action, rowData, setSidebarVisible) => {
    switch (action) {
        case 'view':
            // Implement view action logic
            setSidebarVisible(true);
            console.log('Viewing:', rowData.name);
            break;
        case 'export':
            // Implement edit action logic
            console.log('Export:', rowData.name);
            break;
        default:
            break;
    }
};

export default handlePayrollSummaryAction;
