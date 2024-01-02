const resourceColumnConfig = [
    {
        field: 'workerCode',
        header: 'Resource ID',
        isSelected: true,
        isChecked: false,
        isPermanent: true,
    },
    {
        field: 'personLegal.familyName',
        header: 'Resource Name',
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        field: 'workerType.name',
        header: 'Resource Type',
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    // {
    //     field: 'vendor',
    //     header: 'Type',
    //     isSelected: true,
    //     isChecked: true,
    //     isPermanent: false,
    // },
    {
        field: 'joiningDate',
        header: 'Join Date',
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        header: 'Client',
        field: 'organization',
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        header: 'Status',
        field: 'workerStatus.0.status',
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
];

export default resourceColumnConfig;
