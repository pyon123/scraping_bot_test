'use client';

import { useAddSiteMutation, useGetSitesQuery } from '@/redux/apis/sitesApi';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
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
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function SitesPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [openModal, setOpenModal] = useState(false);
  const [site, setSite] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [requireSubSearch, setRequireSubSearch] = useState(false);

  const { data: sites = [], isLoading: pageLoading } = useGetSitesQuery();
  const [addSite, { isLoading: isSubmitting }] = useAddSiteMutation();

  const onAddSite = async () => {
    setError('');

    if (!site) {
      setError('Please add site first');
      return;
    }

    try {
      await addSite({ site, requireSubSearch, note }).unwrap();

      enqueueSnackbar('Site added', {
        variant: 'success',
      });

      setOpenModal(false);
      setSite('');
      setNote('');
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
            setNote('');
            setOpenModal(true);
            setRequireSubSearch(false);
          }}
        >
          Add Site
        </Button>
      </Stack>

      <Stack sx={{ width: '100%', overflowX: 'auto' }} spacing={2}>
        {pageLoading ? (
          <CircularProgress size={30} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>URL</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Youtube Type</TableCell>
                <TableCell>Searched</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Edu. Category</TableCell>
                <TableCell>Min Age</TableCell>
                <TableCell>Nudity</TableCell>
                <TableCell>Sexuality</TableCell>
                <TableCell>Violence</TableCell>
                <TableCell>Political</TableCell>
                <TableCell>Drug</TableCell>
                <TableCell>Alcohol</TableCell>
                <TableCell>Gambling</TableCell>
                <TableCell>Bidding</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sites.map(({ _id, url, type, title, youtube, contentChecked, data }) => (
                <TableRow key={String(_id)}>
                  <TableCell sx={{ display: 'block', width: '200px', wordBreak: 'break-all' }}>
                    <Link href={`/sites/${_id}`} target="__blank">
                      {url}
                    </Link>
                  </TableCell>
                  <TableCell sx={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <Link href={`/sites/${_id}`} target="__blank">
                      {title ? title : '--'}
                    </Link>
                  </TableCell>
                  <TableCell>{type}</TableCell>
                  <TableCell>{youtube ? youtube.type : '--'}</TableCell>
                  <TableCell>{contentChecked ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{data ? data.category : '--'}</TableCell>
                  <TableCell>{data ? data.eduCategories?.join(',') : '--'}</TableCell>
                  <TableCell>{data ? data.minAge : '--'}</TableCell>
                  <TableCell>{data ? (data.nudity ? 'Yes' : 'No') : '--'}</TableCell>
                  <TableCell>{data ? (data.sexuality ? 'Yes' : 'No') : '--'}</TableCell>
                  <TableCell>{data ? (data.violence ? 'Yes' : 'No') : '--'}</TableCell>
                  <TableCell>{data ? (data.political ? 'Yes' : 'No') : '--'}</TableCell>
                  <TableCell>{data ? (data.drug ? 'Yes' : 'No') : '--'}</TableCell>
                  <TableCell>{data ? (data.alcohol ? 'Yes' : 'No') : '--'}</TableCell>
                  <TableCell>{data ? (data.gambling ? 'Yes' : 'No') : '--'}</TableCell>
                  <TableCell>{data ? (data.bidding ? 'Yes' : 'No') : '--'}</TableCell>
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
          <TextField
            sx={{ mt: 2 }}
            value={note}
            variant="outlined"
            onChange={({ target }) => {
              setNote(target.value);
            }}
            fullWidth
            error={!!error}
            helperText={error}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={requireSubSearch}
                defaultChecked={false}
                onChange={({ target }) => setRequireSubSearch(target.checked)}
              />
            }
            label="Require sub url search"
            sx={{
              width: '100%',
              mt: 2,
            }}
          />

          <LoadingButton sx={{ mt: 4 }} variant="contained" onClick={onAddSite} fullWidth loading={isSubmitting}>
            Add
          </LoadingButton>
        </Stack>
      </Modal>
    </Stack>
  );
}
