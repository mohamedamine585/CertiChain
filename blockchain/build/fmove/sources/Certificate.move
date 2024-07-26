module certi::Certificate {

    use aptos_framework::signer;
    use aptos_framework::string::{String};
    use std::vector;
    use std::option;
  
   
     struct CertificatesIssuances has key,store{
       certificateIds : vector<String>

     }
      struct CertificateIssuance has key,store{
        issuer: address,

        issuanceId:String,
        recipientName : String,
        recipientEmail : String,
        recipientPhotoUrl : String,
        certUrl : String,
        certificate : String,
        issueDate: u64,
        description: String,
    }


    struct ApprovedIssuers has key, store {
        issuers: vector<address>,
    }
  public entry fun initialize_certs_issuances(admin : signer) {
        let certs = CertificatesIssuances {
            certificateIds: vector::empty<String>(),
        };
        
        move_to(&admin, certs);
    }

    public entry fun initialize_approved_issuers(admin : signer) {
        let approved_issuers = ApprovedIssuers {
            issuers: vector::empty<address>(),
        };
        
        move_to(&admin, approved_issuers);
    }

    public entry fun add_approved_issuer(admin : address,new_issuer: address) acquires ApprovedIssuers {
        // Borrow the global resource at the fixed address
        let  approved_issuers_ref = borrow_global_mut<ApprovedIssuers>(admin);

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
        certificate: String,
        issueDate: u64,
        description: String,
        admin: address
    )  acquires ApprovedIssuers,CertificatesIssuances{
        let issuer_address = signer::address_of(sender);
         
        if (!is_approved_issuer(issuer_address, admin)) {
            abort(1) // Issuer is not approved
        };

        let new_cert = CertificateIssuance {
            issuer: issuer_address,
            issuanceId: issuanceId,
            recipientName: recipientName,
            recipientEmail: recipientEmail,
            recipientPhotoUrl: recipientPhoto,
            certUrl: certUrl,
            certificate: certificate,
            issueDate: issueDate,
            description: description,
        };

        // Store the certificate in the global state
        move_to(sender, new_cert);
        let  certs_issuances = borrow_global_mut<CertificatesIssuances>(issuer_address);
        vector::push_back(&mut certs_issuances.certificateIds, issuanceId);
    }


#[view]
public fun get_Certificate(issuer: address): vector<String> acquires CertificatesIssuances {
    borrow_global<CertificatesIssuances>(issuer).certificateIds
}
  

}