import React from 'react';
import { Button } from 'primereact/button';
// import { useDispatch } from 'react-redux';
// import { FETCH_PAYMENT_REQUEST, createPaymentRequest } from '../../../redux/actions/paymentAction';
import CustomInputText from '../../../components/controls/CustomInputText';
import { useForm } from 'react-hook-form';
import CustomInputMask from '../../../components/controls/CustomInputMask';
import CustomDropdown from '../../../components/controls/CustomDropdown';
import { createPaymentRequest } from '../../../redux/actions/paymentAction';
import { useDispatch } from 'react-redux';

const AdminPaymentCard = ({ setShowPaymentCard, updateCardNumbers }) => {
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    let required = false;
    // const [cardType, setCardType] = useState('');
    // const subscriptionID = 1;

    // useEffect(() => {
    //     dispatch({ type: FETCH_PAYMENT_REQUEST, payload: subscriptionID });
    // }, [dispatch, subscriptionID]);

    // const paymentData = useSelector((state) => state.payment.payments);
    // console.log(paymentData, 'Check the data');
    // const handleCardNumberChange = (event) => {
    //     const inputCardNumber = event.target.value;
    //     const firstDigit = inputCardNumber[0];
    //     if (firstDigit === '4') {
    //         setCardType('visa');
    //     } else if (firstDigit === '5') {
    //         setCardType('mastercard');
    //     } else if (firstDigit === '6') {
    //         setCardType('Discover	');
    //     } else {
    //         setCardType('');
    //     }
    // };
    const handleSaveClickCopy = (data) => {
        const getCardType = (cardNumber) => {
            const firstDigit = cardNumber[0];
            if (firstDigit === '4') {
                return 'visa';
            } else if (firstDigit === '5') {
                return 'mastercard';
            } else if (firstDigit === '6') {
                return 'Discover';
            } else {
                return '';
            }
        };
        const creditCardType = getCardType(data.cardNumber);

        const setValue = {
            creditCardHolderName: data.CardHolderName,
            creditCardType: creditCardType,
            creditCardNum: data.cardNumber,
            creditCardLastFour: null,
            creditCardExpDate: null,
            creditCardExpMonth: data.expiryDate,
            creditCardExpYear: data.expiryYear,
            creditCardCvv: data.CVV,
            name: data.nickName,
            paymentID: null,
        };
        // const setValue = {
        //     "creditCardHolderName": "Rich",
        //     "creditCardType": "string",
        //     "creditCardNum": "5555555555554444",
        //     "creditCardLastFour": null,
        //     "creditCardExpDate": "string",
        //     "creditCardExpMonth": "07",
        //     "creditCardExpYear": "25",
        //     "creditCardCvv": "124",
        //     "name": "house",
        //     "paymentID": "string"
        // };
        dispatch(createPaymentRequest(setValue))
        setShowPaymentCard(false)
    };


    const handleCancelClick = () => {
        setShowPaymentCard(false);
    };
    const months = [
        { label: '01', value: '01' },
        { label: '02', value: '02' },
        { label: '03', value: '03' },
        { label: '04', value: '04' },
        { label: '05', value: '05' },
        { label: '06', value: '06' },
        { label: '07', value: '07' },
        { label: '08', value: '08' },
        { label: '09', value: '09' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => {
        const year = currentYear + index;
        return { label: year.toString(), value: year.toString().substring(2) };
    });
    return (
        <>
            <div className="card p-3 mt-2">
                <div className="formgrid grid">
                    <div className="col-12 md:col-4">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="CardHolderName"
                            labelId="Cardholder Name"
                            defaultValue=""
                            required={required}
                            placeholder="John Doe"
                            requiredMsg="Cardholder Name Required"
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="nickName"
                            labelId="Card Nick Name"
                            defaultValue=""
                            required={required}
                            placeholder="Nick name"
                            requiredMsg="Nick Name Required"
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <CustomInputMask
                            control={control}
                            errors={errors}
                            name="cardNumber"
                            labelId="Credit Card Number"
                            defaultValue=""
                            mask="9999 9999 9999 9999"
                            required={required}
                            // onChange={handleCardNumberChange}
                            placeholder="1234 1234 1234 1234"
                            requiredMsg="Card Number Required"
                        />
                        {/* <CustomInputText
                            control={control}
                            errors={errors}
                            name="cardNumber"
                            labelId="Credit Card Number"
                            defaultValue=""
                            required={required}
                            placeholder="Number"
                            requiredMsg="Card Number Required"
                        /> */}
                        {/* <span className="">{cardType}</span> */}
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="d-flex gap-5">
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name="expiryDate"
                                labelId="Expiry Month"
                                defaultValue=""
                                options={months}
                                required={required}
                                requiredMsg="Card Expiry Month Required"
                                placeholder="MM"
                            />
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name="expiryYear"
                                labelId="Expiry Year"
                                defaultValue=""
                                options={years}
                                required={required}
                                requiredMsg="Card Expiry Year Required"
                                placeholder="YYYY"
                            />
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="CVV"
                            labelId="CVV"
                            defaultValue=""
                            required={required}
                            placeholder="CVV"
                            requiredMsg="CVV Required"
                        />
                    </div>
                    {/* <div className="col-12 md:col-4">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="address"
                            labelId="Address Line 1"
                            defaultValue=""
                            required={required}
                            placeholder=""
                            requiredMsg="Address Required"
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="address2"
                            labelId="Address Line 2"
                            defaultValue=""
                            required={required}
                            placeholder=""
                            requiredMsg="Address Required"
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="country"
                            labelId="Country"
                            defaultValue=""
                            options={''}
                            required={required}
                            requiredMsg="Country Required"
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="state"
                            labelId="State"
                            defaultValue=""
                            options={''}
                            required={required}
                            requiredMsg="State Required"
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="city"
                            labelId="City"
                            defaultValue=""
                            options={''}
                            required={required}
                            requiredMsg="City Required"
                        />
                    </div>
                    <div className="col-12 md:col-4">
                    <CustomInputText
                            control={control}
                            errors={errors}
                            name="zipCode"
                            labelId="Zip Code"
                            defaultValue=""
                            required={required}
                            placeholder=""
                            requiredMsg="Zip Code Required"
                        />
                    </div> */}
                </div>
                <div className="d-flex justify-content-start align-items-center gap-3 mt-3">
                    <Button size="small" severity="secondary" label="Cancel" onClick={handleCancelClick} />
                    <Button size="small" label="Save" onClick={handleSubmit(handleSaveClickCopy)} />
                </div>
            </div>
        </>
    );
};

export default AdminPaymentCard;
