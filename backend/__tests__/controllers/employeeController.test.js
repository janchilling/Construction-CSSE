// Import necessary modules and dependencies
const Employee = require('../../models/employee');
const employeeController = require('../../controllers/employeeController');
const request = require('supertest');
const app = require('../../server');

// Import your MongoDB connection or configuration
const mongoose = require('mongoose');
const { mongoURI } = require('../../config/database');

// Mock Employee.find to return data in employeeController
jest.mock('../../models/employee', () => ({
  find: jest.fn(),
}));


const dbUri = 'mongodb+srv://kesh:1234@cluster0.wrq1qps.mongodb.net/Construction_Database?retryWrites=true&w=majority';
beforeAll(async () => {
  await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
});

// Test cases for allEmployees function
describe('employeeController', () => {
  describe('allEmployees', () => {
    it('should get all employees', async () => {
      // Mock the behavior of Employee.find to return data
      const mockData = [
        {
          _id: '6527c657731c12b67f9784eb',
          Fullname: 'John Doe',
          EmployeeID: 'EMP001',
          Email: 'john.doe@example.com',
          Address: '123 Main St',
          Phone: '123-456-7890',
          UserType: 'Site Manager',
          Gender: 'Male',
          Password: 'password123',
          
        },
        // Add more employee data as needed
      ];

      // Set up the mock for Employee.find
      Employee.find.mockResolvedValue(mockData);

      // Use supertest to make a request to your route
      const response = await request(app).get('/employees/allEmployees');

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close(); // Close the MongoDB connection
});

