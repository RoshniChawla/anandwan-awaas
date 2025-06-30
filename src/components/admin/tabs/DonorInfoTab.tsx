import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Search } from 'lucide-react';
import { Donor, DonationSummary } from '@/types/admin';
import { getMockDonors, getDonationSummary } from '@/services/adminApi';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DonorInfoTab = () => {
  const [loading, setLoading] = useState(true);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [summary, setSummary] = useState<DonationSummary | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDonors(getMockDonors());
      setSummary({
        lastDonation: getMockDonors()[0],
        totalAmount: 175000,
        totalDonors: 3,
        recurringDonors: 2,
      });
      setLoading(false);
    }, 500);
  }, []);

  const filteredDonors = donors.filter(donor =>
    donor.name.toLowerCase().includes(search.toLowerCase()) ||
    donor.mode.toLowerCase().includes(search.toLowerCase()) ||
    donor.type.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedDonors = filteredDonors.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(filteredDonors.length / rowsPerPage);

  const exportCSV = () => {
    const csv = Papa.unparse(filteredDonors);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `donors-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Donor History', 14, 22);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
    (doc as any).autoTable({
      head: [['Name', 'Amount', 'Date', 'Mode', 'Type', 'Notes']],
      body: filteredDonors.map(d => [d.name, `₹${d.amount}`, d.date, d.mode, d.type, d.notes || '']),
      startY: 40,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });
    doc.save(`donors-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Donor & Sponsor Info</h2>
          <p className="text-muted-foreground">Track donations and donor history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCSV}><Download className="w-4 h-4 mr-2" />Export CSV</Button>
          <Button variant="outline" onClick={exportPDF}><Download className="w-4 h-4 mr-2" />Export PDF</Button>
        </div>
      </div>
      {/* Donation Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Donation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {loading || !summary ? <Skeleton className="h-24 w-full" /> : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="text-lg font-semibold">Last Donation</div>
                <div className="text-2xl">₹{summary.lastDonation.amount}</div>
                <div className="text-muted-foreground text-sm">{summary.lastDonation.name} ({summary.lastDonation.date})</div>
              </div>
              <div>
                <div className="text-lg font-semibold">Total Donors</div>
                <div className="text-2xl">{summary.totalDonors}</div>
              </div>
              <div>
                <div className="text-lg font-semibold">Recurring Donors</div>
                <div className="text-2xl">{summary.recurringDonors}</div>
              </div>
              <div>
                <div className="text-lg font-semibold">Total Amount</div>
                <div className="text-2xl">₹{summary.totalAmount}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Donor Table */}
      <Card>
        <CardHeader>
          <CardTitle>Donor History</CardTitle>
          <CardDescription>All donations (search + pagination)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Search className="w-4 h-4 mr-2 text-muted-foreground" />
            <Input
              placeholder="Search donors by name, mode, or type..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="max-w-xs"
            />
          </div>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6}><Skeleton className="h-8 w-full" /></TableCell></TableRow>
                ) : paginatedDonors.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center">No donors found.</TableCell></TableRow>
                ) : paginatedDonors.map((donor, i) => (
                  <TableRow key={i}>
                    <TableCell>{donor.name}</TableCell>
                    <TableCell>₹{donor.amount}</TableCell>
                    <TableCell>{donor.date}</TableCell>
                    <TableCell>{donor.mode}</TableCell>
                    <TableCell>{donor.type}</TableCell>
                    <TableCell>{donor.notes || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Pagination */}
          <div className="flex justify-end items-center gap-2 mt-4">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
            <span className="text-sm">Page {page} of {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonorInfoTab; 