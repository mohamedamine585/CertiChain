import Navbar from "@/components/Navbar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";


const CertificatesTable = ({ issuerId }) => {
  const [certificates, setCertificates] = useState([
    {
      certName: "Certificate A",
      certType: "Type A",
      certUrl: "http://example.com/certA"
    },
    {
      certName: "Certificate B",
      certType: "Type B",
      certUrl: "http://example.com/certB"
    },
  ]);
  const [error, setError] = useState<null |string>(null);

  useEffect(() => {
    fetchCertificates();
  }, [issuerId]);

  const fetchCertificates = async () => {
    try {
      const response = await fetch(`/localhost:3000/${issuerId}/certificates`);
      const data = await response.json();
      if (response.ok) {
        setCertificates(data);
      } else {
        setError("Failed to fetch certificates");
      }
    } catch (err: any) {
      setError("Failed to fetch certificates");
    }
  };

  return (
    <>
    <Navbar />
    
    <div className="p-8">
      {error && (
        <Alert className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="mb-4 flex justify-end">
        <Link to="/add-certificate">
            <Button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Certificate
            </Button>
        </Link>
        </div>
      {!error && <Table className="w-3/4 mx-auto shadow-lg">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-4 py-2">Certificate Name</TableHead>
            <TableHead className="px-4 py-2">Certificate Type</TableHead>
            <TableHead className="px-4 py-2">Certificate URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.map((cert) => (
            <TableRow key={cert.certName} className="border-b">
              <TableCell className="px-4 py-2">{cert.certName}</TableCell>
              <TableCell className="px-4 py-2">{cert.certType}</TableCell>
              <TableCell className="px-4 py-2">
                {cert.certUrl ? (
                  <a href={cert.certUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {cert.certUrl}
                  </a>
                ) : (
                  "N/A"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>}
    </div>
    </>
  );
};

export default CertificatesTable;
