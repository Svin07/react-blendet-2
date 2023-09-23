import { Component, useState } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const onSubmit = query => {
    setQuery(query);
  };
  console.log(query);
  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      <Text textAlign="center">Sorry. There are no images ... 😭</Text>
    </>
  );
};
