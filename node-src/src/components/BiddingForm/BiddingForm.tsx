import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';

interface Form {
  itemId: string;
  bid: number | null;
  date: string | null;
}

interface BiddingFormProps {
  form: Form;
  onSubmit: (form: Form) => void;
}

export const BiddingForm = (props: BiddingFormProps) => {
  const [formData, setFormData] = useState<Form>({
    itemId: props.form.itemId,
    bid: props.form.bid,
    date: props.form.date ?? format(new Date(), 'yyyy-MM-dd')
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.onSubmit(formData);
  };

  const handleDateChange = ($event: React.SyntheticEvent<Element, Event>) => {
    const event = $event as React.ChangeEvent<HTMLInputElement>;
    const { value } = event.target;
    setFormData({ ...formData, date: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <span>{"Please don't give this to me"}</span>
            <span>{"I can't live without this"}</span>
          </div>
          <RadioGroup
            aria-labelledby="want-radio-group-label"
            row
            name="userBid"
            value={formData.bid}
            onChange={(e) => setFormData({ ...formData, bid: parseInt(e.target.value) })}>
            <FormControlLabel value={0} control={<Radio />} label="0" labelPlacement="top" />
            <FormControlLabel value={1} control={<Radio />} label="1" labelPlacement="top" />
            <FormControlLabel value={2} control={<Radio />} label="2" labelPlacement="top" />
            <FormControlLabel value={3} control={<Radio />} label="3" labelPlacement="top" />
            <FormControlLabel value={4} control={<Radio />} label="4" labelPlacement="top" />
            <FormControlLabel value={5} control={<Radio />} label="5" labelPlacement="top" />
            <FormControlLabel value={6} control={<Radio />} label="6" labelPlacement="top" />
            <FormControlLabel value={7} control={<Radio />} label="7" labelPlacement="top" />
            <FormControlLabel value={8} control={<Radio />} label="8" labelPlacement="top" />
            <FormControlLabel value={9} control={<Radio />} label="9" labelPlacement="top" />
            <FormControlLabel value={10} control={<Radio />} label="10" labelPlacement="top" />
          </RadioGroup>
          <br />
          <FormControl sx={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <FormControlLabel
              control={
                <TextField
                  name="receivingDate"
                  type="date"
                  value={formData.date}
                  sx={{ marginLeft: '5px' }}
                />
              }
              label="Choose receiving date"
              labelPlacement="start"
              onChange={($event) => handleDateChange($event)}
            />
          </FormControl>
        </FormControl>
        <br />
      </FormGroup>
      <Button type="submit" variant="contained" color="primary" style={{ float: 'right' }}>
        Submit
      </Button>
    </form>
  );
};
