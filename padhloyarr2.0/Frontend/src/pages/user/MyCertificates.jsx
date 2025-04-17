// import { useState, useEffect } from 'react';
// import { getUserCertificates } from '../api/certificateService';
// import LoadingSpinner from '../components/ui/LoadingSpinner';

// const MyCertificates = () => {
//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCertificates = async () => {
//       try {
//         const response = await getUserCertificates();
//         setCertificates(response.data);
//       } catch (error) {
//         console.error('Error fetching certificates:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCertificates();
//   }, []);

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">My Certificates</h1>
      
//       {certificates.length === 0 ? (
//         <div className="bg-white rounded-lg shadow-md p-8 text-center">
//           <p className="text-gray-600 mb-4">You haven't earned any certificates yet.</p>
//           <p className="text-gray-500">Complete courses to earn certificates.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {certificates.map((cert) => (
//             <div key={cert._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
//               <div className="bg-blue-600 text-white p-4">
//                 <h3 className="font-bold text-lg">{cert.course.title}</h3>
//                 <p className="text-sm">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
//               </div>
//               <div className="p-4">
//                 <p className="text-gray-600 mb-4">Certificate ID: {cert.certificateId}</p>
//                 <div className="flex justify-between">
//                   <a 
//                     href={`/certificates/${cert._id}/download`}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     Download PDF
//                   </a>
//                   <a 
//                     href={`/certificates/${cert._id}/verify`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-600 hover:text-gray-800"
//                   >
//                     Verify
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyCertificates;


"use client"

import { useState, useEffect } from "react"
// import { getUserCertificates } from "../../api/certificateService"
import certificateService from "../../api/certificateService"
import LoadingSpinner from "../../components/UI/LoadingSpinner"

const MyCertificates = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await getUserCertificates()
        setCertificates(response.data)
      } catch (error) {
        console.error("Error fetching certificates:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCertificates()
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Certificates</h1>

      {certificates.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">You haven't earned any certificates yet.</p>
          <p className="text-gray-500">Complete courses to earn certificates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-blue-600 text-white p-4">
                <h3 className="font-bold text-lg">{cert.course.title}</h3>
                <p className="text-sm">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">Certificate ID: {cert.certificateId}</p>
                <div className="flex justify-between">
                  <a href={`/certificates/${cert._id}/download`} className="text-blue-600 hover:text-blue-800">
                    Download PDF
                  </a>
                  <a
                    href={`/certificates/${cert._id}/verify`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Verify
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyCertificates
