import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import LicenseApproval from '../components/admin/LicenseApproval'

function AdminLicenseApproval() {
  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
    <LicenseApproval/>
    </main>
    <Footer />
  </div>
  )
}

export default AdminLicenseApproval
