package com.purchase.api.model;

import java.util.List;

public class CheckoutProductList {
	private List<CheckoutProduct> checkout;

	public List<CheckoutProduct> getCheckout() {
		return checkout;
	}

	public void setCheckout(List<CheckoutProduct> checkout) {
		this.checkout = checkout;
	}
	
}
