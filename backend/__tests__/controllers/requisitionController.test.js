// Import necessary modules and dependencies
const Requisition = require('../../models/requisition');
const requisitionController = require('../../controllers/requisitionController');

// Mock Order.save to return data in orderController
jest.mock('../../models/requisition');

// Test cases for createOrder function
describe('requisitionController', () => {
    describe('createRequisition', () => {

        const request = {
            body: {
                "SiteManagerID": "SM001",
                "Date": "2023-11-15",
                "SiteName": "Kandy site",
                "Status": "Pending",
                "Materials": [
                  {
                    "MaterialName": "Material A",
                    "MaterialQuantity": 5
                  },
                  {
                    "MaterialName": "Material B",
                    "MaterialQuantity": 3
                  }
                ],
                "TotalAmount": 25000
              }
        };

        const response = {
            json: jest.fn((x) => x)
        };

        it('should create an Requisition', async () => {
            const mockSave = jest.fn().mockResolvedValue({});
            Requisition.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await requisitionController.createRequisition(request, response);

            expect(mockSave).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith("Requisition Added");
        });
    });
});
