I used ChatGPT to generate the initial Express server setup.
The generated code worked but I understood and modified it.

I used ChatGPT to set up MongoDB connection using Mongoose.

Issue:
- Initial code did not handle connection errors properly

Improvement:
- Added error handling and console logs

Issue faced:
MongoDB connection failed due to deprecated options.

Fix:
Removed useNewUrlParser and useUnifiedTopology as they are no longer required in latest Mongoose versions.

AI generated the schema but:

Issues:
- Status was set to 'pending' which is not part of required states
- No validation on status values

Improvements:
- Added enum validation for status
- Set default status to "RECEIVED" as per requirements

I tested the API using Postman.

The system correctly:
- Calculated total bill
- Stored data in MongoDB
- Assigned default status
- Generated unique IDs automatically

This confirmed that the end-to-end flow works successfully.

I implemented a status update API using PUT method.

The API successfully updates order status in MongoDB.
I added validation to allow only valid statuses (RECEIVED, PROCESSING, READY, DELIVERED).

Tested using Postman and verified correct updates.

I implemented a GET API to fetch orders.

Features:
- Fetch all orders
- Filter by status, customer name, and phone

AI helped with base logic, but I structured filters manually for clarity.

I implemented a dashboard API to provide insights.

It returns:
- Total number of orders
- Total revenue generated
- Count of orders by status

This helps simulate real business analytics.


