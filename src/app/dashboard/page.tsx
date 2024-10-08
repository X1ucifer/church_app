'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { DesktopHeader } from '@/components/partials/desktopHeader'
import { MobileHeader } from '@/components/partials/mobileHeader'
import Link from 'next/link';
import withAuth from '../authCheck'; 
import { useDashboard } from '@/hooks/useDashboard'

// Dynamically load ApexCharts to prevent issues with server-side rendering
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const data = [
    { name: 'Evergreen', value: 200, color: '#4F46E5' },
    { name: 'Middle Age', value: 200, color: '#F59E0B' },
    { name: 'Youth', value: 200, color: '#EAB308' },
    { name: 'Children', value: 800, color: '#EC4899' },
    { name: 'Friends', value: 200, color: '#10B981' },
]

const totalValues = [
    { label: 'Active Members', value: 1000, color: 'text-blue-600' },
    { label: 'Inactive Members', value: 300, color: 'text-blue-600' },
    { label: 'Members need attain', value: 500, color: 'text-blue-600' },
    { label: 'Members need Visiting', value: 300, color: 'text-blue-600' },
    { label: 'Lost Members', value: 600, color: 'text-blue-600' },
    { label: 'Friends', value: 300, color: 'text-blue-600' },
]

const averageAttendance = [
    { day: 'Friday', value: 500 },
    { day: 'Saturday', value: 300 },
]

function ChurchDemographics() {
    const [activeTab, setActiveTab] = useState('Home')

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const { data: isData, isLoading, error } = useDashboard(token);


    // ApexCharts options for donut chart
    const chartOptions: any = {

        chart: {
            type: 'donut',
        },
        labels: isData?.data?.map((item: any) => item.name) || [],
        colors: isData?.data?.map((item: any) => item.color) || [],
        legend: {
            show: false,
            position: 'bottom',
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: '100%',
                    },
                },
            },
        ],
    }

    const chartSeries = isData?.data?.map((item: any) => item.value) || [];

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Mobile Header */}
            <header className="bg-white p-4 flex items-center justify-between md:hidden">
                <div className="flex items-center">
                    <Image src="/logo.png" width={80} height={80} alt="Church Logo" className="mr-2" />
                    <span className="font-bold text-lg">True Jesus Church</span>
                </div>
            </header>

            {/* Desktop Header */}
            <DesktopHeader activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="container mx-auto p-4 mb-[50px]">
                <h1 className="text-md font-medium mb-4 ">Membership Demographic</h1>

                {/* Donut Chart */}
                <div className="bg-white rounded-lg shadow p-4 mb-4 flex justify-between items-center">
                    {/* Donut Chart */}
                    <div className="w-1/10 md:w-1/5 ml-[-20px]"> {/* Adjusts width for chart */}
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="donut"
                            width="100%" /* Ensures full width */
                            height="300" /* Adjust chart height as needed */
                        />
                    </div>

                    <div className="w-1/2 md:w-1/3"> {/* Adjusts width for values */}
                        <ul className="space-y-2">
                            {isData?.data.map((item:any, index:number) => (
                                <li key={index} className="flex justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span
                                            className="inline-block w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }} // Dot with color
                                        />
                                        <span className="text-gray-600">{item.name}</span>
                                    </div>
                                    <span className="text-gray-600">{item.value}</span>
                                </li>
                            ))} 
                        </ul>
                    </div>
                </div>

                <h2 className="text-md font-medium mb-2">Total Values</h2>
                <div className="bg-[#E1E1E1] rounded-lg shadow p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4">
                        {isData?.totalValues.map((item:any, index:number) => (
                            <div key={index} className="md:flex">
                                <span className="text-gray-600">{item.label}</span>
                                <br></br>
                                <span className={`text-[#0065FF] md:ml-[10px] font-semibold`}>{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <h2 className="text-md font-medium mb-2">Average Attendance</h2>
                <div className="bg-[#E1E1E1] rounded-lg shadow p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4">
                        {isData?.averageAttendance.map((item:any, index:number) => (
                            <div key={index} className="md:flex">
                                <span className="text-gray-600">{item.day}</span>
                                <br></br>
                                <span className="text-[#0065FF] font-semibold md:ml-[10px]">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <br></br>
            </main>

            {/* Mobile Navigation */}
            <MobileHeader activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Floating Action Button */}
            <Link href="/dashboard/member" passHref>
                <button className="fixed bottom-20 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg ">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </button>
            </Link>
        </div>
    )
}


export default withAuth(ChurchDemographics);
