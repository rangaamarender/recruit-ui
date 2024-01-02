// import React, { useState, useEffect  } from 'react';
// import { InputMask } from 'primereact/inputmask';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { useDispatch, useSelector } from 'react-redux';
// import { FETCH_PAYMENT_REQUEST } from '../../../redux/actions/paymentAction';

// const AdminPaymentCard = ({ setShowPaymentCard, updateCardNumbers }) => {
//     const [cardholderName, setCardholderName] = useState('');
//     const [cardNumber, setCardNumber] = useState('');
//     const [expiryDate, setExpiryDate] = useState('');
//     const [cvv, setCvv] = useState('');
//     const [cardType, setCardType] = useState('');
//     const dispatch = useDispatch();
//     const subscriptionID = 1;

//     useEffect(() => {
//         dispatch({ type: FETCH_PAYMENT_REQUEST, payload: subscriptionID });
//     }, [dispatch, subscriptionID]);

//     const paymentData = useSelector((state) => state.payment.payments);
//     console.log(paymentData,"Check the data")

//     const handleCardNumberChange = (event) => {
//         const inputCardNumber = event.target.value;
//         setCardNumber(inputCardNumber);
//         const firstDigit = inputCardNumber[0];
//         if (firstDigit === '4') {
//             setCardType('visa');
//         } else if (firstDigit === '5') {
//             setCardType('mastercard');
//         } else {
//             setCardType('');
//         }
//     };

//     const handleSaveClick = () => {
//         if (cardholderName && cardNumber && expiryDate && cvv) {
//             const newCard = {
//                 label: `**** **** **** ${cardNumber.slice(-4)}`,
//                 value: cardNumber,
//             };
//             updateCardNumbers(newCard);
//             setShowPaymentCard(false);
//         } else {
//             console.error('Please fill out all card details.');
//         }
//     };

//     const handleCancelClick = () => {
//         setShowPaymentCard(false);
//     };

//     return (
//         <>
//             <div className="card p-3 mt-2">
//                 <div className="d-flex gap-5">
//                     <div className="">
//                         <label className="form-label">Cardholder Name</label>
//                         <div>
//                             <InputText
//                                 type="text"
//                                 value={cardholderName}
//                                 onChange={(e) => setCardholderName(e.target.value)}
//                                 placeholder="John Doe"
//                                 className="form-control"
//                             />
//                         </div>
//                     </div>
//                     <div className="">
//                         <label className="form-label">Card Number</label>
//                         <div>
//                             <InputMask
//                                 mask="9999 9999 9999 9999"
//                                 value={cardNumber}
//                                 onChange={handleCardNumberChange}
//                                 placeholder="1234 5678 9012 3456"
//                                 className="form-control"
//                             />
//                         </div>
//                         <span className="ml-2">{cardType}</span>
//                     </div>
//                 </div>
//                 <div className="d-flex gap-5">
//                     <div className="">
//                         <label className="form-label">Expiry Date</label>
//                         <div>
//                             <InputMask
//                                 mask="99/99"
//                                 value={expiryDate}
//                                 onChange={(e) => setExpiryDate(e.value)}
//                                 placeholder="MM/YY"
//                                 className="form-control"
//                             />
//                         </div>
//                     </div>
//                     <div className="">
//                         <label className="form-label">CVV</label>
//                         <div>
//                             <InputMask
//                                 mask="999"
//                                 value={cvv}
//                                 onChange={(e) => setCvv(e.value)}
//                                 placeholder="123"
//                                 className="form-control"
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="d-flex justify-content-start align-items-center gap-3 mt-3">
//                     <Button size="small" severity="secondary" label="Cancel" onClick={handleCancelClick} />
//                     <Button size="small" label="Save" onClick={handleSaveClick} />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AdminPaymentCard;

import React, { useState } from 'react';
// import { InputMask } from 'primereact/inputmask';
// import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_PAYMENT_REQUEST, createPaymentRequest } from '../../../redux/actions/paymentAction';
import CustomInputText from '../../../components/controls/CustomInputText';
import { useForm } from 'react-hook-form';
import CustomInputMask from '../../../components/controls/CustomInputMask';
import axios from 'axios';

const AdminPaymentCard = ({ setShowPaymentCard, updateCardNumbers }) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    let required = false;
    const [cardType, setCardType] = useState('');
    const dispatch = useDispatch();
    // const subscriptionID = 1;

    // useEffect(() => {
    //     dispatch({ type: FETCH_PAYMENT_REQUEST, payload: subscriptionID });
    // }, [dispatch, subscriptionID]);

    // const paymentData = useSelector((state) => state.payment.payments);
    // console.log(paymentData, 'Check the data');
    // const aplaNumber = paymentData.map((item)=>{
    //     return item.last4Digits
    // })
    // console.log(aplaNumber, "Check credit card Number")

    // const handleCardNumberChange = (event) => {
    //     const inputCardNumber = event.target.value;
    //     setCardNumber(inputCardNumber);
    //     const firstDigit = inputCardNumber[0];
    //     if (firstDigit === '4') {
    //         setCardType('visa');
    //     } else if (firstDigit === '5') {
    //         setCardType('mastercard');
    //     } else {
    //         setCardType('');
    //     }
    // };
    // const handleSaveClickCopy = (data) => {
    //     const setValue = {
    //         creditCardHolderName: data.CardHolderName,
    //         creditCardType: 'visa',
    //         creditCardNum: data.cardNumber,
    //         creditCardLastFour: '4444',
    //         creditCardExpDate: '23',
    //         creditCardExpMonth: '06',
    //         creditCardExpYear: '24',
    //         creditCardCvv: data.CVV,
    //         name: data.nickName,
    //         paymentID: 'string',
    //     };
    //     axios.post('http://20.42.92.222/submgt/paymentMethod/1', data)
    // };
    const handleSaveClickCopy = (data) => {
        const setValue = {
            creditCardHolderName: data.CardHolderName,
            creditCardType: 'mastercard',
            creditCardNum: data.cardNumber,
            creditCardLastFour: null,
            creditCardExpDate: data.expiryDate,
            creditCardExpMonth: '06',
            creditCardExpYear: '24',
            creditCardCvv: data.CVV,
            name: data.nickName,
            paymentID: null,
        };

        axios
            .post('http://20.42.92.222/submgt/paymentMethod/1', setValue)
            .then((response) => {
                console.log(response, 'Response after POST request');
                // Handle success if needed
            })
            .catch((error) => {
                console.error(error, 'Error in POST request');
                // Handle error if needed
            });
    };

    const handleSaveClick = (data) => {
        console.log(data, 'dataApi');
        // setValue('CardHolderName', data.CardHolderName);
        // setValue('cardNumber', data.cardNumber);
        // setValue('expiryDate', data.expiryDate);
        // setValue('CVV', data.CVV);
        // setValue('nickName', data.nickName)
        const setValue = {
            creditCardHolderName: data.CardHolderName,
            creditCardType: 'visa',
            creditCardNum: data.cardNumber,
            creditCardLastFour: '5858',
            creditCardExpDate: '23',
            creditCardExpMonth: '06',
            creditCardExpYear: '24',
            creditCardCvv: data.CVV,
            name: data.nickName,
            paymentID: 'string',
        };
        dispatch(createPaymentRequest(setValue));
        const newCard = {
            label: `**** **** **** ${data.cardNumber.slice(-4)}`,
            value: data.cardNumber,
        };
        updateCardNumbers(newCard);
        setShowPaymentCard(false);
    };

    const handleCancelClick = () => {
        setShowPaymentCard(false);
    };

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
                            placeholder="1234 1234 1234 1234"
                            requiredMsg="Card Number Required"
                        />
                        <span className="ml-2">{cardType}</span>
                    </div>

                    <div className="col-12 md:col-4">
                        <CustomInputMask
                            control={control}
                            errors={errors}
                            name="expiryDate"
                            labelId="Expiry Date"
                            defaultValue=""
                            mask="99/99"
                            required={required}
                            placeholder="MM/YY"
                            requiredMsg="Card Expiry Date Required"
                        />
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


