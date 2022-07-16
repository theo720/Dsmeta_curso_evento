package com.devsuperior.dsmeta.services;


import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.devsuperior.dsmeta.entities.Sale;
import com.devsuperior.dsmeta.repositories.SaleRepository;
@Service
public class SaleService {
	@Autowired
	private SaleRepository repository;
	
	public Page<Sale> findSale(String mindate,String maxdate,Pageable pageable){
		LocalDate hoje = LocalDate.ofInstant(Instant.now(),ZoneId.systemDefault());
		
		LocalDate min = mindate.equals("")? hoje.minusDays(365) : LocalDate.parse(mindate);
		LocalDate max = maxdate.equals("")? hoje : LocalDate.parse(maxdate);
		return repository.findSales(min,max,pageable);
	}
}
