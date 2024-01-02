import { Card } from 'primereact/card'
import React, { useState } from 'react'
import ProfileInfo from './ProfileInfo'
import ContactDetails from './ContactDetails'
import Address from './Address'

function PersonalInformation() {
    const [active, setActive] = useState("all")

    return (
        <div className=''>
            
            <Card className=''>
            <h4>Personal Information</h4>
                {(active === 'all' || active === 'editProfileDetails') &&
                    <ProfileInfo setActive={setActive} active={active} />}
                {(active === 'all' || active === 'editContactDetails') &&
                    <ContactDetails setActive={setActive} active={active} />}
                {(active === 'all' || active === 'editAddress') &&
                    <Address setActive={setActive} active={active} />}

            </Card>
        </div>
    )
}

export default PersonalInformation