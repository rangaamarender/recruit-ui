const handleViewerActionMenu = (event, item, actions) => {
    const { id } = item;
  
    if (id === "addNote") {
      actions.navigateToNotesTab();
    } else if (id === "addTimesheet") {
      actions.navigateToTimeSheetTab();
    } else if (id === "addDocuments") {
      actions.handleAddDocuments();
    } else if (id === "loginAasResource") {
      actions.navigateToNotesTab();
    }
  };
  export default handleViewerActionMenu;
  