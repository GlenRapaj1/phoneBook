package com.glen.address.service;

import com.glen.address.model.PhoneBook;
import com.glen.address.repo.PhoneBookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhoneBookService {

    @Autowired
    private PhoneBookRepo phoneBookRepo;

    public PhoneBook getPhoneBookEntryById(String id){
        Optional<PhoneBook> phoneBook = phoneBookRepo.findById(id);
        if(phoneBook.isPresent()){
            return phoneBook.get();
        }
        return null;
    }

    public Optional<PhoneBook> getPhoneBookEntryByNumber(int number){
        Optional<PhoneBook> phoneBook = phoneBookRepo.findByNumber(number);
        return phoneBook;
    }

    public PhoneBook addPhoneBookEntry(PhoneBook phoneBook){
        return phoneBookRepo.save(phoneBook);
    }

    public void deletePhoneBookEntryById(String id){
        phoneBookRepo.deleteById(id);
    }

    public Page<PhoneBook> getAllPhoneBookEntry(int page, int size){
        Pageable paging = PageRequest.of(page, size, Sort.by( "first" ) );
        return phoneBookRepo.findAll(paging);
    }
    public PhoneBook modifyPhoneBookEntry(PhoneBook phoneBook){
        return phoneBookRepo.save(phoneBook);
    }

    public Page<PhoneBook> getPagePhoneBookEntryByType(int page, int size, String type){
        Pageable paging = PageRequest.of(page, size, Sort.by( "first" ) );
        return phoneBookRepo.getPagePhoneBookEntryByType(type, paging);
    }

    public Page<PhoneBook> getAllPhoneBookEntryWithoutSort(int page, int size){
        Pageable paging = PageRequest.of(page, size);
        return phoneBookRepo.findAll(paging);
    }

    public Page<PhoneBook> getAllPhoneBookEntrySortedByLast(int page, int size){
        // Sorting by last name
        Pageable paging = PageRequest.of(page, size, Sort.by( "last" ) );
        return phoneBookRepo.findAll(paging);
    }

    public List<PhoneBook> getAllPhoneBookEntryByFirstName(String firs){
        return phoneBookRepo.findByFirst(firs);
    }

    public List<PhoneBook> getAllPhoneBookEntryByLastName(String last){
        return phoneBookRepo.findByLast(last);
    }
}
