import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { Bid } from '@ui/types';
import { dateStringToFormat } from '@ui/utils';
import { format } from 'date-fns';

interface BiddingFormProps {
  bid?: Bid;
  onChange: (newBid: Bid) => void;
}

export const BiddingForm = (props: BiddingFormProps) => {
  const getStringDate = () => {
    if (props.bid?.receivingDate) {
      return dateStringToFormat(props.bid?.receivingDate, 'yyyy-MM-dd');
    }

    return format(Date.now(), 'yyyy-MM-dd');
  };
  const handleOnChange = ($event: React.SyntheticEvent<Element, Event>) => {
    if ($event.target instanceof HTMLInputElement) {
      const { name, value } = $event.target;

      if (name === 'value') {
        props.onChange({ ...props.bid, value: parseInt(value) } as Bid);
      }

      if (name === 'receivingDate') {
        props.onChange({ ...props.bid, receivingDate: value } as Bid);
      }
    }
  };

  return (
    <FormGroup>
      <FormControl>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <span>{"Please don't give this to me"}</span>
          <span>{"I can't live without this"}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <RadioGroup
            aria-labelledby="want-radio-group-label"
            row
            name="value"
            value={props.bid?.value ?? 5}
            onChange={handleOnChange}>
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
        </div>
        <br />
        <FormControl sx={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <FormControlLabel
            control={
              <TextField
                name="receivingDate"
                type="date"
                value={getStringDate()}
                sx={{ marginLeft: '5px' }}
              />
            }
            label="Choose available date"
            labelPlacement="start"
            onChange={handleOnChange}
          />
        </FormControl>
      </FormControl>
      <br />
    </FormGroup>
  );
};
