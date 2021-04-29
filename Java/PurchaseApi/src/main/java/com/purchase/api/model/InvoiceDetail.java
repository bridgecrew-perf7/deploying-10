package com.purchase.api.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="INVOICE_DETAIL")
public class InvoiceDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long INVOICE_DETAIL;
	private Long INVOICE;
	private String PRODUCT_ID;
	private int COUNT;
	private double INDIVIDUAL_PRICE;
	@Temporal(TemporalType.TIMESTAMP)
	private Date ADD_DATE;
	
	public InvoiceDetail() {}
	
	public InvoiceDetail(String PRODUCT_ID, int COUNT, double INDIVIDUAL_PRICE) {
		this.PRODUCT_ID = PRODUCT_ID;
		this.COUNT = COUNT;
		this.INDIVIDUAL_PRICE = INDIVIDUAL_PRICE;
		this.ADD_DATE = new Date();
	}
	
	public Long getINVOICE_DETAIL() {
		return INVOICE_DETAIL;
	}
	public void setINVOICE_DETAIL(Long iNVOICE_DETAIL) {
		INVOICE_DETAIL = iNVOICE_DETAIL;
	}
	@JsonIgnore
	public Long getINVOICE() {
		return INVOICE;
	}
	public void setINVOICE(Long iNVOICE) {
		INVOICE = iNVOICE;
	}
	public String getPRODUCT_ID() {
		return PRODUCT_ID;
	}
	public void setPRODUCT_ID(String pRODUCT_ID) {
		PRODUCT_ID = pRODUCT_ID;
	}
	public int getCOUNT() {
		return COUNT;
	}
	public void setCOUNT(int cOUNT) {
		COUNT = cOUNT;
	}
	public double getINDIVIDUAL_PRICE() {
		return INDIVIDUAL_PRICE;
	}
	public void setINDIVIDUAL_PRICE(double iNDIVIDUAL_PRICE) {
		INDIVIDUAL_PRICE = iNDIVIDUAL_PRICE;
	}
	public Date getADD_DATE() {
		return ADD_DATE;
	}
	public void setADD_DATE(Date aDD_DATE) {
		ADD_DATE = aDD_DATE;
	}
}
