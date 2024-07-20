'use client';

import { useAddSiteMutation, useGetSitesQuery } from '@/redux/apis/sitesApi';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Checkbox,
  CircularProgress,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function SitesPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [openModal, setOpenModal] = useState(false);
  const [site, setSite] = useState('');
  const [error, setError] = useState('');

  const { data: sites = [], isLoading: pageLoading } = useGetSitesQuery();
  const [addSite, { isLoading: isSubmitting }] = useAddSiteMutation();

  const onAddSite = async () => {
    setError('');

    if (!site) {
      setError('Please add site first');
      return;
    }

    try {
      await addSite({ site }).unwrap();

      enqueueSnackbar('Site added', {
        variant: 'success',
      });

      setOpenModal(false);
      setSite('');
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message || 'Error, try again later', {
        variant: 'error',
      });
    }
  };

  return (
    <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h3">Site list</Typography>

      <Stack sx={{ p: 2, width: '100%' }} direction="row-reverse">
        <Button
          variant="contained"
          onClick={() => {
            setSite('');
            setOpenModal(true);
          }}
        >
          Add Site
        </Button>
      </Stack>

      <Stack sx={{ width: '100%', maxWidth: '1024px' }} spacing={2}>
        {pageLoading ? (
          <CircularProgress size={30} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>URL</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Searched</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Min Age</TableCell>
                <TableCell>Nudity</TableCell>
                <TableCell>Sexuality</TableCell>
                <TableCell>Violence</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sites.map(({ _id, url, type, contentChecked, data }) => (
                <TableRow key={String(_id)}>
                  <TableCell>{url}</TableCell>
                  <TableCell>{type}</TableCell>
                  <TableCell>
                    <Checkbox checked={contentChecked} disabled />
                  </TableCell>
                  <TableCell>{data ? data.category : '--'}</TableCell>
                  <TableCell>{data ? data.minAge : '--'}</TableCell>
                  <TableCell>{data ? <Checkbox checked={data.nudity} disabled /> : '--'}</TableCell>
                  <TableCell>{data ? <Checkbox checked={data.sexuality} disabled /> : '--'}</TableCell>
                  <TableCell>{data ? <Checkbox checked={data.violence} disabled /> : '--'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Stack>

      <Modal
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Stack sx={{ background: 'white', borderRadius: 2, width: '600px', padding: 3, alignItems: 'center' }}>
          <Typography variant="h4">Add your site</Typography>
          <TextField
            sx={{ mt: 2 }}
            value={site}
            variant="outlined"
            onChange={({ target }) => {
              setError('');
              setSite(target.value);
            }}
            fullWidth
            placeholder="https://example.com"
            error={!!error}
            helperText={error}
          />
          <LoadingButton sx={{ mt: 4 }} variant="contained" onClick={onAddSite} fullWidth loading={isSubmitting}>
            Add
          </LoadingButton>
        </Stack>
      </Modal>
    </Stack>
  );
}
