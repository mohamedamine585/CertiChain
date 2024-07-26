module certi::CertStore {

    use aptos_framework::signer;
    use aptos_framework::string::{String};
    use std::vector;
    use std::table;
  
    

     struct CertificatesIssuancesStore has key, store {
    certificatesIssuances : table::Table<String, CertificateIssuance>,
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
            certificatesIssuances: table::new<String, CertificateIssuance>(),
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
        issuanceId: String,
        recipientName: String,
        recipientEmail: String,
        recipientPhoto: String,
        certUrl: String,
        certificateId: String,
        issueDate: u64,
        description: String,
        issuer: address
    )  acquires ApprovedIssuers,CertificatesIssuancesStore{
        let admin_address = signer::address_of(sender);
         
        if (!is_approved_issuer(admin_address, issuer)) {
            abort(1) // Issuer is not approved
        };
  
        

        let new_cert = CertificateIssuance {
            issuer: issuer,
            issuanceId: issuanceId,
            recipientName: recipientName,
            recipientEmail: recipientEmail,
            recipientPhotoUrl: recipientPhoto,
            certUrl: certUrl,
            certificateId: certificateId,
            issueDate: issueDate,
            description: description,
        };

           let  certificate_store = borrow_global_mut<CertificatesIssuancesStore>(admin_address);
            table::add(&mut certificate_store.certificatesIssuances, issuanceId, new_cert);


    }


    #[view]
    public fun get_certificate_issuance(issuer_address : address,issuanceId : String): 
    (String,String,String,String,String,String,String,u64) acquires CertificatesIssuancesStore {

           let  certificate_store = borrow_global_mut<CertificatesIssuancesStore>(issuer_address);
           let certI = table::borrow(&certificate_store.certificatesIssuances, issuanceId);
            ((*certI).certificateId,(*certI).issuanceId,(*certI).recipientName,(*certI).recipientEmail,(*certI).recipientPhotoUrl,(*certI).certUrl,(*certI).description,(*certI).issueDate)
    }
}