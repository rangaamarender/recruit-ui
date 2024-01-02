const handleResourceAction = (action, rowData) => {
    if (action === 'view') {
        // action.onViewClick();
        console.log("view");
        
    } else if (action === 'edit') {
        action.onEditClick();
        console.log("edit");

    } else if (action === 'status') {
        // action.handleStatusClick();
        console.log("status");

    } else if (action === 'changeDate') {
        // action.handleChangeDateClick();
        console.log("changeDate");

    } else if (action === 'addDocument') {
        // action.handleAddDocument();
        console.log("addDocument");

    } else if (action === 'addNotes') {
        // action.navigateToNotesTab();
        console.log("addNotes");

    }
};
export default handleResourceAction;
