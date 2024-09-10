import { FetchResponse } from "./types";

const PHOTO_GRAPHQL_FIELDS = `
  sys {
    id
  }
  id
  slug
  location
  date
  description
  image {
    sys {
      id
    }
    url
  }
`;

async function fetchGraphQL (query: string, preview = false): Promise<FetchResponse> {
  return fetch (
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["photos"] },
    }
  ).then((response) => response.json());
}

function extractPhotoEntries(fetchResponse: FetchResponse) {
  return fetchResponse?.data?.photoCollection?.items;
}

export async function getAllPhotos(isDraftMode = false) {
  const photos = await fetchGraphQL(
    `query {
        photoCollection(where:{slug_exists: true}, order: date_DESC, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${PHOTO_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return extractPhotoEntries(photos);
}

export async function getPhoto(
  id: number,
  isDraftMode = false
) {
  const photos = await fetchGraphQL(
    `query {
        photoCollection(where:{id: ${id}}, limit: 1, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${PHOTO_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return extractPhotoEntries(photos)[0];
}