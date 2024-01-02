import React, { useEffect, useState } from 'react';
import UsersList from './UsersList';
import UserDetails from './UserDetails';
import axios from 'axios';

const AllAddressListTab = () => {
    const ADDRESSBOOK_USER_API = 'https://dummyjson.com/users?limit=20';
    const [allUsers, setAllUsers] = useState([]);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [loadingUsers, setLoadingUsers] = useState(true);

    // useEffect(() => {
    //     dispatch(fetchAddressBookRequest());
    // }, [dispatch]);
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    // if (addressBooks && addressBooks.length <= 0) {
    //     return <div>Error</div>;
    // }

    const addressBookUserData = async () => {
        try {
            const response = await axios.get(ADDRESSBOOK_USER_API);
            setAllUsers(response.data.users);
            setLoadingUsers(false);
        } catch (error) {
            console.log(error.massage);
        }
    };
    useEffect(() => {
        addressBookUserData();
    }, []);
    return (
        <>
            <div className="grid">
                <div className=" col-md-4 p-2">
                    <UsersList
                        allUsers={allUsers}
                        setAllUsers={setAllUsers}
                        selectedCardId={selectedCardId}
                        setSelectedCardId={setSelectedCardId}
                        loadingUsers={loadingUsers}
                    />
                </div>
                <div className="  col-md-8  m-0 ">
                    <UserDetails allUsers={allUsers} selectedCardId={selectedCardId} />
                </div>
            </div>
        </>
    );
};

export default AllAddressListTab;
