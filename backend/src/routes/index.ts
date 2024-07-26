import { Router, Request, Response } from 'express';
import { getCertificate, getCertificateHash } from '../handlers/certificateHandler';
import bodyParser from 'body-parser';

const router = Router();


router
.get('/certificate/:id', getCertificate)
.get('/certificateHash',getCertificateHash)
export default router;
