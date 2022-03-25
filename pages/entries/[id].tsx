import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  RadioGroup,
  TextField,
  Radio,
  capitalize,
  IconButton,
} from '@mui/material';

import { dbEntry } from '../../database';
import { Layout } from '../../components/layout';
import { EntriesContext } from '../../context/entries';
import { EntryStatus, Entry } from '../../interfaces';

import SaveOutlined from '@mui/icons-material/SaveOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import { dateFunctions } from '../../utils';

interface Props {
  entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

  const [touched, setTouched] = useState(false);
  const { updateEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;

    const updateEntryObject: Entry = {
      ...entry,
      status: status,
      description: inputValue,
    };

    updateEntry(updateEntryObject, true);
  };

  return (
    <Layout title={`${inputValue.substring(0, 10)} ...`}>
      <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Title ${inputValue}`}
              subheader={'Hace ' + dateFunctions.getFormatDistanceToNow(entry.createdAt)}
            ></CardHeader>
            <CardContent>
              <TextField
                multiline
                fullWidth
                autoFocus={true}
                helperText={isNotValid && 'Ingrese un valor'}
                onBlur={() => setTouched(true)}
                value={inputValue}
                onChange={onTextChanged}
                placeholder='Nueva entrada'
                sx={{ marginTop: 2, marginBottom: 1 }}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado: </FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map(status => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlined />}
                variant='contained'
                fullWidth
                onClick={onSave}
                disabled={inputValue.length === 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'red',
        }}
      >
        <DeleteOutlined />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntry(id);
  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
