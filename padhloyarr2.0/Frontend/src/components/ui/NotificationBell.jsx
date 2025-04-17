// // import { useState } from 'react';
// // import { useNotifications } from '../context/NotificationContext';
// // import { BellIcon } from '@heroicons/react/outline';

// // const NotificationBell = () => {
// //   const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <div className="relative">
// //       <button 
// //         onClick={() => setIsOpen(!isOpen)}
// //         className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
// //       >
// //         <BellIcon className="h-6 w-6" />
// //         {unreadCount > 0 && (
// //           <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
// //         )}
// //       </button>

// //       {isOpen && (
// //         <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
// //           <div className="py-1">
// //             <div className="px-4 py-2 border-b flex justify-between items-center">
// //               <h3 className="font-medium">Notifications</h3>
// //               {unreadCount > 0 && (
// //                 <button 
// //                   onClick={markAllAsRead}
// //                   className="text-sm text-blue-600 hover:text-blue-800"
// //                 >
// //                   Mark all as read
// //                 </button>
// //               )}
// //             </div>
            
// //             <div className="max-h-96 overflow-y-auto">
// //               {notifications.length === 0 ? (
// //                 <div className="px-4 py-8 text-center text-gray-500">
// //                   No notifications
// //                 </div>
// //               ) : (
// //                 notifications.map((notification) => (
// //                   <div 
// //                     key={notification._id} 
// //                     className={`px-4 py-3 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
// //                   >
// //                     <div className="flex justify-between">
// //                       <p className="text-sm font-medium">{notification.title}</p>
// //                       {!notification.isRead && (
// //                         <button 
// //                           onClick={() => markAsRead(notification._id)}
// //                           className="text-xs text-blue-600"
// //                         >
// //                           Mark read
// //                         </button>
// //                       )}
// //                     </div>
// //                     <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
// //                     <p className="text-xs text-gray-400 mt-2">
// //                       {new Date(notification.createdAt).toLocaleString()}
// //                     </p>
// //                   </div>
// //                 ))
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default NotificationBell;


// "use client"

// import { useState } from "react"
// import { useNotifications } from "../../context/NotificationContext"
// import { BellIcon } from "@heroicons/react/outline"

// const NotificationBell = () => {
//   const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
//       >
//         <BellIcon className="h-6 w-6" />
//         {unreadCount > 0 && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>}
//       </button>

//       {isOpen && (
//         <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
//           <div className="py-1">
//             <div className="px-4 py-2 border-b flex justify-between items-center">
//               <h3 className="font-medium">Notifications</h3>
//               {unreadCount > 0 && (
//                 <button onClick={markAllAsRead} className="text-sm text-blue-600 hover:text-blue-800">
//                   Mark all as read
//                 </button>
//               )}
//             </div>

//             <div className="max-h-96 overflow-y-auto">
//               {notifications.length === 0 ? (
//                 <div className="px-4 py-8 text-center text-gray-500">No notifications</div>
//               ) : (
//                 notifications.map((notification) => (
//                   <div
//                     key={notification._id}
//                     className={`px-4 py-3 hover:bg-gray-50 ${!notification.isRead ? "bg-blue-50" : ""}`}
//                   >
//                     <div className="flex justify-between">
//                       <p className="text-sm font-medium">{notification.title}</p>
//                       {!notification.isRead && (
//                         <button onClick={() => markAsRead(notification._id)} className="text-xs text-blue-600">
//                           Mark read
//                         </button>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
//                     <p className="text-xs text-gray-400 mt-2">{new Date(notification.createdAt).toLocaleString()}</p>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default NotificationBell



"use client"

import { useState } from "react"
import { useNotifications } from "../../context/NotificationContext"
// Replace @heroicons/react/outline with react-icons
import { FiBell } from "react-icons/fi"

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
      >
        <FiBell className="h-6 w-6" />
        {unreadCount > 0 && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="px-4 py-2 border-b flex justify-between items-center">
              <h3 className="font-medium">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-sm text-blue-600 hover:text-blue-800">
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">No notifications</div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`px-4 py-3 hover:bg-gray-50 ${!notification.isRead ? "bg-blue-50" : ""}`}
                  >
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {!notification.isRead && (
                        <button onClick={() => markAsRead(notification._id)} className="text-xs text-blue-600">
                          Mark read
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{new Date(notification.createdAt).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell
