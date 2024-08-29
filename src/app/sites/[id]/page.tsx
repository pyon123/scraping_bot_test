'use client';

import { CircularProgress, Stack, Typography } from '@mui/material';
import { useGetSiteQuery } from '@/redux/apis/sitesApi';

interface IPage {
  params: {
    id: string;
  };
}

export default function SitePage({ params: { id } }: IPage) {
  const { data, isLoading } = useGetSiteQuery({ id });

  return (
    <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h3">Site Detail</Typography>
      {isLoading ? (
        <CircularProgress size={30} />
      ) : !data ? (
        <Typography variant="h5">No Data</Typography>
      ) : (
        <Stack sx={{ width: '100%', maxWidth: '800px', mt: 5 }} spacing={1}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography fontSize={20} color="gray" variant="h6">
              Url:
            </Typography>
            <Typography fontSize={20} variant="body1">
              {data.url}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography fontSize={20} color="gray" variant="h6">
              Base Url:
            </Typography>
            <Typography fontSize={20} variant="body1">
              {data.baseUrl}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography fontSize={20} color="gray" variant="h6">
              Title:
            </Typography>
            <Typography fontSize={20} variant="body1">
              {data.title}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography fontSize={20} color="gray" variant="h6">
              Type:
            </Typography>
            <Typography fontSize={20} variant="body1">
              {data.type}
            </Typography>
          </Stack>
          {data.youtube ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography fontSize={20} color="gray" variant="h6">
                Youtube Type:
              </Typography>
              <Typography fontSize={20} variant="body1">
                {data.youtube.type}
              </Typography>
            </Stack>
          ) : undefined}
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography fontSize={20} color="gray" variant="h6">
              Searched:
            </Typography>
            <Typography fontSize={20} variant="body1">
              {data.contentChecked ? 'Yes' : 'No'}
            </Typography>
          </Stack>

          {data.contentChecked ? (
            data.data ? (
              <>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography fontSize={20} color="gray" variant="h6">
                    Category:
                  </Typography>
                  <Typography fontSize={20} variant="body1">
                    {data.data.category}
                  </Typography>
                </Stack>
                {data.data.eduCategories ? (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography fontSize={20} color="gray" variant="h6">
                      Education Categories:
                    </Typography>
                    <Typography fontSize={20} variant="body1">
                      {data.data.eduCategories.join(', ')}
                    </Typography>
                  </Stack>
                ) : (
                  <></>
                )}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography fontSize={20} color="gray" variant="h6">
                    Min Age:
                  </Typography>
                  <Typography fontSize={20} variant="body1">
                    {data.data.minAge}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography fontSize={20} color="gray" variant="h6">
                    Nudity:
                  </Typography>
                  <Typography fontSize={20} variant="body1">
                    {data.data.nudity ? 'Yes' : 'No'}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography fontSize={20} color="gray" variant="h6">
                    Sexuality:
                  </Typography>
                  <Typography fontSize={20} variant="body1">
                    {data.data.sexuality ? 'Yes' : 'No'}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography fontSize={20} color="gray" variant="h6">
                    Religion:
                  </Typography>
                  <Typography fontSize={20} variant="body1">
                    {data.data.religion ? 'Yes' : 'No'}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography fontSize={20} color="gray" variant="h6">
                    Violence:
                  </Typography>
                  <Typography fontSize={20} variant="body1">
                    {data.data.violence ? 'Yes' : 'No'}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography fontSize={20} color="gray" variant="h6">
                    Political:
                  </Typography>
                  <Typography fontSize={20} variant="body1">
                    {data.data.political ? 'Yes' : 'No'}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography fontSize={20} color="gray" variant="h6">
                    Drug:
                  </Typography>
                  <Typography fontSize={20} variant="body1">
                    {data.data.drug ? 'Yes' : 'No'}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography fontSize={20} color="gray" variant="h6">
                    Alcohol:
                  </Typography>
                  <Typography fontSize={20} variant="body1">
                    {data.data.alcohol ? 'Yes' : 'No'}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography fontSize={20} color="gray" variant="h6">
                    Gambling:
                  </Typography>
                  <Typography fontSize={20} variant="body1">
                    {data.data.gambling ? 'Yes' : 'No'}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography fontSize={20} color="gray" variant="h6">
                    Bidding:
                  </Typography>
                  <Typography fontSize={20} variant="body1">
                    {data.data.bidding ? 'Yes' : 'No'}
                  </Typography>
                </Stack>
              </>
            ) : (
              <Typography fontSize={20} color="gray" variant="h6">
                Can not find any content here
              </Typography>
            )
          ) : (
            <></>
          )}

          {data.note ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography fontSize={20} color="gray" variant="h6">
                Note:
              </Typography>
              <Typography fontSize={20} variant="body1">
                {data.note}
              </Typography>
            </Stack>
          ) : undefined}
        </Stack>
      )}
    </Stack>
  );
}
