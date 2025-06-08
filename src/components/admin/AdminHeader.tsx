
import React from 'react';
import { X } from 'lucide-react';

interface AdminHeaderProps {
  onClose: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">ChapaMarket Admin Dashboard</h2>
      <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
        <X className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
};

export default AdminHeader;
