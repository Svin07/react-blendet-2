import { Overlay } from 'components/Overlay/Overlay.styled';
import { BeatLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <Overlay>
      <BeatLoader color="#36d7b7" />
    </Overlay>
  );
};
