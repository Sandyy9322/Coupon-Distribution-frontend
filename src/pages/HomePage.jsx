"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Loader } from "../components/ui/Loader"
import { API_URL } from "../config"

function HomePage() {
  const [coupon, setCoupon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [countdown, setCountdown] = useState(null)

  useEffect(() => {
    if (timeRemaining) {
      setCountdown(Math.ceil(timeRemaining / 60000)) // Convert to minutes

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer)
            setTimeRemaining(null)
            setError(null)
            return null
          }
          return prev - 1
        })
      }, 60000) // Update every minute

      return () => clearInterval(timer)
    }
  }, [timeRemaining])

  const handleClaimCoupon = async () => {
    setLoading(true)
    setError(null)
    setCoupon(null)

    try {
      const response = await fetch(`${API_URL}/api/coupons/claim`, {
        method: "POST",
        credentials: "include", // Include cookies
      })

      const data = await response.json()

      if (data.success) {
        setCoupon(data.coupon)
      } else if (data.timeRemaining) {
        setError(data.message)
        setTimeRemaining(data.timeRemaining)
      } else {
        setError(data.message || "Failed to claim coupon")
      }
    } catch (err) {
      setError("An error occurred. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <div className="card-header">
          <h2 className="text-2xl text-center">Coupon Distribution System</h2>
          <p className="text-center text-gray-500">Claim your exclusive coupon below</p>
        </div>
        <div className="card-content space-y-4">
          {coupon ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="font-medium text-green-800 mb-2">Congratulations!</h3>
              <div className="flex items-center justify-between bg-white p-3 rounded border border-green-100">
                <span className="text-sm font-mono">Your coupon code:</span>
                <span className="font-bold text-lg">{coupon}</span>
              </div>
              <p className="text-sm text-green-700 mt-2">Use this code at checkout to receive your discount.</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-amber-800">{error}</p>
              {countdown && (
                <p className="text-sm text-amber-700 mt-2">
                  Please try again in {countdown} {countdown === 1 ? "minute" : "minutes"}.
                </p>
              )}
            </div>
          ) : (
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
              <p className="text-blue-700">
                Click the button below to claim your coupon. Each user can claim one coupon per hour.
              </p>
            </div>
          )}
        </div>
        <div className="card-footer">
          <Button className="w-full" onClick={handleClaimCoupon} disabled={loading || !!countdown}>
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : countdown ? (
              `Try Again in ${countdown} ${countdown === 1 ? "minute" : "minutes"}`
            ) : (
              "Claim Your Coupon"
            )}
          </Button>
        </div>
      </Card>
    </main>
  )
}

export default HomePage

