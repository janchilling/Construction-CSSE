// Import necessary modules and dependencies
const Order = require('../../models/order');
const orderController = require('../../controllers/orderController');

// Mock Order.save to return data in orderController
jest.mock('../../models/order');

// Test cases for createOrder function
describe('orderController', () => {
    describe('createOrder', () => {

        const request = {
            body: {
                "SupplierName": "Sahan",
                "RequisitionID": "652ace0ba341e939c0d8feac",
                "SiteManagerID": "SM001",
                "SiteManagerName": "Saman",
                "SiteName": "Kandy site",
                "Date": "2023-11-15",
                "TotalAmount": "25000", // Fixed the property name to "TotalAmount"
                "Materials": [
                    {
                        "MaterialName": "Material B",
                        "MaterialQuantity": 3
                    }
                ],
                "CardType": "debit",
                "CardNumber": 212423424524
            }
        };

        const response = {
            json: jest.fn((x) => x)
        };

        it('should create an order', async () => {
            const mockSave = jest.fn().mockResolvedValue({}); // Mock the save function
            Order.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await orderController.createOrder(request, response);

            expect(mockSave).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith("Order Added");
        });
    });
});
