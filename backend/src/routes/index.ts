import { Router, Request, Response } from 'express';
import { getCertificate, issueCertificate } from '../handlers/certificateHandler';
import bodyParser from 'body-parser';

const router = Router();


router
.get('/certificate/:hash', getCertificate)
.post('/certificate',issueCertificate)
export default router;
