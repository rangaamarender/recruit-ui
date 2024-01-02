// createInvoiceActions.jsx
export const HANDLE_ACTION = "HANDLE_ACTION"

export const handleActions = (index) => ({
    type: HANDLE_ACTION,
    payload: index,
});

