import { CSSTransition } from 'react-transition-group';
import { getImages } from './service/API';
import { useState, useEffect, useRef } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import '../index.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImgUrl, setLargeImgUrl] = useState('');
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    getImages(query, page)
      .then(({ hits, total, totalHits }) => {
        if (hits.length === 0) {
          setIsEmpty(true);
          return;
        }
        setImages(prevState => [...prevState, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 12));
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const onFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setLargeImgUrl('');
    setPage(1);
    setShowBtn(false);
    setError(null);
    setIsEmpty(false);
    setIsLoading(false);
  };
  const onBtnClick = () => {
    setPage(prevState => prevState + 1);
  };
  const onImageClick = largeImg => {
    setLargeImgUrl(largeImg);
    setIsModalOpen(true);
  };

  const nodeRef = useRef(null);
  return (
    <>
      <Searchbar onFormSubmit={onFormSubmit} />
      {isEmpty && <p>Nothing find for this {query}.</p>}
      {error && <p>Something wrong! {error}</p>}
      {isLoading && <Loader />}
      {images?.length > 0 && (
        <ImageGallery photos={images} onImageClick={onImageClick} />
      )}

      {showBtn && <Button onBtnClick={onBtnClick} />}

      <CSSTransition
        nodeRef={nodeRef}
        in={isModalOpen}
        timeout={2500}
        classNames="alert"
        unmountOnExit
      >
        <Modal
          nodeRef={nodeRef}
          largeImgUrl={largeImgUrl}
          onImageClick={onImageClick}
          setIsModalOpen={setIsModalOpen} />
      </CSSTransition>
    </>
  );
}
