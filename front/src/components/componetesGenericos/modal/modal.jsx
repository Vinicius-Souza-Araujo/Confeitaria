import React from 'react'
import './modal.css'

function Modal({ isOpen, setModalOpen, children }) {
    if (isOpen) {
        return (
          <div className='backgroud'>
            
            <div className='estrutura_Modal'>
            <button className='botao' onClick={setModalOpen}>x</button>
              <div>{children}</div>
            </div>
          </div>
        )
      }
    
      return null
}

export default Modal