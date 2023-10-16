// Import necessary modules and dependencies
const Requisition = require('../../models/requisition');
const requisitionController = require('../../controllers/requisitionController');
const request = require('supertest');
const app = require('../../server');
// Import your MongoDB connection or configuration
const mongoose = require('mongoose');
const { connectToDatabase } = require('../../config/database');

// Mock Requisition.find to return data in requisitionController
jest.mock('../../models/requisition', () => ({
    find: jest.fn(),
}));

const dbUri = 'mongodb+srv://kesh:1234@cluster0.wrq1qps.mongodb.net/Construction_Database?retryWrites=true&w=majority';
beforeAll(async () => {
    await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
     // Replace with your MongoDB URI
});

describe('requisitionController', () => {
    describe('allRequistions', () => {
        it('should get all requisition', async () => {
            // Mock the behavior of Requisition.find to return data
            const mockData = [
                {
                    SiteManagerID: 'SM001',
                    Date: '2023-10-1',
                    SiteName: 'Colombo Site',
                    Status: 'New',
                    Materials: [{
                        MaterialName: 'Material A',
                        MaterialQuantity: 30
                    }],
                    TotalAmount: 75000,
                    _id: '652aa983108926d2aedf8eee',
                },
                // Add more employee data as needed
            ];

            // Set up the data for Requisition.find
            Requisition.find.mockResolvedValue(mockData);

            // Use supertest to make a request to your route
            const response = await request(app).get('/requisitions/allRequistions');

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });
        
    });
});

afterAll(async () => {
    await mongoose.connection.close(); // Close the MongoDB connection
});