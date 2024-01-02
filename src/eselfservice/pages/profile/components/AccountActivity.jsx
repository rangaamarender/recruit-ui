import React from "react";

function AccountActivity() {

  const dummyData = [
    { id: 1, browser: 'Chrome', ip: '192.168.1.1', time: '2023-11-10 10:00:00', action: 'Login' },
    { id: 2, browser: 'Firefox', ip: '192.168.1.2', time: '2023-11-09 15:30:00', action: 'Login' },
    { id: 3, browser: 'Chrome', ip: '192.168.1.3', time: '2023-11-08 12:00:00', action: 'Login' },
    { id: 4, browser: 'Firefox', ip: '192.168.1.2', time: '2023-11-07 16:30:00', action: 'Login' },
    { id: 5, browser: 'Chrome', ip: '192.168.1.1', time: '2023-11-06 12:00:00', action: 'Login' },
    { id: 6, browser: 'Firefox', ip: '192.168.1.2', time: '2023-11-06 14:30:00', action: 'Login' },
  ];

  // const [loginActivities, setLoginActivities] = useState(dummyData);
const loginActivities = dummyData

  // const handleDeleteRow = (id) => {
  //   // Filter out the row with the specified id
  //   const updatedActivities = loginActivities.filter(activity => activity.id !== id);
  //   setLoginActivities(updatedActivities);
  // };

  return (
    <div className=''  >
      <h4>Login Activity</h4>
      <p>Here is your last 10 login activities log.</p>

      <table className='table'>
        <thead>
          <tr>
            <th>Browser Name</th>
            <th>IP Address</th>
            <th>Time</th>
            {/* <th>Action</th> */}
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {loginActivities.map(activity => (
            <tr key={activity.id}>
              <td>{activity.browser}</td>
              <td>{activity.ip}</td>
              <td>{activity.time}</td>
              {/* <td>{activity.action}</td> */}
              {/* <td>
                <i className="pi pi-times text-danger" onClick={() => handleDeleteRow(activity.id)} />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountActivity;