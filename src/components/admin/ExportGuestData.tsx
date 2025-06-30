import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { Guest } from '@/types/admin';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ExportGuestDataProps {
  guests: Guest[];
}

const ExportGuestData: React.FC<ExportGuestDataProps> = ({ guests }) => {
  const [exporting, setExporting] = useState(false);

  const exportToCSV = () => {
    setExporting(true);
    try {
      const csvData = guests.map(guest => ({
        'Guest ID': guest.id,
        'Name': guest.name,
        'Phone': guest.phone,
        'Arrival Date': new Date(guest.arrivalDate).toLocaleDateString(),
        'Departure Date': new Date(guest.departureDate).toLocaleDateString(),
        'Purpose': guest.purpose,
        'Group Type': guest.groupType,
        'Meal Required': guest.mealRequired ? 'Yes' : 'No',
        'Status': guest.status,
      }));

      const csv = Papa.unparse(csvData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `anandwan-guests-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    } finally {
      setExporting(false);
    }
  };

  const exportToPDF = () => {
    setExporting(true);
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text('Anandwan Guest Registrations', 14, 22);
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
      doc.text(`Total Guests: ${guests.length}`, 14, 42);

      // Prepare table data
      const tableData = guests.map(guest => [
        guest.id,
        guest.name,
        guest.phone,
        new Date(guest.arrivalDate).toLocaleDateString(),
        new Date(guest.departureDate).toLocaleDateString(),
        guest.purpose,
        guest.groupType,
        guest.mealRequired ? 'Yes' : 'No',
        guest.status,
      ]);

      // Add table
      (doc as any).autoTable({
        head: [['ID', 'Name', 'Phone', 'Arrival', 'Departure', 'Purpose', 'Type', 'Meals', 'Status']],
        body: tableData,
        startY: 50,
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      });

      // Save PDF
      doc.save(`anandwan-guests-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={exporting}>
          <Download className="w-4 h-4 mr-2" />
          {exporting ? 'Exporting...' : 'Export'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToCSV}>
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF}>
          <FileText className="w-4 h-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportGuestData; 