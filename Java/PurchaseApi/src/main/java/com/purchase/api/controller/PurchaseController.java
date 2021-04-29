package com.purchase.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.purchase.api.model.CheckoutProduct;
import com.purchase.api.model.CheckoutProductList;
import com.purchase.api.model.Invoice;
import com.purchase.api.model.InvoiceDetail;
import com.purchase.api.model.Product;
import com.purchase.api.model.ProductResponse;
import com.purchase.api.service.InvoiceService;

@RestController
public class PurchaseController {
	@Autowired
	private InvoiceService service;

	@Autowired
	private RestTemplate restTemplate;
	
	private final String PRODUCTS_API = "https://reactnodeexample.wn.r.appspot.com/product/";
	
	public double getPriceOfProduct(String productId)
	{
		double price = 0;
		ProductResponse productResponse = restTemplate.getForObject(PRODUCTS_API+productId, ProductResponse.class);
		Product p = productResponse.getProduct();
		price = p.getPrice();
		return price;
	}
	
	@PostMapping("/purchase")
	public Invoice addPurchase(@RequestBody CheckoutProductList products) {
		List<InvoiceDetail> invoiceDetails = new ArrayList<InvoiceDetail>();
		for(CheckoutProduct product : products.getCheckout())
		{
			invoiceDetails.add(new InvoiceDetail(
													product.getId(), 
													product.getCount(),
													getPriceOfProduct(product.getId())
												));
		}
		Invoice invoice = new Invoice(invoiceDetails);
		service.createNewInvoice(invoice);
		return invoice;
	}
	
	@GetMapping("/purchase")
	public List<Invoice> getPurchases() {
		return service.listInvoices();
	}
}
