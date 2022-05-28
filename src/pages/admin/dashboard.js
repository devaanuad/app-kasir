import React from 'react'
import CTA from '../../components/CTA'
import PageTitle from '../../components/Typography/PageTitle'

function dashboard(){

    const jika = localStorage.getItem('token')

    return (
    <div>

{jika  ? (
    <PageTitle>Ada</PageTitle>
):(
    <PageTitle>tidak ada</PageTitle>
)}

      
        <CTA/>
        </div>
    )
}

export default dashboard
