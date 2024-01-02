import { Button } from "primereact/button";

export const confirmAction = (action, handleClick, visible, setVisible, toastBC, clear) => {
    if (!visible) {
        setVisible(true);
        toastBC.current.clear();
        toastBC.current.show({
            severity: 'info',
            summary: `Are you sure to ${action.toLowerCase()} this user?`,
            sticky: true,
            content: (props) => (
                <div className="flex flex-column align-items-left" style={{ flex: '1' }}>
                    <div className="font-medium text-lg my-3 text-900">{props.message.summary}</div>
                    <div className="flex  justify-content-end align-items-center gap-2">
                        <Button className="p-button-sm" label={action} onClick={handleClick} />
                        <Button className="p-button-sm" label="Cancel" severity="secondary" onClick={clear} />
                    </div>
                </div>
            ),
        });
    }
};
