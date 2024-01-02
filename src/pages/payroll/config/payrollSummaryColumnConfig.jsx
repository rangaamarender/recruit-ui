const payrollSummaryColumnConfig = [
    {
        field: 'payDate',
        header: 'Pay date',
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        field: 'payRoll',
        header: 'Pay Period',
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        field: 'payrollType',
        header: 'Payroll Type',
        isSelected: true,
        isChecked: false,
        isPermanent: true,
    },
    {
        field: 'pay',
        header: 'Pay',
        isSelected: true,
        isChecked: false,
        isPermanent: true,
    },
    {
        field: 'taxes',
        header: 'Taxes',
        isSelected: true,
        isChecked: false,
        isPermanent: true,
    },
    {
        field: 'additionalEarning',
        header: 'Additional Earning',
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
        field: 'deduction',
        header: 'Deduction',
        isSelected: true,
        isChecked: true,
        isPermanent: false,
    },
    {
      field: 'netPay',
      header: 'Net Pay',
      isSelected: true,
      isChecked: true,
      isPermanent: false,
  },
];

export default payrollSummaryColumnConfig;
