const addressColumnConfig = [
  {
    header: "Address Type",
    field: "orgAddressType.displayName",
    sortable: true,
    isSelected: true,
    isChecked: false,
    isPermanent: true,
  },
  {
    header: "Label",
    field: "addressName",
    sortable: true,
    isSelected: true,
    isChecked: false,
    isPermanent: true,
  },
  {
    header: "Address1",
    field: "address1",
    sortable: false,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },
  {
    header: "Address2",
    field: "address2",
    sortable: false,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },

  {
    header: "City",
    field: "city",
    sortable: false,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },
  {
    header: "State",
    field: "state",
    sortable: false,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },
  {
    header: "Postal Code",
    field: "postalCode",
    sortable: false,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },
  {
    header: "Country",
    field: "country.countryName",
    sortable: false,
    isSelected: true,
    isChecked: true,
    isPermanent: false,
  },
];

export default addressColumnConfig;
