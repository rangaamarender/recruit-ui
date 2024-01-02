import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import { ListBox } from 'primereact/listbox';
import React, { useState } from 'react';

const TransactionCard = () => {
    const [transactions, setTransactions] = useState(null);

    const transactionsCard = [
        {
            label: 'Recent Transactions',

            items: [
                { label: 'Salary Payment', value: '12/06/2024' },
                { label: 'Salary Payment', value: '12/06/2024' },
            ],
        },
        {
            label: 'Yesterday',

            items: [
                { label: 'Salary Payment', value: '12/06/2024' },
                { label: 'Salary Payment', value: '12/06/2024' },
                { label: 'Salary Payment', value: '12/06/2024' },
            ],
        },
    ];

    const transactionCardTemplate = (option) => {
        return (
            <>
                <div className="flex gap-2 justify-content-start align-items-center ">
                    <div>
                        <Avatar
                            icon="pi pi-user"
                            size="normal"
                            style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
                        />
                    </div>
                    <div>
                        <div>{option.label}</div>
                        <div>{option.value}</div>
                    </div>
                </div>
                <Divider />
            </>
        );
    };
    return (
        <>
            <ListBox
                value={transactions}
                onChange={(e) => setTransactions(e.value)}
                options={transactionsCard}
                optionLabel="heading"
                itemTemplate={transactionCardTemplate}
                optionGroupLabel="label"
                optionGroupChildren="items"
            />
        </>
    );
};

export default TransactionCard;
