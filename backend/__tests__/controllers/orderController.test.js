// Import necessary modules and dependencies
const Order = require('../../models/order');
const orderController = require('../../controllers/orderController');

// Mock Order.save to return data in orderController
jest.mock('../../models/order');

// Test cases for createOrder function
describe('orderController', () => {
    describe('createOrder', () => {

        const response = {
            json: jest.fn((x) => x)
        };

        it('should create an order', async () => {
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


            const mockSave = jest.fn().mockResolvedValue({});
            Order.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await orderController.createOrder(request, response);

            expect(mockSave).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith("Order Added");
        });

        it('should not create an order with invalid input', async () => {
            const request = {
                body: {
                    "SupplierName": "Sahan",
                    "RequisitionID": 1234,
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

            const mockSave = jest.fn().mockResolvedValue({});
            Order.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await orderController.createOrder(request, response);

            // Assert that the save function is not called
            expect(mockSave).not.toHaveBeenCalled();
            // Assert that the response does not contain the expected message
            expect(response.json).not.toHaveBeenCalledWith("Order Added");
        });
    });
});
