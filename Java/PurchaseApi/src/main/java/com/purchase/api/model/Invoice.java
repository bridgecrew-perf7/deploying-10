package com.purchase.api.model;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="INVOICE")
public class Invoice {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long INVOICE;
	private String INVOICE_ID;
	@Temporal(TemporalType.TIMESTAMP)
	private Date ADD_DATE;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="INVOICE", referencedColumnName="INVOICE")
	private List<InvoiceDetail> invoiceDetails;
	
	public Invoice() {}
	
	public Invoice(List<InvoiceDetail> invoiceDetails)
	{
		this.invoiceDetails = invoiceDetails;
		this.INVOICE_ID = UUID.randomUUID().toString();
		this.ADD_DATE = new Date();
	}
	
	public Long getINVOICE() {
		return INVOICE;
	}
	public void setINVOICE(Long iNVOICE) {
		INVOICE = iNVOICE;
	}
	public String getINVOICE_ID() {
		return INVOICE_ID;
	}
	public void setINVOICE_ID(String iNVOICE_ID) {
		INVOICE_ID = iNVOICE_ID;
	}
	public Date getADD_DATE() {
		return ADD_DATE;
	}
	public void setADD_DATE(Date aDD_DATE) {
		ADD_DATE = aDD_DATE;
	}
	public List<InvoiceDetail> getInvoiceDetails() {
		return invoiceDetails;
	}
	public void setInvoiceDetails(List<InvoiceDetail> invoiceDetails) {
		this.invoiceDetails = invoiceDetails;
	}
}
