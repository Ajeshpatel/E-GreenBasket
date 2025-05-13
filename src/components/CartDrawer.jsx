import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const CartDrawer = ({ isOpen, onClose }) => {
  const { 
    cart, 
    cartCount, 
    cartTotal, 
    removeFromCart, 
    updateQuantity,
    clearCart 
  } = useCart()

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Your Cart ({cartCount})</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Your cart is empty</p>
                <Link 
                  to="/shop" 
                  onClick={onClose}
                  className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <ul className="divide-y">
                {cart.map(item => (
                  <li key={item.id} className="py-4">
                    <div className="flex">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            <Link to={`/product/${item.id}`} onClick={onClose}>
                              {item.name}
                            </Link>
                          </h3>
                          <p className="ml-4 text-sm font-medium">₹{Number(item.price).toFixed(2)}
</p>
                        </div>
                        
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 border rounded-l-md"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 border rounded-r-md"
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between text-lg font-medium mb-4">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={clearCart}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
                >
                  Clear Cart
                </button>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-center"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartDrawer