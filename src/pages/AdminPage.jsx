"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Table } from "../components/ui/Table"
import { Loader } from "../components/ui/Loader"
import { API_URL } from "../config"

function AdminPage() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [seedStatus, setSeedStatus] = useState(null)
  const [seedLoading, setSeedLoading] = useState(false)

  useEffect(() => {
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/coupons`)
      const data = await response.json()

      if (data.coupons) {
        setCoupons(data.coupons)
      } else {
        setError("Failed to fetch coupons")
      }
    } catch (err) {
      setError("An error occurred while fetching coupons")
    } finally {
      setLoading(false)
    }
  }

  const handleSeedDatabase = async () => {
    try {
      setSeedLoading(true)
      setSeedStatus(null)

      const response = await fetch(`${API_URL}/api/seed`)
      const data = await response.json()

      setSeedStatus(data.message)

      if (data.success) {
        fetchCoupons()
      }
    } catch (err) {
      setSeedStatus("Failed to seed database")
    } finally {
      setSeedLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <Card className="mb-8">
          <div className="card-header">
            <h2 className="card-title">Database Management</h2>
            <p className="card-description">Seed the database with initial coupon data</p>
          </div>
          <div className="card-content">
            {seedStatus && (
              <div
                className={`p-4 mb-4 rounded-md ${seedStatus.includes("Failed") ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}
              >
                {seedStatus}
              </div>
            )}
          </div>
          <div className="card-footer">
            <Button onClick={handleSeedDatabase} disabled={seedLoading}>
              {seedLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Seeding Database...
                </>
              ) : (
                "Seed Database"
              )}
            </Button>
          </div>
        </Card>

        <Card>
          <div className="card-header">
            <h2 className="card-title">Coupon Distribution Status</h2>
            <p className="card-description">View all available coupons and their claim counts</p>
          </div>
          <div className="card-content">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 text-red-800 rounded-md">{error}</div>
            ) : coupons.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No coupons found. Use the "Seed Database" button to add sample coupons.
              </div>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <th>Coupon Code</th>
                    <th>Discount</th>
                    <th className="text-right">Claim Count</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon.code}>
                      <td className="font-medium">{coupon.code}</td>
                      <td>{coupon.discount}</td>
                      <td className="text-right">{coupon.claimCount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
          <div className="card-footer">
            <Button variant="outline" onClick={fetchCoupons} disabled={loading}>
              Refresh Data
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}

export default AdminPage

