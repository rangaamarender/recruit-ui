const handleAddressAction = (action, rowData) => {
    switch (action) {

        case 'edit':
            // Implement edit action logic
            console.log('edit:', rowData);
            break;
        case 'delete':
            // Implement delete action logic
            console.log('delete:', rowData);
            break;
        default:
            break;
    }
};
export default handleAddressAction;
