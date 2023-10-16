// Import necessary modules and dependencies
const DeliveryNotice = require('../../models/deliveryNotice');
const deliveryNoticeController = require('../../controllers/deliverNoticeController');
const request = require('supertest');
const app = require('../../server');

// Import your MongoDB connection or configuration
const mongoose = require('mongoose');
const { mongoURI } = require('../../config/database');

// Mock DeliveryNotice.find to return data in deliveryNoticeController
jest.mock('../../models/deliveryNotice', () => ({
    find: jest.fn(),
}));


const dbUri = 'mongodb+srv://kesh:1234@cluster0.wrq1qps.mongodb.net/Construction_Database?retryWrites=true&w=majority';
beforeAll(async () => {
    await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// Test cases for allNotices function
describe('deliveryNoticeController', () => {
    describe('allNotices', () => {
        it('should get all Notices', async () => {
            // Mock the behavior of Notices.find to return data
            const mockData = [
                {
                    _id: '652bdc7105e3c8f3ea84dfb9',
                    InvoiceID: '652bc1435a748c285c0e20b1',
                    SupplierName: 'Kumara',
                    SiteManagerID: 'SM005',
                    SiteManagerName: 'Sahan',
                    SiteName: 'Malabe site',
                    Date: '2023-11-15',
                    ToatalAmount: '25000',
                    Status: 'New',
                    Materials: [{
                        MaterialName: 'Material C',
                        MaterialQuantity: 10
                    }],
                },
                // Add more Notices data as needed
            ];

            // Set up the mock for DeliveryNotice.find
            DeliveryNotice.find.mockResolvedValue(mockData);

            // Use supertest to make a request to your route
            const response = await request(app).get('/Notices/allNotices');

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });
    });
});

afterAll(async () => {
    await mongoose.connection.close(); // Close the MongoDB connection
});

