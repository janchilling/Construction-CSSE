// Import necessary modules and dependencies
const DeliveryNotice = require('../../models/deliveryNotice');
const deliveryNoticeController = require('../../controllers/deliverNoticeController');

// Mock Order.save to return data in orderController
jest.mock('../../models/deliveryNotice');

// Test cases for createOrder function
describe('deliverNoticeController', () => {
    describe('createdeliverNotice', () => {

        const response = {
            json: jest.fn((x) => x)
        };

        it('should create a Delivery notice', async () => {
            const request = {
                body: {
                    "InvoiceID": "12345",              
                    "SupplierName": "Supplier ABC",    
                    "SiteManagerID": "SM001",         
                    "SiteManagerName": "John Doe",     
                    "SiteName": "Site XYZ",            
                    "Date": "2023-10-16",              
                    "TotalAmount": 1500,               
                    "Status": "Delivered",             
                    "Materials": [
                        {
                            "MaterialName": "Material A",  
                            "Quantity": 10                
                        },
                        {
                            "MaterialName": "Material B",  
                            "Quantity": 20                
                        }
                    ]
                }
            };

            const mockSave = jest.fn().mockResolvedValue({});
            DeliveryNotice.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await deliveryNoticeController.createDeliveryNotice(request, response);

            expect(mockSave).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith("Delivery Notice Added");
        });

        it('should not create a Delivery notice with invalid input', async () => {
            const request = {
                body: {
                    "InvoiceID": "",              
                    "SupplierName": "Supplier ABC",    
                    "SiteManagerID": "SM001",         
                    "SiteManagerName": "John Doe",     
                    "SiteName": "Site XYZ",            
                    "Date": "2023-10-16",              
                    "TotalAmount": 1500,               
                    "Status": "Delivered",             
                    "Materials": [
                        {
                            "MaterialName": "Material A",  
                            "Quantity": 10                
                        },
                        {
                            "MaterialName": "Material B",  
                            "Quantity": 20                
                        }
                    ]
                }
            };

            const mockSave = jest.fn().mockResolvedValue({});
            DeliveryNotice.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await deliveryNoticeController.createDeliveryNotice(request, response);

            // Assert that the save function is not called
            expect(mockSave).not.toHaveBeenCalled();
            // Assert that the response does not contain the expected message
            expect(response.json).not.toHaveBeenCalledWith("Delivery Notice Added");
        });
    });
});
