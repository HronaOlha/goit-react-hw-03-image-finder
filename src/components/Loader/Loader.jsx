import { LineWave } from 'react-loader-spinner';
import { LoaderIcon } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderIcon>
      <LineWave
        height="100"
        width="100"
        color="#6200ff"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </LoaderIcon>
  );
};
