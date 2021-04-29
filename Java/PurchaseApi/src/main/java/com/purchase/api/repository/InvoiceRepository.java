package com.purchase.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purchase.api.model.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long>{

}
