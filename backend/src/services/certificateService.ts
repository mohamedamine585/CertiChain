import Certificate from "../data/cert";

export async function getCertificateById(certId: string) {
    try {
        console.log(certId)
        const certificate = await Certificate.findOne({ _id: certId }).exec();
        if (!certificate) {
            throw new Error('Certificate not found');
        }
        return certificate;
    } catch (error) {
        console.error('Error fetching certificate:', error);
        throw error;
    }
}