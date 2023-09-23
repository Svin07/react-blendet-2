import { Component, useEffect, useState } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setIsEmpty(false);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    ImageService.getImages(query, page).then(({ photos, total_results }) => {
      if (photos.length === 0) {
        setIsEmpty(true);
        return;
      }

      setImages(prevState => [...prevState, ...photos]);
      setIsLoadMore(page < Math.ceil(total_results / 15));
    });
  }, [query, page]);

  const onBtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      <Grid>
        {images.map(image => {
          return (
            <GridItem key={image.id}>
              <CardItem color={image.avg_color}>
                <img src={image.src.large} alt={image.alt} />
              </CardItem>
            </GridItem>
          );
        })}
      </Grid>
      {isLoadMore && (
        <Button type="button" onClick={onBtnClick}>
          Load more
        </Button>
      )}
    </>
  );
};
