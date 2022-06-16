import { CartIcon } from "../../icons";
import React from "react";

function CardMenu({ title, src, onAdd }) {
  return (
    <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 mt-3">
      <div className="px-4 py-2">
        <h1 className="text-3md text-center font-bold text-gray-800 uppercase dark:text-white">
          {title}
        </h1>
      </div>
      <img className="object-cover w-full h-32 mt-2" src={src} />
      <div className="flex items-center justify-between px-4 py-2 dark:bg-gray-900">
        <h1 className="text-xs font-bold dark:text-white">Rp. 20.000</h1>
        <button
          onClick={() => onAdd()}
          title="Tambah ke Cart"
          className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-purple-600 rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
        >
          <CartIcon className="w-4 h-4 text-white " />
        </button>
      </div>
    </div>
  );
}

export default CardMenu;