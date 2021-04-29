package com.purchase.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.purchase.api.model.Invoice;
import com.purchase.api.repository.InvoiceRepository;

@Service
public class InvoiceService implements InvoiceServiceInterface {
	@Autowired
	private InvoiceRepository repository;
	
	@Override
	public void createNewInvoice(Invoice invoice) {
		this.repository.save(invoice);
	}
	
	@Override
	public List<Invoice> listInvoices(){
		return this.repository.findAll();
	}
}
