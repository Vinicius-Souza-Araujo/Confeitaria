import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [], 
  totalValor: 0, 
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const produtoExistente = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (produtoExistente !== -1) {
        const updateItem = [...state.cartItems];
        updateItem[produtoExistente].quantidade += 1; // Incrementa a quantidade
          state.totalValor += updateItem[produtoExistente].valor;
          return {
            ...state,
            cartItems: updateItem,
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, { ...action.payload, quantidade: 1 }], // Inicializa a quantidade como 1
            totalValor: state.totalValor + action.payload.valor,
          };
        }

    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
        totalValor: 0,
      };
    default:
      return state;
  }
};



export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cartState, dispatch, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
