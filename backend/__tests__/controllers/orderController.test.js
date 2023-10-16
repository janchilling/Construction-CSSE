// Import necessary modules and dependencies
const Order = require('../../models/order');
const orderController = require('../../controllers/orderController');
const request = require('supertest');
const app = require('../../server');

// Import your MongoDB connection or configuration
const mongoose = require('mongoose');
const { mongoURI } = require('../../config/database');

// Mock Order.find to return data in orderController
jest.mock('../../models/order', () => ({
    find: jest.fn(),
}));


const dbUri = 'mongodb+srv://kesh:1234@cluster0.wrq1qps.mongodb.net/Construction_Database?retryWrites=true&w=majority';
beforeAll(async () => {
    await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// Test cases for allOrders function
describe('orderController', () => {
    describe('allOrders', () => {
        it('should get all orders', async () => {
            // Mock the behavior of Order.find to return data
            const mockData = [
                {
                    _id: '652b765a7cbba9f6dd7465d2',
                    SupplierName: 'Sahan',
                    RequisitionID: '652ace0ba341e939c0d8feac',
                    SiteManagerID: 'SM001',
                    SiteManagerName: 'Saman',
                    SiteName: 'Kandy site',
                    Date: '2023-11-15',
                    ToatalAmount: '25000',
                    Materials: [{
                        MaterialName: 'Material B',
                        MaterialQuantity: 3
                    }],
                    CardType: 'debit',
                    CardNumber: 212423424524
                },
                // Add more order data as needed
            ];

            // Set up the mock for Employee.find
            Order.find.mockResolvedValue(mockData);

            // Use supertest to make a request to your route
            const response = await request(app).get('/orders/allOrders');

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });
    });
});

afterAll(async () => {
    await mongoose.connection.close(); // Close the MongoDB connection
});

