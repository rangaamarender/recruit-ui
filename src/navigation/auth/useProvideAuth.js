import React from 'react';
import { user } from '../../proptypes/types';
export function useProvideAuth() {
    const [user,setUser] = useState(null);
     
    return {
        user
    }
};

 