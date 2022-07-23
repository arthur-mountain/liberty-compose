import css from 'styled-jsx/css';

export default css`
.carousel{
  &__container{
    max-width:768px;
    height: 600px;
    overflow-y: scroll;
  }

  &__orders{
    display: flex;
    align-items: center;
    margin-bottom: 2rem;

    &.dragging{
      opacity: 0.5;
    }

    &__order{
      padding-right: 0.5rem;
      
      &--dragging{
        opacity:1;
        /* border:1px solid #123553;
        color: transparent;
        background: transparent; */
      }
      
      button{
        display: flex;
        align-items: center;
        
        &.active{
          border-bottom: 2px solid #223234;
        }
      }
    }
  };
  
  &__cards{
    display: flex;
    align-items: center;
    gap: 0 1rem;
    overflow-x: scroll;
    scroll-behavior: smooth;

    &__card{
      text-align: center;
      border:1px dashed #000;
      opacity: 0.5;

      &--active{
        opacity: 1;
      }
    }
  }
};
`