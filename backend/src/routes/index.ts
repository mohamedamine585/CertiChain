import { Router } from 'express';
import { addCertificateHandler, getAllCertificateHandler, getCertificate, getCertificateHash } from '../handlers/certificateHandler';
import { addIssuerHandler, getIssuerAddressHandler } from '../handlers/issuerHandler';

const router = Router();


router
.get('/certificate/:id', getCertificate)
.get('/issuer/:id/address',getIssuerAddressHandler)
.post('/issuer',addIssuerHandler)
.get('/:address/certificateHash',getCertificateHash)
.get('/:address/transferAuth',getCertificateHash)
.get('/:issuerId/certificates',getAllCertificateHandler)
.post('/:issuerId/certificate',addCertificateHandler)

export default router;
