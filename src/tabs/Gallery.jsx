import { Component, useEffect, useState } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState({ src: '', alt: '' });
  const [isOpenModal, setIsOpenModal] = useState(false);

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
    setIsLoading(true);
    ImageService.getImages(query, page)
      .then(({ photos, total_results }) => {
        if (photos.length === 0) {
          setIsEmpty(true);
          return;
        }

        setImages(prevState => [...prevState, ...photos]);
        setIsLoadMore(page < Math.ceil(total_results / 15));
      })
      .catch(error => setError(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const onBtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = ({ src, alt }) => {
    setModalImage({ src, alt });
    setIsOpenModal(prev => !prev);
  };

  const closeModal = () => {
    setIsOpenModal(prev => !prev);
  };

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      <Grid>
        {images.map(image => {
          return (
            <GridItem key={image.id}>
              <CardItem color={image.avg_color}>
                <img
                  src={image.src.large}
                  alt={image.alt}
                  onClick={() => {
                    openModal({ src: image.src.large, alt: image.alt });
                  }}
                />
              </CardItem>
            </GridItem>
          );
        })}
      </Grid>
      {isOpenModal && <Modal {...modalImage} closeModal={closeModal} />}
      {isLoading && <Loader />}
      {isLoadMore && (
        <Button type="button" onClick={onBtnClick}>
          Load more
        </Button>
      )}
      {error && <Text textAlign="center">Sorry. {error} 😭</Text>}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
    </>
  );
};
