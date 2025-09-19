import { Autocomplete, Avatar, Box, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type Country = {
  code: string;
  label: string;
  phone: string;
};

const countries: readonly Country[] = [
  { code: 'IN', label: 'India', phone: '91' },
  { code: 'US', label: 'United States', phone: '1' },
  { code: 'FR', label: 'France', phone: '33' },
  { code: 'DE', label: 'Germany', phone: '49' },
  { code: 'JP', label: 'Japan', phone: '81' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'CA', label: 'Canada', phone: '1' },
  // Add more as needed
];

const countryToFlag = (isoCode: string) =>
  typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;

function Contact() {
  const [, setValue] = useState<Country | null>(null);
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1">
        Welcome to our company! We are dedicated to providing the best services and solutions to our
        customers. Our team of experts is passionate about what we do, and we strive to make a
        positive impact in everything we create.
      </Typography>
      <Typography variant="body1">
        Our mission is to innovate and deliver high-quality products that meet the needs of our
        clients. We believe in collaboration, creativity, and continuous improvement.
      </Typography>

      <Autocomplete
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        onChange={(_, newValue) => setValue(newValue)}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Avatar sx={{ width: 24, height: 24, mr: 1 }}>{countryToFlag(option.code)}</Avatar>
            {option.label} ({option.code}) +{option.phone}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autofill
            }}
          />
        )}
        sx={{ width: 300 }}
      />
    </Container>
  );
}

export default Contact;
