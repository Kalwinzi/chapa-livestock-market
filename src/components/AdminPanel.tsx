
import React from 'react';
import EnhancedAdminPanel from './admin/EnhancedAdminPanel';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  return <EnhancedAdminPanel isOpen={isOpen} onClose={onClose} />;
};

export default AdminPanel;
