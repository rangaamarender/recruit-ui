// import React from 'react';
// import { Timeline } from 'primereact/timeline';
        
// export default function ContractResources(){
//   const events = [
//     { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
//     { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
//     { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
//     { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
// ];
// return(

// <>
// <div className="card flex flex-wrap gap-6">
// <Timeline value={events} content={(item) => item.status} className="w-full md:w-20rem" />
// </div>
//                   </>
//                 )
// }

// import React from 'react'; 
// import { Timeline } from 'primereact/timeline';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';


// export default function ContractResources() {
//         const events = [
//         { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
//         { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
//         { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
//         { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
//     ];

//     const customizedMarker = (item) => {
//         return (
//             <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: item.color }}>
//                 <i className={item.icon}></i>
//             </span>
//         );
//     };

//     const customizedContent = (item) => {
//         return (
//           <div className="m-3">
//             <Card title={item.status} subTitle={item.date}>
//                 { item.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`} alt={item.name} width={200} className="shadow-1" />}
//                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
//                     quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
//                 <Button label="Read more" className="p-button-text"></Button>
//             </Card>
//             </div>
//         );
//     };
        
//     return (
//         <div className="card">
//             <Timeline value={events} 
//              className="customized-timeline"
//               marker={customizedMarker} 
//               content={customizedContent} />
//         </div>
//     )
// }

// import React from 'react'; 
// import { Timeline } from 'primereact/timeline';

// export default function AlignmentDemo() {
//     const events = [
//         { status: ' Consideration', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
//         { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
//         { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
//         { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
//     ];
        
//     return (
//         <div className="card gap-6">
//             <Timeline value={events} content={(item) => (item.status && item.date)} className="w-full md:w-20rem" />
//             {/* <Timeline value={events} align="right" content={(item) => item.status} className="w-full md:w-20rem" /> */}
//             {/* <Timeline value={events} align="alternate" content={(item) => item.status} className="w-full md:w-20rem" /> */}
//         </div>
//     )
// }

// import React from 'react';
// import { Timeline } from 'primereact/timeline';

// export default function AlignmentDemo() {
//   const events = [
//     {
//       status: 'Consideration',
//       name:'John',
//       date: '18/08/2020',
//       icon: 'pi pi-shopping-cart',
//       color: '#607D8B',
//       image: 'game-controller.jpg'
//     },
//     {
//       status: 'New Note',
//       name:'Mike',
//       date: '15/10/2020',
//       icon: 'pi pi-cog',
//       color: '#607D8B'
//     },
//     {
//       status: 'Consideration',
//       name:'Max',
//       date: '21/08/2019',
//       icon: 'pi pi-shopping-cart',
//       color: '#607D8B'
//     },
//     {
//       status: ' Status',
//       name:'Mike',
//       date: '23/10/2018',
//       icon: 'pi pi-check',
//       color: '#607D8B'
//     }
//   ];
//   const customizedMarker = (item) => {
//     return (
//         <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: item.color }}>
//             <i className={item.icon}></i>
//         </span>
//     );
// };
//   return (
//     <>
    
//     <div className="card">
//     <span className='ml-4'><h1>Activity</h1></span>
//       <Timeline
//         value={events}
//         marker={customizedMarker}
//         content={(item) => (
//           <div>
//             <div>{item.status}</div>
//             <div className='fw-bold'>{item.name}</div>
//             {/* <div>{item.date}</div> */}
//           </div>
//         )}
//         className="w-full mt-2 mb-2 md:w-20rem"
//       />
//     </div>
//     </>
//   );
// }


import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';
import React from 'react';
import WidgetHeader from '../../../DashBoard1/components/WidgetHeader';
// import WidgetHeader from './WidgetHeader';

const TimeLineCard = () => {
    const timelineData = [
        {
            status: (
                <div className="callOut">
                    <div className="">
                    <div style={{ fontSize: '13px' }}>Changed the Status to Not in Consideration</div>
                    <div className='fw-bold'>Annie Deshmukh</div>
                        
                        
                    </div>
                </div>
            ),
            date: '2017-01-02 00:00:00.0 ',
        },
        {
            status: (
                <div className="callOut">
                    <div className="">
                        
                        <div style={{ fontSize: '13px' }}> Consideration</div>
                    <div className='fw-bold'>John</div>
                   
                    </div>
                </div>
            ),
            date: ' 2017-01-02 00:00:00.0',
        },
        {
            status: (
                <div className="callOut">
                    <div className="">
                        
                        <div style={{ fontSize: '13px' }}> Consideration</div>
                    <div className='fw-bold'>Max</div>
                      
                    </div>
                </div>
            ),
            date: ' 2017-01-05 00:00:00.0',
        },
        {
            status: (
                <div className="callOut">
                    <div className="">
                        
                        <div style={{ fontSize: '13px' }}> Consideration</div>
                    <div className='fw-bold'>Mike</div>
                       
                    </div>
                </div>
            ),
            date: ' 2017-01-05 00:00:00.0',
        },
    ];
    const timeZone = 'America/New_York';
    // const timeZone = 'Asia/Kolkata';
    function convertToUserTimeZone(dateString, timeZone) {
        try {
            const date = new Date(dateString);

            return date.toLocaleString('en-US', { timeZone: timeZone });
        } catch (error) {
            console.error('Error converting date:', error);
            return 'Invalid Date';
        }
    }
    const timelineDataWithTimezone = timelineData.map((item) => ({
        status: item.status,
        date: convertToUserTimeZone(item.date, timeZone),
    }));
    return (
        <>
            <Card
                className="custom-card p-2"
                header={<WidgetHeader heading="Activity" type="button" buttonLabel="View All" />}
            >
                <Timeline
                    className="dashBoard-timeline"
                    align="right"
                    value={timelineDataWithTimezone}
                    opposite={(item) => item.status}
                    content={(item) => <small className="text-color-secondary">{item.date}</small>}
                />
                {/* timelineData is hardcode data */}
            </Card>
        </>
    );
};

export default TimeLineCard;