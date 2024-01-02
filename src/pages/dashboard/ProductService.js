export const ProductService = {
    getProductsData() {
        return [
            {
                regularTime: 'Regular Time',
                mon: '80',
                tue: '80',
                wed: '80',
                thu: '80',
                fri: '80',
                sat: '80',
                sun: '80',
                sum:'9'
            },
            {
                regularTime: 'Double Time',
                mon: '80',
                tue: '80',
                wed: '80',
                thu: '80',
                fri: '80',
                sat: '80',
                sun: '80',
                sum:'9'
            },
            {
                regularTime: 'Total',
                mon: '80',
                tue: '80',
                wed: '80',
                thu: '80',
                fri: '80',
                sat: '80',
                sun: '80',
                sum:'9'
            },
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    }
};
