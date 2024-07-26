module certi::CertIssue {

    use aptos_framework::signer;
    use aptos_framework::string::{String};
    use std::vector;
    use std::table;
  
    

     struct CertificatesIssuancesStore has key, store {
    Hashs: vector<String>
}

      struct CertificateIssuance has key,store,copy,drop{
        issuer: address,

        issuanceId:String,
        recipientName : String,
        recipientEmail : String,
        recipientPhotoUrl : String,
        certUrl : String,
        certificateId : String,
        issueDate: u64,
        description: String,
    }


    struct ApprovedIssuers has key, store,drop {
        issuers: vector<address>,
    }
    public entry fun initialize_certificate_issuance_store(sender: &signer) {
        let certificate_store = CertificatesIssuancesStore {
            Hashs: vector::empty<String>(),
        };
        move_to(sender, certificate_store);
    }



    public entry fun initialize_approved_issuers(admin : signer) {
        let approved_issuers = ApprovedIssuers {
            issuers: vector::empty<address>(),
        };
        
        move_to(&admin, approved_issuers);
    }

    public entry fun add_approved_issuer(sender : &signer,new_issuer: address) acquires ApprovedIssuers {
        // Borrow the global resource at the fixed address
                let admin_address = signer::address_of(sender);

        let  approved_issuers_ref = borrow_global_mut<ApprovedIssuers>(admin_address);

        // Check if the issuer is already in the list to prevent duplicates
        if (!vector::contains(&approved_issuers_ref.issuers, &new_issuer)) {
            // Add the new issuer to the list
            vector::push_back(&mut approved_issuers_ref.issuers, new_issuer);
        }
    }
    public  fun is_approved_issuer(admin : address,issuer_address: address): bool acquires ApprovedIssuers {
        // Borrow the global resource at the fixed address
        let approved_issuers = borrow_global<ApprovedIssuers>(admin);

        // Check if the issuer_address is in the list of approved issuers
        vector::contains(&approved_issuers.issuers, &issuer_address)
    }


    // Issue a certificate
    public entry fun issue_cert(
        sender: &signer,
        admin_address:address,
        hash:String
    )  acquires ApprovedIssuers,CertificatesIssuancesStore{
        let issuer = signer::address_of(sender);
         
        if (!is_approved_issuer(admin_address, issuer)) {
            abort(1) // Issuer is not approved
        };
  
        

          let certificate_store = borrow_global_mut<CertificatesIssuancesStore>(admin_address);

        // Push the new hash into the vector
        vector::push_back(&mut certificate_store.Hashs, hash);

    }


    #[view]
    public fun get_certificate_issuance_exists(issuer_address : address,issuanceId : String): 
    bool acquires CertificatesIssuancesStore {

           let  certificate_store = borrow_global_mut<CertificatesIssuancesStore>(issuer_address);
           let certI = vector::contains(&certificate_store.Hashs, &issuanceId);
            certI
    }
}