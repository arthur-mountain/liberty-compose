import React, { useState, useEffect, useRef, useCallback, startTransition } from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import style from './Carousel.style';

type Props = {
  children?: React.ReactNode;
}

const fakeData = [{ title: 'carousel1', desc: 'I am 1' }, { title: 'carousel2', desc: 'I am 2' }, { title: 'carousel3', desc: 'I am 3' }, { title: 'carousel4', desc: 'I am 4' }, { title: 'carousel5', desc: 'I am 5' }, { title: 'carousel6', desc: 'I am 6' },];
const CARD_WIDTH = 278;
const MAX_LENGTH = 10;

// Also can use react event onDrag, onDragOver...etc
const Carousel = (_props: Props) => {
  const isInit = useRef<number>(0);
  const ordersEl = useRef<HTMLUListElement>(null);
  const cardsEl = useRef<HTMLUListElement>(null);
  const arrowMoveIdx = useRef<number>(0);
  const [data, setData] = useState(fakeData);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [dragItemIdx, setDragItemIdx] = useState<number>(null);
  const dataLength = data.length;
  const lastIdx = dataLength - 1;
  const cancelDefault = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleEdit = (e, clickedIdx) => {
    cancelDefault(e);
    setActiveIdx(clickedIdx);
  };
  const handleDelete = (e, clickedIdx) => {
    cancelDefault(e);
    if (dataLength === 1) return;
    setData(prevData => prevData.filter((_, idx) => idx !== clickedIdx))
  }
  const handleAppend = (e) => {
    cancelDefault(e);
    if (dataLength === MAX_LENGTH) return;
    setData(prevData => {
      const text = prevData.length + 1;
      return [...prevData, { title: `carousel-${text}`, desc: `I am ${text}` }]
    })
  }
  const handlePrev = debounce(() => {
    const newIdx = activeIdx - arrowMoveIdx.current;
    if (newIdx <= 0) {
      setActiveIdx(0);
    } else {
      setActiveIdx(newIdx);
    }
  }, 200);
  const handleNext = debounce(() => {
    const newIdx = activeIdx + arrowMoveIdx.current;
    if (newIdx >= lastIdx) {
      setActiveIdx(lastIdx);
    } else {
      setActiveIdx(newIdx);
    }
  }, 200);
  function debounce(fn, delay) {
    let timer;
    return (e) => {
      cancelDefault(e);
      arrowMoveIdx.current++;
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        fn();
        arrowMoveIdx.current = 0;
      }, delay);
    }
  }

  useEffect(() => {
    if (isInit.current) {
      const element = cardsEl.current.children[activeIdx] as HTMLLIElement;
      const scrollBuffer = (cardsEl.current.clientWidth / 2) - (CARD_WIDTH / 2);

      cardsEl.current.scrollLeft = element.offsetLeft - scrollBuffer;
    };
  }, [activeIdx]);

  useEffect(() => {
    if (isInit.current) return;
    // const throttle = (fn, delay) => {
    //   let timer;
    //   return (e) => {
    //     cancelDefault(e);
    //     if (timer) return;
    //     timer = setTimeout(() => {
    //       fn(e);
    //       timer = null;
    //     }, delay);
    //   }
    // }
    const getDatasetIdx = (el) => {
      if (el === ordersEl.current) return lastIdx;

      if (el.dataset.idx) return el.dataset.idx;

      return getDatasetIdx(el.parentElement);
    };

    const handleDrag = (e) => {
      const dragItemIdx = +e.target.dataset.idx;
      setDragItemIdx(dragItemIdx);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', dragItemIdx);
    };
    const handleDrop = (e) => {
      setDragItemIdx(null);
      const oldIdx = +e.dataTransfer.getData('text/plain');
      const newIdx = +getDatasetIdx(e.target);

      setData(prevData => {
        const tmp = [...prevData];
        const target = tmp.splice(oldIdx, 1)[0];
        tmp.splice(newIdx, 0, target);

        return tmp;
      });
      startTransition(() => setActiveIdx(newIdx));
    }
    // const handleDragOver = throttle((e) => {
    //   const newIdx = +getDatasetIdx(e.target);

    //   console.log("🚀 ~ file: Carousel.tsx ~ line 132 ~ handleDragOver ~ e", e);
    // }, 500)

    ordersEl.current.addEventListener('dragstart', handleDrag);
    ordersEl.current.addEventListener('drop', handleDrop);
    ordersEl.current.addEventListener('dragenter', cancelDefault);
    ordersEl.current.addEventListener('dragover', cancelDefault);
    // ordersEl.current.addEventListener('dragover', handleDragOver);
    isInit.current = 1;

    return () => {
      ordersEl.current.removeEventListener('dragstart', handleDrag);
      ordersEl.current.removeEventListener('drop', handleDrop);
      ordersEl.current.removeEventListener('dragenter', cancelDefault);
      ordersEl.current.removeEventListener('dragover', cancelDefault);
      // ordersEl.current.removeEventListener('dragover', handleDragOver);
      isInit.current = 0;
    };
  }, []);

  return (
    <section className="carousel__container">
      <ul className={`carousel__orders ${dragItemIdx !== null ? 'dragging' : ''}`} ref={ordersEl}>
        {data.map((_item, idx) => (
          <li
            key={`__order__${idx}`}
            className={`carousel__orders__order ${dragItemIdx === idx ? 'carousel__orders__order--dragging' : ''}`}
            draggable
            data-idx={idx}
          >
            <button type="button" className={`${activeIdx === idx ? 'active' : ''}`} onClick={(e) => handleEdit(e, idx)}>
              <InsertDriveFileIcon sx={{ color: '#876574' }} />
              <span>{idx + 1}</span>
            </button>
          </li>
        ))}
        <li>
          <Button type="button" variant='outlined' onClick={handleAppend} disabled={dataLength === MAX_LENGTH}>
            Append {dataLength}/10
          </Button>
        </li>
      </ul>
      <div style={{ position: 'relative' }}>
        <ul className="carousel__cards" ref={cardsEl}>
          {data.map((item, idx) => (
            <li key={`__card__${idx}`}>
              <CloseIcon sx={{ width: '100%', mb: 2 }} onClick={(e) => handleDelete(e, idx)} />
              <div
                className={`carousel__cards__card ${activeIdx === idx ? 'carousel__cards__card--active' : ''}`}
                style={{ minWidth: CARD_WIDTH }}
                onClick={(e) => handleEdit(e, idx)}
              >
                <div style={{ padding: '5rem 0' }}>{item.title}</div>
                <div style={{ padding: '5rem 0' }}>{item.desc}</div>
              </div>
            </li>
          ))}
        </ul>
        <Button type="button" sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }} onClick={handlePrev} disabled={activeIdx === 0} >
          <ArrowCircleLeftIcon />
        </Button>
        <Button type="button" sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }} onClick={handleNext} disabled={activeIdx === lastIdx} >
          <ArrowCircleRightIcon />
        </Button>
      </div>
      <div style={{ height: 500 }} />
      <style jsx>{style}</style>
    </section >
  )
}

export default Carousel