import React, { useState, useEffect } from 'react';

type Tour = {
  id: string;
  image: string;
  title: string;
  description: string;
  place: string;
  days: number;
  price: number;
  maxPeople: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (tour: Tour) => void;
  editData?: Tour | null;
};

const TourFormModal: React.FC<Props> = ({ open, onClose, onSave, editData }) => {
  const [formData, setFormData] = useState<Tour>({
    id: '',
    image: '',
    title: '',
    description: '',
    place: '',
    days: 1,
    price: 0,
    maxPeople: 1,
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        id: Math.random().toString(36).substr(2, 9),
        image: '',
        title: '',
        description: '',
        place: '',
        days: 1,
        price: 0,
        maxPeople: 1,
      });
    }
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div style={modalStyle}>
      <div style={boxStyle}>
        <h2>{editData ? 'Edit Tour' : 'Add New Tour'}</h2>
        {["image", "title", "description", "place"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            style={inputStyle}
          />
        ))}
        {["days", "price", "maxPeople"].map((field) => (
          <input
            key={field}
            name={field}
            type="number"
            placeholder={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            style={inputStyle}
          />
        ))}
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

const modalStyle = {
  position: 'fixed' as 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const boxStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column' as 'column',
  gap: '10px',
  width: '400px',
};

const inputStyle = {
  padding: '8px',
  fontSize: '14px',
};

export default TourFormModal;
