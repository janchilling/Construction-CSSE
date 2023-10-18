// Import necessary modules and dependencies
const Requisition = require('../../models/requisition');
const requisitionController = require('../../controllers/requisitionController');

// Mock Order.save to return data in requisitionController
jest.mock('../../models/requisition');

// Test cases for createRequisition function
describe('requisitionController', () => {
  describe('createRequisition', () => {

    const response = {
      json: jest.fn((x) => x)
    };

    it('should create a requisition', async () => {
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

      const mockSave = jest.fn().mockResolvedValue({});
      Requisition.mockImplementationOnce(() => ({
        save: mockSave,
      }));

      await requisitionController.createRequisition(request, response);

      expect(mockSave).toHaveBeenCalled();
      expect(response.json).toHaveBeenCalledWith("Requisition Added");
    });

    it('should not create a requisition with invalid input', async () => {
      const request = {
        body: {
          "SiteManagerID": "",
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

      const mockSave = jest.fn().mockResolvedValue({});
      Requisition.mockImplementationOnce(() => ({
        save: mockSave,
      }));

      await requisitionController.createRequisition(request, response);

      // Assert that the save function is not called
      expect(mockSave).not.toHaveBeenCalled();
      // Assert that the response does not contain the expected message
      expect(response.json).not.toHaveBeenCalledWith("Requisition Added");
    });
  });
});
