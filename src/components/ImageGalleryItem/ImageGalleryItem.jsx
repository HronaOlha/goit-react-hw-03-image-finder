import { Item, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL }) => (
  <Item>
    <Img src={webformatURL} alt={webformatURL} />
  </Item>
);
