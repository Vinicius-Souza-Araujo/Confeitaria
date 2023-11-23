import React, { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [], 
  totalValor: 0,
  frete: 0,
  metodoPagamento: ''

};

const cartReducer = (state, action) => {
  switch (action.type) {

      case 'ADD_TO_CART':
        const existingProductIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

        if (existingProductIndex !== -1) {
          // Produto já existe no carrinho
          const updatedCart = state.cartItems.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantidade: item.quantidade + 1, totalItem: (item.quantidade + 1) * item.valor }
              : item
          );

          const newTotalValor = updatedCart.reduce((total, item) => total + item.totalItem, 0);

          return {
            ...state,
            cartItems: updatedCart,
            totalValor: newTotalValor,
          };
        } else {
          // Produto ainda não está no carrinho
          return {
            ...state,
            cartItems: [
              ...state.cartItems,
              { ...action.payload, quantidade: 1, totalItem: action.payload.valor },
            ],
            totalValor: state.totalValor + action.payload.valor,
          };
        }


          case 'REMOVE_FROM_CART':
              const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

              if (itemIndex !== -1) {
                const updatedCart = [...state.cartItems];
                const removedItem = updatedCart.splice(itemIndex, 1)[0];

                const novoValor = state.totalValor - removedItem.totalItem;

                return {
                  ...state,
                  cartItems: updatedCart,
                  totalValor: novoValor,
                };
              } else {
                return state; 
              }

          case 'CLEAR_CART':
            console.log('Clearing cart...');
            return {
              ...state,
              cartItems: [],
              totalValor: 0,
              frete: 0,
            };

          case 'CALCULAR_FRETE':
            return {
              ...state,
              frete: action.payload,
            };
          
           case 'SET_METODO_PAGAMENTO':
              return {
                ...state,
                metodoPagamento: action.payload,
              };

          default:
            return state;
        }
};


const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cartItems: [], totalValor: 0 });
 
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: savedCart });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const { cartState, dispatch } = useContext(CartContext);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  if (!cartState) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return { cartState, dispatch, clearCart };
};



export { CartProvider, useCart };