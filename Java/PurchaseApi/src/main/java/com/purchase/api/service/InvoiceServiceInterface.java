package com.purchase.api.service;

import java.util.List;

import com.purchase.api.model.Invoice;

public interface InvoiceServiceInterface {
	
	public void createNewInvoice(Invoice invoice);
	
	public List<Invoice> listInvoices();
}
