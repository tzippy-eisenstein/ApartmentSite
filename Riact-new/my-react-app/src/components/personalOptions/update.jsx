import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Update = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: '',
        aditionPhone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // כאן תוכל להוסיף את הלוגיקה לשמירת הפרטים במסד הנתונים
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
            />
            <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
            />
            <TextField
                id="phone"
                name="phone"
                label="Phone"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.phone}
                onChange={handleChange}
            />
            <TextField
                id="aditionPhone"
                name="aditionPhone"
                label="Additional Phone"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.aditionPhone}
                onChange={handleChange}
            />
            <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: '#AF8C53', color: 'black', width: '100%', marginTop: '20px' }}
            >
                Update Details
            </Button>
        </form>
    );
};
