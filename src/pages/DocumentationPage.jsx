function DocumentationPage() {
    return (
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Coupon Distribution System Documentation</h1>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Setup Instructions</h2>
  
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">1. Environment Setup</h3>
              <p className="mb-2">
                Create a <code className="bg-gray-100 px-1 py-0.5 rounded">.env</code> file in the server directory with
                the following variables:
              </p>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto">
                {`MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
  MONGODB_DB=coupon-system
  PORT=5000`}
              </pre>
            </div>
  
            <div>
              <h3 className="text-xl font-medium mb-2">2. Install Dependencies</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto">{`# Install client dependencies
  cd client
  npm install
  
  # Install server dependencies
  cd ../server
  npm install`}</pre>
            </div>
  
            <div>
              <h3 className="text-xl font-medium mb-2">3. Run Development Server</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto">{`# Start the backend server
  cd server
  npm run dev
  
  # In a separate terminal, start the frontend
  cd client
  npm run dev`}</pre>
            </div>
  
            <div>
              <h3 className="text-xl font-medium mb-2">4. Seed the Database</h3>
              <p>
                Visit the admin page at <code className="bg-gray-100 px-1 py-0.5 rounded">/admin</code> and click the
                "Seed Database" button to populate the database with sample coupons.
              </p>
            </div>
  
            <div>
              <h3 className="text-xl font-medium mb-2">5. Production Deployment</h3>
              <p>Build and deploy the application:</p>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto">
                {`# Build the frontend
  cd client
  npm run build
  
  # Start the production server
  cd ../server
  npm start`}
              </pre>
            </div>
          </div>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Abuse Prevention Strategies</h2>
  
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">1. IP Address Tracking</h3>
              <p>
                The system records the IP address of each user who claims a coupon. This prevents users from claiming
                multiple coupons by:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Storing the IP address in the database along with the timestamp of the claim</li>
                <li>Checking for existing claims from the same IP address before issuing a new coupon</li>
                <li>Enforcing a cooldown period (1 hour by default) between claims from the same IP</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                Implementation: Express middleware captures the client IP and the API routes verify it against previous
                claims.
              </p>
            </div>
  
            <div>
              <h3 className="text-xl font-medium mb-2">2. Browser Cookie Tracking</h3>
              <p>In addition to IP tracking, the system uses HTTP-only cookies to identify returning users:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>A unique client ID is generated and stored as a cookie when a user first visits the site</li>
                <li>This ID persists even if the user clears their browser cache or uses a different browser profile</li>
                <li>The system checks both IP address and client ID when processing coupon claims</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                Implementation: HTTP-only cookies are set with a 30-day expiration to maintain user identity across
                sessions.
              </p>
            </div>
  
            <div>
              <h3 className="text-xl font-medium mb-2">3. Round-Robin Distribution</h3>
              <p>Coupons are distributed in a round-robin fashion to ensure fair distribution:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The system tracks how many times each coupon has been claimed</li>
                <li>When a new claim is made, the coupon with the lowest claim count is selected</li>
                <li>This ensures that all coupons are distributed evenly across users</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                Implementation: MongoDB queries sort coupons by claim count to implement the round-robin algorithm.
              </p>
            </div>
          </div>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold mb-4">System Architecture</h2>
  
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Frontend</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Built with React and Vite</li>
                <li>Custom UI components</li>
                <li>React Router for navigation</li>
                <li>Client-side state management with React hooks</li>
                <li>Responsive design that works on all device sizes</li>
              </ul>
            </div>
  
            <div>
              <h3 className="text-xl font-medium mb-2">Backend</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Express.js for the API server</li>
                <li>MongoDB for data persistence</li>
                <li>Express middleware for capturing client IP addresses</li>
                <li>Cookie-parser for client identification</li>
              </ul>
            </div>
  
            <div>
              <h3 className="text-xl font-medium mb-2">Database Schema</h3>
              <p>The system uses two main collections:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>coupons</strong>: Stores coupon codes, discounts, and claim counts
                </li>
                <li>
                  <strong>claims</strong>: Records user claims with client ID, IP address, and timestamp
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    )
  }
  
  export default DocumentationPage
  
  